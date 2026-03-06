import { useEffect, useState, useCallback } from 'react';
import API from '../services/api';
import AddTask from './AddTask';
import EditTask from './EditTask';

const Dashboard = ({ setToken }) => {
    const [tasks, setTasks] = useState([]);
    const [editingTask, setEditingTask] = useState(null);
    const userName = localStorage.getItem('userName') || 'User';
    const role = localStorage.getItem('role');

    const fetchTasks = useCallback(async () => {
        try {
            const { data } = await API.get('/tasks');
            setTasks(data);
        } catch (err) {
            console.error("Fetch Error:", err);
        }
    }, []);

    useEffect(() => {
        fetchTasks();
    }, [fetchTasks]);

    const handleLogout = () => {
        localStorage.clear();
        setToken(null);
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure?")) {
            try {
                await API.delete(`/tasks/${id}`);
                setTasks(prev => prev.filter(t => t._id !== id));
            } catch (err) {
                alert("Action failed: " + (err.response?.data?.message || "Error"));
            }
        }
    };

    return (
        <div className="min-h-screen bg-slate-50">
            {/* Responsive Navbar */}
            <nav className="bg-white border-b border-slate-200 px-4 sm:px-8 py-4 sticky top-0 z-20">
                <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
                    <div className="flex items-center space-x-3 w-full sm:w-auto">
                        <div className="h-10 w-10 bg-indigo-600 rounded-full flex items-center justify-center text-white font-bold shrink-0">
                            {userName[0].toUpperCase()}
                        </div>
                        <div className="overflow-hidden">
                            <h2 className="text-sm font-bold text-slate-800 truncate">Welcome, {userName}</h2>
                            <span className="text-[10px] bg-slate-100 px-2 py-0.5 rounded text-slate-500 uppercase font-bold tracking-tight">
                                {role} Account
                            </span>
                        </div>
                    </div>
                    
                    <div className="flex items-center justify-between w-full sm:w-auto sm:space-x-4">
                        <AddTask onTaskAdded={(newTask) => setTasks([newTask, ...tasks])} />
                        <button 
                            onClick={handleLogout} 
                            className="text-xs font-bold text-slate-400 hover:text-red-600 uppercase transition px-3 py-2"
                        >
                            Logout
                        </button>
                    </div>
                </div>
            </nav>

            {/* Responsive Task Grid */}
            <main className="p-4 sm:p-8 max-w-7xl mx-auto">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                    {tasks.map((task) => (
                        <div key={task._id} className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition flex flex-col justify-between">
                            <div>
                                <div className="flex justify-between items-start mb-4">
                                    <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase border ${
                                        task.status === 'completed' ? 'bg-green-50 text-green-700 border-green-100' : 'bg-amber-50 text-amber-700 border-amber-100'
                                    }`}>
                                        {task.status}
                                    </span>
                                    <div className="flex space-x-3 text-slate-400">
                                        <button onClick={() => setEditingTask(task)} className="hover:text-indigo-600 text-sm font-semibold">Edit</button>
                                        <button onClick={() => handleDelete(task._id)} className="hover:text-red-600 text-sm font-semibold">Delete</button>
                                    </div>
                                </div>
                                <h3 className="text-lg font-bold text-slate-800 mb-2 leading-snug">{task.title}</h3>
                                <p className="text-slate-500 text-sm mb-4 line-clamp-3 leading-relaxed">{task.description}</p>
                            </div>
                            <div className="pt-4 border-t border-slate-100 flex justify-between items-center text-[10px] text-slate-400 font-bold uppercase tracking-tighter">
                                <span>Owner: {task.user?.name || userName}</span>
                                <span>ID: ...{task._id.slice(-5)}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </main>

            {editingTask && (
                <EditTask 
                    task={editingTask} 
                    onClose={() => setEditingTask(null)} 
                    onUpdated={(updated) => {
                        setTasks(tasks.map(t => t._id === updated._id ? updated : t));
                        setEditingTask(null);
                    }} 
                />
            )}
        </div>
    );
};

export default Dashboard;