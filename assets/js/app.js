// Menu sticky
function windowScroll() {
    const navbar = document.getElementById("topnav");
    if(navbar!=null){
        if (
            document.body.scrollTop >= 50 ||
            document.documentElement.scrollTop >= 50
        ) {
            navbar.classList.add("nav-sticky");
        } else {
            navbar.classList.remove("nav-sticky");
        }
    }
}

window.addEventListener('scroll', () => {
    windowScroll();
}, { passive: true });

document.addEventListener('DOMContentLoaded', () => {
    const toggle = document.getElementById('isToggle');
    const navigation = document.getElementById('navigation');

    if (!toggle || !navigation) return;

    toggle.addEventListener('click', () => {
        toggle.classList.toggle('open');
        navigation.style.display = navigation.style.display === 'block' ? 'none' : 'block';
    });
});
