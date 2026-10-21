/* ===================================================================
   Interactive Digital Logic and Electronics Lab v3
   Complete redesign with realistic SVG components, logic gate symbols,
   and wire terminal labeling for clear circuit visualization
   =================================================================== */

"use strict";

// ======================== LOGIC GATE ENGINE ========================

const GateEngine = {
  AND:  (a, b) => a & b,
  OR:   (a, b) => a | b,
  NOT:  (a)    => a ^ 1,
  NAND: (a, b) => (a & b) ^ 1,
  NOR:  (a, b) => (a | b) ^ 1,
  XOR:  (a, b) => a ^ b,
  XNOR: (a, b) => (a ^ b) ^ 1,
};

const GateExpressions = {
  AND:  "Y = A AND B",
  OR:   "Y = A OR B",
  NOT:  "Y = NOT A",
  NAND: "Y = NOT (A AND B)",
  NOR:  "Y = NOT (A OR B)",
  XOR:  "Y = A XOR B",
  XNOR: "Y = NOT (A XOR B)",
};

function isSingleInput(gate) {
  return gate === "NOT";
}

function computeGate(gate, a, b) {
  if (isSingleInput(gate)) return GateEngine[gate](a);
  return GateEngine[gate](a, b);
}

function generateTruthTable(gate) {
  const rows = [];
  if (isSingleInput(gate)) {
    for (let a = 0; a <= 1; a++) {
      rows.push({ a, y: computeGate(gate, a, 0) });
    }
  } else {
    for (let a = 0; a <= 1; a++) {
      for (let b = 0; b <= 1; b++) {
        rows.push({ a, b, y: computeGate(gate, a, b) });
      }
    }
  }
  return rows;
}

function drawGateSymbol(gate) {
  const svg = document.getElementById("gate-symbol");
  svg.innerHTML = "";

  const isSingle = isSingleInput(gate);
  let pathData, label;

  switch (gate) {
    case "AND":
      // AND gate: curved D shape
      svg.innerHTML = `
        <g>
          <line x1="10" y1="20" x2="35" y2="20" stroke="#000" stroke-width="2"/>
          <line x1="10" y1="60" x2="35" y2="60" stroke="#000" stroke-width="2"/>
          <line x1="10" y1="20" x2="10" y2="60" stroke="#000" stroke-width="2"/>
          <path d="M 35 20 Q 55 20 55 40 Q 55 60 35 60" fill="none" stroke="#000" stroke-width="2"/>
          <circle cx="65" cy="40" r="3" fill="#000"/>
          <text x="30" y="75" font-size="12" text-anchor="middle">AND</text>
        </g>
      `;
      break;
    case "OR":
      // OR gate: curved D with bump
      svg.innerHTML = `
        <g>
          <line x1="15" y1="20" x2="35" y2="20" stroke="#000" stroke-width="2"/>
          <line x1="15" y1="60" x2="35" y2="60" stroke="#000" stroke-width="2"/>
          <path d="M 10 20 Q 15 20 15 40 Q 15 60 10 60" fill="none" stroke="#000" stroke-width="2"/>
          <path d="M 35 20 Q 55 20 55 40 Q 55 60 35 60" fill="none" stroke="#000" stroke-width="2"/>
          <circle cx="65" cy="40" r="3" fill="#000"/>
          <text x="30" y="75" font-size="12" text-anchor="middle">OR</text>
        </g>
      `;
      break;
    case "NOT":
      // NOT gate: triangle with bubble
      svg.innerHTML = `
        <g>
          <line x1="20" y1="40" x2="35" y2="25" stroke="#000" stroke-width="2"/>
          <line x1="20" y1="40" x2="35" y2="55" stroke="#000" stroke-width="2"/>
          <line x1="35" y1="25" x2="35" y2="55" stroke="#000" stroke-width="2"/>
          <circle cx="45" cy="40" r="5" fill="none" stroke="#000" stroke-width="2"/>
          <circle cx="55" cy="40" r="3" fill="#000"/>
          <text x="30" y="75" font-size="12" text-anchor="middle">NOT</text>
        </g>
      `;
      break;
    case "NAND":
      // AND gate + bubble
      svg.innerHTML = `
        <g>
          <line x1="10" y1="20" x2="30" y2="20" stroke="#000" stroke-width="2"/>
          <line x1="10" y1="60" x2="30" y2="60" stroke="#000" stroke-width="2"/>
          <line x1="10" y1="20" x2="10" y2="60" stroke="#000" stroke-width="2"/>
          <path d="M 30 20 Q 45 20 45 40 Q 45 60 30 60" fill="none" stroke="#000" stroke-width="2"/>
          <circle cx="52" cy="40" r="4" fill="none" stroke="#000" stroke-width="2"/>
          <circle cx="62" cy="40" r="3" fill="#000"/>
          <text x="28" y="75" font-size="11" text-anchor="middle">NAND</text>
        </g>
      `;
      break;
    case "NOR":
      // OR gate + bubble
      svg.innerHTML = `
        <g>
          <line x1="15" y1="20" x2="30" y2="20" stroke="#000" stroke-width="2"/>
          <line x1="15" y1="60" x2="30" y2="60" stroke="#000" stroke-width="2"/>
          <path d="M 10 20 Q 15 20 15 40 Q 15 60 10 60" fill="none" stroke="#000" stroke-width="2"/>
          <path d="M 30 20 Q 45 20 45 40 Q 45 60 30 60" fill="none" stroke="#000" stroke-width="2"/>
          <circle cx="52" cy="40" r="4" fill="none" stroke="#000" stroke-width="2"/>
          <circle cx="62" cy="40" r="3" fill="#000"/>
          <text x="28" y="75" font-size="12" text-anchor="middle">NOR</text>
        </g>
      `;
      break;
    case "XOR":
      // XOR gate
      svg.innerHTML = `
        <g>
          <line x1="18" y1="20" x2="35" y2="20" stroke="#000" stroke-width="2"/>
          <line x1="18" y1="60" x2="35" y2="60" stroke="#000" stroke-width="2"/>
          <path d="M 12 20 Q 18 20 18 40 Q 18 60 12 60" fill="none" stroke="#000" stroke-width="2"/>
          <path d="M 14 20 Q 20 20 20 40 Q 20 60 14 60" fill="none" stroke="#000" stroke-width="2"/>
          <path d="M 35 20 Q 55 20 55 40 Q 55 60 35 60" fill="none" stroke="#000" stroke-width="2"/>
          <circle cx="65" cy="40" r="3" fill="#000"/>
          <text x="30" y="75" font-size="12" text-anchor="middle">XOR</text>
        </g>
      `;
      break;
    case "XNOR":
      // XNOR gate
      svg.innerHTML = `
        <g>
          <line x1="18" y1="20" x2="30" y2="20" stroke="#000" stroke-width="2"/>
          <line x1="18" y1="60" x2="30" y2="60" stroke="#000" stroke-width="2"/>
          <path d="M 12 20 Q 18 20 18 40 Q 18 60 12 60" fill="none" stroke="#000" stroke-width="2"/>
          <path d="M 14 20 Q 20 20 20 40 Q 20 60 14 60" fill="none" stroke="#000" stroke-width="2"/>
          <path d="M 30 20 Q 45 20 45 40 Q 45 60 30 60" fill="none" stroke="#000" stroke-width="2"/>
          <circle cx="52" cy="40" r="4" fill="none" stroke="#000" stroke-width="2"/>
          <circle cx="62" cy="40" r="3" fill="#000"/>
          <text x="27" y="75" font-size="10" text-anchor="middle">XNOR</text>
        </g>
      `;
      break;
  }
}

