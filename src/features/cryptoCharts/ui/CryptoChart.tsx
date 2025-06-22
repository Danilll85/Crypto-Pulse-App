import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { useChartData } from "../lib/useChartData";
import { useEffect } from "react";

export const CryptoChart = () => {
  const { data, isLoading, error } = useChartData("https://api.kraken.com/0/public/OHLC?pair=BTCUSD");

  useEffect(() => {
    console.log(data);
    console.log(isLoading);
    console.log(error);
  }, []);


  return (
    // <div style={{ width: "100%", height: 300 }}>
    //   <ResponsiveContainer>
    //     <AreaChart data={data}>
    //       <XAxis dataKey="time" />
    //       <YAxis domain={["dataMin", "dataMax"]} />
    //       <Tooltip />
    //       <Area type="monotone" dataKey="price" stroke="#82ca9d" fill="#82ca9d" />
    //     </AreaChart>
    //   </ResponsiveContainer>
    // </div>
    <></>
  );
};
