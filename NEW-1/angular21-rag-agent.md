# Angular 21 RAG Agent — Complete Guide
> pgvector + GPT-4o · Standalone · Signals · OnPush · JSP → Angular 21 Migration

---

## Table of Contents
1. [Angular 21 RAG Agent — What It Does](#1-angular-21-rag-agent--what-it-does)
2. [JSP → Angular 21 Mapping Table](#2-jsp--angular-21-mapping-table)
3. [pgvector — Angular-Specific DB Schema](#3-pgvector--angular-specific-db-schema)
4. [Angular Generator Agent — Full Prompt Assembly](#4-angular-generator-agent--full-prompt-assembly)
5. [Generated Angular 21 Files — Real Output](#5-generated-angular-21-files--real-output)
6. [Signals & Reactive Forms Patterns](#6-signals--reactive-forms-patterns)
7. [Gate Validator — Angular 21 Checklist](#7-gate-validator--angular-21-checklist)
8. [Generated File Output Structure](#8-generated-file-output-structure)

---

## 1. Angular 21 RAG Agent — What It Does

The agent retrieves Angular-specific patterns from pgvector and generates standards-compliant Angular 21 code.

### What Each Part Does

| Layer | Responsibility |
|---|---|
| 🔍 **RAG Retrieves** | Similar JSP form patterns → Angular equivalents, Angular 21 CSM rules, verified component patterns, naming registry (formControlName locks) |
| ⚡ **GPT-4o Generates** | Standalone component (.ts / .html / .scss), Reactive form with signals, Angular Material form fields, Typed HTTP service + routes |
| ✅ **Gate Validates** | standalone: true, ChangeDetectionStrategy.OnPush, inject() only, signal() state — no BehaviorSubject |

---

### Angular 21 Core Rules — Non-Negotiable

| Rule | Requirement | Detail |
|---|---|---|
| Standalone Components | **MUST** | `standalone: true` on every `@Component`. Zero NgModules anywhere. |
| OnPush by Default | **MUST** | `ChangeDetectionStrategy.OnPush` on every component, always. |
| inject() for DI | **MUST** | `private fb = inject(FormBuilder)`. Never constructor injection. |
| Signal State | **MUST** | `signal()`, `computed()`, `effect()` for all component state. No BehaviorSubject. |
| input() / output() | **MUST** | Signal-based APIs (Angular 21). Not `@Input()` / `@Output()` decorators. |
| Reactive Forms Only | **MUST** | `ReactiveFormsModule`. Never `ngModel`, never template-driven. |
| Angular Material 21 | **REQUIRED** | `mat-form-field`, `matInput`, `mat-select`, `mat-datepicker` for all controls. |
| Lazy Routes | **REQUIRED** | `loadComponent(() => import(...))`. Guards and resolvers as functions. |
| @defer Blocks | **RECOMMENDED** | Wrap non-critical sections in `@defer` for initial load performance. |
| toSignal() Bridge | **REQUIRED** | Convert RxJS observables to signals at HTTP call boundaries. |

---

## 2. JSP → Angular 21 Mapping Table

### Form Fields

| JSP | Angular 21 Equivalent |
|---|---|
| `<input type="text" name="cust_nm" required maxlength="100">` | `mat-form-field + matInput`<br>`customerName: ['', [Validators.required, Validators.maxLength(100)]]` |
| `<input type="date" name="start_dt">` | `mat-datepicker + matDatepicker`<br>`startDate: [null, Validators.required]` |
| `<select name="cust_type"><option value="IND">...` | `mat-select + mat-option`<br>`customerType: ['', Validators.required]` |
| `<input type="checkbox" name="active_flg">` | `mat-checkbox`<br>`activeFlag: [false]` |
| `<textarea name="notes_txt" maxlength="500">` | `mat-form-field + textarea matInput`<br>`notesText: ['', Validators.maxLength(500)]` |

---

### Conditional Logic (JSP Scriptlets → Angular)

**JSP:**
```jsp
<c:if test="${custType == 'CORP'}">
  <input name="tax_id" required>
</c:if>
```

**Angular 21:**
```html
@if (form.get('customerType')?.value === 'CORP') {
  <mat-form-field>..taxId..</mat-form-field>
}
```
```typescript
// Plus: requiredIfCorpValidator() custom validator function
```

---

**JSP:**
```jsp
<%if(isAdmin){%> <input name="discount"> <%}%>
```

**Angular 21:**
```html
@if (isAdmin()) {
  <mat-form-field>..discount..</mat-form-field>
}
<!-- isAdmin = signal from auth service -->
```

---

**JSP:**
```jsp
<c:forEach items="${items}" var="item">
```

**Angular 21:**
```html
@for (item of items(); track item.id) { ... }
```

---

### Page Structure

| JSP Pattern | Angular 21 Equivalent |
|---|---|
| Multiple JSP includes / tiles layout | Parent component + `@defer` child components, Router outlet with lazy `loadComponent()` |
| JSP table with pagination | `mat-table + MatPaginator + MatSort`, `items = signal<Item[]>([])` |
| Form submit → servlet POST | `onSubmit()` → `service.create(form.getRawValue()).pipe(takeUntilDestroyed())` |
| Session attribute display | Auth service signal: `currentUser = toSignal(auth.user$)` |

---

### Validation Messages

| JSP | Angular 21 |
|---|---|
| `<span class="error">${errors.custName}</span>` | `@if (form.get('customerName')?.errors?.['required'] && form.get('customerName')?.touched) { <mat-error>...</mat-error> }` |
| Server-side validation errors displayed on page | `form.setErrors()` + `mat-error` OR Angular Material snackbar for non-field errors |

---

## 3. pgvector — Angular-Specific DB Schema

Add these tables to your existing schema from the main RAG guide.

```sql
-- ════════════════════════════════════════════════════════════
-- ANGULAR 21 SPECIFIC pgvector TABLES
-- ════════════════════════════════════════════════════════════

-- ── Angular Component Pattern Library ─────────────────────────────────────
CREATE TABLE angular_patterns (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    pattern_name    TEXT NOT NULL,          -- e.g. 'conditional-required-field'
    jsp_trigger     TEXT NOT NULL,          -- the JSP snippet that triggers this pattern
    component_ts    TEXT NOT NULL,          -- verified .component.ts code
    component_html  TEXT NOT NULL,          -- verified .component.html code
    component_scss  TEXT DEFAULT '',
    tags            TEXT[],                 -- ['mat-select','conditional','required']
    complexity      TEXT DEFAULT 'LOW',     -- LOW | MEDIUM | HIGH
    embedding       VECTOR(1536),           -- embedded from jsp_trigger
    approved        BOOLEAN DEFAULT FALSE,
    module_source   TEXT,
    created_at      TIMESTAMPTZ DEFAULT NOW()
);
CREATE INDEX ON angular_patterns USING ivfflat (embedding vector_cosine_ops)
    WITH (lists = 50);
CREATE INDEX ON angular_patterns (approved, complexity);


-- ── Angular Validator Registry ─────────────────────────────────────────────
-- Stores custom Angular validator functions once verified.
-- Agents retrieve these instead of re-generating the same validator.
CREATE TABLE angular_validators (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    validator_name  TEXT UNIQUE NOT NULL,   -- e.g. 'requiredIfCorpValidator'
    trigger_rule    TEXT NOT NULL,          -- the business rule that requires this
    validator_code  TEXT NOT NULL,          -- complete TypeScript validator function
    applies_to      TEXT[],
    embedding       VECTOR(1536),           -- embedded from trigger_rule
    approved        BOOLEAN DEFAULT FALSE,
    created_at      TIMESTAMPTZ DEFAULT NOW()
);
CREATE INDEX ON angular_validators USING ivfflat (embedding vector_cosine_ops)
    WITH (lists = 30);


-- ── Angular Form Group Registry ────────────────────────────────────────────
CREATE TABLE angular_form_groups (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    module_id       TEXT NOT NULL,
    form_group_name TEXT NOT NULL,          -- e.g. 'customerFormGroup'
    component_name  TEXT NOT NULL,
    form_controls   JSONB NOT NULL,         -- { "customerName": { "validators": [...] } }
    embedding       VECTOR(1536),
    created_at      TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(module_id, form_group_name)
);


-- ── Angular CSM Rules — pre-filtered view ────────────────────────────────
CREATE VIEW angular_csm_rules AS
SELECT id, rule_id, rule_text, embedding
FROM   csm_rules
WHERE  section = 'ANGULAR'
  AND  applies_to @> ARRAY['angular_generator'];


-- ── Naming registry: Angular-only view ───────────────────────────────────
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
$$ LANGUAGE plpgsql;
```

---

## 4. Angular Generator Agent — Full Prompt Assembly

```python
# angular_agent.py
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

    # ── 1. Load Migration Contract target ───────────────────────────────
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
    naming_block = "\n".join(
        f"  JSP '{r[0]}' → formControlName: '{r[1]}'"
        for r in naming_rows
    ) or "  (registry not yet populated — use camelCase conversion)"

    # ── 3. Retrieve relevant Angular CSM rules via semantic search ────────
    task_hint = "Angular standalone component reactive form signals inject OnPush mat-form-field"
    q_vec = embed(task_hint)
    cur.execute("""
        SELECT rule_text
        FROM   angular_csm_rules
        ORDER  BY embedding <=> %s::vector
        LIMIT  12
    """, (vec(q_vec),))
    csm_rules = "\n".join(f"- {r[0]}" for r in cur.fetchall())

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
                f"### GOLDEN EXAMPLE: {name} {tags}\n"
                f"JSP INPUT:\n{jsp}\n\n"
                f"COMPONENT .ts:\n{ts}\n\n"
                f"COMPONENT .html:\n{html}"
            )
        examples_block = "\n\n---\n\n".join(parts)
    else:
        examples_block = "No golden examples yet — first run. Follow CSM rules strictly."

    # ── 5. Retrieve existing validators (avoid re-generating) ─────────────
    cur.execute("""
        SELECT validator_name, validator_code
        FROM   angular_validators
        WHERE  approved = true
    """)
    existing_validators = {r[0]: r[1] for r in cur.fetchall()}
    validators_block = (
        "\n".join(f"ALREADY EXISTS — reuse don't regenerate: {name}"
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
    {{ "path": "src/app/...", "content": "..." }}
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
    conn.close()
```

---

## 5. Generated Angular 21 Files — Real Output

### customer-form.component.ts

```typescript
// ✅ GENERATED: customer-form.component.ts
// Angular 21 — Standalone, OnPush, Signals, inject(), reactive form

import { Component, ChangeDetectionStrategy, inject,
         signal, computed, DestroyRef } from '@angular/core';
import { CommonModule }            from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router }                  from '@angular/router';
import { takeUntilDestroyed }      from '@angular/core/rxjs-interop';
import { toSignal }                from '@angular/core/rxjs-interop';
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
  standalone: true,                                        // ✅ No NgModule
  changeDetection: ChangeDetectionStrategy.OnPush,        // ✅ OnPush always
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

  // ── DI via inject() — never constructor params ──────────────────
  private fb        = inject(FormBuilder);
  private svc       = inject(CustomerService);
  private router    = inject(Router);
  private snack     = inject(MatSnackBar);
  private destroyRef = inject(DestroyRef);

  // ── Signal state ────────────────────────────────────────────────
  readonly isSubmitting = signal(false);
  readonly submitError  = signal<string | null>(null);

  // ── Customer type options ────────────────────────────────────────
  readonly customerTypes: CustomerType[] = [
    { value: 'IND',  label: 'Individual' },
    { value: 'CORP', label: 'Corporate'  },
  ];

  // ── Reactive form — formControlNames from namingRegistry ─────────
  readonly form = this.fb.group({
    customerName:  ['', [Validators.required, Validators.maxLength(100)]],
    customerType:  ['', Validators.required],
    emailAddress:  ['', [Validators.required, Validators.email],
                   [uniqueEmailValidator(this.svc)]],
    taxId:         ['', [Validators.pattern(/^[0-9]{9}$/)]],
    startDate:     [null as Date | null, Validators.required],
    activeFlag:    [true],
    notesText:     ['', Validators.maxLength(500)],
  }, {
    validators: [requiredIfCorpValidator],
  });

  // ── Computed signals ─────────────────────────────────────────────
  readonly isCorporate = computed(() =>
    this.form.get('customerType')?.value === 'CORP'
  );

  readonly canSubmit = computed(() =>
    this.form.valid && !this.isSubmitting()
  );

  // ── Submit ────────────────────────────────────────────────────────
  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.isSubmitting.set(true);
    this.submitError.set(null);

    this.svc.createCustomer(this.form.getRawValue())
      .pipe(takeUntilDestroyed(this.destroyRef))
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

  // ── Field error helper ────────────────────────────────────────────
  fieldError(name: string, error: string): boolean {
    const ctrl = this.form.get(name);
    return !!(ctrl?.errors?.[error] && (ctrl.dirty || ctrl.touched));
  }
}
```

---

### customer-form.component.html

```html
<!-- ✅ GENERATED: customer-form.component.html -->
<!-- Angular 21 — @if/@for, @defer, Angular Material -->

<section class="form-container">
  <h2 class="form-title">Customer Details</h2>

  @if (submitError()) {
    <mat-error class="global-error">{{ submitError() }}</mat-error>
  }

  <form [formGroup]="form" (ngSubmit)="onSubmit()" novalidate>

    <!-- Customer Name -->
    <mat-form-field appearance="outline" class="full-width">
      <mat-label>Customer Name</mat-label>
      <input matInput formControlName="customerName"
             placeholder="Enter customer name" [maxlength]="100" />
      @if (fieldError('customerName', 'required')) {
        <mat-error>Customer name is required</mat-error>
      }
      @if (fieldError('customerName', 'maxlength')) {
        <mat-error>Maximum 100 characters</mat-error>
      }
    </mat-form-field>

    <!-- Customer Type -->
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

    <!-- Tax ID — conditional: CORP only -->
    @if (isCorporate()) {
      <mat-form-field appearance="outline" class="full-width">
        <mat-label>Tax ID</mat-label>
        <input matInput formControlName="taxId" placeholder="9-digit tax ID" />
        @if (fieldError('taxId', 'required')) {
          <mat-error>Tax ID is required for corporate customers</mat-error>
        }
        @if (fieldError('taxId', 'pattern')) {
          <mat-error>Tax ID must be 9 digits</mat-error>
        }
      </mat-form-field>
    }

    <!-- Email -->
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

    <!-- Start Date -->
    <mat-form-field appearance="outline" class="full-width">
      <mat-label>Start Date</mat-label>
      <input matInput [matDatepicker]="picker" formControlName="startDate" />
      <mat-datepicker-toggle matIconSuffix [for]="picker" />
      <mat-datepicker #picker />
      @if (fieldError('startDate', 'required')) {
        <mat-error>Start date is required</mat-error>
      }
    </mat-form-field>

    <!-- Notes — deferred (below fold) -->
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

    <!-- Active Flag -->
    <div class="checkbox-row">
      <mat-checkbox formControlName="activeFlag">Active customer</mat-checkbox>
    </div>

    <!-- Actions -->
    <div class="actions">
      <button mat-stroked-button type="button" routerLink="/customers">Cancel</button>
      <button mat-flat-button color="primary" type="submit" [disabled]="!canSubmit()">
        @if (isSubmitting()) {
          <mat-spinner diameter="20" />
        } @else {
          Save Customer
        }
      </button>
    </div>

  </form>
</section>
```

---

### customer.service.ts

```typescript
// ✅ GENERATED: customer.service.ts
// Angular 21 — inject(), typed HTTP, signals

import { Injectable, inject, signal } from '@angular/core';
import { HttpClient }                 from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { environment }                from '../../environments/environment';
import {
  CreateCustomerRequest,
  UpdateCustomerRequest,
  CustomerResponse,
  CustomerSummaryResponse,
} from './customer.model';

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
  private baseUrl = `${environment.apiBaseUrl}/api/v1/customers`;

  private _customers = signal<CustomerSummaryResponse[]>([]);
  readonly customers = this._customers.asReadonly();

  createCustomer(req: CreateCustomerRequest): Observable<CustomerResponse> {
    return this.http.post<CustomerResponse>(this.baseUrl, req).pipe(
      catchError(err => throwError(() => err))
    );
  }

  getCustomer(id: string): Observable<CustomerResponse> {
    return this.http.get<CustomerResponse>(`${this.baseUrl}/${id}`).pipe(
      catchError(err => throwError(() => err))
    );
  }

  listCustomers(page = 0, size = 20): Observable<PageResponse<CustomerSummaryResponse>> {
    return this.http.get<PageResponse<CustomerSummaryResponse>>(
      this.baseUrl, { params: { page, size } }
    );
  }

  updateCustomer(id: string, req: UpdateCustomerRequest): Observable<CustomerResponse> {
    return this.http.put<CustomerResponse>(`${this.baseUrl}/${id}`, req).pipe(
      catchError(err => throwError(() => err))
    );
  }

  checkEmailUnique(email: string): Observable<{ available: boolean }> {
    return this.http.get<{ available: boolean }>(
      `${this.baseUrl}/check-email`, { params: { email } }
    );
  }
}
```

---

### required-if-corp.validator.ts

```typescript
// ✅ GENERATED: required-if-corp.validator.ts
// Standalone validator function (NOT a class) — Angular 21 standard
// Stored in angular_validators table after approval for reuse

import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

/**
 * Cross-field validator: taxId required when customerType === 'CORP'.
 * Applied at FormGroup level, not FormControl level.
 * Business rule: MC.source.businessRules[0]
 */
export const requiredIfCorpValidator: ValidatorFn =
  (group: AbstractControl): ValidationErrors | null => {
    const customerType = group.get('customerType')?.value;
    const taxId        = group.get('taxId')?.value;

    if (customerType === 'CORP' && !taxId?.trim()) {
      group.get('taxId')?.setErrors({ requiredIfCorp: true });
      return { requiredIfCorp: true };
    }

    const taxIdCtrl = group.get('taxId');
    if (taxIdCtrl?.errors?.['requiredIfCorp']) {
      const { requiredIfCorp, ...rest } = taxIdCtrl.errors;
      taxIdCtrl.setErrors(Object.keys(rest).length ? rest : null);
    }

    return null;
  };
```

---

### unique-email.validator.ts

```typescript
// ✅ GENERATED: unique-email.validator.ts
// Async validator — calls backend to check email uniqueness.

import { AsyncValidatorFn }   from '@angular/forms';
import { map, catchError, of, debounceTime, switchMap, first } from 'rxjs';
import { CustomerService }    from '../customer.service';

export function uniqueEmailValidator(svc: CustomerService): AsyncValidatorFn {
  return (ctrl) => {
    if (!ctrl.value) return of(null);

    return of(ctrl.value).pipe(
      debounceTime(400),
      switchMap(email =>
        svc.checkEmailUnique(email).pipe(
          map(res => res.available ? null : { emailTaken: true }),
          catchError(() => of(null))  // fail open on network error
        )
      ),
      first()
    );
  };
}
```

---

### customer.routes.ts

```typescript
// ✅ GENERATED: customer.routes.ts
// Angular 21 — lazy-loaded, functional guards and resolvers

import { Routes }     from '@angular/router';
import { inject }     from '@angular/core';
import { ResolveFn, CanActivateFn, Router } from '@angular/router';
import { CustomerResponse } from './customer.model';
import { CustomerService }  from './customer.service';
import { AuthService }      from '../auth/auth.service';

// Guard — function style (not class)
const customerWriteGuard: CanActivateFn = () => {
  const auth   = inject(AuthService);
  const router = inject(Router);
  if (auth.hasRole('ROLE_CUSTOMER_WRITE')) return true;
  return router.createUrlTree(['/forbidden']);
};

// Resolver — function style
const customerResolver: ResolveFn<CustomerResponse> = (route) =>
  inject(CustomerService).getCustomer(route.paramMap.get('id')!);

// Routes — all lazy-loaded via loadComponent
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
];
```

---

## 6. Signals & Reactive Forms Patterns

These patterns are stored in the `angular_patterns` table and auto-retrieved as golden examples.

### Signal State Pattern

```typescript
// Component state — always signals in Angular 21
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
);
```

---

### Conditional Validator Toggle

```typescript
constructor() {
  // Watch field using effect() — not valueChanges subscription
  effect(() => {
    const type    = this.form.get('customerType')?.value;
    const taxCtrl = this.form.get('taxId')!;

    if (type === 'CORP') {
      taxCtrl.addValidators(Validators.required);
    } else {
      taxCtrl.removeValidators(Validators.required);
      taxCtrl.setValue('');
    }
    taxCtrl.updateValueAndValidity({ emitEvent: false });
  });
}
```

---

### Typed Form getRawValue()

```typescript
interface CreateCustomerRequest {
  customerName:  string;
  customerType:  'IND' | 'CORP';
  emailAddress:  string;
  taxId:         string | null;
  startDate:     Date | null;
  activeFlag:    boolean;
  notesText:     string | null;
}

// getRawValue() includes disabled controls — always use over form.value
onSubmit(): void {
  const payload = this.form.getRawValue() as CreateCustomerRequest;
  this.svc.createCustomer(payload).subscribe(...);
}
```

---

### takeUntilDestroyed Pattern

```typescript
// inject DestroyRef at field level — no ngOnDestroy needed
private destroyRef = inject(DestroyRef);

loadData(): void {
  this.svc.listCustomers()
    .pipe(takeUntilDestroyed(this.destroyRef))
    .subscribe(page => {
      this.items.set(page.content);
    });
}
```

---

### input() / output() Signal APIs

```typescript
// Angular 21 signal-based component API
// NOT @Input() / @Output() decorators

@Component({ standalone: true, ... })
export class CustomerCardComponent {

  // Signal input — required
  customer    = input.required<CustomerSummaryResponse>();

  // Signal input with default
  showActions = input<boolean>(true);

  // Signal outputs
  selected    = output<string>();
  deleted     = output<string>();

  onSelect(): void {
    this.selected.emit(this.customer().id);
  }
}
```

---

### @defer Block Pattern

```html
<!-- Immediate: above fold content -->
<app-customer-header [customer]="customer()" />

<!-- Deferred: below fold or complex section -->
@defer (on viewport) {
  <app-customer-history [customerId]="customer().id" />
} @loading (minimum 200ms) {
  <mat-spinner diameter="32" />
} @placeholder {
  <div class="history-placeholder">Transaction history</div>
} @error {
  <p>Failed to load history</p>
}
```

---

## 7. Gate Validator — Angular 21 Checklist

Every item is a pgvector-stored rule retrieved and checked against every generated file.

### Component Structure

| ✓ | Rule | Auto-fix |
|---|---|---|
| ✓ | `standalone: true` present on `@Component` | Add `standalone: true` to `@Component` metadata |
| ✓ | `ChangeDetectionStrategy.OnPush` on every component | Add `changeDetection: ChangeDetectionStrategy.OnPush` |
| ✓ | No NgModule references anywhere in file | Remove NgModule import and declaration |
| ✓ | `imports` array in `@Component` contains needed modules | Add missing module to standalone imports array |

### Dependency Injection

| ✓ | Rule | Auto-fix |
|---|---|---|
| ✓ | No constructor parameters for DI (`inject()` only) | Move constructor params to `private x = inject(X)` |
| ✓ | `inject()` called at field level, not inside methods | Move `inject()` call to class field declaration |
| ✓ | `DestroyRef` injected for `takeUntilDestroyed` | Add `private destroyRef = inject(DestroyRef)` |

### Signals & State

| ✓ | Rule | Auto-fix |
|---|---|---|
| ✓ | No `BehaviorSubject` for component state | Replace `BehaviorSubject` with `signal()` |
| ✓ | No `@Input()`/`@Output()` decorators | Replace with `input<T>()` / `output<T>()` |
| ✓ | RxJS streams bridged with `toSignal()` at boundary | Wrap observable with `toSignal(obs$, { initialValue: ... })` |
| ✓ | Derived state uses `computed()` | Replace duplicate signal logic with `computed()` |

### Reactive Forms

| ✓ | Rule | Auto-fix |
|---|---|---|
| ✓ | `ReactiveFormsModule` in component imports | Add `ReactiveFormsModule` to standalone imports |
| ✓ | No `ngModel` anywhere | Remove `ngModel`, add `FormControl` and `formControlName` |
| ✓ | All `formControlName` values match `MC.namingRegistry` | Replace with value from naming registry |
| ✓ | `form.getRawValue()` used on submit | Replace `form.value` with `form.getRawValue()` |
| ✓ | `form.markAllAsTouched()` called on invalid submit | Add before `return` in `onSubmit` |

### Angular Material

| ✓ | Rule | Auto-fix |
|---|---|---|
| ✓ | All text inputs use `mat-form-field + matInput` | Wrap `<input>` with `<mat-form-field><input matInput>` |
| ✓ | Dropdowns use `mat-select` not native `<select>` | Replace `<select>` with `<mat-select>` |
| ✓ | Date fields use `mat-datepicker` | Replace `<input type=date>` with matDatepicker pattern |
| ✓ | Errors use `<mat-error>` inside `mat-form-field` | Replace `.error` spans with `<mat-error>` |

### HTTP & Routing

| ✓ | Rule | Auto-fix |
|---|---|---|
| ✓ | No `HttpClientModule` import | Remove `HttpClientModule`, use `provideHttpClient()` in `app.config.ts` |
| ✓ | Routes use `loadComponent()` for lazy loading | Replace `component: X` with `loadComponent: () => import(...)` |
| ✓ | Guards and resolvers are functions not classes | Convert class Guard to `const guard: CanActivateFn = () => ...` |
| ✓ | `takeUntilDestroyed()` on all subscriptions | Add `.pipe(takeUntilDestroyed(this.destroyRef))` before `subscribe()` |

---

## 8. Generated File Output Structure

### Folder Layout

```
src/app/
│
├── app.config.ts              ← one-time setup (provideHttpClient here)
├── app.routes.ts              ← add one lazy route per migrated module
│
└── features/
    └── customer/              ← one folder per migrated JSP module
        │
        ├── customer.routes.ts
        ├── customer.model.ts
        ├── customer.service.ts
        │
        ├── validators/
        │   ├── required-if-corp.validator.ts
        │   └── unique-email.validator.ts
        │
        ├── customer-form/
        │   ├── customer-form.component.ts
        │   ├── customer-form.component.html
        │   └── customer-form.component.scss
        │
        └── customer-list/
            ├── customer-list.component.ts
            ├── customer-list.component.html
            └── customer-list.component.scss
```

---

### customer.model.ts

```typescript
// Interfaces match Java DTO records exactly
// Generated from MC.target.endpoints[].requestDto / responseDto

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
  id:            string;          // UUID
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
}
```

---

### app.config.ts

```typescript
// provideHttpClient() — NOT HttpClientModule
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
      withInterceptors([authInterceptor])    // functional interceptor
    ),
    provideAnimationsAsync(),
    provideNativeDateAdapter(),
  ],
};
```

---

### app.routes.ts

```typescript
// One entry per migrated module — all lazy-loaded
import { Routes } from '@angular/router';

export const APP_ROUTES: Routes = [
  { path: '', redirectTo: '/customers', pathMatch: 'full' },
  {
    path: 'customers',
    loadChildren: () =>
      import('./features/customer/customer.routes')
        .then(m => m.CUSTOMER_ROUTES),
  },
  // Add each migrated JSP module here as it completes
];
```

---

*Generated by Angular 21 RAG Agent · pgvector + GPT-4o · claude-opus-4-6*
