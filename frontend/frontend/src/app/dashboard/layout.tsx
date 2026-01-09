"use client";

import Link from "next/link";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    return (
        <div style={{ display: "flex" }}>
            <aside className="w-[250px] bg-slate-800 text-white p-5">
                <h3 className="font-bold mb-4">Meniu</h3>

                <nav className="flex flex-col gap-2">
                    <Link className="hover:text-blue-400" href="/dashboard/employee">Home</Link>
                    <Link className="hover:text-blue-400" href="/dashboard/employee/tasks">Task-uri</Link>
                    <Link className="hover:text-blue-400" href="/dashboard/employee/leave">Concediu</Link>
                    <Link className="hover:text-blue-400" href="/dashboard/employee/office">Birou fizic</Link>
                    <Link className="hover:text-blue-400" href="login">Login</Link>
                </nav>
            </aside>

            

            <main style={{ padding: 30, width: "100%" }}>
                {children}
            </main>
        </div>
    );
}
