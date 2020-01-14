const URL = "https://podcast-745de.firebaseio.com/questions.json";

export class Question{
    static create(question){
        return  fetch(URL,{
            method: "POST",
            body: JSON.stringify(question),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then((response) => response.json())
        .then((response) => {
            question.id = response.name
            return question
        })
        .then(addToLoadStorage)
        .then(Question.renderList)
    }
 
    static renderList(){
        const questions = getQuestionsFromLocalStorage();
        const html = questions.length 
            ? questions.map(toCard).join(' ')
            : ' <div class="mui--text-headline">Вы еще не задавали вопросов</div>'
        const list = document.getElementById('list')
        list.innerHTML = html
    }

    static fetch(token){
        if(!token) {
            return Promise.resolve('<p class="error">У вас нет токена</p>')
        }
        return  fetch(`${URL}?auth=${token}`)
                .then((res) => res.json())
                .then((res) => {
                    if( res  && res.error){
                        return `<p class="error> ${res.error}</p>`
                    }
                    return  res ? Object.keys(res).map((key) => ({
                        ...res[key],
                        id: key
                    })) : []
                })
    }

    static listToHtml(questions){
        console.log('questions',questions);
        return questions.length
            ? `<ol>${questions.map((q) => `<li>${q.text}</li>`).join('')}</ol>` 
            : `<div>Вопросов пока нет</div>`
    }
}

function addToLoadStorage(question){
    const all = getQuestionsFromLocalStorage()
    all.push(question)
    localStorage.setItem('question',JSON.stringify(all))
}

function getQuestionsFromLocalStorage(){
    return JSON.parse(localStorage.getItem("question") || '[]')
}

function toCard(questions){
    return  `
        <div>
            <div class="mui--text-black-54">
                ${new Date(questions.date).toLocaleDateString()}
                ${new Date(questions.date).toLocaleTimeString()}
            </div>
            <div>${questions.text}</div>
        </div>
        <br/>
    `
}