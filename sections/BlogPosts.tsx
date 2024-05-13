import { BlogPost } from "apps/blog/types.ts";
import { usePartialSection } from "deco/hooks/usePartialSection.ts";
import { ComponentChildren, Fragment } from "preact";
import { useId } from "site/sdk/useId.ts";

export interface Props {
  posts?: BlogPost[] | null;
  pagination?: {
    /**
     * @title First page
     * @description Leave it as 0 to start from the first page
     */
    page?: number;
    /** @title items per page */
    perPage?: number;
  };
}

function Container({ children }: { children: ComponentChildren }) {
  return (
    <div class="container px-3 text-sm">
      {children}
    </div>
  );
}

export default function BlogPosts({
  posts,
  pagination,
}: Props) {
  if (!posts) return <></>;

  const {
    perPage = 50,
    page = 0,
  } = pagination ?? {};

  const from = perPage * page;
  const to = perPage * (page + 1);

  // It's boring to generate ids. Let's autogen them
  const postList = useId();

  // Get the HTMX link for this section
  const fetchMoreLink = usePartialSection({
    mode: "append",
    // Renders this section with the next page
    props: {
      pagination: { perPage, page: page + 1 },
    },
  })["f-partial"];

  const ContainerComponent = page === 0 ? Container : Fragment;

  return (
    <ContainerComponent>
      <ul class="flex flex-col">
        {posts.slice(from, to).map((post) => (
          <li>
            <a
              href={`/blog/${post.slug}`}
              class="flex gap-3 items-center justify-between"
            >
              <h3 class="line-clamp-1">{post.title}</h3>
              <span class="flex gap-3 items-center shrink-0">
                {post.date
                  ? new Date(post.date).toLocaleDateString("pt-BR", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })
                  : ""}
              </span>
            </a>
          </li>
        ))}
      </ul>
      {to < posts.length && (
        <div class="flex justify-center w-full" id={postList}>
          <button
            hx-get={fetchMoreLink}
            hx-swap="outerHTML"
            hx-target={`#${postList}`}
            class="btn btn-primary"
          >
            <span class="inline [.htmx-request_&]:hidden">
              Ver mais
            </span>
            <span class="loading loading-spinner hidden [.htmx-request_&]:block" />
          </button>
        </div>
      )}
    </ContainerComponent>
  );
}
