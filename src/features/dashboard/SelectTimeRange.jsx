import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Calendar, ChevronDown, Droplet } from "lucide-react";

const rangeTime = [
    "Last 7 Days",
    "This Month",
    "Last 7 Weeks",
    "Last 7 Months",
];

export default function SelectTimeRange() {
    const [label, setLabel] = useState(0);

    return (
        <DropdownMenu className="">
            <DropdownMenuTrigger asChild>
                <Button className="w-40 text-cs-foreground-secondary bg-cs-background-primary font-normal border-1 hover:bg-cs-background-secondary hover:inset-ring-1">
                    <Calendar />
                    {rangeTime[label]}
                    <ChevronDown />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
                {rangeTime.map((item, i) => (
                    <DropdownMenuItem key={i} onClick={() => setLabel(i)}>
                        {item}
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
