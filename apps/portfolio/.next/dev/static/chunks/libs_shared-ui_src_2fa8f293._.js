(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/libs/shared-ui/src/Savoirpedia/ShareButton.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ShareButton
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$node_modules$2f$styled$2d$jsx$2f$style$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/node_modules/styled-jsx/style.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$fa$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-icons/fa/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/components/AnimatePresence/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
function ShareButton({ title }) {
    _s();
    const pathname = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"])();
    const searchParams = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSearchParams"])();
    const [isOpen, setIsOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [copied, setCopied] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    // Get the base URL (handling SSR safely)
    const getShareUrl = ()=>{
        if ("TURBOPACK compile-time truthy", 1) {
            const params = searchParams.toString();
            return `${window.location.origin}${pathname}${params ? `?${params}` : ''}`;
        }
        //TURBOPACK unreachable
        ;
    };
    const handleShare = async ()=>{
        const url = getShareUrl();
        // Use Native Share API if available
        if (navigator.share) {
            try {
                await navigator.share({
                    title: title || 'Savoirpedia Article',
                    text: `Check out this article: ${title}`,
                    url: url
                });
                return;
            } catch (err) {
                console.log('Error sharing:', err);
            }
        }
        // Fallback to custom modal
        setIsOpen(true);
    };
    const copyToClipboard = async ()=>{
        const url = getShareUrl();
        try {
            await navigator.clipboard.writeText(url);
            setCopied(true);
            setTimeout(()=>setCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy keys', err);
        }
    };
    const shareLinks = [
        {
            name: 'Facebook',
            icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$fa$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FaFacebook"], {
                size: 24
            }, void 0, false, {
                fileName: "[project]/libs/shared-ui/src/Savoirpedia/ShareButton.js",
                lineNumber: 66,
                columnNumber: 19
            }, this),
            url: (url)=>`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
            color: '#1877F2'
        },
        {
            name: 'X / Twitter',
            icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$fa$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FaTwitter"], {
                size: 24
            }, void 0, false, {
                fileName: "[project]/libs/shared-ui/src/Savoirpedia/ShareButton.js",
                lineNumber: 72,
                columnNumber: 19
            }, this),
            url: (url)=>`https://twitter.com/intent/tweet?text=${encodeURIComponent(`Check this out: ${title}`)}&url=${encodeURIComponent(url)}`,
            color: '#000000'
        },
        {
            name: 'LinkedIn',
            icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$fa$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FaLinkedin"], {
                size: 24
            }, void 0, false, {
                fileName: "[project]/libs/shared-ui/src/Savoirpedia/ShareButton.js",
                lineNumber: 78,
                columnNumber: 19
            }, this),
            url: (url)=>`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`,
            color: '#0077B5'
        },
        {
            name: 'WhatsApp',
            icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$fa$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FaWhatsapp"], {
                size: 24
            }, void 0, false, {
                fileName: "[project]/libs/shared-ui/src/Savoirpedia/ShareButton.js",
                lineNumber: 84,
                columnNumber: 19
            }, this),
            url: (url)=>`https://wa.me/?text=${encodeURIComponent(`${title} - ${url}`)}`,
            color: '#25D366'
        }
    ];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                onClick: handleShare,
                "aria-label": "Share article",
                className: "jsx-d0fa777bdaf68020" + " " + "share-btn",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$fa$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FaShareAlt"], {}, void 0, false, {
                        fileName: "[project]/libs/shared-ui/src/Savoirpedia/ShareButton.js",
                        lineNumber: 97,
                        columnNumber: 17
                    }, this),
                    " Share"
                ]
            }, void 0, true, {
                fileName: "[project]/libs/shared-ui/src/Savoirpedia/ShareButton.js",
                lineNumber: 92,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AnimatePresence"], {
                children: isOpen && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                    initial: {
                        opacity: 0
                    },
                    animate: {
                        opacity: 1
                    },
                    exit: {
                        opacity: 0
                    },
                    className: "share-modal-overlay",
                    onClick: ()=>setIsOpen(false),
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                        initial: {
                            scale: 0.9,
                            opacity: 0,
                            y: 20
                        },
                        animate: {
                            scale: 1,
                            opacity: 1,
                            y: 0
                        },
                        exit: {
                            scale: 0.9,
                            opacity: 0,
                            y: 20
                        },
                        className: "share-modal",
                        onClick: (e)=>e.stopPropagation(),
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "jsx-d0fa777bdaf68020" + " " + "share-header",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        className: "jsx-d0fa777bdaf68020",
                                        children: "Share Article"
                                    }, void 0, false, {
                                        fileName: "[project]/libs/shared-ui/src/Savoirpedia/ShareButton.js",
                                        lineNumber: 117,
                                        columnNumber: 33
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>setIsOpen(false),
                                        className: "jsx-d0fa777bdaf68020" + " " + "close-btn",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$fa$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FaTimes"], {}, void 0, false, {
                                            fileName: "[project]/libs/shared-ui/src/Savoirpedia/ShareButton.js",
                                            lineNumber: 119,
                                            columnNumber: 37
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/libs/shared-ui/src/Savoirpedia/ShareButton.js",
                                        lineNumber: 118,
                                        columnNumber: 33
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/libs/shared-ui/src/Savoirpedia/ShareButton.js",
                                lineNumber: 116,
                                columnNumber: 29
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "jsx-d0fa777bdaf68020" + " " + "share-grid",
                                children: [
                                    shareLinks.map((link)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                            href: link.url(getShareUrl()),
                                            target: "_blank",
                                            rel: "noopener noreferrer",
                                            style: {
                                                '--hover-color': link.color
                                            },
                                            className: "jsx-d0fa777bdaf68020" + " " + "share-item",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    style: {
                                                        color: link.color
                                                    },
                                                    className: "jsx-d0fa777bdaf68020" + " " + "icon-wrapper",
                                                    children: link.icon
                                                }, void 0, false, {
                                                    fileName: "[project]/libs/shared-ui/src/Savoirpedia/ShareButton.js",
                                                    lineNumber: 133,
                                                    columnNumber: 41
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "jsx-d0fa777bdaf68020",
                                                    children: link.name
                                                }, void 0, false, {
                                                    fileName: "[project]/libs/shared-ui/src/Savoirpedia/ShareButton.js",
                                                    lineNumber: 136,
                                                    columnNumber: 41
                                                }, this)
                                            ]
                                        }, link.name, true, {
                                            fileName: "[project]/libs/shared-ui/src/Savoirpedia/ShareButton.js",
                                            lineNumber: 125,
                                            columnNumber: 37
                                        }, this)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: copyToClipboard,
                                        className: "jsx-d0fa777bdaf68020" + " " + "share-item copy-btn",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: {
                                                    color: '#888'
                                                },
                                                className: "jsx-d0fa777bdaf68020" + " " + "icon-wrapper",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$fa$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FaCopy"], {
                                                    size: 24
                                                }, void 0, false, {
                                                    fileName: "[project]/libs/shared-ui/src/Savoirpedia/ShareButton.js",
                                                    lineNumber: 145,
                                                    columnNumber: 41
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/libs/shared-ui/src/Savoirpedia/ShareButton.js",
                                                lineNumber: 144,
                                                columnNumber: 37
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "jsx-d0fa777bdaf68020",
                                                children: copied ? 'Copied!' : 'Copy Link'
                                            }, void 0, false, {
                                                fileName: "[project]/libs/shared-ui/src/Savoirpedia/ShareButton.js",
                                                lineNumber: 147,
                                                columnNumber: 37
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/libs/shared-ui/src/Savoirpedia/ShareButton.js",
                                        lineNumber: 140,
                                        columnNumber: 33
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/libs/shared-ui/src/Savoirpedia/ShareButton.js",
                                lineNumber: 123,
                                columnNumber: 29
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/libs/shared-ui/src/Savoirpedia/ShareButton.js",
                        lineNumber: 109,
                        columnNumber: 25
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/libs/shared-ui/src/Savoirpedia/ShareButton.js",
                    lineNumber: 102,
                    columnNumber: 21
                }, this)
            }, void 0, false, {
                fileName: "[project]/libs/shared-ui/src/Savoirpedia/ShareButton.js",
                lineNumber: 100,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$node_modules$2f$styled$2d$jsx$2f$style$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                id: "d0fa777bdaf68020",
                children: ".share-btn.jsx-d0fa777bdaf68020{color:#00f0ff;cursor:pointer;background:0 0;border:1px solid #00f0ff;border-radius:4px;align-items:center;gap:8px;margin-left:auto;padding:8px 16px;font-size:.9rem;transition:all .2s;display:inline-flex}.share-btn.jsx-d0fa777bdaf68020:hover{background:#00f0ff1a}.share-modal-overlay.jsx-d0fa777bdaf68020{-webkit-backdrop-filter:blur(5px);backdrop-filter:blur(5px);z-index:1000;background:#000000d9;justify-content:center;align-items:center;padding:20px;display:flex;position:fixed;inset:0}.share-modal.jsx-d0fa777bdaf68020{background:#1a1a1a;border:1px solid #333;border-radius:12px;width:100%;max-width:400px;padding:20px;box-shadow:0 20px 40px #0006}.share-header.jsx-d0fa777bdaf68020{border-bottom:1px solid #333;justify-content:space-between;align-items:center;margin-bottom:20px;padding-bottom:15px;display:flex}.share-header.jsx-d0fa777bdaf68020 h3.jsx-d0fa777bdaf68020{color:#fff;margin:0;font-size:1.2rem}.close-btn.jsx-d0fa777bdaf68020{color:#888;cursor:pointer;background:0 0;border:none;padding:5px;font-size:1.2rem;transition:color .2s}.close-btn.jsx-d0fa777bdaf68020:hover{color:#fff}.share-grid.jsx-d0fa777bdaf68020{grid-template-columns:repeat(3,1fr);gap:15px;display:grid}.share-item.jsx-d0fa777bdaf68020{cursor:pointer;background:#252525;border:1px solid #0000;border-radius:8px;flex-direction:column;align-items:center;gap:8px;padding:15px 10px;text-decoration:none;transition:transform .2s,background .2s;display:flex}.share-item.jsx-d0fa777bdaf68020:hover{background:#2a2a2a;border-color:#444;transform:translateY(-2px)}.share-item.jsx-d0fa777bdaf68020 span.jsx-d0fa777bdaf68020{color:#ccc;font-size:.8rem;font-weight:500}.icon-wrapper.jsx-d0fa777bdaf68020{background:#ffffff0d;border-radius:50%;justify-content:center;align-items:center;width:40px;height:40px;display:flex}.copy-btn.jsx-d0fa777bdaf68020{border:none;font-family:inherit}"
            }, void 0, false, void 0, this)
        ]
    }, void 0, true);
}
_s(ShareButton, "1352Xp1TwyaJ8IBd//5ABP+lNTo=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSearchParams"]
    ];
});
_c = ShareButton;
var _c;
__turbopack_context__.k.register(_c, "ShareButton");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/libs/shared-ui/src/Effects/MagneticWrapper.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>MagneticWrapper
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$spring$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/value/use-spring.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$motion$2d$value$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/value/use-motion-value.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
function MagneticWrapper({ children, strength = 0.5, range = 150 }) {
    _s();
    const ref = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const x = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$motion$2d$value$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMotionValue"])(0);
    const y = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$motion$2d$value$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMotionValue"])(0);
    const springConfig = {
        damping: 15,
        stiffness: 150,
        mass: 0.1
    };
    const springX = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$spring$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSpring"])(x, springConfig);
    const springY = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$spring$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSpring"])(y, springConfig);
    const handleMouseMove = (e)=>{
        const { clientX, clientY } = e;
        const { left, top, width, height } = ref.current.getBoundingClientRect();
        const centerX = left + width / 2;
        const centerY = top + height / 2;
        const distanceX = clientX - centerX;
        const distanceY = clientY - centerY;
        if (Math.abs(distanceX) < range && Math.abs(distanceY) < range) {
            x.set(distanceX * strength);
            y.set(distanceY * strength);
        } else {
            x.set(0);
            y.set(0);
        }
    };
    const handleMouseLeave = ()=>{
        x.set(0);
        y.set(0);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
        ref: ref,
        onMouseMove: handleMouseMove,
        onMouseLeave: handleMouseLeave,
        style: {
            x: springX,
            y: springY
        },
        children: children
    }, void 0, false, {
        fileName: "[project]/libs/shared-ui/src/Effects/MagneticWrapper.js",
        lineNumber: 38,
        columnNumber: 5
    }, this);
}
_s(MagneticWrapper, "6mKaULDq5hWoP9HQhzud4/26qIU=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$motion$2d$value$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMotionValue"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$motion$2d$value$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMotionValue"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$spring$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSpring"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$spring$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSpring"]
    ];
});
_c = MagneticWrapper;
var _c;
__turbopack_context__.k.register(_c, "MagneticWrapper");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/libs/shared-ui/src/Savoirpedia/SavoirCopilot.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>SavoirCopilot
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$node_modules$2f$styled$2d$jsx$2f$style$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/node_modules/styled-jsx/style.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/image.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sparkles$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Sparkles$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/sparkles.js [app-client] (ecmascript) <export default as Sparkles>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$send$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Send$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/send.js [app-client] (ecmascript) <export default as Send>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$bot$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Bot$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/bot.js [app-client] (ecmascript) <export default as Bot>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__User$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/user.js [app-client] (ecmascript) <export default as User>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$mic$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Mic$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/mic.js [app-client] (ecmascript) <export default as Mic>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$volume$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Volume2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/volume-2.js [app-client] (ecmascript) <export default as Volume2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$volume$2d$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__VolumeX$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/volume-x.js [app-client] (ecmascript) <export default as VolumeX>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$pen$2d$line$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Edit3$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/pen-line.js [app-client] (ecmascript) <export default as Edit3>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Image$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/image.js [app-client] (ecmascript) <export default as Image>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/x.js [app-client] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$libs$2f$core$2f$src$2f$firebase$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/libs/core/src/firebase.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$firebase$2f$firestore$2f$dist$2f$esm$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/firebase/firestore/dist/esm/index.esm.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@firebase/firestore/dist/index.esm.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
;
;
;
;
;
;
function SavoirCopilot({ currentTitle, currentContent, onUpdate, initialMessage }) {
    _s();
    // ... (existing state) ...
    const [messages, setMessages] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([
        {
            id: 'welcome',
            role: 'assistant',
            content: JSON.stringify({
                message: "I am NEX AI, your research assistant and editor. I can write articles, fix grammar, or restructure your content.",
                thought: "Ready to write."
            })
        }
    ]);
    const [input, setInput] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "SavoirCopilot.useEffect": ()=>{
            if (initialMessage && initialMessage !== input) {
                setInput(initialMessage);
            }
        }
    }["SavoirCopilot.useEffect"], [
        initialMessage,
        input
    ]);
    // Voice State
    const [isListening, setIsListening] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [voiceEnabled, setVoiceEnabled] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    // Vision State
    const [selectedImage, setSelectedImage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const fileInputRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    // Model State
    const [selectedModel, setSelectedModel] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('openai/gpt-4o-mini');
    const [models, setModels] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [apiKey, setApiKey] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    // Fetch Models
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "SavoirCopilot.useEffect": ()=>{
            const fetchModels = {
                "SavoirCopilot.useEffect.fetchModels": async ()=>{
                    try {
                        const docRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["doc"])(__TURBOPACK__imported__module__$5b$project$5d2f$libs$2f$core$2f$src$2f$firebase$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"], 'system_config', 'nex_ai');
                        const snap = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getDoc"])(docRef);
                        if (snap.exists()) {
                            const data = snap.data();
                            if (data.models) setModels(data.models.filter({
                                "SavoirCopilot.useEffect.fetchModels": (m)=>m.active
                            }["SavoirCopilot.useEffect.fetchModels"]));
                            // Load API Key (Client-side)
                            if (data.keys && Array.isArray(data.keys)) {
                                const activeKeys = data.keys.filter({
                                    "SavoirCopilot.useEffect.fetchModels.activeKeys": (k)=>k.status === 'active'
                                }["SavoirCopilot.useEffect.fetchModels.activeKeys"]);
                                if (activeKeys.length > 0) {
                                    setApiKey(activeKeys[Math.floor(Math.random() * activeKeys.length)].key);
                                }
                            } else if (data.openRouterKey) {
                                setApiKey(data.openRouterKey);
                            }
                        } else {
                            setModels([
                                {
                                    id: 'openai/gpt-4o-mini',
                                    name: 'GPT-4o Mini'
                                }
                            ]);
                        }
                    } catch (err) {
                        console.error("Failed to load NEX AI config:", err);
                        setModels([
                            {
                                id: 'openai/gpt-4o-mini',
                                name: 'GPT-4o Mini'
                            }
                        ]);
                    }
                }
            }["SavoirCopilot.useEffect.fetchModels"];
            fetchModels();
        }
    }["SavoirCopilot.useEffect"], []);
    const scrollRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const recognitionRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "SavoirCopilot.useEffect": ()=>{
            if (scrollRef.current) {
                scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
            }
        }
    }["SavoirCopilot.useEffect"], [
        messages,
        loading
    ]);
    // Speech Recognition
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "SavoirCopilot.useEffect": ()=>{
            if ("TURBOPACK compile-time truthy", 1) {
                const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
                if (SpeechRecognition) {
                    const recognition = new SpeechRecognition();
                    recognition.continuous = false;
                    recognition.interimResults = false;
                    recognition.lang = 'en-US';
                    recognition.onresult = ({
                        "SavoirCopilot.useEffect": (event)=>setInput(event.results[0][0].transcript)
                    })["SavoirCopilot.useEffect"];
                    recognition.onstart = ({
                        "SavoirCopilot.useEffect": ()=>setIsListening(true)
                    })["SavoirCopilot.useEffect"];
                    recognition.onend = ({
                        "SavoirCopilot.useEffect": ()=>setIsListening(false)
                    })["SavoirCopilot.useEffect"];
                    recognitionRef.current = recognition;
                }
            }
        }
    }["SavoirCopilot.useEffect"], []);
    const toggleListening = ()=>{
        isListening ? recognitionRef.current?.stop() : recognitionRef.current?.start();
    };
    const speakText = (text)=>{
        if (!voiceEnabled || ("TURBOPACK compile-time value", "object") === 'undefined') return;
        const utterance = new SpeechSynthesisUtterance(text);
        window.speechSynthesis.speak(utterance);
    };
    // Helper: Robust JSON parser
    const tryParseJSON = (str)=>{
        try {
            if (typeof str !== 'string') return str;
            // 1. Try direct parse
            return JSON.parse(str);
        } catch (e) {
            try {
                // 2. Try extracting JSON from markdown blocks or substrings
                const match = str.match(/\{[\s\S]*\}/);
                if (match) return JSON.parse(match[0]);
            } catch (e2) {
                return null;
            }
        }
        return null;
    };
    // Helper to clean content
    const formatMessage = (content)=>{
        if (!content) return '';
        // 1. (Removed code block stripping to support Markdown code blocks)
        let clean = content;
        // 2. Unescape HTML entities (if the AI returned escaped HTML)
        clean = clean.replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#039;/g, "'").replace(/&amp;/g, '&');
        // 3. Convert Markdown Images to HTML
        clean = clean.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, (match, alt, src)=>{
            return `<img src="${src}" alt="${alt}" class="generated-image" />`;
        });
        // 4. Aggressive Fallback: Auto-convert raw Pollinations URLs
        clean = clean.replace(/(https:\/\/image\.pollinations\.ai\/[^\s)]+)/g, (match)=>{
            // If already inside an img tag, skip (simple check)
            if (clean.includes(`src="${match}"`)) return match;
            return `<img src="${match}" alt="Generated Image" class="generated-image" />`;
        });
        return clean;
    };
    // Image Upload Handler
    const handleImageUpload = (e)=>{
        const file = e.target.files[0];
        if (file) {
            if (file.size > 5 * 1024 * 1024) {
                alert("File too large. Please upload an image under 5MB.");
                return;
            }
            const reader = new FileReader();
            reader.onloadend = ()=>{
                setSelectedImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };
    const handleSend = async (e)=>{
        e?.preventDefault();
        if (!input.trim() && !selectedImage || loading) return;
        // Construct User Message
        let contentPayload = input;
        // If image exists, create multimodal content array
        if (selectedImage) {
            contentPayload = [
                {
                    type: "text",
                    text: input || "Analyze this image."
                },
                {
                    type: "image_url",
                    image_url: {
                        url: selectedImage
                    }
                }
            ];
        }
        const userMsg = {
            role: 'user',
            content: contentPayload,
            id: Date.now().toString() + '-' + Math.random().toString(36).substr(2, 9)
        };
        const newMessages = [
            ...messages,
            userMsg
        ];
        setMessages(newMessages);
        setInput('');
        setSelectedImage(null); // Clear image after send
        setLoading(true);
        try {
            const res = await fetch('/api/nex-ai', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    messages: newMessages.filter((m)=>m.role !== 'error').map((m)=>{
                        // Normalize content for API
                        const json = tryParseJSON(m.content);
                        // If content is already object/array (multimodal), keep it. 
                        // If it's a string, try extracting message from JSON or use raw.
                        let content = m.content;
                        if (typeof m.content === 'string') {
                            content = json?.message || m.content;
                        }
                        return {
                            role: m.role,
                            content
                        };
                    }),
                    currentContext: {
                        title: currentTitle,
                        content: currentContent
                    },
                    model: selectedModel,
                    mode: 'article',
                    apiKey: apiKey
                })
            });
            if (!res.ok) throw new Error(await res.text());
            const data = await res.json();
            const aiMsg = {
                role: 'assistant',
                content: JSON.stringify(data),
                id: Date.now().toString() + '-ai-' + Math.random().toString(36).substr(2, 9)
            };
            // Handle Article Updates
            if (data.action === 'UPDATE_ARTICLE' && data.data) {
                onUpdate(data.data);
            } else if (data.action === 'UPDATE_CONTENT' && data.content) {
                onUpdate({
                    content: data.content
                });
            } else if (data.action === 'GENERATE_IMAGE' && data.data?.description) {
            // Client-side Image Generation logic handled by renderer
            }
            setMessages([
                ...newMessages,
                aiMsg
            ]);
            if (voiceEnabled && data.message) speakText(data.message);
        } catch (err) {
            setMessages([
                ...newMessages,
                {
                    role: 'error',
                    content: `Error: ${err.message}`,
                    id: Date.now().toString() + '-err-' + Math.random().toString(36).substr(2, 9)
                }
            ]);
        } finally{
            setLoading(false);
        }
    };
    const renderMarkdownChunk = (text, keyPrefix)=>{
        const codeBlockRegex = /```(\w+)?\n([\s\S]*?)```/g;
        const subParts = [];
        let subLastIndex = 0;
        let subMatch;
        while((subMatch = codeBlockRegex.exec(text)) !== null){
            if (subMatch.index > subLastIndex) {
                subParts.push({
                    type: 'text',
                    content: text.slice(subLastIndex, subMatch.index)
                });
            }
            subParts.push({
                type: 'code',
                lang: subMatch[1] || 'text',
                content: subMatch[2]
            });
            subLastIndex = subMatch.index + subMatch[0].length;
        }
        if (subLastIndex < text.length) {
            subParts.push({
                type: 'text',
                content: text.slice(subLastIndex)
            });
        }
        return subParts.map((part, i)=>{
            if (part.type === 'code') {
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "code-block-wrapper",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "code-header",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: part.lang
                            }, void 0, false, {
                                fileName: "[project]/libs/shared-ui/src/Savoirpedia/SavoirCopilot.js",
                                lineNumber: 272,
                                columnNumber: 27
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/libs/shared-ui/src/Savoirpedia/SavoirCopilot.js",
                            lineNumber: 271,
                            columnNumber: 23
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "code-container",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "line-numbers",
                                    children: part.content.trim().split('\n').map((_, idx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "line-number",
                                            children: idx + 1
                                        }, idx, false, {
                                            fileName: "[project]/libs/shared-ui/src/Savoirpedia/SavoirCopilot.js",
                                            lineNumber: 277,
                                            columnNumber: 35
                                        }, this))
                                }, void 0, false, {
                                    fileName: "[project]/libs/shared-ui/src/Savoirpedia/SavoirCopilot.js",
                                    lineNumber: 275,
                                    columnNumber: 27
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("pre", {
                                    className: `language-${part.lang}`,
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("code", {
                                        children: part.content
                                    }, void 0, false, {
                                        fileName: "[project]/libs/shared-ui/src/Savoirpedia/SavoirCopilot.js",
                                        lineNumber: 281,
                                        columnNumber: 31
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/libs/shared-ui/src/Savoirpedia/SavoirCopilot.js",
                                    lineNumber: 280,
                                    columnNumber: 27
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/libs/shared-ui/src/Savoirpedia/SavoirCopilot.js",
                            lineNumber: 274,
                            columnNumber: 23
                        }, this)
                    ]
                }, `${keyPrefix}-${i}`, true, {
                    fileName: "[project]/libs/shared-ui/src/Savoirpedia/SavoirCopilot.js",
                    lineNumber: 270,
                    columnNumber: 19
                }, this);
            } else {
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    dangerouslySetInnerHTML: {
                        __html: formatMessage(part.content)
                    }
                }, `${keyPrefix}-${i}`, false, {
                    fileName: "[project]/libs/shared-ui/src/Savoirpedia/SavoirCopilot.js",
                    lineNumber: 287,
                    columnNumber: 22
                }, this);
            }
        });
    };
    const MessageContent = ({ content, role })=>{
        // Handle User Multimodal Content (Array)
        if (role === 'user' && Array.isArray(content)) {
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "user-multimodal",
                children: content.map((part, i)=>{
                    if (part.type === 'text') return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "text-content",
                        children: part.text
                    }, i, false, {
                        fileName: "[project]/libs/shared-ui/src/Savoirpedia/SavoirCopilot.js",
                        lineNumber: 298,
                        columnNumber: 56
                    }, this);
                    if (part.type === 'image_url') return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "uploaded-image-preview",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            src: part.image_url.url,
                            alt: "User Upload",
                            width: 150,
                            height: 150,
                            style: {
                                objectFit: 'cover'
                            }
                        }, void 0, false, {
                            fileName: "[project]/libs/shared-ui/src/Savoirpedia/SavoirCopilot.js",
                            lineNumber: 301,
                            columnNumber: 30
                        }, this)
                    }, i, false, {
                        fileName: "[project]/libs/shared-ui/src/Savoirpedia/SavoirCopilot.js",
                        lineNumber: 300,
                        columnNumber: 26
                    }, this);
                    return null;
                })
            }, void 0, false, {
                fileName: "[project]/libs/shared-ui/src/Savoirpedia/SavoirCopilot.js",
                lineNumber: 296,
                columnNumber: 15
            }, this);
        }
        if (role === 'assistant') {
            // ... (existing assistant logic) ...
            const data = tryParseJSON(content);
            if (data) {
                // ... (existing return) ...
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "agent-response",
                    children: [
                        data.thought && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "think-block",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "think-icon",
                                    children: "💭"
                                }, void 0, false, {
                                    fileName: "[project]/libs/shared-ui/src/Savoirpedia/SavoirCopilot.js",
                                    lineNumber: 319,
                                    columnNumber: 31
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "think-text",
                                    children: data.thought
                                }, void 0, false, {
                                    fileName: "[project]/libs/shared-ui/src/Savoirpedia/SavoirCopilot.js",
                                    lineNumber: 320,
                                    columnNumber: 31
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/libs/shared-ui/src/Savoirpedia/SavoirCopilot.js",
                            lineNumber: 318,
                            columnNumber: 27
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "text-content",
                            children: renderMarkdownChunk(data.message, 'msg')
                        }, void 0, false, {
                            fileName: "[project]/libs/shared-ui/src/Savoirpedia/SavoirCopilot.js",
                            lineNumber: 324,
                            columnNumber: 23
                        }, this),
                        data.action === 'GENERATE_IMAGE' && data.data?.description && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "image-container",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    src: `https://image.pollinations.ai/prompt/${encodeURIComponent(data.data.description)}?width=1024&height=576&nologo=true`,
                                    alt: data.data.description,
                                    className: "generated-image",
                                    width: 1024,
                                    height: 576,
                                    loading: "lazy"
                                }, void 0, false, {
                                    fileName: "[project]/libs/shared-ui/src/Savoirpedia/SavoirCopilot.js",
                                    lineNumber: 328,
                                    columnNumber: 32
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "image-caption",
                                    children: [
                                        "Generative Art: ",
                                        data.data.description
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/libs/shared-ui/src/Savoirpedia/SavoirCopilot.js",
                                    lineNumber: 336,
                                    columnNumber: 31
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/libs/shared-ui/src/Savoirpedia/SavoirCopilot.js",
                            lineNumber: 327,
                            columnNumber: 27
                        }, this),
                        (data.action === 'UPDATE_CONTENT' || data.action === 'UPDATE_ARTICLE') && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "action-badge",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$pen$2d$line$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Edit3$3e$__["Edit3"], {
                                    size: 10
                                }, void 0, false, {
                                    fileName: "[project]/libs/shared-ui/src/Savoirpedia/SavoirCopilot.js",
                                    lineNumber: 342,
                                    columnNumber: 31
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    children: "Updated Article"
                                }, void 0, false, {
                                    fileName: "[project]/libs/shared-ui/src/Savoirpedia/SavoirCopilot.js",
                                    lineNumber: 343,
                                    columnNumber: 31
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/libs/shared-ui/src/Savoirpedia/SavoirCopilot.js",
                            lineNumber: 341,
                            columnNumber: 27
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/libs/shared-ui/src/Savoirpedia/SavoirCopilot.js",
                    lineNumber: 316,
                    columnNumber: 19
                }, this);
            } else {
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "text-content",
                    children: renderMarkdownChunk(content, 'fallback')
                }, void 0, false, {
                    fileName: "[project]/libs/shared-ui/src/Savoirpedia/SavoirCopilot.js",
                    lineNumber: 349,
                    columnNumber: 21
                }, this);
            }
        }
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "text-content",
            children: renderMarkdownChunk(content, 'user')
        }, void 0, false, {
            fileName: "[project]/libs/shared-ui/src/Savoirpedia/SavoirCopilot.js",
            lineNumber: 352,
            columnNumber: 14
        }, this);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "jsx-53600edce5dcb586" + " " + "copilot-container",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "jsx-53600edce5dcb586" + " " + "header",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "jsx-53600edce5dcb586" + " " + "brand",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sparkles$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Sparkles$3e$__["Sparkles"], {
                                className: "icon-sparkles",
                                size: 16
                            }, void 0, false, {
                                fileName: "[project]/libs/shared-ui/src/Savoirpedia/SavoirCopilot.js",
                                lineNumber: 360,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                className: "jsx-53600edce5dcb586" + " " + "title",
                                children: "NEX EDITOR"
                            }, void 0, false, {
                                fileName: "[project]/libs/shared-ui/src/Savoirpedia/SavoirCopilot.js",
                                lineNumber: 361,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/libs/shared-ui/src/Savoirpedia/SavoirCopilot.js",
                        lineNumber: 359,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "jsx-53600edce5dcb586" + " " + "header-controls",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                value: selectedModel,
                                onChange: (e)=>setSelectedModel(e.target.value),
                                className: "jsx-53600edce5dcb586" + " " + "model-select",
                                children: models.map((m)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                        value: m.id,
                                        className: "jsx-53600edce5dcb586",
                                        children: m.name
                                    }, m.id, false, {
                                        fileName: "[project]/libs/shared-ui/src/Savoirpedia/SavoirCopilot.js",
                                        lineNumber: 369,
                                        columnNumber: 34
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/libs/shared-ui/src/Savoirpedia/SavoirCopilot.js",
                                lineNumber: 364,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>setVoiceEnabled(!voiceEnabled),
                                className: "jsx-53600edce5dcb586" + " " + `voice-btn ${voiceEnabled ? 'active' : ''}`,
                                children: voiceEnabled ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$volume$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Volume2$3e$__["Volume2"], {
                                    size: 14
                                }, void 0, false, {
                                    fileName: "[project]/libs/shared-ui/src/Savoirpedia/SavoirCopilot.js",
                                    lineNumber: 375,
                                    columnNumber: 33
                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$volume$2d$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__VolumeX$3e$__["VolumeX"], {
                                    size: 14
                                }, void 0, false, {
                                    fileName: "[project]/libs/shared-ui/src/Savoirpedia/SavoirCopilot.js",
                                    lineNumber: 375,
                                    columnNumber: 57
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/libs/shared-ui/src/Savoirpedia/SavoirCopilot.js",
                                lineNumber: 371,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/libs/shared-ui/src/Savoirpedia/SavoirCopilot.js",
                        lineNumber: 363,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/libs/shared-ui/src/Savoirpedia/SavoirCopilot.js",
                lineNumber: 358,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                ref: scrollRef,
                className: "jsx-53600edce5dcb586" + " " + "messages-area custom-scrollbar",
                children: [
                    messages.map((m)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "jsx-53600edce5dcb586" + " " + `message-row ${m.role}`,
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "jsx-53600edce5dcb586" + " " + `message-bubble ${m.role}`,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "jsx-53600edce5dcb586" + " " + "message-meta",
                                        children: [
                                            m.role === 'user' ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__User$3e$__["User"], {
                                                size: 12
                                            }, void 0, false, {
                                                fileName: "[project]/libs/shared-ui/src/Savoirpedia/SavoirCopilot.js",
                                                lineNumber: 386,
                                                columnNumber: 40
                                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$bot$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Bot$3e$__["Bot"], {
                                                size: 12
                                            }, void 0, false, {
                                                fileName: "[project]/libs/shared-ui/src/Savoirpedia/SavoirCopilot.js",
                                                lineNumber: 386,
                                                columnNumber: 61
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "jsx-53600edce5dcb586" + " " + "role-name",
                                                children: m.role === 'user' ? 'You' : 'NEX AI'
                                            }, void 0, false, {
                                                fileName: "[project]/libs/shared-ui/src/Savoirpedia/SavoirCopilot.js",
                                                lineNumber: 387,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/libs/shared-ui/src/Savoirpedia/SavoirCopilot.js",
                                        lineNumber: 385,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(MessageContent, {
                                        content: m.content,
                                        role: m.role
                                    }, void 0, false, {
                                        fileName: "[project]/libs/shared-ui/src/Savoirpedia/SavoirCopilot.js",
                                        lineNumber: 389,
                                        columnNumber: 17
                                    }, this),
                                    m.role === 'error' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "jsx-53600edce5dcb586" + " " + "error-text",
                                        children: "Error processing request"
                                    }, void 0, false, {
                                        fileName: "[project]/libs/shared-ui/src/Savoirpedia/SavoirCopilot.js",
                                        lineNumber: 390,
                                        columnNumber: 40
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/libs/shared-ui/src/Savoirpedia/SavoirCopilot.js",
                                lineNumber: 384,
                                columnNumber: 15
                            }, this)
                        }, m.id, false, {
                            fileName: "[project]/libs/shared-ui/src/Savoirpedia/SavoirCopilot.js",
                            lineNumber: 383,
                            columnNumber: 13
                        }, this)),
                    loading && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "jsx-53600edce5dcb586" + " " + "loading-indicator",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "jsx-53600edce5dcb586" + " " + "dots",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "jsx-53600edce5dcb586" + " " + "dot dot-1"
                                }, void 0, false, {
                                    fileName: "[project]/libs/shared-ui/src/Savoirpedia/SavoirCopilot.js",
                                    lineNumber: 398,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "jsx-53600edce5dcb586" + " " + "dot dot-2"
                                }, void 0, false, {
                                    fileName: "[project]/libs/shared-ui/src/Savoirpedia/SavoirCopilot.js",
                                    lineNumber: 399,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "jsx-53600edce5dcb586" + " " + "dot dot-3"
                                }, void 0, false, {
                                    fileName: "[project]/libs/shared-ui/src/Savoirpedia/SavoirCopilot.js",
                                    lineNumber: 400,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/libs/shared-ui/src/Savoirpedia/SavoirCopilot.js",
                            lineNumber: 397,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/libs/shared-ui/src/Savoirpedia/SavoirCopilot.js",
                        lineNumber: 396,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/libs/shared-ui/src/Savoirpedia/SavoirCopilot.js",
                lineNumber: 381,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "jsx-53600edce5dcb586" + " " + "input-area",
                children: [
                    selectedImage && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "jsx-53600edce5dcb586" + " " + "image-preview-container",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                src: selectedImage,
                                alt: "Preview",
                                className: "img-preview",
                                width: 60,
                                height: 60
                            }, void 0, false, {
                                fileName: "[project]/libs/shared-ui/src/Savoirpedia/SavoirCopilot.js",
                                lineNumber: 411,
                                columnNumber: 17
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>setSelectedImage(null),
                                className: "jsx-53600edce5dcb586" + " " + "remove-img-btn",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                    size: 12
                                }, void 0, false, {
                                    fileName: "[project]/libs/shared-ui/src/Savoirpedia/SavoirCopilot.js",
                                    lineNumber: 413,
                                    columnNumber: 21
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/libs/shared-ui/src/Savoirpedia/SavoirCopilot.js",
                                lineNumber: 412,
                                columnNumber: 17
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/libs/shared-ui/src/Savoirpedia/SavoirCopilot.js",
                        lineNumber: 410,
                        columnNumber: 13
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "jsx-53600edce5dcb586" + " " + `input-wrapper ${isListening ? 'listening' : ''}`,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                value: input,
                                placeholder: isListening ? "Listening..." : "Write a paragraph or upload image...",
                                onChange: (e)=>setInput(e.target.value),
                                onKeyDown: (e)=>{
                                    if (e.key === 'Enter' && !e.shiftKey) handleSend(e);
                                },
                                className: "jsx-53600edce5dcb586" + " " + "chat-input"
                            }, void 0, false, {
                                fileName: "[project]/libs/shared-ui/src/Savoirpedia/SavoirCopilot.js",
                                lineNumber: 419,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                type: "file",
                                ref: fileInputRef,
                                style: {
                                    display: 'none'
                                },
                                accept: "image/*",
                                onChange: handleImageUpload,
                                className: "jsx-53600edce5dcb586"
                            }, void 0, false, {
                                fileName: "[project]/libs/shared-ui/src/Savoirpedia/SavoirCopilot.js",
                                lineNumber: 428,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "jsx-53600edce5dcb586" + " " + "input-actions",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        onClick: ()=>fileInputRef.current?.click(),
                                        title: "Upload Image",
                                        className: "jsx-53600edce5dcb586" + " " + `action-btn upload ${selectedImage ? 'active' : ''}`,
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Image$3e$__["Image"], {
                                            size: 16
                                        }, void 0, false, {
                                            fileName: "[project]/libs/shared-ui/src/Savoirpedia/SavoirCopilot.js",
                                            lineNumber: 444,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/libs/shared-ui/src/Savoirpedia/SavoirCopilot.js",
                                        lineNumber: 438,
                                        columnNumber: 14
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        onClick: toggleListening,
                                        className: "jsx-53600edce5dcb586" + " " + `action-btn mic ${isListening ? 'active' : ''}`,
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$mic$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Mic$3e$__["Mic"], {
                                            size: 16
                                        }, void 0, false, {
                                            fileName: "[project]/libs/shared-ui/src/Savoirpedia/SavoirCopilot.js",
                                            lineNumber: 452,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/libs/shared-ui/src/Savoirpedia/SavoirCopilot.js",
                                        lineNumber: 447,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        onClick: handleSend,
                                        disabled: loading || !input.trim() && !selectedImage,
                                        className: "jsx-53600edce5dcb586" + " " + "action-btn send",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$send$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Send$3e$__["Send"], {
                                            size: 16
                                        }, void 0, false, {
                                            fileName: "[project]/libs/shared-ui/src/Savoirpedia/SavoirCopilot.js",
                                            lineNumber: 460,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/libs/shared-ui/src/Savoirpedia/SavoirCopilot.js",
                                        lineNumber: 454,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/libs/shared-ui/src/Savoirpedia/SavoirCopilot.js",
                                lineNumber: 436,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/libs/shared-ui/src/Savoirpedia/SavoirCopilot.js",
                        lineNumber: 418,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/libs/shared-ui/src/Savoirpedia/SavoirCopilot.js",
                lineNumber: 407,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$node_modules$2f$styled$2d$jsx$2f$style$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                id: "53600edce5dcb586",
                children: ".code-block-wrapper.jsx-53600edce5dcb586{background:#011627;border:1px solid #ffffff1a;border-radius:8px;margin:15px 0;overflow:hidden}.code-header.jsx-53600edce5dcb586{color:#888;text-transform:uppercase;background:#ffffff0d;border-bottom:1px solid #ffffff0d;justify-content:space-between;padding:5px 15px;font-size:10px;display:flex}.code-container.jsx-53600edce5dcb586{display:flex;position:relative}.code-container.jsx-53600edce5dcb586 .line-numbers.jsx-53600edce5dcb586{text-align:right;color:#444;font-family:inherit;font-size:13px;line-height:inherit;-webkit-user-select:none;user-select:none;background:#0000004d;border-right:1px solid #ffffff0d;flex-shrink:0;min-width:40px;padding:15px 10px 15px 0}.code-container.jsx-53600edce5dcb586 .line-number.jsx-53600edce5dcb586{justify-content:flex-end;align-items:center;height:1.5em;display:flex}.code-container.jsx-53600edce5dcb586 pre.jsx-53600edce5dcb586{flex:1;line-height:1.5;overflow-x:auto;background:0 0!important;border-radius:0!important;margin:0!important;padding:15px!important}.code-container.jsx-53600edce5dcb586 pre.jsx-53600edce5dcb586 code.jsx-53600edce5dcb586{font-family:Fira Code,monospace!important;font-size:13px!important}.inline-code.jsx-53600edce5dcb586{color:#00f0ff;background:#ffffff1a;border-radius:4px;padding:2px 5px;font-family:monospace}.copilot-container.jsx-53600edce5dcb586{-webkit-backdrop-filter:blur(20px);backdrop-filter:blur(20px);color:#e2e8f0;background:#050505f2;border-left:1px solid #ffffff14;flex-direction:column;width:100%;height:100%;font-family:Inter,sans-serif;display:flex}.header.jsx-53600edce5dcb586{border-bottom:1px solid #ffffff14;justify-content:space-between;align-items:center;padding:14px 18px;display:flex}.brand.jsx-53600edce5dcb586{align-items:center;gap:10px;display:flex}.title.jsx-53600edce5dcb586{letter-spacing:.15em;color:#fff;text-transform:uppercase;margin:0;font-size:11px;font-weight:800}.icon-sparkles{color:#00f0ff;filter:drop-shadow(0 0 5px #00f0ff80)}.header-controls.jsx-53600edce5dcb586{align-items:center;gap:8px;display:flex}.model-select.jsx-53600edce5dcb586{color:#94a3b8;background:#ffffff0d;border:1px solid #ffffff14;border-radius:4px;outline:none;padding:4px 8px;font-size:11px}.model-select.jsx-53600edce5dcb586 option.jsx-53600edce5dcb586{color:#fff;background:#1a1a20}.voice-btn.jsx-53600edce5dcb586{color:#94a3b8;cursor:pointer;background:#ffffff0d;border:1px solid #ffffff0d;border-radius:50%;justify-content:center;align-items:center;width:28px;height:28px;display:flex}.voice-btn.active.jsx-53600edce5dcb586{color:#22d3ee;border-color:#22d3ee4d}.messages-area.jsx-53600edce5dcb586{flex-direction:column;flex:1;gap:24px;padding:20px;display:flex;overflow-y:auto}.message-row.jsx-53600edce5dcb586{width:100%;animation:.3s ease-out fadeIn;display:flex}@keyframes fadeIn{0%{opacity:0;transform:translateY(5px)}to{opacity:1;transform:translateY(0)}}.message-row.user.jsx-53600edce5dcb586{justify-content:flex-end}.message-row.assistant.jsx-53600edce5dcb586{justify-content:flex-start}.message-bubble.jsx-53600edce5dcb586{border-radius:12px;max-width:88%;padding:12px 16px;font-size:13px;line-height:1.6;position:relative;box-shadow:0 4px 12px #0003}.message-bubble.user.jsx-53600edce5dcb586{color:#fff;background:linear-gradient(135deg,#4f46e5,#7c3aed);border-top-right-radius:2px}.message-bubble.assistant.jsx-53600edce5dcb586{color:#e2e8f0;-webkit-backdrop-filter:blur(10px);backdrop-filter:blur(10px);background:#14141999;border:1px solid #ffffff14;border-top-left-radius:2px}.message-meta.jsx-53600edce5dcb586{opacity:.5;text-transform:uppercase;align-items:center;gap:8px;margin-bottom:8px;font-size:10px;font-weight:600;display:flex}.text-content.jsx-53600edce5dcb586{white-space:pre-wrap;font-size:13px;line-height:1.6}.text-content.jsx-53600edce5dcb586 img{border-radius:8px;max-width:100%;margin:10px 0;display:block}.user-multimodal.jsx-53600edce5dcb586{flex-direction:column;gap:8px;display:flex}.uploaded-image-preview.jsx-53600edce5dcb586 img.jsx-53600edce5dcb586{border:1px solid #fff3;border-radius:8px;max-width:150px}.image-container.jsx-53600edce5dcb586{border:1px solid #ffffff1a;border-radius:8px;margin-top:12px;overflow:hidden}.generated-image.jsx-53600edce5dcb586{width:100%;height:auto;display:block}.image-caption.jsx-53600edce5dcb586{color:#94a3b8;text-align:center;background:#0006;border-top:1px solid #ffffff0d;padding:4px 8px;font-size:10px}.think-block.jsx-53600edce5dcb586{background:#0000004d;border:1px solid #ffffff0d;border-radius:8px;align-items:flex-start;gap:8px;margin-bottom:10px;padding:8px 12px;display:flex}.think-text.jsx-53600edce5dcb586{color:#64748b;font-family:monospace;font-size:11px;font-style:italic}.action-badge.jsx-53600edce5dcb586{color:#22d3ee;background:#06b6d41a;border:1px solid #06b6d433;border-radius:6px;align-items:center;gap:6px;margin-top:8px;padding:6px 10px;font-size:11px;font-weight:500;display:inline-flex}.loading-indicator.jsx-53600edce5dcb586{padding:4px 16px}.dots.jsx-53600edce5dcb586{background:#ffffff0d;border-radius:12px;gap:4px;padding:8px 14px;display:inline-flex}.dot.jsx-53600edce5dcb586{background:#94a3b8;border-radius:50%;width:4px;height:4px;animation:1.4s ease-in-out infinite both bounce}.dot-1.jsx-53600edce5dcb586{animation-delay:-.32s}.dot-2.jsx-53600edce5dcb586{animation-delay:-.16s}@keyframes bounce{0%,80%,to{transform:scale(0)}40%{transform:scale(1)}}.input-area.jsx-53600edce5dcb586{background:linear-gradient(#0000,#000c);padding:16px 20px 24px;position:relative}.image-preview-container.jsx-53600edce5dcb586{background:#141419e6;border:1px solid #ffffff1a;border-radius:8px;padding:4px;display:flex;position:absolute;bottom:80px;left:20px}.img-preview.jsx-53600edce5dcb586{object-fit:cover;border-radius:4px;width:60px;height:60px}.remove-img-btn.jsx-53600edce5dcb586{color:#fff;cursor:pointer;background:#ef4444;border:none;border-radius:50%;justify-content:center;align-items:center;width:18px;height:18px;display:flex;position:absolute;top:-6px;right:-6px}.input-wrapper.jsx-53600edce5dcb586{background:#1e1e2499;border:1px solid #ffffff1a;border-radius:10px;transition:all .2s;position:relative}.input-wrapper.jsx-53600edce5dcb586:focus-within{background:#1e1e24e6;border-color:#8b5cf666}.chat-input.jsx-53600edce5dcb586{color:#f1f5f9;background:0 0;border:none;outline:none;width:100%;padding:14px 120px 14px 16px;font-size:13px}.input-actions.jsx-53600edce5dcb586{gap:6px;display:flex;position:absolute;top:50%;right:8px;transform:translateY(-50%)}.action-btn.jsx-53600edce5dcb586{color:#64748b;cursor:pointer;background:0 0;border:none;border-radius:6px;justify-content:center;align-items:center;width:28px;height:28px;display:flex}.action-btn.jsx-53600edce5dcb586:hover{color:#94a3b8;background:#ffffff0d}.action-btn.active.jsx-53600edce5dcb586{color:#22d3ee}.action-btn.mic.active.jsx-53600edce5dcb586{animation:1.5s infinite pulse-mic}.action-btn.send.jsx-53600edce5dcb586:hover{color:#c4b5fd;background:#8b5cf633}.action-btn.upload.jsx-53600edce5dcb586:hover{color:#34d399}.custom-scrollbar.jsx-53600edce5dcb586::-webkit-scrollbar{width:4px}.custom-scrollbar.jsx-53600edce5dcb586::-webkit-scrollbar-thumb{background:#ffffff1a;border-radius:10px}"
            }, void 0, false, void 0, this)
        ]
    }, void 0, true, {
        fileName: "[project]/libs/shared-ui/src/Savoirpedia/SavoirCopilot.js",
        lineNumber: 356,
        columnNumber: 5
    }, this);
}
_s(SavoirCopilot, "veHJ5eQGoo/27TVfbwfVR0Lo5xM=");
_c = SavoirCopilot;
var _c;
__turbopack_context__.k.register(_c, "SavoirCopilot");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/libs/shared-ui/src/Savoirpedia/WikiArticle.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>WikiArticle
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$node_modules$2f$styled$2d$jsx$2f$style$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/node_modules/styled-jsx/style.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/image.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$libs$2f$shared$2d$ui$2f$src$2f$Savoirpedia$2f$ShareButton$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/libs/shared-ui/src/Savoirpedia/ShareButton.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$libs$2f$shared$2d$ui$2f$src$2f$Effects$2f$MagneticWrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/libs/shared-ui/src/Effects/MagneticWrapper.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/x.js [app-client] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sparkles$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Sparkles$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/sparkles.js [app-client] (ecmascript) <export default as Sparkles>");
var __TURBOPACK__imported__module__$5b$project$5d2f$libs$2f$shared$2d$ui$2f$src$2f$Savoirpedia$2f$SavoirCopilot$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/libs/shared-ui/src/Savoirpedia/SavoirCopilot.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
;
;
;
// 1. Decryption Animation Utility
const useDecryption = (text, active)=>{
    _s();
    const [display, setDisplay] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(active ? '' : text);
    const chars = '!<>-_\\/[]{}—=+*^?#________';
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useDecryption.useEffect": ()=>{
            if (!active) return;
            let iteration = 0;
            const interval = setInterval({
                "useDecryption.useEffect.interval": ()=>{
                    setDisplay(text.split('').map({
                        "useDecryption.useEffect.interval": (char, index)=>{
                            if (index < iteration) return text[index];
                            return chars[Math.floor(Math.random() * chars.length)];
                        }
                    }["useDecryption.useEffect.interval"]).join(''));
                    if (iteration >= text.length) clearInterval(interval);
                    iteration += Math.ceil(text.length / 30); // Reveal speed
                }
            }["useDecryption.useEffect.interval"], 30);
            return ({
                "useDecryption.useEffect": ()=>clearInterval(interval)
            })["useDecryption.useEffect"];
        }
    }["useDecryption.useEffect"], [
        text,
        active
    ]);
    return active ? display : text;
};
_s(useDecryption, "BC+rB1cSG7vuXNMqa86yXUg6hBE=");
function WikiArticle({ article, allArticles = [] }) {
    _s1();
    const [scrolled, setScrolled] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const articleContent = article?.content;
    const articleSlug = article?.slug;
    const articleTitle = article?.title;
    const [activeSection, setActiveSection] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('overview');
    const [isDecrypting, setIsDecrypting] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [selection, setSelection] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        text: '',
        x: 0,
        y: 0,
        show: false
    });
    const [copilotQuery, setCopilotQuery] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [soundEnabled, setSoundEnabled] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [showHistory, setShowHistory] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [showCopilot, setShowCopilot] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const wikiAuthor = article?.authorId || article?.author || 'Nexus Researcher';
    const wikiCategory = article?.category || "Documentation";
    // Default image extraction if not provided
    const heroImage = article?.image || '/assets/logo.jpg';
    // 1. Intelligence Helpers
    const calculateStats = (text)=>{
        const words = text.replace(/<[^>]*>/g, '').split(/\s+/).length;
        const readTime = Math.ceil(words / 200);
        // Complexity logic: based on word count and "technical" keywords
        const techKeywords = [
            'system',
            'quantum',
            'algorithm',
            'neural',
            'interface',
            'logic',
            'protocol'
        ];
        const techCount = techKeywords.filter((k)=>text.toLowerCase().includes(k)).length;
        let tier = "Tier 1: General";
        if (words > 500 || techCount > 2) tier = "Tier 2: Advanced";
        if (words > 1000 || techCount > 4) tier = "Tier 3: Expert";
        if (words > 2000 || techCount > 6) tier = "Tier 4: Master";
        return {
            readTime,
            tier
        };
    };
    const stats = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "WikiArticle.useMemo[stats]": ()=>{
            if (!articleContent) return {
                readTime: 0,
                tier: "Tier 1: General"
            };
            return calculateStats(articleContent);
        }
    }["WikiArticle.useMemo[stats]"], [
        articleContent
    ]);
    const decryptedTitle = useDecryption(articleTitle || '', isDecrypting);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "WikiArticle.useEffect": ()=>{
            const timer = setTimeout({
                "WikiArticle.useEffect.timer": ()=>setIsDecrypting(false)
            }["WikiArticle.useEffect.timer"], 2000);
            return ({
                "WikiArticle.useEffect": ()=>clearTimeout(timer)
            })["WikiArticle.useEffect"];
        }
    }["WikiArticle.useEffect"], []);
    // 2. Auto-Linker Logic
    const processedContent = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "WikiArticle.useMemo[processedContent]": ()=>{
            if (!articleContent || !allArticles.length) return articleContent || '';
            let content = articleContent;
            // Sort articles by title length descending
            const sortedArticles = [
                ...allArticles
            ].sort({
                "WikiArticle.useMemo[processedContent].sortedArticles": (a, b)=>b.title.length - a.title.length
            }["WikiArticle.useMemo[processedContent].sortedArticles"]);
            sortedArticles.forEach({
                "WikiArticle.useMemo[processedContent]": (item)=>{
                    if (item.slug === articleSlug) return;
                    const escapedTitle = item.title.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
                    const regex = new RegExp(`(?<!<[^>]*)${escapedTitle}(?![^<]*>)`, 'gi');
                    let replaced = false;
                    content = content.replace(regex, {
                        "WikiArticle.useMemo[processedContent]": (match)=>{
                            if (replaced) return match;
                            replaced = true;
                            return `<a href="/savoirpedia/post/${item.slug}" class="auto-link">${match}</a>`;
                        }
                    }["WikiArticle.useMemo[processedContent]"]);
                }
            }["WikiArticle.useMemo[processedContent]"]);
            return content;
        }
    }["WikiArticle.useMemo[processedContent]"], [
        articleContent,
        allArticles,
        articleSlug
    ]);
    // 4. Highlight-to-Ask logic
    const handleMouseUp = (e)=>{
        const selectedText = window.getSelection().toString().trim();
        if (selectedText.length > 5) {
            setSelection({
                text: selectedText,
                x: e.pageX,
                y: e.pageY,
                show: true
            });
        } else {
            setSelection({
                ...selection,
                show: false
            });
        }
    };
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "WikiArticle.useEffect": ()=>{
            const handleClick = {
                "WikiArticle.useEffect.handleClick": ()=>setSelection({
                        ...selection,
                        show: false
                    })
            }["WikiArticle.useEffect.handleClick"];
            window.addEventListener('click', handleClick);
            return ({
                "WikiArticle.useEffect": ()=>window.removeEventListener('click', handleClick)
            })["WikiArticle.useEffect"];
        }
    }["WikiArticle.useEffect"], [
        selection
    ]);
    // 5. Soundscape Logic
    const playSound = (freq = 440, type = 'sine', duration = 0.1)=>{
        if (!soundEnabled) return;
        try {
            const ctx = new (window.AudioContext || window.webkitAudioContext)();
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.type = type;
            osc.frequency.setValueAtTime(freq, ctx.currentTime);
            gain.gain.setValueAtTime(0.1, ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);
            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.start();
            osc.stop(ctx.currentTime + duration);
        } catch (e) {}
    };
    // 6. PDF Export & History
    const exportToPDF = ()=>{
        playSound(880, 'sine', 0.2);
        window.print();
    };
    // Scroll Progress & Active Section Logic
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "WikiArticle.useEffect": ()=>{
            const sections = [
                'overview',
                'content',
                'references'
            ];
            const handleScroll = {
                "WikiArticle.useEffect.handleScroll": ()=>{
                    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
                    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
                    const scrolledPercentage = winScroll / height * 100;
                    setScrolled(scrolledPercentage);
                    // Active section detection
                    for (const section of sections){
                        const element = document.getElementById(section);
                        if (element) {
                            const rect = element.getBoundingClientRect();
                            if (rect.top <= 150) {
                                setActiveSection(section);
                            }
                        }
                    }
                }
            }["WikiArticle.useEffect.handleScroll"];
            window.addEventListener('scroll', handleScroll);
            return ({
                "WikiArticle.useEffect": ()=>window.removeEventListener('scroll', handleScroll)
            })["WikiArticle.useEffect"];
        }
    }["WikiArticle.useEffect"], []);
    // 7. Guard: Check for null article before rendering
    if (!article) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "jsx-3e3e5570b37c5160" + " " + "wiki-error",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$node_modules$2f$styled$2d$jsx$2f$style$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                    id: "3e3e5570b37c5160",
                    children: ".wiki-error.jsx-3e3e5570b37c5160{text-align:center;color:#fff;flex-direction:column;align-items:center;gap:20px;padding:100px;font-family:Orbitron,sans-serif;display:flex}.error-icon.jsx-3e3e5570b37c5160{color:#ff3232;font-size:4rem}.back-link.jsx-3e3e5570b37c5160{color:#00f0ff;border:1px solid #00f0ff;border-radius:4px;padding:10px 20px;text-decoration:none}"
                }, void 0, false, void 0, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "jsx-3e3e5570b37c5160" + " " + "error-icon",
                    children: "⚠️"
                }, void 0, false, {
                    fileName: "[project]/libs/shared-ui/src/Savoirpedia/WikiArticle.js",
                    lineNumber: 195,
                    columnNumber: 17
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                    className: "jsx-3e3e5570b37c5160",
                    children: "CRITICAL_ERROR: DATA_MISSING"
                }, void 0, false, {
                    fileName: "[project]/libs/shared-ui/src/Savoirpedia/WikiArticle.js",
                    lineNumber: 196,
                    columnNumber: 17
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "jsx-3e3e5570b37c5160",
                    children: "The requested intelligence payload is not present in the neural archives."
                }, void 0, false, {
                    fileName: "[project]/libs/shared-ui/src/Savoirpedia/WikiArticle.js",
                    lineNumber: 197,
                    columnNumber: 17
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                    href: "/savoirpedia",
                    className: "back-link",
                    children: "RETURN TO HUB"
                }, void 0, false, {
                    fileName: "[project]/libs/shared-ui/src/Savoirpedia/WikiArticle.js",
                    lineNumber: 198,
                    columnNumber: 17
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/libs/shared-ui/src/Savoirpedia/WikiArticle.js",
            lineNumber: 186,
            columnNumber: 13
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("article", {
        className: "jsx-6d0242266b29ddcd" + " " + "wiki-wrapper",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "jsx-6d0242266b29ddcd" + " " + "progress-container",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        width: `${scrolled}%`
                    },
                    className: "jsx-6d0242266b29ddcd" + " " + "progress-bar"
                }, void 0, false, {
                    fileName: "[project]/libs/shared-ui/src/Savoirpedia/WikiArticle.js",
                    lineNumber: 207,
                    columnNumber: 17
                }, this)
            }, void 0, false, {
                fileName: "[project]/libs/shared-ui/src/Savoirpedia/WikiArticle.js",
                lineNumber: 206,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
                className: "jsx-6d0242266b29ddcd" + " " + "article-hero",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "jsx-6d0242266b29ddcd" + " " + "hero-bg",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                src: heroImage,
                                alt: "Hero",
                                fill: true,
                                style: {
                                    objectFit: 'cover'
                                },
                                className: "hero-img-blur",
                                priority: true
                            }, void 0, false, {
                                fileName: "[project]/libs/shared-ui/src/Savoirpedia/WikiArticle.js",
                                lineNumber: 213,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "jsx-6d0242266b29ddcd" + " " + "hero-overlay"
                            }, void 0, false, {
                                fileName: "[project]/libs/shared-ui/src/Savoirpedia/WikiArticle.js",
                                lineNumber: 214,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/libs/shared-ui/src/Savoirpedia/WikiArticle.js",
                        lineNumber: 212,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "jsx-6d0242266b29ddcd" + " " + "hero-content",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "jsx-6d0242266b29ddcd" + " " + "hero-meta",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "jsx-6d0242266b29ddcd" + " " + "hero-cat",
                                        children: wikiCategory
                                    }, void 0, false, {
                                        fileName: "[project]/libs/shared-ui/src/Savoirpedia/WikiArticle.js",
                                        lineNumber: 219,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "jsx-6d0242266b29ddcd" + " " + "hero-intelligence",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "jsx-6d0242266b29ddcd" + " " + "intel-item",
                                                children: [
                                                    "READ TIME: ",
                                                    stats.readTime,
                                                    " MIN"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/libs/shared-ui/src/Savoirpedia/WikiArticle.js",
                                                lineNumber: 221,
                                                columnNumber: 29
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "jsx-6d0242266b29ddcd" + " " + "intel-item",
                                                children: stats.tier
                                            }, void 0, false, {
                                                fileName: "[project]/libs/shared-ui/src/Savoirpedia/WikiArticle.js",
                                                lineNumber: 222,
                                                columnNumber: 29
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/libs/shared-ui/src/Savoirpedia/WikiArticle.js",
                                        lineNumber: 220,
                                        columnNumber: 25
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/libs/shared-ui/src/Savoirpedia/WikiArticle.js",
                                lineNumber: 218,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                className: "jsx-6d0242266b29ddcd" + " " + "hero-title",
                                children: isDecrypting ? decryptedTitle : article.title
                            }, void 0, false, {
                                fileName: "[project]/libs/shared-ui/src/Savoirpedia/WikiArticle.js",
                                lineNumber: 225,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "jsx-6d0242266b29ddcd" + " " + "hero-actions",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$libs$2f$shared$2d$ui$2f$src$2f$Effects$2f$MagneticWrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                        strength: 0.2,
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            onClick: ()=>playSound(880, 'triangle'),
                                            className: "jsx-6d0242266b29ddcd",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$libs$2f$shared$2d$ui$2f$src$2f$Savoirpedia$2f$ShareButton$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                title: article.title
                                            }, void 0, false, {
                                                fileName: "[project]/libs/shared-ui/src/Savoirpedia/WikiArticle.js",
                                                lineNumber: 227,
                                                columnNumber: 105
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/libs/shared-ui/src/Savoirpedia/WikiArticle.js",
                                            lineNumber: 227,
                                            columnNumber: 57
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/libs/shared-ui/src/Savoirpedia/WikiArticle.js",
                                        lineNumber: 227,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$libs$2f$shared$2d$ui$2f$src$2f$Effects$2f$MagneticWrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                        strength: 0.2,
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                            href: "/savoirpedia",
                                            className: "back-btn",
                                            onMouseEnter: ()=>playSound(440, 'sine', 0.05),
                                            children: "← ARCHIVE"
                                        }, void 0, false, {
                                            fileName: "[project]/libs/shared-ui/src/Savoirpedia/WikiArticle.js",
                                            lineNumber: 229,
                                            columnNumber: 29
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/libs/shared-ui/src/Savoirpedia/WikiArticle.js",
                                        lineNumber: 228,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>{
                                            setSoundEnabled(!soundEnabled);
                                            if (!soundEnabled) playSound(660, 'square', 0.1);
                                        },
                                        className: "jsx-6d0242266b29ddcd" + " " + `sound-toggle ${soundEnabled ? 'active' : ''}`,
                                        children: soundEnabled ? 'AUDIO: ON' : 'AUDIO: OFF'
                                    }, void 0, false, {
                                        fileName: "[project]/libs/shared-ui/src/Savoirpedia/WikiArticle.js",
                                        lineNumber: 231,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: exportToPDF,
                                        title: "Generate Intelligence Report",
                                        className: "jsx-6d0242266b29ddcd" + " " + "btn-utility",
                                        children: "EXPORT REPORT"
                                    }, void 0, false, {
                                        fileName: "[project]/libs/shared-ui/src/Savoirpedia/WikiArticle.js",
                                        lineNumber: 237,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>setShowHistory(true),
                                        title: "View System Logs",
                                        className: "jsx-6d0242266b29ddcd" + " " + "btn-utility",
                                        children: "HISTORY"
                                    }, void 0, false, {
                                        fileName: "[project]/libs/shared-ui/src/Savoirpedia/WikiArticle.js",
                                        lineNumber: 240,
                                        columnNumber: 25
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/libs/shared-ui/src/Savoirpedia/WikiArticle.js",
                                lineNumber: 226,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/libs/shared-ui/src/Savoirpedia/WikiArticle.js",
                        lineNumber: 217,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/libs/shared-ui/src/Savoirpedia/WikiArticle.js",
                lineNumber: 211,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "jsx-6d0242266b29ddcd" + " " + "article-layout",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        onMouseUp: handleMouseUp,
                        className: "jsx-6d0242266b29ddcd" + " " + "main-col",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                id: "overview",
                                className: "jsx-6d0242266b29ddcd" + " " + "intro-block glass",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "jsx-6d0242266b29ddcd" + " " + "lead-paragraph",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                            className: "jsx-6d0242266b29ddcd",
                                            children: article.title
                                        }, void 0, false, {
                                            fileName: "[project]/libs/shared-ui/src/Savoirpedia/WikiArticle.js",
                                            lineNumber: 251,
                                            columnNumber: 29
                                        }, this),
                                        " is a documented entry in the system archives, initialized by ",
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                            className: "jsx-6d0242266b29ddcd",
                                            children: wikiAuthor
                                        }, void 0, false, {
                                            fileName: "[project]/libs/shared-ui/src/Savoirpedia/WikiArticle.js",
                                            lineNumber: 251,
                                            columnNumber: 123
                                        }, this),
                                        ". It serves as a primary intelligence source regarding ",
                                        wikiCategory.toLowerCase(),
                                        "."
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/libs/shared-ui/src/Savoirpedia/WikiArticle.js",
                                    lineNumber: 250,
                                    columnNumber: 25
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/libs/shared-ui/src/Savoirpedia/WikiArticle.js",
                                lineNumber: 249,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                id: "content",
                                dangerouslySetInnerHTML: {
                                    __html: processedContent
                                },
                                className: "jsx-6d0242266b29ddcd" + " " + `wiki-content-render ${isDecrypting ? 'decrypting' : ''}`
                            }, void 0, false, {
                                fileName: "[project]/libs/shared-ui/src/Savoirpedia/WikiArticle.js",
                                lineNumber: 256,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                id: "references",
                                className: "jsx-6d0242266b29ddcd" + " " + "wiki-references",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        className: "jsx-6d0242266b29ddcd",
                                        children: "System References"
                                    }, void 0, false, {
                                        fileName: "[project]/libs/shared-ui/src/Savoirpedia/WikiArticle.js",
                                        lineNumber: 259,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ol", {
                                        className: "jsx-6d0242266b29ddcd" + " " + "refs-list",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                className: "jsx-6d0242266b29ddcd",
                                                children: [
                                                    "^ Original entry by ",
                                                    wikiAuthor,
                                                    ", ",
                                                    new Date(article.date).getFullYear(),
                                                    "."
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/libs/shared-ui/src/Savoirpedia/WikiArticle.js",
                                                lineNumber: 261,
                                                columnNumber: 29
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                className: "jsx-6d0242266b29ddcd",
                                                children: "^ System logs verification hash: #A8F-492."
                                            }, void 0, false, {
                                                fileName: "[project]/libs/shared-ui/src/Savoirpedia/WikiArticle.js",
                                                lineNumber: 262,
                                                columnNumber: 29
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/libs/shared-ui/src/Savoirpedia/WikiArticle.js",
                                        lineNumber: 260,
                                        columnNumber: 25
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/libs/shared-ui/src/Savoirpedia/WikiArticle.js",
                                lineNumber: 258,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/libs/shared-ui/src/Savoirpedia/WikiArticle.js",
                        lineNumber: 248,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("aside", {
                        className: "jsx-6d0242266b29ddcd" + " " + "side-col",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "jsx-6d0242266b29ddcd" + " " + "meta-card glass",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "jsx-6d0242266b29ddcd" + " " + "meta-card-header",
                                        children: "System Data"
                                    }, void 0, false, {
                                        fileName: "[project]/libs/shared-ui/src/Savoirpedia/WikiArticle.js",
                                        lineNumber: 270,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "jsx-6d0242266b29ddcd" + " " + "meta-row",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "jsx-6d0242266b29ddcd" + " " + "meta-label",
                                                children: "ID"
                                            }, void 0, false, {
                                                fileName: "[project]/libs/shared-ui/src/Savoirpedia/WikiArticle.js",
                                                lineNumber: 272,
                                                columnNumber: 29
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "jsx-6d0242266b29ddcd" + " " + "meta-value mono",
                                                children: article.id
                                            }, void 0, false, {
                                                fileName: "[project]/libs/shared-ui/src/Savoirpedia/WikiArticle.js",
                                                lineNumber: 273,
                                                columnNumber: 29
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/libs/shared-ui/src/Savoirpedia/WikiArticle.js",
                                        lineNumber: 271,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "jsx-6d0242266b29ddcd" + " " + "meta-row",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "jsx-6d0242266b29ddcd" + " " + "meta-label",
                                                children: "Author"
                                            }, void 0, false, {
                                                fileName: "[project]/libs/shared-ui/src/Savoirpedia/WikiArticle.js",
                                                lineNumber: 276,
                                                columnNumber: 29
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "jsx-6d0242266b29ddcd" + " " + "meta-value",
                                                children: wikiAuthor
                                            }, void 0, false, {
                                                fileName: "[project]/libs/shared-ui/src/Savoirpedia/WikiArticle.js",
                                                lineNumber: 277,
                                                columnNumber: 29
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/libs/shared-ui/src/Savoirpedia/WikiArticle.js",
                                        lineNumber: 275,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "jsx-6d0242266b29ddcd" + " " + "meta-row",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "jsx-6d0242266b29ddcd" + " " + "meta-label",
                                                children: "Last Updated"
                                            }, void 0, false, {
                                                fileName: "[project]/libs/shared-ui/src/Savoirpedia/WikiArticle.js",
                                                lineNumber: 280,
                                                columnNumber: 29
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "jsx-6d0242266b29ddcd" + " " + "meta-value",
                                                children: new Date(article.updatedAt || article.date).toLocaleDateString()
                                            }, void 0, false, {
                                                fileName: "[project]/libs/shared-ui/src/Savoirpedia/WikiArticle.js",
                                                lineNumber: 281,
                                                columnNumber: 29
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/libs/shared-ui/src/Savoirpedia/WikiArticle.js",
                                        lineNumber: 279,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "jsx-6d0242266b29ddcd" + " " + "meta-row",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "jsx-6d0242266b29ddcd" + " " + "meta-label",
                                                children: "Status"
                                            }, void 0, false, {
                                                fileName: "[project]/libs/shared-ui/src/Savoirpedia/WikiArticle.js",
                                                lineNumber: 284,
                                                columnNumber: 29
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "jsx-6d0242266b29ddcd" + " " + "status-badge verified",
                                                children: "VERIFIED"
                                            }, void 0, false, {
                                                fileName: "[project]/libs/shared-ui/src/Savoirpedia/WikiArticle.js",
                                                lineNumber: 285,
                                                columnNumber: 29
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/libs/shared-ui/src/Savoirpedia/WikiArticle.js",
                                        lineNumber: 283,
                                        columnNumber: 25
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/libs/shared-ui/src/Savoirpedia/WikiArticle.js",
                                lineNumber: 269,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "jsx-6d0242266b29ddcd" + " " + "toc-card glass",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "jsx-6d0242266b29ddcd" + " " + "toc-header",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "jsx-6d0242266b29ddcd",
                                                children: "Index"
                                            }, void 0, false, {
                                                fileName: "[project]/libs/shared-ui/src/Savoirpedia/WikiArticle.js",
                                                lineNumber: 291,
                                                columnNumber: 29
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "jsx-6d0242266b29ddcd" + " " + "scanning-line"
                                            }, void 0, false, {
                                                fileName: "[project]/libs/shared-ui/src/Savoirpedia/WikiArticle.js",
                                                lineNumber: 292,
                                                columnNumber: 29
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/libs/shared-ui/src/Savoirpedia/WikiArticle.js",
                                        lineNumber: 290,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                        className: "jsx-6d0242266b29ddcd" + " " + "toc-list",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                onClick: ()=>playSound(330),
                                                className: "jsx-6d0242266b29ddcd" + " " + ((activeSection === 'overview' ? 'active' : '') || ""),
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                    href: "#overview",
                                                    className: "jsx-6d0242266b29ddcd",
                                                    children: "01. Overview"
                                                }, void 0, false, {
                                                    fileName: "[project]/libs/shared-ui/src/Savoirpedia/WikiArticle.js",
                                                    lineNumber: 295,
                                                    columnNumber: 121
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/libs/shared-ui/src/Savoirpedia/WikiArticle.js",
                                                lineNumber: 295,
                                                columnNumber: 29
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                onClick: ()=>playSound(330),
                                                className: "jsx-6d0242266b29ddcd" + " " + ((activeSection === 'content' ? 'active' : '') || ""),
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                    href: "#content",
                                                    className: "jsx-6d0242266b29ddcd",
                                                    children: "02. Core Data"
                                                }, void 0, false, {
                                                    fileName: "[project]/libs/shared-ui/src/Savoirpedia/WikiArticle.js",
                                                    lineNumber: 296,
                                                    columnNumber: 120
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/libs/shared-ui/src/Savoirpedia/WikiArticle.js",
                                                lineNumber: 296,
                                                columnNumber: 29
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                onClick: ()=>playSound(330),
                                                className: "jsx-6d0242266b29ddcd" + " " + ((activeSection === 'references' ? 'active' : '') || ""),
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                    href: "#references",
                                                    className: "jsx-6d0242266b29ddcd",
                                                    children: "03. References"
                                                }, void 0, false, {
                                                    fileName: "[project]/libs/shared-ui/src/Savoirpedia/WikiArticle.js",
                                                    lineNumber: 297,
                                                    columnNumber: 123
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/libs/shared-ui/src/Savoirpedia/WikiArticle.js",
                                                lineNumber: 297,
                                                columnNumber: 29
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/libs/shared-ui/src/Savoirpedia/WikiArticle.js",
                                        lineNumber: 294,
                                        columnNumber: 25
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/libs/shared-ui/src/Savoirpedia/WikiArticle.js",
                                lineNumber: 289,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/libs/shared-ui/src/Savoirpedia/WikiArticle.js",
                        lineNumber: 268,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/libs/shared-ui/src/Savoirpedia/WikiArticle.js",
                lineNumber: 247,
                columnNumber: 13
            }, this),
            selection.show && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    top: selection.y - 60,
                    left: selection.x - 50
                },
                onClick: (e)=>{
                    e.stopPropagation();
                    setCopilotQuery(`Explain this in the context of ${article.title}: "${selection.text}"`);
                    setShowCopilot(true);
                    setSelection({
                        ...selection,
                        show: false
                    });
                },
                className: "jsx-6d0242266b29ddcd" + " " + "highlight-popover glass",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sparkles$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Sparkles$3e$__["Sparkles"], {
                        size: 14
                    }, void 0, false, {
                        fileName: "[project]/libs/shared-ui/src/Savoirpedia/WikiArticle.js",
                        lineNumber: 315,
                        columnNumber: 21
                    }, this),
                    " ASK NEX AI"
                ]
            }, void 0, true, {
                fileName: "[project]/libs/shared-ui/src/Savoirpedia/WikiArticle.js",
                lineNumber: 305,
                columnNumber: 17
            }, this),
            showCopilot && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "jsx-6d0242266b29ddcd" + " " + "ai-overlay-container",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "jsx-6d0242266b29ddcd" + " " + "ai-sidebar glass",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "jsx-6d0242266b29ddcd" + " " + "sidebar-header",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                    className: "jsx-6d0242266b29ddcd",
                                    children: "NEX INTELLIGENCE"
                                }, void 0, false, {
                                    fileName: "[project]/libs/shared-ui/src/Savoirpedia/WikiArticle.js",
                                    lineNumber: 324,
                                    columnNumber: 29
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>setShowCopilot(false),
                                    className: "jsx-6d0242266b29ddcd" + " " + "close-btn",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                        size: 16
                                    }, void 0, false, {
                                        fileName: "[project]/libs/shared-ui/src/Savoirpedia/WikiArticle.js",
                                        lineNumber: 325,
                                        columnNumber: 97
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/libs/shared-ui/src/Savoirpedia/WikiArticle.js",
                                    lineNumber: 325,
                                    columnNumber: 29
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/libs/shared-ui/src/Savoirpedia/WikiArticle.js",
                            lineNumber: 323,
                            columnNumber: 25
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "jsx-6d0242266b29ddcd" + " " + "sidebar-content",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$libs$2f$shared$2d$ui$2f$src$2f$Savoirpedia$2f$SavoirCopilot$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                currentTitle: article.title,
                                currentContent: article.content,
                                initialMessage: copilotQuery
                            }, void 0, false, {
                                fileName: "[project]/libs/shared-ui/src/Savoirpedia/WikiArticle.js",
                                lineNumber: 328,
                                columnNumber: 29
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/libs/shared-ui/src/Savoirpedia/WikiArticle.js",
                            lineNumber: 327,
                            columnNumber: 25
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/libs/shared-ui/src/Savoirpedia/WikiArticle.js",
                    lineNumber: 322,
                    columnNumber: 21
                }, this)
            }, void 0, false, {
                fileName: "[project]/libs/shared-ui/src/Savoirpedia/WikiArticle.js",
                lineNumber: 321,
                columnNumber: 17
            }, this),
            showHistory && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                onClick: ()=>setShowHistory(false),
                className: "jsx-6d0242266b29ddcd" + " " + "history-overlay",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    onClick: (e)=>e.stopPropagation(),
                    className: "jsx-6d0242266b29ddcd" + " " + "history-modal glass",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "jsx-6d0242266b29ddcd" + " " + "modal-header",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                    className: "jsx-6d0242266b29ddcd",
                                    children: [
                                        "SYSTEM LOGS: ",
                                        article.title
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/libs/shared-ui/src/Savoirpedia/WikiArticle.js",
                                    lineNumber: 343,
                                    columnNumber: 29
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>setShowHistory(false),
                                    className: "jsx-6d0242266b29ddcd" + " " + "close-btn",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                        size: 18
                                    }, void 0, false, {
                                        fileName: "[project]/libs/shared-ui/src/Savoirpedia/WikiArticle.js",
                                        lineNumber: 344,
                                        columnNumber: 97
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/libs/shared-ui/src/Savoirpedia/WikiArticle.js",
                                    lineNumber: 344,
                                    columnNumber: 29
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/libs/shared-ui/src/Savoirpedia/WikiArticle.js",
                            lineNumber: 342,
                            columnNumber: 25
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "jsx-6d0242266b29ddcd" + " " + "modal-body",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "jsx-6d0242266b29ddcd" + " " + "log-entry",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "jsx-6d0242266b29ddcd" + " " + "log-time",
                                            children: new Date(article.date).toLocaleString()
                                        }, void 0, false, {
                                            fileName: "[project]/libs/shared-ui/src/Savoirpedia/WikiArticle.js",
                                            lineNumber: 348,
                                            columnNumber: 33
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "jsx-6d0242266b29ddcd" + " " + "log-action",
                                            children: "INITIAL_ENTRY_CREATED"
                                        }, void 0, false, {
                                            fileName: "[project]/libs/shared-ui/src/Savoirpedia/WikiArticle.js",
                                            lineNumber: 349,
                                            columnNumber: 33
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "jsx-6d0242266b29ddcd" + " " + "log-user",
                                            children: [
                                                "System Initialization: ",
                                                wikiAuthor
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/libs/shared-ui/src/Savoirpedia/WikiArticle.js",
                                            lineNumber: 350,
                                            columnNumber: 33
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/libs/shared-ui/src/Savoirpedia/WikiArticle.js",
                                    lineNumber: 347,
                                    columnNumber: 29
                                }, this),
                                article.updatedAt && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "jsx-6d0242266b29ddcd" + " " + "log-entry",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "jsx-6d0242266b29ddcd" + " " + "log-time",
                                            children: new Date(article.updatedAt).toLocaleString()
                                        }, void 0, false, {
                                            fileName: "[project]/libs/shared-ui/src/Savoirpedia/WikiArticle.js",
                                            lineNumber: 354,
                                            columnNumber: 37
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "jsx-6d0242266b29ddcd" + " " + "log-action",
                                            children: "ENTRY_REVISED"
                                        }, void 0, false, {
                                            fileName: "[project]/libs/shared-ui/src/Savoirpedia/WikiArticle.js",
                                            lineNumber: 355,
                                            columnNumber: 37
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "jsx-6d0242266b29ddcd" + " " + "log-user",
                                            children: [
                                                "Updated by: ",
                                                wikiAuthor
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/libs/shared-ui/src/Savoirpedia/WikiArticle.js",
                                            lineNumber: 356,
                                            columnNumber: 37
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/libs/shared-ui/src/Savoirpedia/WikiArticle.js",
                                    lineNumber: 353,
                                    columnNumber: 33
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "jsx-6d0242266b29ddcd" + " " + "log-entry future",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "jsx-6d0242266b29ddcd" + " " + "log-time",
                                            children: "--/--/--"
                                        }, void 0, false, {
                                            fileName: "[project]/libs/shared-ui/src/Savoirpedia/WikiArticle.js",
                                            lineNumber: 360,
                                            columnNumber: 33
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "jsx-6d0242266b29ddcd" + " " + "log-action",
                                            children: "AWAITING_FURTHER_DATA"
                                        }, void 0, false, {
                                            fileName: "[project]/libs/shared-ui/src/Savoirpedia/WikiArticle.js",
                                            lineNumber: 361,
                                            columnNumber: 33
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "jsx-6d0242266b29ddcd" + " " + "log-user",
                                            children: "Nexus AI Sequence Pending..."
                                        }, void 0, false, {
                                            fileName: "[project]/libs/shared-ui/src/Savoirpedia/WikiArticle.js",
                                            lineNumber: 362,
                                            columnNumber: 33
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/libs/shared-ui/src/Savoirpedia/WikiArticle.js",
                                    lineNumber: 359,
                                    columnNumber: 29
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/libs/shared-ui/src/Savoirpedia/WikiArticle.js",
                            lineNumber: 346,
                            columnNumber: 25
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/libs/shared-ui/src/Savoirpedia/WikiArticle.js",
                    lineNumber: 341,
                    columnNumber: 21
                }, this)
            }, void 0, false, {
                fileName: "[project]/libs/shared-ui/src/Savoirpedia/WikiArticle.js",
                lineNumber: 340,
                columnNumber: 17
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$node_modules$2f$styled$2d$jsx$2f$style$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                id: "aae9e19305f5363b",
                children: "body{color:#fff;background:#050505}.wiki-content-render.decrypting{opacity:.5;filter:blur(2px);transition:all 1s}.wiki-content-render{color:#ffffffd9;margin-top:30px;font-size:1.1rem;line-height:1.8}.wiki-content-render h2{color:#fff;border-bottom:1px solid #00f0ff33;margin-top:40px;margin-bottom:20px;padding-bottom:10px;font-family:Orbitron,sans-serif;font-size:1.5rem}.wiki-content-render p{margin-bottom:20px}.nex-alert{background:#ff32320d;border:1px solid #ff323233;border-left:4px solid #ff3232;border-radius:8px;align-items:center;gap:15px;margin:25px 0;padding:15px;display:flex}.alert-icon{font-size:1.5rem}.alert-content{color:#fcc;font-size:.95rem}.nex-data-scan{background:#00f0ff0d;border:1px solid #00f0ff33;border-left:4px solid #00f0ff;border-radius:8px;margin:25px 0;padding:0;overflow:hidden}.data-header{color:#00f0ff;letter-spacing:2px;background:#00f0ff1a;padding:8px 15px;font-family:Orbitron,sans-serif;font-size:.7rem;font-weight:800}.data-body{color:#ccfaff;padding:15px;font-size:.95rem}.nex-code{color:#0f8;background:#111;border:1px solid #ffffff1a;border-radius:8px;margin:25px 0;padding:20px;font-family:Fira Code,monospace;font-size:.9rem;overflow-x:auto}.wiki-content-render ul{color:#00f0ff;margin-bottom:20px;margin-left:20px;list-style-type:square}.wiki-content-render li span{color:#ffffffd9}.wiki-content-render img{border:1px solid #ffffff1a;border-radius:12px;max-width:100%;margin:30px 0}.auto-link{color:#00f0ff;border-bottom:1px dashed #00f0ff4d;text-decoration:none;transition:all .2s}.auto-link:hover{color:#fff;background:#00f0ff0d;border-bottom:1px solid #00f0ff}.wiki-error{text-align:center;color:#fff;padding:100px;font-family:Orbitron,sans-serif}"
            }, void 0, false, void 0, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$node_modules$2f$styled$2d$jsx$2f$style$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                id: "d1c8a5792eb380e9",
                children: '.wiki-wrapper.jsx-6d0242266b29ddcd{padding-bottom:100px}.progress-container.jsx-6d0242266b29ddcd{z-index:9999;background:0 0;width:100%;height:3px;position:fixed;top:0;left:0}.progress-bar.jsx-6d0242266b29ddcd{background:#00f0ff;width:0%;height:3px;transition:width .1s;box-shadow:0 0 10px #00f0ff}.article-hero.jsx-6d0242266b29ddcd{justify-content:flex-start;align-items:flex-end;width:100%;height:60dvh;min-height:400px;margin-bottom:60px;display:flex;position:relative}.hero-bg.jsx-6d0242266b29ddcd{position:absolute;inset:0;overflow:hidden}.hero-overlay.jsx-6d0242266b29ddcd{background:linear-gradient(#0505054d 0%,#050505cc 50%,#050505 100%);position:absolute;inset:0}.hero-content.jsx-6d0242266b29ddcd{z-index:10;width:100%;max-width:1200px;margin:0 auto;padding:40px 20px;position:relative}.hero-meta.jsx-6d0242266b29ddcd{flex-wrap:wrap;justify-content:space-between;align-items:center;gap:15px;margin-bottom:15px;font-family:Orbitron,sans-serif;font-size:.9rem;display:flex}.hero-cat.jsx-6d0242266b29ddcd{color:#00f0ff;text-transform:uppercase;font-weight:700}.hero-date.jsx-6d0242266b29ddcd{color:#fffc}.hero-intelligence.jsx-6d0242266b29ddcd{gap:20px;display:flex}.intel-item.jsx-6d0242266b29ddcd{color:#ffffffb3;letter-spacing:1px;background:#ffffff05;border:1px solid #ffffff1a;border-radius:4px;padding:4px 10px;font-size:.7rem;font-weight:700}.hero-title.jsx-6d0242266b29ddcd{text-shadow:0 10px 30px #00000080;word-break:break-word;overflow-wrap:break-word;margin:0 0 30px;font-family:Orbitron,sans-serif;font-size:3.5rem;font-weight:900;line-height:1.1}.hero-actions.jsx-6d0242266b29ddcd{align-items:center;gap:20px;display:flex}.back-btn.jsx-6d0242266b29ddcd{color:#ffffffe6;border:1px solid #fff3;border-radius:50px;padding:8px 16px;font-size:.9rem;font-weight:700;text-decoration:none;transition:all .3s}.back-btn.jsx-6d0242266b29ddcd:hover{color:#000;background:#fff;border-color:#fff}.sound-toggle.jsx-6d0242266b29ddcd{color:#fff6;cursor:pointer;letter-spacing:1px;background:0 0;border:1px solid #ffffff1a;border-radius:4px;padding:8px 12px;font-family:Orbitron,sans-serif;font-size:.7rem;transition:all .2s}.sound-toggle.jsx-6d0242266b29ddcd:hover{color:#fff;border-color:#ffffff4d}.sound-toggle.active.jsx-6d0242266b29ddcd{color:#00f0ff;background:#00f0ff0d;border-color:#00f0ff4d}.article-layout.jsx-6d0242266b29ddcd{grid-template-columns:1fr 300px;gap:50px;max-width:1200px;margin:0 auto;padding:0 20px;display:grid}.intro-block.jsx-6d0242266b29ddcd{border-left:4px solid #00f0ff;margin-bottom:40px;padding:30px}.lead-paragraph.jsx-6d0242266b29ddcd{color:#fff;opacity:.9;margin:0;font-size:1.2rem;line-height:1.7}.glass.jsx-6d0242266b29ddcd{-webkit-backdrop-filter:blur(10px);backdrop-filter:blur(10px);background:#ffffff08;border:1px solid #ffffff0d;border-radius:16px}.side-col.jsx-6d0242266b29ddcd{flex-direction:column;gap:30px;display:flex}.meta-card.jsx-6d0242266b29ddcd{padding:25px}.meta-card-header.jsx-6d0242266b29ddcd{color:#ffffffb3;text-transform:uppercase;letter-spacing:1px;margin-bottom:20px;font-family:Orbitron,sans-serif;font-size:.8rem;font-weight:700}.meta-row.jsx-6d0242266b29ddcd{border-bottom:1px solid #ffffff0d;justify-content:space-between;margin-bottom:12px;padding-bottom:12px;font-size:.9rem;display:flex}.meta-label.jsx-6d0242266b29ddcd{color:#ffffffb3}.meta-value.mono.jsx-6d0242266b29ddcd{color:#00f0ff;font-family:monospace}.status-badge.jsx-6d0242266b29ddcd{color:#0f8;background:#00ff881a;border-radius:4px;padding:2px 8px;font-size:.7rem;font-weight:700}.status-badge.verified.jsx-6d0242266b29ddcd{animation:2s infinite badgePulse;box-shadow:0 0 5px #0f83}@keyframes badgePulse{0%{box-shadow:0 0 #0f86}70%{box-shadow:0 0 0 4px #0f80}to{box-shadow:0 0 #0f80}}.toc-card.jsx-6d0242266b29ddcd{padding:25px;position:sticky;top:100px;overflow:hidden}.toc-header.jsx-6d0242266b29ddcd{color:#fff;justify-content:space-between;align-items:center;margin-bottom:20px;font-family:Orbitron,sans-serif;font-weight:700;display:flex;position:relative}.scanning-line.jsx-6d0242266b29ddcd{opacity:.5;background:linear-gradient(90deg,#0000,#00f0ff,#0000);height:1px;animation:3s linear infinite scan;position:absolute;left:-25px;right:-25px;box-shadow:0 0 10px #00f0ff}@keyframes scan{0%{top:0%}to{top:100%}}.toc-list.jsx-6d0242266b29ddcd{flex-direction:column;gap:10px;margin:0;padding:0;list-style:none;display:flex}.toc-list.jsx-6d0242266b29ddcd li.jsx-6d0242266b29ddcd{border-left:2px solid #0000;transition:all .3s}.toc-list.jsx-6d0242266b29ddcd li.active.jsx-6d0242266b29ddcd{background:#00f0ff0d;border-left:2px solid #00f0ff}.toc-list.jsx-6d0242266b29ddcd a.jsx-6d0242266b29ddcd{color:#fffc;padding:5px 15px;font-size:.9rem;text-decoration:none;transition:all .2s;display:block}.toc-list.jsx-6d0242266b29ddcd li.active.jsx-6d0242266b29ddcd a.jsx-6d0242266b29ddcd{color:#00f0ff;font-weight:700}.toc-list.jsx-6d0242266b29ddcd a.jsx-6d0242266b29ddcd:hover{color:#00f0ff;padding-left:20px}.highlight-popover.jsx-6d0242266b29ddcd{z-index:1000;color:#00f0ff;cursor:pointer;border:1px solid #00f0ff66;border-radius:4px;align-items:center;gap:8px;padding:8px 15px;font-family:Orbitron,sans-serif;font-size:.75rem;font-weight:700;animation:.2s ease-out popIn;display:flex;position:absolute;box-shadow:0 5px 20px #00000080}@keyframes popIn{0%{opacity:0;transform:translateY(10px)scale(.9)}to{opacity:1;transform:translateY(0)scale(1)}}.ai-overlay-container.jsx-6d0242266b29ddcd{z-index:9999;-webkit-backdrop-filter:blur(2px);backdrop-filter:blur(2px);background:#0006;justify-content:flex-end;display:flex;position:fixed;inset:0}.ai-sidebar.jsx-6d0242266b29ddcd{border-left:1px solid #333;flex-direction:column;width:400px;height:100%;animation:.3s ease-out slideIn;display:flex}@keyframes slideIn{0%{transform:translate(100%)}to{transform:translate(0)}}.wiki-references.jsx-6d0242266b29ddcd{color:#ffffffb3;border-top:1px solid #ffffff1a;margin-top:60px;padding-top:30px}.wiki-references.jsx-6d0242266b29ddcd h3.jsx-6d0242266b29ddcd{color:#fff;margin-bottom:15px;font-family:Orbitron,sans-serif;font-size:1rem}.refs-list.jsx-6d0242266b29ddcd{padding-left:20px;font-size:.85rem}.btn-utility.jsx-6d0242266b29ddcd{color:#fffc;cursor:pointer;letter-spacing:1px;background:#ffffff0d;border:1px solid #ffffff1a;border-radius:4px;padding:8px 12px;font-family:Orbitron,sans-serif;font-size:.7rem;transition:all .2s}.btn-utility.jsx-6d0242266b29ddcd:hover{color:#fff;background:#00f0ff0d;border-color:#00f0ff}.history-overlay.jsx-6d0242266b29ddcd{z-index:99999;-webkit-backdrop-filter:blur(5px);backdrop-filter:blur(5px);background:#000c;justify-content:center;align-items:center;animation:.3s ease-out fadeIn;display:flex;position:fixed;inset:0}.history-modal.jsx-6d0242266b29ddcd{background:#111;border:1px solid #333;border-radius:12px;width:500px;max-width:90vw;overflow:hidden;box-shadow:0 20px 50px #00000080}.modal-header.jsx-6d0242266b29ddcd{background:#1a1a1a;border-bottom:1px solid #333;justify-content:space-between;align-items:center;padding:20px;display:flex}.modal-header.jsx-6d0242266b29ddcd h3.jsx-6d0242266b29ddcd{letter-spacing:1px;color:#00f0ff;margin:0;font-family:Orbitron,sans-serif;font-size:.9rem}.modal-body.jsx-6d0242266b29ddcd{flex-direction:column;gap:20px;padding:25px;display:flex}.log-entry.jsx-6d0242266b29ddcd{border-left:2px solid #00f0ff;padding-left:15px;position:relative}.log-entry.future.jsx-6d0242266b29ddcd{opacity:.5;border-left-color:#333}.log-entry.jsx-6d0242266b29ddcd:before{content:"";background:#00f0ff;border-radius:50%;width:10px;height:10px;position:absolute;top:0;left:-6px;box-shadow:0 0 10px #00f0ff}.log-entry.future.jsx-6d0242266b29ddcd:before{box-shadow:none;background:#333}.log-time.jsx-6d0242266b29ddcd{color:#666;margin-bottom:5px;font-family:Orbitron,sans-serif;font-size:.65rem}.log-action.jsx-6d0242266b29ddcd{letter-spacing:1px;color:#fff;font-size:.8rem;font-weight:800}.log-user.jsx-6d0242266b29ddcd{color:#888;margin-top:3px;font-size:.75rem}@media print{.side-col.jsx-6d0242266b29ddcd,.hero-actions.jsx-6d0242266b29ddcd,.sound-toggle.jsx-6d0242266b29ddcd,.btn-utility.jsx-6d0242266b29ddcd,.ai-sidebar.jsx-6d0242266b29ddcd,.article-hero.jsx-6d0242266b29ddcd .hero-bg.jsx-6d0242266b29ddcd,.p-editor-toolbar.jsx-6d0242266b29ddcd{display:none!important}.article-hero.jsx-6d0242266b29ddcd{color:#000!important;background:#fff!important;height:auto!important;padding:50px 0!important}.hero-title.jsx-6d0242266b29ddcd{color:#000!important;font-size:3rem!important}.intel-item.jsx-6d0242266b29ddcd{color:#000!important;border-color:#000!important}.article-layout.jsx-6d0242266b29ddcd{display:block!important}.main-col.jsx-6d0242266b29ddcd{color:#000!important;width:100%!important}body.jsx-6d0242266b29ddcd{color:#000!important;background:#fff!important;font-family:Georgia,serif!important}.wiki-content-render.jsx-6d0242266b29ddcd{color:#000!important;font-size:12pt!important;line-height:1.6!important}.lead-paragraph.jsx-6d0242266b29ddcd{border-bottom:2px solid #000!important;margin-bottom:40px!important;padding-bottom:20px!important}.intro-block.jsx-6d0242266b29ddcd{color:#000!important;background:0 0!important;border:none!important}.auto-link.jsx-6d0242266b29ddcd{color:#000!important;border-bottom:1px solid #000!important}}@media (width<=1024px){.article-layout.jsx-6d0242266b29ddcd{grid-template-columns:1fr}.side-col.jsx-6d0242266b29ddcd{border-top:1px solid #ffffff1a;order:2;margin-top:40px;padding-top:40px}.meta-card.jsx-6d0242266b29ddcd{flex-wrap:wrap;justify-content:space-between;align-items:center;gap:20px;display:flex}.meta-row.jsx-6d0242266b29ddcd{border:none;gap:10px;margin:0;padding:0}.toc-card.jsx-6d0242266b29ddcd{margin-top:20px;padding:20px;position:relative;top:0}.toc-list.jsx-6d0242266b29ddcd{flex-flow:wrap;gap:15px 25px}.toc-list.jsx-6d0242266b29ddcd a.jsx-6d0242266b29ddcd{padding:5px 0}}@media (width<=768px){.article-hero.jsx-6d0242266b29ddcd{height:40vh;min-height:250px;margin-bottom:40px}.hero-content.jsx-6d0242266b29ddcd{padding:20px;bottom:0}.hero-title.jsx-6d0242266b29ddcd{margin-bottom:20px;font-size:2rem}.hero-meta.jsx-6d0242266b29ddcd{flex-wrap:wrap;gap:10px;font-size:.8rem}.hero-actions.jsx-6d0242266b29ddcd{flex-wrap:wrap;gap:10px;width:100%}.back-btn.jsx-6d0242266b29ddcd{padding:6px 14px;font-size:.8rem}.article-layout.jsx-6d0242266b29ddcd{gap:30px;padding:0 15px}.intro-block.jsx-6d0242266b29ddcd{border-left-width:3px;border-radius:12px;padding:20px}.lead-paragraph.jsx-6d0242266b29ddcd{font-size:1rem;line-height:1.6}.wiki-content-render.jsx-6d0242266b29ddcd{margin-top:20px;font-size:1rem}.wiki-content-render.jsx-6d0242266b29ddcd h2.jsx-6d0242266b29ddcd{margin-top:30px;font-size:1.3rem}.meta-card.jsx-6d0242266b29ddcd{flex-direction:column;align-items:flex-start;gap:0}.meta-row.jsx-6d0242266b29ddcd{border-bottom:1px solid #ffffff0d;justify-content:space-between;width:100%;padding:10px 0}.meta-row.jsx-6d0242266b29ddcd:last-child{border-bottom:none}.hero-meta.jsx-6d0242266b29ddcd{flex-direction:column;align-items:flex-start;gap:10px}.hero-intelligence.jsx-6d0242266b29ddcd{justify-content:space-between;width:100%}}'
            }, void 0, false, void 0, this)
        ]
    }, void 0, true, {
        fileName: "[project]/libs/shared-ui/src/Savoirpedia/WikiArticle.js",
        lineNumber: 204,
        columnNumber: 9
    }, this);
}
_s1(WikiArticle, "Zq8wAzX62ny8ohiyj/9kHrzlUfQ=", false, function() {
    return [
        useDecryption
    ];
});
_c = WikiArticle;
var _c;
__turbopack_context__.k.register(_c, "WikiArticle");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=libs_shared-ui_src_2fa8f293._.js.map
