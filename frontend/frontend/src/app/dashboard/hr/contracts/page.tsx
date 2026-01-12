"use client";

import { useEffect, useState } from "react";
import api from "@/services/api";

export default function HRContractsPage() {
    const [uncontracted, setUncontracted] = useState<any[]>([]);
    const [contracts, setContracts] = useState<any[]>([]);

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        const u = await api.get("/hr/contracts/uncontracted");
        const c = await api.get("/hr/contracts/all");
        setUncontracted(u.data);
        setContracts(c.data);
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

        await api.delete(`/hr/contracts/${id}`);
        alert("Contract șters!");
        loadData();
    };

    return (
        <div className="space-y-10">

            {/* ================= UNCONTRACTED ================= */}

            <section>
                <h1 className="text-2xl font-bold mb-4">Angajați fără contract</h1>

                {uncontracted.map(emp => (
                    <CreateContractCard
                        key={emp.id}
                        emp={emp}
                        onCreate={createContract}
                    />
                ))}

                {uncontracted.length === 0 &&
                    <p>Toți angajații au contract 🎉</p>}
            </section>

            {/* ================= CONTRACTED ================= */}

            <section>
                <h1 className="text-2xl font-bold mb-4">Angajați cu contract</h1>

                {contracts.map(c => (
                    <div key={c.contractId} className="border p-4 mb-3 rounded">
                        <p className="font-semibold">
                            {c.lastName} {c.firstName} – {c.cnp}
                        </p>

                        <div className="flex gap-2 mt-2">
                            <input
                                value={c.jobTitle}
                                onChange={e =>
                                    setContracts(prev =>
                                        prev.map(x =>
                                            x.contractId === c.contractId
                                                ? { ...x, jobTitle: e.target.value }
                                                : x
                                        )
                                    )
                                }
                                placeholder="Job title"
                            />

                            <input
                                value={c.baseSalary}
                                onChange={e =>
                                    setContracts(prev =>
                                        prev.map(x =>
                                            x.contractId === c.contractId
                                                ? { ...x, baseSalary: e.target.value }
                                                : x
                                        )
                                    )
                                }
                                placeholder="Salariu"
                            />

                            <input
                                value={c.workingHours}
                                onChange={e =>
                                    setContracts(prev =>
                                        prev.map(x =>
                                            x.contractId === c.contractId
                                                ? { ...x, workingHours: e.target.value }
                                                : x
                                        )
                                    )
                                }
                                placeholder="Ore"
                            />

                            <button
                                onClick={() => updateContract(c)}
                                className="bg-green-600 text-white px-4 rounded">
                                Salvează
                            </button>

                            <button
                                onClick={() => deleteContract(c.contractId)}
                                className="bg-red-600 text-white px-4 rounded">
                                Șterge
                            </button>
                        </div>
                    </div>
                ))}
            </section>
        </div>
    );
}

function CreateContractCard({ emp, onCreate }: any) {
    const [form, setForm] = useState({
        jobTitle: "",
        baseSalary: "",
        workingHours: ""
    });

    return (
        <div className="border p-4 mb-4 rounded">
            <p className="font-semibold">
                {emp.lastName} {emp.firstName} – {emp.cnp}
            </p>

            <div className="flex gap-2 mt-2">
                <input
                    placeholder="Job title"
                    onChange={e => setForm({ ...form, jobTitle: e.target.value })}
                />
                <input
                    placeholder="Salariu"
                    onChange={e => setForm({ ...form, baseSalary: e.target.value })}
                />
                <input
                    placeholder="Ore"
                    onChange={e => setForm({ ...form, workingHours: e.target.value })}
                />

                <button
                    onClick={() => onCreate(emp, form)}
                    className="bg-blue-600 text-white px-4 rounded">
                    Creează
                </button>
            </div>
        </div>
    );
}
