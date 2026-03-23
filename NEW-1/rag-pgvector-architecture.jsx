import { useState } from "react";

const tabs = ["Why This Stack", "DB Schema", "What to Embed", "Agent RAG Flow", "Model Routing", "Code: Setup", "Code: Agents", "Migration Path"];

const Badge = ({ children, color = "gray" }) => {
  const c = { gray: "bg-gray-700 text-gray-300", green: "bg-green-900 text-green-300", blue: "bg-blue-900 text-blue-300", purple: "bg-purple-900 text-purple-300", orange: "bg-orange-900 text-orange-300", yellow: "bg-yellow-900 text-yellow-300", red: "bg-red-900 text-red-300", teal: "bg-teal-900 text-teal-300" };
  return <span className={`text-xs px-2 py-0.5 rounded font-bold ${c[color]}`}>{children}</span>;
};

const SectionHead = ({ color, title, sub }) => {
  const c = { blue: "border-blue-500 text-blue-400", green: "border-green-500 text-green-400", yellow: "border-yellow-500 text-yellow-400", purple: "border-purple-500 text-purple-400", orange: "border-orange-500 text-orange-400", red: "border-red-500 text-red-400", teal: "border-teal-500 text-teal-400" };
  return <div className={`border-l-4 pl-4 mb-5 ${c[color]}`}><h3 className={`text-lg font-bold ${c[color].split(" ")[1]}`}>{title}</h3>{sub && <p className="text-gray-400 text-sm mt-1">{sub}</p>}</div>;
};

const Code = ({ children, color = "green" }) => {
  const c = { green: "text-green-300", yellow: "text-yellow-200", blue: "text-blue-200", purple: "text-purple-200", orange: "text-orange-200", teal: "text-teal-200" };
  return <pre className={`text-xs ${c[color]} bg-gray-950 rounded-xl p-5 overflow-x-auto leading-relaxed border border-gray-800`}>{children}</pre>;
};

// ── TAB 1: Why This Stack ─────────────────────────────────────────────────────
const WhyStack = () => (
  <div className="space-y-5">
    <SectionHead color="blue" title="Why pgvector + GPT-4o + Claude is the Best Stack for This" sub="You already have everything needed. Zero new infrastructure required." />

    <div className="grid grid-cols-3 gap-3">
      {[
        { icon: "🐘", title: "pgvector (Postgres)", badge: "You already have it", color: "green", points: ["Vector search inside your existing DB", "No separate vector service to manage", "Join vectors with your migration metadata in one SQL query", "Transactional — vectors + MC state in one ACID transaction"] },
        { icon: "⚡", title: "GPT-4o", badge: "For generation", color: "blue", points: ["Fast, consistent code output from a verified spec", "Best for Java boilerplate: controllers, DTOs, repos", "Best for Angular: reactive forms, services, routes", "Use when the spec is already clear — no deep reasoning needed"] },
        { icon: "🧠", title: "Claude Opus 4.6", badge: "For analysis", color: "purple", points: ["Deep reasoning on complex JSP business logic", "Best for Migration Contract generation", "Best for gate validation and error diagnosis", "Use when context is ambiguous and inference is required"] },
      ].map(item => (
        <div key={item.title} className="bg-gray-800 rounded-xl p-4 border border-gray-700">
          <div className="flex items-center gap-2 mb-2"><span className="text-2xl">{item.icon}</span><Badge color={item.color}>{item.badge}</Badge></div>
          <h4 className="text-white font-bold text-sm mb-2">{item.title}</h4>
          {item.points.map((p, i) => <div key={i} className="flex gap-2 text-xs text-gray-400 mb-1"><span className="text-green-400">✓</span><span>{p}</span></div>)}
        </div>
      ))}
    </div>

    <div className="bg-gray-800 rounded-xl p-5 border border-gray-700">
      <h4 className="text-white font-bold mb-4">How RAG Fixes the Core Problems from Your 7-Layer Pipeline</h4>
      <div className="space-y-3">
        {[
          { problem: "Entire JSP file pasted into every agent prompt → context overflow", fix: "Embed JSP chunks into pgvector. Agents retrieve only the 5–10 relevant chunks they need. 90% less context used per call.", before: "~8,000 tokens per call", after: "~800 tokens per call" },
          { problem: "Agents reinvent naming decisions every run → inconsistency", fix: "namingRegistry stored in Postgres + vector-indexed. Every agent queries it before generating. Names are retrieved, not invented.", before: "Different names each run", after: "Registry-locked, always same" },
          { problem: "No reuse of prior successful migrations → reinventing patterns", fix: "Every migrated module embedded as golden example. RAG auto-retrieves the 2 most similar past migrations as few-shot context.", before: "Manual golden-examples/ folder", after: "Auto-scales with every module" },
          { problem: "Code standards injected as giant text block → dilutes reasoning", fix: "CSM rules stored as vector chunks. Agents retrieve only the specific rules relevant to the code they're generating right now.", before: "Full 200-line CSM every call", after: "Only the 10 rules that apply" },
        ].map((item, i) => (
          <div key={i} className="bg-gray-900 rounded-lg p-4 border border-gray-700">
            <div className="flex gap-2 mb-2"><span className="text-red-400 text-xs">PROBLEM:</span><span className="text-gray-300 text-xs">{item.problem}</span></div>
            <div className="flex gap-2 mb-2"><span className="text-green-400 text-xs">FIX:</span><span className="text-gray-300 text-xs">{item.fix}</span></div>
            <div className="flex gap-4">
              <span className="text-xs bg-red-950 text-red-300 px-2 py-1 rounded">Before: {item.before}</span>
              <span className="text-xs bg-green-950 text-green-300 px-2 py-1 rounded">After: {item.after}</span>
            </div>
          </div>
        ))}
      </div>
    </div>

    <div className="bg-amber-950 border border-amber-800 rounded-xl p-4">
      <h4 className="text-amber-300 font-bold mb-2">⚡ The Single Biggest Efficiency Gain</h4>
      <p className="text-amber-200 text-sm">With RAG, your agents stop reading the whole codebase and start <strong>remembering what worked</strong>. After your first 10 migrated modules, the system has a verified pattern library. Module 11 auto-retrieves the 3 most similar prior migrations and uses them as automatic context. Your "3–4 retry" problem drops to 1 retry or zero for any pattern the system has seen before.</p>
    </div>
  </div>
);

