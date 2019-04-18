class TqMessage extends HTMLElement {

  get data() {
    return this.getAttribute('data');
  }
  set data(data) {
    this.setAttribute('data', data);
    this.render();
  }

  constructor() {
    super()
    this.message;
    this.render = this.render.bind(this)
    this.attachShadow({ mode: 'open' })
    this.shadowRoot.innerHTML = `
      <style>
        div {
          display: block;
          min-height: 20px;
          border: 1px solid rgba(0,0,0,0.3);
          padding: var(--space-m);
          margin: var(--space-m) 0;
        }
      </style>
      <div class='message'>${this.data}</div>
      `
  }
  connectedCallback() {
    console.log('Connected tq-message')
    this.message = this.shadowRoot.querySelector('.message')
  }
  disconnectedCallback() {
    console.log('Disconnected tq-message')
  }
  render() {
    this.message.innerHTML = this.data;
  }
}
export default customElements.define('tq-message', TqMessage)
