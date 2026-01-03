"use client";

import Link from "next/link";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    return (
        <div style={{ display: "flex" }}>
            <aside style={{ width: 250, background: "#eee", padding: 20 }}>
                <h3>Meniu</h3>

                <Link href="/dashboard/employee">Home</Link><br />
                <Link href="/dashboard/employee/personal-data">Date personale</Link><br />
                <Link href="/dashboard/employee/salary">Date salariale</Link><br />
                <Link href="/dashboard/employee/tasks">Task-uri</Link><br />
                <Link href="/dashboard/employee/leave">Concediu</Link><br />
                <Link href="/dashboard/employee/office">Birou fizic</Link><br />
            </aside>

            <main style={{ padding: 30, width: "100%" }}>
                {children}
            </main>
        </div>
    );
}
