"use client";

import React, { useState } from "react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import {
  CheckCircle2,
  XCircle,
  FileText,
  Copy,
  Check,
  X,
  Sparkles,
  Loader2,
  Database,
  GraduationCap,
} from "lucide-react";

interface Student {
  id: string;
  rollNo: string;
  name: string;
  present: boolean;
  termGrade: string;
  attendancePct: number;
}

const initialClassRosters: Record<string, Student[]> = {
  "Grade 10 - Section B": [
    { id: "1", rollNo: "CS-101", name: "Aarav Sharma", present: true, termGrade: "A", attendancePct: 96 },
    { id: "2", rollNo: "CS-102", name: "Ananya Iyer", present: true, termGrade: "A+", attendancePct: 98 },
    { id: "3", rollNo: "CS-103", name: "Rohan Varma", present: false, termGrade: "B+", attendancePct: 88 },
    { id: "4", rollNo: "CS-104", name: "Priya Nair", present: true, termGrade: "A", attendancePct: 94 },
    { id: "5", rollNo: "CS-105", name: "Devansh Patel", present: true, termGrade: "B", attendancePct: 90 },
    { id: "6", rollNo: "CS-106", name: "Sneha Mukherjee", present: false, termGrade: "A", attendancePct: 89 },
  ],
  "CS 3rd Year - Dept A": [
    { id: "7", rollNo: "CSE-301", name: "Vikram Malhotra", present: true, termGrade: "A+", attendancePct: 99 },
    { id: "8", rollNo: "CSE-302", name: "Tanvi Sen", present: true, termGrade: "A", attendancePct: 95 },
    { id: "9", rollNo: "CSE-303", name: "Siddharth Rao", present: true, termGrade: "B+", attendancePct: 91 },
    { id: "10", rollNo: "CSE-304", name: "Meera Krishnan", present: false, termGrade: "A", attendancePct: 87 },
    { id: "11", rollNo: "CSE-305", name: "Aditya Joshi", present: true, termGrade: "B", attendancePct: 86 },
    { id: "12", rollNo: "CSE-306", name: "Neha Kulkarni", present: true, termGrade: "A+", attendancePct: 97 },
  ],
  "Grade 12 - Science": [
    { id: "13", rollNo: "SCI-121", name: "Arjun Kapoor", present: true, termGrade: "A", attendancePct: 93 },
    { id: "14", rollNo: "SCI-122", name: "Diya Reddy", present: true, termGrade: "A+", attendancePct: 99 },
    { id: "15", rollNo: "SCI-123", name: "Kabir Mehta", present: false, termGrade: "B", attendancePct: 82 },
    { id: "16", rollNo: "SCI-124", name: "Riya Choudhury", present: true, termGrade: "A", attendancePct: 94 },
    { id: "17", rollNo: "SCI-125", name: "Harsh Vardhan", present: false, termGrade: "C+", attendancePct: 79 },
    { id: "18", rollNo: "SCI-126", name: "Pooja Hegde", present: true, termGrade: "A+", attendancePct: 96 },
  ],
};

