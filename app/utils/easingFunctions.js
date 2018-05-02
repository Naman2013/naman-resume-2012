/**
 @example
 const a = document.getElementById('a')
 animateValues({ a: 0 }, 800, {
    a: 500,
    onUpdate: v => a.style.transform = 'scaleX('+ v.a +')',
    onComplete: v => alert('Done!'),
    ease: t => t<.5 ? 2*t*t : -1+(4-2*t)*t, // From: https://gist.github.com/gre/1650294
  })
 */
export function animateValues(values, duration, options) {
  // Linear interpolation
  const lerp = (source, target, amount) => source + amount * (target - source);

  // Validation methods
  const checkNum = n => (typeof n === 'number' ? n : null);
  const checkFunc = f => (typeof f === 'function' ? f : _ => _);

  // Ensure methods.
  const onComplete = checkFunc(options.onComplete);
  const onUpdate = checkFunc(options.onUpdate);
  const ease = checkFunc(options.ease);

  // Animation start time
  const start = Date.now();

  // Create a map <key: [from, to]>
  const animationMap = Object.keys(values).reduce((map, key) => {
    const _from = checkNum(values[key]);
    const _to = checkNum(options[key]);
    if (_from !== null && _to !== null) map[key] = [_from, _to];
    return map;
  }, {});

  // List of animating values
  const keys = Object.keys(animationMap);

  // Create & run animation function
  const animation = () => {
    const now = Date.now();
    const t = duration > 0 ? (now - start) / duration : 1;

    // Update all values using 't'
    keys.forEach((key) => {
      // If both 'from' and 'to' are numbers: animate!
      const [_from, _to] = animationMap[key];
      const progress = ease(t, _from, _to, duration);
      // Update value
      values[key] = lerp(_from, _to, progress);
    });

    // If complete..
    if (t >= 1) {
      // Final update for all keys
      keys.forEach(key => (values[key] = options[key]));
      onUpdate(values);
      onComplete(values);
    } else {
      // Run update callback and loop until finished
      onUpdate(values);
      requestAnimationFrame(animation);
    }
  };
  animation();
}

// https://gist.github.com/gre/1650294
/*
 * Easing Functions - inspired from http://gizma.com/easing/
 * only considering the t value for the range [0, 1] => [0, 1]
 */
export default {
  // no easing, no acceleration
  linear(t) { return t; },
  // accelerating from zero velocity
  easeInQuad(t) { return t * t; },
  // decelerating to zero velocity
  easeOutQuad(t) { return t * (2 - t); },
  // acceleration until halfway, then deceleration
  easeInOutQuad(t) { return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t; },
  // accelerating from zero velocity
  easeInCubic(t) { return t * t * t; },
  // decelerating to zero velocity
  easeOutCubic(t) { return (--t) * t * t + 1; },
  // acceleration until halfway, then deceleration
  easeInOutCubic(t) { return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1; },
  // accelerating from zero velocity
  easeInQuart(t) { return t * t * t * t; },
  // decelerating to zero velocity
  easeOutQuart(t) { return 1 - (--t) * t * t * t; },
  // acceleration until halfway, then deceleration
  easeInOutQuart(t) { return t < 0.5 ? 8 * t * t * t * t : 1 - 8 * (--t) * t * t * t; },
  // accelerating from zero velocity
  easeInQuint(t) { return t * t * t * t * t; },
  // decelerating to zero velocity
  easeOutQuint(t) { return 1 + (--t) * t * t * t * t; },
  // acceleration until halfway, then deceleration
  easeInOutQuint(t) { return t < 0.5 ? 16 * t * t * t * t * t : 1 + 16 * (--t) * t * t * t * t; },
  // elastic bounce effect at the beginning
  easeInElastic(t) { return (0.04 - 0.04 / t) * Math.sin(25 * t) + 1; },
  // elastic bounce effect at the end
  easeOutElastic(t) { return 0.04 * t / (--t) * Math.sin(25 * t); },
  // elastic bounce effect at the beginning and end
  easeInOutElastic(t) { return (t -= 0.5) < 0 ? (0.01 + 0.01 / t) * Math.sin(50 * t) : (0.02 - 0.01 / t) * Math.sin(50 * t) + 1; },
};
