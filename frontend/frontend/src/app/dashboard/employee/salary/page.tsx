"use client";

import { useEffect, useState } from "react";
import api from "@/services/api";

export default function SalaryPage() {
    const [salary, setSalary] = useState<any>(null);

    useEffect(() => {
        api.get("/salary/me").then(res => setSalary(res.data));
    }, []);

    if (!salary) return <p>Loading...</p>;

    return (
        <>
            <h2>Date salariale</h2>
            <p>Salariu brut: {salary.gross}</p>
            <p>Salariu net: {salary.net}</p>
            <p>Zile lucrate luna curentă: {salary.workedDays}</p>
            <p>Zile concediu rămase: {salary.remainingPaidLeave}</p>
        </>
    );
}
