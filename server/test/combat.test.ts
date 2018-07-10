import assert = require("assert");
import Stage from '../logic/stage/stage';
import Army from '../logic/army/army';
import Card from '../logic/card/card';
import Hero from '../logic/hero/hero';
import { EArmyColor, } from '../logic/schema';
import fs from 'fs';

describe('战斗', () => {
  it('剧本', async () => {
    let st = new Stage();
    let black: Army, red: Army;

    // black
    {
      black = new Army();
      black.color = EArmyColor.black;

      // hero
      let blackHero = new Hero();
      blackHero.hp = 100;
      black.hero = blackHero;

      // card
      let ca: Card;
      {
        ca = new Card();
        ca.hp = 80;
        ca.power = 10;
        ca.waitRound = 3;
      }
      black.cardListForDraw.push(ca);

    }


    // red
    {
      red = new Army();
      red.color = EArmyColor.red;
      let redHero = new Hero();
      redHero.hp = 200;
      red.hero = redHero;

      let ca: Card;
      {
        ca = new Card();
        ca.hp = 100;
        ca.power = 20;
        ca.waitRound = 1;
      }
      red.cardListForDraw.push(ca);
    }
    st.loadArmyList([black, red]);
    st.combat();

    // st.recordList.forEach(n => {
    //   console.log('................');
    //   console.log(JSON.stringify(n))
    // });

    fs.writeFileSync('testlog.txt', st.recordList.map(n => { return JSON.stringify(n, undefined, 4) + '\n'; }), 'utf-8');

  });
});

