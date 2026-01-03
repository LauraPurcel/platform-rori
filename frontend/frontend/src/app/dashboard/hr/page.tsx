"use client";

import { useEffect, useState } from "react";
import api from "@/services/api";

export default function HRDashboardHome() {
    const [stats, setStats] = useState<any>(null);

    useEffect(() => {
        api.get("/hr/stats").then(res => setStats(res.data));
    }, []);

    if (!stats) return <p>Se încarcă statistici...</p>;

    return (
        <div>
            <h1 className="text-3xl font-black mb-8">Dashboard HR</h1>

            {/* Stat cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
                <StatCard title="Angajați total" value={stats.totalEmployees} />
                <StatCard title="Contracte active" value={stats.activeContracts} />
                <StatCard title="Fără contract" value={stats.uncontracted} />
                <StatCard title="Cereri concediu" value={stats.pendingLeaves} />
            </div>

            {/* Info section */}
            <div className="bg-white rounded-2xl shadow p-6">
                <h2 className="text-xl font-bold mb-4">Activitate recentă</h2>
                <p className="text-slate-600">
                    Gestionează contracte, concedii și datele angajaților din meniul din stânga.
                </p>
            </div>
        </div>
    );
}

function StatCard({ title, value }: { title: string; value: number }) {
    return (
        <div className="bg-white rounded-2xl shadow p-6">
            <p className="text-slate-500 text-sm font-semibold uppercase">{title}</p>
            <p className="text-3xl font-black text-slate-800 mt-2">{value}</p>
        </div>
    );
}
