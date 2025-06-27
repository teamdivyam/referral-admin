import { FolderCode } from "lucide-react";
import LoadingCircle from "../components/loading-circle";

export default function Help() {

    return (
        <div className="min-h-[75vh] flex justify-center items-center gap-2.5 text-cs-icon-primary text-3xl font-medium">
            <FolderCode className="size-8"/>
            <span>Currently Working On</span>
            <LoadingCircle />
        </div>
    )

}
