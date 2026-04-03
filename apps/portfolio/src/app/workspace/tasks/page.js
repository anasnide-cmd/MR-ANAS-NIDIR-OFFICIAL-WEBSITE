'use client';
import { useState, useEffect } from 'react';
import { auth, db } from '../../../lib/firebase';
import { collection, query, orderBy, addDoc, updateDoc, doc, serverTimestamp, onSnapshot, deleteDoc } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';

export default function TaskBoard() {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState('');
    const [user, setUser] = useState(null);
    const [isCreating, setIsCreating] = useState(false);

    useEffect(() => {
        const unsubAuth = onAuthStateChanged(auth, u => {
            if (u) setUser(u);
        });

        const q = query(collection(db, 'workspace_tasks'), orderBy('createdAt', 'desc'));
        const unsubTasks = onSnapshot(q, (snapshot) => {
            const taskList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setTasks(taskList);
        }, (error) => {
            console.error("TaskBoard: Snapshot listener error", error);
        });

        return () => {
            unsubAuth();
            unsubTasks();
        };
    }, []);

    const addTask = async (e) => {
        e.preventDefault();
        if (!newTask.trim() || !user) return;

        try {
            await addDoc(collection(db, 'workspace_tasks'), {
                title: newTask,
                status: 'todo', // todo, progress, done
                createdBy: user.uid,
                creatorName: user.email?.split('@')[0],
                createdAt: serverTimestamp()
            });
            setNewTask('');
            setIsCreating(false);
        } catch (err) {
            alert("Failed to create task");
        }
    };

    const moveTask = async (taskId, newStatus) => {
        try {
            await updateDoc(doc(db, 'workspace_tasks', taskId), { status: newStatus });
        } catch (err) {
            console.error(err);
        }
    };

    const deleteTask = async (taskId) => {
        if (!confirm("Delete this task?")) return;
        try {
            await deleteDoc(doc(db, 'workspace_tasks', taskId));
        } catch (err) {
            console.error(err);
        }
    };

    const columns = [
        { id: 'todo', label: 'TO DO', color: '#ff5050' },
        { id: 'progress', label: 'IN PROGRESS', color: '#ffd700' },
        { id: 'done', label: 'COMPLETED', color: '#00ff88' }
    ];

    return (
        <div className="board-container">
            <header className="board-header">
                <div className="header-left">
                    <h1>TASK ENGINE</h1>
                    <p>Tactical Objectives Board</p>
                </div>
                <button onClick={() => setIsCreating(true)} className="btn-add">
                    + NEW TASK
                </button>
            </header>

            {isCreating && (
                <div className="modal-overlay" onClick={() => setIsCreating(false)}>
                    <div className="create-modal" onClick={e => e.stopPropagation()}>
                        <h3>Initialize Objective</h3>
                        <form onSubmit={addTask}>
                            <input
                                autoFocus
                                type="text"
                                placeholder="Task objective..."
                                value={newTask}
                                onChange={e => setNewTask(e.target.value)}
                                className="task-input"
                            />
                            <div className="modal-actions">
                                <button type="button" onClick={() => setIsCreating(false)} className="btn-cancel">CANCEL</button>
                                <button type="submit" className="btn-submit">INITIALIZE</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            <div className="kanban-board">
                {columns.map(col => (
                    <div key={col.id} className="kanban-column">
                        <div className="column-header" style={{ borderTopColor: col.color }}>
                            <h2>{col.label}</h2>
                            <span className="count">
                                {tasks.filter(t => t.status === col.id).length}
                            </span>
                        </div>
                        <div className="column-content">
                            {tasks.filter(t => t.status === col.id).map(task => (
                                <div key={task.id} className="task-card">
                                    <p className="task-title">{task.title}</p>
                                    <div className="task-meta">
                                        <span className="creator">{task.creatorName}</span>
                                        {/* Simple Moves for MVP */}
                                        <div className="task-controls">
                                            {col.id !== 'todo' && (
                                                <button onClick={() => moveTask(task.id, col.id === 'done' ? 'progress' : 'todo')}></button>
                                            )}
                                            {col.id !== 'done' && (
                                                <button onClick={() => moveTask(task.id, col.id === 'todo' ? 'progress' : 'done')}>➡</button>
                                            )}
                                            <button onClick={() => deleteTask(task.id)} className="btn-del">×</button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            <style jsx>{`
                .board-container { height: 100vh; display: flex; flex-direction: column; overflow: hidden; }
                .board-header { padding: 20px 30px; display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid rgba(255,255,255,0.05); }
                h1 { font-family: var(--font-orbitron); font-size: 1.5rem; letter-spacing: 1px; color: #fff; }
                .board-header p { font-size: 0.8rem; color: rgba(255,255,255,0.5); }
                
                .btn-add {
                    padding: 10px 20px;
                    background: #a0a0ff;
                    color: #000;
                    border: none;
                    border-radius: 6px;
                    font-weight: 700;
                    cursor: pointer;
                    font-family: var(--font-orbitron);
                    transition: 0.2s;
                }
                .btn-add:hover { transform: translateY(-2px); box-shadow: 0 5px 15px rgba(160,160,255,0.3); }

                .kanban-board {
                    flex: 1;
                    display: flex;
                    overflow-x: auto;
                    padding: 20px;
                    gap: 20px;
                }

                .kanban-column {
                    min-width: 300px;
                    background: rgba(255,255,255,0.02);
                    border-radius: 12px;
                    display: flex;
                    flex-direction: column;
                    border: 1px solid rgba(255,255,255,0.05);
                }

                .column-header {
                    padding: 15px 20px;
                    border-top: 3px solid #555;
                    border-bottom: 1px solid rgba(255,255,255,0.05);
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    background: rgba(0,0,0,0.2);
                    border-radius: 12px 12px 0 0;
                }
                .column-header h2 { font-size: 0.9rem; font-weight: 700; color: rgba(255,255,255,0.8); letter-spacing: 1px; }
                .count { background: rgba(255,255,255,0.1); padding: 2px 8px; border-radius: 10px; font-size: 0.8rem; }

                .column-content {
                    flex: 1;
                    padding: 15px;
                    overflow-y: auto;
                    display: flex;
                    flex-direction: column;
                    gap: 10px;
                }

                .task-card {
                    background: #1a1b20;
                    padding: 15px;
                    border-radius: 8px;
                    border: 1px solid rgba(255,255,255,0.05);
                    box-shadow: 0 2px 5px rgba(0,0,0,0.2);
                    transition: transform 0.2s;
                    animation: slideUp 0.3s ease-out;
                }
                .task-card:hover { transform: translateY(-2px); border-color: rgba(255,255,255,0.1); }
                @keyframes slideUp { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }

                .task-title { font-size: 0.95rem; line-height: 1.4; margin-bottom: 10px; color: #fff; }
                .task-meta { display: flex; justify-content: space-between; align-items: center; }
                .creator { font-size: 0.7rem; color: rgba(255,255,255,0.4); }

                .task-controls button {
                    background: transparent;
                    border: 1px solid rgba(255,255,255,0.1);
                    color: rgba(255,255,255,0.6);
                    width: 24px; height: 24px;
                    border-radius: 4px;
                    cursor: pointer;
                    margin-left: 5px;
                    display: inline-flex; align-items: center; justify-content: center;
                    font-size: 0.8rem;
                }
                .task-controls button:hover { background: rgba(255,255,255,0.1); color: #fff; }
                .task-controls .btn-del:hover { background: rgba(255,50,50,0.2); color: #ff5050; border-color: transparent; }

                /* Modal */
                .modal-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.7); display: flex; align-items: center; justify-content: center; z-index: 2000; backdrop-filter: blur(5px); }
                .create-modal { background: #15151a; padding: 30px; border-radius: 16px; width: 100%; max-width: 500px; border: 1px solid rgba(255,255,255,0.1); box-shadow: 0 20px 50px rgba(0,0,0,0.5); }
                .create-modal h3 { margin-bottom: 20px; font-family: var(--font-orbitron); }
                .task-input { width: 100%; padding: 15px; background: rgba(0,0,0,0.3); border: 1px solid rgba(255,255,255,0.1); color: #fff; border-radius: 8px; margin-bottom: 20px; outline: none; }
                .task-input:focus { border-color: #a0a0ff; }
                .modal-actions { display: flex; justify-content: flex-end; gap: 10px; }
                .modal-actions button { padding: 10px 20px; border-radius: 6px; cursor: pointer; font-weight: 700; border: none; }
                .btn-cancel { background: transparent; color: #aaa; }
                .btn-cancel:hover { color: #fff; }
                .btn-submit { background: #a0a0ff; color: #000; }

                @media (max-width: 768px) {
                    .kanban-board { flex-direction: column; overflow-x: hidden; overflow-y: auto; }
                    .kanban-column { min-width: 100%; }
                }
            `}</style>
        </div>
    );
}
