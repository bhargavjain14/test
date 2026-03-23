# SCRIPTS.md
# Ready-to-run scripts for MC injection and file management
# ════════════════════════════════════════════════════════════
# These are standalone scripts — no dependencies, no frameworks.
# Copy the one you need into a .sh or .ps1 file and run it.
# ════════════════════════════════════════════════════════════


## SCRIPT 1 — inject-mc.sh (Mac / Linux)
# Replaces {{MC_JSON}} in an agent file with actual MC content.
# Usage: ./inject-mc.sh 03-java-generator.md MC-CustomerForm.json

```bash
#!/bin/bash
# inject-mc.sh
# Usage: ./inject-mc.sh <agent-file> <mc-json-file>

AGENT_FILE="$1"
MC_FILE="$2"

if [ -z "$AGENT_FILE" ] || [ -z "$MC_FILE" ]; then
  echo "Usage: ./inject-mc.sh <agent-file> <mc-json-file>"
  exit 1
fi

if [ ! -f "$AGENT_FILE" ]; then
  echo "ERROR: Agent file not found: $AGENT_FILE"
  exit 1
fi

if [ ! -f "$MC_FILE" ]; then
  echo "ERROR: MC file not found: $MC_FILE"
  exit 1
fi

# Backup the original file
cp "$AGENT_FILE" "${AGENT_FILE}.backup"

# Read MC content and escape for sed
MC_CONTENT=$(cat "$MC_FILE")

# Replace {{MC_JSON}} with actual MC content using Python (handles multiline)
python3 - <<EOF
import re

with open('$AGENT_FILE', 'r') as f:
    content = f.read()

with open('$MC_FILE', 'r') as f:
    mc_content = f.read()

updated = content.replace('{{MC_JSON}}', mc_content)

with open('$AGENT_FILE', 'w') as f:
    f.write(updated)

print(f"Injected MC into $AGENT_FILE")
print(f"Original backed up to ${AGENT_FILE}.backup")
EOF
```


## SCRIPT 2 — inject-mc.ps1 (Windows PowerShell)
# Usage: .\inject-mc.ps1 -AgentFile "03-java-generator.md" -McFile "MC-CustomerForm.json"

```powershell
# inject-mc.ps1
param(
    [Parameter(Mandatory=$true)][string]$AgentFile,
    [Parameter(Mandatory=$true)][string]$McFile
)

if (-not (Test-Path $AgentFile)) {
    Write-Error "Agent file not found: $AgentFile"
    exit 1
}
if (-not (Test-Path $McFile)) {
    Write-Error "MC file not found: $McFile"
    exit 1
}

# Backup
Copy-Item $AgentFile "$AgentFile.backup"

$agentContent = Get-Content $AgentFile -Raw
$mcContent    = Get-Content $McFile -Raw

$updated = $agentContent -replace '\{\{MC_JSON\}\}', $mcContent

Set-Content -Path $AgentFile -Value $updated -NoNewline
Write-Host "Injected MC into $AgentFile"
Write-Host "Backup saved to $AgentFile.backup"
```


## SCRIPT 3 — restore-placeholder.sh (Mac / Linux)
# After an agent run, restores {{MC_JSON}} placeholder from backup.
# Usage: ./restore-placeholder.sh 03-java-generator.md

```bash
#!/bin/bash
# restore-placeholder.sh
AGENT_FILE="$1"
BACKUP="${AGENT_FILE}.backup"

if [ ! -f "$BACKUP" ]; then
  echo "No backup found for $AGENT_FILE — nothing to restore"
  exit 1
fi

cp "$BACKUP" "$AGENT_FILE"
rm "$BACKUP"
echo "Restored $AGENT_FILE from backup"
```


## SCRIPT 4 — update-mc-section.sh (Mac / Linux)
# After an agent run, copies its JSON output into the right MC section.
# Usage: ./update-mc-section.sh MC-CustomerForm.json source agent-output.json

```bash
#!/bin/bash
# update-mc-section.sh
# Usage: ./update-mc-section.sh <mc-file> <section-name> <agent-output-file>
#
# section-name must be one of:
#   source | target | namingRegistry | generatedJava | generatedAngular
#   gateReports.gate1 | gateReports.gate2 | gateReports.gate3

MC_FILE="$1"
SECTION="$2"
OUTPUT_FILE="$3"

if [ -z "$MC_FILE" ] || [ -z "$SECTION" ] || [ -z "$OUTPUT_FILE" ]; then
  echo "Usage: ./update-mc-section.sh <mc-file> <section> <output-file>"
  exit 1
fi

cp "$MC_FILE" "${MC_FILE}.backup"

python3 - <<EOF
import json, sys

with open('$MC_FILE', 'r') as f:
    mc = json.load(f)

with open('$OUTPUT_FILE', 'r') as f:
    agent_output = json.load(f)

# Support dot notation for nested keys: gateReports.gate1
section_path = '$SECTION'.split('.')
target = mc
for key in section_path[:-1]:
    target = target[key]
target[section_path[-1]] = agent_output

with open('$MC_FILE', 'w') as f:
    json.dump(mc, f, indent=2)

print(f"Updated MC section: $SECTION in $MC_FILE")
EOF
```


