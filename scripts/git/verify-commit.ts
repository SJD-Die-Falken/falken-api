const { readFileSync } = require('fs');

// get $1 from commit-msg script
const msgPath = process.argv[2];
const msg = readFileSync(msgPath, 'utf-8').trim();

const releaseRE = /^release: v\d/;
const commitRE = /^(revert: )?(feat|fix|docs|dx|refactor|perf|test|build|ci|chore)(\(.+\))?\!?: /;

const isMergeCommit = msg.startsWith('Merge remote-tracking-branch');

if (!isMergeCommit && !releaseRE.test(msg) && !commitRE.test(msg)) {
  const message = [
    'ERROR: Invalid commit message format!',
    'A proper commit message format is required for automated changelog generation.',
    'See https://www.conventionalcommits.org/en/v1.0.0/ for more information.',
    '',
    'Examples:',
    'feat: add `searching` option',
    'fix: object deconstruction',
  ].reduce((a, b) => a + b + '\n', '');
  console.log(message);

  process.exit(1);
}