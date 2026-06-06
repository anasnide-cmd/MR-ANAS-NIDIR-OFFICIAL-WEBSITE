'use client';
import { useState, useEffect, useRef, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, db } from '@mr/core/firebase';
import { doc, getDoc, setDoc, collection } from 'firebase/firestore';
import {
    ChevronLeft, Save, Monitor, Smartphone, Tablet,
    Plus, Trash2, ArrowUp, ArrowDown, Code2,
    Layers, Layout, Sparkles, Grid3X3,
    FileText, Palette, Square,
    GripVertical, ChevronRight, ChevronDown, Check,
    Zap, Copy, ExternalLink, PanelLeft, PanelRight
} from 'lucide-react';
import Loader from '@mr/ui/Loader';

// â”€â”€â”€ Global CSS â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
const VISUAL_CSS = `
* { box-sizing: border-box; }

.vb {
    height: 100dvh;
    display: flex;
    flex-direction: column;
    background: #09090f;
    color: #e2e2f0;
    font-family: 'Inter', -apple-system, sans-serif;
    overflow: hidden;
}

/* â”€â”€ Navbar â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
.vb-nav {
    height: 52px;
    background: #0d0d18;
    border-bottom: 1px solid rgba(255,255,255,0.06);
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 16px;
    gap: 12px;
    flex-shrink: 0;
    z-index: 200;
}
.vb-nav-left { display: flex; align-items: center; gap: 10px; flex: 1; min-width: 0; }
.vb-nav-center { display: flex; align-items: center; }
.vb-nav-right { display: flex; align-items: center; gap: 8px; flex: 1; justify-content: flex-end; }

.vb-back {
    width: 32px; height: 32px;
    background: rgba(255,255,255,0.05);
    border: 1px solid rgba(255,255,255,0.07);
    border-radius: 8px;
    color: #888;
    cursor: pointer;
    display: flex; align-items: center; justify-content: center;
    transition: 0.15s;
    flex-shrink: 0;
}
.vb-back:hover { background: rgba(255,255,255,0.1); color: #fff; }

.vb-title-wrap { display: flex; align-items: center; gap: 8px; min-width: 0; overflow: hidden; }
.vb-title {
    background: transparent;
    border: 1px solid transparent;
    color: #e2e2f0;
    font-size: 0.88rem;
    font-weight: 600;
    outline: none;
    padding: 4px 8px;
    border-radius: 6px;
    transition: 0.15s;
    max-width: 200px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
.vb-title:hover { border-color: rgba(255,255,255,0.1); }
.vb-title:focus { border-color: rgba(99,102,241,0.5); background: rgba(99,102,241,0.05); }
.vb-draft {
    font-size: 0.6rem;
    font-weight: 700;
    letter-spacing: 1px;
    color: #666;
    background: rgba(255,255,255,0.04);
    padding: 2px 7px;
    border-radius: 4px;
    border: 1px solid rgba(255,255,255,0.06);
    flex-shrink: 0;
}

/* Viewport Toggle */
.viewport-toggle {
    display: flex;
    background: rgba(255,255,255,0.03);
    border: 1px solid rgba(255,255,255,0.06);
    border-radius: 10px;
    padding: 3px;
    gap: 2px;
}
.vt-btn {
    width: 32px; height: 28px;
    background: transparent;
    border: none;
    border-radius: 7px;
    color: #555;
    cursor: pointer;
    display: flex; align-items: center; justify-content: center;
    transition: 0.15s;
}
.vt-btn:hover { color: #999; background: rgba(255,255,255,0.05); }
.vt-active { background: rgba(99,102,241,0.15) !important; color: #818cf8 !important; }

.vb-icon-btn {
    width: 32px; height: 32px;
    background: rgba(255,255,255,0.04);
    border: 1px solid rgba(255,255,255,0.07);
    border-radius: 8px;
    color: #666;
    cursor: pointer;
    display: flex; align-items: center; justify-content: center;
    transition: 0.15s;
}
.vb-icon-btn:hover { color: #aaa; background: rgba(255,255,255,0.08); }

.vb-btn-outline {
    display: flex; align-items: center; gap: 6px;
    padding: 0 12px; height: 32px;
    background: rgba(255,255,255,0.04);
    border: 1px solid rgba(255,255,255,0.08);
    border-radius: 8px;
    color: #aaa;
    font-size: 0.78rem;
    font-weight: 600;
    cursor: pointer;
    text-decoration: none;
    transition: 0.15s;
    white-space: nowrap;
}
.vb-btn-outline:hover { background: rgba(255,255,255,0.08); color: #e2e2f0; border-color: rgba(255,255,255,0.15); }

.vb-btn-save {
    display: flex; align-items: center; gap: 6px;
    padding: 0 16px; height: 32px;
    background: #6366f1;
    border: none;
    border-radius: 8px;
    color: #fff;
    font-size: 0.78rem;
    font-weight: 700;
    cursor: pointer;
    transition: 0.15s;
    white-space: nowrap;
}
.vb-btn-save:hover { background: #5558e8; box-shadow: 0 0 0 3px rgba(99,102,241,0.25); }
.vb-btn-save:disabled { opacity: 0.5; cursor: not-allowed; }

/* â”€â”€ Body Layout â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
.vb-body {
    flex: 1;
    display: flex;
    overflow: hidden;
    position: relative;
}

/* â”€â”€ Left Panel â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
.vb-left {
    width: 240px;
    background: #0d0d18;
    border-right: 1px solid rgba(255,255,255,0.06);
    display: flex;
    flex-direction: column;
    flex-shrink: 0;
    transition: width 0.25s ease, opacity 0.25s ease;
    overflow: hidden;
}
.vb-left-hidden { width: 0; opacity: 0; pointer-events: none; }

.lp-tabs {
    display: flex;
    padding: 8px;
    gap: 4px;
    border-bottom: 1px solid rgba(255,255,255,0.05);
}
.lp-tab {
    flex: 1;
    display: flex; align-items: center; justify-content: center; gap: 6px;
    padding: 7px;
    background: transparent;
    border: none;
    border-radius: 7px;
    color: #555;
    font-size: 0.75rem;
    font-weight: 600;
    cursor: pointer;
    transition: 0.15s;
}
.lp-tab:hover { color: #aaa; background: rgba(255,255,255,0.04); }
.lp-tab-active { background: rgba(99,102,241,0.12) !important; color: #818cf8 !important; }

.lp-layers { flex: 1; overflow-y: auto; padding: 6px; }
.lp-empty {
    padding: 40px 16px;
    text-align: center;
    color: #444;
    font-size: 0.8rem;
    line-height: 1.6;
}

.layer-item {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 9px 10px;
    border-radius: 8px;
    cursor: pointer;
    transition: 0.1s;
    margin-bottom: 2px;
    border: 1px solid transparent;
}
.layer-item:hover { background: rgba(255,255,255,0.04); }
.layer-active { background: rgba(99,102,241,0.1) !important; border-color: rgba(99,102,241,0.25) !important; }
.layer-grip { color: #333; flex-shrink: 0; }
.layer-dot { width: 8px; height: 8px; border-radius: 50%; flex-shrink: 0; display: inline-block; }
.layer-label { flex: 1; font-size: 0.8rem; font-weight: 500; color: #bbb; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.layer-active .layer-label { color: #e2e2f0; }
.layer-acts { display: flex; gap: 2px; opacity: 0; transition: 0.15s; }
.layer-item:hover .layer-acts { opacity: 1; }
.layer-btn {
    width: 22px; height: 22px;
    background: transparent;
    border: none;
    border-radius: 4px;
    color: #555;
    cursor: pointer;
    display: flex; align-items: center; justify-content: center;
    transition: 0.1s;
}
.layer-btn:hover { background: rgba(255,255,255,0.06); color: #ccc; }
.layer-btn:disabled { opacity: 0.2; cursor: not-allowed; }
.layer-del:hover { color: #f87171 !important; background: rgba(248,113,113,0.08) !important; }

.lp-widgets { flex: 1; overflow-y: auto; padding: 8px; }
.lp-widgets-label { font-size: 0.65rem; font-weight: 700; letter-spacing: 0.8px; color: #444; text-transform: uppercase; padding: 6px 10px 4px; }
.wb-card {
    width: 100%;
    display: flex; align-items: center; gap: 10px;
    padding: 10px 12px;
    background: rgba(255,255,255,0.02);
    border: 1px solid rgba(255,255,255,0.05);
    border-radius: 10px;
    color: #bbb;
    cursor: pointer;
    transition: 0.15s;
    margin-bottom: 5px;
    text-align: left;
}
.wb-card:hover { background: rgba(99,102,241,0.07); border-color: rgba(99,102,241,0.25); color: #e2e2f0; }
.wb-icon {
    width: 34px; height: 34px;
    display: flex; align-items: center; justify-content: center;
    border-radius: 8px;
    flex-shrink: 0;
}
.wb-text { flex: 1; min-width: 0; }
.wb-text strong { display: block; font-size: 0.8rem; font-weight: 600; margin-bottom: 1px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.wb-text span { font-size: 0.7rem; color: #555; white-space: nowrap; }
.wb-plus { color: #444; flex-shrink: 0; }
.wb-card:hover .wb-plus { color: #818cf8; }

/* â”€â”€ Canvas â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
.vb-canvas {
    flex: 1;
    overflow: hidden;
    position: relative;
    background: #0b0b14;
    background-image: radial-gradient(circle, rgba(255,255,255,0.04) 1px, transparent 1px);
    background-size: 24px 24px;
}
.canvas-scroll {
    height: 100%;
    overflow-y: auto;
    overflow-x: auto;
    padding: 40px 24px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 12px;
}
.canvas-frame {
    background: #000;
    border-radius: 12px;
    box-shadow: 0 0 0 1px rgba(255,255,255,0.06), 0 30px 80px rgba(0,0,0,0.8);
    overflow: hidden;
    min-height: 200px;
    transition: width 0.3s cubic-bezier(0.4,0,0.2,1);
    position: relative;
    width: 100%;
    max-width: 1280px;
}
.canvas-frame.viewport-tablet { width: 768px !important; max-width: 768px; }
.canvas-frame.viewport-mobile { width: 390px !important; max-width: 390px; }

.canvas-empty {
    display: flex; flex-direction: column; align-items: center; justify-content: center;
    padding: 120px 40px;
    text-align: center;
    color: #333;
}
.canvas-empty h3 { font-size: 1.1rem; font-weight: 600; color: #444; margin-bottom: 8px; }
.canvas-empty p { font-size: 0.85rem; color: #333; line-height: 1.6; }
.canvas-empty strong { color: #555; }

.viewport-label {
    font-size: 0.65rem;
    font-weight: 600;
    letter-spacing: 0.5px;
    color: #333;
    text-transform: uppercase;
    margin-top: 4px;
    padding-bottom: 24px;
}

/* â”€â”€ Canvas Section Styles â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
.cs-wrap {
    position: relative;
    cursor: pointer;
    border: 2px solid transparent;
    transition: border-color 0.15s;
}
.cs-wrap:hover { border-color: rgba(99,102,241,0.4); }
.cs-selected { border-color: #6366f1 !important; }

.cs-toolbar {
    position: absolute;
    top: 8px; left: 8px; right: 8px;
    display: flex; align-items: center; justify-content: space-between;
    opacity: 0;
    transition: 0.15s;
    z-index: 50;
    pointer-events: none;
}
.cs-wrap:hover .cs-toolbar,
.cs-selected .cs-toolbar { opacity: 1; pointer-events: auto; }

.cs-badge {
    font-size: 0.6rem;
    font-weight: 800;
    letter-spacing: 0.8px;
    padding: 3px 8px;
    border-radius: 5px;
    border: 1px solid;
    background: rgba(0,0,0,0.85);
    backdrop-filter: blur(8px);
    text-transform: uppercase;
}
.cs-actions {
    display: flex;
    gap: 3px;
    background: rgba(0,0,0,0.85);
    backdrop-filter: blur(8px);
    padding: 4px;
    border-radius: 8px;
    border: 1px solid rgba(255,255,255,0.08);
}
.cs-btn {
    width: 26px; height: 26px;
    background: transparent;
    border: none;
    border-radius: 5px;
    color: #888;
    cursor: pointer;
    display: flex; align-items: center; justify-content: center;
    transition: 0.1s;
}
.cs-btn:hover:not(:disabled) { background: rgba(255,255,255,0.1); color: #fff; }
.cs-btn:disabled { opacity: 0.25; cursor: not-allowed; }
.cs-btn-danger:hover { background: rgba(248,113,113,0.15) !important; color: #f87171 !important; }

/* Section Renders */
.cr-navbar { display: flex; align-items: center; justify-content: space-between; padding: 20px 36px; }
.cr-brand { font-weight: 900; font-size: 1rem; letter-spacing: 2px; }
.cr-links { display: flex; gap: 20px; font-size: 0.82rem; font-weight: 500; opacity: 0.8; }

.cr-hero { padding: 70px 36px; text-align: center; display: flex; flex-direction: column; align-items: center; }
.cr-hero-title { font-size: clamp(1.8rem, 4vw, 3rem); font-weight: 900; letter-spacing: -0.5px; margin-bottom: 16px; line-height: 1.15; }
.cr-hero-sub { font-size: 0.95rem; opacity: 0.65; max-width: 500px; margin-bottom: 28px; line-height: 1.6; }
.cr-btn { padding: 12px 28px; border-radius: 50px; font-weight: 700; font-size: 0.85rem; display: inline-block; }

.cr-features { padding: 60px 36px; text-align: center; }
.cr-sec-title { font-size: 1.6rem; font-weight: 800; margin-bottom: 32px; letter-spacing: -0.3px; }
.cr-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 16px; }
.cr-card { padding: 24px 20px; border-radius: 14px; border: 1px solid; text-align: left; }
.cr-icon { font-size: 1.6rem; display: block; margin-bottom: 12px; }
.cr-card strong { display: block; font-size: 0.9rem; font-weight: 700; margin-bottom: 6px; }
.cr-card p { font-size: 0.78rem; opacity: 0.6; line-height: 1.5; margin: 0; }

.cr-cta { padding: 70px 36px; text-align: center; display: flex; flex-direction: column; align-items: center; }
.cr-cta-title { font-size: 2rem; font-weight: 900; margin-bottom: 12px; }
.cr-cta-sub { font-size: 0.9rem; margin-bottom: 28px; max-width: 420px; }

.cr-text { padding: 50px 36px; }
.cr-text h3 { font-size: 1.4rem; font-weight: 800; margin-bottom: 12px; }
.cr-text p { font-size: 0.88rem; opacity: 0.7; line-height: 1.7; }

.cr-footer { padding: 30px 36px; text-align: center; border-top: 1px solid rgba(255,255,255,0.04); }
.cr-footer p { font-size: 0.78rem; }

/* â”€â”€ Right Panel â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
.vb-right {
    width: 280px;
    background: #0d0d18;
    border-left: 1px solid rgba(255,255,255,0.06);
    display: flex;
    flex-direction: column;
    flex-shrink: 0;
    transition: width 0.25s ease, opacity 0.25s ease;
    overflow: hidden;
}
.vb-right-hidden { width: 0; opacity: 0; pointer-events: none; }

.rp-header {
    display: flex; align-items: center; justify-content: space-between;
    padding: 12px 16px;
    border-bottom: 1px solid rgba(255,255,255,0.05);
    flex-shrink: 0;
}
.rp-title { font-size: 0.78rem; font-weight: 700; letter-spacing: 0.3px; color: #888; text-transform: uppercase; }
.rp-close {
    background: none; border: none;
    color: #555; font-size: 1.3rem; cursor: pointer;
    width: 24px; height: 24px;
    display: flex; align-items: center; justify-content: center;
    border-radius: 5px; transition: 0.1s;
}
.rp-close:hover { background: rgba(255,255,255,0.06); color: #fff; }

.props-empty {
    flex: 1;
    display: flex; flex-direction: column; align-items: center; justify-content: center;
    padding: 40px 24px;
    text-align: center;
    color: #444;
    font-size: 0.8rem;
    line-height: 1.6;
}
.props-scroll { flex: 1; overflow-y: auto; }
.props-section-tag {
    font-size: 0.6rem;
    font-weight: 800;
    letter-spacing: 1.5px;
    text-transform: uppercase;
    padding: 10px 16px 6px;
    border-bottom: 1px solid rgba(255,255,255,0.04);
}

.prop-section { border-bottom: 1px solid rgba(255,255,255,0.04); }
.prop-section-header {
    width: 100%;
    display: flex; align-items: center; justify-content: space-between;
    padding: 11px 16px;
    background: none; border: none;
    color: #888;
    font-size: 0.73rem;
    font-weight: 700;
    letter-spacing: 0.3px;
    cursor: pointer;
    transition: 0.1s;
    text-transform: uppercase;
}
.prop-section-header:hover { background: rgba(255,255,255,0.03); color: #bbb; }
.prop-section-body { padding: 12px 16px; display: flex; flex-direction: column; gap: 12px; }

.prop-field { display: flex; flex-direction: column; gap: 5px; }
.prop-label { font-size: 0.68rem; font-weight: 600; letter-spacing: 0.3px; color: #555; text-transform: uppercase; }
.prop-input {
    background: rgba(255,255,255,0.04);
    border: 1px solid rgba(255,255,255,0.07);
    border-radius: 7px;
    padding: 8px 10px;
    color: #e2e2f0;
    font-size: 0.82rem;
    font-family: Inter, -apple-system, sans-serif;
    outline: none;
    width: 100%;
    transition: 0.15s;
    resize: vertical;
    min-height: 36px;
}
.prop-input:focus { border-color: rgba(99,102,241,0.5); background: rgba(99,102,241,0.04); }
.prop-input::placeholder { color: #444; }
textarea.prop-input { min-height: 72px; }
select.prop-input { cursor: pointer; }

.color-row { display: flex; gap: 8px; align-items: center; }
.color-swatch {
    width: 36px; height: 36px;
    padding: 2px;
    background: rgba(255,255,255,0.04);
    border: 1px solid rgba(255,255,255,0.1);
    border-radius: 7px;
    cursor: pointer;
    flex-shrink: 0;
}
.color-swatch::-webkit-color-swatch-wrapper { padding: 0; border-radius: 5px; }
.color-swatch::-webkit-color-swatch { border: none; border-radius: 5px; }
.color-text { flex: 1; font-family: 'Courier New', monospace; font-size: 0.78rem; }

.link-row { display: flex; gap: 6px; align-items: center; margin-bottom: 6px; }
.link-row .prop-input { flex: 1; }
.link-del {
    width: 30px; height: 30px;
    background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.06);
    border-radius: 6px; color: #666; cursor: pointer;
    display: flex; align-items: center; justify-content: center;
    transition: 0.1s; flex-shrink: 0;
}
.link-del:hover { background: rgba(248,113,113,0.1); color: #f87171; border-color: rgba(248,113,113,0.2); }

.add-link-btn {
    display: flex; align-items: center; gap: 6px;
    width: 100%; padding: 8px 10px;
    background: rgba(99,102,241,0.06);
    border: 1px dashed rgba(99,102,241,0.2);
    border-radius: 7px;
    color: #6366f1;
    font-size: 0.75rem;
    font-weight: 600;
    cursor: pointer;
    transition: 0.15s;
}
.add-link-btn:hover { background: rgba(99,102,241,0.12); border-color: rgba(99,102,241,0.4); }

.feature-item-edit {
    background: rgba(255,255,255,0.02);
    border: 1px solid rgba(255,255,255,0.05);
    border-radius: 9px;
    padding: 10px;
    display: flex; flex-direction: column; gap: 8px;
    margin-bottom: 8px;
}
.feature-item-header { display: flex; align-items: center; justify-content: space-between; }
.feature-item-idx { font-size: 0.65rem; font-weight: 700; color: #444; }
.prop-row { display: flex; gap: 6px; }
.icon-input { width: 50px !important; text-align: center; }

/* â”€â”€ Toast â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
.vb-toast {
    position: fixed;
    bottom: 24px; right: 24px;
    background: #22c55e;
    color: #000;
    padding: 10px 18px;
    border-radius: 10px;
    font-size: 0.8rem;
    font-weight: 700;
    display: flex; align-items: center; gap: 8px;
    box-shadow: 0 8px 24px rgba(0,0,0,0.5);
    animation: slideInToast 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
    z-index: 9999;
}
.vb-toast-error { background: #ef4444; color: #fff; }
@keyframes slideInToast {
    from { transform: translateY(20px); opacity: 0; }
    to { transform: translateY(0); opacity: 1; }
}

/* â”€â”€ Scrollbars â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
.lp-layers::-webkit-scrollbar,
.lp-widgets::-webkit-scrollbar,
.props-scroll::-webkit-scrollbar,
.canvas-scroll::-webkit-scrollbar { width: 4px; }
.lp-layers::-webkit-scrollbar-track,
.lp-widgets::-webkit-scrollbar-track,
.props-scroll::-webkit-scrollbar-track,
.canvas-scroll::-webkit-scrollbar-track { background: transparent; }
.lp-layers::-webkit-scrollbar-thumb,
.lp-widgets::-webkit-scrollbar-thumb,
.props-scroll::-webkit-scrollbar-thumb,
.canvas-scroll::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.08); border-radius: 4px; }

/* â”€â”€ Mobile â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
@media (max-width: 900px) {
    .vb-left { position: absolute; left: 0; top: 0; bottom: 0; z-index: 150; box-shadow: 4px 0 30px rgba(0,0,0,0.6); }
    .vb-right { position: absolute; right: 0; top: 0; bottom: 0; z-index: 150; box-shadow: -4px 0 30px rgba(0,0,0,0.6); }
    .vb-btn-outline span, .vb-btn-save span { display: none; }
    .vb-draft { display: none; }
    .vb-title { max-width: 120px; }
}
`;

