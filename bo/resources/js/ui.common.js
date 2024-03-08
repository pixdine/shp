window.onload = () => {
    let ww = window.innerWidth;

    checkDevice(ww);
    handleSideBar();
    handleBookmark();
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
    let titleHeight = bookmark.querySelector(".tit").offsetHeight;
    let listWrapHeight = bookmark.querySelector(".bookmark_list_wrap").offsetHeight;
    let bookmarkHeight = titleHeight + listWrapHeight;
    console.log(bookmarkHeight);
    toggleClass(bookmark, handler, "active");
    // bookmark.style.height = `${bookmarkHeight}px`;
}

// 전체메뉴
function handleAllMenu() {

}