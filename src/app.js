import {isValid,createModal} from "./utils"
import {Question} from "./question"
import {getAuthForm, authWithEmailPasswordAnd} from "./auth"
import "./style.css"

const form = document.getElementById("form")
const input = form.querySelector("#question-input")
const submitBtn = form.querySelector("#submit")
const modalBtn = document.getElementById("modal-btn")

window.addEventListener("load",Question.renderList)
modalBtn.addEventListener("click",openModal)
form.addEventListener("submit",submitFormHadnler)
form.addEventListener("input",function(){
    submitBtn.disabled = !isValid(input.value)
})

function submitFormHadnler(evt){
    evt.preventDefault();

    const question = {
        text: input.value.trim(),
        date: new Date().toJSON()
    }
    
    Question.create(question)
    .then(()  =>  {
        input.value = ""
        input.className = ""
    })
}

function openModal(){
    createModal("Авторизация",getAuthForm())
    document.getElementById("auth-form").addEventListener("submit",authFormHandler)
}

function authFormHandler(evt){
    evt.preventDefault();
    const btn = event.target.querySelector('button')
    const email =  event.target.querySelector('#email').value
    const password = event.target.querySelector('#password').value
    btn.disabled= true
    authWithEmailPasswordAnd(email,password)
    .then(Question.fetch)
    .then(renderModalAfterAuth)
    .then(()=>{btn.disabled = false})
    btn.disabled = false
}

function renderModalAfterAuth(content){
    if (typeof content === "string") {
        createModal("Ошибка",Question.listToHtml(content))
    }else{
        createModal("Список вопросов",Question.listToHtml(content))
    }
}