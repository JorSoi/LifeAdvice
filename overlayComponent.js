let areOpen;



const openOverlay = () => {
    document.getElementById('lesson-overlay').style.display = 'flex';
    document.getElementById('overlay-menu-container').style.display = 'flex';
}

const closeOverlay = () => {
    areOpen = false;
    document.getElementById('lesson-overlay').style.display = 'none';
    document.getElementById('sm-container').style.display = 'none';
    adjustLessonHeight();
}

const openShareOptions = () => {
    areOpen = true;
    document.getElementById('overlay-menu-container').style.display = 'none';
    document.getElementById('sm-container').style.display = 'grid';
    adjustLessonHeight();
    event.stopPropagation();
}

const addToClipboard = async () => {
    await navigator.clipboard.writeText('http://lifeadvice.herokuapp.com')
    showClipboardNotification();
}



const adjustLessonHeight = () => {
    if (areOpen) {
        document.querySelector('.lesson').style.minHeight = `${document.getElementById('sm-container').offsetHeight + 60}px`;
    } else {
        document.querySelector('.lesson').style.minHeight = 'unset';
    }
}

