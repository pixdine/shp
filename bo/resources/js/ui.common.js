window.onload = function() {
    handleSideBar();
}
function handleSideBar() {
    if(document.getElementById("sidebar").length === 0) return;
    
    const sidebar = document.getElementById("sidebar");
    const handler = sidebar.getElementsByClassName("btn_handler");
    handler[0].addEventListener("click", () => {
        sidebar.classList.toggle("active");
    });
}
