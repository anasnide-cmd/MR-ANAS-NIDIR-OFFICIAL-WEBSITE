module.exports = [
"[project]/apps/portfolio/src/app/favicon.ico.mjs { IMAGE => \"[project]/apps/portfolio/src/app/favicon.ico (static in ecmascript, tag client)\" } [app-rsc] (structured image object, ecmascript, Next.js Server Component)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/apps/portfolio/src/app/favicon.ico.mjs { IMAGE => \"[project]/apps/portfolio/src/app/favicon.ico (static in ecmascript, tag client)\" } [app-rsc] (structured image object, ecmascript)"));
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[project]/apps/portfolio/src/app/layout.js [app-rsc] (ecmascript, Next.js Server Component)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/apps/portfolio/src/app/layout.js [app-rsc] (ecmascript)"));
}),
"[externals]/crypto [external] (crypto, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("crypto", () => require("crypto"));

module.exports = mod;
}),
"[externals]/process [external] (process, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("process", () => require("process"));

module.exports = mod;
}),
"[externals]/tls [external] (tls, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("tls", () => require("tls"));

module.exports = mod;
}),
"[externals]/fs [external] (fs, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("fs", () => require("fs"));

module.exports = mod;
}),
"[externals]/os [external] (os, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("os", () => require("os"));

module.exports = mod;
}),
"[externals]/net [external] (net, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("net", () => require("net"));

module.exports = mod;
}),
"[externals]/events [external] (events, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("events", () => require("events"));

module.exports = mod;
}),
"[externals]/stream [external] (stream, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("stream", () => require("stream"));

module.exports = mod;
}),
"[externals]/http2 [external] (http2, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("http2", () => require("http2"));

module.exports = mod;
}),
"[externals]/http [external] (http, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("http", () => require("http"));

module.exports = mod;
}),
"[externals]/url [external] (url, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("url", () => require("url"));

module.exports = mod;
}),
"[externals]/dns [external] (dns, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("dns", () => require("dns"));

module.exports = mod;
}),
"[externals]/zlib [external] (zlib, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("zlib", () => require("zlib"));

module.exports = mod;
}),
"[project]/apps/portfolio/src/app/savoirpedia/post/[slug]/page.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>WikiPostPage,
    "generateMetadata",
    ()=>generateMetadata
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-jsx-dev-runtime.js [app-rsc] (ecmascript)");
(()=>{
    const e = new Error("Cannot find module '../../../../lib/firebase'");
    e.code = 'MODULE_NOT_FOUND';
    throw e;
})();
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$firebase$2f$firestore$2f$dist$2f$index$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/firebase/firestore/dist/index.mjs [app-rsc] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@firebase/firestore/dist/index.node.mjs [app-rsc] (ecmascript)");
(()=>{
    const e = new Error("Cannot find module '../../../../components/Savoirpedia/WikiArticle'");
    e.code = 'MODULE_NOT_FOUND';
    throw e;
})();
;
;
;
;
// Helper function to fetch article by slug
async function getArticle(slug) {
    if (!slug) return null;
    try {
        const q = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["query"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["collection"])(db, 'posts'), (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["where"])('slug', '==', slug));
        const snap = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getDocs"])(q);
        if (!snap.empty) {
            const doc = snap.docs[0];
            const data = doc.data();
            // Extract first image from content if 'image' field is missing
            let imageUrl = data.image;
            if (!imageUrl && data.content) {
                const imgMatch = data.content.match(/<img[^>]+src="([^">]+)"/);
                if (imgMatch && imgMatch[1]) {
                    imageUrl = imgMatch[1];
                }
            }
            // Serialize for passing to client component
            return {
                id: doc.id,
                ...data,
                image: imageUrl || '/assets/logo.jpg',
                date: data.date ? data.date.seconds ? data.date.seconds * 1000 : data.date : Date.now()
            };
        }
    } catch (err) {
        console.error("Error fetching article:", err);
    }
    return null;
}
// Helper function to fetch all article titles for auto-linking
async function getAllArticleTitles() {
    try {
        const q = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["query"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["collection"])(db, 'posts'));
        const snap = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getDocs"])(q);
        return snap.docs.map((d)=>({
                title: d.data().title,
                slug: d.data().slug
            }));
    } catch (err) {
        console.error("Error fetching article titles:", err);
        return [];
    }
}
async function generateMetadata({ params }) {
    // Next.js 15+ demands awaiting params
    const resolvedParams = await params;
    const { slug } = resolvedParams;
    const article = await getArticle(slug);
    if (!article) {
        return {
            title: 'Article Not Found - Savoirpedia',
            description: 'The requested article could not be found.'
        };
    }
    // Default image if none exists
    let ogImage = article.image;
    if (ogImage && !ogImage.startsWith('http')) {
        ogImage = `https://mr-anas-nidir-official-website.web.app${ogImage.startsWith('/') ? '' : '/'}${ogImage}`;
    }
    const isPng = ogImage.toLowerCase().endsWith('.png');
    return {
        title: `${article.title} - Savoirpedia`,
        description: `Read about ${article.title} on Savoirpedia, the free encyclopedia.`,
        openGraph: {
            title: article.title,
            description: `Read about ${article.title} on Savoirpedia.`,
            url: `https://mr-anas-nidir-official-website.web.app/savoirpedia/post/${slug}`,
            siteName: 'Savoirpedia',
            images: [
                {
                    url: ogImage,
                    secureUrl: ogImage,
                    width: 1200,
                    height: 630,
                    alt: article.title,
                    type: isPng ? 'image/png' : 'image/jpeg'
                }
            ],
            type: 'article'
        },
        twitter: {
            card: 'summary_large_image',
            title: article.title,
            description: `Read about ${article.title} on Savoirpedia.`,
            images: [
                ogImage
            ]
        }
    };
}
async function WikiPostPage({ params }) {
    // Next.js 15+ demands awaiting params
    const resolvedParams = await params;
    const { slug } = resolvedParams;
    const article = await getArticle(slug);
    const allTitles = await getAllArticleTitles();
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(WikiArticle, {
        article: article,
        allArticles: allTitles
    }, void 0, false, {
        fileName: "[project]/apps/portfolio/src/app/savoirpedia/post/[slug]/page.js",
        lineNumber: 109,
        columnNumber: 12
    }, this);
}
}),
"[project]/apps/portfolio/src/app/savoirpedia/post/[slug]/page.js [app-rsc] (ecmascript, Next.js Server Component)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/apps/portfolio/src/app/savoirpedia/post/[slug]/page.js [app-rsc] (ecmascript)"));
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__0bfa6ed5._.js.map