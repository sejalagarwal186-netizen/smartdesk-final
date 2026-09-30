// =====================================
// IMPORT MODULES
// =====================================

import { renderTasks } from "./tasks.js";
import { renderExpenses } from "./expenses.js";
import { renderProducts } from "./products.js";
import { getWeather } from "./weather.js";
import { saveTheme,getSavedTheme } from "./storage.js";
import { showNotification } from "./utils.js";

// =====================================
// 0. CHECK JAVASCRIPT CONNECTION
// =====================================

console.log("SmartDesk is connected!");


// =====================================
// 1. USER DATA
// =====================================

const user = {
    name: "Prashant",
    city: "Jaipur",
    role: "Frontend Learner",
    experience: "6 months"
};



// =====================================
// 5. QUIZ DATA
// =====================================

const questions = [
    {
        question: "Which method returns matching elements?",
        options: ["find", "filter", "push", "reduce"],
        answer: "filter"
    },

    {
        question: "Which method adds an item to the end of an array?",
        options: ["pop", "push", "shift", "filter"],
        answer: "push"
    },

    {
        question: "Which keyword is used to declare a variable that can change?",
        options: ["const", "let", "return", "function"],
        answer: "let"
    },

    {
        question: "Which method removes the last element from an array?",
        options: ["push", "shift", "pop", "map"],
        answer: "pop"
    }
];



// =====================================
// 6. QUIZ VARIABLES
// =====================================

let currentQuestionIndex = 0;
let score = 0;
let timerId;
let quizStarted = false;



// =====================================
// 7. SELECT HTML ELEMENTS
// =====================================


// -------------------------------------
// NAVIGATION
// -------------------------------------

const navButtons =
    document.querySelectorAll(".nav-btn");

const pageSections =
    document.querySelectorAll(".page-section");



// -------------------------------------
// USER
// -------------------------------------

const greetingEl =
    document.querySelector("#greeting");

const userMetaEl =
    document.querySelector("#userMeta");



// -------------------------------------
// QUIZ
// -------------------------------------

const questionEl =
    document.querySelector("#question");

const optionsEl =
    document.querySelector("#options");

const scoreEl =
    document.querySelector("#score");

const timerEl =
    document.querySelector("#timer");

const messageEl =
    document.querySelector("#message");

const nextBtn =
    document.querySelector("#nextBtn");



// -------------------------------------
// THEME + NOTIFICATION
// -------------------------------------

const themeBtn =
    document.querySelector("#themeBtn");

const toast =
    document.querySelector("#toast");



// =====================================
// 8. SIDEBAR NAVIGATION
// =====================================

function switchSection(sectionId) {

    pageSections.forEach((section) => {

        section.classList.remove("active");

    });


    navButtons.forEach((button) => {

        button.classList.remove("active");

    });


    const selectedSection =
        document.getElementById(sectionId);


    if (selectedSection) {

        selectedSection.classList.add("active");

    }


    const selectedButton =
        document.querySelector(
            `[data-section="${sectionId}"]`
        );


    if (selectedButton) {

        selectedButton.classList.add("active");

    }

}



// =====================================
// 9. GET GREETING
// =====================================

function getGreeting() {

    const hour =
        new Date().getHours();


    if (hour < 12) {

        return "Good morning";

    }


    if (hour < 18) {

        return "Good afternoon";

    }


    return "Good evening";

}



// =====================================
// 10. RENDER USER
// =====================================

function renderUser() {

    greetingEl.textContent =
        `${getGreeting()}, ${user.name}`;


    userMetaEl.textContent =
        `${user.role} • ${user.city} • Experience: ${user.experience}`;

}



// =====================================
// 25. RENDER QUIZ QUESTION
// =====================================

function renderQuestion() {

    optionsEl.innerHTML =
        "";


    messageEl.textContent =
        "";


    nextBtn.disabled =
        true;


    const currentQuestion =
        questions[currentQuestionIndex];


    questionEl.textContent =
        currentQuestion.question;


    currentQuestion.options.forEach(
        (option) => {

            const button =
                document.createElement(
                    "button"
                );


            button.textContent =
                option;


            button.classList.add(
                "option-btn"
            );


            button.addEventListener(

                "click",

                () => {

                    checkAnswer(option);

                }

            );


            optionsEl.appendChild(
                button
            );

        }

    );


    startTimer();

}



