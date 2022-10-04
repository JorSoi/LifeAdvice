const categoriesComponent = document.getElementById('categoriesComponent');
const lesson = document.querySelector('.lesson');

const downvoteBtn = document.getElementById('downvoteBtn');

const getAllCategories = async () => {
    try {
        const response = await fetch('http://localhost:3000/categories');
        if (response.ok) {
            const data = await response.json();
            console.log(data);
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
                <button id="upvoteBtn" onclick="upvote(${randomLesson.id})">👍🏼 ${randomLesson.upvotes}</button>
                <button id="downvoteBtn" onclick="downvote(${randomLesson.id})">👎🏼 ${randomLesson.downvotes}</button>
            </div>`
        } else {
            console.log('Response was not okay')
        }
    } catch (err) {
        console.log(`Code Error: ${err}`);
    }
}





const upvote = async (lesson_id) => {
    
    try {
        document.getElementById('upvoteBtn').style.backgroundColor = "rgba(12, 178, 12, 0.458)";


        const response = await fetch(`http://localhost:3000/lessons/upvote/${lesson_id}`, {
            method: "PUT"
        });
        if (response.ok) {
            const data = await response.json();
            console.log(data);
            document.getElementById('upvoteBtn').innerHTML = `👍🏼 ${data[0].upvotes}`;
        } else {
            console.log('not ok')
        }
        


    } catch (err) {
        console.log(`Code Error: ${err}`);
    }
}


const initWebApp = () => {
    getAllCategories();
    getRandomLesson();
}

initWebApp();

