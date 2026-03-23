# .github/copilot-instructions.md
# ════════════════════════════════════════════════════════════════════════
# Workspace-level Copilot instructions for Legacy Migration project.
# VS Code reads this file automatically when Copilot is active.
# These instructions apply to ALL Copilot interactions in this workspace.
# ════════════════════════════════════════════════════════════════════════


## WORKSPACE CONTEXT
This workspace is a Legacy Migration project.
We are migrating Java/JSP applications to Angular 21 + Spring Boot 3.
Agent induction files live in the induction/ directory.
Code generation standards live in prompts/csm.md.
Migration state lives in state/ as JSON files.


## WHEN EDITING FILES IN induction/ DIRECTORY

If asked to update, modify, or improve any file in the induction/ directory:

ALWAYS PRESERVE:
- Any section containing Java version, Spring version, or Angular version declarations
- Any section titled with [JAVA-STANDARDS], [ANGULAR-STANDARDS], or [API-CONTRACT-STANDARDS]
- Any FORBIDDEN list
- Any existing naming conventions
- Any existing role description, scope, or output format already defined
- Any existing validation rules

ONLY ADD (never rewrite existing content):
- Migration Contract context slot (if not already present)
- JSON output enforcement (if not already present)
- Naming registry lock for java-generator and angular-generator files
- Gate failure context slot (if not already present)

When in doubt: ADD content, never replace it.
When a section already covers something: SKIP the addition, leave a comment.


## WHEN EDITING prompts/csm.md

This file contains org-wide code generation standards.
NEVER suggest changes to this file unless the user explicitly asks to update standards.
NEVER modify it as part of an agent induction update task.
Treat it as read-only for all migration workflow tasks.


## WHEN EDITING state/*.json (Migration Contract files)

These are structured JSON files with a specific schema.
NEVER add fields that are not in the schema.
NEVER delete filled sections (source, target, namingRegistry).
ONLY update the specific section the user asks to update.


## WHEN ASKED TO RUN THE UPDATE AGENTS TASK

The user may say: "apply UPDATE_AGENTS.md to this file" or "update this agent file".
When that happens:
1. Open and read UPDATE_AGENTS.md
2. Identify the file type from the filename
3. Apply ONLY the rules listed in the SUMMARY section for that file type
4. Show a diff before applying
5. Run the FINAL VERIFICATION CHECKLIST
6. Report which rules were applied and which were skipped (with reasons)


## GENERAL BEHAVIOR FOR THIS WORKSPACE

- Prefer minimal diffs — change the least possible to achieve the goal
- Never refactor working code or instructions unless explicitly asked
- When generating Java code: always follow prompts/csm.md [JAVA-STANDARDS]
- When generating Angular code: always follow prompts/csm.md [ANGULAR-STANDARDS]
- When unsure if a change is safe: ask before applying
