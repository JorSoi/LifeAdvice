const categoriesComponent = document.getElementById('categoriesComponent');

const getAllCategories = async () => {
    try {
        const response = await fetch('http://localhost:3000');
        if (response.ok) {
            const data = await response.json();
            console.log(data);
            data.forEach((value) => {
                categoriesComponent.innerHTML += `<p id="category-${value.id}" class="category" onclick="getCategoryLessons(${value.id})">${value.category_emoji + ' ' + value.category_name}</p>`;
            })
        }
    } catch (err) {
        console.log(`Code Error: ${err}`);
    }
}

getAllCategories();