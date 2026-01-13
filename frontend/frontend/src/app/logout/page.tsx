"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function LogoutPage() {
    const router = useRouter();

    useEffect(() => {
      
        localStorage.removeItem("token"); // sau "auth", depinde ce folosești
        sessionStorage.removeItem("token");
        router.replace("/login");
    }, [router]);

    return (
        <div style={{
            padding: 20,
            maxWidth: 600,
            margin: "50px auto",
            textAlign: "center",
            border: "1px solid #ccc",
            borderRadius: 8,
            boxShadow: "0 2px 4px rgba(0,0,0,0.1)"
        }}>
            <h2>Se iese din cont...</h2>
            <p>Dacă redirecționarea nu se face automat, <a href="/login" style={{ color: "#0070f3" }}>apasă aici</a>.</p>
        </div>
    );
}
