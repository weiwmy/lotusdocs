/* Template Name: Weitheme
   Author: weiwmy
   E-mail: hi@weiwmy.com
   Created: October 2024
   Version: 1.0.0
   File Description: Main JS file of the docs template
*/


/*********************************/
/*         INDEX                 */
/*================================
 *     01.  Toggle Menus         *
 *     02.  Active Menu          *
 *     03.  Clickable Menu       *
 *     04.  Back to top          *
 *     05.  DD Menu              *
 *     06.  Active Sidebar Menu  *
 *     07.  ScrollSpy            *
 ================================*/


function initApp() {
    // Menu
    // Toggle menu
    const isToggle = document.getElementById('isToggle');
    if (isToggle) {
        isToggle.onclick = function() {
            this.classList.toggle('open');
            var isOpen = document.getElementById('navigation')
            if (isOpen.style.display === "block") {
                isOpen.style.display = "none";
            } else {
                isOpen.style.display = "block";
            }
        };
    }

    // Menu Active
    activateMenu();
    // Sidebar Menu
    activateSidebarMenu();

    if (document.getElementById("close-sidebar")) {
        document.getElementById("close-sidebar").onclick = function () {
            document.getElementsByClassName("page-wrapper")[0].classList.toggle("toggled");
        };
    }

    // Close Sidebar (mobile)
    if (!window.matchMedia('(min-width: 1024px)').matches) {
        if (document.getElementById("close-sidebar")) {
            const closeSidebar = document.getElementById("close-sidebar");
            const sidebar = document.getElementById("sidebar");
            const sidebarMenuLinks = Array.from(document.querySelectorAll(".sidebar-root-link,.sidebar-nested-link"));
            // Close sidebar by clicking outside
            document.addEventListener('click', function(elem) {
                if (!closeSidebar.contains(elem.target) && !sidebar.contains(elem.target))
                    document.getElementsByClassName("page-wrapper")[0].classList.add("toggled");
            });
            // Close sidebar immediately when clicking sidebar menu item
            sidebarMenuLinks.forEach(menuLink => {
                menuLink.onclick = function () {
                  document.getElementsByClassName("page-wrapper")[0].classList.add("toggled");
                };
            });
        }
    }

    // Clickable Menu
    if (document.getElementById("navigation")) {
        var elements = document.getElementById("navigation").getElementsByTagName("a");
        for (var i = 0, len = elements.length; i < len; i++) {
            elements[i].onclick = function (elem) {
                if (elem.target.getAttribute("href") === "javascript:void(0)") {
                    var submenu = elem.target.nextElementSibling.nextElementSibling;
                    submenu.classList.toggle('open');
                }
            }
        }
    }

    if (document.getElementById("sidebar")) {
        var elements = document.getElementById("sidebar").getElementsByTagName("button");
        for (var i = 0, len = elements.length; i < len; i++) {
            elements[i].onclick = function (elem) {
                elem.target.parentElement.classList.toggle("active");
                elem.target.nextElementSibling.classList.toggle("d-block");
            }
        }
    }

    // Back to top
    const mybutton = document.getElementById("back-to-top");
    if (mybutton) {
        window.onscroll = function () {
            if (document.body.scrollTop > 500 || document.documentElement.scrollTop > 500) {
                mybutton.style.display = "block";
            } else {
                mybutton.style.display = "none";
            }
        };
        mybutton.onclick = function() {
            document.body.scrollTop = 0;
            document.documentElement.scrollTop = 0;
        };
    }

    // DD Menu
    var ddmenu = document.getElementsByClassName("dd-menu");
    for (var i = 0, len = ddmenu.length; i < len; i++) {
        ddmenu[i].onclick = function (elem) {
            elem.stopPropagation();
        }
    }

    // Relative Time
    if (document.getElementById("relativetime")) {
        dayjs.extend(window.dayjs_plugin_relativeTime);
        const modId = document.getElementById('relativetime');
        let modAgo = dayjs(modId.getAttribute('data-authdate')).fromNow();
        modId.innerHTML = modAgo;
    };

    // Tooltips
    const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
    if (window.Tooltip) {
        [...tooltipTriggerList].map(tooltipTriggerEl => new Tooltip(tooltipTriggerEl));
    }
}

// Initialize on Load and Turbo Load
if (window.Turbo) {
    document.addEventListener("turbo:load", initApp);
} else {
    document.addEventListener("DOMContentLoaded", initApp);
}

// Menu sticky (Keep as global scroll listener)
function windowScroll() {
    var navbar = document.getElementById("topnav");
    if (navbar) {
        if (document.body.scrollTop >= 50 || document.documentElement.scrollTop >= 50) {
            navbar.classList.add("nav-sticky");
        } else {
            navbar.classList.remove("nav-sticky");
        }
    }
}

window.addEventListener('scroll', (ev) => {
    windowScroll();
});