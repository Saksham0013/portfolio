/**
 * Split element's text into per-line spans wrapped in .clip-wrapper divs.
 * Returns the original innerHTML for cleanup.
 *
 * @param {HTMLElement} el
 * @returns {{ lines: NodeList, restore: Function }}
 */
export function splitLines(el) {
  if (!el) return { lines: [], restore: () => {} };

  const originalHTML = el.innerHTML;
  const text = el.textContent.trim();
  const words = text.split(/\s+/);

  // Render invisible version to measure lines
  el.innerHTML = words
    .map(w => `<span class="word" style="display:inline-block;white-space:pre">${w} </span>`)
    .join('');

  const wordEls = el.querySelectorAll('.word');
  const lines = [];
  let currentLine = [];
  let lastTop = null;

  wordEls.forEach(w => {
    const top = w.getBoundingClientRect().top;
    if (lastTop === null) lastTop = top;

    if (Math.abs(top - lastTop) > 4) {
      lines.push(currentLine);
      currentLine = [w];
      lastTop = top;
    } else {
      currentLine.push(w);
    }
  });

  if (currentLine.length) lines.push(currentLine);

  // Rebuild with clip-wrappers per line
  el.innerHTML = lines
    .map(
      lineWords =>
        `<span class="clip-wrapper" style="display:block;overflow:hidden">` +
        `<span class="text-line" style="display:block">` +
        lineWords.map(w => w.textContent).join('') +
        `</span>` +
        `</span>`
    )
    .join('');

  const lineEls = el.querySelectorAll('.text-line');

  return {
    lines: lineEls,
    restore: () => {
      el.innerHTML = originalHTML;
    },
  };
}

/**
 * Split a single string into per-character spans.
 */
export function splitChars(el) {
  if (!el) return { chars: [], restore: () => {} };

  const originalHTML = el.innerHTML;
  const text = el.textContent;

  el.innerHTML = text
    .split('')
    .map(
      ch =>
        `<span class="char" style="display:inline-block">${
          ch === ' ' ? '&nbsp;' : ch
        }</span>`
    )
    .join('');

  return {
    chars: el.querySelectorAll('.char'),
    restore: () => {
      el.innerHTML = originalHTML;
    },
  };
}
