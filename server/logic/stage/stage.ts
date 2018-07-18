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
import Skill from '../skill/skill';
import Buff from '../buff/buff';
import Flow from '../flow/flow';
import CastFlow from '../flow/castFlow';
import { ECombatStatus, EArmyColor, ERecord, EDefeat, EFlowType, ECastFlowStep, ICastDamage, } from '../schema';
import *  as conf from '../config';
import rnd from 'seedrandom';


// 战斗场景
export default class Stage {
  // 是否处于播放录像
  isReplay: boolean = false;
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

  private buffList: Buff[];

  // castFlow列表
  castFlowList: CastFlow[];



  constructor() {
    this.roundIndex = 0;
    this.seed = Math.random();
    this.rndGen = rnd(this.seed.toString());
    this.castFlowList = [];
    this.recordList = [];
  }

  // 加载军队,打乱卡牌顺序
  loadArmyList(armyList: Army[]) {
    this.armyList = armyList;
    // 默认是准备状态
    this.status = ECombatStatus.pending;

    // record
    this.writeRecord(ERecord.prepare, { armyList: this.armyList.map(ar => ar.toInfo()), });
  }


  // 开始计算结果
  combat(): void {
    // 进入战斗状态
    this.status = ECombatStatus.combat;

    // record
    this.writeRecord(ERecord.start);
    let count = 100;
    while (count) {
      this.judge();
      if (this.status as ECombatStatus === ECombatStatus.end) {
        break;
      }

      this.activeArmy = this.getActiveArmy();

      this.drawCard();
      this.putCard();

      this.castTool();

      this.cardCombat();

      this.clearCombatField();

      // 回合数统计
      this.roundIndex++;
      count--;
    }
  }

  // 确定行动方
  getActiveArmy(): Army {
    if (!this.activeArmy) {
      return this.getFirstActiveArmy();
    }
    // 交换回合
    let army = this.armyList.find(ar => ar != this.activeArmy);

    // record
    this.writeRecord(ERecord.round, { heroId: army.hero.id, });
    return army;
  }




  // 抽牌(尝试)
  drawCard(): void {
    if (this.activeArmy.cardListForWait.length < conf.CardMaxCount && this.activeArmy.cardListForDraw.length > 0) {
      let index = Math.floor(this.rndGen() * this.activeArmy.cardListForDraw.length);
      let card = this.activeArmy.cardListForDraw[index];
      this.activeArmy.cardListForDraw.splice(index, 1);
      this.activeArmy.cardListForWait.push(card);

      // record
      this.writeRecord(ERecord.drawCard, { card: card.toInfo() });

      // 刷新手牌位置
      this.resetCardPosition(this.activeArmy.cardListForWait);
    }
  }



  // 手牌上场(尝试)
  putCard(): void {
    // 减少等待回合
    this.activeArmy.cardListForWait.forEach(ca => {
      ca.waitRound = Math.max(0, ca.waitRound - 1);
    });
    // record
    this.writeRecord(ERecord.reduceWaitRound, )

    // 查看能上场的手牌
    // while,因为上场的可能不止一个
    let ca: Card;
    while (this.activeArmy.cardList.length < conf.CardMaxCount && (ca = this.activeArmy.cardListForWait.find(ca => ca.waitRound === 0))) {
      // 上场
      let index = this.activeArmy.cardListForWait.indexOf(ca);
      this.activeArmy.cardListForWait.splice(index, 1);
      this.activeArmy.cardList.push(ca);

      // record
      this.writeRecord(ERecord.putCard, { card: ca.toInfo() });
    }

    // 刷新手牌位置
    this.resetCardPosition(this.activeArmy.cardList);
  }