// ── TAB 2: DB Schema ──────────────────────────────────────────────────────────
const DBSchema = () => (
  <div className="space-y-5">
    <SectionHead color="yellow" title="pgvector Schema — Complete SQL" sub="Run this once in your Postgres database. Everything lives here." />
    <Code color="yellow">{`-- ════════════════════════════════════════════════════════════
-- LEGACY MIGRATION — pgvector Schema
-- Run once. All migration state + vector search in one place.
-- ════════════════════════════════════════════════════════════

-- Enable pgvector extension
CREATE EXTENSION IF NOT EXISTS vector;

-- ── 1. LEGACY SOURCE CHUNKS ───────────────────────────────────
-- Stores chunked JSP + Java source files as searchable vectors.
-- Agents query this instead of reading raw files.
CREATE TABLE legacy_chunks (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    module_id       TEXT NOT NULL,          -- e.g. 'CustomerForm'
    file_path       TEXT NOT NULL,          -- original file path
    file_type       TEXT NOT NULL,          -- 'jsp' | 'java' | 'servlet'
    chunk_index     INT  NOT NULL,          -- position within file
    chunk_text      TEXT NOT NULL,          -- raw text of this chunk
    metadata        JSONB DEFAULT '{}',     -- field_ids, line_range, etc.
    embedding       VECTOR(1536),           -- text-embedding-3-small
    created_at      TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX ON legacy_chunks USING ivfflat (embedding vector_cosine_ops)
    WITH (lists = 100);
CREATE INDEX ON legacy_chunks (module_id, file_type);


-- ── 2. MIGRATION CONTRACT TABLE ───────────────────────────────
-- Replaces the JSON file approach. One row per module.
-- Agents query this for prior decisions instead of reading a file.
CREATE TABLE migration_contracts (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    module_id       TEXT UNIQUE NOT NULL,
    complexity      TEXT,                   -- LOW | MEDIUM | HIGH | CRITICAL
    source          JSONB DEFAULT '{}',     -- filled by analyzer agent
    target          JSONB DEFAULT '{}',     -- filled by contract-generator
    naming_registry JSONB DEFAULT '{}',     -- canonical name map
    gate_reports    JSONB DEFAULT '{}',     -- gate1, gate2, gate3 results
    active_errors   JSONB DEFAULT '[]',     -- current retry errors
    status          JSONB DEFAULT '{}',     -- phase completion flags
    approved        BOOLEAN DEFAULT FALSE,
    created_at      TIMESTAMPTZ DEFAULT NOW(),
    updated_at      TIMESTAMPTZ DEFAULT NOW()
);


-- ── 3. CODE STANDARDS (CSM) CHUNKS ───────────────────────────
-- Your csm.md split into rule-level chunks and embedded.
-- Agents retrieve only relevant rules, not the whole document.
CREATE TABLE csm_rules (
    id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    section     TEXT NOT NULL,     -- 'JAVA' | 'ANGULAR' | 'API' | 'TEST'
    rule_id     TEXT NOT NULL,     -- e.g. 'java-constructor-injection'
    rule_text   TEXT NOT NULL,     -- the actual rule content
    applies_to  TEXT[],            -- ['java_generator', 'gate_validator']
    embedding   VECTOR(1536),
    UNIQUE(section, rule_id)
);

CREATE INDEX ON csm_rules USING ivfflat (embedding vector_cosine_ops)
    WITH (lists = 50);


-- ── 4. GOLDEN EXAMPLES TABLE ──────────────────────────────────
-- Verified migrations stored as reusable patterns.
-- Auto-retrieved as few-shot examples for similar new modules.
CREATE TABLE golden_examples (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    module_id       TEXT NOT NULL,          -- which migration this came from
    pattern_type    TEXT NOT NULL,          -- 'form-field' | 'entity' | 'validator' | 'component'
    jsp_snippet     TEXT,                   -- original JSP input
    java_output     TEXT,                   -- verified Java output
    angular_output  TEXT,                   -- verified Angular output
    tags            TEXT[],                 -- ['conditional-validation', 'dropdown', etc.]
    embedding       VECTOR(1536),           -- embedded from jsp_snippet
    approved        BOOLEAN DEFAULT FALSE,  -- only approved ones get retrieved
    created_at      TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX ON golden_examples USING ivfflat (embedding vector_cosine_ops)
    WITH (lists = 50);
CREATE INDEX ON golden_examples (pattern_type, approved);


-- ── 5. NAMING REGISTRY TABLE ─────────────────────────────────
-- Flat lookup: jsp_id → java name + angular name.
-- Agents query this before generating any field name.
CREATE TABLE naming_registry (
    id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    module_id   TEXT NOT NULL,
    jsp_id      TEXT NOT NULL,          -- raw JSP field id, e.g. 'cust_nm'
    java_name   TEXT NOT NULL,          -- e.g. 'customerName'
    angular_name TEXT NOT NULL,         -- e.g. 'customerName'
    context     TEXT,                   -- which entity/component this belongs to
    embedding   VECTOR(1536),           -- embedded from jsp_id + context
    UNIQUE(module_id, jsp_id)
);

CREATE INDEX ON naming_registry (module_id);
CREATE INDEX ON naming_registry USING ivfflat (embedding vector_cosine_ops)
    WITH (lists = 50);


-- ── 6. AGENT RUN LOG ──────────────────────────────────────────
-- Tracks every agent invocation: input tokens, output, model used.
-- Use this to measure retry rates and cost per module.
CREATE TABLE agent_runs (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    module_id       TEXT NOT NULL,
    agent_role      TEXT NOT NULL,      -- 'java_generator', 'gate_validator', etc.
    model_used      TEXT NOT NULL,      -- 'gpt-4o', 'claude-opus-4-6', etc.
    retry_count     INT  DEFAULT 0,
    chunks_retrieved INT DEFAULT 0,     -- how many RAG chunks were used
    input_tokens    INT,
    output_tokens   INT,
    gate_passed     BOOLEAN,
    duration_ms     INT,
    created_at      TIMESTAMPTZ DEFAULT NOW()
);


-- ── Helper function: update MC updated_at automatically ───────
CREATE OR REPLACE FUNCTION update_mc_timestamp()
RETURNS TRIGGER AS $$
BEGIN NEW.updated_at = NOW(); RETURN NEW; END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER mc_updated_at
    BEFORE UPDATE ON migration_contracts
    FOR EACH ROW EXECUTE FUNCTION update_mc_timestamp();`}</Code>
  </div>
);

