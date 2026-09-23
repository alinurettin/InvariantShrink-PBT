const assert = require('assert');
const PBTEngine = require('../src/pbt_engine');

console.log('Running test suite for InvariantShrink-PBT...');

const pbt = new PBTEngine(987654321);

// Test 1: Invariant that always holds: array reverse idempotency
const arrGen = pbt.genArray(pbt.genInteger(-50, 50), 0, 15);
const resSuccess = pbt.check(arrGen, (arr) => {
  const rev = arr.slice().reverse().reverse();
  return JSON.stringify(arr) === JSON.stringify(rev);
}, 100);

console.log('Invariant Reverse Result:', resSuccess);
assert.strictEqual(resSuccess.status, 'PASSED_ALL_TRIALS');
assert.strictEqual(resSuccess.trialsChecked, 100);

// Test 2: Injected failure with minimal shrink bound: x must be < 42
const intGen = pbt.genInteger(0, 500);
const resFailed = pbt.check(intGen, (x) => x < 42, 100);

console.log('Shrink Result:', {
  initial: resFailed.initialFailingSample,
  minimal: resFailed.minimalCounterexample,
  steps: resFailed.shrinkSteps
});

assert.strictEqual(resFailed.status, 'COUNTEREXAMPLE_FOUND');
assert.strictEqual(resFailed.minimalCounterexample, 42, 'Binary search shrinker must find exact minimal boundary: 42');
assert(resFailed.shrinkSteps > 0);

console.log('✅ ALL TESTS PASSED (100% Assertion Rate)');
