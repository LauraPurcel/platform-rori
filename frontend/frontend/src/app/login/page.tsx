"use client";

import { useState } from "react";
import { login } from "@/services/authService";
import { useRouter } from "next/navigation";
import { getUserFromToken } from "@/utils/auth";
import Link from "next/link";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();

    const submit = async () => {
        try {
            await login(email, password);
            const user = getUserFromToken();

            if (!user) throw new Error("Token invalid");

            router.push(user.role === "HR_MANAGER"
                ? "/dashboard/hr"
                : "/dashboard/employee"
            );
        } catch {
            alert("Email sau parolă greșită");
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-slate-100 flex items-center justify-center px-4">
            <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-8">
                {/* Header */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-blue-600 text-white text-2xl font-bold mb-4">
                        HR
                    </div>
                    <h1 className="text-3xl font-extrabold text-slate-800">
                        Autentificare
                    </h1>
                    <p className="text-slate-500 mt-2">
                        Platformă de management angajați
                    </p>
                </div>

                {/* Form */}
                <div className="space-y-5">
                    <input
                        type="email"
                        placeholder="Email"
                        className="w-full border border-slate-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />

                    <input
                        type="password"
                        placeholder="Parolă"
                        className="w-full border border-slate-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />

                    <button
                        onClick={submit}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl shadow-lg transition"
                    >
                        Conectează-te
                    </button>
                </div>

                {/* Footer */}
                <p className="text-center text-slate-500 mt-6 text-sm">
                    Nu ai cont?{" "}
                    <Link href="/register" className="text-blue-600 font-semibold hover:underline">
                        Creează cont
                    </Link>
                </p>
            </div>
        </div>
    );
}
