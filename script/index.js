const loadLessons = () => {
    fetch("https://openapi.programming-hero.com/api/levels/all")
        .then(res => res.json())
        .then(json => displayLesson(json.data));
};
const removeActive = () => {
    const lessonButtons = document.querySelectorAll('.lesson-btn');
    lessonButtons.forEach(btn => {
        btn.classList.remove('active');
    })
}

const loadLevelWord = (id) => {
    const url = `https://openapi.programming-hero.com/api/level/${id}`;
    fetch(url)
        .then(res => res.json())
        .then(data => {
        removeActive();
        const clickedbtn = document.getElementById(`lesson-btn-${id}`);
        clickedbtn.classList.add('active'); 
        displayLevelWord(data.data)});
};



// demo object
// {
//     "id": 5,
//     "level": 1,
//     "word": "Eager",
//     "meaning": "আগ্রহী",
//     "pronunciation": "ইগার"
// }


const displayLevelWord = (words) => {
    console.log(words)
    
    const wordContainer = document.getElementById('word-container');
    if(words.length == 0){
        wordContainer.innerHTML = `
            <div class="font-bangla text-center  col-span-full rounded-xl py-10 px-7 space-y-6">
                <img class="mx-auto" src="../assets/alert-error.png">
                <p class="text-[#79716B]">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
                <h3 class="font-medium text-[32px] text-[#292524]">নেক্সট Lesson এ যান</h3>
            </div>
        `;
        return ;
    }
    wordContainer.innerHTML = "";
    words.forEach((word) => {
        const card = document.createElement('div');
        card.innerHTML = `
                    <div class="bg-white py-10 px-7 text-center rounded-xl space-y-4">
                        <h2 class="font-bold text-[32px]">${word.word ? word.word : "শব্দ পাওয়া যায় নি"}</h2>
                        <p class="font-medium text-[20px]">Meaning /Pronounciation</p>
                        <div class="font-bangla font-semibold text-[32px]">"${word.meaning ? word.meaning : "অর্থ  পাওয়া যায় নি"} / ${word.pronunciation ? word.pronunciation : "উচ্চারন  পাওয়া যায় নি"}"</div>
                        <div class="flex justify-between items-center">
                            <button class="btn bg-sky-50 rounded-sm hover:bg-sky-100"><i class="fa-solid fa-circle-info"></i></button>
                            <button class="btn bg-sky-50 rounded-sm hover:bg-sky-100"><i class="fa-solid fa-volume-high"></i></button>
                        </div>
                    </div>
        `
        wordContainer.appendChild(card);
    });
};


const displayLesson = (lessons) => {
    const levelContainer = document.getElementById('level-container');
    levelContainer.innerHTML = "";
    lessons.forEach((lesson) => {
        const btnDiv = document.createElement('div');
        btnDiv.innerHTML = `
                <button id="lesson-btn-${lesson.level_no}" onclick="loadLevelWord(${lesson.level_no})" class="btn btn-outline btn-primary lesson-btn"><i class="fa-solid fa-book-open"></i>Lesson-${lesson.level_no}</button>
        `
        levelContainer.append(btnDiv);
    });
};

loadLessons();