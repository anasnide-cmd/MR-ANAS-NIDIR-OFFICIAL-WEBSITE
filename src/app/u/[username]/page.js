'use client';
import { useState, useEffect } from 'react';
import { db, auth } from '../../../lib/firebase';
import { collection, query, where, getDocs, limit, addDoc } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import Loader from '../../../components/Loader';
import { Eye, GitBranch, Box, Code, Star, Heart, Share2, MapPin, Calendar } from 'lucide-react';

export default function UserProfile() {
    const params = useParams();
    const router = useRouter();
    const { username } = params; // This corresponds to 'displayName' or 'username' field
    
    const [profileUser, setProfileUser] = useState(null);
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentUser, setCurrentUser] = useState(null);
    const [forkingId, setForkingId] = useState(null);

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, u => setCurrentUser(u));
        return () => unsub();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            if (!username) return;
            
            try {
                // 1. Find User by username (slug) or displayName
                // For now, we query 'users' where 'username' OR 'displayName' matches
                // Note: In a real app, we need a unique 'username' field. 
                // We'll try to match displayName for now as a fallback.
                const usersRef = collection(db, 'users');
                // Try to find by custom username field first (if implemented), else displayName
                // Since firestore doesn't support logical OR in one field easily without multiple queries or updated index
                // We will search by 'displayName' for this iteration as it exists.
                
                // Decode the username from URL (handling spaces)
                const decodedName = decodeURIComponent(username);
                
                const q = query(usersRef, where('displayName', '==', decodedName), limit(1));
                const userSnap = await getDocs(q);

                if (userSnap.empty) {
                    setLoading(false);
                    return; // User not found
                }

                const userData = { id: userSnap.docs[0].id, ...userSnap.docs[0].data() };
                setProfileUser(userData);

                // 2. Fetch Public Projects
                const sitesRef = collection(db, 'user_sites');
                const sitesQ = query(
                    sitesRef, 
                    where('userId', '==', userData.id),
                    where('status', '==', 'public') // Only public sites
                );
                
                const sitesSnap = await getDocs(sitesQ);
                setProjects(sitesSnap.docs.map(d => ({ id: d.id, ...d.data() })));

            } catch (err) {
                console.error("Error fetching profile:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [username]);

    const handleFork = async (site) => {
        if (!currentUser) {
            router.push('/mr-build/login');
            return;
        }
        if (forkingId) return;

        setForkingId(site.id);
        try {
            // Create a copy of the site
            const sitesRef = collection(db, 'user_sites');
            const newSiteData = {
                ...site,
                userId: currentUser.uid,
                name: `Fork of ${site.name}`,
                forkedFrom: site.id,
                status: 'draft', // Reset to draft
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
                views: 0,
                stars: 0
            };
            
            // Remove ID from spread if it exists in data
            delete newSiteData.id;

            const docRef = await addDoc(sitesRef, newSiteData);
            router.push(`/mr-build/editor?id=${docRef.id}`);
        } catch (err) {
            console.error("Fork failed:", err);
            setForkingId(null);
            alert("Failed to fork project. See console.");
        }
    };

    if (loading) return <Loader text="Locating Agent Record..." />;

    if (!profileUser) {
        return (
            <div className="not-found-container">
                <h1>404</h1>
                <p>Agent "{decodeURIComponent(username)}" not found in the registry.</p>
                <Link href="/mr-build/dashboard" className="btn-back">Return to Base</Link>
                <style jsx>{`
                    .not-found-container {
                        height: 100vh; display: flex; flex-direction: column; 
                        align-items: center; justify-content: center;
                        background: #050505; color: #fff; text-align: center;
                    }
                    h1 { font-size: 4rem; color: #ff4444; margin-bottom: 20px; }
                    p { color: #888; margin-bottom: 30px; }
                    .btn-back { 
                        padding: 10px 20px; background: rgba(255,255,255,0.1); 
                        border: 1px solid rgba(255,255,255,0.2); color: #fff; 
                        text-decoration: none; border-radius: 8px;
                    }
                `}</style>
            </div>
        );
    }

    return (
        <div className="profile-container">
            {/* Header / Cover */}
            <header className="profile-header">
                <div className="banner"></div>
                <div className="header-content">
                    <img 
                         src={`https://ui-avatars.com/api/?name=${profileUser.displayName}&background=00f0ff&color=000&size=128`} 
                         alt={profileUser.displayName} 
                         className="profile-avatar"
                    />
                    <div className="profile-info">
                        <h1 className="username">{profileUser.displayName}</h1>
                        <p className="bio">{profileUser.bio || "Building the future with Mr Build."}</p>
                        <div className="stats-row">
                            <span className="stat"><MapPin size={14}/> {profileUser.location || "Cyberspace"}</span>
                            <span className="stat"><Calendar size={14}/> Joined {new Date(profileUser.createdAt || Date.now()).toLocaleDateString()}</span>
                        </div>
                    </div>
                    {/* Actions (Follow, Share - Future) */}
                    <div className="profile-actions">
                        <button className="btn-share" title="Share Profile"><Share2 size={18}/></button>
                    </div>
                </div>
            </header>

            {/* Content */}
            <main className="profile-content">
                <div className="section-title">
                    <h2>Constructs</h2>
                    <span className="count">{projects.length}</span>
                </div>

                <div className="projects-grid">
                    {projects.length > 0 ? projects.map(site => (
                         <div key={site.id} className="project-card" onClick={() => router.push(`/s/${site.slug || site.id}`)}>
                            <div className="card-preview">
                                <div className="tech-badge">NEX ENGINE</div>
                            </div>
                            <div className="card-body">
                                <h3>{site.name}</h3>
                                <p>{site.description || "No description."}</p>
                                <div className="card-meta">
                                    <span><Eye size={12}/> {site.views || 0}</span>
                                    <span><Star size={12}/> {site.stars || 0}</span>
                                    <button 
                                        className="btn-fork-mini"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleFork(site);
                                        }}
                                        disabled={forkingId === site.id}
                                    >
                                        <GitBranch size={12}/> {forkingId === site.id ? 'Forking...' : 'Fork'}
                                    </button>
                                </div>
                            </div>
                         </div>
                    )) : (
                        <div className="empty-state">
                            <Box size={40} className="empty-icon"/>
                            <p>This agent hasn't published any constructs yet.</p>
                        </div>
                    )}
                </div>
            </main>

            <style jsx>{`
                .profile-container {
                    min-height: 100vh; background: #050505; color: #fff;
                    font-family: 'Inter', sans-serif;
                }
                
                /* Header */
                .profile-header {
                    background: #0a0a0a; border-bottom: 1px solid rgba(255,255,255,0.05);
                    position: relative;
                }
                .banner { height: 200px; background: linear-gradient(90deg, #00f0ff22, #d000ff22); }
                .header-content {
                    max-width: 1000px; margin: 0 auto; padding: 0 20px 30px;
                    display: flex; align-items: flex-end; gap: 30px;
                    margin-top: -60px;
                }
                @media (max-width: 600px) { .header-content { flex-direction: column; align-items: center; text-align: center; margin-top: -60px; } }

                .profile-avatar {
                    width: 120px; height: 120px; border-radius: 50%;
                    border: 4px solid #050505; background: #000;
                    box-shadow: 0 10px 30px rgba(0,0,0,0.5);
                }
                .profile-info { flex: 1; padding-bottom: 10px; }
                .username { font-size: 2rem; font-weight: 700; margin-bottom: 8px; }
                .bio { color: #aaa; margin-bottom: 16px; max-width: 600px; }
                .stats-row { display: flex; gap: 20px; color: #666; font-size: 0.9rem; }
                .stat { display: flex; align-items: center; gap: 6px; }

                .profile-actions { padding-bottom: 15px; }
                .btn-share {
                    width: 40px; height: 40px; border-radius: 50%;
                    background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1);
                    color: #fff; cursor: pointer; display: flex; align-items: center; justify-content: center;
                    transition: 0.2s;
                }
                .btn-share:hover { background: rgba(255,255,255,0.1); color: #00f0ff; }

                /* Content */
                .profile-content { max-width: 1000px; margin: 0 auto; padding: 40px 20px; }
                .section-title { display: flex; align-items: center; gap: 12px; margin-bottom: 30px; }
                .section-title h2 { font-size: 1.5rem; color: #fff; }
                .count { background: #1a1a1a; padding: 2px 8px; border-radius: 12px; font-size: 0.8rem; color: #666; }

                /* Grid */
                .projects-grid {
                    display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 24px;
                }
                
                .project-card {
                    background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.05);
                    border-radius: 12px; overflow: hidden; cursor: pointer; transition: 0.3s;
                }
                .project-card:hover { transform: translateY(-5px); border-color: #00f0ff; }

                .card-preview { height: 140px; background: linear-gradient(45deg, #111, #1a1a1a); position: relative; }
                .tech-badge {
                    position: absolute; bottom: 10px; right: 10px;
                    font-size: 0.6rem; color: #555; background: rgba(0,0,0,0.5);
                    padding: 2px 6px; border-radius: 4px; border: 1px solid #222;
                }

                .card-body { padding: 16px; }
                .card-body h3 { font-size: 1.1rem; margin-bottom: 6px; color: #fff; }
                .card-body p { color: #666; font-size: 0.9rem; margin-bottom: 16px; height: 40px; overflow: hidden; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; }

                .card-meta { display: flex; justify-content: space-between; align-items: center; color: #555; font-size: 0.8rem; }
                .card-meta span { display: flex; align-items: center; gap: 4px; }

                .btn-fork-mini {
                    background: rgba(0, 240, 255, 0.1); border: none; color: #00f0ff;
                    padding: 4px 8px; border-radius: 4px; font-size: 0.7rem; cursor: pointer;
                    display: flex; align-items: center; gap: 4px;
                }
                .btn-fork-mini:hover { background: rgba(0, 240, 255, 0.2); }

                .empty-state {
                    grid-column: 1 / -1; text-align: center; padding: 60px;
                    border: 1px dashed rgba(255,255,255,0.1);
                    border-radius: 12px;
                }
                .empty-icon { color: #333; margin-bottom: 16px; }
                .empty-state p { color: #666; }
            `}</style>
        </div>
    );
}
