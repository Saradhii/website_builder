module.exports = [
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[project]/Dev/Projects/website_builder/node_modules/next/dist/server/route-modules/app-page/module.compiled.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
;
else {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    else {
        if ("TURBOPACK compile-time truthy", 1) {
            if ("TURBOPACK compile-time truthy", 1) {
                module.exports = __turbopack_context__.r("[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)");
            } else //TURBOPACK unreachable
            ;
        } else //TURBOPACK unreachable
        ;
    }
} //# sourceMappingURL=module.compiled.js.map
}),
"[project]/Dev/Projects/website_builder/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

module.exports = __turbopack_context__.r("[project]/Dev/Projects/website_builder/node_modules/next/dist/server/route-modules/app-page/module.compiled.js [app-ssr] (ecmascript)").vendored['react-ssr'].React; //# sourceMappingURL=react.js.map
}),
"[project]/Dev/Projects/website_builder/node_modules/@lobehub/ui/es/Flex/utils.mjs [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getCssValue",
    ()=>getCssValue,
    "getFlexDirection",
    ()=>getFlexDirection,
    "isHorizontal",
    ()=>isHorizontal,
    "isSpaceDistribution",
    ()=>isSpaceDistribution
]);
//#region src/Flex/utils.ts
const getFlexDirection = (direction, isHorizontal$1)=>{
    if (isHorizontal$1) return "row";
    switch(direction){
        case "horizontal":
            return "row";
        case "horizontal-reverse":
            return "row-reverse";
        case "vertical":
        default:
            return "column";
        case "vertical-reverse":
            return "column-reverse";
    }
};
const isSpaceDistribution = (distribution)=>{
    if (!distribution) return;
    return [
        "space-between",
        "space-around",
        "space-evenly"
    ].includes(distribution);
};
const isHorizontal = (direction, isHorizontal$1)=>getFlexDirection(direction, isHorizontal$1) === "row";
const getCssValue = (value)=>typeof value === "number" ? `${value}px` : value;
;
 //# sourceMappingURL=utils.mjs.map
}),
"[project]/Dev/Projects/website_builder/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-runtime.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

