'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Bold, 
  AlignCenter, 
  AlignLeft, 
  AlignRight, 
  ArrowDownToLine, 
  Sparkles, 
  Search,
  ChevronRight,
  Zap,
  LayoutGrid,
  Settings2,
  Trash2,
  Plus
} from 'lucide-react';

// Help functions for spreadsheet logic
const COLS = 26; // A-Z
const ROWS = 100; // Increased rows for "Premium" feel

const getCellId = (r, c) => `${String.fromCharCode(65 + c)}${r + 1}`;

const CelcoClient = () => {
  const [data, setData] = useState({});
  const [selection, setSelection] = useState({ r: 0, c: 0 });
  const [editing, setEditing] = useState(null);
  const [inputValue, setInputValue] = useState('');
  
  // Cell Formatting State
  const [boldCells, setBoldCells] = useState(new Set());
  const [alignment, setAlignment] = useState({}); // { cellId: 'left' | 'center' | 'right' }
  const [bgColors, setBgColors] = useState({}); // { cellId: hexColor }
  
  // AI Assistant State
  const [isAiOpen, setIsAiOpen] = useState(false);
  const [aiQuery, setAiQuery] = useState('');
  const [aiLoading, setAiLoading] = useState(false);
  const [aiHistory, setAiHistory] = useState([]);

  const gridRef = useRef(null);

  // Persistence
  useEffect(() => {
    const saved = localStorage.getItem('celco_premium_data');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setData(parsed.data || {});
        setBoldCells(new Set(parsed.bold || []));
        setAlignment(parsed.alignment || {});
        setBgColors(parsed.bgColors || {});
      } catch (e) {
        console.error('Failed to load Celco data', e);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('celco_premium_data', JSON.stringify({ 
      data, 
      bold: Array.from(boldCells),
      alignment,
      bgColors
    }));
  }, [data, boldCells, alignment, bgColors]);

  const evaluateFormula = useCallback((val, currentData) => {
    if (typeof val !== 'string' || !val.startsWith('=')) return val;
    
    try {
      let formula = val.substring(1).toUpperCase().trim();
      
      const getVal = (ref) => {
        const v = currentData[ref];
        if (!v) return 0;
        if (typeof v === 'string' && v.startsWith('=')) return evaluateFormula(v, currentData);
        return isNaN(v) ? 0 : Number(v);
      };

      const resolveArg = (arg) => {
        arg = arg.trim();
        if (arg.includes(':')) {
          const [start, end] = arg.split(':');
          const startCol = start.match(/[A-Z]+/)[0].charCodeAt(0) - 65;
          const startRow = parseInt(start.match(/\d+/)[0]) - 1;
          const endCol = end.match(/[A-Z]+/)[0].charCodeAt(0) - 65;
          const endRow = parseInt(end.match(/\d+/)[0]) - 1;
          
          const values = [];
          for (let r = Math.min(startRow, endRow); r <= Math.max(startRow, endRow); r++) {
            for (let c = Math.min(startCol, endCol); c <= Math.max(startCol, endCol); c++) {
              values.push(getVal(getCellId(r, c)));
            }
          }
          return values;
        } else if (arg.match(/^[A-Z]\d+$/)) {
          return [getVal(arg)];
        } else {
          const num = Number(arg);
          return isNaN(num) ? [0] : [num];
        }
      };

      const functions = {
        SUM: (args) => args.flat().reduce((a, b) => a + b, 0),
        AVG: (args) => {
            const vals = args.flat();
            return vals.length ? vals.reduce((a, b) => a + b, 0) / vals.length : 0;
        },
        MIN: (args) => Math.min(...args.flat()),
        MAX: (args) => Math.max(...args.flat()),
        COUNT: (args) => args.flat().filter(v => v !== 0).length,
      };

      for (const [fn, handler] of Object.entries(functions)) {
        const regex = new RegExp(`${fn}\\(([^)]+)\\)`, 'g');
        formula = formula.replace(regex, (_, argsStr) => {
          const args = argsStr.split(',').map(resolveArg);
          return handler(args);
        });
      }

      let expression = formula;
      const cellRefs = formula.match(/[A-Z]\d+/g);
      if (cellRefs) {
        const sortedRefs = [...new Set(cellRefs)].sort((a, b) => b.length - a.length);
        sortedRefs.forEach(ref => {
          const numericVal = getVal(ref);
          expression = expression.replace(new RegExp(ref, 'g'), numericVal);
        });
      }

      // Sanitization: Only allow numbers, operators, dots, parentheses, and spaces
      // If any other characters (like 'S') remain, it's an invalid formula
      if (/[^0-9+\-*/().\s]/.test(expression)) {
          return "#ERROR!";
      }

      // eslint-disable-next-line no-eval
      const result = eval(expression);
      return typeof result === 'number' ? Math.round(result * 100) / 100 : result;
    } catch (e) {
      console.error("Formula Error:", e, "Value:", val);
      return "#ERROR!";
    }
  }, []);

  const askAi = async () => {
    if (!aiQuery.trim()) return;
    setAiLoading(true);
    try {
        const res = await fetch('/api/nex-ai', {
            method: 'POST',
            body: JSON.stringify({
                messages: [{ role: 'user', content: `In a spreadsheet context, ${aiQuery}. Give me a valid formula or data suggestion. Return JSON with 'suggestion' and 'explanation'.` }],
                mode: 'coder'
            })
        });
        const result = await res.json();
        setAiHistory(prev => [...prev, { query: aiQuery, ...result }]);
        setAiQuery('');
    } catch (e) {
        console.error("AI Error", e);
    } finally {
        setAiLoading(false);
    }
  };

  const exportCSV = () => {
    let csv = "";
    // Header
    csv += "," + Array.from({ length: COLS }).map((_, c) => String.fromCharCode(65 + c)).join(",") + "\n";
    // Data
    for (let r = 0; r < ROWS; r++) {
        let row = [`${r + 1}`];
        for (let c = 0; c < COLS; c++) {
            row.push(`"${getDisplayValue(getCellId(r, c))}"`);
        }
        csv += row.join(",") + "\n";
    }
    
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", "celco_export.csv");
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const getDisplayValue = (cellId) => {
    const raw = data[cellId];
    if (raw && typeof raw === 'string' && raw.startsWith('=')) {
      return evaluateFormula(raw, data);
    }
    return raw || '';
  };

  const startEdit = (r, c) => {
    setSelection({ r, c });
    const cellId = getCellId(r, c);
    setEditing(cellId);
    setInputValue(data[cellId] || '');
  };

  const commitEdit = () => {
    if (editing) {
      setData(prev => ({ ...prev, [editing]: inputValue }));
      setEditing(null);
    }
  };

  const handleKeyDown = (e) => {
    if (editing) {
      if (e.key === 'Enter') commitEdit();
      if (e.key === 'Escape') setEditing(null);
      return;
    }

    const { r, c } = selection;
    if (e.key === 'ArrowUp') { e.preventDefault(); if (r > 0) setSelection({ r: r - 1, c }); }
    if (e.key === 'ArrowDown') { e.preventDefault(); if (r < ROWS - 1) setSelection({ r: r + 1, c }); }
    if (e.key === 'ArrowLeft') { e.preventDefault(); if (c > 0) setSelection({ r, c: c - 1 }); }
    if (e.key === 'ArrowRight') { e.preventDefault(); if (c < COLS - 1) setSelection({ r, c: c + 1 }); }
    if (e.key === 'Enter') { e.preventDefault(); startEdit(r, c); }
    if (e.key === 'Delete' || e.key === 'Backspace') {
        const cellId = getCellId(r, c);
        setData(prev => {
            const next = { ...prev };
            delete next[cellId];
            return next;
        });
    }
    if (e.key === 'b' && (e.ctrlKey || e.metaKey)) {
        const cellId = getCellId(r, c);
        setBoldCells(prev => {
            const next = new Set(prev);
            if (next.has(cellId)) next.delete(cellId);
            else next.add(cellId);
            return next;
        });
        e.preventDefault();
    }
  };

  return (
    <div className="celco-app" onKeyDown={handleKeyDown} tabIndex="0">
      {/* Background Decor */}
      <div className="bg-decor overflow-hidden pointer-events-none fixed inset-0 z-0">
          <div className="mesh-gradient opacity-20"></div>
          <div className="scanlines opacity-10"></div>
      </div>

      <div className="celco-toolbar glass z-50">
        <div className="celco-logo">CELCO</div>
        
        <div className="toolbar-section">
            <div className="section-label">Format</div>
            <div className="celco-actions">
                <button 
                    title="Bold (Ctrl+B)"
                    className={`toolbar-btn ${boldCells.has(getCellId(selection.r, selection.c)) ? 'active' : ''}`}
                    onClick={() => {
                        const cellId = getCellId(selection.r, selection.c);
                        setBoldCells(prev => {
                            const next = new Set(prev);
                            if (next.has(cellId)) next.delete(cellId);
                            else next.add(cellId);
                            return next;
                        });
                    }}
                >
                    <Bold size={16} />
                </button>
                <div className="toolbar-divider" />
                <button 
                    title="Align Left"
                    className={`toolbar-btn ${alignment[getCellId(selection.r, selection.c)] === 'left' ? 'active' : ''}`}
                    onClick={() => setAlignment(prev => ({ ...prev, [getCellId(selection.r, selection.c)]: 'left' }))}
                >
                    <AlignLeft size={16} />
                </button>
                <button 
                    title="Align Center"
                    className={`toolbar-btn ${alignment[getCellId(selection.r, selection.c)] === 'center' ? 'active' : ''}`}
                    onClick={() => setAlignment(prev => ({ ...prev, [getCellId(selection.r, selection.c)]: 'center' }))}
                >
                    <AlignCenter size={16} />
                </button>
                <button 
                    title="Align Right"
                    className={`toolbar-btn ${alignment[getCellId(selection.r, selection.c)] === 'right' ? 'active' : ''}`}
                    onClick={() => setAlignment(prev => ({ ...prev, [getCellId(selection.r, selection.c)]: 'right' }))}
                >
                    <AlignRight size={16} />
                </button>
                <div className="toolbar-divider" />
                <input 
                    type="color" 
                    title="Cell Background"
                    className="color-picker"
                    value={bgColors[getCellId(selection.r, selection.c)] || '#000000'}
                    onChange={(e) => setBgColors(prev => ({ ...prev, [getCellId(selection.r, selection.c)]: e.target.value }))}
                />
            </div>
        </div>

        <div className="formula-bar glass">
          <div className="formula-label"><Sparkles size={14} className="text-emerald-400" /> fx</div>
          <input 
            type="text" 
            value={editing === getCellId(selection.r, selection.c) ? inputValue : (data[getCellId(selection.r, selection.c)] || '')}
            onChange={(e) => {
                const val = e.target.value;
                if (editing) setInputValue(val);
                else {
                    const cellId = getCellId(selection.r, selection.c);
                    setEditing(cellId);
                    setInputValue(val);
                }
            }}
            onFocus={() => {
                const cellId = getCellId(selection.r, selection.c);
                if (!editing) {
                    setEditing(cellId);
                    setInputValue(data[cellId] || '');
                }
            }}
            onBlur={commitEdit}
            placeholder="Enter value or formula (e.g., =SUM(A1:A10))"
          />
        </div>

        <div className="toolbar-section gap-3 pl-4 border-l border-emerald-900/30">
            <button className="toolbar-btn secondary" onClick={exportCSV} title="Export CSV">
                <ArrowDownToLine size={16} />
            </button>
            <button 
                className={`toolbar-btn ai-toggle ${isAiOpen ? 'active' : ''}`} 
                onClick={() => setIsAiOpen(!isAiOpen)}
                title="Nex Intelligence"
            >
                <Zap size={16} />
                <span className="ml-2 text-xs font-bold tracking-widest">NEX AI</span>
            </button>
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden relative z-10">
        <div className="celco-grid-container" ref={gridRef}>
            <div className="celco-grid" style={{ gridTemplateColumns: `42px repeat(${COLS}, 120px)` }}>
            {/* Header row */}
            <div className="grid-header diagonal"></div>
            {Array.from({ length: COLS }).map((_, c) => (
                <div key={c} className={`grid-header col-header ${selection.c === c ? 'active' : ''}`}>
                {String.fromCharCode(65 + c)}
                </div>
            ))}

            {/* Rows */}
            {Array.from({ length: ROWS }).map((_, r) => (
                <React.Fragment key={r}>
                <div className={`grid-header row-header ${selection.r === r ? 'active' : ''}`}>
                    {r + 1}
                </div>
                {Array.from({ length: COLS }).map((_, c) => {
                    const cellId = getCellId(r, c);
                    const isSelected = selection.r === r && selection.c === c;
                    const isEditing = editing === cellId;
                    const isBold = boldCells.has(cellId);
                    const align = alignment[cellId] || 'left';
                    const bg = bgColors[cellId];

                    return (
                    <motion.div 
                        key={c} 
                        initial={false}
                        animate={{ 
                            backgroundColor: isSelected ? 'rgba(16, 185, 129, 0.15)' : (bg || 'transparent'),
                            borderColor: isSelected ? '#10b981' : (isEditing ? '#34d399' : 'rgba(16, 185, 129, 0.12)')
                        }}
                        className={`grid-cell ${isSelected ? 'selected' : ''} ${isEditing ? 'editing' : ''} ${isBold ? 'bold' : ''}`}
                        style={{ textAlign: align }}
                        onClick={() => {
                            if (editing && editing !== cellId) commitEdit();
                            setSelection({ r, c });
                        }}
                        onDoubleClick={() => startEdit(r, c)}
                    >
                        {isEditing ? (
                        <input 
                            autoFocus 
                            value={inputValue} 
                            onChange={(e) => setInputValue(e.target.value)}
                            onBlur={commitEdit}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') commitEdit();
                                if (e.key === 'Escape') setEditing(null);
                            }}
                        />
                        ) : (
                        <span className="cell-value">{getDisplayValue(cellId)}</span>
                        )}
                        {isSelected && <div className="selection-border-glow" />}
                    </motion.div>
                    );
                })}
                </React.Fragment>
            ))}
            </div>
        </div>

        {/* AI Assistant Sidebar */}
        <AnimatePresence>
            {isAiOpen && (
                <motion.div 
                    initial={{ x: '100%' }}
                    animate={{ x: 0 }}
                    exit={{ x: '100%' }}
                    transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                    className="ai-sidebar glass"
                >
                    <div className="ai-header">
                        <div className="flex items-center gap-2">
                            <Zap size={18} className="text-emerald-400" />
                            <span className="font-orbitron text-sm tracking-widest">NEX INTELLIGENCE</span>
                        </div>
                        <button onClick={() => setIsAiOpen(false)} className="hover:text-emerald-400">
                             <ChevronRight size={20} />
                        </button>
                    </div>

                    <div className="ai-content">
                        {aiHistory.length === 0 && (
                             <div className="p-6 text-center text-emerald-500/50 text-xs italic">
                                Hello. I am Nex. Ask me to generate formulas or analyze your data.
                             </div>
                        )}
                        {aiHistory.map((item, i) => (
                            <div key={i} className="ai-message glass mb-4">
                                <div className="message-query">{item.query}</div>
                                <div className="message-suggestion">
                                    <code>{item.suggestion}</code>
                                    <button 
                                        onClick={() => {
                                            setData(prev => ({ ...prev, [getCellId(selection.r, selection.c)]: item.suggestion }));
                                        }}
                                        className="apply-btn"
                                    >
                                        Apply to {getCellId(selection.r, selection.c)}
                                    </button>
                                </div>
                                <div className="message-explanation">{item.explanation}</div>
                            </div>
                        ))}
                    </div>

                    <div className="ai-footer">
                        <div className="ai-input-wrapper">
                            <input 
                                value={aiQuery}
                                onChange={(e) => setAiQuery(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && askAi()}
                                placeholder="Ask Nex..."
                            />
                            <button onClick={askAi} disabled={aiLoading}>
                                {aiLoading ? <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity }}><Settings2 size={16} /></motion.div> : <Plus size={16} />}
                            </button>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
      </div>

      <style jsx>{`
        .celco-app {
          display: flex;
          flex-direction: column;
          height: 100vh;
          background: #000;
          color: white;
          font-family: 'Inter', sans-serif;
          outline: none;
          overflow: hidden;
          position: relative;
        }

        .glass {
            background: rgba(10, 15, 10, 0.7);
            backdrop-filter: blur(20px) saturate(180%);
            border: 1px solid rgba(16, 185, 129, 0.15);
        }

        .bg-decor {
            background: radial-gradient(circle at 50% 50%, #050a05 0%, #000 100%);
        }

        .mesh-gradient {
            position: absolute;
            inset: 0;
            background-image: 
                radial-gradient(at 0% 0%, hsla(160,100%,50%,0.1) 0px, transparent 50%),
                radial-gradient(at 100% 0%, hsla(180,100%,50%,0.1) 0px, transparent 50%),
                radial-gradient(at 100% 100%, hsla(200,100%,50%,0.1) 0px, transparent 50%),
                radial-gradient(at 0% 100%, hsla(220,100%,50%,0.1) 0px, transparent 50%);
            filter: blur(80px);
        }

        .scanlines {
            position: absolute;
            inset: 0;
            background: linear-gradient(to bottom, transparent 50%, rgba(0,0,0,0.5) 50%);
            background-size: 100% 4px;
        }

        .celco-toolbar {
          height: 72px;
          display: flex;
          align-items: center;
          padding: 0 24px;
          gap: 20px;
          border-bottom: 1px solid rgba(16, 185, 129, 0.2);
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.8);
        }

        .celco-logo {
          font-family: 'Orbitron', sans-serif;
          font-size: 1.4rem;
          font-weight: 900;
          background: linear-gradient(135deg, #10b981, #fff);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          text-shadow: 0 0 20px rgba(16, 185, 129, 0.5);
          letter-spacing: 4px;
          margin-right: 10px;
        }

        .toolbar-section {
            display: flex;
            flex-direction: column;
            gap: 4px;
        }

        .section-label {
            font-size: 10px;
            color: rgba(16, 185, 129, 0.5);
            text-transform: uppercase;
            letter-spacing: 1.5px;
            font-weight: 700;
        }

        .celco-actions {
            display: flex;
            align-items: center;
            gap: 6px;
        }

        .toolbar-btn {
            width: 34px;
            height: 34px;
            border-radius: 8px;
            background: rgba(255, 255, 255, 0.03);
            border: 1px solid rgba(16, 185, 129, 0.2);
            color: rgba(255, 255, 255, 0.8);
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .toolbar-btn:hover {
            background: rgba(16, 185, 129, 0.1);
            border-color: #10b981;
            color: #fff;
            transform: translateY(-1px);
        }

        .toolbar-btn.active {
            background: #10b981;
            color: black;
            box-shadow: 0 0 15px rgba(16, 185, 129, 0.4);
            border-color: #10b981;
        }

        .toolbar-btn.ai-toggle {
            width: auto;
            padding: 0 16px;
            background: linear-gradient(135deg, rgba(16, 185, 129, 0.1), rgba(6, 78, 59, 0.1));
            border-color: #10b981;
            color: #10b981;
        }

        .toolbar-btn.ai-toggle:hover {
            background: #10b981;
            color: #000;
        }

        .toolbar-btn.ai-toggle.active {
            box-shadow: 0 0 20px rgba(16, 185, 129, 0.6);
        }

        .toolbar-divider {
            width: 1px;
            height: 20px;
            background: rgba(16, 185, 129, 0.15);
            margin: 0 4px;
        }

        .color-picker {
            width: 34px;
            height: 34px;
            padding: 0;
            border: 1px solid rgba(16, 185, 129, 0.2);
            border-radius: 8px;
            background: transparent;
            cursor: pointer;
        }

        .formula-bar {
          flex: 1;
          height: 42px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          padding: 0 18px;
          gap: 14px;
          transition: all 0.3s;
        }

        .formula-bar:focus-within {
            border-color: #10b981;
            background: rgba(0, 0, 0, 0.8);
            box-shadow: 0 0 20px rgba(16, 185, 129, 0.2);
        }

        .formula-label {
          color: #10b981;
          font-family: 'Share Tech Mono', monospace;
          font-style: italic;
          font-weight: bold;
          font-size: 1.1rem;
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .formula-bar input {
          flex: 1;
          background: transparent;
          border: none;
          color: white;
          outline: none;
          font-size: 0.95rem;
          letter-spacing: 0.5px;
        }

        .celco-grid-container {
          flex: 1;
          overflow: auto;
          position: relative;
          background: transparent;
          scrollbar-width: thin;
          scrollbar-color: rgba(16, 185, 129, 0.3) transparent;
        }

        .celco-grid {
          display: grid;
          background: rgba(16, 185, 129, 0.05);
          width: fit-content;
        }

        .grid-header {
          background: rgba(10, 15, 10, 0.9);
          backdrop-filter: blur(10px);
          border-right: 1px solid rgba(16, 185, 129, 0.1);
          border-bottom: 1px solid rgba(16, 185, 129, 0.1);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.75rem;
          font-weight: 800;
          color: rgba(16, 185, 129, 0.4);
          user-select: none;
          position: sticky;
          top: 0;
          left: 0;
          z-index: 10;
          text-transform: uppercase;
          transition: all 0.2s;
        }

        .col-header {
          height: 36px;
          z-index: 5;
        }

        .row-header {
          width: 42px;
          z-index: 5;
          position: sticky;
          left: 0;
        }

        .grid-header.active {
          background: rgba(16, 185, 129, 0.2);
          color: #10b981;
          border-color: #10b981;
        }

        .grid-cell {
          height: 36px;
          border-right: 1px solid rgba(16, 185, 129, 0.12);
          border-bottom: 1px solid rgba(16, 185, 129, 0.12);
          padding: 0 12px;
          display: flex;
          align-items: center;
          font-size: 0.9rem;
          cursor: cell;
          position: relative;
          background: transparent;
          overflow: hidden;
        }

        .grid-cell.selected {
          z-index: 2;
          box-shadow: inset 0 0 15px rgba(16, 185, 129, 0.1);
        }

        .selection-border-glow {
            position: absolute;
            inset: 0;
            border: 2px solid #10b981;
            pointer-events: none;
            box-shadow: 0 0 10px rgba(16, 185, 129, 0.4);
        }

        .grid-cell.editing {
          background: #000 !important;
          z-index: 3;
          border-color: #34d399 !important;
          box-shadow: 0 0 20px rgba(52, 211, 153, 0.3) !important;
        }

        .grid-cell input {
          width: 100%;
          height: 100%;
          background: transparent;
          border: none;
          color: white;
          outline: none;
          font-size: 0.9rem;
          padding: 0;
        }

        .grid-cell.bold .cell-value {
          font-weight: 800;
          color: #fff;
        }
        
        .cell-value {
           white-space: nowrap;
           overflow: hidden;
           text-overflow: ellipsis;
           width: 100%;
        }

        /* Sidebars */
        .ai-sidebar {
            width: 320px;
            display: flex;
            flex-direction: column;
            border-left: 1px solid rgba(16, 185, 129, 0.2);
        }

        .ai-header {
            height: 60px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 0 20px;
            border-bottom: 1px solid rgba(16, 185, 129, 0.1);
        }

        .ai-content {
            flex: 1;
            overflow-y: auto;
            padding: 20px;
        }

        .ai-message {
            padding: 15px;
            border-radius: 12px;
        }

        .message-query {
            font-size: 11px;
            color: rgba(16, 185, 129, 0.6);
            margin-bottom: 8px;
            font-style: italic;
        }

        .message-suggestion {
            display: flex;
            flex-direction: column;
            gap: 10px;
        }

        .message-suggestion code {
            display: block;
            background: rgba(0,0,0,0.5);
            padding: 10px;
            border-radius: 6px;
            font-family: 'Share Tech Mono', monospace;
            color: #10b981;
            border: 1px solid rgba(16, 185, 129, 0.2);
        }

        .apply-btn {
            background: #10b981;
            color: #000;
            border: none;
            border-radius: 6px;
            padding: 8px;
            font-size: 11px;
            font-weight: 800;
            cursor: pointer;
            text-transform: uppercase;
        }

        .message-explanation {
            font-size: 12px;
            color: rgba(255,255,255,0.7);
            margin-top: 10px;
            line-height: 1.5;
        }

        .ai-footer {
            padding: 20px;
            border-top: 1px solid rgba(16, 185, 129, 0.1);
        }

        .ai-input-wrapper {
            display: flex;
            background: rgba(0,0,0,0.5);
            border: 1px solid rgba(16, 185, 129, 0.2);
            border-radius: 10px;
            padding: 4px;
        }

        .ai-input-wrapper input {
            flex: 1;
            background: transparent;
            border: none;
            color: #fff;
            padding: 8px 12px;
            outline: none;
            font-size: 13px;
        }

        .ai-input-wrapper button {
            width: 32px;
            height: 32px;
            background: #10b981;
            color: #000;
            border: none;
            border-radius: 8px;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
        }
      `}</style>
    </div>
  );
};

export default CelcoClient;
