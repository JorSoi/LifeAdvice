
let upvoteMemory = [];
let downvoteMemory = [];
let lessonMemory = [];
let currentCategoryId = 0; // 0 is default (show random lesson). Afterwards it orients by categoryId

const getAllCategories = async () => {
    try {
        const response = await fetch('/server.js/categories');
        if (response.ok) {
            const data = await response.json();
            data.forEach((value) => {
                desktopCategoriesComponent.innerHTML += `<p id="desktop-category-${value.id}" class="category" onclick="openCategory(${value.id})">${value.category_emoji + ' ' + value.category_name}</p>`;
                mobileCategoriesComponent.innerHTML += `<p id="mobile-category-${value.id}" class="category mobile" onclick="openCategory(${value.id}); closeNavbar()">${value.category_emoji + ' ' + value.category_name}</p>`;
                dropdownContainer.innerHTML += `<option value="${value.id}">${value.category_emoji + ' ' + value.category_name}</option>`;
            })
        } else {
            console.log('Response was not okay')
        }
    } catch (err) {
        console.log(`Code Error: ${err}`);
    }
}

//Get Random Lesson Object out of the array from the resolved data promise.
const getRandLesson = (dataArray) => {
    let randomValue = Math.floor(Math.random()* (dataArray.length));
    return dataArray[randomValue]
}


const getRandomLessons = async (category) => {
    try {
        let randomLesson;
        currentCategoryId = 0;
        const response = await fetch('server.js/lessons');
        if (response.ok) {
            const data = await response.json();
            randomLesson = getRandLesson(data);
            lesson.innerHTML = `<p class="author">Lesson learned by <span>${randomLesson.author}</span></p>
            <h2>"${randomLesson.lesson}"</h2>
            
            <div class="voting-wrapper">
                <button id="upvoteBtn" onclick="upvote(${randomLesson.id})">👍🏼 <span> ${randomLesson.upvotes}</span></button>
                <button id="downvoteBtn" onclick="downvote(${randomLesson.id})">👎🏼 <span> ${randomLesson.downvotes}</span></button>
            </div>`
            getVotingBtnColors(randomLesson.id);
            lessonMemory.push(randomLesson.id);
            arrowFunctionality();
        } else {
            console.log('Response was not okay')
        }
    } catch (err) {
        console.log(`Code Error: ${err}`);
    }
}



const clickPreviousLesson = async () => {
    console.log(lessonMemory[lessonMemory.length - 2])
    try {
        let data;
        if (lessonMemory.length > 1) {
            const response = await fetch(`http://localhost:3000/lessons/${lessonMemory[lessonMemory.length - 2]}`);
            if (response.ok) {
                data = await response.json();
                lesson.innerHTML = `<p class="author">Lesson learned by <span>${data[0].author}</span></p>
                <h2>"${data[0].lesson}"</h2>
                
                <div class="voting-wrapper">
                    <button id="upvoteBtn" onclick="upvote(${data[0].id})">👍🏼 <span> ${data[0].upvotes}</span></button>
                    <button id="downvoteBtn" onclick="downvote(${data[0].id})">👎🏼 <span> ${data[0].downvotes}</span></button>
                </div>` 
            }
            getVotingBtnColors(data[0].id);
            lessonMemory.pop();
            arrowFunctionality();
        }  
    } catch (err) { 
        console.log(err);  
    }
}
 
const clickNextLesson = async () => {

    switch(currentCategoryId) {
        case 0:
            getRandomLessons();
            break;
        case 1:
            getCategoryLesson(1);
            break;
        case 2:
            getCategoryLesson(2);
            break;
        case 3:
            getCategoryLesson(3);
            break;
        case 4:
            getCategoryLesson(4);
            break;
        case 5:
            getCategoryLesson(5);
            break;
        case 6:
            getCategoryLesson(6);
            break;
        case 7:
            getCategoryLesson(7);
            break;
        case 8:
            getCategoryLesson(8);
            break;
        default:
            console.log('Category not found...')
    }
}




