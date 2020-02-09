import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  settings = {
    numberOfCards: 6,
    delay: 1000,
    colNumbers: 3
  }

  constructor() { }
  getColumnSize(){
    return 12/this.settings.colNumbers;
  }
}