// ── TAB 3: What to Embed ──────────────────────────────────────────────────────
const WhatToEmbed = () => (
  <div className="space-y-5">
    <SectionHead color="green" title="What to Embed & How to Chunk" sub="The chunking strategy is the most critical decision. Wrong chunks = poor retrieval = agent gets wrong context." />

    {[
      {
        table: "legacy_chunks", color: "orange", icon: "📄",
        description: "Your JSP and Java servlet source files",
        strategy: "Chunk by logical unit — NOT by fixed token count",
        rules: [
          "JSP forms: one chunk per form field group (label + input + validation messages together)",
          "JSP scriptlets: one chunk per if/else block or loop — never split a conditional",
          "Java servlets: one chunk per method — never split a method across chunks",
          "Max chunk size: 400 tokens. If a method is larger, split at logical comment boundaries",
          "Always include 2 lines of surrounding context at top and bottom of each chunk",
        ],
        metadata: `{ "field_ids": ["cust_nm", "cust_type"], "has_conditional": true, "line_start": 42, "line_end": 67 }`,
      },
      {
        table: "csm_rules", color: "yellow", icon: "📋",
        description: "Your code standards from csm.md",
        strategy: "One chunk per rule — not per section",
        rules: [
          "Split at each bullet point or numbered rule — each rule is one vector",
          "Include the section header in every chunk: '[JAVA] Constructor injection only'",
          "Tag with applies_to array: which agent roles this rule is relevant to",
          "Forbidden rules get their own chunks — do NOT group them with positive rules",
          "~50–80 tokens per rule chunk is ideal",
        ],
        metadata: `{ "section": "JAVA", "rule_id": "constructor-injection", "applies_to": ["java_generator", "gate_validator"] }`,
      },
      {
        table: "golden_examples", color: "blue", icon: "⭐",
        description: "Verified migration outputs (built up over time)",
        strategy: "Embed the JSP INPUT — retrieve by similarity to new JSP",
        rules: [
          "Embed the jsp_snippet (the problem), not the output (the solution)",
          "This way: new JSP chunk → vector search → finds most similar past JSP → retrieves its verified output",
          "Only embed examples where gate3 (parity check) passed",
          "Tag with pattern_type: 'conditional-validation', 'multi-select', 'date-range', etc.",
          "Start with 0 examples — they accumulate automatically as you migrate modules",
        ],
        metadata: `{ "pattern_type": "conditional-required", "tags": ["dropdown", "cross-field"], "module_id": "CustomerForm" }`,
      },
      {
        table: "naming_registry", color: "teal", icon: "🏷️",
        description: "JSP field id → Java/Angular canonical names",
        strategy: "Embed jsp_id + surrounding context together",
        rules: [
          "Embed: '<jsp_id> in context of <entity_name>: <label_text>'",
          "Example: 'cust_nm in context of Customer entity: Customer Name label'",
          "This allows fuzzy retrieval: 'customer name field' finds 'cust_nm' even without exact match",
          "One row per field per module — a field used in two forms gets two rows",
          "Insert these during Phase 1 (contract-generator) and never update them",
        ],
        metadata: `{ "module_id": "CustomerForm", "entity": "Customer", "label": "Customer Name" }`,
      },
    ].map(item => (
      <div key={item.table} className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden">
        <div className="p-4 border-b border-gray-700 flex items-center gap-3">
          <span className="text-xl">{item.icon}</span>
          <div>
            <code className={`text-sm font-bold ${item.color === "orange" ? "text-orange-400" : item.color === "yellow" ? "text-yellow-400" : item.color === "blue" ? "text-blue-400" : "text-teal-400"}`}>{item.table}</code>
            <p className="text-gray-400 text-xs">{item.description}</p>
          </div>
          <div className="ml-auto">
            <Badge color={item.color === "orange" ? "orange" : item.color === "yellow" ? "yellow" : item.color === "blue" ? "blue" : "teal"}>{item.strategy.split("—")[0].trim()}</Badge>
          </div>
        </div>
        <div className="p-4">
          <p className="text-gray-300 text-xs font-semibold mb-2">Strategy: {item.strategy}</p>
          <ul className="space-y-1 mb-3">
            {item.rules.map((r, i) => <li key={i} className="flex gap-2 text-xs text-gray-400"><span className="text-green-400 mt-0.5">→</span><span>{r}</span></li>)}
          </ul>
          <div className="bg-gray-900 rounded p-3">
            <p className="text-gray-500 text-xs mb-1">metadata JSONB example:</p>
            <code className="text-xs text-gray-300">{item.metadata}</code>
          </div>
        </div>
      </div>
    ))}
  </div>
);

