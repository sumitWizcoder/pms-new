'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '@/lib/api';
import { Plus, CheckCircle2, Clock, AlertCircle, User, Layout, Loader2 } from 'lucide-react';
import { useState } from 'react';

export default function TasksPage() {
  const queryClient = useQueryClient();
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Form State
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [projectId, setProjectId] = useState('');
  const [priority, setPriority] = useState('MEDIUM');
  const [assigneeId, setAssigneeId] = useState('');

  // 1. FETCH DATA (Tasks, Projects, and Users)
  const { data: tasks, isLoading: tasksLoading } = useQuery({
    queryKey: ['tasks'],
    queryFn: async () => {
      const res = await api.get('/tasks');
      return res.data;
    },
  });

  const { data: projects } = useQuery({
    queryKey: ['projects'],
    queryFn: async () => {
      const res = await api.get('/projects');
      return res.data;
    },
  });

  const { data: users } = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const res = await api.get('/auth/users');
      return res.data;
    },
  });

  // 2. CREATE TASK MUTATION
  const createMutation = useMutation({
    mutationFn: async (newTask: any) => {
      return api.post('/tasks', newTask);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
      setIsModalOpen(false);
      resetForm();
    },
  });

  // 3. UPDATE STATUS MUTATION
  const updateStatusMutation = useMutation({
    mutationFn: async ({ id, status }: { id: string, status: string }) => {
      return api.patch(`/tasks/${id}`, { status });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
  });

  const resetForm = () => {
    setTitle('');
    setDescription('');
    setProjectId('');
    setPriority('MEDIUM');
    setAssigneeId('');
  };

  if (tasksLoading) return (
    <div className="h-full flex items-center justify-center">
      <Loader2 className="h-10 w-10 text-blue-600 animate-spin" />
    </div>
  );

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Task Board</h1>
          <p className="text-gray-500 mt-1">Track and manage your project deliverables.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all shadow-sm"
        >
          <Plus className="mr-2 h-5 w-5" />
          Add Task
        </button>
      </div>

      {/* TASK LIST */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-4 text-sm font-semibold text-gray-900 w-12"></th>
              <th className="px-6 py-4 text-sm font-semibold text-gray-900">Task</th>
              <th className="px-6 py-4 text-sm font-semibold text-gray-900">Project</th>
              <th className="px-6 py-4 text-sm font-semibold text-gray-900">Priority</th>
              <th className="px-6 py-4 text-sm font-semibold text-gray-900">Assignee</th>
              <th className="px-6 py-4 text-sm font-semibold text-gray-900">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {tasks?.map((task: any) => (
              <tr key={task.id} className={`hover:bg-gray-50 transition-colors ${task.status === 'DONE' ? 'opacity-60 bg-gray-50' : ''}`}>
                <td className="px-6 py-4">
                  <button 
                    onClick={() => updateStatusMutation.mutate({ 
                      id: task.id, 
                      status: task.status === 'DONE' ? 'TODO' : 'DONE' 
                    })}
                    className={`h-6 w-6 rounded-full border-2 flex items-center justify-center transition-all ${
                      task.status === 'DONE' ? 'bg-green-500 border-green-500 text-white' : 'border-gray-300 hover:border-blue-500'
                    }`}
                  >
                    {task.status === 'DONE' && <CheckCircle2 className="h-4 w-4" />}
                  </button>
                </td>
                <td className="px-6 py-4">
                  <div className={`text-sm font-medium ${task.status === 'DONE' ? 'text-gray-400 line-through' : 'text-gray-900'}`}>
                    {task.title}
                  </div>
                  <div className="text-xs text-gray-500 line-clamp-1">{task.description}</div>
                </td>
                <td className="px-6 py-4">
                  <span className="inline-flex items-center text-xs text-gray-600">
                    <Layout className="mr-1 h-3 w-3" />
                    {task.project?.name}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase ${
                    task.priority === 'URGENT' ? 'bg-red-100 text-red-700' :
                    task.priority === 'HIGH' ? 'bg-orange-100 text-orange-700' :
                    task.priority === 'MEDIUM' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700'
                  }`}>
                    {task.priority}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center text-sm text-gray-600">
                    <User className="mr-2 h-4 w-4 text-gray-400" />
                    {task.assignee?.name || 'Unassigned'}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="flex items-center text-xs font-medium text-yellow-600">
                    <Clock className="mr-1 h-3 w-3" />
                    {task.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {tasks?.length === 0 && (
          <div className="p-12 text-center text-gray-500">
            No tasks found. Click "Add Task" to get started.
          </div>
        )}
      </div>

      {/* CREATE TASK MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-lg w-full p-8 shadow-2xl overflow-y-auto max-h-[90vh]">
            <h2 className="text-2xl font-bold mb-6">Create New Task</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Task Title</label>
                <input 
                  type="text" 
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  placeholder="e.g. Design Login Page"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Project</label>
                  <select 
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                    value={projectId}
                    onChange={(e) => setProjectId(e.target.value)}
                  >
                    <option value="">Select Project</option>
                    {projects?.map((p: any) => <option key={p.id} value={p.id}>{p.name}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
                  <select 
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                    value={priority}
                    onChange={(e) => setPriority(e.target.value)}
                  >
                    <option value="LOW">Low</option>
                    <option value="MEDIUM">Medium</option>
                    <option value="HIGH">High</option>
                    <option value="URGENT">Urgent</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Assign To</label>
                <select 
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  value={assigneeId}
                  onChange={(e) => setAssigneeId(e.target.value)}
                >
                  <option value="">Unassigned</option>
                  {users?.map((u: any) => <option key={u.id} value={u.id}>{u.name} ({u.email})</option>)}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea 
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none h-24"
                  placeholder="Task details..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
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
                onClick={() => createMutation.mutate({ title, description, projectId, priority, assigneeId })}
                disabled={!title || !projectId || createMutation.isPending}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium disabled:opacity-50"
              >
                {createMutation.isPending ? 'Creating...' : 'Create Task'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
