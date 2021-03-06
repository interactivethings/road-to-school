export const windowWidth = () => window.innerWidth || (document.documentElement || document.body).clientWidth;
export const windowHeight = () => window.innerHeight || (document.documentElement || document.body).clientHeight;
export const docHeight = () => Math.max(
  document.body.scrollHeight, document.documentElement.scrollHeight,
  document.body.offsetHeight, document.documentElement.offsetHeight,
  document.body.clientHeight, document.documentElement.clientHeight
);

export const scrollY = () => window.pageYOffset;

// Feature detect passive event listeners
// See https://github.com/WICG/EventListenerOptions/blob/gh-pages/explainer.md why this is a good idea

let supportsPassiveOption = false;
if (typeof window !== 'undefined') {
  try {
    const opts = Object.defineProperty({}, 'passive', {
      get: function passive() {
        supportsPassiveOption = true;
      }
    });
    window.addEventListener('test', null, opts);
  } catch (e) {} // eslint-disable-line no-empty
}

// Get the passive event option based on its availability; otherwise just mark the event as not cancelable (which improves performance but not as reliably as {passive: true})
// NEVER CALL preventDefault() IN A PASSIVE EVENT HANDLER
export const passiveEvent = () => {
  return supportsPassiveOption
    ? {passive: true}
    : false;
};
