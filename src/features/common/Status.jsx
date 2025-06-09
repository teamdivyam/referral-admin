import { CircleCheckBig, Hourglass, X } from "lucide-react";

export default function Status({ statusType }) {

    switch (statusType) {
        case "approved":
            return (
                <div className="inline-flex items-center gap-1.5 px-2 py-0.5 border border-green-500 rounded-md">
                    <CircleCheckBig size={16} className="text-green-500 "/>
                    <span className="text-green-500">{statusType}</span>
                </div>
            );
        case "rejected":
            return (
                <div className="inline-flex items-center gap-1.5 px-2 py-0.5 border border-red-500 rounded-md">
                    <X size={16} className="text-red-500 "/>
                    <span className="text-red-500">{statusType}</span>
                </div>
            );
        case "pending":
            return (
                <div className="inline-flex items-center gap-1.5 px-2 py-0.5 border border-yellow-500 rounded-md">
                    <Hourglass size={16} className="text-yellow-500 "/>
                    <span className="text-yellow-500">{statusType}</span>
                </div>
            );
            
    }
}