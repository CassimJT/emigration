import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

/*
 * Quick Actions Widget.
 * Provides a set of shortcut buttons for common user tasks.
 * Intended to give users fast access to frequent actions directly from the dashboard overview.
 */
export default function QuickActions() {
    const quickActions = [
        { label: "Start Application", path: "/dashboard/passport/apply" },
        { label: "Make Payment", path: "/dashboard/payments" },
        { label: "Contact Support", path: "/contacts", className: "text-muted-foreground" }
    ];

    return (
        <div className="flex flex-col gap-4 justify-center items-center">
            <h1 className="text-lg font-bold text-slate-700">Quick Actions</h1>
            
            {quickActions.map((action, index) => (
                <Button 
                    key={index} 
                    variant="secondary" 
                    className={`hover:bg-gray-200 text-slate-700 ${action.className || ''}`}
                >
                    <Link to={action.path}>
                        {action.label}
                    </Link>
                </Button>
            ))}
        </div>
    );
}
