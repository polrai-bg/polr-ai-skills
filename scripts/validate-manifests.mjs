#!/usr/bin/env node
// Validate the marketplace manifest, every plugin manifest, and every skill.
// Dependency-free. Run locally with:  node scripts/validate-manifests.mjs
// Exits non-zero (and prints what failed) if anything is wrong.

import { readFileSync, existsSync, readdirSync, statSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const errors = [];
const warnings = [];
const fail = (m) => errors.push(m);
const warn = (m) => warnings.push(m);

function readJSON(path) {
  try {
    return JSON.parse(readFileSync(path, "utf8"));
  } catch (e) {
    fail(`Invalid JSON: ${path}: ${e.message}`);
    return null;
  }
}

// Parse a SKILL.md into { name, description, bodyLines } (any field may be null).
// Mirrors the official frontmatter rules so the validator catches violations
// before a skill ships. See:
//   https://platform.claude.com/docs/en/agents-and-tools/agent-skills/best-practices
function parseSkill(skillMd) {
  const text = readFileSync(skillMd, "utf8");
  const m = text.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!m) return { name: null, description: null, bodyLines: 0 };
  const front = m[1];
  const field = (key) => {
    const fm = front.match(new RegExp(`^${key}:[ \\t]*(.+)$`, "m"));
    return fm ? fm[1].trim().replace(/^["']|["']$/g, "") : null;
  };
  const body = text.slice(m[0].length);
  const bodyLines = body.replace(/^\r?\n/, "").split(/\r?\n/).length;
  return { name: field("name"), description: field("description"), bodyLines };
}

// Official frontmatter limits (best-practices doc).
const NAME_MAX = 64;
const DESC_MAX = 1024;
const BODY_MAX_LINES = 500;
const RESERVED_WORDS = ["anthropic", "claude"];

// Validate a skill's frontmatter against the official rules. `expectedName` is
// the directory name the skill lives in (skills/<dir>/SKILL.md), or null for a
// plugin-root SKILL.md where the name maps differently.
function checkSkill(skillMd, label, expectedName) {
  const { name, description, bodyLines } = parseSkill(skillMd);

  if (!description) {
    fail(`${label}: ${skillMd} has no frontmatter "description"`);
  } else {
    if (description.length < 20) warn(`${label}: ${skillMd} description looks thin (<20 chars)`);
    if (description.length > DESC_MAX)
      fail(`${label}: ${skillMd} description is ${description.length} chars (max ${DESC_MAX})`);
  }

  if (name !== null) {
    if (name.length > NAME_MAX)
      fail(`${label}: ${skillMd} name "${name}" is ${name.length} chars (max ${NAME_MAX})`);
    if (!/^[a-z0-9-]+$/.test(name))
      fail(`${label}: ${skillMd} name "${name}" must be lowercase letters, numbers, and hyphens only`);
    for (const word of RESERVED_WORDS)
      if (name.toLowerCase().includes(word))
        fail(`${label}: ${skillMd} name "${name}" contains reserved word "${word}"`);
    if (expectedName && name !== expectedName)
      fail(`${label}: ${skillMd} name "${name}" does not match its directory "${expectedName}"`);
  }

  if (bodyLines > BODY_MAX_LINES)
    warn(`${label}: ${skillMd} body is ${bodyLines} lines (keep under ${BODY_MAX_LINES})`);
}

// Find every SKILL.md inside a plugin (skills/*/SKILL.md or a root SKILL.md).
// Each entry carries the directory name the skill's `name` is expected to match
// (null for a plugin-root SKILL.md, where the name maps to the plugin instead).
function findSkills(pluginDir) {
  const found = [];
  if (existsSync(join(pluginDir, "SKILL.md")))
    found.push({ path: join(pluginDir, "SKILL.md"), expectedName: null });
  const skillsDir = join(pluginDir, "skills");
  if (existsSync(skillsDir)) {
    for (const entry of readdirSync(skillsDir)) {
      const sk = join(skillsDir, entry, "SKILL.md");
      if (existsSync(sk)) found.push({ path: sk, expectedName: entry });
    }
  }
  return found;
}

function checkPlugin(pluginDir, label) {
  if (!existsSync(pluginDir) || !statSync(pluginDir).isDirectory()) {
    fail(`${label}: plugin directory does not exist: ${pluginDir}`);
    return;
  }
  const manifest = join(pluginDir, ".claude-plugin", "plugin.json");
  if (existsSync(manifest)) {
    const pj = readJSON(manifest);
    if (pj && (!pj.name || typeof pj.name !== "string")) {
      fail(`${label}: plugin.json missing a string "name"`);
    }
  } else {
    warn(`${label}: no .claude-plugin/plugin.json (allowed, but recommended)`);
  }
  const skills = findSkills(pluginDir);
  if (skills.length === 0) {
    fail(`${label}: no SKILL.md found`);
  }
  for (const sk of skills) {
    checkSkill(sk.path, label, sk.expectedName);
  }
}

// 1. Marketplace manifest
const mpPath = join(root, ".claude-plugin", "marketplace.json");
if (!existsSync(mpPath)) fail("Missing .claude-plugin/marketplace.json");
const mp = existsSync(mpPath) ? readJSON(mpPath) : null;

const registered = new Set();
if (mp) {
  if (!mp.name) fail("marketplace.json missing 'name'");
  if (!mp.owner || !mp.owner.name) fail("marketplace.json missing 'owner.name'");
  if (!Array.isArray(mp.plugins)) fail("marketplace.json 'plugins' must be an array");
  const pluginRoot = (mp.metadata && mp.metadata.pluginRoot) || ".";
  for (const entry of mp.plugins || []) {
    if (!entry.name) { fail("a plugin entry is missing 'name'"); continue; }
    if (typeof entry.source !== "string") {
      warn(`plugin '${entry.name}': non-string source (object sources are not checked here)`);
      continue;
    }
    registered.add(entry.name);
    const pluginDir = join(root, pluginRoot, entry.source);
    checkPlugin(pluginDir, `marketplace plugin '${entry.name}'`);
  }
}

// 2. Every folder under plugins/ should be registered (catch forgotten entries)
const pluginsDir = join(root, "plugins");
if (existsSync(pluginsDir)) {
  for (const entry of readdirSync(pluginsDir)) {
    const dir = join(pluginsDir, entry);
    if (!statSync(dir).isDirectory()) continue;
    if (!registered.has(entry)) {
      warn(`plugins/${entry} exists but is not registered in marketplace.json`);
    }
  }
}

// 3. template/ should NOT be registered, but its manifest should be valid JSON
const templateManifest = join(root, "template", ".claude-plugin", "plugin.json");
if (existsSync(templateManifest)) readJSON(templateManifest);

// Report
for (const w of warnings) console.log(`warning: ${w}`);
if (errors.length) {
  for (const e of errors) console.error(`error: ${e}`);
  console.error(`\nFAILED with ${errors.length} error(s).`);
  process.exit(1);
}
console.log(`OK: ${registered.size} plugin(s) validated, ${warnings.length} warning(s).`);
