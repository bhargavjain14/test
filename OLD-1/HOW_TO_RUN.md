# HOW_TO_RUN.md
# Step-by-step guide for using UPDATE_AGENTS.md in VS Code
# ════════════════════════════════════════════════════════════


## OPTION A — GitHub Copilot Chat (recommended)

1. Open VS Code
2. Open the agent file you want to update (e.g. 03-java-generator.md)
3. Open Copilot Chat (Ctrl+Shift+I or Cmd+Shift+I)
4. Paste this exact prompt into the chat:

────────────────────────────────────────────────────────────
@workspace I need you to update the currently open file following
the rules in UPDATE_AGENTS.md (also in this workspace).

Rules to follow:
- Apply only the rules that match this file type (see SUMMARY section in UPDATE_AGENTS.md)
- NEVER delete, modify, or reword any existing content
- NEVER touch any Java, Angular, or Spring code generation standards
- ONLY add the new blocks described in each rule
- After applying, run the FINAL VERIFICATION CHECKLIST and report results

Show me a diff of exactly what you will change before applying it.
────────────────────────────────────────────────────────────

5. Review the diff Copilot shows you
6. If the diff only shows additions (no deletions of existing content), approve it
7. Repeat for each agent file


## OPTION B — Copilot Edits Mode (batch update all files at once)

1. Open VS Code
2. Open Copilot Edits (Ctrl+Shift+P → "Copilot: Open Edits")
3. Add all your agent files to the edit context
4. Add UPDATE_AGENTS.md to the edit context
5. Paste this prompt:

────────────────────────────────────────────────────────────
Apply the rules in UPDATE_AGENTS.md to each of the agent files
in this edit session.

For each file:
- Identify the file type from its name (analyzer, java-generator, etc.)
- Apply only the rules listed under SUMMARY for that file type
- Preserve ALL existing content word-for-word
- Only ADD the new blocks described in the rules

Do them one file at a time and show the diff for each before moving on.
────────────────────────────────────────────────────────────


## OPTION C — Cursor AI (if you use Cursor instead of VS Code)

1. Open Cursor
2. Open the agent file to update
3. Press Cmd+K or Ctrl+K to open inline edit
4. Paste this prompt:

────────────────────────────────────────────────────────────
Update this file following UPDATE_AGENTS.md rules.
File type: [replace with: analyzer | contract-generator | java-generator |
            angular-generator | gate-validator | parity-checker | fix-agent]

Apply only the rules for this file type from the SUMMARY section.
Preserve all existing content. Only add, never delete or modify.
────────────────────────────────────────────────────────────


## WHAT A CORRECT UPDATE LOOKS LIKE

A correctly updated file will have ONLY these additions:

1. At the very top — the MC context block:
   ## ACTIVE MIGRATION CONTRACT
   <migration_contract>{{MC_JSON}}</migration_contract>

2. At the bottom or appended to output section — JSON lock:
   ## OUTPUT FORMAT
   Return ONLY valid JSON...

3. (java/angular generators only) — after the WHAT TO GENERATE section:
   ## NAMING LOCK — MANDATORY
   All field names must come from MC.namingRegistry...

4. Near the end — gate failure context:
   ## GATE FAILURE CONTEXT (only present on retry runs)
   If MC.activeErrors is non-empty...

5. (analyzer files only) — after output format:
   ## LARGE FORM CHUNKING
   If more than 40 fields...

6. Below the first header — model comment:
   <!-- Recommended model: claude-opus-4-6 ... -->


## RED FLAGS — REJECT THE UPDATE IF YOU SEE:

❌ Any existing line was deleted
❌ Any Java or Angular standard was reworded
❌ Any [JAVA-STANDARDS] or [ANGULAR-STANDARDS] section was touched
❌ Any FORBIDDEN list was shortened
❌ Any existing naming convention was changed
❌ Any existing role description was reworded
❌ New sections were added with duplicate meaning to existing ones
❌ The file is shorter than it was before


## FILLING IN {{MC_JSON}} AT RUNTIME

The {{MC_JSON}} token in the MC block is a placeholder.
Before you run each agent, replace it with the actual MC file contents.

Quick way in VS Code:
1. Open the agent file and your migration-contract.json side by side
2. Select all content in migration-contract.json (Ctrl+A)
3. Copy
4. In the agent file, find {{MC_JSON}} and replace with the copied content
5. Run the agent
6. After the agent run, revert the agent file to {{MC_JSON}} placeholder
   (so it stays clean for the next module)

Or use a simple find-replace script — see SCRIPTS.md for a ready-made one.
