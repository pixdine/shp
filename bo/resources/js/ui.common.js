const body = document.querySelector("body");

window.executeLayout = function() {
    let ww = window.innerWidth;

    common.ui.checkDevice(ww);
    common.allMenu.init();
    common.ui.clearText();
    common.ui.activeTooltip.init("[data-tooltip]");
}

window.executeMicroLnb = function() {
    common.sidebar.init();
    common.leftMenu.init();
    common.ui.bookmark.init();
    common.ui.activeTooltip.init("[data-tooltip]");
}

window.executeMacro = function() {
    let ww = window.innerWidth;

    common.ui.checkDevice(ww);
    common.ui.handleRow.init();
    common.ui.clearText();
    common.ui.activeTooltip.init("[data-tooltip]");
}


window.addEventListener("resize", () => {
    let ww = window.innerWidth;
    common.ui.checkDevice(ww);
});

const common = {
    sidebar: {
        // 사이드바
        sidebar: null,
        handler: null,
        handlerTxt: null,
        container: null,

        init: function() {
            if(document.querySelector("#sidebar") === null) return;

            sidebar = document.querySelector("#sidebar");
            handler = sidebar.querySelector(".btn_handler");
            handlerTxt = handler.querySelector(".blind");
            container = window.parent.document.querySelector('.container');
            
            this.initEvent();
        },
        initEvent: function() {
            common.ui.toggleClass(container, handler, "has_side");
            common.ui.toggleClass(sidebar, handler, "active");
            this.checkState();

            handler.addEventListener("click", () => {
                this.checkState();
            });
        },
        checkState: function() {
            if(sidebar.classList.contains("active")) {
                handlerTxt.textContent = "메뉴 닫기";
            } else {
                handlerTxt.textContent = "메뉴 열기";
            }
        },
    },
    leftMenu: {
        // lnb메뉴
        lnbWrap : null,
        lnb: null,
        btnMenu: null,
        tooltip: null,
        newTooltip: null,
        prevTooltipIndex: null,
        lnbWrapPosY: null,
        prevItem: null,
        depth2: null,
        
        init: function() {
            if(document.querySelector(".lnb_menu_wrap") === null) return;
    
            lnbWrap = document.querySelector(".lnb_menu_wrap");
            lnb = document.querySelector(".lnb_menu");
            depth2 = lnb.querySelectorAll(".btn_depth2");
            btnMenus = lnb.querySelectorAll(".btn_menu");
            tooltip = lnbWrap.querySelector(".tooltip_layer");
            lnbWrapPosY = lnbWrap.getBoundingClientRect().top;
            
            this.inintEvent();
            this.handleDepth2();
            this.clickBody();
        }, 
        inintEvent: function() {
            btnMenus.forEach((item, index) => {
                // 활성화
                item.addEventListener("click", () => {
                    if(!item.classList.contains("btn_depth2")) {
                        if(this.prevItem !== null) {
                            btnMenus[this.prevItem].closest("li").classList.remove("on");
                            btnMenus[this.prevItem].parentElement.parentElement.parentElement.classList.remove("on");
                            this.prevItem = null;
                        }
                        item.closest("li").classList.add("on");
                        if(item.closest("li.has_sub")) {
                            item.closest("li.has_sub").classList.add("on");
                        }
                        this.prevItem = index;
                    }
                });
    
                // 우클릭
                item.addEventListener("contextmenu", (e) => {
                    e.preventDefault();
    
                    this.cloneTooltip();
                    this.hideTooltip();
                    this.openTooltip(item, index);
                });
            });
        },
    
        // 2depth 접기/펼치기
        handleDepth2: function() {
            depth2.forEach((item, index) => {
                item.addEventListener("click", (e) => {
                    if(!item.closest(".has_sub")) return;
        
                    const defaultHeight = item.offsetHeight;
                    const depth3 = item.nextElementSibling;
                    let depth3Height = depth3.offsetHeight;
                    let openHeight = defaultHeight + depth3Height;
        
                    item.closest(".has_sub").classList.toggle("open");
        
                    if(item.closest(".has_sub").classList.contains("open")) {
                        item.closest(".has_sub").style.height = `${openHeight}px`;
                    } else {
                        item.closest(".has_sub").style.height = `${defaultHeight}px`;
                    }
                });
            });
        },
        openTooltip: function(item, index) {
            if(item.hasAttribute("data-tooltip")) {
                if(!item.parentElement.classList.contains("active")) {
                    item.parentElement.classList.add("tooltip_layer_wrap", "active");
                    item.parentElement.append(this.newTooltip);
                    this.prevTooltipIndex = index;
                }
            }
        },
        cloneTooltip: function() {
            this.newTooltip = tooltip.cloneNode(true);
        },
        hideTooltip: function() {
            if(this.prevTooltipIndex !== null) {
                // console.log(this.prevTooltipIndex);
                let prevMenuParentEl = btnMenus[this.prevTooltipIndex].parentElement;
                prevMenuParentEl.classList.remove("tooltip_layer_wrap", "active");
                prevMenuParentEl.querySelector(".tooltip_layer").remove();
                this.prevTooltipIndex = null;
            }
        },
        clickBody: function() {
            body.addEventListener("click", (e) => {
                this.hideTooltip();
            });
        }
    },
    allMenu: {
        // 전체메뉴
        header: null,
        gnb: null,
        handler: null,
        defaultNavHeight: null,
        openNavHeight: null,
        init: function() {
            if(document.getElementById("gnb") === null) return;

            header = document.querySelector("#header");
            gnb = document.querySelector("#gnb");
            handler = gnb.querySelector(".btn_allmenu");
            defaultNavHeight = header.offsetHeight
            openNavHeight = header.scrollHeight;

            this.initEvent();
        },
        initEvent: function() {
            common.ui.toggleClass(header, handler, "active");
            handler.addEventListener("click", () => {
                
                if(header.classList.contains("active")) {
                    header.style.height = `${openNavHeight}px`;
                } else {
                    header.style.height = `${defaultNavHeight}px`;
                }
            });
        }
    },
    ui: {
        checkDevice: function(ww) {
            // 디바이스 체크

            if(document.querySelector(".wrap") === null) return;

            const wrap = document.querySelector(".wrap");
            ww < 1600 ? wrap.classList.add("scroll_x") : wrap.classList.remove("scroll_x");
        },
        toggleClass: function(target, handler, active) {
            handler.addEventListener("click", () => {
                target.classList.toggle(active);
            });
        },
        handleRow: {
            handler: null,
            handlerTxt: null,
            table: null,
            rowHides: null,
    
            init: function() {
                if(document.querySelector("#btnShowRow") === null) return;
    
                handler = document.querySelector("#btnShowRow");
                handlerTxt = handler.querySelector("span");
                table = document.querySelector("[data-search]");
                rowHides = table.querySelectorAll(".row_hide");
    
                if(rowHides.length === 0) {
                    handler.classList.add("hide");
                }
    
                this.initEvent();
            },
            initEvent: function() {
                handler.addEventListener("click", () => {
                    handler.classList.toggle("active");
    
                    rowHides.forEach(item => {
                        item.classList.toggle("show");
                    });
    
                    this.handleTxt();
                });
            },
            handleTxt: function() {
                if(handler.classList.contains("active")) {
                    handlerTxt.textContent = "닫기";
                } else {
                    handlerTxt.textContent = "펼치기";
                }
            }
        },
        clearText: function() {
            if(document.querySelectorAll(".inputbox").length === 0) return;
    
            const inputboxs = document.querySelectorAll(".inputbox");
            inputboxs.forEach(item => {
                if(item.querySelector(".btn_ico.clear") === null) return;
    
                const btnClear = item.querySelector(".btn_ico.clear");
                const input = item.querySelector("input");

                function activeClass(e) {
                    if(e.target.value.length > 0) {
                        item.classList.add("active");
                    } else {
                        item.classList.remove("active");
                    }
                }

                // console.log(btnClear);
                input.addEventListener("input", (e) => {
                    activeClass(e);
                });
                input.addEventListener("focus", (e) => {
                    activeClass(e);
                });
                input.addEventListener("focusout", (e) => {
                    item.classList.remove("active");
                });
                
                btnClear.addEventListener("click", () => {
                    input.value = "";
                    input.focus();
                    item.classList.remove("active");
                });
            });
        },
        tab: {
            tab: null,
            menu: null,
            pannel: null,
            menuItems: null,
            pannelItems: null,
            preveIndex: null,
            tabBtns: null,

            init: function() {
                if(document.querySelector(".tab") === null) return;

                tab = document.querySelectorAll(".tab");
                tab.forEach((tabItem) => {
                    tabBtns = tabItem.querySelectorAll(".tab_btn");
                    this.initEvent();
                });
                common.ui.handleTabActive.init();
            },
            initEvent: function() {
                tabBtns.forEach((item) => {
                    item.addEventListener("click", () => {
                        menu = item.closest(".tab_menu");
                        menuItems = menu.querySelectorAll("li");
                        pannel = menu.nextElementSibling;
                        pannelItems = pannel.children;
                        this.checkPreveIndex(menuItems);

                        menuItems[this.preveIndex].classList.remove("active");
                        pannelItems[this.preveIndex].classList.remove("active");
                        item.parentElement.classList.add("active");
                        this.checkCurrentIndex(menuItems);
                    });
                });
            },
            checkPreveIndex: function(menuItems) {
                menuItems.forEach((item, index) => {
                    if(item.classList.contains("active")) {
                        this.preveIndex = index;
                    }
                });
            },
            checkCurrentIndex: function(menuItems) {
                menuItems.forEach((item, index) => {
                    if(item.classList.contains("active")) {
                        this.preveIndex = index;
                        this.activePanel(index);
                    }
                });
            },
            activePanel: function(index) {
                pannelItems[index].classList.add("active");
            }
        },
        handleTabActive: {
            tabWrap: null,
            tab: null,
            tabMenu: null,
            tabMenuItems: null,
            tabMenuItemsSize: null,
            tabPanel: null,
            tabPanelItems: null,
            btnNext: null,
            btnPrev: null,
            prevIndex: null,
            init: function() {
                if(document.querySelector(".tap_wrap") === null) return;

                tabWrap = document.querySelector(".tap_wrap");
                btnNext = tabWrap.querySelector(".arrow_rigth");
                btnPrev = tabWrap.querySelector(".arrow_left");
                tab = tabWrap.children[0];
                tabMenu = tab.children[0];
                tabPanel = tab.children[1];
                tabMenuItems = tabMenu.querySelectorAll("li");
                tabMenuItemsSize = tabMenuItems.length - 1;
                tabPanelItems = tabPanel.querySelectorAll(".tab_cont_item");
                // console.log(tabMenuItems);

                this.initEvent();
                this.checkIndex();
                this.stateMoveBtns();
            },
            initEvent: function() {
                btnNext.addEventListener("click", () => {
                    tabMenuItems[this.prevIndex].classList.remove("active");
                    tabPanelItems[this.prevIndex].classList.remove("active");
                    tabMenuItems[this.prevIndex + 1].classList.add("active");
                    tabPanelItems[this.prevIndex + 1].classList.add("active");
                    this.checkIndex();
                    this.stateMoveBtns();
                });
                btnPrev.addEventListener("click", () => {
                    tabMenuItems[this.prevIndex].classList.remove("active");
                    tabPanelItems[this.prevIndex].classList.remove("active");
                    tabMenuItems[this.prevIndex - 1].classList.add("active");
                    tabPanelItems[this.prevIndex - 1].classList.add("active");
                    this.checkIndex();
                    this.stateMoveBtns();
                });
            },
            checkIndex: function() {
                tabMenuItems.forEach((item, index) => {
                    if(item.classList.contains("active")) {
                        this.prevIndex = index;
                    }
                });
            },
            stateMoveBtns: function() {
                if(this.prevIndex === 0) {
                    btnPrev.disabled = true;
                } else {
                    btnPrev.disabled = false;
                }

                if(this.prevIndex === tabMenuItemsSize) {
                    btnNext.disabled = true;
                } else {
                    btnNext.disabled = false;
                }
            }
        },
        bookmark: {
            bookmark: null,
            handler: null,
            listWrap: null,
            list: null,
            titleHeight: null,
            listWrapHeight: null,
            openHeight: null,
            defaultHeight: null,
            delBtns: null,
            init: function() {
                if(document.getElementById("bookmark") === null) return;

                bookmark = document.getElementById("bookmark");
                handler = bookmark.querySelector(".btn_bookmark");
                listWrap = bookmark.querySelector(".bookmark_list_wrap");
                list = bookmark.querySelector(".bookmark_list");
                titleHeight = bookmark.querySelector(".tit").offsetHeight;
                defaultHeight = bookmark.offsetHeight;
                delBtns = bookmark.querySelectorAll(".btn_ico.clear");

                // console.log(bookmark.scrollHeight, bookmark.offsetHeight);
                // console.log(titleHeight, defaultHeight);

                this.initEvent();
                this.remove();
            },
            initEvent: function() {
                common.ui.toggleClass(bookmark, handler, "active");

                handler.addEventListener("click", () => {
                    this.setHeight();
                });
            },
            setHeight: function() {
                // openHeight = bookmark.scrollHeight;
                // openHeight = titleHeight + listWrapHeight + padding + 2;
                listWrapHeight = listWrap.offsetHeight;
                openHeight = listWrapHeight + defaultHeight;
                // console.log("setHeight", openHeight);

                if(bookmark.classList.contains("active")) {
                    bookmark.style.height = `${openHeight}px`;
                    list.childElementCount > 6 ? bookmark.classList.add("shadow") : bookmark.classList.remove("shadow");
                } else {
                    bookmark.style.height = `${defaultHeight}px`;
                    bookmark.classList.remove("shadow");
                }
            },
            remove: function() {
                delBtns.forEach((item, i) => {
                    item.addEventListener("click", (e) => {
                        item.closest("li").remove();
                        this.setHeight();
                    });
                });
            }
        },
        activeTooltip: {
            // tooltip layer
            selectorData: null,
            wrap: null,
            handler: null,
            layer: null,
            init: function(selector) {
                if(document.querySelector(".tooltip_btn") === null) return;

                selectorData = selector;
                wrap = document.querySelector(selector);
                handler = wrap.querySelector(".tooltip_btn");
                layer = wrap.querySelector(".tooltip_layer");

                this.initEvent();
                this.clickBody();
            },
            initEvent: function() {
                handler.addEventListener("click", () => {
                    if(wrap.classList.contains("active")) {
                        wrap.classList.remove("active");
                    } else {
                        wrap.classList.add("active");
                    }
                });
            },
            clickBody: function() {
                body.addEventListener("click", (e) => {
                    const target = e.target.closest(selectorData);
                    if(wrap.classList.contains("active")) {
                        if(target !== wrap) {
                            wrap.classList.remove("active");
                        }
                    }
                });
            }
        }
    }
}