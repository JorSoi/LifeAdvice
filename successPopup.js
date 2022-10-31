const showSuccessMessage = () => {
    successPopup.style.bottom = '2%';
    successPopup.style.opacity = '100%';
    successPopupCategory.innerHTML = ` ${dropdownContainer.selectedOptions[0].innerText}`;
    setTimeout(hideSuccessMessage, 2500);
}

const hideSuccessMessage = () => {
    successPopup.style.bottom = '-60px';
    successPopup.style.opacity = '0%';
}

if (window.innerWidth < 425) {
    successMessageLengthener.innerHTML = '';
}