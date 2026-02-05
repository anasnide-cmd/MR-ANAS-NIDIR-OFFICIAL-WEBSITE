"use client";

import React, { useState, useEffect } from 'react';
import { db } from '@/lib/firebase';
import { collection, query, orderBy, onSnapshot, doc, updateDoc, deleteDoc } from 'firebase/firestore';

export default function AdminApplicationsPage() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState(null);

  useEffect(() => {
    const q = query(collection(db, 'team_applications'), orderBy('submittedAt', 'desc'));
    
    // Real-time listener
    const unsubscribe = onSnapshot(q, 
      (snapshot) => {
        const apps = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
          // Convert timestamp to Date object if it exists
          submittedAt: doc.data().submittedAt?.toDate()
        }));
        setApplications(apps);
        setLoading(false);
      },
      (error) => {
        console.error("Error fetching applications:", error);
        setLoading(false);
        // You might want to set a state here to show an error message in UI
        if (error.code === 'permission-denied') {
            alert("Access Denied: You don't have permission to view applications. Please ensure you are logged in as an Admin.");
        }
      }
    );

    return () => unsubscribe();
  }, []);

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const markReviewed = async (id, currentStatus) => {
    try {
      const newStatus = currentStatus === 'reviewed' ? 'pending' : 'reviewed';
      await updateDoc(doc(db, 'team_applications', id), {
        status: newStatus
      });
    } catch (error) {
      console.error("Error updating status:", error);
      alert("Failed to update status");
    }
  };

  const deleteApplication = async (id) => {
    if (window.confirm("Are you sure you want to permanently delete this application?")) {
      try {
        await deleteDoc(doc(db, 'team_applications', id));
      } catch (error) {
        console.error("Error deleting application:", error);
        alert("Failed to delete application");
      }
    }
  };

  if (loading) {
    return <div className="text-white p-8">Loading applications...</div>;
  }

  return (
    <div className="admin-container">
      <div className="header">
        <h1 className="title">TEAM APPLICATIONS</h1>
        <div className="stats">
          Total: {applications.length} | Pending: {applications.filter(a => a.status === 'pending').length}
        </div>
      </div>

      <div className="applications-list">
        {applications.length === 0 ? (
          <div className="empty-state">No applications received yet.</div>
        ) : (
          applications.map(app => (
            <div key={app.id} className={`app-card ${app.status === 'reviewed' ? 'reviewed' : ''}`}>
              <div className="card-header" onClick={() => toggleExpand(app.id)}>
                <div className="applicant-info">
                  <div className="name-row">
                    <span className="name">{app.fullName}</span>
                    {app.status === 'pending' && <span className="badge-new">NEW</span>}
                  </div>
                  <div className="meta-row">
                    <span>{app.email}</span> • <span>{app.whatsapp}</span>
                  </div>
                </div>
                <div className="card-actions">
                  <span className="date">
                    {app.submittedAt ? app.submittedAt.toLocaleDateString() : 'Just now'}
                  </span>
                  <span className="arrow">{expandedId === app.id ? '▲' : '▼'}</span>
                </div>
              </div>

              {expandedId === app.id && (
                <div className="card-details">
                  <div className="detail-grid">
                    <div className="detail-item">
                      <label>Time Commitment</label>
                      <p>{app.commitment}</p>
                    </div>
                    <div className="detail-item">
                      <label>Experience</label>
                      <p>{app.experience}</p>
                    </div>
                  </div>
                  
                  <div className="detail-full">
                    <label>Motivation (Why join?)</label>
                    <p className="long-text">{app.reason}</p>
                  </div>

                  <div className="detail-full">
                    <label>Mentality Question</label>
                    <p className="long-text">{app.mentality}</p>
                  </div>

                  <div className="action-buttons">
                    <button 
                      onClick={() => markReviewed(app.id, app.status)}
                      className={`btn ${app.status === 'reviewed' ? 'btn-undo' : 'btn-review'}`}
                    >
                      {app.status === 'reviewed' ? 'Mark as Pending' : 'Mark Reviewed'}
                    </button>
                    <button 
                      onClick={() => deleteApplication(app.id)}
                      className="btn btn-delete"
                    >
                      Delete
                    </button>
                    <a 
                      href={`https://wa.me/${app.whatsapp.replace(/[^0-9]/g, '')}`} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="btn btn-whatsapp"
                    >
                      Contact on WhatsApp
                    </a>
                  </div>
                </div>
              )}
            </div>
          ))
        )}
      </div>

      <style jsx>{`
        .admin-container {
          padding: 2rem;
          color: #fff;
          max-width: 1000px;
          margin: 0 auto;
        }

        .header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 2rem;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
          padding-bottom: 1rem;
        }

        .title {
          font-family: 'Orbitron', sans-serif;
          font-size: 2rem;
          background: linear-gradient(90deg, #fff, #D4AF37);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .stats {
          color: #888;
          font-family: 'Orbitron', sans-serif;
        }

        .applications-list {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .empty-state {
          text-align: center;
          padding: 3rem;
          background: rgba(255, 255, 255, 0.03);
          border-radius: 8px;
          color: #666;
        }

        .app-card {
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 8px;
          overflow: hidden;
          transition: all 0.3s ease;
        }

        .app-card:hover {
          background: rgba(255, 255, 255, 0.05);
          border-color: rgba(212, 175, 55, 0.3);
        }

        .app-card.reviewed {
          opacity: 0.6;
          border-color: rgba(255, 255, 255, 0.05);
        }

        .card-header {
          padding: 1.5rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          cursor: pointer;
        }

        .applicant-info {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }

        .name-row {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .name {
          font-weight: 700;
          font-size: 1.1rem;
          color: #fff;
        }

        .badge-new {
          background: #D4AF37;
          color: #000;
          font-size: 0.7rem;
          padding: 2px 6px;
          border-radius: 4px;
          font-weight: 800;
        }

        .meta-row {
          font-size: 0.9rem;
          color: #888;
        }

        .card-actions {
          display: flex;
          align-items: center;
          gap: 1rem;
          color: #666;
        }

        .card-details {
          padding: 0 1.5rem 1.5rem 1.5rem;
          border-top: 1px solid rgba(255, 255, 255, 0.05);
          margin-top: -0.5rem;
          padding-top: 1.5rem;
          background: rgba(0, 0, 0, 0.2);
        }

        .detail-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.5rem;
          margin-bottom: 1.5rem;
        }

        .detail-item label, .detail-full label {
          display: block;
          color: #D4AF37;
          font-size: 0.8rem;
          margin-bottom: 0.5rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .detail-full {
          margin-bottom: 1.5rem;
        }

        .long-text {
          background: rgba(255, 255, 255, 0.03);
          padding: 1rem;
          border-radius: 4px;
          line-height: 1.6;
          color: #ccc;
          white-space: pre-wrap;
        }

        .action-buttons {
          display: flex;
          gap: 1rem;
          margin-top: 2rem;
        }

        .btn {
          padding: 0.75rem 1.5rem;
          border-radius: 4px;
          border: none;
          cursor: pointer;
          font-weight: 600;
          transition: all 0.2s;
        }

        .btn-review {
          background: #D4AF37;
          color: #000;
        }

        .btn-review:hover { background: #E5C148; }

        .btn-undo {
          background: transparent;
          border: 1px solid #666;
          color: #ccc;
        }

        .btn-undo:hover { border-color: #fff; color: #fff; }

        .btn-delete {
          background: rgba(255, 50, 50, 0.1);
          color: #ff4d4d;
        }

        .btn-delete:hover { background: rgba(255, 50, 50, 0.2); }

        .btn-whatsapp {
          background: #25D366;
          color: #fff;
          text-decoration: none;
          display: flex;
          align-items: center;
        }
        
        .btn-whatsapp:hover { background: #20BD5A; }
      `}</style>
    </div>
  );
}
