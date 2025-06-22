// shared/ui/chart/BaseAreaChart.tsx

import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

export const BaseAreaChart = ({ data, dataKey }: { data: any[]; dataKey: string }) => (
  <div style={{ width: "100%", height: 300 }}>
    <ResponsiveContainer>
      <AreaChart data={data}>
        <XAxis dataKey="time" />
        <YAxis />
        <Tooltip />
        <Area type="monotone" dataKey={dataKey} stroke="#8884d8" fill="#8884d8" />
      </AreaChart>
    </ResponsiveContainer>
  </div>
);
