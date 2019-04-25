class TqMessage extends HTMLElement {

  /**
   * {user: {name: 'David', img: 'absolute-url-to-s3-bucket'}, message: {content: 'aaa', created: '2019-04-19T19:02:10.510Z'} }
   */
  get data() {
    return this._data;
  }
  set data(data) {
    this._data = data;
    this.render();
  }

  constructor() {
    super()
    this._data = JSON.parse(decodeURI(this.getAttribute('data')));
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
  getImage() {
    return (this.data && this.data.user && this.data.user.img) ? this.data.user.img : '';
  }
  getUserName() {
    return (this.data && this.data.user && this.data.user.name) ? this.data.user.name : '';
  }
  getCreated() {
    let hasCreatedDate = (this.data && this.data.message && this.data.message.created) ? true : false;
    if (hasCreatedDate) {
      return new Date(this.data.message.created)
        .toLocaleTimeString()
        .substr(0, 5);
    } else {
      return '';
    }
  }
  getMessageContent() {
    return (this.data && this.data.message && this.data.message.content) ? this.data.message.content : '';
  }
  render() {
    this.shadowRoot.innerHTML = `
    <style>
      .message {
        display: block;
        min-height: 20px;
        background: rgba(0,0,0,0.03);
        padding: var(--space-m);
        margin: 0 0 var(--space-s) 0;
        display: grid;
        grid-template-columns: auto 1fr;
        grid-gap: var(--space-s);
        border-radius: var(--space-s);
      }
      .img {
        width: 40px;
        height: 40px;
        border-radius: 4px;
      }
      .name {
        font-weight:700;
        font-size: 80%;
      }
      .time {
        font-weight:100;
        font-size: 80%;
      }
    </style>
    <div class='message'>
      <img alt='user image of ${this.getUserName()}' src='images/man.png' class='img' />
      <div>
        <span class='name'>${this.getUserName()}</span>
        <span class='time'>${this.getCreated()}</span>
        <div class='content'>${this.getMessageContent()}</div>
      </div>
    </div>`
  }
}
export default customElements.define('tq-message', TqMessage)
