// PassportProcessingPage.jsx
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
    } from "@/components/ui/alert-dialog";
    import { useAuth } from '@/features/auth/hooks/useAuth';
    import { useOutletContext, useParams, Navigate } from 'react-router-dom';
    import {
    Loader2, AlertCircle, CheckCircle2, XCircle, FileText, MessageSquare,
    User, Clock, ShieldCheck, Download
    } from "lucide-react";
    import { usePassportApplication } from '@/features/passport/hooks/usePassportApplication';

    const getStatusBadge = (status) => {
    const variants = {
        DRAFT: { label: 'Draft', variant: 'secondary' },
        IN_PROGRESS: { label: 'In Progress', variant: 'secondary' },
        SUBMITTED: { label: 'Pending Review', variant: 'outline' },
        UNDER_REVIEW: { label: 'Under Review', variant: 'default' },
        APPROVED: { label: 'Approved', variant: 'success' },
        REJECTED: { label: 'Rejected', variant: 'destructive' },
        EXPIRED: { label: 'Expired', variant: 'secondary' },
    };
    const v = variants[status] || { label: status || 'Unknown', variant: 'secondary' };
    return <Badge variant={v.variant}>{v.label}</Badge>;
    };

    const getApplicantName = (formData) => {
    const personal = formData?.[2] || {};
    return `${personal.name || ''} ${personal.surname || ''}`.trim() || 'Unknown Applicant';
    };

    export default function PassportProcessingPage() {
    const { applicationId: paramId } = useParams();
    const { user } = useAuth();
    const { currentRole, profile } = useOutletContext();
    const {
        reviewData,
        selectedStatus,
        setSelectedStatus,
        loading,
        error,
        initiateReview,
        approve,
    } = usePassportApplication();

    const [notes, setNotes] = useState('');

    const role = (currentRole || user?.role || 'officer').toLowerCase();
    const displayName = profile?.firstName && profile.firstName !== "null"
        ? profile.firstName
        : (user?.emailAddress?.split('@')[0] || "Officer");

    useEffect(() => {
        if (!paramId) return;
        let isMounted = true;

        const tryStartReview = async () => {
        try {
            await initiateReview(paramId);
        } catch (err) {
            if (!isMounted) return;
            console.warn("Review start failed:", err.message);
        }
        };

        tryStartReview();

        return () => { isMounted = false; };
    }, [paramId, initiateReview]);

    if (!['officer', 'admin', 'superadmin'].includes(role)) {
        return <Navigate to="*" replace />;
    }

    if (loading && !reviewData) {
        return (
        <div className="flex items-center justify-center h-96">
            <Loader2 className="h-12 w-12 animate-spin text-indigo-600" />
        </div>
        );
    }

    if (error || !reviewData) {
        return (
        <div className="p-8 text-center text-red-600">
            <AlertCircle className="h-12 w-12 mx-auto mb-4" />
            <h2 className="text-xl font-semibold">Cannot load application</h2>
            <p className="mt-2">
            {error || 'Application not found, already under review, or invalid ID.'}
            </p>
        </div>
        );
    }

    const canTakeAction = reviewData.status === "UNDER_REVIEW";

    return (
        <div className="space-y-6 animate-in fade-in duration-500 p-4 md:p-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Process Application</h1>
            <p className="text-gray-500 mt-1">
                Reviewing passport application • ID: <span className="font-mono font-medium">{reviewData._id}</span>
            </p>
            </div>
            <div className="flex items-center gap-3">
            {getStatusBadge(reviewData.status)}
            <Button variant="outline" size="sm" onClick={() => initiateReview(paramId)}>
                Refresh
            </Button>
            </div>
        </div>

        
        <Card className="border-gray-200 shadow-sm">
            <CardHeader className="bg-gray-50/50 border-b">
            <CardTitle className="flex items-center gap-3">
                <User className="h-6 w-6 text-indigo-600" />
                Applicant Information
            </CardTitle>
            <CardDescription>
                Personal details submitted by {getApplicantName(reviewData.formData)}
            </CardDescription>
            </CardHeader>
            <CardContent className="pt-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div>
                <Label className="text-sm font-medium text-gray-500">Full Name</Label>
                <p className="mt-1 font-medium">{getApplicantName(reviewData.formData)}</p>
                </div>
                <div>
                <Label className="text-sm font-medium text-gray-500">Email</Label>
                <p className="mt-1">{reviewData.formData?.[2]?.email || 'N/A'}</p>
                </div>
                <div>
                <Label className="text-sm font-medium text-gray-500">Passport Type</Label>
                <p className="mt-1">{reviewData.formData?.[1]?.passportType || 'Ordinary'}</p>
                </div>
                <div>
                <Label className="text-sm font-medium text-gray-500">Booklet Type</Label>
                <p className="mt-1">{reviewData.formData?.[1]?.bookletType || 'N/A'}</p>
                </div>
                <div>
                <Label className="text-sm font-medium text-gray-500">Service Type</Label>
                <p className="mt-1">{reviewData.formData?.[1]?.serviceType || 'Normal'}</p>
                </div>
                <div>
                <Label className="text-sm font-medium text-gray-500">Created</Label>
                <div className="flex items-center gap-2 mt-1 text-gray-600">
                    <Clock className="h-4 w-4" />
                    {new Date(reviewData.createdAt).toLocaleString()}
                </div>
                </div>
            </div>

            <div className="border-t pt-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <FileText className="h-5 w-5 text-indigo-600" />
                Documents & Verification
                </h3>
                <div className="flex flex-wrap gap-4">
                <Button variant="outline" >
                    <Download className="h-4 w-4 mr-2" />
                    Download All Documents
                </Button>
                <div className="text-sm text-gray-500 italic">
                    Photo, ID scan, Birth certificate previews here...
                </div>
                </div>
            </div>
            </CardContent>
        </Card>

        <Tabs defaultValue="actions" className="space-y-6">
            <TabsList className="bg-gray-100">
            <TabsTrigger value="actions">
                <ShieldCheck className="h-4 w-4 mr-2" />
                Processing Actions
            </TabsTrigger>
            <TabsTrigger value="notes">
                <MessageSquare className="h-4 w-4 mr-2" />
                Notes & History
            </TabsTrigger>
            </TabsList>

            <TabsContent value="actions">
            <Card>
                <CardHeader>
                <CardTitle>Take Action</CardTitle>
                <CardDescription>
                    Update status or approve/reject this application.
                </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                    <Label htmlFor="status">Change Status</Label>
                    <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                        <SelectTrigger>
                        <SelectValue placeholder="Select action" />
                        </SelectTrigger>
                        <SelectContent>
                        <SelectItem value="UNDER_REVIEW">Under Review</SelectItem>
                        <SelectItem value="APPROVED">Approve</SelectItem>
                        <SelectItem value="REJECTED">Reject</SelectItem>
                        </SelectContent>
                    </Select>
                    </div>
                    <div className="flex items-end">
                    <Button
                        onClick={() => console.log("Bulk status update not implemented")}
                        disabled={loading || !selectedStatus || selectedStatus === reviewData.status}
                        className="w-full md:w-auto"
                    >
                        Update Status
                    </Button>
                    </div>
                </div>

                <div className="space-y-2">
                    <Label htmlFor="notes">Internal Notes (admin only)</Label>
                    <Textarea
                    id="notes"
                    placeholder="Add comments, rejection reasons, observations..."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    rows={4}
                    />
                </div>

                <div className="flex flex-wrap gap-4 pt-4 border-t">
                    <AlertDialog>
                    <AlertDialogTrigger asChild>
                        <Button
                        variant="default"
                        className="bg-green-600 hover:bg-green-700 text-white"
                        disabled={loading || !canTakeAction}
                        >
                        {loading ? (
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        ) : (
                            <CheckCircle2 className="h-4 w-4 mr-2" />
                        )}
                        Approve Application
                        </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                        <AlertDialogTitle>Approve Application</AlertDialogTitle>
                        <AlertDialogDescription>
                            This will permanently mark the application as APPROVED.
                            <br /><br />
                            Make sure all required documents are verified, data is correct,
                            and there are no outstanding issues.
                            <br /><br />
                            <strong>This action cannot be undone.</strong>
                        </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                            className="bg-green-600 hover:bg-green-700 text-white"
                            onClick={async () => {
                                await approve(paramId);
                            }}
                        >
                            Approve
                        </AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                    </AlertDialog>

                    <Button
                    variant="destructive"
                    disabled={loading || !canTakeAction}
                    onClick={() => alert("Reject functionality not implemented yet")}
                    >
                    <XCircle className="h-4 w-4 mr-2" />
                    Reject 
                    </Button>
                </div>
                </CardContent>
            </Card>
            </TabsContent>

            <TabsContent value="notes">
            </TabsContent>
        </Tabs>
        </div>
    );
}