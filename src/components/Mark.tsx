export function Mark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <path d="M6 6H42L36 24L42 42H6L12 24L6 6Z" fill="currentColor" />
    </svg>
  );
}
