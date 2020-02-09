import { SettingsService } from './../services/settings.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

  settings = {
    numberOfCards: 6,
    delay: 1000,
    colNumbers: 3,
  }

  constructor(public settingsService: SettingsService) { }

  ngOnInit() {
  }

}