// ── TAB 4: Agent RAG Flow ─────────────────────────────────────────────────────
const AgentRAGFlow = () => (
  <div className="space-y-5">
    <SectionHead color="purple" title="RAG Retrieval Flow Per Agent" sub="Each agent retrieves a different slice of the DB. No agent reads the whole codebase." />
    {[
      {
        agent: "01 — Complexity Analyzer", model: "claude-opus-4-6", color: "purple",
        retrieves: [
          { table: "legacy_chunks", query: "SELECT chunk_text FROM legacy_chunks WHERE module_id=$1 AND file_type='jsp' ORDER BY chunk_index", why: "Read all JSP chunks for this module sequentially — full scan needed here only" },
          { table: "legacy_chunks", query: "Semantic search: 'form validation rules business logic conditional'", why: "Find chunks with conditional logic and business rules — flag as HIGH complexity" },
        ],
        prompts: "Feed retrieved chunks as context. Agent scores complexity and extracts field list. Outputs MC.source.",
      },
      {
        agent: "02 — Contract Generator", model: "claude-opus-4-6", color: "blue",
        retrieves: [
          { table: "naming_registry", query: "SELECT * FROM naming_registry WHERE module_id=$1", why: "Check if any names already registered (partial re-run support)" },
          { table: "golden_examples", query: "Semantic search on each JSP chunk: find top 2 most similar past migrations", why: "Auto-retrieves few-shot examples — no manual golden-examples folder needed" },
          { table: "csm_rules", query: "WHERE applies_to @> ARRAY['contract_generator']", why: "Retrieve only the naming convention rules — not the full CSM" },
        ],
        prompts: "Feed MC.source + retrieved similar examples + naming rules. Agent generates MC.target + naming_registry rows.",
      },
      {
        agent: "03 — Java Generator", model: "gpt-4o", color: "green",
        retrieves: [
          { table: "naming_registry", query: "SELECT jsp_id, java_name FROM naming_registry WHERE module_id=$1", why: "Lock all field names before generating a single line of code" },
          { table: "csm_rules", query: "Semantic search: 'Spring Boot controller service repository DTO annotation'", why: "Retrieve only Java-relevant rules — not Angular rules" },
          { table: "golden_examples", query: "WHERE pattern_type IN ('entity','dto','controller') AND approved=true LIMIT 2", why: "Get verified Java patterns for similar entities" },
          { table: "migration_contracts", query: "SELECT target FROM migration_contracts WHERE module_id=$1", why: "Read only the target spec — not the whole contract" },
        ],
        prompts: "Feed naming registry + relevant CSM rules + MC.target + 2 golden examples. GPT-4o generates all Java files.",
      },
      {
        agent: "04 — Angular Generator", model: "gpt-4o", color: "teal",
        retrieves: [
          { table: "naming_registry", query: "SELECT jsp_id, angular_name FROM naming_registry WHERE module_id=$1", why: "Lock all formControlNames before generating any template" },
          { table: "csm_rules", query: "Semantic search: 'Angular standalone signals reactive form OnPush inject'", why: "Retrieve only Angular-relevant rules" },
          { table: "golden_examples", query: "WHERE pattern_type IN ('component','validator','form-field') AND approved=true LIMIT 2", why: "Get verified Angular reactive form patterns" },
          { table: "legacy_chunks", query: "Semantic search: 'conditional show hide visibility toggle'", why: "Re-retrieve JSP conditional logic chunks to verify angular implementation" },
        ],
        prompts: "Feed naming registry + Angular CSM rules + MC.target + 2 golden examples. GPT-4o generates all Angular files.",
      },
      {
        agent: "05 — Gate Validator", model: "claude-opus-4-6", color: "yellow",
        retrieves: [
          { table: "csm_rules", query: "WHERE applies_to @> ARRAY['gate_validator']", why: "Get all rules this gate should check against — comprehensive scan" },
          { table: "naming_registry", query: "SELECT * FROM naming_registry WHERE module_id=$1", why: "Verify generated code uses registry names exactly" },
          { table: "migration_contracts", query: "SELECT source, target, active_errors FROM migration_contracts WHERE module_id=$1", why: "Compare source spec vs generated output for parity" },
        ],
        prompts: "Feed generated files + all gate rules + naming registry. Claude reasons over discrepancies and outputs structured GateReport.",
      },
    ].map(item => (
      <div key={item.agent} className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden">
        <div className="flex items-center justify-between p-4 border-b border-gray-700">
          <h4 className="text-white font-bold text-sm">{item.agent}</h4>
          <Badge color={item.model === "gpt-4o" ? "blue" : "purple"}>{item.model}</Badge>
        </div>
        <div className="p-4 space-y-2">
          <p className="text-gray-500 text-xs font-bold uppercase mb-2">RAG Queries</p>
          {item.retrieves.map((r, i) => (
            <div key={i} className="bg-gray-900 rounded-lg p-3">
              <code className="text-xs text-green-300 block mb-1">{r.query}</code>
              <p className="text-xs text-gray-400">→ {r.why}</p>
            </div>
          ))}
          <div className="bg-blue-950 rounded-lg p-3 mt-3">
            <p className="text-xs text-blue-300"><span className="font-bold">Prompt assembly: </span>{item.prompts}</p>
          </div>
        </div>
      </div>
    ))}
  </div>
);

// ── TAB 5: Model Routing ──────────────────────────────────────────────────────
const ModelRouting = () => (
  <div className="space-y-5">
    <SectionHead color="orange" title="Model Routing Strategy" sub="Use each model only where it wins. This cuts cost and improves consistency." />
    <div className="bg-gray-800 rounded-xl p-5 border border-gray-700">
      <h4 className="text-white font-bold mb-4">Decision Matrix</h4>
      <div className="space-y-2">
        {[
          { task: "JSP complexity analysis", model: "claude-opus-4-6", reason: "Needs deep inference on legacy scriptlets and implicit business rules", cost: "High — worth it" },
          { task: "Migration Contract generation", model: "claude-opus-4-6", reason: "Needs to map ambiguous legacy patterns to clean target architecture", cost: "High — worth it" },
          { task: "Java code generation (from verified spec)", model: "gpt-4o", reason: "Spec is clear, output is deterministic. GPT-4o is faster + cheaper here", cost: "Medium" },
          { task: "Angular code generation (from verified spec)", model: "gpt-4o", reason: "Same — spec-driven generation favors GPT-4o's speed", cost: "Medium" },
          { task: "Gate validation (structural checks)", model: "claude-opus-4-6", reason: "Reasoning over code quality and parity requires deep analysis", cost: "High — worth it" },
          { task: "Fix agent (targeted error fixing)", model: "gpt-4o", reason: "Error is explicit in the gate report — targeted fix is deterministic", cost: "Low" },
          { task: "Embeddings (all tables)", model: "text-embedding-3-small (OpenAI)", reason: "Cheapest, fast, 1536 dims — sufficient for code similarity", cost: "Very low" },
          { task: "Reranking retrieved chunks", model: "gpt-4o-mini", reason: "Score top-10 retrieved chunks, keep top-3. Near-zero cost", cost: "Very low" },
          { task: "Naming registry fuzzy lookup", model: "pgvector only (no LLM)", reason: "Pure vector similarity — no LLM needed for name lookup", cost: "Zero" },
        ].map((item, i) => (
          <div key={i} className="flex items-start gap-3 bg-gray-900 rounded-lg p-3">
            <div className="min-w-[220px]"><p className="text-white text-xs font-semibold">{item.task}</p></div>
            <Badge color={item.model.includes("claude") ? "purple" : item.model.includes("mini") ? "gray" : item.model.includes("embedding") ? "teal" : item.model.includes("pgvector") ? "green" : "blue"}>{item.model}</Badge>
            <p className="text-gray-400 text-xs flex-1">{item.reason}</p>
            <span className="text-xs text-gray-500 min-w-[80px] text-right">{item.cost}</span>
          </div>
        ))}
      </div>
    </div>

    <div className="bg-gray-800 rounded-xl p-5 border border-gray-700">
      <h4 className="text-white font-bold mb-3">Estimated Cost Per Module (Medium Complexity, ~30 fields)</h4>
      <div className="space-y-2">
        {[
          { step: "Embedding all chunks (once)", tokens: "~5,000 tokens", cost: "$0.001", model: "text-embedding-3-small" },
          { step: "Phase 0: Complexity analysis", tokens: "~3,000 in / 800 out", cost: "$0.04", model: "claude-opus-4-6" },
          { step: "Phase 1: Contract generation", tokens: "~4,000 in / 1,500 out", cost: "$0.06", model: "claude-opus-4-6" },
          { step: "Gate 1: Contract validation", tokens: "~2,000 in / 500 out", cost: "$0.03", model: "claude-opus-4-6" },
          { step: "Phase 2A: Java generation", tokens: "~3,500 in / 3,000 out", cost: "$0.04", model: "gpt-4o" },
          { step: "Phase 2B: Angular generation", tokens: "~3,500 in / 3,000 out", cost: "$0.04", model: "gpt-4o" },
          { step: "Gate 2: Code validation", tokens: "~4,000 in / 1,000 out", cost: "$0.06", model: "claude-opus-4-6" },
          { step: "Fix agent (avg 1 retry)", tokens: "~2,000 in / 1,500 out", cost: "$0.02", model: "gpt-4o" },
          { step: "Gate 3: Parity check", tokens: "~3,000 in / 500 out", cost: "$0.04", model: "claude-opus-4-6" },
        ].map((item, i) => (
          <div key={i} className="flex items-center gap-3 text-xs">
            <span className="text-gray-400 flex-1">{item.step}</span>
            <span className="text-gray-500 min-w-[130px]">{item.tokens}</span>
            <Badge color={item.model.includes("claude") ? "purple" : item.model.includes("embedding") ? "teal" : "blue"}>{item.model.split(" ")[0]}</Badge>
            <span className="text-green-400 font-bold min-w-[40px] text-right">{item.cost}</span>
          </div>
        ))}
        <div className="border-t border-gray-700 pt-2 flex justify-between">
          <span className="text-white font-bold text-sm">Total per module</span>
          <span className="text-green-400 font-bold text-sm">~$0.29</span>
        </div>
      </div>
    </div>
  </div>
);

