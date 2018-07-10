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

import Record from './record';
import Army from '../army/army';
import Card from '../card/card';
import Hero from '../hero/hero';
import { ECombatStatus, EArmyColor, } from '../schema';
import *  as conf from '../config';
import rnd from 'seedrandom';
// 战斗场景
export default class Stage {
  // 战斗状态
  status: ECombatStatus;
  // 军队列表
  armyList: Army[];
  // 当前活动军队
  activeArmy: Army;
  // 随机种子
  seed: number;
  // 随机数发生器
  rndGen: rnd.prng;
  // 战斗记录
  recordList: Record[];
  // 回合计数
  roundIndex: number;
  constructor() {
    this.roundIndex = 0;
    this.seed = Math.random();
    this.rndGen = rnd(this.seed.toString());

  }

  // 加载军队,打乱卡牌顺序
  loadArmyList(armyList: Army[]) {
    this.armyList = armyList;
    // 默认是准备状态
    this.status = ECombatStatus.pending;
  }


  // 开始计算结果
  combat(): void {
    // 进入战斗状态
    this.status = ECombatStatus.combat;

    while (1) {
      this.judge();
      if (this.status as ECombatStatus === ECombatStatus.end) {
        break;
      }

      this.activeArmy = this.getActiveArmy();

      this.drawCard();
      this.putCard();

      this.castTool();

      this.cardCombat();

      // 回合数统计
      this.roundIndex++;
    }
  }

  // 确定行动方
  getActiveArmy(): Army {
    if (!this.activeArmy) {
      return this.getFirstActiveArmy();
    }
    // 交换回合
    return this.armyList.find(ar => ar != this.activeArmy);
  }




  // 抽牌(尝试)
  drawCard(): void {
    if (this.activeArmy.cardListForWait.length < conf.CardMaxCount && this.activeArmy.cardListForDraw.length > 0) {
      let index = Math.floor(this.rndGen() * this.activeArmy.cardListForDraw.length);
      let card = this.activeArmy.cardListForDraw[index];
      this.activeArmy.cardListForDraw.splice(index, 1);
      this.activeArmy.cardListForWait.push(card);

      // 刷新手牌位置
      this.resetCardPosition(this.activeArmy.cardListForWait);
    }
  }



  // 手牌上场(尝试)
  putCard(): void {
    // 减少等待回合
    this.activeArmy.cardListForWait.forEach(ca => {
      ca.waitRound = Math.min(0, ca.waitRound - 1);
    });
    // 查看能上场的手牌
    // while,因为上场的可能不止一个
    let ca: Card;
    while (this.activeArmy.cardList.length < conf.CardMaxCount && (ca = this.activeArmy.cardListForWait.find(ca => ca.waitRound === 0))) {
      // 上场
      let index = this.activeArmy.cardListForWait.indexOf(ca);
      this.activeArmy.cardListForWait.splice(index, 1);
      this.activeArmy.cardList.push(ca);
    }

    // 刷新手牌位置
    this.resetCardPosition(this.activeArmy.cardList);
  }

  // 刷新手牌位置
  resetCardPosition(list: Card[]): void {
    list.forEach((ca, index) => {
      if (ca.position !== index) {
        ca.position = index;
        // record
      }
    });
  }

  // 使用道具(尝试)
  castTool(): void {

  }

  // 卡牌攻击
  cardCombat(): void {
    this.activeArmy.cardList.forEach(ca => {
      // 使用技能
      ca.skillList.forEach(sk => {

      });

      // 普通攻击
      {
        let target = ca.findTargetForCard(this);
        target && ca.attack(target);
      }
    });
  }

  // 清理战场
  clearCombatField(): void {
    let enemy = this.armyList.find(ar => ar != this.activeArmy);
    let indexList = enemy.cardList.map((ca, index) => {
      if (ca.hp === 0) {
        return index;
      }
    });
    enemy.cardList = enemy.cardList.filter((ca, index) => indexList.every(n => n !== index));

    // record

  }

  // 判断胜负
  judge(): void {
    this.armyList.some(ar => {
      if (ar.hero.hp <= 0) {
        this.status = ECombatStatus.end;
        // record
        return true;
      }
      if (ar.cardList.length === 0 && ar.cardListForDraw.length === 0) {
        this.status = ECombatStatus.end;
        // record
        return true;
      }
    })
  }

  // 确定第一个回合的行动方
  getFirstActiveArmy(): Army {
    return this.armyList.sort((a, b) => { return b.getTotalValue() - a.getTotalValue(); })[0];
  };







}