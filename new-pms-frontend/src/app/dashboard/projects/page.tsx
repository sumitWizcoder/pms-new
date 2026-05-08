'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '@/lib/api';
import { Plus, Folder, Calendar, Trash2, Loader2 } from 'lucide-react';
import { useState } from 'react';

export default function ProjectsPage() {
  const queryClient = useQueryClient();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [projectName, setProjectName] = useState('');
  const [projectDesc, setProjectDesc] = useState('');

  // 1. FETCH PROJECTS
  const { data: projects, isLoading, error } = useQuery({
    queryKey: ['projects'],
    queryFn: async () => {
      const res = await api.get('/projects');
      return res.data;
    },
  });

  // 2. CREATE PROJECT MUTATION
  const createMutation = useMutation({
    mutationFn: async (newProject: { name: string; description: string }) => {
      return api.post('/projects', newProject);
    },
    onSuccess: () => {
      // "Invalidate" tells React Query: "The data is old now, fetch it again!"
      queryClient.invalidateQueries({ queryKey: ['projects'] });
      setIsModalOpen(false);
      setProjectName('');
      setProjectDesc('');
    },
  });

  // 3. DELETE PROJECT MUTATION
  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      return api.delete(`/projects/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
    },
  });

  if (isLoading) return (
    <div className="h-full flex items-center justify-center">
      <Loader2 className="h-10 w-10 text-blue-600 animate-spin" />
    </div>
  );

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Projects</h1>
          <p className="text-gray-500 mt-1">Manage and track all your active projects.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all shadow-sm"
        >
          <Plus className="mr-2 h-5 w-5" />
          New Project
        </button>
      </div>

      {/* PROJECT GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects?.map((project: any) => (
          <div key={project.id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow group">
            <div className="flex justify-between items-start mb-4">
              <div className="p-2 bg-blue-50 rounded-lg">
                <Folder className="h-6 w-6 text-blue-600" />
              </div>
              <button 
                onClick={() => deleteMutation.mutate(project.id)}
                className="p-2 text-gray-400 hover:text-red-600 opacity-0 group-hover:opacity-100 transition-all"
              >
                <Trash2 className="h-5 w-5" />
              </button>
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">{project.name}</h3>
            <p className="text-sm text-gray-600 line-clamp-2 mb-6">{project.description || 'No description provided.'}</p>
            <div className="flex items-center text-xs text-gray-400">
              <Calendar className="mr-1 h-3 w-3" />
              Created {new Date(project.createdAt).toLocaleDateString()}
            </div>
          </div>
        ))}
      </div>

      {/* CREATE MODAL (Simple) */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-md w-full p-8 shadow-2xl">
            <h2 className="text-2xl font-bold mb-6">Create New Project</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Project Name</label>
                <input 
                  type="text" 
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  placeholder="e.g. Mobile App Redesign"
                  value={projectName}
                  onChange={(e) => setProjectName(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea 
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none h-32"
                  placeholder="What is this project about?"
                  value={projectDesc}
                  onChange={(e) => setProjectDesc(e.target.value)}
                />
              </div>
            </div>
            <div className="mt-8 flex space-x-3">
              <button 
                onClick={() => setIsModalOpen(false)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 font-medium"
              >
                Cancel
              </button>
              <button 
                onClick={() => createMutation.mutate({ name: projectName, description: projectDesc })}
                disabled={!projectName || createMutation.isPending}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium disabled:opacity-50"
              >
                {createMutation.isPending ? 'Creating...' : 'Create Project'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