// ======================== LOGIC GATE UI ========================

const gateTypeSelect = document.getElementById("gate-type");
const inputABtn = document.getElementById("input-a-btn");
const inputBBtn = document.getElementById("input-b-btn");
const inputBRow = document.getElementById("input-b-row");
const gateExpression = document.getElementById("gate-expression");
const outputValue = document.getElementById("output-value");
const truthTableHead = document.getElementById("truth-table-head");
const truthTableBody = document.getElementById("truth-table-body");

let gateInputA = 0;
let gateInputB = 0;

function updateGateUI() {
  const gate = gateTypeSelect.value;
  const single = isSingleInput(gate);

  inputBRow.style.display = single ? "none" : "flex";
  gateExpression.textContent = "Boolean Expression: " + GateExpressions[gate];

  drawGateSymbol(gate);

  const result = computeGate(gate, gateInputA, gateInputB);
  outputValue.textContent = result;

  const rows = generateTruthTable(gate);
  truthTableHead.innerHTML = "";
  truthTableBody.innerHTML = "";

  const headRow = document.createElement("tr");
  headRow.innerHTML = single
    ? "<th>A</th><th>Y</th>"
    : "<th>A</th><th>B</th><th>Y</th>";
  truthTableHead.appendChild(headRow);

  rows.forEach(row => {
    const tr = document.createElement("tr");
    if (single) {
      tr.innerHTML = `<td>${row.a}</td><td>${row.y}</td>`;
      if (row.a === gateInputA) tr.classList.add("active-row");
    } else {
      tr.innerHTML = `<td>${row.a}</td><td>${row.b}</td><td>${row.y}</td>`;
      if (row.a === gateInputA && row.b === gateInputB) tr.classList.add("active-row");
    }
    truthTableBody.appendChild(tr);
  });
}

function toggleInput(btn) {
  const current = parseInt(btn.getAttribute("data-value"), 10);
  const next = current ^ 1;
  btn.setAttribute("data-value", String(next));
  btn.textContent = String(next);
  return next;
}

inputABtn.addEventListener("click", () => {
  gateInputA = toggleInput(inputABtn);
  updateGateUI();
});

inputBBtn.addEventListener("click", () => {
  gateInputB = toggleInput(inputBBtn);
  updateGateUI();
});

gateTypeSelect.addEventListener("change", updateGateUI);
updateGateUI();

// ======================== TAB SWITCHING ========================

document.querySelectorAll(".tab-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".tab-btn").forEach(b => b.classList.remove("active"));
    document.querySelectorAll(".tab-section").forEach(s => s.classList.remove("active"));
    btn.classList.add("active");
    document.getElementById("section-" + btn.getAttribute("data-tab")).classList.add("active");
    if (btn.getAttribute("data-tab") === "circuit") {
      redrawWires();
    }
  });
});

// ======================== UNDO/REDO SYSTEM ========================

class CircuitState {
  constructor(components, wires) {
    this.components = JSON.parse(JSON.stringify(components));
    this.wires = JSON.parse(JSON.stringify(wires));
  }
}

const undoStack = [];
const redoStack = [];

function saveState() {
  undoStack.push(new CircuitState(components, wires));
  redoStack.length = 0;
  updateUndoRedoButtons();
}

function undo() {
  if (undoStack.length === 0) return;
  redoStack.push(new CircuitState(components, wires));
  const state = undoStack.pop();
  components.length = 0;
  components.push(...state.components);
  wires.length = 0;
  wires.push(...state.wires);
  refreshWorkspace();
  updateUndoRedoButtons();
}

function redo() {
  if (redoStack.length === 0) return;
  undoStack.push(new CircuitState(components, wires));
  const state = redoStack.pop();
  components.length = 0;
  components.push(...state.components);
  wires.length = 0;
  wires.push(...state.wires);
  refreshWorkspace();
  updateUndoRedoButtons();
}

function updateUndoRedoButtons() {
  const undoBtn = document.getElementById("undo-btn");
  const redoBtn = document.getElementById("redo-btn");
  undoBtn.disabled = undoStack.length === 0;
  redoBtn.disabled = redoStack.length === 0;
}

// ======================== CIRCUIT ENGINE ========================

