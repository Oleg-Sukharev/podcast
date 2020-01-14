export function getAuthForm(){
    return `
        <form id="auth-form">
        <div class="mui-textfield mui-textfield--float-label">
            <input id="email" required type="email">
            <label for="email">Email</label>
        </div>
        <div class="mui-textfield mui-textfield--float-label">
            <input id="password" required  type="password">
            <label for="password">Пароль</label>
        </div>
        <button 
            type="submit"
            class="mui-btn mui-btn--primary"
            id="auth-submit"
        >
        Войти</button>
        </form>
    `
}

export function authWithEmailPasswordAnd(email,password){
    const API_KEY = "AIzaSyAdEXUyOmnlU2vQLrT7tbnNSVikPSMtty4"
    const URL = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`
    return fetch(URL,{
        method: "POST",
        body: JSON.stringify({
            email,password,
            returnSecureToken: true
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then((res) => res.json())
    .then((data) => {
        return  data.idToken
    })
}