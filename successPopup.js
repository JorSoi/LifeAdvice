const showSuccessMessage = () => {
    successPopup.style.bottom = '2%';
    successPopup.style.opacity = '100%';
    setTimeout(hideSuccessMessage, 5000);
}

const hideSuccessMessage = () => {
    successPopup.style.bottom = '-60px';
    successPopup.style.opacity = '0%';
}

