"use client";
import { useState } from "react";
import api from "@/services/api";
import { useRouter } from "next/navigation";

export default function LeaveRequestPage() {
    const [formData, setFormData] = useState({ startDate: "", endDate: "", reason: "" });
    const router = useRouter();

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        try {
            await api.post("/api/leave/request", { ...formData, paid: true });
            alert("Cerere trimisă!");
            router.push("/dashboard/employee");
        } catch (err) { alert("Eroare!"); }
    };

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4">
            <div className="max-w-xl mx-auto bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
                <div className="flex items-center gap-3 mb-8">
                    <div className="bg-blue-100 p-3 rounded-full text-blue-600">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                    </div>
                    <h1 className="text-2xl font-extrabold text-gray-800">Planificare Concediu</h1>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-semibold text-gray-600 mb-2">De la data</label>
                            <input type="date" required className="w-full border-gray-200 rounded-xl p-3 focus:ring-2 focus:ring-blue-500 border"
                                onChange={e => setFormData({ ...formData, startDate: e.target.value })} />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-600 mb-2">Până la data</label>
                            <input type="date" required className="w-full border-gray-200 rounded-xl p-3 focus:ring-2 focus:ring-blue-500 border"
                                onChange={e => setFormData({ ...formData, endDate: e.target.value })} />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-gray-600 mb-2">Motiv (Opțional)</label>
                        <textarea rows={3} className="w-full border-gray-200 rounded-xl p-3 focus:ring-2 focus:ring-blue-500 border"
                            placeholder="Ex: Vacanță de vară..." onChange={e => setFormData({ ...formData, reason: e.target.value })} />
                    </div>
                    <div className="flex items-center justify-between p-4 bg-blue-50 rounded-xl">
                        <span className="text-blue-800 font-medium italic text-sm">Zilele vor fi scăzute din totalul plătit.</span>
                    </div>
                    <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl shadow-lg transition duration-200">
                        Confirmă Cererea
                    </button>
                </form>
            </div>
        </div>
    );
}