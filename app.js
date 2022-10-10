const categoriesComponent = document.getElementById('categoriesComponent');
const lesson = document.querySelector('.lesson');
const downvoteBtn = document.getElementById('downvoteBtn');
const leftArrow = document.getElementById('left-arrow');

let upvoteMemory = [];
let downvoteMemory = [];
let lessonMemory = [];

const getAllCategories = async () => {
    try {
        const response = await fetch('http://localhost:3000/categories');
        if (response.ok) {
            const data = await response.json();
            data.forEach((value) => {
                categoriesComponent.innerHTML += `<p id="category-${value.id}" class="category" onclick="getCategoryLessons(${value.id})">${value.category_emoji + ' ' + value.category_name}</p>`;
            })
        } else {
            console.log('Response was not okay')
        }
    } catch (err) {
        console.log(`Code Error: ${err}`);
    }
}





const getRandomLesson = async () => {
    try {
        const response = await fetch('http://localhost:3000/lessons');
        if (response.ok) {
            const data = await response.json();
            const randomInt = Math.floor(Math.random()* (data.length));
            const randomLesson = data[randomInt];
            lesson.innerHTML = `<p class="author">Lesson learned by <span>${randomLesson.author}</span></p>
            <h2>"${randomLesson.lesson}"</h2>
            
            <div class="voting-wrapper">
                <button id="upvoteBtn" onclick="upvote(${randomLesson.id})">👍🏼 <span> ${randomLesson.upvotes}</span></button>
                <button id="downvoteBtn" onclick="downvote(${randomLesson.id})">👎🏼 <span> ${randomLesson.downvotes}</span></button>
            </div>`
            getVotingBtnColors(randomLesson.id);
            lessonMemory.push(randomLesson.id);
            leftArrowFunctionality();
        } else {
            console.log('Response was not okay')
        }
    } catch (err) {
        console.log(`Code Error: ${err}`);
    }
}



const clickPreviousLesson = async () => {
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
            leftArrowFunctionality();
        } 
    } catch (err) {
        console.log(err);
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
        

        




        // document.getElementById('upvoteBtn').innerHTML = `👍🏼 <span>${data[0].upvotes}</span>`;
        // document.getElementById('upvoteBtn').style.backgroundColor = 'green';
        // upvoteMemory.push(data[0].id);
        // const response = await fetch(`http://localhost:3000/lessons/upvote/${lesson_id}`, {
        //     method: "PUT"
        // });
        // if (response.ok) {
        //     const data = await response.json();
            
        //         upvoteMemory.forEach((value) => {
        //             if(data[0].id !== value) {
                        
        //             }
        //         })
            
            // upvoteMemory.forEach((value) => {
            //     console.log(value);
            //     if (value == data[0].id) {

            //     } else {
            //         console.log('hello')
            //         document.getElementById('upvoteBtn').innerHTML = `👍🏼 <span>${data[0].upvotes}</span>`;
            //         document.getElementById('upvoteBtn').style.backgroundColor = 'green';
            //         upvoteMemory.push(data[0].id);
            //     }
            // })

        // } else {
        //     console.log('not ok')
        // }
        





const initWebApp = () => {
    getAllCategories();
    getRandomLesson();
}

initWebApp();

const leftArrowFunctionality = () => {
    if(lessonMemory.length > 1) {
        leftArrow.style.cursor = 'pointer';
        leftArrow.style.opacity = '100%';
    } else {
        leftArrow.style.cursor = 'auto';
        leftArrow.style.opacity = '20%';
    }
}

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

