(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/libs/shared-ui/src/ReactBits/CardNav.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$node_modules$2f$styled$2d$jsx$2f$style$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/node_modules/styled-jsx/style.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/gsap/index.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$go$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-icons/go/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/image.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
/* eslint-disable react-hooks/set-state-in-effect */ 'use client';
;
;
;
;
;
;
;
const CardNav = ({ logo = '/assets/logo.jpg', logoAlt = 'Anas Nidir Logo', items, className = '', ease = 'power3.out', baseColor = '#0a0a0a', menuColor = '#ffffff', buttonBgColor = '#00f0ff', buttonTextColor = '#000000' })=>{
    _s();
    // State for menu
    const [isHamburgerOpen, setIsHamburgerOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isExpanded, setIsExpanded] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const navRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const cardsRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])([]);
    const tlRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const pathname = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"])();
    const lastPath = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(pathname);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "CardNav.useEffect": ()=>{
            // Initial State
            if (navRef.current) {
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"].set(navRef.current, {
                    height: 70,
                    overflow: 'hidden'
                });
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"].set(cardsRef.current, {
                    y: 50,
                    opacity: 0
                });
            }
        }
    }["CardNav.useEffect"], []);
    const toggleMenu = (e)=>{
        if (e) e.stopPropagation();
        const navEl = navRef.current;
        if (!navEl) return;
        console.log("[CardNav] toggleMenu called. Current isExpanded:", isExpanded);
        if (!isExpanded) {
            // OPEN
            setIsHamburgerOpen(true);
            setIsExpanded(true);
            const targetHeight = "auto"; // Let GSAP handle auto height
            console.log("[CardNav] Opening to height:", targetHeight);
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"].killTweensOf(navEl);
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"].to(navEl, {
                height: targetHeight,
                duration: 0.5,
                ease: ease
            });
            const validCards = cardsRef.current.filter(Boolean);
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"].killTweensOf(validCards);
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"].to(validCards, {
                y: 0,
                opacity: 1,
                duration: 0.4,
                ease: ease,
                stagger: 0.1,
                delay: 0.1
            });
        } else {
            // CLOSE
            setIsHamburgerOpen(false);
            console.log("[CardNav] Closing menu");
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"].killTweensOf(navEl);
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"].to(navEl, {
                height: 70,
                duration: 0.5,
                ease: ease,
                onComplete: ()=>{
                    setIsExpanded(false);
                    console.log("[CardNav] Close animation complete");
                }
            });
            const validCards = cardsRef.current.filter(Boolean);
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"].killTweensOf(validCards);
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"].to(validCards, {
                y: 50,
                opacity: 0,
                duration: 0.3,
                ease: ease
            });
        }
    };
    // Close menu when route changes
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "CardNav.useEffect": ()=>{
            if (lastPath.current !== pathname) {
                lastPath.current = pathname;
                setIsExpanded(false);
                setIsHamburgerOpen(false);
                if (navRef.current) {
                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"].killTweensOf(navRef.current);
                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"].killTweensOf(cardsRef.current);
                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"].to(navRef.current, {
                        height: 70,
                        duration: 0.3,
                        ease: ease
                    });
                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"].to(cardsRef.current, {
                        y: 50,
                        opacity: 0,
                        duration: 0.2,
                        ease: ease
                    });
                }
            }
        }
    }["CardNav.useEffect"], [
        pathname,
        ease
    ]);
    // Close on click outside
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "CardNav.useEffect": ()=>{
            const handleClickOutside = {
                "CardNav.useEffect.handleClickOutside": (event)=>{
                    if (isExpanded && navRef.current && !navRef.current.contains(event.target)) {
                        console.log("[CardNav] Click outside detected - closing");
                        // Close logic
                        setIsExpanded(false);
                        setIsHamburgerOpen(false);
                        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"].killTweensOf(navRef.current);
                        const validCards = cardsRef.current.filter(Boolean);
                        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"].killTweensOf(validCards);
                        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"].to(navRef.current, {
                            height: 70,
                            duration: 0.5,
                            ease: ease
                        });
                        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"].to(validCards, {
                            y: 50,
                            opacity: 0,
                            duration: 0.3,
                            ease: ease
                        });
                    }
                }
            }["CardNav.useEffect.handleClickOutside"];
            document.addEventListener('mousedown', handleClickOutside);
            return ({
                "CardNav.useEffect": ()=>{
                    document.removeEventListener('mousedown', handleClickOutside);
                }
            })["CardNav.useEffect"];
        }
    }["CardNav.useEffect"], [
        isExpanded,
        ease
    ]);
    const setCardRef = (i)=>(el)=>{
            if (el) cardsRef.current[i] = el;
        };
    // Hide on user sites, admin pages, SavoirPedia, or Creovate
    if (pathname?.startsWith('/s/') || pathname?.startsWith('/admin') || pathname?.startsWith('/savoirpedia') || pathname?.startsWith('/creovate')) return null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "jsx-7fa54d09b6ed73de" + " " + `card-nav-container ${className}`,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
                ref: navRef,
                style: {
                    backgroundColor: baseColor
                },
                className: "jsx-7fa54d09b6ed73de" + " " + `card-nav ${isExpanded ? 'open' : ''}`,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "jsx-7fa54d09b6ed73de" + " " + "card-nav-top",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                onClick: (e)=>toggleMenu(e),
                                role: "button",
                                "aria-label": isExpanded ? 'Close menu' : 'Open menu',
                                tabIndex: 0,
                                style: {
                                    color: menuColor
                                },
                                className: "jsx-7fa54d09b6ed73de" + " " + `hamburger-menu ${isHamburgerOpen ? 'open' : ''}`,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "jsx-7fa54d09b6ed73de" + " " + "hamburger-line"
                                    }, void 0, false, {
                                        fileName: "[project]/libs/shared-ui/src/ReactBits/CardNav.js",
                                        lineNumber: 156,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "jsx-7fa54d09b6ed73de" + " " + "hamburger-line"
                                    }, void 0, false, {
                                        fileName: "[project]/libs/shared-ui/src/ReactBits/CardNav.js",
                                        lineNumber: 157,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/libs/shared-ui/src/ReactBits/CardNav.js",
                                lineNumber: 148,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "jsx-7fa54d09b6ed73de" + " " + "logo-container",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                        src: logo,
                                        alt: logoAlt,
                                        width: 48,
                                        height: 48,
                                        className: "logo",
                                        priority: true
                                    }, void 0, false, {
                                        fileName: "[project]/libs/shared-ui/src/ReactBits/CardNav.js",
                                        lineNumber: 161,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "jsx-7fa54d09b6ed73de" + " " + "logo-text",
                                        children: "ANAS NIDIR"
                                    }, void 0, false, {
                                        fileName: "[project]/libs/shared-ui/src/ReactBits/CardNav.js",
                                        lineNumber: 162,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/libs/shared-ui/src/ReactBits/CardNav.js",
                                lineNumber: 160,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                href: "#contact",
                                className: "card-nav-cta-button",
                                style: {
                                    backgroundColor: buttonBgColor,
                                    color: buttonTextColor
                                },
                                children: "Let's Talk"
                            }, void 0, false, {
                                fileName: "[project]/libs/shared-ui/src/ReactBits/CardNav.js",
                                lineNumber: 165,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/libs/shared-ui/src/ReactBits/CardNav.js",
                        lineNumber: 147,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        "aria-hidden": !isExpanded,
                        className: "jsx-7fa54d09b6ed73de" + " " + "card-nav-content",
                        children: (items || []).slice(0, 3).map((item, idx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                ref: setCardRef(idx),
                                style: {
                                    backgroundColor: item.bgColor,
                                    color: item.textColor
                                },
                                className: "jsx-7fa54d09b6ed73de" + " " + "nav-card",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "jsx-7fa54d09b6ed73de" + " " + "nav-card-label",
                                        children: item.label
                                    }, void 0, false, {
                                        fileName: "[project]/libs/shared-ui/src/ReactBits/CardNav.js",
                                        lineNumber: 182,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "jsx-7fa54d09b6ed73de" + " " + "nav-card-links",
                                        children: item.links?.map((lnk, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                className: "nav-card-link",
                                                href: lnk.href,
                                                "aria-label": lnk.ariaLabel,
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$go$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GoArrowUpRight"], {
                                                        className: "nav-card-link-icon",
                                                        "aria-hidden": "true"
                                                    }, void 0, false, {
                                                        fileName: "[project]/libs/shared-ui/src/ReactBits/CardNav.js",
                                                        lineNumber: 186,
                                                        columnNumber: 21
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    lnk.label
                                                ]
                                            }, `${lnk.label}-${i}`, true, {
                                                fileName: "[project]/libs/shared-ui/src/ReactBits/CardNav.js",
                                                lineNumber: 185,
                                                columnNumber: 19
                                            }, ("TURBOPACK compile-time value", void 0)))
                                    }, void 0, false, {
                                        fileName: "[project]/libs/shared-ui/src/ReactBits/CardNav.js",
                                        lineNumber: 183,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, `${item.label}-${idx}`, true, {
                                fileName: "[project]/libs/shared-ui/src/ReactBits/CardNav.js",
                                lineNumber: 176,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0)))
                    }, void 0, false, {
                        fileName: "[project]/libs/shared-ui/src/ReactBits/CardNav.js",
                        lineNumber: 174,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/libs/shared-ui/src/ReactBits/CardNav.js",
                lineNumber: 146,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$node_modules$2f$styled$2d$jsx$2f$style$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                id: "7fa54d09b6ed73de",
                children: '.card-nav-container.jsx-7fa54d09b6ed73de{top:calc(20px + env(safe-area-inset-top));z-index:999999;width:90%;max-width:800px;position:fixed;left:50%;transform:translate(-50%)}.card-nav.jsx-7fa54d09b6ed73de{border:1px solid #ffffff1a;border-radius:40px;overflow:hidden;box-shadow:0 10px 40px #00000080}.card-nav-top.jsx-7fa54d09b6ed73de{justify-content:space-between;align-items:center;height:70px;padding:0 20px;display:flex}.hamburger-menu.jsx-7fa54d09b6ed73de{cursor:pointer;border-radius:50%;flex-direction:column;justify-content:center;align-items:center;gap:6px;width:40px;height:40px;transition:background .3s;display:flex}.hamburger-menu.jsx-7fa54d09b6ed73de:hover{background:#ffffff0d}.hamburger-line.jsx-7fa54d09b6ed73de{background-color:currentColor;width:20px;height:2px;transition:all .3s cubic-bezier(.4,0,.2,1)}.hamburger-menu.open.jsx-7fa54d09b6ed73de .hamburger-line.jsx-7fa54d09b6ed73de:first-child{transform:translateY(4px)rotate(45deg)}.hamburger-menu.open.jsx-7fa54d09b6ed73de .hamburger-line.jsx-7fa54d09b6ed73de:last-child{transform:translateY(-4px)rotate(-45deg)}.logo-container.jsx-7fa54d09b6ed73de{align-items:center;gap:12px;display:flex}.logo.jsx-7fa54d09b6ed73de{object-fit:cover;border-radius:12px;width:48px;height:48px}.logo-text.jsx-7fa54d09b6ed73de{letter-spacing:.1em;color:#fff;font-size:max(.9rem,min(1.2vw,1.25rem));font-weight:800}.card-nav-cta-button.jsx-7fa54d09b6ed73de{transition:var(--transition-smooth);text-transform:uppercase;letter-spacing:.1em;border-radius:30px;padding:10px max(15px,min(2vw,24px));font-size:max(.75rem,min(.9vw,.9rem));font-weight:700;text-decoration:none}.card-nav-cta-button.jsx-7fa54d09b6ed73de:focus-visible{outline-offset:4px;outline:2px solid #fff}.card-nav-cta-button.jsx-7fa54d09b6ed73de:hover{opacity:1;transform:scale(1.05);box-shadow:0 0 20px #00f0ff66}.card-nav-content.jsx-7fa54d09b6ed73de{grid-template-columns:repeat(3,1fr);gap:12px;padding:12px 12px 24px;display:grid}.nav-card.jsx-7fa54d09b6ed73de{min-height:max(180px,min(15vw,240px));transition:var(--transition-ultra);border:1px solid #ffffff0d;border-radius:20px;flex-direction:column;justify-content:space-between;padding:max(16px,min(2.5vw,32px));display:flex;position:relative;overflow:hidden}.nav-card.jsx-7fa54d09b6ed73de:focus-visible{outline:3px solid var(--primary);outline-offset:4px}.nav-card.jsx-7fa54d09b6ed73de:after{content:"";background:linear-gradient(135deg,#0000,#ffffff08,#0000);transition:transform .6s;position:absolute;inset:0;transform:translate(-100%)}.nav-card.jsx-7fa54d09b6ed73de:hover{border-color:#fff3;transform:translateY(-8px);box-shadow:0 20px 40px #00000080}.nav-card.jsx-7fa54d09b6ed73de:hover:after{transform:translate(100%)}.nav-card-label.jsx-7fa54d09b6ed73de{text-transform:uppercase;letter-spacing:.2em;opacity:.6;font-size:.75rem;font-weight:800}.nav-card-links.jsx-7fa54d09b6ed73de{flex-direction:column;gap:max(8px,min(1vw,14px));display:flex}.nav-card-link.jsx-7fa54d09b6ed73de{color:inherit;opacity:.85;transition:var(--transition-smooth);align-items:center;gap:10px;font-size:max(.95rem,min(1.1vw,1.25rem));font-weight:700;text-decoration:none;display:flex}.nav-card-link.jsx-7fa54d09b6ed73de:focus-visible{opacity:1;text-decoration:underline}.nav-card-link.jsx-7fa54d09b6ed73de:hover{opacity:1;transform:translate(5px)}.nav-card-link-icon.jsx-7fa54d09b6ed73de{transition:transform .4s var(--ease-out-expo);font-size:.9em;transform:rotate(45deg)}.nav-card-link.jsx-7fa54d09b6ed73de:hover .nav-card-link-icon.jsx-7fa54d09b6ed73de{transform:rotate(0)}@media (width<=768px){.card-nav-container.jsx-7fa54d09b6ed73de{width:94%;top:15px}.card-nav-content.jsx-7fa54d09b6ed73de{grid-template-columns:1fr;gap:8px}.nav-card.jsx-7fa54d09b6ed73de{min-height:100px;padding:16px}.logo-text.jsx-7fa54d09b6ed73de{display:none}}@media (width>=1920px){.card-nav-container.jsx-7fa54d09b6ed73de{max-width:1200px;top:40px}.card-nav-top.jsx-7fa54d09b6ed73de{height:90px;padding:0 30px}.logo.jsx-7fa54d09b6ed73de{width:64px;height:64px}}'
            }, void 0, false, void 0, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/libs/shared-ui/src/ReactBits/CardNav.js",
        lineNumber: 145,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_s(CardNav, "Q3CafkKX4BLOCabQvBnrG9mbJ3k=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"]
    ];
});
_c = CardNav;
const __TURBOPACK__default__export__ = CardNav;
var _c;
__turbopack_context__.k.register(_c, "CardNav");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/libs/shared-ui/src/Footer.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Footer
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$node_modules$2f$styled$2d$jsx$2f$style$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/node_modules/styled-jsx/style.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
function Footer() {
    _s();
    const pathname = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"])();
    if (pathname?.startsWith('/s/')) return null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("footer", {
        className: "jsx-8d6ab9db8282d7e" + " " + "footer",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "jsx-8d6ab9db8282d7e",
                children: [
                    "© ",
                    new Date().getFullYear(),
                    " MR ANAS NIDIR. All rights reserved."
                ]
            }, void 0, true, {
                fileName: "[project]/libs/shared-ui/src/Footer.js",
                lineNumber: 10,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "jsx-8d6ab9db8282d7e" + " " + "socials",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                        href: "https://tiktok.com/@anasnide",
                        target: "_blank",
                        rel: "noopener noreferrer",
                        className: "jsx-8d6ab9db8282d7e",
                        children: "TikTok"
                    }, void 0, false, {
                        fileName: "[project]/libs/shared-ui/src/Footer.js",
                        lineNumber: 12,
                        columnNumber: 9
                    }, this),
                    " |",
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                        href: "https://www.instagram.com/anasnide",
                        target: "_blank",
                        rel: "noopener noreferrer",
                        className: "jsx-8d6ab9db8282d7e",
                        children: "Instagram"
                    }, void 0, false, {
                        fileName: "[project]/libs/shared-ui/src/Footer.js",
                        lineNumber: 13,
                        columnNumber: 9
                    }, this),
                    " |",
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                        href: "/pages/support.html",
                        className: "jsx-8d6ab9db8282d7e",
                        children: "Support"
                    }, void 0, false, {
                        fileName: "[project]/libs/shared-ui/src/Footer.js",
                        lineNumber: 14,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/libs/shared-ui/src/Footer.js",
                lineNumber: 11,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$node_modules$2f$styled$2d$jsx$2f$style$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                id: "8d6ab9db8282d7e",
                children: ".footer.jsx-8d6ab9db8282d7e{text-align:center;color:#aaa;background:#000;margin-top:auto;padding:24px}.socials.jsx-8d6ab9db8282d7e a.jsx-8d6ab9db8282d7e{color:#00f0ff;margin:0 8px;text-decoration:none}"
            }, void 0, false, void 0, this)
        ]
    }, void 0, true, {
        fileName: "[project]/libs/shared-ui/src/Footer.js",
        lineNumber: 9,
        columnNumber: 5
    }, this);
}
_s(Footer, "xbyQPtUVMO7MNj7WjJlpdWqRcTo=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"]
    ];
});
_c = Footer;
var _c;
__turbopack_context__.k.register(_c, "Footer");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/libs/core/src/firebase.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "auth",
    ()=>auth,
    "db",
    ()=>db,
    "storage",
    ()=>storage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$firebase$2f$app$2f$dist$2f$esm$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/firebase/app/dist/esm/index.esm.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$app$2f$dist$2f$esm$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@firebase/app/dist/esm/index.esm.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$firebase$2f$firestore$2f$dist$2f$esm$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/firebase/firestore/dist/esm/index.esm.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@firebase/firestore/dist/index.esm.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$firebase$2f$auth$2f$dist$2f$esm$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/firebase/auth/dist/esm/index.esm.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$auth$2f$dist$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@firebase/auth/dist/esm/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$firebase$2f$storage$2f$dist$2f$esm$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/firebase/storage/dist/esm/index.esm.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$storage$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@firebase/storage/dist/index.esm.js [app-client] (ecmascript)");
