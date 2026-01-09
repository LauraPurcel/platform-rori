"use client";

import { useEffect, useState } from "react";
import api from "@/services/api";

export default function HRContractsPage() {
    const [employees, setEmployees] = useState<any[]>([]);
    const [form, setForm] = useState<any>({
        cnp: "",
        jobTitle: "",
        baseSalary: "",
        workingHours: ""
    });

    useEffect(() => {
        api.get("/hr/contracts/uncontracted")
            .then(res => setEmployees(res.data));
    }, []);

    const createContract = async () => {
        await api.post("/hr/contracts", {
            ...form,
            baseSalary: Number(form.baseSalary),
            workingHours: Number(form.workingHours)
        });

        alert("Contract creat!");
        setEmployees(e => e.filter(emp => emp.cnp !== form.cnp));
    };

    return (
        <div>
            <h1 className="text-2xl font-bold mb-6">Angajați fără contract</h1>

            {employees.map(emp => (
                <div key={emp.id} className="border p-4 mb-4 rounded">
                    <p><b>{emp.lastName} {emp.firstName}</b> – {emp.cnp}</p>

                    <div className="flex gap-2 mt-2">
                        <input placeholder="Job title"
                            onChange={e => setForm({ ...form, jobTitle: e.target.value, cnp: emp.cnp })} />
                        <input placeholder="Salariu"
                            onChange={e => setForm({ ...form, baseSalary: e.target.value })} />
                        <input placeholder="Ore"
                            onChange={e => setForm({ ...form, workingHours: e.target.value })} />
                        <button onClick={createContract}
                            className="bg-blue-600 text-white px-4 rounded">
                            Creează contract
                        </button>
                    </div>
                </div>
            ))}

            {employees.length === 0 && <p>Toți angajații au contract 🎉</p>}
        </div>
    );
}
