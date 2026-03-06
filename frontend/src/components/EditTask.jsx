import { useState } from 'react';
import API from '../services/api';

const EditTask = ({ task, onClose, onUpdated }) => {
    const [formData, setFormData] = useState({ 
        title: task.title, 
        description: task.description, 
        status: task.status 
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await API.put(`/tasks/${task._id}`, formData);
            onUpdated(data);
        } catch (err) {
            alert("Update failed: " + (err.response?.data?.message || "Error"));
        }
    };

    return (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl animate-in fade-in zoom-in duration-200">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-slate-800">Edit Task</h2>
                    <button onClick={onClose} className="text-slate-400 hover:text-slate-600">✕</button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="text-xs font-bold text-slate-400 uppercase mb-2 block">Title</label>
                        <input 
                            required
                            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none transition"
                            value={formData.title}
                            onChange={(e) => setFormData({...formData, title: e.target.value})}
                        />
                    </div>
                    
                    <div>
                        <label className="text-xs font-bold text-slate-400 uppercase mb-2 block">Description</label>
                        <textarea 
                            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none h-24 resize-none transition"
                            value={formData.description}
                            onChange={(e) => setFormData({...formData, description: e.target.value})}
                        />
                    </div>

                    <div>
                        <label className="text-xs font-bold text-slate-400 uppercase mb-2 block">Status</label>
                        <select 
                            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none bg-white transition"
                            value={formData.status}
                            onChange={(e) => setFormData({...formData, status: e.target.value})}
                        >
                            <option value="pending">Pending</option>
                            <option value="completed">Completed</option>
                        </select>
                    </div>

                    <div className="flex space-x-3 pt-4">
                        <button type="submit" className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-xl font-bold shadow-lg transition transform active:scale-95">
                            Save Changes
                        </button>
                        <button type="button" onClick={onClose} className="flex-1 bg-slate-100 text-slate-600 py-3 rounded-xl font-bold hover:bg-slate-200 transition">
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditTask;