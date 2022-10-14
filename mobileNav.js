const mobileNav = document.getElementById('mobileNav');
let isOpen = false;

const toggleNav = () => {
    if (isOpen) {
        mobileNav.style.bottom = '100vh';
        isOpen = false;
    } else {
        mobileNav.style.bottom = '0px';
        isOpen = true;
    }
}

const closeNavbar = () => {
    mobileNav.style.bottom = '100vh';
    isOpen = false;
}