export function CampusFlowSimulator() {
  const [rosters, setRosters] = useState<Record<string, Student[]>>(initialClassRosters);
  const [selectedClass, setSelectedClass] = useState<string>("Grade 10 - Section B");
  const [isSyncing, setIsSyncing] = useState<boolean>(false);
  const [isSaved, setIsSaved] = useState<boolean>(false);
  const [generatingReportId, setGeneratingReportId] = useState<string | null>(null);
  const [activeReportStudent, setActiveReportStudent] = useState<Student | null>(null);
  const [copied, setCopied] = useState<boolean>(false);

  const students = rosters[selectedClass] || [];

  const toggleAttendance = (id: string) => {
    setIsSaved(false);
    setRosters((prev) => ({
      ...prev,
      [selectedClass]: prev[selectedClass].map((s) =>
        s.id === id ? { ...s, present: !s.present } : s
      ),
    }));
  };

  const markAllPresent = () => {
    setIsSaved(false);
    setRosters((prev) => ({
      ...prev,
      [selectedClass]: prev[selectedClass].map((s) => ({ ...s, present: true })),
    }));
  };

  const presentCount = students.filter((s) => s.present).length;
  const absentCount = students.length - presentCount;

  const handleSaveBatch = () => {
    setIsSyncing(true);
    setTimeout(() => {
      setIsSyncing(false);
      setIsSaved(true);
      setTimeout(() => setIsSaved(false), 4000);
    }, 600);
  };

  const handleGenerateReportCard = (student: Student) => {
    setGeneratingReportId(student.id);
    setTimeout(() => {
      setGeneratingReportId(null);
      setActiveReportStudent(student);
      setCopied(false);
    }, 450);
  };

  const handleCopyReport = () => {
    if (!activeReportStudent) return;
    const text = `ACADEMIC REPORT CARD\n---------------------------------\nStudent: ${activeReportStudent.name} (${activeReportStudent.rollNo})\nClass: ${selectedClass}\nTerm Grade: ${activeReportStudent.termGrade}\nCumulative Attendance: ${activeReportStudent.attendancePct}%\nStatus: Verified by Institution System\nGenerated At: ${new Date().toLocaleTimeString()}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="rounded-3xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 sm:p-8 space-y-6 shadow-sm">
      {/* Simulator Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-orange-600 dark:text-orange-400 font-semibold uppercase">
              Interactive Prototype Sandbox
            </span>
            <Badge variant="demo">Live Simulator</Badge>
          </div>
          <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white tracking-tight mt-1">
            CampusFlow 1-Click Roll Call & Grade Engine
          </h3>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <select
            value={selectedClass}
            onChange={(e) => {
              setSelectedClass(e.target.value);
              setIsSaved(false);
              setActiveReportStudent(null);
            }}
            className="px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-mono text-slate-800 dark:text-slate-200 font-medium focus:outline-none focus:border-orange-500 cursor-pointer transition-colors shadow-2xs"
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
        <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200/90 dark:border-slate-800 shadow-2xs">
          <div className="text-slate-500 dark:text-slate-400 font-medium">Total Enrolled</div>
          <div className="text-xl font-bold text-slate-900 dark:text-white mt-1">{students.length}</div>
        </div>
        <div className="p-3.5 rounded-2xl bg-emerald-50/80 dark:bg-emerald-950/40 border border-emerald-200/90 dark:border-emerald-900/50 shadow-2xs">
          <div className="text-emerald-700 dark:text-emerald-400 font-semibold">Present Today</div>
          <div className="text-xl font-bold text-emerald-800 dark:text-emerald-300 mt-1">{presentCount}</div>
        </div>
        <div className="p-3.5 rounded-2xl bg-red-50/80 dark:bg-red-950/40 border border-red-200/90 dark:border-red-900/50 shadow-2xs">
          <div className="text-red-700 dark:text-red-400 font-semibold">Absentees</div>
          <div className="text-xl font-bold text-red-800 dark:text-red-300 mt-1">{absentCount}</div>
        </div>
      </div>

      {/* Roster Table */}
      <div className="overflow-x-auto rounded-2xl border border-slate-100 dark:border-slate-800">
        <table className="w-full text-left text-xs font-mono">
          <thead>
            <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-950/60 text-slate-500 dark:text-slate-400 uppercase text-[11px]">
              <th className="py-3 pl-3">Roll No</th>
              <th className="py-3">Student Name</th>
              <th className="py-3">Attendance</th>
              <th className="py-3">Avg Rate</th>
              <th className="py-3 text-right pr-3">Quick Report</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {students.map((student) => (
              <tr key={student.id} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors">
                <td className="py-3 pl-3 text-slate-500 dark:text-slate-400 font-semibold">{student.rollNo}</td>
                <td className="py-3 text-slate-900 dark:text-slate-100 font-sans font-medium">{student.name}</td>
                <td className="py-3">
                  <button
                    onClick={() => toggleAttendance(student.id)}
                    className={`px-3 py-1 rounded-lg text-[11px] font-semibold inline-flex items-center gap-1.5 transition-all cursor-pointer shadow-2xs ${
                      student.present
                        ? "bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 hover:bg-emerald-100 dark:hover:bg-emerald-900/60"
                        : "bg-red-50 dark:bg-red-950/50 text-red-700 dark:text-red-300 border border-red-200 dark:border-red-800 hover:bg-red-100 dark:hover:bg-red-900/60"
                    }`}
                  >
                    {student.present ? (
                      <>
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                        <span>Present</span>
                      </>
                    ) : (
                      <>
                        <XCircle className="w-3.5 h-3.5 text-red-600 dark:text-red-400" />
                        <span>Absent</span>
                      </>
                    )}
                  </button>
                </td>
                <td className="py-3 text-slate-600 dark:text-slate-400 font-medium">{student.attendancePct}%</td>
                <td className="py-3 text-right pr-3">
                  <button
                    onClick={() => handleGenerateReportCard(student)}
                    disabled={generatingReportId === student.id}
                    className="text-orange-600 dark:text-orange-400 hover:text-orange-700 dark:hover:text-orange-300 inline-flex items-center gap-1 font-semibold hover:underline cursor-pointer disabled:opacity-50"
                  >
                    {generatingReportId === student.id ? (
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    ) : (
                      <FileText className="w-3.5 h-3.5" />
                    )}
                    <span>Card</span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Action Footer */}
      <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-xs text-slate-500 dark:text-slate-400 font-mono">
          {isSyncing ? (
            <span className="text-orange-600 dark:text-orange-400 font-medium flex items-center gap-1.5 animate-pulse">
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
              <span>Transmitting batch to PostgreSQL ledger...</span>
            </span>
          ) : isSaved ? (
            <span className="text-emerald-700 dark:text-emerald-400 font-semibold flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              <span>Batch synchronized to PostgreSQL ledger in 12ms (0 conflicts).</span>
            </span>
          ) : (
            <span>Click any status button to toggle. Changes cache offline in IndexedDB.</span>
          )}
        </div>

        <Button
          size="sm"
          variant="primary"
          onClick={handleSaveBatch}
          disabled={isSyncing}
          className="cursor-pointer"
        >
          {isSyncing ? (
            <>
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
              <span>Syncing...</span>
            </>
          ) : (
            <>
              <Database className="w-3.5 h-3.5" />
              <span>Sync Attendance Record</span>
            </>
          )}
        </Button>
      </div>

      {/* Generated Report Card Preview Modal */}
      {activeReportStudent && (
        <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-950/80 border border-orange-200 dark:border-orange-900/50 space-y-4 font-mono text-xs shadow-xs animate-in fade-in duration-200">
          <div className="flex items-center justify-between text-orange-700 dark:text-orange-400 font-semibold border-b border-orange-200/60 dark:border-orange-900/50 pb-2.5">
            <span className="flex items-center gap-1.5">
              <GraduationCap className="w-4 h-4 text-orange-600 dark:text-orange-400" />
              <span>// Dynamic PDF Grade Sheet Generator Output</span>
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={handleCopyReport}
                className="px-2.5 py-1 rounded-md bg-white dark:bg-slate-900 border border-orange-200 dark:border-orange-800 text-orange-800 dark:text-orange-300 hover:bg-orange-100 dark:hover:bg-slate-800 transition-colors inline-flex items-center gap-1 font-semibold cursor-pointer shadow-2xs"
              >
                {copied ? (
                  <>
                    <Check className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3 h-3 text-orange-600 dark:text-orange-400" />
                    <span>Copy Card</span>
                  </>
                )}
              </button>
              <button
                onClick={() => setActiveReportStudent(null)}
                className="p-1 rounded text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 cursor-pointer"
                title="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 space-y-3 font-sans shadow-2xs">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-800 pb-2.5">
              <div>
                <h4 className="text-base font-bold text-slate-900 dark:text-white">
                  {activeReportStudent.name}
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-mono">
                  Roll No: {activeReportStudent.rollNo} • Class: {selectedClass}
                </p>
              </div>
              <Badge variant="brand">Academic Record</Badge>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 font-mono text-xs">
              <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-950/60 border border-slate-100 dark:border-slate-800">
                <span className="text-slate-500 dark:text-slate-400 block text-[11px]">Term Assessment:</span>
                <strong className="text-slate-900 dark:text-white text-sm font-bold">
                  Grade {activeReportStudent.termGrade}
                </strong>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-950/60 border border-slate-100 dark:border-slate-800">
                <span className="text-slate-500 dark:text-slate-400 block text-[11px]">Cumulative Attendance:</span>
                <strong className="text-emerald-700 dark:text-emerald-400 text-sm font-bold">
                  {activeReportStudent.attendancePct}%
                </strong>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-950/60 border border-slate-100 dark:border-slate-800 col-span-2 sm:col-span-1">
                <span className="text-slate-500 dark:text-slate-400 block text-[11px]">Verification Seal:</span>
                <span className="text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1 mt-0.5">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Verified</span>
                </span>
              </div>
            </div>

            <div className="text-[11px] font-mono text-slate-400 dark:text-slate-500 pt-1 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <span>Timestamp: {new Date().toLocaleTimeString()}</span>
              <span>DocuSign / SHA-256 Validated</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

