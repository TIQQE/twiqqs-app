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
    this.shadowRoot.innerHTML = `
      <style>
        div {
          display: block;
          min-height: 20px;
        }
      </style>
      <div class='message-list'></div>
      `
  }
  connectedCallback() {
    console.log('Connected tq-message')
    this.messageList = this.shadowRoot.querySelector('.message-list')
  }
  disconnectedCallback() {
    console.log('Disconnected tq-message')
  }
  render() {
    this.messageList.innerHTML = '';
    for (let message in this._data) {
      console.log(message);
      let fake = {
        user: { name: 'Name', img: 'https://tiqqe.com/wp-content/uploads/2019/01/3B64B9BB-2F05-4168-AE03-E21A6BFC1ED9-640x543.png' },
        message: { created: new Date().toUTCString(), content: 'yml ...' }
      }
      fake = encodeURI(JSON.stringify(fake));
      this.messageList.innerHTML += `<tq-message data="${fake}"></tq-message>`;
    }
  }
}
export default customElements.define('tq-message-list', TqMessageList)
