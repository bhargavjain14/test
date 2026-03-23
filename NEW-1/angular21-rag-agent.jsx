import { useState } from "react";

const tabs = ["Angular 21 RAG Agent", "JSP → Angular Map", "DB: Angular Schema", "Agent Prompt", "Generated Code", "Signals & Forms", "Gate: Angular Rules", "File Output Structure"];

const Code = ({ children, color = "cyan" }) => {
  const c = { cyan: "text-cyan-300", green: "text-green-300", yellow: "text-yellow-200", purple: "text-purple-200", orange: "text-orange-200", pink: "text-pink-200", blue: "text-blue-200" };
  return (
    <pre className={`text-xs ${c[color]} bg-[#0a0a0f] rounded-xl p-5 overflow-x-auto leading-relaxed border border-[#1a1a2e]`}>
      {children}
    </pre>
  );
};

const Tag = ({ children, color = "cyan" }) => {
  const c = { cyan: "bg-cyan-950 text-cyan-300 border-cyan-800", green: "bg-green-950 text-green-300 border-green-800", yellow: "bg-yellow-950 text-yellow-300 border-yellow-800", orange: "bg-orange-950 text-orange-300 border-orange-800", purple: "bg-purple-950 text-purple-300 border-purple-800", pink: "bg-pink-950 text-pink-300 border-pink-800", red: "bg-red-950 text-red-300 border-red-800" };
  return <span className={`text-xs px-2 py-0.5 rounded border font-mono font-bold ${c[color]}`}>{children}</span>;
};

const Head = ({ title, sub, color = "cyan" }) => {
  const c = { cyan: "border-cyan-500 text-cyan-400", green: "border-green-500 text-green-400", yellow: "border-yellow-500 text-yellow-400", orange: "border-orange-500 text-orange-400", purple: "border-purple-500 text-purple-400", pink: "border-pink-500 text-pink-400" };
  return (
    <div className={`border-l-4 pl-4 mb-6 ${c[color]}`}>
      <h3 className={`text-lg font-bold font-mono ${c[color].split(" ")[1]}`}>{title}</h3>
      {sub && <p className="text-gray-400 text-sm mt-1">{sub}</p>}
    </div>
  );
};

