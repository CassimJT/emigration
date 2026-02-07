import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useAuth } from '@/features/auth/hooks/useAuth';
import { useOutletContext } from 'react-router-dom';
import { 
  Search, 
  Filter, 
  MoreHorizontal, 
  Eye, 
  Clock,
  ArrowUpDown,
  ShieldCheck,
  UserCheck
} from "lucide-react";
import { PENDING_REVIEWS } from '@/utils/constants';

export default function PendingReviewsPage() {
  const { user } = useAuth();
  const { currentRole, profile } = useOutletContext();
  const [searchQuery, setSearchQuery] = useState('');
  
  const role = (currentRole || user?.role || 'officer').toLowerCase();
  const displayName = profile?.firstName && profile.firstName !== "null" ? profile.firstName : (user?.emailAddress?.split('@')[0] || "User");
  
  const filteredReviews = useMemo(() => {
    return PENDING_REVIEWS.filter(app => 
      app.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.type.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  if (role !== 'officer' && role !== 'admin' && role !== 'superadmin') {
    return (
      <Navigate to="*" replace />
    );
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
             {`Welcome, ${displayName}. `}
             Manage and process pending passport applications.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="bg-white hover:bg-gray-50 border-gray-200">
            <Filter className="h-4 w-4 mr-2" />
            Filter
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
                placeholder="Search by ID or name..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-orange-500/10 focus:border-orange-500 transition-all bg-white"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
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
                  <th className="px-6 py-4 text-[11px] font-bold text-gray-400 uppercase tracking-widest">Submission Date</th>
                  <th className="px-6 py-4 text-[11px] font-bold text-gray-400 uppercase tracking-widest">Priority Status</th>
                  <th className="px-6 py-4 text-[11px] font-bold text-gray-400 uppercase tracking-widest text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredReviews.length > 0 ? (
                  filteredReviews.map((app) => (
                    <tr key={app.id} className="hover:bg-orange-50/30 transition-colors group">
                      <td className="px-6 py-4">
                        <span className="font-semibold text-gray-900">{app.id}</span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="font-medium text-gray-700">{app.name}</div>
                      </td>
                      <td className="px-6 py-4 text-gray-600">{app.type}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center text-gray-500 text-sm">
                          <Clock className="h-3.5 w-3.5 mr-2 text-gray-300" />
                          {app.date}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <Badge className={`font-semibold px-3 py-1 rounded-full border ${app.statusColor} shadow-none text-[10px]`}>
                          {app.status}
                        </Badge>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex justify-end gap-1 translate-x-2 opacity-0 group-hover:opacity-100 transition-all group-hover:translate-x-0">
                          <Button variant="ghost" size="icon" className="h-8 w-8 text-indigo-500 hover:text-indigo-600 hover:bg-indigo-50">
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
                    <td colSpan="6" className="px-6 py-12 text-center text-gray-500 font-medium">
                      No applications found matching your search.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
        <div className="px-6 py-4 border-t border-gray-100 bg-white/80 flex items-center justify-between">
          <p className="text-sm text-gray-500">
            Showing {filteredReviews.length} of {PENDING_REVIEWS.length} pending reviews
          </p>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" disabled className="h-8 text-xs rounded-lg">Previous</Button>
            <Button variant="outline" size="sm" className="h-8 text-xs rounded-lg hover:border-orange-500 hover:text-orange-500 transition-colors">Next</Button>
          </div>
        </div>
      </Card>
    </div>
  );
}

