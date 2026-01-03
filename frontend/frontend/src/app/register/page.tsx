"use client";

import { useState } from "react";
import { register } from "@/services/authService";
import { useRouter } from "next/navigation";
import type { RegisterRequest } from "@/types/auth";
import Link from "next/link";

export default function RegisterPage() {
    const router = useRouter();

    const [form, setForm] = useState<RegisterRequest>({
        cnp: "",
        firstName: "",
        lastName: "",
        email: "",
        password: "",
    });

    const submit = async () => {
        try {
            await register(form);
            alert("Cont creat cu succes");
            router.push("/login");
        } catch {
            alert("Eroare la înregistrare");
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-slate-100 flex items-center justify-center px-4">
            <div className="w-full max-w-lg bg-white rounded-3xl shadow-2xl p-8">
                {/* Header */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-emerald-600 text-white text-2xl font-bold mb-4">
                        +
                    </div>
                    <h1 className="text-3xl font-extrabold text-slate-800">
                        Creează cont
                    </h1>
                    <p className="text-slate-500 mt-2">
                        Platforma de management angajați
                    </p>
                </div>

                {/* Form */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                        placeholder="CNP"
                        className="border border-slate-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-emerald-500 outline-none"
                        value={form.cnp}
                        onChange={e => setForm({ ...form, cnp: e.target.value })}
                    />

                    <input
                        placeholder="Email"
                        className="border border-slate-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-emerald-500 outline-none"
                        value={form.email}
                        onChange={e => setForm({ ...form, email: e.target.value })}
                    />

                    <input
                        placeholder="Prenume"
                        className="border border-slate-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-emerald-500 outline-none"
                        value={form.firstName}
                        onChange={e => setForm({ ...form, firstName: e.target.value })}
                    />

                    <input
                        placeholder="Nume"
                        className="border border-slate-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-emerald-500 outline-none"
                        value={form.lastName}
                        onChange={e => setForm({ ...form, lastName: e.target.value })}
                    />

                    <input
                        type="password"
                        placeholder="Parolă"
                        className="md:col-span-2 border border-slate-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-emerald-500 outline-none"
                        value={form.password}
                        onChange={e => setForm({ ...form, password: e.target.value })}
                    />
                </div>

                {/* Action */}
                <button
                    onClick={submit}
                    className="w-full mt-6 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 rounded-xl shadow-lg transition"
                >
                    Creează cont
                </button>

                {/* Footer */}
                <p className="text-center text-slate-500 mt-6 text-sm">
                    Ai deja cont?{" "}
                    <Link href="/login" className="text-emerald-600 font-semibold hover:underline">
                        Autentifică-te
                    </Link>
                </p>
            </div>
        </div>
    );
}