// ── TAB 1 ─────────────────────────────────────────────────────────────────────
const AngularRAGAgent = () => (
  <div className="space-y-5">
    <Head color="cyan" title="Angular 21 RAG Agent — What It Does" sub="The agent retrieves Angular-specific patterns from pgvector and generates standards-compliant Angular 21 code." />

    <div className="grid grid-cols-3 gap-3">
      {[
        { icon: "🔍", title: "RAG Retrieves", color: "cyan", items: ["Similar JSP form patterns → Angular equivalents", "Angular 21 CSM rules (signals, standalone, OnPush)", "Previously verified component patterns", "Naming registry (formControlName locks)"] },
        { icon: "⚡", title: "GPT-4o Generates", color: "green", items: ["Standalone component (.ts / .html / .scss)", "Reactive form with signals", "Angular Material form fields", "Typed HTTP service + routes"] },
        { icon: "✅", title: "Gate Validates", color: "orange", items: ["Standalone: true on every component", "ChangeDetectionStrategy.OnPush", "inject() — no constructor DI", "signal() state — no BehaviorSubject"] },
      ].map(c => (
        <div key={c.title} className="bg-[#0f0f1a] rounded-xl p-4 border border-[#1a1a2e]">
          <div className="text-2xl mb-2">{c.icon}</div>
          <div className="font-bold text-white text-sm mb-2">{c.title}</div>
          {c.items.map((x, i) => (
            <div key={i} className="flex gap-2 text-xs text-gray-400 mb-1">
              <span className={c.color === "cyan" ? "text-cyan-400" : c.color === "green" ? "text-green-400" : "text-orange-400"}>→</span>
              <span>{x}</span>
            </div>
          ))}
        </div>
      ))}
    </div>

    <div className="bg-[#0f0f1a] rounded-xl p-5 border border-[#1a1a2e]">
      <h4 className="text-white font-bold font-mono mb-4">Angular 21 Core Rules the Agent Enforces</h4>
      <div className="grid grid-cols-2 gap-3">
        {[
          { rule: "Standalone Components", desc: "standalone: true on every @Component. Zero NgModules anywhere.", must: "MUST", color: "cyan" },
          { rule: "OnPush by Default", desc: "ChangeDetectionStrategy.OnPush on every component, always.", must: "MUST", color: "cyan" },
          { rule: "inject() for DI", desc: "private fb = inject(FormBuilder). Never constructor injection.", must: "MUST", color: "cyan" },
          { rule: "Signal State", desc: "signal(), computed(), effect() for all component state. No BehaviorSubject.", must: "MUST", color: "cyan" },
          { rule: "input() / output()", desc: "Signal-based @input() and @output() decorators (Angular 21 API).", must: "MUST", color: "cyan" },
          { rule: "Reactive Forms Only", desc: "ReactiveFormsModule. Never ngModel, never template-driven.", must: "MUST", color: "cyan" },
          { rule: "Angular Material 21", desc: "mat-form-field, matInput, mat-select, mat-datepicker for all form controls.", must: "REQUIRED", color: "green" },
          { rule: "Lazy Routes", desc: "loadComponent(() => import(...)). Guards and resolvers as functions.", must: "REQUIRED", color: "green" },
          { rule: "@defer Blocks", desc: "Wrap non-critical sections in @defer for initial load performance.", must: "RECOMMENDED", color: "orange" },
          { rule: "toSignal() Bridge", desc: "Convert RxJS observables to signals at HTTP call boundaries.", must: "REQUIRED", color: "green" },
        ].map(item => (
          <div key={item.rule} className="flex gap-3 items-start bg-[#0a0a0f] rounded-lg p-3">
            <Tag color={item.color === "cyan" ? "cyan" : item.color === "green" ? "green" : "orange"}>{item.must}</Tag>
            <div>
              <p className="text-white text-xs font-bold">{item.rule}</p>
              <p className="text-gray-500 text-xs">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

// ── TAB 2 ─────────────────────────────────────────────────────────────────────
const JSPToAngularMap = () => (
  <div className="space-y-5">
    <Head color="yellow" title="JSP → Angular 21 Mapping Table" sub="What the RAG agent retrieves to translate every JSP pattern into Angular 21 code." />
    <div className="space-y-3">
      {[
        {
          category: "Form Fields", color: "cyan",
          rows: [
            { jsp: '<input type="text" name="cust_nm" required maxlength="100">', angular: 'mat-form-field + matInput\nFormControl: customerName: [\'\', [Validators.required, Validators.maxLength(100)]]' },
            { jsp: '<input type="date" name="start_dt">', angular: 'mat-datepicker + matDatepicker\nFormControl: startDate: [null, Validators.required]' },
            { jsp: '<select name="cust_type"><option value="IND">...', angular: 'mat-select + mat-option\nFormControl: customerType: [\'\', Validators.required]' },
            { jsp: '<input type="checkbox" name="active_flg">', angular: 'mat-checkbox\nFormControl: activeFlag: [false]' },
            { jsp: '<textarea name="notes_txt" maxlength="500">', angular: 'mat-form-field + textarea matInput\nFormControl: notesText: [\'\', Validators.maxLength(500)]' },
          ]
        },
        {
          category: "Conditional Logic (JSP scriptlets)", color: "orange",
          rows: [
            { jsp: '<c:if test="${custType == \'CORP\'}">\n  <input name="tax_id" required>\n</c:if>', angular: '@if (form.get(\'customerType\')?.value === \'CORP\') {\n  <mat-form-field>..taxId..</mat-form-field>\n}\n+ requiredIfCorpValidator() custom validator fn' },
            { jsp: '<%if(isAdmin){%> <input name="discount"> <%}%>', angular: '@if (isAdmin()) {  // isAdmin = signal from auth service\n  <mat-form-field>..discount..</mat-form-field>\n}' },
            { jsp: '<c:forEach items="${items}" var="item">', angular: '@for (item of items(); track item.id) { ... }' },
          ]
        },
        {
          category: "Page Structure", color: "green",
          rows: [
            { jsp: 'Multiple JSP includes / tiles layout', angular: 'Parent component + @defer child components\nRouter outlet with lazy loadComponent()' },
            { jsp: 'JSP table with pagination', angular: 'mat-table + MatPaginator + MatSort\nSignal: items = signal<Item[]>([])' },
            { jsp: 'Form submit → servlet POST', angular: 'onSubmit() → service.create(form.getRawValue())\n  .pipe(takeUntilDestroyed())' },
            { jsp: 'Session attribute display', angular: 'Auth service signal: currentUser = toSignal(auth.user$)' },
          ]
        },
        {
          category: "Validation Messages", color: "purple",
          rows: [
            { jsp: '<span class="error">${errors.custName}</span>', angular: '@if (form.get(\'customerName\')?.errors?.[\'required\'] && form.get(\'customerName\')?.touched) {\n  <mat-error>Customer name is required</mat-error>\n}' },
            { jsp: 'Server-side validation errors displayed on page', angular: 'form.setErrors() + mat-error\nOR Angular Material snackbar for non-field errors' },
          ]
        },
      ].map(section => (
        <div key={section.category} className="bg-[#0f0f1a] rounded-xl border border-[#1a1a2e] overflow-hidden">
          <div className="px-4 py-2 border-b border-[#1a1a2e] flex items-center gap-2">
            <Tag color={section.color}>{section.category}</Tag>
          </div>
          <div className="divide-y divide-[#1a1a2e]">
            {section.rows.map((row, i) => (
              <div key={i} className="grid grid-cols-2 divide-x divide-[#1a1a2e]">
                <div className="p-3"><p className="text-xs text-orange-300 font-mono whitespace-pre">{row.jsp}</p></div>
                <div className="p-3"><p className="text-xs text-cyan-300 font-mono whitespace-pre">{row.angular}</p></div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  </div>
);

// ── TAB 3 ─────────────────────────────────────────────────────────────────────
const DBAngularSchema = () => (
  <div className="space-y-5">
    <Head color="green" title="pgvector — Angular-Specific Tables" sub="These tables are Angular-only additions to the main schema. Store Angular patterns separately for targeted retrieval." />
    <Code color="green">{`-- ════════════════════════════════════════════════════════════
-- ANGULAR 21 SPECIFIC pgvector TABLES
-- Add these to your existing schema from the main RAG guide
-- ════════════════════════════════════════════════════════════

-- ── Angular Component Pattern Library ─────────────────────────────────────
-- Stores verified Angular 21 component patterns indexed by JSP input type.
-- When the agent sees a JSP pattern, it retrieves the verified Angular output.
CREATE TABLE angular_patterns (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    pattern_name    TEXT NOT NULL,          -- e.g. 'conditional-required-field'
    jsp_trigger     TEXT NOT NULL,          -- the JSP snippet that triggers this pattern
    component_ts    TEXT NOT NULL,          -- verified .component.ts code
    component_html  TEXT NOT NULL,          -- verified .component.html code
    component_scss  TEXT DEFAULT '',        -- optional styles
    tags            TEXT[],                 -- ['mat-select','conditional','required']
    complexity      TEXT DEFAULT 'LOW',     -- LOW | MEDIUM | HIGH
    embedding       VECTOR(1536),           -- embedded from jsp_trigger
    approved        BOOLEAN DEFAULT FALSE,
    module_source   TEXT,                   -- which migration this came from
    created_at      TIMESTAMPTZ DEFAULT NOW()
);
CREATE INDEX ON angular_patterns USING ivfflat (embedding vector_cosine_ops)
    WITH (lists = 50);
CREATE INDEX ON angular_patterns (approved, complexity);


-- ── Angular Validator Registry ─────────────────────────────────────────────
-- Stores custom Angular validator functions once written and verified.
-- Agents retrieve these instead of re-generating the same validator.
CREATE TABLE angular_validators (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    validator_name  TEXT UNIQUE NOT NULL,   -- e.g. 'requiredIfCorpValidator'
    trigger_rule    TEXT NOT NULL,          -- the business rule that requires this
    validator_code  TEXT NOT NULL,          -- complete TypeScript validator function
    applies_to      TEXT[],                 -- form field names it applies to
    embedding       VECTOR(1536),           -- embedded from trigger_rule
    approved        BOOLEAN DEFAULT FALSE,
    created_at      TIMESTAMPTZ DEFAULT NOW()
);
CREATE INDEX ON angular_validators USING ivfflat (embedding vector_cosine_ops)
    WITH (lists = 30);


-- ── Angular Form Group Registry ────────────────────────────────────────────
-- Tracks generated FormGroup structures per module.
-- Agents check this to avoid re-generating or conflicting with existing groups.
CREATE TABLE angular_form_groups (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    module_id       TEXT NOT NULL,
    form_group_name TEXT NOT NULL,          -- e.g. 'customerFormGroup'
    component_name  TEXT NOT NULL,          -- e.g. 'CustomerFormComponent'
    form_controls   JSONB NOT NULL,         -- { "customerName": { "validators": [...] } }
    embedding       VECTOR(1536),           -- embedded from form control names + types
    created_at      TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(module_id, form_group_name)
);


-- ── Angular CSM Rules (Angular-only subset) ────────────────────────────────
-- Pre-filtered view of csm_rules for Angular agents.
-- Agents query this instead of the full csm_rules table.
CREATE VIEW angular_csm_rules AS
SELECT id, rule_id, rule_text, embedding
FROM   csm_rules
WHERE  section = 'ANGULAR'
  AND  applies_to @> ARRAY['angular_generator'];


-- ── Naming registry: Angular-specific view ────────────────────────────────
-- Only angular_name column — Java name filtered out for Angular agent.
CREATE VIEW angular_naming AS
SELECT module_id, jsp_id, angular_name AS form_control_name,
       context, embedding
FROM   naming_registry;


-- ── Helper: store verified Angular pattern after gate3 passes ─────────────
CREATE OR REPLACE FUNCTION store_angular_pattern(
    p_name      TEXT,
    p_jsp       TEXT,
    p_ts        TEXT,
    p_html      TEXT,
    p_scss      TEXT,
    p_tags      TEXT[],
    p_module    TEXT,
    p_embedding VECTOR(1536)
) RETURNS UUID AS $$
DECLARE v_id UUID;
BEGIN
    INSERT INTO angular_patterns
      (pattern_name, jsp_trigger, component_ts, component_html,
       component_scss, tags, module_source, embedding, approved)
    VALUES (p_name, p_jsp, p_ts, p_html, p_scss, p_tags, p_module, p_embedding, true)
    RETURNING id INTO v_id;
    RETURN v_id;
END;
$$ LANGUAGE plpgsql;`}</Code>
  </div>
);

// ── TAB 4 ─────────────────────────────────────────────────────────────────────
const AgentPrompt = () => (
  <div className="space-y-5">
    <Head color="orange" title="Angular Generator Agent — Full Prompt Assembly" sub="How the agent builds its prompt from pgvector retrieval before calling GPT-4o." />
    <Code color="orange">{`# angular_agent.py
# Angular 21 RAG generator — retrieves context, calls GPT-4o, returns files.

import os, json
import psycopg2
from openai import OpenAI

OAI    = OpenAI(api_key=os.environ["OPENAI_API_KEY"])
DB_URL = os.environ["DATABASE_URL"]

def embed(text: str) -> list[float]:
    return OAI.embeddings.create(
        model="text-embedding-3-small", input=text[:8000]
    ).data[0].embedding

def vec(v): return f"[{','.join(str(x) for x in v)}]"


def run_angular_generator(module_id: str) -> dict:
    conn = psycopg2.connect(DB_URL)
    cur  = conn.cursor()

    # ── 1. Load Migration Contract target for this module ───────────────
    cur.execute("""
        SELECT source, target, naming_registry, active_errors
        FROM   migration_contracts
        WHERE  module_id = %s
    """, (module_id,))
    row = cur.fetchone()
    mc_source, mc_target, naming_reg, active_errors = row

    # ── 2. Retrieve Angular naming registry (formControlNames locked) ────
    cur.execute("""
        SELECT jsp_id, form_control_name
        FROM   angular_naming
        WHERE  module_id = %s
    """, (module_id,))
    naming_rows = cur.fetchall()
    naming_block = "\\n".join(
        f"  JSP '{r[0]}' → formControlName: '{r[1]}'"
        for r in naming_rows
    ) or "  (registry not yet populated — use camelCase conversion)"

    # ── 3. Retrieve relevant Angular CSM rules via semantic search ────────
    task_hint = "Angular standalone component reactive form signals inject OnPush mat-form-field"
    q_vec = embed(task_hint)
    cur.execute("""
        SELECT rule_text,
               1 - (embedding <=> %s::vector) AS sim
        FROM   angular_csm_rules
        ORDER  BY embedding <=> %s::vector
        LIMIT  12
    """, (vec(q_vec), vec(q_vec)))
    csm_rules = "\\n".join(f"- {r[0]}" for r in cur.fetchall())

    # ── 4. Retrieve similar verified Angular patterns (few-shot) ──────────
    source_desc = json.dumps(mc_source.get("formFields", [])[:5])
    p_vec = embed(source_desc)
    cur.execute("""
        SELECT pattern_name, jsp_trigger, component_ts, component_html, tags
        FROM   angular_patterns
        WHERE  approved = true
        ORDER  BY embedding <=> %s::vector
        LIMIT  2
    """, (vec(p_vec),))
    pattern_rows = cur.fetchall()

    examples_block = ""
    if pattern_rows:
        parts = []
        for name, jsp, ts, html, tags in pattern_rows:
            parts.append(
                f"### GOLDEN EXAMPLE: {name} {tags}\\n"
                f"JSP INPUT:\\n{jsp}\\n\\n"
                f"COMPONENT .ts:\\n{ts}\\n\\n"
                f"COMPONENT .html:\\n{html}"
            )
        examples_block = "\\n\\n---\\n\\n".join(parts)
    else:
        examples_block = "No golden examples yet — first run. Follow CSM rules strictly."

    # ── 5. Retrieve existing validators to avoid re-generating ────────────
    cur.execute("""
        SELECT validator_name, validator_code
        FROM   angular_validators
        WHERE  approved = true
    """)
    existing_validators = {r[0]: r[1] for r in cur.fetchall()}
    validators_block = (
        "\\n".join(f"ALREADY EXISTS — reuse don't regenerate: {name}"
                   for name in existing_validators)
        or "No validators in registry yet."
    )

    conn.close()

    # ── 6. Assemble final system prompt ───────────────────────────────────
    system_prompt = f"""You are an Angular 21 code generator.
You produce production-grade, standards-compliant Angular 21 code
from a verified Migration Contract spec.

════════════════════════════════════════════════════
IMMUTABLE ANGULAR 21 CODE STANDARDS (ORG SPEC)
These rules override everything. Never deviate.
════════════════════════════════════════════════════
{csm_rules}

════════════════════════════════════════════════════
NAMING LOCK — formControlName MUST match exactly
════════════════════════════════════════════════════
{naming_block}
Never use raw JSP field ids (e.g. cust_nm) in Angular code.
Never invent a formControlName. Use ONLY names from the registry above.

════════════════════════════════════════════════════
EXISTING VALIDATORS — reuse, do not regenerate
════════════════════════════════════════════════════
{validators_block}

════════════════════════════════════════════════════
GOLDEN EXAMPLES — replicate these patterns exactly
════════════════════════════════════════════════════
{examples_block}

════════════════════════════════════════════════════
OUTPUT FORMAT — valid JSON only, no prose
════════════════════════════════════════════════════
{{
  "files": [
    {{ "path": "src/app/...", "content": "..." }},
    ...
  ],
  "newValidators": [
    {{ "name": "...", "code": "..." }}
  ],
  "formGroupSpec": {{
    "formGroupName": "...",
    "controls": {{ "fieldName": {{ "validators": ["required"] }} }}
  }}
}}"""

    user_message = f"""Generate ALL Angular 21 files for module: {module_id}

Angular target spec:
{json.dumps(mc_target.get('angularModule', {}), indent=2)}

Form fields to implement:
{json.dumps(mc_source.get('formFields', []), indent=2)}

Business rules (implement as validators):
{json.dumps(mc_source.get('businessRules', []), indent=2)}

Active errors to fix (from previous gate failure):
{json.dumps(active_errors, indent=2)}"""

    resp = OAI.chat.completions.create(
        model="gpt-4o",
        messages=[
            {"role": "system", "content": system_prompt},
            {"role": "user",   "content": user_message},
        ],
        response_format={"type": "json_object"},
        temperature=0.1,
    )

    result = json.loads(resp.choices[0].message.content)

    # ── 7. Auto-store new validators in registry ──────────────────────────
    if result.get("newValidators"):
        _store_validators(module_id, result["newValidators"])

    return result


def _store_validators(module_id: str, validators: list):
    conn = psycopg2.connect(DB_URL)
    cur  = conn.cursor()
    for v in validators:
        v_vec = embed(v["name"] + " " + v.get("code", "")[:200])
        cur.execute("""
            INSERT INTO angular_validators
              (validator_name, trigger_rule, validator_code, embedding, approved)
            VALUES (%s, %s, %s, %s, false)
            ON CONFLICT (validator_name) DO NOTHING
        """, (v["name"], v.get("triggerRule", ""), v["code"], vec(v_vec)))
    conn.commit()
    conn.close()`}</Code>
  </div>
);

// ── TAB 5 ─────────────────────────────────────────────────────────────────────
const GeneratedCode = () => {
  const [file, setFile] = useState("ts");
  const files = {
    ts: {
      label: "customer-form.component.ts",
      color: "cyan",
      content: `// ✅ GENERATED: customer-form.component.ts
// Angular 21 — Standalone, OnPush, Signals, inject(), reactive form
// Generated by Angular RAG Agent from MC-CustomerForm.json

import { Component, ChangeDetectionStrategy, inject, signal, computed } from '@angular/core';
import { CommonModule }            from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Router }                  from '@angular/router';
import { takeUntilDestroyed }      from '@angular/core/rxjs-interop';
import { toSignal }                from '@angular/core/rxjs-interop';

// Angular Material
import { MatFormFieldModule }      from '@angular/material/form-field';
import { MatInputModule }          from '@angular/material/input';
import { MatSelectModule }         from '@angular/material/select';
import { MatDatepickerModule }     from '@angular/material/datepicker';
import { MatCheckboxModule }       from '@angular/material/checkbox';
import { MatButtonModule }         from '@angular/material/button';
import { MatSnackBar }             from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { CustomerService }         from '../customer.service';
import { CustomerType }            from '../customer.model';
import { requiredIfCorpValidator } from '../validators/required-if-corp.validator';
import { uniqueEmailValidator }    from '../validators/unique-email.validator';

@Component({
  selector: 'app-customer-form',
  standalone: true,                          // ✅ No NgModule
  changeDetection: ChangeDetectionStrategy.OnPush,  // ✅ OnPush always
  imports: [
    CommonModule, ReactiveFormsModule,
    MatFormFieldModule, MatInputModule, MatSelectModule,
    MatDatepickerModule, MatCheckboxModule,
    MatButtonModule, MatProgressSpinnerModule,
  ],
  templateUrl: './customer-form.component.html',
  styleUrl:    './customer-form.component.scss',
})
export class CustomerFormComponent {

  // ── DI via inject() — never constructor params ─────────────────
  private fb       = inject(FormBuilder);
  private svc      = inject(CustomerService);
  private router   = inject(Router);
  private snack    = inject(MatSnackBar);
  private destroyed = inject(DestroyRef);   // Angular 17+ destroyRef

  // ── Signal state ───────────────────────────────────────────────
  readonly isSubmitting = signal(false);
  readonly submitError  = signal<string | null>(null);

  // ── Customer type options (could be from service signal) ───────
  readonly customerTypes: CustomerType[] = [
    { value: 'IND', label: 'Individual' },
    { value: 'CORP', label: 'Corporate' },
  ];

  // ── Reactive form ── formControlNames from namingRegistry ──────
  readonly form = this.fb.group({
    customerName:   ['', [Validators.required, Validators.maxLength(100)]],
    customerType:   ['', Validators.required],
    emailAddress:   ['', [Validators.required, Validators.email],
                    [uniqueEmailValidator(this.svc)]],   // async validator
    taxId:          ['', [Validators.pattern(/^[0-9]{9}$/)]],
    startDate:      [null as Date | null, Validators.required],
    activeFlag:     [true],
    notesText:      ['', Validators.maxLength(500)],
  }, {
    validators: [requiredIfCorpValidator],  // cross-field: taxId required if CORP
  });

  // ── Computed: is corporate customer selected? ──────────────────
  readonly isCorporate = computed(() =>
    this.form.get('customerType')?.value === 'CORP'
  );

  // ── Computed: form validity as signal ─────────────────────────
  readonly canSubmit = computed(() =>
    this.form.valid && !this.isSubmitting()
  );

  // ── Submit handler ─────────────────────────────────────────────
  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.isSubmitting.set(true);
    this.submitError.set(null);

    this.svc.createCustomer(this.form.getRawValue())
      .pipe(takeUntilDestroyed(this.destroyed))
      .subscribe({
        next: () => {
          this.snack.open('Customer created successfully', 'Close', { duration: 3000 });
          this.router.navigate(['/customers']);
        },
        error: (err) => {
          this.isSubmitting.set(false);
          this.submitError.set(err.error?.detail ?? 'An error occurred');
        },
      });
  }

  // ── Field error helpers ────────────────────────────────────────
  fieldError(name: string, error: string): boolean {
    const ctrl = this.form.get(name);
    return !!(ctrl?.errors?.[error] && (ctrl.dirty || ctrl.touched));
  }
}`
    },
    html: {
      label: "customer-form.component.html",
      color: "green",
      content: `<!-- ✅ GENERATED: customer-form.component.html -->
<!-- Angular 21 template — signals, @if/@for, Angular Material -->

<section class="form-container">
  <h2 class="form-title">Customer Details</h2>

  @if (submitError()) {
    <mat-error class="global-error">{{ submitError() }}</mat-error>
  }

  <form [formGroup]="form" (ngSubmit)="onSubmit()" novalidate>

    <!-- Customer Name ──────────────────────────────────── -->
    <mat-form-field appearance="outline" class="full-width">
      <mat-label>Customer Name</mat-label>
      <input matInput formControlName="customerName"
             placeholder="Enter customer name"
             [maxlength]="100" />
      @if (fieldError('customerName', 'required')) {
        <mat-error>Customer name is required</mat-error>
      }
      @if (fieldError('customerName', 'maxlength')) {
        <mat-error>Maximum 100 characters</mat-error>
      }
    </mat-form-field>

    <!-- Customer Type ─────────────────────────────────── -->
    <mat-form-field appearance="outline" class="full-width">
      <mat-label>Customer Type</mat-label>
      <mat-select formControlName="customerType">
        @for (type of customerTypes; track type.value) {
          <mat-option [value]="type.value">{{ type.label }}</mat-option>
        }
      </mat-select>
      @if (fieldError('customerType', 'required')) {
        <mat-error>Customer type is required</mat-error>
      }
    </mat-form-field>

    <!-- Tax ID — conditional: only shown for CORP ─────── -->
    @if (isCorporate()) {
      <mat-form-field appearance="outline" class="full-width">
        <mat-label>Tax ID</mat-label>
        <input matInput formControlName="taxId"
               placeholder="9-digit tax ID" />
        @if (fieldError('taxId', 'required')) {
          <mat-error>Tax ID is required for corporate customers</mat-error>
        }
        @if (fieldError('taxId', 'pattern')) {
          <mat-error>Tax ID must be 9 digits</mat-error>
        }
      </mat-form-field>
    }

    <!-- Email ─────────────────────────────────────────── -->
    <mat-form-field appearance="outline" class="full-width">
      <mat-label>Email Address</mat-label>
      <input matInput formControlName="emailAddress"
             type="email" placeholder="email@company.com" />
      @if (fieldError('emailAddress', 'required')) {
        <mat-error>Email is required</mat-error>
      }
      @if (fieldError('emailAddress', 'email')) {
        <mat-error>Enter a valid email address</mat-error>
      }
      @if (fieldError('emailAddress', 'emailTaken')) {
        <mat-error>This email is already registered</mat-error>
      }
    </mat-form-field>

    <!-- Start Date ─────────────────────────────────────── -->
    <mat-form-field appearance="outline" class="full-width">
      <mat-label>Start Date</mat-label>
      <input matInput [matDatepicker]="picker"
             formControlName="startDate" />
      <mat-datepicker-toggle matIconSuffix [for]="picker" />
      <mat-datepicker #picker />
      @if (fieldError('startDate', 'required')) {
        <mat-error>Start date is required</mat-error>
      }
    </mat-form-field>

    <!-- Notes (deferred — below fold) ─────────────────── -->
    @defer (on viewport) {
      <mat-form-field appearance="outline" class="full-width">
        <mat-label>Notes</mat-label>
        <textarea matInput formControlName="notesText"
                  rows="4" [maxlength]="500"
                  placeholder="Additional notes..."></textarea>
        <mat-hint align="end">
          {{ form.get('notesText')?.value?.length ?? 0 }}/500
        </mat-hint>
      </mat-form-field>
    } @placeholder {
      <div class="field-placeholder">Loading notes field...</div>
    }

    <!-- Active Flag ─────────────────────────────────────── -->
    <div class="checkbox-row">
      <mat-checkbox formControlName="activeFlag">
        Active customer
      </mat-checkbox>
    </div>

    <!-- Actions ─────────────────────────────────────────── -->
    <div class="actions">
      <button mat-stroked-button type="button"
              routerLink="/customers">Cancel</button>
      <button mat-flat-button color="primary" type="submit"
              [disabled]="!canSubmit()">
        @if (isSubmitting()) {
          <mat-spinner diameter="20" />
        } @else {
          Save Customer
        }
      </button>
    </div>

  </form>
</section>`
    },
    service: {
      label: "customer.service.ts",
      color: "purple",
      content: `// ✅ GENERATED: customer.service.ts
// Angular 21 — inject(), typed HTTP, signals, toSignal()

import { Injectable, inject, signal } from '@angular/core';
import { HttpClient }                 from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { toSignal }                   from '@angular/core/rxjs-interop';
import { environment }                from '../../environments/environment';

import {
  CreateCustomerRequest,
  UpdateCustomerRequest,
  CustomerResponse,
  CustomerSummaryResponse,
} from './customer.model';

// Spring Page<T> response shape (matches Java backend)
interface PageResponse<T> {
  content:        T[];
  totalElements:  number;
  totalPages:     number;
  size:           number;
  number:         number;
}

@Injectable({ providedIn: 'root' })
export class CustomerService {

  private http    = inject(HttpClient);
  private baseUrl = \`\${environment.apiBaseUrl}/api/v1/customers\`;

  // ── Signal: list of customers (reactive state) ─────────────────
  private _customers = signal<CustomerSummaryResponse[]>([]);
  readonly customers = this._customers.asReadonly();

  // ── CRUD methods — all typed ────────────────────────────────────

  createCustomer(req: CreateCustomerRequest): Observable<CustomerResponse> {
    return this.http.post<CustomerResponse>(this.baseUrl, req).pipe(
      catchError(err => throwError(() => err))
    );
  }

  getCustomer(id: string): Observable<CustomerResponse> {
    return this.http.get<CustomerResponse>(\`\${this.baseUrl}/\${id}\`).pipe(
      catchError(err => throwError(() => err))
    );
  }

  listCustomers(page = 0, size = 20):
      Observable<PageResponse<CustomerSummaryResponse>> {
    return this.http.get<PageResponse<CustomerSummaryResponse>>(
      this.baseUrl, { params: { page, size } }
    );
  }

  updateCustomer(id: string, req: UpdateCustomerRequest):
      Observable<CustomerResponse> {
    return this.http.put<CustomerResponse>(\`\${this.baseUrl}/\${id}\`, req).pipe(
      catchError(err => throwError(() => err))
    );
  }

  // ── Async validator helper ──────────────────────────────────────
  checkEmailUnique(email: string): Observable<{ available: boolean }> {
    return this.http.get<{ available: boolean }>(
      \`\${this.baseUrl}/check-email\`, { params: { email } }
    );
  }
}`
    },
    validator: {
      label: "required-if-corp.validator.ts",
      color: "yellow",
      content: `// ✅ GENERATED: required-if-corp.validator.ts
// Standalone validator function (NOT a class) — Angular 21 standard
// Stored in angular_validators table after approval for reuse

import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

/**
 * Cross-field validator: taxId is required when customerType === 'CORP'.
 * Applied at the FormGroup level, not the FormControl level.
 *
 * Business rule source: MC.source.businessRules[0]
 * "If cust_type=CORP, tax_id is required"
 */
export const requiredIfCorpValidator: ValidatorFn =
  (group: AbstractControl): ValidationErrors | null => {
    const customerType = group.get('customerType')?.value;
    const taxId        = group.get('taxId')?.value;

    if (customerType === 'CORP' && !taxId?.trim()) {
      // Set error on the taxId control directly for mat-error display
      group.get('taxId')?.setErrors({ requiredIfCorp: true });
      return { requiredIfCorp: true };
    }

    // Clear cross-field error if condition no longer met
    const taxIdCtrl = group.get('taxId');
    if (taxIdCtrl?.errors?.['requiredIfCorp']) {
      const { requiredIfCorp, ...rest } = taxIdCtrl.errors;
      taxIdCtrl.setErrors(Object.keys(rest).length ? rest : null);
    }

    return null;
  };


// ── unique-email.validator.ts ─────────────────────────────────────────────
// Async validator — calls backend to check email uniqueness.

import { inject }                    from '@angular/core';
import { AsyncValidatorFn }          from '@angular/forms';
import { map, catchError, of, debounceTime, switchMap, first } from 'rxjs';
import { CustomerService }           from '../customer.service';

export function uniqueEmailValidator(svc: CustomerService): AsyncValidatorFn {
  return (ctrl) => {
    if (!ctrl.value) return of(null);

    return of(ctrl.value).pipe(
      debounceTime(400),
      switchMap(email =>
        svc.checkEmailUnique(email).pipe(
          map(res => res.available ? null : { emailTaken: true }),
          catchError(() => of(null))   // fail open — don't block on network error
        )
      ),
      first()
    );
  };
}`
    },
    routes: {
      label: "customer.routes.ts",
      color: "orange",
      content: `// ✅ GENERATED: customer.routes.ts
// Angular 21 — lazy-loaded, functional guards and resolvers

import { Routes }     from '@angular/router';
import { inject }     from '@angular/core';
import { ResolveFn, CanActivateFn, Router } from '@angular/router';
import { CustomerResponse } from './customer.model';
import { CustomerService }  from './customer.service';
import { AuthService }      from '../auth/auth.service';

// ── Guard — function style (not class) ──────────────────────────────
const customerWriteGuard: CanActivateFn = () => {
  const auth   = inject(AuthService);
  const router = inject(Router);
  if (auth.hasRole('ROLE_CUSTOMER_WRITE')) return true;
  return router.createUrlTree(['/forbidden']);
};

// ── Resolver — function style ────────────────────────────────────────
const customerResolver: ResolveFn<CustomerResponse> = (route) => {
  return inject(CustomerService).getCustomer(route.paramMap.get('id')!);
};

// ── Routes — all lazy-loaded via loadComponent ───────────────────────
export const CUSTOMER_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./customer-list/customer-list.component')
        .then(m => m.CustomerListComponent),
    title: 'Customers',
  },
  {
    path: 'new',
    loadComponent: () =>
      import('./customer-form/customer-form.component')
        .then(m => m.CustomerFormComponent),
    canActivate: [customerWriteGuard],
    title: 'New Customer',
  },
  {
    path: ':id/edit',
    loadComponent: () =>
      import('./customer-form/customer-form.component')
        .then(m => m.CustomerFormComponent),
    canActivate: [customerWriteGuard],
    resolve: { customer: customerResolver },
    title: 'Edit Customer',
  },
];`
    }
  };

  return (
    <div className="space-y-5">
      <Head color="pink" title="Generated Angular 21 Files — Real Output" sub="Actual files produced by the RAG agent. All standards-compliant." />
      <div className="flex flex-wrap gap-2">
        {Object.entries(files).map(([k, f]) => (
          <button key={k} onClick={() => setFile(k)}
            className={`px-3 py-1.5 rounded text-xs font-mono font-bold transition-all ${file === k ? "bg-white text-gray-950" : "bg-[#0f0f1a] text-gray-400 hover:text-white border border-[#1a1a2e]"}`}>
            {f.label}
          </button>
        ))}
      </div>
      <div className="flex items-center gap-2">
        <Tag color={files[file].color}>{files[file].label}</Tag>
      </div>
      <Code color={files[file].color}>{files[file].content}</Code>
    </div>
  );
};

// ── TAB 6 ─────────────────────────────────────────────────────────────────────
const SignalsAndForms = () => (
  <div className="space-y-5">
    <Head color="purple" title="Angular 21 Signals + Reactive Forms — Patterns" sub="The RAG agent retrieves and replicates these exact patterns. They are stored in angular_patterns table." />
    <div className="grid grid-cols-2 gap-4">
      {[
        {
          title: "Signal State Pattern",
          color: "cyan",
          code: `// Component state — always signals in Angular 21
readonly isLoading  = signal(false);
readonly error      = signal<string | null>(null);
readonly items      = signal<Item[]>([]);

// Derived state — computed() not duplicated logic
readonly hasItems   = computed(() => this.items().length > 0);
readonly itemCount  = computed(() => this.items().length);

// From RxJS → Signal at boundary (e.g. HTTP)
readonly user = toSignal(
  inject(AuthService).currentUser$,
  { initialValue: null }
);`
        },
        {
          title: "Conditional Validator Toggle",
          color: "orange",
          code: `// Enable/disable validator when condition changes
constructor() {
  // Watch field using effect() — not valueChanges
  effect(() => {
    const type = this.form.get('customerType')?.value;
    const taxCtrl = this.form.get('taxId')!;

    if (type === 'CORP') {
      taxCtrl.addValidators(Validators.required);
    } else {
      taxCtrl.removeValidators(Validators.required);
      taxCtrl.setValue('');
    }
    taxCtrl.updateValueAndValidity({ emitEvent: false });
  });
}`
        },
        {
          title: "Typed Form getRawValue()",
          color: "green",
          code: `// Define request type matching Java DTO record
interface CreateCustomerRequest {
  customerName:  string;
  customerType:  'IND' | 'CORP';
  emailAddress:  string;
  taxId:         string | null;
  startDate:     Date | null;
  activeFlag:    boolean;
  notesText:     string;
}

// Type-safe submit — getRawValue() includes disabled controls
onSubmit(): void {
  const payload = this.form.getRawValue() as CreateCustomerRequest;
  this.svc.createCustomer(payload).subscribe(...);
}`
        },
        {
          title: "takeUntilDestroyed Pattern",
          color: "yellow",
          code: `// Auto-unsubscribe — Angular 16+ pattern
// inject DestroyRef at field level, not constructor
private destroyRef = inject(DestroyRef);

loadData(): void {
  this.svc.listCustomers()
    .pipe(takeUntilDestroyed(this.destroyRef))
    .subscribe(page => {
      this.items.set(page.content);
    });
}

// No need for ngOnDestroy — destroyRef handles it`
        },
        {
          title: "input() / output() Signal APIs",
          color: "pink",
          code: `// Angular 21 signal-based component API
// NOT @Input() / @Output() decorators

@Component({ standalone: true, ... })
export class CustomerCardComponent {

  // Signal input — required
  customer = input.required<CustomerSummaryResponse>();

  // Signal input with default
  showActions = input<boolean>(true);

  // Signal output
  selected  = output<string>();
  deleted   = output<string>();

  onSelect(): void {
    this.selected.emit(this.customer().id);
  }
}`
        },
        {
          title: "@defer Block Pattern",
          color: "purple",
          code: `<!-- Defer non-critical sections — improves LCP -->

<!-- Immediate: above fold content -->
<app-customer-header [customer]="customer()" />

<!-- Deferred: below fold or complex section -->
@defer (on viewport) {
  <app-customer-history [customerId]="customer().id" />
} @loading (minimum 200ms) {
  <mat-spinner diameter="32" />
} @placeholder {
  <div class="history-placeholder">
    Transaction history
  </div>
} @error {
  <p>Failed to load history</p>
}`
        },
      ].map(item => (
        <div key={item.title} className="bg-[#0f0f1a] rounded-xl border border-[#1a1a2e] overflow-hidden">
          <div className="px-4 py-2 border-b border-[#1a1a2e]"><Tag color={item.color}>{item.title}</Tag></div>
          <Code color={item.color}>{item.code}</Code>
        </div>
      ))}
    </div>
  </div>
);

// ── TAB 7 ─────────────────────────────────────────────────────────────────────
const GateAngularRules = () => (
  <div className="space-y-5">
    <Head color="green" title="Gate Validator — Angular 21 Checklist" sub="Every item is a pgvector-stored rule. The gate agent retrieves and checks all of them." />
    <div className="space-y-3">
      {[
        { cat: "Component Structure", color: "cyan", checks: [
          { rule: "standalone: true present on @Component decorator", autofix: "Add standalone: true to @Component metadata" },
          { rule: "ChangeDetectionStrategy.OnPush on every component", autofix: "Add changeDetection: ChangeDetectionStrategy.OnPush" },
          { rule: "No NgModule references anywhere in file", autofix: "Remove NgModule import and declaration" },
          { rule: "imports array in @Component contains needed modules", autofix: "Add missing module to standalone imports array" },
        ]},
        { cat: "Dependency Injection", color: "orange", checks: [
          { rule: "No constructor parameters for DI (inject() only)", autofix: "Move constructor params to private x = inject(X)" },
          { rule: "inject() called at field level, not inside methods", autofix: "Move inject() call to class field declaration" },
          { rule: "DestroyRef injected for takeUntilDestroyed", autofix: "Add private destroyRef = inject(DestroyRef)" },
        ]},
        { cat: "Signals & State", color: "purple", checks: [
          { rule: "No BehaviorSubject for component state", autofix: "Replace BehaviorSubject with signal()" },
          { rule: "No @Input()/@Output() decorators (use input()/output())", autofix: "Replace @Input() with x = input<T>(), @Output() with x = output<T>()" },
          { rule: "RxJS streams bridged with toSignal() at boundary", autofix: "Wrap observable with toSignal(obs$, { initialValue: ... })" },
          { rule: "Derived state uses computed() not manual signal updates", autofix: "Replace duplicate signal logic with computed()" },
        ]},
        { cat: "Reactive Forms", color: "green", checks: [
          { rule: "ReactiveFormsModule in component imports array", autofix: "Add ReactiveFormsModule to standalone imports" },
          { rule: "No ngModel anywhere (template-driven forbidden)", autofix: "Remove ngModel, add FormControl and formControlName" },
          { rule: "All formControlNames match MC.namingRegistry angular_name", autofix: "Replace formControlName with value from naming registry" },
          { rule: "form.getRawValue() used on submit (not form.value)", autofix: "Replace form.value with form.getRawValue()" },
          { rule: "form.markAllAsTouched() called on invalid submit", autofix: "Add this.form.markAllAsTouched() before return in onSubmit" },
        ]},
        { cat: "Angular Material", color: "yellow", checks: [
          { rule: "All text inputs use mat-form-field + matInput", autofix: "Wrap <input> with <mat-form-field><input matInput></mat-form-field>" },
          { rule: "Dropdowns use mat-select not native <select>", autofix: "Replace <select> with <mat-select>" },
          { rule: "Date fields use mat-datepicker", autofix: "Replace <input type=date> with matDatepicker pattern" },
          { rule: "Errors use <mat-error> inside mat-form-field", autofix: "Replace .error class spans with <mat-error>" },
        ]},
        { cat: "HTTP & Routing", color: "pink", checks: [
          { rule: "No HttpClientModule import (use provideHttpClient())", autofix: "Remove HttpClientModule, ensure provideHttpClient() in app.config.ts" },
          { rule: "Routes use loadComponent() for lazy loading", autofix: "Replace component: X with loadComponent: () => import(...)" },
          { rule: "Guards and resolvers are functions not classes", autofix: "Convert class Guard to const guard: CanActivateFn = () => ..." },
          { rule: "takeUntilDestroyed() on all subscriptions", autofix: "Add .pipe(takeUntilDestroyed(this.destroyRef)) before subscribe()" },
        ]},
      ].map(section => (
        <div key={section.cat} className="bg-[#0f0f1a] rounded-xl border border-[#1a1a2e] overflow-hidden">
          <div className="px-4 py-2 border-b border-[#1a1a2e]"><Tag color={section.color}>{section.cat}</Tag></div>
          <div className="divide-y divide-[#1a1a2e]">
            {section.checks.map((c, i) => (
              <div key={i} className="p-3 grid grid-cols-2 gap-3">
                <div className="flex gap-2 text-xs text-gray-300"><span className="text-green-400">✓</span>{c.rule}</div>
                <div className="text-xs text-gray-500"><span className="text-yellow-400">autofix: </span>{c.autofix}</div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  </div>
);

// ── TAB 8 ─────────────────────────────────────────────────────────────────────
const FileOutputStructure = () => (
  <div className="space-y-5">
    <Head color="yellow" title="Generated File Output Structure" sub="Exactly what the Angular RAG agent produces per module. Every file, every path." />
    <Code color="yellow">{`src/app/
│
├── app.config.ts          ← (one-time setup — add provideHttpClient here)
├── app.routes.ts          ← (add lazy route per module here)
│
└── features/
    └── customer/          ← one folder per migrated JSP module
        │
        ├── customer.routes.ts              ← lazy-loaded route definitions
        ├── customer.model.ts               ← TypeScript interfaces (match Java DTOs)
        ├── customer.service.ts             ← HttpClient service, signals, typed
        │
        ├── validators/
        │   ├── required-if-corp.validator.ts   ← from MC.source.businessRules
        │   └── unique-email.validator.ts        ← async validator
        │
        ├── customer-form/                  ← migrated from customerForm.jsp
        │   ├── customer-form.component.ts  ← standalone, OnPush, signals, inject()
        │   ├── customer-form.component.html ← @if/@for, mat-form-field, @defer
        │   └── customer-form.component.scss ← scoped styles
        │
        └── customer-list/                  ← migrated from customerList.jsp
            ├── customer-list.component.ts  ← mat-table, paginator, signals
            ├── customer-list.component.html
            └── customer-list.component.scss`}</Code>

    <Code color="green">{`// customer.model.ts — matches Java DTO records exactly
// Types generated from MC.target.endpoints[].requestDto/responseDto

export interface CreateCustomerRequest {
  customerName:  string;
  customerType:  CustomerTypeValue;
  emailAddress:  string;
  taxId:         string | null;
  startDate:     string;          // ISO-8601 — matches Java @JsonFormat
  activeFlag:    boolean;
  notesText:     string | null;
}

export interface CustomerResponse {
  id:            string;          // UUID — matches Java UUID response
  customerName:  string;
  customerType:  CustomerTypeValue;
  emailAddress:  string;
  taxId:         string | null;
  startDate:     string;
  activeFlag:    boolean;
  notesText:     string | null;
  createdAt:     string;
  updatedAt:     string;
}

export interface CustomerSummaryResponse {
  id:           string;
  customerName: string;
  customerType: CustomerTypeValue;
  emailAddress: string;
  activeFlag:   boolean;
}

export type CustomerTypeValue = 'IND' | 'CORP';

export interface CustomerType {
  value: CustomerTypeValue;
  label: string;
}`}</Code>

    <Code color="cyan">{`// app.config.ts — provideHttpClient() (NOT HttpClientModule)
import { ApplicationConfig }         from '@angular/core';
import { provideRouter }             from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideAnimationsAsync }    from '@angular/platform-browser/animations/async';
import { provideNativeDateAdapter }  from '@angular/material/core';

import { APP_ROUTES }                from './app.routes';
import { authInterceptor }           from './core/interceptors/auth.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(APP_ROUTES),
    provideHttpClient(
      withInterceptors([authInterceptor])   // functional interceptor
    ),
    provideAnimationsAsync(),
    provideNativeDateAdapter(),
  ],
};


// app.routes.ts — one entry per migrated module (lazy)
import { Routes } from '@angular/router';

export const APP_ROUTES: Routes = [
  { path: '',          redirectTo: '/customers', pathMatch: 'full' },
  {
    path: 'customers',
    loadChildren: () =>
      import('./features/customer/customer.routes')
        .then(m => m.CUSTOMER_ROUTES),
  },
  // Add each migrated JSP module here as it completes
];`}</Code>
  </div>
);

const TABS = [AngularRAGAgent, JSPToAngularMap, DBAngularSchema, AgentPrompt, GeneratedCode, SignalsAndForms, GateAngularRules, FileOutputStructure];

export default function App() {
  const [active, setActive] = useState(0);
  const Active = TABS[active];
  return (
    <div style={{ fontFamily: "'JetBrains Mono', 'Fira Code', monospace", background: "#070710" }} className="min-h-screen text-white">
      <div style={{ background: "#0a0a18", borderBottom: "1px solid #1a1a30" }} className="px-6 py-4">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-3 mb-1">
            <span className="text-xl">△</span>
            <h1 className="text-xl font-bold tracking-tight">Angular 21 RAG Agent</h1>
            <Tag color="cyan">pgvector + GPT-4o</Tag>
            <Tag color="green">Standalone · Signals · OnPush</Tag>
          </div>
          <p className="text-gray-500 text-xs">JSP → Angular 21 migration · Standards-locked · Zero NgModules</p>
        </div>
      </div>
      <div className="max-w-5xl mx-auto px-6 py-6">
        <div className="flex flex-wrap gap-2 mb-6">
          {tabs.map((t, i) => (
            <button key={t} onClick={() => setActive(i)}
              className={`px-3 py-1.5 rounded text-xs font-mono font-semibold transition-all border ${active === i ? "bg-cyan-400 text-gray-950 border-cyan-400" : "border-[#1a1a30] text-gray-500 hover:text-gray-200 hover:border-gray-600"}`}>
              {t}
            </button>
          ))}
        </div>
        <Active />
        <div className="flex justify-between mt-8 pt-4 border-t border-[#1a1a2e]">
          <button onClick={() => setActive(Math.max(0, active - 1))} disabled={active === 0}
            className="px-4 py-2 border border-[#1a1a2e] text-gray-400 rounded text-xs font-mono disabled:opacity-20 hover:border-gray-600 hover:text-gray-200">← prev</button>
          <span className="text-gray-700 text-xs font-mono self-center">{active + 1}/{tabs.length}</span>
          <button onClick={() => setActive(Math.min(tabs.length - 1, active + 1))} disabled={active === tabs.length - 1}
            className="px-4 py-2 border border-[#1a1a2e] text-gray-400 rounded text-xs font-mono disabled:opacity-20 hover:border-gray-600 hover:text-gray-200">next →</button>
        </div>
      </div>
    </div>
  );
}
