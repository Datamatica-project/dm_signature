import clsx from 'clsx';
import type { PreviewTab } from '../types';

interface PreviewTabsProps {
  activeTab: PreviewTab;
  onTabChange: (tab: PreviewTab) => void;
}

const TABS: { value: PreviewTab; label: string }[] = [
  { value: 'desktop', label: '데스크탑' },
  { value: 'mobile', label: '모바일' },
];

export function PreviewTabs({ activeTab, onTabChange }: PreviewTabsProps) {
  return (
    <div
      role="group"
      aria-label="미리보기 화면"
      className="bg-track flex shrink-0 gap-0.5 rounded-[7px] p-[3px]"
    >
      {TABS.map(({ value, label }) => {
        const isActive = value === activeTab;
        return (
          <button
            key={value}
            type="button"
            aria-pressed={isActive}
            onClick={() => onTabChange(value)}
            className={clsx(
              'focus-visible:outline-brand h-[30px] shrink-0 cursor-pointer rounded-[5px] px-3.5 text-[13px] font-semibold whitespace-nowrap focus-visible:outline-2',
              isActive ? 'text-ink bg-white' : 'text-muted bg-transparent'
            )}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
}
