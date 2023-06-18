require('ts-node/register');

// eslint-disable-next-line @typescript-eslint/no-var-requires
const migrationScript = require('./migrate');

migrationScript.migrator().then((value) => value.runAsCLI());
