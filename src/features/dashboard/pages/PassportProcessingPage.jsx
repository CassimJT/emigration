import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
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
import { useOutletContext, useParams, Navigate, useNavigate } from 'react-router-dom';
import {
  Loader2, AlertCircle, CheckCircle2, XCircle, FileText, MessageSquare,
  User, Clock, ShieldCheck, Download
} from "lucide-react";
import { usePassportApplication } from '@/features/passport/hooks/usePassportApplication';
import { toast } from "sonner";

const getApplicantName = (reviewData = {}) => {
  const nrb = reviewData?.applicant?.nationalId || {};
  const form = reviewData?.formData || {};
  const first = nrb.firstName || form.firstName || '';
  const sur = nrb.surName || form.surname || '';
  return `${first} ${sur}`.trim() || 'Unknown Applicant';
};

const getNationalId = (reviewData = {}) => {
  const nrb = reviewData?.applicant?.nationalId || {};
  return nrb.nationalId || reviewData?.formData?.nationalId || 'N/A';
};

const getHeight = (reviewData = {}) => {
  const h = reviewData?.formData?.height;
  return h ? `${h} cm` : 'N/A';
};

const getPlaceOfBirth = (reviewData = {}) => {
  const nrb = reviewData?.applicant?.nationalId || {};
  const form = reviewData?.formData || {};
  const pob = nrb.placeOfBirth || form.placeOfBirth || {};
  if (pob.district) {
    return `${pob.district}, ${pob.village || ''}`.trim() || 'N/A';
  }
  return 'N/A';
};

const getMothersPlaceOfBirth = (reviewData = {}) => {
  const pob = reviewData?.formData?.mothersPlaceOfBirth || 'N/A';
  return pob;
};

const getStatusBadge = (status = 'UNKNOWN') => {
  const variants = {
    DRAFT: { label: 'Draft', variant: 'secondary' },
    IN_PROGRESS: { label: 'In Progress', variant: 'secondary' },
    SUBMITTED: { label: 'Pending Review', variant: 'outline' },
    UNDER_REVIEW: { label: 'Under Review', variant: 'default' },
    APPROVED: { label: 'Approved', variant: 'success' },
    REJECTED: { label: 'Rejected', variant: 'destructive' },
    EXPIRED: { label: 'Expired', variant: 'secondary' },
  };
  const v = variants[status] || { label: status, variant: 'secondary' };
  return <Badge variant={v.variant}>{v.label}</Badge>;
};

export default function PassportProcessingPage() {
  const { applicationId: paramId } = useParams();
  const { user } = useAuth();
  const { currentRole, profile } = useOutletContext();
  const navigate = useNavigate();
  const {
    reviewData = null, 
    loading,
    error,
    initiateReview,
    approve,
    reject,
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
        console.warn("Review start failed:", err);
      }
    };

    tryStartReview();

    return () => { isMounted = false; };
  }, [paramId, initiateReview]);

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

if (error || !reviewData || (typeof reviewData === 'object' && Object.keys(reviewData).length === 0)) {
  return (
    <div className="p-8 text-center text-red-600">
      <AlertCircle className="h-12 w-12 mx-auto mb-4" />
      <h2 className="text-xl font-semibold">Cannot load application</h2>
      <p className="mt-2">
        {error || 'Application not found, invalid ID, or no data available.'}
      </p>
    </div>
  );
}