// ── TAB 6: Code Setup ─────────────────────────────────────────────────────────
const CodeSetup = () => {
  const [lang, setLang] = useState("python");
  const py = `# setup.py — Run once to initialize the pgvector schema and embed your CSM
# pip install psycopg2-binary openai anthropic pgvector

import os, json, textwrap
import psycopg2
from openai import OpenAI

DB_URL   = os.environ["DATABASE_URL"]   # postgresql://user:pass@host:5432/db
OAI      = OpenAI(api_key=os.environ["OPENAI_API_KEY"])

def get_conn():
    return psycopg2.connect(DB_URL)

def embed(text: str) -> list[float]:
    """Single embedding call — text-embedding-3-small, 1536 dims."""
    resp = OAI.embeddings.create(
        model="text-embedding-3-small",
        input=text[:8000]   # safety truncation
    )
    return resp.data[0].embedding


# ── Step 1: Embed your CSM rules ────────────────────────────────────────────
# Split csm.md at each rule bullet and insert into csm_rules table.

CSM_RULES = [
    # JAVA rules
    {"section": "JAVA", "rule_id": "records-for-dtos",
     "rule_text": "[JAVA] DTOs must be Java records: public record XRequest(...) {}",
     "applies_to": ["java_generator", "gate_validator"]},
    {"section": "JAVA", "rule_id": "constructor-injection",
     "rule_text": "[JAVA] Constructor injection only in @Service/@Component. Never @Autowired on fields.",
     "applies_to": ["java_generator", "gate_validator"]},
    {"section": "JAVA", "rule_id": "valid-annotation",
     "rule_text": "[JAVA] @Valid required on every @RequestBody parameter in @RestController.",
     "applies_to": ["java_generator", "gate_validator"]},
    {"section": "JAVA", "rule_id": "rest-controller",
     "rule_text": "[JAVA] Use @RestController. Never @Controller + @ResponseBody.",
     "applies_to": ["java_generator", "gate_validator"]},
    {"section": "JAVA", "rule_id": "transactional-readonly",
     "rule_text": "[JAVA] @Transactional(readOnly=true) on all read-only service methods.",
     "applies_to": ["java_generator", "gate_validator"]},
    {"section": "JAVA", "rule_id": "problem-detail",
     "rule_text": "[JAVA] All errors use ProblemDetail (RFC 9457) via @RestControllerAdvice.",
     "applies_to": ["java_generator", "gate_validator"]},
    {"section": "JAVA", "rule_id": "package-structure",
     "rule_text": "[JAVA] Package layout: api/ application/ domain/ infrastructure/ dto/ exception/",
     "applies_to": ["java_generator", "gate_validator"]},
    # ANGULAR rules
    {"section": "ANGULAR", "rule_id": "standalone-only",
     "rule_text": "[ANGULAR] Standalone components only. Zero NgModules.",
     "applies_to": ["angular_generator", "gate_validator"]},
    {"section": "ANGULAR", "rule_id": "onpush",
     "rule_text": "[ANGULAR] ChangeDetectionStrategy.OnPush on every component.",
     "applies_to": ["angular_generator", "gate_validator"]},
    {"section": "ANGULAR", "rule_id": "inject-function",
     "rule_text": "[ANGULAR] inject() function for DI. Never constructor injection in components.",
     "applies_to": ["angular_generator", "gate_validator"]},
    {"section": "ANGULAR", "rule_id": "signals-first",
     "rule_text": "[ANGULAR] Component state uses signal(), computed(), effect(). Not BehaviorSubject.",
     "applies_to": ["angular_generator", "gate_validator"]},
    {"section": "ANGULAR", "rule_id": "reactive-forms",
     "rule_text": "[ANGULAR] ReactiveFormsModule only. Never ngModel or template-driven forms.",
     "applies_to": ["angular_generator", "gate_validator"]},
    # Add all your remaining rules here...
]

def seed_csm_rules():
    conn = get_conn()
    cur  = conn.cursor()
    for rule in CSM_RULES:
        vec = embed(rule["rule_text"])
        cur.execute("""
            INSERT INTO csm_rules (section, rule_id, rule_text, applies_to, embedding)
            VALUES (%s, %s, %s, %s, %s)
            ON CONFLICT (section, rule_id) DO UPDATE
              SET rule_text=EXCLUDED.rule_text, embedding=EXCLUDED.embedding
        """, (rule["section"], rule["rule_id"], rule["rule_text"],
              rule["applies_to"], vec))
    conn.commit()
    conn.close()
    print(f"Seeded {len(CSM_RULES)} CSM rules into pgvector")


# ── Step 2: Chunk and embed a JSP file ──────────────────────────────────────
def embed_jsp_file(module_id: str, file_path: str):
    """
    Chunks a JSP file and embeds each chunk.
    Chunking strategy: split at form field boundaries (input/select tags).
    """
    with open(file_path) as f:
        content = f.read()

    # Simple boundary-based chunking — split at each input/select block
    # In production: use a proper JSP parser
    import re
    # Find form field groups (label + input + surrounding context)
    chunks = re.split(r'(?=<(?:input|select|textarea)[^>]+name=)', content)
    chunks = [c.strip() for c in chunks if c.strip() and len(c.strip()) > 20]

    conn = get_conn()
    cur  = conn.cursor()

    for i, chunk in enumerate(chunks):
        # Extract field ids from this chunk
        field_ids = re.findall(r'name=["\']([^"\']+)["\']', chunk)
        has_conditional = bool(re.search(r'c:if|c:choose|<%\s*if', chunk))

        vec = embed(chunk[:2000])   # cap at ~2000 chars per chunk

        cur.execute("""
            INSERT INTO legacy_chunks
              (module_id, file_path, file_type, chunk_index, chunk_text, metadata, embedding)
            VALUES (%s, %s, 'jsp', %s, %s, %s, %s)
        """, (module_id, file_path, i, chunk[:2000],
              json.dumps({"field_ids": field_ids, "has_conditional": has_conditional,
                          "line_approx": i * 20}),
              vec))

    conn.commit()
    conn.close()
    print(f"Embedded {len(chunks)} chunks from {file_path}")


if __name__ == "__main__":
    seed_csm_rules()
    # Example: embed your first JSP
    # embed_jsp_file("CustomerForm", "src/main/webapp/WEB-INF/views/customerForm.jsp")`;

  const ts = `// setup.ts — TypeScript version
// npm install pg openai @anthropic-ai/sdk pgvector

import { Pool } from "pg";
import OpenAI from "openai";

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const oai  = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

async function embed(text: string): Promise<number[]> {
  const res = await oai.embeddings.create({
    model: "text-embedding-3-small",
    input: text.slice(0, 8000),
  });
  return res.data[0].embedding;
}

// Retrieve relevant CSM rules for a given agent role and task
export async function getRelevantRules(
  agentRole: string,
  taskDescription: string,
  limit = 8
): Promise<string[]> {
  const queryVec = await embed(taskDescription);
  const res = await pool.query(\`
    SELECT rule_text,
           1 - (embedding <=> $1::vector) AS similarity
    FROM   csm_rules
    WHERE  $2 = ANY(applies_to)
    ORDER  BY embedding <=> $1::vector
    LIMIT  $3
  \`, [JSON.stringify(queryVec), agentRole, limit]);
  return res.rows.map(r => r.rule_text);
}

// Retrieve similar golden examples for a JSP chunk
export async function getSimilarExamples(
  jspChunk: string,
  patternType: string,
  limit = 2
): Promise<Array<{jsp: string, java: string, angular: string}>> {
  const queryVec = await embed(jspChunk);
  const res = await pool.query(\`
    SELECT jsp_snippet, java_output, angular_output,
           1 - (embedding <=> $1::vector) AS similarity
    FROM   golden_examples
    WHERE  pattern_type = $2
      AND  approved = true
    ORDER  BY embedding <=> $1::vector
    LIMIT  $3
  \`, [JSON.stringify(queryVec), patternType, limit]);
  return res.rows.map(r => ({
    jsp: r.jsp_snippet,
    java: r.java_output,
    angular: r.angular_output
  }));
}

// Get naming registry for a module (always exact lookup — no vector needed)
export async function getNamingRegistry(moduleId: string) {
  const res = await pool.query(
    "SELECT jsp_id, java_name, angular_name FROM naming_registry WHERE module_id = $1",
    [moduleId]
  );
  return Object.fromEntries(res.rows.map(r => [r.jsp_id, { java: r.java_name, angular: r.angular_name }]));
}`;

  return (
    <div className="space-y-5">
      <SectionHead color="teal" title="Setup Code — Initialize pgvector" sub="Run once to seed CSM rules and embed your first JSP files." />
      <div className="flex gap-2">
        {["python", "typescript"].map(l => (
          <button key={l} onClick={() => setLang(l)}
            className={`px-3 py-1.5 rounded text-xs font-bold ${lang === l ? "bg-white text-gray-950" : "bg-gray-800 text-gray-400 hover:bg-gray-700"}`}>
            {l === "python" ? "🐍 setup.py" : "🟦 setup.ts"}
          </button>
        ))}
      </div>
      <Code color="teal">{lang === "python" ? py : ts}</Code>
    </div>
  );
};

