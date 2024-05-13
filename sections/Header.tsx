import ContactButton, {
  type Props as ContactButtonProps,
} from "site/components/header/ContactButton.tsx";

interface Props {
  contacts?: ContactButtonProps[];
}

export default function Header({
  contacts,
}: Props = {
  contacts: [{ href: "#", label: "say hi :)", icon: "email" }],
}) {
  return (
    <header class="flex justify-between items-center container px-3">
      <p>vitoo</p>
      {contacts && contacts.length > 0
        ? (
          <div class="flex gap-3">
            {contacts.map((contact) => (
              <ContactButton key={contact.href} {...contact} />
            ))}
          </div>
        )
        : <></>}
    </header>
  );
}
