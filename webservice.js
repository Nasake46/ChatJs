export function isLogged() {
    return localStorage.getItem('token')
}

export function getMessages() {

    return new Promise(function (resolve, reject) {

        fetch("https://api.edu.etherial.dev/apijsv2/messages", {
            headers: {
                'Authorization' : `Bearer ${localStorage.getItem('token')}`
            }
        }).then(function (response) {

            response.json().then(function (json) {

                if (json.status === 200) {
                    resolve(json)
                } else {
                    reject("Eh hop hop hop y'a un problème, tu n'a pas accès")
                }

            })

        }).catch((error) => {
            reject(error)
        })

    })

}

export function createMessage(message) {

    return new Promise((resolve, reject) => {

        fetch("https://api.edu.etherial.dev/apijsv2/messages", {
            method: "POST",
            body: "message=" + message,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization' : `Bearer ${localStorage.getItem('token')}`
            }
        }).then(function (response) {

            response.json().then(function (json) {
                resolve(json)
            })

        })

    })
    

}


export function auth(email, password) {

    return new Promise((resolve, reject) => {
        
        fetch("https://api.edu.etherial.dev/apijsv2/auth", {
            method: "POST",
            body: "email=" + email +"&password=" + password,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization' : "Bearer MONTOKEN!!!"
            }
        }).then(function (response) {

            response.json().then(function (json) {
                resolve(json)
            })

        })

    })

}


export function deleteMessage(id) {

    return new Promise((resolve, reject) => {

        fetch("https://api.edu.etherial.dev/apijsv2/messages/" + id, {
            method: "DELETE",
            headers: {
                'Authorization' : `Bearer ${localStorage.getItem('token')}`
            }
        }).then(function (response) {

            response.json().then(function (json) {
                resolve(json)
            })

        })

    })
    

}
