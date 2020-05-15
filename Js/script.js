// i = group questions 
// index = checkbox input elements 

let questions = [{

        question: "Hvad hedder jeg? ",
        answer: {
            a: "Ronny",
            b: "Peter",
            c: "Torben",


        },
        correctAnswer: ["a"]
    }, {
        question: "Hvad gammel jeg? ",
        answer: {
            a: "26",
            b: "36",
            c: "46",

        },
        correctAnswer: ["b"]
    },
    {
        question: "Jeg er... ",
        answer: {
            a: "Sjov",
            b: "Skør",
            c: "Kedelig",

        },
        correctAnswer: ["a", "b", "c"]
    }


]
let score = 0;
let submitButton = document.querySelector("#submit");
let clear = document.querySelector("#clear");
let printscore = document.querySelector("#score");

clear.addEventListener("click", function() {
    let labelAnswers = document.querySelectorAll(".labelAnswer");
    score = 0;
    printscore.innerHTML = "";
    for (let i = 0; i < labelAnswers.length; i++) {
        labelAnswers[i].classList.remove("green");
        labelAnswers[i].classList.remove("red");
    }
})

submitButton.addEventListener("click", function(event) {
    let inputAnswers = document.querySelectorAll(".inputAnswer");
    let groupValidated = [];
    for (let i = 0; i < questions.length; i++) {
        let isChecked = false;
        for (let index = 0; index < inputAnswers.length; index++) {
            if (inputAnswers[index].name == "radio" + i) {
                console.log(inputAnswers[index].checked);
                if (inputAnswers[index].checked) {
                    isChecked = true;
                }
            }

        }
        groupValidated.push(isChecked)
    }
    // console.log(groupValidated);
    if (groupValidated.includes(false)) {
        return
    }

    let labelAnswers = document.querySelectorAll(".labelAnswer");
    event.preventDefault();
    for (let i = 0; i < inputAnswers.length; i++) {

        if (inputAnswers[i].checked) {
            let groupIndex = inputAnswers[i].name;
            groupIndex = groupIndex.substr(5, groupIndex.length - 5);
            let isCorrect = checkAnswer(inputAnswers[i].value, questions[groupIndex].correctAnswer);
            if (isCorrect == true) {
                score++;
                labelAnswers[i].classList.add("green");
            } else {
                labelAnswers[i].classList.add("red");
            }
        }
    }
    printscore.innerHTML = `Her er dit resultat ${score} ${score == 1 ? "rigtig" : "rigtige"}`
        // printscore.innerHTML = "Her er dit resultat " + score + "rigtige";
});

function createQuestionGroup() {
    let qContainer = document.querySelector("#qContainer");
    for (let i = 0; i < questions.length; i++) {
        let inputLabel = "";
        let inputType = "checkbox";

        if (questions[i].correctAnswer.length == 1) {
            inputType = "radio";
        }

        Object.keys(questions[i].answer).forEach((key, index) => {
            inputLabel += `<input class="inputAnswer" type="${inputType}" name="radio${i}" id="${i}-${index}" value="${key}" required>
        <label class="labelAnswer" for="test">${questions[i].answer[key]}
        </label>`
        })

        let questionGroup = `
        <div id="radioBox" class="radioBox">
            <h3>${questions[i].question} </h3>
                ${inputLabel} 
        </div>
        `
        qContainer.insertAdjacentHTML("beforeend", questionGroup);
    }
}


function checkAnswer(answer, correctAnswer) {
    if (correctAnswer.includes(answer)) {
        return true
    } else {
        return false
    }
}




createQuestionGroup();