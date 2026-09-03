import React from "react";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { ContactForm } from "@/components/forms/ContactForm";
import { siteConfig } from "@/data/site-config";
import { createMetadata } from "@/lib/metadata";
import { Mail, MapPin, Github, Linkedin } from "lucide-react";

export const metadata = createMetadata({
  title: "Contact Our Engineering Team | Inquiries & Discovery Calls",
  description:
    "Get in touch with Aether Technologies. Submit a project request or schedule an initial technical discovery session with our engineers.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <div className="py-12 sm:py-16 space-y-16 bg-white">
      <Container size="xl">
        <Breadcrumbs items={[{ name: "Contact" }]} />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Left Column: Contact Information & Direct Channels */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-4">
              <Badge variant="brand">Direct Communication</Badge>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 leading-tight">
                Let&apos;s Discuss Your <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-amber-600">
                  Next Technology Build.
                </span>
              </h1>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                Whether you have an immediate software project, need to modernize legacy school tools, or want an architecture review for your startup, we are ready to help.
              </p>
            </div>

            {/* Direct Contact Details */}
            <div className="space-y-4 pt-4 border-t border-slate-200">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-start gap-4 shadow-2xs">
                <div className="p-2.5 rounded-xl bg-orange-50 border border-orange-200 text-orange-600 shadow-2xs">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-mono uppercase text-slate-500 font-semibold">
                    Direct Engineering Email
                  </div>
                  <a
                    href={`mailto:${siteConfig.contactEmail}`}
                    className="text-sm font-bold text-slate-900 hover:text-orange-600 transition-colors font-mono"
                  >
                    {siteConfig.contactEmail}
                  </a>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Average response within 24 business hours
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-start gap-4 shadow-2xs">
                <div className="p-2.5 rounded-xl bg-white border border-slate-200 text-slate-600 shadow-2xs">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-mono uppercase text-slate-500 font-semibold">
                    Location & HQ
                  </div>
                  <div className="text-sm font-bold text-slate-900">
                    {siteConfig.location}
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Operating remotely worldwide across IST / UTC time zones
                  </p>
                </div>
              </div>
            </div>

            {/* Social Channels */}
            <div className="space-y-3 pt-2">
              <div className="text-xs font-mono uppercase text-slate-500 font-semibold">
                Developer Repositories & Profiles:
              </div>
              <div className="flex items-center gap-3">
                <a
                  href={siteConfig.socialLinks.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-xl bg-white border border-slate-200 text-slate-700 hover:text-orange-600 hover:border-orange-300 text-xs font-mono flex items-center gap-2 transition-colors shadow-2xs"
                >
                  <Github className="w-4 h-4" />
                  <span>GitHub Repository</span>
                </a>
                <a
                  href={siteConfig.socialLinks.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-xl bg-white border border-slate-200 text-slate-700 hover:text-orange-600 hover:border-orange-300 text-xs font-mono flex items-center gap-2 transition-colors shadow-2xs"
                >
                  <Linkedin className="w-4 h-4" />
                  <span>LinkedIn Profile</span>
                </a>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-orange-50/60 border border-orange-200/80 text-xs font-mono text-slate-700 space-y-1">
              <div className="text-orange-700 font-bold">// Our Commitment</div>
              <p>No high-pressure sales reps. You communicate directly with engineers who will work on your software.</p>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7">
            <div className="rounded-3xl border border-slate-200/90 bg-white p-8 sm:p-10 shadow-lg shadow-slate-900/5">
              <div className="mb-6 space-y-1">
                <h2 className="text-xl font-bold text-slate-900 tracking-tight">
                  Submit a Project Request
                </h2>
                <p className="text-xs sm:text-sm text-slate-600">
                  Fill in the details below to receive a scoping estimate and feasibility analysis.
                </p>
              </div>

              <ContactForm />
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
