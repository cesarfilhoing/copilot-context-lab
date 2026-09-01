const ALERTS = [
  {
    id: "ALRT-1001", title: "National ID pattern in cloud storage file", source: "Sentinel DLP", detector: "national-id-pattern", severity: "high", detected: "2026-08-24", location: "TestForge / bucket nw-tf-data-eu / customers_export.csv",
    body: ["Sentinel DLP detected 1,482 matches for the Swedish personal identity number pattern in the file `customers_export.csv`.", "Sample rows contain `TST-000481`, `19770203-1187` and `maja.lindqvist@example.test`. File owner: `svc-testforge-loader` (service account)."],
    truth: "FALSE POSITIVE", signal: "TST-prefixed IDs, example.test emails and the TestForge service account identify synthetic test data.", pattern: "synthetic-test-data"
  },
  {
    id: "ALRT-1002", title: "Payment card number in documentation page", source: "Sentinel DLP", detector: "payment-card-number", severity: "critical", detected: "2026-08-24", location: "DocPortal / engineering / payment-integration-guide.md",
    body: ["A Luhn-valid payment card number, `4111 1111 1111 1111`, and CVC `123` were detected in staging integration instructions.", "The page is owned by the checkout platform team and visible to all Nordwind employees."],
    truth: "FALSE POSITIVE", signal: "4111 1111 1111 1111 is the industry Visa test PAN used in documentation.", pattern: "documentation-samples"
  },
  {
    id: "ALRT-1003", title: "Customer emails sent to personal address", source: "Sentinel DLP", detector: "bulk-email-exfiltration", severity: "high", detected: "2026-08-25", location: "Email gateway / outbound",
    body: ["A marketing employee sent `q3_campaign_contacts.xlsx` to `nwmarketing.backup2026@gmail.com`, an external consumer mail provider.", "The attachment contains 2,014 customer names, email addresses and loyalty-club numbers. Subject: ‘backup before laptop swap’."],
    truth: "TRUE POSITIVE", signal: "Real customer records were sent to personal Gmail; no exception process exists.", pattern: null
  },
  {
    id: "ALRT-1004", title: "National ID pattern in order export", source: "Sentinel DLP", detector: "national-id-pattern", severity: "high", detected: "2026-08-25", location: "CustomerHub / nightly-orders / orders_delta.csv",
    body: ["The detector found 312 Swedish national ID pattern matches in the `order_ref` column.", "Samples include `SE-ORD-8402159933`, `SE-ORD-7811023410` and `SE-ORD-9105318876`. The schema contains order lines and article numbers."],
    truth: "FALSE POSITIVE", signal: "The matches occur inside SE-ORD order references in an order-only schema.", pattern: "lookalike-identifiers"
  },
  {
    id: "ALRT-1005", title: "Salary data accessible to all staff", source: "Sentinel DLP", detector: "sensitive-hr-data-exposure", severity: "high", detected: "2026-08-26", location: "SharePoint / NW-Finance / Budget 2027",
    body: ["`salary_review_2026_final.xlsx` contains 340 employee names, IDs, current and proposed salaries, and manager notes.", "The folder is shared with `NW-All-Employees`. A finance controller changed permissions while preparing a budget workshop."],
    truth: "TRUE POSITIVE", signal: "Sensitive HR data is readable by all employees; workshop intent does not reduce the exposure.", pattern: null
  },
  {
    id: "ALRT-1006", title: "Password keyword in configuration file", source: "Sentinel DLP", detector: "credentials-in-code", severity: "medium", detected: "2026-08-26", location: "GitHub / nordwind/checkout-service / config/app.yaml",
    body: ["A committed database configuration contains the password value `${VAULT:secret/checkout/db-password}`.", "The file is on the main branch and was committed by a platform engineer."],
    truth: "FALSE POSITIVE", signal: "The value is a vault reference, not an actual credential.", pattern: "placeholder-secrets"
  },
  {
    id: "ALRT-1007", title: "Support transcript on public wiki", source: "Sentinel DLP", detector: "customer-data-public-exposure", severity: "critical", detected: "2026-08-27", location: "DocPortal / CustomerCare-Public / Tricky cases",
    body: ["A complete support transcript is published on a page requiring no authentication.", "It contains a real customer name, home address, order history and delivery complaint. A support lead created it as a de-escalation training example."],
    truth: "TRUE POSITIVE", signal: "Real customer data on a public page remains an incident when used as training material.", pattern: null
  },
  {
    id: "ALRT-1008", title: "Bulk personal data in repository fixture", source: "Sentinel DLP", detector: "bulk-personal-data", severity: "medium", detected: "2026-08-27", location: "GitHub / customerhub-api / fixtures/seed_users.json",
    body: ["The fixture contains 500 records with names, dates of birth, `TST-` IDs and `@example.test` addresses.", "The repository README identifies this file as input for integration tests."],
    truth: "FALSE POSITIVE", signal: "TST IDs, example.test addresses and the fixtures location identify synthetic test data.", pattern: "synthetic-test-data"
  },
  {
    id: "ALRT-1009", title: "Phone numbers on public website dataset", source: "Sentinel DLP", detector: "phone-number-bulk", severity: "low", detected: "2026-08-28", location: "StoreNet CMS / Store finder / stores_dataset.json",
    body: ["The public store finder dataset contains 214 phone numbers alongside store names and addresses.", "Examples include Nordwind Malmö Syd `+46 40 555 0182` and Nordwind Lisboa Norte `+351 21 555 0134`."],
    truth: "FALSE POSITIVE", signal: "Store switchboards are business contact data intentionally published by the web team.", pattern: "business-contact-data"
  },
  {
    id: "ALRT-1010", title: "Production backup copied to personal cloud", source: "Sentinel DLP", detector: "bulk-data-egress-endpoint", severity: "critical", detected: "2026-08-28", location: "Endpoint agent / laptop NW-LT-4471",
    body: ["`customerhub_prod_backup_20260827.sql.gz`, a 4.2 GB production backup, was copied to `~/Dropbox/work-stuff/`.", "It contains identity, contact, order and loyalty data for about six million customers. Only the encrypted backup vault is sanctioned."],
    truth: "TRUE POSITIVE", signal: "A production customer database was copied to unsanctioned personal storage.", pattern: null
  },
  {
    id: "ALRT-1011", title: "National ID in training presentation", source: "Sentinel DLP", detector: "national-id-pattern", severity: "high", detected: "2026-08-29", location: "SharePoint / NW-Academy / GDPR onboarding deck v7.pptx",
    body: ["The slide ‘What does personal data look like?’ contains `Anna Andersson`, `19850412-1234` and `anna.andersson@example.test`.", "The deck is mandatory GDPR onboarding material owned by the privacy training team."],
    truth: "FALSE POSITIVE", signal: "Anna Andersson with 19850412-1234 is the reserved training identity.", pattern: "documentation-samples"
  },
  {
    id: "ALRT-1012", title: "Personal data export in SARBox outbox", source: "Sentinel DLP", detector: "bulk-personal-data-export", severity: "high", detected: "2026-08-29", location: "SARBox / outbox / SAR-2026-0311_export.zip",
    body: ["A ZIP contains one individual’s profile, order history, support interactions and marketing preferences.", "The SARBox export job generated it for the verified requester of SAR-2026-0311. A privacy operations specialist initiated the export."],
    truth: "FALSE POSITIVE", signal: "The export is part of the approved SAR fulfilment workflow in the correct system and folder.", pattern: "approved-workflows"
  }
];

