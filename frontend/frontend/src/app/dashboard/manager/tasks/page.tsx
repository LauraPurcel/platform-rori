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

    const handleSubmit = async (e: any) => {
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

    return (
        <div className="max-w-6xl mx-auto py-10 px-4 text-slate-800">
            <h1 className="text-3xl font-black mb-8 text-slate-800">
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

                <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
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
                            setForm({ ...form, estimatedHours: e.target.value })
                        }
                    />

                    <textarea
                        placeholder="Descriere"
                        className="border rounded-xl p-3 col-span-2"
                        value={form.description}
                        onChange={e =>
                            setForm({ ...form, description: e.target.value })
                        }
                    />

                    <select
                        required
                        className="border rounded-xl p-3 col-span-2"
                        value={form.employeeId}
                        onChange={e =>
                            setForm({ ...form, employeeId: e.target.value })
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
                        <div className="flex justify-between">
                            <div>
                                <h3 className="font-bold text-lg">
                                    {task.title}
                                </h3>
                                <p className="text-slate-600">
                                    {task.description}
                                </p>
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
                    </div>
                ))}
            </div>
        </div>
    );
}