// â”€â”€â”€ Section Templates â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

const DEFAULT_SECTIONS = [
    {
        id: 'navbar-default',
        type: 'navbar',
        brand: 'MY BRAND',
        bg: '#0a0a0f',
        color: '#ffffff',
        accentColor: '#6366f1',
        links: [
            { text: 'Home', url: '#' },
            { text: 'About', url: '#about' },
            { text: 'Contact', url: '#contact' }
        ]
    },
    {
        id: 'hero-default',
        type: 'hero',
        title: 'Build Something Amazing',
        subtitle: 'A modern, fast, and beautiful website â€” crafted visually without a single line of code.',
        buttonText: 'Get Started',
        buttonUrl: '#',
        buttonBg: '#6366f1',
        buttonColor: '#ffffff',
        bg: '#0d0d16',
        color: '#ffffff',
        gradientFrom: '#6366f1',
        gradientTo: '#8b5cf6'
    },
    {
        id: 'features-default',
        type: 'features',
        title: 'Why Choose Us',
        bg: '#0a0a0f',
        color: '#ffffff',
        cardBg: '#12121a',
        cardBorder: 'rgba(99,102,241,0.15)',
        accentColor: '#6366f1',
        items: [
            { icon: 'âš¡', title: 'Lightning Fast', desc: 'Optimized performance from the ground up.' },
            { icon: 'ðŸŽ¨', title: 'Beautiful Design', desc: 'Stunning visuals that captivate your audience.' },
            { icon: 'ðŸ“±', title: 'Fully Responsive', desc: 'Looks perfect on every screen size.' }
        ]
    },
    {
        id: 'footer-default',
        type: 'footer',
        text: 'Â© 2026 My Brand. All rights reserved.',
        bg: '#07070d',
        color: '#555577'
    }
];

