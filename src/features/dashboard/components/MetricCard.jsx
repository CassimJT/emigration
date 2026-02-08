import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import React from 'react';

export function MetricCard({ title, value, change, icon: Icon, colorClass }) {
  return (
    <Card className="border-gray-200 shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-gray-500 uppercase">{title}</CardTitle>
        <Icon className={`h-4 w-4 ${colorClass}`} />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-gray-900">{value}</div>
        <p className={`text-xs mt-1 ${change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
          {change} <span className="text-gray-400">vs last month</span>
        </p>
      </CardContent>
    </Card>
  );
}
