"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { register } from "@/services/authService";
import type { RegisterRequest } from "@/types/auth";

type RegisterForm = RegisterRequest & {
    confirmPassword: string;
};

export default function RegisterPage() {
    const router = useRouter();

    const [form, setForm] = useState<RegisterForm>({
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

    const [errors, setErrors] = useState<Record<string, string>>({});
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);


    const validate = () => {
        const e: Record<string, string> = {};

        if (form.cnp.length !== 13)
            e.cnp = "CNP-ul trebuie să conțină exact 13 cifre";

        if (!form.firstName.trim())
            e.firstName = "Prenumele este obligatoriu";

        if (!form.lastName.trim())
            e.lastName = "Numele este obligatoriu";

        if (!/^\S+@\S+\.\S+$/.test(form.email))
            e.email = "Email invalid";

        if (
            !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/.test(
                form.password
            )
        )
            e.password =
                "Minim 8 caractere, literă mare, mică, cifră și simbol";

        if (form.password !== form.confirmPassword)
            e.confirmPassword = "Parolele nu coincid";

        if (!/^(\\+4)?07\d{8}$/.test(form.phone))
            e.phone = "Număr de telefon invalid";

        if (form.address.length < 5)
            e.address = "Adresa trebuie să aibă minim 5 caractere";

        if (!["EMPLOYEE", "MANAGER"].includes(form.role))
            e.role = "Rol invalid";

        setErrors(e);
        return Object.keys(e).length === 0;
    };

    const submit = async () => {
        if (!validate()) return;

        try {
            setLoading(true);
            await register(form);
            router.push("/login");
        } catch (err: any) {
            setErrors({
                general:
                    err.response?.data?.message ||
                    "Eroare la înregistrare",
            });
        } finally {
            setLoading(false);
        }
    };

    const inputClass = (field: string) =>
        `input ${errors[field] ? "border-red-500" : ""}`;

    return (
        <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-slate-100 flex items-center justify-center px-4 text-slate-800">
            <div className="w-full max-w-xl bg-white rounded-3xl shadow-2xl p-8 text-slate-800">
                {/* HEADER */}
                <div className="text-center mb-8">
                    <div className="mx-auto w-14 h-14 rounded-2xl bg-emerald-600 text-white flex items-center justify-center text-2xl font-bold mb-4">
                        +
                    </div>
                    <h1 className="text-3xl font-extrabold">
                        Creează cont
                    </h1>
                    <p className="text-slate-500 mt-2">
                        Platforma de management angajați
                    </p>
                </div>

                {/* EROARE GENERALĂ */}
                {errors.general && (
                    <p className="mb-4 text-center text-red-600 text-sm">
                        {errors.general}
                    </p>
                )}

                {/* FORM */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* CNP */}
                    <div>
                        <input
                            placeholder="CNP"
                            value={form.cnp}
                            onChange={e =>
                                setForm({ ...form, cnp: e.target.value })
                            }
                            className={inputClass("cnp")}
                        />
                        {errors.cnp && (
                            <p className="error">{errors.cnp}</p>
                        )}
                    </div>

                    {/* EMAIL */}
                    <div>
                        <input
                            placeholder="Email"
                            value={form.email}
                            onChange={e =>
                                setForm({ ...form, email: e.target.value })
                            }
                            className={inputClass("email")}
                        />
                        {errors.email && (
                            <p className="error">{errors.email}</p>
                        )}
                    </div>

                    {/* PRENUME */}
                    <div>
                        <input
                            placeholder="Prenume"
                            value={form.firstName}
                            onChange={e =>
                                setForm({
                                    ...form,
                                    firstName: e.target.value,
                                })
                            }
                            className={inputClass("firstName")}
                        />
                        {errors.firstName && (
                            <p className="error">{errors.firstName}</p>
                        )}
                    </div>

                    {/* NUME */}
                    <div>
                        <input
                            placeholder="Nume"
                            value={form.lastName}
                            onChange={e =>
                                setForm({
                                    ...form,
                                    lastName: e.target.value,
                                })
                            }
                            className={inputClass("lastName")}
                        />
                        {errors.lastName && (
                            <p className="error">{errors.lastName}</p>
                        )}
                    </div>

                    {/* TELEFON */}
                    <div>
                        <input
                            placeholder="Telefon"
                            value={form.phone}
                            onChange={e =>
                                setForm({ ...form, phone: e.target.value })
                            }
                            className={inputClass("phone")}
                        />
                        {errors.phone && (
                            <p className="error">{errors.phone}</p>
                        )}
                    </div>

                    {/* ADRESĂ */}
                    <div>
                        <input
                            placeholder="Adresă"
                            value={form.address}
                            onChange={e =>
                                setForm({
                                    ...form,
                                    address: e.target.value,
                                })
                            }
                            className={inputClass("address")}
                        />
                        {errors.address && (
                            <p className="error">{errors.address}</p>
                        )}
                    </div>

                    {/* PAROLĂ */}
                    <div className="relative md:col-span-2">
                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="Parolă"
                            value={form.password}
                            onChange={e =>
                                setForm({
                                    ...form,
                                    password: e.target.value,
                                })
                            }
                            className={`${inputClass("password")} pr-12`}
                        />
                        <button
                            type="button"
                            onClick={() =>
                                setShowPassword(!showPassword)
                            }
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500"
                        >
                            {showPassword ? "🙈" : "👁️"}
                        </button>
                        {errors.password && (
                            <p className="error">{errors.password}</p>
                        )}
                    </div>

                    {/* CONFIRM PAROLĂ */}
                    <div className="md:col-span-2">
                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="Confirmă parola"
                            value={form.confirmPassword}
                            onChange={e =>
                                setForm({
                                    ...form,
                                    confirmPassword: e.target.value,
                                })
                            }
                            className={inputClass("confirmPassword")}
                        />
                        {errors.confirmPassword && (
                            <p className="error">
                                {errors.confirmPassword}
                            </p>
                        )}
                    </div>

                    {/* ROLE */}
                    <div className="md:col-span-2">
                        <select
                            value={form.role}
                            onChange={e =>
                                setForm({
                                    ...form,
                                    role: e.target.value as
                                        | "EMPLOYEE"
                                        | "MANAGER",
                                })
                            }
                            className={inputClass("role")}
                        >
                            <option value="EMPLOYEE">Angajat</option>
                            <option value="MANAGER">Manager</option>
                        </select>
                        {errors.role && (
                            <p className="error">{errors.role}</p>
                        )}
                    </div>
                </div>

                {/* ACTION */}
                <button
                    onClick={submit}
                    disabled={loading}
                    className="w-full mt-6 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white font-bold py-3 rounded-xl"
                >
                    {loading ? "Se creează contul..." : "Creează cont"}
                </button>

                {/* FOOTER */}
                <p className="text-center text-slate-500 mt-6 text-sm">
                    Ai deja cont?{" "}
                    <Link
                        href="/login"
                        className="text-emerald-600 font-semibold hover:underline"
                    >
                        Autentifică-te
                    </Link>
                </p>
            </div>

            {/* STIL ERORI */}
            <style jsx>{`
                .error {
                    font-size: 0.75rem;
                    color: #dc2626;
                    margin-top: 0.25rem;
                }
            `}</style>
        </div>
    );
}
