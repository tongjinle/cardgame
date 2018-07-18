import assert = require("assert");
import Stage from '../logic/stage/stage';
import StageUtil from '../logic/stage/stageUtil';
import Army from '../logic/army/army';
import Card from '../logic/card/card';
import Hero from '../logic/hero/hero';
import { EArmyColor, } from '../logic/schema';
import fs from 'fs';
import * as Helper from './testHelper';

describe('战斗', () => {
  it('没有技能的战斗', async () => {
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

  it('简单的技能的战斗', async () => {
    let st = StageUtil.getIns().createStage();
    let black = StageUtil.getIns().createArmy( EArmyColor.black,1000,[{cardId:'100004'}]);
    let red = StageUtil.getIns().createArmy( EArmyColor.red,1000,[{cardId:'100004'}]);
    st.loadArmyList([black, red]);
    st.combat();
    // fs.writeFileSync('testlog.txt', st.recordList.map(n => { return JSON.stringify(n, undefined, 4) + '\n'; }), 'utf-8');
    fs.writeFileSync('testlog.txt', JSON.stringify(st.recordList, undefined, 4)  , 'utf-8');
  });
});

