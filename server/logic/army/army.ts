import { EArmyColor, } from '../schema';

import Stage from '../stage/stage';
import Hero from '../hero/hero';
import Card from '../card/card';
import Tool from '../tool/tool';


// 军队
export default class Army {
  // 颜色
  color: EArmyColor;
  // 英雄
  hero: Hero;
  // 待抽的卡牌列表
  cardListForDraw: Card[];
  // 等待上场的卡牌列表
  cardListForWait: Card[];
  // 卡牌列表
  cardList: Card[];
  // 道具列表
  toolList: Tool[];
  // 所属场景
  stage: Stage;

  constructor() {
    this.cardListForDraw = [];
    this.cardListForWait = [];
    this.cardList = [];
    this.toolList = [];
  }

  // 总估值
  // 这个值较大的决定了哪方拥有优先攻击权
  getTotalValue(): number {
    let rst: number = 0;
    rst = this.cardListForDraw.reduce((prev, ca) => {
      return prev + ca.racePoint;
    }, 0);
    return rst;
  }



  toInfo() {
    return {
      color: this.color,
      colorStr: EArmyColor[this.color],
      hero: this.hero.toInfo(),
      cardListForDraw: this.cardListForDraw.map(n => n.toInfo()),
      toolList: this.toolList.map(n => n.toInfo()),

    }
  }


  // isArmyDead():boolean{
  //   return this.hero.hp <= 0 || (this.cardList.length === 0 && this.cardListForDraw.length === 0);
  // }
}