// â”€â”€â”€ Code Compiler â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

function compileVisualToCode(sections, name) {
    let html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${name || 'My Website'}</title>
    <link rel="stylesheet" href="styles.css">
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap" rel="stylesheet">
</head>
<body>
`;
    sections.forEach(sec => {
        if (sec.type === 'navbar') {
            html += `<nav class="navbar" style="background:${sec.bg};color:${sec.color};">
  <div class="brand" style="color:${sec.accentColor || sec.color};">${sec.brand}</div>
  <div class="nav-links">${sec.links.map(l => `<a href="${l.url}" style="color:${sec.color};">${l.text}</a>`).join('')}</div>
</nav>\n`;
        } else if (sec.type === 'hero') {
            html += `<header class="hero" style="background:${sec.bg};color:${sec.color};">
  <h1 class="hero-title" style="background:linear-gradient(135deg,${sec.gradientFrom || sec.color},${sec.gradientTo || sec.color});-webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent;">${sec.title}</h1>
  <p class="hero-subtitle">${sec.subtitle}</p>
  <a href="${sec.buttonUrl}" class="btn-primary" style="background:${sec.buttonBg};color:${sec.buttonColor};">${sec.buttonText}</a>
</header>\n`;
        } else if (sec.type === 'features') {
            html += `<section class="features" style="background:${sec.bg};color:${sec.color};">
  <h2 class="section-title">${sec.title}</h2>
  <div class="grid">${sec.items.map(i => `<div class="card" style="background:${sec.cardBg};border-color:${sec.cardBorder};">
    <div class="card-icon">${i.icon}</div>
    <h3>${i.title}</h3>
    <p>${i.desc}</p>
  </div>`).join('')}</div>
</section>\n`;
        } else if (sec.type === 'rich_text') {
            html += `<section class="text-sec" style="background:${sec.bg};color:${sec.color};text-align:${sec.align || 'left'};">
  <h2>${sec.title}</h2>
  <p>${sec.content}</p>
</section>\n`;
        } else if (sec.type === 'cta') {
            html += `<section class="cta-sec" style="background:${sec.bg};color:${sec.color};">
  <h2>${sec.title}</h2>
  <p>${sec.subtitle}</p>
  <a href="${sec.buttonUrl}" class="btn-primary" style="background:${sec.buttonBg};color:${sec.buttonColor};">${sec.buttonText}</a>
</section>\n`;
        } else if (sec.type === 'footer') {
            html += `<footer class="footer" style="background:${sec.bg};color:${sec.color};">
  <p>${sec.text}</p>
</footer>\n`;
        }
    });
    html += `</body>\n</html>`;

    const css = `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:'Inter',sans-serif;line-height:1.6;overflow-x:hidden}
