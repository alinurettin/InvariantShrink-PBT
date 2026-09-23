// InvariantShrink-PBT: Property-Based Testing & Shrinking Engine
class PBTEngine {
  /**
   * Deterministic XorShift32 pseudorandom generator
   */
  constructor(seed = 123456789) {
    this.state = seed || 1;
  }

  nextUint32() {
    let x = this.state;
    x ^= x << 13;
    x ^= x >>> 17;
    x ^= x << 5;
    this.state = x >>> 0;
    return this.state;
  }

  nextFloat() {
    return this.nextUint32() / 4294967296.0;
  }

  nextInt(min, max) {
    return min + Math.floor(this.nextFloat() * (max - min + 1));
  }

  genInteger(min = -1000, max = 1000) {
    return () => this.nextInt(min, max);
  }

  genArray(itemGen, minLen = 0, maxLen = 20) {
    return () => {
      const len = this.nextInt(minLen, maxLen);
      const arr = [];
      for (let i = 0; i < len; i++) arr.push(itemGen());
      return arr;
    };
  }

  /**
   * Execute property across N trials
   */
  check(generator, propertyFn, trials = 100) {
    for (let trial = 1; trial <= trials; trial++) {
      const sample = generator();
      let passed = false;
      try {
        passed = Boolean(propertyFn(sample));
      } catch (err) {
        passed = false;
      }

      if (!passed) {
        const shrinkResult = this.shrink(sample, propertyFn);
        return {
          status: 'COUNTEREXAMPLE_FOUND',
          failingTrial: trial,
          totalTrialsChecked: trial,
          initialFailingSample: sample,
          minimalCounterexample: shrinkResult.minimal,
          shrinkSteps: shrinkResult.steps
        };
      }
    }

    return {
      status: 'PASSED_ALL_TRIALS',
      trialsChecked: trials,
      minimalCounterexample: null,
      shrinkSteps: 0
    };
  }

  /**
   * Binary search counterexample shrinking
   */
  shrink(failingSample, propertyFn) {
    let current = failingSample;
    let steps = 0;

    // Numeric shrinking towards 0
    if (typeof current === 'number') {
      let candidate = current;
      while (Math.abs(candidate) > 0) {
        const half = Math.trunc(candidate / 2);
        if (half === candidate) break;
        if (!propertyFn(half)) {
          candidate = half;
          steps++;
        } else {
          // If half passes, try reducing by 1 towards half
          const oneLess = candidate > 0 ? candidate - 1 : candidate + 1;
          if (oneLess !== candidate && !propertyFn(oneLess)) {
            candidate = oneLess;
            steps++;
          } else {
            break;
          }
        }
      }
      return { minimal: candidate, steps };
    }

    // Array shrinking (halving length, then elements)
    if (Array.isArray(current)) {
      let arr = [...current];
      while (arr.length > 0) {
        const halfLen = Math.floor(arr.length / 2);
        const sliced = arr.slice(0, halfLen);
        if (!propertyFn(sliced)) {
          arr = sliced;
          steps++;
        } else {
          // Try dropping one element
          const dropOne = arr.slice(1);
          if (dropOne.length > 0 && !propertyFn(dropOne)) {
            arr = dropOne;
            steps++;
          } else {
            break;
          }
        }
      }
      return { minimal: arr, steps };
    }

    return { minimal: current, steps };
  }
}

module.exports = PBTEngine;