let componentIdCounter = 0;
let wireIdCounter = 0;

const components = [];
const wires = [];

let wireMode = false;
let deleteMode = false;
let wireStart = null;
let wireColor = "black";
let dragComp = null;
let dragOffset = { x: 0, y: 0 };

const COMPONENT_DEFAULTS = {
  battery:      { voltage: 9, resistance: 0 },
  resistor:     { resistance: 1000 },
  led:          { forwardVoltage: 2.0, maxCurrent: 20 },
  diode:        { forwardVoltage: 0.7 },
  switch:       { closed: false },
  ammeter:      { resistance: 0 },
  voltmeter:    { resistance: Infinity },
  "logic-input":{ level: 0 },
};

function createComponent(type) {
  const id = ++componentIdCounter;
  const base = JSON.parse(JSON.stringify(COMPONENT_DEFAULTS[type] || {}));
  const comp = {
    id,
    type,
    name: type.charAt(0).toUpperCase() + type.slice(1) + " " + id,
    ...base,
    simVoltage: null,
    simCurrent: null,
    simState: null,
    x: 50 + Math.random() * 200,
    y: 50 + Math.random() * 200,
  };

  switch (type) {
    case "battery":
      comp.terminals = [{ label: "+", id: `${id}-0`, isPositive: true }, { label: "−", id: `${id}-1`, isPositive: false }];
      break;
    case "resistor":
      comp.terminals = [{ label: "1", id: `${id}-0`, isPositive: false }, { label: "2", id: `${id}-1`, isPositive: false }];
      break;
    case "led":
      comp.terminals = [{ label: "A", id: `${id}-0`, isPositive: true }, { label: "K", id: `${id}-1`, isPositive: false }];
      break;
    case "diode":
      comp.terminals = [{ label: "A", id: `${id}-0`, isPositive: true }, { label: "K", id: `${id}-1`, isPositive: false }];
      break;
    case "switch":
      comp.terminals = [{ label: "1", id: `${id}-0`, isPositive: false }, { label: "2", id: `${id}-1`, isPositive: false }];
      break;
    case "ammeter":
      comp.terminals = [{ label: "+", id: `${id}-0`, isPositive: true }, { label: "−", id: `${id}-1`, isPositive: false }];
      break;
    case "voltmeter":
      comp.terminals = [{ label: "+", id: `${id}-0`, isPositive: true }, { label: "−", id: `${id}-1`, isPositive: false }];
      break;
    case "logic-input":
      comp.terminals = [{ label: "OUT", id: `${id}-0`, isPositive: true }, { label: "GND", id: `${id}-1`, isPositive: false }];
      break;
    default:
      comp.terminals = [{ label: "1", id: `${id}-0`, isPositive: false }, { label: "2", id: `${id}-1`, isPositive: false }];
  }

  components.push(comp);
  return comp;
}

function removeComponent(id) {
  const idx = components.findIndex(c => c.id === id);
  if (idx === -1) return;
  components.splice(idx, 1);
  for (let i = wires.length - 1; i >= 0; i--) {
    if (wires[i].from.compId === id || wires[i].to.compId === id) {
      wires.splice(i, 1);
    }
  }
}

function addWire(fromCompId, fromTermIdx, toCompId, toTermIdx) {
  if (fromCompId === toCompId && fromTermIdx === toTermIdx) return null;
  const exists = wires.some(w =>
    (w.from.compId === fromCompId && w.from.termIdx === fromTermIdx &&
     w.to.compId === toCompId && w.to.termIdx === toTermIdx) ||
    (w.from.compId === toCompId && w.from.termIdx === toTermIdx &&
     w.to.compId === fromCompId && w.to.termIdx === fromTermIdx)
  );
  if (exists) return null;
  const wire = {
    id: ++wireIdCounter,
    from: { compId: fromCompId, termIdx: fromTermIdx },
    to: { compId: toCompId, termIdx: toTermIdx },
    color: wireColor,
  };
  wires.push(wire);
  return wire;
}

function removeWire(wireId) {
  const idx = wires.findIndex(w => w.id === wireId);
  if (idx !== -1) wires.splice(idx, 1);
}

// ======================== CIRCUIT SOLVER ========================

function buildAdjacency() {
  const adj = {};
  components.forEach(comp => {
    comp.terminals.forEach((t, idx) => {
      const key = `${comp.id}-${idx}`;
      if (!adj[key]) adj[key] = [];
    });
  });

  wires.forEach(w => {
    const keyA = `${w.from.compId}-${w.from.termIdx}`;
    const keyB = `${w.to.compId}-${w.to.termIdx}`;
    if (!adj[keyA]) adj[keyA] = [];
    if (!adj[keyB]) adj[keyB] = [];
    adj[keyA].push(keyB);
    adj[keyB].push(keyA);
  });

  return adj;
}

function getTerminalKey(compId, termIdx) {
  return `${compId}-${termIdx}`;
}

function parseTerminalKey(key) {
  const parts = key.split("-");
  return { compId: parseInt(parts[0], 10), termIdx: parseInt(parts[1], 10) };
}

function findComp(id) {
  return components.find(c => c.id === id);
}

function getConnectedTerminals(adj, termKey) {
  return adj[termKey] || [];
}

