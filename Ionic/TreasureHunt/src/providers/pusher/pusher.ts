import { Injectable } from '@angular/core';
import Pusher from 'pusher-js';

@Injectable()
export class PusherProvider {
  constructor() {
    this.pusher = new Pusher('f70ad6aeeefd32e9b135', {
      cluster: 'eu',
      encrypted: true,
    });
  }
  pusher;

  public init(channelName) {
    const channel = this.pusher.subscribe(channelName);
    return channel;
  }
}