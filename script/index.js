const loadLesson = () =>{
    const url = "https://openapi.programming-hero.com/api/levels/all"
    fetch(url)
    .then(response => response.json())
    .then(les=> displayLesson(les.data))
}

function pronounceWord(word) {
  const utterance = new SpeechSynthesisUtterance(word);
  utterance.lang = "en-EN"; // English
  window.speechSynthesis.speak(utterance);
}

const removeButton = () =>{
    const lessonButton = document.querySelectorAll(".lesson-button")
     lessonButton.forEach(btn => btn.classList.remove("active"))
}

const levelWord = (id)=>{
     manageSpinner(true)
    const url = `https://openapi.programming-hero.com/api/level/${id}`
    fetch(url)
    .then(response=> response.json())
    .then(data=>{
        removeButton()
        const lessonButton = document.getElementById(`lesson-btn-${id}`)
        lessonButton.classList.add("active")
        displayLevelWord(data.data)
    })
}

const createElement = (arr) =>{
    const htmlElement = arr.map((el)=> `<span class="btn">${el}</span>`)
    return htmlElement.join("  ");
}

const loadDetails =(id)=>{
    manageSpinner(true)
    const url = `https://openapi.programming-hero.com/api/word/${id}`
     fetch(url)
    .then(res=> res.json())
    .then(details=> displayDetails(details.data) )
}

const displayDetails = (word) =>{
    console.log(word)
    const detailsBox = document.getElementById("details-Container")
    detailsBox.innerHTML = `<div>
            <h2><span>${word.word}</span> (<i class="fa-solid fa-microphone-lines"></i>     :${word.pronunciation})</h2>
        </div>
        <div>
            <p>Meaning</p>
        </div>
        <div>
            <p>${word.meaning}</p>
        </div>
        <div>
            <p>Example</p>
        </div>
        <div>
            <p>${word.sentence}</p>
        </div>
        <div>
            <p>সমার্থক শব্দ গুলো</p>
            <div>${createElement(word.synonyms)}</div>
        </div>`
    document.getElementById("my_modal").showModal()
    manageSpinner(false)
}

const manageSpinner = (status)=>{
    if(status==true){
        document.getElementById("spinner").classList.remove("hidden")
        document.getElementById("level-word").classList.add("hidden")
    }
    else{
        document.getElementById("level-word").classList.remove("hidden")
        document.getElementById("spinner").classList.add("hidden")
    }
}


const displayLevelWord = (levelWords)=>{
    const levelWord = document.getElementById("level-word")
    levelWord.innerHTML = ""

    if(levelWords.length == 0){
            levelWord.innerHTML = `<div class="text-center col-span-full py-10 space-y-5">
            <img class="mx-auto" src="./assets/alert-error.png" alt="">
            <p class="font-bangla text-[18px] text-gray-400">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
            <h2 class="font-bangla text-4xl">নেক্সট Lesson এ যান</h2>
        </div>
            `

    }

    levelWords.forEach(word=>{
        const displayWord = document.createElement("div")
        displayWord.innerHTML = `<div class="bg-white rounded-[8px]  px-10 py-5 text-center h-full space-y-4">
             <h1 class=" text-xs  md:text-2xl font-bold">${word.word ?word.word : "শব্দ পাওয়া যায়নি" }</h1>
            <p class=" text-xs  md:text-2xl font-semibold font-bangla">Meaning /Pronounciation</p>
            <div class=" text-xs md:text-2xl font-bold">${word.meaning ? word.meaning : "অর্থ পাওয়া যায়নি"} / ${word.pronunciation ? word.pronunciation : "Pronunciation পাওয়া যায়নি "}</div>

        <div class="flex justify-center gap-7 md:justify-between  ">
            <button onclick="loadDetails(${word.id})" class="btn bg-[#1A91FF10] hover:bg-[#1A91FF90]  "><i class="fa-solid fa-circle-info"></i></button>
            <button onclick ="pronounceWord('${word.word}')" class="btn bg-[#1A91FF10] hover:bg-[#1A91FF90]"><i class="fa-solid fa-volume-high"></i></button>
        </div>
        </div>`
        levelWord.append(displayWord)
    })
    manageSpinner(false)
    return;
    


}



 const displayLesson = (lessons)=>{
    const lessonContainer = document.getElementById("lesson-container")
    lessonContainer.innerHTML = ""

    for(let lesson of lessons){
        const btnDiv = document.createElement("div")
        btnDiv.innerHTML = `<button id ="lesson-btn-${lesson.level_no}" onclick ="levelWord(${lesson.level_no})" class="btn btn-outline btn-primary lesson-button"><i class="fa-solid fa-book-open"></i> Learn- ${lesson.level_no}</button>`

        lessonContainer.append(btnDiv)
    }
 }
loadLesson()

document.getElementById("word-btn").addEventListener("click",()=>{
    const inputWord = document.getElementById("input-search")
    const searchValue = inputWord.value.trim().toLowerCase()
    
    const url = "https://openapi.programming-hero.com/api/words/all"
    fetch (url)
    .then((res)=> res.json())
    .then((data)=>{
        const allWord = data.data
        console.log(allWord)
        const filterWords = allWord.filter((word)=> word.word.toLowerCase().includes(searchValue)
        
    )
    displayLevelWord(filterWords)
    })
    


})
 
 