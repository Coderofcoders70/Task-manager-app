import { useState } from 'react';
import API from '../services/api';

const AddTask = ({ onTaskAdded }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [task, setTask] = useState({ title: '', description: '' });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await API.post('/tasks', task);
            onTaskAdded(data);
            setIsOpen(false);
            setTask({ title: '', description: '' });
        } catch (err) {
            alert("Failed to create task ", err);
        }
    };

    return (
        <>
            <button 
                onClick={() => setIsOpen(true)}
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-xl font-semibold shadow-lg transition transform active:scale-95"
            >
                + Create New Task
            </button>

            {isOpen && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl">
                        <h2 className="text-2xl font-bold text-gray-800 mb-6">New Task</h2>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <input 
                                required
                                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-indigo-500 outline-none"
                                placeholder="Task Title"
                                value={task.title}
                                onChange={(e) => setTask({...task, title: e.target.value})}
                            />
                            <textarea 
                                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-indigo-500 outline-none h-32"
                                placeholder="Description (optional)"
                                value={task.description}
                                onChange={(e) => setTask({...task, description: e.target.value})}
                            />
                            <div className="flex space-x-3 pt-2">
                                <button type="submit" className="flex-1 bg-indigo-600 text-white py-3 rounded-xl font-bold">Add Task</button>
                                <button type="button" onClick={() => setIsOpen(false)} className="flex-1 bg-gray-100 text-gray-600 py-3 rounded-xl font-bold">Cancel</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
};

export default AddTask;