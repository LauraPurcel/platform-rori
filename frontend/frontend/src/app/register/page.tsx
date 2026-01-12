"use client";

import { useState } from "react";
import { register } from "@/services/authService";
import { useRouter } from "next/navigation";
import type { RegisterRequest } from "@/types/auth";
import Link from "next/link";

export default function RegisterPage() {
    const router = useRouter();

    const [form, setForm] = useState<RegisterRequest & { confirmPassword: string }>({
        cnp: "",
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
        phone: "",
        address: "",
        role: "EMPLOYEE",
    });

    const [showPassword, setShowPassword] = useState(false);

    const submit = async () => {
        if (form.password !== form.confirmPassword) {
            alert("Parolele nu coincid!");
            return;
        }

        try {
            await register(form);
            alert("Cont creat cu succes");
            router.push("/login");
        } catch {
            alert("Eroare la înregistrare");
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-slate-100 flex items-center justify-center px-4 text-slate-800">
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
                        value={form.cnp}
                        onChange={e => setForm({ ...form, cnp: e.target.value })}
                        className="input"
                    />

                    <input
                        placeholder="Email"
                        value={form.email}
                        onChange={e => setForm({ ...form, email: e.target.value })}
                        className="input"
                    />

                    <input
                        placeholder="Prenume"
                        value={form.firstName}
                        onChange={e => setForm({ ...form, firstName: e.target.value })}
                        className="input"
                    />

                    <input
                        placeholder="Nume"
                        value={form.lastName}
                        onChange={e => setForm({ ...form, lastName: e.target.value })}
                        className="input"
                    />

                    <input
                        placeholder="Telefon"
                        value={form.phone}
                        onChange={e => setForm({ ...form, phone: e.target.value })}
                        className="input"
                    />

                    <input
                        placeholder="Adresă"
                        value={form.address}
                        onChange={e => setForm({ ...form, address: e.target.value })}
                        className="input"
                    />

                    {/* 🔑 Parola */}
                    <div className="relative md:col-span-2">
                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="Parolă"
                            value={form.password}
                            onChange={e => setForm({ ...form, password: e.target.value })}
                            className="input w-full pr-12"
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute top-1/2 right-3 -translate-y-1/2 text-slate-500 hover:text-slate-700"
                        >
                            {showPassword ? "🙈" : "👁️"}
                        </button>
                    </div>

                    {/* 🔑 Confirmare parolă */}
                    <div className="relative md:col-span-2">
                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="Confirmă parola"
                            value={form.confirmPassword}
                            onChange={e => setForm({ ...form, confirmPassword: e.target.value })}
                            className="input w-full pr-12"
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute top-1/2 right-3 -translate-y-1/2 text-slate-500 hover:text-slate-700"
                        >
                            {showPassword ? "🙈" : "👁️"}
                        </button>
                    </div>

                    {/* 🔑 SELECT ROLE */}
                    <select
                        value={form.role}
                        onChange={e =>
                            setForm({ ...form, role: e.target.value as "EMPLOYEE" | "MANAGER" })
                        }
                        className="md:col-span-2 border rounded-xl px-4 py-3"
                    >
                        <option value="EMPLOYEE">Angajat</option>
                        <option value="MANAGER">Manager</option>
                    </select>
                </div>

                {/* Action */}
                <button
                    onClick={submit}
                    className="w-full mt-6 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 rounded-xl"
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
