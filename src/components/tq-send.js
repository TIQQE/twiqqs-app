class TqSend extends HTMLElement {

  constructor() {
    super()
    this._data;
    this.isLoggedIn = false;
    this.render = this.render.bind(this)
    this.adjustHeight = this.adjustHeight.bind(this)
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
      console.log(jwt)
    }
  }

  connectedCallback() {
    this.messageBox = this.shadowRoot.querySelector('.message-box')
    this.messageBox.addEventListener('keyup', this.typing.bind(this))
    window.addEventListener('resize', this.adjustHeight.bind(this))
  }
  disconnectedCallback() {
    if (this.messageBox) {
      this.messageBox.removeEventListener('keyup', this.typing)
    }
    window.removeEventListener('resize', this.adjustHeight)
  }

  adjustHeight() {
    const height = 36;
    this.messageBox.style.height = '40px'
    let calculatedHeight = (height * this.messageBox.scrollHeight / height)
    this.messageBox.style.height = Math.max(40, calculatedHeight) + 'px'
  }

  typing(e) {
    this.adjustHeight()
    if (e.which === 13 && !e.shiftKey) {
      let message = this.messageBox.value.replace(/(<([^>]+)>)/ig, '')
      let sendMessageEvent = new CustomEvent('sendMessage', { detail: message })
      document.dispatchEvent(sendMessageEvent)
      this.messageBox.value = '';
      e.preventDefault();
      this.adjustHeight()
    }
  }

  render() {
    this.shadowRoot.innerHTML = `
    <style>
      textarea {
        display: block;
        height: 40px;
        width: 100%;
        resize: none;
        font-family: 'Roboto', sans-serif;
        font-weight: 300;
        font-size: 16px;
        padding: var(--space-s);
        margin: 0;
        box-sizing: border-box;
        border: 2px solid rgba(0,0,0,0.15);
        border-radius: var(--space-s);
        outline:none;
        overflow:hidden;
      }
      textarea:focus {
        border: 2px solid rgba(0,0,0,0.35);
      }
    </style>
    <textarea class="message-box"></textarea>
    `
  }
}
export default customElements.define('tq-send', TqSend)
