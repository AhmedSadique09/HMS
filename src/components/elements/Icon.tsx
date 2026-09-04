/** Stroked glyph. Multiple sub-paths are separated by "|". */
export function Icon({ path, className = "size-6" }: { path: string; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true" className={className}>
      {path.split("|").map((d, i) => (
        <path key={i} d={d} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      ))}
    </svg>
  );
}

/** Filled glyph — for marks where an outline would read as the wrong logo. */
export function SolidIcon({ path, className = "size-6" }: { path: string; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path fillRule="evenodd" clipRule="evenodd" d={path} />
    </svg>
  );
}