a{text-decoration:none}
.navbar{display:flex;justify-content:space-between;align-items:center;padding:20px 60px;position:sticky;top:0;z-index:100;backdrop-filter:blur(10px);}
.brand{font-weight:900;font-size:1.2rem;letter-spacing:2px}
.nav-links{display:flex;gap:28px;font-weight:500;font-size:.9rem}
.nav-links a:hover{opacity:.7}
.hero{padding:120px 60px;text-align:center;display:flex;flex-direction:column;align-items:center;min-height:100vh;justify-content:center;}
.hero-title{font-size:clamp(2.5rem,6vw,5rem);font-weight:900;letter-spacing:-1px;line-height:1.1;margin-bottom:24px}
.hero-subtitle{font-size:1.2rem;opacity:.7;max-width:600px;margin-bottom:40px;line-height:1.7}
.btn-primary{padding:16px 40px;border-radius:50px;font-weight:700;font-size:1rem;transition:.2s;display:inline-block;}
.btn-primary:hover{transform:translateY(-2px);box-shadow:0 10px 30px rgba(0,0,0,.3)}
.features{padding:100px 60px;text-align:center}
.section-title{font-size:2.5rem;font-weight:800;margin-bottom:60px;letter-spacing:-0.5px}
.grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(250px,1fr));gap:28px;max-width:1100px;margin:0 auto}
.card{padding:36px 28px;border-radius:20px;border:1px solid;text-align:left;transition:.3s;}
.card:hover{transform:translateY(-5px)}
.card-icon{font-size:2.2rem;margin-bottom:20px}
.card h3{font-size:1.2rem;font-weight:700;margin-bottom:10px}
.card p{font-size:.9rem;opacity:.6;line-height:1.6}
.text-sec{padding:80px 60px;max-width:800px;margin:0 auto}
.text-sec h2{font-size:2rem;font-weight:800;margin-bottom:20px}
.text-sec p{opacity:.75;font-size:1.05rem;line-height:1.8}
.cta-sec{padding:100px 60px;text-align:center}
.cta-sec h2{font-size:2.8rem;font-weight:900;margin-bottom:20px}
.cta-sec p{font-size:1.1rem;opacity:.7;margin-bottom:40px}
.footer{padding:50px 60px;text-align:center;border-top:1px solid rgba(255,255,255,.06)}
.footer p{font-size:.85rem;opacity:.5}
@media(max-width:768px){
  .navbar{padding:16px 24px;flex-direction:column;gap:16px}
  .hero{padding:80px 24px}
  .features{padding:60px 24px}
  .section-title{font-size:1.8rem}
  .btn-primary{padding:14px 32px}
}`;

    return {
        'index.html': { content: html, language: 'html' },
        'styles.css': { content: css, language: 'css' }
    };
}

// â”€â”€â”€ Live Preview HTML Generator â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

function buildPreviewHtml(sections, name) {
    const files = compileVisualToCode(sections, name);
    const css = files['styles.css'].content;
    const bodyMatch = files['index.html'].content.match(/<body>([\s\S]*?)<\/body>/);
    const bodyContent = bodyMatch ? bodyMatch[1] : '';
    return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${name}</title>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap" rel="stylesheet">
<style>${css}</style>
</head>
<body>${bodyContent}</body>
</html>`;
}

