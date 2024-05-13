import type { BlogPost } from "apps/blog/types.ts";
import Post from "site/components/blogList/Post.tsx";

export interface Props {
  posts?: BlogPost[] | null;
}

export default function BlogPosts({ posts }: Props) {
  return (
    <main class="container max-w-3xl px-3">
      {posts && posts.length > 0
        ? (
          <ul class="flex flex-col gap-3">
            {posts.map((post) => (
              <Post
                key={post.slug}
                title={post.title}
                date={post.date}
                slug={post.slug}
              />
            ))}
          </ul>
        )
        : <h2>no published posts</h2>}
    </main>
  );
}
