# UPDATE_AGENTS.md
# VS Code Agent Instruction File
# ═══════════════════════════════════════════════════════════════════════
#
# HOW TO USE THIS FILE IN VS CODE:
# 1. Open VS Code with GitHub Copilot or any agent that reads instruction files
# 2. Open this file in the editor
# 3. Open each target agent file alongside it
# 4. Tell the agent: "Follow UPDATE_AGENTS.md and apply it to [filename]"
# 5. Review the diff — the agent should ONLY make the changes listed here
#
# WHAT THIS FILE DOES:
# Modifies existing agent instruction files to support:
#   - Shared Migration Contract (MC) context slot
#   - Structured JSON-only output enforcement
#   - Naming registry lock (no invented names)
#   - Gate failure context slot (for retry runs)
#
# WHAT THIS FILE NEVER TOUCHES:
#   - Code generation rules (Java, Angular, Spring, TypeScript standards)
#   - Any section titled [JAVA-STANDARDS] or [ANGULAR-STANDARDS]
#   - Any existing role description or scope definition
#   - Any existing validation rules already written in the file
#   - File names, paths, or project structure decisions
#
# ═══════════════════════════════════════════════════════════════════════


## RULE 0 — PRESERVATION RULE (HIGHEST PRIORITY)
Before making any change, scan the target file for these patterns.
If found, DO NOT touch them under any circumstance:
  - Any block containing "JAVA_VERSION", "SPRING_VERSION", "ANGULAR_VERSION"
  - Any block containing "Package Structure" or "PACKAGE_LAYOUT"
  - Any section titled "## [JAVA-STANDARDS]" or "## [ANGULAR-STANDARDS]"
  - Any section titled "## [API-CONTRACT-STANDARDS]"
  - Any existing "FORBIDDEN" list
  - Any existing naming conventions already documented
  - Any existing role description, scope, or output format already defined

If any of the changes below would conflict with or duplicate existing content,
SKIP that change and leave a comment: # SKIPPED — already covered at line N


## RULE 1 — ADD MIGRATION CONTRACT SLOT
# Applies to: ALL agent instruction files

Find the very first line of the file (line 1).
INSERT the following block BEFORE line 1.
Do not modify any existing content. Pure prepend only.

---INSERT-START---
## ACTIVE MIGRATION CONTRACT
The Migration Contract below is the single source of truth for this module.
Read it completely before acting. Do not re-infer anything already decided here.

Rules for using this contract:
- Names: use ONLY names from namingRegistry — never invent field or method names
- Scope: only write to YOUR assigned section (defined in YOUR ROLE below)
- Gaps: if your required section is empty or missing, flag it before proceeding

<migration_contract>
{{MC_JSON}}
</migration_contract>

---
---INSERT-END---

Placement: This block goes at the TOP of the file, before any existing content.
Exception: If the file already contains "<migration_contract>" anywhere, SKIP this insertion.


## RULE 2 — ADD JSON OUTPUT LOCK
# Applies to: ALL agent instruction files

Search the target file for any of these phrases (case-insensitive):
  - "output format"
  - "return format"
  - "respond with"
  - "your output"

CASE A — phrase found:
  Read the existing output format instruction.
  If it already says "JSON only" or "valid JSON" — SKIP Rule 2.
  If it describes a different format — SKIP Rule 2, do not override.
  If it describes JSON but without strictness — APPEND the following
  sentence to the end of that existing paragraph only:
    "Return only the JSON object. No prose, no markdown fences, no preamble.
     First character must be { and last character must be }."

CASE B — phrase NOT found:
  Find the last line of the file.
  APPEND the following block at the very end:

---INSERT-START---

## OUTPUT FORMAT
Return ONLY valid JSON. No prose before or after. No markdown code fences.
First character of your response: {
Last character of your response: }

If you cannot complete the task, return:
{
  "error": "reason you cannot complete the task",
  "partialOutput": null,
  "blockedBy": "which field or decision is missing"
}
---INSERT-END---


## RULE 3 — ADD NAMING REGISTRY LOCK
# Applies to: files whose name contains "java-generator" OR "angular-generator"
#             OR files whose content contains "generate" AND ("Java" OR "Angular")
# Skip for: analyzer, contract-generator, gate-validator, parity-checker, fix-agent

Search the target file for any of these phrases:
  - "namingRegistry"
  - "naming registry"
  - "use exact names"
  - "field names from"