const RUNS = {
  baseline: {
    label: "Baseline", subtitle: "NO CONTEXT", agent: "triager-baseline",
    context: [{ folder: "alerts/", note: "Only the 12 alerts being triaged. No organizational knowledge.", files: [] }]
  },
  bad: {
    label: "Bad context", subtitle: "KNOWLEDGE DUMP", agent: "triager-bad",
    context: [
      { folder: "alerts/", note: "The 12 alerts being triaged.", files: [] },
      { folder: "context-bad/", note: "Unstructured, uncurated notes.", files: ["knowledge-dump.md"] }
    ]
  },
  good: {
    label: "Good context", subtitle: "CURATED CONTEXT", agent: "triager-good",
    context: [
      { folder: "alerts/", note: "The 12 alerts being triaged.", files: [] },
      { folder: "context-good/", note: "Map of what exists and how to use it.", files: ["README.md", "glossary.md"] },
      { folder: "context-good/patterns/", note: "Documented false-positive rules with counterexamples.", files: ["approved-workflows.md", "business-contact-data.md", "documentation-samples.md", "lookalike-identifiers.md", "placeholder-secrets.md", "synthetic-test-data.md"] },
      { folder: "context-good/examples/", note: "Labeled, reasoned past cases.", files: ["CASE-001.md", "CASE-002.md", "CASE-003.md", "CASE-004.md", "CASE-005.md", "CASE-006.md", "CASE-007.md", "CASE-008.md", "CASE-009.md", "CASE-010.md"] }
    ]
  }
};

