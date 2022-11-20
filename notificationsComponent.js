//Global Settings 
const showNotificationComponent = () => {
    notificationsComponent.style.bottom = '2%';
    notificationsComponent.style.opacity = '100%';
    setTimeout(hideNotificationComponent, 2500);
}

const hideNotificationComponent = () => {
    notificationsComponent.style.bottom = '-60px';
    notificationsComponent.style.opacity = '0%';
    setTimeout(() => {
        for (let i = 0; i < notificationsComponent.children.length; i++) {
            notificationsComponent.children[i].style.display = 'none';
        }
    }, 800)
}




//Submit Post Success Notification
const showSubmitMessage = () => {
    submitMsgWrapper.style.display = 'flex';
    successPopupCategory.innerHTML = ` ${dropdownContainer.selectedOptions[0].innerText}`;
    if (window.innerWidth < 425) {
        successMessageLengthener.innerHTML = '';
    }
    showNotificationComponent();
}


//Copied Link to Clipboard Notification
const showClipboardNotification = () => {
    clipboardMsgWrapper.style.display = 'flex';
    showNotificationComponent();
}

//Report Notification
const showReportNotification = () => {
    reportMsgWrapper.style.display = 'flex';
    showNotificationComponent();
}

//Error Notification
const showErrorNotification = () => {
    errorMsgWrapper.style.display = 'flex';
    showNotificationComponent();
}