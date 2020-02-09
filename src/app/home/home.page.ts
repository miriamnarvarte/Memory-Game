import { SettingsService } from './../services/settings.service';
import { Component } from '@angular/core';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {


  cardDeck = [];
  numberOfCards = 6;
  cardColumnSize = 4;

  timeToHide = 1000;

  isCarDisplayed = false;

  previousCard = null;
  foundPairs=0;

  constructor(private SettingsService: SettingsService) {
    //Initialisation du jeu
    this.generateDeck();
    this.shuffleCards();
  }

  ionViewDidEnter(){
    this.numberOfCards= this.SettingsService.settings.numberOfCards;
    this.timeToHide= this.SettingsService.settings.delay;
    this.cardColumnSize=this.SettingsService.getColumnSize();
    //initialisation du jeu
this.generateDeck();
this.shuffleCards();


  }

  /**
   * Génère une liste de paires des cartes
   */

  generateDeck() {
    this.cardDeck=[];
    for (let i = 0; i < this.numberOfCards; i++) {
      this.cardDeck.push({ image: i + '.png', revealed: false });
      this.cardDeck.push({ image: i + '.png', revealed: false });
    }
    console.log(this.cardDeck);

  }

  shuffleCards() {
    //boucle sur le emsemble des cartes
    for (let pos in this.cardDeck) {
      //la carte en cours
      let currentCard = this.cardDeck[pos];
      //position aléatoire au sein de jeu de carte
      let randomPos = Math.floor(Math.random() * this.cardDeck.length);
      //Permutation 
      this.cardDeck[pos] = this.cardDeck[randomPos];
      this.cardDeck[randomPos] = currentCard;
    }
    console.log(this.cardDeck);


  }
  pickCard(card) {
    //une seule carte affichée en meme temps
    if (!this.isCarDisplayed) {
      //affichage de la carte
      card.revealed = true;
      this.isCarDisplayed = true;


      //comparaison de la carte au bout d'un certain délai
      if (this.previousCard && this.previousCard.image == card.image) {
        this.previousCard.revealed = true;
        this.isCarDisplayed=false;
        this.foundPairs++;

      } else {

        //masquage de la carte au bout d'un certain délai
        setTimeout(() => {
          card.revealed = false;
          this.isCarDisplayed = false;
          this.previousCard = card;
        }, this.timeToHide);

      }
    }

  }

playAgain(){
  this.foundPairs=0;
  this.previousCard = null;
  this.shuffleCards();
  this.cardDeck.map(
 (currentCard) => {currentCard.revealed =false;}
  );
}

}