const upvote = async (lesson_id) => {
    
    try {
        const getResponse = await fetch(`http://localhost:3000/lessons/${lesson_id}`);
        if (getResponse.ok) {
            const getData = await getResponse.json();
            let liked = upvoteMemory.some((value) => {
                return getData[0].id == value;
            })
            let disliked = downvoteMemory.some((value) => {
                return getData[0].id == value;
            })
            if (!liked && !disliked) {
                const putResponse = await fetch(`http://localhost:3000/lessons/upvote/${lesson_id}`, {
                        method: "PUT"
                    });
                if (putResponse.ok) {
                    const putData = await putResponse.json();
                    document.getElementById('upvoteBtn').innerHTML = `👍🏼 <span>${putData[0].upvotes}</span>`;
                    document.getElementById('upvoteBtn').style.backgroundColor = 'rgba(12, 178, 12, 0.458)';
                    upvoteMemory.push(putData[0].id);

                }
            }
        }
        
    } catch (err) {
        console.log(`Code Error: ${err}`);
    }
}

const downvote = async (lesson_id) => {

    try {
        const getResponse = await fetch(`http://localhost:3000/lessons/${lesson_id}`);
        if (getResponse.ok) {
            const getData = await getResponse.json();
            let liked = upvoteMemory.some((value) => {
                return getData[0].id == value;
            })
            let disliked = downvoteMemory.some((value) => {
                return getData[0].id == value;
            })
            if (!disliked & !liked) {
                const putResponse = await fetch(`http://localhost:3000/lessons/downvote/${lesson_id}`, {
                        method: "PUT"
                    });
                if (putResponse.ok) {
                    const putData = await putResponse.json();
                    document.getElementById('downvoteBtn').innerHTML = `👎🏼 <span>${putData[0].downvotes}</span>`;
                    document.getElementById('downvoteBtn').style.backgroundColor = 'rgba(251, 34, 1, 0.463)';
                    downvoteMemory.push(putData[0].id);

                }
            }
        }
        
    } catch (err) {
        console.log(`Code Error: ${err}`);
    }
}
        

        
const openCategory = (categoryId) => {
    currentCategoryId = categoryId;
    lessonMemory = [];
    highlightCategory();
    if (currentCategoryId === 0) {
        getRandomLessons();
    } else {
        getCategoryLesson(currentCategoryId);
    }
}


const getCategoryLesson = async (categoryId) => {
    try {
        let randomLesson;
        const response = await fetch(`http://localhost:3000/lessons/category/${categoryId}`);
        if (response.ok) {
            const data = await response.json();
            randomLesson = getRandLesson(data);
            lesson.innerHTML = `<p class="author">Lesson learned by <span>${randomLesson.author}</span></p>
                <h2>"${randomLesson.lesson}"</h2>
                
                <div class="voting-wrapper">
                    <button id="upvoteBtn" onclick="upvote(${randomLesson.id})">👍🏼 <span> ${randomLesson.upvotes}</span></button>
                    <button id="downvoteBtn" onclick="downvote(${randomLesson.id})">👎🏼 <span> ${randomLesson.downvotes}</span></button>
                </div>`
            }
        getVotingBtnColors(randomLesson.id);
        lessonMemory.push(randomLesson.id)
        arrowFunctionality();
    } catch (err) {
        console.log(err);
    }
}
        






const arrowFunctionality = () => {
    leftArrows.forEach((item) => {
        if(lessonMemory.length > 1) {
            item.style.cursor = 'pointer';
            item.style.opacity = '100%';
        } else {
            item.style.cursor = 'auto';
            item.style.opacity = '20%';
        }
    })
    rightArrows.forEach((item) => {
        item.style.opacity = '100%';
    })
}

//checks if voting button has already been used based on memory and colors it respectively.
const getVotingBtnColors = (lesson_id) => {
    upvoteMemory.forEach((value) => {
        if(lesson_id === value) {
            document.getElementById('upvoteBtn').style.backgroundColor = "rgba(12, 178, 12, 0.458)";  
        }
    })
    downvoteMemory.forEach((value) => {
        if(lesson_id === value) {
            document.getElementById('downvoteBtn').style.backgroundColor = "rgba(251, 34, 1, 0.463)";
        }
    })
}
  

const highlightCategory = () => {
    document.querySelectorAll('.category').forEach((classItem) => {
        classItem.style.backgroundColor = 'unset'
    })
    document.getElementById(`desktop-category-${currentCategoryId}`).style.backgroundColor = 'rgb(253, 224, 188)';
    document.getElementById(`mobile-category-${currentCategoryId}`).style.backgroundColor = 'rgb(253, 224, 188)';
}

const initWebApp = () => {
    getAllCategories();
    getRandomLessons();
    highlightCategory();
}

initWebApp();