import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { APP_STATUS_ARRAY, IS_PAID} from "@/utils/constants";
import { useDashboard } from "@/features/dashboard/hooks/useDashboard";


export default function StatusCard({ className = "" }) {
        const { progress, mainStage, pgarry } = useDashboard();

    return (
        <Card className={`bg-gray-50 relative min-h-[250px] w-full rounded border shadow ${className}`}>
        <CardHeader>
            <CardTitle className="text-gray-700">
            Application status
            </CardTitle>
        </CardHeader>
        {APP_STATUS_ARRAY.map((status) => (
            status.status === 'approved' && (
                <Badge 
                    key={status.id} 
                    className={`absolute top-4 right-10 ${status.status} bg-blue-100 text-green-600 mb-2 ml-4`}
                >
                    {status.status}
                </Badge>
            )
        ))}
        <CardContent className="space-y-3">
            <p className="text-sm font-light text-indigo-600">
            Processing Progress :
            </p>
            <Progress value={progress} className="  border border-border" />
            <p className="text-sm text-muted-foreground">
            Step {mainStage} of {pgarry.length} completed
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
