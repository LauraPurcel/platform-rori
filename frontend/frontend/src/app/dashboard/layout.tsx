"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { getUserFromToken } from "@/utils/auth";

export default function EmployeeLayout({ children }: { children: React.ReactNode }) {
    const [mounted, setMounted] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        setMounted(true);
    }, []);

    const user = getUserFromToken();
    const role = user?.role;

    if (!mounted) {
        return (
            <div className="flex h-screen w-full items-center justify-center bg-slate-50">
                <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    if (!role) {
        return (
            <div className="flex h-screen items-center justify-center bg-slate-50">
                <div className="text-center p-8 bg-white rounded-xl shadow-xl border border-slate-200 max-w-sm">
                    <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                    </div>
                    <h2 className="text-xl font-bold text-slate-800 mb-2">Acces Restricționat</h2>
                    <p className="text-slate-600 mb-6">Sesiunea a expirat sau nu ai permisiuni.</p>
                    <Link href="/login" className="inline-block w-full py-2.5 bg-blue-600 text-white rounded-lg font-medium transition-colors hover:bg-blue-700">
                        Înapoi la Login
                    </Link>
                </div>
            </div>
        );
    }

    const menuItems = [
        { href: "/dashboard/employee", label: "Dashboard", roles: ["EMPLOYEE", "MANAGER", "HR_MANAGER"], iconPath: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" },
        { href: "/dashboard/hr", label: "Home", roles: ["HR_MANAGER"], iconPath: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" },
        { href: "/dashboard/employee/leave", label: "Concediu", roles: ["EMPLOYEE"], iconPath: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" },
        { href: "/dashboard/employee/office", label: "Birou fizic", roles: ["EMPLOYEE", "MANAGER"], iconPath: "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" },
        { href: "/dashboard/employee/contract-log", label: "Istoric contract", roles: ["EMPLOYEE", "MANAGER"], iconPath: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" },
        { href: "/dashboard/hr/contract-logs", label: "Istoric Modificari Contracte", roles: ["HR_MANAGER"], iconPath: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" },
        { href: "/dashboard/hr/contracts", label: "Gestiune Contracte", roles: ["HR_MANAGER"], iconPath: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" },
        { href: "/dashboard/hr/notifications", label: "Notificări", roles: ["HR_MANAGER"], iconPath: "M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" },
        { href: "/dashboard/employee/tasks", label: "Taskuri Personale", roles: ["EMPLOYEE"], iconPath: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" },
        { href: "/dashboard/manager/tasks", label: "Management Taskuri", roles: ["MANAGER"], iconPath: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" },
    ];

    const visibleLinks = menuItems.filter(item => item.roles.includes(role));

    return (
        <div className="flex min-h-screen bg-slate-50">
            <aside className="fixed inset-y-0 left-0 w-72 bg-slate-900 text-slate-300 flex flex-col border-r border-slate-800 z-50">
                <div className="p-6 flex items-center gap-3 border-b border-slate-800">
                    <div className="w-9 h-9 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold shadow-lg shadow-blue-500/20">HR</div>
                    <span className="text-xl font-bold text-white tracking-tight">Enterprise Portal</span>
                </div>

                <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
                    <p className="px-3 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-4 mt-2">Meniu Principal</p>
                    {visibleLinks.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                            <Link key={item.href} href={item.href} className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group ${isActive ? "bg-blue-600 text-white shadow-md shadow-blue-900/40" : "hover:bg-slate-800 hover:text-white"}`}>
                                <svg className={`w-5 h-5 ${isActive ? "text-white" : "text-slate-400 group-hover:text-blue-400"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={item.iconPath} /></svg>
                                <span className="font-medium text-sm">{item.label}</span>
                            </Link>
                        );
                    })}
                </nav>

                <div className="p-4 border-t border-slate-800 bg-slate-900/50">
                    <div className="flex items-center gap-3 px-3 py-3 mb-2 bg-slate-800/40 rounded-xl border border-slate-700/50">
                        <div className="w-9 h-9 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-400 border border-blue-500/20">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                        </div>
                        <div className="overflow-hidden text-left">
                            <p className="text-sm font-semibold text-white truncate leading-none mb-1">{user?.email || "User"}</p>
                            <span className="px-1.5 py-0.5 bg-slate-700 text-[10px] rounded uppercase font-bold text-slate-400 tracking-tight">{role.replace('_', ' ')}</span>
                        </div>
                    </div>
                    <Link href="/logout" className="flex items-center gap-3 px-3 py-2 rounded-lg text-slate-400 hover:bg-red-500/10 hover:text-red-400 transition-all text-sm font-medium">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
                        <span>Deconectare</span>
                    </Link>
                </div>
            </aside>

            <div className="flex-1 flex flex-col ml-72">
                <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 sticky top-0 z-40">
                    <h2 className="text-slate-800 font-semibold text-lg">{menuItems.find(i => i.href === pathname)?.label || "Acasă"}</h2>
                    <div className="flex items-center gap-4">
                        <button className="p-2 hover:bg-slate-100 rounded-full text-slate-500 relative">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
                            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
                        </button>
                    </div>
                </header>

                <main className="p-8">
                    <div className="max-w-6xl mx-auto">{children}</div>
                </main>
            </div>
        </div>
    );
}