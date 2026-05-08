'use client';

import { useQuery } from '@tanstack/react-query';
import api from '@/lib/api';
import { Briefcase, CheckCircle, Clock, Plus, Loader2 } from 'lucide-react';
import Link from 'next/link';

export default function DashboardPage() {
  // 1. FETCH PROJECTS
  const { data: projects, isLoading: projectsLoading } = useQuery({
    queryKey: ['projects'],
    queryFn: async () => {
      const res = await api.get('/projects');
      return res.data;
    },
  });

  // 2. FETCH TASKS
  const { data: tasks, isLoading: tasksLoading } = useQuery({
    queryKey: ['tasks'],
    queryFn: async () => {
      const res = await api.get('/tasks');
      return res.data;
    },
  });

  if (projectsLoading || tasksLoading) {
    return (
      <div className="h-full flex items-center justify-center">
        <Loader2 className="h-10 w-10 text-blue-600 animate-spin" />
      </div>
    );
  }

  // CALCULATE STATS
  const stats = [
    { 
      name: 'Active Projects', 
      value: projects?.length || 0, 
      icon: Briefcase, 
      color: 'text-blue-600', 
      bg: 'bg-blue-100' 
    },
    { 
      name: 'Total Tasks', 
      value: tasks?.length || 0, 
      icon: Clock, 
      color: 'text-yellow-600', 
      bg: 'bg-yellow-100' 
    },
    { 
      name: 'Completed Tasks', 
      value: tasks?.filter((t: any) => t.status === 'DONE').length || 0, 
      icon: CheckCircle, 
      color: 'text-green-600', 
      bg: 'bg-green-100' 
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard Overview</h1>
        <p className="text-gray-500 mt-2">Real-time summary of your workspace.</p>
      </div>

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

      {projects?.length === 0 && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center">
          <div className="max-w-md mx-auto">
            <h3 className="text-lg font-semibold text-gray-900">No projects yet</h3>
            <p className="text-gray-500 mt-2">Create your first project to start tracking tasks.</p>
            <div className="mt-8">
              <Link href="/dashboard/projects" className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg font-medium">
                <Plus className="mr-2 h-5 w-5" />
                Create Project
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
