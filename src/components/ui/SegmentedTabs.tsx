interface Tab {
  id: string;
  label: string;
}

interface SegmentedTabsProps {
  tabs: Tab[];
  activeId: string;
  onChange: (id: string) => void;
}

export function SegmentedTabs({ tabs, activeId, onChange }: SegmentedTabsProps) {
  return (
    <div
      className="flex items-center gap-1 bg-white/70 rounded-full p-1 overflow-x-auto"
      role="tablist"
    >
      {tabs.map((tab) => {
        const isActive = tab.id === activeId;
        return (
          <button
            key={tab.id}
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange(tab.id)}
            className={`shrink-0 whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              isActive
                ? 'bg-brand-purple text-white shadow-sm'
                : 'text-brand-ink/60 hover:text-brand-ink'
            }`}
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}
