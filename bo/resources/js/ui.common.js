const body = document.querySelector("body");

window.onload = () => {
    let ww = window.innerWidth;

    checkDevice(ww);
    handleSideBar();
    handleBookmark();
    handleAllMenu();
    activeTooltip("[data-tooltip]");
    leftMenu.init();
}


window.addEventListener("resize", () => {
    let ww = window.innerWidth;
    checkDevice(ww);
});

// 디바이스 체크
function checkDevice(ww) {
    const wrap = document.querySelector(".wrap");
    ww < 1600 ? wrap.classList.add("scroll_x") : wrap.classList.remove("scroll_x");
}

function toggleClass(target, handler, active) {
    handler.addEventListener("click", () => {
        target.classList.toggle(active);
    });
}

// 사이드바
function handleSideBar() {
    if(document.getElementById("sidebar").length === 0) return;

    const sidebar = document.getElementById("sidebar");
    const handler = sidebar.querySelector(".btn_handler");
    const handlerTxt = handler.querySelector(".blind");
    toggleClass(sidebar, handler, "active");

    stateSideBar();

    handler.addEventListener("click", () => {
        stateSideBar();
    });
}

// 사이드바 상태
function stateSideBar() {
    const sidebar = document.getElementById("sidebar");
    const handlerTxt = document.querySelector(".btn_handler .blind");
    if(sidebar.classList.contains("active")) {
        handlerTxt.textContent = "메뉴 닫기";
    } else {
        handlerTxt.textContent = "메뉴 열기";
    }
}


// lnb메뉴
const leftMenu = {
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
}



// 즐겨찾기
function handleBookmark() {
    if(document.getElementById("bookmark").length === 0) return;

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