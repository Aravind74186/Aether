"use client";

import React, { useState } from "react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { CheckCircle2, XCircle, FileText, Download, Users, RefreshCw } from "lucide-react";

interface Student {
  id: string;
  rollNo: string;
  name: string;
  present: boolean;
  termGrade: string;
  attendancePct: number;
}

const initialStudents: Student[] = [
  { id: "1", rollNo: "CS-101", name: "Aarav Sharma", present: true, termGrade: "A", attendancePct: 96 },
  { id: "2", rollNo: "CS-102", name: "Ananya Iyer", present: true, termGrade: "A+", attendancePct: 98 },
  { id: "3", rollNo: "CS-103", name: "Rohan Varma", present: false, termGrade: "B+", attendancePct: 88 },
  { id: "4", rollNo: "CS-104", name: "Priya Nair", present: true, termGrade: "A", attendancePct: 94 },
  { id: "5", rollNo: "CS-105", name: "Devansh Patel", present: true, termGrade: "B", attendancePct: 90 },
  { id: "6", rollNo: "CS-106", name: "Sneha Mukherjee", present: false, termGrade: "A", attendancePct: 89 },
];

export function CampusFlowSimulator() {
  const [students, setStudents] = useState<Student[]>(initialStudents);
  const [selectedClass, setSelectedClass] = useState("Grade 10 - Section B");
  const [isSaved, setIsSaved] = useState(false);
  const [generatingReport, setGeneratingReport] = useState(false);
  const [generatedCard, setGeneratedCard] = useState<string | null>(null);

  const toggleAttendance = (id: string) => {
    setIsSaved(false);
    setStudents(
      students.map((s) => (s.id === id ? { ...s, present: !s.present } : s))
    );
  };

  const markAllPresent = () => {
    setIsSaved(false);
    setStudents(students.map((s) => ({ ...s, present: true })));
  };

  const presentCount = students.filter((s) => s.present).length;
  const absentCount = students.length - presentCount;

  const handleSaveBatch = () => {
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  const handleGenerateReportCard = (student: Student) => {
    setGeneratingReport(true);
    setTimeout(() => {
      setGeneratingReport(false);
      setGeneratedCard(
        `ACADEMIC REPORT CARD\n---------------------------------\nStudent: ${student.name} (${student.rollNo})\nClass: ${selectedClass}\nTerm Assessment: Grade ${student.termGrade}\nCumulative Attendance: ${student.attendancePct}%\nStatus: Verified by Institution System\nGenerated At: ${new Date().toLocaleTimeString()}`
      );
    }, 600);
  };

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6 sm:p-8 space-y-6 shadow-xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-orange-400 font-semibold uppercase">
              Interactive Prototype Sandbox
            </span>
            <Badge variant="demo">Live Simulator</Badge>
          </div>
          <h3 className="text-lg font-bold text-white tracking-tight mt-1">
            CampusFlow 1-Click Roll Call & Grade Engine
          </h3>
        </div>

        <div className="flex items-center gap-3">
          <select
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
            className="px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-xs font-mono text-slate-200 focus:outline-none focus:border-orange-500"
          >
            <option value="Grade 10 - Section B">Grade 10 - Section B</option>
            <option value="CS 3rd Year - Dept A">CS 3rd Year - Dept A</option>
            <option value="Grade 12 - Science">Grade 12 - Science</option>
          </select>
          <Button size="sm" variant="outline" onClick={markAllPresent}>
            <span>All Present</span>
          </Button>
        </div>
      </div>

      {/* Summary KPI Bar */}
      <div className="grid grid-cols-3 gap-3 font-mono text-xs text-center">
        <div className="p-3 rounded-lg bg-slate-950 border border-slate-850">
          <div className="text-slate-500">Total Enrolled</div>
          <div className="text-lg font-bold text-white mt-0.5">{students.length}</div>
        </div>
        <div className="p-3 rounded-lg bg-emerald-950/30 border border-emerald-800/40">
          <div className="text-emerald-400">Present Today</div>
          <div className="text-lg font-bold text-emerald-300 mt-0.5">{presentCount}</div>
        </div>
        <div className="p-3 rounded-lg bg-red-950/30 border border-red-800/40">
          <div className="text-red-400">Absentees</div>
          <div className="text-lg font-bold text-red-300 mt-0.5">{absentCount}</div>
        </div>
      </div>

      {/* Roster Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs font-mono">
          <thead>
            <tr className="border-b border-slate-800 text-slate-500 uppercase">
              <th className="pb-3 pl-2">Roll No</th>
              <th className="pb-3">Student Name</th>
              <th className="pb-3">Attendance</th>
              <th className="pb-3">Avg Rate</th>
              <th className="pb-3 text-right pr-2">Quick Report</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-850">
            {students.map((student) => (
              <tr key={student.id} className="hover:bg-slate-950/50 transition-colors">
                <td className="py-2.5 pl-2 text-slate-400 font-semibold">{student.rollNo}</td>
                <td className="py-2.5 text-slate-200 font-sans font-medium">{student.name}</td>
                <td className="py-2.5">
                  <button
                    onClick={() => toggleAttendance(student.id)}
                    className={`px-2.5 py-1 rounded-md text-[11px] font-semibold inline-flex items-center gap-1 transition-all ${
                      student.present
                        ? "bg-emerald-950/70 text-emerald-300 border border-emerald-700/60 hover:bg-emerald-900/80"
                        : "bg-red-950/70 text-red-300 border border-red-700/60 hover:bg-red-900/80"
                    }`}
                  >
                    {student.present ? (
                      <>
                        <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                        <span>Present</span>
                      </>
                    ) : (
                      <>
                        <XCircle className="w-3 h-3 text-red-400" />
                        <span>Absent</span>
                      </>
                    )}
                  </button>
                </td>
                <td className="py-2.5 text-slate-400">{student.attendancePct}%</td>
                <td className="py-2.5 text-right pr-2">
                  <button
                    onClick={() => handleGenerateReportCard(student)}
                    className="text-orange-400 hover:text-orange-300 inline-flex items-center gap-1 hover:underline"
                  >
                    <FileText className="w-3 h-3" />
                    <span>Card</span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Action Footer */}
      <div className="pt-3 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-xs text-slate-400 font-mono">
          {isSaved ? (
            <span className="text-emerald-400 font-semibold flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              Batch synced to PostgreSQL ledger in 12ms.
            </span>
          ) : (
            <span>Click any status button to toggle. Changes cache offline instantly.</span>
          )}
        </div>

        <Button size="sm" variant="primary" onClick={handleSaveBatch}>
          <span>Sync Attendance Record</span>
        </Button>
      </div>

      {/* Generated Report Card Preview Modal */}
      {generatedCard && (
        <div className="p-4 rounded-xl bg-slate-950 border border-orange-800/50 space-y-3 font-mono text-xs animate-in fade-in duration-200">
          <div className="flex items-center justify-between text-orange-400 font-semibold">
            <span>// Dynamic PDF Grade Sheet Generator Output</span>
            <button
              onClick={() => setGeneratedCard(null)}
              className="text-slate-500 hover:text-white"
            >
              [Close Preview]
            </button>
          </div>
          <pre className="text-slate-300 whitespace-pre-wrap leading-relaxed bg-slate-900/90 p-3 rounded border border-slate-800">
            {generatedCard}
          </pre>
        </div>
      )}
    </div>
  );
}
