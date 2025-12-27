import Link from 'next/link';
import { client } from '../../sanity/lib/client';

export const revalidate = 60; // Revalidate every 60 seconds

async function getPosts() {
    const query = `*[_type == "post"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    publishedAt,
    "excerpt": array::join(string::split((pt::text(content)), "")[0..200], "") + "..."
  }`;
    return client.fetch(query);
}

export default async function BlogPage() {
    const posts = await getPosts();

    return (
        <main className="container section">
            <header className="page-hero">
                <h1>Notes & Updates</h1>
                <p>Thoughts on engineering, product, and the indie stack.</p>
            </header>

            <section className="grid" style={{ justifyContent: 'flex-start' }}>
                {posts.length > 0 ? (
                    posts.map((post) => (
                        <article key={post._id} className="card glass">
                            <h3>
                                <Link href={`/blog/${post.slug.current}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                                    {post.title}
                                </Link>
                            </h3>
                            <p className="meta">{new Date(post.publishedAt).toLocaleDateString()}</p>
                            <p>{post.excerpt}</p>
                        </article>
                    ))
                ) : (
                    <p>No posts found. Add some in Sanity Studio!</p>
                )}
            </section>

            <style jsx>{`
        .page-hero { margin-bottom: 40px; }
        .meta { color: #9aa0a6; font-size: 0.9rem; margin-bottom: 8px; }
      `}</style>
        </main>
    );
}
