import type { BlogPostPage } from "apps/blog/types.ts";
import type { ComponentChildren } from "preact";
import type { AppContext } from "site/apps/site.ts";
import formatDate from "site/sdk/formatDate.ts";
import Icon from "site/components/ui/Icon.tsx";
import { SectionProps } from "deco/mod.ts";

interface Props {
  page?: BlogPostPage | null;
}

function Container({ children }: { children?: ComponentChildren }) {
  return (
    <main class="container max-w-3xl px-3 min-h-[calc(100vh-var(--header-height))]">
      {children}
    </main>
  );
}

export function loader(props: Props, _: Request, ctx: AppContext) {
  if (!props.page || !props.page.post) {
    ctx.response.status = 404;
  }

  return props;
}

const PARAGRAPH_STYLES = "[&_p]:leading-[150%] [&_*]:mb-4";
const HEADING_1 = "[&>h1]:text-xl [&>h1]:my-6 [&>h1]:font-bold";
const HEADING_2 = "[&>h2]:text-lg [&>h2]:my-6 [&>h2]:font-bold";
const HEADING_3 = "[&>h3]:text-base [&>h3]:my-6 [&>h3]:font-bold";
const HEADING_4 = "[&>h4]:text-base [&>h4]:my-6 [&>h4]:font-bold";
const HEADING_5 = "[&>h5]:text-base [&>h5]:my-6 [&>h5]:font-bold";
const HEADING_6 = "[&>h6]:text-base [&>h6]:my-6 [&>h6]:font-bold";
const HEADING_STYLES =
  `${HEADING_1} ${HEADING_2} ${HEADING_3} ${HEADING_4} ${HEADING_5} ${HEADING_6}`;
const CODE_BLOCK_STYLES =
  "[&>pre]:bg-gray-100 [&>pre]:text-gray-800 [&>pre]:p-4 [&>pre]:font-mono [&>pre]:text-sm [&>pre]:border [&>pre]:rounded-md [&>pre]:overflow-x-auto [&>code]:block [&>code]:w-full";
const IMAGE_STYLES = "[&_img]:rounded-2xl [&_img]:w-full [&_img]:my-12";
const BLOCKQUOTE_STYLES =
  "[&>blockquote]:my-6 [&>blockquote]:border-l-2 [&>blockquote]:border-current [&>blockquote]:italic [&>blockquote]:pl-6";

const CONTENT_STYLES =
  `max-w-3xl mb-12 mx-auto [&_*]:text-pretty ${PARAGRAPH_STYLES} ${HEADING_STYLES} ${CODE_BLOCK_STYLES} ${IMAGE_STYLES} ${BLOCKQUOTE_STYLES}`;

export default function BlogPost({ page }: SectionProps<typeof loader>) {
  if (!page || !page.post) {
    return (
      <Container>
        <div class="flex justify-center items-center w-full h-[calc(100vh-var(--header-height))] gap-3">
          <span class="p-1 flex items-center justify-center bg-yellow-500/30 rounded-lg">
            <Icon id="search-error" size={16} class="text-yellow-500" />
          </span>
          <p>Post não encontrado</p>
        </div>
      </Container>
    );
  }

  const { title, authors, date, content } = page.post;
  const formattedDate = formatDate(date);

  return (
    <Container>
      <h1 class="text-lg font-bold">{title}</h1>
      <span>
        {authors.map((author) => author.name).join(", ")} - {formattedDate}
      </span>
      <hr class="w-full h-px bg-zinc-700 border-none my-6" />
      <div
        class={CONTENT_STYLES}
        dangerouslySetInnerHTML={{
          __html: content,
        }}
      />
    </Container>
  );
}
