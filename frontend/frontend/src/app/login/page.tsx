"use client";

import { useState } from "react";
import { useRouter } from "next/navigation"; // Calea corectată de import
// Asigurati-va ca aveti tipurile (types.ts) definite corect
// import type { LoginRequest, LoginResponse } from "@/types"; 

export default function LoginPage() {
    const router = useRouter();

    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [error, setError] = useState<string>("");

    const login = async () => {
        setError("");
        const requestBody = { email, password };

        try {
            const res = await fetch("http://localhost:8080/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(requestBody),
            });

            if (!res.ok) {
                // Presupunând că erorile de la backend sunt text simple
                const errorMessage = await res.text();
                setError(errorMessage || "Email sau parolă incorectă!");
                return;
            }

            // Backend-ul returnează acum LoginResponse { user, token }
            const loginResponse = await res.json(); 

            if (loginResponse.token) {
                // STOCARE ESENȚIALĂ: Stocăm doar token-ul (JWT)
                localStorage.setItem("authToken", loginResponse.token);
                
                // Opțional: Stocați un ID simplu sau o stare de bază
                // localStorage.setItem("currentUser", JSON.stringify(loginResponse.user));

                router.push("/profile");
            } else {
                setError("Răspuns invalid de la server.");
            }
        } catch (e) {
            setError("Eroare de rețea. Asigurați-vă că serverul rulează.");
        }
    };

    return (
        <div style={{ padding: 20, maxWidth: 400, margin: '0 auto', border: '1px solid #ccc', borderRadius: '8px' }}>
            <h2 style={{ marginBottom: 20 }}>Login</h2>

            <input
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{ width: '100%', padding: '10px', marginBottom: '10px', border: '1px solid #ddd', borderRadius: '4px' }}
            />

            <input
                placeholder="Parolă"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{ width: '100%', padding: '10px', marginBottom: '20px', border: '1px solid #ddd', borderRadius: '4px' }}
            />

            {error && <p style={{ color: 'red', marginBottom: '10px' }}>{error}</p>}

            <button 
                onClick={login}
                style={{ width: '100%', padding: '10px', backgroundColor: '#0070f3', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
            >
                Login
            </button>
        </div>
    );
}