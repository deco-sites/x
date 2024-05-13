import { SectionProps } from "deco/mod.ts";
import ContactButton, {
  type Props as ContactButtonProps,
} from "site/components/header/ContactButton.tsx";
import Icon from "site/components/ui/Icon.tsx";

interface Props {
  contacts?: ContactButtonProps[];
}

export function loader(props: Props, req: Request) {
  return {
    ...props,
    isHome: new URL(req.url).pathname === "/",
  };
}

export default function Header({
  contacts,
  isHome,
}: SectionProps<typeof loader> = {
  contacts: [{ href: "#", label: "say hi :)" }],
  isHome: false,
}) {
  return (
    <header>
      <nav class="flex justify-between items-center max-w-3xl container px-3 h-[--header-height]">
        <a href="/" class="flex items-center justify-center gap-3">
          {isHome ? <></> : <Icon id="arrow-back" size={16} />}vitoo
        </a>
        {contacts && contacts.length > 0
          ? (
            <div class="flex gap-3">
              {contacts.map((contact) => (
                <ContactButton key={contact.href} {...contact} />
              ))}
            </div>
          )
          : <></>}
      </nav>
    </header>
  );
}
