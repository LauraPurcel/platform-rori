import api from "./api";

export const login = async (
    email: string,
    password: string
): Promise<string> => {
    const res = await api.post("/auth/login", { email, password });
    localStorage.setItem("token", res.data);
    return res.data;
};


export const register = async (data: any) => {
	return api.post("/auth/register", data);
};

export const logout = () => {
	localStorage.removeItem("token");
};
