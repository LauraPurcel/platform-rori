"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import api from "@/services/api";

export default function VerifyOtpPage(): JSX.Element {
    const [otp, setOtp] = useState("");
    const [email, setEmail] = useState<string | null>(null);
    const router = useRouter();

    useEffect(() => {
        const storedEmail = sessionStorage.getItem("otpEmail");
        if (!storedEmail) {
            router.push("/login");
        } else {
            setEmail(storedEmail);
        }
    }, [router]);

    const submit = async () => {
        if (!email) return;

        try {
            const res = await api.post("/auth/verify-otp", {
                email,
                otp
            });

            localStorage.setItem("token", res.data.token);
            router.push("/dashboard/hr");
        } catch {
            alert("Cod OTP invalid sau expirat");
        }
    };

    // Dacă email-ul nu e încă citit din sessionStorage, poți afișa un loading
    if (!email) return null;

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-100 text-slate-800">
            <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-sm">
                <h1 className="text-2xl font-bold text-center mb-4">
                    Verificare cod
                </h1>

                <input
                    type="text"
                    placeholder="Cod OTP"
                    className="w-full border rounded-xl px-4 py-3 mb-4"
                    value={otp}
                    onChange={e => setOtp(e.target.value)}
                />

                <button
                    onClick={submit}
                    className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold"
                >
                    Verifică
                </button>
            </div>
        </div>
    );
}
