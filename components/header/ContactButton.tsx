export interface Props {
  label: string;
  href: string;
}

export default function ContactButton({ label, href }: Props) {
  return <a href={href} rel="noindex" target="_blank">{label}</a>;
}