function findLoops() {
  // Search electrically valid paths by alternating wire connections and
  // the internal connection between each two-terminal component's terminals.
  const adj = buildAdjacency();
  const sources = components.filter(c => c.type === "battery" || c.type === "logic-input");
  const loops = [];

  for (const source of sources) {
    const positiveKey = getTerminalKey(source.id, 0);
    const negativeKey = getTerminalKey(source.id, 1);
    const maxDepth = Math.max(components.length * 2 + 2, 8);

    function walk(currentKey, path, visitedTerminals, visitedComponents) {
      if (path.length > maxDepth) return;
      for (const connectedKey of getConnectedTerminals(adj, currentKey)) {
        if (connectedKey === negativeKey) {
          if (path.length > 1) loops.push(path.slice());
          continue;
        }
        if (visitedTerminals.has(connectedKey)) continue;
        const { compId, termIdx } = parseTerminalKey(connectedKey);
        const comp = findComp(compId);
        if (!comp || comp.id === source.id || visitedComponents.has(comp.id)) continue;

        const entry = { compId: comp.id, entryTerm: termIdx };
        const otherKey = getTerminalKey(comp.id, termIdx === 0 ? 1 : 0);
        const nextVisitedTerminals = new Set(visitedTerminals);
        nextVisitedTerminals.add(connectedKey);
        nextVisitedTerminals.add(otherKey);
        const nextVisitedComponents = new Set(visitedComponents);
        nextVisitedComponents.add(comp.id);

        // The source is the first item; then include components in path order.
        walk(otherKey, [...path, entry], nextVisitedTerminals, nextVisitedComponents);
      }
    }

    walk(positiveKey, [{ compId: source.id, entryTerm: 0 }], new Set([positiveKey]), new Set([source.id]));
  }

  // Deduplicate the same loop found from multiple source paths.
  const unique = new Map();
  for (const loop of loops) {
    const key = loop.map(item => `${item.compId}:${item.entryTerm}`).join(",");
    if (!unique.has(key)) unique.set(key, loop);
  }
  return [...unique.values()];
}

function solveCircuit() {
  const log = [];

  components.forEach(comp => {
    comp.simVoltage = null;
    comp.simCurrent = null;
    comp.simState = null;
  });

  if (components.length === 0) {
    log.push("No components in circuit.");
    return log;
  }

  const loops = findLoops();

  if (loops.length === 0) {
    log.push("No closed circuit loops found.");
    log.push("Ensure components are connected in a loop with a voltage source.");
    components.forEach(comp => {
      comp.simVoltage = 0;
      comp.simCurrent = 0;
      if (comp.type === "led") comp.simState = "OFF";
      if (comp.type === "switch") comp.simState = comp.closed ? "CLOSED" : "OPEN";
    });
    return log;
  }

  log.push(`Found ${loops.length} circuit loop(s).`);

  loops.forEach((loop, loopIdx) => {
    log.push(`\nLoop ${loopIdx + 1}:`);
    const loopComps = loop.map(l => findComp(l.compId)).filter(Boolean);
    const compNames = loopComps.map(c => c.name).join(" → ");
    log.push(`  Path: ${compNames}`);

    const hasOpenSwitch = loopComps.some(c => c.type === "switch" && !c.closed);
    if (hasOpenSwitch) {
      log.push("  Circuit OPEN: switch is open. No current flows.");
      loopComps.forEach(comp => {
        comp.simCurrent = 0;
        comp.simVoltage = 0;
        if (comp.type === "led") comp.simState = "OFF";
        if (comp.type === "switch") comp.simState = comp.closed ? "CLOSED" : "OPEN";
      });
      return;
    }

    let totalVoltage = 0;
    loopComps.forEach(comp => {
      if (comp.type === "battery") {
        totalVoltage += comp.voltage;
      } else if (comp.type === "logic-input") {
        totalVoltage += comp.level ? 5.0 : 0.0;
      }
    });

    let totalResistance = 0;
    loopComps.forEach(comp => {
      if (comp.type === "resistor") {
        totalResistance += comp.resistance;
      } else if (comp.type === "ammeter") {
        totalResistance += 0;
      }
    });

    let totalForwardDrop = 0;
    let hasReverseBiased = false;
    loopComps.forEach((comp, i) => {
      const entry = loop[i];
      if (comp.type === "diode") {
        if (entry.entryTerm === 0) {
          totalForwardDrop += comp.forwardVoltage;
        } else {
          hasReverseBiased = true;
        }
      } else if (comp.type === "led") {
        if (entry.entryTerm === 0) {
          totalForwardDrop += comp.forwardVoltage;
        } else {
          hasReverseBiased = true;
        }
      }
    });

    if (hasReverseBiased) {
      log.push("  Diode/LED is reverse-biased. No current flows.");
      loopComps.forEach(comp => {
        comp.simCurrent = 0;
        comp.simVoltage = 0;
        if (comp.type === "led") comp.simState = "OFF (reverse-biased)";
      });
      return;
    }

    const netVoltage = totalVoltage - totalForwardDrop;

    if (netVoltage <= 0) {
      log.push(`  Insufficient voltage. Source: ${totalVoltage.toFixed(2)}V, Forward drops: ${totalForwardDrop.toFixed(2)}V`);
      loopComps.forEach(comp => {
        comp.simCurrent = 0;
        comp.simVoltage = 0;
        if (comp.type === "led") comp.simState = "OFF (insufficient voltage)";
      });
      return;
    }

    let current;
    if (totalResistance === 0) {
      if (loopComps.some(c => c.type === "resistor")) {
        current = 0;
      } else {
        current = 999;
        log.push("  WARNING: No resistance in circuit. Near short-circuit condition.");
      }
    } else {
      current = (netVoltage / totalResistance) * 1000;
    }

    log.push(`  Total voltage: ${totalVoltage.toFixed(2)} V`);
    log.push(`  Forward voltage drops: ${totalForwardDrop.toFixed(2)} V`);
    log.push(`  Net voltage: ${netVoltage.toFixed(2)} V`);
    log.push(`  Total resistance: ${totalResistance.toFixed(1)} Ω`);
    log.push(`  Current: ${current.toFixed(2)} mA`);

    loopComps.forEach(comp => {
      comp.simCurrent = current;

      switch (comp.type) {
        case "battery":
          comp.simVoltage = comp.voltage;
          comp.simState = "Supplying";
          break;
        case "logic-input":
          comp.simVoltage = comp.level ? 5.0 : 0.0;
          comp.simState = comp.level ? "HIGH (5V)" : "LOW (0V)";
          break;
        case "resistor":
          comp.simVoltage = (current / 1000) * comp.resistance;
          comp.simState = `${comp.resistance} Ω`;
          break;
        case "led": {
          comp.simVoltage = comp.forwardVoltage;
          if (current > comp.maxCurrent) {
            comp.simState = `ON (OVERCURRENT: ${current.toFixed(1)}mA > ${comp.maxCurrent}mA)`;
            log.push(`  WARNING: LED overcurrent! ${current.toFixed(1)} mA exceeds max ${comp.maxCurrent} mA`);
          } else if (current > 0.1) {
            comp.simState = "ON";
          } else {
            comp.simState = "OFF (low current)";
          }
          break;
        }
        case "diode":
          comp.simVoltage = comp.forwardVoltage;
          comp.simState = "Forward-biased";
          break;
        case "switch":
          comp.simVoltage = 0;
          comp.simState = comp.closed ? "CLOSED" : "OPEN";
          break;
        case "ammeter":
          comp.simVoltage = 0;
          comp.simState = `${current.toFixed(2)} mA`;
          break;
        case "voltmeter":
          comp.simVoltage = totalVoltage;
          comp.simCurrent = 0;
          comp.simState = `${totalVoltage.toFixed(2)} V`;
          break;
      }
    });
  });

  components.forEach(comp => {
    if (comp.simVoltage === null) comp.simVoltage = 0;
    if (comp.simCurrent === null) comp.simCurrent = 0;
    if (comp.simState === null) {
      switch (comp.type) {
        case "switch":
          comp.simState = comp.closed ? "CLOSED" : "OPEN";
          break;
        case "led":
          comp.simState = "OFF (not connected)";
          break;
        case "logic-input":
          comp.simState = comp.level ? "HIGH" : "LOW";
          break;
        default:
          comp.simState = "Not in loop";
      }
    }
  });

  return log;
}

