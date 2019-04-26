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
    window.addEventListener("hashchange", this.updateData, false);
  }

  async updateData() {
    try {
      let result = await getTwiqqs()
      this.data = result
    } catch (ex) {
      this.data = [];
    }
  }

  disconnectedCallback() {
    window.removeEventListener("hashchange", this.updateData);
  }

  getMessageComponents() {
    if (!this.data) { return '' }
    let html = '';
    for (let data of this.data) {
      let name = data.messageId ? data.messageId.split('@')[0] : 'Jane Doe'
      let msg = {
        user: { name, img: 'images/man.png' },
        message: { created: new Date(data.messageId.split('#')[1]).toUTCString(), content: data.message }
      }
      msg = encodeURI(JSON.stringify(msg));
      html += `<tq-message data="${msg}"></tq-message>`;
    }
    return html;
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>
        div {
          display: block;
          min-height: 20px;
        }
      </style>
      ${this.getMessageComponents()}
      `
  }
}
export default customElements.define('tq-message-list', TqMessageList)
