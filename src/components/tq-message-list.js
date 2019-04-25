import { } from './tq-message.js';
import { getTwiqqs } from '../scripts/twiqqsRepo.js';

class TqMessageList extends HTMLElement {
  get data() {
    return this._data;
  }
  set data(data) {
    this._data = data;
    this.render();
  }

  constructor() {
    super()
    this._data;
    this.messageList;
    this.render = this.render.bind(this)
    this.attachShadow({ mode: 'open' })
    this.render()
  }
  connectedCallback() {
    this.updateData()
    window.addEventListener("hashchange", this.updateData, false);
  }

  async updateData() {
    let result = await getTwiqqs()
    this.data = result
  }

  disconnectedCallback() {
    window.removeEventListener("hashchange", this.updateData);
  }

  getMessageComponents() {
    if (!this.data) { return }
    let html = '';
    for (let data of this.data) {
      console.log(data)
      let msg = {
        user: { name: data.messageId.split('@')[0], img: '' },
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
