import Link from "next/link";

interface EmptyStateProps {
  icon: string;
  title: string;
  description: string;
  actionLabel?: string;
  actionHref?: string;
}

export default function EmptyState({ icon, title, description, actionLabel, actionHref }: EmptyStateProps) {
  return (
    <div className="py-16 text-center">
      <div className="w-20 h-20 mx-auto rounded-2xl bg-surface-container-high flex items-center justify-center mb-6">
        <span className="material-symbols-outlined text-outline text-4xl">{icon}</span>
      </div>
      <h3 className="font-[family-name:var(--font-headline)] text-2xl text-primary mb-3">{title}</h3>
      <p className="text-on-surface-variant text-sm max-w-md mx-auto mb-6 leading-relaxed">{description}</p>
      {actionLabel && actionHref && (
        <Link
          href={actionHref}
          className="inline-flex items-center gap-2 bg-primary text-on-primary px-6 py-3 rounded-lg text-xs font-bold uppercase tracking-wider hover:opacity-90 transition-opacity"
        >
          {actionLabel}
        </Link>
      )}
    </div>
  );
}
