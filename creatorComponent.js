


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
    showPreviewLesson(userValue, lessonValue);
    showCharCount(lessonValue);
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
    deacivateLessonInteraction();
    cleanUpForm();
    desktopCategoriesComponent.style.display = 'none';
    creatorComponent.style.display = 'block';
    sidebar.style.minWidth = '40vw';  
    if (window.innerWidth < 768) {
        sidebar.style.height = '100vh';
        contentBody.style.display  = 'none';
        sidebar.style.display = 'flex';
        sidebar.firstElementChild.style.position = 'absolute';
        sidebar.firstElementChild.style.padding = 'unset';
        sidebar.firstElementChild.style.border = 'none';
        sidebar.firstElementChild.style.top = '15px';
        sidebar.firstElementChild.style.left = '15px';
    }
}

const submitLesson = () => {
    if(usernameInput.value.length >= usernameInput.minLength && lessonInput.value.length >= lessonInput.minLength && dropdownContainer.value) { 
        showSuccessMessage(); //invoke before closeCreatorComponent otherwise no value will be found!
        closeCreatorComponent();
       
    }
}

const closeCreatorComponent = () => {
    lessonMemory.push(-1) //used to make compatible with clickpreviousfunction when closing creatorComponent.
    activateArrowInteraction();
    clickPreviousLesson();
    creatorComponent.style.display = 'none';
    sidebar.style.minWidth = '20vw';
    if (window.innerWidth > 768) {
        desktopCategoriesComponent.style.display = 'block';
    }
    if (window.innerWidth > 425 && window.innerWidth < 769) {
        desktopCategoriesComponent.style.display = 'flex';
    }
    if (window.innerWidth < 768) {
        sidebar.style.height = 'auto';
        contentBody.style.display  = 'flex';
        sidebar.style.display = 'block';
        sidebar.firstElementChild.style.position = 'unset';
        sidebar.firstElementChild.style.padding = '15px';
        sidebar.firstElementChild.style.borderBottom = '1px solid rgba(0, 0, 0, 0.179)';
    }  
}


const deacivateLessonInteraction = () => {
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
        item.style.cursor = 'pointer';
    })
}



const showCharCount = (value) => {
    let maxChar = 250;
    let currentChar = value.length;
    let percentageUsed = currentChar/maxChar;
    textCountLimit.innerHTML = `${currentChar}/${maxChar}`;
    if (percentageUsed > 0.85) {
        textCountLimit.style.color = '#d51818';
    } else if (percentageUsed > 0.7) {
        textCountLimit.style.color = '#d58618';
    } else {
        textCountLimit.style.color = '#5d5d5d';
    }
}

const cleanUpForm = () => {
    usernameInput.value = '';
    lessonInput.value = '';
    dropdownContainer.value = '';
    showCharCount(lessonInput.value)
}
