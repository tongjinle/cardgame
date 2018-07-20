import assert = require("assert");
import Stage from '../logic/stage/stage';
import StageUtil from '../logic/stage/stageUtil';
import Army from '../logic/army/army';
import Card from '../logic/card/card';
import Hero from '../logic/hero/hero';
import { EArmyColor, } from '../logic/schema';
import fs from 'fs';
import * as Helper from './testHelper';
import zlib from 'zlib';


describe('战斗', () => {
  function writeLog(name: string, st: Stage): void {
    let content = JSON.stringify(st.recordList, undefined, 4);
    fs.writeFileSync(__dirname + '/../log/' + name + '.log', content, 'utf-8');
    fs.writeFileSync(__dirname + '/../log/' + name + '.gzip', zlib.gzipSync(content));
  }


  xit('没有技能的战斗', async () => {
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
        ca.zeroPower = 10;
        ca.powerGrow = 0;
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
        ca.zeroPower = 20;
        ca.powerGrow = 0;
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

  xit('绿毛虫 vs 绿毛虫', async () => {
    let st = StageUtil.getIns().createStage();
    let black = StageUtil.getIns().createArmy(EArmyColor.black, 1000, [{ cardId: '100004' }]);
    let red = StageUtil.getIns().createArmy(EArmyColor.red, 1000, [{ cardId: '100004' }]);
    st.loadArmyList([black, red]);
    st.combat();

    writeLog('绿毛虫 vs 绿毛虫', st);
  });



  xit('杰尼龟 vs 杰尼龟', async () => {
    let st = StageUtil.getIns().createStage();
    let black = StageUtil.getIns().createArmy(EArmyColor.black, 1000, [{ cardId: '100003' }]);
    let red = StageUtil.getIns().createArmy(EArmyColor.red, 1000, [{ cardId: '100003' }]);
    st.loadArmyList([black, red]);
    st.combat();

    writeLog('杰尼龟 vs 杰尼龟', st);
  });



  xit('杰尼龟 vs 绿毛虫', async () => {
    let st = StageUtil.getIns().createStage();
    let black = StageUtil.getIns().createArmy(EArmyColor.black, 1000, [{ cardId: '100003' }]);
    let red = StageUtil.getIns().createArmy(EArmyColor.red, 1000, [{ cardId: '100004' }]);
    st.loadArmyList([black, red]);
    st.combat();

    writeLog('杰尼龟 vs 绿毛虫', st);
  });




  xit('杰尼龟 vs 绿毛虫(5)', async () => {
    let st = StageUtil.getIns().createStage();
    let black = StageUtil.getIns().createArmy(EArmyColor.black, 1000, [{ cardId: '100003' }]);
    let red = StageUtil.getIns().createArmy(EArmyColor.red, 1000, [{ cardId: '100004', level: 5 }]);
    st.loadArmyList([black, red]);
    st.combat();

    writeLog('杰尼龟 vs 绿毛虫(5)', st);
  });




  it('杰尼龟*6 vs 绿毛虫*6', async () => {
    let st = StageUtil.getIns().createStage();
    let black = StageUtil.getIns().createArmy(EArmyColor.black, 1000, [{ cardId: '100003' }, { cardId: '100003' }, { cardId: '100003' }, { cardId: '100003' }, { cardId: '100003' }, { cardId: '100003' },]);
    let red = StageUtil.getIns().createArmy(EArmyColor.red, 1000, [{ cardId: '100004' }, { cardId: '100004' }, { cardId: '100004' }, { cardId: '100004' }, { cardId: '100004' }, { cardId: '100004' },]);
    st.loadArmyList([black, red]);
    st.combat();

    writeLog('杰尼龟*6 vs 绿毛虫*6', st);
  });



});

