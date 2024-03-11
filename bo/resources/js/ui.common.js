window.onload = () => {
    let ww = window.innerWidth;

    checkDevice(ww);
    handleSideBar();
    handleBookmark();
    handleAllMenu();
    handleLnb();
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

// lnb메뉴
function handleLnb() {
    const lnb = document.querySelector(".lnb_menu");
    const depth2 = lnb.querySelectorAll(".btn_depth2");
    const btnMenu = lnb.querySelectorAll(".btn_menu");
    const test = lnb.querySelector(".has_sub");
    let prevItem = null;

    // console.log(prevItem);

    btnMenu.forEach((item, index) => {
        item.addEventListener("click", (e) => {
            console.log(item.parentElement.parentElement.parentElement);
            if(!item.classList.contains("btn_depth2")) {
                // console.log(btnMenu);
                // btnMenu.closest("li").classList.remove("on");
                if(prevItem !== null) {
                    // console.log(btnMenu[prevItem]);
                    btnMenu[prevItem].closest("li").classList.remove("on");
                    btnMenu[prevItem].parentElement.parentElement.parentElement.classList.remove("on");
                }
                item.closest("li").classList.add("on");
                
                if(item.parentElement.parentElement.parentElement === test) {
                    console.log("dd");
                    item.parentElement.parentElement.parentElement.classList.add("on");
                }
                prevItem = index;
            }
        });
    });
    

    depth2.forEach((item, index) => {
        item.addEventListener("click", (e) => {
            if(!item.closest(".has_sub")) return;

            const defaultHeight = item.offsetHeight;
            const depth3 = item.nextElementSibling;
            let depth3Height = depth3.offsetHeight;
            let openHeight = defaultHeight + depth3Height;
            // console.log(depth3Height);
            // let tt = e.target.closest(".has_sub");

            item.closest(".has_sub").classList.toggle("open");

            if(item.closest(".has_sub").classList.contains("open")) {
                item.closest(".has_sub").style.height = `${openHeight}px`;
            } else {
                item.closest(".has_sub").style.height = `${defaultHeight}px`;
            }
            // console.log(tt);
        });
    });
}

// lnb 높이
function setLnbHeight() {

}

// 즐겨찾기
function handleBookmark() {
    if(document.getElementById("bookmark").length === 0) return;

    const body = document.querySelector("body");
    const bookmark = document.getElementById("bookmark");
    const handler = bookmark.querySelector(".btn_bookmark");
    const listWrap = bookmark.querySelector(".bookmark_list_wrap");
    const list = bookmark.querySelector(".bookmark_list");
    let titleHeight = bookmark.querySelector(".tit").offsetHeight;
    let listWrapHeight = listWrap.offsetHeight;
    let listHeight = list.offsetHeight;
    let padding = 16;
    let bookmarkHeight = titleHeight + listWrapHeight + padding;

    list.childElementCount > 6 ? bookmark.classList.add("shadow") : bookmark.classList.remove("shadow");

    toggleClass(bookmark, handler, "active");

    // console.log(listHeight);
    
    handler.addEventListener("click", () => {
        if(bookmark.classList.contains("active")) {
            bookmark.style.height = `${bookmarkHeight}px`;
        } else {
            bookmark.style.height = `${titleHeight + padding}px`;
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