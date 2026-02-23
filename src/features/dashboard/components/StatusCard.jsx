    import { Badge } from "@/components/ui/badge";
    import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
    import { Progress } from "@/components/ui/progress";
    import { IS_PAID } from "@/utils/constants";
    import { usePassportApplication } from "@/features/passport/hooks/usePassportApplication";
    import React from "react";
import { useParams } from "react-router-dom";

    export default function StatusCard({ className = "", showHeader = true }) {
    const { applicationData, loadApplication } = usePassportApplication();
    const {id} = useParams();
    const applicationProgress = React.useMemo(() => {
        const status = applicationData?.status || "unknown";

        switch (status) {
        case "Draft":
            return { progress: 25, appStatus: "Draft", className: "text-gray-600" };
        case "SUBMITTED":
            return { progress: 50, appStatus: "Submitted", className: "text-orange-600" };
        case "APPROVED":
            return { progress: 100, appStatus: "Approved", className: "text-green-600" };
        case "REJECTED":
            return { progress: 0, appStatus: "Rejected", className: "text-red-600" };
        case "UNDER_REVIEW":
            return { progress: 75, appStatus: "Under Review", className: "text-blue-600" };
        default:
            return { progress: 0, appStatus: "Unknown", className: "" };
        }
    }, [applicationData?.status]);

    React.useEffect(() => {
        if (id) {
        loadApplication(id);
        }
    }, [id,loadApplication]);

    if (!id) {
    return (
        <Card className={className}>
            <CardHeader>
            <CardTitle>Problem</CardTitle>
            </CardHeader>
            <CardContent>
            <p className="text-muted-foreground">
                Something went wrong, we will take action soon
            </p>
            </CardContent>
        </Card>
        );
    }

    return (
        <Card className={`bg-gray-50 relative min-h-[250px] w-full rounded border shadow ${className}`}>
        {showHeader && (
            <CardHeader>
            <CardTitle className="text-gray-700">Application Status</CardTitle>
            </CardHeader>
        )}

        <Badge
            className={`absolute top-4 right-6 px-4 py-1 bg-blue-100 ${applicationProgress.className}`}
        >
            {applicationProgress.appStatus}
        </Badge>

        <CardContent className="space-y-4 pt-10">
            <div className="space-y-2">
            <p className="text-sm font-medium text-indigo-600">Processing Progress</p>
            <Progress value={applicationProgress.progress} className="h-2.5 border border-border" />
            <p className="text-xs text-muted-foreground">
                Step {Math.ceil(applicationProgress.progress / 25)} of 4 completed
            </p>
            </div>

            <div className="border-t pt-4 space-y-3">
            <div className="flex items-center gap-3">
                <span className="text-sm font-medium text-indigo-600">Payment Status:</span>
                {IS_PAID ? (
                <Badge className="bg-green-100 text-green-600 font-medium">Paid</Badge>
                ) : (
                <Badge className="bg-red-100 text-red-600 font-medium">Unpaid</Badge>
                )}
            </div>
            <p className="text-amber-600 font-bold text-lg">MWK 50,000</p>
            </div>
        </CardContent>
        </Card>
    );
}