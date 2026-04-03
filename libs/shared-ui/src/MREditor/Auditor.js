'use client';
import { useState, useEffect } from 'react';
import { CheckCircle2, AlertTriangle, XCircle, Info, RefreshCw } from 'lucide-react';

export default function Auditor({ files }) {
    const [score, setScore] = useState(100);
    const [results, setResults] = useState([]);

    const runAudit = () => {
        const newResults = [];
        let penalty = 0;
        
        const htmlFile = files['index.html'];
        if (!htmlFile) {
            setScore(0);
            setResults([{ type: 'error', message: 'Missing index.html entry point' }]);
            return;
        }

        const html = htmlFile.content || '';

        // 1. Title Tag
        if (!/<title>.*?<\/title>/i.test(html)) {
            newResults.push({ type: 'error', message: 'Missing <title> tag. Critical for SEO.' });
            penalty += 20;
        } else {
            newResults.push({ type: 'success', message: 'Valid <title> tag found.' });
        }

        // 2. Meta Description
        if (!/<meta[^>]*name=["']description["'][^>]*>/i.test(html)) {
            newResults.push({ type: 'warning', message: 'Missing meta description. Reduces organic CTR.' });
            penalty += 15;
        } else {
            newResults.push({ type: 'success', message: 'Meta description found.' });
        }

        // 3. Image Alt Tags
        const imgTags = html.match(/<img[^>]*>/gi) || [];
        let missingAltCount = 0;
        imgTags.forEach(img => {
            if (!/alt=["'][^"']*["']/i.test(img)) missingAltCount++;
        });
        
        if (missingAltCount > 0) {
            newResults.push({ type: 'warning', message: `${missingAltCount} image(s) missing 'alt' attributes.` });
            penalty += (missingAltCount * 5);
        } else if (imgTags.length > 0) {
            newResults.push({ type: 'success', message: 'All images have alt tags.' });
        }

        // 4. H1 Element
        if (!/<h1[^>]*>.*?<\/h1>/i.test(html)) {
            newResults.push({ type: 'warning', message: 'Missing primary <h1> heading.' });
            penalty += 10;
        } else {
            newResults.push({ type: 'success', message: 'Primary <h1> heading found.' });
        }
        
        // 5. Unoptimized Inline Styles
        if (/<style[^>]*>/.test(html) && html.length > 2000) {
             newResults.push({ type: 'info', message: 'Consider moving inline `<style>` to styles.css for caching.' });
             penalty += 5;
        }

        setScore(Math.max(0, 100 - penalty));
        setResults(newResults);
    };

    useEffect(() => {
        runAudit();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [files]);

    const getColor = (s) => s > 80 ? '#00f0ff' : s > 50 ? '#ffb300' : '#ff4444';

    return (
        <div className="auditor-panel">
            <div className="auditor-header">
                <h3>SEO & PERFORMANCE</h3>
                <button onClick={runAudit} title="Re-run Audit"><RefreshCw size={14} /></button>
            </div>
            
            <div className="score-ring">
                <svg viewBox="0 0 36 36" className="circular-chart">
                    <path className="circle-bg" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                    <path className="circle" strokeDasharray={`${score}, 100`} stroke={getColor(score)} d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                    <text x="18" y="20.35" className="percentage" fill={getColor(score)}>{score}</text>
                </svg>
            </div>

            <div className="results-list custom-scrollbar">
                {results.map((r, i) => (
                    <div key={i} className={`result-item ${r.type}`}>
                        <div className="icon">
                            {r.type === 'success' && <CheckCircle2 size={14} color="#00ff80" />}
                            {r.type === 'warning' && <AlertTriangle size={14} color="#ffb300" />}
                            {r.type === 'error' && <XCircle size={14} color="#ff4444" />}
                            {r.type === 'info' && <Info size={14} color="#00f0ff" />}
                        </div>
                        <p>{r.message}</p>
                    </div>
                ))}
            </div>

            <style jsx>{`
                .auditor-panel { background: #080808; color: #fff; height: 100%; display: flex; flex-direction: column; }
                .auditor-header { display: flex; justify-content: space-between; align-items: center; padding: 12px 16px; border-bottom: 1px solid rgba(255,255,255,0.05); }
                .auditor-header h3 { font-size: 11px; letter-spacing: 1px; color: #888; margin: 0; }
                .auditor-header button { background: none; border: none; color: #666; cursor: pointer; transition: 0.2s; }
                .auditor-header button:hover { color: #00f0ff; }

                .score-ring { padding: 30px; display: flex; justify-content: center; border-bottom: 1px solid rgba(255,255,255,0.05); }
                .circular-chart { display: block; margin: 0 auto; max-width: 120px; max-height: 120px; }
                .circle-bg { fill: none; stroke: rgba(255,255,255,0.05); stroke-width: 2.5; }
                .circle { fill: none; stroke-width: 2.5; stroke-linecap: round; animation: progress 1s ease-out forwards; transition: stroke-dasharray 0.5s ease; }
                @keyframes progress { 0% { stroke-dasharray: 0 100; } }
                .percentage { font-size: 10px; font-family: 'Orbitron', sans-serif; text-anchor: middle; font-weight: bold; }

                .results-list { flex: 1; overflow-y: auto; padding: 12px; display: flex; flex-direction: column; gap: 8px; }
                .result-item { display: flex; gap: 10px; padding: 10px; background: rgba(255,255,255,0.03); border-radius: 6px; font-size: 12px; line-height: 1.4; border-left: 2px solid transparent; }
                .result-item.error { border-left-color: #ff4444; background: rgba(255,68,68,0.05); }
                .result-item.warning { border-left-color: #ffb300; background: rgba(255,179,0,0.05); }
                .result-item.success { border-left-color: #00ff80; }
                .result-item.info { border-left-color: #00f0ff; }
                .icon { margin-top: 2px; }
                .result-item p { margin: 0; color: #ccc; }
            `}</style>
        </div>
    );
}
