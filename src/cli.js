#!/usr/bin/env node
const PBTEngine = require('./pbt_engine');

console.log('InvariantShrink-PBT: Property-Based Testing CLI');
const pbt = new PBTEngine(42);
const intGen = pbt.genInteger(0, 1000);
const res = pbt.check(intGen, (x) => x < 50);
console.log(JSON.stringify(res, null, 2));
