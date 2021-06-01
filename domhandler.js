import * as WebService from './webservice'

let dqs = (s) => document.querySelector(s)
let dqsa = (s) => document.querySelectorAll(s)

export function showPage(page) {

    dqsa(".page").forEach((element) => {
        element.style.display = "none"
    })

    dqs(`.page#page-${page}`).style.display = "block"

}

export function addMessageToChat({id, nickname, message}) {

    if (!document.querySelector(`#message_${id}`)) {

        let isMyMessage = nickname == localStorage.getItem('nickname')
        
        let li = document.createElement("li")
        li.className = `messages ${isMyMessage ? "message-owner" : ""}`
        li.id = `message_${id}` 
        li.innerText = nickname + " : " + message

        if (isMyMessage) {

            let button = document.createElement("button")
            button.innerText = "X"

            button.addEventListener('click', () => {
                WebService.deleteMessage(id).then(() => {
                    li.remove()
                })
            })

            li.appendChild(button)
        }

        dqs("ul#listMessage").appendChild(li)
    }

}

export function clearChat() {

    dqsa(".messages").forEach((element) => {
        element.style.display = 'none'
    })

}

export function showChat() {

    dqsa(".messages").forEach((element) => {
        element.style.display = 'block'
    })
    
}