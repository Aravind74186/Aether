import React from "react";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { siteConfig } from "@/data/site-config";
import { createMetadata } from "@/lib/metadata";
import { Cookie } from "lucide-react";

export const metadata = createMetadata({
  title: "Cookie Policy | Aether Technologies",
  description: "Information regarding cookie usage on Aether Technologies website.",
  path: "/cookies",
});

export default function CookiesPage() {
  return (
    <div className="py-12 sm:py-16 space-y-12">
      <Container size="md">
        <Breadcrumbs items={[{ name: "Cookie Policy" }]} />

        <div className="space-y-4">
          <Badge variant="brand">Privacy & Tracking</Badge>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
            Cookie Policy
          </h1>
          <p className="text-xs font-mono text-slate-400">
            Last Updated: January 1, 2025 • Minimal Privacy Policy
          </p>
        </div>

        <div className="space-y-8 text-sm text-slate-300 leading-relaxed pt-6">
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-white tracking-tight">
              1. Our Minimal Cookie Policy
            </h2>
            <p>
              {siteConfig.name} values user privacy. We do not use intrusive cross-site advertising trackers, behavioral data aggregators, or third-party pixel tracking networks.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-white tracking-tight">
              2. Essential Cookies
            </h2>
            <p>
              We only use essential technical cookies required for the secure operation of our web application:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-slate-400">
              <li>Session security tokens (CSRF protection) preventing request tampering.</li>
              <li>User theme / visual preferences (dark mode state).</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-white tracking-tight">
              3. Managing Cookies in Your Browser
            </h2>
            <p>
              You can control and delete cookies through your standard browser settings. Disabling essential cookies may affect some interactive form submission features.
            </p>
          </section>
        </div>
      </Container>
    </div>
  );
}
