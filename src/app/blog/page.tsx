import Link from "next/link";
import { posts } from "../../content/posts";

export const metadata = {
  title: "Blog | Smeu E-com tools",
  description: "Learn how to crop Flipkart & Meesho labels into thermal-ready PDFs. Seller tips & guides.",
};

export default function BlogPage() {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-blue-600 mb-6">📝 Blog</h1>

      <div className="space-y-6">
        {posts.map((post) => (
          <div
            key={post.slug}
            className="p-4 border rounded-lg bg-white shadow-sm hover:shadow-md transition"
          >
            <h2 className="text-xl font-semibold text-gray-800">
              <Link href={`/blog/${post.slug}`} className="hover:text-blue-600">
                {post.title}
              </Link>
            </h2>
            <p className="text-gray-600 mt-2">{post.excerpt}</p>
            <p className="text-sm text-gray-400 mt-1">
              Published: {new Date(post.date).toLocaleDateString()}
            </p>
            <Link
              href={`/blog/${post.slug}`}
              className="mt-3 inline-block text-blue-600 font-medium"
            >
              Read More →
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
