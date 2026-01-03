"use client";
import { useEffect, useState } from "react";
import api from "@/services/api";

export default function CollaborativeCalendar() {
    const [events, setEvents] = useState({ leaves: [], desks: [] });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        api.get("/hr/calendar/events")
            .then(res => {
                setEvents(res.data);
                setLoading(false);
            })
            .catch(() => alert("Eroare la încărcarea calendarului"));
    }, []);

    if (loading) return <div className="p-10 text-center text-slate-500 font-medium">Se generează calendarul...</div>;

    return (
        <div className="p-8 bg-slate-50 min-h-screen">
            <div className="max-w-6xl mx-auto">
                <header className="mb-8 flex justify-between items-center">
                    <div>
                        <h1 className="text-3xl font-black text-slate-800 tracking-tight">Calendar Colaborativ</h1>
                        <p className="text-slate-500">Vizualizarea prezenței echipei și a concediilor aprobate</p>
                    </div>
                    <div className="flex gap-4">
                        <div className="flex items-center gap-2 text-sm font-semibold">
                            <span className="w-4 h-4 bg-amber-400 rounded-full"></span> Concediu
                        </div>
                        <div className="flex items-center gap-2 text-sm font-semibold">
                            <span className="w-4 h-4 bg-emerald-400 rounded-full"></span> La Birou
                        </div>
                    </div>
                </header>

                <div className="bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full border-collapse">
                            <thead>
                                <tr className="bg-slate-50">
                                    <th className="p-5 text-left text-xs font-bold text-slate-400 uppercase border-b border-slate-100 sticky left-0 bg-slate-50 z-10 w-64">
                                        Angajat
                                    </th>
                                    <th className="p-5 text-left text-xs font-bold text-slate-400 uppercase border-b border-slate-100">
                                        Activitate Programată
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {/* Afișăm Concediile */}
                                {events.leaves.map((leave: any) => (
                                    <tr key={`leave-${leave.id}`} className="hover:bg-slate-50 transition-colors">
                                        <td className="p-5 font-bold text-slate-700 sticky left-0 bg-white shadow-[2px_0_5px_rgba(0,0,0,0.02)]">
                                            {leave.employee.lastName} {leave.employee.firstName}
                                        </td>
                                        <td className="p-5">
                                            <div className="inline-flex items-center bg-amber-50 text-amber-700 px-4 py-2 rounded-2xl border border-amber-100 shadow-sm animate-fade-in">
                                                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m12.728 0l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707-.707" /></svg>
                                                <span className="font-bold">{leave.startDate} {" → "} {leave.endDate}</span>
                                                <span className="ml-2 text-xs opacity-70">(Concediu aprobat)</span>
                                            </div>
                                        </td>
                                    </tr>
                                ))}

                                {/* Afișăm Rezervările de Birou */}
                                {events.desks.map((desk: any) => (
                                    <tr key={`desk-${desk.id}`} className="hover:bg-slate-50 transition-colors">
                                        <td className="p-5 font-bold text-slate-700 sticky left-0 bg-white">
                                            {desk.employee.lastName} {desk.employee.firstName}
                                        </td>
                                        <td className="p-5">
                                            <div className="inline-flex items-center bg-emerald-50 text-emerald-700 px-4 py-2 rounded-2xl border border-emerald-100 shadow-sm">
                                                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
                                                <span className="font-bold">Birou în data de {desk.date}</span>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}