'use client';
import { Suspense, useEffect, useState } from 'react';
import { db } from '../../../lib/firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

function WikiArticle() {
    const searchParams = useSearchParams();
    const slug = searchParams.get('slug');
    const [article, setArticle] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchArticle = async () => {
            try {
                const q = query(collection(db, 'posts'), where('slug', '==', slug));
                const snap = await getDocs(q);
                if (!snap.empty) {
                    const doc = snap.docs[0];
                    setArticle({ id: doc.id, ...doc.data() });
                }
            } catch (err) {
                console.error("Error fetching article:", err);
            } finally {
                setLoading(false);
            }
        };
        if (slug) fetchArticle();
        else setLoading(false);
    }, [slug]);

    if (loading) return <div className="wiki-loading">Loading Article...</div>;

    if (!article) {
        return (
            <div className="wiki-error">
                <h1>Article Not Found</h1>
                <p>The requested page does not exist in this database.</p>
                <Link href="/savoirpedia">Return to Main Page</Link>
            </div>
        );
    }

    // Determine category or type (Mock logic or from data)
    const category = article.category || "Documentation";
    const author = article.author || "System Admin";

    return (
        <article className="wiki-article-container">
            <header className="article-header">
                <h1 className="article-title">{article.title}</h1>
                <div className="article-subtitle">From SavoirPedia, the free encyclopedia</div>
            </header>

            <div className="article-body-layout">
                <div className="main-text">
                    {/* Infobox for Mobile/Tablet if needed, usually right floated */}
                    
                    <div className="wiki-infobox">
                        <div className="infobox-header">{article.title}</div>
                        <Image src="/assets/logo.jpg" alt="Featured" width={300} height={300} className="infobox-image" />
                        <table className="infobox-data">
                            <tbody>
                                <tr>
                                    <th>Author</th>
                                    <td>{author}</td>
                                </tr>
                                <tr>
                                    <th>Category</th>
                                    <td>{category}</td>
                                </tr>
                                <tr>
                                    <th>Published</th>
                                    <td>{new Date(article.date).toLocaleDateString()}</td>
                                </tr>
                                <tr>
                                    <th>Status</th>
                                    <td><span className="status-badge">Verified</span></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div className="toc-container">
                        <div className="toc-title">Contents</div>
                        <ul className="toc-list">
                            <li><a href="#overview">1 Overview</a></li>
                            <li><a href="#content">2 Content</a></li>
                            <li><a href="#references">3 References</a></li>
                        </ul>
                    </div>

                    <div id="overview" className="wiki-content-block">
                        <p className="lead-paragraph">
                            <strong>{article.title}</strong> is a documented entry in the system archives, written by {author}. 
                            It serves as a primary source of information regarding the topic of {category.toLowerCase()}.
                        </p>
                    </div>

                    <div id="content" className="wiki-content-render" dangerouslySetInnerHTML={{ __html: article.content }} />

                    <div id="references" className="wiki-references">
                        <h2>References</h2>
                        <ol className="refs-list">
                            <li>^ Original entry by {author}, {new Date(article.date).getFullYear()}.</li>
                            <li>^ System logs and verify hashes.</li>
                        </ol>
                    </div>

                    <div className="last-edited">
                        This page was last edited on {new Date(article.date).toLocaleString()}.
                    </div>
                </div>
            </div>

            <style jsx global>{`
                /* Wiki Content Typo */
                .wiki-content-render h2 {
                    font-family: 'Georgia', serif;
                    font-size: 1.5rem;
                    border-bottom: 1px solid #333;
                    padding-bottom: 5px;
                    margin-top: 30px;
                    margin-bottom: 15px;
                    color: #fff;
                }
                .wiki-content-render p { margin-bottom: 15px; line-height: 1.6; }
                .wiki-content-render ul { margin-bottom: 15px; margin-left: 20px; }
                
                /* Media Styles */
                .wiki-image { max-width: 100%; height: auto; border: 1px solid #333; margin: 10px 0; display: block; }
                .wiki-video { max-width: 100%; width: 100%; margin: 10px 0; }
                .wiki-video-wrapper {
                    position: relative; padding-bottom: 56.25%; /* 16:9 ratio */
                    height: 0; margin: 10px 0; overflow: hidden;
                    border: 1px solid #333;
                }
                .wiki-video-wrapper iframe {
                    position: absolute; top: 0; left: 0; width: 100%; height: 100%;
                }
                body { padding-top: 0 !important; }
            `}</style>
            <style jsx>{`
                .wiki-article-container {
                    max-width: 100%;
                    width: 100%;
                    margin: 0;
                    padding: 40px;
                    background: #1a1a1a;
                    color: #e0e0e0;
                    border: 1px solid #333;
                    min-height: 100vh;
                    font-size: 1.15rem;
                }
                .article-header {
                    border-bottom: 1px solid #333;
                    margin-bottom: 20px;
                }
                .article-title {
                    font-family: 'Georgia', serif;
                    font-size: 2.5rem;
                    margin: 0;
                    font-weight: normal;
                    color: #fff;
                }
                .article-subtitle { font-size: 0.9rem; color: #888; margin-top: 5px; margin-bottom: 10px; }

                .article-body-layout { position: relative; }

                .wiki-infobox {
                    float: right;
                    width: 300px;
                    background: #222;
                    border: 1px solid #333;
                    margin: 0 0 20px 20px;
                    padding: 5px;
                }
                .infobox-header {
                    background: #333;
                    text-align: center;
                    font-weight: bold;
                    padding: 5px;
                    margin-bottom: 5px;
                }
                .infobox-image { width: 100%; display: block; margin-bottom: 5px; } /* Placeholder */
                .infobox-data { width: 100%; font-size: 0.9rem; border-collapse: collapse; }
                .infobox-data th { text-align: left; padding: 5px; width: 40%; vertical-align: top; }
                .infobox-data td { padding: 5px; }

                .toc-container {
                    background: #222;
                    border: 1px solid #333;
                    padding: 10px 20px;
                    display: inline-block;
                    margin-bottom: 20px;
                    min-width: 200px;
                }
                .toc-title { font-weight: bold; text-align: center; margin-bottom: 10px; }
                .toc-list { list-style: none; padding: 0; margin: 0; }
                .toc-list li { margin-bottom: 5px; }
                .toc-list a { color: #00f0ff; text-decoration: none; font-size: 0.95rem; }

                .lead-paragraph { font-size: 1.1rem; margin-bottom: 20px; }

                .wiki-references {
                    margin-top: 50px;
                    border-top: 1px solid #333;
                    padding-top: 20px;
                    font-size: 0.9rem;
                }
                .wiki-references h2 { font-size: 1.2rem; font-family: serif; border: none; margin-top: 0; }
                .refs-list { padding-left: 20px; color: #888; }

                .last-edited {
                    margin-top: 40px;
                    font-size: 0.8rem;
                    color: #666;
                    font-style: italic;
                }

                @media (max-width: 768px) {
                    .wiki-infobox { float: none; width: 100%; margin: 0 0 20px 0; }
                    .wiki-article-container { padding: 15px; }
                }

                .status-badge { background: #0064e0; color: #fff; padding: 2px 6px; border-radius: 4px; font-size: 0.8rem; }
            `}</style>
        </article>
    );
}

export default function WikiPostPage() {
    return (
        <Suspense fallback={<div>Loading Wiki...</div>}>
            <WikiArticle />
        </Suspense>
    );
}