module.exports = __turbopack_context__.r("[project]/Dev/Projects/website_builder/node_modules/next/dist/server/route-modules/app-page/module.compiled.js [app-ssr] (ecmascript)").vendored['react-ssr'].ReactJsxRuntime; //# sourceMappingURL=react-jsx-runtime.js.map
}),
"[project]/Dev/Projects/website_builder/node_modules/@lobehub/ui/es/Flex/FlexBasic.mjs [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>FlexBasic_default
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Dev$2f$Projects$2f$website_builder$2f$node_modules$2f40$lobehub$2f$ui$2f$es$2f$Flex$2f$utils$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Dev/Projects/website_builder/node_modules/@lobehub/ui/es/Flex/utils.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Dev$2f$Projects$2f$website_builder$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Dev/Projects/website_builder/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Dev$2f$Projects$2f$website_builder$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Dev/Projects/website_builder/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-runtime.js [app-ssr] (ecmascript)");
'use client';
;
;
;
//#region src/Flex/FlexBasic.tsx
const FlexBasic = ({ visible, flex, gap, direction, horizontal, align, justify, distribution, height, width, padding, paddingInline, paddingBlock, prefixCls, as: Container = "div", className, style, children, wrap, ref, ...props })=>{
    const justifyContent = justify || distribution;
    const calcWidth = ()=>{
        if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$Dev$2f$Projects$2f$website_builder$2f$node_modules$2f40$lobehub$2f$ui$2f$es$2f$Flex$2f$utils$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isHorizontal"])(direction, horizontal) && !width && (0, __TURBOPACK__imported__module__$5b$project$5d2f$Dev$2f$Projects$2f$website_builder$2f$node_modules$2f40$lobehub$2f$ui$2f$es$2f$Flex$2f$utils$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isSpaceDistribution"])(justifyContent)) return "100%";
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Dev$2f$Projects$2f$website_builder$2f$node_modules$2f40$lobehub$2f$ui$2f$es$2f$Flex$2f$utils$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getCssValue"])(width);
    };
    const finalWidth = calcWidth();
    const mergedStyle = {
        ...flex !== void 0 ? {
            "--lobe-flex": String(flex)
        } : {},
        ...direction || horizontal ? {
            "--lobe-flex-direction": (0, __TURBOPACK__imported__module__$5b$project$5d2f$Dev$2f$Projects$2f$website_builder$2f$node_modules$2f40$lobehub$2f$ui$2f$es$2f$Flex$2f$utils$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getFlexDirection"])(direction, horizontal)
        } : {},
        ...wrap !== void 0 ? {
            "--lobe-flex-wrap": wrap
        } : {},
        ...justifyContent !== void 0 ? {
            "--lobe-flex-justify": justifyContent
        } : {},
        ...align !== void 0 ? {
            "--lobe-flex-align": align
        } : {},
        ...finalWidth !== void 0 ? {
            "--lobe-flex-width": finalWidth
        } : {},
        ...height !== void 0 ? {
            "--lobe-flex-height": (0, __TURBOPACK__imported__module__$5b$project$5d2f$Dev$2f$Projects$2f$website_builder$2f$node_modules$2f40$lobehub$2f$ui$2f$es$2f$Flex$2f$utils$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getCssValue"])(height)
        } : {},
        ...padding !== void 0 ? {
            "--lobe-flex-padding": (0, __TURBOPACK__imported__module__$5b$project$5d2f$Dev$2f$Projects$2f$website_builder$2f$node_modules$2f40$lobehub$2f$ui$2f$es$2f$Flex$2f$utils$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getCssValue"])(padding)
        } : {},
        ...paddingInline !== void 0 ? {
            "--lobe-flex-padding-inline": (0, __TURBOPACK__imported__module__$5b$project$5d2f$Dev$2f$Projects$2f$website_builder$2f$node_modules$2f40$lobehub$2f$ui$2f$es$2f$Flex$2f$utils$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getCssValue"])(paddingInline)
        } : {},
        ...paddingBlock !== void 0 ? {
            "--lobe-flex-padding-block": (0, __TURBOPACK__imported__module__$5b$project$5d2f$Dev$2f$Projects$2f$website_builder$2f$node_modules$2f40$lobehub$2f$ui$2f$es$2f$Flex$2f$utils$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getCssValue"])(paddingBlock)
        } : {},
        ...gap !== void 0 ? {
            "--lobe-flex-gap": (0, __TURBOPACK__imported__module__$5b$project$5d2f$Dev$2f$Projects$2f$website_builder$2f$node_modules$2f40$lobehub$2f$ui$2f$es$2f$Flex$2f$utils$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getCssValue"])(gap)
        } : {},
        ...style
    };
    const baseClassName = "lobe-flex";
    const mergedClassName = [
        baseClassName,
        visible === false ? `${baseClassName}--hidden` : void 0,
        prefixCls ? `${prefixCls}-flex` : void 0,
        className
    ].filter(Boolean).join(" ");
    return /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Dev$2f$Projects$2f$website_builder$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(Container, {
        ref,
        ...props,
        className: mergedClassName,
        style: mergedStyle,
        children
    });
};
var FlexBasic_default = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Dev$2f$Projects$2f$website_builder$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["memo"])(FlexBasic);
;
 //# sourceMappingURL=FlexBasic.mjs.map
}),
"[project]/Dev/Projects/website_builder/node_modules/@lobehub/ui/es/Flex/Center.mjs [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Center_default
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Dev$2f$Projects$2f$website_builder$2f$node_modules$2f40$lobehub$2f$ui$2f$es$2f$Flex$2f$FlexBasic$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Dev/Projects/website_builder/node_modules/@lobehub/ui/es/Flex/FlexBasic.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Dev$2f$Projects$2f$website_builder$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Dev/Projects/website_builder/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-runtime.js [app-ssr] (ecmascript)");
;
;
//#region src/Flex/Center.tsx
const Center = ({ children, ref, ...props })=>/* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Dev$2f$Projects$2f$website_builder$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Dev$2f$Projects$2f$website_builder$2f$node_modules$2f40$lobehub$2f$ui$2f$es$2f$Flex$2f$FlexBasic$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
        ...props,
        align: "center",
        justify: "center",
        ref,
        children
    });
var Center_default = Center;
;
 //# sourceMappingURL=Center.mjs.map
}),
"[project]/Dev/Projects/website_builder/node_modules/@lobehub/ui/es/Flex/Center.mjs [app-ssr] (ecmascript) <export default as Center>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Center",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Dev$2f$Projects$2f$website_builder$2f$node_modules$2f40$lobehub$2f$ui$2f$es$2f$Flex$2f$Center$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Dev$2f$Projects$2f$website_builder$2f$node_modules$2f40$lobehub$2f$ui$2f$es$2f$Flex$2f$Center$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Dev/Projects/website_builder/node_modules/@lobehub/ui/es/Flex/Center.mjs [app-ssr] (ecmascript)");
}),
"[project]/Dev/Projects/website_builder/node_modules/antd-style/es/utils/matchBrowserPrefers.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "matchBrowserPrefers",
    ()=>matchBrowserPrefers
]);
var matchBrowserPrefers = function matchBrowserPrefers(mode) {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    // 针对 ssr 做特处
    return {
        matches: false
    };
};
}),
"[project]/Dev/Projects/website_builder/node_modules/antd-style/es/context/ThemeModeContext.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ThemeModeContext",
    ()=>ThemeModeContext
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Dev$2f$Projects$2f$website_builder$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Dev/Projects/website_builder/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Dev$2f$Projects$2f$website_builder$2f$node_modules$2f$antd$2d$style$2f$es$2f$utils$2f$matchBrowserPrefers$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Dev/Projects/website_builder/node_modules/antd-style/es/utils/matchBrowserPrefers.js [app-ssr] (ecmascript)");
var _matchBrowserPrefers;
;
;
var ThemeModeContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Dev$2f$Projects$2f$website_builder$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createContext"])({
    appearance: 'light',
    setAppearance: function setAppearance() {},
    isDarkMode: false,
    themeMode: 'light',
    setThemeMode: function setThemeMode() {},
    browserPrefers: (_matchBrowserPrefers = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Dev$2f$Projects$2f$website_builder$2f$node_modules$2f$antd$2d$style$2f$es$2f$utils$2f$matchBrowserPrefers$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["matchBrowserPrefers"])('dark')) !== null && _matchBrowserPrefers !== void 0 && _matchBrowserPrefers.matches ? 'dark' : 'light'
});
}),
"[project]/Dev/Projects/website_builder/node_modules/antd-style/es/hooks/useThemeMode.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useThemeMode",
    ()=>useThemeMode
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Dev$2f$Projects$2f$website_builder$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Dev/Projects/website_builder/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Dev$2f$Projects$2f$website_builder$2f$node_modules$2f$antd$2d$style$2f$es$2f$context$2f$ThemeModeContext$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Dev/Projects/website_builder/node_modules/antd-style/es/context/ThemeModeContext.js [app-ssr] (ecmascript)");
;
;
var useThemeMode = function useThemeMode() {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Dev$2f$Projects$2f$website_builder$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useContext"])(__TURBOPACK__imported__module__$5b$project$5d2f$Dev$2f$Projects$2f$website_builder$2f$node_modules$2f$antd$2d$style$2f$es$2f$context$2f$ThemeModeContext$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ThemeModeContext"]);
};
}),
"[project]/Dev/Projects/website_builder/node_modules/@lobehub/icons/es/features/IconAvatar/util.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getAvatarShadow",
    ()=>getAvatarShadow,
    "roundToEven",
    ()=>roundToEven
]);
var roundToEven = function roundToEven(number) {
    return number % 2 === 0 ? number : number - 1;
};
var getAvatarShadow = function getAvatarShadow(isDarkMode, background) {
    if (!background) return;
    if (isDarkMode && background === '#000') {
        return '0 0 0 1px rgba(255,255,255,0.1) inset';
    } else if (!isDarkMode && background === '#fff') {
        return '0 0 0 1px rgba(0,0,0,0.05) inset';
    }
    return;
};
}),
"[project]/Dev/Projects/website_builder/node_modules/@lobehub/icons/es/features/IconAvatar/index.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Dev$2f$Projects$2f$website_builder$2f$node_modules$2f40$lobehub$2f$ui$2f$es$2f$Flex$2f$Center$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Center$3e$__ = __turbopack_context__.i("[project]/Dev/Projects/website_builder/node_modules/@lobehub/ui/es/Flex/Center.mjs [app-ssr] (ecmascript) <export default as Center>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Dev$2f$Projects$2f$website_builder$2f$node_modules$2f$antd$2d$style$2f$es$2f$hooks$2f$useThemeMode$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Dev/Projects/website_builder/node_modules/antd-style/es/hooks/useThemeMode.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Dev$2f$Projects$2f$website_builder$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Dev/Projects/website_builder/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Dev$2f$Projects$2f$website_builder$2f$node_modules$2f40$lobehub$2f$icons$2f$es$2f$features$2f$IconAvatar$2f$util$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Dev/Projects/website_builder/node_modules/@lobehub/icons/es/features/IconAvatar/util.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Dev$2f$Projects$2f$website_builder$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Dev/Projects/website_builder/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-runtime.js [app-ssr] (ecmascript)");
'use client';
function _typeof(o) {
    "@babel/helpers - typeof";
    return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o) {
        return typeof o;
    } : function(o) {
        return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
    }, _typeof(o);
}
var _excluded = [
    "shape",
    "color",
    "background",
    "size",
    "style",
    "iconMultiple",
    "Icon",
    "iconStyle",
    "iconClassName"
];
function ownKeys(e, r) {
    var t = Object.keys(e);
    if (Object.getOwnPropertySymbols) {
        var o = Object.getOwnPropertySymbols(e);
        r && (o = o.filter(function(r) {
            return Object.getOwnPropertyDescriptor(e, r).enumerable;
        })), t.push.apply(t, o);
    }
    return t;
}
function _objectSpread(e) {
    for(var r = 1; r < arguments.length; r++){
        var t = null != arguments[r] ? arguments[r] : {};
        r % 2 ? ownKeys(Object(t), !0).forEach(function(r) {
            _defineProperty(e, r, t[r]);
        }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function(r) {
            Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
        });
    }
    return e;
}
function _defineProperty(obj, key, value) {
    key = _toPropertyKey(key);
    if (key in obj) {
        Object.defineProperty(obj, key, {
            value: value,
            enumerable: true,
            configurable: true,
            writable: true
        });
    } else {
        obj[key] = value;
    }
    return obj;
}
function _toPropertyKey(t) {
    var i = _toPrimitive(t, "string");
    return "symbol" == _typeof(i) ? i : String(i);
}
function _toPrimitive(t, r) {
    if ("object" != _typeof(t) || !t) return t;
    var e = t[Symbol.toPrimitive];
    if (void 0 !== e) {
        var i = e.call(t, r || "default");
        if ("object" != _typeof(i)) return i;
        throw new TypeError("@@toPrimitive must return a primitive value.");
    }
    return ("string" === r ? String : Number)(t);
}
function _objectWithoutProperties(source, excluded) {
    if (source == null) return {};
    var target = _objectWithoutPropertiesLoose(source, excluded);
    var key, i;
    if (Object.getOwnPropertySymbols) {
        var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
        for(i = 0; i < sourceSymbolKeys.length; i++){
            key = sourceSymbolKeys[i];
            if (excluded.indexOf(key) >= 0) continue;
            if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
            target[key] = source[key];
        }
    }
    return target;
}
function _objectWithoutPropertiesLoose(source, excluded) {
    if (source == null) return {};
    var target = {};
    var sourceKeys = Object.keys(source);
    var key, i;
    for(i = 0; i < sourceKeys.length; i++){
        key = sourceKeys[i];
        if (excluded.indexOf(key) >= 0) continue;
        target[key] = source[key];
    }
    return target;
}
;
;
;
;
;
var IconAvatar = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Dev$2f$Projects$2f$website_builder$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["memo"])(function(_ref) {
    var _ref$shape = _ref.shape, shape = _ref$shape === void 0 ? 'circle' : _ref$shape, _ref$color = _ref.color, color = _ref$color === void 0 ? '#fff' : _ref$color, background = _ref.background, size = _ref.size, style = _ref.style, _ref$iconMultiple = _ref.iconMultiple, iconMultiple = _ref$iconMultiple === void 0 ? 0.75 : _ref$iconMultiple, Icon = _ref.Icon, iconStyle = _ref.iconStyle, iconClassName = _ref.iconClassName, rest = _objectWithoutProperties(_ref, _excluded);
    var _useThemeMode = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Dev$2f$Projects$2f$website_builder$2f$node_modules$2f$antd$2d$style$2f$es$2f$hooks$2f$useThemeMode$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useThemeMode"])(), isDarkMode = _useThemeMode.isDarkMode;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Dev$2f$Projects$2f$website_builder$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Dev$2f$Projects$2f$website_builder$2f$node_modules$2f40$lobehub$2f$ui$2f$es$2f$Flex$2f$Center$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Center$3e$__["Center"], _objectSpread(_objectSpread({
        flex: 'none',
        style: _objectSpread({
            background: background,
            borderRadius: shape === 'circle' ? '50%' : Math.floor(size * 0.1),
            boxShadow: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Dev$2f$Projects$2f$website_builder$2f$node_modules$2f40$lobehub$2f$icons$2f$es$2f$features$2f$IconAvatar$2f$util$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getAvatarShadow"])(isDarkMode, background),
            color: color,
            height: size,
            width: size
        }, style)
    }, rest), {}, {
        children: Icon && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Dev$2f$Projects$2f$website_builder$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(Icon, {
            className: iconClassName,
            color: color,
            size: size,
            style: _objectSpread({
                transform: "scale(".concat(iconMultiple, ")")
            }, iconStyle)
        })
    }));
});
const __TURBOPACK__default__export__ = IconAvatar;
}),
"[project]/Dev/Projects/website_builder/node_modules/@lobehub/icons/es/Bailian/style.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AVATAR_BACKGROUND",
    ()=>AVATAR_BACKGROUND,
    "AVATAR_COLOR",
    ()=>AVATAR_COLOR,
    "AVATAR_ICON_MULTIPLE",
    ()=>AVATAR_ICON_MULTIPLE,
    "COLOR_PRIMARY",
    ()=>COLOR_PRIMARY,
    "COMBINE_SPACE_MULTIPLE",
    ()=>COMBINE_SPACE_MULTIPLE,
    "COMBINE_TEXT_MULTIPLE",
    ()=>COMBINE_TEXT_MULTIPLE,
    "TITLE",
    ()=>TITLE
]);
var TITLE = 'BaiLian';
var COMBINE_TEXT_MULTIPLE = 0.8;
var COMBINE_SPACE_MULTIPLE = 0.2;
var COLOR_PRIMARY = '#615ced';
var AVATAR_BACKGROUND = '#fff';
var AVATAR_COLOR = '#fff';
var AVATAR_ICON_MULTIPLE = 0.75;
}),
"[project]/Dev/Projects/website_builder/node_modules/@lobehub/icons/es/Bailian/components/Color.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Dev$2f$Projects$2f$website_builder$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Dev/Projects/website_builder/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Dev$2f$Projects$2f$website_builder$2f$node_modules$2f40$lobehub$2f$icons$2f$es$2f$Bailian$2f$style$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Dev/Projects/website_builder/node_modules/@lobehub/icons/es/Bailian/style.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Dev$2f$Projects$2f$website_builder$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Dev/Projects/website_builder/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-runtime.js [app-ssr] (ecmascript)");
'use client';
function _typeof(o) {
    "@babel/helpers - typeof";
    return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o) {
        return typeof o;
    } : function(o) {
        return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
    }, _typeof(o);
}
var _excluded = [
    "size",
    "style"
];
function ownKeys(e, r) {
    var t = Object.keys(e);
    if (Object.getOwnPropertySymbols) {
        var o = Object.getOwnPropertySymbols(e);
        r && (o = o.filter(function(r) {
            return Object.getOwnPropertyDescriptor(e, r).enumerable;
        })), t.push.apply(t, o);
    }
    return t;
}
function _objectSpread(e) {
    for(var r = 1; r < arguments.length; r++){
        var t = null != arguments[r] ? arguments[r] : {};
        r % 2 ? ownKeys(Object(t), !0).forEach(function(r) {
            _defineProperty(e, r, t[r]);
        }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function(r) {
            Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
        });
    }
    return e;
}
function _defineProperty(obj, key, value) {
    key = _toPropertyKey(key);
    if (key in obj) {
        Object.defineProperty(obj, key, {
            value: value,
            enumerable: true,
            configurable: true,
            writable: true
        });
    } else {
        obj[key] = value;
    }
    return obj;
}
function _toPropertyKey(t) {
    var i = _toPrimitive(t, "string");
    return "symbol" == _typeof(i) ? i : String(i);
}
function _toPrimitive(t, r) {
    if ("object" != _typeof(t) || !t) return t;
    var e = t[Symbol.toPrimitive];
    if (void 0 !== e) {
        var i = e.call(t, r || "default");
        if ("object" != _typeof(i)) return i;
        throw new TypeError("@@toPrimitive must return a primitive value.");
    }
    return ("string" === r ? String : Number)(t);
}
function _objectWithoutProperties(source, excluded) {
    if (source == null) return {};
    var target = _objectWithoutPropertiesLoose(source, excluded);
    var key, i;
    if (Object.getOwnPropertySymbols) {
        var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
        for(i = 0; i < sourceSymbolKeys.length; i++){
            key = sourceSymbolKeys[i];
            if (excluded.indexOf(key) >= 0) continue;
            if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
            target[key] = source[key];
        }
    }
    return target;
}
function _objectWithoutPropertiesLoose(source, excluded) {
    if (source == null) return {};
    var target = {};
    var sourceKeys = Object.keys(source);
    var key, i;
    for(i = 0; i < sourceKeys.length; i++){
        key = sourceKeys[i];
        if (excluded.indexOf(key) >= 0) continue;
        target[key] = source[key];
    }
    return target;
}
;
;
;
;
var Icon = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Dev$2f$Projects$2f$website_builder$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["memo"])(function(_ref) {
    var _ref$size = _ref.size, size = _ref$size === void 0 ? '1em' : _ref$size, style = _ref.style, rest = _objectWithoutProperties(_ref, _excluded);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Dev$2f$Projects$2f$website_builder$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxs"])("svg", _objectSpread(_objectSpread({
        height: size,
        style: _objectSpread({
            flex: 'none',
            lineHeight: 1
        }, style),
        viewBox: "0 0 24 24",
        width: size,
        xmlns: "http://www.w3.org/2000/svg"
    }, rest), {}, {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Dev$2f$Projects$2f$website_builder$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])("title", {
                children: __TURBOPACK__imported__module__$5b$project$5d2f$Dev$2f$Projects$2f$website_builder$2f$node_modules$2f40$lobehub$2f$icons$2f$es$2f$Bailian$2f$style$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TITLE"]
            }),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Dev$2f$Projects$2f$website_builder$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])("path", {
                d: "M6.336 8.919v6.162l5.335-3.083L6.337 8.92z",
                fill: "#1C54E3"
            }),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Dev$2f$Projects$2f$website_builder$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])("path", {
                d: "M21.394 5.288s-.006-.006-.01-.006L17.01 2.754 6.336 8.92l5.335 3.082 9.701-5.6.016-.01a.635.635 0 00.006-1.1v-.003z",
                fill: "#AA9AFF"
            }),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Dev$2f$Projects$2f$website_builder$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])("path", {
                d: "M21.71 12.465a.62.62 0 00-.316.085s-.006 0-.009.003l-4.375 2.528 5.05 2.915h.006a2.06 2.06 0 00.28-1.04v-3.855a.637.637 0 00-.636-.636z",
                fill: "#00EAD1"
            }),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Dev$2f$Projects$2f$website_builder$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])("path", {
                d: "M22.06 17.996l-5.05-2.915L6.34 21.242l4.27 2.465s.016.006.022.012a2.102 2.102 0 002.093 0c.006-.003.016-.006.022-.012l8.538-4.93c.003 0 .006-.003.01-.006.321-.183.589-.45.775-.772h-.006l-.004-.003z",
                fill: "#00CEC9"
            }),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Dev$2f$Projects$2f$website_builder$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])("path", {
                d: "M11.672 11.998l-5.336 3.083-1.444.832-3.605 2.083H1.28c.173.303.416.555.709.738l.078.044.016.01.02.012 4.232 2.442 10.671-6.161-5.335-3.082z",
                fill: "#00EAD1"
            }),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Dev$2f$Projects$2f$website_builder$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])("path", {
                d: "M12.74.29c-.1-.06-.208-.107-.315-.148-.02-.006-.038-.016-.057-.022a2.121 2.121 0 00-.7-.12c-.233 0-.457.038-.668.11l-.031.01a2.196 2.196 0 00-.372.17L2.068 5.222s-.003 0-.006.003c-.324.183-.592.451-.781.773h.006l5.049 2.918L17.01 2.758 12.74.29z",
                fill: "#7347FF"
            }),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Dev$2f$Projects$2f$website_builder$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])("path", {
                d: "M1.287 6.001H1.28A2.06 2.06 0 001 7.041v9.915c0 .378.1.735.28 1.043h.007l5.049-2.918V8.919l-5.05-2.918z",
                fill: "#0423DA"
            })
        ]
    }));
});
const __TURBOPACK__default__export__ = Icon;
}),
"[project]/Dev/Projects/website_builder/node_modules/@lobehub/icons/es/Bailian/components/Avatar.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Dev$2f$Projects$2f$website_builder$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Dev/Projects/website_builder/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Dev$2f$Projects$2f$website_builder$2f$node_modules$2f40$lobehub$2f$icons$2f$es$2f$features$2f$IconAvatar$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Dev/Projects/website_builder/node_modules/@lobehub/icons/es/features/IconAvatar/index.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Dev$2f$Projects$2f$website_builder$2f$node_modules$2f40$lobehub$2f$icons$2f$es$2f$Bailian$2f$style$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Dev/Projects/website_builder/node_modules/@lobehub/icons/es/Bailian/style.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Dev$2f$Projects$2f$website_builder$2f$node_modules$2f40$lobehub$2f$icons$2f$es$2f$Bailian$2f$components$2f$Color$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Dev/Projects/website_builder/node_modules/@lobehub/icons/es/Bailian/components/Color.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Dev$2f$Projects$2f$website_builder$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Dev/Projects/website_builder/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-runtime.js [app-ssr] (ecmascript)");
'use client';
function _typeof(o) {
    "@babel/helpers - typeof";
    return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o) {
        return typeof o;
    } : function(o) {
        return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
    }, _typeof(o);
}
function ownKeys(e, r) {
    var t = Object.keys(e);
    if (Object.getOwnPropertySymbols) {
        var o = Object.getOwnPropertySymbols(e);
        r && (o = o.filter(function(r) {
            return Object.getOwnPropertyDescriptor(e, r).enumerable;
        })), t.push.apply(t, o);
    }
    return t;
}
function _objectSpread(e) {
    for(var r = 1; r < arguments.length; r++){
        var t = null != arguments[r] ? arguments[r] : {};
        r % 2 ? ownKeys(Object(t), !0).forEach(function(r) {
            _defineProperty(e, r, t[r]);
        }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function(r) {
            Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
        });
    }
    return e;
}
function _defineProperty(obj, key, value) {
    key = _toPropertyKey(key);
    if (key in obj) {
        Object.defineProperty(obj, key, {
            value: value,
            enumerable: true,
            configurable: true,
            writable: true
        });
    } else {
        obj[key] = value;
    }
    return obj;
}
function _toPropertyKey(t) {
    var i = _toPrimitive(t, "string");
    return "symbol" == _typeof(i) ? i : String(i);
}
function _toPrimitive(t, r) {
    if ("object" != _typeof(t) || !t) return t;
    var e = t[Symbol.toPrimitive];
    if (void 0 !== e) {
        var i = e.call(t, r || "default");
        if ("object" != _typeof(i)) return i;
        throw new TypeError("@@toPrimitive must return a primitive value.");
    }
    return ("string" === r ? String : Number)(t);
}
function _objectDestructuringEmpty(obj) {
    if (obj == null) throw new TypeError("Cannot destructure " + obj);
}
;
;
;
;
;
var Avatar = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Dev$2f$Projects$2f$website_builder$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["memo"])(function(_ref) {
    var rest = Object.assign({}, (_objectDestructuringEmpty(_ref), _ref));
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Dev$2f$Projects$2f$website_builder$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Dev$2f$Projects$2f$website_builder$2f$node_modules$2f40$lobehub$2f$icons$2f$es$2f$features$2f$IconAvatar$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], _objectSpread({
        Icon: __TURBOPACK__imported__module__$5b$project$5d2f$Dev$2f$Projects$2f$website_builder$2f$node_modules$2f40$lobehub$2f$icons$2f$es$2f$Bailian$2f$components$2f$Color$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"],
        "aria-label": __TURBOPACK__imported__module__$5b$project$5d2f$Dev$2f$Projects$2f$website_builder$2f$node_modules$2f40$lobehub$2f$icons$2f$es$2f$Bailian$2f$style$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TITLE"],
        background: __TURBOPACK__imported__module__$5b$project$5d2f$Dev$2f$Projects$2f$website_builder$2f$node_modules$2f40$lobehub$2f$icons$2f$es$2f$Bailian$2f$style$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AVATAR_BACKGROUND"],
        color: __TURBOPACK__imported__module__$5b$project$5d2f$Dev$2f$Projects$2f$website_builder$2f$node_modules$2f40$lobehub$2f$icons$2f$es$2f$Bailian$2f$style$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AVATAR_COLOR"],
        iconMultiple: __TURBOPACK__imported__module__$5b$project$5d2f$Dev$2f$Projects$2f$website_builder$2f$node_modules$2f40$lobehub$2f$icons$2f$es$2f$Bailian$2f$style$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AVATAR_ICON_MULTIPLE"]
    }, rest));
});
const __TURBOPACK__default__export__ = Avatar;
}),
"[project]/Dev/Projects/website_builder/node_modules/@lobehub/ui/es/Flex/FlexBasic.mjs [app-ssr] (ecmascript) <export default as Flexbox>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Flexbox",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Dev$2f$Projects$2f$website_builder$2f$node_modules$2f40$lobehub$2f$ui$2f$es$2f$Flex$2f$FlexBasic$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Dev$2f$Projects$2f$website_builder$2f$node_modules$2f40$lobehub$2f$ui$2f$es$2f$Flex$2f$FlexBasic$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Dev/Projects/website_builder/node_modules/@lobehub/ui/es/Flex/FlexBasic.mjs [app-ssr] (ecmascript)");
}),
"[project]/Dev/Projects/website_builder/node_modules/@lobehub/icons/es/features/IconCombine/index.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Dev$2f$Projects$2f$website_builder$2f$node_modules$2f40$lobehub$2f$ui$2f$es$2f$Flex$2f$FlexBasic$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Flexbox$3e$__ = __turbopack_context__.i("[project]/Dev/Projects/website_builder/node_modules/@lobehub/ui/es/Flex/FlexBasic.mjs [app-ssr] (ecmascript) <export default as Flexbox>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Dev$2f$Projects$2f$website_builder$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Dev/Projects/website_builder/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Dev$2f$Projects$2f$website_builder$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Dev/Projects/website_builder/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-runtime.js [app-ssr] (ecmascript)");
'use client';
function _typeof(o) {
    "@babel/helpers - typeof";
    return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o) {
        return typeof o;
    } : function(o) {
        return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
    }, _typeof(o);
}
var _excluded = [
    "Icon",
    "style",
    "Text",
    "color",
    "size",
    "spaceMultiple",
    "textMultiple",
    "extra",
    "extraStyle",
    "showText",
    "showLogo",
    "extraClassName",
    "iconProps",
    "inverse"
];
function ownKeys(e, r) {
    var t = Object.keys(e);
    if (Object.getOwnPropertySymbols) {
        var o = Object.getOwnPropertySymbols(e);
        r && (o = o.filter(function(r) {
            return Object.getOwnPropertyDescriptor(e, r).enumerable;
        })), t.push.apply(t, o);
    }
    return t;
}
function _objectSpread(e) {
    for(var r = 1; r < arguments.length; r++){
        var t = null != arguments[r] ? arguments[r] : {};
        r % 2 ? ownKeys(Object(t), !0).forEach(function(r) {
            _defineProperty(e, r, t[r]);
        }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function(r) {
            Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
        });
    }
    return e;
}
function _defineProperty(obj, key, value) {
    key = _toPropertyKey(key);
    if (key in obj) {
        Object.defineProperty(obj, key, {
            value: value,
            enumerable: true,
            configurable: true,
            writable: true
        });
    } else {
        obj[key] = value;
    }
    return obj;
}
function _toPropertyKey(t) {
    var i = _toPrimitive(t, "string");
    return "symbol" == _typeof(i) ? i : String(i);
}
function _toPrimitive(t, r) {
    if ("object" != _typeof(t) || !t) return t;
    var e = t[Symbol.toPrimitive];
    if (void 0 !== e) {
        var i = e.call(t, r || "default");
        if ("object" != _typeof(i)) return i;
        throw new TypeError("@@toPrimitive must return a primitive value.");
    }
    return ("string" === r ? String : Number)(t);
}
function _objectWithoutProperties(source, excluded) {
    if (source == null) return {};
    var target = _objectWithoutPropertiesLoose(source, excluded);
    var key, i;
    if (Object.getOwnPropertySymbols) {
        var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
        for(i = 0; i < sourceSymbolKeys.length; i++){
            key = sourceSymbolKeys[i];
            if (excluded.indexOf(key) >= 0) continue;
            if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
            target[key] = source[key];
        }
    }
    return target;
}
function _objectWithoutPropertiesLoose(source, excluded) {
    if (source == null) return {};
    var target = {};
    var sourceKeys = Object.keys(source);
    var key, i;
    for(i = 0; i < sourceKeys.length; i++){
        key = sourceKeys[i];
        if (excluded.indexOf(key) >= 0) continue;
        target[key] = source[key];
    }
    return target;
}
;
;
;
;
;
var IconCombine = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Dev$2f$Projects$2f$website_builder$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["memo"])(function(_ref) {
    var Icon = _ref.Icon, style = _ref.style, Text = _ref.Text, color = _ref.color, _ref$size = _ref.size, size = _ref$size === void 0 ? 24 : _ref$size, _ref$spaceMultiple = _ref.spaceMultiple, spaceMultiple = _ref$spaceMultiple === void 0 ? 1 : _ref$spaceMultiple, _ref$textMultiple = _ref.textMultiple, textMultiple = _ref$textMultiple === void 0 ? 1 : _ref$textMultiple, extra = _ref.extra, extraStyle = _ref.extraStyle, _ref$showText = _ref.showText, showText = _ref$showText === void 0 ? true : _ref$showText, _ref$showLogo = _ref.showLogo, showLogo = _ref$showLogo === void 0 ? true : _ref$showLogo, extraClassName = _ref.extraClassName, iconProps = _ref.iconProps, inverse = _ref.inverse, rest = _objectWithoutProperties(_ref, _excluded);
    var logo = Icon && showLogo && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Dev$2f$Projects$2f$website_builder$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(Icon, _objectSpread(_objectSpread({
        size: size
    }, iconProps), {}, {
        style: inverse ? _objectSpread({
            marginLeft: size * spaceMultiple
        }, iconProps === null || iconProps === void 0 ? void 0 : iconProps.style) : _objectSpread({
            marginRight: size * spaceMultiple
        }, iconProps === null || iconProps === void 0 ? void 0 : iconProps.style)
    }));
    var text = showText && Text && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Dev$2f$Projects$2f$website_builder$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(Text, {
        size: size * textMultiple
    });
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Dev$2f$Projects$2f$website_builder$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxs"])(__TURBOPACK__imported__module__$5b$project$5d2f$Dev$2f$Projects$2f$website_builder$2f$node_modules$2f40$lobehub$2f$ui$2f$es$2f$Flex$2f$FlexBasic$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Flexbox$3e$__["Flexbox"], _objectSpread(_objectSpread({
        align: 'center',
        flex: 'none',
        horizontal: true,
        justify: 'flex-start',
        style: _objectSpread({
            color: color
        }, style)
    }, rest), {}, {
        children: [
            inverse ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Dev$2f$Projects$2f$website_builder$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxs"])(__TURBOPACK__imported__module__$5b$project$5d2f$Dev$2f$Projects$2f$website_builder$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                children: [
                    text,
                    logo
                ]
            }) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Dev$2f$Projects$2f$website_builder$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxs"])(__TURBOPACK__imported__module__$5b$project$5d2f$Dev$2f$Projects$2f$website_builder$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                children: [
                    logo,
                    text
                ]
            }),
            extra && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Dev$2f$Projects$2f$website_builder$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])("span", {
                className: extraClassName,
                style: _objectSpread({
                    fontSize: size * textMultiple * 0.95,
                    lineHeight: 1
                }, extraStyle),
                children: extra
            })
        ]
    }));
});
const __TURBOPACK__default__export__ = IconCombine;
}),
"[project]/Dev/Projects/website_builder/node_modules/@lobehub/icons/es/Bailian/components/Mono.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Dev$2f$Projects$2f$website_builder$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Dev/Projects/website_builder/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Dev$2f$Projects$2f$website_builder$2f$node_modules$2f40$lobehub$2f$icons$2f$es$2f$Bailian$2f$style$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Dev/Projects/website_builder/node_modules/@lobehub/icons/es/Bailian/style.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Dev$2f$Projects$2f$website_builder$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Dev/Projects/website_builder/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-runtime.js [app-ssr] (ecmascript)");
'use client';
function _typeof(o) {
    "@babel/helpers - typeof";
    return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o) {
        return typeof o;
    } : function(o) {
        return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
    }, _typeof(o);
}
var _excluded = [
    "size",
    "style"
];
function ownKeys(e, r) {
    var t = Object.keys(e);
    if (Object.getOwnPropertySymbols) {
        var o = Object.getOwnPropertySymbols(e);
        r && (o = o.filter(function(r) {
            return Object.getOwnPropertyDescriptor(e, r).enumerable;
        })), t.push.apply(t, o);
    }
    return t;
}
function _objectSpread(e) {
    for(var r = 1; r < arguments.length; r++){
        var t = null != arguments[r] ? arguments[r] : {};
        r % 2 ? ownKeys(Object(t), !0).forEach(function(r) {
            _defineProperty(e, r, t[r]);
        }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function(r) {
            Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
        });
    }
    return e;
}
function _defineProperty(obj, key, value) {
    key = _toPropertyKey(key);
    if (key in obj) {
        Object.defineProperty(obj, key, {
            value: value,
            enumerable: true,
            configurable: true,
            writable: true
        });
    } else {
        obj[key] = value;
    }
    return obj;
}
function _toPropertyKey(t) {
    var i = _toPrimitive(t, "string");
    return "symbol" == _typeof(i) ? i : String(i);
}
function _toPrimitive(t, r) {
    if ("object" != _typeof(t) || !t) return t;
    var e = t[Symbol.toPrimitive];
    if (void 0 !== e) {
        var i = e.call(t, r || "default");
        if ("object" != _typeof(i)) return i;
        throw new TypeError("@@toPrimitive must return a primitive value.");
    }
    return ("string" === r ? String : Number)(t);
}
function _objectWithoutProperties(source, excluded) {
    if (source == null) return {};
    var target = _objectWithoutPropertiesLoose(source, excluded);
    var key, i;
    if (Object.getOwnPropertySymbols) {
        var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
        for(i = 0; i < sourceSymbolKeys.length; i++){
            key = sourceSymbolKeys[i];
            if (excluded.indexOf(key) >= 0) continue;
            if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
            target[key] = source[key];
        }
    }
    return target;
}
function _objectWithoutPropertiesLoose(source, excluded) {
    if (source == null) return {};
    var target = {};
    var sourceKeys = Object.keys(source);
    var key, i;
    for(i = 0; i < sourceKeys.length; i++){
        key = sourceKeys[i];
        if (excluded.indexOf(key) >= 0) continue;
        target[key] = source[key];
    }
    return target;
}
;
;
;
;
var Icon = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Dev$2f$Projects$2f$website_builder$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["memo"])(function(_ref) {
    var _ref$size = _ref.size, size = _ref$size === void 0 ? '1em' : _ref$size, style = _ref.style, rest = _objectWithoutProperties(_ref, _excluded);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Dev$2f$Projects$2f$website_builder$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxs"])("svg", _objectSpread(_objectSpread({
        fill: "currentColor",
        fillRule: "evenodd",
        height: size,
        style: _objectSpread({
            flex: 'none',
            lineHeight: 1
        }, style),
        viewBox: "0 0 24 24",
        width: size,
        xmlns: "http://www.w3.org/2000/svg"
    }, rest), {}, {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Dev$2f$Projects$2f$website_builder$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])("title", {
                children: __TURBOPACK__imported__module__$5b$project$5d2f$Dev$2f$Projects$2f$website_builder$2f$node_modules$2f40$lobehub$2f$icons$2f$es$2f$Bailian$2f$style$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TITLE"]
            }),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Dev$2f$Projects$2f$website_builder$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])("path", {
                d: "M6.336 8.919v6.162l5.335-3.083L6.337 8.92z",
                fillOpacity: ".4"
            }),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Dev$2f$Projects$2f$website_builder$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])("path", {
                d: "M21.394 5.288s-.006-.006-.01-.006L17.01 2.754 6.336 8.92l5.335 3.082 9.701-5.6.016-.01a.635.635 0 00.006-1.1v-.003z",
                fillOpacity: ".8"
            }),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Dev$2f$Projects$2f$website_builder$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])("path", {
                d: "M21.71 12.465a.62.62 0 00-.316.085s-.006 0-.009.003l-4.375 2.528 5.05 2.915h.006a2.06 2.06 0 00.28-1.04v-3.855a.637.637 0 00-.636-.636z"
            }),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Dev$2f$Projects$2f$website_builder$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])("path", {
                d: "M22.06 17.996l-5.05-2.915L6.34 21.242l4.27 2.465s.016.006.022.012a2.102 2.102 0 002.093 0c.006-.003.016-.006.022-.012l8.538-4.93c.003 0 .006-.003.01-.006.321-.183.589-.45.775-.772h-.006l-.004-.003z",
                fillOpacity: ".8"
            }),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Dev$2f$Projects$2f$website_builder$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])("path", {
                d: "M11.672 11.998l-5.336 3.083-1.444.832-3.605 2.083H1.28c.173.303.416.555.709.738l.078.044.016.01.02.012 4.232 2.442 10.671-6.161-5.335-3.082z"
            }),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Dev$2f$Projects$2f$website_builder$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])("path", {
                d: "M12.74.29c-.1-.06-.208-.107-.315-.148-.02-.006-.038-.016-.057-.022a2.121 2.121 0 00-.7-.12c-.233 0-.457.038-.668.11l-.031.01a2.196 2.196 0 00-.372.17L2.068 5.222s-.003 0-.006.003c-.324.183-.592.451-.781.773h.006l5.049 2.918L17.01 2.758 12.74.29z",
                fillOpacity: ".6"
            }),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Dev$2f$Projects$2f$website_builder$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])("path", {
                d: "M1.287 6.001H1.28A2.06 2.06 0 001 7.041v9.915c0 .378.1.735.28 1.043h.007l5.049-2.918V8.919l-5.05-2.918z",
                fillOpacity: ".3"
            })
        ]
    }));
});
const __TURBOPACK__default__export__ = Icon;
}),
"[project]/Dev/Projects/website_builder/node_modules/@lobehub/icons/es/Bailian/components/Text.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Dev$2f$Projects$2f$website_builder$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Dev/Projects/website_builder/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Dev$2f$Projects$2f$website_builder$2f$node_modules$2f40$lobehub$2f$icons$2f$es$2f$Bailian$2f$style$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Dev/Projects/website_builder/node_modules/@lobehub/icons/es/Bailian/style.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Dev$2f$Projects$2f$website_builder$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Dev/Projects/website_builder/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-runtime.js [app-ssr] (ecmascript)");
'use client';
function _typeof(o) {
    "@babel/helpers - typeof";
    return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o) {
        return typeof o;
    } : function(o) {
        return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
    }, _typeof(o);
}
var _excluded = [
    "size",
    "style"
];
function ownKeys(e, r) {
    var t = Object.keys(e);
    if (Object.getOwnPropertySymbols) {
        var o = Object.getOwnPropertySymbols(e);
        r && (o = o.filter(function(r) {
            return Object.getOwnPropertyDescriptor(e, r).enumerable;
        })), t.push.apply(t, o);
    }
    return t;
}
function _objectSpread(e) {
    for(var r = 1; r < arguments.length; r++){
        var t = null != arguments[r] ? arguments[r] : {};
        r % 2 ? ownKeys(Object(t), !0).forEach(function(r) {
            _defineProperty(e, r, t[r]);
        }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function(r) {
            Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
        });
    }
    return e;
}
function _defineProperty(obj, key, value) {
    key = _toPropertyKey(key);
    if (key in obj) {
        Object.defineProperty(obj, key, {
            value: value,
            enumerable: true,
            configurable: true,
            writable: true
        });
    } else {
        obj[key] = value;
    }
    return obj;
}
function _toPropertyKey(t) {
    var i = _toPrimitive(t, "string");
    return "symbol" == _typeof(i) ? i : String(i);
}
function _toPrimitive(t, r) {
    if ("object" != _typeof(t) || !t) return t;
    var e = t[Symbol.toPrimitive];
    if (void 0 !== e) {
        var i = e.call(t, r || "default");
        if ("object" != _typeof(i)) return i;
        throw new TypeError("@@toPrimitive must return a primitive value.");
    }
    return ("string" === r ? String : Number)(t);
}
function _objectWithoutProperties(source, excluded) {
    if (source == null) return {};
    var target = _objectWithoutPropertiesLoose(source, excluded);
    var key, i;
    if (Object.getOwnPropertySymbols) {
        var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
        for(i = 0; i < sourceSymbolKeys.length; i++){
            key = sourceSymbolKeys[i];
            if (excluded.indexOf(key) >= 0) continue;
            if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
            target[key] = source[key];
        }
    }
    return target;
}
function _objectWithoutPropertiesLoose(source, excluded) {
    if (source == null) return {};
    var target = {};
    var sourceKeys = Object.keys(source);
    var key, i;
    for(i = 0; i < sourceKeys.length; i++){
        key = sourceKeys[i];
        if (excluded.indexOf(key) >= 0) continue;
        target[key] = source[key];
    }
    return target;
}
;
;
;
;
var Icon = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Dev$2f$Projects$2f$website_builder$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["memo"])(function(_ref) {
    var _ref$size = _ref.size, size = _ref$size === void 0 ? '1em' : _ref$size, style = _ref.style, rest = _objectWithoutProperties(_ref, _excluded);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Dev$2f$Projects$2f$website_builder$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxs"])("svg", _objectSpread(_objectSpread({
        fill: "currentColor",
        fillRule: "evenodd",
        height: size,
        style: _objectSpread({
            flex: 'none',
            lineHeight: 1
        }, style),
        viewBox: "0 0 114 24",
        xmlns: "http://www.w3.org/2000/svg"
    }, rest), {}, {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Dev$2f$Projects$2f$website_builder$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])("title", {
                children: __TURBOPACK__imported__module__$5b$project$5d2f$Dev$2f$Projects$2f$website_builder$2f$node_modules$2f40$lobehub$2f$icons$2f$es$2f$Bailian$2f$style$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TITLE"]
            }),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Dev$2f$Projects$2f$website_builder$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])("path", {
                d: "M3.004 22V2.782h6.807v1.825c-.115 2.203-.612 4.028-1.483 5.477 1.047 1.277 1.569 2.784 1.569 4.523.057 2.956-1.253 4.405-3.927 4.348v-2.088c1.282 0 1.918-.84 1.918-2.522.058-1.563-.493-2.926-1.66-4.085C7.1 8.578 7.54 6.695 7.54 4.607H5.358V22H3h.004zM10.6 4.955V3.13h12.044v1.825h-1.396v14.261c.057 1.683-.871 2.522-2.794 2.522h-2.008v-1.826h1.133c.814.058 1.192-.262 1.134-.957v-14h-8.117.004zm.35 12.784V6.867h6.284v8.174c.058 1.855-.842 2.755-2.707 2.698H10.95zm2.09-1.74h.962c.756 0 1.133-.376 1.133-1.13V8.607H13.04v7.392zm13.178-2.87V2.783h16.928v7.216c0 2.145-.99 3.19-2.966 3.132h-4.013v2.001h7.419v1.912h-7.419v2.35h8.553v1.653H24.648v-1.653H33.2v-2.35h-7.418v-1.912H33.2V13.13h-6.983zm2.621-1.825H33.2V8.87h-4.362v2.435zm10.384 0c.871 0 1.31-.434 1.31-1.306v-1.13H36.17v2.436h3.056-.004zM28.838 4.607v2.436H33.2V4.607h-4.362zm11.69 0h-4.362v2.436h4.363V4.607zm6.458 6.525V9.221h20.07v1.911h-10.56c-1.282 2.841-2.995 5.22-5.147 7.13 4.362 0 8.026-.171 10.996-.52a31.512 31.512 0 00-1.483-3.216h2.444c1.22 1.973 2.182 4.203 2.88 6.696h-2.707c0-.114-.029-.262-.086-.434a9.095 9.095 0 01-.35-1.13c-4.596.463-8.901.697-12.914.697h-1.66v-2.088c2.095-2.26 3.607-4.638 4.54-7.13h-6.023v-.005zm1.836-6.09V3.04H65.23V5.04H48.822zm20.593-.087V3.044h19.898v1.911h-8.639c-.058.868-.234 1.654-.522 2.35h7.419v10.958c.058 2.03-1.019 3.012-3.229 2.955H71.251V7.305h5.845c.115-.348.263-.9.436-1.654 0-.29.028-.52.086-.696h-8.203zm4.453 14.524h9.772c.87.057 1.31-.406 1.31-1.392v-2.87H73.868v4.261zm0-10.262v4.085H84.95V9.217H73.868zm25.217-3.914v-1.74h3.143c.057-.175.115-.433.172-.781.115-.348.173-.61.173-.782h2.707c-.115.52-.263 1.044-.436 1.564h6.634v1.74h-7.155a11.442 11.442 0 01-.699 2h3.315v3.914h4.363v1.826h-4.363v5.915c.058 1.911-.903 2.84-2.879 2.783h-2.009v-1.826h1.047c.871.058 1.282-.29 1.22-1.043v-5.825h-4.974v-1.826c.115-.233.263-.552.435-.958.292-.52.493-.929.612-1.215h-1.396V7.833c-.699.172-1.397.29-2.095.348.057 3.885.813 6.84 2.267 8.87v1.478c.933-1.101 1.541-2.636 1.832-4.61h2.268c-.292 3.304-1.832 5.596-4.626 6.87v-1.654l.087-.172c-1.282-1.044-2.239-2.288-2.88-3.742-.756 2.665-2.21 4.872-4.362 6.611v-2.087c1.162-1.797 1.947-3.537 2.358-5.22.406-1.74.612-4.117.612-7.13V2.09H96.9v4.175c.583-.057 1.281-.233 2.095-.52V7.31h2.095c.115-.233.234-.581.349-1.044.172-.405.292-.724.349-.958h-2.707l.004-.004zM112 20.784c-2.617-1.334-4.071-3.622-4.362-6.868h2.181c.234 2.145.961 3.884 2.181 5.219v1.653-.004zm-19.808-9.566c-.349-1.797-.583-3.77-.698-5.915h1.746c.057 2.145.349 4.118.87 5.915h-1.918zm10.648-2.173a3.826 3.826 0 00-.35.695c-.172.291-.464.782-.87 1.478h2.707V9.045h-1.487z"
            })
        ]
    }));
});
const __TURBOPACK__default__export__ = Icon;
}),
"[project]/Dev/Projects/website_builder/node_modules/@lobehub/icons/es/Bailian/components/Combine.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Dev$2f$Projects$2f$website_builder$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Dev/Projects/website_builder/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Dev$2f$Projects$2f$website_builder$2f$node_modules$2f40$lobehub$2f$icons$2f$es$2f$features$2f$IconCombine$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Dev/Projects/website_builder/node_modules/@lobehub/icons/es/features/IconCombine/index.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Dev$2f$Projects$2f$website_builder$2f$node_modules$2f40$lobehub$2f$icons$2f$es$2f$Bailian$2f$style$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Dev/Projects/website_builder/node_modules/@lobehub/icons/es/Bailian/style.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Dev$2f$Projects$2f$website_builder$2f$node_modules$2f40$lobehub$2f$icons$2f$es$2f$Bailian$2f$components$2f$Color$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Dev/Projects/website_builder/node_modules/@lobehub/icons/es/Bailian/components/Color.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Dev$2f$Projects$2f$website_builder$2f$node_modules$2f40$lobehub$2f$icons$2f$es$2f$Bailian$2f$components$2f$Mono$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Dev/Projects/website_builder/node_modules/@lobehub/icons/es/Bailian/components/Mono.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Dev$2f$Projects$2f$website_builder$2f$node_modules$2f40$lobehub$2f$icons$2f$es$2f$Bailian$2f$components$2f$Text$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Dev/Projects/website_builder/node_modules/@lobehub/icons/es/Bailian/components/Text.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Dev$2f$Projects$2f$website_builder$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Dev/Projects/website_builder/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-runtime.js [app-ssr] (ecmascript)");
'use client';
function _typeof(o) {
    "@babel/helpers - typeof";
    return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o) {
        return typeof o;
    } : function(o) {
        return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
    }, _typeof(o);
}
var _excluded = [
    "type"
];
function ownKeys(e, r) {
    var t = Object.keys(e);
    if (Object.getOwnPropertySymbols) {
        var o = Object.getOwnPropertySymbols(e);
        r && (o = o.filter(function(r) {
            return Object.getOwnPropertyDescriptor(e, r).enumerable;
        })), t.push.apply(t, o);
    }
    return t;
}
function _objectSpread(e) {
    for(var r = 1; r < arguments.length; r++){
        var t = null != arguments[r] ? arguments[r] : {};
        r % 2 ? ownKeys(Object(t), !0).forEach(function(r) {
            _defineProperty(e, r, t[r]);
        }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function(r) {
            Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
        });
    }
    return e;
}
function _defineProperty(obj, key, value) {
    key = _toPropertyKey(key);
    if (key in obj) {
        Object.defineProperty(obj, key, {
            value: value,
            enumerable: true,
            configurable: true,
            writable: true
        });
    } else {
        obj[key] = value;
    }
    return obj;
}
function _toPropertyKey(t) {
    var i = _toPrimitive(t, "string");
    return "symbol" == _typeof(i) ? i : String(i);
}
function _toPrimitive(t, r) {
    if ("object" != _typeof(t) || !t) return t;
    var e = t[Symbol.toPrimitive];
    if (void 0 !== e) {
        var i = e.call(t, r || "default");
        if ("object" != _typeof(i)) return i;
        throw new TypeError("@@toPrimitive must return a primitive value.");
    }
    return ("string" === r ? String : Number)(t);
}
function _objectWithoutProperties(source, excluded) {
    if (source == null) return {};
    var target = _objectWithoutPropertiesLoose(source, excluded);
    var key, i;
    if (Object.getOwnPropertySymbols) {
        var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
        for(i = 0; i < sourceSymbolKeys.length; i++){
            key = sourceSymbolKeys[i];
            if (excluded.indexOf(key) >= 0) continue;
            if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
            target[key] = source[key];
        }
    }
    return target;
}
function _objectWithoutPropertiesLoose(source, excluded) {
    if (source == null) return {};
    var target = {};
    var sourceKeys = Object.keys(source);
    var key, i;
    for(i = 0; i < sourceKeys.length; i++){
        key = sourceKeys[i];
        if (excluded.indexOf(key) >= 0) continue;
        target[key] = source[key];
    }
    return target;
}
;
;
;
;
;
;
;
var Combine = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Dev$2f$Projects$2f$website_builder$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["memo"])(function(_ref) {
    var _ref$type = _ref.type, type = _ref$type === void 0 ? 'mono' : _ref$type, rest = _objectWithoutProperties(_ref, _excluded);
    var Icon = type === 'color' ? __TURBOPACK__imported__module__$5b$project$5d2f$Dev$2f$Projects$2f$website_builder$2f$node_modules$2f40$lobehub$2f$icons$2f$es$2f$Bailian$2f$components$2f$Color$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"] : __TURBOPACK__imported__module__$5b$project$5d2f$Dev$2f$Projects$2f$website_builder$2f$node_modules$2f40$lobehub$2f$icons$2f$es$2f$Bailian$2f$components$2f$Mono$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Dev$2f$Projects$2f$website_builder$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Dev$2f$Projects$2f$website_builder$2f$node_modules$2f40$lobehub$2f$icons$2f$es$2f$features$2f$IconCombine$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], _objectSpread({
        Icon: Icon,
        Text: __TURBOPACK__imported__module__$5b$project$5d2f$Dev$2f$Projects$2f$website_builder$2f$node_modules$2f40$lobehub$2f$icons$2f$es$2f$Bailian$2f$components$2f$Text$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"],
        "aria-label": __TURBOPACK__imported__module__$5b$project$5d2f$Dev$2f$Projects$2f$website_builder$2f$node_modules$2f40$lobehub$2f$icons$2f$es$2f$Bailian$2f$style$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TITLE"],
        spaceMultiple: __TURBOPACK__imported__module__$5b$project$5d2f$Dev$2f$Projects$2f$website_builder$2f$node_modules$2f40$lobehub$2f$icons$2f$es$2f$Bailian$2f$style$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["COMBINE_SPACE_MULTIPLE"],
        textMultiple: __TURBOPACK__imported__module__$5b$project$5d2f$Dev$2f$Projects$2f$website_builder$2f$node_modules$2f40$lobehub$2f$icons$2f$es$2f$Bailian$2f$style$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["COMBINE_TEXT_MULTIPLE"]
    }, rest));
});
const __TURBOPACK__default__export__ = Combine;
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__06d4d106._.js.map