// ── TAB 7: Code Agents ────────────────────────────────────────────────────────
const CodeAgents = () => (
  <div className="space-y-5">
    <SectionHead color="purple" title="Agent Code — RAG-Powered Calls" sub="How each agent assembles its prompt from pgvector retrieval." />
    <Code color="purple">{`# agents.py — RAG-powered agent calls
# Each agent retrieves its own context slice from pgvector before calling the LLM.

import os, json
import psycopg2
import anthropic
from openai import OpenAI

DB_URL   = os.environ["DATABASE_URL"]
OAI      = OpenAI(api_key=os.environ["OPENAI_API_KEY"])
CLAUDE   = anthropic.Anthropic(api_key=os.environ["ANTHROPIC_API_KEY"])


def embed(text):
    return OAI.embeddings.create(model="text-embedding-3-small",
                                  input=text[:8000]).data[0].embedding

def vec_str(v): return f"[{','.join(str(x) for x in v)}]"


# ── Shared retrieval helpers ─────────────────────────────────────────────────

def get_csm_rules(conn, agent_role: str, task_hint: str, limit=8) -> str:
    """Retrieve the most relevant CSM rules for this agent + task."""
    q_vec = embed(task_hint)
    cur = conn.cursor()
    cur.execute("""
        SELECT rule_text
        FROM   csm_rules
        WHERE  %s = ANY(applies_to)
        ORDER  BY embedding <=> %s::vector
        LIMIT  %s
    """, (agent_role, vec_str(q_vec), limit))
    rules = [r[0] for r in cur.fetchall()]
    return "\\n".join(f"- {r}" for r in rules)

def get_similar_examples(conn, jsp_snippet: str, pattern_type: str, limit=2) -> str:
    """Retrieve verified golden examples similar to this JSP chunk."""
    q_vec = embed(jsp_snippet)
    cur = conn.cursor()
    cur.execute("""
        SELECT jsp_snippet, java_output, angular_output
        FROM   golden_examples
        WHERE  pattern_type = %s AND approved = true
        ORDER  BY embedding <=> %s::vector
        LIMIT  %s
    """, (pattern_type, vec_str(q_vec), limit))
    rows = cur.fetchall()
    if not rows:
        return "No golden examples yet — this is an early run."
    parts = []
    for i, (jsp, java, ng) in enumerate(rows, 1):
        parts.append(f"## Example {i}\\nJSP INPUT:\\n{jsp}\\nJAVA OUTPUT:\\n{java}\\nANGULAR OUTPUT:\\n{ng}")
    return "\\n\\n".join(parts)

def get_naming_registry(conn, module_id: str) -> str:
    cur = conn.cursor()
    cur.execute("SELECT jsp_id, java_name, angular_name FROM naming_registry WHERE module_id=%s",
                (module_id,))
    rows = cur.fetchall()
    if not rows:
        return "EMPTY — naming registry not yet populated for this module."
    return json.dumps({r[0]: {"java": r[1], "angular": r[2]} for r in rows}, indent=2)

def get_mc(conn, module_id: str) -> dict:
    cur = conn.cursor()
    cur.execute("SELECT source, target, naming_registry, active_errors FROM migration_contracts WHERE module_id=%s",
                (module_id,))
    row = cur.fetchone()
    if not row:
        raise ValueError(f"No MC found for module: {module_id}")
    return {"source": row[0], "target": row[1], "namingRegistry": row[2], "activeErrors": row[3]}


# ── Agent 03: Java Generator (GPT-4o from RAG-assembled prompt) ──────────────

def run_java_generator(module_id: str) -> dict:
    conn = psycopg2.connect(DB_URL)
    mc   = get_mc(conn, module_id)

    # Retrieve only what this agent needs
    naming   = get_naming_registry(conn, module_id)
    csm      = get_csm_rules(conn, "java_generator",
                              "Spring Boot controller service repository DTO annotation Java")
    examples = get_similar_examples(conn, json.dumps(mc["source"]), "entity", limit=2)

    system_prompt = f"""You are a Java / Spring Boot 3 code generator.
Generate production-grade Java code from the provided Migration Contract spec.

## IMMUTABLE NAMING REGISTRY
Use ONLY these names. Never invent names. Never use raw JSP ids.
{naming}

## RELEVANT CODE STANDARDS (org spec — non-negotiable)
{csm}

## GOLDEN EXAMPLES (verified correct patterns — replicate these)
{examples}

## OUTPUT FORMAT
Return only valid JSON:
{{ "files": [ {{ "path": "...", "content": "..." }} ] }}
No prose. No markdown. First char must be {{"""

    user_message = f"""Generate ALL Java/Spring Boot files for this module.

Migration Contract — Target Spec:
{json.dumps(mc['target'], indent=2)}

Active Errors (fix these if present):
{json.dumps(mc['activeErrors'])}"""

    # GPT-4o for generation (spec is clear — no deep reasoning needed)
    resp = OAI.chat.completions.create(
        model="gpt-4o",
        messages=[
            {"role": "system", "content": system_prompt},
            {"role": "user",   "content": user_message}
        ],
        response_format={"type": "json_object"},
        temperature=0.1    # low temp for consistent code generation
    )

    conn.close()
    return json.loads(resp.choices[0].message.content)


# ── Agent 05: Gate Validator (Claude Opus for deep reasoning) ────────────────

def run_gate_validator(module_id: str, gate: str, artifacts: dict) -> dict:
    conn = psycopg2.connect(DB_URL)
    mc   = get_mc(conn, module_id)

    # Gate validator needs comprehensive rules — broader retrieval
    csm     = get_csm_rules(conn, "gate_validator",
                             "annotation naming package structure forbidden patterns", limit=15)
    naming  = get_naming_registry(conn, module_id)

    system_prompt = f"""You are a Migration Gate Validator.
Your job is to find problems before they reach the next pipeline stage.
Be precise. Only flag real violations — no false positives.

## COMPLETE ORG CODE STANDARDS TO VALIDATE AGAINST
{csm}

## CANONICAL NAMING REGISTRY (all generated names must match this)
{naming}

## OUTPUT FORMAT — return only valid JSON:
{{
  "gate": "{gate}",
  "passed": true | false,
  "errors": [{{
    "type": "STANDARDS_VIOLATION | NAMING_MISMATCH | MISSING_FIELD | PARITY_FAILURE",
    "location": "file path or MC section",
    "description": "what is wrong",
    "fix": "exactly what to change",
    "severity": "BLOCKING | WARNING"
  }}],
  "parityScore": 0-100,
  "recommendation": "PROCEED | FIX_AND_RETRY | ESCALATE_TO_HUMAN"
}}"""

    user_message = f"""Run {gate}.

Original Migration Contract source spec:
{json.dumps(mc['source'], indent=2)}

Generated artifacts to validate:
{json.dumps(artifacts, indent=2)}"""

    # Claude Opus for gate validation — needs structured reasoning
    resp = CLAUDE.messages.create(
        model="claude-opus-4-6",
        max_tokens=2000,
        system=system_prompt,
        messages=[{"role": "user", "content": user_message}]
    )

    result = json.loads(resp.content[0].text)
    conn.close()

    # Write gate report back to MC
    _update_mc_gate(module_id, gate.lower().replace(" ", "_"), result)
    return result


def _update_mc_gate(module_id: str, gate_key: str, report: dict):
    conn = psycopg2.connect(DB_URL)
    cur  = conn.cursor()
    cur.execute("""
        UPDATE migration_contracts
        SET    gate_reports = gate_reports || %s::jsonb,
               active_errors = %s::jsonb
        WHERE  module_id = %s
    """, (json.dumps({gate_key: report}),
          json.dumps([e for e in report.get("errors", []) if e["severity"] == "BLOCKING"]),
          module_id))
    conn.commit()
    conn.close()


# ── After approval: store as golden example for future modules ───────────────

def store_golden_example(module_id: str, pattern_type: str,
                          jsp_snippet: str, java_out: str, ng_out: str,
                          tags: list[str]):
    """Call this after Gate 3 passes to grow your pattern library."""
    conn = psycopg2.connect(DB_URL)
    cur  = conn.cursor()
    vec  = embed(jsp_snippet)  # embed the INPUT for similarity search
    cur.execute("""
        INSERT INTO golden_examples
          (module_id, pattern_type, jsp_snippet, java_output, angular_output, tags, embedding, approved)
        VALUES (%s, %s, %s, %s, %s, %s, %s, true)
    """, (module_id, pattern_type, jsp_snippet, java_out, ng_out, tags, vec_str(vec)))
    conn.commit()
    conn.close()
    print(f"Stored golden example: {pattern_type} from {module_id}")`}</Code>
  </div>
);

