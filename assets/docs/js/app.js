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


function getClosest(elem, selector) {
    if (!Element.prototype.matches) {
        Element.prototype.matches = Element.prototype.matchesSelector || Element.prototype.mozMatchesSelector || Element.prototype.msMatchesSelector || Element.prototype.oMatchesSelector || Element.prototype.webkitMatchesSelector || function (s) {
            var matches = (this.document || this.ownerDocument).querySelectorAll(s), i = matches.length;
            while (--i >= 0 && matches.item(i) !== this) { }
            return i > -1;
        };
    }
    for (; elem && elem !== document; elem = elem.parentNode) {
        if (elem.matches(selector)) return elem;
    }
    return null;
}

function activateMenu() {
    var menuItems = document.getElementsByClassName("sub-menu-item");
    if (menuItems) {
        var matchingMenuItem = null;
        for (var idx = 0; idx < menuItems.length; idx++) {
            if (menuItems[idx].href === window.location.href) {
                matchingMenuItem = menuItems[idx];
            }
        }
        if (matchingMenuItem) {
            matchingMenuItem.classList.add('active');
            var immediateParent = getClosest(matchingMenuItem, 'li');
            if (immediateParent) immediateParent.classList.add('active');
            var parent = getClosest(matchingMenuItem, '.parent-menu-item');
            if (parent) {
                parent.classList.add('active');
                var parentMenuitem = parent.querySelector('.menu-item');
                if (parentMenuitem) parentMenuitem.classList.add('active');
                var parentOfParent = getClosest(parent, '.parent-parent-menu-item');
                if (parentOfParent) parentOfParent.classList.add('active');
            } else {
                var parentOfParent = getClosest(matchingMenuItem, '.parent-parent-menu-item');
                if (parentOfParent) parentOfParent.classList.add('active');
            }
        }
    }
}

function activateSidebarMenu() {
    var current = location.pathname.substring(location.pathname.lastIndexOf('/') + 1);
    if (current !== "" && document.getElementById("sidebar")) {
        var menuItems = document.querySelectorAll('#sidebar button');
        for (var i = 0, len = menuItems.length; i < len; i++) {
            const href = menuItems[i].getAttribute("href") || "";
            if (href.indexOf(current) !== -1) {
                menuItems[i].parentElement.className += " active";
                if (menuItems[i].closest(".sidebar-submenu")) menuItems[i].closest(".sidebar-submenu").classList.add("d-block");
                if (menuItems[i].closest(".sidebar-dropdown")) menuItems[i].closest(".sidebar-dropdown").classList.add("active");
            }
        }
    }
}

function initApp() {
    // Menu
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

    activateMenu();
    activateSidebarMenu();

    const closeSidebar = document.getElementById("close-sidebar");
    if (closeSidebar) {
        closeSidebar.onclick = function () {
            document.getElementsByClassName("page-wrapper")[0].classList.toggle("toggled");
        };
    }

    // Clickable Menu
    const navigation = document.getElementById("navigation");
    if (navigation) {
        var elements = navigation.getElementsByTagName("a");
        for (var i = 0, len = elements.length; i < len; i++) {
            elements[i].onclick = function (elem) {
                if (elem.target.getAttribute("href") === "javascript:void(0)") {
                    var submenu = elem.target.nextElementSibling.nextElementSibling;
                    submenu.classList.toggle('open');
                }
            }
        }
    }

    const sidebar = document.getElementById("sidebar");
    if (sidebar) {
        var elements = sidebar.getElementsByTagName("button");
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

// Sidebar Overlay Click (Global - Only once)
document.addEventListener('click', function(elem) {
    const sidebar = document.getElementById("sidebar");
    const closeSidebar = document.getElementById("close-sidebar");
    const wrapper = document.getElementsByClassName("page-wrapper")[0];
    if (sidebar && closeSidebar && wrapper && !window.matchMedia('(min-width: 1024px)').matches) {
        if (!closeSidebar.contains(elem.target) && !sidebar.contains(elem.target)) {
            wrapper.classList.add("toggled");
        }
    }
});

// Initialize
if (window.Turbo) {
    document.addEventListener("turbo:load", initApp);
} else {
    document.addEventListener("DOMContentLoaded", initApp);
}

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
window.addEventListener('scroll', windowScroll);