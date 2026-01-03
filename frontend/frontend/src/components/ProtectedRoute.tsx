"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { getUserFromToken, isTokenExpired } from "@/utils/auth";

export default function ProtectedRoute({
	children,
	allowedRoles,
}: {
	children: React.ReactNode;
	allowedRoles?: string[];
}) {
	const router = useRouter();

	useEffect(() => {
		const user = getUserFromToken();

		if (!user || isTokenExpired()) {
			router.push("/login");
			return;
		}

		if (allowedRoles && !allowedRoles.includes(user.role)) {
			router.push("/unauthorized");
		}
	}, []);

	return <>{children}</>;
}
