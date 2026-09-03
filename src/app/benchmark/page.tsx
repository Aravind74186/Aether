import React from "react";
import { Container } from "@/components/ui/Container";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { LoadBenchmarkCalculator } from "@/components/benchmark/LoadBenchmarkCalculator";
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata({
  title: "Cloud Infrastructure Load & Benchmark Sizing Calculator | Aether",
  description:
    "Model peak concurrent users, requests per second, and database connection pools to estimate exact server sizing and monthly cloud hosting costs.",
  path: "/benchmark",
});

export default function BenchmarkPage() {
  return (
    <div className="py-12 sm:py-16 space-y-12">
      <Container size="xl">
        <Breadcrumbs items={[{ name: "Cloud Infrastructure & Load Calculator" }]} />
        <div className="mt-8">
          <LoadBenchmarkCalculator />
        </div>
      </Container>
    </div>
  );
}
