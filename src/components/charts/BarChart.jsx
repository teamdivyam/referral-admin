import { Bar, BarChart, XAxis } from "recharts";
import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
    ChartLegend,
    ChartLegendContent,
} from "@/components/ui/chart";

export default function Component({
    chartData,
    chartConfig
}) {
    return (
        <ChartContainer config={chartConfig} className="h-[200px] w-full">
            <BarChart accessibilityLayer data={chartData}>
                <XAxis
                    dataKey="day"
                    tickLine={false}
                    tickMargin={10}
                    axisLine={false}
                    // tickFormatter={(value) => value.slice(0, 3)}
                />
                <ChartTooltip content={<ChartTooltipContent />} />
                <ChartLegend content={<ChartLegendContent />} />
                <Bar dataKey="referral" fill="var(--color-cs-icon-primary)" radius={4} />
            </BarChart>
        </ChartContainer>
    );
}
