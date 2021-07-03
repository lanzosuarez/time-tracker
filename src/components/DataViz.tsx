import React, { FC } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";
import theme from "theme";

interface ChartsProps {
  data: any[];
  dataKeys: string[];
}

//bar chart
export const BarChartViz: FC<ChartsProps> = ({ data = [], dataKeys = [] }) => {
  console.log(dataKeys, data);
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <Legend />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip formatter={(value) => `${value} hr/s`} />

        {dataKeys.map((key) => (
          <Bar
            maxBarSize={20}
            dataKey={key}
            key={key}
            fill={theme.colors.teal[500]}
          />
        ))}
      </BarChart>
    </ResponsiveContainer>
  );
};

// line chart
export const LineChartViz: FC<ChartsProps> = ({ data, dataKeys }) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip formatter={(value) => `${value} hr/s`} />
        <Legend />

        {dataKeys.map((key) => (
          <Line
            key={key}
            type="monotone"
            dataKey={key}
            fill={theme.colors.teal[500]}
            activeDot={{ r: 8 }}
          />
        ))}
      </LineChart>
    </ResponsiveContainer>
  );
};
