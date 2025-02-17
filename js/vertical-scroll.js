// ("nav").find("a").click(function(e) {
//     e.preventDefault();
//     var section = $(this).attr("href");
//     $("html, body").animate({
//         scrollTop: $(section).offset().top,
//     },);
// });
document.querySelectorAll("nav a").forEach(link => {
    link.addEventListener("click", function(e) {
        e.preventDefault();
        const section = document.querySelector(this.getAttribute("href"));
        section.scrollIntoView({ behavior: "smooth" });
    });
});
