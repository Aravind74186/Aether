"use client";

import React, { useState } from "react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import {
  Code2,
  Terminal,
  Database,
  Key,
  ShieldCheck,
  Check,
  Copy,
  Layers,
  Sparkles,
  BookOpen,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

interface DocTopic {
  id: string;
  title: string;
  category: "Architecture" | "API & Auth" | "Database & RAG" | "Webhooks";
  summary: string;
  codeSnippet: string;
  details: string[];
}

const docTopics: DocTopic[] = [
  {
    id: "rest_standards",
    title: "RESTful API Standards & Response Envelopes",
    category: "API & Auth",
    summary: "Consistent JSON envelope structure, HTTP status codes, and runtime Zod validation across all endpoints.",
    codeSnippet: `// Standard Success Response
{
  "success": true,
  "data": {
    "id": "usr_9921a",
    "name": "Dr. Arvind Rao",
    "role": "PRINCIPAL",
    "permissions": ["grades:approve", "attendance:view_all"]
  },
  "meta": {
    "requestId": "req_8812f",
    "timestamp": "2025-01-15T10:30:00Z"
  }
}

// Standard Validation Error (400 Bad Request)
{
  "success": false,
  "error": {
    "code": "VALIDATION_FAILED",
    "message": "Invalid email address format.",
    "issues": [{ "field": "email", "rule": "email" }]
  }
}`,
    details: [
      "All mutating requests (POST, PUT, PATCH) require strict Zod schema validation before database execution.",
      "Responses return standard HTTP status codes: 200 OK, 201 Created, 400 Bad Request, 401 Unauthorized, 429 Too Many Requests.",
      "Every response includes unique request tracing headers for audit trails.",
    ],
  },
  {
    id: "auth_rbac",
    title: "Authentication & Role-Based Access Control",
    category: "API & Auth",
    summary: "Encrypted HTTP-only SameSite=Strict cookies with Argon2id password hashing and granular permission middleware.",
    codeSnippet: `// Middleware Role Enforcement Pattern
export async function enforceRole(
  req: NextRequest, 
  allowedRoles: Role[]
) {
  const session = await verifyEncryptedSession(req);
  
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!allowedRoles.includes(session.user.role)) {
    return NextResponse.json(
      { error: "Forbidden: Insufficient privileges" }, 
      { status: 403 }
    );
  }

  return session;
}`,
    details: [
      "Tokens are stored exclusively in secure, encrypted HTTP-only cookies to prevent XSS credential theft.",
      "Sessions auto-expire after 7 days of inactivity with seamless sliding refresh tokens.",
      "Row-level multi-tenant filters ensure staff only access records belonging to their assigned organization.",
    ],
  },
  {
    id: "postgres_db",
    title: "PostgreSQL Schema & ACID Transactions",
    category: "Database & RAG",
    summary: "Relational data modeling with Prisma ORM, strict foreign key cascades, and atomic multi-table transactions.",
    codeSnippet: `// Atomic Gradebook Submission Transaction
await prisma.$transaction(async (tx) => {
  // 1. Record individual student test marks
  await tx.gradeEntry.createMany({
    data: evaluatedMarks,
  });

  // 2. Update classroom overall average & term status
  await tx.classSection.update({
    where: { id: classId },
    data: { termStatus: "EVALUATION_COMPLETED" },
  });

  // 3. Append immutable audit event
  await tx.auditLog.create({
    data: {
      action: "GRADEBOOK_PUBLISHED",
      userId: teacherId,
      entityId: classId,
    },
  });
});`,
    details: [
      "Strict schema migrations executed via automated CI/CD pipelines.",
      "Indexes placed on all foreign keys, composite filters, and search timestamps.",
      "Automated daily WAL backups supporting Point-in-Time Recovery (PITR).",
    ],
  },
  {
    id: "rag_vector",
    title: "DocuPulse pgvector Semantic Search & Citations",
    category: "Database & RAG",
    summary: "Hybrid keyword + cosine similarity search over chunked PDF documents with verified page bounding boxes.",
    codeSnippet: `-- pgvector HNSW Cosine Similarity Query
SELECT 
  document_id,
  page_number,
  chunk_text,
  1 - (embedding <=> $1) AS similarity_score
FROM document_embeddings
WHERE organization_id = $2
ORDER BY similarity_score DESC
LIMIT 5;`,
    details: [
      "Documents are parsed into 500-token semantic chunks with 50-token overlap.",
      "Embeddings generated via standard OpenAI text-embedding-3-small vectors (1,536 dimensions).",
      "Exact page-level bounding box coordinates stored for verifiable inline PDF highlights.",
    ],
  },
];