// ── TAB 8: Migration Path ─────────────────────────────────────────────────────
const MigrationPath = () => (
  <div className="space-y-5">
    <SectionHead color="red" title="Migration Path — From Now to Fully RAG-Powered" sub="You don't flip a switch. You layer RAG in over 3 weeks while continuing to migrate." />
    {[
      {
        week: "Week 1", title: "Setup & Seed", color: "blue",
        tasks: [
          "Run the SQL schema — 10 minutes, zero config changes",
          "Run seed_csm_rules() — embeds your existing csm.md rules into pgvector",
          "Embed your first 5 JSP files using embed_jsp_file()",
          "Run your existing pipeline normally — RAG not yet wired in",
          "Goal: verify pgvector is working, data is searchable",
        ],
        check: "Can you query: SELECT rule_text FROM csm_rules ORDER BY embedding <=> $query LIMIT 5 and get sensible results?",
      },
      {
        week: "Week 2", title: "Wire RAG into Generation Agents", color: "green",
        tasks: [
          "Update java-generator agent: replace hardcoded CSM block with get_csm_rules() call",
          "Update angular-generator agent: same — replace hardcoded CSM with get_csm_rules()",
          "Update both to read naming_registry from DB instead of MC JSON file",
          "Run 2 LOW complexity modules through the updated pipeline",
          "Compare output quality vs Week 1 — consistency should improve immediately",
        ],
        check: "Are formControlNames and Java field names now perfectly consistent across both generators?",
      },
      {
        week: "Week 3", title: "Wire RAG into Analysis & Gate Agents", color: "orange",
        tasks: [
          "Update gate-validator: replace hardcoded rules with get_csm_rules() for comprehensive check",
          "Update complexity-analyzer: use semantic search to find similar prior modules for complexity scoring",
          "After each passing module: call store_golden_example() for each unique pattern",
          "Run 5 MEDIUM modules — golden example retrieval starts kicking in for repeated patterns",
          "Measure: retry count should drop as golden examples accumulate",
        ],
        check: "Is get_similar_examples() returning relevant examples (similarity > 0.85)?",
      },
      {
        week: "Week 4+", title: "Full RAG — Compounding Returns", color: "purple",
        tasks: [
          "Every migrated module automatically grows the golden example library",
          "Tackle HIGH complexity forms — RAG retrieves the 3 most similar prior migrations as context",
          "Complex conditional validators? RAG finds your previously-verified implementation",
          "Multi-step wizard forms? RAG finds a similar wizard you already migrated",
          "Monitor agent_runs table: track retry rates trending down week over week",
        ],
        check: "Is your average retry count per module below 1.5? Is parity score above 95% on first gate3 run?",
      },
    ].map(item => (
      <div key={item.week} className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden">
        <div className={`p-4 border-b border-gray-700 flex items-center gap-3`}>
          <Badge color={item.color}>{item.week}</Badge>
          <h4 className="text-white font-bold">{item.title}</h4>
        </div>
        <div className="p-4">
          <ul className="space-y-1.5 mb-4">
            {item.tasks.map((t, i) => <li key={i} className="flex gap-2 text-sm text-gray-300"><span className="text-gray-500">→</span><span>{t}</span></li>)}
          </ul>
          <div className="bg-green-950 border border-green-900 rounded-lg p-3">
            <span className="text-green-400 text-xs font-bold">✓ WEEK COMPLETE WHEN: </span>
            <span className="text-green-300 text-xs">{item.check}</span>
          </div>
        </div>
      </div>
    ))}

    <div className="bg-gray-800 rounded-xl p-5 border border-gray-700">
      <h4 className="text-white font-bold mb-3">Key Metrics to Track in agent_runs Table</h4>
      <Code color="green">{`-- Weekly health check query
SELECT
  agent_role,
  model_used,
  AVG(retry_count)::NUMERIC(3,1)     AS avg_retries,
  AVG(chunks_retrieved)::NUMERIC(3,1) AS avg_rag_chunks,
  AVG(duration_ms / 1000.0)::NUMERIC(5,1) AS avg_seconds,
  COUNT(*)                            AS total_runs,
  COUNT(*) FILTER (WHERE gate_passed) AS passed,
  ROUND(100.0 * COUNT(*) FILTER (WHERE gate_passed) / COUNT(*), 1) AS pass_rate_pct
FROM  agent_runs
WHERE created_at > NOW() - INTERVAL '7 days'
GROUP BY agent_role, model_used
ORDER BY agent_role;`}</Code>
    </div>
  </div>
);

