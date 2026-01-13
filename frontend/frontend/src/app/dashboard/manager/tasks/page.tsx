"use client";

import { useEffect, useState } from "react";
import api from "@/services/api";

type Employee = {
    id: number;
    firstName: string;
    lastName: string;
};

type Task = {
    id: number;
    title: string;
    description: string;
    estimatedHours: number;
    status: string;
    assignedTo: Employee;
};

export default function ManagerTasksPage() {
    const [employees, setEmployees] = useState<Employee[]>([]);
    const [tasks, setTasks] = useState<Task[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const [form, setForm] = useState({
        title: "",
        description: "",
        estimatedHours: "",
        employeeId: "",
    });

    const [editingTaskId, setEditingTaskId] = useState<number | null>(null);
    const [editDescription, setEditDescription] = useState("");

    /* ================= LOAD DATA ================= */

    const loadData = async () => {
        try {
            const [empRes, taskRes] = await Promise.all([
                api.get("/api/employees/eligible"),
                api.get("/api/tasks"),
            ]);
            setEmployees(empRes.data);
            setTasks(taskRes.data);
        } catch {
            setError("Eroare la încărcarea datelor.");
        }
    };

    useEffect(() => {
        loadData();
    }, []);

    /* ================= CREATE TASK ================= */

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const res = await api.post("/api/tasks", {
                title: form.title,
                description: form.description,
                estimatedHours: Number(form.estimatedHours),
                employeeId: Number(form.employeeId),
            });

            setTasks(prev => [...prev, res.data]);
            setForm({
                title: "",
                description: "",
                estimatedHours: "",
                employeeId: "",
            });
        } catch {
            setError("Nu s-a putut crea task-ul.");
        } finally {
            setLoading(false);
        }
    };

    /* ================= DELETE TASK ================= */

    const deleteTask = async (id: number) => {
        if (!confirm("Sigur vrei să ștergi acest task?")) return;

        try {
            await api.delete(`/api/tasks/${id}`);
            setTasks(prev => prev.filter(t => t.id !== id));
        } catch {
            alert("Nu s-a putut șterge task-ul.");
        }
    };

    /* ================= UPDATE DESCRIPTION ================= */

    const saveDescription = async (id: number) => {
        try {
            const res = await api.put(`/api/tasks/${id}/description`, {
                description: editDescription,
            });

            setTasks(prev =>
                prev.map(t => (t.id === id ? res.data : t))
            );
            setEditingTaskId(null);
            setEditDescription("");
        } catch {
            alert("Eroare la modificarea descrierii.");
        }
    };

    /* ================= UI ================= */

    return (
        <div className="max-w-6xl mx-auto py-10 px-4 text-slate-800">
            <h1 className="text-3xl font-black mb-8">
                Management Task-uri
            </h1>

            {/* CREATE TASK */}
            <div className="bg-white border rounded-2xl p-6 shadow mb-10">
                <h2 className="text-xl font-bold mb-4">
                    Creează task nou
                </h2>

                {error && (
                    <p className="text-red-600 mb-4">{error}</p>
                )}

                <form
                    onSubmit={handleSubmit}
                    className="grid grid-cols-2 gap-4"
                >
                    <input
                        type="text"
                        placeholder="Titlu"
                        required
                        className="border rounded-xl p-3"
                        value={form.title}
                        onChange={e =>
                            setForm({ ...form, title: e.target.value })
                        }
                    />

                    <input
                        type="number"
                        placeholder="Ore estimate"
                        required
                        className="border rounded-xl p-3"
                        value={form.estimatedHours}
                        onChange={e =>
                            setForm({
                                ...form,
                                estimatedHours: e.target.value,
                            })
                        }
                    />

                    <textarea
                        placeholder="Descriere"
                        className="border rounded-xl p-3 col-span-2"
                        value={form.description}
                        onChange={e =>
                            setForm({
                                ...form,
                                description: e.target.value,
                            })
                        }
                    />

                    <select
                        required
                        className="border rounded-xl p-3 col-span-2"
                        value={form.employeeId}
                        onChange={e =>
                            setForm({
                                ...form,
                                employeeId: e.target.value,
                            })
                        }
                    >
                        <option value="">Selectează angajat</option>
                        {employees.map(emp => (
                            <option key={emp.id} value={emp.id}>
                                {emp.firstName} {emp.lastName}
                            </option>
                        ))}
                    </select>

                    <button
                        type="submit"
                        disabled={loading}
                        className="col-span-2 bg-emerald-600 hover:bg-emerald-700
                                   text-white font-bold py-3 rounded-xl transition
                                   disabled:bg-slate-400"
                    >
                        {loading ? "Se creează..." : "Creează task"}
                    </button>
                </form>
            </div>

            {/* TASK LIST */}
            <div className="space-y-4">
                {tasks.map(task => (
                    <div
                        key={task.id}
                        className="bg-white border rounded-xl p-5 shadow-sm"
                    >
                        <div className="flex justify-between gap-6">
                            <div className="flex-1">
                                <h3 className="font-bold text-lg">
                                    {task.title}
                                </h3>

                                {editingTaskId === task.id ? (
                                    <textarea
                                        className="border rounded-lg p-2 w-full mt-2"
                                        value={editDescription}
                                        onChange={e =>
                                            setEditDescription(e.target.value)
                                        }
                                    />
                                ) : (
                                    <p className="text-slate-600 mt-2">
                                        {task.description}
                                    </p>
                                )}

                                <p className="text-sm text-slate-500 mt-2">
                                    Asignat:{" "}
                                    <strong>
                                        {task.assignedTo.firstName}{" "}
                                        {task.assignedTo.lastName}
                                    </strong>
                                </p>
                            </div>

                            <div className="text-right">
                                <span className="text-sm font-semibold">
                                    {task.status}
                                </span>
                                <p className="text-sm text-slate-500">
                                    {task.estimatedHours}h
                                </p>
                            </div>
                        </div>

                        {/* ACTIONS */}
                        <div className="flex gap-3 mt-4">
                            {editingTaskId === task.id ? (
                                <>
                                    <button
                                        onClick={() =>
                                            saveDescription(task.id)
                                        }
                                        className="px-4 py-1 rounded-lg
                                                   bg-emerald-600 text-white"
                                    >
                                        Salvează
                                    </button>
                                    <button
                                        onClick={() => {
                                            setEditingTaskId(null);
                                            setEditDescription("");
                                        }}
                                        className="px-4 py-1 rounded-lg
                                                   bg-slate-400 text-white"
                                    >
                                        Anulează
                                    </button>
                                </>
                            ) : (
                                <>
                                    <button
                                        onClick={() => {
                                            setEditingTaskId(task.id);
                                            setEditDescription(
                                                task.description
                                            );
                                        }}
                                        className="px-4 py-1 rounded-lg
                                                   bg-blue-600 text-white"
                                    >
                                        Editează
                                    </button>
                                    <button
                                        onClick={() =>
                                            deleteTask(task.id)
                                        }
                                        className="px-4 py-1 rounded-lg
                                                   bg-red-600 text-white"
                                    >
                                        Șterge
                                    </button>
                                </>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
