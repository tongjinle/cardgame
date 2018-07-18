/*
    *********************************************  
                       _ooOoo_  
                      o8888888o  
                      88" . "88  
                      (| -_- |)  
                      O\  =  /O  
                   ____/`---'\____  
                 .'  \|     |//  `.  
                /  \|||  :  |||//  \  
               /  _||||| -:- |||||-  \  
               |   | \\  -  /// |   |  
               | \_|  ''\---/''  |   |  
               \  .-\__  `-`  ___/-. /  
             ___`. .'  /--.--\  `. . __  
          ."" '<  `.___\_<|>_/___.'  >'"".  
         | | :  `- \`.;`\ _ /`;.`/ - ` : | |  
         \  \ `-.   \_ __\ /__ _/   .-` /  /  
    ======`-.____`-.___\_____/___.-`____.-'======  
                       `=---='  
    ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^  
               佛祖保佑       永无BUG  
*/

import fs from 'fs';
import path from 'path';
import Stage from '..//stage/stage';
import Card from '../card/card';
import Hero from '../hero/hero';
import Skill from '../skill/skill';
import Buff from '../buff/buff';
import Army from '../army/army';

import { ENature, ESkillNature, EArmyColor, } from '../schema';


interface ICardData {
  cardId: string,
  nameList: string[],
  quality: string,
  nature: string,
  racePointList: number[],
  waitRound: number,
  power: number,
  hp: number,
  powerGrow: number,
  hpGrow: number,
  skillList: { id: string, name: string, level: number, }[],
}

interface ISkillData {
  skillId: string,
  name: string,
  nature: string,
  desc: string,
  descArgs: string,
  formula: string,
  useType: string,
  funcType: string,
  funcDesc: string,

}

interface IBuffData {
  buffId: string,
  name: string,
  desc: string,
  maxLayer: number,
  clearLayer: number,
  triggerStep: string,
  buffType: string,
}

interface ICardInfo {
  // 卡牌id
  cardId: string,
  // 卡牌的等级
  level?: number
}



// 舞台帮助函数
export default class StageUtil {
  // 创建一个军队
  // 黑色军队的英雄生命值,然后是红色
  createStage(): Stage {
    let st = new Stage();

    return st;
  }

  createArmy(color: EArmyColor, heroHp: number, cardInfoList: ICardInfo[]): Army {
    let rst: Army = new Army();
    rst.color = color;
    
    // hero
    let he = new Hero();
    he.cardCount = 6;
    he.hp = heroHp;
    rst.hero = he;

    // card
    rst.cardListForDraw.push(...cardInfoList.map(info => this.createCard(info.cardId, info.level)));

    return rst;
  };



  // 创建一个卡牌,通过一个卡牌编号
  createCard(id: string, level: number = 0): Card {
    let rst: Card;

    rst = new Card();
    let sourceData: ICardData = this.cardData.find(n => n.cardId === id);
    if (!sourceData) {
      throw "no such card data";
    }


    rst.id = this.createRndId();
    rst.cardId = sourceData.cardId;
    rst.nature = ENature[sourceData.nature];
    rst.waitRound = sourceData.waitRound;

    rst.zeroHp = sourceData.hp;
    rst.zeroPower = sourceData.power;

    rst.hpGrow = sourceData.hpGrow;
    rst.powerGrow = sourceData.powerGrow;

    rst.nameList.push(...sourceData.nameList);
    rst.racePointList.push(...sourceData.racePointList);

    // add skill
    {
      sourceData.skillList.forEach((skData, index) => {
        let levelRequire = [0, 5, 10][index];
        let sk = this.createSkill(skData.id, skData.level, levelRequire);
        rst.addSkill(sk);
        sk.card = rst;
      });
    }

    rst.setLevel(level);

    return rst;
  }


  createSkill(id: string, level: number, levelRequire: number, ): Skill {
    let rst: Skill;

    // 动态加载类 start
    let filename = '../skill/category/' + id;
    let a = require(filename);
    console.log('a',a,filename);
    let kls:any = require('../skill/category/' + id).default;
    // import kls = require('../skill/category/' + id);
    // 动态加载类 end

    rst = new kls();
    console.log('kls: ' + rst);

    let sourceData: ISkillData = this.skillData.find(n => n.skillId === id);
    if (!sourceData) {
      throw "no such skill data";
    }

    rst.id = this.createRndId();
    // rst.skillId = sourceData.skillId;
    // rst.name = sourceData.name;
    // rst.nature = ESkillNature[sourceData.nature];
    rst.level = level;
    rst.levelRequire = levelRequire;
    // rst.formula = sourceData.formula;


    return rst;
  }


  createBuff(id: string, layer: number): Buff {
    let rst: Buff;


    rst = new Buff();

    let sourceData: IBuffData = this.buffData.find(n => n.buffId === id);
    if (!sourceData) {
      throw "no such buff data";
    }

    rst.id = this.createRndId();
    rst.buffId = id;
    rst.name = sourceData.name;
    rst.maxLayer = sourceData.maxLayer;
    rst.clearLayer = sourceData.clearLayer;
    rst.setLayer(layer);

    return rst;
  }

  // 唯一实例
  private static ins: StageUtil;

  // 数据
  private cardData: ICardData[];
  private skillData: ISkillData[];
  private buffData: IBuffData[];

  static getIns(): StageUtil {
    if (!StageUtil.ins) {
      StageUtil.ins = new StageUtil();
    }
    return StageUtil.ins;
  }

  private constructor() {
    this.readDataFile();
  }

  private readDataFile(): void {
    let filepath = path.resolve(`${__dirname}/../../data/json`);
    this.cardData = JSON.parse(fs.readFileSync(`${filepath}/card.json`, 'utf-8'));
    this.skillData = JSON.parse(fs.readFileSync(`${filepath}/skill.json`, 'utf-8'));
    this.buffData = JSON.parse(fs.readFileSync(`${filepath}/buff.json`, 'utf-8'));
  }

  private createRndId(): string {
    return Math.floor(1e16 * Math.random()).toString(16).slice(0, 12);
  }


}

