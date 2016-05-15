function BeaverSlider(d) {
    var b = this;
    this.error = function(e) {
        throw new Error(e);
        return false
    };
    this.settings = d;
    if (!this.settings) {
        return this.error("Error: no settings parameter is passed")
    }
    if (!this.settings.type || this.settings.type != "slider" && this.settings.type != "carousel" && this.settings.type != "zoomer") {
        this.settings.type = "slider"
    }
    if (!this.settings.structure) {
        return this.error("Error: no structure parameter is passed")
    }
    if (!this.settings.structure.container) {
        return this.error("Error: no container parameter is passed")
    }
    if (!this.settings.structure.container.id && !this.settings.structure.container.selector) {
        return this.error("Error: no id/selector parameter is passed")
    }
    if (!this.settings.structure.container.height) {
        return this.error("Error: no height parameter is passed")
    }
    if (!this.settings.structure.container.width) {
        return this.error("Error: no width parameter is passed")
    }
    if (!this.settings.content) {
        return this.error("Error: no content parameter is passed")
    }
    if (!this.settings.content.images) {
        return this.error("Error: no images parameter is passed")
    }
    if (!this.settings.animation) {
        return this.error("Error: no animation parameter is passed")
    }
    if (!this.settings.animation.effects) {
        return this.error("Error: no effects parameter is passed")
    }
    if (!this.settings.animation.interval) {
        return this.error("Error: no interval parameter is passed")
    }
    this.settings.animation.messageAnimationDuration = this.settings.animation.messageAnimationDuration || 800;
    for (i = 0; i < d.content.images.length; i++) {
        var a = new Image();
        a.onload = function() {
            b.imagesLoaded++
        };
        a.src = d.content.images[i]
    }

    var c = jQuery("#" + this.settings.structure.container.id);
    if (!c.size()) {
        c = jQuery(this.settings.structure.container.selector)
    }
    c.css({
        width: this.settings.structure.container.width
    });
    this.container = jQuery("<div>").appendTo(c);
    this.areaMain = null;
    this.areaEffects = null;
    this.areaEffectsTemplate = null;
    this.areaStatus = null;
    this.areaWidgets = null;
    this.areaMessage = null;
    this.areaPlayer = null;
    this.imagesLoaded = 0;
    this.currentImage = 0;
    this.currentMessage = 0;
    this.currentBackground = null;
    this.nextEffect = null;
    this.stopped = false;
    this.animationNow = false;
    this.playerFadeNow = false;
    this.cells = null;
    this.currentEffect = null;
    this.run = null;
    this.messagesAnimationCounter = null;
    this.insideOfBeaverHouse = false;
    this.ignoreByBeaverHouse = false;
    this.initialize = function() {
        this.constructAreaMain();
        this.constructAreaStatus();
        this.constructMessage();
        this.constructPlayer();
        this.initEffects();
        if (this.settings.animation.runOnInit != false) {
            this.startSliding(true)
        }
    };
    this.initEffects = function() {
        this.effects = [{
            id: 0,
            group: "fade",
            name: "fadeOut",
            duration: 1000,
            size: null,
            steps: null,
            run: this.fadeOut
        }, {
            id: 1,
            group: "slide",
            name: "slideLeft",
            duration: 1000,
            size: null,
            steps: null,
            run: this.slideLeft
        }, {
            id: 2,
            group: "slide",
            name: "slideRight",
            duration: 1000,
            size: null,
            steps: null,
            run: this.slideRight
        }, {
            id: 3,
            group: "slide",
            name: "slideUp",
            duration: 1000,
            size: null,
            steps: null,
            run: this.slideUp
        }, {
            id: 4,
            group: "slide",
            name: "slideDown",
            duration: 1000,
            size: null,
            steps: null,
            run: this.slideDown
        }, {
            id: 5,
            group: "chessBoard",
            name: "chessBoardLeftDown",
            duration: 1000,
            size: 10,
            steps: 10,
            run: this.chessBoardLeftDown
        }, {
            id: 6,
            group: "chessBoard",
            name: "chessBoardLeftUp",
            duration: 1000,
            size: 10,
            steps: 10,
            run: this.chessBoardLeftUp
        }, {
            id: 7,
            group: "chessBoard",
            name: "chessBoardRightDown",
            duration: 1000,
            size: 10,
            steps: 10,
            run: this.chessBoardRightDown
        }, {
            id: 8,
            group: "chessBoard",
            name: "chessBoardRightUp",
            duration: 1000,
            size: 10,
            steps: 10,
            run: this.chessBoardRightUp
        }, {
            id: 9,
            group: "chessBoard",
            name: "chessBoardRandom",
            duration: 1000,
            size: 10,
            steps: 10,
            run: this.chessBoardRandom
        }, {
            id: 10,
            group: "jalousie",
            name: "jalousieLeft",
            duration: 1000,
            size: 10,
            steps: 10,
            run: this.jalousieLeft
        }, {
            id: 11,
            group: "jalousie",
            name: "jalousieUp",
            duration: 1000,
            size: 10,
            steps: 10,
            run: this.jalousieUp
        }, {
            id: 12,
            group: "jalousie",
            name: "jalousieRight",
            duration: 1000,
            size: 10,
            steps: 10,
            run: this.jalousieRight
        }, {
            id: 13,
            group: "jalousie",
            name: "jalousieDown",
            duration: 1000,
            size: 10,
            steps: 10,
            run: this.jalousieDown
        }, {
            id: 14,
            group: "jalousie",
            name: "jalousieRandomHorizontal",
            duration: 1000,
            size: 10,
            steps: 10,
            run: this.jalousieRandomHorizontal
        }, {
            id: 15,
            group: "jalousie",
            name: "jalousieRandomVertical",
            duration: 1000,
            size: 10,
            steps: 10,
            run: this.jalousieRandomVertical
        }, {
            id: 16,
            group: "pancake",
            name: "pancakeIn",
            duration: 1000,
            size: 10,
            steps: 10,
            run: this.pancakeIn
        }, {
            id: 17,
            group: "pancake",
            name: "pancakeOut",
            duration: 1000,
            size: 10,
            steps: 10,
            run: this.pancakeOut
        }, {
            id: 18,
            group: "pancake",
            name: "pancakeRandom",
            duration: 1000,
            size: 10,
            steps: 10,
            run: this.pancakeRandom
        }, {
            id: 19,
            group: "spiral",
            name: "spiralIn",
            duration: 1000,
            size: 10,
            steps: 10,
            run: this.spiralIn
        }, {
            id: 20,
            group: "spiral",
            name: "spiralOut",
            duration: 1000,
            size: 10,
            steps: 10,
            run: this.spiralOut
        }, {
            id: 21,
            group: "prison",
            name: "prisonVertical",
            duration: 1000,
            size: 10,
            steps: null,
            run: this.prisonVertical
        }, {
            id: 22,
            group: "prison",
            name: "prisonHorizontal",
            duration: 1000,
            size: 10,
            steps: null,
            run: this.prisonHorizontal
        }, {
            id: 23,
            group: "zoom",
            name: "zoomLeftTop",
            duration: 1000,
            size: 10,
            steps: null,
            run: this.zoomLeftTop
        }, {
            id: 24,
            group: "zoom",
            name: "zoomLeftBottom",
            duration: 1000,
            size: 10,
            steps: null,
            run: this.zoomLeftBottom
        }, {
            id: 25,
            group: "zoom",
            name: "zoomRightTop",
            duration: 1000,
            size: 10,
            steps: null,
            run: this.zoomRightTop
        }, {
            id: 26,
            group: "zoom",
            name: "zoomRightBottom",
            duration: 1000,
            size: 10,
            steps: null,
            run: this.zoomRightBottom
        }, {
            id: 27,
            group: "zoom",
            name: "zoomCenter",
            duration: 1000,
            size: 10,
            steps: null,
            run: this.zoomCenter
        }, {
            id: 28,
            group: "zoom",
            name: "zoomRandom",
            duration: 1000,
            size: 10,
            steps: null,
            run: this.zoomRandom
        }, {
            id: 29,
            group: "nails",
            name: "nailsUp",
            duration: 1000,
            size: 10,
            steps: 10,
            run: this.nailsUp
        }, {
            id: 30,
            group: "nails",
            name: "nailsDown",
            duration: 1000,
            size: 10,
            steps: 10,
            run: this.nailsDown
        }, {
            id: 31,
            group: "nails",
            name: "nailsLeft",
            duration: 1000,
            size: 10,
            steps: 10,
            run: this.nailsLeft
        }, {
            id: 32,
            group: "nails",
            name: "nailsRight",
            duration: 1000,
            size: 10,
            steps: 10,
            run: this.nailsRight
        }, {
            id: 33,
            group: "weed",
            name: "weedDownRight",
            duration: 1000,
            size: 10,
            steps: null,
            run: this.weedDownRight
        }, {
            id: 34,
            group: "weed",
            name: "weedDownLeft",
            duration: 1000,
            size: 10,
            steps: null,
            run: this.weedDownLeft
        }, {
            id: 35,
            group: "weed",
            name: "weedUpRight",
            duration: 1000,
            size: 10,
            steps: null,
            run: this.weedUpRight
        }, {
            id: 36,
            group: "weed",
            name: "weedUpLeft",
            duration: 1000,
            size: 10,
            steps: null,
            run: this.weedUpLeft
        }, {
            id: 37,
            group: "slideOver",
            name: "slideOverLeft",
            duration: 1000,
            size: null,
            steps: null,
            run: this.slideOverLeft
        }, {
            id: 38,
            group: "slideOver",
            name: "slideOverRight",
            duration: 1000,
            size: null,
            steps: null,
            run: this.slideOverRight
        }, {
            id: 39,
            group: "slideOver",
            name: "slideOverUp",
            duration: 1000,
            size: null,
            steps: null,
            run: this.slideOverUp
        }, {
            id: 40,
            group: "slideOver",
            name: "slideOverDown",
            duration: 1000,
            size: null,
            steps: null,
            run: this.slideOverDown
        }];
        this.userEffects = new Array();
        if (this.settings.animation.effects == "random") {
            this.userEffects = this.effects
        } else {
            var m = (typeof this.settings.animation.effects == "string") ? this.settings.animation.effects.split(",") : this.settings.animation.effects;
            for (i = 0; i < m.length; i++) {
                var f, h, g, e;
                if (typeof m[i] == "string") {
                    m[i] = m[i].split(":");
                    f = jQuery.trim(m[i][0]);
                    h = jQuery.trim(m[i][1]);
                    g = jQuery.trim(m[i][2]);
                    e = jQuery.trim(m[i][3])
                } else {
                    f = jQuery.trim(m[i].name);
                    h = jQuery.trim(m[i].duration);
                    g = jQuery.trim(m[i].size);
                    e = jQuery.trim(m[i].steps)
                }
                for (j = 0; j < this.effects.length; j++) {
                    if (this.effects[j].group.toLowerCase() == f.toLowerCase() || this.effects[j].name.toLowerCase() == f.toLowerCase()) {
                        this.userEffects.push({
                            id: this.effects[j].id,
                            group: this.effects[j].group,
                            name: this.effects[j].name,
                            duration: (h) ? h : this.effects[j].duration,
                            size: (g) ? g : this.effects[j].size,
                            steps: (e) ? e : this.effects[j].steps,
                            run: this.effects[j].run
                        })
                    }
                }
            }
        }
        if (this.settings.type == "carousel" && this.userEffects.length != 2) {
            return this.error("Error: carousel must have two effects! Please, recheck your effect names, probably you use a group name instead of effect name.")
        }
        for (i = 0; i < this.userEffects.length; i++) {
            var l = this.userEffects[i].id;
            if ((this.settings.type == "carousel" || this.settings.type == "slider") && l >= 23 && l <= 28) {
                return this.error("Error: you cannot use zoom effects for this type of slider")
            }
            if (this.settings.type == "zoomer" && (l < 23 || l > 28)) {
                return this.error("Error: you can use only zoom effects for this type of slider")
            }
        }
        this.currentBackground = "url(" + this.settings.content.images[0] + ")" 
    };
    this.constructAreaMain = function() {
        if (this.settings.type == "zoomer") {
            this.areaMain = jQuery("<div>").css({
                overflow: "hidden",
                width: this.settings.structure.container.width,
                height: this.settings.structure.container.height
            }).append(jQuery("<img>").attr("src", this.settings.content.images[this.currentImage]).css({
                width: this.settings.structure.container.width,
                height: this.settings.structure.container.height,
                display: "block",
                margin: 0
            }))
        } else {
		/* 05 2016 */
            this.areaMain = jQuery("<div>").css({
                overflow: "hidden",
                width: this.settings.structure.container.width,
                height: this.settings.structure.container.height,
                background: "url(" + this.settings.content.images[this.currentImage] + ")  no-repeat"
            })
		/* END 05 2016 */
        }
        this.areaEffects = jQuery("<div>").css({
            width: this.settings.structure.container.width,
            height: this.settings.structure.container.height,
            position: "absolute",
            left: 0,
            top: 0,
            overflow: "hidden",
            "z-index": (this.settings.structure.container.zIndexScreen) ? this.settings.structure.container.zIndexScreen : 90
        });
        this.areaEffectsTemplate = this.areaEffects.clone();
        this.areaWidgets = jQuery("<div>").css({
            width: this.settings.structure.container.width,
            height: this.settings.structure.container.height,
            position: "absolute",
            left: 0,
            top: 0,
            "z-index": (this.settings.structure.container.zIndexWidgets) ? this.settings.structure.container.zIndexWidgets : 100,
            background: "url(about:blank)"
        }).hover(function() {
            if (b.playerFadeNow) {
                return
            }
            jQuery(this).find("div[show='mouseover']").fadeIn(400)
        }, function() {
            b.playerFadeNow = true;
            jQuery(this).find("div[show='mouseover']").fadeOut(400, function() {
                b.playerFadeNow = false
            })
        }).click(function(e) {
            if ((jQuery(e.target)[0] === b.areaWidgets[0] || jQuery(e.target)[0] === b.areaWidgets.children()[0]) && b.settings.events && b.settings.events.imageClick) {
                b.settings.events.imageClick(b)
            }
        });
        this.container.attr({
            engine: "BeaverSlider",
            reference: "http://beaverslider.com"
        }).css({
            position: "relative"
        }).append(this.areaMain, this.areaWidgets, this.areaEffects);
		/* 05 2016 */
		this.areaMain.wrap(jQuery("<a href="+this.settings.content.urls[this.currentImage]+"></a>"));
		/* END 05 2016 */
    };
    this.constructAreaStatus = function() {
        if (this.settings.structure.controls) {
            this.areaStatus = jQuery("<div>").append(jQuery("<div>").addClass(this.settings.structure.controls.containerClass));
            for (i = 0; i < this.settings.content.images.length; i++) {
                var e = (this.settings.structure.controls.previewMode) ? jQuery("<img>").attr("src", this.settings.content.images[i]) : null;
                this.areaStatus.children("div").append(jQuery("<div>").addClass(this.settings.structure.controls.elementClass).attr("inarray", i).click(function() {
                    b.renderImage(jQuery(this).attr("inarray"))
                }).append(e))
            }
            this.container.append(this.areaStatus);
            this.updateStatus()
        }
    };
    this.constructMessage = function() {
        if (this.settings.structure.messages) {
            var e = (this.settings.animation.showMessages == "random") ? Math.floor(Math.random() * this.settings.content.messages.length) : 0;
            this.areaMessage = jQuery("<div>").css({
                width: this.settings.structure.container.width,
                height: this.settings.structure.container.height,
                overflow: "hidden",
                position: "relative"
            }).append(jQuery("<div>").css({
                position: "absolute",
                left: this.settings.structure.messages.left ? this.settings.structure.messages.left : "auto",
                top: this.settings.structure.messages.top ? this.settings.structure.messages.top : "auto",
                bottom: this.settings.structure.messages.bottom ? this.settings.structure.messages.bottom : "auto",
                right: this.settings.structure.messages.right ? this.settings.structure.messages.right : "auto"
            }).addClass(this.settings.structure.messages.containerClass).html(this.settings.content.messages[e]).click(function() {
                if (b.settings.events && b.settings.events.messageClick) {
                    b.settings.events.messageClick(b)
                }
            })).appendTo(this.areaWidgets)
        }
    };
    this.constructPlayer = function() {
        if (this.settings.structure.player) {
            var e = jQuery("<div>").css({
                position: "absolute",
                left: this.settings.structure.player.left ? this.settings.structure.player.left : "auto",
                right: (this.settings.structure.player.right) ? this.settings.structure.player.right : "auto",
                top: this.settings.structure.player.top ? this.settings.structure.player.top : "auto",
                bottom: this.settings.structure.player.bottom ? this.settings.structure.player.bottom : "auto"
            }).attr("show", this.settings.structure.player.show).addClass(this.settings.structure.player.containerClass);
            if (this.settings.structure.player.show == "mouseover") {
                e.hide()
            }
            jQuery("<div>").html(this.settings.structure.player.backText).appendTo(e).addClass(this.settings.structure.player.backClass).click(function() {
                b.playerPrev()
            });
            jQuery("<div>").html(this.settings.structure.player.pauseText).appendTo(e).addClass(this.settings.structure.player.pauseClass).click(function(f) {
                b.playerStop()
            });
            jQuery("<div>").html(this.settings.structure.player.playText).appendTo(e).addClass(this.settings.structure.player.playClass).hide().click(function(f) {
                b.playerPlay()
            });
            jQuery("<div>").html(this.settings.structure.player.forwardText).appendTo(e).addClass(this.settings.structure.player.forwardClass).click(function(f) {
                b.playerNext()
            });
            this.areaWidgets.append(e);
            this.areaPlayer = e
        }
    };
    this.playerPlay = function(e) {
        if (this.animationNow) {
            return
        }
        if (e && this.settings.events && this.settings.events.start) {
            this.settings.events.start(this)
        }
        this.startSliding(false)
    };
    this.playerStop = function(e) {
        if (e && this.settings.events && this.settings.events.stop) {
            this.settings.events.stop(this)
        }
        this.stopSliding(false)
    };
    this.playerNext = function(f, e) {
        if (this.animationNow) {
            return
        }
        if (f && this.settings.events && this.settings.events.next) {
            this.settings.events.next(this)
        }
        this.stopSliding((++this.currentImage == this.settings.content.images.length) ? 0 : this.currentImage, e)
    };
    this.playerPrev = function(e) {
        if (this.animationNow) {
            return
        }
        if (e && this.settings.events && this.settings.events.prev) {
            this.settings.events.prev(this)
        }
        if (this.settings.type == "carousel") {
            this.setNextEffect(this.userEffects[1])
        }
        this.stopSliding((--this.currentImage < 0) ? (this.settings.content.images.length - 1) : this.currentImage)
    };
    this.renderImage = function(e) {
        this.stopSliding(parseInt(e))
    };
    this.destroy = function() {
        this.playerStop();
        this.container.html("")
    };
    this.setNextEffect = function(e) {
        this.nextEffect = e
    };
    this.startSliding = function(e) {
        this.stopped = false;
        this.ignoreByBeaverHouse = false;
        if (this.areaPlayer && this.areaPlayer.size()) {
            this.areaPlayer.children("div:eq(1)").show();
            this.areaPlayer.children("div:eq(2)").hide()
        }
        if (this.insideOfBeaverHouse) {
            this.playerNext(false, true)
        } else {
            if (e) {
                setTimeout(function() {
                    if (b.settings.animation.waitAllImages) {
                        if (b.imagesLoaded == b.settings.content.images.length) {
                            b.animateAutomatically(true)
                        } else {
                            b.startSliding(true)
                        }
                    } else {
                        b.animateAutomatically(true)
                    }
                }, this.settings.animation.initialInterval ? this.settings.animation.initialInterval : this.settings.animation.interval)
            } else {
                this.animateAutomatically()
            }
        }
    };
    this.stopSliding = function(e, f) {
        this.stopped = true;
        if (!f) {
            this.ignoreByBeaverHouse = true
        }
        if (this.areaPlayer) {
            this.areaPlayer.children("div:eq(1)").hide();
            this.areaPlayer.children("div:eq(2)").show()
        }
        if (this.animationNow) {
            return
        }
        if (e || e === 0) {
            this.currentImage = e;
            this.updateStatus();
            this.animateCurrent(function() {})
        }
    };
    this.drawCells = function(n, m) {
        this.cells = new Array();
        var g = Math.floor(this.settings.structure.container.width / n),
            p = Math.floor(this.settings.structure.container.height / m),
            o = this.settings.structure.container.width % n,
            q = this.settings.structure.container.height % m,
            h = 0,
            r = 0;
        for (i = 0; i < m; i++) {
            for (j = 0; j < n; j++) {
                var e = g + ((o > j) ? 1 : 0),
                    f = p + ((q > i) ? 1 : 0),
                    l = h + "px " + r + "px";
                this.areaEffects.append(jQuery("<div>").css({
                    width: e + "px",
                    height: f + "px",
                    "float": "left",
                    margin: 0,
                    overflow: "hidden",
                    visibility: "hidden",
                    position: "relative"
                }).attr({
                    chessboardx: j,
                    chessboardy: i
                }).append(jQuery("<div>").css({
                    width: e + "px",
                    height: f + "px",
                    overflow: "hidden",
                    visibility: "hidden",
                    position: "absolute",
                    background: "url(" + this.settings.content.images[this.currentImage] + ") " + l + " no-repeat"
                })));
                h = (j == n - 1) ? 0 : (h - e)
            }
            r -= f
        }
    };
    this.clearAreaEffects = function() {
        this.currentBackground = "url(" + this.settings.content.images[this.currentImage] + ")";
        this.areaMain.css("background-image", "url(" + this.settings.content.images[this.currentImage] + ")");
		/* 05 2016 */
		this.areaMain.unwrap();
		this.areaMain.wrap(jQuery("<a href="+this.settings.content.urls[this.currentImage]+"></a>"));
		/* END 05 2016 */
        var e = this.areaEffects;
        this.areaEffects = this.areaEffectsTemplate.clone().appendTo(this.container);
        setTimeout(function() {
            e.remove()
        }, 50)
    };
    this.fadeCells = function(g, h) {
        var f = g ? g : 0,
            e = this.currentEffect.steps * 1;
        setTimeout(function() {
            if (f >= b.cells.length) {
                if (f == b.cells.length + e) {
                    h();
                    b.clearAreaEffects();
                    return
                }
            } else {
                b.cells[f].css("visibility", "visible").children().css("visibility", "visible").css("opacity", 1 / e)
            }
            f++;
            for (i = 1; i < e; i++) {
                if (b.cells[f - i]) {
                    b.cells[f - i].children().css("opacity", (i + 1) / e)
                }
            }
            b.fadeCells(f, h)
        }, this.currentEffect.duration / (this.currentEffect.size * 1 + e - 1))
    };
    this.slideCells = function(e, o, m, h, l, n) {
        var g = l ? l : 0,
            f = this.currentEffect.steps * 1;
        setTimeout(function() {
            if (g >= b.cells.length) {
                if (g == b.cells.length + f) {
                    n();
                    b.clearAreaEffects();
                    return
                }
            } else {
                b.cells[g].children().each(function() {
                    jQuery(this).css("visibility", "visible").css("opacity", 1 / f);
                    if (e) {
                        jQuery(this).css("top", jQuery(this).innerHeight() + "px")
                    }
                    if (o) {
                        jQuery(this).css("top", -jQuery(this).innerHeight() + "px")
                    }
                    if (m) {
                        jQuery(this).css("left", jQuery(this).innerHeight() + "px")
                    }
                    if (h) {
                        jQuery(this).css("left", jQuery(this).innerHeight() + "px")
                    }
                })
            }
            g++;
            for (i = 1; i <= f; i++) {
                if (b.cells[g - i]) {
                    b.cells[g - i].children().each(function() {
                        var q = jQuery(this).innerHeight(),
                            p = jQuery(this).innerWidth();
                        if (e) {
                            jQuery(this).css("top", q * (1 - i / f) + "px")
                        }
                        if (o) {
                            jQuery(this).css("top", -q * (1 - i / f) + "px")
                        }
                        if (m) {
                            jQuery(this).css("left", p * (1 - i / f) + "px")
                        }
                        if (h) {
                            jQuery(this).css("left", -p * (1 - i / f) + "px")
                        }
                        jQuery(this).css("opacity", (i + 1) / f)
                    })
                }
            }
            b.slideCells(e, o, m, h, g, n)
        }, this.currentEffect.duration / (this.currentEffect.size * 1 + f - 1))
    };
    this.updateStatus = function() {
        if (!this.areaStatus) {
            return
        }
        setTimeout(function() {
            b.areaStatus.children("div").children("div").removeClass(b.settings.structure.controls.elementActiveClass).addClass(b.settings.structure.controls.elementClass).eq(b.currentImage).removeClass(b.settings.structure.controls.elementClass).addClass(b.settings.structure.controls.elementActiveClass)
        }, 1)
    };
    this.nextImage = function() {
        this.currentImage = (this.currentImage == this.settings.content.images.length - 1) ? 0 : (this.currentImage + 1);
        this.updateStatus()
    };
    this.startzoom = function(f, e, g) {
        this.areaMain.find("img:first").attr("src", b.settings.content.images[b.currentImage]).css({
            width: b.settings.structure.container.width + "px",
            height: b.settings.structure.container.height + "px",
            margin: 0
        }).animate({
            width: Math.round((1 + this.currentEffect.size / 100) * this.settings.structure.container.width) + "px",
            height: Math.round((1 + this.currentEffect.size / 100) * this.settings.structure.container.height) + "px",
            marginLeft: Math.round(-1 * f * this.settings.structure.container.width) + "px",
            marginTop: Math.round(-1 * e * this.settings.structure.container.height) + "px"
        }, parseInt(this.currentEffect.duration), function() {
            g()
        })
    };
    this.zoomLeftTop = function(e) {
        this.startzoom(0, 0, e)
    };
    this.zoomRightTop = function(e) {
        this.startzoom(this.currentEffect.size / 100, 0, e)
    };
    this.zoomLeftBottom = function(e) {
        this.startzoom(0, this.currentEffect.size / 100, e)
    };
    this.zoomRightBottom = function(e) {
        this.startzoom(this.currentEffect.size / 100, this.currentEffect.size / 100, e)
    };
    this.zoomCenter = function(e) {
        this.startzoom(this.currentEffect.size / 100 / 2, this.currentEffect.size / 100 / 2, e)
    };
    this.zoomRandom = function(e) {
        this.startzoom(Math.random() * this.currentEffect.size / 100, Math.random() * this.currentEffect.size / 100, e)
    };
    this.slideLeft = function(g) {
        this.drawCells(1, 1);
        this.areaEffects.find("div").css("visibility", "visible");
        var e = this.areaEffects.children().css("width", this.settings.structure.container.width * 2 + "px"),
            f = e.children().css("left", this.settings.structure.container.width + "px");
        jQuery("<div>").css({
            background: this.currentBackground,
            position: "absolute",
            width: this.settings.structure.container.width + "px",
            height: this.settings.structure.container.height + "px"
        }).appendTo(e);
        e.animate({
            marginLeft: "-" + this.settings.structure.container.width + "px"
        }, parseInt(this.currentEffect.duration), function() {
            b.areaMain.css("visibility", "visible");
            b.clearAreaEffects();
            g()
        });
        setTimeout(function() {
            b.areaMain.css("visibility", "hidden")
        }, 0)
    };
    this.slideRight = function(f) {
        this.drawCells(1, 1);
        this.areaEffects.find("div").css("visibility", "visible");
        var e = this.areaEffects.children().css({
            width: this.settings.structure.container.width * 2 + "px",
            "margin-left": "-" + this.settings.structure.container.width + "px"
        });
        jQuery("<div>").css({
            background: this.currentBackground,
            position: "absolute",
            width: this.settings.structure.container.width + "px",
            height: this.settings.structure.container.height + "px",
            left: this.settings.structure.container.width + "px"
        }).appendTo(e);
        e.animate({
            marginLeft: 0
        }, parseInt(this.currentEffect.duration), function() {
            b.areaMain.css("visibility", "visible");
            b.clearAreaEffects();
            f()
        });
        setTimeout(function() {
            b.areaMain.css("visibility", "hidden")
        }, 0)
    };
    this.slideUp = function(g) {
        this.drawCells(1, 1);
        this.areaEffects.find("div").css("visibility", "visible");
        var e = this.areaEffects.children().css("height", this.settings.structure.container.height * 2 + "px"),
            f = e.children().css("top", this.settings.structure.container.height + "px");
        jQuery("<div>").css({
            background: this.currentBackground,
            position: "absolute",
            width: this.settings.structure.container.width + "px",
            height: this.settings.structure.container.height + "px"
        }).appendTo(e);
        e.animate({
            marginTop: "-" + this.settings.structure.container.height + "px"
        }, parseInt(this.currentEffect.duration), function() {
            b.areaMain.css("visibility", "visible");
            b.clearAreaEffects();
            g()
        });
        setTimeout(function() {
            b.areaMain.css("visibility", "hidden")
        }, 0)
    };
    this.slideDown = function(f) {
        this.drawCells(1, 1);
        this.areaEffects.find("div").css("visibility", "visible");
        var e = this.areaEffects.children().css({
            height: this.settings.structure.container.height * 2 + "px",
            "margin-top": "-" + this.settings.structure.container.height + "px"
        });
        jQuery("<div>").css({
            background: this.currentBackground,
            position: "absolute",
            width: this.settings.structure.container.width + "px",
            height: this.settings.structure.container.height + "px",
            top: this.settings.structure.container.height + "px"
        }).appendTo(e);
        e.animate({
            marginTop: 0
        }, parseInt(this.currentEffect.duration), function() {
            b.areaMain.css("visibility", "visible");
            b.clearAreaEffects();
            f()
        });
        this.areaMain.css("visibility", "hidden")
    };
    this.slideOverLeft = function(g) {
        this.drawCells(1, 1);
        this.areaEffects.find("div").css("visibility", "visible");
        var e = this.areaEffects.children(),
            f = e.children().css({
                left: this.settings.structure.container.width + "px",
                opacity: 0
            });
        f.animate({
            left: 0,
            opacity: 1
        }, parseInt(this.currentEffect.duration), function() {
            b.clearAreaEffects();
            g()
        })
    };
    this.slideOverRight = function(g) {
        this.drawCells(1, 1);
        this.areaEffects.find("div").css("visibility", "visible");
        var e = this.areaEffects.children(),
            f = e.children().css({
                left: -this.settings.structure.container.width + "px",
                opacity: 0
            });
        f.animate({
            left: 0,
            opacity: 1
        }, parseInt(this.currentEffect.duration), function() {
            b.clearAreaEffects();
            g()
        })
    };
    this.slideOverUp = function(g) {
        this.drawCells(1, 1);
        this.areaEffects.find("div").css("visibility", "visible");
        var e = this.areaEffects.children(),
            f = e.children().css({
                top: this.settings.structure.container.width + "px",
                opacity: 0
            });
        f.animate({
            top: 0,
            opacity: 1
        }, parseInt(this.currentEffect.duration), function() {
            b.clearAreaEffects();
            g()
        })
    };
    this.slideOverDown = function(g) {
        this.drawCells(1, 1);
        this.areaEffects.find("div").css("visibility", "visible");
        var e = this.areaEffects.children(),
            f = e.children().css({
                top: -this.settings.structure.container.width + "px",
                opacity: 0
            });
        f.animate({
            top: 0,
            opacity: 1
        }, parseInt(this.currentEffect.duration), function() {
            b.clearAreaEffects();
            g()
        })
    };
    this.fadeOut = function(e) {
        this.drawCells(1, 1);
        this.areaEffects.find("div").css("visibility", "visible");
        this.areaEffects.children("div").fadeOut(0).fadeIn(parseInt(this.currentEffect.duration), function() {
            b.clearAreaEffects();
            e()
        })
    };
    this.chessBoardRightDown = function(g) {
        this.drawCells(this.currentEffect.size, this.currentEffect.size);
        var f = this.areaEffects.children();
        for (i = 0; i < this.currentEffect.size * 2 - 1; i++) {
            for (j = 0; j < this.currentEffect.size; j++) {
                for (k = 0; k < this.currentEffect.size; k++) {
                    if (j + k == i) {
                        var e = f.filter("div[chessboardx='" + j + "'][chessboardy='" + k + "']");
                        this.cells[i] = this.cells[i] ? this.cells[i].add(e) : e
                    }
                }
            }
        }
        this.fadeCells(false, g)
    };
    this.chessBoardLeftDown = function(g) {
        this.drawCells(this.currentEffect.size, this.currentEffect.size);
        var f = this.areaEffects.children();
        for (i = 0; i < this.currentEffect.size * 2 - 1; i++) {
            for (j = 0; j < this.currentEffect.size; j++) {
                for (k = 0; k < this.currentEffect.size; k++) {
                    if ((this.currentEffect.size - j - 1) + k == i) {
                        var e = f.filter("div[chessboardx='" + j + "'][chessboardy='" + k + "']");
                        this.cells[i] = this.cells[i] ? this.cells[i].add(e) : e
                    }
                }
            }
        }
        this.fadeCells(false, g)
    };
    this.chessBoardLeftUp = function(g) {
        this.drawCells(this.currentEffect.size, this.currentEffect.size);
        var f = this.areaEffects.children();
        for (i = 0; i < this.currentEffect.size * 2 - 1; i++) {
            for (j = 0; j < this.currentEffect.size; j++) {
                for (k = 0; k < this.currentEffect.size; k++) {
                    if (this.currentEffect.size * 2 - j - k - 2 == i) {
                        var e = f.filter("div[chessboardx='" + j + "'][chessboardy='" + k + "']");
                        this.cells[i] = this.cells[i] ? this.cells[i].add(e) : e
                    }
                }
            }
        }
        this.fadeCells(false, g)
    };
    this.chessBoardRightUp = function(g) {
        this.drawCells(this.currentEffect.size, this.currentEffect.size);
        var f = this.areaEffects.children();
        for (i = 0; i < this.currentEffect.size * 2 - 1; i++) {
            for (j = 0; j < this.currentEffect.size; j++) {
                for (k = 0; k < this.currentEffect.size; k++) {
                    if (j + (this.currentEffect.size - k - 1) == i) {
                        var e = f.filter("div[chessboardx='" + j + "'][chessboardy='" + k + "']");
                        this.cells[i] = this.cells[i] ? this.cells[i].add(e) : e
                    }
                }
            }
        }
        this.fadeCells(false, g)
    };
    this.chessBoardRandom = function(o) {
        this.drawCells(this.currentEffect.size, this.currentEffect.size);
        var l = this.areaEffects.children(),
            n = new Array(),
            g = this.currentEffect.size * this.currentEffect.size;
        for (i = 0; i < this.currentEffect.size; i++) {
            for (j = 0; j < this.currentEffect.size; j++) {
                n[i * this.currentEffect.size + j] = i + "," + j
            }
        }
        for (i = 0; i < this.currentEffect.size; i++) {
            for (j = 0; j < this.currentEffect.size; j++) {
                var m = Math.floor(Math.random() * g) % n.length,
                    f = 0,
                    h;
                while (m != -1) {
                    if (n[f]) {
                        m--;
                        h = f
                    }
                    f = (f == n.length - 1) ? 0 : (f + 1)
                }
                var e = n[h].split(",");
                n[h] = false;
                var f = l.filter("div[chessboardx='" + e[0] + "'][chessboardy='" + e[1] + "']");
                this.cells[i] = this.cells[i] ? this.cells[i].add(f) : f
            }
        }
        this.fadeCells(false, o)
    };
    this.jalousieRight = function(g) {
        this.drawCells(this.currentEffect.size, 1);
        var f = this.areaEffects.children();
        for (i = 0; i < this.currentEffect.size; i++) {
            var e = f.filter("div[chessboardx='" + i + "']");
            this.cells[i] = e
        }
        this.fadeCells(false, g)
    };
    this.jalousieDown = function(g) {
        this.drawCells(1, this.currentEffect.size);
        var f = this.areaEffects.children();
        for (i = 0; i < this.currentEffect.size; i++) {
            var e = f.filter("div[chessboardy='" + i + "']");
            this.cells[i] = e
        }
        this.fadeCells(false, g)
    };
    this.jalousieLeft = function(g) {
        this.drawCells(this.currentEffect.size, 1);
        var f = this.areaEffects.children();
        for (i = 0; i < this.currentEffect.size; i++) {
            var e = f.filter("div[chessboardx='" + (this.currentEffect.size - i - 1) + "']");
            this.cells[i] = e
        }
        this.fadeCells(false, g)
    };
    this.jalousieUp = function(g) {
        this.drawCells(1, this.currentEffect.size);
        var f = this.areaEffects.children();
        for (i = 0; i < this.currentEffect.size; i++) {
            var e = f.filter("div[chessboardy='" + (this.currentEffect.size - i - 1) + "']");
            this.cells[i] = e
        }
        this.fadeCells(false, g)
    };
    this.jalousieRandomHorizontal = function(m) {
        this.drawCells(this.currentEffect.size, 1);
        var g = this.areaEffects.children(),
            l = new Array();
        for (i = 0; i < this.currentEffect.size; i++) {
            l[i] = i + ",1"
        }
        for (i = 0; i < this.currentEffect.size; i++) {
            var h = Math.floor(Math.random() * this.currentEffect.size) % l.length,
                e = 0,
                f;
            while (h != -1) {
                if (l[e]) {
                    h--;
                    f = e
                }
                e = (e == l.length - 1) ? 0 : (e + 1)
            }
            var e = g.filter("div[chessboardx='" + l[f].split(",")[0] + "']");
            l[f] = false;
            this.cells[i] = this.cells[i] ? this.cells[i].add(e) : e
        }
        this.fadeCells(false, m)
    };
    this.jalousieRandomVertical = function(m) {
        this.drawCells(1, this.currentEffect.size);
        var g = this.areaEffects.children(),
            l = new Array();
        for (i = 0; i < this.currentEffect.size; i++) {
            l[i] = i + ",1"
        }
        for (i = 0; i < this.currentEffect.size; i++) {
            var h = Math.floor(Math.random() * this.currentEffect.size) % l.length,
                e = 0,
                f;
            while (h != -1) {
                if (l[e]) {
                    h--;
                    f = e
                }
                e = (e == l.length - 1) ? 0 : (e + 1)
            }
            var e = g.filter("div[chessboardy='" + l[f].split(",")[0] + "']");
            l[f] = false;
            this.cells[i] = this.cells[i] ? this.cells[i].add(e) : e
        }
        this.fadeCells(false, m)
    };
    this.pancakeIn = function(h) {
        this.drawCells(this.currentEffect.size, this.currentEffect.size);
        var g = this.areaEffects.children();
        for (border = 0; border < Math.ceil(this.currentEffect.size / 2); border++) {
            var e = this.currentEffect.size - 1 - border;
            for (i = 0; i < this.currentEffect.size; i++) {
                for (j = 0; j < this.currentEffect.size; j++) {
                    if (i >= border && j >= border && i <= e && j <= e && (i == border || i == e || j == border || j == e)) {
                        var f = g.filter("div[chessboardx='" + i + "'][chessboardy='" + j + "']");
                        this.cells[border] = this.cells[border] ? this.cells[border].add(f) : f
                    }
                }
            }
        }
        this.fadeCells(false, h)
    };
    this.pancakeOut = function(l) {
        this.drawCells(this.currentEffect.size, this.currentEffect.size);
        var h = this.areaEffects.children();
        for (border = Math.ceil(this.currentEffect.size / 2) - 1; border >= 0; border--) {
            var f = Math.ceil(this.currentEffect.size / 2) - 1 - border,
                e = this.currentEffect.size - 1 - f;
            for (i = 0; i < this.currentEffect.size; i++) {
                for (j = 0; j < this.currentEffect.size; j++) {
                    if (i >= f && j >= f && i <= e && j <= e && (i == f || i == e || j == f || j == e)) {
                        var g = h.filter("div[chessboardx='" + i + "'][chessboardy='" + j + "']");
                        this.cells[border] = this.cells[border] ? this.cells[border].add(g) : g
                    }
                }
            }
        }
        this.fadeCells(false, l)
    };
    this.pancakeRandom = function(o) {
        this.drawCells(this.currentEffect.size, this.currentEffect.size);
        var l = this.areaEffects.children(),
            n = new Array();
        for (i = 0; i < Math.ceil(this.currentEffect.size / 2); i++) {
            n[i] = i + ",1"
        }
        for (border = Math.ceil(this.currentEffect.size / 2) - 1; border >= 0; border--) {
            var m = Math.floor(Math.random() * Math.ceil(this.currentEffect.size / 2)) % n.length,
                g = 0,
                h;
            while (m != -1) {
                if (n[g]) {
                    m--;
                    h = g
                }
                g = (g == n.length - 1) ? 0 : (g + 1)
            }
            var f = n[h].split(",")[0],
                e = this.currentEffect.size - 1 - f;
            for (i = 0; i < this.currentEffect.size; i++) {
                for (j = 0; j < this.currentEffect.size; j++) {
                    if (i >= f && j >= f && i <= e && j <= e && (i == f || i == e || j == f || j == e)) {
                        var g = l.filter("div[chessboardx='" + i + "'][chessboardy='" + j + "']");
                        this.cells[border] = this.cells[border] ? this.cells[border].add(g) : g
                    }
                }
            }
            n[h] = false
        }
        this.fadeCells(false, o)
    };
    this.spiralIn = function(l) {
        this.drawCells(this.currentEffect.size, this.currentEffect.size);
        var h = this.areaEffects.children();
        var g = -1;
        for (border = 0; border < Math.ceil(this.currentEffect.size / 2); border++) {
            var e = this.currentEffect.size - border - 1;
            for (i = border; i <= e; i++) {
                g++;
                var f = h.filter("div[chessboardx='" + i + "'][chessboardy='" + border + "']");
                this.cells[g] = this.cells[g] ? this.cells[g].add(f) : f
            }
            for (i = border + 1; i <= e; i++) {
                g++;
                var f = h.filter("div[chessboardx='" + e + "'][chessboardy='" + i + "']");
                this.cells[g] = this.cells[g] ? this.cells[g].add(f) : f
            }
            for (i = e - 1; i >= border; i--) {
                g++;
                var f = h.filter("div[chessboardx='" + i + "'][chessboardy='" + e + "']");
                this.cells[g] = this.cells[g] ? this.cells[g].add(f) : f
            }
            for (i = e - 1; i >= border + 1; i--) {
                g++;
                var f = h.filter("div[chessboardx='" + border + "'][chessboardy='" + i + "']");
                this.cells[g] = this.cells[g] ? this.cells[g].add(f) : f
            }
        }
        this.fadeCells(false, l)
    };
    this.spiralOut = function(l) {
        this.drawCells(this.currentEffect.size, this.currentEffect.size);
        var h = this.areaEffects.children();
        var g = -1;
        for (border = Math.ceil(this.currentEffect.size / 2) - 1; border >= 0; border--) {
            var e = this.currentEffect.size - border - 1;
            for (i = border + 1; i <= e; i++) {
                g++;
                var f = h.filter("div[chessboardx='" + e + "'][chessboardy='" + i + "']");
                this.cells[g] = this.cells[g] ? this.cells[g].add(f) : f
            }
            for (i = e - 1; i >= border; i--) {
                g++;
                var f = h.filter("div[chessboardx='" + i + "'][chessboardy='" + e + "']");
                this.cells[g] = this.cells[g] ? this.cells[g].add(f) : f
            }
            for (i = e - 1; i >= border + 1; i--) {
                g++;
                var f = h.filter("div[chessboardx='" + border + "'][chessboardy='" + i + "']");
                this.cells[g] = this.cells[g] ? this.cells[g].add(f) : f
            }
            for (i = border; i <= e; i++) {
                g++;
                var f = h.filter("div[chessboardx='" + i + "'][chessboardy='" + border + "']");
                this.cells[g] = this.cells[g] ? this.cells[g].add(f) : f
            }
        }
        this.fadeCells(false, l)
    };
    this.prisonVertical = function(l) {
        this.drawCells(this.currentEffect.size, 1);
        var h = this.areaEffects.children();
        for (i = 0; i < this.currentEffect.size; i++) {
            var e = h.filter("div[chessboardx='" + i + "']"),
                g, f = true;
            e.css({
                overflow: "hidden",
                visibility: "visible",
                opacity: 1
            }).children().css({
                top: ((i % 2 == 0) ? "-" : "") + this.settings.structure.container.width + "px",
                visibility: "visible",
                opacity: 1
            }).animate({
                top: 0
            }, parseInt(this.currentEffect.duration), function() {
                if (f) {
                    f = false;
                    b.clearAreaEffects();
                    l()
                }
            })
        }
    };
    this.prisonHorizontal = function(l) {
        this.drawCells(1, this.currentEffect.size);
        var h = this.areaEffects.children();
        for (i = 0; i < this.currentEffect.size; i++) {
            var e = h.filter("div[chessboardy='" + i + "']"),
                g, f = true;
            e.css({
                overflow: "hidden",
                visibility: "visible",
                opacity: 1
            }).children().css({
                left: ((i % 2 == 0) ? "-" : "") + this.settings.structure.container.width + "px",
                visibility: "visible",
                opacity: 1
            }).animate({
                left: 0
            }, parseInt(this.currentEffect.duration), function() {
                if (f) {
                    f = false;
                    b.clearAreaEffects();
                    l()
                }
            })
        }
    };
    this.nailsUp = function(g) {
        this.drawCells(1, this.currentEffect.size);
        var f = this.areaEffects.children();
        for (i = 0; i < this.currentEffect.size; i++) {
            var e = f.filter("div[chessboardy='" + (this.currentEffect.size - i - 1) + "']");
            this.cells[i] = e
        }
        this.slideCells(true, false, false, false, false, g)
    };
    this.nailsDown = function(g) {
        this.drawCells(1, this.currentEffect.size);
        var f = this.areaEffects.children();
        for (i = 0; i < this.currentEffect.size; i++) {
            var e = f.filter("div[chessboardy='" + (this.currentEffect.size - i - 1) + "']");
            this.cells[i] = e
        }
        this.slideCells(false, true, false, false, false, g)
    };
    this.nailsLeft = function(g) {
        this.drawCells(this.currentEffect.size, 1);
        var f = this.areaEffects.children();
        for (i = 0; i < this.currentEffect.size; i++) {
            var e = f.filter("div[chessboardx='" + (this.currentEffect.size - i - 1) + "']");
            this.cells[i] = e
        }
        this.slideCells(false, false, true, false, false, g)
    };
    this.nailsRight = function(g) {
        this.drawCells(this.currentEffect.size, 1);
        var f = this.areaEffects.children();
        for (i = 0; i < this.currentEffect.size; i++) {
            var e = f.filter("div[chessboardx='" + (this.currentEffect.size - i - 1) + "']");
            this.cells[i] = e
        }
        this.slideCells(false, false, false, true, false, g)
    };
    this.weedDownRight = function(g) {
        this.drawCells(this.currentEffect.size, 1);
        var e = this.areaEffects.children();
        var f = function(h) {
            setTimeout(function() {
                e.filter("div[chessboardx='" + h + "']").children().css({
                    overflow: "hidden",
                    visibility: "visible",
                    opacity: 0,
                    top: -b.settings.structure.container.height + "px"
                }).animate({
                    top: 0,
                    opacity: 1
                }, parseInt(b.currentEffect.duration), function() {
                    if (h == b.currentEffect.size - 1) {
                        b.clearAreaEffects();
                        g()
                    }
                })
            }, h * b.currentEffect.duration / b.currentEffect.size)
        };
        for (i = 0; i < this.currentEffect.size; i++) {
            f(i)
        }
    };
    this.weedDownLeft = function(g) {
        this.drawCells(this.currentEffect.size, 1);
        var e = this.areaEffects.children();
        var f = function(h) {
            setTimeout(function() {
                e.filter("div[chessboardx='" + h + "']").children().css({
                    overflow: "hidden",
                    visibility: "visible",
                    opacity: 0,
                    top: -b.settings.structure.container.height + "px"
                }).animate({
                    top: 0,
                    opacity: 1
                }, parseInt(b.currentEffect.duration), function() {
                    if (h == 0) {
                        b.clearAreaEffects();
                        g()
                    }
                })
            }, (b.currentEffect.size - h) * b.currentEffect.duration / b.currentEffect.size)
        };
        for (i = 0; i < this.currentEffect.size; i++) {
            f(i)
        }
    };
    this.weedUpRight = function(g) {
        this.drawCells(this.currentEffect.size, 1);
        var e = this.areaEffects.children();
        var f = function(h) {
            setTimeout(function() {
                e.filter("div[chessboardx='" + h + "']").children().css({
                    overflow: "hidden",
                    visibility: "visible",
                    opacity: 0,
                    top: b.settings.structure.container.height + "px"
                }).animate({
                    top: 0,
                    opacity: 1
                }, parseInt(b.currentEffect.duration), function() {
                    if (h == b.currentEffect.size - 1) {
                        b.clearAreaEffects();
                        g()
                    }
                })
            }, h * b.currentEffect.duration / b.currentEffect.size)
        };
        for (i = 0; i < this.currentEffect.size; i++) {
            f(i)
        }
    };
    this.weedUpLeft = function(g) {
        this.drawCells(this.currentEffect.size, 1);
        var e = this.areaEffects.children();
        var f = function(h) {
            setTimeout(function() {
                e.filter("div[chessboardx='" + h + "']").children().css({
                    overflow: "hidden",
                    visibility: "visible",
                    opacity: 0,
                    top: b.settings.structure.container.height + "px"
                }).animate({
                    top: 0,
                    opacity: 1
                }, parseInt(b.currentEffect.duration), function() {
                    if (h == 0) {
                        b.clearAreaEffects();
                        g()
                    }
                })
            }, (b.currentEffect.size - h) * b.currentEffect.duration / b.currentEffect.size)
        };
        for (i = 0; i < this.currentEffect.size; i++) {
            f(i)
        }
    };
    this.animateAutomatically = function(e) {
        if (this.stopped) {
            return
        }
        if (!e || this.settings.type != "zoomer") {
            this.nextImage()
        }
        this.animateCurrent(function() {
            setTimeout(function() {
                b.animateAutomatically()
            }, b.settings.animation.interval)
        })
    };
    this.showMessage = function(v) {
        var s = this.areaMessage.children().html();
        if (!this.settings.animation.changeSameMessage && v == s) {
            return
        }
        if (this.settings.animation.messageAnimationDirection) {
            var f = this.areaMessage.children().html(v);
            f.css({
                left: "-999999999999999px",
                right: "auto",
                opacity: 0
            });
            if (!v) {
                return
            }
            var g = f.outerWidth(),
                w = f.outerHeight();
            f.css({
                left: "auto",
                right: "auto",
                opacity: 0
            });
            var t = this.settings.structure.messages.right || 0,
                h = this.settings.structure.messages.left || 0,
                q = this.settings.structure.messages.top || 0,
                e = this.settings.structure.messages.bottom || 0,
                l, o, m, p = this.settings.animation.messageAnimationDirection.split(","),
                r = p[Math.floor(Math.random() * p.length)],
                n = function(y, z, A) {
                    if (y < z) {
                        if (z - y > A) {
                            return z - A
                        } else {
                            return y
                        }
                    } else {
                        if (y - z > A) {
                            return z + A
                        } else {
                            return y
                        }
                    }
                },
                u = this.settings.animation.messageAnimationMaxHorLength || this.settings.structure.container.width / 3,
                x = this.settings.animation.messageAnimationMaxVerLength || this.settings.structure.container.height / 3;
            switch (r) {
                case "right":
                    o = h ? h : (this.settings.structure.container.width - t - g);
                    m = -g;
                    l = {
                        left: o,
                        opacity: 1
                    };
                    f.css({
                        left: n(m, o, x),
                        right: "auto",
                        opacity: 0
                    });
                    break;
                case "left":
                    o = h ? h : (this.settings.structure.container.width - t - g);
                    m = this.settings.structure.container.width + g;
                    l = {
                        left: o,
                        opacity: 1
                    };
                    f.css({
                        left: n(m, o, x),
                        right: "auto",
                        opacity: 0
                    });
                    break;
                case "down":
                    o = q ? q : (this.settings.structure.container.height - e - w);
                    m = -w;
                    l = {
                        top: o,
                        opacity: 1
                    };
                    f.css({
                        top: n(m, o, x),
                        bottom: "auto",
                        left: (h ? h : "auto"),
                        right: (t ? t : "auto"),
                        opacity: 0
                    });
                    break;
                case "up":
                    o = q ? q : (this.settings.structure.container.height - e - w);
                    m = this.settings.structure.container.height + w;
                    l = {
                        top: o,
                        opacity: 1
                    };
                    f.css({
                        top: n(m, o, x),
                        bottom: "auto",
                        left: (h ? h : "auto"),
                        right: (t ? t : "auto"),
                        opacity: 0
                    });
                    break;
                default:
            }
            f.animate(l, parseInt(this.settings.animation.messageAnimationDuration))
        } else {
            this.areaMessage.children().html(v)
        }
    };
    this.animateCurrent = function(e) {
        if (this.animationNow) {
            return
        }
        if (b.settings.events && this.settings.events.beforeSlide) {
            this.settings.events.beforeSlide(b)
        }
        if (this.nextEffect) {
            for (i = 0; i < this.effects.length; i++) {
                if (this.effects[i].name == this.nextEffect.name) {
                    this.currentEffect = {
                        id: this.effects[i].id,
                        group: this.effects[i].group,
                        name: this.effects[i].name,
                        duration: (this.nextEffect.duration) ? this.nextEffect.duration : this.effects[i].duration,
                        size: (this.nextEffect.size) ? this.nextEffect.size : this.effects[i].size,
                        steps: (this.nextEffect.steps) ? this.nextEffect.steps : this.effects[i].steps,
                        run: this.effects[i].run
                    };
                    break
                }
            }
            this.nextEffect = null
        } else {
            if (this.settings.type == "carousel") {
                this.currentEffect = this.userEffects[0]
            } else {
                this.currentEffect = this.userEffects[Math.floor(Math.random() * this.userEffects.length)]
            }
        }
        this.run = this.currentEffect.run;
        this.animationNow = true;
        if (b.settings.events && this.settings.events.afterSlideStart) {
            this.settings.events.afterSlideStart(b)
        }
        this.run(function() {
            b.animationNow = false;
            if (b.settings.events && b.settings.events.beforeSlideEnd) {
                b.settings.events.beforeSlideEnd(b)
            }
            if (e) {
                e()
            }
            if (b.settings.events && b.settings.events.afterSlide) {
                b.settings.events.afterSlide(b)
            }
        });
        if (b.settings.events && this.settings.events.beforeMessageChange) {
            this.settings.events.beforeMessageChange(b)
        }
        if (this.settings.content.messages) {
            if (d.animation.showMessages == "random") {
                this.currentMessage = Math.floor(Math.random() * this.settings.content.messages.length);
                this.messagesAnimationCounter = 1
            } else {
                if (d.animation.showMessages == "linked") {
                    this.currentMessage = this.currentImage;
                    this.messagesAnimationCounter = 1
                } else {
                    if (!this.messagesAnimationCounter || this.messagesAnimationCounter == 1) {
                        this.messagesAnimationCounter = this.settings.animation.changeMessagesAfter;
                        this.currentMessage = (++this.currentMessage == this.settings.content.messages.length) ? 0 : this.currentMessage
                    } else {
                        this.messagesAnimationCounter--
                    }
                }
            }
        }
        if (this.messagesAnimationCounter == 1) {
            this.showMessage(this.settings.content.messages[this.currentMessage])
        }
        if (b.settings.events && this.settings.events.afterMessageChange) {
            this.settings.events.afterMessageChange(b)
        }
    };
    if (b.settings.events && this.settings.events.beforeInitialize) {
        this.settings.events.beforeInitialize(b)
    }
    this.initialize();
    if (b.settings.events && this.settings.events.afterInitialize) {
        this.settings.events.afterInitialize(b)
    }
}