// =====================================
// 26. CHECK QUIZ ANSWER
// =====================================

function checkAnswer(selectedAnswer) {

    const currentQuestion =
        questions[currentQuestionIndex];


    clearInterval(timerId);


    if (
        selectedAnswer ===
        currentQuestion.answer
    ) {

        score++;


        scoreEl.textContent =
            score;


        messageEl.textContent =
            "Correct! 🎉";

    }

    else {

        messageEl.textContent =
            `Wrong! Correct answer: ${currentQuestion.answer}`;

    }


    const optionButtons =
        document.querySelectorAll(
            ".option-btn"
        );


    optionButtons.forEach(
        (button) => {

            button.disabled =
                true;

        }
    );


    nextBtn.disabled =
        false;

}



// =====================================
// 27. QUIZ TIMER
// =====================================

function startTimer() {

    clearInterval(timerId);


    let seconds =
        20;


    timerEl.textContent =
        seconds;


    timerId =
        setInterval(

            () => {

                seconds -= 1;


                timerEl.textContent =
                    seconds;


                if (seconds === 0) {

                    clearInterval(timerId);


                    messageEl.textContent =
                        "Time's up!";


                    const optionButtons =
                        document.querySelectorAll(
                            ".option-btn"
                        );


                    optionButtons.forEach(

                        (button) => {

                            button.disabled =
                                true;

                        }

                    );


                    nextBtn.disabled =
                        false;

                }

            },

            1000

        );

}



// =====================================
// 28. NEXT QUIZ QUESTION
// =====================================

function nextQuestion() {

    currentQuestionIndex++;


    if (
        currentQuestionIndex <
        questions.length
    ) {

        renderQuestion();

    }

    else {

        showResult();

    }

}



// =====================================
// 29. SHOW QUIZ RESULT
// =====================================

function showResult() {

    clearInterval(timerId);


    questionEl.textContent =
        "Quiz Completed! 🎉";


    optionsEl.innerHTML =
        "";


    messageEl.textContent =
        `Your final score is ${score} out of ${questions.length}`;


    timerEl.textContent =
        "0";


    nextBtn.style.display =
        "none";

}



// =====================================
// 30. TOGGLE THEME
// =====================================

function toggleTheme() {

    document.body.classList.toggle(
        "dark"
    );


    const isDark =
        document.body.classList.contains(
            "dark"
        );


    saveTheme(
    isDark ? "dark" : "light"
);

    if (isDark) {

        themeBtn.textContent =
            "☀️ Light Theme";

    }

    else {

        themeBtn.textContent =
            "🌙 Dark Theme";

    }

}



// =====================================
// 31. RESTORE SAVED THEME
// =====================================

function restoreTheme() {

   const savedTheme =
    getSavedTheme();


    if (savedTheme === "dark") {

        document.body.classList.add(
            "dark"
        );


        themeBtn.textContent =
            "☀️ Light Theme";

    }

    else {

        document.body.classList.remove(
            "dark"
        );


        themeBtn.textContent =
            "🌙 Dark Theme";

    }

}



// =====================================
// 32. SHOW NOTIFICATION
// =====================================



// =====================================
// 33. NAVIGATION EVENT LISTENERS
// =====================================

navButtons.forEach((button) => {

    button.addEventListener(

        "click",

        () => {

            const sectionId =
                button.dataset.section;


            switchSection(sectionId);


            if (
                sectionId === "quizSection" &&
                quizStarted === false
            ) {

                renderQuestion();

                quizStarted =
                    true;

            }

        }

    );

});



// =====================================
// 37. QUIZ EVENT LISTENER
// =====================================

nextBtn.addEventListener(

    "click",

    nextQuestion

);



// =====================================
// 38. THEME EVENT LISTENER
// =====================================

themeBtn.addEventListener(

    "click",

    toggleTheme

);



// =====================================
// 39. INITIAL RENDER
// =====================================

renderUser();

renderTasks();

renderExpenses();

renderProducts();

getWeather("Jaipur");

restoreTheme();



// =====================================
// 40. DEFAULT SCREEN
// =====================================

switchSection("dashboard");