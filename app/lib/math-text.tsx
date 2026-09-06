import katex from 'katex';
import { Fragment } from 'react';

const MATH_SEGMENT = /\$\$([^$]+)\$\$|\$([^$]+)\$/g;

function renderLatex(latex: string, displayMode: boolean) {
  try {
    return katex.renderToString(latex, { throwOnError: false, displayMode, strict: 'ignore' });
  } catch {
    return latex;
  }
}

/**
 * Renders prose that may contain inline ($...$) or display ($$...$$) LaTeX
 * segments. Plain sentences with no $ delimiters pass through unchanged, so
 * this is safe to use on both legacy plain-English `formal` strings and
 * newly authored ones that embed real math.
 */
export function MathText({ text, className }: { text: string; className?: string }) {
  const parts: React.ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  let key = 0;
  MATH_SEGMENT.lastIndex = 0;
  while ((match = MATH_SEGMENT.exec(text))) {
    if (match.index > lastIndex) parts.push(<Fragment key={key++}>{text.slice(lastIndex, match.index)}</Fragment>);
    const [, display, inline] = match;
    const latex = display ?? inline ?? '';
    const html = renderLatex(latex, Boolean(display));
    parts.push(<span key={key++} className={display ? 'my-1 block overflow-x-auto' : undefined} dangerouslySetInnerHTML={{ __html: html }} />);
    lastIndex = match.index + match[0].length;
  }
  if (lastIndex < text.length) parts.push(<Fragment key={key++}>{text.slice(lastIndex)}</Fragment>);
  return <span className={className}>{parts}</span>;
}

export function KatexBlock({ latex, className }: { latex: string; className?: string }) {
  const html = renderLatex(latex, true);
  return <span className={className} dangerouslySetInnerHTML={{ __html: html }} />;
}
