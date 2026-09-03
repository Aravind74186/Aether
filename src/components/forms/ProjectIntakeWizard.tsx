"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/Button";
import {
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Clock,
  DollarSign,
  Send,
  AlertCircle,
} from "lucide-react";

interface WizardData {
  projectGoal: string;
  problemToSolve: string;
  targetUsers: string;
  projectStage: string;
  projectType: string[];
  timeline: string;
  budget: string;
  fullName: string;
  email: string;
  organization: string;
  additionalNotes: string;
}

export function ProjectIntakeWizard() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [stepError, setStepError] = useState<string | null>(null);

  const [formData, setFormData] = useState<WizardData>({
    projectGoal: "",
    problemToSolve: "",
    targetUsers: "",
    projectStage: "Idea",
    projectType: ["Web Application"],
    timeline: "1-3 months",
    budget: "MVP ($5,000 - $10,000)",
    fullName: "",
    email: "",
    organization: "",
    additionalNotes: "",
  });

  const stages = [
    { id: "Idea", label: "Initial Concept / Idea", desc: "Need architecture planning and validation." },
    { id: "Prototype", label: "Early Prototype", desc: "Have wireframes or proof-of-concept." },
    { id: "MVP", label: "Building First MVP", desc: "Ready to engineer production product." },
    { id: "Existing Product", label: "Existing Software", desc: "Need new features or performance upgrades." },
    { id: "Modernization", label: "Legacy Modernization", desc: "Replacing outdated software/spreadsheets." },
  ];

  const projectTypes = [
    "Web Application",
    "School / College ERP",
    "AI / RAG Pipeline",
    "Startup MVP",
    "Database Migration",
    "API & Cloud Architecture",
    "Internal Dashboard",
    "Mobile / Responsive Portal",
  ];

  const timelines = [
    "ASAP (< 1 month)",
    "1-3 months",
    "3-6 months",
    "Long-term Partner (6+ months)",
  ];

  const budgets = [
    "Under $2,500 (Discovery / Prototype)",
    "Small Project ($2,500 - $5,000)",
    "MVP ($5,000 - $10,000)",
    "Institutional ($10,000+)",
    "Flexible / Undecided",
  ];

  const handleTypeToggle = (type: string) => {
    if (formData.projectType.includes(type)) {
      if (formData.projectType.length > 1) {
        setFormData({
          ...formData,
          projectType: formData.projectType.filter((t) => t !== type),
        });
      }
    } else {
      setFormData({
        ...formData,
        projectType: [...formData.projectType, type],
      });
    }
  };

  const validateStep = (step: number): boolean => {
    setStepError(null);
    if (step === 1) {
      if (!formData.projectGoal.trim()) {
        setStepError("Please state the primary goal or deliverable.");
        return false;
      }
      if (!formData.problemToSolve.trim()) {
        setStepError("Please briefly describe the operational problem to solve.");
        return false;
      }
      return true;
    }

    if (step === 2) {
      if (formData.projectType.length === 0) {
        setStepError("Please select at least one relevant project category.");
        return false;
      }
      return true;
    }

    if (step === 4) {
      if (!formData.fullName.trim()) {
        setStepError("Please enter your full name.");
        return false;
      }
      if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        setStepError("Please enter a valid official email address.");
        return false;
      }
      if (!formData.organization.trim()) {
        setStepError("Please specify your organization or school name.");
        return false;
      }
      return true;
    }

    return true;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => Math.min(prev + 1, 4));
    }
  };

  const handleBack = () => {
    setStepError(null);
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep(4)) return;

    setIsSubmitting(true);
    try {
      const res = await fetch("/api/start-a-project", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const json = await res.json();

      if (!res.ok) {
        setStepError(json.error || "Failed to process request. Please try again.");
        return;
      }

      setIsCompleted(true);
    } catch {
      setStepError("Network error. Please contact hello@aethertech.example.com directly.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isCompleted) {
    return (
      <div className="rounded-3xl border border-emerald-200 bg-emerald-50/60 p-8 sm:p-12 text-center space-y-6 shadow-sm">
        <div className="w-16 h-16 rounded-full bg-emerald-100 border border-emerald-300 flex items-center justify-center text-emerald-700 mx-auto shadow-2xs">
          <CheckCircle2 className="w-8 h-8" />
        </div>
        <div className="space-y-2">
          <h2 className="text-3xl font-bold text-slate-900">Project Scope Received!</h2>
          <p className="text-sm text-slate-600 max-w-lg mx-auto leading-relaxed">
            Thank you, <strong className="text-slate-900">{formData.fullName}</strong>. Our engineering team has received your project briefing for <strong className="text-slate-900">{formData.organization}</strong>.
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-slate-200 max-w-md mx-auto text-left text-xs font-mono space-y-2 text-slate-700 shadow-2xs">
          <div className="text-slate-500 uppercase font-bold">// Summary of Request</div>
          <div>• Goal: {formData.projectGoal}</div>
          <div>• Stage: {formData.projectStage}</div>
          <div>• Timeline: {formData.timeline}</div>
          <div>• Budget: {formData.budget}</div>
        </div>

        <p className="text-xs text-slate-500">
          We will review technical requirements and send an initial feasibility and milestone proposal within 24 business hours.
        </p>

        <div className="pt-2">
          <Button
            size="md"
            variant="outline"
            onClick={() => {
              setIsCompleted(false);
              setCurrentStep(1);
            }}
          >
            Submit Another Intake
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-3xl border border-slate-200/90 bg-white p-6 sm:p-10 shadow-lg shadow-slate-900/5 space-y-8">
      {/* Step Progress Bar */}
      <div className="space-y-3 pb-6 border-b border-slate-100">
        <div className="flex items-center justify-between text-xs font-mono">
          <span className="text-orange-700 font-bold">
            Step 0{currentStep} of 04
          </span>
          <span className="text-slate-500 font-medium">
            {currentStep === 1 && "Problem & Goals"}
            {currentStep === 2 && "Stage & Solution Type"}
            {currentStep === 3 && "Timeline & Budget"}
            {currentStep === 4 && "Contact & Confirmation"}
          </span>
        </div>
        <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-orange-600 to-amber-600 transition-all duration-300"
            style={{ width: `${(currentStep / 4) * 100}%` }}
          />
        </div>
      </div>

      {stepError && (
        <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-mono flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
          <span>{stepError}</span>
        </div>
      )}

      {/* Step 1: Goals & Problem */}
      {currentStep === 1 && (
        <div className="space-y-6 animate-in fade-in duration-200">
          <div className="space-y-1">
            <h2 className="text-xl font-bold text-slate-900">What are you trying to build?</h2>
            <p className="text-xs text-slate-500">
              Help us understand the purpose and who will benefit from this software.
            </p>
          </div>

          <div className="space-y-2">
            <label className="block text-xs font-mono uppercase tracking-wider text-slate-700 font-bold">
              1. Project Vision / Core Deliverable <span className="text-orange-600">*</span>
            </label>
            <input
              type="text"
              placeholder="e.g. Student attendance portal for our school, or MVP for a B2B logistics SaaS"
              value={formData.projectGoal}
              onChange={(e) => setFormData({ ...formData, projectGoal: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-orange-500 focus:bg-white shadow-2xs transition-colors"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-xs font-mono uppercase tracking-wider text-slate-700 font-bold">
              2. What operational problem does this solve? <span className="text-orange-600">*</span>
            </label>
            <textarea
              rows={3}
              placeholder="e.g. Teachers currently waste 15 minutes every morning logging paper attendance, or manual order spreadsheets keep getting corrupted"
              value={formData.problemToSolve}
              onChange={(e) => setFormData({ ...formData, problemToSolve: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-orange-500 focus:bg-white shadow-2xs transition-colors"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-xs font-mono uppercase tracking-wider text-slate-700 font-bold">
              3. Who are the primary end users?
            </label>
            <input
              type="text"
              placeholder="e.g. Teachers, parents, warehouse staff, paying SaaS customers"
              value={formData.targetUsers}
              onChange={(e) => setFormData({ ...formData, targetUsers: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-orange-500 focus:bg-white shadow-2xs transition-colors"
            />
          </div>
        </div>
      )}

      {/* Step 2: Stage & Project Types */}
      {currentStep === 2 && (
        <div className="space-y-6 animate-in fade-in duration-200">
          <div className="space-y-1">
            <h2 className="text-xl font-bold text-slate-900">Current Stage & Software Scope</h2>
            <p className="text-xs text-slate-500">
              Select where you are currently at and the types of technology needed.
            </p>
          </div>

          {/* Current Stage */}
          <div className="space-y-2">
            <label className="block text-xs font-mono uppercase tracking-wider text-slate-700 font-bold">
              What stage is the project at?
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {stages.map((stage) => (
                <button
                  type="button"
                  key={stage.id}
                  onClick={() => setFormData({ ...formData, projectStage: stage.id })}
                  className={`p-3.5 rounded-2xl border text-left transition-all ${
                    formData.projectStage === stage.id
                      ? "border-orange-600 bg-orange-50/80 shadow-xs text-slate-900"
                      : "border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700"
                  }`}
                >
                  <div className="text-sm font-bold text-slate-900">{stage.label}</div>
                  <div className="text-xs text-slate-500 mt-0.5">{stage.desc}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Project Types */}
          <div className="space-y-2 pt-2">
            <label className="block text-xs font-mono uppercase tracking-wider text-slate-700 font-bold">
              Select all relevant project categories:
            </label>
            <div className="flex flex-wrap gap-2">
              {projectTypes.map((type) => {
                const isSelected = formData.projectType.includes(type);
                return (
                  <button
                    type="button"
                    key={type}
                    onClick={() => handleTypeToggle(type)}
                    className={`px-3 py-2 rounded-xl text-xs font-mono transition-all ${
                      isSelected
                        ? "bg-orange-600 text-white font-semibold shadow-xs"
                        : "bg-slate-50 border border-slate-200 text-slate-700 hover:bg-slate-100"
                    }`}
                  >
                    {isSelected ? "✓ " : "+ "}
                    {type}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Step 3: Timeline & Budget */}
      {currentStep === 3 && (
        <div className="space-y-6 animate-in fade-in duration-200">
          <div className="space-y-1">
            <h2 className="text-xl font-bold text-slate-900">Timeline & Budget Expectations</h2>
            <p className="text-xs text-slate-500">
              Clear parameters help us architect a realistic milestone delivery schedule.
            </p>
          </div>

          {/* Timeline */}
          <div className="space-y-2">
            <label className="text-xs font-mono uppercase tracking-wider text-slate-700 font-bold flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-orange-600" />
              <span>Target Delivery Window</span>
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {timelines.map((tl) => (
                <button
                  type="button"
                  key={tl}
                  onClick={() => setFormData({ ...formData, timeline: tl })}
                  className={`p-3.5 rounded-2xl border text-left text-xs font-mono transition-all ${
                    formData.timeline === tl
                      ? "border-orange-600 bg-orange-50/80 text-orange-700 font-bold shadow-xs"
                      : "border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100"
                  }`}
                >
                  {tl}
                </button>
              ))}
            </div>
          </div>

          {/* Budget */}
          <div className="space-y-2 pt-2">
            <label className="text-xs font-mono uppercase tracking-wider text-slate-700 font-bold flex items-center gap-1.5">
              <DollarSign className="w-3.5 h-3.5 text-emerald-600" />
              <span>Estimated Budget Allocation</span>
            </label>
            <div className="space-y-2">
              {budgets.map((b) => (
                <button
                  type="button"
                  key={b}
                  onClick={() => setFormData({ ...formData, budget: b })}
                  className={`w-full p-3 rounded-2xl border text-left text-xs font-mono transition-all ${
                    formData.budget === b
                      ? "border-emerald-600 bg-emerald-50/80 text-emerald-800 font-bold shadow-xs"
                      : "border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100"
                  }`}
                >
                  {b}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Step 4: Contact & Final Review */}
      {currentStep === 4 && (
        <form onSubmit={handleSubmit} className="space-y-6 animate-in fade-in duration-200">
          <div className="space-y-1">
            <h2 className="text-xl font-bold text-slate-900">Your Contact Details</h2>
            <p className="text-xs text-slate-500">
              Where should our engineering team send the technical scoping breakdown?
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="block text-xs font-mono uppercase tracking-wider text-slate-700 font-bold">
                Your Full Name <span className="text-orange-600">*</span>
              </label>
              <input
                type="text"
                placeholder="Jane Doe"
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-orange-500 focus:bg-white shadow-2xs"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-xs font-mono uppercase tracking-wider text-slate-700 font-bold">
                Work / Official Email <span className="text-orange-600">*</span>
              </label>
              <input
                type="email"
                placeholder="jane@organization.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-orange-500 focus:bg-white shadow-2xs"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-xs font-mono uppercase tracking-wider text-slate-700 font-bold">
              Organization / School / Startup <span className="text-orange-600">*</span>
            </label>
            <input
              type="text"
              placeholder="e.g. St. Thomas Academy, Logistics Pro, etc."
              value={formData.organization}
              onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-orange-500 focus:bg-white shadow-2xs"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-xs font-mono uppercase tracking-wider text-slate-700 font-bold">
              Additional Technical Notes or Links (Optional)
            </label>
            <textarea
              rows={2}
              placeholder="Any existing repositories, design links, or specific database constraints..."
              value={formData.additionalNotes}
              onChange={(e) => setFormData({ ...formData, additionalNotes: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-orange-500 focus:bg-white shadow-2xs"
            />
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs font-mono text-slate-700 space-y-1 shadow-2xs">
            <div className="text-slate-900 font-bold">Summary Preview:</div>
            <div>• Goal: {formData.projectGoal || "Not specified"}</div>
            <div>• Stage: {formData.projectStage} • Timeline: {formData.timeline}</div>
            <div>• Scope: {formData.projectType.join(", ")}</div>
          </div>
        </form>
      )}

      {/* Navigation Buttons */}
      <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
        {currentStep > 1 ? (
          <Button
            type="button"
            size="md"
            variant="outline"
            onClick={handleBack}
            className="flex items-center gap-1.5"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back</span>
          </Button>
        ) : (
          <div />
        )}

        {currentStep < 4 ? (
          <Button
            type="button"
            size="md"
            variant="primary"
            onClick={handleNext}
            className="flex items-center gap-1.5"
          >
            <span>Next Step</span>
            <ArrowRight className="w-4 h-4" />
          </Button>
        ) : (
          <Button
            type="button"
            size="lg"
            variant="primary"
            onClick={handleSubmit}
            isLoading={isSubmitting}
            className="flex items-center gap-2"
          >
            <Send className="w-4 h-4" />
            <span>Submit Scoping Request</span>
          </Button>
        )}
      </div>
    </div>
  );
}
