import formatDate from "site/sdk/formatDate.ts";

interface Props {
  title: string;
  date: string;
  slug: string;
}

export default function Post({ title, date, slug }: Props) {
  return (
    <li class="lowercase">
      <a
        href={`/${slug}`}
        class="flex gap-3 items-center justify-between"
      >
        <h3 class="line-clamp-1">{title}</h3>
        <span class="flex gap-3 items-center shrink-0">
          {date ? formatDate(date) : ""}
        </span>
      </a>
    </li>
  );
}
