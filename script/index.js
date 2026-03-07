const createElements = (arr) => {
    const htmlElements = arr.map(el =>`<span class="btn text-[20px]">${el}</span>` );
    // console.log(htmlElements)
    return htmlElements.join("  ");
};


function pronounceWord(word) {
  const utterance = new SpeechSynthesisUtterance(word);
  utterance.lang = "en-EN"; // English
  window.speechSynthesis.speak(utterance);
}


const manageSpinner = (status) => {
    if(status == true){
        document.getElementById('spinner').classList.remove('hidden');
        document.getElementById('word-container').classList.add('hidden');
    }
    else{
        document.getElementById('word-container').classList.remove('hidden');
        document.getElementById('spinner').classList.add('hidden');
    }
};

const loadLessons = () => {
    fetch("https://openapi.programming-hero.com/api/levels/all")
        .then(res => res.json())
        .then(json => displayLesson(json.data));
};
const removeActive = () => {
    const lessonButtons = document.querySelectorAll('.lesson-btn');
    lessonButtons.forEach(btn => {
        btn.classList.remove('active');
    });
};

const loadLevelWord = (id) => {
    manageSpinner(true);
    const url = `https://openapi.programming-hero.com/api/level/${id}`;
    fetch(url)
        .then(res => res.json())
        .then(data => {
        removeActive();
        const clickedbtn = document.getElementById(`lesson-btn-${id}`);
        clickedbtn.classList.add('active'); 
        displayLevelWord(data.data)});
};



const loadWordDetails =async (id) => {
    const url = `https://openapi.programming-hero.com/api/word/${id}`;
    const res = await fetch(url);
    const details = await res.json();
    displayWordDetails(details.data);
};
 



// demo object
// {
//     "word": "Sincere",
//     "meaning": "সত্‍ / আন্তরিক",
//     "pronunciation": "সিনসিয়ার",
//     "level": 1,
//     "sentence": "He gave a sincere apology.",
//     "points": 1,
//     "partsOfSpeech": "adjective",
//     "synonyms": [
//         "honest",
//         "genuine",
//         "truthful"
//     ],
//     "id": 19
// }
const displayWordDetails = (word) => {
    console.log(word);
    const detailsBox = document.getElementById('details-container');
    detailsBox.innerHTML = `
                <div>
                    <h2 class="font-semibold text-[36px]">${word.word} (<i class="fa-solid fa-microphone-lines"></i>:${word.pronunciation})</h2>
                </div>
                <div>
                    <h2 class="font-semibold text-[24px]">Meaning</h2>
                    <p class="font-bangla font-medium text-[24px]">${word.meaning}</p>
                </div>
                <div>
                    <h2 class="font-semibold text-[24px]">Example</h2>
                    <p class="text-[24px]"> ${word.sentence}</p>
                </div>
                <div>
                    <h2 class="font-bangla font-medium text-[24px]">সমার্থক শব্দ গুলো</h2>
                    <div>${createElements(word.synonyms)}</div>
                </div>
    `
   document.getElementById('my_modal_5').showModal();
    
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
                <img class="mx-auto" src="./assets/alert-error.png">
                <p class="text-[#79716B]">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
                <h3 class="font-medium text-[32px] text-[#292524]">নেক্সট Lesson এ যান</h3>
            </div>
        `;
        manageSpinner(false);
        return ;
    };
    wordContainer.innerHTML = "";
    words.forEach((word) => {
        const card = document.createElement('div');
        card.innerHTML = `
                    <div class="bg-white py-10 px-7 text-center rounded-xl space-y-4">
                        <h2 class="font-bold text-[32px]">${word.word ? word.word : "শব্দ পাওয়া যায় নি"}</h2>
                        <p class="font-medium text-[20px]">Meaning /Pronounciation</p>
                        <div class="font-bangla font-semibold text-[32px]">"${word.meaning ? word.meaning : "অর্থ  পাওয়া যায় নি"} / ${word.pronunciation ? word.pronunciation : "উচ্চারন  পাওয়া যায় নি"}"</div>
                        <div class="flex justify-between items-center">
                            <button onclick="loadWordDetails(${word.id})" class="btn bg-sky-50 rounded-sm hover:bg-sky-100"><i class="fa-solid fa-circle-info"></i></button>
                            <button onclick="pronounceWord('${word.word  }')" class="btn bg-sky-50 rounded-sm hover:bg-sky-100"><i class="fa-solid fa-volume-high"></i></button>
                        </div>
                    </div>
        `
        wordContainer.appendChild(card);
    });
    manageSpinner(false);
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


document.getElementById('btn-search').addEventListener("click", ()=>{
    const input = document.getElementById('input-search');
    const searchValue = input.value.trim().toLowerCase();
    console.log(searchValue);


    fetch("https://openapi.programming-hero.com/api/words/all")
        .then(res => res.json())
        .then(data => {
            const allWords = data.data;
            console.log(allWords);
            const filterWords = allWords.filter((word) => 
                word.word.toLowerCase().includes(searchValue)
            );
            displayLevelWord(filterWords);
        });

})