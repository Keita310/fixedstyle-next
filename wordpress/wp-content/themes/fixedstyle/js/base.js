new function() {
    var e = "footer";
    var b = "fixed-footer";

    function a() {
        var h = document.getElementsByTagName("body")[0].clientHeight;
        document.getElementById(e).style.top = "0px";
        var i = document.getElementById(e).offsetTop;
        var f = document.getElementById(e).offsetHeight;
        if (window.innerHeight) {
            var g = window.innerHeight
        } else {
            if (document.documentElement && document.documentElement.clientHeight != 0) {
                var g = document.documentElement.clientHeight
            }
        }
        if (i + f < g) {
            document.getElementById(e).style.position = "relative";
            document.getElementById(e).style.top = (g - f - i - 1) + "px";
            if (document.body.classList) {
                document.body.classList.add(b)
            } else {
                document.body.className += " " + b
            }
        } else {
            if (document.body.classList) {
                document.body.classList.remove(b)
            } else {
                document.body.className = document.body.className.replace(new RegExp("(^|\\b)" + b + "(\\b|$)", "gi"), " ")
            }
        }
    }

    function c(h) {
        var i = document.createElement("div");
        var g = document.createTextNode("S");
        i.appendChild(g);
        i.style.visibility = "hidden";
        i.style.position = "absolute";
        i.style.top = "0";
        document.body.appendChild(i);
        var f = i.offsetHeight;

        function j() {
            if (f != i.offsetHeight) {
                h();
                f = i.offsetHeight
            }
        }
        setInterval(j, 1000)
    }

    function d(i, g, f) {
        try {
            i.addEventListener(g, f, false)
        } catch (h) {
            i.attachEvent("on" + g, f)
        }
    }
    d(window, "load", a);
    d(window, "load", function() {
        c(a)
    });
    d(window, "resize", a)
};
jQuery(function() {
    var a = jQuery("#page-top");
    a.hide();
    jQuery(window).scroll(function() {
        if (jQuery(this).scrollTop() > 400) {
            a.fadeIn()
        } else {
            a.fadeOut()
        }
    });
    a.click(function() {
        jQuery("body,html").animate({
            scrollTop: 0
        }, 800);
        return false
    })
});
(function(g, d, b) {
    function h() {
        return d("body").hasClass("mobile")
    }
    var c = {
        click: function(l) {
            var k = h();
            l.preventDefault();
            l.stopPropagation();
            if (!k || this.isClickable()) {
                if (k) {
                    this.getRoot().data("st-menu").collapseChildren(false);
                    d(".op").toggleClass("active");
                    d(".acordion_tree").slideToggle(0)
                }
                g.location.href = this.getLink().attr("href");
                return
            }
            this.toggle()
        },
        mouseenter: function() {
            this.expand()
        },
        mouseleave: function() {
            this.collapse()
        }
    };
    var i = (function() {
        function w(z, C, A, B) {
            if (!(this instanceof w)) {
                return new w(z)
            }
            C = C || {
                click: function() {},
                mouseenter: function() {},
                mouseleave: function() {}
            };
            this.$element = z;
            this.expanded = (typeof A !== "undefined") ? A : false;
            this.$icon = null;
            this.listener = C;
            this.mobile = (typeof B !== "undefined") ? B : true
        }
        w.prototype.getElement = function m() {
            return this.$element
        };
        w.prototype.hasParent = function y() {
            var z = false;
            this.$element.parents().each(function() {
                if (typeof d(this).data("st-menu-item") !== "undefined") {
                    return false
                }
            });
            return z
        };
        w.prototype.getRoot = function u() {
            var z = this.$element;
            this.$element.parents().each(function() {
                var A = d(this);
                if (typeof A.data("st-menu-item") !== "undefined") {
                    z = A
                }
            });
            return z
        };
        w.prototype.getIcon = function t() {
            this.$icon = this.$icon || d("<i></i>").prependTo(this.$element);
            return this.$icon
        };
        w.prototype.getLink = function s() {
            return this.$element.find("> a").eq(0)
        };
        w.prototype.hasChildren = function q() {
            return !!this.$element.find("> ul").length
        };
        w.prototype.isExpanded = function l() {
            return this.expanded
        };
        w.prototype.isClickable = function o() {
            if (!this.getLink().length) {
                return false
            }
            return (!this.hasChildren() || (this.hasChildren() && this.isExpanded()))
        };
        w.prototype.initialize = function k() {
            this.$icon = d("<i></i>");
            this.$element.prepend(this.$icon);
            this.refresh(false);
            this.addEventListener()
        };
        w.prototype.refresh = function r(z) {
            z = (typeof z !== "undefined") ? z : true;
            if (this.expanded || !this.hasChildren()) {
                this.expand(z)
            } else {
                this.collapse(z)
            }
        };
        w.prototype.expand = function x(B) {
            var z = this;
            var A = this.$element.find("> ul");
            this.expanded = true;
            B = (typeof B !== "undefined") ? B : true;
            if (B && A.length) {
                this.$element.find("> ul").slideDown("fast", function() {
                    z.getIcon().attr({
                        "class": "fa fa-angle-right"
                    });
                    z.$element.removeClass("menu-item-collapsed").addClass("menu-item-expanded")
                })
            } else {
                A.show();
                this.getIcon().attr({
                    "class": "fa fa-angle-right"
                });
                this.$element.removeClass("menu-item-collapsed").addClass("menu-item-expanded")
            }
        };
        w.prototype.collapse = function v(B) {
            var z = this;
            var A = this.$element.find("> ul");
            this.expanded = false;
            B = (typeof B !== "undefined") ? B : true;
            if (B && A.length) {
                A.slideUp("fast", function() {
                    z.getIcon().attr({
                        "class": "fa fa-angle-down"
                    });
                    z.$element.removeClass("menu-item-expanded").addClass("menu-item-collapsed")
                })
            } else {
                A.hide();
                if (A.length) {
                    this.getIcon().attr({
                        "class": "fa fa-angle-down"
                    })
                }
                this.$element.removeClass("menu-item-expanded").addClass("menu-item-collapsed")
            }
        };
        w.prototype.toggle = function p() {
            if (!this.hasChildren()) {
                return
            }
            this.expanded ? this.collapse() : this.expand()
        };
        w.prototype.addEventListener = function n() {
            this.$element.click(d.proxy(this.listener.click, this));
            if (!this.mobile) {
                this.$element.hover(d.proxy(this.listener.mouseenter, this), d.proxy(this.listener.mouseleave, this))
            }
        };
        return w
    }());
    var e = (function() {
        function m(p, q) {
            if (!(this instanceof m)) {
                return new m()
            }
            this.$element = p;
            this.mobile = (typeof q !== "undefined") ? q : true
        }
        m.prototype.initialize = function k() {
            var p = this;
            this.getMenuItems().each(function() {
                var r = d(this);
                var q = new i(r, c, false, p.mobile);
                r.data("st-menu", p);
                r.data("st-menu-item", q);
                q.initialize()
            });
            this.addEventListener()
        };
        m.prototype.getMenuItems = function l() {
            return this.$element.find("li")
        };
        m.prototype.collapseChildren = function o(p) {
            this.getMenuItems().each(function() {
                d(this).data("st-menu-item").collapse(p)
            })
        };
        m.prototype.addEventListener = function n() {
            var p = this;
            if (this.mobile) {
                return
            }
            this.$element.on("mouseleave", function() {
                p.collapseChildren()
            })
        };
        return m
    }());

    function a() {
        var l = d(".acordion_tree ul.menu");
        var k = h();
        l.each(function() {
            var m = d(this);
            var n = new e(m, k);
            m.data("st-menu", n);
            n.initialize()
        })
    }

    function j() {
        var k = d(".op");
        k.click(function(l) {
            var m = d(this);
            l.preventDefault();
            l.stopPropagation();
            m.toggleClass("active");
            d(".acordion_tree").slideToggle("normal")
        })
    }

    function f() {
        a();
        j()
    }
    d(f)
}(window, jQuery));
jQuery(function() {
    jQuery("ul.menu li").filter(function() {
        return !jQuery(this).closest(".acordion").length
    }).hover(function() {
        jQuery(">ul:not(:animated)", this).slideDown("fast")
    }, function() {
        jQuery(">ul", this).slideUp("fast")
    })
});
(function(b, a, c, d) {
    if (typeof c.fn.slick === "undefined") {
        return
    }
    c(function() {
        c("[data-slick]").slick()
    })
}(window, window.document, jQuery));
$(function() {
    $("p.hatenamark").each(function() {
        $(this).prepend('<i class="fa fa-question-circle"></i>')
    });
    $("p.checkmark").each(function() {
        $(this).prepend('<i class="fa fa-check-circle"></i>')
    });
    $(".check-ul li").each(function() {
        $(this).prepend('<i class="fa fa-check-circle"></i>')
    });
    $("p.attentionmark").each(function() {
        $(this).prepend('<i class="fa fa-exclamation-triangle"></i>')
    });
    $("p.memomark").each(function() {
        $(this).prepend('<i class="fa fa-pencil-square-o"></i>')
    });
    $("p.usermark").each(function() {
        $(this).prepend('<i class="fa fa-user" aria-hidden="true"></i>')
    });
    $("h2.hatenamark").each(function() {
        $(this).prepend('<i class="fa fa-question-circle"></i>')
    });
    $("h2.checkmark").each(function() {
        $(this).prepend('<i class="fa fa-check-circle"></i>')
    });
    $("h2.attentionmark").each(function() {
        $(this).prepend('<i class="fa fa-exclamation-triangle"></i>')
    });
    $("h2.memomark").each(function() {
        $(this).prepend('<i class="fa fa-pencil-square-o"></i>')
    });
    $("h2.usermark").each(function() {
        $(this).prepend('<i class="fa fa-user" aria-hidden="true"></i>')
    });
    $("h3.hatenamark").each(function() {
        $(this).prepend('<i class="fa fa-question-circle"></i>')
    });
    $("h3.checkmark").each(function() {
        $(this).prepend('<i class="fa fa-check-circle"></i>')
    });
    $("h3.attentionmark").each(function() {
        $(this).prepend('<i class="fa fa-exclamation-triangle"></i>')
    });
    $("h3.memomark").each(function() {
        $(this).prepend('<i class="fa fa-pencil-square-o"></i>')
    });
    $("h3.usermark").each(function() {
        $(this).prepend('<i class="fa fa-user" aria-hidden="true"></i>')
    });
    $("h4.hatenamark").each(function() {
        $(this).prepend('<i class="fa fa-question-circle"></i>')
    });
    $("h4.checkmark").each(function() {
        $(this).prepend('<i class="fa fa-check-circle"></i>')
    });
    $("h4.attentionmark").each(function() {
        $(this).prepend('<i class="fa fa-exclamation-triangle"></i>')
    });
    $("h4.memomark").each(function() {
        $(this).prepend('<i class="fa fa-pencil-square-o"></i>')
    });
    $("h4.usermark").each(function() {
        $(this).prepend('<i class="fa fa-user" aria-hidden="true"></i>')
    });
    $("h5.hatenamark").each(function() {
        $(this).prepend('<i class="fa fa-question-circle"></i>')
    });
    $("h5.checkmark").each(function() {
        $(this).prepend('<i class="fa fa-check-circle"></i>')
    });
    $("h5.attentionmark").each(function() {
        $(this).prepend('<i class="fa fa-exclamation-triangle"></i>')
    });
    $("h5.memomark").each(function() {
        $(this).prepend('<i class="fa fa-pencil-square-o"></i>')
    });
    $("h5.usermark").each(function() {
        $(this).prepend('<i class="fa fa-user" aria-hidden="true"></i>')
    })
});