// â”€â”€â”€ Section Blueprints â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

const WIDGET_BLUEPRINTS = [
    {
        type: 'navbar',
        label: 'Navigation Bar',
        desc: 'Logo + links header',
        icon: Layout,
        color: '#6366f1',
        create: () => ({
            brand: 'MY BRAND', bg: '#0a0a0f', color: '#ffffff', accentColor: '#6366f1',
            links: [{ text: 'Home', url: '#' }, { text: 'About', url: '#' }, { text: 'Contact', url: '#' }]
        })
    },
    {
        type: 'hero',
        label: 'Hero Section',
        desc: 'Big headline callout',
        icon: Sparkles,
        color: '#8b5cf6',
        create: () => ({
            title: 'Your Headline Here', subtitle: 'A compelling subtitle that tells your story.',
            buttonText: 'Get Started', buttonUrl: '#',
            buttonBg: '#6366f1', buttonColor: '#fff',
            bg: '#0d0d16', color: '#ffffff',
            gradientFrom: '#6366f1', gradientTo: '#8b5cf6'
        })
    },
    {
        type: 'features',
        label: 'Feature Cards',
        desc: 'Grid of feature items',
        icon: Grid3X3,
        color: '#06b6d4',
        create: () => ({
            title: 'Key Features', bg: '#0a0a0f', color: '#ffffff',
            cardBg: '#12121a', cardBorder: 'rgba(99,102,241,0.15)', accentColor: '#6366f1',
            items: [
                { icon: 'ðŸš€', title: 'Fast', desc: 'Blazing fast performance.' },
                { icon: 'ðŸ’Ž', title: 'Premium', desc: 'High quality design standards.' },
                { icon: 'ðŸ”’', title: 'Secure', desc: 'Enterprise-grade security.' }
            ]
        })
    },
    {
        type: 'cta',
        label: 'Call to Action',
        desc: 'Conversion-focused block',
        icon: Zap,
        color: '#f59e0b',
        create: () => ({
            title: 'Ready to Get Started?', subtitle: 'Join thousands of happy customers today.',
            buttonText: 'Start Now', buttonUrl: '#',
            buttonBg: '#f59e0b', buttonColor: '#000',
            bg: '#0d0d16', color: '#ffffff'
        })
    },
    {
        type: 'rich_text',
        label: 'Rich Text',
        desc: 'Heading + paragraph',
        icon: FileText,
        color: '#10b981',
        create: () => ({
            title: 'About Us', content: 'Write your content here. This section supports rich text and can be styled to match your brand.',
            bg: '#0a0a0f', color: '#ffffff', align: 'left'
        })
    },
    {
        type: 'footer',
        label: 'Footer',
        desc: 'Bottom copyright bar',
        icon: Square,
        color: '#64748b',
        create: () => ({
            text: 'Â© 2026 My Brand. All rights reserved.',
            bg: '#07070d', color: '#555577'
        })
    }
];

// â”€â”€â”€ Section Type Labels â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

const TYPE_META = Object.fromEntries(WIDGET_BLUEPRINTS.map(w => [w.type, w]));

// â”€â”€â”€ Property Panel Components â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

function PropInput({ label, value, onChange, type = 'text', placeholder = '' }) {
    return (
        <div className="prop-field">
            <label className="prop-label">{label}</label>
            {type === 'textarea' ? (
                <textarea className="prop-input" value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} />
            ) : type === 'color' ? (
                <div className="color-row">
                    <input type="color" className="color-swatch" value={value} onChange={e => onChange(e.target.value)} />
                    <input type="text" className="prop-input color-text" value={value} onChange={e => onChange(e.target.value)} />
                </div>
            ) : (
                <input type={type} className="prop-input" value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} />
            )}
        </div>
    );
}

