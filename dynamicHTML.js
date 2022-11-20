const populateHTMLlesson = (categoryEmoji, author, lesson, upvotes, downvotes, lessonId) => {
    return `
        <div id="lesson-category">
            <p id="category-icon">${categoryEmoji}</p>
        </div>
        <p class="author">Lesson learned by <span>${author}</span></p>
        <h2>"${lesson}"</h2>
        
        <div class="voting-wrapper">
            <button id="upvoteBtn" onclick="upvote(${lessonId})">👍🏼 <span> ${upvotes}</span></button>
            <button id="downvoteBtn" onclick="downvote(${lessonId})">👎🏼 <span> ${downvotes}</span></button>
        </div>
        <div id="lesson-overlay" onclick="closeOverlay()">
        <div id="overlay-menu-container">
            <div id="share-button" onclick="openShareOptions()">
                <button><img src="assets/share-icon.svg"></button>
                <p>Share it!</p>
            </div>
            <div id="report-button" onclick="reportLesson(${lessonId})">
                <button><img src="assets/report-icon.svg"></button>
                <p>Report</p>
            </div>
        </div>

        <div id="sm-container">
            <div class="sm-share-wrapper" onclick="window.open('http://twitter.com/share?text=${lesson}&url=https://lifeadvice.herokuapp.com&hashtags=lifeadvice,personalLesson,learning','mywindow')">
                <div class="sm-icon-wrapper twitter">
                    <img src="assets/twitter-icon.svg">
                </div>
                <p>Twitter</p>
            </div>
            <div class="sm-share-wrapper" onclick="window.open('https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Flifeadvice.herokuapp.com%2F&amp%3Bsrc=sdkpreparse')">
                <div class="sm-icon-wrapper facebook">
                    <img src="assets/facebook-icon.svg">
                </div>
                <p>Facebook</p>
            </div>
            <div class="sm-share-wrapper" onclick="window.open('https://reddit.com/submit?url=https://lifeadvice.herokuapp.com&title=Here are some life lessons which I have learned.')">
                <div class="sm-icon-wrapper reddit">
                    <img src="assets/reddit-icon.svg">
                </div>
                <p>Reddit</p>
            </div>
            <div class="sm-share-wrapper" onclick="window.open('https://telegram.me/share/url?url=https://lifeadvice.herokuapp.com&text=Here are some life lesson which I have learned.')">
                <div class="sm-icon-wrapper telegram">
                    <img src="assets/telegram-icon.svg">
                </div>
                <p>Telegram</p>
            </div>
            <div class="sm-share-wrapper" onclick="window.open('whatsapp://send?text=Here are some life lesson which I have learned: https://lifeadvice.herokuapp.com')">
                <div class="sm-icon-wrapper whatsapp">
                    <img src="assets/whatsapp-icon.svg">
                </div>
                <p>WhatsApp</p>
            </div>
            <div class="sm-share-wrapper" onclick="addToClipboard()">
                <div class="sm-icon-wrapper copy-link">
                    <img src="assets/copy-link-icon.svg">
                </div>
                <p>Copy Link</p>
            </div>
        </div>
    </div>
    <div id="overlay-btn" onclick="openOverlay()">
        <div class="dot"></div>
        <div class="dot"></div>
        <div class="dot"></div>
    </div>
    `
}

