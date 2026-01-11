import api from "./api";
export type LoginResponse = {
    requires2FA: boolean;
    token: string | null;
};
export const login = async (
    email: string,
    password: string
): Promise<LoginResponse> => {
    const res = await api.post<LoginResponse>("/auth/login", { email, password });
    return res.data;
};

export const register = async (data: any) => {
	return api.post("/auth/register", data);
};

export const logout = () => {
	localStorage.removeItem("token");
};