## SCRIPT 5 — run-all-agents.sh — Full pipeline runner (Mac / Linux)
# Runs the full pipeline for one module, injecting MC at each step.
# Fill in the paths before running.

```bash
#!/bin/bash
# run-all-agents.sh
# Full migration pipeline for one module.
# Requires: inject-mc.sh, restore-placeholder.sh, update-mc-section.sh
# Requires: a way to call your agents (replace CALL_AGENT placeholders below)

MODULE="CustomerForm"
MC_FILE="state/MC-${MODULE}.json"
INDUCTION_DIR="induction"
OUTPUT_DIR="output/${MODULE}"

mkdir -p "$OUTPUT_DIR"

echo "═══════════════════════════════════"
echo " Migrating module: $MODULE"
echo "═══════════════════════════════════"

# ── Phase 0: Complexity Analysis ────────────────────────────────────────
echo "Phase 0: Complexity Analysis..."
./inject-mc.sh "${INDUCTION_DIR}/01-complexity-analyzer.md" "$MC_FILE"

# Replace this line with your actual agent call:
# e.g. curl, python script, VS Code task, etc.
# CALL_AGENT "${INDUCTION_DIR}/01-complexity-analyzer.md" > "${OUTPUT_DIR}/phase0-output.json"

./restore-placeholder.sh "${INDUCTION_DIR}/01-complexity-analyzer.md"
./update-mc-section.sh "$MC_FILE" "source" "${OUTPUT_DIR}/phase0-output.json"
echo "  ✓ Phase 0 complete — MC.source updated"

# ── Phase 1: Contract Generation ────────────────────────────────────────
echo "Phase 1: Contract Generation..."
./inject-mc.sh "${INDUCTION_DIR}/02-contract-generator.md" "$MC_FILE"
# CALL_AGENT "${INDUCTION_DIR}/02-contract-generator.md" > "${OUTPUT_DIR}/phase1-output.json"
./restore-placeholder.sh "${INDUCTION_DIR}/02-contract-generator.md"

# Update two sections from one output file (assumes output has both keys)
python3 -c "
import json
with open('${OUTPUT_DIR}/phase1-output.json') as f: out = json.load(f)
with open('$MC_FILE') as f: mc = json.load(f)
mc['target'] = out.get('target', {})
mc['namingRegistry'] = out.get('namingRegistry', {})
with open('$MC_FILE', 'w') as f: json.dump(mc, f, indent=2)
print('  Updated MC.target + MC.namingRegistry')
"

# ── Gate 1 ───────────────────────────────────────────────────────────────
echo "Gate 1: Contract Validation..."
./inject-mc.sh "${INDUCTION_DIR}/05-gate-validator.md" "$MC_FILE"
# CALL_AGENT "${INDUCTION_DIR}/05-gate-validator.md" "Run GATE 1" > "${OUTPUT_DIR}/gate1-output.json"
./restore-placeholder.sh "${INDUCTION_DIR}/05-gate-validator.md"
./update-mc-section.sh "$MC_FILE" "gateReports.gate1" "${OUTPUT_DIR}/gate1-output.json"

GATE1_PASSED=$(python3 -c "import json; print(json.load(open('${OUTPUT_DIR}/gate1-output.json'))['passed'])")
if [ "$GATE1_PASSED" != "True" ]; then
  echo "  ✗ Gate 1 failed — run fix agent manually, then resume"
  exit 1
fi
echo "  ✓ Gate 1 passed"

# ── Phase 2A: Java Generation ────────────────────────────────────────────
echo "Phase 2A: Java Generation..."
./inject-mc.sh "${INDUCTION_DIR}/03-java-generator.md" "$MC_FILE"
# CALL_AGENT "${INDUCTION_DIR}/03-java-generator.md" > "${OUTPUT_DIR}/phase2a-output.json"
./restore-placeholder.sh "${INDUCTION_DIR}/03-java-generator.md"
./update-mc-section.sh "$MC_FILE" "generatedJava" "${OUTPUT_DIR}/phase2a-output.json"
echo "  ✓ Phase 2A complete"

# ── Phase 2B: Angular Generation ─────────────────────────────────────────
echo "Phase 2B: Angular Generation..."
./inject-mc.sh "${INDUCTION_DIR}/04-angular-generator.md" "$MC_FILE"
# CALL_AGENT "${INDUCTION_DIR}/04-angular-generator.md" > "${OUTPUT_DIR}/phase2b-output.json"
./restore-placeholder.sh "${INDUCTION_DIR}/04-angular-generator.md"
./update-mc-section.sh "$MC_FILE" "generatedAngular" "${OUTPUT_DIR}/phase2b-output.json"
echo "  ✓ Phase 2B complete"

echo ""
echo "Pipeline complete for module: $MODULE"
echo "Output files in: $OUTPUT_DIR"
echo "Updated MC: $MC_FILE"
```
