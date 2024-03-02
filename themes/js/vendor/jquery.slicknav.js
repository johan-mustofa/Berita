!function(p, a) {
    var n = {
        label: "MENU",
        duplicate: !0,
        duration: 200,
        easingOpen: "swing",
        easingClose: "swing",
        closedSymbol: "&#9658;",
        openedSymbol: "&#9660;",
        prependTo: "body",
        appendTo: "",
        parentTag: "a",
        closeOnClick: !1,
        allowParentLinks: !1,
        nestedParentLinks: !0,
        showChildren: !1,
        removeIds: !0,
        removeClasses: !1,
        removeStyles: !1,
        brand: "",
        animations: "jquery",
        init: function() {},
        beforeOpen: function() {},
        beforeClose: function() {},
        afterOpen: function() {},
        afterClose: function() {}
    }
      , i = "slicknav"
      , u = "slicknav"
      , l = 40
      , r = 13
      , c = 27
      , d = 37
      , m = 39
      , h = 32
      , v = 38;
    function s(e, t) {
        this.element = e,
        this.settings = p.extend({}, n, t),
        this.settings.duplicate || t.hasOwnProperty("removeIds") || (this.settings.removeIds = !1),
        this._defaults = n,
        this._name = i,
        this.init()
    }
    s.prototype.init = function() {
        var e, s = this, t = p(this.element), o = this.settings;
        o.duplicate ? s.mobileNav = t.clone() : s.mobileNav = t,
        o.removeIds && (s.mobileNav.removeAttr("id"),
        s.mobileNav.find("*").each(function(e, t) {
            p(t).removeAttr("id")
        })),
        o.removeClasses && (s.mobileNav.removeAttr("class"),
        s.mobileNav.find("*").each(function(e, t) {
            p(t).removeAttr("class")
        })),
        o.removeStyles && (s.mobileNav.removeAttr("style"),
        s.mobileNav.find("*").each(function(e, t) {
            p(t).removeAttr("style")
        })),
        e = u + "_icon",
        "" === o.label && (e += " " + u + "_no-text"),
        "a" == o.parentTag && (o.parentTag = 'a href="#"'),
        s.mobileNav.attr("class", u + "_nav"),
        n = p('<div class="' + u + '_menu"></div>'),
        "" !== o.brand && (t = p('<div class="' + u + '_brand">' + o.brand + "</div>"),
        p(n).append(t)),
        s.btn = p(['<div class="container"><' + o.parentTag + ' aria-haspopup="true" role="button" tabindex="0" class="' + u + "_btn " + u + '_collapsed">', '<span class="' + u + '_menutxt">' + o.label + "</span>", '<span class="' + e + '">', '<span class="ti-menu"></span>', '<span class="ti-close"></span>', "</span>", "</" + o.parentTag + "></div>"].join("")),
        p(n).append(s.btn),
        "" !== o.appendTo ? p(o.appendTo).append(n) : p(o.prependTo).prepend(n),
        n.append(s.mobileNav);
        var n = s.mobileNav.find("li");
        p(n).each(function() {
            var e, t, n, a = p(this), i = {};
            i.children = a.children("ul").attr("role", "menu"),
            a.data("menu", i),
            0 < i.children.length ? (n = a.contents(),
            e = !1,
            t = [],
            p(n).each(function() {
                return !p(this).is("ul") && (t.push(this),
                void (p(this).is("a") && (e = !0)))
            }),
            i = p("<" + o.parentTag + ' role="menuitem" aria-haspopup="true" tabindex="-1" class="' + u + '_item"/>'),
            o.allowParentLinks && !o.nestedParentLinks && e ? p(t).wrapAll('<span class="' + u + "_parent-link " + u + '_row"/>').parent() : p(t).wrapAll(i).parent().addClass(u + "_row"),
            o.showChildren ? a.addClass(u + "_open") : a.addClass(u + "_collapsed"),
            a.addClass(u + "_parent"),
            n = p('<span class="' + u + '_arrow">' + (o.showChildren ? o.openedSymbol : o.closedSymbol) + "</span>"),
            o.allowParentLinks && !o.nestedParentLinks && e && (n = n.wrap(i).parent()),
            p(t).last().after(n)) : 0 === a.children().length && a.addClass(u + "_txtnode"),
            a.children("a").attr("role", "menuitem").click(function(e) {
                o.closeOnClick && !p(e.target).parent().closest("li").hasClass(u + "_parent") && p(s.btn).click()
            }),
            o.closeOnClick && o.allowParentLinks && (a.children("a").children("a").click(function(e) {
                p(s.btn).click()
            }),
            a.find("." + u + "_parent-link a:not(." + u + "_item)").click(function(e) {
                p(s.btn).click()
            }))
        }),
        p(n).each(function() {
            var e = p(this).data("menu");
            o.showChildren || s._visibilityToggle(e.children, null, !1, null, !0)
        }),
        s._visibilityToggle(s.mobileNav, null, !1, "init", !0),
        s.mobileNav.attr("role", "menu"),
        p(a).mousedown(function() {
            s._outlines(!1)
        }),
        p(a).keyup(function() {
            s._outlines(!0)
        }),
        p(s.btn).click(function(e) {
            e.preventDefault(),
            s._menuToggle()
        }),
        s.mobileNav.on("click", "." + u + "_item", function(e) {
            e.preventDefault(),
            s._itemClick(p(this))
        }),
        p(s.btn).keydown(function(e) {
            var t = e || event;
            switch (t.keyCode) {
            case r:
            case h:
            case l:
                e.preventDefault(),
                t.keyCode === l && p(s.btn).hasClass(u + "_open") || s._menuToggle(),
                p(s.btn).next().find('[role="menuitem"]').first().focus()
            }
        }),
        s.mobileNav.on("keydown", "." + u + "_item", function(e) {
            switch ((e || event).keyCode) {
            case r:
                e.preventDefault(),
                s._itemClick(p(e.target));
                break;
            case m:
                e.preventDefault(),
                p(e.target).parent().hasClass(u + "_collapsed") && s._itemClick(p(e.target)),
                p(e.target).next().find('[role="menuitem"]').first().focus()
            }
        }),
        s.mobileNav.on("keydown", '[role="menuitem"]', function(e) {
            switch ((e || event).keyCode) {
            case l:
                e.preventDefault();
                var t = (a = (n = p(e.target).parent().parent().children().children('[role="menuitem"]:visible')).index(e.target)) + 1;
                n.length <= t && (t = 0),
                n.eq(t).focus();
                break;
            case v:
                e.preventDefault();
                var n, a = (n = p(e.target).parent().parent().children().children('[role="menuitem"]:visible')).index(e.target);
                n.eq(a - 1).focus();
                break;
            case d:
                e.preventDefault(),
                p(e.target).parent().parent().parent().hasClass(u + "_open") ? ((a = p(e.target).parent().parent().prev()).focus(),
                s._itemClick(a)) : p(e.target).parent().parent().hasClass(u + "_nav") && (s._menuToggle(),
                p(s.btn).focus());
                break;
            case c:
                e.preventDefault(),
                s._menuToggle(),
                p(s.btn).focus()
            }
        }),
        o.allowParentLinks && o.nestedParentLinks && p("." + u + "_item a").click(function(e) {
            e.stopImmediatePropagation()
        })
    }
    ,
    s.prototype._menuToggle = function(e) {
        var t = this
          , n = t.btn
          , a = t.mobileNav;
        n.hasClass(u + "_collapsed") ? (n.removeClass(u + "_collapsed"),
        n.addClass(u + "_open")) : (n.removeClass(u + "_open"),
        n.addClass(u + "_collapsed")),
        n.addClass(u + "_animating"),
        t._visibilityToggle(a, n.parent(), !0, n)
    }
    ,
    s.prototype._itemClick = function(e) {
        var t = this.settings
          , n = e.data("menu");
        n || ((n = {}).arrow = e.children("." + u + "_arrow"),
        n.ul = e.next("ul"),
        n.parent = e.parent(),
        n.parent.hasClass(u + "_parent-link") && (n.parent = e.parent().parent(),
        n.ul = e.parent().next("ul")),
        e.data("menu", n)),
        n.parent.hasClass(u + "_collapsed") ? (n.arrow.html(t.openedSymbol),
        n.parent.removeClass(u + "_collapsed"),
        n.parent.addClass(u + "_open")) : (n.arrow.html(t.closedSymbol),
        n.parent.addClass(u + "_collapsed"),
        n.parent.removeClass(u + "_open")),
        n.parent.addClass(u + "_animating"),
        this._visibilityToggle(n.ul, n.parent, !0, e)
    }
    ,
    s.prototype._visibilityToggle = function(n, e, t, a, i) {
        var s = this
          , o = s.settings
          , l = s._getActionItems(n)
          , r = 0;
        function c(e, t) {
            p(e).removeClass(u + "_animating"),
            p(t).removeClass(u + "_animating"),
            i || o.afterOpen(e)
        }
        function d(e, t) {
            n.attr("aria-hidden", "true"),
            l.attr("tabindex", "-1"),
            s._setVisAttr(n, !0),
            n.hide(),
            p(e).removeClass(u + "_animating"),
            p(t).removeClass(u + "_animating"),
            i ? "init" == e && o.init() : o.afterClose(e)
        }
        t && (r = o.duration),
        n.hasClass(u + "_hidden") ? (n.removeClass(u + "_hidden"),
        i || o.beforeOpen(a),
        "jquery" === o.animations ? n.stop(!0, !0).slideDown(r, o.easingOpen, function() {
            c(a, e)
        }) : "velocity" === o.animations && n.velocity("finish").velocity("slideDown", {
            duration: r,
            easing: o.easingOpen,
            complete: function() {
                c(a, e)
            }
        }),
        n.attr("aria-hidden", "false"),
        l.attr("tabindex", "0"),
        s._setVisAttr(n, !1)) : (n.addClass(u + "_hidden"),
        i || o.beforeClose(a),
        "jquery" === o.animations ? n.stop(!0, !0).slideUp(r, this.settings.easingClose, function() {
            d(a, e)
        }) : "velocity" === o.animations && n.velocity("finish").velocity("slideUp", {
            duration: r,
            easing: o.easingClose,
            complete: function() {
                d(a, e)
            }
        }))
    }
    ,
    s.prototype._setVisAttr = function(e, t) {
        var n = this
          , e = e.children("li").children("ul").not("." + u + "_hidden");
        t ? e.each(function() {
            var e = p(this);
            e.attr("aria-hidden", "true"),
            n._getActionItems(e).attr("tabindex", "-1"),
            n._setVisAttr(e, t)
        }) : e.each(function() {
            var e = p(this);
            e.attr("aria-hidden", "false"),
            n._getActionItems(e).attr("tabindex", "0"),
            n._setVisAttr(e, t)
        })
    }
    ,
    s.prototype._getActionItems = function(e) {
        var t, n, a = e.data("menu");
        return a || (a = {},
        n = (t = e.children("li")).find("a"),
        a.links = n.add(t.find("." + u + "_item")),
        e.data("menu", a)),
        a.links
    }
    ,
    s.prototype._outlines = function(e) {
        e ? p("." + u + "_item, ." + u + "_btn").css("outline", "") : p("." + u + "_item, ." + u + "_btn").css("outline", "none")
    }
    ,
    s.prototype.toggle = function() {
        this._menuToggle()
    }
    ,
    s.prototype.open = function() {
        this.btn.hasClass(u + "_collapsed") && this._menuToggle()
    }
    ,
    s.prototype.close = function() {
        this.btn.hasClass(u + "_open") && this._menuToggle()
    }
    ,
    p.fn[i] = function(t) {
        var n, a = arguments;
        return void 0 === t || "object" == typeof t ? this.each(function() {
            p.data(this, "plugin_" + i) || p.data(this, "plugin_" + i, new s(this,t))
        }) : "string" == typeof t && "_" !== t[0] && "init" !== t ? (this.each(function() {
            var e = p.data(this, "plugin_" + i);
            e instanceof s && "function" == typeof e[t] && (n = e[t].apply(e, Array.prototype.slice.call(a, 1)))
        }),
        void 0 !== n ? n : this) : void 0
    }
}(jQuery, document, window);