function PropSelect({ label, value, onChange, options }) {
    return (
        <div className="prop-field">
            <label className="prop-label">{label}</label>
            <select className="prop-input" value={value} onChange={e => onChange(e.target.value)}>
                {options.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
            </select>
        </div>
    );
}

function PropSection({ title, children, defaultOpen = true }) {
    const [open, setOpen] = useState(defaultOpen);
    return (
        <div className="prop-section">
            <button className="prop-section-header" onClick={() => setOpen(!open)}>
                <span>{title}</span>
                {open ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
            </button>
            {open && <div className="prop-section-body">{children}</div>}
        </div>
    );
}

// â”€â”€â”€ Properties Panel â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

function PropertiesPanel({ section, onChange }) {
    if (!section) {
        return (
            <div className="props-empty">
                <Layers size={28} style={{ opacity: 0.2, marginBottom: 12 }} />
                <p>Select a section on the canvas to edit its properties</p>
            </div>
        );
    }

    const set = (key, val) => onChange({ [key]: val });

    return (
        <div className="props-scroll">
            <div className="props-section-tag" style={{ color: TYPE_META[section.type]?.color || '#888' }}>
                {TYPE_META[section.type]?.label || section.type.toUpperCase()}
            </div>

            <PropSection title="Colors">
                <PropInput label="Background" value={section.bg || '#000000'} onChange={v => set('bg', v)} type="color" />
                <PropInput label="Text Color" value={section.color || '#ffffff'} onChange={v => set('color', v)} type="color" />
                {section.accentColor !== undefined && (
                    <PropInput label="Accent Color" value={section.accentColor} onChange={v => set('accentColor', v)} type="color" />
                )}
            </PropSection>

            {section.type === 'navbar' && (
                <PropSection title="Navigation">
                    <PropInput label="Brand Name" value={section.brand} onChange={v => set('brand', v)} placeholder="MY BRAND" />
                    <div className="prop-label" style={{ marginBottom: 8 }}>Navigation Links</div>
                    {section.links.map((link, idx) => (
                        <div key={idx} className="link-row">
                            <input
                                className="prop-input"
                                type="text"
                                value={link.text}
                                placeholder="Label"
                                onChange={e => {
                                    const nl = [...section.links];
                                    nl[idx] = { ...nl[idx], text: e.target.value };
                                    onChange({ links: nl });
                                }}
                            />
                            <input
                                className="prop-input"
                                type="text"
                                value={link.url}
                                placeholder="URL"
                                onChange={e => {
                                    const nl = [...section.links];
                                    nl[idx] = { ...nl[idx], url: e.target.value };
                                    onChange({ links: nl });
                                }}
                            />
                            <button className="link-del" onClick={() => {
                                onChange({ links: section.links.filter((_, i) => i !== idx) });
                            }}><Trash2 size={12} /></button>
                        </div>
                    ))}
                    <button className="add-link-btn" onClick={() => onChange({ links: [...section.links, { text: 'Link', url: '#' }] })}>
                        <Plus size={12} /> Add Link
                    </button>
                </PropSection>
            )}

            {(section.type === 'hero' || section.type === 'cta') && (
                <PropSection title="Content">
                    <PropInput label="Heading" value={section.title} onChange={v => set('title', v)} />
                    <PropInput label="Subtitle" value={section.subtitle} onChange={v => set('subtitle', v)} type="textarea" />
                    <PropInput label="Button Text" value={section.buttonText} onChange={v => set('buttonText', v)} />
                    <PropInput label="Button URL" value={section.buttonUrl} onChange={v => set('buttonUrl', v)} placeholder="https://" />
                </PropSection>
            )}

            {(section.type === 'hero' || section.type === 'cta') && (
                <PropSection title="Button Colors" defaultOpen={false}>
                    <PropInput label="Button Background" value={section.buttonBg} onChange={v => set('buttonBg', v)} type="color" />
                    <PropInput label="Button Text" value={section.buttonColor} onChange={v => set('buttonColor', v)} type="color" />
                </PropSection>
            )}

            {section.type === 'hero' && (
                <PropSection title="Gradient" defaultOpen={false}>
                    <PropInput label="Gradient From" value={section.gradientFrom || '#6366f1'} onChange={v => set('gradientFrom', v)} type="color" />
                    <PropInput label="Gradient To" value={section.gradientTo || '#8b5cf6'} onChange={v => set('gradientTo', v)} type="color" />
                </PropSection>
            )}

            {section.type === 'features' && (
                <PropSection title="Content">
                    <PropInput label="Section Title" value={section.title} onChange={v => set('title', v)} />
                    <PropInput label="Card Background" value={section.cardBg} onChange={v => set('cardBg', v)} type="color" />
                    <div className="prop-label" style={{ marginTop: 8, marginBottom: 8 }}>Feature Items</div>
                    {section.items.map((item, idx) => (
                        <div key={idx} className="feature-item-edit">
                            <div className="feature-item-header">
                                <span className="feature-item-idx">#{idx + 1}</span>
                                <button className="link-del" onClick={() => onChange({ items: section.items.filter((_, i) => i !== idx) })}>
                                    <Trash2 size={11} />
                                </button>
                            </div>
                            <div className="prop-row">
                                <input className="prop-input icon-input" type="text" value={item.icon} placeholder="ðŸš€"
                                    onChange={e => {
                                        const ni = [...section.items];
                                        ni[idx] = { ...ni[idx], icon: e.target.value };
                                        onChange({ items: ni });
                                    }} />
                                <input className="prop-input" type="text" value={item.title} placeholder="Title"
                                    onChange={e => {
                                        const ni = [...section.items];
                                        ni[idx] = { ...ni[idx], title: e.target.value };
                                        onChange({ items: ni });
                                    }} />
                            </div>
                            <textarea className="prop-input" value={item.desc} placeholder="Description"
                                onChange={e => {
                                    const ni = [...section.items];
                                    ni[idx] = { ...ni[idx], desc: e.target.value };
                                    onChange({ items: ni });
                                }} />
                        </div>
                    ))}
                    <button className="add-link-btn" onClick={() => onChange({ items: [...section.items, { icon: 'âœ¨', title: 'New Feature', desc: 'Description here.' }] })}>
                        <Plus size={12} /> Add Feature
                    </button>
                </PropSection>
            )}

            {section.type === 'rich_text' && (
                <PropSection title="Content">
                    <PropInput label="Heading" value={section.title} onChange={v => set('title', v)} />
                    <PropInput label="Body Text" value={section.content} onChange={v => set('content', v)} type="textarea" />
                    <PropSelect
                        label="Alignment"
                        value={section.align || 'left'}
                        onChange={v => set('align', v)}
                        options={[{ value: 'left', label: 'Left' }, { value: 'center', label: 'Center' }, { value: 'right', label: 'Right' }]}
                    />
                </PropSection>
            )}

            {section.type === 'footer' && (
                <PropSection title="Content">
                    <PropInput label="Footer Text" value={section.text} onChange={v => set('text', v)} />
                </PropSection>
            )}
        </div>
    );
}

// â”€â”€â”€ Canvas Section Renderer â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

function CanvasSection({ sec, isSelected, idx, total, onSelect, onMove, onDelete, onDuplicate }) {
    const meta = TYPE_META[sec.type];

    return (
        <div
            className={`cs-wrap ${isSelected ? 'cs-selected' : ''}`}
            style={{ background: sec.bg, color: sec.color }}
            onClick={e => { e.stopPropagation(); onSelect(sec.id); }}
        >
            {/* Hover / Selected Toolbar */}
            <div className="cs-toolbar">
                <span className="cs-badge" style={{ color: meta?.color || '#888', borderColor: `${meta?.color || '#888'}33` }}>
                    {meta?.label || sec.type}
                </span>
                <div className="cs-actions">
                    <button className="cs-btn" title="Move Up" disabled={idx === 0} onClick={e => { e.stopPropagation(); onMove(idx, 'up'); }}>
                        <ArrowUp size={13} />
                    </button>
                    <button className="cs-btn" title="Move Down" disabled={idx === total - 1} onClick={e => { e.stopPropagation(); onMove(idx, 'down'); }}>
                        <ArrowDown size={13} />
                    </button>
                    <button className="cs-btn" title="Duplicate" onClick={e => { e.stopPropagation(); onDuplicate(sec.id); }}>
                        <Copy size={13} />
                    </button>
                    <button className="cs-btn cs-btn-danger" title="Delete" onClick={e => { e.stopPropagation(); onDelete(sec.id); }}>
                        <Trash2 size={13} />
                    </button>
                </div>
            </div>

            {/* Section Renders */}
            {sec.type === 'navbar' && (
                <div className="cr-navbar">
                    <div className="cr-brand" style={{ color: sec.accentColor || sec.color }}>{sec.brand}</div>
                    <div className="cr-links">
                        {sec.links.map((l, i) => <span key={i} style={{ color: sec.color }}>{l.text}</span>)}
                    </div>
                </div>
            )}
            {sec.type === 'hero' && (
                <div className="cr-hero">
                    <h2 className="cr-hero-title" style={{ background: `linear-gradient(135deg,${sec.gradientFrom || sec.color},${sec.gradientTo || sec.color})`, WebkitBackgroundClip: 'text', backgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                        {sec.title}
                    </h2>
                    <p className="cr-hero-sub" style={{ color: sec.color }}>{sec.subtitle}</p>
                    <span className="cr-btn" style={{ background: sec.buttonBg, color: sec.buttonColor }}>{sec.buttonText}</span>
                </div>
            )}
            {sec.type === 'features' && (
                <div className="cr-features">
                    <h3 className="cr-sec-title">{sec.title}</h3>
                    <div className="cr-grid">
                        {sec.items.map((item, i) => (
                            <div key={i} className="cr-card" style={{ background: sec.cardBg, borderColor: sec.cardBorder }}>
                                <span className="cr-icon">{item.icon}</span>
                                <strong>{item.title}</strong>
                                <p>{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}
            {sec.type === 'cta' && (
                <div className="cr-cta">
                    <h3 className="cr-cta-title">{sec.title}</h3>
                    <p className="cr-cta-sub" style={{ opacity: 0.7 }}>{sec.subtitle}</p>
                    <span className="cr-btn" style={{ background: sec.buttonBg, color: sec.buttonColor }}>{sec.buttonText}</span>
                </div>
            )}
            {sec.type === 'rich_text' && (
                <div className="cr-text" style={{ textAlign: sec.align || 'left' }}>
                    <h3>{sec.title}</h3>
                    <p>{sec.content}</p>
                </div>
            )}
            {sec.type === 'footer' && (
                <div className="cr-footer">
                    <p style={{ color: sec.color }}>{sec.text}</p>
                </div>
            )}
        </div>
    );
}

// â”€â”€â”€ Main Builder â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

function VisualContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const projectId = searchParams.get('id');

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [sections, setSections] = useState(DEFAULT_SECTIONS);
    const [selectedId, setSelectedId] = useState(null);
    const [viewport, setViewport] = useState('desktop');
    const [activeTab, setActiveTab] = useState('layers'); // 'layers' | 'widgets' | 'preview'
    const [localProjectId, setLocalProjectId] = useState(projectId);
    const [projectName, setProjectName] = useState('Untitled Project');
    const [toast, setToast] = useState('');
    const [leftOpen, setLeftOpen] = useState(true);
    const [rightOpen, setRightOpen] = useState(true);
    const [previewHtml, setPreviewHtml] = useState('');
    const iframeRef = useRef(null);

    // Auth + Load
    useEffect(() => {
        const unsub = onAuthStateChanged(auth, async u => {
            if (!u) { router.push('/mr-build/login'); return; }
            setUser(u);
            if (projectId) {
                const snap = await getDoc(doc(db, 'user_sites', projectId));
                if (snap.exists()) {
                    const d = snap.data();
                    setProjectName(d.name || 'Untitled Project');
                    if (d.visualData) setSections(d.visualData);
                }
            }
            setLoading(false);
        });
        return () => unsub();
    }, [projectId, router]);

    // Update preview html
    useEffect(() => {
        setPreviewHtml(buildPreviewHtml(sections, projectName));
    }, [sections, projectName]);

    const showToast = (msg, type = 'success') => {
        setToast({ msg, type });
        setTimeout(() => setToast(''), 3000);
    };

    const handleSave = async () => {
        if (!user) return;
        setSaving(true);
        try {
            let targetId = localProjectId;
            const compiledFiles = compileVisualToCode(sections, projectName);
            const payload = {
                name: projectName,
                editorMode: 'visual',
                visualData: sections,
                files: compiledFiles,
                updatedAt: new Date().toISOString()
            };
            if (!targetId) {
                const newRef = doc(collection(db, 'user_sites'));
                targetId = newRef.id;
                await setDoc(newRef, {
                    ...payload, userId: user.uid, id: targetId,
                    status: 'draft', adminStatus: 'active',
                    slug: `visual-${targetId.substring(0, 6)}`,
                    views: 0, createdAt: new Date().toISOString()
                });
                setLocalProjectId(targetId);
                router.replace(`/mr-build/visual?id=${targetId}`);
            } else {
                await setDoc(doc(db, 'user_sites', targetId), payload, { merge: true });
            }
            showToast('Project saved successfully');
        } catch (err) {
            console.error(err);
            showToast('Save failed: ' + err.message, 'error');
        } finally {
            setSaving(false);
        }
    };

    const addSection = (blueprint) => {
        const id = `${blueprint.type}-${Date.now()}`;
        setSections(prev => [...prev, { id, type: blueprint.type, ...blueprint.create() }]);
        setSelectedId(id);
        setActiveTab('layers');
    };

    const moveSection = (idx, dir) => {
        const ni = dir === 'up' ? idx - 1 : idx + 1;
        if (ni < 0 || ni >= sections.length) return;
        const arr = [...sections];
        [arr[idx], arr[ni]] = [arr[ni], arr[idx]];
        setSections(arr);
    };

    const deleteSection = (id) => {
        setSections(prev => prev.filter(s => s.id !== id));
        if (selectedId === id) setSelectedId(null);
    };

    const duplicateSection = (id) => {
        const sec = sections.find(s => s.id === id);
        if (!sec) return;
        const newId = `${sec.type}-${Date.now()}`;
        const idx = sections.findIndex(s => s.id === id);
        const arr = [...sections];
        arr.splice(idx + 1, 0, { ...sec, id: newId });
        setSections(arr);
        setSelectedId(newId);
    };

    const updateSection = (id, props) => {
        setSections(prev => prev.map(s => s.id === id ? { ...s, ...props } : s));
    };

    const selectedSec = sections.find(s => s.id === selectedId);

    if (loading) return <Loader text="Loading Visual Builder..." />;

    const viewportWidths = { desktop: '100%', tablet: '768px', mobile: '390px' };

    return (
        <div className="vb">
            {/* â”€â”€ Top Navbar â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
            <header className="vb-nav">
                <div className="vb-nav-left">
                    <button className="vb-back" onClick={() => router.push('/mr-build/dashboard')}>
                        <ChevronLeft size={18} />
                    </button>
                    <div className="vb-title-wrap">
                        <input
                            className="vb-title"
                            value={projectName}
                            onChange={e => setProjectName(e.target.value)}
                            spellCheck={false}
                        />
                        <span className="vb-draft">DRAFT</span>
                    </div>
                </div>

                <div className="vb-nav-center">
                    <div className="viewport-toggle">
                        {[
                            { id: 'desktop', icon: Monitor, label: 'Desktop' },
                            { id: 'tablet', icon: Tablet, label: 'Tablet' },
                            { id: 'mobile', icon: Smartphone, label: 'Mobile' }
                        ].map(v => (
                            <button
                                key={v.id}
                                title={v.label}
                                className={`vt-btn ${viewport === v.id ? 'vt-active' : ''}`}
                                onClick={() => setViewport(v.id)}
                            >
                                <v.icon size={16} />
                            </button>
                        ))}
                    </div>
                </div>

                <div className="vb-nav-right">
                    <button className="vb-icon-btn" title="Toggle Left Panel" onClick={() => setLeftOpen(o => !o)}>
                        <PanelLeft size={16} />
                    </button>
                    <button className="vb-icon-btn" title="Toggle Right Panel" onClick={() => setRightOpen(o => !o)}>
                        <PanelRight size={16} />
                    </button>
                    {localProjectId && (
                        <button className="vb-btn-outline" onClick={() => router.push(`/mr-build/editor?id=${localProjectId}`)}>
                            <Code2 size={14} /> Code Editor
                        </button>
                    )}
                    {localProjectId && (
                        <a href={`/s/${sections[0]?.id}`} target="_blank" rel="noopener" className="vb-btn-outline">
                            <ExternalLink size={14} /> Preview
                        </a>
                    )}
                    <button className="vb-btn-save" onClick={handleSave} disabled={saving}>
                        <Save size={14} />
                        <span>{saving ? 'Savingâ€¦' : 'Save'}</span>
                    </button>
                </div>
            </header>

            {/* â”€â”€ Body â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
            <div className="vb-body">

                {/* â”€â”€ Left Panel â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
                <aside className={`vb-left ${leftOpen ? '' : 'vb-left-hidden'}`}>
                    {/* Tab Row */}
                    <div className="lp-tabs">
                        <button className={`lp-tab ${activeTab === 'layers' ? 'lp-tab-active' : ''}`} onClick={() => setActiveTab('layers')}>
                            <Layers size={14} /> Layers
                        </button>
                        <button className={`lp-tab ${activeTab === 'widgets' ? 'lp-tab-active' : ''}`} onClick={() => setActiveTab('widgets')}>
                            <Plus size={14} /> Add
                        </button>
                    </div>

                    {/* Layers */}
                    {activeTab === 'layers' && (
                        <div className="lp-layers">
                            {sections.length === 0 && (
                                <div className="lp-empty">No sections yet.<br />Click Add to get started.</div>
                            )}
                            {sections.map((sec, idx) => {
                                const meta = TYPE_META[sec.type];
                                const isActive = selectedId === sec.id;
                                return (
                                    <div
                                        key={sec.id}
                                        className={`layer-item ${isActive ? 'layer-active' : ''}`}
                                        onClick={() => setSelectedId(sec.id)}
                                    >
                                        <GripVertical size={13} className="layer-grip" />
                                        <span className="layer-dot" style={{ background: meta?.color || '#555' }} />
                                        <span className="layer-label">{meta?.label || sec.type}</span>
                                        <div className="layer-acts">
                                            <button className="layer-btn" disabled={idx === 0} onClick={e => { e.stopPropagation(); moveSection(idx, 'up'); }}>
                                                <ArrowUp size={11} />
                                            </button>
                                            <button className="layer-btn" disabled={idx === sections.length - 1} onClick={e => { e.stopPropagation(); moveSection(idx, 'down'); }}>
                                                <ArrowDown size={11} />
                                            </button>
                                            <button className="layer-btn layer-del" onClick={e => { e.stopPropagation(); deleteSection(sec.id); }}>
                                                <Trash2 size={11} />
                                            </button>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}

                    {/* Add Widgets */}
                    {activeTab === 'widgets' && (
                        <div className="lp-widgets">
                            <div className="lp-widgets-label">Click to add section</div>
                            {WIDGET_BLUEPRINTS.map(bp => (
                                <button key={bp.type} className="wb-card" onClick={() => addSection(bp)}>
                                    <span className="wb-icon" style={{ color: bp.color, background: `${bp.color}15` }}>
                                        <bp.icon size={18} />
                                    </span>
                                    <div className="wb-text">
                                        <strong>{bp.label}</strong>
                                        <span>{bp.desc}</span>
                                    </div>
                                    <Plus size={14} className="wb-plus" />
                                </button>
                            ))}
                        </div>
                    )}
                </aside>

                {/* â”€â”€ Canvas â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
                <main className="vb-canvas" onClick={() => setSelectedId(null)}>
                    <div className="canvas-scroll">
                        <div
                            className={`canvas-frame viewport-${viewport}`}
                            style={{ width: viewportWidths[viewport] }}
                        >
                            {sections.length === 0 ? (
                                <div className="canvas-empty">
                                    <Grid3X3 size={40} style={{ opacity: 0.15, marginBottom: 16 }} />
                                    <h3>Empty Canvas</h3>
                                    <p>Open the <strong>Add</strong> tab on the left to add sections</p>
                                </div>
                            ) : sections.map((sec, idx) => (
                                <CanvasSection
                                    key={sec.id}
                                    sec={sec}
                                    idx={idx}
                                    total={sections.length}
                                    isSelected={selectedId === sec.id}
                                    onSelect={setSelectedId}
                                    onMove={moveSection}
                                    onDelete={deleteSection}
                                    onDuplicate={duplicateSection}
                                />
                            ))}
                        </div>

                        {/* Viewport Label */}
                        <div className="viewport-label">
                            {viewport === 'desktop' && 'Desktop â€” Full Width'}
                            {viewport === 'tablet' && 'Tablet â€” 768px'}
                            {viewport === 'mobile' && 'Mobile â€” 390px'}
                        </div>
                    </div>
                </main>

                {/* â”€â”€ Right Panel (Properties) â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
                <aside className={`vb-right ${rightOpen && selectedId ? '' : 'vb-right-hidden'}`}>
                    <div className="rp-header">
                        <span className="rp-title">Properties</span>
                        <button className="rp-close" onClick={() => setSelectedId(null)}>Ã—</button>
                    </div>
                    <PropertiesPanel
                        section={selectedSec}
                        onChange={props => selectedId && updateSection(selectedId, props)}
                    />
                </aside>
            </div>

            {/* â”€â”€ Toast â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
            {toast && (
                <div className={`vb-toast ${toast.type === 'error' ? 'vb-toast-error' : ''}`}>
                    {toast.type !== 'error' ? <Check size={14} /> : null}
                    {toast.msg}
                </div>
            )}

            <style dangerouslySetInnerHTML={{ __html: VISUAL_CSS }} />
        </div>
    );
}

export default function VisualPage() {
    return (
        <Suspense fallback={<Loader text="Initializing Visual Builder..." />}>
            <VisualContent />
        </Suspense>
    );
}