// ======================== SVG COMPONENT RENDERING ========================

function createSVGComponent(comp) {
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("width", "80");
  svg.setAttribute("height", "80");
  svg.setAttribute("viewBox", "0 0 80 80");

  switch (comp.type) {
    case "battery":
      // Battery: long line (neg) and short line (pos)
      svg.innerHTML = `
        <g>
          <rect x="10" y="30" width="60" height="20" fill="#FFD700" stroke="#CC9900" stroke-width="2" rx="2"/>
          <line x1="20" y1="25" x2="20" y2="40" stroke="#000" stroke-width="3"/>
          <line x1="30" y1="25" x2="30" y2="35" stroke="#000" stroke-width="3"/>
          <text x="40" y="50" font-size="10" text-anchor="middle" font-weight="bold">${comp.voltage}V</text>
          <circle cx="15" cy="70" r="4" fill="#CC0000"/>
          <text x="15" y="73" font-size="8" text-anchor="middle" fill="#CC0000">+</text>
          <circle cx="65" cy="70" r="4" fill="#000"/>
          <text x="65" y="73" font-size="8" text-anchor="middle" fill="#fff">−</text>
        </g>
      `;
      break;

    case "resistor":
      // Resistor: zigzag
      svg.innerHTML = `
        <g>
          <circle cx="15" cy="40" r="3" fill="#999" stroke="#666" stroke-width="1"/>
          <circle cx="65" cy="40" r="3" fill="#999" stroke="#666" stroke-width="1"/>
          <polyline points="18,35 22,45 26,35 30,45 34,35 38,45 42,35 46,45 50,35 54,45 58,35 62,40"
            fill="none" stroke="#999" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          <text x="40" y="60" font-size="10" text-anchor="middle">${(comp.resistance/1000).toFixed(1)}kΩ</text>
          <circle cx="15" cy="70" r="3" fill="#666"/>
          <circle cx="65" cy="70" r="3" fill="#666"/>
        </g>
      `;
      break;

    case "led":
      // LED: triangle + light rays (animated when on)
      const ledClass = comp.simState && comp.simState.startsWith("ON") ? "led-on" : "";
      svg.innerHTML = `
        <g class="${ledClass}">
          <polygon points="20,50 60,50 40,20" fill="#FF4444" stroke="#CC0000" stroke-width="2"/>
          <polygon points="20,50 60,50 40,20" fill="#FF6666" opacity="0.5"/>
          ${comp.simState && comp.simState.startsWith("ON") ? `
            <line x1="40" y1="15" x2="40" y2="5" stroke="#FFD700" stroke-width="2" opacity="0.8"/>
            <line x1="50" y1="18" x2="57" y2="11" stroke="#FFD700" stroke-width="2" opacity="0.8"/>
            <line x1="30" y1="18" x2="23" y2="11" stroke="#FFD700" stroke-width="2" opacity="0.8"/>
          ` : ''}
          <circle cx="15" cy="70" r="3" fill="#CC0000"/>
          <circle cx="65" cy="70" r="3" fill="#000"/>
          <text x="40" y="65" font-size="10" text-anchor="middle" fill="#fff" font-weight="bold">LED</text>
        </g>
      `;
      break;

    case "diode":
      // Diode: triangle + line
      svg.innerHTML = `
        <g>
          <polygon points="20,50 60,50 40,20" fill="#CCCCCC" stroke="#999" stroke-width="2"/>
          <line x1="20" y1="50" x2="60" y2="50" stroke="#000" stroke-width="3"/>
          <circle cx="15" cy="70" r="3" fill="#999"/>
          <circle cx="65" cy="70" r="3" fill="#000"/>
          <text x="40" y="65" font-size="10" text-anchor="middle" font-weight="bold">D</text>
        </g>
      `;
      break;

    case "switch":
      // Switch: lever (animated based on state)
      const switchAngle = comp.closed ? 45 : -45;
      svg.innerHTML = `
        <g>
          <circle cx="40" cy="50" r="8" fill="#DDD" stroke="#999" stroke-width="2"/>
          <line x1="40" y1="50" x2="40" y2="25"
            stroke="#333" stroke-width="3"
            style="transform-origin: 40px 50px; transform: rotate(${switchAngle}deg); transition: transform 0.3s ease;"/>
          <circle cx="15" cy="70" r="3" fill="${comp.closed ? '#090' : '#666'}"/>
          <circle cx="65" cy="70" r="3" fill="${comp.closed ? '#090' : '#666'}"/>
          <text x="40" y="65" font-size="9" text-anchor="middle" font-weight="bold">${comp.closed ? 'ON' : 'OFF'}</text>
        </g>
      `;
      break;

    case "ammeter":
      // Ammeter: circular with A symbol
      svg.innerHTML = `
        <g>
          <circle cx="40" cy="40" r="20" fill="#87CEEB" stroke="#0277BD" stroke-width="2"/>
          <text x="40" y="47" font-size="16" text-anchor="middle" font-weight="bold" fill="#0277BD">A</text>
          <circle cx="15" cy="70" r="3" fill="#0277BD"/>
          <circle cx="65" cy="70" r="3" fill="#0277BD"/>
        </g>
      `;
      break;

    case "voltmeter":
      // Voltmeter: circular with V symbol
      svg.innerHTML = `
        <g>
          <circle cx="40" cy="40" r="20" fill="#DDA0DD" stroke="#9932CC" stroke-width="2"/>
          <text x="40" y="47" font-size="16" text-anchor="middle" font-weight="bold" fill="#9932CC">V</text>
          <circle cx="15" cy="70" r="3" fill="#9932CC"/>
          <circle cx="65" cy="70" r="3" fill="#9932CC"/>
        </g>
      `;
      break;

    case "logic-input":
      // Logic input: square with HIGH/LOW indicator
      svg.innerHTML = `
        <g>
          <rect x="15" y="20" width="50" height="30" fill="#90EE90" stroke="#228B22" stroke-width="2" rx="3"/>
          <text x="40" y="38" font-size="10" text-anchor="middle" font-weight="bold" fill="#228B22">
            ${comp.level ? 'HIGH' : 'LOW'}
          </text>
          <circle cx="15" cy="70" r="3" fill="${comp.level ? '#FF0' : '#000'}"/>
          <circle cx="65" cy="70" r="3" fill="#000"/>
        </g>
      `;
      break;

    default:
      svg.innerHTML = `<text x="40" y="40" text-anchor="middle">${comp.type}</text>`;
  }

  return svg;
}

