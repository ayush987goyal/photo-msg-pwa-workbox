class Message {
  constructor() {
    this.messages = [];

    this.socket = io();

    this.socket.once('connect_error', () => {
      window.dispatchEvent(new Event('messages_error'));
    });
  }

  get all() {
    return this.messages;
  }

  add(data_url, caption_text) {
    let message = {
      photo: data_url,
      caption: caption_text
    };

    this.messages.unshift(message);

    console.log('sending to server');

    return message;
  }
}