function BeaverHouse() {
    var a = this;
    this.currentInterval = null;
    this.currentSliderIndex = 0;
    this.sliders = arguments;
    for (i = 0; i < this.sliders.length; i++) {
        this.sliders[i].insideOfBeaverHouse = true
    }
    this.searchNextSlider = function() {
        var b = this.currentSliderIndex;
        do {
            this.currentSliderIndex++;
            if (this.currentSliderIndex == this.sliders.length) {
                this.currentSliderIndex = 0
            }
            if (!this.sliders[this.currentSliderIndex].ignoreByBeaverHouse) {
                break
            }
        } while (b != this.currentSliderIndex);
        if (b == this.currentSliderIndex && this.sliders[this.currentSliderIndex].ignoreByBeaverHouse) {
            this.currentSliderIndex = null
        }
    };
    this.wait = function() {
        setTimeout(function() {
            var b = false;
            for (i = 0; i < a.sliders.length; i++) {
                if (!a.sliders[i].ignoreByBeaverHouse) {
                    a.currentSliderIndex = i;
                    b = true;
                    a.animate();
                    break
                }
            }
            if (!b) {
                a.wait()
            }
        }, 50)
    };
    this.animate = function() {
        this.sliders[this.currentSliderIndex].playerNext(false, true);
        this.currentInterval = setInterval(function() {
            if (!a.sliders[a.currentSliderIndex].animationNow) {
                var b = a.currentSliderIndex;
                window.clearInterval(a.currentInterval);
                a.currentInterval = null;
                a.searchNextSlider();
                if (a.currentSliderIndex != null) {
                    setTimeout(function() {
                        a.animate()
                    }, parseInt(a.sliders[b].settings.animation.interval))
                } else {
                    a.wait()
                }
            }
        }, 1)
    };
    this.start = function() {
        setTimeout(function() {
            if (a.sliders[a.currentSliderIndex].settings.animation.waitAllImages) {
                if (a.sliders[a.currentSliderIndex].imagesLoaded == a.sliders[a.currentSliderIndex].settings.content.images.length) {
                    a.animate()
                } else {
                    a.start()
                }
            } else {
                a.animate()
            }
        }, a.sliders[a.currentSliderIndex].settings.animation.initialInterval ? a.sliders[a.currentSliderIndex].settings.animation.initialInterval : a.sliders[a.currentSliderIndex].settings.animation.interval)
    };
    this.start()
};