// ======================== CIRCUIT WORKSPACE UI ========================

const workspaceArea = document.getElementById("workspace-area");
const componentTableBody = document.getElementById("component-table-body");
const logOutput = document.getElementById("log-output");
const addComponentBtn = document.getElementById("add-component-btn");
const componentSelect = document.getElementById("component-select");
const wireModeBtn = document.getElementById("wire-mode-btn");
const deleteModeBtn = document.getElementById("delete-mode-btn");
const resetCircuitBtn = document.getElementById("reset-circuit-btn");
const runSimBtn = document.getElementById("run-sim-btn");
const undoBtn = document.getElementById("undo-btn");
const redoBtn = document.getElementById("redo-btn");
const wireStatusEl = document.getElementById("wire-status");

// Wire color selection
document.querySelectorAll('input[name="wire-color"]').forEach(radio => {
  radio.addEventListener("change", (e) => {
    wireColor = e.target.value;
  });
});

const wireSvg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
wireSvg.id = "wire-svg";
workspaceArea.appendChild(wireSvg);

// --- Add component ---
addComponentBtn.addEventListener("click", () => {
  saveState();
  const type = componentSelect.value;
  const comp = createComponent(type);
  renderComponent(comp);
  runSimulation();
});

// --- Wire mode ---
wireModeBtn.addEventListener("click", () => {
  wireMode = !wireMode;
  if (wireMode) deleteMode = false;
  wireModeBtn.textContent = "Wire Mode: " + (wireMode ? "ON" : "OFF");
  wireModeBtn.classList.toggle("active", wireMode);
  deleteModeBtn.classList.remove("active");
  deleteModeBtn.textContent = "Delete Mode: OFF";
  wireStatusEl.textContent = wireMode ? "Click terminals to wire" : "";
  wireStart = null;
});

// --- Delete mode ---
deleteModeBtn.addEventListener("click", () => {
  deleteMode = !deleteMode;
  if (deleteMode) wireMode = false;
  deleteModeBtn.textContent = "Delete Mode: " + (deleteMode ? "ON" : "OFF");
  deleteModeBtn.classList.toggle("active", deleteMode);
  wireModeBtn.classList.remove("active");
  wireModeBtn.textContent = "Wire Mode: OFF";
  wireStatusEl.textContent = deleteMode ? "Click to delete" : "";
  wireStart = null;
});

// --- Undo/Redo ---
undoBtn.addEventListener("click", undo);
redoBtn.addEventListener("click", redo);

document.addEventListener("keydown", (e) => {
  if ((e.ctrlKey || e.metaKey) && e.key === "z" && !e.shiftKey) {
    e.preventDefault();
    undo();
  }
  if ((e.ctrlKey || e.metaKey) && (e.key === "y" || (e.shiftKey && e.key === "z"))) {
    e.preventDefault();
    redo();
  }
});

// --- Reset ---
resetCircuitBtn.addEventListener("click", () => {
  saveState();
  components.length = 0;
  wires.length = 0;
  wireStart = null;
  componentIdCounter = 0;
  wireIdCounter = 0;
  workspaceArea.querySelectorAll(".comp-node").forEach(el => el.remove());
  clearWires();
  updateComponentTable();
  logOutput.textContent = "Circuit reset.";
});

// --- Run simulation ---
runSimBtn.addEventListener("click", () => {
  runSimulation();
});

function runSimulation() {
  const log = solveCircuit();
  logOutput.textContent = log.join("\n");
  updateComponentTable();
  updateComponentVisuals();
  redrawWires();
}

