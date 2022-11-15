isOpen = true;



const openOverlay = () => {
    lessonOverlay.style.display = 'flex';
    overlayMenu.style.display = 'flex';
}

const closeOverlay = () => {
    lessonOverlay.style.display = 'none';
    smContainer.style.display = 'none';
}

const openShareOptions = () => {
    overlayMenu.style.display = 'none';
    smContainer.style.display = 'grid';
    event.stopPropagation();
    adjustLessonHeight();
}















const adjustLessonHeight = () => {
    if (isOpen) {
        lesson.style.minHeight = `${smContainer.offsetHeight + 40}px`;
        
    }
}

