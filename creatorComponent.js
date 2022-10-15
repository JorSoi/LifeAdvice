const creatorComponent = document.getElementById('creatorComponent');
const usernameInput = document.getElementById('usernameInput');
const lessonInput = document.getElementById('lessonInput');
const sidebar = document.getElementById('sidebar');
const exitButton = document.querySelector('.exitButton');

usernameInput.addEventListener('input', () => {
    let userValue = usernameInput.value;
    let lessonValue = lessonInput.value;
    if (!userValue) {
        userValue = 'Username';
    }
    showPreviewLesson(userValue, lessonValue)
})

lessonInput.addEventListener('input', () => {
    let userValue = usernameInput.value;
    let lessonValue = lessonInput.value;
    if (!userValue) {
        userValue = 'Username';
    }
    showPreviewLesson(userValue, lessonValue)
})



const showPreviewLesson = (userValue = 'Username', lessonValue = '') => {
    lesson.innerHTML = `
    <p class="author">Lesson learned by <span>${userValue}</span></p>
    <h2>${lessonValue}</h2>
    <div class="voting-wrapper">
        <button id="upvoteBtn">👍🏼 <span> 0</span></button>
        <button id="downvoteBtn">👎🏼 <span> 0</span></button>
    </div>`
}

const openCreatorComponent = () => {
    showPreviewLesson();
    deactivateArrowInteraction();
    desktopCategoriesComponent.style.display = 'none';
    mobileCategoriesComponent.style.display = 'none';
    creatorComponent.style.display = 'block';
    sidebar.style.minWidth = '40vw';  
}


const closeCreatorComponent = () => {
    activateArrowInteraction();
    openCategory(currentCategoryId);
    desktopCategoriesComponent.style.display = 'block';
    mobileCategoriesComponent.style.display = 'block';
    creatorComponent.style.display = 'none';
    sidebar.style.minWidth = '20vw';  
}


const deactivateArrowInteraction = () => {
    leftArrows.forEach((item) => {
        item.style.pointerEvents = 'none';
        item.style.opacity = '20%';
        item.style.cursor = 'auto';
    })
    rightArrows.forEach((item) => {
        item.style.pointerEvents = 'none';
        item.style.opacity = '20%';
        item.style.cursor = 'auto';
    })
}

const activateArrowInteraction = () => {
    leftArrows.forEach((item) => {
        item.style.pointerEvents = 'unset';
    })
    rightArrows.forEach((item) => {
        item.style.pointerEvents = 'unset';
    })
}
