import { jwtDecode } from "jwt-decode";

export interface JwtPayload {
    sub: string;
    role: string;
    exp: number;
}

export const getToken = () => {
    if (typeof window === "undefined") return null;
    return localStorage.getItem("token");
};

export const getUserFromToken = (): JwtPayload | null => {
    const token = getToken();
    if (!token) return null;

    try {
        return jwtDecode<JwtPayload>(token);
    } catch {
        return null;
    }
};

export const isTokenExpired = () => {
    const user = getUserFromToken();
    if (!user) return true;

    return user.exp * 1000 < Date.now();
};
