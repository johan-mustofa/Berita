/*!
 * Theia Sticky Sidebar v1.7.0
 * https://github.com/WeCodePixels/theia-sticky-sidebar
 *
 * Glues your website's sidebars, making them permanently visible while scrolling.
 *
 * Copyright 2013-2016 WeCodePixels and other contributors
 * Released under the MIT license
 */
!function(g) {
    g.fn.theiaStickySidebar = function(i) {
        var t, e;
        function o(i, t) {
            return !0 === i.initialized || !(g("body").width() < i.minWidth) && (t = t,
            (l = i).initialized = !0,
            0 === g("#theia-sticky-sidebar-stylesheet-" + l.namespace).length && g("head").append(g('<style id="theia-sticky-sidebar-stylesheet-' + l.namespace + '">.theiaStickySidebar:after {content: ""; display: table; clear: both;}</style>')),
            t.each(function() {
                var e, i = {};
                i.sidebar = g(this),
                i.options = l || {},
                i.container = g(i.options.containerSelector),
                0 == i.container.length && (i.container = i.sidebar.parent()),
                i.sidebar.parents().css("-webkit-transform", "none"),
                i.sidebar.css({
                    position: i.options.defaultPosition,
                    overflow: "visible",
                    "-webkit-box-sizing": "border-box",
                    "-moz-box-sizing": "border-box",
                    "box-sizing": "border-box"
                }),
                i.stickySidebar = i.sidebar.find(".theiaStickySidebar"),
                0 == i.stickySidebar.length && (e = /(?:text|application)\/(?:x-)?(?:javascript|ecmascript)/i,
                i.sidebar.find("script").filter(function(i, t) {
                    return 0 === t.type.length || t.type.match(e)
                }).remove(),
                i.stickySidebar = g("<div>").addClass("theiaStickySidebar").append(i.sidebar.children()),
                i.sidebar.append(i.stickySidebar)),
                i.marginBottom = parseInt(i.sidebar.css("margin-bottom")),
                i.paddingTop = parseInt(i.sidebar.css("padding-top")),
                i.paddingBottom = parseInt(i.sidebar.css("padding-bottom"));
                var t, o, a, n = i.stickySidebar.offset().top, s = i.stickySidebar.outerHeight();
                function b() {
                    i.fixedScrollTop = 0,
                    i.sidebar.css({
                        "min-height": "1px"
                    }),
                    i.stickySidebar.css({
                        position: "static",
                        width: "",
                        transform: "none"
                    })
                }
                i.stickySidebar.css("padding-top", 1),
                i.stickySidebar.css("padding-bottom", 1),
                n -= i.stickySidebar.offset().top,
                s = i.stickySidebar.outerHeight() - s - n,
                0 == n ? (i.stickySidebar.css("padding-top", 0),
                i.stickySidebarPaddingTop = 0) : i.stickySidebarPaddingTop = 1,
                0 == s ? (i.stickySidebar.css("padding-bottom", 0),
                i.stickySidebarPaddingBottom = 0) : i.stickySidebarPaddingBottom = 1,
                i.previousScrollTop = null,
                i.fixedScrollTop = 0,
                b(),
                i.onScroll = function(i) {
                    if (i.stickySidebar.is(":visible"))
                        if (g("body").width() < i.options.minWidth)
                            b();
                        else {
                            if (i.options.disableOnResponsiveLayouts)
                                if (i.sidebar.outerWidth("none" == i.sidebar.css("float")) + 50 > i.container.width())
                                    return void b();
                            var t, e, o, a, n, s, d, r, c = g(document).scrollTop(), p = "static";
                            c >= i.sidebar.offset().top + (i.paddingTop - i.options.additionalMarginTop) && (e = i.paddingTop + l.additionalMarginTop,
                            n = i.paddingBottom + i.marginBottom + l.additionalMarginBottom,
                            o = i.sidebar.offset().top,
                            a = i.sidebar.offset().top + (s = i.container,
                            d = s.height(),
                            s.children().each(function() {
                                d = Math.max(d, g(this).height())
                            }),
                            d),
                            t = 0 + l.additionalMarginTop,
                            s = i.stickySidebar.outerHeight() + e + n < g(window).height() ? t + i.stickySidebar.outerHeight() : g(window).height() - i.marginBottom - i.paddingBottom - l.additionalMarginBottom,
                            e = o - c + i.paddingTop,
                            n = a - c - i.paddingBottom - i.marginBottom,
                            o = i.stickySidebar.offset().top - c,
                            a = i.previousScrollTop - c,
                            "fixed" == i.stickySidebar.css("position") && "modern" == i.options.sidebarBehavior && (o += a),
                            "stick-to-top" == i.options.sidebarBehavior && (o = l.additionalMarginTop),
                            "stick-to-bottom" == i.options.sidebarBehavior && (o = s - i.stickySidebar.outerHeight()),
                            o = 0 < a ? Math.min(o, t) : Math.max(o, s - i.stickySidebar.outerHeight()),
                            o = Math.max(o, e),
                            o = Math.min(o, n - i.stickySidebar.outerHeight()),
                            p = ((n = i.container.height() == i.stickySidebar.outerHeight()) || o != t) && (n || o != s - i.stickySidebar.outerHeight()) ? c + o - i.sidebar.offset().top - i.paddingTop <= l.additionalMarginTop ? "static" : "absolute" : "fixed"),
                            "fixed" == p ? (r = g(document).scrollLeft(),
                            i.stickySidebar.css({
                                position: "fixed",
                                width: h(i.stickySidebar) + "px",
                                transform: "translateY(" + o + "px)",
                                left: i.sidebar.offset().left + parseInt(i.sidebar.css("padding-left")) - r + "px",
                                top: "0px"
                            })) : "absolute" == p ? (r = {},
                            "absolute" != i.stickySidebar.css("position") && (r.position = "absolute",
                            r.transform = "translateY(" + (c + o - i.sidebar.offset().top - i.stickySidebarPaddingTop - i.stickySidebarPaddingBottom) + "px)",
                            r.top = "0px"),
                            r.width = h(i.stickySidebar) + "px",
                            r.left = "",
                            i.stickySidebar.css(r)) : "static" == p && b(),
                            "static" != p && 1 == i.options.updateSidebarHeight && i.sidebar.css({
                                "min-height": i.stickySidebar.outerHeight() + i.stickySidebar.offset().top - i.sidebar.offset().top + i.paddingBottom
                            }),
                            i.previousScrollTop = c
                        }
                }
                ,
                i.onScroll(i),
                g(document).on("scroll." + i.options.namespace, (t = i,
                function() {
                    t.onScroll(t)
                }
                )),
                g(window).on("resize." + i.options.namespace, (o = i,
                function() {
                    o.stickySidebar.css({
                        position: "static"
                    }),
                    o.onScroll(o)
                }
                )),
                "undefined" != typeof ResizeSensor && new ResizeSensor(i.stickySidebar[0],(a = i,
                function() {
                    a.onScroll(a)
                }
                ))
            }),
            !0);
            var l
        }
        function h(i) {
            var t;
            try {
                t = i[0].getBoundingClientRect().width
            } catch (i) {}
            return void 0 === t && (t = i.width()),
            t
        }
        return (i = g.extend({
            containerSelector: "",
            additionalMarginTop: 100,
            additionalMarginBottom: 0,
            updateSidebarHeight: !0,
            minWidth: 0,
            disableOnResponsiveLayouts: !0,
            sidebarBehavior: "modern",
            defaultPosition: "relative",
            namespace: "TSS"
        }, i)).additionalMarginTop = parseInt(i.additionalMarginTop) || 0,
        i.additionalMarginBottom = parseInt(i.additionalMarginBottom) || 0,
        o(t = i, e = this) || (console.log("TSS: Body width smaller than options.minWidth. Init is delayed."),
        g(document).on("scroll." + t.namespace, function(t, e) {
            return function(i) {
                o(t, e) && g(this).unbind(i)
            }
        }(t, e)),
        g(window).on("resize." + t.namespace, function(t, e) {
            return function(i) {
                o(t, e) && g(this).unbind(i)
            }
        }(t, e))),
        this
    }
}(jQuery);
