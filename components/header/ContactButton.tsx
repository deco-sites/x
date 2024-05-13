import Icon, { AvailableIcons } from "site/components/ui/Icon.tsx";

export interface Props {
  label: string;
  href: string;
  /**
   * @format icon-select
   * @options deco-sites/x/loaders/availableIcons.ts
   */
  icon: AvailableIcons;
}

export default function ContactButton({ label, href, icon }: Props) {
  return (
    <a href={href} class="flex gap-3 items-center justify-center px-3">
      {label} {icon && (
        <Icon
          id={icon}
          size={16}
        />
      )}
    </a>
  );
}
