const loadLesson = () =>{
    const url = "https://openapi.programming-hero.com/api/levels/all"
    fetch(url)
    .then(response => response.json())
    .then(les=> displayLesson(les.data))
}
 const displayLesson = (lessons)=>{
    const lessonContainer = document.getElementById("lesson-container")
    lessonContainer.innerHTML = ""

    for(let lesson of lessons){
        const btnDiv = document.createElement("div")
        btnDiv.innerHTML = `<button  class="btn btn-outline btn-primary"><i class="fa-solid fa-book-open"></i> Learn- ${lesson.level_no}</button>`

        lessonContainer.append(btnDiv)
    }
 }
 loadLesson()