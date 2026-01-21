"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import api from "@/services/api";

/* =======================
   COMPONENTS
======================= */

function StatCard({ title, value }: { title: string; value: number }) {
    return (
        <div className="bg-white rounded-2xl shadow p-6 hover:shadow-lg transition">
            <p className="text-slate-500 text-sm font-semibold uppercase tracking-wide">
                {title}
            </p>
            <p className="text-3xl font-black text-slate-800 mt-3">
                {value}
            </p>
        </div>
    );
}

function QuickAction({
    href,
    title,
    description,
    icon,
}: {
    href: string;
    title: string;
    description: string;
    icon: string;
}) {
    return (
        <Link
            href={href}
            className="group bg-slate-50 rounded-2xl p-6 border border-slate-200
                       hover:border-slate-300 hover:bg-white hover:shadow-lg
                       transition-all duration-200"
        >
            <div className="flex items-start gap-4">
                <div className="text-4xl">{icon}</div>

                <div>
                    <h3 className="text-lg font-bold text-slate-800 group-hover:text-black">
                        {title}
                    </h3>
                    <p className="text-slate-600 text-sm mt-1 leading-relaxed">
                        {description}
                    </p>
                </div>
            </div>
        </Link>
    );
}

/* =======================
   PAGE
======================= */

export default function HRDashboardHome() {
    const [stats, setStats] = useState<any>(null);

    useEffect(() => {
        api.get("/hr/stats").then((res) => setStats(res.data));
    }, []);

    if (!stats) {
        return (
            <div className="flex items-center justify-center h-64 text-slate-500">
                Se încarcă statistici...
            </div>
        );
    }

    return (
        <div className="space-y-12">
            {/* Header */}
            <div>
                <h1 className="text-4xl font-black text-slate-900">
                    Dashboard HR
                </h1>
                <p className="text-slate-600 mt-2">
                    Administrare angajați, contracte și concedii
                </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard
                    title="Angajați total"
                    value={stats.totalEmployees}
                />
                <StatCard
                    title="Contracte active"
                    value={stats.activeContracts}
                />
                <StatCard
                    title="Fără contract"
                    value={stats.uncontracted}
                />
                <StatCard
                    title="Cereri concediu"
                    value={stats.pendingLeaves}
                />
            </div>

            {/* Quick actions */}
            <div className="bg-white rounded-2xl shadow p-8 text-slate-800">
                <h2 className="text-2xl font-bold mb-6">
                    Acțiuni rapide
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <QuickAction
                        href="/dashboard/hr/leaves"
                        title="Concedii"
                        description="Aprobă, respinge și urmărește cererile de concediu"
                        icon="🏖️"
                    />
                    <QuickAction
                        href="/dashboard/hr/contracts"
                        title="Contracte"
                        description="Gestionează contractele active și istoricul"
                        icon="📄"
                    />
                    <QuickAction
                        href="/dashboard/hr/calendar"
                        title="Calendar"
                        description="Vezi programul, evenimentele și absențele"
                        icon="📅"
                    />
                </div>
            </div>
        </div>
    );
}
