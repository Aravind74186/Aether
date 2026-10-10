import React from "react";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { StatusDashboard } from "@/components/status/StatusDashboard";
import { createMetadata } from "@/lib/metadata";
import { Radio } from "lucide-react";

export const metadata = createMetadata({
  title: "Live System Health & Status Console | Aether",
  description:
    "Real-time operational status, average API latency metrics, and 90-day rolling uptime reports across all Aether production clusters.",
  path: "/status",
});

export default function StatusPage() {
  return (
    <div className="py-12 sm:py-16 space-y-16">
      <Container size="xl">
        <Breadcrumbs items={[{ name: "System Status" }]} />

        {/* Page Hero */}
        <div className="max-w-3xl space-y-4">
          <Badge variant="success">Real-Time Telemetry</Badge>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 leading-tight">
            System Reliability & <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-600">
              Operational Status.
            </span>
          </h1>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed pt-2">
            Continuous health telemetry, sub-second latency tracking, and transparent uptime metrics for all active Aether gateways and database clusters.
          </p>
        </div>

        {/* Interactive Status Console */}
        <div className="mt-12">
          <StatusDashboard />
        </div>
      </Container>
    </div>
  );
}