export function DocsViewer() {
  const [activeTopicId, setActiveTopicId] = useState("rest_standards");
  const [copied, setCopied] = useState(false);

  const activeTopic = docTopics.find((t) => t.id === activeTopicId) || docTopics[0];

  const handleCopy = () => {
    navigator.clipboard.writeText(activeTopic.codeSnippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 sm:p-10 shadow-2xl space-y-8">
      {/* Top Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-orange-400 font-semibold uppercase">
              Engineering Standards Reference
            </span>
            <Badge variant="brand">Developer Docs v1.2</Badge>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mt-1">
            System Architecture & API Standards
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Technical specifications for engineering leads, security auditors, and institutional IT teams.
          </p>
        </div>
      </div>

      {/* Main Grid: Topic Nav vs Content Viewer */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Sidebar Nav */}
        <div className="lg:col-span-4 space-y-2 font-mono text-xs">
          <div className="text-slate-400 uppercase font-semibold text-[11px] mb-2 px-1">
            Documentation Modules:
          </div>
          {docTopics.map((topic) => (
            <button
              key={topic.id}
              onClick={() => setActiveTopicId(topic.id)}
              className={`w-full text-left p-3.5 rounded-xl border transition-all space-y-1 ${
                activeTopicId === topic.id
                  ? "border-orange-500 bg-orange-950/40 text-white font-semibold shadow-md"
                  : "border-slate-800 bg-slate-950/60 text-slate-400 hover:text-white hover:border-slate-700"
              }`}
            >
              <div className="text-[10px] text-orange-400 uppercase">{topic.category}</div>
              <div className="font-sans font-bold text-sm text-slate-100">{topic.title}</div>
            </button>
          ))}
        </div>

        {/* Content Viewer */}
        <div className="lg:col-span-8 space-y-6">
          <div className="rounded-2xl border border-slate-800 bg-slate-950 p-6 sm:p-8 space-y-6 shadow-2xl">
            <div className="space-y-2">
              <span className="text-xs font-mono text-orange-400 uppercase tracking-wider">
                {activeTopic.category} • Specification
              </span>
              <h3 className="text-xl font-bold text-white tracking-tight">
                {activeTopic.title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
                {activeTopic.summary}
              </p>
            </div>

            {/* Code Block */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-mono text-slate-400 pb-1">
                <span className="flex items-center gap-1.5 text-slate-300">
                  <Terminal className="w-3.5 h-3.5 text-orange-400" />
                  <span>Production Implementation Pattern</span>
                </span>
                <button
                  onClick={handleCopy}
                  className="hover:text-white transition-colors flex items-center gap-1 px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-[11px]"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? "Copied" : "Copy Code"}</span>
                </button>
              </div>

              <pre className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 text-xs font-mono text-slate-200 overflow-x-auto leading-relaxed max-h-96">
                <code>{activeTopic.codeSnippet}</code>
              </pre>
            </div>

            {/* Architectural Highlights */}
            <div className="space-y-3 pt-2 border-t border-slate-800/80">
              <div className="text-xs font-mono uppercase text-slate-400 font-semibold">
                Key Architectural Rules & Guarantees:
              </div>
              <ul className="space-y-2 text-xs font-sans text-slate-300">
                {activeTopic.details.map((detail, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{detail}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
