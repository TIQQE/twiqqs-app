class TqSend extends HTMLElement {

  constructor() {
    super()
    this._data;
    this.isLoggedIn = false;
    this.render = this.render.bind(this)
    this.attachShadow({ mode: 'open' })
    this.init()
    this.render()
  }

  init() {
    let hash = window.location.hash;
    if (hash.indexOf('access_token') !== -1) {
      let parts = location.hash.substring(1).split('&')
      let id_token = parts[0].split('=')[1]
      let access_token = parts[1].split('=')[1]
      let expires_in = parts[2].split('=')[1]
      let token_type = parts[3].split('=')[1]
      let jwt = { id_token, access_token, expires_in, token_type }

      localStorage.setItem('jwt', JSON.stringify(jwt))
      location.hash = 'random'
      this.isLoggedIn = true;
    } else {
      let jwt = JSON.parse(localStorage.getItem('jwt'))
      this.isLoggedIn = !!jwt;
    }
  }

  connectedCallback() {
    this.messageBox = this.shadowRoot.querySelector('.message-box')
    this.messageBox.addEventListener('keydown', this.typing.bind(this))
  }
  disconnectedCallback() {
    if (this.messageBox) {
      this.messageBox.removeEventListener('keydown', this.typing)
    }
  }

  typing(e) {
    if (e.which === 13 && !e.shiftKey) {
      let message = this.messageBox.innerText.replace(/(<([^>]+)>)/ig, '')
      let sendMessageEvent = new CustomEvent('sendMessage', { detail: message })
      document.dispatchEvent(sendMessageEvent)
      this.messageBox.innerText = '';
      e.preventDefault();
      this.messageBox.style.height = 'auto'
    }
  }

  render() {
    this.shadowRoot.innerHTML = `
    <style>
      .message-box {
        height: auto;
        width: 100%;
        resize: none;
        font-family: 'Roboto', sans-serif;
        font-weight: 300;
        font-size: 16px;
        padding: var(--space-s);
        margin: 0;  
        border: 2px solid rgba(0,0,0,0.15);
        border-radius: var(--space-s);
        outline:none;
        overflow:hidden;
        transition: height .3s ease-out;
        background: #fff;
      }
      .message-box:focus {
        border: 2px solid rgba(0,0,0,0.35);
      }
      @media only screen and (max-width: 600px) {
        .message-box {
          min-height: 60px;
        }
      }
    </style>
    <div contenteditable="true" class="message-box"></div>
    `
  }
}
export default customElements.define('tq-send', TqSend)