function refreshWorkspace() {
  workspaceArea.querySelectorAll(".comp-node").forEach(el => el.remove());
  clearWires();
  components.forEach(comp => {
    renderComponent(comp);
  });
  runSimulation();
}

// ======================== COMPONENT RENDERING ========================

function renderComponent(comp) {
  const node = document.createElement("div");
  node.className = `comp-node`;
  node.setAttribute("data-comp-id", comp.id);
  node.style.left = comp.x + "px";
  node.style.top = comp.y + "px";
  node.style.width = "80px";
  node.style.height = "100px";

  // SVG visual
  const svgElement = createSVGComponent(comp);
  node.appendChild(svgElement);

  // Label below
  const label = document.createElement("div");
  label.className = "comp-label";
  label.textContent = comp.name;
  node.appendChild(label);

  // Terminal click handlers
  comp.terminals.forEach((term, idx) => {
    const terminalWrapper = document.createElement("div");
    terminalWrapper.style.position = "absolute";

    // Position terminals below SVG
    if (idx === 0) {
      terminalWrapper.style.left = "15px";
    } else {
      terminalWrapper.style.left = "65px";
    }
    terminalWrapper.style.top = "70px";
    terminalWrapper.style.width = "10px";
    terminalWrapper.style.height = "10px";
    terminalWrapper.style.cursor = "crosshair";
    terminalWrapper.style.zIndex = "10";
    terminalWrapper.setAttribute("data-term-idx", idx);

    terminalWrapper.addEventListener("click", (e) => {
      e.stopPropagation();
      handleTerminalClick(comp.id, idx, term);
    });

    node.appendChild(terminalWrapper);
  });

  // Controls
  const controls = document.createElement("div");
  controls.className = "comp-controls";

  if (comp.type === "switch") {
    const toggleBtn = document.createElement("button");
    toggleBtn.textContent = comp.closed ? "Open" : "Close";
    toggleBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      saveState();
      comp.closed = !comp.closed;
      toggleBtn.textContent = comp.closed ? "Open" : "Close";
      node.replaceChild(createSVGComponent(comp), node.querySelector("svg"));
      runSimulation();
    });
    controls.appendChild(toggleBtn);
  }

  if (comp.type === "logic-input") {
    const toggleBtn = document.createElement("button");
    toggleBtn.textContent = comp.level ? "LOW" : "HIGH";
    toggleBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      saveState();
      comp.level = comp.level ? 0 : 1;
      toggleBtn.textContent = comp.level ? "LOW" : "HIGH";
      node.replaceChild(createSVGComponent(comp), node.querySelector("svg"));
      runSimulation();
    });
    controls.appendChild(toggleBtn);
  }

  if (["battery", "resistor", "led", "diode"].includes(comp.type)) {
    const editBtn = document.createElement("button");
    editBtn.textContent = "Edit";
    editBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      openParamModal(comp);
    });
    controls.appendChild(editBtn);
  }

  node.appendChild(controls);

  // Drag handling
  node.addEventListener("mousedown", (e) => {
    if (e.target.tagName === "BUTTON" || e.target.tagName === "svg") return;
    if (deleteMode) {
      saveState();
      removeComponent(comp.id);
      node.remove();
      clearWires();
      runSimulation();
      return;
    }
    dragComp = { node, comp };
    node.classList.add("dragging");
    const rect = workspaceArea.getBoundingClientRect();
    dragOffset.x = e.clientX - comp.x - rect.left;
    dragOffset.y = e.clientY - comp.y - rect.top;
    e.preventDefault();
  });

  workspaceArea.appendChild(node);
}

// Dragging
document.addEventListener("mousemove", (e) => {
  if (!dragComp) return;
  const rect = workspaceArea.getBoundingClientRect();
  const x = Math.max(0, Math.min(rect.width - 90, e.clientX - rect.left - dragOffset.x));
  const y = Math.max(0, Math.min(rect.height - 110, e.clientY - rect.top - dragOffset.y));
  dragComp.comp.x = x;
  dragComp.comp.y = y;
  dragComp.node.style.left = x + "px";
  dragComp.node.style.top = y + "px";
  redrawWires();
});

document.addEventListener("mouseup", () => {
  if (dragComp) {
    dragComp.node.classList.remove("dragging");
    dragComp = null;
  }
});

// ======================== TERMINAL / WIRING ========================

function handleTerminalClick(compId, termIdx, term) {
  if (!wireMode) return;

  if (!wireStart) {
    wireStart = { compId, termIdx, term };
    const comp = findComp(compId);
    wireStatusEl.textContent = `Wiring from ${comp.name} [${term.label}] (${wireColor})...`;
  } else {
    const wire = addWire(wireStart.compId, wireStart.termIdx, compId, termIdx);
    if (wire) {
      saveState();
      wireStatusEl.textContent = `Connected. Click another terminal.`;
      runSimulation();
    } else {
      wireStatusEl.textContent = "Cannot connect here. Try again.";
    }
    wireStart = null;
  }
}

// ======================== WIRE DRAWING ========================

function clearWires() {
  while (wireSvg.firstChild) wireSvg.removeChild(wireSvg.firstChild);
}

function getTerminalPosition(compId, termIdx) {
  const node = workspaceArea.querySelector(`[data-comp-id="${compId}"]`);
  if (!node) return null;

  const x = parseInt(node.style.left) + (termIdx === 0 ? 20 : 70);
  const y = parseInt(node.style.top) + 75;

  return { x, y };
}

