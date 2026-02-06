import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { 
  BarChart3, 
  Clock, 
  CheckCircle2, 
  Calendar,
  ShieldCheck,
  TrendingUp,
  MapPin
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MetricCard } from '../components/MetricCard';
import { useAuth } from '@/features/auth/hooks/useAuth';
import { useOutletContext } from 'react-router-dom';
import { useState } from 'react';

export default function StatisticsPage() {
  const { user, isAuthenticated } = useAuth();
  const { currentRole, profile } = useOutletContext();
  
  const role = (currentRole || user?.role || 'officer').toLowerCase();
  const displayName = profile?.firstName && profile.firstName !== "null" ? profile.firstName : (user?.emailAddress?.split('@')[0] || "User");

  return (
    <div className="space-y-6 animate-in slide-in-from-bottom-2 duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
             <h1 className="text-2xl font-bold text-gray-900">Application Statistics</h1>
             <Badge variant="secondary" className="bg-orange-50 text-orange-700 border-orange-100 flex items-center">
                <ShieldCheck className="h-3 w-3 mr-1" />
                {role} analytics
             </Badge>
          </div>
          <p className="text-gray-500">
            {`Welcome back, ${displayName}. `}
            Analytics and performance metrics for the current period.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="bg-white border-gray-200">
            <Calendar className="h-4 w-4 mr-2 text-orange-500" />
            Last 30 Days
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <MetricCard 
          title="Total Processed" 
          value="2,842" 
          change="+14.5%" 
          icon={CheckCircle2} 
          colorClass="text-green-500"
        />
        
        <MetricCard 
          title="Avg. Processing Time" 
          value="4.2 Days" 
          change="-1.5 days" 
          icon={Clock} 
          colorClass="text-orange-500"
        />
        <MetricCard 
          title="Approval Rate" 
          value="92.4%" 
          change="+2.1%" 
          icon={BarChart3} 
          colorClass="text-indigo-500"
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Weekly Volume Chart Placeholder */}
        <Card className="border-gray-200 shadow-sm bg-white overflow-hidden">
          <CardHeader className="pb-0">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-lg">Application Volume</CardTitle>
                <CardDescription>Weekly trend of submitted applications</CardDescription>
              </div>
              <TrendingUp className="h-5 w-5 text-green-500" />
            </div>
          </CardHeader>
          <CardContent className="h-64 flex flex-col justify-end gap-2 px-6 pb-6">
            <div className="flex items-end justify-between h-48 gap-3">
              {[40, 65, 45, 90, 75, 55, 80].map((height, i) => (
                <div key={i} className="flex-1 space-y-3 group cursor-pointer">
                  <div 
                    className="w-full bg-orange-50/50 group-hover:bg-orange-100 transition-all rounded-t-lg relative overflow-hidden"
                    style={{ height: `${height}%` }}
                  >
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-orange-500 to-orange-400 h-full rounded-t-lg transform origin-bottom scale-y-[0.85] group-hover:scale-y-100 transition-transform duration-500" />
                    
                    <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-gray-900 border border-gray-800 text-white text-[10px] px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-all transform translate-y-2 group-hover:translate-y-0 whitespace-nowrap z-10 shadow-xl">
                      {height * 10} applications
                    </div>
                  </div>
                  <div className="text-[10px] font-bold text-gray-400 text-center uppercase tracking-tighter">
                    {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][i]}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* regional Distribution */}
        <Card className="border-gray-200 shadow-sm bg-white overflow-hidden">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-lg">Regional Distribution</CardTitle>
                <CardDescription>Applications by geographic region</CardDescription>
              </div>
              <MapPin className="h-5 w-5 text-indigo-500" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-5 pt-2">
              {[
                { region: 'Northern Region', count: 850, percentage: 65, color: 'bg-indigo-500', bg: 'bg-indigo-50' },
                { region: 'Central Region', count: 1200, percentage: 90, color: 'bg-orange-500', bg: 'bg-orange-50' },
                { region: 'Southern Region', count: 650, percentage: 45, color: 'bg-emerald-500', bg: 'bg-emerald-50' },
                { region: 'International', count: 142, percentage: 15, color: 'bg-slate-500', bg: 'bg-slate-50' },
              ].map((item) => (
                <div key={item.region} className="space-y-2 group">
                  <div className="flex justify-between items-end">
                    <div>
                      <span className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-0.5">{item.region}</span>
                      <span className="text-lg font-bold text-gray-700">{item.count}</span>
                    </div>
                    <span className="text-xs font-medium text-gray-400 bg-gray-50 px-2 py-1 rounded-md">{item.percentage}% of total</span>
                  </div>
                  <div className={`h-2.5 w-full ${item.bg} rounded-full overflow-hidden p-0.5`}>
                    <div 
                      className={`h-full ${item.color} rounded-full transition-all duration-1000 ease-out shadow-sm`} 
                      style={{ width: `${item.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Target Metrics */}
      <Card className="border-gray-200 shadow-sm bg-gray-50/30">
        <CardHeader>
          <CardTitle className="text-lg text-indigo-950 font-bold">Performance Goals</CardTitle>
          <CardDescription>Current progress against quarterly processing targets</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-3">
            {[
              { label: 'Review Speed', target: '24h', current: '18h', progress: 85, color: 'bg-orange-500' },
              { label: 'Accuracy Rate', target: '99.9%', current: '99.2%', progress: 95, color: 'bg-emerald-500' },
              { label: 'Customer CSAT', target: '4.8/5', current: '4.6/5', progress: 78, color: 'bg-indigo-500'  },
            ].map((goal) => (
              <div key={goal.label} className="p-5 rounded-2xl border border-white bg-white shadow-sm transition-all hover:shadow-md group">
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">{goal.label}</p>
                <div className="flex items-baseline gap-2 mb-4">
                  <span className="text-2xl font-black text-gray-900 tracking-tight">{goal.current}</span>
                  <span className="text-[10px] font-medium text-gray-400 bg-gray-50 px-1.5 py-0.5 rounded">Target: {goal.target}</span>
                </div>
                <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                  <div 
                    className={`h-full ${goal.color} rounded-full transition-all duration-1000 delay-300 shadow-[0_0_10px_rgba(0,0,0,0.1)]`} 
                    style={{ width: `${goal.progress}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

