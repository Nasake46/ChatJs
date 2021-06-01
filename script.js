import * as WebService  from './webservice'
import * as DomHandler from './domhandler'

let dqs = (s) => document.querySelector(s)
let dqsa = (s) => document.querySelectorAll(s)

let reloadMessagesInterval = null

function reloadMessages() {

    WebService.getMessages().then((result) => {

        for (const element of result["data"].reverse()) {
            DomHandler.addMessageToChat(element)
        }

    })

}

window.addEventListener('DOMContentLoaded', () => {

    //Initialisation
    if (WebService.isLogged()) {

        DomHandler.showPage("chat")

        Swal.fire('Hello world!', 'you are great', 'success')
        
        reloadMessagesInterval = setInterval(() => {
            reloadMessages()
        }, 1000)

    } else {
        DomHandler.showPage("connexion")
    }

    // Formulaire de Connexion
    dqs("#page-connexion > form").addEventListener('submit', function (event) {

        event.preventDefault();

        let email = this['email'].value
        let password = this['password'].value

        WebService.auth(email, password).then((result) => {

            if (result.status == 200) {

                DomHandler.showPage("chat")

                localStorage.setItem("nickname", email.substring(0, email.lastIndexOf("@")))

                localStorage.setItem("token", result.data.token)

                clearInterval(reloadMessagesInterval)

                reloadMessagesInterval = setInterval(() => {
                    reloadMessages()
                }, 1000)

            } else {
                alert("LES LOGINS NE SONT PAS BONS !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!")
            }

        }).catch((e) => {
            console.error(e)
        })

    })

    //Formulaire de Chat
    dqs("#page-chat > form").addEventListener('submit', function (event) {

        event.preventDefault();

        let message = this['message'].value

        if (message == "/clear") {
            DomHandler.clearChat()
        } else if (message == "/show") {
            DomHandler.showChat()
        } else {

            WebService.createMessage(message).then((result) => {

                if (result.status === 200) {
                    DomHandler.addMessageToChat(result['data'])
                }
    
            })

        }

    })
    
})