const PROMPT = `Triage all alerts in the alerts/ folder. For each one, output a table row:
alert ID | TRUE POSITIVE or FALSE POSITIVE | confidence | one-line rationale.`;
const STORAGE_KEY = "copilot-context-lab-v1";

let state = loadState();
let activeAlertId = ALERTS[0].id;
let comparisonVisible = false;
let toastTimer;
let decisionPanelCollapsed = localStorage.getItem("copilot-context-lab-panel-collapsed") === "1";

const elements = {
  runTabs: document.querySelector("#runTabs"),
  progressLabel: document.querySelector("#progressLabel"),
  alertList: document.querySelector("#alertList"),
  alertDetail: document.querySelector("#alertDetail"),
  decisionPanel: document.querySelector("#decisionPanel"),
  workspace: document.querySelector("#workspace"),
  comparison: document.querySelector("#comparison"),
  compareButton: document.querySelector("#compareButton"),
  copyPromptButton: document.querySelector("#copyPromptButton"),
  importButton: document.querySelector("#importButton"),
  scoreButton: document.querySelector("#scoreButton"),
  importDialog: document.querySelector("#importDialog"),
  importText: document.querySelector("#importText"),
  parseImportButton: document.querySelector("#parseImportButton"),
  viewContextButton: document.querySelector("#viewContextButton"),
  contextDialog: document.querySelector("#contextDialog"),
  contextRuns: document.querySelector("#contextRuns"),
  toast: document.querySelector("#toast")
};

function emptyRun() {
  return { answers: {}, scored: false };
}

