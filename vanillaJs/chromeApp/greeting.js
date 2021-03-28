const form = document.querySelector(".js-form");
const input = form.querySelector("input"),
      greeting = document.querySelector(".js-greetings");

const USER_LS = "currentUser",
      SHOWING_ON = "showing";

function saveName(text){
    localStorage.setItem(USER_LS, text); //들어온 text를 localStorage에 저장
}

function handleSubmit(event){
    event.preventDefault();
    const currentValue = input.value; //form에 입력한 문자열 가져오기
    paintGreeting(currentValue);
    saveName(currentValue);
}

function askForName(){
    //Local Storage에 이름이 없으면
    //form을 켜 이름을 입력하도록 한다. 
    form.classList.add(SHOWING_ON); 
    form.addEventListener("submit", handleSubmit);
}

function paintGreeting(text){
    //Local Storage에 이름이 있으면
    //form을 보이지않게 설정 후 Hello (이름) 형태로 Text를 보인다.

    form.classList.remove(SHOWING_ON);
    greeting.classList.add(SHOWING_ON);
    greeting.innerText = `Hello ${text}`;

}

function loadName(){
    const currentUser = localStorage.getItem(USER_LS);
    if(currentUser === null){
        // he or she is not
        askForName();
    }else{
        // he or she is
        paintGreeting(currentUser);
    }
}

function init(){
loadName();
}
init();