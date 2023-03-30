class Api {
    constructor(data) {
        this._url = data.url;
        this._headers = data.headers;
    }

    _checkError(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(res.status);
    }

    getUserInfo() {
        return fetch(`${this._url}/users/me`, {
            method: 'GET',
            headers: this._headers
        })
            .then(this._checkError)
    }

    getCards() {
        return fetch(`${this._url}/cards`, {
            method: 'GET',
            headers: this._headers
        })
            .then(this._checkError)
    }

    sendUserInfo(userData) {
        return fetch(`${this._url}/users/me`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                name: userData.name,
                about: userData.about
            })
        })
            .then(this._checkError);
    }

    postCards(data) {
        return fetch(`${this._url}/cards`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({
                name: data.name,
                link: data.link
            })
        })
            .then(this._checkError);
    }

    changeLikeCardStatus(id, isLiked) {
        return fetch(`${this._url}/cards/likes/${id}`, {
            method: `${isLiked ? 'PUT' : 'DELETE'}`,
            headers: this._headers
        })
            .then(this._checkError)
    }

    getLikes(id) {
        return fetch(`${this._url}/cards/likes/${id}`, {
            method: 'PUT',
            headers: this._headers
        })
            .then(this._checkError)
    }

    deleteLikes(id) {
        return fetch(`${this._url}/cards/likes/${id}`, {
            method: 'DELETE',
            headers: this._headers
        })
            .then(this._checkError);
    }

    deleteCard(id) {
        return fetch(`${this._url}/cards/${id}`, {
            method: 'DELETE',
            headers: this._headers
        })
            .then(this._checkError);
    }

    getUserAvatar(data) {
        return fetch(`${this._url}/users/me/avatar`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                avatar: data.avatar,
            })
        })
            .then(this._checkError);
    }

    getPromiseAll() {
        return Promise.all([

            this.getInfo(),

            this.getCards()

        ]);
    }
}

const api = new Api({
    url: 'https://mesto.nomoreparties.co/v1/cohort-56',
    headers: {
        authorization: 'b539dedd-af29-48d2-8a46-3706330bf2bf',
        'Content-Type': 'application/json'
    }
})

export default api 