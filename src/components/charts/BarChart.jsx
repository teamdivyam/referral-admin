// import { Bar, BarChart, XAxis } from "recharts";
// import {
//     ChartContainer,
//     ChartTooltip,
//     ChartTooltipContent,
//     ChartLegend,
//     ChartLegendContent,
// } from "@/components/ui/chart";

// export default function Component({
//     chartData,
//     chartConfig
// }) {
//     return (
//         <ChartContainer config={chartConfig} className="h-[200px] w-full">
//             <BarChart accessibilityLayer data={chartData}>
//                 <XAxis
//                     dataKey="day"
//                     tickLine={false}
//                     tickMargin={10}
//                     axisLine={false}
//                     // tickFormatter={(value) => value.slice(0, 3)}
//                 />
//                 <ChartTooltip content={<ChartTooltipContent />} />
//                 <ChartLegend content={<ChartLegendContent />} />
//                 <Bar dataKey="refers" fill="var(--color-cs-icon-primary)" radius={4} />
//             </BarChart>
//         </ChartContainer>
//     );
// }

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts";
import { Card } from "@/components/ui/card";

export default function BarChartComponent({ chartData, chartConfig }) {
  return (
    <div className="h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={chartData}
          margin={{
            top: 5,
            right: 10,
            left: 10,
            bottom: 0,
          }}
        >
          <XAxis
            dataKey="day"
            stroke="#888888"
            fontSize={12}
            tickLine={false}
            axisLine={false}
          />
          <YAxis
            stroke="#888888"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) => `${value}`}
          />
          <Tooltip
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                return (
                  <Card className="p-2 border-none shadow-sm">
                    <div className="flex items-center gap-2">
                      <div
                        className="h-3 w-3 rounded-full"
                        style={{ backgroundColor: chartConfig.referral.color }}
                      />
                      <span className="font-medium">
                        {payload[0].payload.day}: {payload[0].value} referrals
                      </span>
                    </div>
                  </Card>
                );
              }
              return null;
            }}
          />
          <Bar
            dataKey="refers"
            fill={chartConfig.referral.color}
            radius={[4, 4, 0, 0]}
            className="fill-primary"
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}