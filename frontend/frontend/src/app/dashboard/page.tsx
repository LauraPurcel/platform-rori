"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";
interface JwtPayload {
    role: "EMPLOYEE" | "MANAGER" | "HR";
}

export default function DashboardRedirect() {
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            router.push("/login");
            return;
        }

        const decoded = jwtDecode<JwtPayload>(token);

        if (decoded.role === "EMPLOYEE") router.push("/dashboard/employee");
        if (decoded.role === "MANAGER") router.push("/dashboard/manager");
        if (decoded.role === "HR") router.push("/dashboard/hr");
    }, []);

    return null;
}
