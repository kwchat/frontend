const msgerForm = get(".msger-inputarea");
const msgerInput = get(".msger-input");
const msgerChat = get(".msger-chat");

// Icons made by Freepik from www.flaticon.com
const serverUrl = 'http://127.0.0.1:5000/'
const BOT_IMG = "images/bot.png";
const PERSON_IMG = "images/person.png";
const BOT_NAME = "광운이";
const PERSON_NAME = "나";
const welcomeMsg = '저는 광운이, 무엇이든 물어봐주세요 😄';

appendMessage(BOT_NAME, BOT_IMG, "left", welcomeMsg);

msgerForm.addEventListener("submit", event => {
    event.preventDefault();

    const msgText = msgerInput.value;
    if (!msgText) return;

    appendMessage(PERSON_NAME, PERSON_IMG, "right", msgText);
    msgerInput.value = "";

    botResponse(msgText);
});

function msgHTML(name, img, side, text) {
    return `
        <li class="msg ${side}-msg">
            <div class="msg-img" style="background-image: url(${img})"></div>
            <div class="msg-bubble">
                <div class="msg-info">
                    <div class="msg-info-name">${name}</div>
                    <div class="msg-info-time">${formatDate(new Date())}</div>
                </div>
            <div class="msg-text">${text}</div>
            </div>
        </li>
    `;
}

function appendMessage(name, img, side, text) {
    msgerChat.insertAdjacentHTML("beforeend", msgHTML(name, img, side, text));
    msgerChat.scrollTop += 500;
}

function botResponse(text) {
    let msgText = '생각이 필요해요🤔';

    appendMessage(BOT_NAME, BOT_IMG, "left", msgText);
    postData(serverUrl, { msg: text })
        .then(function (data) {
            msgText = data.msg;
            msgerChat.lastElementChild.querySelector('.msg-text').textContent = msgText;
        })
        .catch(function (err) {
            console.log(err);
        });
}

// Utils
function get(selector, root = document) {
    return root.querySelector(selector);
}

function formatDate(date) {
    const h = "0" + date.getHours();
    const m = "0" + date.getMinutes();

    return `${h.slice(-2)}:${m.slice(-2)}`;
}

function postData(url = '', data = {}) {
    // Default options are marked with *
    return fetch(url, {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),})
        .then(response => response.json());
}
