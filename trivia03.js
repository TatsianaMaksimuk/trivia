const apiKey = 'a8e2f0a0ad85b638125ed1b78beeb90e'
const url = 'https://opentdb.com/api.php?amount=10&category=15&type=multiple'
let allAnswers = []
let randomArray = []
let c = 0
let jsonData

let score = 0

startTrivia = () => {
    const xhr = new XMLHttpRequest()
    xhr.open('GET', url)
    xhr.send()
    xhr.onload = () => {
        jsonData = JSON.parse(xhr.responseText)
        document.getElementById('header').innerHTML = ` `
        askQuestion()
    }
}



askQuestion = () => {
    
    document.getElementById("main").innerHTML = `${jsonData.results[c].question}`

    allAnswers.push(jsonData.results[c].correct_answer)

    for (let j = 0; j < jsonData.results[c].incorrect_answers.length; j++) {
        allAnswers.push(jsonData.results[c].incorrect_answers[j])
    }

    for (k = 0; k < allAnswers.length; k++) {
        randomArray.splice(Math.floor(Math.random() * allAnswers.length), 0, allAnswers[k])
    }
    for (let i = 0; i < randomArray.length; i++) {

        document.getElementById('options').innerHTML += `<input type='radio' value="${randomArray[i]}" class='checkBox' name="answers"><label for='radioButton'>${randomArray[i]}</label><br>`
    }
    document.getElementById('answer').innerHTML = `<button onclick='checkAnswer()'>Answer</button>`

  

}






function checkAnswer() {
    if (document.querySelector('input[name="answers"]:checked').value == jsonData.results[c].correct_answer) {

        alert("Correct =)")
        document.getElementById('answer').innerHTML = ``
        document.getElementById('footer').innerHTML = `<button onclick='nextQuestion()'>Next Question</button>`
        score++
        
    }
    else {
        alert("Incorrect =( ")
        
        document.getElementById('footer').innerHTML = `<button onclick='nextQuestion()'>Next Question</button>`
        document.getElementById('answer').innerHTML = ``
    }
}

function nextQuestion() {
    if (c <=5 )
   { document.getElementById('options').innerHTML = ``
    document.getElementById('footer').innerHTML = ``
    c++
    allAnswers = []
    randomArray = []

    askQuestion()}
    else {
        document.getElementById('options').innerHTML = ``
    document.getElementById('footer').innerHTML = ``
    document.getElementById("main").innerHTML = ``
    document.getElementById('header').innerHTML = `<button onclick='totalScore()'>Get your score</button>`
    }
}

function totalScore (){
    document.getElementById("main").innerHTML = ``
    
   
    document.getElementById('header').innerHTML = ``
    document.getElementById('footer').innerHTML = `${score}`
}