If any phrase is found — SKIP Rule 3 entirely.

If NOT found — locate the section that describes what the agent should generate.
Look for headers like "## WHAT TO GENERATE" or "## YOUR ROLE" or "## SCOPE".
APPEND the following block immediately AFTER that section (before the next ## header):

---INSERT-START---
## NAMING LOCK — MANDATORY
All field names, method names, DTO property names, and formControlNames
MUST come from MC.namingRegistry in the contract above.

For each field you generate:
  1. Find the JSP field id in MC.namingRegistry
  2. Use the "java" value for Java code, "angular" value for Angular code
  3. If the field id is NOT in MC.namingRegistry, stop and output:
     { "missingFromRegistry": "<the id>", "proposedName": "<your suggestion>" }
     Do not generate code for that field until the registry entry exists.

Never invent a name. Never use the raw JSP id (e.g. cust_nm) in generated code.
---INSERT-END---


## RULE 4 — ADD GATE FAILURE CONTEXT SLOT
# Applies to: ALL agent instruction files

Search the target file for any of these phrases:
  - "gate failure"
  - "retry"
  - "previous errors"
  - "compilationErrors"
  - "activeErrors"

If any phrase is found — SKIP Rule 4.

Find the last ## header in the file.
INSERT the following block AFTER the last ## header block but BEFORE the end of file:

---INSERT-START---
## GATE FAILURE CONTEXT (only present on retry runs)
If the migration contract contains a non-empty "activeErrors" array,
this is a retry run. A prior attempt failed gate validation.

On retry runs:
  1. Read MC.activeErrors before generating anything
  2. For each error: understand what went wrong and why
  3. Fix those specific issues in your output
  4. Do NOT change anything unrelated to the listed errors
  5. After fixing, output a "fixedErrors" array listing which error ids you resolved

If "activeErrors" is empty or absent, proceed normally.
---INSERT-END---


## RULE 5 — ADD CHUNKING GUARD
# Applies to: files whose name contains "analyzer" OR "complexity"
# Skip for all other files

Search the target file for the word "chunk" (case-insensitive).
If found — SKIP Rule 5.

Find the section describing output format or what to extract.
APPEND immediately after it:

---INSERT-START---
## LARGE FORM CHUNKING
If the JSP contains more than 40 form fields, do NOT process all at once.
Process in batches of 20 fields maximum.

For each chunk, wrap output as:
{
  "_chunk": <chunk number starting at 1>,
  "_totalChunks": <total number of chunks>,
  "_lastProcessedId": "<id of the last field processed in this chunk>",
  "formFields": [ <only the fields in this chunk> ]
}

Wait for the next call to process the following chunk.
Do not summarize. Do not skip fields. Process sequentially.
---INSERT-END---


## RULE 6 — ADD MODEL ROUTING COMMENT
# Applies to: ALL agent instruction files

Search for the word "model" or "claude" (case-insensitive) in the file.
If a model name is already specified in the file — SKIP Rule 6.

Find the very first ## header in the file.
INSERT the following single line comment IMMEDIATELY below that header:

---INSERT-START---
<!-- Recommended model: claude-opus-4-6 for analysis/validation agents,
     claude-sonnet-4-6 for java-generator and angular-generator agents -->
---INSERT-END---


## SUMMARY OF ALL CHANGES PER FILE TYPE

### analyzer / complexity agent files → apply Rules: 1, 2, 4, 5, 6
### contract-generator files          → apply Rules: 1, 2, 4, 6
### java-generator files              → apply Rules: 1, 2, 3, 4, 6
### angular-generator files           → apply Rules: 1, 2, 3, 4, 6
### gate-validator files              → apply Rules: 1, 2, 4, 6
### parity-checker files              → apply Rules: 1, 2, 4, 6
### fix-agent files                   → apply Rules: 1, 2, 4, 6
### any other / unknown file          → apply Rules: 1, 2, 4, 6


## FINAL VERIFICATION CHECKLIST
After applying all rules to a file, verify:

[ ] File still contains all original content (nothing deleted)
[ ] Code generation standards (Java/Angular) are word-for-word identical to before
[ ] <migration_contract>{{MC_JSON}}</migration_contract> block is at the top
[ ] JSON output lock is present (either appended to existing or as new section)
[ ] Naming lock present in java/angular generator files
[ ] Gate failure context slot present
[ ] No duplicate sections were introduced
[ ] No existing ## headers were renamed or removed
