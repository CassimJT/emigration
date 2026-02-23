// features/passport/components/ApplicationDetail.jsx

import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription,
    } from "@/components/ui/card";
    import { Button } from "@/components/ui/button";
    import { Skeleton } from "@/components/ui/skeleton";
    import { ArrowLeft, Loader } from "lucide-react";

    import { usePassportApplication } from "@/features/passport/hooks/usePassportApplication";
import StatusCard from "@/features/dashboard/components/StatusCard";

    export default function ApplicationDetails({ className = "" }) {
    const { id } = useParams();
    const navigate = useNavigate();

    const {
        applicationData,
        applicationId,
        setApplicationId,
        loadApplication,
        loading,
        error,
    } = usePassportApplication();

    useEffect(() => {
        if (id && id !== applicationId) {
        setApplicationId(id);
        loadApplication(id);
        }
    }, [id, applicationId, setApplicationId, loadApplication]);

    if (loading) {
        return (
        <div className={`container mx-auto py-8 px-4 ${className}`}>
            <div className="max-w-4xl mx-auto space-y-8">
            <Loader className="animate-spin absolute top-[50%] " />
            <Skeleton className="bg-gray-50 h-10 w-64" />
            <Skeleton className="bg-gray-50 h-[300px] w-full" />
            <Skeleton className="bg-gray-50 h-64 w-full" />
            </div>
        </div>
        );
    }

    if (error || !applicationData?._id) {
        return (
        <div className={`container mx-auto py-12 px-4 text-center ${className}`}>
            <Card className="max-w-md mx-auto">
            <CardHeader>
                <CardTitle className="text-destructive">Error</CardTitle>
                <CardDescription>{error || "Application not found or access denied"}</CardDescription>
            </CardHeader>
            <CardContent>
                <Button onClick={() => navigate("/passport/my-applications")}>
                Back to My Applications
                </Button>
            </CardContent>
            </Card>
        </div>
        );
    }

    const formData = applicationData.formData || {};

    return (
        <div className={`container mx-auto py-8 px-4 ${className}`}>
        <div className="max-w-4xl mx-auto space-y-8">
            {/* Back button */}
            <Button
            variant="ghost"
            className="gap-2 pl-0"
            onClick={() => navigate("/dashboard")}
            >
            <ArrowLeft className="h-4 w-4" />
            Back to My Applications
            </Button>

            {/* Status Card */}
            <StatusCard showHeader={false} className="border-primary/20 shadow-lg" />

            {/* other Details */}
            <Card>
            <CardHeader>
                <CardTitle>Application Information</CardTitle>
                <CardDescription>Details about your passport application</CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Application Type</h3>
                    <p className="font-medium mt-1">{applicationData.type || "Ordinary"}</p>
                </div>

                <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Service Type</h3>
                    <p className="font-medium mt-1">{formData.serviceType || "Standard"}</p>
                </div>

                <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Submitted On</h3>
                    <p className="font-medium mt-1">
                    {applicationData.submittedAt
                        ? new Date(applicationData.submittedAt).toLocaleString("en-GB")
                        : "Not yet submitted"}
                    </p>
                </div>
                </div>

                <div className="space-y-4">
                <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Application ID</h3>
                    <p className="font-mono text-sm mt-1">{applicationData._id}</p>
                </div>

                {formData.passportType && (
                    <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Passport Type</h3>
                    <p className="font-medium mt-1">{formData.passportType}</p>
                    </div>
                )}
                </div>
            </CardContent>
            </Card>

            {/* Actions */}
            <div className="flex justify-end gap-4">
            {applicationData.status === "Draft" && (
                <Button onClick={() => navigate(`/passport/apply?edit=${id}`)}>
                Continue Editing
                </Button>
            )}
            <Button variant="outline" onClick={() => window.print()}>
                Print Application
            </Button>
            </div>
        </div>
        </div>
    );
}