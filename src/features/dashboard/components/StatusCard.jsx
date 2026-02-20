import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { IS_PAID} from "@/utils/constants";
import { usePassportApplication } from "@/features/passport/hooks/usePassportApplication";
import React from "react";


export default function StatusCard({ className = "" }) {
        const { applicationData, loadApplication, applicationId } = usePassportApplication();

const applicationProgress = React.useMemo(() => {
    switch (applicationData?.status) {
        case 'Draft':
        return {progress:25, appStatus:"draft", className:"text-gray-600"};
        case 'SUBMITTED':
        return {progress:50, appStatus:"submitted", className:"text-orange-600"};
        case 'APPROVED':
        return {progress:100, appStatus:"approved", className:" text-green-600"}; 
        case 'REJECTED':
        return {progress:0, appStatus:"rejected", className:" text-red-600"};
        case 'UNDER_REVIEW':
        return {progress:75, appStatus:"under review", className:"text-blue-600"};
        default:
        return {progress:0, appStatus:"unknown", className:""}; 
    }
    }, [applicationData?.status]);

    React.useEffect(() => {
    if (applicationId) {
        loadApplication(applicationId);
    }
    }, [applicationId, loadApplication]);

    return (
        <Card className={`bg-gray-50 relative min-h-[250px] w-full rounded border shadow ${className}`}>
        <CardHeader>
            <CardTitle className="text-gray-700">
            Application status
            </CardTitle>
        </CardHeader>
        {
            <Badge className={`absolute top-4 right-10 mb-2 ml-4 bg-blue-100 ${applicationProgress.className}`}>
                {applicationProgress.appStatus }
            </Badge>
        }
        <CardContent className="space-y-3">
            <p className="text-sm font-light text-indigo-600">
            Processing Progress :
            </p>
            <Progress value={applicationProgress.progress} className="  border border-border" />
            <p className="text-sm text-muted-foreground">
            Step {applicationProgress.progress/25} of 4 completed
            </p>
        </CardContent>
        <CardContent className="flex flex-col gap-4 border-t border-gray-50 pt-4 ">
            <CardTitle className="flex items-center gap-2">
                <span className="text-sm font-light text-indigo-600">Payment status :</span>  
                { IS_PAID ?
                    <Badge className="bg-green-100 text-green-600 font-medium">
                        Paid
                    </Badge>
                    :
                    <Badge className="bg-red-100 text-red-600 font-medium">
                        Unpaid
                    </Badge>
                }
            </CardTitle>
            <p className="text-amber-500 font-bold">MWK 50000</p>
        </CardContent>
        </Card>
    );
}
