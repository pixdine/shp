window.onload = () => {
    let ww = window.innerWidth;

    checkDevice(ww);
    handleSideBar();
    handleBookmark();
    handleAllMenu();
    activeTooltip("[data-tooltip]");
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
    toggleClass(sidebar, handler, "active");
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
    let bookmarkHeight = titleHeight + listWrapHeight;

    list.childElementCount > 3 ? listWrap.classList.add("shadow") : listWrap.classList.remove("shadow");

    toggleClass(bookmark, handler, "active");
    
    handler.addEventListener("click", () => {
        if(bookmark.classList.contains("active")) {
            bookmark.style.height = `${bookmarkHeight}px`;
        } else {
            bookmark.style.height = `${titleHeight}px`;
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
}