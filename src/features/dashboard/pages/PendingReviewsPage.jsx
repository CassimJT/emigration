import React from 'react';
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useAuth } from '@/features/auth/hooks/useAuth';
import { Navigate, useNavigate, useOutletContext } from 'react-router-dom';
import {
  Search,
  Filter,
  MoreHorizontal,
  Eye,
  Clock,
  ArrowUpDown,
  ShieldCheck,
  UserCheck,
  Loader2,
  AlertCircle
} from "lucide-react";
import { usePassportApplication } from '@/features/passport/hooks/usePassportApplication';
import { StatusFilter } from '../components/StatusFilter';

const getApplicantName = (formData) => {
  const personal = formData?.[2] || {};
  return `${personal.name || ''} ${personal.surname || ''}`.trim() || 'Unknown Applicant';
};

const getStatusBadge = (status) => {
  const variants = {
    DRAFT: { label: 'Draft', color: 'bg-gray-100 text-gray-700 border-gray-300' },
    SUBMITTED: { label: 'Pending Review', color: 'bg-yellow-100 text-yellow-800 border-yellow-300' },
    'In Review': { label: 'In Review', color: 'bg-blue-100 text-blue-800 border-blue-300' },
    APPROVED: { label: 'Approved', color: 'bg-green-100 text-green-800 border-green-300' },
    REJECTED: { label: 'Rejected', color: 'bg-red-100 text-red-800 border-red-300' },
  };
  const variant = variants[status] || { label: status || 'Unknown', color: 'bg-gray-100 text-gray-700' };
  return (
    <Badge className={`font-semibold px-3 py-1 rounded-full border ${variant.color} shadow-none text-[10px]`}>
      {variant.label}
    </Badge>
  );
};

 const statusOptions = [
    { label: "All Statuses", value: "" },
    { label: "Draft", value: "DRAFT" },
    { label: "In Progress", value: "IN_PROGRESS" },
    { label: "Submitted", value: "SUBMITTED" },
    { label: "Under Review", value: "UNDER_REVIEW" },
    { label: "Approved", value: "APPROVED" },
    { label: "Rejected", value: "REJECTED" },
    { label: "Expired", value: "EXPIRED" },
    ] 

    
    export default function PendingReviewsPage() {
      const { user } = useAuth();
      const navigate = useNavigate();
      const { currentRole, profile } = useOutletContext();
      
      const {
        reviewQueue,
        applicationStatus,
        setApplicationStatus,
        pagination,
        loading,
        error,
        loadReviewQueue,
        changePage,
      } = usePassportApplication();
      
  React.useEffect(() => {
    loadReviewQueue({ page: 1, status:{applicationStatus} }); // defaults: status="SUBMITTED", limit=10
  }, [applicationStatus, loadReviewQueue]);

  const [searchQuery, setSearchQuery] = React.useState('');
  const role = (currentRole || user?.role || 'officer').toLowerCase();
  const displayName = profile?.firstName && profile.firstName !== "null"
    ? profile.firstName
    : (user?.emailAddress?.split('@')[0] || "User");

  const filteredApplications = React.useMemo(() => {
    if (!reviewQueue?.length) {console.log("zero applications"); return [];}
    const query = searchQuery.toLowerCase().trim();
    return reviewQueue.filter(app => {
      const name = getApplicantName(app.formData).toLowerCase();
      const id = app._id?.toLowerCase() || '';
      const type = app.type?.toLowerCase() || '';
      return id.includes(query) || name.includes(query) || type.includes(query);
    });
  }, [reviewQueue, searchQuery]);

  if (!['officer', 'admin', 'superadmin'].includes(role)) {
    return <Navigate to="*" replace />;
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h1 className="text-2xl font-bold text-gray-900">Pending Reviews</h1>
            <Badge variant="secondary" className="bg-indigo-50 text-indigo-700 border-indigo-100 px-2 py-0">
              {role === 'admin' ? <ShieldCheck className="h-3 w-3 mr-1" /> : <UserCheck className="h-3 w-3 mr-1" />}
              {role} view
            </Badge>
          </div>
          <p className="text-gray-500">
            Welcome, {displayName}. Manage and process pending passport applications.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => loadReviewQueue({ page: pagination.page })}
            disabled={loading}
            className="h-8 text-xs rounded-lg hover:border-orange-500 hover:text-orange-500 transition-colors"
          >
            Refresh
          </Button>
          <Button variant="ghost" size="sm">
            <StatusFilter
              value={applicationStatus || ""}
              onChange={(newStatus) => setApplicationStatus(newStatus)}
              statusOptions={statusOptions}
            />
          </Button>
        </div>
      </div>

      <Card className="border-gray-200/60 shadow-sm overflow-hidden bg-white/50 backdrop-blur-sm">
        <CardHeader className="bg-white/80 border-b border-gray-100/80 py-4">
          <div className="flex items-center gap-4">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search by ID, name or type..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-orange-500/10 focus:border-orange-500 transition-all bg-white"
              />
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-0">
          {loading ? (
            <div className="py-12 text-center text-gray-500">
              <Loader2 className="h-8 w-8 animate-spin mx-auto mb-2" />
              Loading applications...
            </div>
          ) : error ? (
            <div className="py-12 text-center text-red-600">
              <AlertCircle className="h-8 w-8 mx-auto mb-2" />
              {error}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50/50 border-b border-gray-100">
                    <th className="px-6 py-4 text-[11px] font-bold text-gray-400 uppercase tracking-widest">
                      <div className="flex items-center gap-2">
                        Application ID
                        <ArrowUpDown className="h-3 w-3" />
                      </div>
                    </th>
                    <th className="px-6 py-4 text-[11px] font-bold text-gray-400 uppercase tracking-widest">Applicant Name</th>
                    <th className="px-6 py-4 text-[11px] font-bold text-gray-400 uppercase tracking-widest">Type</th>
                    <th className="px-6 py-4 text-[11px] font-bold text-gray-400 uppercase tracking-widest">Created Date</th>
                    <th className="px-6 py-4 text-[11px] font-bold text-gray-400 uppercase tracking-widest">Status</th>
                    <th className="px-6 py-4 text-[11px] font-bold text-gray-400 uppercase tracking-widest text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filteredApplications.length > 0 ? (
                    filteredApplications.map((app) => (
                      <tr key={app._id} className="hover:bg-orange-50/30 transition-colors group">
                        <td className="px-6 py-4">
                          <span className="font-semibold text-gray-900">{app._id}</span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="font-medium text-gray-700">{getApplicantName(app.formData)}</div>
                        </td>
                        <td className="px-6 py-4 text-gray-600">{app.type || 'Ordinary'}</td>
                        <td className="px-6 py-4">
                          <div className="flex items-center text-gray-500 text-sm">
                            <Clock className="h-3.5 w-3.5 mr-2 text-gray-300" />
                            {new Date(app.createdAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          {getStatusBadge(app.status)}
                        </td>
                        <td className="px-6 py-4 text-right">
                          <div className="flex justify-end gap-1 translate-x-2 opacity-0 group-hover:opacity-100 transition-all group-hover:translate-x-0">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 text-indigo-500 hover:text-indigo-600 hover:bg-indigo-50"
                              onClick={() => navigate(`/dashboard/passport/process/${app._id}`)}
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-gray-600">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={6} className="px-6 py-12 text-center text-gray-500 font-medium">
                        {searchQuery.trim()
                          ? `No applications found matching "${searchQuery.trim()}"`
                          : "No pending applications found"}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>

        {/* Pagination Controls */}
        <div className="px-6 py-4 border-t border-gray-100 bg-white/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm">
          <p className="text-gray-600">
            Showing {filteredApplications.length} of {pagination.total || 0} applications
            {pagination.total > 0 && ` (page ${pagination.page} of ${pagination.pages})`}
          </p>

          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="sm"
              disabled={pagination.page <= 1 || loading}
              onClick={() => changePage(pagination.page - 1)}
              className="h-8 text-xs rounded-lg"
            >
              Previous
            </Button>

            <span className="font-medium min-w-[80px] text-center">
              Page {pagination.page} / {pagination.pages || 1}
            </span>

            <Button
              variant="outline"
              size="sm"
              disabled={pagination.page >= pagination.pages || loading}
              onClick={() => changePage(pagination.page + 1)}
              className="h-8 text-xs rounded-lg hover:border-orange-500 hover:text-orange-500 transition-colors"
            >
              Next
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}