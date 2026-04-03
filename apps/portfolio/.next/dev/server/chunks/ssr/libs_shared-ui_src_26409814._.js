module.exports = [
"[project]/libs/shared-ui/src/ReactBits/ShinyText.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ShinyText
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$node_modules$2f$styled$2d$jsx$2f$style$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/node_modules/styled-jsx/style.js [app-ssr] (ecmascript)");
'use client';
;
;
;
function ShinyText({ text, disabled = false, speed = 3, className = '' }) {
    const animationDuration = `${speed}s`;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            backgroundImage: 'linear-gradient(120deg, rgba(255, 255, 255, 0) 40%, rgba(255, 255, 255, 0.8) 50%, rgba(255, 255, 255, 0) 60%)',
            backgroundSize: '200% 100%',
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            display: 'inline-block',
            color: '#b5b5b5a4',
            animation: !disabled ? `shine ${animationDuration} linear infinite` : 'none'
        },
        className: "jsx-6d60a6019df5cef4" + " " + `shiny-text ${className} ${disabled ? 'disabled' : ''}`,
        children: [
            text,
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$node_modules$2f$styled$2d$jsx$2f$style$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                id: "6d60a6019df5cef4",
                children: "@keyframes shine{0%{background-position:100%}to{background-position:-100%}}.shiny-text.jsx-6d60a6019df5cef4{color:#b5b5b5a4;-webkit-background-clip:text;background-clip:text}.shiny-text.disabled.jsx-6d60a6019df5cef4{background-image:none!important;animation:none!important}"
            }, void 0, false, void 0, this)
        ]
    }, void 0, true, {
        fileName: "[project]/libs/shared-ui/src/ReactBits/ShinyText.js",
        lineNumber: 8,
        columnNumber: 5
    }, this);
}
}),
"[project]/libs/shared-ui/src/ReactBits/RetroGrid.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>RetroGrid
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$node_modules$2f$styled$2d$jsx$2f$style$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/node_modules/styled-jsx/style.js [app-ssr] (ecmascript)");
'use client';
;
;
function RetroGrid() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "jsx-216ef7aa4a8f1bba" + " " + "retro-grid",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "jsx-216ef7aa4a8f1bba" + " " + "grid-lines"
            }, void 0, false, {
                fileName: "[project]/libs/shared-ui/src/ReactBits/RetroGrid.js",
                lineNumber: 6,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$node_modules$2f$styled$2d$jsx$2f$style$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                id: "216ef7aa4a8f1bba",
                children: '.retro-grid.jsx-216ef7aa4a8f1bba{z-index:0;perspective:600px;background-color:#020202;width:100vw;height:100vh;position:fixed;top:0;left:0;overflow:hidden}.grid-lines.jsx-216ef7aa4a8f1bba{background-image:linear-gradient(90deg,#00f0ff1a 1px,#0000 1px),linear-gradient(#00f0ff1a 1px,#0000 1px);background-size:50px 50px;width:200%;height:200%;animation:20s linear infinite grid-move;position:absolute;top:-50%;left:-50%;transform:rotateX(60deg)}.retro-grid.jsx-216ef7aa4a8f1bba:after{content:"";z-index:1;background:radial-gradient(circle,#0000 0%,#020202 90%);width:100%;height:100%;position:absolute;top:0;left:0}@keyframes grid-move{0%{transform:rotateX(60deg)translateY(0)}to{transform:rotateX(60deg)translateY(50px)}}'
            }, void 0, false, void 0, this)
        ]
    }, void 0, true, {
        fileName: "[project]/libs/shared-ui/src/ReactBits/RetroGrid.js",
        lineNumber: 5,
        columnNumber: 5
    }, this);
}
}),
"[project]/libs/shared-ui/src/ReactBits/TiltedCard.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$motion$2d$value$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/value/use-motion-value.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$spring$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/value/use-spring.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$transform$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/value/use-transform.mjs [app-ssr] (ecmascript)");
'use client';
;
;
;
const TiltedCard = ({ children, className = '', tiltStrength = 20, glareOpacity = 0.4, scaleOnHover = 1.05, mobile = false })=>{
    const ref = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const [isMobile, setIsMobile] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        // Avoid synchronous state setting during initial render sequence
        const timer = setTimeout(()=>{
            setIsMobile(window.matchMedia('(max-width: 768px)').matches);
        }, 10);
        return ()=>clearTimeout(timer);
    }, []);
    const x = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$motion$2d$value$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMotionValue"])(0);
    const y = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$motion$2d$value$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMotionValue"])(0);
    const mouseXSpring = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$spring$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useSpring"])(x);
    const mouseYSpring = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$spring$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useSpring"])(y);
    const rotateX = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$transform$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useTransform"])(mouseYSpring, [
        -0.5,
        0.5
    ], [
        tiltStrength,
        -tiltStrength
    ]);
    const rotateY = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$transform$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useTransform"])(mouseXSpring, [
        -0.5,
        0.5
    ], [
        -tiltStrength,
        tiltStrength
    ]);
    const glareBackground = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$transform$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useTransform"])([
        mouseXSpring,
        mouseYSpring
    ], ([xVal, yVal])=>`radial-gradient(circle at ${50 + xVal * 100}% ${50 + yVal * 100}%, rgba(255,255,255,0.8) 0%, transparent 50%)`);
    if (isMobile || mobile) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: `relative ${className}`,
            children: children
        }, void 0, false, {
            fileName: "[project]/libs/shared-ui/src/ReactBits/TiltedCard.js",
            lineNumber: 48,
            columnNumber: 14
        }, ("TURBOPACK compile-time value", void 0));
    }
    const handleMouseMove = (e)=>{
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        const xPct = mouseX / width - 0.5;
        const yPct = mouseY / height - 0.5;
        x.set(xPct);
        y.set(yPct);
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
            rotateY,
            rotateX,
            transformStyle: "preserve-3d"
        },
        whileHover: {
            scale: scaleOnHover
        },
        className: `relative transition-all duration-200 ease-out ${className}`,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    transform: "translateZ(50px)",
                    transformStyle: "preserve-3d"
                },
                className: "relative z-10 h-full",
                children: children
            }, void 0, false, {
                fileName: "[project]/libs/shared-ui/src/ReactBits/TiltedCard.js",
                lineNumber: 87,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                className: "absolute inset-0 pointer-events-none z-20 mix-blend-overlay",
                style: {
                    opacity: glareOpacity,
                    background: glareBackground,
                    borderRadius: 'inherit'
                }
            }, void 0, false, {
                fileName: "[project]/libs/shared-ui/src/ReactBits/TiltedCard.js",
                lineNumber: 98,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/libs/shared-ui/src/ReactBits/TiltedCard.js",
        lineNumber: 75,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
const __TURBOPACK__default__export__ = TiltedCard;
}),
"[project]/libs/shared-ui/src/ActivityFeed.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ActivityFeed
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$node_modules$2f$styled$2d$jsx$2f$style$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/node_modules/styled-jsx/style.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
'use client';
;
;
;
const MOCK_EVENTS = [
    "New site deployed on MR BUILD by user_482",
    "NEX AI handled 1.2k queries in the last hour",
    "SavoirPedia updated: 'The Future of Neural Networks'",
    "MR SEARCH indexed 450 new pages",
    "ANAS GPT upgraded to v4.2.0-nebula",
    "System health check: 100% uptime across all nodes",
    "New user joined the Nexus Universe",
    "MR SHOP: 5 new digital assets listed",
    "Global Signal: Optimization complete in EU-West-1",
    "NEXENGINE reached 1 million total requests"
];
function ActivityFeed() {
    const [events, setEvents] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(MOCK_EVENTS);
    const [currentTime, setCurrentTime] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setCurrentTime(new Date().toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit'
        }));
    }, []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "jsx-9c32394093b43bee" + " " + "activity-ticker",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "jsx-9c32394093b43bee" + " " + "ticker-label",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "jsx-9c32394093b43bee" + " " + "live-dot"
                    }, void 0, false, {
                        fileName: "[project]/libs/shared-ui/src/ActivityFeed.js",
                        lineNumber: 30,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "jsx-9c32394093b43bee",
                        children: "GLOBAL SIGNAL"
                    }, void 0, false, {
                        fileName: "[project]/libs/shared-ui/src/ActivityFeed.js",
                        lineNumber: 31,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/libs/shared-ui/src/ActivityFeed.js",
                lineNumber: 29,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "jsx-9c32394093b43bee" + " " + "ticker-wrap",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "jsx-9c32394093b43bee" + " " + "ticker-move",
                    children: events.concat(events).map((event, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "jsx-9c32394093b43bee" + " " + "ticker-item",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "jsx-9c32394093b43bee" + " " + "ticker-time",
                                    children: currentTime
                                }, void 0, false, {
                                    fileName: "[project]/libs/shared-ui/src/ActivityFeed.js",
                                    lineNumber: 37,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "jsx-9c32394093b43bee" + " " + "ticker-text",
                                    children: event
                                }, void 0, false, {
                                    fileName: "[project]/libs/shared-ui/src/ActivityFeed.js",
                                    lineNumber: 38,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "jsx-9c32394093b43bee" + " " + "ticker-sep",
                                    children: "/ /"
                                }, void 0, false, {
                                    fileName: "[project]/libs/shared-ui/src/ActivityFeed.js",
                                    lineNumber: 39,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, i, true, {
                            fileName: "[project]/libs/shared-ui/src/ActivityFeed.js",
                            lineNumber: 36,
                            columnNumber: 13
                        }, this))
                }, void 0, false, {
                    fileName: "[project]/libs/shared-ui/src/ActivityFeed.js",
                    lineNumber: 34,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/libs/shared-ui/src/ActivityFeed.js",
                lineNumber: 33,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$node_modules$2f$styled$2d$jsx$2f$style$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                id: "9c32394093b43bee",
                children: ".activity-ticker.jsx-9c32394093b43bee{border-y:1px solid #00f0ff1a;-webkit-backdrop-filter:blur(10px);backdrop-filter:blur(10px);background:#00f0ff0d;align-items:center;width:100%;height:40px;display:flex;overflow:hidden}.ticker-label.jsx-9c32394093b43bee{letter-spacing:2px;color:#00f0ff;z-index:2;background:#000;border-right:1px solid #00f0ff33;align-items:center;gap:10px;height:100%;padding:0 20px;font-size:.65rem;font-weight:900;display:flex}.live-dot.jsx-9c32394093b43bee{background:#f05;border-radius:50%;width:6px;height:6px;animation:1.5s infinite pulse;box-shadow:0 0 10px #f05}@keyframes pulse{0%{opacity:1;transform:scale(1)}50%{opacity:.5;transform:scale(1.4)}to{opacity:1;transform:scale(1)}}.ticker-wrap.jsx-9c32394093b43bee{white-space:nowrap;flex:1;overflow:hidden}.ticker-move.jsx-9c32394093b43bee{padding-left:100%;animation:60s linear infinite ticker;display:inline-block}.ticker-item.jsx-9c32394093b43bee{color:#fffc;align-items:center;gap:15px;padding:0 20px;font-size:.8rem;display:inline-flex}.ticker-time.jsx-9c32394093b43bee{color:#00f0ff;opacity:.6;font-family:monospace}.ticker-sep.jsx-9c32394093b43bee{color:#00f0ff4d;font-weight:900}@keyframes ticker{0%{transform:translate(0)}to{transform:translate(-100%)}}.ticker-wrap.jsx-9c32394093b43bee:hover .ticker-move.jsx-9c32394093b43bee{animation-play-state:paused}"
            }, void 0, false, void 0, this)
        ]
    }, void 0, true, {
        fileName: "[project]/libs/shared-ui/src/ActivityFeed.js",
        lineNumber: 28,
        columnNumber: 5
    }, this);
}
}),
"[project]/libs/shared-ui/src/SystemStatus.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>SystemStatus
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$node_modules$2f$styled$2d$jsx$2f$style$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/node_modules/styled-jsx/style.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$spring$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/value/use-spring.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$motion$2d$value$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/value/use-motion-value.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$transform$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/value/use-transform.mjs [app-ssr] (ecmascript)");
'use client';
;
;
;
;
function HolographicCard({ stat, index }) {
    const ref = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const x = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$motion$2d$value$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMotionValue"])(0);
    const y = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$motion$2d$value$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMotionValue"])(0);
    const rotateX = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$spring$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useSpring"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$transform$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useTransform"])(y, [
        -100,
        100
    ], [
        15,
        -15
    ]), {
        damping: 20,
        stiffness: 200
    });
    const rotateY = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$spring$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useSpring"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$transform$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useTransform"])(x, [
        -100,
        100
    ], [
        -15,
        15
    ]), {
        damping: 20,
        stiffness: 200
    });
    const handleMouseMove = (e)=>{
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        x.set(e.clientX - centerX);
        y.set(e.clientY - centerY);
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
            rotateX,
            rotateY,
            perspective: 1000
        },
        className: `status-card holographic ${stat.trend === 'pro' ? 'pro-card' : ''}`,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "scanline"
            }, void 0, false, {
                fileName: "[project]/libs/shared-ui/src/SystemStatus.js",
                lineNumber: 36,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "card-glitch-border"
            }, void 0, false, {
                fileName: "[project]/libs/shared-ui/src/SystemStatus.js",
                lineNumber: 37,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "status-label",
                children: stat.label
            }, void 0, false, {
                fileName: "[project]/libs/shared-ui/src/SystemStatus.js",
                lineNumber: 38,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "status-value",
                children: stat.value
            }, void 0, false, {
                fileName: "[project]/libs/shared-ui/src/SystemStatus.js",
                lineNumber: 39,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: `status-trend ${stat.trend}`,
                children: stat.trend.toUpperCase()
            }, void 0, false, {
                fileName: "[project]/libs/shared-ui/src/SystemStatus.js",
                lineNumber: 40,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/libs/shared-ui/src/SystemStatus.js",
        lineNumber: 29,
        columnNumber: 5
    }, this);
}
function SystemStatus() {
    const [metrics, setMetrics] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])({
        latency: 42,
        uptime: 99.99,
        activeUsers: 124,
        buildSuccess: 98.4
    });
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const interval = setInterval(()=>{
            setMetrics((prev)=>({
                    latency: Math.floor(40 + Math.random() * 10),
                    uptime: 99.98 + Math.random() * 0.02,
                    activeUsers: prev.activeUsers + (Math.random() > 0.5 ? 1 : -1),
                    buildSuccess: 98 + Math.random() * 1
                }));
        }, 5000);
        return ()=>clearInterval(interval);
    }, []);
    const stats = [
        {
            label: "GLOBE LATENCY",
            value: `${metrics.latency}ms`,
            trend: "optimal"
        },
        {
            label: "CORE UPTIME",
            value: `${metrics.uptime.toFixed(2)}%`,
            trend: "stable"
        },
        {
            label: "ACTIVE SESSIONS",
            value: metrics.activeUsers,
            trend: "up"
        },
        {
            label: "BUILD RELIABILITY",
            value: `${metrics.buildSuccess.toFixed(1)}%`,
            trend: "high"
        },
        {
            label: "PRIORITY LANE",
            value: "ACTIVE",
            trend: "pro"
        },
        {
            label: "PRO NODES",
            value: "ONLINE",
            trend: "pro"
        }
    ];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "jsx-74246d8f37d6adca" + " " + "system-status-container",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "jsx-74246d8f37d6adca" + " " + "status-grid",
                children: stats.map((stat, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(HolographicCard, {
                        stat: stat,
                        index: i
                    }, i, false, {
                        fileName: "[project]/libs/shared-ui/src/SystemStatus.js",
                        lineNumber: 81,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "[project]/libs/shared-ui/src/SystemStatus.js",
                lineNumber: 79,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$node_modules$2f$styled$2d$jsx$2f$style$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                id: "74246d8f37d6adca",
                children: '.system-status-container.jsx-74246d8f37d6adca{width:100%;margin:40px 0}.status-grid.jsx-74246d8f37d6adca{grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:25px;display:grid}.status-card.jsx-74246d8f37d6adca{text-align:center;background:#00f0ff05;border:1px solid #00f0ff33;border-radius:4px;flex-direction:column;align-items:center;padding:30px 20px;transition:background .3s;display:flex;position:relative;overflow:hidden}.holographic.jsx-74246d8f37d6adca:before{content:"";opacity:.2;pointer-events:none;background-image:linear-gradient(#00f0ff0d 1px,#0000 1px),linear-gradient(90deg,#00f0ff0d 1px,#0000 1px);background-size:10px 10px;position:absolute;inset:0}.scanline.jsx-74246d8f37d6adca{pointer-events:none;background:#00f0ff1a;width:100%;height:2px;animation:3s linear infinite scan;position:absolute;top:0}@keyframes scan{0%{top:-10%}to{top:110%}}.status-card.jsx-74246d8f37d6adca:hover{background:#00f0ff0d;border-color:#00f0ff99}.pro-card.jsx-74246d8f37d6adca{background:#ffd70005;border-color:#ffd70066}.pro-card.jsx-74246d8f37d6adca .scanline.jsx-74246d8f37d6adca{background:#ffd70033}.status-label.jsx-74246d8f37d6adca{letter-spacing:3px;color:#00f0ff80;margin-bottom:15px;font-size:.6rem;font-weight:950}.pro-card.jsx-74246d8f37d6adca .status-label.jsx-74246d8f37d6adca{color:#ffd70080}.status-value.jsx-74246d8f37d6adca{color:#fff;text-shadow:0 0 10px #00f0ff4d;margin-bottom:12px;font-size:1.8rem;font-weight:900}.pro-card.jsx-74246d8f37d6adca .status-value.jsx-74246d8f37d6adca{text-shadow:0 0 10px #ffd7004d}.status-trend.jsx-74246d8f37d6adca{letter-spacing:2px;border:1px solid;border-radius:20px;padding:4px 12px;font-size:.55rem;font-weight:950}.optimal.jsx-74246d8f37d6adca{color:#00f0ff;background:#00f0ff0d}.stable.jsx-74246d8f37d6adca{color:#00ff64;background:#00ff640d}.up.jsx-74246d8f37d6adca{color:#ffc800;background:#ffc8000d}.high.jsx-74246d8f37d6adca{color:#00f0ff;background:#00f0ff0d}.pro.jsx-74246d8f37d6adca{color:gold;background:#ffd7000d}@media (width<=600px){.status-grid.jsx-74246d8f37d6adca{grid-template-columns:1fr 1fr}.status-value.jsx-74246d8f37d6adca{font-size:1.4rem}}'
            }, void 0, false, void 0, this)
        ]
    }, void 0, true, {
        fileName: "[project]/libs/shared-ui/src/SystemStatus.js",
        lineNumber: 78,
        columnNumber: 5
    }, this);
}
}),
"[project]/libs/shared-ui/src/PresenceDisplay.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>PresenceDisplay
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$node_modules$2f$styled$2d$jsx$2f$style$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/node_modules/styled-jsx/style.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
'use client';
;
;
;
function PresenceDisplay() {
    const [count, setCount] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(124);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const interval = setInterval(()=>{
            setCount((prev)=>{
                const change = Math.floor(Math.random() * 3) - 1;
                return prev + change;
            });
        }, 8000);
        return ()=>clearInterval(interval);
    }, []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "jsx-459bd25269be0f00" + " " + "pulse-matrix",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "jsx-459bd25269be0f00" + " " + "neural-node",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "jsx-459bd25269be0f00" + " " + "core"
                    }, void 0, false, {
                        fileName: "[project]/libs/shared-ui/src/PresenceDisplay.js",
                        lineNumber: 21,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "jsx-459bd25269be0f00" + " " + "ring ring-1"
                    }, void 0, false, {
                        fileName: "[project]/libs/shared-ui/src/PresenceDisplay.js",
                        lineNumber: 22,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "jsx-459bd25269be0f00" + " " + "ring ring-2"
                    }, void 0, false, {
                        fileName: "[project]/libs/shared-ui/src/PresenceDisplay.js",
                        lineNumber: 23,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "jsx-459bd25269be0f00" + " " + "ring ring-3"
                    }, void 0, false, {
                        fileName: "[project]/libs/shared-ui/src/PresenceDisplay.js",
                        lineNumber: 24,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/libs/shared-ui/src/PresenceDisplay.js",
                lineNumber: 20,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "jsx-459bd25269be0f00" + " " + "presence-info",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "jsx-459bd25269be0f00" + " " + "count",
                        children: count
                    }, void 0, false, {
                        fileName: "[project]/libs/shared-ui/src/PresenceDisplay.js",
                        lineNumber: 27,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "jsx-459bd25269be0f00" + " " + "label",
                        children: "LIVE NODES"
                    }, void 0, false, {
                        fileName: "[project]/libs/shared-ui/src/PresenceDisplay.js",
                        lineNumber: 28,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/libs/shared-ui/src/PresenceDisplay.js",
                lineNumber: 26,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$node_modules$2f$styled$2d$jsx$2f$style$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                id: "459bd25269be0f00",
                children: ".pulse-matrix.jsx-459bd25269be0f00{background:#00f0ff05;border:1px solid #00f0ff33;border-radius:4px;align-items:center;gap:15px;padding:10px 20px;display:inline-flex;position:relative;overflow:hidden}.neural-node.jsx-459bd25269be0f00{justify-content:center;align-items:center;width:24px;height:24px;display:flex;position:relative}.core.jsx-459bd25269be0f00{z-index:2;background:#00f0ff;border-radius:50%;width:6px;height:6px;box-shadow:0 0 15px #00f0ff}.ring.jsx-459bd25269be0f00{border:1px solid #00f0ff4d;border-radius:50%;animation:3s ease-out infinite pulseRing;position:absolute}.ring-1.jsx-459bd25269be0f00{width:10px;height:10px;animation-delay:0s}.ring-2.jsx-459bd25269be0f00{width:18px;height:18px;animation-delay:1s}.ring-3.jsx-459bd25269be0f00{width:24px;height:24px;animation-delay:2s}@keyframes pulseRing{0%{opacity:0;transform:scale(.5)}50%{opacity:.5}to{opacity:0;transform:scale(2)}}.presence-info.jsx-459bd25269be0f00{flex-direction:column;line-height:1;display:flex}.count.jsx-459bd25269be0f00{color:#fff;letter-spacing:1px;font-family:monospace;font-size:1.1rem;font-weight:950}.label.jsx-459bd25269be0f00{letter-spacing:3px;color:#00f0ff80;text-transform:uppercase;margin-top:4px;font-size:.5rem;font-weight:950}"
            }, void 0, false, void 0, this)
        ]
    }, void 0, true, {
        fileName: "[project]/libs/shared-ui/src/PresenceDisplay.js",
        lineNumber: 19,
        columnNumber: 5
    }, this);
}
}),
"[project]/libs/shared-ui/src/Effects/ScrollReveal.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ScrollReveal
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-ssr] (ecmascript)");
'use client';
;
;
function ScrollReveal({ children, direction = 'up', delay = 0, distance = 50 }) {
    const variants = {
        hidden: {
            opacity: 0,
            x: direction === 'left' ? -distance : direction === 'right' ? distance : 0,
            y: direction === 'up' ? distance : direction === 'down' ? -distance : 0
        },
        visible: {
            opacity: 1,
            x: 0,
            y: 0,
            transition: {
                duration: 0.8,
                delay: delay,
                ease: [
                    0.16,
                    1,
                    0.3,
                    1
                ]
            }
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
        initial: "hidden",
        whileInView: "visible",
        viewport: {
            once: true,
            margin: "0px"
        },
        variants: variants,
        style: {
            width: '100%'
        },
        children: children
    }, void 0, false, {
        fileName: "[project]/libs/shared-ui/src/Effects/ScrollReveal.js",
        lineNumber: 24,
        columnNumber: 5
    }, this);
}
}),
"[project]/libs/shared-ui/src/Effects/ParallaxLayer.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ParallaxLayer
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$scroll$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/value/use-scroll.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$transform$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/value/use-transform.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
'use client';
;
;
;
function ParallaxLayer({ children, speed = 0.5, direction = 'vertical' }) {
    const ref = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const { scrollYProgress } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$scroll$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useScroll"])({
        target: ref,
        offset: [
            "start end",
            "end start"
        ]
    });
    const range = direction === 'vertical' ? [
        100 * speed,
        -100 * speed
    ] : [
        50 * speed,
        -50 * speed
    ];
    const y = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$transform$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useTransform"])(scrollYProgress, [
        0,
        1
    ], range);
    const x = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$transform$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useTransform"])(scrollYProgress, [
        0,
        1
    ], direction === 'horizontal' ? range : [
        0,
        0
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
        ref: ref,
        style: {
            y,
            x
        },
        children: children
    }, void 0, false, {
        fileName: "[project]/libs/shared-ui/src/Effects/ParallaxLayer.js",
        lineNumber: 17,
        columnNumber: 5
    }, this);
}
}),
"[project]/libs/shared-ui/src/Effects/QuantumCore.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>QuantumCore
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$node_modules$2f$styled$2d$jsx$2f$style$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/node_modules/styled-jsx/style.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
'use client';
;
;
;
function QuantumCore() {
    const canvasRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        let animationFrameId;
        const resize = ()=>{
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        window.addEventListener('resize', resize);
        resize();
        // Cinematic Particle System
        const particles = Array.from({
            length: 80
        }, ()=>({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                size: Math.random() * 2.5 + 0.5,
                vx: (Math.random() - 0.5) * 0.3,
                vy: (Math.random() - 0.5) * 0.3,
                pulse: Math.random() * 0.02,
                opacity: Math.random() * 0.5 + 0.2,
                color: Math.random() > 0.8 ? '#ff00c8' : '#00f0ff'
            }));
        // Shooting Star Protocol
        let shootingStar = null;
        const spawnShootingStar = ()=>{
            shootingStar = {
                x: Math.random() * canvas.width,
                y: Math.random() * (canvas.height / 2),
                vx: Math.random() * 15 + 10,
                vy: Math.random() * 5 + 2,
                life: 1.0
            };
        };
        const draw = ()=>{
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            // Draw Particles with soft glow
            particles.forEach((p)=>{
                p.x += p.vx;
                p.y += p.vy;
                p.opacity += p.pulse;
                if (p.opacity > 0.8 || p.opacity < 0.2) p.pulse *= -1;
                if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
                if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fillStyle = p.color;
                ctx.globalAlpha = p.opacity;
                ctx.fill();
                // Add subtle refraction bloom
                ctx.shadowBlur = 15;
                ctx.shadowColor = p.color;
            });
            // Handle Shooting Stars
            if (shootingStar) {
                shootingStar.x += shootingStar.vx;
                shootingStar.y += shootingStar.vy;
                shootingStar.life -= 0.01;
                if (shootingStar.life <= 0) {
                    shootingStar = null;
                } else {
                    ctx.beginPath();
                    const gradient = ctx.createLinearGradient(shootingStar.x, shootingStar.y, shootingStar.x - shootingStar.vx * 5, shootingStar.y - shootingStar.vy * 5);
                    gradient.addColorStop(0, '#fff');
                    gradient.addColorStop(1, 'transparent');
                    ctx.strokeStyle = gradient;
                    ctx.lineWidth = 2;
                    ctx.moveTo(shootingStar.x, shootingStar.y);
                    ctx.lineTo(shootingStar.x - shootingStar.vx * 5, shootingStar.y - shootingStar.vy * 5);
                    ctx.stroke();
                }
            } else if (Math.random() < 0.005) {
                spawnShootingStar();
            }
            ctx.shadowBlur = 0; // Reset for performance
            ctx.globalAlpha = 1.0;
            animationFrameId = requestAnimationFrame(draw);
        };
        draw();
        return ()=>{
            window.removeEventListener('resize', resize);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "jsx-6b4b0e2b087fda20" + " " + "quantum-core-wrapper",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("canvas", {
                ref: canvasRef,
                style: {
                    position: 'fixed',
                    inset: 0,
                    pointerEvents: 'none',
                    zIndex: 1
                },
                className: "jsx-6b4b0e2b087fda20"
            }, void 0, false, {
                fileName: "[project]/libs/shared-ui/src/Effects/QuantumCore.js",
                lineNumber: 109,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "jsx-6b4b0e2b087fda20" + " " + "aurora-engine"
            }, void 0, false, {
                fileName: "[project]/libs/shared-ui/src/Effects/QuantumCore.js",
                lineNumber: 118,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$node_modules$2f$styled$2d$jsx$2f$style$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                id: "6b4b0e2b087fda20",
                children: ".quantum-core-wrapper.jsx-6b4b0e2b087fda20{z-index:1;pointer-events:none;background:radial-gradient(circle,#7000ff0d 0%,#0000 70%);position:fixed;inset:0}.aurora-engine.jsx-6b4b0e2b087fda20{mix-blend-mode:screen;background:linear-gradient(135deg,#00f0ff08 0%,#ff00c808 50%,#00f0ff08 100%) 0 0/400% 400%;animation:20s infinite auroraFlow;position:absolute;inset:0}@keyframes auroraFlow{0%{background-position:0%}50%{background-position:100%}to{background-position:0%}}"
            }, void 0, false, void 0, this)
        ]
    }, void 0, true, {
        fileName: "[project]/libs/shared-ui/src/Effects/QuantumCore.js",
        lineNumber: 108,
        columnNumber: 5
    }, this);
}
}),
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
"[project]/libs/shared-ui/src/Effects/CustomCursor.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>CustomCursor
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$node_modules$2f$styled$2d$jsx$2f$style$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/node_modules/styled-jsx/style.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$spring$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/value/use-spring.mjs [app-ssr] (ecmascript)");
'use client';
;
;
;
;
function CustomCursor() {
    const [mousePos, setMousePos] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])({
        x: 0,
        y: 0
    });
    const [isPointer, setIsPointer] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const springX = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$spring$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useSpring"])(0, {
        damping: 20,
        stiffness: 250
    });
    const springY = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$spring$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useSpring"])(0, {
        damping: 20,
        stiffness: 250
    });
    const [isClicked, setIsClicked] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const handleMove = (e)=>{
            springX.set(e.clientX);
            springY.set(e.clientY);
            const target = e.target;
            setIsPointer(window.getComputedStyle(target).cursor === 'pointer' || target.tagName === 'A' || target.tagName === 'BUTTON');
        };
        const handleDown = ()=>setIsClicked(true);
        const handleUp = ()=>setIsClicked(false);
        window.addEventListener('mousemove', handleMove);
        window.addEventListener('mousedown', handleDown);
        window.addEventListener('mouseup', handleUp);
        return ()=>{
            window.removeEventListener('mousemove', handleMove);
            window.removeEventListener('mousedown', handleDown);
            window.removeEventListener('mouseup', handleUp);
        };
    }, [
        springX,
        springY
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
        className: "custom-cursor",
        style: {
            left: springX,
            top: springY,
            scale: isClicked ? 0.8 : isPointer ? 1.5 : 1,
            borderColor: isClicked ? '#ff00c8' : isPointer ? '#00f0ff' : 'rgba(255,255,255,0.5)'
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "jsx-5ef93a1789db59e0" + " " + "inner-dot"
            }, void 0, false, {
                fileName: "[project]/libs/shared-ui/src/Effects/CustomCursor.js",
                lineNumber: 46,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$node_modules$2f$styled$2d$jsx$2f$style$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                id: "5ef93a1789db59e0",
                children: ".custom-cursor.jsx-5ef93a1789db59e0{pointer-events:none;z-index:10000;border:2px solid #ffffff80;border-radius:50%;justify-content:center;align-items:center;width:40px;height:40px;transition:scale .3s,border-color .3s;display:flex;position:fixed;transform:translate(-50%,-50%)}.inner-dot.jsx-5ef93a1789db59e0{background:#00f0ff;border-radius:50%;width:4px;height:4px;box-shadow:0 0 10px #00f0ff}@media (width<=768px){.custom-cursor.jsx-5ef93a1789db59e0{display:none}}"
            }, void 0, false, void 0, this)
        ]
    }, void 0, true, {
        fileName: "[project]/libs/shared-ui/src/Effects/CustomCursor.js",
        lineNumber: 37,
        columnNumber: 5
    }, this);
}
}),
"[project]/libs/shared-ui/src/Effects/HyperButton.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>HyperButton
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$node_modules$2f$styled$2d$jsx$2f$style$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/node_modules/styled-jsx/style.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$spring$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/value/use-spring.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$motion$2d$value$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/value/use-motion-value.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$transform$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/value/use-transform.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
'use client';
;
;
;
;
function HyperButton({ children, href, className = "", gold = false }) {
    const ref = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const x = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$motion$2d$value$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMotionValue"])(0);
    const y = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$motion$2d$value$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMotionValue"])(0);
    const springConfig = {
        damping: 20,
        stiffness: 300,
        mass: 0.5
    };
    const mouseX = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$spring$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useSpring"])(x, springConfig);
    const mouseY = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$spring$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useSpring"])(y, springConfig);
    const [isHovered, setIsHovered] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const handleMouseMove = (e)=>{
        if (!ref.current) return;
        const { left, top, width, height } = ref.current.getBoundingClientRect();
        const centerX = left + width / 2;
        const centerY = top + height / 2;
        x.set((e.clientX - centerX) * 0.4);
        y.set((e.clientY - centerY) * 0.4);
    };
    const handleMouseLeave = ()=>{
        x.set(0);
        y.set(0);
        setIsHovered(false);
    };
    const contentX = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$transform$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useTransform"])(mouseX, (val)=>val * 0.5);
    const contentY = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$transform$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useTransform"])(mouseY, (val)=>val * 0.5);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
        ref: ref,
        onMouseMove: handleMouseMove,
        onMouseEnter: ()=>setIsHovered(true),
        onMouseLeave: handleMouseLeave,
        style: {
            x: mouseX,
            y: mouseY
        },
        className: `hyper-btn-container ${gold ? 'gold' : ''} ${className}`,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                href: href,
                className: "jsx-5f75f22cd88c7b39" + " " + "hyper-btn",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].span, {
                        style: {
                            x: contentX,
                            y: contentY
                        },
                        children: children
                    }, void 0, false, {
                        fileName: "[project]/libs/shared-ui/src/Effects/HyperButton.js",
                        lineNumber: 44,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "jsx-5f75f22cd88c7b39" + " " + `liquid-glow ${isHovered ? 'active' : ''}`
                    }, void 0, false, {
                        fileName: "[project]/libs/shared-ui/src/Effects/HyperButton.js",
                        lineNumber: 47,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/libs/shared-ui/src/Effects/HyperButton.js",
                lineNumber: 43,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$node_modules$2f$styled$2d$jsx$2f$style$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                id: "5f75f22cd88c7b39",
                children: ".hyper-btn-container.jsx-5f75f22cd88c7b39{z-index:5;touch-action:manipulation;display:inline-block;position:relative}.hyper-btn.jsx-5f75f22cd88c7b39{color:#000;letter-spacing:.2em;transition:var(--transition-smooth);background:#fff;border-radius:4px;justify-content:center;align-items:center;padding:max(12px,min(2vw,20px)) max(30px,min(4vw,55px));font-size:max(.75rem,min(1vw,1rem));font-weight:950;text-decoration:none;display:flex;position:relative;overflow:hidden;box-shadow:0 4px 15px #0003}.hyper-btn.jsx-5f75f22cd88c7b39:focus-visible{outline:3px solid var(--primary);outline-offset:4px}.gold.jsx-5f75f22cd88c7b39 .hyper-btn.jsx-5f75f22cd88c7b39{background:gold;box-shadow:0 0 30px #ffd70033}.hyper-btn.jsx-5f75f22cd88c7b39 span.jsx-5f75f22cd88c7b39{z-index:2;white-space:nowrap;display:block;position:relative}.liquid-glow.jsx-5f75f22cd88c7b39{opacity:0;pointer-events:none;background:radial-gradient(circle,#00f0ff80,#0000 70%);transition:transform .8s cubic-bezier(.16,1,.3,1),opacity .6s;position:absolute;inset:0;transform:scale(0)}.gold.jsx-5f75f22cd88c7b39 .liquid-glow.jsx-5f75f22cd88c7b39{background:radial-gradient(circle,#fffc,#0000 70%)}.liquid-glow.active.jsx-5f75f22cd88c7b39{opacity:1;transform:scale(4)}@media (width<=768px){.hyper-btn.jsx-5f75f22cd88c7b39{width:100%;padding:18px 30px}}@media (width>=1920px){.hyper-btn.jsx-5f75f22cd88c7b39{padding:24px 60px;font-size:1.1rem}}"
            }, void 0, false, void 0, this)
        ]
    }, void 0, true, {
        fileName: "[project]/libs/shared-ui/src/Effects/HyperButton.js",
        lineNumber: 35,
        columnNumber: 5
    }, this);
}
}),
"[project]/libs/shared-ui/src/Effects/LensEffects.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>LensEffects
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$node_modules$2f$styled$2d$jsx$2f$style$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/node_modules/styled-jsx/style.js [app-ssr] (ecmascript)");
'use client';
;
;
function LensEffects() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "jsx-60ede12b5e10f0dc" + " " + "lens-overlay-system",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "jsx-60ede12b5e10f0dc" + " " + "film-grain"
            }, void 0, false, {
                fileName: "[project]/libs/shared-ui/src/Effects/LensEffects.js",
                lineNumber: 6,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "jsx-60ede12b5e10f0dc" + " " + "vignette"
            }, void 0, false, {
                fileName: "[project]/libs/shared-ui/src/Effects/LensEffects.js",
                lineNumber: 7,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "jsx-60ede12b5e10f0dc" + " " + "corner-flare-tl"
            }, void 0, false, {
                fileName: "[project]/libs/shared-ui/src/Effects/LensEffects.js",
                lineNumber: 8,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "jsx-60ede12b5e10f0dc" + " " + "corner-flare-br"
            }, void 0, false, {
                fileName: "[project]/libs/shared-ui/src/Effects/LensEffects.js",
                lineNumber: 9,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$node_modules$2f$styled$2d$jsx$2f$style$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                id: "60ede12b5e10f0dc",
                children: ".lens-overlay-system.jsx-60ede12b5e10f0dc{pointer-events:none;z-index:9999;position:fixed;inset:0;overflow:hidden}.film-grain.jsx-60ede12b5e10f0dc{opacity:.045;pointer-events:none;background-image:url(https://grainy-gradients.vercel.app/noise.svg);animation:8s steps(10,end) infinite grainMove;position:absolute;inset:-100%}@keyframes grainMove{0%,to{transform:translate(0)}10%{transform:translate(-5%,-10%)}20%{transform:translate(-15%,5%)}30%{transform:translate(7%,-25%)}40%{transform:translate(-5%,25%)}50%{transform:translate(-15%,10%)}60%{transform:translate(15%)}70%{transform:translateY(15%)}80%{transform:translate(3%,35%)}90%{transform:translate(-10%,10%)}}.vignette.jsx-60ede12b5e10f0dc{mix-blend-mode:multiply;background:radial-gradient(circle,#0000 30%,#0009 100%);position:absolute;inset:0}.corner-flare-tl.jsx-60ede12b5e10f0dc{filter:blur(100px);background:radial-gradient(circle,#00f0ff0d 0%,#0000 70%);width:600px;height:600px;position:absolute;top:-200px;left:-200px}.corner-flare-br.jsx-60ede12b5e10f0dc{filter:blur(100px);background:radial-gradient(circle,#7000ff0d 0%,#0000 70%);width:600px;height:600px;position:absolute;bottom:-200px;right:-200px}"
            }, void 0, false, void 0, this)
        ]
    }, void 0, true, {
        fileName: "[project]/libs/shared-ui/src/Effects/LensEffects.js",
        lineNumber: 5,
        columnNumber: 5
    }, this);
}
}),
"[project]/libs/shared-ui/src/NexusCommand.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>NexusCommand
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$node_modules$2f$styled$2d$jsx$2f$style$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/node_modules/styled-jsx/style.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-ssr] (ecmascript)");
'use client';
;
;
;
;
function NexusCommand() {
    const [isOpen, setIsOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const menuItems = [
        {
            label: "EXPLORE",
            href: "#projects"
        },
        {
            label: "PRICING",
            href: "#pricing"
        },
        {
            label: "ARCHIVES",
            href: "/savoirpedia"
        },
        {
            label: "COMMUNITY",
            href: "#community"
        },
        {
            label: "CONTACT",
            href: "#contact"
        }
    ];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "jsx-76049255b47bbb93" + " " + "nexus-command-system",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].button, {
                className: `command-orb ${isOpen ? 'active' : ''}`,
                onClick: ()=>setIsOpen(!isOpen),
                whileHover: {
                    scale: 1.1
                },
                whileTap: {
                    scale: 0.9
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "jsx-76049255b47bbb93" + " " + "orb-inner"
                    }, void 0, false, {
                        fileName: "[project]/libs/shared-ui/src/NexusCommand.js",
                        lineNumber: 24,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "jsx-76049255b47bbb93" + " " + "orb-rings",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "jsx-76049255b47bbb93" + " " + "ring"
                            }, void 0, false, {
                                fileName: "[project]/libs/shared-ui/src/NexusCommand.js",
                                lineNumber: 26,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "jsx-76049255b47bbb93" + " " + "ring"
                            }, void 0, false, {
                                fileName: "[project]/libs/shared-ui/src/NexusCommand.js",
                                lineNumber: 27,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/libs/shared-ui/src/NexusCommand.js",
                        lineNumber: 25,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/libs/shared-ui/src/NexusCommand.js",
                lineNumber: 18,
                columnNumber: 7
            }, this),
            isOpen && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                onClick: ()=>setIsOpen(false),
                className: "jsx-76049255b47bbb93" + " " + "command-overlay",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                    className: "command-menu glass",
                    initial: {
                        opacity: 0,
                        scale: 0.9,
                        y: 20
                    },
                    animate: {
                        opacity: 1,
                        scale: 1,
                        y: 0
                    },
                    onClick: (e)=>e.stopPropagation(),
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "jsx-76049255b47bbb93" + " " + "menu-header",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "jsx-76049255b47bbb93" + " " + "terminal-prompt",
                                    children: "NEXUS_COMMAND_HUB_V1.0"
                                }, void 0, false, {
                                    fileName: "[project]/libs/shared-ui/src/NexusCommand.js",
                                    lineNumber: 40,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "jsx-76049255b47bbb93" + " " + "scanline"
                                }, void 0, false, {
                                    fileName: "[project]/libs/shared-ui/src/NexusCommand.js",
                                    lineNumber: 41,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/libs/shared-ui/src/NexusCommand.js",
                            lineNumber: 39,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
                            className: "jsx-76049255b47bbb93" + " " + "menu-links",
                            children: menuItems.map((item, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                    href: item.href,
                                    onClick: ()=>setIsOpen(false),
                                    className: "jsx-76049255b47bbb93" + " " + "menu-item",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "jsx-76049255b47bbb93" + " " + "item-num",
                                            children: [
                                                "0",
                                                i + 1
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/libs/shared-ui/src/NexusCommand.js",
                                            lineNumber: 51,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "jsx-76049255b47bbb93" + " " + "item-label",
                                            children: item.label
                                        }, void 0, false, {
                                            fileName: "[project]/libs/shared-ui/src/NexusCommand.js",
                                            lineNumber: 52,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "jsx-76049255b47bbb93" + " " + "item-bar"
                                        }, void 0, false, {
                                            fileName: "[project]/libs/shared-ui/src/NexusCommand.js",
                                            lineNumber: 53,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, i, true, {
                                    fileName: "[project]/libs/shared-ui/src/NexusCommand.js",
                                    lineNumber: 45,
                                    columnNumber: 17
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/libs/shared-ui/src/NexusCommand.js",
                            lineNumber: 43,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/libs/shared-ui/src/NexusCommand.js",
                    lineNumber: 33,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/libs/shared-ui/src/NexusCommand.js",
                lineNumber: 32,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$node_modules$2f$styled$2d$jsx$2f$style$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                id: "76049255b47bbb93",
                children: ".nexus-command-system.jsx-76049255b47bbb93{z-index:99999;position:fixed;bottom:40px;right:40px}.command-orb.jsx-76049255b47bbb93{cursor:pointer;background:#000;border:1px solid #00f0ff66;border-radius:50%;justify-content:center;align-items:center;width:60px;height:60px;display:flex;position:relative;box-shadow:0 0 30px #00f0ff33}.orb-inner.jsx-76049255b47bbb93{z-index:2;background:#00f0ff;border-radius:50%;width:20px;height:20px;position:relative;box-shadow:0 0 20px #00f0ff}.ring.jsx-76049255b47bbb93{border:1px solid #00f0ff33;border-radius:50%;animation:10s linear infinite orbRotate;position:absolute;inset:-10px}.ring.jsx-76049255b47bbb93:nth-child(2){animation-duration:15s;animation-direction:reverse;inset:-20px}@keyframes orbRotate{0%{transform:rotate(0)}to{transform:rotate(360deg)}}.command-overlay.jsx-76049255b47bbb93{-webkit-backdrop-filter:blur(10px);backdrop-filter:blur(10px);z-index:-1;background:#0006;justify-content:center;align-items:center;display:flex;position:fixed;inset:0}.command-menu.jsx-76049255b47bbb93{border-radius:4px;width:400px;padding:40px;position:relative;background:#00050af2!important;border-color:#00f0ff66!important}.menu-header.jsx-76049255b47bbb93{border-bottom:1px solid #00f0ff33;margin-bottom:30px;padding-bottom:20px;position:relative}.terminal-prompt.jsx-76049255b47bbb93{color:#00f0ff;letter-spacing:2px;font-family:monospace;font-size:.7rem}.menu-links.jsx-76049255b47bbb93{flex-direction:column;gap:15px;display:flex}.menu-item.jsx-76049255b47bbb93{color:#fff;align-items:center;gap:20px;padding:15px;text-decoration:none;transition:all .3s;display:flex;position:relative}.item-num.jsx-76049255b47bbb93{color:#00f0ff80;font-family:monospace;font-size:.7rem}.item-label.jsx-76049255b47bbb93{letter-spacing:4px;font-size:1.2rem;font-weight:900}.item-bar.jsx-76049255b47bbb93{transform-origin:0;background:linear-gradient(90deg,#00f0ff,#0000);height:1px;transition:transform .4s;position:absolute;bottom:0;left:15px;right:15px;transform:scaleX(0)}.menu-item.jsx-76049255b47bbb93:hover .item-bar.jsx-76049255b47bbb93{transform:scaleX(1)}.menu-item.jsx-76049255b47bbb93:hover{background:#00f0ff0d;padding-left:25px}"
            }, void 0, false, void 0, this)
        ]
    }, void 0, true, {
        fileName: "[project]/libs/shared-ui/src/NexusCommand.js",
        lineNumber: 17,
        columnNumber: 5
    }, this);
}
}),
"[project]/libs/shared-ui/src/SentientCore.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>SentientCore
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$node_modules$2f$styled$2d$jsx$2f$style$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/node_modules/styled-jsx/style.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$react$2d$three$2d$fiber$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@react-three/fiber/dist/react-three-fiber.esm.js [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$5a94e5eb$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__D__as__useFrame$3e$__ = __turbopack_context__.i("[project]/node_modules/@react-three/fiber/dist/events-5a94e5eb.esm.js [app-ssr] (ecmascript) <export D as useFrame>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$drei$2f$core$2f$Stars$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@react-three/drei/core/Stars.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$drei$2f$core$2f$Float$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@react-three/drei/core/Float.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$drei$2f$core$2f$PerspectiveCamera$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@react-three/drei/core/PerspectiveCamera.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/three/build/three.core.js [app-ssr] (ecmascript)");
'use client';
;
;
;
;
;
;
function CoreMesh() {
    const meshRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])();
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$5a94e5eb$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__D__as__useFrame$3e$__["useFrame"])((state, delta)=>{
        if (meshRef.current) {
            // Base rotation
            meshRef.current.rotation.y += delta * 0.2;
            // Mouse interaction (look at pointer)
            const { pointer } = state;
            const targetX = pointer.y * 0.5; // Invert axis for natural feel
            const targetY = pointer.x * 0.5;
            meshRef.current.rotation.x += (targetX - meshRef.current.rotation.x) * delta * 2;
            meshRef.current.rotation.z += (targetY - meshRef.current.rotation.z) * delta * 2;
            // Pulsing effect
            const materials = Array.isArray(meshRef.current.material) ? meshRef.current.material : [
                meshRef.current.material
            ];
            materials.forEach((mat)=>{
                if (mat.emissiveIntensity !== undefined) {
                    mat.emissiveIntensity = 2 + Math.sin(state.clock.elapsedTime * 2) * 0.5;
                }
            });
        }
    });
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$drei$2f$core$2f$Float$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Float"], {
        speed: 2,
        rotationIntensity: 0.5,
        floatIntensity: 1,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("mesh", {
                ref: meshRef,
                scale: 1.5,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("icosahedronGeometry", {
                        args: [
                            1,
                            1
                        ]
                    }, void 0, false, {
                        fileName: "[project]/libs/shared-ui/src/SentientCore.js",
                        lineNumber: 37,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("meshStandardMaterial", {
                        color: "#00f0ff",
                        wireframe: true,
                        emissive: "#00f0ff",
                        emissiveIntensity: 2,
                        transparent: true,
                        opacity: 0.6
                    }, void 0, false, {
                        fileName: "[project]/libs/shared-ui/src/SentientCore.js",
                        lineNumber: 38,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/libs/shared-ui/src/SentientCore.js",
                lineNumber: 36,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("mesh", {
                scale: 2,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("sphereGeometry", {
                        args: [
                            1,
                            32,
                            32
                        ]
                    }, void 0, false, {
                        fileName: "[project]/libs/shared-ui/src/SentientCore.js",
                        lineNumber: 49,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("meshBasicMaterial", {
                        color: "#00f0ff",
                        transparent: true,
                        opacity: 0.05,
                        side: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["BackSide"],
                        blending: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AdditiveBlending"]
                    }, void 0, false, {
                        fileName: "[project]/libs/shared-ui/src/SentientCore.js",
                        lineNumber: 50,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/libs/shared-ui/src/SentientCore.js",
                lineNumber: 48,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/libs/shared-ui/src/SentientCore.js",
        lineNumber: 35,
        columnNumber: 5
    }, this);
}
function ParticleField() {
    const count = 500;
    const [positions, setPositions] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(new Float32Array(count * 3));
    const [opacity, setOpacity] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(new Float32Array(count));
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const pos = new Float32Array(count * 3);
        const op = new Float32Array(count);
        for(let i = 0; i < count; i++){
            pos[i * 3] = (Math.random() - 0.5) * 15;
            pos[i * 3 + 1] = (Math.random() - 0.5) * 15;
            pos[i * 3 + 2] = (Math.random() - 0.5) * 15;
            op[i] = Math.random();
        }
        const timer = setTimeout(()=>{
            setPositions(pos);
            setOpacity(op);
        }, 10);
        return ()=>clearTimeout(timer);
    }, []);
    const pointsRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])();
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$5a94e5eb$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__D__as__useFrame$3e$__["useFrame"])((state, delta)=>{
        if (pointsRef.current) {
            pointsRef.current.rotation.y -= delta * 0.05;
        }
    });
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("points", {
        ref: pointsRef,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("bufferGeometry", {
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("bufferAttribute", {
                    attach: "attributes-position",
                    count: count,
                    array: positions,
                    itemSize: 3
                }, void 0, false, {
                    fileName: "[project]/libs/shared-ui/src/SentientCore.js",
                    lineNumber: 94,
                    columnNumber: 17
                }, this)
            }, void 0, false, {
                fileName: "[project]/libs/shared-ui/src/SentientCore.js",
                lineNumber: 93,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("pointsMaterial", {
                size: 0.05,
                color: "#ffffff",
                transparent: true,
                opacity: 0.4,
                sizeAttenuation: true,
                blending: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AdditiveBlending"]
            }, void 0, false, {
                fileName: "[project]/libs/shared-ui/src/SentientCore.js",
                lineNumber: 101,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/libs/shared-ui/src/SentientCore.js",
        lineNumber: 92,
        columnNumber: 9
    }, this);
}
function SentientCore() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "jsx-60cf5f2521326f84" + " " + "sentient-core-container",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$react$2d$three$2d$fiber$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["Canvas"], {
                dpr: [
                    1,
                    2
                ],
                gl: {
                    antialias: true,
                    alpha: true
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$drei$2f$core$2f$PerspectiveCamera$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PerspectiveCamera"], {
                        makeDefault: true,
                        position: [
                            0,
                            0,
                            5
                        ],
                        fov: 75
                    }, void 0, false, {
                        fileName: "[project]/libs/shared-ui/src/SentientCore.js",
                        lineNumber: 117,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("color", {
                        attach: "background",
                        args: [
                            '#000000'
                        ],
                        className: "jsx-60cf5f2521326f84"
                    }, void 0, false, {
                        fileName: "[project]/libs/shared-ui/src/SentientCore.js",
                        lineNumber: 118,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("ambientLight", {
                        intensity: 0.5,
                        className: "jsx-60cf5f2521326f84"
                    }, void 0, false, {
                        fileName: "[project]/libs/shared-ui/src/SentientCore.js",
                        lineNumber: 120,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("pointLight", {
                        position: [
                            10,
                            10,
                            10
                        ],
                        intensity: 1,
                        color: "#00f0ff",
                        className: "jsx-60cf5f2521326f84"
                    }, void 0, false, {
                        fileName: "[project]/libs/shared-ui/src/SentientCore.js",
                        lineNumber: 121,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("pointLight", {
                        position: [
                            -10,
                            -10,
                            -10
                        ],
                        intensity: 0.5,
                        color: "#ff00ff",
                        className: "jsx-60cf5f2521326f84"
                    }, void 0, false, {
                        fileName: "[project]/libs/shared-ui/src/SentientCore.js",
                        lineNumber: 122,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Suspense"], {
                        fallback: null,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(CoreMesh, {}, void 0, false, {
                                fileName: "[project]/libs/shared-ui/src/SentientCore.js",
                                lineNumber: 125,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(ParticleField, {}, void 0, false, {
                                fileName: "[project]/libs/shared-ui/src/SentientCore.js",
                                lineNumber: 126,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$drei$2f$core$2f$Stars$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Stars"], {
                                radius: 100,
                                depth: 50,
                                count: 5000,
                                factor: 4,
                                saturation: 0,
                                fade: true,
                                speed: 1
                            }, void 0, false, {
                                fileName: "[project]/libs/shared-ui/src/SentientCore.js",
                                lineNumber: 127,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/libs/shared-ui/src/SentientCore.js",
                        lineNumber: 124,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/libs/shared-ui/src/SentientCore.js",
                lineNumber: 116,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$node_modules$2f$styled$2d$jsx$2f$style$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                id: "60cf5f2521326f84",
                children: ".sentient-core-container.jsx-60cf5f2521326f84{z-index:0;opacity:0;width:100%;height:100%;animation:2s ease-out forwards fadeIn;position:absolute;top:0;left:0}@keyframes fadeIn{to{opacity:1}}"
            }, void 0, false, void 0, this)
        ]
    }, void 0, true, {
        fileName: "[project]/libs/shared-ui/src/SentientCore.js",
        lineNumber: 115,
        columnNumber: 5
    }, this);
}
}),
"[project]/libs/shared-ui/src/HomeClient.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>HomeClient
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$node_modules$2f$styled$2d$jsx$2f$style$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/node_modules/styled-jsx/style.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/image.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$libs$2f$shared$2d$ui$2f$src$2f$ReactBits$2f$ShinyText$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/libs/shared-ui/src/ReactBits/ShinyText.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$libs$2f$shared$2d$ui$2f$src$2f$ReactBits$2f$RetroGrid$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/libs/shared-ui/src/ReactBits/RetroGrid.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$libs$2f$shared$2d$ui$2f$src$2f$ReactBits$2f$CardNav$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/libs/shared-ui/src/ReactBits/CardNav.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$libs$2f$shared$2d$ui$2f$src$2f$ReactBits$2f$TiltedCard$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/libs/shared-ui/src/ReactBits/TiltedCard.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$libs$2f$core$2f$src$2f$firebase$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/libs/core/src/firebase.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$firebase$2f$firestore$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/firebase/firestore/dist/index.mjs [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@firebase/firestore/dist/index.node.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$libs$2f$shared$2d$ui$2f$src$2f$ActivityFeed$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/libs/shared-ui/src/ActivityFeed.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$libs$2f$shared$2d$ui$2f$src$2f$SystemStatus$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/libs/shared-ui/src/SystemStatus.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$libs$2f$shared$2d$ui$2f$src$2f$PresenceDisplay$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/libs/shared-ui/src/PresenceDisplay.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$libs$2f$shared$2d$ui$2f$src$2f$Effects$2f$ScrollReveal$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/libs/shared-ui/src/Effects/ScrollReveal.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$libs$2f$shared$2d$ui$2f$src$2f$Effects$2f$ParallaxLayer$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/libs/shared-ui/src/Effects/ParallaxLayer.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$libs$2f$shared$2d$ui$2f$src$2f$Effects$2f$QuantumCore$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/libs/shared-ui/src/Effects/QuantumCore.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$libs$2f$shared$2d$ui$2f$src$2f$Effects$2f$MagneticWrapper$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/libs/shared-ui/src/Effects/MagneticWrapper.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$libs$2f$shared$2d$ui$2f$src$2f$Effects$2f$CustomCursor$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/libs/shared-ui/src/Effects/CustomCursor.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$libs$2f$shared$2d$ui$2f$src$2f$Effects$2f$HyperButton$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/libs/shared-ui/src/Effects/HyperButton.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$libs$2f$shared$2d$ui$2f$src$2f$Effects$2f$LensEffects$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/libs/shared-ui/src/Effects/LensEffects.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$libs$2f$shared$2d$ui$2f$src$2f$NexusCommand$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/libs/shared-ui/src/NexusCommand.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$libs$2f$shared$2d$ui$2f$src$2f$SentientCore$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/libs/shared-ui/src/SentientCore.js [app-ssr] (ecmascript)");
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
;
;
;
;
;
;
;
;
;
;
;
;
;
;
function HomeClient() {
    const sectionsRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])([]);
    const [settings, setSettings] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])({
        heroTitle: 'MR ANAS NIDIR',
        heroSubtitle: 'Entrepreneur • Visionary • Digital Innovator',
        aboutText: "I'm Mr Anas Nidir, a builder of tech, AI systems, and futuristic platforms — driven by simplicity and independence. I believe in creating tools that empower, not restrict.",
        bioTitle: 'My Story',
        bioText1: 'Mr Anas Nidir is a tech entrepreneur, futurist, and digital architect. He is the founder of innovation-focused projects including NEXENGINE, NEX AI, and ANAS GPT.',
        bioText2: 'Since March 2025, he has been developing high-performance solutions from scratch — without relying on traditional tools or platforms.',
        quote: 'Simple is Power',
        contactEmail: 'ceo@anasnidir.com',
        tiktok: 'https://tiktok.com/@anasnide',
        instagram: 'https://www.instagram.com/anasnide',
        stats: [
            {
                label: 'Active Projects',
                value: '3+'
            },
            {
                label: 'Founded',
                value: '2025'
            },
            {
                label: 'Possibilities',
                value: '∞'
            }
        ],
        projects: [
            {
                icon: '⚡',
                title: 'NEXENGINE',
                desc: 'Independent web server system built for speed, privacy, and total control.',
                tag: 'Infrastructure'
            },
            {
                icon: '🤖',
                title: 'NEX AI',
                desc: 'Custom AI Chatbot Platform with advanced natural language processing.',
                tag: 'AI / ML'
            },
            {
                icon: '💬',
                title: 'ANAS GPT',
                desc: 'Advanced LLM Web Assistant for seamless human-AI interaction.',
                tag: 'AI Assistant'
            }
        ],
        products: [
            {
                name: 'Gumroad',
                url: 'https://anasnidir.gumroad.com/'
            }
        ]
    });
    const navItems = [
        {
            label: 'Core',
            bgColor: '#111',
            textColor: '#fff',
            links: [
                {
                    label: 'Home',
                    href: '/',
                    ariaLabel: 'Go to Home'
                },
                {
                    label: 'Mr Build',
                    href: '/mr-build',
                    ariaLabel: 'Launch Mr Build'
                },
                {
                    label: 'Celco',
                    href: '/celco',
                    ariaLabel: 'Open Celco Spreadsheet'
                },
                {
                    label: 'Nex AI',
                    href: '/nex-ai',
                    ariaLabel: 'Interact with Nex AI'
                },
                {
                    label: 'Lab',
                    href: '/lab',
                    ariaLabel: 'Enter Researcher Lab'
                }
            ]
        },
        {
            label: 'Ecosystem',
            bgColor: '#161616',
            textColor: '#00f0ff',
            links: [
                {
                    label: 'SavoirPedia',
                    href: '/savoirpedia',
                    ariaLabel: 'Read SavoirPedia'
                },
                {
                    label: 'Mr Search',
                    href: '/mr-search',
                    ariaLabel: 'Mr Search'
                },
                {
                    label: 'Creovate',
                    href: '/creovate/templates',
                    ariaLabel: 'Creovate AI Studio'
                },
                {
                    label: 'Mr Shop',
                    href: '/mr-shop',
                    ariaLabel: 'Browse Assets'
                }
            ]
        },
        {
            label: 'Connect',
            bgColor: '#00f0ff',
            textColor: '#000',
            links: [
                {
                    label: 'Portfolio',
                    href: '/portfolio',
                    ariaLabel: 'View Portfolio'
                },
                {
                    label: 'TikTok',
                    href: 'https://tiktok.com/@anasnide',
                    ariaLabel: 'TikTok'
                },
                {
                    label: 'Instagram',
                    href: 'https://www.instagram.com/anasnide',
                    ariaLabel: 'Instagram'
                },
                {
                    label: 'Join Hub',
                    href: '/#community',
                    ariaLabel: 'Join the Community'
                }
            ]
        }
    ];
    const [mousePos, setMousePos] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])({
        x: 0,
        y: 0
    });
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        // Fetch Settings
        const fetchSettings = async ()=>{
            try {
                const docRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["doc"])(__TURBOPACK__imported__module__$5b$project$5d2f$libs$2f$core$2f$src$2f$firebase$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["db"], 'settings', 'homepage');
                const snap = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getDoc"])(docRef);
                if (snap.exists()) {
                    setSettings(snap.data());
                }
            } catch (err) {
                console.error("Failed to fetch settings", err);
            }
        };
        fetchSettings();
    }, []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const handleMouseMove = (e)=>{
            // Disable parallax on mobile/tablet to prevent jitters
            // Disable parallax on smaller touch devices or performance-sensitive environments
            if (window.innerWidth < 1024 || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
            setMousePos({
                x: (e.clientX / window.innerWidth - 0.5) * 20,
                y: (e.clientY / window.innerHeight - 0.5) * 20
            });
            // Localized mouse tracking for cards
            const cards = document.querySelectorAll('.project-card, .hub-card, .price-card');
            cards.forEach((card)=>{
                const rect = card.getBoundingClientRect();
                const x = (e.clientX - rect.left) / rect.width * 100;
                const y = (e.clientY - rect.top) / rect.height * 100;
                card.style.setProperty('--mouse-x', `${x}%`);
                card.style.setProperty('--mouse-y', `${y}%`);
            });
        };
        window.addEventListener('mousemove', handleMouseMove);
        return ()=>{
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$libs$2f$shared$2d$ui$2f$src$2f$Effects$2f$LensEffects$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                fileName: "[project]/libs/shared-ui/src/HomeClient.js",
                lineNumber: 140,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$libs$2f$shared$2d$ui$2f$src$2f$NexusCommand$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                fileName: "[project]/libs/shared-ui/src/HomeClient.js",
                lineNumber: 141,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$libs$2f$shared$2d$ui$2f$src$2f$Effects$2f$CustomCursor$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                fileName: "[project]/libs/shared-ui/src/HomeClient.js",
                lineNumber: 142,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    position: 'fixed',
                    inset: 0,
                    zIndex: -1,
                    pointerEvents: 'none'
                },
                className: "jsx-6401d811f994d514",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$libs$2f$shared$2d$ui$2f$src$2f$SentientCore$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                    fileName: "[project]/libs/shared-ui/src/HomeClient.js",
                    lineNumber: 144,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/libs/shared-ui/src/HomeClient.js",
                lineNumber: 143,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$libs$2f$shared$2d$ui$2f$src$2f$Effects$2f$QuantumCore$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                fileName: "[project]/libs/shared-ui/src/HomeClient.js",
                lineNumber: 146,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$libs$2f$shared$2d$ui$2f$src$2f$ReactBits$2f$CardNav$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                items: navItems
            }, void 0, false, {
                fileName: "[project]/libs/shared-ui/src/HomeClient.js",
                lineNumber: 147,
                columnNumber: 7
            }, this),
            " ",
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
                id: "home",
                className: "jsx-6401d811f994d514" + " " + "hero",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "jsx-6401d811f994d514" + " " + "hero-bg",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "jsx-6401d811f994d514" + " " + "subtle-grid",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$libs$2f$shared$2d$ui$2f$src$2f$ReactBits$2f$RetroGrid$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                    opacity: 0.1
                                }, void 0, false, {
                                    fileName: "[project]/libs/shared-ui/src/HomeClient.js",
                                    lineNumber: 152,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/libs/shared-ui/src/HomeClient.js",
                                lineNumber: 151,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "jsx-6401d811f994d514" + " " + "nebula-container",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "jsx-6401d811f994d514" + " " + "nebula nebula-1"
                                    }, void 0, false, {
                                        fileName: "[project]/libs/shared-ui/src/HomeClient.js",
                                        lineNumber: 155,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "jsx-6401d811f994d514" + " " + "nebula nebula-2"
                                    }, void 0, false, {
                                        fileName: "[project]/libs/shared-ui/src/HomeClient.js",
                                        lineNumber: 156,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "jsx-6401d811f994d514" + " " + "nebula nebula-3"
                                    }, void 0, false, {
                                        fileName: "[project]/libs/shared-ui/src/HomeClient.js",
                                        lineNumber: 157,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/libs/shared-ui/src/HomeClient.js",
                                lineNumber: 154,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "jsx-6401d811f994d514" + " " + "grid-overlay"
                            }, void 0, false, {
                                fileName: "[project]/libs/shared-ui/src/HomeClient.js",
                                lineNumber: 159,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/libs/shared-ui/src/HomeClient.js",
                        lineNumber: 150,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            transform: `translate3d(${mousePos.x}px, ${mousePos.y}px, 0)`
                        },
                        className: "jsx-6401d811f994d514" + " " + "hero-content",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$libs$2f$shared$2d$ui$2f$src$2f$Effects$2f$ParallaxLayer$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                speed: -0.3,
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "jsx-6401d811f994d514" + " " + "logo-container",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "jsx-6401d811f994d514" + " " + "logo-pulse"
                                        }, void 0, false, {
                                            fileName: "[project]/libs/shared-ui/src/HomeClient.js",
                                            lineNumber: 165,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "jsx-6401d811f994d514" + " " + "logo-glow",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                                src: "/assets/logo.jpg",
                                                alt: "Logo",
                                                width: 400,
                                                height: 400,
                                                className: "logo",
                                                style: {
                                                    objectFit: 'contain'
                                                }
                                            }, void 0, false, {
                                                fileName: "[project]/libs/shared-ui/src/HomeClient.js",
                                                lineNumber: 167,
                                                columnNumber: 17
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/libs/shared-ui/src/HomeClient.js",
                                            lineNumber: 166,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/libs/shared-ui/src/HomeClient.js",
                                    lineNumber: 164,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/libs/shared-ui/src/HomeClient.js",
                                lineNumber: 163,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$libs$2f$shared$2d$ui$2f$src$2f$Effects$2f$ScrollReveal$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                direction: "up",
                                delay: 0.2,
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                    className: "jsx-6401d811f994d514" + " " + "hero-title animate-reveal",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$libs$2f$shared$2d$ui$2f$src$2f$ReactBits$2f$ShinyText$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                        text: settings.heroTitle,
                                        speed: 3,
                                        className: "custom-shiny-text"
                                    }, void 0, false, {
                                        fileName: "[project]/libs/shared-ui/src/HomeClient.js",
                                        lineNumber: 174,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/libs/shared-ui/src/HomeClient.js",
                                    lineNumber: 173,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/libs/shared-ui/src/HomeClient.js",
                                lineNumber: 172,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$libs$2f$shared$2d$ui$2f$src$2f$Effects$2f$ScrollReveal$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                direction: "up",
                                delay: 0.4,
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "jsx-6401d811f994d514" + " " + "hero-subtitle animate-reveal-delay",
                                    children: settings.heroSubtitle
                                }, void 0, false, {
                                    fileName: "[project]/libs/shared-ui/src/HomeClient.js",
                                    lineNumber: 179,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/libs/shared-ui/src/HomeClient.js",
                                lineNumber: 178,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$libs$2f$shared$2d$ui$2f$src$2f$Effects$2f$ScrollReveal$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                direction: "up",
                                delay: 0.6,
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "jsx-6401d811f994d514" + " " + "hero-presence animate-reveal-delay",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$libs$2f$shared$2d$ui$2f$src$2f$PresenceDisplay$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                                        fileName: "[project]/libs/shared-ui/src/HomeClient.js",
                                        lineNumber: 184,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/libs/shared-ui/src/HomeClient.js",
                                    lineNumber: 183,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/libs/shared-ui/src/HomeClient.js",
                                lineNumber: 182,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$libs$2f$shared$2d$ui$2f$src$2f$Effects$2f$ScrollReveal$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                direction: "up",
                                delay: 0.8,
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "jsx-6401d811f994d514" + " " + "hero-buttons animate-reveal-delay-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$libs$2f$shared$2d$ui$2f$src$2f$Effects$2f$HyperButton$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                            href: "#projects",
                                            children: "EXPLORE UNIVERSE"
                                        }, void 0, false, {
                                            fileName: "[project]/libs/shared-ui/src/HomeClient.js",
                                            lineNumber: 190,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$libs$2f$shared$2d$ui$2f$src$2f$Effects$2f$HyperButton$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                            href: "/savoirpedia",
                                            className: "alt-btn",
                                            children: "READ ARCHIVES"
                                        }, void 0, false, {
                                            fileName: "[project]/libs/shared-ui/src/HomeClient.js",
                                            lineNumber: 193,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/libs/shared-ui/src/HomeClient.js",
                                    lineNumber: 189,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/libs/shared-ui/src/HomeClient.js",
                                lineNumber: 188,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/libs/shared-ui/src/HomeClient.js",
                        lineNumber: 162,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "jsx-6401d811f994d514" + " " + "scroll-indicator",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "jsx-6401d811f994d514" + " " + "mouse",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "jsx-6401d811f994d514" + " " + "wheel"
                                }, void 0, false, {
                                    fileName: "[project]/libs/shared-ui/src/HomeClient.js",
                                    lineNumber: 202,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/libs/shared-ui/src/HomeClient.js",
                                lineNumber: 201,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "jsx-6401d811f994d514",
                                children: "EXPLORE"
                            }, void 0, false, {
                                fileName: "[project]/libs/shared-ui/src/HomeClient.js",
                                lineNumber: 204,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/libs/shared-ui/src/HomeClient.js",
                        lineNumber: 200,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/libs/shared-ui/src/HomeClient.js",
                lineNumber: 149,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "jsx-6401d811f994d514" + " " + "telemetry-bar",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$libs$2f$shared$2d$ui$2f$src$2f$ActivityFeed$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                    fileName: "[project]/libs/shared-ui/src/HomeClient.js",
                    lineNumber: 209,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/libs/shared-ui/src/HomeClient.js",
                lineNumber: 208,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                id: "projects",
                className: "jsx-6401d811f994d514" + " " + "section",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$libs$2f$shared$2d$ui$2f$src$2f$Effects$2f$ScrollReveal$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                        direction: "up",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "jsx-6401d811f994d514" + " " + "section-header",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "jsx-6401d811f994d514" + " " + "section-tag",
                                    children: "THE ECOSYSTEM"
                                }, void 0, false, {
                                    fileName: "[project]/libs/shared-ui/src/HomeClient.js",
                                    lineNumber: 216,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                    className: "jsx-6401d811f994d514" + " " + "section-title",
                                    children: "NEXUS AI SUITE"
                                }, void 0, false, {
                                    fileName: "[project]/libs/shared-ui/src/HomeClient.js",
                                    lineNumber: 217,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/libs/shared-ui/src/HomeClient.js",
                            lineNumber: 215,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/libs/shared-ui/src/HomeClient.js",
                        lineNumber: 214,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "jsx-6401d811f994d514" + " " + "project-grid",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$libs$2f$shared$2d$ui$2f$src$2f$Effects$2f$ScrollReveal$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                direction: "left",
                                delay: 0.1,
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$libs$2f$shared$2d$ui$2f$src$2f$ReactBits$2f$TiltedCard$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                    tiltStrength: 15,
                                    glareOpacity: 0.3,
                                    scaleOnHover: 1.02,
                                    className: "project-card-wrapper",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                        href: "/mr-build",
                                        className: "project-card glass shadow-hover no-underline",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "jsx-6401d811f994d514" + " " + "card-top",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "jsx-6401d811f994d514" + " " + "card-icon-wrapper",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "jsx-6401d811f994d514" + " " + "card-icon",
                                                                children: "🏗️"
                                                            }, void 0, false, {
                                                                fileName: "[project]/libs/shared-ui/src/HomeClient.js",
                                                                lineNumber: 227,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "jsx-6401d811f994d514" + " " + "icon-glow"
                                                            }, void 0, false, {
                                                                fileName: "[project]/libs/shared-ui/src/HomeClient.js",
                                                                lineNumber: 228,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/libs/shared-ui/src/HomeClient.js",
                                                        lineNumber: 226,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "jsx-6401d811f994d514" + " " + "card-tag",
                                                        children: "Web Builder"
                                                    }, void 0, false, {
                                                        fileName: "[project]/libs/shared-ui/src/HomeClient.js",
                                                        lineNumber: 230,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/libs/shared-ui/src/HomeClient.js",
                                                lineNumber: 225,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                className: "jsx-6401d811f994d514",
                                                children: "MR BUILD"
                                            }, void 0, false, {
                                                fileName: "[project]/libs/shared-ui/src/HomeClient.js",
                                                lineNumber: 232,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "jsx-6401d811f994d514",
                                                children: "Deploy high-performance, SEO-optimized websites in seconds. Zero code, total control."
                                            }, void 0, false, {
                                                fileName: "[project]/libs/shared-ui/src/HomeClient.js",
                                                lineNumber: 233,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "jsx-6401d811f994d514" + " " + "card-footer",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "jsx-6401d811f994d514" + " " + "view-link",
                                                    children: "LAUNCH ENGINE →"
                                                }, void 0, false, {
                                                    fileName: "[project]/libs/shared-ui/src/HomeClient.js",
                                                    lineNumber: 235,
                                                    columnNumber: 21
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/libs/shared-ui/src/HomeClient.js",
                                                lineNumber: 234,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/libs/shared-ui/src/HomeClient.js",
                                        lineNumber: 224,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/libs/shared-ui/src/HomeClient.js",
                                    lineNumber: 223,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/libs/shared-ui/src/HomeClient.js",
                                lineNumber: 222,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$libs$2f$shared$2d$ui$2f$src$2f$Effects$2f$ScrollReveal$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                direction: "left",
                                delay: 0.2,
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$libs$2f$shared$2d$ui$2f$src$2f$ReactBits$2f$TiltedCard$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                    tiltStrength: 15,
                                    glareOpacity: 0.3,
                                    scaleOnHover: 1.02,
                                    className: "project-card-wrapper",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                        href: "/mr-search",
                                        className: "project-card glass shadow-hover no-underline",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "jsx-6401d811f994d514" + " " + "card-top",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "jsx-6401d811f994d514" + " " + "card-icon-wrapper",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "jsx-6401d811f994d514" + " " + "card-icon",
                                                                children: "🔍"
                                                            }, void 0, false, {
                                                                fileName: "[project]/libs/shared-ui/src/HomeClient.js",
                                                                lineNumber: 246,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "jsx-6401d811f994d514" + " " + "icon-glow"
                                                            }, void 0, false, {
                                                                fileName: "[project]/libs/shared-ui/src/HomeClient.js",
                                                                lineNumber: 247,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/libs/shared-ui/src/HomeClient.js",
                                                        lineNumber: 245,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "jsx-6401d811f994d514" + " " + "card-tag",
                                                        children: "Real-time Search"
                                                    }, void 0, false, {
                                                        fileName: "[project]/libs/shared-ui/src/HomeClient.js",
                                                        lineNumber: 249,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/libs/shared-ui/src/HomeClient.js",
                                                lineNumber: 244,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                className: "jsx-6401d811f994d514",
                                                children: "MR SEARCH"
                                            }, void 0, false, {
                                                fileName: "[project]/libs/shared-ui/src/HomeClient.js",
                                                lineNumber: 251,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "jsx-6401d811f994d514",
                                                children: "Next-gen indexing technology for deep-web discovery and instant data retrieval."
                                            }, void 0, false, {
                                                fileName: "[project]/libs/shared-ui/src/HomeClient.js",
                                                lineNumber: 252,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "jsx-6401d811f994d514" + " " + "card-footer",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "jsx-6401d811f994d514" + " " + "view-link",
                                                    children: "START SEARCH →"
                                                }, void 0, false, {
                                                    fileName: "[project]/libs/shared-ui/src/HomeClient.js",
                                                    lineNumber: 254,
                                                    columnNumber: 21
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/libs/shared-ui/src/HomeClient.js",
                                                lineNumber: 253,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/libs/shared-ui/src/HomeClient.js",
                                        lineNumber: 243,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/libs/shared-ui/src/HomeClient.js",
                                    lineNumber: 242,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/libs/shared-ui/src/HomeClient.js",
                                lineNumber: 241,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$libs$2f$shared$2d$ui$2f$src$2f$Effects$2f$ScrollReveal$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                direction: "left",
                                delay: 0.25,
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$libs$2f$shared$2d$ui$2f$src$2f$ReactBits$2f$TiltedCard$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                    tiltStrength: 15,
                                    glareOpacity: 0.3,
                                    scaleOnHover: 1.02,
                                    className: "project-card-wrapper",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                        href: "/nex-ai",
                                        className: "project-card glass shadow-hover no-underline",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "jsx-6401d811f994d514" + " " + "card-top",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "jsx-6401d811f994d514" + " " + "card-icon-wrapper",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "jsx-6401d811f994d514" + " " + "card-icon",
                                                                children: "🤖"
                                                            }, void 0, false, {
                                                                fileName: "[project]/libs/shared-ui/src/HomeClient.js",
                                                                lineNumber: 265,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "jsx-6401d811f994d514" + " " + "icon-glow"
                                                            }, void 0, false, {
                                                                fileName: "[project]/libs/shared-ui/src/HomeClient.js",
                                                                lineNumber: 266,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/libs/shared-ui/src/HomeClient.js",
                                                        lineNumber: 264,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "jsx-6401d811f994d514" + " " + "card-tag",
                                                        children: "Artificial Intelligence"
                                                    }, void 0, false, {
                                                        fileName: "[project]/libs/shared-ui/src/HomeClient.js",
                                                        lineNumber: 268,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/libs/shared-ui/src/HomeClient.js",
                                                lineNumber: 263,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                className: "jsx-6401d811f994d514",
                                                children: "NEX AI"
                                            }, void 0, false, {
                                                fileName: "[project]/libs/shared-ui/src/HomeClient.js",
                                                lineNumber: 270,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "jsx-6401d811f994d514",
                                                children: "Interact with the singularity. Access GPT-4, Claude 3, and Llama 3 in a holographic interface."
                                            }, void 0, false, {
                                                fileName: "[project]/libs/shared-ui/src/HomeClient.js",
                                                lineNumber: 271,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "jsx-6401d811f994d514" + " " + "card-footer",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "jsx-6401d811f994d514" + " " + "view-link",
                                                    children: "INITIATE UPLINK →"
                                                }, void 0, false, {
                                                    fileName: "[project]/libs/shared-ui/src/HomeClient.js",
                                                    lineNumber: 273,
                                                    columnNumber: 21
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/libs/shared-ui/src/HomeClient.js",
                                                lineNumber: 272,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/libs/shared-ui/src/HomeClient.js",
                                        lineNumber: 262,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/libs/shared-ui/src/HomeClient.js",
                                    lineNumber: 261,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/libs/shared-ui/src/HomeClient.js",
                                lineNumber: 260,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$libs$2f$shared$2d$ui$2f$src$2f$Effects$2f$ScrollReveal$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                direction: "left",
                                delay: 0.3,
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$libs$2f$shared$2d$ui$2f$src$2f$ReactBits$2f$TiltedCard$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                    tiltStrength: 15,
                                    glareOpacity: 0.3,
                                    scaleOnHover: 1.02,
                                    className: "project-card-wrapper",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                        href: "/mr-shop",
                                        className: "project-card glass shadow-hover no-underline",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "jsx-6401d811f994d514" + " " + "card-top",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "jsx-6401d811f994d514" + " " + "card-icon-wrapper",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "jsx-6401d811f994d514" + " " + "card-icon",
                                                                children: "🛍️"
                                                            }, void 0, false, {
                                                                fileName: "[project]/libs/shared-ui/src/HomeClient.js",
                                                                lineNumber: 284,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "jsx-6401d811f994d514" + " " + "icon-glow"
                                                            }, void 0, false, {
                                                                fileName: "[project]/libs/shared-ui/src/HomeClient.js",
                                                                lineNumber: 285,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/libs/shared-ui/src/HomeClient.js",
                                                        lineNumber: 283,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "jsx-6401d811f994d514" + " " + "card-tag",
                                                        children: "Marketplace"
                                                    }, void 0, false, {
                                                        fileName: "[project]/libs/shared-ui/src/HomeClient.js",
                                                        lineNumber: 287,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/libs/shared-ui/src/HomeClient.js",
                                                lineNumber: 282,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                className: "jsx-6401d811f994d514",
                                                children: "MR SHOP"
                                            }, void 0, false, {
                                                fileName: "[project]/libs/shared-ui/src/HomeClient.js",
                                                lineNumber: 289,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "jsx-6401d811f994d514",
                                                children: "A secure digital asset exchange for futuristic tools, templates, and AI models."
                                            }, void 0, false, {
                                                fileName: "[project]/libs/shared-ui/src/HomeClient.js",
                                                lineNumber: 290,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "jsx-6401d811f994d514" + " " + "card-footer",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "jsx-6401d811f994d514" + " " + "view-link",
                                                    children: "BROWSE ASSETS →"
                                                }, void 0, false, {
                                                    fileName: "[project]/libs/shared-ui/src/HomeClient.js",
                                                    lineNumber: 292,
                                                    columnNumber: 21
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/libs/shared-ui/src/HomeClient.js",
                                                lineNumber: 291,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/libs/shared-ui/src/HomeClient.js",
                                        lineNumber: 281,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/libs/shared-ui/src/HomeClient.js",
                                    lineNumber: 280,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/libs/shared-ui/src/HomeClient.js",
                                lineNumber: 279,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$libs$2f$shared$2d$ui$2f$src$2f$Effects$2f$ScrollReveal$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                direction: "left",
                                delay: 0.4,
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$libs$2f$shared$2d$ui$2f$src$2f$ReactBits$2f$TiltedCard$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                    tiltStrength: 15,
                                    glareOpacity: 0.3,
                                    scaleOnHover: 1.02,
                                    className: "project-card-wrapper",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                        href: "/savoirpedia",
                                        className: "project-card glass shadow-hover no-underline",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "jsx-6401d811f994d514" + " " + "card-top",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "jsx-6401d811f994d514" + " " + "card-icon-wrapper",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "jsx-6401d811f994d514" + " " + "card-icon",
                                                                children: "📚"
                                                            }, void 0, false, {
                                                                fileName: "[project]/libs/shared-ui/src/HomeClient.js",
                                                                lineNumber: 303,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "jsx-6401d811f994d514" + " " + "icon-glow"
                                                            }, void 0, false, {
                                                                fileName: "[project]/libs/shared-ui/src/HomeClient.js",
                                                                lineNumber: 304,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/libs/shared-ui/src/HomeClient.js",
                                                        lineNumber: 302,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "jsx-6401d811f994d514" + " " + "card-tag",
                                                        children: "Knowledge Hub"
                                                    }, void 0, false, {
                                                        fileName: "[project]/libs/shared-ui/src/HomeClient.js",
                                                        lineNumber: 306,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/libs/shared-ui/src/HomeClient.js",
                                                lineNumber: 301,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                className: "jsx-6401d811f994d514",
                                                children: "SAVOIRPEDIA"
                                            }, void 0, false, {
                                                fileName: "[project]/libs/shared-ui/src/HomeClient.js",
                                                lineNumber: 308,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "jsx-6401d811f994d514",
                                                children: "The definitive archive for tech, futurism, and digital sovereignty."
                                            }, void 0, false, {
                                                fileName: "[project]/libs/shared-ui/src/HomeClient.js",
                                                lineNumber: 309,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "jsx-6401d811f994d514" + " " + "card-footer",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "jsx-6401d811f994d514" + " " + "view-link",
                                                    children: "OPEN ARCHIVES →"
                                                }, void 0, false, {
                                                    fileName: "[project]/libs/shared-ui/src/HomeClient.js",
                                                    lineNumber: 311,
                                                    columnNumber: 21
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/libs/shared-ui/src/HomeClient.js",
                                                lineNumber: 310,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/libs/shared-ui/src/HomeClient.js",
                                        lineNumber: 300,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/libs/shared-ui/src/HomeClient.js",
                                    lineNumber: 299,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/libs/shared-ui/src/HomeClient.js",
                                lineNumber: 298,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/libs/shared-ui/src/HomeClient.js",
                        lineNumber: 221,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/libs/shared-ui/src/HomeClient.js",
                lineNumber: 213,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                className: "jsx-6401d811f994d514" + " " + "section cta-banner-section",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "jsx-6401d811f994d514" + " " + "cta-banner glass pro",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "jsx-6401d811f994d514" + " " + "cta-content",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "jsx-6401d811f994d514" + " " + "cta-tag",
                                    children: "PREMIUM ACCESS"
                                }, void 0, false, {
                                    fileName: "[project]/libs/shared-ui/src/HomeClient.js",
                                    lineNumber: 323,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                    className: "jsx-6401d811f994d514",
                                    children: "UNLOCK THE MASTER ARCHIVE"
                                }, void 0, false, {
                                    fileName: "[project]/libs/shared-ui/src/HomeClient.js",
                                    lineNumber: 324,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "jsx-6401d811f994d514",
                                    children: "Get exclusive access to the deep-tech insights and futurist perspectives reserved for our Pro members."
                                }, void 0, false, {
                                    fileName: "[project]/libs/shared-ui/src/HomeClient.js",
                                    lineNumber: 325,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/libs/shared-ui/src/HomeClient.js",
                            lineNumber: 322,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                            href: "/mr-build/subscription",
                            className: "btn-premium gold",
                            children: "GO PRO NOW"
                        }, void 0, false, {
                            fileName: "[project]/libs/shared-ui/src/HomeClient.js",
                            lineNumber: 327,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/libs/shared-ui/src/HomeClient.js",
                    lineNumber: 321,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/libs/shared-ui/src/HomeClient.js",
                lineNumber: 320,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                style: {
                    paddingTop: '50px'
                },
                className: "jsx-6401d811f994d514" + " " + "section",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$libs$2f$shared$2d$ui$2f$src$2f$Effects$2f$ScrollReveal$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                        direction: "up",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "jsx-6401d811f994d514" + " " + "section-header",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "jsx-6401d811f994d514" + " " + "section-tag",
                                    children: "SYSTEM STATUS"
                                }, void 0, false, {
                                    fileName: "[project]/libs/shared-ui/src/HomeClient.js",
                                    lineNumber: 337,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                    className: "jsx-6401d811f994d514" + " " + "section-title",
                                    children: "GLOBAL PERFORMANCE"
                                }, void 0, false, {
                                    fileName: "[project]/libs/shared-ui/src/HomeClient.js",
                                    lineNumber: 338,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/libs/shared-ui/src/HomeClient.js",
                            lineNumber: 336,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/libs/shared-ui/src/HomeClient.js",
                        lineNumber: 335,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$libs$2f$shared$2d$ui$2f$src$2f$SystemStatus$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                        fileName: "[project]/libs/shared-ui/src/HomeClient.js",
                        lineNumber: 341,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/libs/shared-ui/src/HomeClient.js",
                lineNumber: 334,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                id: "pricing",
                className: "jsx-6401d811f994d514" + " " + "section",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$libs$2f$shared$2d$ui$2f$src$2f$Effects$2f$ScrollReveal$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                        direction: "up",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "jsx-6401d811f994d514" + " " + "section-header center",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "jsx-6401d811f994d514" + " " + "section-tag",
                                    children: "MONETIZATION"
                                }, void 0, false, {
                                    fileName: "[project]/libs/shared-ui/src/HomeClient.js",
                                    lineNumber: 348,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                    className: "jsx-6401d811f994d514" + " " + "section-title",
                                    children: "ECONOMIC ENGINE"
                                }, void 0, false, {
                                    fileName: "[project]/libs/shared-ui/src/HomeClient.js",
                                    lineNumber: 349,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "jsx-6401d811f994d514" + " " + "section-subtitle",
                                    children: "Fuel your digital expansion with our premium protocols."
                                }, void 0, false, {
                                    fileName: "[project]/libs/shared-ui/src/HomeClient.js",
                                    lineNumber: 350,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/libs/shared-ui/src/HomeClient.js",
                            lineNumber: 347,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/libs/shared-ui/src/HomeClient.js",
                        lineNumber: 346,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "jsx-6401d811f994d514" + " " + "pricing-grid",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$libs$2f$shared$2d$ui$2f$src$2f$Effects$2f$ScrollReveal$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                direction: "up",
                                delay: 0.2,
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$libs$2f$shared$2d$ui$2f$src$2f$Effects$2f$MagneticWrapper$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                    strength: 0.05,
                                    range: 200,
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "jsx-6401d811f994d514" + " " + "price-card glass",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "jsx-6401d811f994d514" + " " + "price-header",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                        className: "jsx-6401d811f994d514",
                                                        children: "TRIAL-X"
                                                    }, void 0, false, {
                                                        fileName: "[project]/libs/shared-ui/src/HomeClient.js",
                                                        lineNumber: 359,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "jsx-6401d811f994d514" + " " + "amount",
                                                        children: [
                                                            "$0",
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "jsx-6401d811f994d514",
                                                                children: "/mo"
                                                            }, void 0, false, {
                                                                fileName: "[project]/libs/shared-ui/src/HomeClient.js",
                                                                lineNumber: 360,
                                                                columnNumber: 45
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/libs/shared-ui/src/HomeClient.js",
                                                        lineNumber: 360,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/libs/shared-ui/src/HomeClient.js",
                                                lineNumber: 358,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                                className: "jsx-6401d811f994d514" + " " + "price-features",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                        className: "jsx-6401d811f994d514",
                                                        children: "✅ 1 Active Deployment"
                                                    }, void 0, false, {
                                                        fileName: "[project]/libs/shared-ui/src/HomeClient.js",
                                                        lineNumber: 363,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                        className: "jsx-6401d811f994d514",
                                                        children: "✅ Basic Site Editor"
                                                    }, void 0, false, {
                                                        fileName: "[project]/libs/shared-ui/src/HomeClient.js",
                                                        lineNumber: 364,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                        className: "jsx-6401d811f994d514",
                                                        children: "✅ Manual Deployments"
                                                    }, void 0, false, {
                                                        fileName: "[project]/libs/shared-ui/src/HomeClient.js",
                                                        lineNumber: 365,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                        className: "jsx-6401d811f994d514",
                                                        children: "❌ Custom Domains"
                                                    }, void 0, false, {
                                                        fileName: "[project]/libs/shared-ui/src/HomeClient.js",
                                                        lineNumber: 366,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/libs/shared-ui/src/HomeClient.js",
                                                lineNumber: 362,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                                href: "/mr-build/login",
                                                className: "btn-outline",
                                                children: "START FREE"
                                            }, void 0, false, {
                                                fileName: "[project]/libs/shared-ui/src/HomeClient.js",
                                                lineNumber: 368,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/libs/shared-ui/src/HomeClient.js",
                                        lineNumber: 357,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/libs/shared-ui/src/HomeClient.js",
                                    lineNumber: 356,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/libs/shared-ui/src/HomeClient.js",
                                lineNumber: 355,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$libs$2f$shared$2d$ui$2f$src$2f$Effects$2f$ScrollReveal$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                direction: "up",
                                delay: 0.4,
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$libs$2f$shared$2d$ui$2f$src$2f$Effects$2f$MagneticWrapper$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                    strength: 0.08,
                                    range: 200,
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "jsx-6401d811f994d514" + " " + "price-card glass pro highlight",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "jsx-6401d811f994d514" + " " + "badge",
                                                children: "MOST POPULAR"
                                            }, void 0, false, {
                                                fileName: "[project]/libs/shared-ui/src/HomeClient.js",
                                                lineNumber: 376,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "jsx-6401d811f994d514" + " " + "price-header",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                        className: "jsx-6401d811f994d514",
                                                        children: "PREMIUM-X"
                                                    }, void 0, false, {
                                                        fileName: "[project]/libs/shared-ui/src/HomeClient.js",
                                                        lineNumber: 378,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "jsx-6401d811f994d514" + " " + "amount",
                                                        children: [
                                                            "$9.99",
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "jsx-6401d811f994d514",
                                                                children: "/mo"
                                                            }, void 0, false, {
                                                                fileName: "[project]/libs/shared-ui/src/HomeClient.js",
                                                                lineNumber: 379,
                                                                columnNumber: 48
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/libs/shared-ui/src/HomeClient.js",
                                                        lineNumber: 379,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/libs/shared-ui/src/HomeClient.js",
                                                lineNumber: 377,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                                className: "jsx-6401d811f994d514" + " " + "price-features",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                        className: "jsx-6401d811f994d514",
                                                        children: [
                                                            "✅ ",
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                                className: "jsx-6401d811f994d514",
                                                                children: "5 Active Deployments"
                                                            }, void 0, false, {
                                                                fileName: "[project]/libs/shared-ui/src/HomeClient.js",
                                                                lineNumber: 382,
                                                                columnNumber: 25
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/libs/shared-ui/src/HomeClient.js",
                                                        lineNumber: 382,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                        className: "jsx-6401d811f994d514",
                                                        children: [
                                                            "✅ ",
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                                className: "jsx-6401d811f994d514",
                                                                children: "Advanced Components"
                                                            }, void 0, false, {
                                                                fileName: "[project]/libs/shared-ui/src/HomeClient.js",
                                                                lineNumber: 383,
                                                                columnNumber: 25
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/libs/shared-ui/src/HomeClient.js",
                                                        lineNumber: 383,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                        className: "jsx-6401d811f994d514",
                                                        children: [
                                                            "✅ ",
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                                className: "jsx-6401d811f994d514",
                                                                children: "Instant Updates"
                                                            }, void 0, false, {
                                                                fileName: "[project]/libs/shared-ui/src/HomeClient.js",
                                                                lineNumber: 384,
                                                                columnNumber: 25
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/libs/shared-ui/src/HomeClient.js",
                                                        lineNumber: 384,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                        className: "jsx-6401d811f994d514",
                                                        children: "✅ 24/7 Priority Channel"
                                                    }, void 0, false, {
                                                        fileName: "[project]/libs/shared-ui/src/HomeClient.js",
                                                        lineNumber: 385,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/libs/shared-ui/src/HomeClient.js",
                                                lineNumber: 381,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                                href: "/mr-build/subscription",
                                                className: "btn-premium",
                                                children: "UPGRADE NOW"
                                            }, void 0, false, {
                                                fileName: "[project]/libs/shared-ui/src/HomeClient.js",
                                                lineNumber: 387,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/libs/shared-ui/src/HomeClient.js",
                                        lineNumber: 375,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/libs/shared-ui/src/HomeClient.js",
                                    lineNumber: 374,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/libs/shared-ui/src/HomeClient.js",
                                lineNumber: 373,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/libs/shared-ui/src/HomeClient.js",
                        lineNumber: 354,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/libs/shared-ui/src/HomeClient.js",
                lineNumber: 345,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                className: "jsx-6401d811f994d514" + " " + "section",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$libs$2f$shared$2d$ui$2f$src$2f$Effects$2f$ScrollReveal$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                        direction: "left",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "jsx-6401d811f994d514" + " " + "section-header",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "jsx-6401d811f994d514" + " " + "section-tag",
                                    children: "MR SHOP"
                                }, void 0, false, {
                                    fileName: "[project]/libs/shared-ui/src/HomeClient.js",
                                    lineNumber: 398,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                    className: "jsx-6401d811f994d514" + " " + "section-title",
                                    children: "FEATURED ASSETS"
                                }, void 0, false, {
                                    fileName: "[project]/libs/shared-ui/src/HomeClient.js",
                                    lineNumber: 399,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/libs/shared-ui/src/HomeClient.js",
                            lineNumber: 397,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/libs/shared-ui/src/HomeClient.js",
                        lineNumber: 396,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "jsx-6401d811f994d514" + " " + "asset-grid",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$libs$2f$shared$2d$ui$2f$src$2f$Effects$2f$ScrollReveal$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                direction: "right",
                                delay: 0.2,
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$libs$2f$shared$2d$ui$2f$src$2f$Effects$2f$MagneticWrapper$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                    strength: 0.1,
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "jsx-6401d811f994d514" + " " + "asset-item glass",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "jsx-6401d811f994d514" + " " + "asset-info",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                                        className: "jsx-6401d811f994d514",
                                                        children: "Nebula UI Kit"
                                                    }, void 0, false, {
                                                        fileName: "[project]/libs/shared-ui/src/HomeClient.js",
                                                        lineNumber: 408,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "jsx-6401d811f994d514",
                                                        children: "Premium dark-mode templates for Mr Build."
                                                    }, void 0, false, {
                                                        fileName: "[project]/libs/shared-ui/src/HomeClient.js",
                                                        lineNumber: 409,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/libs/shared-ui/src/HomeClient.js",
                                                lineNumber: 407,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "jsx-6401d811f994d514" + " " + "asset-price",
                                                children: "$19"
                                            }, void 0, false, {
                                                fileName: "[project]/libs/shared-ui/src/HomeClient.js",
                                                lineNumber: 411,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                href: "https://anasnidir.gumroad.com/",
                                                target: "_blank",
                                                className: "jsx-6401d811f994d514" + " " + "btn-buy",
                                                children: "BUY NOW"
                                            }, void 0, false, {
                                                fileName: "[project]/libs/shared-ui/src/HomeClient.js",
                                                lineNumber: 412,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/libs/shared-ui/src/HomeClient.js",
                                        lineNumber: 406,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/libs/shared-ui/src/HomeClient.js",
                                    lineNumber: 405,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/libs/shared-ui/src/HomeClient.js",
                                lineNumber: 404,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$libs$2f$shared$2d$ui$2f$src$2f$Effects$2f$ScrollReveal$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                direction: "right",
                                delay: 0.4,
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$libs$2f$shared$2d$ui$2f$src$2f$Effects$2f$MagneticWrapper$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                    strength: 0.1,
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "jsx-6401d811f994d514" + " " + "asset-item glass",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "jsx-6401d811f994d514" + " " + "asset-info",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                                        className: "jsx-6401d811f994d514",
                                                        children: "Quantum Search API"
                                                    }, void 0, false, {
                                                        fileName: "[project]/libs/shared-ui/src/HomeClient.js",
                                                        lineNumber: 421,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "jsx-6401d811f994d514",
                                                        children: "Direct access to Mr Search indexing core."
                                                    }, void 0, false, {
                                                        fileName: "[project]/libs/shared-ui/src/HomeClient.js",
                                                        lineNumber: 422,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/libs/shared-ui/src/HomeClient.js",
                                                lineNumber: 420,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "jsx-6401d811f994d514" + " " + "asset-price",
                                                children: "$49"
                                            }, void 0, false, {
                                                fileName: "[project]/libs/shared-ui/src/HomeClient.js",
                                                lineNumber: 424,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                href: "https://anasnidir.gumroad.com/",
                                                target: "_blank",
                                                className: "jsx-6401d811f994d514" + " " + "btn-buy",
                                                children: "BUY NOW"
                                            }, void 0, false, {
                                                fileName: "[project]/libs/shared-ui/src/HomeClient.js",
                                                lineNumber: 425,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/libs/shared-ui/src/HomeClient.js",
                                        lineNumber: 419,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/libs/shared-ui/src/HomeClient.js",
                                    lineNumber: 418,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/libs/shared-ui/src/HomeClient.js",
                                lineNumber: 417,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/libs/shared-ui/src/HomeClient.js",
                        lineNumber: 403,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/libs/shared-ui/src/HomeClient.js",
                lineNumber: 395,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                className: "jsx-6401d811f994d514" + " " + "stats-section",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "jsx-6401d811f994d514" + " " + "stats-container",
                    children: (settings.stats || []).map((stat, idx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "jsx-6401d811f994d514" + " " + "stat-item",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "jsx-6401d811f994d514" + " " + "stat-circle",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "jsx-6401d811f994d514" + " " + "stat-number",
                                        children: stat.value
                                    }, void 0, false, {
                                        fileName: "[project]/libs/shared-ui/src/HomeClient.js",
                                        lineNumber: 438,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "jsx-6401d811f994d514" + " " + "stat-label",
                                        children: stat.label
                                    }, void 0, false, {
                                        fileName: "[project]/libs/shared-ui/src/HomeClient.js",
                                        lineNumber: 439,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/libs/shared-ui/src/HomeClient.js",
                                lineNumber: 437,
                                columnNumber: 15
                            }, this)
                        }, idx, false, {
                            fileName: "[project]/libs/shared-ui/src/HomeClient.js",
                            lineNumber: 436,
                            columnNumber: 13
                        }, this))
                }, void 0, false, {
                    fileName: "[project]/libs/shared-ui/src/HomeClient.js",
                    lineNumber: 434,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/libs/shared-ui/src/HomeClient.js",
                lineNumber: 433,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                id: "about",
                className: "jsx-6401d811f994d514" + " " + "section",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$libs$2f$shared$2d$ui$2f$src$2f$Effects$2f$ScrollReveal$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                    direction: "up",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                            className: "jsx-6401d811f994d514" + " " + "section-title",
                            children: "👤 About Me"
                        }, void 0, false, {
                            fileName: "[project]/libs/shared-ui/src/HomeClient.js",
                            lineNumber: 449,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "jsx-6401d811f994d514" + " " + "about-content",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "jsx-6401d811f994d514" + " " + "about-text",
                                children: settings.aboutText
                            }, void 0, false, {
                                fileName: "[project]/libs/shared-ui/src/HomeClient.js",
                                lineNumber: 451,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/libs/shared-ui/src/HomeClient.js",
                            lineNumber: 450,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/libs/shared-ui/src/HomeClient.js",
                    lineNumber: 448,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/libs/shared-ui/src/HomeClient.js",
                lineNumber: 447,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                id: "bio",
                className: "jsx-6401d811f994d514" + " " + "section bio-section",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "jsx-6401d811f994d514" + " " + "bio-glitch-bg"
                    }, void 0, false, {
                        fileName: "[project]/libs/shared-ui/src/HomeClient.js",
                        lineNumber: 460,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "jsx-6401d811f994d514" + " " + "bio-container",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "jsx-6401d811f994d514" + " " + "bio-visual",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$libs$2f$shared$2d$ui$2f$src$2f$Effects$2f$ScrollReveal$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                        direction: "left",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$libs$2f$shared$2d$ui$2f$src$2f$Effects$2f$ParallaxLayer$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                            speed: 0.2,
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "jsx-6401d811f994d514" + " " + "bio-image-frame",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                                        src: "/assets/profile.jpg",
                                                        alt: "Anas",
                                                        width: 400,
                                                        height: 400,
                                                        className: "bio-img"
                                                    }, void 0, false, {
                                                        fileName: "[project]/libs/shared-ui/src/HomeClient.js",
                                                        lineNumber: 466,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "jsx-6401d811f994d514" + " " + "frame-border"
                                                    }, void 0, false, {
                                                        fileName: "[project]/libs/shared-ui/src/HomeClient.js",
                                                        lineNumber: 467,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/libs/shared-ui/src/HomeClient.js",
                                                lineNumber: 465,
                                                columnNumber: 17
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/libs/shared-ui/src/HomeClient.js",
                                            lineNumber: 464,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/libs/shared-ui/src/HomeClient.js",
                                        lineNumber: 463,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$libs$2f$shared$2d$ui$2f$src$2f$Effects$2f$ScrollReveal$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                        direction: "up",
                                        delay: 0.3,
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "jsx-6401d811f994d514" + " " + "bio-experience",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "jsx-6401d811f994d514" + " " + "exp-num",
                                                    children: "EST."
                                                }, void 0, false, {
                                                    fileName: "[project]/libs/shared-ui/src/HomeClient.js",
                                                    lineNumber: 473,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "jsx-6401d811f994d514" + " " + "exp-text",
                                                    children: "2025"
                                                }, void 0, false, {
                                                    fileName: "[project]/libs/shared-ui/src/HomeClient.js",
                                                    lineNumber: 474,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/libs/shared-ui/src/HomeClient.js",
                                            lineNumber: 472,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/libs/shared-ui/src/HomeClient.js",
                                        lineNumber: 471,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/libs/shared-ui/src/HomeClient.js",
                                lineNumber: 462,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "jsx-6401d811f994d514" + " " + "bio-text",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$libs$2f$shared$2d$ui$2f$src$2f$Effects$2f$ScrollReveal$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                    direction: "right",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "jsx-6401d811f994d514" + " " + "subtitle",
                                            children: "THE ARCHITECT"
                                        }, void 0, false, {
                                            fileName: "[project]/libs/shared-ui/src/HomeClient.js",
                                            lineNumber: 480,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                            className: "jsx-6401d811f994d514",
                                            children: settings.bioTitle
                                        }, void 0, false, {
                                            fileName: "[project]/libs/shared-ui/src/HomeClient.js",
                                            lineNumber: 481,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "jsx-6401d811f994d514" + " " + "highlight",
                                            children: settings.bioText1
                                        }, void 0, false, {
                                            fileName: "[project]/libs/shared-ui/src/HomeClient.js",
                                            lineNumber: 482,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "jsx-6401d811f994d514",
                                            children: settings.bioText2
                                        }, void 0, false, {
                                            fileName: "[project]/libs/shared-ui/src/HomeClient.js",
                                            lineNumber: 483,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "jsx-6401d811f994d514" + " " + "quote-box",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "jsx-6401d811f994d514" + " " + "quote-icon",
                                                    children: '"'
                                                }, void 0, false, {
                                                    fileName: "[project]/libs/shared-ui/src/HomeClient.js",
                                                    lineNumber: 485,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "jsx-6401d811f994d514",
                                                    children: settings.quote
                                                }, void 0, false, {
                                                    fileName: "[project]/libs/shared-ui/src/HomeClient.js",
                                                    lineNumber: 486,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/libs/shared-ui/src/HomeClient.js",
                                            lineNumber: 484,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/libs/shared-ui/src/HomeClient.js",
                                    lineNumber: 479,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/libs/shared-ui/src/HomeClient.js",
                                lineNumber: 478,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/libs/shared-ui/src/HomeClient.js",
                        lineNumber: 461,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/libs/shared-ui/src/HomeClient.js",
                lineNumber: 459,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                id: "products",
                className: "jsx-6401d811f994d514" + " " + "section product-section",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$libs$2f$shared$2d$ui$2f$src$2f$Effects$2f$ScrollReveal$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                        direction: "up",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                            className: "jsx-6401d811f994d514" + " " + "section-title",
                            children: "DIGITAL ASSETS"
                        }, void 0, false, {
                            fileName: "[project]/libs/shared-ui/src/HomeClient.js",
                            lineNumber: 496,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/libs/shared-ui/src/HomeClient.js",
                        lineNumber: 495,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "jsx-6401d811f994d514" + " " + "asset-grid",
                        children: settings.products.map((prod, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                href: prod.url,
                                target: "_blank",
                                rel: "noopener noreferrer",
                                className: "jsx-6401d811f994d514" + " " + "asset-link glass",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "jsx-6401d811f994d514" + " " + "asset-name",
                                        children: prod.name
                                    }, void 0, false, {
                                        fileName: "[project]/libs/shared-ui/src/HomeClient.js",
                                        lineNumber: 501,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "jsx-6401d811f994d514" + " " + "asset-arrow",
                                        children: "→"
                                    }, void 0, false, {
                                        fileName: "[project]/libs/shared-ui/src/HomeClient.js",
                                        lineNumber: 502,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, i, true, {
                                fileName: "[project]/libs/shared-ui/src/HomeClient.js",
                                lineNumber: 500,
                                columnNumber: 13
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/libs/shared-ui/src/HomeClient.js",
                        lineNumber: 498,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/libs/shared-ui/src/HomeClient.js",
                lineNumber: 494,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                className: "jsx-6401d811f994d514" + " " + "section success-signals",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$libs$2f$shared$2d$ui$2f$src$2f$Effects$2f$ScrollReveal$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                        direction: "up",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "jsx-6401d811f994d514" + " " + "section-header center",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "jsx-6401d811f994d514" + " " + "section-tag",
                                    children: "VALIDATION"
                                }, void 0, false, {
                                    fileName: "[project]/libs/shared-ui/src/HomeClient.js",
                                    lineNumber: 512,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                    className: "jsx-6401d811f994d514" + " " + "section-title",
                                    children: "SUCCESS SIGNALS"
                                }, void 0, false, {
                                    fileName: "[project]/libs/shared-ui/src/HomeClient.js",
                                    lineNumber: 513,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/libs/shared-ui/src/HomeClient.js",
                            lineNumber: 511,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/libs/shared-ui/src/HomeClient.js",
                        lineNumber: 510,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "jsx-6401d811f994d514" + " " + "signal-grid",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "jsx-6401d811f994d514" + " " + "signal-card glass",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "jsx-6401d811f994d514" + " " + "signal-quote",
                                        children: "\"Mr Build changed how I deploy. It's the infrastructure I didn't know I needed.\""
                                    }, void 0, false, {
                                        fileName: "[project]/libs/shared-ui/src/HomeClient.js",
                                        lineNumber: 518,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "jsx-6401d811f994d514" + " " + "signal-author",
                                        children: "— Verified Architect"
                                    }, void 0, false, {
                                        fileName: "[project]/libs/shared-ui/src/HomeClient.js",
                                        lineNumber: 519,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/libs/shared-ui/src/HomeClient.js",
                                lineNumber: 517,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "jsx-6401d811f994d514" + " " + "signal-card glass",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "jsx-6401d811f994d514" + " " + "signal-quote",
                                        children: '"The speed of Mr Search is unparalleled. Absolute digital sovereignty."'
                                    }, void 0, false, {
                                        fileName: "[project]/libs/shared-ui/src/HomeClient.js",
                                        lineNumber: 522,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "jsx-6401d811f994d514" + " " + "signal-author",
                                        children: "— Data Futurist"
                                    }, void 0, false, {
                                        fileName: "[project]/libs/shared-ui/src/HomeClient.js",
                                        lineNumber: 523,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/libs/shared-ui/src/HomeClient.js",
                                lineNumber: 521,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/libs/shared-ui/src/HomeClient.js",
                        lineNumber: 516,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/libs/shared-ui/src/HomeClient.js",
                lineNumber: 509,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                id: "community",
                className: "jsx-6401d811f994d514" + " " + "section community-hub-section",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "jsx-6401d811f994d514" + " " + "hub-container",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$libs$2f$shared$2d$ui$2f$src$2f$Effects$2f$ScrollReveal$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                            direction: "left",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "jsx-6401d811f994d514" + " " + "hub-info",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "jsx-6401d811f994d514" + " " + "section-tag",
                                        children: "JOIN THE FLEET"
                                    }, void 0, false, {
                                        fileName: "[project]/libs/shared-ui/src/HomeClient.js",
                                        lineNumber: 533,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                        className: "jsx-6401d811f994d514" + " " + "section-title",
                                        children: "THE NEXUS HUB"
                                    }, void 0, false, {
                                        fileName: "[project]/libs/shared-ui/src/HomeClient.js",
                                        lineNumber: 534,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "jsx-6401d811f994d514",
                                        children: "Connect with other digital architects, share your builds, and earn rewards for expanding the universe."
                                    }, void 0, false, {
                                        fileName: "[project]/libs/shared-ui/src/HomeClient.js",
                                        lineNumber: 535,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$libs$2f$shared$2d$ui$2f$src$2f$Effects$2f$MagneticWrapper$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                        strength: 0.05,
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "jsx-6401d811f994d514" + " " + "referral-teaser glass",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "jsx-6401d811f994d514" + " " + "teaser-icon",
                                                    children: "🎁"
                                                }, void 0, false, {
                                                    fileName: "[project]/libs/shared-ui/src/HomeClient.js",
                                                    lineNumber: 539,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "jsx-6401d811f994d514" + " " + "teaser-text",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                                            className: "jsx-6401d811f994d514",
                                                            children: "REFER & EARN"
                                                        }, void 0, false, {
                                                            fileName: "[project]/libs/shared-ui/src/HomeClient.js",
                                                            lineNumber: 541,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "jsx-6401d811f994d514",
                                                            children: "Invite a friend and get 1 month of PREMIUM-X for free."
                                                        }, void 0, false, {
                                                            fileName: "[project]/libs/shared-ui/src/HomeClient.js",
                                                            lineNumber: 542,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/libs/shared-ui/src/HomeClient.js",
                                                    lineNumber: 540,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/libs/shared-ui/src/HomeClient.js",
                                            lineNumber: 538,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/libs/shared-ui/src/HomeClient.js",
                                        lineNumber: 537,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/libs/shared-ui/src/HomeClient.js",
                                lineNumber: 532,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/libs/shared-ui/src/HomeClient.js",
                            lineNumber: 531,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "jsx-6401d811f994d514" + " " + "hub-links",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$libs$2f$shared$2d$ui$2f$src$2f$Effects$2f$ScrollReveal$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                    direction: "right",
                                    delay: 0.2,
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$libs$2f$shared$2d$ui$2f$src$2f$Effects$2f$MagneticWrapper$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                        strength: 0.1,
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                            href: "#",
                                            className: "jsx-6401d811f994d514" + " " + "hub-card discord shadow-hover no-underline",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "jsx-6401d811f994d514" + " " + "hub-icon",
                                                    children: "💬"
                                                }, void 0, false, {
                                                    fileName: "[project]/libs/shared-ui/src/HomeClient.js",
                                                    lineNumber: 553,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                    className: "jsx-6401d811f994d514",
                                                    children: "DISCORD COMMAND"
                                                }, void 0, false, {
                                                    fileName: "[project]/libs/shared-ui/src/HomeClient.js",
                                                    lineNumber: 554,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "jsx-6401d811f994d514",
                                                    children: "Official HQ for updates and support."
                                                }, void 0, false, {
                                                    fileName: "[project]/libs/shared-ui/src/HomeClient.js",
                                                    lineNumber: 555,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/libs/shared-ui/src/HomeClient.js",
                                            lineNumber: 552,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/libs/shared-ui/src/HomeClient.js",
                                        lineNumber: 551,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/libs/shared-ui/src/HomeClient.js",
                                    lineNumber: 550,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$libs$2f$shared$2d$ui$2f$src$2f$Effects$2f$ScrollReveal$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                    direction: "right",
                                    delay: 0.4,
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$libs$2f$shared$2d$ui$2f$src$2f$Effects$2f$MagneticWrapper$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                        strength: 0.1,
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                            href: "#",
                                            className: "jsx-6401d811f994d514" + " " + "hub-card x shadow-hover no-underline",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "jsx-6401d811f994d514" + " " + "hub-icon",
                                                    children: "𝕏"
                                                }, void 0, false, {
                                                    fileName: "[project]/libs/shared-ui/src/HomeClient.js",
                                                    lineNumber: 563,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                    className: "jsx-6401d811f994d514",
                                                    children: "NEXUS BROADCAST"
                                                }, void 0, false, {
                                                    fileName: "[project]/libs/shared-ui/src/HomeClient.js",
                                                    lineNumber: 564,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "jsx-6401d811f994d514",
                                                    children: "Follow the latest system signals."
                                                }, void 0, false, {
                                                    fileName: "[project]/libs/shared-ui/src/HomeClient.js",
                                                    lineNumber: 565,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/libs/shared-ui/src/HomeClient.js",
                                            lineNumber: 562,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/libs/shared-ui/src/HomeClient.js",
                                        lineNumber: 561,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/libs/shared-ui/src/HomeClient.js",
                                    lineNumber: 560,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/libs/shared-ui/src/HomeClient.js",
                            lineNumber: 549,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/libs/shared-ui/src/HomeClient.js",
                    lineNumber: 530,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/libs/shared-ui/src/HomeClient.js",
                lineNumber: 529,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                id: "contact",
                className: "jsx-6401d811f994d514" + " " + "section contact-section",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "jsx-6401d811f994d514" + " " + "footer-glow"
                    }, void 0, false, {
                        fileName: "[project]/libs/shared-ui/src/HomeClient.js",
                        lineNumber: 575,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$libs$2f$shared$2d$ui$2f$src$2f$Effects$2f$ScrollReveal$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                        direction: "up",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "jsx-6401d811f994d514" + " " + "section-header center",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "jsx-6401d811f994d514" + " " + "section-tag",
                                    children: "CONNECTION"
                                }, void 0, false, {
                                    fileName: "[project]/libs/shared-ui/src/HomeClient.js",
                                    lineNumber: 578,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                    className: "jsx-6401d811f994d514" + " " + "section-title",
                                    children: "SECURE PROTOCOL"
                                }, void 0, false, {
                                    fileName: "[project]/libs/shared-ui/src/HomeClient.js",
                                    lineNumber: 579,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "jsx-6401d811f994d514" + " " + "section-subtitle",
                                    children: "READY TO LAUNCH YOUR NEXT VISION?"
                                }, void 0, false, {
                                    fileName: "[project]/libs/shared-ui/src/HomeClient.js",
                                    lineNumber: 580,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/libs/shared-ui/src/HomeClient.js",
                            lineNumber: 577,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/libs/shared-ui/src/HomeClient.js",
                        lineNumber: 576,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                        href: `mailto:${settings.contactEmail}`,
                        className: "jsx-6401d811f994d514" + " " + "contact-link gradient-text",
                        children: settings.contactEmail
                    }, void 0, false, {
                        fileName: "[project]/libs/shared-ui/src/HomeClient.js",
                        lineNumber: 583,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "jsx-6401d811f994d514" + " " + "social-wrap",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                href: settings.tiktok,
                                target: "_blank",
                                className: "jsx-6401d811f994d514" + " " + "social-btn",
                                children: "TIKTOK"
                            }, void 0, false, {
                                fileName: "[project]/libs/shared-ui/src/HomeClient.js",
                                lineNumber: 586,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "jsx-6401d811f994d514" + " " + "dot"
                            }, void 0, false, {
                                fileName: "[project]/libs/shared-ui/src/HomeClient.js",
                                lineNumber: 587,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                href: settings.instagram,
                                target: "_blank",
                                className: "jsx-6401d811f994d514" + " " + "social-btn",
                                children: "INSTAGRAM"
                            }, void 0, false, {
                                fileName: "[project]/libs/shared-ui/src/HomeClient.js",
                                lineNumber: 588,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/libs/shared-ui/src/HomeClient.js",
                        lineNumber: 585,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/libs/shared-ui/src/HomeClient.js",
                lineNumber: 574,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$node_modules$2f$styled$2d$jsx$2f$style$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                id: "6401d811f994d514",
                children: '.glass.jsx-6401d811f994d514{-webkit-backdrop-filter:var(--refraction);border:1px solid var(--surface-border);box-shadow:var(--glass-shadow);transition:var(--transition-ultra);background:#ffffff04;position:relative;overflow:hidden}.glass.jsx-6401d811f994d514:after{content:"";background:linear-gradient(135deg,#0000,#ffffff0d,#0000);transition:transform .8s;position:absolute;inset:0;transform:translate(-100%)}.glass.jsx-6401d811f994d514:hover:after{transform:translate(100%)}.glass.jsx-6401d811f994d514:hover{background:#ffffff09;border-color:#00f0ff66;transform:translateY(-10px)scale(1.02);box-shadow:0 60px 120px -30px #000,0 0 40px #00f0ff26}.telemetry-bar.jsx-6401d811f994d514{z-index:10;-webkit-backdrop-filter:blur(20px);backdrop-filter:blur(20px);background:#00000080;border-bottom:1px solid #00f0ff1a;position:relative}.subtle-grid.jsx-6401d811f994d514{opacity:.3;pointer-events:none;position:absolute;inset:0}.hero.jsx-6401d811f994d514{background:#000;justify-content:center;align-items:center;min-height:100vh;display:flex;position:relative;overflow:hidden}.cta-banner-section.jsx-6401d811f994d514{padding:var(--section-padding)20px}.cta-banner.jsx-6401d811f994d514{border-radius:40px;justify-content:space-between;align-items:center;gap:40px;padding:80px;display:flex;position:relative;overflow:hidden}.cta-banner.jsx-6401d811f994d514:before{content:"";pointer-events:none;background:radial-gradient(circle at 100% 0,#00f0ff1a,#0000);position:absolute;inset:0}.cta-banner.pro.jsx-6401d811f994d514{background:linear-gradient(90deg,#ffd7001a,#0000);border-color:#ffd7004d;box-shadow:inset 0 0 100px #ffd7000d}.cta-tag.jsx-6401d811f994d514{color:gold;letter-spacing:5px;text-transform:uppercase;font-size:.7rem;font-weight:950}.cta-content.jsx-6401d811f994d514 h2.jsx-6401d811f994d514{margin:15px 0;font-family:Orbitron,sans-serif;font-size:max(2rem,min(5vw,3.5rem));font-weight:900}.cta-content.jsx-6401d811f994d514 p.jsx-6401d811f994d514{opacity:.6;max-width:500px;color:var(--text-dim);font-size:1.1rem;line-height:1.6}.pricing-grid.jsx-6401d811f994d514{grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:30px;margin-top:60px;display:grid}.price-card.jsx-6401d811f994d514{text-align:center;border-radius:30px;flex-direction:column;gap:30px;padding:60px 40px;display:flex;position:relative}.price-card.pro.jsx-6401d811f994d514{border-color:var(--primary);z-index:2;background:#00f0ff0a;transform:scale(1.05);box-shadow:0 0 50px #00f0ff1a}.price-card.jsx-6401d811f994d514 .badge.jsx-6401d811f994d514{background:var(--primary);color:#000;border-radius:20px;padding:6px 18px;font-size:.7rem;font-weight:900;position:absolute;top:-15px;left:50%;transform:translate(-50%);box-shadow:0 4px 15px #00f0ff4d}.price-header.jsx-6401d811f994d514 h3.jsx-6401d811f994d514{letter-spacing:2px;margin-bottom:20px;font-family:Orbitron,sans-serif;font-size:1.4rem}.amount.jsx-6401d811f994d514{font-family:Orbitron,sans-serif;font-size:3.5rem;font-weight:950}.amount.jsx-6401d811f994d514 span.jsx-6401d811f994d514{opacity:.4;font-family:Inter,sans-serif;font-size:1rem}.price-features.jsx-6401d811f994d514{text-align:left;padding:0;list-style:none}.price-features.jsx-6401d811f994d514 li.jsx-6401d811f994d514{color:var(--text-dim);align-items:center;gap:10px;margin-bottom:18px;font-size:.95rem;display:flex}.asset-grid.jsx-6401d811f994d514{gap:20px;margin-top:40px;display:grid}.asset-item.jsx-6401d811f994d514{border-radius:24px;justify-content:space-between;align-items:center;padding:30px 45px;display:flex}.asset-item.jsx-6401d811f994d514:hover{transform:translate(10px)}.asset-info.jsx-6401d811f994d514 h4.jsx-6401d811f994d514{margin-bottom:5px;font-family:Orbitron,sans-serif;font-size:1.3rem}.asset-info.jsx-6401d811f994d514 p.jsx-6401d811f994d514{color:var(--text-dim);font-size:.9rem}.asset-price.jsx-6401d811f994d514{color:var(--primary);font-family:Orbitron,sans-serif;font-size:1.5rem;font-weight:900}.signal-grid.jsx-6401d811f994d514{grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:30px;margin-top:50px;display:grid}.signal-card.jsx-6401d811f994d514{text-align:left;border:1px solid #00f0ff1a;border-radius:30px;padding:50px}.signal-quote.jsx-6401d811f994d514{color:var(--text-dim);margin-bottom:25px;font-size:1.15rem;font-style:italic;line-height:1.6}.signal-author.jsx-6401d811f994d514{letter-spacing:2px;color:var(--primary);text-transform:uppercase;font-family:Orbitron,sans-serif;font-size:.75rem;font-weight:950}.hub-container.jsx-6401d811f994d514{grid-template-columns:1.2fr .8fr;align-items:center;gap:80px;display:grid}.hub-info.jsx-6401d811f994d514 h2.jsx-6401d811f994d514{margin-bottom:30px;font-family:Orbitron,sans-serif;font-size:max(2.5rem,min(6vw,4rem));font-weight:900;line-height:1.1}.hub-info.jsx-6401d811f994d514 p.jsx-6401d811f994d514{color:var(--text-dim);margin-bottom:40px;font-size:1.2rem;line-height:1.7}.referral-teaser.jsx-6401d811f994d514{background:linear-gradient(135deg,#ffd7000d,#0000);border:1px solid #ffd7004d;border-radius:30px;align-items:center;gap:30px;padding:40px;display:flex}.teaser-icon.jsx-6401d811f994d514{font-size:3rem}.teaser-text.jsx-6401d811f994d514 h4.jsx-6401d811f994d514{color:gold;margin-bottom:8px;font-family:Orbitron,sans-serif;font-size:1.2rem;font-weight:950}.teaser-text.jsx-6401d811f994d514 p.jsx-6401d811f994d514{color:var(--text-dim);margin-bottom:0;font-size:.95rem}.hub-links.jsx-6401d811f994d514{gap:24px;display:grid}.hub-card.jsx-6401d811f994d514{border-radius:30px;padding:50px 40px}.hub-card.jsx-6401d811f994d514:hover{border-color:var(--primary);transform:translateY(-5px)}.discord.jsx-6401d811f994d514{background:#5865f20d}.hub-icon.jsx-6401d811f994d514{margin-bottom:25px;font-size:3rem;display:block}.hub-card.jsx-6401d811f994d514 h3.jsx-6401d811f994d514{margin-bottom:12px;font-family:Orbitron,sans-serif;font-size:1.3rem;font-weight:900}.logo-glow.jsx-6401d811f994d514{border-radius:40px;width:max(220px,min(30vw,450px));height:max(220px,min(30vw,450px));box-shadow:0 20px 80px #00f0ff26}.logo-pulse.jsx-6401d811f994d514{border-radius:60px;width:max(250px,min(35vw,500px));height:max(250px,min(35vw,500px))}.hero-title.jsx-6401d811f994d514{font-family:Orbitron,sans-serif;font-size:var(--text-fluid-h1);margin-bottom:15px;line-height:.9}.hero-subtitle.jsx-6401d811f994d514{color:var(--text-dim);letter-spacing:6px;font-size:1.2rem}@media (width<=1024px){.hub-container.jsx-6401d811f994d514{text-align:center;grid-template-columns:1fr;gap:60px}.hub-info.jsx-6401d811f994d514 p.jsx-6401d811f994d514{margin-left:auto;margin-right:auto}.referral-teaser.jsx-6401d811f994d514{justify-content:center}.cta-banner.jsx-6401d811f994d514{text-align:center;flex-direction:column;padding:60px 40px}.cta-content.jsx-6401d811f994d514 p.jsx-6401d811f994d514{margin:0 auto}}.hero-bg.jsx-6401d811f994d514{z-index:0;position:absolute;inset:0;overflow:hidden}.grid-overlay.jsx-6401d811f994d514{background-image:linear-gradient(#00f0ff0d 1px,#0000 1px),linear-gradient(90deg,#00f0ff0d 1px,#0000 1px);background-size:50px 50px;position:absolute;inset:0;-webkit-mask-image:radial-gradient(circle,#000,#0000 80%);mask-image:radial-gradient(circle,#000,#0000 80%)}.orb.jsx-6401d811f994d514{filter:blur(80px);opacity:.4;border-radius:50%;animation:20s infinite alternate orbFloat;position:absolute}.orb-1.jsx-6401d811f994d514{background:#00f0ff;width:400px;height:400px;top:-100px;right:-100px}.orb-2.jsx-6401d811f994d514{background:#0064e0;width:300px;height:300px;animation-delay:-5s;bottom:-50px;left:-50px}.orb-3.jsx-6401d811f994d514{background:#7000ff;width:250px;height:250px;animation-delay:-10s;top:40%;left:30%}@keyframes orbFloat{0%{transform:translate(0)scale(1)}to{transform:translate(50px,50px)scale(1.1)}}.hero-content.jsx-6401d811f994d514{z-index:2;text-align:center;transition:transform .2s cubic-bezier(.075,.82,.165,1);position:relative}.nebula-container.jsx-6401d811f994d514{pointer-events:none;position:absolute;inset:0;overflow:hidden}.nebula.jsx-6401d811f994d514{filter:blur(120px);opacity:.3;border-radius:50%;animation:25s infinite alternate nebulaMove;position:absolute}.nebula-1.jsx-6401d811f994d514{background:radial-gradient(circle,#00f0ff,#0000);width:600px;height:600px;top:-10%;left:-10%}.nebula-2.jsx-6401d811f994d514{background:radial-gradient(circle,#7000ff,#0000);width:500px;height:500px;animation-delay:-5s;bottom:-10%;right:-10%}.nebula-3.jsx-6401d811f994d514{background:radial-gradient(circle,#ff00c8,#0000);width:400px;height:400px;animation-delay:-10s;top:30%;left:40%}@keyframes nebulaMove{0%{transform:translate(0)scale(1)}to{transform:translate(100px,100px)scale(1.2)}}.logo-container.jsx-6401d811f994d514{justify-content:center;align-items:center;width:100%;display:flex;position:relative}.logo-glow.jsx-6401d811f994d514{border-radius:30px;justify-content:center;align-items:center;width:max(180px,min(25vw,400px));height:max(180px,min(25vw,400px));margin:0 auto;display:flex;position:relative;overflow:hidden}.logo.jsx-6401d811f994d514{object-fit:contain;width:100%;height:100%;display:block}.logo-pulse.jsx-6401d811f994d514{border:1px solid #00f0ff33;border-radius:50px;width:max(200px,min(28vw,450px));height:max(200px,min(28vw,450px));animation:10s linear infinite pulseRotate;position:absolute;top:50%;left:50%;transform:translate(-50%,-50%)}@keyframes pulseRotate{0%{transform:translate(-50%,-50%)rotate(0)}to{transform:translate(-50%,-50%)rotate(360deg)}}.hero-title.jsx-6401d811f994d514{font-size:var(--text-fluid-h1);letter-spacing:-3px;margin-bottom:10px;font-weight:950}.gradient-text.jsx-6401d811f994d514{-webkit-text-fill-color:transparent;background:linear-gradient(90deg,#fff,#00f0ff,#fff) 0 0/200%;-webkit-background-clip:text;animation:4s linear infinite shimmer}.hero-subtitle.jsx-6401d811f994d514{color:#fff9;letter-spacing:4px;text-transform:uppercase;margin-bottom:40px;font-size:1.2rem}.hero-buttons.jsx-6401d811f994d514{justify-content:center;gap:20px;display:flex}.btn-premium.jsx-6401d811f994d514{color:#000;letter-spacing:2px;background:#fff;border-radius:4px;padding:16px 40px;font-size:.9rem;font-weight:900;text-decoration:none;transition:all .3s;position:relative;overflow:hidden}.btn-premium.jsx-6401d811f994d514:hover{letter-spacing:3px;transform:translateY(-3px)}.btn-glow.jsx-6401d811f994d514{background:linear-gradient(90deg,#0000,#ffffff80,#0000);transition:transform .6s;position:absolute;inset:0;transform:translate(-100%)}.btn-premium.jsx-6401d811f994d514:hover .btn-glow.jsx-6401d811f994d514{transform:translate(100%)}.btn-outline.jsx-6401d811f994d514{color:#fff;letter-spacing:2px;border:1px solid #fff3;border-radius:4px;padding:16px 40px;font-weight:700;text-decoration:none;transition:all .3s}.btn-outline.jsx-6401d811f994d514:hover{color:#000;background:#fff}.scroll-indicator.jsx-6401d811f994d514{color:#fff6;letter-spacing:3px;flex-direction:column;align-items:center;gap:15px;font-size:.7rem;display:flex;position:absolute;bottom:40px}.mouse.jsx-6401d811f994d514{border:2px solid #fff3;border-radius:12px;width:24px;height:40px;position:relative}.wheel.jsx-6401d811f994d514{background:#00f0ff;border-radius:2px;width:4px;height:8px;animation:1.5s infinite wheelScroll;position:absolute;top:6px;left:50%;transform:translate(-50%)}@keyframes wheelScroll{0%{opacity:1;transform:translate(-50%)}to{opacity:0;transform:translate(-50%,15px)}}.section.jsx-6401d811f994d514{padding:var(--spacing-fluid)40px;max-width:1400px;margin:0 auto}.section-header.jsx-6401d811f994d514{text-align:left;margin-bottom:80px;position:relative}.section-tag.jsx-6401d811f994d514{color:#00f0ff;letter-spacing:5px;margin-bottom:15px;font-size:.75rem;font-weight:900;display:block}.section-title.jsx-6401d811f994d514{font-size:var(--text-fluid-h2);letter-spacing:-1px;font-weight:900;display:inline-block;position:relative}.section-title.jsx-6401d811f994d514:after{content:"";background:#00f0ff;width:0;height:2px;transition:width 1.5s cubic-bezier(.16,1,.3,1);position:absolute;bottom:-10px;left:0;box-shadow:0 0 15px #00f0ff}.section.jsx-6401d811f994d514:hover .section-title.jsx-6401d811f994d514:after{width:100%}.section-header.jsx-6401d811f994d514 .section-line.jsx-6401d811f994d514{background:#00f0ff;width:100px;height:4px;margin-top:20px;display:none;box-shadow:0 0 20px #00f0ff}.project-grid.jsx-6401d811f994d514{grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:30px;display:grid}.project-card.jsx-6401d811f994d514{text-align:left;background:#ffffff05;border:1px solid #00f0ff0d;border-radius:30px;padding:50px;transition:all .5s cubic-bezier(.165,.84,.44,1);position:relative;overflow:hidden}.project-card.jsx-6401d811f994d514:hover{background:#ffffff0d;border-color:#00f0ff66;transform:translateY(-15px)scale(1.02);box-shadow:0 40px 80px #0009,0 0 20px #00f0ff1a}.project-card.jsx-6401d811f994d514:before{content:"";background:radial-gradient(circle at var(--mouse-x,50%)var(--mouse-y,50%),#00f0ff1a,transparent 80%);opacity:0;transition:opacity .3s;position:absolute;inset:0}.project-card.jsx-6401d811f994d514:hover:before{opacity:1}.card-top.jsx-6401d811f994d514{justify-content:space-between;align-items:flex-start;margin-bottom:30px;display:flex}.card-icon-wrapper.jsx-6401d811f994d514{position:relative}.card-icon.jsx-6401d811f994d514{z-index:2;font-size:3rem;position:relative}.icon-glow.jsx-6401d811f994d514{filter:blur(20px);opacity:.2;background:#00f0ff;border-radius:50%;position:absolute;inset:0}.project-card.jsx-6401d811f994d514 h3.jsx-6401d811f994d514{margin-bottom:15px;font-size:1.8rem;font-weight:800}.project-card.jsx-6401d811f994d514 p.jsx-6401d811f994d514{color:#fff9;margin-bottom:30px;line-height:1.8}.card-footer.jsx-6401d811f994d514{letter-spacing:2px;color:#00f0ff;font-size:.7rem;font-weight:900}.stats-section.jsx-6401d811f994d514{border-y:1px solid #ffffff0d;background:#050505;padding:100px 0}.stats-container.jsx-6401d811f994d514{flex-wrap:wrap;justify-content:space-around;gap:40px;max-width:1200px;margin:0 auto;display:flex}.stat-circle.jsx-6401d811f994d514{background:radial-gradient(circle,#00f0ff0d 0%,#0000 70%);border:1px solid #00f0ff1a;border-radius:50%;flex-direction:column;justify-content:center;align-items:center;width:200px;height:200px;transition:all .4s;display:flex}.stat-circle.jsx-6401d811f994d514:hover{border-color:#00f0ff;transform:scale(1.05);box-shadow:0 0 40px #00f0ff33}.stat-number.jsx-6401d811f994d514{color:#fff;font-size:3rem;font-weight:900}.stat-label.jsx-6401d811f994d514{letter-spacing:3px;color:#fff6;text-transform:uppercase;font-size:.7rem}.bio-section.jsx-6401d811f994d514{position:relative;overflow:hidden}.bio-container.jsx-6401d811f994d514{grid-template-columns:1fr 1.2fr;align-items:center;gap:80px;display:grid}.bio-visual.jsx-6401d811f994d514{position:relative}.bio-image-frame.jsx-6401d811f994d514{z-index:2;border-radius:40px;position:relative;overflow:hidden}.frame-border.jsx-6401d811f994d514{opacity:.3;border:1px solid #00f0ff;border-radius:30px;position:absolute;inset:20px}.bio-img.jsx-6401d811f994d514{width:100%;height:auto;display:block}.bio-experience.jsx-6401d811f994d514{color:#000;z-index:3;background:#00f0ff;border-radius:30px;flex-direction:column;padding:30px;font-weight:900;display:flex;position:absolute;bottom:-30px;right:-30px}.bio-text.jsx-6401d811f994d514 h2.jsx-6401d811f994d514{margin-bottom:30px;font-size:3.5rem;font-weight:900}.highlight.jsx-6401d811f994d514{color:#00f0ff;margin-bottom:25px;font-size:1.4rem;font-weight:600}.bio-text.jsx-6401d811f994d514 p.jsx-6401d811f994d514{color:#fff9;margin-bottom:25px;line-height:2}.quote-box.jsx-6401d811f994d514{background:#ffffff08;border-left:5px solid #00f0ff;border-radius:20px;padding:40px;position:relative}.quote-icon.jsx-6401d811f994d514{opacity:.1;color:#00f0ff;font-size:4rem;position:absolute;top:10px;left:20px}.asset-grid.jsx-6401d811f994d514{grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:20px;margin-top:50px;display:grid}.asset-link.jsx-6401d811f994d514{color:#fff;border-radius:15px;justify-content:space-between;align-items:center;padding:30px;font-size:1.2rem;font-weight:800;text-decoration:none;transition:all .3s;display:flex}.asset-link.jsx-6401d811f994d514:hover{color:#000;background:#fff;transform:translate(10px)}.contact-section.jsx-6401d811f994d514{text-align:center;background:#000}.contact-link.jsx-6401d811f994d514{margin:40px 0;font-size:max(2rem,min(8vw,5rem));font-weight:950;text-decoration:none;transition:transform .3s;display:block}.contact-link.jsx-6401d811f994d514:hover{transform:scale(1.05)}.social-wrap.jsx-6401d811f994d514{justify-content:center;align-items:center;gap:30px;display:flex}.social-btn.jsx-6401d811f994d514{letter-spacing:4px;color:#fff6;font-size:.9rem;font-weight:900;text-decoration:none;transition:all .3s}.social-btn.jsx-6401d811f994d514:hover{color:#00f0ff}.dot.jsx-6401d811f994d514{opacity:.4;background:#00f0ff;border-radius:50%;width:6px;height:6px}@media (width<=1024px){.bio-container.jsx-6401d811f994d514{grid-template-columns:1fr;gap:50px}.bio-text.jsx-6401d811f994d514{text-align:center;order:1}.bio-visual.jsx-6401d811f994d514{order:2;max-width:500px;margin:0 auto}.quote-box.jsx-6401d811f994d514{text-align:left}}@media (width<=768px){.section.jsx-6401d811f994d514{padding:80px 20px}.section-title.jsx-6401d811f994d514{font-size:2rem}.section-header.jsx-6401d811f994d514{margin-bottom:40px}.hero-title.jsx-6401d811f994d514{letter-spacing:-1px;font-size:2.5rem}.hero-subtitle.jsx-6401d811f994d514{letter-spacing:2px;margin-bottom:30px;font-size:.9rem}.project-grid.jsx-6401d811f994d514{grid-template-columns:1fr;gap:20px}.project-card.jsx-6401d811f994d514{border-radius:20px;padding:30px}.project-card.jsx-6401d811f994d514 h3.jsx-6401d811f994d514{font-size:1.4rem}.hero-buttons.jsx-6401d811f994d514{flex-direction:column;gap:15px}.btn-premium.jsx-6401d811f994d514,.btn-outline.jsx-6401d811f994d514{text-align:center;width:100%;padding:14px 30px}.stat-circle.jsx-6401d811f994d514{width:130px;height:130px}.stat-number.jsx-6401d811f994d514{font-size:1.8rem}.stat-label.jsx-6401d811f994d514{letter-spacing:2px;font-size:.6rem}.stats-section.jsx-6401d811f994d514{padding:60px 20px}.stats-container.jsx-6401d811f994d514{gap:20px}.logo-glow.jsx-6401d811f994d514{width:max(200px,min(40vw,300px));height:max(200px,min(40vw,300px))}.logo-pulse.jsx-6401d811f994d514{width:max(230px,min(45vw,350px));height:max(230px,min(45vw,350px))}.bio-container.jsx-6401d811f994d514{gap:40px}.bio-text.jsx-6401d811f994d514 h2.jsx-6401d811f994d514{font-size:2.5rem}.highlight.jsx-6401d811f994d514{font-size:1.1rem}.bio-experience.jsx-6401d811f994d514{border-radius:20px;padding:20px;bottom:-20px;right:-10px}.quote-box.jsx-6401d811f994d514{padding:25px}.quote-icon.jsx-6401d811f994d514{font-size:3rem}.contact-link.jsx-6401d811f994d514{word-break:break-all;font-size:max(1.5rem,min(6vw,3rem))}.social-wrap.jsx-6401d811f994d514{flex-direction:column;gap:15px}.asset-grid.jsx-6401d811f994d514{grid-template-columns:1fr}.asset-link.jsx-6401d811f994d514{padding:20px;font-size:1rem}}@media (width<=480px){.section.jsx-6401d811f994d514{padding:60px 15px}.section-title.jsx-6401d811f994d514{font-size:1.6rem}.hero-title.jsx-6401d811f994d514{font-size:2rem}.hero-subtitle.jsx-6401d811f994d514{letter-spacing:1px;font-size:.75rem}.logo-glow.jsx-6401d811f994d514{width:max(160px,min(50vw,220px));height:max(160px,min(50vw,220px))}.logo-pulse.jsx-6401d811f994d514{width:max(190px,min(55vw,250px));height:max(190px,min(55vw,250px))}.logo-container.jsx-6401d811f994d514{margin-bottom:30px}.project-card.jsx-6401d811f994d514{padding:25px}.project-card.jsx-6401d811f994d514 h3.jsx-6401d811f994d514{font-size:1.2rem}.project-card.jsx-6401d811f994d514 p.jsx-6401d811f994d514{font-size:.9rem;line-height:1.6}.card-icon.jsx-6401d811f994d514{font-size:2.5rem}.stat-circle.jsx-6401d811f994d514{width:100px;height:100px}.stat-number.jsx-6401d811f994d514{font-size:1.4rem}.stat-label.jsx-6401d811f994d514{font-size:.5rem}.bio-text.jsx-6401d811f994d514 h2.jsx-6401d811f994d514{font-size:2rem}.bio-experience.jsx-6401d811f994d514{align-self:center;margin-top:20px;position:relative;bottom:auto;right:auto}.bio-visual.jsx-6401d811f994d514{flex-direction:column;align-items:center;display:flex}.scroll-indicator.jsx-6401d811f994d514{display:none}}'
            }, void 0, false, void 0, this)
        ]
    }, void 0, true);
}
}),
];

//# sourceMappingURL=libs_shared-ui_src_26409814._.js.map