const TABS = [WhyStack, DBSchema, WhatToEmbed, AgentRAGFlow, ModelRouting, CodeSetup, CodeAgents, MigrationPath];

export default function App() {
  const [active, setActive] = useState(0);
  const Active = TABS[active];
  return (
    <div style={{ fontFamily: "'JetBrains Mono', monospace" }} className="bg-gray-950 min-h-screen text-white">
      <div className="bg-gray-900 border-b border-gray-800 px-6 py-4">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-3 mb-1">
            <span className="text-xl">🧠</span>
            <h1 className="text-xl font-bold">RAG + pgvector Migration Architecture</h1>
            <span className="text-xs bg-green-900 text-green-300 px-2 py-1 rounded">pgvector + GPT-4o + Claude</span>
          </div>
          <p className="text-gray-400 text-sm">Zero new infrastructure · Compounding returns · ~$0.29 per module</p>
        </div>
      </div>
      <div className="max-w-5xl mx-auto px-6 py-6">
        <div className="flex flex-wrap gap-2 mb-6">
          {tabs.map((t, i) => (
            <button key={t} onClick={() => setActive(i)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${active === i ? "bg-white text-gray-950" : "bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white"}`}>
              {t}
            </button>
          ))}
        </div>
        <Active />
        <div className="flex justify-between mt-8 pt-4 border-t border-gray-800">
          <button onClick={() => setActive(Math.max(0, active - 1))} disabled={active === 0}
            className="px-4 py-2 bg-gray-800 text-gray-300 rounded-lg text-sm disabled:opacity-30 hover:bg-gray-700">← Prev</button>
          <span className="text-gray-600 text-sm self-center">{active + 1} / {tabs.length}</span>
          <button onClick={() => setActive(Math.min(tabs.length - 1, active + 1))} disabled={active === tabs.length - 1}
            className="px-4 py-2 bg-gray-800 text-gray-300 rounded-lg text-sm disabled:opacity-30 hover:bg-gray-700">Next →</button>
        </div>
      </div>
    </div>
  );
}