;
;
;
;
const firebaseConfig = {
    apiKey: "AIzaSyCzkVHHTpCFYiede77faaonqDiiV5S2C18",
    authDomain: "anas-nidir.firebaseapp.com",
    projectId: "anas-nidir",
    storageBucket: "anas-nidir.firebasestorage.app",
    messagingSenderId: "351701049742",
    appId: "1:351701049742:web:4faa788e224ee52afe84df"
};
// Initialize Firebase only once
let app = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$app$2f$dist$2f$esm$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getApps"])().length === 0 ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$app$2f$dist$2f$esm$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["initializeApp"])(firebaseConfig) : (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$app$2f$dist$2f$esm$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getApps"])()[0];
const db = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getFirestore"])(app);
const auth = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$auth$2f$dist$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getAuth"])(app);
const storage = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$storage$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getStorage"])(app);
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/libs/shared-ui/src/PresenceTracker.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>PresenceTracker
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$libs$2f$core$2f$src$2f$firebase$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/libs/core/src/firebase.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$firebase$2f$auth$2f$dist$2f$esm$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/firebase/auth/dist/esm/index.esm.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$auth$2f$dist$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@firebase/auth/dist/esm/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$firebase$2f$firestore$2f$dist$2f$esm$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/firebase/firestore/dist/esm/index.esm.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@firebase/firestore/dist/index.esm.js [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
function PresenceTracker() {
    _s();
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "PresenceTracker.useEffect": ()=>{
            let interval;
            const unsub = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$auth$2f$dist$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["onAuthStateChanged"])(__TURBOPACK__imported__module__$5b$project$5d2f$libs$2f$core$2f$src$2f$firebase$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["auth"], {
                "PresenceTracker.useEffect.unsub": (user)=>{
                    if (user) {
                        // Initial update
                        updatePresence(user.uid);
                        // Periodic update every 60 seconds
                        interval = setInterval({
                            "PresenceTracker.useEffect.unsub": ()=>{
                                updatePresence(user.uid);
                            }
                        }["PresenceTracker.useEffect.unsub"], 60000);
                    } else {
                        if (interval) clearInterval(interval);
                    }
                }
            }["PresenceTracker.useEffect.unsub"]);
            const updatePresence = {
                "PresenceTracker.useEffect.updatePresence": async (uid)=>{
                    try {
                        const userRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["doc"])(__TURBOPACK__imported__module__$5b$project$5d2f$libs$2f$core$2f$src$2f$firebase$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"], 'users', uid);
                        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["setDoc"])(userRef, {
                            lastActive: Date.now()
                        }, {
                            merge: true
                        });
                    } catch (err) {
                        console.error("Presence update failed:", err);
                    }
                }
            }["PresenceTracker.useEffect.updatePresence"];
            return ({
                "PresenceTracker.useEffect": ()=>{
                    unsub();
                    if (interval) clearInterval(interval);
                }
            })["PresenceTracker.useEffect"];
        }
    }["PresenceTracker.useEffect"], []);
    return null; // This component doesn't render anything
}
_s(PresenceTracker, "OD7bBpZva5O2jO+Puf00hKivP7c=");
_c = PresenceTracker;
var _c;
__turbopack_context__.k.register(_c, "PresenceTracker");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/libs/shared-ui/src/ClientLayout.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ClientLayout
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$libs$2f$shared$2d$ui$2f$src$2f$ReactBits$2f$CardNav$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/libs/shared-ui/src/ReactBits/CardNav.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$libs$2f$shared$2d$ui$2f$src$2f$Footer$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/libs/shared-ui/src/Footer.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$libs$2f$shared$2d$ui$2f$src$2f$PresenceTracker$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/libs/shared-ui/src/PresenceTracker.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
function ClientLayout({ children, navItems }) {
    _s();
    const pathname = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"])();
    const isSearchPage = pathname?.startsWith('/mr-search') || pathname?.startsWith('/nex-ai') || pathname?.startsWith('/web-store');
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$libs$2f$shared$2d$ui$2f$src$2f$PresenceTracker$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                fileName: "[project]/libs/shared-ui/src/ClientLayout.js",
                lineNumber: 13,
                columnNumber: 13
            }, this),
            (()=>{
                if (pathname?.startsWith('/mr-build') || pathname?.startsWith('/mr-engine') || pathname?.startsWith('/s/') || pathname?.startsWith('/celco') || pathname?.startsWith('/lab')) {
                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
                        children: children
                    }, void 0, false, {
                        fileName: "[project]/libs/shared-ui/src/ClientLayout.js",
                        lineNumber: 17,
                        columnNumber: 28
                    }, this);
                }
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                    children: [
                        !isSearchPage && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$libs$2f$shared$2d$ui$2f$src$2f$ReactBits$2f$CardNav$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            items: navItems
                        }, void 0, false, {
                            fileName: "[project]/libs/shared-ui/src/ClientLayout.js",
                            lineNumber: 21,
                            columnNumber: 43
                        }, this),
                        children,
                        !isSearchPage && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$libs$2f$shared$2d$ui$2f$src$2f$Footer$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                            fileName: "[project]/libs/shared-ui/src/ClientLayout.js",
                            lineNumber: 23,
                            columnNumber: 43
                        }, this)
                    ]
                }, void 0, true);
            })()
        ]
    }, void 0, true);
}
_s(ClientLayout, "xbyQPtUVMO7MNj7WjJlpdWqRcTo=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"]
    ];
});
_c = ClientLayout;
var _c;
__turbopack_context__.k.register(_c, "ClientLayout");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/libs/core/src/logger.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getSystemLogs",
    ()=>getSystemLogs,
    "reportError",
    ()=>reportError,
    "resolveLog",
    ()=>resolveLog
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$libs$2f$core$2f$src$2f$firebase$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/libs/core/src/firebase.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$firebase$2f$firestore$2f$dist$2f$esm$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/firebase/firestore/dist/esm/index.esm.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@firebase/firestore/dist/index.esm.js [app-client] (ecmascript)");
;
;
const LOGS_COLLECTION = 'system_logs';
const reportError = async (error, context = 'Unknown', additionalData = {})=>{
    try {
        const user = __TURBOPACK__imported__module__$5b$project$5d2f$libs$2f$core$2f$src$2f$firebase$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["auth"].currentUser;
        const errorMsg = error instanceof Error ? error.message : String(error);
        const stack = error instanceof Error ? error.stack : null;
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["addDoc"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["collection"])(__TURBOPACK__imported__module__$5b$project$5d2f$libs$2f$core$2f$src$2f$firebase$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"], LOGS_COLLECTION), {
            message: errorMsg,
            stack: stack,
            context: context,
            timestamp: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["serverTimestamp"])(),
            status: 'open',
            severity: 'error',
            metadata: {
                ...additionalData,
                url: ("TURBOPACK compile-time truthy", 1) ? window.location.href : "TURBOPACK unreachable",
                userAgent: ("TURBOPACK compile-time truthy", 1) ? window.navigator.userAgent : "TURBOPACK unreachable"
            },
            userId: user ? user.uid : 'anonymous',
            userEmail: user ? user.email : 'anonymous'
        });
        console.error(`[SystemLogger] Reported error in ${context}:`, error);
    } catch (loggingError) {
        console.error('[SystemLogger] Failed to report error:', loggingError);
    }
};
const getSystemLogs = async (limitCount = 50)=>{
    try {
        const q = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["query"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["collection"])(__TURBOPACK__imported__module__$5b$project$5d2f$libs$2f$core$2f$src$2f$firebase$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"], LOGS_COLLECTION), (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["orderBy"])('timestamp', 'desc'), (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["limit"])(limitCount));
        const snapshot = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getDocs"])(q);
        return snapshot.docs.map((doc)=>({
                id: doc.id,
                ...doc.data(),
                // Convert Firestore Timestamp to JS Date for easier handling in UI
                timestamp: doc.data().timestamp?.toDate() || new Date()
            }));
    } catch (error) {
        console.error('[SystemLogger] Failed to fetch logs:', error);
        throw error;
    }
};
const resolveLog = async (logId)=>{
    try {
        const logRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["doc"])(__TURBOPACK__imported__module__$5b$project$5d2f$libs$2f$core$2f$src$2f$firebase$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"], LOGS_COLLECTION, logId);
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["updateDoc"])(logRef, {
            status: 'resolved',
            resolvedAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["serverTimestamp"])(),
            resolvedBy: __TURBOPACK__imported__module__$5b$project$5d2f$libs$2f$core$2f$src$2f$firebase$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["auth"].currentUser ? __TURBOPACK__imported__module__$5b$project$5d2f$libs$2f$core$2f$src$2f$firebase$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["auth"].currentUser.email : 'system'
        });
    } catch (error) {
        console.error('[SystemLogger] Failed to resolve log:', error);
        throw error;
    }
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/libs/shared-ui/src/GlobalErrorBoundary.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$node_modules$2f$styled$2d$jsx$2f$style$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/node_modules/styled-jsx/style.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$libs$2f$core$2f$src$2f$logger$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/libs/core/src/logger.js [app-client] (ecmascript)");
'use client';
;
;
;
;
class GlobalErrorBoundary extends __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].Component {
    constructor(props){
        super(props);
        this.state = {
            hasError: false,
            errorId: null
        };
    }
    static getDerivedStateFromError(error) {
        return {
            hasError: true
        };
    }
    componentDidCatch(error, errorInfo) {
        // Log the error to Firestore
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$libs$2f$core$2f$src$2f$logger$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["reportError"])(error, 'GlobalErrorBoundary', {
            componentStack: errorInfo.componentStack
        });
        console.error("Uncaught error:", error, errorInfo);
    }
    render() {
        if (this.state.hasError) {
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "jsx-131270211e728f5e" + " " + "error-screen",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "jsx-131270211e728f5e" + " " + "error-box",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "jsx-131270211e728f5e" + " " + "icon",
                                children: "⚠️"
                            }, void 0, false, {
                                fileName: "[project]/libs/shared-ui/src/GlobalErrorBoundary.js",
                                lineNumber: 28,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                className: "jsx-131270211e728f5e",
                                children: "CRITICAL SYSTEM FAILURE"
                            }, void 0, false, {
                                fileName: "[project]/libs/shared-ui/src/GlobalErrorBoundary.js",
                                lineNumber: 29,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "jsx-131270211e728f5e",
                                children: "An unexpected anomaly has caused the interface to crash."
                            }, void 0, false, {
                                fileName: "[project]/libs/shared-ui/src/GlobalErrorBoundary.js",
                                lineNumber: 30,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "jsx-131270211e728f5e" + " " + "sub-text",
                                children: "This event has been logged to the Central Mainframe."
                            }, void 0, false, {
                                fileName: "[project]/libs/shared-ui/src/GlobalErrorBoundary.js",
                                lineNumber: 31,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>window.location.reload(),
                                className: "jsx-131270211e728f5e" + " " + "reload-btn",
                                children: "REBOOT INTERFACE"
                            }, void 0, false, {
                                fileName: "[project]/libs/shared-ui/src/GlobalErrorBoundary.js",
                                lineNumber: 32,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/libs/shared-ui/src/GlobalErrorBoundary.js",
                        lineNumber: 27,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$node_modules$2f$styled$2d$jsx$2f$style$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        id: "131270211e728f5e",
                        children: ".error-screen.jsx-131270211e728f5e{color:#fff;z-index:99999;background:#000;justify-content:center;align-items:center;width:100vw;height:100vh;display:flex;position:fixed;top:0;left:0}.error-box.jsx-131270211e728f5e{text-align:center;background:#ff32320d;border:1px solid #ff3232;border-radius:20px;max-width:500px;padding:40px;box-shadow:0 0 50px #ff323233}.icon.jsx-131270211e728f5e{margin-bottom:20px;font-size:4rem}h1.jsx-131270211e728f5e{font-family:var(--font-orbitron);color:#ff3232;letter-spacing:2px;margin-bottom:15px}p.jsx-131270211e728f5e{color:#ffffffb3;margin-bottom:10px}.sub-text.jsx-131270211e728f5e{opacity:.85;margin-bottom:30px;font-size:.8rem}.reload-btn.jsx-131270211e728f5e{color:#000;letter-spacing:2px;cursor:pointer;background:#ff3232;border:none;padding:15px 30px;font-weight:900;transition:all .3s}.reload-btn.jsx-131270211e728f5e:hover{background:#fff;transform:scale(1.05)}"
                    }, void 0, false, void 0, this)
                ]
            }, void 0, true, {
                fileName: "[project]/libs/shared-ui/src/GlobalErrorBoundary.js",
                lineNumber: 26,
                columnNumber: 9
            }, this);
        }
        return this.props.children;
    }
}
const __TURBOPACK__default__export__ = GlobalErrorBoundary;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=libs_96a1b27e._.js.map
