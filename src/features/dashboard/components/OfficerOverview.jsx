import React from 'react';
import { 
  Users, 
  FileText, 
  CheckCircle, 
  Clock, 
  AlertCircle,
  TrendingUp
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

function StatCard({ title, value, icon: Icon, trend, colorClass }) {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-gray-500 uppercase tracking-wider">{title}</CardTitle>
        <div className={`p-2 rounded-lg ${colorClass}`}>
          <Icon className="h-5 w-5" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {trend && (
          <p className="text-xs text-green-600 flex items-center mt-1">
            <TrendingUp className="h-3 w-3 mr-1" />
            {trend}
          </p>
        )}
      </CardContent>
    </Card>
  );
}

export default function OfficerOverview() {
  const stats = [
    { 
      title: "Total Applications", 
      value: "1,284", 
      icon: FileText, 
      trend: "+12% from last month",
      colorClass: "bg-blue-50 text-blue-600"
    },
    { 
      title: "Pending Review", 
      value: "43", 
      icon: Clock, 
      colorClass: "bg-orange-50 text-orange-600"
    },
    { 
      title: "Approved Today", 
      value: "12", 
      icon: CheckCircle, 
      colorClass: "bg-green-50 text-green-600"
    },
    { 
      title: "Action Required", 
      value: "5", 
      icon: AlertCircle, 
      colorClass: "bg-red-50 text-red-600"
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Officer Dashboard</h1>
        <p className="text-gray-500">Welcome back! Here's an overview of the application processing status.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <StatCard key={stat.title} {...stat} />
        ))}
      </div>

      {/* Placeholder for Recent Applications Table */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Applications</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-40 flex items-center justify-center border-2 border-dashed border-gray-200 rounded-lg text-gray-400">
            Applications list will be implemented here
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
