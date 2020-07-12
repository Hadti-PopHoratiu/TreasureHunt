import { Injectable } from '@angular/core';
declare const Pusher: any;
@Injectable()
export class PusherService {
  constructor() {
    const pusher = new Pusher('f70ad6aeeefd32e9b135', {
      cluster: 'eu',
    });
    this.channel = pusher.subscribe('location');
  }
  channel;
  public init() {
    return this.channel;
  }
}