  // 刷新手牌位置
  resetCardPosition(list: Card[]): void {
    list.forEach((ca, index) => {
      if (ca.position !== index) {
        let lastPosition = ca.position;
        ca.position = index;

        // record
        this.writeRecord(ERecord.resetCardPosition, { cardId: ca.id, lastPosition, position: ca.position })
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
        if (sk.isLevelRequired && sk.useType === ECastFlowStep.notifyCast) {
          let caFlowList = sk.cast(this);
          this.castFlowList.push(...caFlowList);


          // 因为在处理flow的时候,也会形成新的flow,它们以一个栈的顺序来处理
          while (this.castFlowList.length) {
            let fl = this.castFlowList.pop();
            fl.step = ECastFlowStep.beforeBeCast;
            this.dealFlow(fl);
          }

        }
      });

      // 普通攻击
      {
        let target = ca.findTargetForCard(this);
        let lastHp = target.hp;
        target && ca.attack(target);

        // record
        this.writeRecord(ERecord.cardAttack, { cardId: ca.id, targetId: target.id, lastHp, hp: target.hp, });
      }
    });
  }

  // 清理战场
  clearCombatField(): void {
    let enemy = this.armyList.find(ar => ar != this.activeArmy);
    let idList = enemy.cardList
      .filter(ca => ca.hp === 0)
      .map(ca => ca.id)

    enemy.cardList = enemy.cardList.filter(ca => !idList.some(n => n === ca.id));

    // record
    idList.forEach(id => {
      this.writeRecord(ERecord.clearCard, { cardId: id, });
    });

  }

  // 判断胜负
  judge(): void {
    this.armyList.some(ar => {
      if (ar.hero.hp <= 0) {
        this.status = ECombatStatus.end;
        // record
        this.writeRecord(ERecord.end, { loserId: ar.hero.id, defeatType: EDefeat.hero, });
        return true;
      }
      if (ar.cardList.length === 0 && ar.cardListForDraw.length === 0 && ar.cardListForWait.length === 0) {
        this.status = ECombatStatus.end;
        // record
        this.writeRecord(ERecord.end, { loserId: ar.hero.id, defeatType: EDefeat.card, });
        return true;
      }
    })
  }

  // 确定第一个回合的行动方
  getFirstActiveArmy(): Army {
    return this.armyList.sort((a, b) => { return b.getTotalValue() - a.getTotalValue(); })[0];
  };

  // 处理效果流
  dealFlow(flow: Flow) {

    if (flow instanceof CastFlow) {

      flow.stepQueue.forEach(st => {
        flow.step = st;
        let caList: Card[] = [];
        if (flow.sender instanceof Card) {
          caList.push(flow.sender);
        }
        if (flow.target instanceof Card) {
          caList.push(flow.target);
        }
        caList.forEach(ca => {
          ca.skillList.forEach(sk => {
            if (sk.isLevelRequired && sk.useType === st) {
              sk.cast(this, flow);
            }
          });
        });
      });
      flow.isDone = true;


      // 计算相关的伤害,治疗等等
      // todo
      // 处理sender
      {
        this.calcFlow(flow.sender as Card, flow.data.sender);
      }

    }


  }

  calcFlow(target: Card | Hero, effect: { damage: ICastDamage }) {
    let { damage } = effect;
    let lastHp = target.hp;
    target.hp = Math.max(0, target.hp - damage.magic - damage.other - damage.physical - damage.sacred - damage.special);
  }


  // 放弃,想复杂了
  // private getActiveSkillList(step: ECastFlowStep, ) {
  //   let rst: Skill[] = [];
  //   this.armyList.forEach(ar => {
  //     ar.cardList.forEach(ca => {
  //       ca.skillList.forEach(sk => {
  //         if (sk.isLevelRequired && sk.useType === step) {
  //           rst.push(sk);
  //         }
  //       });
  //     });
  //   });
  //   return rst;
  // }



  // 记录
  private writeRecord(type: ERecord, info: any = {}): void {
    // 如果是在播放replay,则不用生成记录
    if (this.isReplay) return;

    let rec = {
      roundIndex: this.roundIndex,
      typeStr: ERecord[type],
      type,
      info,
    };
    this.recordList.push(rec);
  };

  // 从一个区间获取随机数
  genRnd(min: number, max: number): number {
    return Math.floor(this.rndGen() * (max - min)) + min;
  }

}