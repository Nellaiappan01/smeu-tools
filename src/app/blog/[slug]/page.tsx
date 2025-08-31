import { notFound } from "next/navigation";
import { posts } from "../../../content/posts";

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const post = posts.find((p) => p.slug === params.slug);
  if (!post) return {};
  return {
    title: `${post.title} | Smeu E-com tools`,
    description: post.excerpt,
  };
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = posts.find((p) => p.slug === params.slug);

  if (!post) return notFound();

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-blue-600 mb-2">{post.title}</h1>
      <p className="text-sm text-gray-400 mb-6">
        Published: {new Date(post.date).toLocaleDateString()}
      </p>

      {/* ✅ Styled blog content */}
      <article
        className="prose prose-blue max-w-none"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />
    </div>
  );
}
