import { } from './tq-message.js';
import { getTwiqqs } from '../scripts/twiqqsRepo.js';

class TqMessageList extends HTMLElement {
  get data() {
    return this._data;
  }
  set data(data) {
    this._data = data;
    this.render();

    // Scroll to bottom when data is updated
    let messageList = document.querySelector('tq-message-list')
    messageList.scrollTop = messageList.scrollHeight
  }

  constructor() {
    super()
    this._data;
    this.render = this.render.bind(this)
    this.updateData = this.updateData.bind(this)
    this.attachShadow({ mode: 'open' })
    this.render()
  }
  connectedCallback() {
    this.updateData()
    window.addEventListener('hashchange', this.updateData, false);
    document.addEventListener('login', this.updateData)
  }

  disconnectedCallback() {
    window.removeEventListener('hashchange', this.updateData)
    document.removeEventListener('login', this.updateData)
  }

  async updateData() {
    try {
      let result = await getTwiqqs()
      this.data = result
    } catch (ex) {
      this.data = [];
    }
  }

  existingPeople = {}


  async getPersonImg(name) {
    var self = this;
    if(Object.keys(this.existingPeople).includes(name)) return this.existingPeople[name];
    return fetch('https://picsum.photos/200', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(function (response) {
        if (!response.ok) {
          throw new Error('Bad status code from server.');
        }
        console.log(self.existingPeople);
        self.existingPeople[name] = response.url;
        return response.url
      })
  }

  async getMessageComponents() {
    console.log(await this.getPersonImg());
    if (!this.data) { return '' }
    let html = '';
    for (let data of this.data) {
      let name = data.messageId ? data.messageId
        .split('#')[1]
        .split('@')[0] :
        'Jane Doe'
      let msg = {
        user: { name, img: await this.getPersonImg(name) },
        message: { created: new Date(data.messageId.split('#')[0]).toUTCString(), content: data.message }
      }
      msg = encodeURI(JSON.stringify(msg));
      html += `<tq-message data="${msg}"></tq-message>`;
    }
    return html;
  }

  async render() {
    this.shadowRoot.innerHTML = `
      <style>
        div {
          display: block;
          min-height: 20px;
        }
      </style>
      ${await this.getMessageComponents()}
      `
  }
}
export default customElements.define('tq-message-list', TqMessageList)
