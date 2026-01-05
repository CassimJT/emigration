import { Button } from "@/components/ui/button";
import { useState } from "react";

/*
 * Quick Actions Widget.
 * Provides a set of shortcut buttons for common user tasks.
 * Intended to give users fast access to frequent actions directly from the dashboard overview.
 */
export default function QuickActions() {
    const [action, setAction] = useState('');

    const actionsObjs = [
        {page:"payment history", path:"/" }
    ]

    return (
        <div className="flex flex-col  gap-4 justify-center items-center ">
        <h1 className="text-lg font-bold">Quick Actions</h1>
        
        <Button variant="secondary" className="hover:bg-gray-200 ">
                Payment History
        </Button>
        <Button variant="secondary" className="hover:bg-gray-200">
            Make Payment
        </Button>
        <Button variant="secondary" className="hover:bg-gray-200 text-muted-foreground">
            Contact Support
        </Button>
        </div>
    );
}
