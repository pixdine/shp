const body = document.querySelector("body");

window.executeLayout = function() {
    let ww = window.innerWidth;

    checkDevice(ww);
    handleAllMenu();
    activeTooltip("[data-tooltip]");
    handleBookmark();
    common.leftMenu.init();
    common.ui.clearText();
}

window.executeMacro = function() {
    let ww = window.innerWidth;

    checkDevice(ww);
    activeTooltip("[data-tooltip]");
    common.ui.handleRow.init();
    common.ui.clearText();
}


window.addEventListener("resize", () => {
    let ww = window.innerWidth;
    checkDevice(ww);
});

const common = {
    // 사이드바
    sidebar: {
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
            toggleClass(container, handler, "has_side");
            toggleClass(sidebar, handler, "active");
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
    // lnb메뉴
    leftMenu: {
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
    ui: {
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
            menuItems: null,
            contItems: null,
            preveIndex: 0,

            init: function(selector) {
                if(document.querySelector(selector) === null) return;

                tab = document.querySelector(selector);
                menuItems = tab.querySelectorAll(".tab_menu li");
                contItems = tab.querySelectorAll(".tab_cont .tab_cont_item");

                this.initEvent();
            },
            initEvent: function() {
                // console.log(menuItems);
                menuItems.forEach((item, index) => {
                    item.addEventListener("click", () => {
                        menuItems[this.preveIndex].classList.remove("active");
                        contItems[this.preveIndex].classList.remove("active");
                        item.classList.add("active");
                        contItems[index].classList.add("active");
                        this.preveIndex = index;
                    });
                });
            }
        }
    }
    
}

// 디바이스 체크
function checkDevice(ww) {
    if(document.querySelector(".wrap") === null) return;

    const wrap = document.querySelector(".wrap");
    ww < 1600 ? wrap.classList.add("scroll_x") : wrap.classList.remove("scroll_x");
}

function toggleClass(target, handler, active) {
    handler.addEventListener("click", () => {
        target.classList.toggle(active);
    });
}

// 즐겨찾기
function handleBookmark() {
    if(document.getElementById("bookmark") === null) return;

    const bookmark = document.getElementById("bookmark");
    const handler = bookmark.querySelector(".btn_bookmark");
    const listWrap = bookmark.querySelector(".bookmark_list_wrap");
    const list = bookmark.querySelector(".bookmark_list");
    let titleHeight = bookmark.querySelector(".tit").offsetHeight;
    let listWrapHeight = listWrap.offsetHeight;
    let padding = 16;
    let openHeight = titleHeight + listWrapHeight + padding + 2;
    let defaultHeight = titleHeight + padding;

    toggleClass(bookmark, handler, "active");
    
    handler.addEventListener("click", () => {
        if(bookmark.classList.contains("active")) {
            bookmark.style.height = `${openHeight}px`;
            list.childElementCount > 6 ? bookmark.classList.add("shadow") : bookmark.classList.remove("shadow");
        } else {
            bookmark.style.height = `${defaultHeight}px`;
            bookmark.classList.remove("shadow");
        }
    });
}

// 전체메뉴
function handleAllMenu() {
    if(document.getElementById("gnb") === null) return;

    const gnb = document.querySelector("#gnb");
    const handler = gnb.querySelector(".btn_allmenu");
    let navHeight = gnb.querySelector(".menu_list").offsetHeight;
    let height = 53;
    // let activeHeight = height + navHeight;

    gnb.style.height = `${height}px`;

    toggleClass(gnb, handler, "active");


    handler.addEventListener("click", () => {
        if(gnb.classList.contains("active")) {
            gnb.style.height = `${navHeight}px`;
        } else {
            gnb.style.height = `${height}px`;
        }
    });
}

// tooltip layer
function activeTooltip(selector) {
    if(document.querySelector(".tooltip_btn") === null) return;

    const body = document.querySelector("body");
    const wrap = document.querySelector(selector);
    const handler = wrap.querySelector(".tooltip_btn");
    const layer = wrap.querySelector(".tooltip_layer");

    handler.addEventListener("click", () => {
        if(wrap.classList.contains("active")) {
            wrap.classList.remove("active");
        } else {
            wrap.classList.add("active");
        }
    });

    body.addEventListener("click", (e) => {
        const target = e.target.closest(selector);
        if(wrap.classList.contains("active")) {
            if(target !== wrap) {
                wrap.classList.remove("active");
            }
        }
    });
}