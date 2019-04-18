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
    this.messageList;
    this._data;
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
      this.messageList.innerHTML += `<tq-message data="${message}"></tq-message>`;
    }
  }
}
export default customElements.define('tq-message-list', TqMessageList)
