// import {
//     DropdownMenu,
//     DropdownMenuContent,
//     DropdownMenuItem,
//     DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// import { Button } from "@/components/ui/button";
// import { Calendar, ChevronDown } from "lucide-react";

// const rangeTime = {
//     last7Days: "Last 7 Days",
//     thisMonth: "This Month",
//     lastMonth: "Last Month",
// };

// const rangeTimeValue = Object.values(rangeTime);
// const rangeTimeKey = Object.keys(rangeTime);

// export default function SelectTimeRange({ defineTime, setDefineTime }) {
//     return (
//         <DropdownMenu className="">
//             <DropdownMenuTrigger asChild>
//                 <Button className="w-40 text-cs-foreground-secondary bg-cs-background-primary font-normal border-1 hover:bg-cs-background-secondary hover:inset-ring-1">
//                     <Calendar />
//                     {rangeTime[defineTime]}
//                     <ChevronDown />
//                 </Button>
//             </DropdownMenuTrigger>
//             <DropdownMenuContent className="w-56">
//                 {rangeTimeValue.map((item, i) => (
//                     <DropdownMenuItem key={i} onClick={() => setDefineTime(rangeTimeKey[i])}>
//                         {item}
//                     </DropdownMenuItem>
//                 ))}
//             </DropdownMenuContent>
//         </DropdownMenu>
//     );
// }

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";

const rangeTime = {
  last7Days: "Last 7 Days",
  thisMonth: "This Month",
  lastMonth: "Last Month",
};

export default function SelectTimeRange({ defineTime, setDefineTime }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="ml-auto gap-1">
          <ChevronDown className="h-4 w-4" />
          <span className="sr-only">Time range</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[150px]">
        {Object.entries(rangeTime).map(([key, value]) => (
          <DropdownMenuItem
            key={key}
            onClick={() => setDefineTime(key)}
            className={defineTime === key ? "bg-accent" : ""}
          >
            {value}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}