function redrawWires() {
  clearWires();
  wires.forEach(wire => {
    const fromPos = getTerminalPosition(wire.from.compId, wire.from.termIdx);
    const toPos = getTerminalPosition(wire.to.compId, wire.to.termIdx);
    if (!fromPos || !toPos) return;

    const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
    line.setAttribute("x1", fromPos.x);
    line.setAttribute("y1", fromPos.y);
    line.setAttribute("x2", toPos.x);
    line.setAttribute("y2", toPos.y);
    line.setAttribute("stroke-width", "3");
    line.setAttribute("data-wire-id", wire.id);

    const wireColorClass = wire.color === "red" ? "red-wire" : "black-wire";
    line.classList.add(wireColorClass);

    // Terminal labels
    const fromComp = findComp(wire.from.compId);
    const toComp = findComp(wire.to.compId);
    const fromTerm = fromComp.terminals[wire.from.termIdx];
    const toTerm = toComp.terminals[wire.to.termIdx];

    // Label on from terminal
    const label1 = document.createElementNS("http://www.w3.org/2000/svg", "text");
    label1.setAttribute("x", fromPos.x - 10);
    label1.setAttribute("y", fromPos.y - 5);
    label1.setAttribute("font-size", "10");
    label1.setAttribute("font-weight", "bold");
    label1.setAttribute("fill", wire.color === "red" ? "#cc0000" : "#000");
    label1.textContent = fromTerm.label;
    wireSvg.appendChild(label1);

    // Label on to terminal
    const label2 = document.createElementNS("http://www.w3.org/2000/svg", "text");
    label2.setAttribute("x", toPos.x + 5);
    label2.setAttribute("y", toPos.y - 5);
    label2.setAttribute("font-size", "10");
    label2.setAttribute("font-weight", "bold");
    label2.setAttribute("fill", wire.color === "red" ? "#cc0000" : "#000");
    label2.textContent = toTerm.label;
    wireSvg.appendChild(label2);

    if (deleteMode) {
      line.style.cursor = "pointer";
      line.addEventListener("click", () => {
        saveState();
        removeWire(wire.id);
        runSimulation();
      });
    }

    wireSvg.appendChild(line);
  });
}

// ======================== COMPONENT TABLE ========================

function updateComponentTable() {
  componentTableBody.innerHTML = "";
  components.forEach(comp => {
    const tr = document.createElement("tr");

    const tdName = document.createElement("td");
    tdName.textContent = comp.name;
    tr.appendChild(tdName);

    const tdType = document.createElement("td");
    tdType.textContent = comp.type;
    tr.appendChild(tdType);

    const tdState = document.createElement("td");
    tdState.textContent = comp.simState || "—";
    tr.appendChild(tdState);

    const tdVoltage = document.createElement("td");
    tdVoltage.textContent = comp.simVoltage !== null ? comp.simVoltage.toFixed(2) : "—";
    tr.appendChild(tdVoltage);

    const tdCurrent = document.createElement("td");
    tdCurrent.textContent = comp.simCurrent !== null ? comp.simCurrent.toFixed(2) : "—";
    tr.appendChild(tdCurrent);

    const tdConn = document.createElement("td");
    const connCount = wires.filter(w =>
      w.from.compId === comp.id || w.to.compId === comp.id
    ).length;
    tdConn.textContent = connCount > 0 ? `${connCount} wire(s)` : "None";
    tr.appendChild(tdConn);

    componentTableBody.appendChild(tr);
  });
}

function updateComponentVisuals() {
  components.forEach(comp => {
    const node = workspaceArea.querySelector(`[data-comp-id="${comp.id}"]`);
    if (!node) return;
    node.replaceChild(createSVGComponent(comp), node.querySelector("svg"));
  });
}

// ======================== PARAMETER EDITING MODAL ========================

const paramModal = document.getElementById("param-modal");
const modalTitle = document.getElementById("modal-title");
const modalFields = document.getElementById("modal-fields");
const modalSave = document.getElementById("modal-save");
const modalCancel = document.getElementById("modal-cancel");
let editingComp = null;

function openParamModal(comp) {
  editingComp = comp;
  modalTitle.textContent = "Edit: " + comp.name;
  modalFields.innerHTML = "";

  const fields = [];
  switch (comp.type) {
    case "battery":
      fields.push({ key: "voltage", label: "Voltage (V)", type: "number", min: 0, step: 0.1 });
      break;
    case "resistor":
      fields.push({ key: "resistance", label: "Resistance (Ω)", type: "number", min: 1, step: 1 });
      break;
    case "led":
      fields.push({ key: "forwardVoltage", label: "Forward Voltage (V)", type: "number", min: 0.1, step: 0.1 });
      fields.push({ key: "maxCurrent", label: "Max Current (mA)", type: "number", min: 1, step: 1 });
      break;
    case "diode":
      fields.push({ key: "forwardVoltage", label: "Forward Voltage (V)", type: "number", min: 0.1, step: 0.1 });
      break;
  }

  fields.forEach(f => {
    const lbl = document.createElement("label");
    lbl.textContent = f.label;
    const input = document.createElement("input");
    input.type = f.type;
    input.min = f.min;
    input.step = f.step;
    input.value = comp[f.key];
    input.setAttribute("data-key", f.key);
    lbl.appendChild(input);
    modalFields.appendChild(lbl);
  });

  paramModal.classList.remove("hidden");
}

modalSave.addEventListener("click", () => {
  if (!editingComp) return;
  const inputs = modalFields.querySelectorAll("input");
  let valid = true;

  inputs.forEach(input => {
    const key = input.getAttribute("data-key");
    const val = parseFloat(input.value);
    if (isNaN(val) || val < parseFloat(input.min)) {
      valid = false;
      input.style.outline = "2px solid red";
    } else {
      input.style.outline = "";
      editingComp[key] = val;
    }
  });

  if (!valid) return;

  saveState();
  paramModal.classList.add("hidden");

  const node = workspaceArea.querySelector(`[data-comp-id="${editingComp.id}"]`);
  if (node) {
    node.replaceChild(createSVGComponent(editingComp), node.querySelector("svg"));
  }

  editingComp = null;
  runSimulation();
});

modalCancel.addEventListener("click", () => {
  paramModal.classList.add("hidden");
  editingComp = null;
});

paramModal.addEventListener("click", (e) => {
  if (e.target === paramModal) {
    paramModal.classList.add("hidden");
    editingComp = null;
  }
});

updateUndoRedoButtons();
