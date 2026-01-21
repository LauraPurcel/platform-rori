"use client";

import { useEffect, useState } from "react";
import api from "@/services/api";

export default function HRContractsPage() {
    const [uncontracted, setUncontracted] = useState<any[]>([]);
    const [contracts, setContracts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        setLoading(true);
        try {
            const [u, c] = await Promise.all([
                api.get("/hr/contracts/uncontracted"),
                api.get("/hr/contracts/all")
            ]);
            setUncontracted(u.data);
            setContracts(c.data);
        } finally {
            setLoading(false);
        }
    };

    const createContract = async (emp: any, form: any) => {
        await api.post("/hr/contracts", {
            cnp: emp.cnp,
            jobTitle: form.jobTitle,
            baseSalary: Number(form.baseSalary),
            workingHours: Number(form.workingHours)
        });
        alert("Contract creat!");
        loadData();
    };

    const updateContract = async (c: any) => {
        await api.put(`/hr/contracts/${c.contractId}`, {
            jobTitle: c.jobTitle,
            baseSalary: Number(c.baseSalary),
            workingHours: Number(c.workingHours)
        });
        alert("Contract modificat!");
    };

    const deleteContract = async (id: number) => {
        if (!confirm("Sigur vrei să ștergi contractul?")) return;
        await api.delete(`/hr/contracts/delete/${id}`);
        alert("Contract șters!");
        loadData();
    };

    return (
        <div className="max-w-6xl mx-auto space-y-12 pb-20 text-slate-800">

            <section>
                <div className="flex items-center gap-3 mb-6">
                    <div className="w-2 h-8 bg-blue-600 rounded-full"></div>
                    <h1 className="text-xl font-bold text-slate-800">Angajați fără contract</h1>
                    <span className="bg-blue-100 text-blue-700 px-2.5 py-0.5 rounded-full text-xs font-bold">
                        {uncontracted.length}
                    </span>
                </div>

                <div className="grid gap-4">
                    {uncontracted.map(emp => (
                        <CreateContractCard key={emp.id} emp={emp} onCreate={createContract} />
                    ))}
                    {!loading && uncontracted.length === 0 && (
                        <div className="bg-emerald-50 border border-emerald-100 p-6 rounded-xl text-emerald-700 text-center">
                            Toți angajații au contracte active. ✨
                        </div>
                    )}
                </div>
            </section>


            <section>
                <div className="flex items-center gap-3 mb-6">
                    <div className="w-2 h-8 bg-slate-400 rounded-full"></div>
                    <h1 className="text-xl font-bold text-slate-800">Listă Contracte Active</h1>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead className="bg-slate-50 border-b border-slate-200 text-slate-800">
                                <tr>
                                    <th className="p-4 text-xs font-semibold text-slate-500 uppercase">Angajat</th>
                                    <th className="p-4 text-xs font-semibold text-slate-500 uppercase">Job Title</th>
                                    <th className="p-4 text-xs font-semibold text-slate-500 uppercase">Salariu (RON)</th>
                                    <th className="p-4 text-xs font-semibold text-slate-500 uppercase">Ore</th>
                                    <th className="p-4 text-xs font-semibold text-slate-500 uppercase text-right">Acțiuni</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 text-sm text-slate-700">
                                {contracts.map(c => (
                                    <tr key={c.contractId} className="hover:bg-slate-50/50 transition-colors">
                                        <td className="p-4">
                                            <p className="font-bold text-slate-900">{c.lastName} {c.firstName}</p>
                                            <p className="text-xs text-slate-500 font-mono">{c.cnp}</p>
                                        </td>
                                        <td className="p-4">
                                            <input
                                                className="w-full bg-transparent focus:bg-white border-none focus:ring-1 focus:ring-blue-500 rounded px-2 py-1 -ml-2"
                                                value={c.jobTitle}
                                                onChange={e => setContracts(prev => prev.map(x => x.contractId === c.contractId ? { ...x, jobTitle: e.target.value } : x))}
                                            />
                                        </td>
                                        <td className="p-4">
                                            <input
                                                type="number"
                                                className="w-24 bg-transparent focus:bg-white border-none focus:ring-1 focus:ring-blue-500 rounded px-2 py-1 -ml-2"
                                                value={c.baseSalary}
                                                onChange={e => setContracts(prev => prev.map(x => x.contractId === c.contractId ? { ...x, baseSalary: e.target.value } : x))}
                                            />
                                        </td>
                                        <td className="p-4">
                                            <input
                                                type="number"
                                                className="w-16 bg-transparent focus:bg-white border-none focus:ring-1 focus:ring-blue-500 rounded px-2 py-1 -ml-2"
                                                value={c.workingHours}
                                                onChange={e => setContracts(prev => prev.map(x => x.contractId === c.contractId ? { ...x, workingHours: e.target.value } : x))}
                                            />
                                        </td>
                                        <td className="p-4 text-right space-x-2">
                                            <button
                                                onClick={() => updateContract(c)}
                                                className="text-blue-600 hover:text-blue-800 font-semibold px-2 py-1"
                                            >
                                                Salvare
                                            </button>
                                            <button
                                                onClick={() => deleteContract(c.contractId)}
                                                className="text-red-500 hover:text-red-700 px-2 py-1"
                                            >
                                                Șterge
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>
        </div>
    );
}

function CreateContractCard({ emp, onCreate }: any) {
    const [form, setForm] = useState({ jobTitle: "", baseSalary: "", workingHours: "" });

    return (
        <div className="bg-white border border-slate-200 p-5 rounded-xl shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6 hover:border-blue-200 transition-colors">
            <div className="min-w-[200px]">
                <p className="text-sm text-slate-500 font-medium mb-1 uppercase tracking-wider text-[10px]">Candidat Nou</p>
                <p className="text-lg font-bold text-slate-800">{emp.lastName} {emp.firstName}</p>
                <p className="text-xs text-slate-400 font-mono tracking-tighter">{emp.cnp}</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 flex-1">
                <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-400 uppercase ml-1">Job Title</label>
                    <input
                        className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                        placeholder="Ex: Software Dev"
                        onChange={e => setForm({ ...form, jobTitle: e.target.value })}
                    />
                </div>
                <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-400 uppercase ml-1">Salariu</label>
                    <input
                        type="number"
                        className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                        placeholder="RON"
                        onChange={e => setForm({ ...form, baseSalary: e.target.value })}
                    />
                </div>
                <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-400 uppercase ml-1">Ore / Lună</label>
                    <input
                        type="number"
                        className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                        placeholder="Ex: 160"
                        onChange={e => setForm({ ...form, workingHours: e.target.value })}
                    />
                </div>
            </div>

            <button
                onClick={() => onCreate(emp, form)}
                className="bg-slate-900 text-white px-6 py-2.5 rounded-lg text-sm font-bold hover:bg-blue-600 transition-all shadow-lg shadow-slate-200 h-fit self-end md:self-center"
            >
                Creează Contract
            </button>
        </div>
    );
}