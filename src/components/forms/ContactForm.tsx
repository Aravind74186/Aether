"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/Button";
import { CheckCircle2, AlertCircle, Send } from "lucide-react";

interface FormData {
  name: string;
  email: string;
  organization: string;
  projectType: string;
  budgetRange: string;
  description: string;
}

interface FormErrors {
  [key: string]: string;
}

export function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    organization: "",
    projectType: "Web Application",
    budgetRange: "$2,500 - $5,000",
    description: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Full name is required.";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email address is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address.";
    }

    if (!formData.organization.trim()) {
      newErrors.organization = "Organization / school / startup name is required.";
    }

    if (!formData.description.trim()) {
      newErrors.description = "Please provide a brief description of your project or problem.";
    } else if (formData.description.trim().length < 20) {
      newErrors.description = "Description should be at least 20 characters for our engineering team to review.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);

    if (!validate()) return;

    setIsSubmitting(true);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const json = await res.json();

      if (!res.ok) {
        setSubmitError(json.error || "Failed to submit request. Please try again.");
        return;
      }

      setIsSubmitted(true);
    } catch {
      setSubmitError("Network error. Please reach out to hello@aethertech.example.com directly.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="rounded-2xl border border-emerald-200 bg-emerald-50/60 p-8 sm:p-10 text-center space-y-4">
        <div className="w-12 h-12 rounded-full bg-emerald-100 border border-emerald-300 flex items-center justify-center text-emerald-700 mx-auto shadow-2xs">
          <CheckCircle2 className="w-6 h-6" />
        </div>
        <h3 className="text-2xl font-bold text-slate-900">Project Request Received</h3>
        <p className="text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
          Thank you for sharing your project details, <strong className="text-slate-900">{formData.name}</strong>. An engineer will review your requirements and reply within 24 business hours.
        </p>
        <div className="pt-4">
          <Button
            size="sm"
            variant="outline"
            onClick={() => {
              setIsSubmitted(false);
              setFormData({
                name: "",
                email: "",
                organization: "",
                projectType: "Web Application",
                budgetRange: "$2,500 - $5,000",
                description: "",
              });
            }}
          >
            Submit Another Request
          </Button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6" noValidate>
      {submitError && (
        <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-mono flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
          <span>{submitError}</span>
        </div>
      )}

      {/* Name and Email */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label htmlFor="name" className="block text-xs font-mono uppercase tracking-wider text-slate-700 font-bold">
            Your Name <span className="text-orange-600">*</span>
          </label>
          <input
            id="name"
            type="text"
            placeholder="Jane Doe"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className={`w-full px-4 py-2.5 rounded-xl bg-slate-50 border text-sm text-slate-900 placeholder-slate-400 focus:outline-none transition-colors shadow-2xs ${
              errors.name ? "border-red-500 focus:border-red-500" : "border-slate-200 focus:border-orange-500 focus:bg-white"
            }`}
          />
          {errors.name && <p className="text-xs text-red-600 font-mono">{errors.name}</p>}
        </div>

        <div className="space-y-2">
          <label htmlFor="email" className="block text-xs font-mono uppercase tracking-wider text-slate-700 font-bold">
            Email Address <span className="text-orange-600">*</span>
          </label>
          <input
            id="email"
            type="email"
            placeholder="jane@organization.com"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className={`w-full px-4 py-2.5 rounded-xl bg-slate-50 border text-sm text-slate-900 placeholder-slate-400 focus:outline-none transition-colors shadow-2xs ${
              errors.email ? "border-red-500 focus:border-red-500" : "border-slate-200 focus:border-orange-500 focus:bg-white"
            }`}
          />
          {errors.email && <p className="text-xs text-red-600 font-mono">{errors.email}</p>}
        </div>
      </div>

      {/* Organization */}
      <div className="space-y-2">
        <label htmlFor="organization" className="block text-xs font-mono uppercase tracking-wider text-slate-700 font-bold">
          Organization / School / Startup <span className="text-orange-600">*</span>
        </label>
        <input
          id="organization"
          type="text"
          placeholder="e.g. St. Jude High School, Apex Robotics, Local Logistics SME"
          value={formData.organization}
          onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
          className={`w-full px-4 py-2.5 rounded-xl bg-slate-50 border text-sm text-slate-900 placeholder-slate-400 focus:outline-none transition-colors shadow-2xs ${
            errors.organization ? "border-red-500 focus:border-red-500" : "border-slate-200 focus:border-orange-500 focus:bg-white"
          }`}
        />
        {errors.organization && <p className="text-xs text-red-600 font-mono">{errors.organization}</p>}
      </div>

      {/* Project Type and Budget */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label htmlFor="projectType" className="block text-xs font-mono uppercase tracking-wider text-slate-700 font-bold">
            Project Type
          </label>
          <select
            id="projectType"
            value={formData.projectType}
            onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
            className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-800 focus:outline-none focus:border-orange-500 shadow-2xs focus:bg-white"
          >
            <option value="Web Application">Web Application & Portals</option>
            <option value="School / College System">School / College System</option>
            <option value="Startup MVP">Startup MVP & Architecture</option>
            <option value="Custom Business Software">Custom Business Software</option>
            <option value="AI & Automation">AI & Automation Pipeline</option>
            <option value="Technical Consulting">Technical Advisory / Code Review</option>
          </select>
        </div>

        <div className="space-y-2">
          <label htmlFor="budgetRange" className="block text-xs font-mono uppercase tracking-wider text-slate-700 font-bold">
            Estimated Budget
          </label>
          <select
            id="budgetRange"
            value={formData.budgetRange}
            onChange={(e) => setFormData({ ...formData, budgetRange: e.target.value })}
            className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-800 focus:outline-none focus:border-orange-500 shadow-2xs focus:bg-white"
          >
            <option value="Under $2,500">Under $2,500 (Discovery / Prototype)</option>
            <option value="$2,500 - $5,000">$2,500 - $5,000 (Small Project / Portal)</option>
            <option value="$5,000 - $10,000">$5,000 - $10,000 (Full MVP / System)</option>
            <option value="$10,000+">$10,000+ (Institutional / Enterprise)</option>
            <option value="Flexible / Undecided">Flexible / Needs Scoping</option>
          </select>
        </div>
      </div>

      {/* Description */}
      <div className="space-y-2">
        <label htmlFor="description" className="block text-xs font-mono uppercase tracking-wider text-slate-700 font-bold">
          Project Description & Problems to Solve <span className="text-orange-600">*</span>
        </label>
        <textarea
          id="description"
          rows={4}
          placeholder="Briefly describe what you are trying to build, who will use it, and what problem it solves..."
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          className={`w-full px-4 py-2.5 rounded-xl bg-slate-50 border text-sm text-slate-900 placeholder-slate-400 focus:outline-none transition-colors leading-relaxed shadow-2xs ${
            errors.description ? "border-red-500 focus:border-red-500" : "border-slate-200 focus:border-orange-500 focus:bg-white"
          }`}
        />
        {errors.description && <p className="text-xs text-red-600 font-mono">{errors.description}</p>}
      </div>

      {/* Submit Button */}
      <div>
        <Button
          type="submit"
          size="lg"
          variant="primary"
          isLoading={isSubmitting}
          className="w-full justify-center"
        >
          <Send className="w-4 h-4" />
          <span>Submit Project Request</span>
        </Button>
        <p className="text-[11px] font-mono text-slate-500 text-center mt-3">
          Direct review by our engineering team • No unsolicited marketing emails
        </p>
      </div>
    </form>
  );
}
