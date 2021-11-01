/** @module Api */

/**
 * @class
 * @classdesc Make requests to the website API with the class methods
 * @constructor
 * @param {object} - An object with the base URL of the API and the authorization key
 * @param {string} - The base URL of the API
 * @param {string} - The authorization key for the API
 */

class Api {

  constructor({ baseUrl, authorization }) {
    this._baseUrl = baseUrl;
    this._authorization = authorization;
  }

  /**
   * @method _checkRes
   * @description A private method to check if the result is ok or with an error
   * @param {object} res - The result from the API
   * @returns Converting the result to JSON or rejecting the promise with the error status code
   * @private
   */

  _checkRes(res) {
    return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
  }

  /**
   * @method getUserInfo
   * @description A public method to get the user info from the API
   * @returns The result from the API
   * @public
   */

  getUserInfo() {

    return fetch(`${this._baseUrl}/users/me`, {
      headers: {
        authorization: this._authorization
      }
    })
      .then(res => this._checkRes(res))
  }

  /**
   * @method getIntialCard
   * @description A public method to get the intial cards from the API
   * @returns The result from the API
   * @public
   */

  getIntialCard() {

    return fetch(`${this._baseUrl}/cards`, {
      headers: {
        authorization: this._authorization
      }
    })
      .then(res => this._checkRes(res))
  }

  /**
   * @method setUserInfo
   * @description A public method to set the user info in the API
   * @param {object} - An object with the name and about info for the user
   * @param {string} name - The user name
   * @param {string} about - The user about info
   * @returns The result from the API
   * @public
   */

  setUserinfo({ name, about }) {

    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: {
        authorization: this._authorization,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: name,
        about: about
      })
    })
      .then(res => this._checkRes(res))

  }

  /**
   * @method setUserPicture
   * @description A public method to set a new user picture in the API
   * @param {string} url - The url for the user picture
   * @returns The result from the API
   * @public
   */

  setUserPicture(url) {

    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: {
        authorization: this._authorization,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        avatar: url
      })
    })
      .then(res => this._checkRes(res))

  }

  /**
   * @method addCard
   * @description A public method to add a new image card to the API
   * @param {object} - An object with the name and link for the image card
   * @param {string} name - The title for the image card
   * @param {string} link - The url for the image
   * @returns The result from the API
   * @public
   */

  addCard({ name, link }) {

    return fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: {
        authorization: this._authorization,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: name,
        link: link
      })
    })
      .then(res => this._checkRes(res))

  }

  /**
   * @method deleteCard
   * @description A public method to delete a card from the API
   * @param {string} _id - The id of the card
   * @returns The result from the API
   * @public
   */

  deleteCard(_id) {

    return fetch(`${this._baseUrl}/cards/${_id}`, {
      method: "DELETE",
      headers: {
        authorization: this._authorization
      }
    })
      .then(res => this._checkRes(res))

  }

  /**
   * @method addLike
   * @description A public method to add a card like in the API
   * @param {string} _id - The id of the card
   * @returns The result from the API
   * @public
   */

  addLike(_id) {

    return fetch(`${this._baseUrl}/cards/likes/${_id}`, {
      method: "PUT",
      headers: {
        authorization: this._authorization
      }
    })
      .then(res => this._checkRes(res))

  }

  /**
   * @method removeLike
   * @description A public method to remove a card like from the API
   * @param {string} _id - The id of the card
   * @returns The result from the API
   * @public
   */

  removeLike(_id) {

    return fetch(`${this._baseUrl}/cards/likes/${_id}`, {
      method: "DELETE",
      headers: {
        authorization: this._authorization
      }
    })
      .then(res => this._checkRes(res))

  }

}

const api = new Api({
  baseUrl: "https://around.nomoreparties.co/v1/group-12",
  authorization: "12be1991-4f28-449f-a9a9-71d4704b25a2"
})

export default api;