function loadState() {
  const fallback = { activeRun: "baseline", runs: { baseline: emptyRun(), bad: emptyRun(), good: emptyRun() } };
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (!saved?.runs) return fallback;
    return { ...fallback, ...saved, runs: { ...fallback.runs, ...saved.runs } };
  } catch {
    return fallback;
  }
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function escapeHtml(value = "") {
  return value.replace(/[&<>'"]/g, character => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" })[character]);
}

function inlineCode(value) {
  return escapeHtml(value).replace(/`([^`]+)`/g, "<code>$1</code>");
}

function activeRun() {
  return state.runs[state.activeRun];
}

function answeredCount(run = activeRun()) {
  return ALERTS.filter(alert => run.answers[alert.id]?.verdict).length;
}

function runScore(run) {
  return ALERTS.filter(alert => run.answers[alert.id]?.verdict === alert.truth).length;
}

function render() {
  renderRunTabs();
  renderAlertList();
  renderAlertDetail();
  renderDecisionPanel();
  renderProgress();
  renderComparison();
  if (window.lucide) window.lucide.createIcons();
}

function renderRunTabs() {
  elements.runTabs.innerHTML = Object.entries(RUNS).map(([key, run]) => {
    const completed = state.runs[key].scored ? " complete" : "";
    return `<button class="run-tab${completed}" type="button" role="tab" data-run="${key}" aria-selected="${key === state.activeRun}"><span>${run.label}</span><small>${run.subtitle}</small></button>`;
  }).join("");
}

function renderAlertList() {
  const run = activeRun();
  elements.alertList.innerHTML = ALERTS.map(alert => {
    const answer = run.answers[alert.id];
    let dotClass = answer?.verdict ? "answered" : "";
    if (run.scored && answer?.verdict) dotClass = answer.verdict === alert.truth ? "correct" : "incorrect";
    return `<button class="alert-item ${alert.id === activeAlertId ? "active" : ""}" type="button" data-alert="${alert.id}">
      <span class="severity-bar ${alert.severity}"></span>
      <span class="alert-item-copy"><strong>${alert.id}</strong><small>${escapeHtml(alert.detector)}</small></span>
      <span class="answer-dot ${dotClass}" aria-hidden="true"></span>
    </button>`;
  }).join("");
}

function renderAlertDetail() {
  const alert = ALERTS.find(item => item.id === activeAlertId);
  elements.alertDetail.innerHTML = `
    <span class="eyebrow">${alert.id} / ${alert.severity.toUpperCase()}</span>
    <h1>${escapeHtml(alert.title)}</h1>
    <div class="meta-strip">
      <div class="meta-item"><span>Source</span><strong>${escapeHtml(alert.source)}</strong></div>
      <div class="meta-item"><span>Detector</span><strong>${escapeHtml(alert.detector)}</strong></div>
      <div class="meta-item"><span>Detected</span><strong>${alert.detected}</strong></div>
      <div class="meta-item"><span>Location</span><strong>${escapeHtml(alert.location)}</strong></div>
    </div>
    <div class="alert-body">${alert.body.map(paragraph => `<p>${inlineCode(paragraph)}</p>`).join("")}</div>`;
}

function renderDecisionPanel() {
  elements.decisionPanel.classList.toggle("collapsed", decisionPanelCollapsed);
  elements.workspace.classList.toggle("panel-collapsed", decisionPanelCollapsed);
  const toggleButton = `<button class="panel-toggle" id="panelToggleButton" type="button" title="${decisionPanelCollapsed ? "Expand panel" : "Minimize panel"}" aria-label="${decisionPanelCollapsed ? "Expand panel" : "Minimize panel"}"><i data-lucide="${decisionPanelCollapsed ? "panel-left-open" : "panel-right-close"}"></i></button>`;

  if (decisionPanelCollapsed) {
    elements.decisionPanel.innerHTML = toggleButton;
    return;
  }

  const alert = ALERTS.find(item => item.id === activeAlertId);
  const run = activeRun();
  const answer = run.answers[alert.id] || {};
  const truth = run.scored ? `<div class="truth-card ${answer.verdict === alert.truth ? "" : "incorrect"}">
    <strong>${answer.verdict === alert.truth ? "Correct" : `Expected: ${alert.truth}`}</strong>
    <span>${escapeHtml(alert.signal)}</span>
    ${alert.pattern ? `<span><code>${alert.pattern}</code></span>` : ""}
  </div>` : "";

  elements.decisionPanel.innerHTML = `
    <div class="panel-kicker"><span>${RUNS[state.activeRun].agent}</span><span>${ALERTS.findIndex(item => item.id === activeAlertId) + 1}/12</span>${toggleButton}</div>
    <h2>Record decision</h2>
    <div class="choice-group" aria-label="Verdict">
      <button class="choice-button true-positive ${answer.verdict === "TRUE POSITIVE" ? "selected" : ""}" type="button" data-verdict="TRUE POSITIVE"><span class="choice-icon"><i data-lucide="shield-alert"></i></span>TRUE POSITIVE</button>
      <button class="choice-button false-positive ${answer.verdict === "FALSE POSITIVE" ? "selected" : ""}" type="button" data-verdict="FALSE POSITIVE"><span class="choice-icon"><i data-lucide="shield-check"></i></span>FALSE POSITIVE</button>
    </div>
    <label class="field-label">CONFIDENCE</label>
    <div class="confidence-control">${["low", "medium", "high"].map(value => `<button class="${answer.confidence === value ? "selected" : ""}" type="button" data-confidence="${value}">${value}</button>`).join("")}</div>
    <label class="field-label" for="rationaleInput">ONE-LINE RATIONALE</label>
    <textarea class="rationale-input" id="rationaleInput" placeholder="Paste or record the agent rationale...">${escapeHtml(answer.rationale || "")}</textarea>
    ${truth}`;
}

function renderProgress() {
  const count = answeredCount();
  const run = activeRun();
  elements.progressLabel.textContent = run.scored ? `${runScore(run)}/12 CORRECT` : `${count}/12 RECORDED`;
  elements.scoreButton.disabled = count < ALERTS.length;
  elements.scoreButton.querySelector("span").textContent = run.scored ? "Rescore run" : "Score run";
}

function renderContextRuns() {
  elements.contextRuns.innerHTML = Object.entries(RUNS).map(([key, run]) => `
    <article class="context-run ${key === state.activeRun ? "active" : ""}">
      <div class="context-run-header"><strong>${run.label}</strong><span>${run.subtitle}</span></div>
      ${run.context.map(entry => `
        <div class="context-folder">
          <code>${entry.folder}</code>
          <small>${escapeHtml(entry.note)}</small>
          ${entry.files.length ? `<ul>${entry.files.map(file => `<li>${file}</li>`).join("")}</ul>` : ""}
        </div>`).join("")}
    </article>`).join("");
  if (window.lucide) window.lucide.createIcons();
}

function renderComparison() {
  elements.workspace.hidden = comparisonVisible;
  elements.comparison.hidden = !comparisonVisible;
  elements.compareButton.querySelector("span").textContent = comparisonVisible ? "Back to triage" : "Compare runs";
  if (!comparisonVisible) return;

  const cards = Object.entries(RUNS).map(([key, run]) => {
    const result = state.runs[key];
    return `<article class="score-card"><span class="eyebrow">${run.subtitle}</span><strong>${result.scored ? runScore(result) : "—"}<span>/12</span></strong><small>${result.scored ? `${answeredCount(result)} decisions scored` : `${answeredCount(result)} decisions recorded`}</small></article>`;
  }).join("");

  const rows = ALERTS.map(alert => `<tr><td><strong>${alert.id}</strong></td><td>${alert.truth === "TRUE POSITIVE" ? "TP" : "FP"}</td>${Object.keys(RUNS).map(key => {
    const run = state.runs[key];
    const answer = run.answers[alert.id];
    if (!answer?.verdict) return `<td><span class="result-pill pending">Not recorded</span></td>`;
    if (!run.scored) return `<td><span class="result-pill pending">Recorded</span></td>`;
    const correct = answer.verdict === alert.truth;
    return `<td><span class="result-pill ${correct ? "correct" : "incorrect"}">${correct ? "✓ Correct" : "× Incorrect"}</span></td>`;
  }).join("")}</tr>`).join("");

  elements.comparison.innerHTML = `
    <div class="comparison-header"><div><span class="eyebrow">RUN ANALYSIS</span><h1>Context performance</h1></div><button class="button button-outline" id="resetAllButton" type="button"><i data-lucide="rotate-ccw"></i><span>Reset all</span></button></div>
    <div class="score-grid">${cards}</div>
    <div class="comparison-table-wrap"><table class="comparison-table"><thead><tr><th>Alert</th><th>Truth</th><th>Baseline</th><th>Bad context</th><th>Good context</th></tr></thead><tbody>${rows}</tbody></table></div>`;
}

function updateAnswer(patch) {
  const run = activeRun();
  run.answers[activeAlertId] = { ...run.answers[activeAlertId], ...patch };
  run.scored = false;
  saveState();
  render();
}

function parseImport() {
  const text = elements.importText.value;
  let imported = 0;
  for (const alert of ALERTS) {
    const line = text.split("\n").find(candidate => candidate.toUpperCase().includes(alert.id));
    if (!line) continue;
    const upperLine = line.toUpperCase();
    const verdict = upperLine.includes("FALSE POSITIVE") ? "FALSE POSITIVE" : upperLine.includes("TRUE POSITIVE") ? "TRUE POSITIVE" : null;
    if (!verdict) continue;
    const confidence = line.match(/\b(high|medium|low)\b/i)?.[1]?.toLowerCase() || "";
    const cells = line.split("|").map(cell => cell.trim()).filter(Boolean);
    const rationale = cells.length >= 4 ? cells[cells.length - 1] : "";
    activeRun().answers[alert.id] = { verdict, confidence, rationale };
    imported += 1;
  }
  activeRun().scored = false;
  saveState();
  elements.importDialog.close();
  elements.importText.value = "";
  render();
  showToast(imported ? `${imported} decision${imported === 1 ? "" : "s"} imported.` : "No alert decisions found. Check the table format.");
}

function showToast(message) {
  clearTimeout(toastTimer);
  elements.toast.textContent = message;
  elements.toast.classList.add("visible");
  toastTimer = setTimeout(() => elements.toast.classList.remove("visible"), 2800);
}

elements.runTabs.addEventListener("click", event => {
  const button = event.target.closest("[data-run]");
  if (!button) return;
  state.activeRun = button.dataset.run;
  comparisonVisible = false;
  saveState();
  render();
});

elements.alertList.addEventListener("click", event => {
  const button = event.target.closest("[data-alert]");
  if (!button) return;
  activeAlertId = button.dataset.alert;
  render();
});

elements.decisionPanel.addEventListener("click", event => {
  if (event.target.closest("#panelToggleButton")) {
    decisionPanelCollapsed = !decisionPanelCollapsed;
    localStorage.setItem("copilot-context-lab-panel-collapsed", decisionPanelCollapsed ? "1" : "0");
    render();
    return;
  }
  const verdict = event.target.closest("[data-verdict]")?.dataset.verdict;
  const confidence = event.target.closest("[data-confidence]")?.dataset.confidence;
  if (verdict) updateAnswer({ verdict });
  if (confidence) updateAnswer({ confidence });
});

elements.decisionPanel.addEventListener("change", event => {
  if (event.target.id === "rationaleInput") updateAnswer({ rationale: event.target.value.trim() });
});

elements.copyPromptButton.addEventListener("click", async () => {
  try {
    await navigator.clipboard.writeText(PROMPT);
    showToast("Prompt copied to clipboard.");
  } catch {
    showToast("Clipboard access was blocked. Use the prompt in README.md.");
  }
});

elements.importButton.addEventListener("click", () => elements.importDialog.showModal());
elements.parseImportButton.addEventListener("click", parseImport);
elements.viewContextButton.addEventListener("click", () => {
  renderContextRuns();
  elements.contextDialog.showModal();
});
elements.scoreButton.addEventListener("click", () => {
  activeRun().scored = true;
  saveState();
  render();
  showToast(`${RUNS[state.activeRun].label}: ${runScore(activeRun())}/12 correct.`);
});

elements.compareButton.addEventListener("click", () => {
  comparisonVisible = !comparisonVisible;
  render();
});

elements.comparison.addEventListener("click", event => {
  if (!event.target.closest("#resetAllButton")) return;
  if (!window.confirm("Reset all three runs and remove saved decisions?")) return;
  state = { activeRun: "baseline", runs: { baseline: emptyRun(), bad: emptyRun(), good: emptyRun() } };
  comparisonVisible = false;
  activeAlertId = ALERTS[0].id;
  saveState();
  render();
  showToast("All runs reset.");
});

render();