import assert = require("assert");
import Stage from '../logic/stage/stage';
import Army from '../logic/army/army';
import Card from '../logic/card/card';
import Hero from '../logic/hero/hero';
import CastFlow from '../logic/flow/castFlow';
import { EArmyColor, } from '../logic/schema';
import fs from 'fs';

import parseFormula from '../logic/skill/parser/parseFormula';

describe('公式', async () => {
  let stage: Stage;
  let sender: Card;
  let target: Card;

  beforeEach(() => {
    stage = new Stage();
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
        ca.position = 0;
        ca.army = black;
        ca.level = 5;
      }
      black.cardList.push(ca);

      // 标记下target为这个card
      target = ca;
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
        ca.position = 0;
        ca.army = red;
        ca.level = 4;
      }
      red.cardList.push(ca);

      // 标记下sender为这个card
      sender = ca;
    }
    stage.loadArmyList([black, red]);

  });

  it('水枪', async () => {
    let formula = 'Lo_op_rd@1#Ef_mag@Num_int:40';
    let flowList = parseFormula(stage, sender, formula);
    let flow = flowList[0];

    assert(flowList.length === 1);

    // 4 * 40 = 160
    assert(flow.data.damage.magic === 160);
    assert(flow.sender === sender);
    assert(flow.target === target);
  });
});