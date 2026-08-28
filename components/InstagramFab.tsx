export default function InstagramFab() {
  return (
    <a
      href="https://www.instagram.com/arruda_army/"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Instagram do Arruda Army (abre em nova aba)"
      className="fixed bottom-4 right-4 z-50 flex h-11 w-11 items-center justify-center rounded-full border border-brass/50 bg-teal-900/85 text-chrome shadow-lg shadow-ink/50 backdrop-blur-sm transition-colors hover:border-brass hover:text-brass-bright sm:bottom-6 sm:right-6 sm:h-12 sm:w-12"
    >
      <svg
        viewBox="0 0 24 24"
        width="20"
        height="20"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        aria-hidden="true"
      >
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4.2" />
        <circle cx="17.3" cy="6.7" r="1" fill="currentColor" stroke="none" />
      </svg>
    </a>
  );
}
