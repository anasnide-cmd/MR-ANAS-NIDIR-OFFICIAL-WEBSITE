module.exports = [
"[project]/libs/shared-ui/src/Effects/MagneticWrapper.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>MagneticWrapper
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$spring$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/value/use-spring.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$motion$2d$value$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/value/use-motion-value.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
'use client';
;
;
;
function MagneticWrapper({ children, strength = 0.5, range = 150 }) {
    const ref = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const x = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$motion$2d$value$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMotionValue"])(0);
    const y = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$motion$2d$value$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMotionValue"])(0);
    const springConfig = {
        damping: 15,
        stiffness: 150,
        mass: 0.1
    };
    const springX = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$spring$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useSpring"])(x, springConfig);
    const springY = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$spring$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useSpring"])(y, springConfig);
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
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
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
}),
"[project]/libs/shared-ui/src/Savoirpedia/GalaxyView.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>GalaxyView
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$node_modules$2f$styled$2d$jsx$2f$style$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/node_modules/styled-jsx/style.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/x.js [app-ssr] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$maximize$2d$2$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Maximize2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/maximize-2.js [app-ssr] (ecmascript) <export default as Maximize2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$minimize$2d$2$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Minimize2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/minimize-2.js [app-ssr] (ecmascript) <export default as Minimize2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-ssr] (ecmascript)");
;
;
;
;
;
function GalaxyView({ articles, onClose }) {
    const canvasRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const [isFullscreen, setIsFullscreen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRouter"])();
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!canvasRef.current) return;
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        let animationFrame;
        const resize = ()=>{
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        window.addEventListener('resize', resize);
        resize();
        // 1. Initialize Nodes (Articles)
        const nodes = articles.map((art, idx)=>({
                ...art,
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                radius: art.title.length < 10 ? 4 : 6,
                color: '#00f0ff'
            }));
        // 2. Map Connections (based on categories for now)
        const connections = [];
        nodes.forEach((node, i)=>{
            nodes.forEach((other, j)=>{
                if (i < j && node.category === other.category) {
                    connections.push([
                        i,
                        j
                    ]);
                }
            });
        });
        const draw = ()=>{
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            // Background Glow
            ctx.fillStyle = '#050505';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            // Draw Connections
            ctx.strokeStyle = 'rgba(0, 240, 255, 0.1)';
            ctx.lineWidth = 1;
            connections.forEach(([i, j])=>{
                ctx.beginPath();
                ctx.moveTo(nodes[i].x, nodes[i].y);
                ctx.lineTo(nodes[j].x, nodes[j].y);
                ctx.stroke();
            });
            // Update & Draw Nodes
            nodes.forEach((node)=>{
                node.x += node.vx;
                node.y += node.vy;
                // Wall Bounce
                if (node.x < 0 || node.x > canvas.width) node.vx *= -1;
                if (node.y < 0 || node.y > canvas.height) node.vy *= -1;
                ctx.beginPath();
                ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
                ctx.fillStyle = node.color;
                ctx.shadowBlur = 10;
                ctx.shadowColor = node.color;
                ctx.fill();
                ctx.shadowBlur = 0;
                // Labels
                ctx.fillStyle = 'rgba(255,255,255,0.6)';
                ctx.font = '10px Orbitron';
                ctx.fillText(node.title.toUpperCase(), node.x + 10, node.y + 4);
            });
            animationFrame = requestAnimationFrame(draw);
        };
        draw();
        const handleClick = (e)=>{
            const rect = canvas.getBoundingClientRect();
            const mouseX = e.clientX - rect.left;
            const mouseY = e.clientY - rect.top;
            nodes.forEach((node)=>{
                const dist = Math.sqrt((mouseX - node.x) ** 2 + (mouseY - node.y) ** 2);
                if (dist < node.radius + 10) {
                    router.push(`/savoirpedia/post/${node.slug}`);
                    onClose();
                }
            });
        };
        canvas.addEventListener('click', handleClick);
        return ()=>{
            window.removeEventListener('resize', resize);
            cancelAnimationFrame(animationFrame);
            canvas.removeEventListener('click', handleClick);
        };
    }, [
        articles,
        router,
        onClose
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "jsx-c14e6781860d457e" + " " + `galaxy-overlay ${isFullscreen ? 'fullscreen' : ''}`,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "jsx-c14e6781860d457e" + " " + "galaxy-controls",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>setIsFullscreen(!isFullscreen),
                        className: "jsx-c14e6781860d457e",
                        children: isFullscreen ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$minimize$2d$2$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Minimize2$3e$__["Minimize2"], {
                            size: 18
                        }, void 0, false, {
                            fileName: "[project]/libs/shared-ui/src/Savoirpedia/GalaxyView.js",
                            lineNumber: 115,
                            columnNumber: 37
                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$maximize$2d$2$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Maximize2$3e$__["Maximize2"], {
                            size: 18
                        }, void 0, false, {
                            fileName: "[project]/libs/shared-ui/src/Savoirpedia/GalaxyView.js",
                            lineNumber: 115,
                            columnNumber: 62
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/libs/shared-ui/src/Savoirpedia/GalaxyView.js",
                        lineNumber: 114,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: onClose,
                        className: "jsx-c14e6781860d457e",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                            size: 18
                        }, void 0, false, {
                            fileName: "[project]/libs/shared-ui/src/Savoirpedia/GalaxyView.js",
                            lineNumber: 117,
                            columnNumber: 43
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/libs/shared-ui/src/Savoirpedia/GalaxyView.js",
                        lineNumber: 117,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/libs/shared-ui/src/Savoirpedia/GalaxyView.js",
                lineNumber: 113,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("canvas", {
                ref: canvasRef,
                className: "jsx-c14e6781860d457e"
            }, void 0, false, {
                fileName: "[project]/libs/shared-ui/src/Savoirpedia/GalaxyView.js",
                lineNumber: 119,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$node_modules$2f$styled$2d$jsx$2f$style$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                id: "c14e6781860d457e",
                children: ".galaxy-overlay.jsx-c14e6781860d457e{z-index:10000;background:#000;border:1px solid #333;border-radius:20px;transition:all .5s cubic-bezier(.4,0,.2,1);position:fixed;inset:50px;overflow:hidden;box-shadow:0 0 100px #00f0ff33}.galaxy-overlay.fullscreen.jsx-c14e6781860d457e{border:none;border-radius:0;inset:0}.galaxy-controls.jsx-c14e6781860d457e{z-index:11;gap:15px;display:flex;position:absolute;top:20px;right:20px}.galaxy-controls.jsx-c14e6781860d457e button.jsx-c14e6781860d457e{color:#fff;cursor:pointer;-webkit-backdrop-filter:blur(10px);backdrop-filter:blur(10px);background:#ffffff1a;border:1px solid #ffffff1a;border-radius:50%;justify-content:center;align-items:center;width:40px;height:40px;transition:all .2s;display:flex}.galaxy-controls.jsx-c14e6781860d457e button.jsx-c14e6781860d457e:hover{color:#000;background:#00f0ff;transform:scale(1.1)}canvas.jsx-c14e6781860d457e{cursor:crosshair;display:block}"
            }, void 0, false, void 0, this)
        ]
    }, void 0, true, {
        fileName: "[project]/libs/shared-ui/src/Savoirpedia/GalaxyView.js",
        lineNumber: 112,
        columnNumber: 9
    }, this);
}
}),
"[project]/libs/shared-ui/src/Savoirpedia/HubClient.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>HubClient
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$node_modules$2f$styled$2d$jsx$2f$style$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/node_modules/styled-jsx/style.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$libs$2f$shared$2d$ui$2f$src$2f$Effects$2f$MagneticWrapper$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/libs/shared-ui/src/Effects/MagneticWrapper.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$libs$2f$core$2f$src$2f$firebase$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/libs/core/src/firebase.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$firebase$2f$firestore$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/firebase/firestore/dist/index.mjs [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@firebase/firestore/dist/index.node.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/image.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$libs$2f$shared$2d$ui$2f$src$2f$Savoirpedia$2f$GalaxyView$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/libs/shared-ui/src/Savoirpedia/GalaxyView.js [app-ssr] (ecmascript)");
'use client';
;
;
;
;
;
;
;
;
;
function HubClient() {
    const [posts, setPosts] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [filteredPosts, setFilteredPosts] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(true);
    const [searchTerm, setSearchTerm] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('');
    const [showGalaxy, setShowGalaxy] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const fetchPosts = async ()=>{
            try {
                const q = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["query"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["collection"])(__TURBOPACK__imported__module__$5b$project$5d2f$libs$2f$core$2f$src$2f$firebase$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["db"], 'posts'), (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["orderBy"])('date', 'desc'), (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["limit"])(50));
                const snap = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getDocs"])(q);
                const data = snap.docs.map((d)=>({
                        id: d.id,
                        ...d.data()
                    }));
                setPosts(data);
                setFilteredPosts(data);
            } catch (err) {
                console.error("Error fetching posts:", err);
            } finally{
                setLoading(false);
            }
        };
        fetchPosts();
    }, []);
    // Derived state for stats
    const totalArticles = posts.length;
    const engineeringCount = posts.filter((p)=>(p.category || '').toLowerCase() === 'engineering').length;
    const designCount = posts.filter((p)=>(p.category || '').toLowerCase() === 'design').length;
    // Filter Logic
    const [activeCategory, setActiveCategory] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('All');
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        let results = posts;
        // 1. Search Filter
        if (searchTerm) {
            results = results.filter((post)=>post.title.toLowerCase().includes(searchTerm.toLowerCase()) || post.content.toLowerCase().includes(searchTerm.toLowerCase()));
        }
        // 2. Category Filter
        if (activeCategory !== 'All') {
            results = results.filter((post)=>(post.category || 'General') === activeCategory);
        }
        // 3. Status Filter (Legacy vs Active)
        results = results.filter((post)=>post.status === 'active' || !post.status);
        setFilteredPosts(results);
    }, [
        searchTerm,
        activeCategory,
        posts
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
        className: "jsx-eb17107075e7c8cf" + " " + "wiki-container",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
                className: "jsx-eb17107075e7c8cf" + " " + "wiki-hero glass-panel",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "jsx-eb17107075e7c8cf" + " " + "hero-content",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "jsx-eb17107075e7c8cf" + " " + "wiki-logo",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "jsx-eb17107075e7c8cf" + " " + "logo-symbol",
                                        children: "S"
                                    }, void 0, false, {
                                        fileName: "[project]/libs/shared-ui/src/Savoirpedia/HubClient.js",
                                        lineNumber: 70,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "jsx-eb17107075e7c8cf" + " " + "logo-text",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                                className: "jsx-eb17107075e7c8cf",
                                                children: "SavoirPedia"
                                            }, void 0, false, {
                                                fileName: "[project]/libs/shared-ui/src/Savoirpedia/HubClient.js",
                                                lineNumber: 72,
                                                columnNumber: 29
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "jsx-eb17107075e7c8cf",
                                                children: "SYSTEM KNOWLEDGE ARCHIVE"
                                            }, void 0, false, {
                                                fileName: "[project]/libs/shared-ui/src/Savoirpedia/HubClient.js",
                                                lineNumber: 73,
                                                columnNumber: 29
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/libs/shared-ui/src/Savoirpedia/HubClient.js",
                                        lineNumber: 71,
                                        columnNumber: 25
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/libs/shared-ui/src/Savoirpedia/HubClient.js",
                                lineNumber: 69,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "jsx-eb17107075e7c8cf" + " " + "hero-stats",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "jsx-eb17107075e7c8cf" + " " + "stat-item",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "jsx-eb17107075e7c8cf" + " " + "stat-val",
                                                children: totalArticles
                                            }, void 0, false, {
                                                fileName: "[project]/libs/shared-ui/src/Savoirpedia/HubClient.js",
                                                lineNumber: 79,
                                                columnNumber: 29
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "jsx-eb17107075e7c8cf" + " " + "stat-label",
                                                children: "ENTRIES"
                                            }, void 0, false, {
                                                fileName: "[project]/libs/shared-ui/src/Savoirpedia/HubClient.js",
                                                lineNumber: 80,
                                                columnNumber: 29
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/libs/shared-ui/src/Savoirpedia/HubClient.js",
                                        lineNumber: 78,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "jsx-eb17107075e7c8cf" + " " + "stat-item",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "jsx-eb17107075e7c8cf" + " " + "stat-val online",
                                                children: "ONLINE"
                                            }, void 0, false, {
                                                fileName: "[project]/libs/shared-ui/src/Savoirpedia/HubClient.js",
                                                lineNumber: 83,
                                                columnNumber: 29
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "jsx-eb17107075e7c8cf" + " " + "stat-label",
                                                children: "SYSTEM STATUS"
                                            }, void 0, false, {
                                                fileName: "[project]/libs/shared-ui/src/Savoirpedia/HubClient.js",
                                                lineNumber: 84,
                                                columnNumber: 29
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/libs/shared-ui/src/Savoirpedia/HubClient.js",
                                        lineNumber: 82,
                                        columnNumber: 25
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/libs/shared-ui/src/Savoirpedia/HubClient.js",
                                lineNumber: 77,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/libs/shared-ui/src/Savoirpedia/HubClient.js",
                        lineNumber: 68,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "jsx-eb17107075e7c8cf" + " " + "hero-actions",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$libs$2f$shared$2d$ui$2f$src$2f$Effects$2f$MagneticWrapper$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                strength: 0.2,
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                    href: "/savoirpedia/dashboard",
                                    className: "action-btn dashboard-btn",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "jsx-eb17107075e7c8cf",
                                        children: "📊 MY DASHBOARD"
                                    }, void 0, false, {
                                        fileName: "[project]/libs/shared-ui/src/Savoirpedia/HubClient.js",
                                        lineNumber: 92,
                                        columnNumber: 29
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/libs/shared-ui/src/Savoirpedia/HubClient.js",
                                    lineNumber: 91,
                                    columnNumber: 25
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/libs/shared-ui/src/Savoirpedia/HubClient.js",
                                lineNumber: 90,
                                columnNumber: 22
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$libs$2f$shared$2d$ui$2f$src$2f$Effects$2f$MagneticWrapper$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                strength: 0.2,
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>setShowGalaxy(true),
                                    className: "jsx-eb17107075e7c8cf" + " " + "action-btn galaxy-btn",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "jsx-eb17107075e7c8cf",
                                        children: "🌌 GALAXY VIEW"
                                    }, void 0, false, {
                                        fileName: "[project]/libs/shared-ui/src/Savoirpedia/HubClient.js",
                                        lineNumber: 97,
                                        columnNumber: 29
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/libs/shared-ui/src/Savoirpedia/HubClient.js",
                                    lineNumber: 96,
                                    columnNumber: 25
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/libs/shared-ui/src/Savoirpedia/HubClient.js",
                                lineNumber: 95,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$libs$2f$shared$2d$ui$2f$src$2f$Effects$2f$MagneticWrapper$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                strength: 0.2,
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                    href: "/savoirpedia/editor",
                                    className: "action-btn create-btn",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "jsx-eb17107075e7c8cf",
                                        children: "+ NEW ENTRY"
                                    }, void 0, false, {
                                        fileName: "[project]/libs/shared-ui/src/Savoirpedia/HubClient.js",
                                        lineNumber: 102,
                                        columnNumber: 29
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/libs/shared-ui/src/Savoirpedia/HubClient.js",
                                    lineNumber: 101,
                                    columnNumber: 25
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/libs/shared-ui/src/Savoirpedia/HubClient.js",
                                lineNumber: 100,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/libs/shared-ui/src/Savoirpedia/HubClient.js",
                        lineNumber: 89,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/libs/shared-ui/src/Savoirpedia/HubClient.js",
                lineNumber: 67,
                columnNumber: 13
            }, this),
            showGalaxy && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$libs$2f$shared$2d$ui$2f$src$2f$Savoirpedia$2f$GalaxyView$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                articles: posts,
                onClose: ()=>setShowGalaxy(false)
            }, void 0, false, {
                fileName: "[project]/libs/shared-ui/src/Savoirpedia/HubClient.js",
                lineNumber: 110,
                columnNumber: 17
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                className: "jsx-eb17107075e7c8cf" + " " + "control-bar",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "jsx-eb17107075e7c8cf" + " " + "search-wrapper",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "jsx-eb17107075e7c8cf" + " " + "search-icon",
                                children: "🔍"
                            }, void 0, false, {
                                fileName: "[project]/libs/shared-ui/src/Savoirpedia/HubClient.js",
                                lineNumber: 119,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                type: "text",
                                placeholder: "Search the archive...",
                                value: searchTerm,
                                onChange: (e)=>setSearchTerm(e.target.value),
                                className: "jsx-eb17107075e7c8cf" + " " + "spotlight-search"
                            }, void 0, false, {
                                fileName: "[project]/libs/shared-ui/src/Savoirpedia/HubClient.js",
                                lineNumber: 120,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/libs/shared-ui/src/Savoirpedia/HubClient.js",
                        lineNumber: 118,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "jsx-eb17107075e7c8cf" + " " + "filter-pills",
                        children: [
                            'All',
                            'Engineering',
                            'Design',
                            'Product',
                            'General'
                        ].map((cat)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>setActiveCategory(cat),
                                className: "jsx-eb17107075e7c8cf" + " " + `filter-pill ${activeCategory === cat ? 'active' : ''}`,
                                children: cat
                            }, cat, false, {
                                fileName: "[project]/libs/shared-ui/src/Savoirpedia/HubClient.js",
                                lineNumber: 131,
                                columnNumber: 25
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/libs/shared-ui/src/Savoirpedia/HubClient.js",
                        lineNumber: 129,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/libs/shared-ui/src/Savoirpedia/HubClient.js",
                lineNumber: 117,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "jsx-eb17107075e7c8cf" + " " + "wiki-main-content",
                children: loading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "jsx-eb17107075e7c8cf" + " " + "loading-state",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "jsx-eb17107075e7c8cf" + " " + "loader-spinner"
                        }, void 0, false, {
                            fileName: "[project]/libs/shared-ui/src/Savoirpedia/HubClient.js",
                            lineNumber: 145,
                            columnNumber: 25
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "jsx-eb17107075e7c8cf",
                            children: "Decryption in progress..."
                        }, void 0, false, {
                            fileName: "[project]/libs/shared-ui/src/Savoirpedia/HubClient.js",
                            lineNumber: 146,
                            columnNumber: 25
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/libs/shared-ui/src/Savoirpedia/HubClient.js",
                    lineNumber: 144,
                    columnNumber: 21
                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "jsx-eb17107075e7c8cf" + " " + "articles-grid",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "jsx-eb17107075e7c8cf" + " " + "grid-header",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                    className: "jsx-eb17107075e7c8cf",
                                    children: activeCategory === 'All' && !searchTerm ? "Latest Transmissions" : "Filtered Results"
                                }, void 0, false, {
                                    fileName: "[project]/libs/shared-ui/src/Savoirpedia/HubClient.js",
                                    lineNumber: 151,
                                    columnNumber: 29
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "jsx-eb17107075e7c8cf" + " " + "tech-line"
                                }, void 0, false, {
                                    fileName: "[project]/libs/shared-ui/src/Savoirpedia/HubClient.js",
                                    lineNumber: 152,
                                    columnNumber: 29
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/libs/shared-ui/src/Savoirpedia/HubClient.js",
                            lineNumber: 150,
                            columnNumber: 25
                        }, this),
                        filteredPosts.length > 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "jsx-eb17107075e7c8cf" + " " + "posts-masonry",
                            children: filteredPosts.map((post, index)=>{
                                // Extract first image
                                const imgMatch = post.content.match(/<img[^>]+src="([^">]+)"/);
                                const thumbnail = imgMatch && imgMatch[1] ? imgMatch[1] : '/assets/logo.jpg';
                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                    href: `/savoirpedia/post/${post.slug}`,
                                    className: "post-card-wrapper",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$libs$2f$shared$2d$ui$2f$src$2f$Effects$2f$MagneticWrapper$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                        strength: 0.15,
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("article", {
                                            style: {
                                                animationDelay: `${index * 50}ms`
                                            },
                                            className: "jsx-eb17107075e7c8cf" + " " + "post-card glass",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "jsx-eb17107075e7c8cf" + " " + "card-image-wrapper",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                                            src: thumbnail,
                                                            alt: post.title,
                                                            fill: true,
                                                            style: {
                                                                objectFit: 'cover'
                                                            }
                                                        }, void 0, false, {
                                                            fileName: "[project]/libs/shared-ui/src/Savoirpedia/HubClient.js",
                                                            lineNumber: 167,
                                                            columnNumber: 57
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "jsx-eb17107075e7c8cf" + " " + "card-overlay"
                                                        }, void 0, false, {
                                                            fileName: "[project]/libs/shared-ui/src/Savoirpedia/HubClient.js",
                                                            lineNumber: 168,
                                                            columnNumber: 57
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/libs/shared-ui/src/Savoirpedia/HubClient.js",
                                                    lineNumber: 166,
                                                    columnNumber: 53
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "jsx-eb17107075e7c8cf" + " " + "card-content",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "jsx-eb17107075e7c8cf" + " " + "card-meta",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "jsx-eb17107075e7c8cf" + " " + "meta-cat",
                                                                    children: post.category || 'General'
                                                                }, void 0, false, {
                                                                    fileName: "[project]/libs/shared-ui/src/Savoirpedia/HubClient.js",
                                                                    lineNumber: 172,
                                                                    columnNumber: 61
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "jsx-eb17107075e7c8cf" + " " + "meta-date",
                                                                    children: new Date(post.date).toLocaleDateString('en-US')
                                                                }, void 0, false, {
                                                                    fileName: "[project]/libs/shared-ui/src/Savoirpedia/HubClient.js",
                                                                    lineNumber: 173,
                                                                    columnNumber: 61
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/libs/shared-ui/src/Savoirpedia/HubClient.js",
                                                            lineNumber: 171,
                                                            columnNumber: 57
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                            className: "jsx-eb17107075e7c8cf" + " " + "card-title",
                                                            children: post.title
                                                        }, void 0, false, {
                                                            fileName: "[project]/libs/shared-ui/src/Savoirpedia/HubClient.js",
                                                            lineNumber: 175,
                                                            columnNumber: 57
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/libs/shared-ui/src/Savoirpedia/HubClient.js",
                                                    lineNumber: 170,
                                                    columnNumber: 53
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/libs/shared-ui/src/Savoirpedia/HubClient.js",
                                            lineNumber: 165,
                                            columnNumber: 49
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/libs/shared-ui/src/Savoirpedia/HubClient.js",
                                        lineNumber: 164,
                                        columnNumber: 45
                                    }, this)
                                }, post.id, false, {
                                    fileName: "[project]/libs/shared-ui/src/Savoirpedia/HubClient.js",
                                    lineNumber: 163,
                                    columnNumber: 41
                                }, this);
                            })
                        }, void 0, false, {
                            fileName: "[project]/libs/shared-ui/src/Savoirpedia/HubClient.js",
                            lineNumber: 156,
                            columnNumber: 29
                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "jsx-eb17107075e7c8cf" + " " + "empty-state",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "jsx-eb17107075e7c8cf" + " " + "empty-icon",
                                    children: "∅"
                                }, void 0, false, {
                                    fileName: "[project]/libs/shared-ui/src/Savoirpedia/HubClient.js",
                                    lineNumber: 185,
                                    columnNumber: 33
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "jsx-eb17107075e7c8cf",
                                    children: "No data found matching query param."
                                }, void 0, false, {
                                    fileName: "[project]/libs/shared-ui/src/Savoirpedia/HubClient.js",
                                    lineNumber: 186,
                                    columnNumber: 33
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/libs/shared-ui/src/Savoirpedia/HubClient.js",
                            lineNumber: 184,
                            columnNumber: 29
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/libs/shared-ui/src/Savoirpedia/HubClient.js",
                    lineNumber: 149,
                    columnNumber: 21
                }, this)
            }, void 0, false, {
                fileName: "[project]/libs/shared-ui/src/Savoirpedia/HubClient.js",
                lineNumber: 142,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$node_modules$2f$styled$2d$jsx$2f$style$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                id: "91a8f88e5cc34493",
                children: "body{background:#050505;padding-top:0!important}"
            }, void 0, false, void 0, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$node_modules$2f$styled$2d$jsx$2f$style$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                id: "8edcb2d8f94405cb",
                children: '.wiki-container.jsx-eb17107075e7c8cf{color:#fff;background-color:#050505;background-image:radial-gradient(circle at 15%,#00f0ff08 0%,#0000 25%),radial-gradient(circle at 85% 30%,#d4af3708 0%,#0000 25%);background-position:0 0;background-repeat:repeat;background-size:auto;background-attachment:scroll;background-origin:padding-box;background-clip:border-box;min-height:100dvh;padding:40px 20px}.glass-panel.jsx-eb17107075e7c8cf{-webkit-backdrop-filter:blur(10px);backdrop-filter:blur(10px);background:#ffffff05;border:1px solid #ffffff0d;border-radius:24px;flex-wrap:wrap;justify-content:space-between;align-items:flex-end;gap:30px;max-width:1400px;margin:0 auto 40px;padding:40px;display:flex;position:relative;overflow:hidden;box-shadow:0 20px 50px #00000080}.glass-panel.jsx-eb17107075e7c8cf:before{content:"";z-index:0;pointer-events:none;background:linear-gradient(#00f0ff05 50%,#0000 50%) 0 0/100% 4px;position:absolute;inset:0}.glass-panel.jsx-eb17107075e7c8cf:after{content:"";pointer-events:none;z-index:0;background:radial-gradient(circle at 50% -50%,#00f0ff1a,#0000 70%);position:absolute;inset:0}.wiki-logo.jsx-eb17107075e7c8cf{z-index:1;align-items:center;gap:20px;display:flex;position:relative}.logo-symbol.jsx-eb17107075e7c8cf{color:#0000;filter:drop-shadow(0 0 15px #00f0ff4d);background:linear-gradient(135deg,#fff,#888);-webkit-background-clip:text;font-family:Orbitron,sans-serif;font-size:3.5rem;font-weight:900;transition:transform .5s}.glass-panel.jsx-eb17107075e7c8cf:hover .logo-symbol.jsx-eb17107075e7c8cf{transform:rotate(10deg)scale(1.1)}.logo-text.jsx-eb17107075e7c8cf h1.jsx-eb17107075e7c8cf{letter-spacing:-1px;color:#fff;text-shadow:0 5px 15px #00000080;margin:0;font-family:Orbitron,sans-serif;font-size:2.5rem;font-weight:900}.logo-text.jsx-eb17107075e7c8cf p.jsx-eb17107075e7c8cf{color:#00f0ff;letter-spacing:4px;text-transform:uppercase;opacity:.8;margin:0;font-size:.75rem;font-weight:700}.hero-stats.jsx-eb17107075e7c8cf{z-index:1;gap:40px;display:flex;position:relative}.stat-item.jsx-eb17107075e7c8cf{flex-direction:column;align-items:flex-start;display:flex}.stat-val.jsx-eb17107075e7c8cf{color:#fff;font-family:Orbitron,sans-serif;font-size:1.8rem;font-weight:700;line-height:1}.stat-val.online.jsx-eb17107075e7c8cf{color:#0f8;align-items:center;gap:8px;padding-top:8px;font-size:1rem;display:flex}.stat-val.online.jsx-eb17107075e7c8cf:before{content:"";background:#0f8;border-radius:50%;width:8px;height:8px;animation:2s infinite pulse;box-shadow:0 0 10px #0f8}@keyframes pulse{0%{box-shadow:0 0 #00ff88b3}70%{box-shadow:0 0 0 10px #0f80}to{box-shadow:0 0 #0f80}}.stat-label.jsx-eb17107075e7c8cf{color:#fff6;letter-spacing:1px;margin-top:5px;font-size:.65rem}.hero-actions.jsx-eb17107075e7c8cf{z-index:1;gap:15px;display:flex;position:relative}.action-btn.jsx-eb17107075e7c8cf{letter-spacing:1px;border-radius:12px;padding:12px 24px;font-size:.8rem;font-weight:700;text-decoration:none;transition:all .3s;display:inline-block}.dashboard-btn.jsx-eb17107075e7c8cf{color:#fff;background:#ffffff0d;border:1px solid #ffffff1a}.dashboard-btn.jsx-eb17107075e7c8cf:hover{color:#000;background:#fff;box-shadow:0 0 20px #fff3}.galaxy-btn.jsx-eb17107075e7c8cf{color:#00f0ff;background:#00f0ff1a;border:1px solid #00f0ff4d}.galaxy-btn.jsx-eb17107075e7c8cf:hover{background:#00f0ff33;box-shadow:0 0 20px #00f0ff33}.create-btn.jsx-eb17107075e7c8cf{color:#000;background:#00f0ff;border:1px solid #00f0ff;box-shadow:0 0 20px #00f0ff4d}.create-btn.jsx-eb17107075e7c8cf:hover{color:#000;background:#fff;border-color:#fff;box-shadow:0 0 30px #ffffff80}.control-bar.jsx-eb17107075e7c8cf{z-index:50;-webkit-backdrop-filter:blur(15px);backdrop-filter:blur(15px);background:#050505cc;border:1px solid #ffffff0d;border-radius:20px;flex-wrap:wrap;align-items:center;gap:20px;max-width:1400px;margin:0 auto 50px;padding:15px;display:flex;position:sticky;top:10px}.search-wrapper.jsx-eb17107075e7c8cf{flex-grow:1;max-width:500px;position:relative}.search-icon.jsx-eb17107075e7c8cf{opacity:.5;font-size:.9rem;position:absolute;top:50%;left:20px;transform:translateY(-50%)}.spotlight-search.jsx-eb17107075e7c8cf{color:#fff;background:#00000080;border:1px solid #ffffff1a;border-radius:50px;width:100%;padding:16px 20px 16px 50px;font-size:1rem;transition:all .3s}.spotlight-search.jsx-eb17107075e7c8cf:focus{background:#000c;border-color:#00f0ff;outline:none;box-shadow:0 0 20px #00f0ff1a}.filter-pills.jsx-eb17107075e7c8cf{scrollbar-width:none;gap:10px;min-width:0;max-width:100%;padding-bottom:5px;display:flex;overflow-x:auto}.filter-pills.jsx-eb17107075e7c8cf::-webkit-scrollbar{display:none}.filter-pill.jsx-eb17107075e7c8cf{color:#fff9;cursor:pointer;white-space:nowrap;background:#ffffff08;border:1px solid #ffffff0d;border-radius:20px;padding:8px 18px;font-size:.8rem;transition:all .3s}.filter-pill.jsx-eb17107075e7c8cf:hover{color:#fff;background:#ffffff1a}.filter-pill.jsx-eb17107075e7c8cf:active{transform:scale(.95)}.filter-pill.active.jsx-eb17107075e7c8cf{color:#000;background:#fff;border-color:#fff;font-weight:700;transform:scale(1.05)}.wiki-main-content.jsx-eb17107075e7c8cf{max-width:1400px;margin:0 auto}.grid-header.jsx-eb17107075e7c8cf{align-items:center;gap:20px;margin-bottom:30px;display:flex}.grid-header.jsx-eb17107075e7c8cf h3.jsx-eb17107075e7c8cf{color:#fff;white-space:nowrap;margin:0;font-family:Orbitron,sans-serif;font-size:1.2rem}.tech-line.jsx-eb17107075e7c8cf{opacity:.3;background:linear-gradient(90deg,#00f0ff,#0000);width:100%;height:1px}.posts-masonry.jsx-eb17107075e7c8cf{grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:30px;display:grid}.post-card.jsx-eb17107075e7c8cf{background:#0a0a0a;border:1px solid #ffffff0d;border-radius:20px;flex-direction:column;height:100%;transition:all .4s cubic-bezier(.2,.8,.2,1);animation:.6s ease-out backwards fadeUp;display:flex;overflow:hidden}.post-card.jsx-eb17107075e7c8cf:hover{border-color:#00f0ff4d;transform:translateY(-5px);box-shadow:0 10px 40px #00000080}.post-card.jsx-eb17107075e7c8cf:active{transform:scale(.98)}.card-image-wrapper.jsx-eb17107075e7c8cf{width:100%;height:220px;position:relative}.card-overlay.jsx-eb17107075e7c8cf{opacity:.8;background:linear-gradient(#0000 0%,#0a0a0a 100%);position:absolute;inset:0}.card-content.jsx-eb17107075e7c8cf{flex-direction:column;flex-grow:1;padding:25px;display:flex}.card-meta.jsx-eb17107075e7c8cf{color:#ffffffb3;text-transform:uppercase;letter-spacing:1px;justify-content:space-between;margin-bottom:15px;font-size:.75rem;display:flex}.meta-cat.jsx-eb17107075e7c8cf{color:#00f0ff;font-weight:700}.card-title.jsx-eb17107075e7c8cf{color:#fff;margin:0;font-family:Orbitron,sans-serif;font-size:1.3rem;font-weight:700;line-height:1.4}.loading-state.jsx-eb17107075e7c8cf,.empty-state.jsx-eb17107075e7c8cf{text-align:center;color:#fff9;padding:100px 0;font-family:Orbitron,sans-serif}.loader-spinner.jsx-eb17107075e7c8cf{border:2px solid #00f0ff1a;border-top-color:#00f0ff;border-radius:50%;width:40px;height:40px;margin:0 auto 20px;animation:1s linear infinite spin}.empty-icon.jsx-eb17107075e7c8cf{opacity:.2;margin-bottom:20px;font-size:4rem;display:block}@keyframes spin{to{transform:rotate(360deg)}}@keyframes fadeUp{0%{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}@media (width<=768px){.wiki-container.jsx-eb17107075e7c8cf{padding:20px 10px}.glass-panel.jsx-eb17107075e7c8cf{flex-direction:column;align-items:flex-start;gap:25px;margin-bottom:30px;padding:25px 20px}.hero-actions.jsx-eb17107075e7c8cf{flex-direction:column;gap:12px;width:100%}.action-btn.jsx-eb17107075e7c8cf{text-align:center;width:100%;padding:14px 20px}.control-bar.jsx-eb17107075e7c8cf{flex-direction:column;align-items:stretch;gap:15px;margin-bottom:30px;padding:12px;top:10px}.search-wrapper.jsx-eb17107075e7c8cf{max-width:100%}.spotlight-search.jsx-eb17107075e7c8cf{font-size:16px}.posts-masonry.jsx-eb17107075e7c8cf{grid-template-columns:1fr;gap:20px}.post-card.jsx-eb17107075e7c8cf{border-radius:16px}.card-image-wrapper.jsx-eb17107075e7c8cf{height:180px}.card-content.jsx-eb17107075e7c8cf{padding:20px}.card-title.jsx-eb17107075e7c8cf{font-size:1.2rem}.wiki-logo.jsx-eb17107075e7c8cf{flex-wrap:wrap;gap:15px}.logo-symbol.jsx-eb17107075e7c8cf{font-size:2.2rem}.logo-text.jsx-eb17107075e7c8cf h1.jsx-eb17107075e7c8cf{word-break:break-word;font-size:1.6rem;line-height:1.2}.logo-text.jsx-eb17107075e7c8cf p.jsx-eb17107075e7c8cf{letter-spacing:2px;margin-top:5px;font-size:.6rem}.hero-stats.jsx-eb17107075e7c8cf{border-top:1px solid #ffffff0d;justify-content:space-between;gap:10px;width:100%;margin-top:10px;padding-top:20px}.stat-item.jsx-eb17107075e7c8cf{align-items:center}.stat-val.jsx-eb17107075e7c8cf{font-size:1.4rem}.stat-label.jsx-eb17107075e7c8cf{font-size:.6rem}.filter-pills.jsx-eb17107075e7c8cf{padding-bottom:10px}}'
            }, void 0, false, void 0, this)
        ]
    }, void 0, true, {
        fileName: "[project]/libs/shared-ui/src/Savoirpedia/HubClient.js",
        lineNumber: 65,
        columnNumber: 9
    }, this);
}
}),
];

//# sourceMappingURL=libs_shared-ui_src_9478c861._.js.map