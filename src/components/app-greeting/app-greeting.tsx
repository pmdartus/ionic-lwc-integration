import { Component, h } from '@stencil/core';

import MyGreeting from './my-greeting';

customElements.define('my-greeting', MyGreeting);

@Component({
  tag: 'app-greeting',
  // styleUrl: 'app-home.css'
})
export class AppHome {

  render() {
    return [
      <ion-header>
        <ion-toolbar color="primary">
          <ion-buttons slot="start">
            <ion-back-button defaultHref="/" />
          </ion-buttons>
          <ion-title>Greeting</ion-title>
        </ion-toolbar>
      </ion-header>,

      <ion-content class="ion-padding">
        <my-greeting></my-greeting>
      </ion-content>
    ];
  }
}
