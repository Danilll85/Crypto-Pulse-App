import { useEffect, useState, useRef } from "react";
import { Chart } from "chart.js/auto";
import "chartjs-adapter-date-fns";
import zoomPlugin from "chartjs-plugin-zoom";
import type { OHLCData } from "./Chart.types";
import { COLORS } from "../config/colors";
import { options } from "../config/intervalOptions";
import { priceLineConfig } from "../config/priceLineConfig";
import { ChartContainer, ChartHeader, ChartHeaderText, LoadingContainer, LoadingText } from "./styles";
import { useTheme } from "@shared/lib/hooks/useTheme";
import { colors } from "@shared/ui/styleColors";

Chart.register(zoomPlugin);

interface OHLCChartProps {
  currencyName: string;
}

const OHLCChart = ({ currencyName }: OHLCChartProps) => {
  const { theme } = useTheme();
  const [data, setData] = useState<OHLCData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [interval, setDataInterval] = useState<number>(1);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const chartRef = useRef<any | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch(
          `https://api.kraken.com/0/public/OHLC?pair=${currencyName}USD&interval=${interval}`
        );
        const result = await response.json();
        console.log(result);

        if (result.error && result.error.length > 0) {
          throw new Error(result.error.join(", "));
        }

        const firstKey = Object.keys(result.result)[0];

        const data = result.result[firstKey];

        const recentData = data.slice(-100);

        setData(
          recentData.map((item: any[]) => ({
            x: new Date(item[0] * 1000),
            o: parseFloat(item[1]),
            h: parseFloat(item[2]),
            l: parseFloat(item[3]),
            c: parseFloat(item[4]),
          }))
        );
      } catch (err) {
        console.error("Error fetching data:", err);
        setError(`Failed to load live data: ${err instanceof Error ? err.message : String(err)}`);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();

    const intervalId = setInterval(fetchData, 5 * 60 * 1000);

    return () => clearInterval(intervalId);
  }, [interval]);

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
          {
            x: new Date(point.x.getTime() - candleWidth / 2),
            y: point.o,
          },
          {
            x: new Date(point.x.getTime() + candleWidth / 2),
            y: point.o,
          },
          {
            x: new Date(point.x.getTime() + candleWidth / 2),
            y: point.c,
          },
          {
            x: new Date(point.x.getTime() - candleWidth / 2),
            y: point.c,
          },
          {
            x: new Date(point.x.getTime() - candleWidth / 2),
            y: point.o,
          },
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
            filter: (tooltipItem) => {
              return tooltipItem.datasetIndex === ohlcDatasets.length;
            },
          },
          zoom: {
            zoom: {
              wheel: {
                enabled: true,
              },
              pinch: {
                enabled: true,
              },
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
            grid: {
              color: COLORS.GRID,
            },
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
              font: {
                weight: "bold",
              },
            },
          },
          y: {
            beginAtZero: false,
            grid: {
              color: COLORS.GRID,
            },
            ticks: {
              color: theme === "light" ? colors.textColorLight : colors.textColorDark,
              callback: function (value) {
                return "$" + value.toLocaleString();
              },
            },
            title: {
              display: true,
              text: "Price (USD)",
              color: theme === "light" ? colors.textColorLight : colors.textColorDark,
              font: {
                weight: "bold",
              },
            },
          },
        },
        elements: {
          line: {
            borderWidth: 1,
          },
        },
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
            <option>{option}</option>
          ))}
        </select>
        <LoadingText $theme={theme}>
          {isLoading ? "Loading data..." : error ? error : `Last updated: ${new Date().toLocaleTimeString()}`}
        </LoadingText>
      </ChartHeader>

      <div
        style={{
          width: "100%",
          height: "100%",
          backgroundColor: theme === "light" ? colors.backgroundLight : colors.backgroundDark,
          border: `1px solid ${COLORS.GRID}`,
          borderRadius: "12px",
          boxShadow: "0 1px 3px rgba(0, 0, 0, 0.05)",
          padding: "16px",
          position: "relative",
        }}
      >
        {isLoading && !error && (
          <LoadingContainer $theme={theme}>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "12px",
              }}
            >
              <div
                className="spinner"
                style={{
                  width: "40px",
                  height: "40px",
                  border: `4px solid ${COLORS.GRID}`,
                  borderTopColor: COLORS.PRICE_LINE,
                  borderRadius: "50%",
                  animation: "spin 1s linear infinite",
                }}
              />
              <LoadingText $theme={theme}>Loading chart data...</LoadingText>
            </div>
          </LoadingContainer>
        )}

        <canvas ref={canvasRef} />
      </div>

      <style>{`
                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
            `}</style>
    </ChartContainer>
  );
};

export default OHLCChart;
