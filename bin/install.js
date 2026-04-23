#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const PKG_ROOT = path.resolve(__dirname, '..');
const CWD = process.cwd();

const args = process.argv.slice(2);
const cmd = args[0] || 'init';

const flags = {
  force: args.includes('--force') || args.includes('-f'),
  dryRun: args.includes('--dry-run'),
  help: args.includes('--help') || args.includes('-h'),
};

function log(msg) {
  process.stdout.write(msg + '\n');
}

function err(msg) {
  process.stderr.write(msg + '\n');
}

function printHelp() {
  log(`slice-ninja — install the slice-ninja Claude skill into this project

Usage:
  npx slice-ninja [command] [options]

Commands:
  init        Install skill + slash commands into ./.claude/ (default)
  uninstall   Remove slice-ninja files from ./.claude/

Options:
  --force, -f   Overwrite existing files without prompting
  --dry-run     Print what would change, don't write anything
  --help, -h    Show this help

Installs into:
  .claude/skills/slice-ninja/
  .claude/commands/slice-*.md

After install, commit .claude/ so your team gets the skill automatically.
`);
}

function copyDir(src, dest, { force, dryRun, skipped, written }) {
  if (!fs.existsSync(src)) {
    err(`source missing: ${src}`);
    process.exit(1);
  }
  if (!dryRun) fs.mkdirSync(dest, { recursive: true });

  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    if (entry.name.endsWith(':Zone.Identifier')) continue;
    const s = path.join(src, entry.name);
    const d = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      copyDir(s, d, { force, dryRun, skipped, written });
    } else {
      const rel = path.relative(CWD, d);
      if (fs.existsSync(d) && !force) {
        skipped.push(rel);
        continue;
      }
      if (!dryRun) fs.copyFileSync(s, d);
      written.push(rel);
    }
  }
}

function removeIfExists(target, { dryRun, removed }) {
  if (!fs.existsSync(target)) return;
  const rel = path.relative(CWD, target);
  removed.push(rel);
  if (!dryRun) fs.rmSync(target, { recursive: true, force: true });
}

function init() {
  const srcSkill = path.join(PKG_ROOT, 'skills', 'slice-ninja');
  const srcCommands = path.join(PKG_ROOT, 'commands');
  const destSkill = path.join(CWD, '.claude', 'skills', 'slice-ninja');
  const destCommands = path.join(CWD, '.claude', 'commands');

  const written = [];
  const skipped = [];

  copyDir(srcSkill, destSkill, { force: flags.force, dryRun: flags.dryRun, written, skipped });
  copyDir(srcCommands, destCommands, { force: flags.force, dryRun: flags.dryRun, written, skipped });

  const prefix = flags.dryRun ? '[dry-run] ' : '';
  log(`${prefix}slice-ninja installed into .claude/`);
  if (written.length) log(`  ${written.length} file${written.length === 1 ? '' : 's'} written`);
  if (skipped.length) {
    log(`  ${skipped.length} existing file${skipped.length === 1 ? '' : 's'} skipped (use --force to overwrite):`);
    for (const f of skipped) log(`    - ${f}`);
  }
  if (!flags.dryRun) {
    log('');
    log('Next steps:');
    log('  1. Commit .claude/ so your team gets the skill');
    log('  2. In Claude Code, try: /slice-discover');
  }
}

function uninstall() {
  const removed = [];
  const skillDir = path.join(CWD, '.claude', 'skills', 'slice-ninja');
  removeIfExists(skillDir, { dryRun: flags.dryRun, removed });

  const commandsDir = path.join(CWD, '.claude', 'commands');
  if (fs.existsSync(commandsDir)) {
    for (const file of fs.readdirSync(commandsDir)) {
      if (file.startsWith('slice-') && file.endsWith('.md')) {
        removeIfExists(path.join(commandsDir, file), { dryRun: flags.dryRun, removed });
      }
    }
  }

  const prefix = flags.dryRun ? '[dry-run] ' : '';
  if (removed.length === 0) {
    log(`${prefix}nothing to remove — slice-ninja not found in .claude/`);
  } else {
    log(`${prefix}removed ${removed.length} path${removed.length === 1 ? '' : 's'}:`);
    for (const r of removed) log(`  - ${r}`);
  }
}

if (flags.help || cmd === 'help') {
  printHelp();
  process.exit(0);
}

switch (cmd) {
  case 'init':
  case 'install':
    init();
    break;
  case 'uninstall':
  case 'remove':
    uninstall();
    break;
  default:
    err(`unknown command: ${cmd}`);
    err(`run "npx slice-ninja --help" for usage`);
    process.exit(1);
}
