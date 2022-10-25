//For app.js
const desktopCategoriesComponent = document.getElementById('categoriesComponent');
const mobileCategoriesComponent = document.getElementById('mobileCategoryWrapper');
const lesson = document.querySelector('.lesson');
const downvoteBtn = document.getElementById('downvoteBtn');
const leftArrows = document.querySelectorAll('.left-arrow');
const rightArrows = document.querySelectorAll('.right-arrow');
const dropdownContainer = document.getElementById('dropdownContainer');

//Environment Manager
let baseURL;
if (process.env.NODE_ENV === 'development') {
    baseURL = `http://localhost:${PORT}`;
} else {
    baseURL = 'https://lifeadvice.herokuapp.com/';
}


//For creatorComponent.js
const creatorComponent = document.getElementById('creatorComponent');
const usernameInput = document.getElementById('usernameInput');
const lessonInput = document.getElementById('lessonInput');
const sidebar = document.getElementById('sidebar');
const submitButton = document.getElementById('submitButton');
const exitButton = document.querySelector('.exitButton');
const contentBody = document.getElementById('contentBody');
const textCountLimit = document.getElementById('textCountLimit');

//For successPopup
const successPopup = document.getElementById('successMessageWrapper');
const successPopupCategory = document.getElementById('success-popup-category');