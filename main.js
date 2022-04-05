const msgerForm = get(".msger-inputarea");
const msgerInput = get(".msger-input");
const msgerChat = get(".msger-chat");

// Icons made by Freepik from www.flaticon.com
const BOT_IMG = "images/bot.png";
const PERSON_IMG = "images/person.png";
const BOT_NAME = "광운이";
const PERSON_NAME = "나";

console.log(msgerChat);

appendMessage(BOT_NAME, BOT_IMG, "left", '저는 광운이, 무엇이든 물어봐주세요 😄');

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
    const delay = 1000;
    let msgText = '생각이 필요해요🤔';

    const putThinking = setTimeout(() => {
        appendMessage(BOT_NAME, BOT_IMG, "left", msgText);
    }, delay);
    postData('http://127.0.0.1:5000/', {msg: text})
        .then(function (res) { return res.json() })
        .then(function (data) {
            clearTimeout(putThinking);
            msgText = data.msg;
            msgerChat.lastElementChild.innerHTML = msgHTML(BOT_NAME, BOT_IMG, "left", msgText);
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
          method: 'POST', // *GET, POST, PUT, DELETE, etc.
          mode: 'cors', // no-cors, cors, *same-origin
          cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
          credentials: 'same-origin', // include, *same-origin, omit
          headers: {
              'Content-Type': 'application/json',
              // 'Content-Type': 'application/x-www-form-urlencoded',
          },
          redirect: 'follow', // manual, *follow, error
          referrer: 'no-referrer', // no-referrer, *client
          body: JSON.stringify(data), // body data type must match "Content-Type" header
      })
      .then(response => response.json()); // parses JSON response into native JavaScript objects
  }
