/**
 * Production Validation Orchestrator
 * 
 * This script executes the complete production validation pipeline in the exact sequence
 * expected from a modern CI/CD workflow. It is designed to be a local pre-deployment
 * gatekeeper that mirrors GitHub Actions behavior.
 */

const { spawnSync } = require('child_process');
const path = require('path');

// --- Configuration ---

const STAGES = [
  {
    name: 'Security Audit',
    command: 'pnpm',
    args: ['audit', '--audit-level=high'],
    description: 'Checking for high-severity vulnerabilities in dependencies...'
  },
  {
    name: 'Type Checking',
    command: 'pnpm',
    args: ['run', 'type-check'],
    description: 'Validating TypeScript integrity...'
  },
  {
    name: 'Linting',
    command: 'pnpm',
    args: ['run', 'lint'],
    description: 'Ensuring code style consistency...'
  },
  {
    name: 'Formatting',
    command: 'pnpm',
    args: ['run', 'format:check'],
    description: 'Verifying code formatting...'
  },
  {
    name: 'Testing',
    command: 'pnpm',
    args: ['run', 'test:ci'],
    description: 'Running unit and integration tests...'
  },
  {
    name: 'Production Build',
    command: 'pnpm',
    args: ['run', 'build'],
    description: 'Validating production build artifacts...'
  }
];

// --- Styles & Helpers ---

const COLORS = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  dim: '\x1b[2m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  cyan: '\x1b[36m',
  bgRed: '\x1b[41m',
  bgGreen: '\x1b[42m',
};

const formatTime = (ms) => `${(ms / 1000).toFixed(2)}s`;

function printHeader(text) {
  console.log(`\n${COLORS.bright}${COLORS.cyan}=== ${text} ===${COLORS.reset}\n`);
}

function printStageHeader(index, total, name, description) {
  console.log(`${COLORS.bright}[${index}/${total}] ${name}${COLORS.reset}`);
  console.log(`${COLORS.dim}${description}${COLORS.reset}`);
}

// --- Execution ---

async function runPipeline() {
  const startTime = Date.now();
  let failed = false;
  let failedStage = null;

  printHeader('PRODUCTION VALIDATION PIPELINE');

  for (let i = 0; i < STAGES.length; i++) {
    const stage = STAGES[i];
    const stageStartTime = Date.now();
    
    printStageHeader(i + 1, STAGES.length, stage.name, stage.description);

    const result = spawnSync(stage.command, stage.args, {
      stdio: 'inherit',
      shell: true,
      cwd: path.resolve(__dirname, '..')
    });

    const duration = Date.now() - stageStartTime;

    if (result.status !== 0) {
      console.log(`\n${COLORS.bgRed}${COLORS.bright} FAILED ${COLORS.reset} ${COLORS.red}Stage "${stage.name}" failed with exit code ${result.status}${COLORS.reset}`);
      failed = true;
      failedStage = stage.name;
      break;
    }

    console.log(`${COLORS.green}✔ ${stage.name} passed (${formatTime(duration)})${COLORS.reset}\n`);
  }

  const totalDuration = Date.now() - startTime;

  if (failed) {
    console.log(`\n${COLORS.bright}${COLORS.red}Pipeline failed at stage: ${failedStage}${COLORS.reset}`);
    console.log(`${COLORS.dim}Total time elapsed: ${formatTime(totalDuration)}${COLORS.reset}\n`);
    process.exit(1);
  } else {
    printHeader('PIPELINE SUCCESSFUL');
    console.log(`${COLORS.bright}${COLORS.green}All production gates passed successfully!${COLORS.reset}`);
    console.log(`${COLORS.dim}Total time: ${formatTime(totalDuration)}${COLORS.reset}\n`);
    process.exit(0);
  }
}

runPipeline().catch(err => {
  console.error('\nUnexpected error during pipeline execution:', err);
  process.exit(1);
});
