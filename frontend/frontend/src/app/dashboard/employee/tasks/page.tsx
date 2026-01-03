"use client";

import { useEffect, useState } from "react";
import api from "@/services/api";

export default function TasksPage() {
    const [tasks, setTasks] = useState<any[]>([]);

    useEffect(() => {
        api.get("/tasks/my").then(res => setTasks(res.data));
    }, []);

    return (
        <>
            <h2>Task-uri</h2>

            <table>
                <thead>
                    <tr>
                        <th>Descriere</th>
                        <th>Status</th>
                        <th>Estimare</th>
                    </tr>
                </thead>
                <tbody>
                    {tasks.map(t => (
                        <tr key={t.id}>
                            <td>{t.description}</td>
                            <td>{t.status}</td>
                            <td>{t.estimatedHours}h</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
}
