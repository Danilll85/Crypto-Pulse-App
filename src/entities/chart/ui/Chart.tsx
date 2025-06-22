import { useEffect, useRef, useState } from "react";
import { Chart } from "chart.js/auto";
import "chartjs-adapter-date-fns";
import zoomPlugin from "chartjs-plugin-zoom";
import { useOHLCData } from "@entities/chart/lib/useOHLCData";
import { COLORS } from "../config/colors";
import { options } from "../config/intervalOptions";
import { priceLineConfig } from "../config/priceLineConfig";
import {
  ChartContainer,
  ChartHeader,
  ChartHeaderText,
  LoadingContainer,
  LoadingText,
  ChartCanvasWrapper,
  SpinnerContainer,
  Spinner,
} from "./styles";
import { useTheme } from "@shared/lib/hooks/useTheme";
import { colors } from "@shared/ui/styleColors";

Chart.register(zoomPlugin);

interface OHLCChartProps {
  currencyName: string;
}

const OHLCChart = ({ currencyName }: OHLCChartProps) => {
  const { theme } = useTheme();
  const [interval, setDataInterval] = useState<number>(1);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const chartRef = useRef<any | null>(null);

  const { data = [], isLoading, error } = useOHLCData(currencyName, interval);

  useEffect(() => {
    if (!canvasRef.current || data.length === 0) return;
    const ctx = canvasRef.current.getContext("2d");
    if (!ctx) return;

    if (chartRef.current) {
      chartRef.current.destroy();
    }

    const ohlcDatasets = data.map((point) => {
      const isUp = point.c >= point.o;
      const color = isUp ? COLORS.UP.primary : COLORS.DOWN.primary;
      const candleWidth = 20000;

      return {
        label: `OHLC ${point.x.toISOString()}`,
        data: [
          { x: point.x, y: point.h },
          { x: point.x, y: point.l },
          { x: point.x, y: null },
          { x: new Date(point.x.getTime() - candleWidth / 2), y: point.o },
          { x: new Date(point.x.getTime() + candleWidth / 2), y: point.o },
          { x: new Date(point.x.getTime() + candleWidth / 2), y: point.c },
          { x: new Date(point.x.getTime() - candleWidth / 2), y: point.c },
          { x: new Date(point.x.getTime() - candleWidth / 2), y: point.o },
        ],
        borderColor: color,
        backgroundColor: isUp ? COLORS.UP.light + "80" : COLORS.DOWN.light + "80",
        borderWidth: 2,
        pointRadius: 0,
        tension: 0,
        spanGaps: false,
        showLine: true,
        fill: true,
      };
    });

    const priceLineData = data.map((point) => ({
      x: point.x,
      y: point.c,
    }));

    chartRef.current = new Chart(ctx, {
      type: "line",
      data: {
        datasets: [
          ...ohlcDatasets,
          {
            data: priceLineData,
            ...priceLineConfig,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        interaction: {
          intersect: false,
          mode: "nearest",
        },
        plugins: {
          legend: {
            display: true,
            position: "top",
            labels: {
              color: theme === "light" ? colors.textColorLight : colors.textColorDark,
              font: {
                family: "'Inter', sans-serif",
                size: 12,
                weight: "bold",
              },
              padding: 20,
              usePointStyle: true,
              pointStyle: "line",
              filter: (legendItem) => legendItem.text === "Close Price Trend",
            },
          },
          tooltip: {
            borderWidth: 1,
            padding: 12,
            usePointStyle: true,
            callbacks: {
              title: (tooltipItems) => {
                const firstItem = tooltipItems[0];
                if (!firstItem) return "";
                const candleIndex = Math.floor(firstItem.dataIndex / 8);
                if (candleIndex < data.length) {
                  return data[candleIndex].x.toLocaleString("en-US", {
                    weekday: "short",
                    month: "short",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                    timeZoneName: "short",
                  });
                }
                return "";
              },
              label: (tooltipItem) => {
                const candleIndex = Math.floor(tooltipItem.dataIndex / 8);
                if (candleIndex < data.length) {
                  const point = data[candleIndex];
                  const change = point.c - point.o;
                  const changePercent = (change / point.o) * 100;
                  const isUp = change >= 0;

                  return [
                    `Open: $${point.o.toFixed(2)}`,
                    `High: $${point.h.toFixed(2)}`,
                    `Low: $${point.l.toFixed(2)}`,
                    `Close: $${point.c.toFixed(2)}`,
                    `Change: ${isUp ? "+" : ""}${change.toFixed(2)} (${isUp ? "+" : ""}${changePercent.toFixed(2)}%)`,
                  ];
                }
                return "";
              },
              labelColor: (tooltipItem) => {
                const candleIndex = Math.floor(tooltipItem.dataIndex / 8);
                if (candleIndex < data.length) {
                  const isUp = data[candleIndex].c >= data[candleIndex].o;
                  return {
                    borderColor: "transparent",
                    backgroundColor: isUp ? COLORS.UP.primary : COLORS.DOWN.primary,
                  };
                }
                return {
                  borderColor: "transparent",
                  backgroundColor: COLORS.PRICE_LINE,
                };
              },
            },
            filter: (tooltipItem) => tooltipItem.datasetIndex === ohlcDatasets.length,
          },
          zoom: {
            zoom: {
              wheel: { enabled: true },
              pinch: { enabled: true },
              mode: "xy",
            },
            pan: {
              enabled: true,
              mode: "xy",
            },
            limits: {
              x: { min: "original", max: "original" },
              y: { min: "original", max: "original" },
            },
          },
        },
        scales: {
          x: {
            type: "time",
            time: {
              unit: "hour",
              displayFormats: {
                hour: "HH:mm",
                day: "MMM d",
              },
              tooltipFormat: "MMM d, yyyy HH:mm",
            },
            grid: { color: COLORS.GRID },
            ticks: {
              color: theme === "light" ? colors.textColorLight : colors.textColorDark,
              maxRotation: 0,
              autoSkip: true,
              autoSkipPadding: 20,
            },
            title: {
              display: true,
              text: "Time",
              color: theme === "light" ? colors.textColorLight : colors.textColorDark,
              font: { weight: "bold" },
            },
          },
          y: {
            beginAtZero: false,
            grid: { color: COLORS.GRID },
            ticks: {
              color: theme === "light" ? colors.textColorLight : colors.textColorDark,
              callback: (value) => "$" + value.toLocaleString(),
            },
            title: {
              display: true,
              text: "Price (USD)",
              color: theme === "light" ? colors.textColorLight : colors.textColorDark,
              font: { weight: "bold" },
            },
          },
        },
        elements: { line: { borderWidth: 1 } },
      },
    });

    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
      }
    };
  }, [data]);

  return (
    <ChartContainer>
      <ChartHeader>
        <ChartHeaderText $theme={theme}>{currencyName}/USD OHLC Chart</ChartHeaderText>
        <select
          style={{
            color: theme === "light" ? colors.textColorLight : colors.textColorDark,
          }}
          value={interval}
          onChange={(e) => setDataInterval(+e.target.value)}
        >
          {options.map((option) => (
            <option key={option}>{option}</option>
          ))}
        </select>
        <LoadingText $theme={theme}>
          {isLoading
            ? "Loading data..."
            : error
            ? `Ошибка: ${error.message}`
            : `Last updated: ${new Date().toLocaleTimeString()}`}
        </LoadingText>
      </ChartHeader>

      <ChartCanvasWrapper $theme={theme}>
        {isLoading && !error && (
          <LoadingContainer $theme={theme}>
            <SpinnerContainer>
              <Spinner />
              <LoadingText $theme={theme}>Loading chart data...</LoadingText>
            </SpinnerContainer>
          </LoadingContainer>
        )}
        <canvas ref={canvasRef} />
      </ChartCanvasWrapper>
    </ChartContainer>
  );
};

export default OHLCChart;
