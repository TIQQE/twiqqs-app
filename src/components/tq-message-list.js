import { } from './tq-message.js';

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
    console.log('Connected tq-message')
  }
  disconnectedCallback() {
    console.log('Disconnected tq-message')
  }
  getMessageComponents() {
    let html = '';
    for (let message in this._data) {
      let fake = {
        user: { name: 'Name', img: 'https://tiqqe.com/wp-content/uploads/2019/01/3B64B9BB-2F05-4168-AE03-E21A6BFC1ED9-640x543.png' },
        message: { created: new Date().toUTCString(), content: 'yml ...' }
      }
      fake = encodeURI(JSON.stringify(fake));
      html += `<tq-message data="${fake}"></tq-message>`;
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
