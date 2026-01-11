"use client";

import { useEffect, useState } from "react";
import api from "@/services/api";

type Notification = {
    id: number;
    title: string;
    message: string;
    createdAt: string;
    read: boolean;
};

export default function HRNotificationsPage() {
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const [loading, setLoading] = useState(true);

    const loadNotifications = async () => {
        try {
            const res = await api.get("/api/notifications");
            setNotifications(res.data);
        } catch (err) {
            console.error("Eroare la notificări", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadNotifications();
    }, []);

    const markAsRead = async (id: number) => {
        try {
            await api.put(`/api/notifications/${id}/read`);
            setNotifications(prev =>
                prev.filter(n => n.id !== id)
            );
        } catch (err) {
            console.error("Eroare mark as read", err);
        }
    };

    if (loading) {
        return <div className="p-8">Se încarcă notificările...</div>;
    }

    return (
        <div className="min-h-screen bg-gray-50 p-8 text-slate-900">
            <h1 className="text-3xl font-black mb-6">Notificări HR</h1>

            {notifications.length === 0 ? (
                <div className="bg-white p-6 rounded-xl shadow">
                    Nu există notificări noi.
                </div>
            ) : (
                <div className="space-y-4">
                    {notifications.map(n => (
                        <div
                            key={n.id}
                            className="bg-white p-6 rounded-xl shadow border-l-4 border-blue-600"
                        >
                            <div className="flex justify-between items-start">
                                <div>
                                    <h2 className="font-bold text-lg">{n.title}</h2>
                                    <p className="text-slate-600 mt-1">{n.message}</p>
                                    <p className="text-xs text-slate-400 mt-2">
                                        {new Date(n.createdAt).toLocaleString("ro-RO")}
                                    </p>
                                </div>

                                <button
                                    onClick={() => markAsRead(n.id)}
                                    className="text-sm text-blue-600 hover:underline"
                                >
                                    Marchează ca citită
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
