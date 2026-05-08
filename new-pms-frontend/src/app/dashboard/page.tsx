'use client';

import { useAuthStore } from '@/store/useAuthStore';
import { Briefcase, CheckCircle, Clock, Plus } from 'lucide-react';
import Link from 'next/link';

export default function DashboardPage() {
  const { user } = useAuthStore();

  const stats = [
    { name: 'Active Projects', value: '0', icon: Briefcase, color: 'text-blue-600', bg: 'bg-blue-100' },
    { name: 'Pending Tasks', value: '0', icon: Clock, color: 'text-yellow-600', bg: 'bg-yellow-100' },
    { name: 'Completed Tasks', value: '0', icon: CheckCircle, color: 'text-green-600', bg: 'bg-green-100' },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard Overview</h1>
        <p className="text-gray-500 mt-2">Here is what is happening with your projects today.</p>
      </div>

      {/* STAT CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat) => (
          <div key={stat.name} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center">
            <div className={`p-3 rounded-lg ${stat.bg} mr-4`}>
              <stat.icon className={`h-6 w-6 ${stat.color}`} />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">{stat.name}</p>
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* EMPTY STATE / CALL TO ACTION */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center">
        <div className="max-w-md mx-auto">
          <div className="bg-blue-50 h-16 w-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <Briefcase className="h-8 w-8 text-blue-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900">No projects yet</h3>
          <p className="text-gray-500 mt-2">Get started by creating your first project to manage your tasks efficiently.</p>
          <div className="mt-8">
            <Link 
              href="/dashboard/projects"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 shadow-sm transition-all"
            >
              <Plus className="mr-2 h-5 w-5" />
              Create Your First Project
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
