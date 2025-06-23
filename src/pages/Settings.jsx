import { Button } from "@/components/ui/button";
import { useQuery, useMutation } from "@tanstack/react-query";
import AdminService from "../services/admin.service";
import LoadingCircle from "../components/loading-circle";
import { useEffect, useState } from "react";

const getCronJobStatus = async () => {
    try {
        console.log("refetching...");
        const response = await AdminService.getCronJobStatus();

        return response.data;
    } catch (error) {
        console.error(error);
    }
};

const controlCronJob = async (state) => {
    try {
        const response = await AdminService.controlCronJob(state);

        return response.data;
    } catch (error) {
        console.error(error);
    }
};

export default function Settings() {
    const [runScript, setRunScript] = useState(false);
    const { data, isLoading, refetch } = useQuery({
        queryKey: ["cron-job-status"],
        queryFn: getCronJobStatus,
    });

    const mutation = useMutation({
        mutationFn: controlCronJob,
        onSuccess: (data) => {
            setRunScript(!runScript)
            refetch();
        },
        onError: (error) => {
            // Handle error
            console.error("Error:", error);
        },
    });

    useEffect(() => {
        setRunScript(data?.isRunning);
    }, [data]);

    return (
        <div>
            <p className="mb-4">Run Script</p>
            <div className="flex gap-3">
                <Button
                    className={`${runScript ? 'bg-red-500' : 'bg-green-500'} cursor-pointer`}
                    onClick={() => {
                        mutation.mutate(runScript ? 'stop' : 'start');
                    }}
                >
                    {runScript ? 'stop' : 'start'}
                </Button>
                {/* <Button
                    className="bg-red-500 cursor-pointer"
                    onClick={() => {
                        mutation.mutate("stop");
                        setChange(!change);
                    }}
                >
                    Stop
                </Button> */}
            </div>

            <div>
                {isLoading ? (
                    <LoadingCircle />
                ) : (
                    `Running: ${data.isRunning} Last Execution Time: ${data.lastExecution}`
                )}
            </div>
        </div>
    );
}