if (!['SUBMITTED', 'UNDER_REVIEW'].includes(reviewData.status)) {
  return (
    <div className="p-8 text-center text-amber-600">
      <AlertCircle className="h-12 w-12 mx-auto mb-4" />
      <h2 className="text-xl font-semibold">Application not available for review</h2>
      <p className="mt-2">
        Current status: {reviewData.status || 'Unknown'}<br />
        Only SUBMITTED or UNDER_REVIEW applications can be processed here.
      </p>
    </div>
  );
}

  const canTakeAction = reviewData.status === "UNDER_REVIEW";
  const hasRejectionReason = notes.trim().length > 0;

  const handleApprove = async () => {
    try {
      await approve(paramId);
      toast.success("Application approved", {
        description: "Immigration record has been created.",
      });
      navigate("/dashboard/passport/reviews");
      setNotes("");
    } catch (err) {
      toast.error("Approval failed", {
        description: err?.message || String(err) || "Unknown error",
      });
    }
  };

  const handleReject = async () => {
    const reason = notes.trim();
    if (!reason) {
      toast.warning("Please provide a rejection reason");
      return;
    }
    try {
      await reject(paramId, reason);
      toast.success("Application rejected", {
        description: `Reason: ${reason}`,
      });
      setNotes("");
    } catch (err) {
      toast.error("Rejection failed", {
        description: err?.message || String(err) || "Unknown error",
      });
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500 p-4 md:p-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Process Application</h1>
          <p className="text-gray-500 mt-1">
            Reviewing passport application • ID:{' '}
            <span className="font-mono font-medium">{reviewData._id || 'N/A'}</span>
          </p>
        </div>
        <div className="flex items-center gap-3">
          {getStatusBadge(reviewData.status)}
          <Button variant="outline" size="sm" onClick={() => initiateReview(paramId)}>
            Refresh
          </Button>
        </div>
      </div>

      {/* Applicant Information */}
      <Card className="border-gray-200 shadow-sm">
        <CardHeader className="bg-gray-50/50 border-b">
          <CardTitle className="flex items-center gap-3">
            <User className="h-6 w-6 text-indigo-600" />
            Applicant Information
          </CardTitle>
          <CardDescription>
            Personal details submitted by {getApplicantName(reviewData) }
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div>
              <Label className="text-sm font-medium text-gray-500">Full Name</Label>
              <p className="mt-1 font-medium">{getApplicantName(reviewData)}</p>
            </div>
            <div>
              <Label className="text-sm font-medium text-gray-500">National ID</Label>
              <p className="mt-1 font-mono">{getNationalId(reviewData)}</p>
            </div>
            <div>
              <Label className="text-sm font-medium text-gray-500">Height</Label>
              <p className="mt-1">{getHeight(reviewData)}</p>
            </div>
            <div>
              <Label className="text-sm font-medium text-gray-500">Place of Birth</Label>
              <p className="mt-1">{getPlaceOfBirth(reviewData)}</p>
            </div>
            <div>
              <Label className="text-sm font-medium text-gray-500">Mother's Place of Birth</Label>
              <p className="mt-1">{getMothersPlaceOfBirth(reviewData)}</p>
            </div>
            <div>
              <Label className="text-sm font-medium text-gray-500">Email</Label>
              <p className="mt-1">
                {reviewData?.applicant?.nationalId?.emailAddress ||
                 reviewData?.applicant?.emailAddress ||
                 reviewData?.formData?.email ||
                 'N/A'}
              </p>
            </div>
            <div>
              <Label className="text-sm font-medium text-gray-500">Passport Type</Label>
              <p className="mt-1">{reviewData?.formData?.passportType || 'Ordinary'}</p>
            </div>
            <div>
              <Label className="text-sm font-medium text-gray-500">Booklet Type</Label>
              <p className="mt-1">{reviewData?.formData?.bookletType + ' pages' || 'N/A'}</p>
            </div>
            <div>
              <Label className="text-sm font-medium text-gray-500">Service Type</Label>
              <p className="mt-1">{reviewData?.formData?.serviceType || 'Normal'}</p>
            </div>
            <div>
              <Label className="text-sm font-medium text-gray-500">Created</Label>
              <div className="flex items-center gap-2 mt-1 text-gray-600">
                <Clock className="h-4 w-4" />
                {reviewData?.createdAt ? new Date(reviewData.createdAt).toLocaleString() : 'N/A'}
              </div>
            </div>
          </div>

          <div className="border-t pt-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <FileText className="h-5 w-5 text-indigo-600" />
              Documents & Verification
            </h3>
            <div className="flex flex-wrap gap-4">
              <Button
                variant="outline"
                onClick={() => toast.info("Document download functionality not implemented yet")}
              >
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
                Approve or reject this application. Rejection requires a reason.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label
                  htmlFor="notes"
                  className={!hasRejectionReason ? "text-destructive" : ""}
                >
                  Rejection Reason / Internal Notes
                  {!hasRejectionReason && (
                    <span className="text-xs text-destructive ml-2">
                      (required for rejection)
                    </span>
                  )}
                </Label>
                <Textarea
                  id="notes"
                  placeholder="Required for rejection. Optional comments otherwise..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={4}
                  className={
                    !hasRejectionReason
                      ? "border-destructive focus-visible:ring-destructive"
                      : ""
                  }
                />
              </div>

              <div className="flex flex-wrap gap-4 pt-4 border-t">
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button
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
                  <AlertDialogContent className="bg-white rounded border-4 border-gray-300">
                    <AlertDialogHeader>
                      <AlertDialogTitle>Approve Application?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This will permanently approve the application and create an immigration record.<br /><br />
                        <strong>This action cannot be undone.</strong>
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel className="bg-red-600 hover:bg-red-700 rounded text-white">
                        Cancel
                      </AlertDialogCancel>
                      <AlertDialogAction
                        className="bg-green-600 hover:bg-green-700 text-white rounded"
                        onClick={handleApprove}
                      >
                        Yes, Approve
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>

                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button
                      variant="destructive"
                      disabled={loading || !canTakeAction || !hasRejectionReason}
                    >
                      <XCircle className="h-4 w-4 mr-2" />
                      Reject Application
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent className="bg-white rounded border-4 border-gray-300">
                    <AlertDialogHeader>
                      <AlertDialogTitle>Reject Application?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This will reject the application. A reason is required.<br /><br />
                        <strong>This action cannot be undone.</strong>
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel className="bg-green-600 hover:bg-green-700 text-white rounded">
                        Cancel
                      </AlertDialogCancel>
                      <AlertDialogAction
                        className="bg-red-600 hover:bg-red-700 text-white rounded"
                        onClick={handleReject}
                        disabled={!hasRejectionReason || loading}
                      >
                        Yes, Reject
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
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
              <p className="text-gray-600">History and notes will appear here...</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}