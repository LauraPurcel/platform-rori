"use client";

import { useEffect, useState } from "react";
import api from "@/services/api";

type Task = {
    id: number;
    title: string;
    description: string;
    estimatedHours: number;
    status: "TODO" | "IN_PROGRESS" | "DONE";
};

const statusColors: Record<string, string> = {
    TODO: "bg-gray-100 text-gray-700",
    IN_PROGRESS: "bg-blue-100 text-blue-700",
    DONE: "bg-green-100 text-green-700",
};

export default function TasksPage() {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const loadTasks = async () => {
        try {
            const res = await api.get("/api/tasks/my");
            setTasks(res.data);
        } catch {
            setError("Nu s-au putut încărca task-urile.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadTasks();
    }, []);

    const updateStatus = async (taskId: number, status: Task["status"]) => {
        try {
            await api.put(`/api/tasks/${taskId}/status`, { status });
            setTasks(prev =>
                prev.map(t =>
                    t.id === taskId ? { ...t, status } : t
                )
            );
        } catch {
            alert("Nu s-a putut actualiza statusul task-ului.");
        }
    };

    if (loading) {
        return <p className="text-center mt-10">Se încarcă task-urile...</p>;
    }

    if (error) {
        return (
            <p className="text-center mt-10 text-red-600">
                {error}
            </p>
        );
    }

    return (
        <div className="max-w-4xl mx-auto py-10 px-4">
            <h1 className="text-3xl font-black mb-8 text-slate-800">
                Task-urile mele
            </h1>

            {tasks.length === 0 ? (
                <div className="text-slate-500 bg-slate-50 border rounded-xl p-6">
                    Nu ai task-uri asignate momentan.
                </div>
            ) : (
                <div className="space-y-4">
                    {tasks.map(task => (
                        <div
                            key={task.id}
                            className="bg-white border rounded-2xl p-6 shadow-sm
                                       hover:shadow-md transition"
                        >
                            <div className="flex justify-between items-start">
                                <div>
                                    <h2 className="text-xl font-bold text-slate-800">
                                        {task.title}
                                    </h2>
                                    <p className="text-slate-600 mt-1">
                                        {task.description}
                                    </p>
                                </div>

                                <span
                                    className={`px-3 py-1 rounded-full text-xs font-bold
                                    ${statusColors[task.status]}`}
                                >
                                    {task.status.replace("_", " ")}
                                </span>
                            </div>

                            <div className="flex items-center justify-between mt-6">
                                <p className="text-sm text-slate-500">
                                    Estimare:{" "}
                                    <strong>{task.estimatedHours}h</strong>
                                </p>

                                <select
                                    value={task.status}
                                    onChange={e =>
                                        updateStatus(
                                            task.id,
                                            e.target.value as Task["status"]
                                        )
                                    }
                                    className="border rounded-xl px-3 py-2
                                               text-sm font-semibold
                                               focus:outline-none focus:ring-2
                                               focus:ring-blue-500"
                                >
                                    <option value="TODO">TODO</option>
                                    <option value="IN_PROGRESS">
                                        IN PROGRESS
                                    </option>
                                    <option value="DONE">DONE</option>
                                </select>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
