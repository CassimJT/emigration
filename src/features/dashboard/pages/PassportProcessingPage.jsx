import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useAuth } from '@/features/auth/hooks/useAuth';
import { useOutletContext, useParams, Navigate } from 'react-router-dom';
import {
    Loader2, AlertCircle, CheckCircle2, XCircle, FileText, MessageSquare,
    User, Clock, ShieldCheck, Download, Upload
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
        // 'Awaiting Documents': { label: 'Awaiting Documents', variant: 'warning' },
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
        loadApplication,
        initiateReview,
        selectedStatus,
        setSelectedStatus,
        reviewData,
        loading,
        error,
    } = usePassportApplication();

    const [notes, setNotes] = useState('');

    const role = (currentRole || user?.role || 'officer').toLowerCase();
    const displayName =
        profile?.firstName && profile.firstName !== "null"
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
            console.warn("Review start failed (may already be claimed):", err.message);
        }
        };

        tryStartReview();

        return () => {
        isMounted = false;
        };
    }, [paramId, initiateReview]);


    const handleStatusChange = async () => {
    if (!selectedStatus || selectedStatus === reviewData?.status) return;

    console.log('Updating status →', selectedStatus);
    console.log('Notes:', notes);
    console.log('Reviewer:', user?._id || user?.id, displayName);

    // TO call  real update endpoint 
    // await updateApplication(paramId, {
    //   status: selectedStatus,
    //   notes,
    //   reviewer: user._id || user.id,
    //   reviewedAt: new Date(),
    // });
    // Then: loadApplication(paramId) or rely on webhook/socket refresh
    };

    const handleDownloadDocuments = () => {
        console.log('Download documents →', paramId);
        // TO implement download logic
    };

    if (!['officer', 'admin', 'superadmin'].includes(role)) {
        return <Navigate to="*" replace />;
    }

    if (loading) {
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

    return (
        <div className="space-y-6 animate-in fade-in duration-500 p-4 md:p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Process Application</h1>
            <p className="text-gray-500 mt-1">
                Reviewing passport application • ID:{' '}
                <span className="font-mono font-medium">{reviewData._id}</span>
            </p>
            </div>
            <div className="flex items-center gap-3">
            {getStatusBadge(reviewData.status)}
            <Button variant="outline" size="sm" onClick={() => loadApplication(paramId)}>
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
                <Button variant="outline" onClick={handleDownloadDocuments}>
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
                    Update status, request more info, approve or reject this application.
                </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                    <Label htmlFor="status">New Status</Label>
                    <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                        <SelectTrigger>
                        <SelectValue placeholder="Select action" />
                        </SelectTrigger>
                        <SelectContent>
                        <SelectItem value="UNDER_REVIEW">Under Review</SelectItem>
                        <SelectItem value="APPROVED">Approve</SelectItem>
                        <SelectItem value="REJECTED">Reject</SelectItem>
                        {/* Add if you implement this status in backend */}
                        {/* <SelectItem value="AWAITING_DOCUMENTS">Request More Documents</SelectItem> */}
                        </SelectContent>
                    </Select>
                    </div>
                    <div className="flex items-end">
                    <Button
                        onClick={handleStatusChange}
                        disabled={loading || !selectedStatus || selectedStatus === reviewData.status}
                        className="w-full md:w-auto"
                    >
                        {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                        Update Status
                    </Button>
                    </div>
                </div>

                <div className="space-y-2">
                    <Label htmlFor="notes">Internal Notes (visible to admins only)</Label>
                    <Textarea
                    id="notes"
                    placeholder="Add comments, reasons for rejection, or instructions..."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    rows={4}
                    />
                </div>

                <div className="flex flex-wrap gap-4 pt-4 border-t">
                    <Button variant="default" className="bg-green-600 hover:bg-green-700">
                    <CheckCircle2 className="h-4 w-4 mr-2" />
                    Approve Application
                    </Button>
                    <Button variant="destructive">
                    <XCircle className="h-4 w-4 mr-2" />
                    Reject Application
                    </Button>
                    <Button variant="outline">
                    <Upload className="h-4 w-4 mr-2" />
                    Request Additional Documents
                    </Button>
                </div>
                </CardContent>
            </Card>
            </TabsContent>

            <TabsContent value="notes">
            <Card>
                <CardHeader>
                <CardTitle>Review History & Notes</CardTitle>
                </CardHeader>
                <CardContent>
                <div className="space-y-4 text-sm text-gray-600">
                    <p>
                    <strong>Created:</strong>{' '}
                    {new Date(reviewData.createdAt).toLocaleString()} by Applicant
                    </p>
                    {reviewData.reviewedAt && (
                    <p>
                        <strong>Last Reviewed:</strong>{' '}
                        {new Date(reviewData.reviewedAt).toLocaleString()} by{' '}
                        {reviewData.reviewer || 'Unknown'}
                    </p>
                    )}
                    <p className="italic">No additional notes yet.</p>
                </div>
                </CardContent>
            </Card>
            </TabsContent>
        </Tabs>
        </div>
    );
}