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
import {
  ECombatStatus, EArmyColor, ERecord, EDefeat, EFlowType, ECastFlowStep,
  ICastDamage,
  ICastProp,
  ICastData,
  EBuff,
} from '../schema';
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


    // skill rndGen 使用 stage的rndGen
    armyList.forEach(ar => {
      ar.stage = this;
      ar.cardListForDraw.forEach(ca => {
        // 随机种子
        ca.skillList.forEach(sk => {
          sk.rndGen = this.rndGen;
        });
      });
    });

    // record
    this.writeRecord(ERecord.prepare, { armyList: this.armyList.map(ar => ar.toInfo()), });
  }


  // 开始计算结果
  combat(): void {
    // 进入战斗状态
    this.status = ECombatStatus.combat;

    // record
    this.writeRecord(ERecord.start);
    while (1) {
      this.judge();
      if (this.status as ECombatStatus === ECombatStatus.end) {
        break;
      }


      this.getActiveArmy();


      this.drawCard();
      this.putCard();

      this.castTool();

      this.cardCombat();

      this.clearCombatField();

      this.reduceBuff();

      // 回合数统计
      this.roundIndex++;
    }
  }

  // 确定行动方
  getActiveArmy() {
    let ar: Army;
    // 第一次获取行动方
    if (!this.activeArmy) {
      ar = this.getFirstActiveArmy();
    }
    // 交换回合
    else {
      ar = this.armyList.find(ar => ar != this.activeArmy);
    }

    this.activeArmy = ar;

    // record
    this.writeRecord(ERecord.round, { color: ar.color, colorStr: EArmyColor[ar.color], });
  }


  // 清理每个回合的buff
  reduceBuff(): void {
    this.activeArmy.cardList.forEach(ca => {
      ca.buffList.forEach(bu => {
        bu.reduceLayer();
      });
    });
  }




  // 抽牌(尝试)
  drawCard(): void {
    const maxCount = conf.CARD_WAIT_MAX_COUNT;

    if (this.activeArmy.cardListForWait.length < maxCount && this.activeArmy.cardListForDraw.length > 0) {
      let index = Math.floor(this.rndGen() * this.activeArmy.cardListForDraw.length);
      let card = this.activeArmy.cardListForDraw[index];
      this.activeArmy.cardListForDraw.splice(index, 1);
      this.activeArmy.cardListForWait.push(card);

      // record
      this.writeRecord(ERecord.drawCard, { cardId: card.id, });

      // 刷新手牌位置
      this.resetCardPosition(this.activeArmy.cardListForWait);
    }
  }



  // 手牌上场(尝试)
  putCard(): void {
    const maxCount = conf.CARD_MAX_COUNT;
    // 减少等待回合
    this.activeArmy.cardListForWait.forEach(ca => {
      ca.waitRound = Math.max(0, ca.waitRound - 1);
    });
    // record
    this.writeRecord(ERecord.reduceWaitRound, )

    // 查看能上场的手牌
    // while,因为上场的可能不止一个
    let ca: Card;
    // 需要被记录的card的id列表
    let caIdList: string[] = [];
    while (this.activeArmy.cardList.length < maxCount && (ca = this.activeArmy.cardListForWait.find(ca => ca.waitRound === 0))) {
      // 上场
      let index = this.activeArmy.cardListForWait.indexOf(ca);
      this.activeArmy.cardListForWait.splice(index, 1);
      this.activeArmy.cardList.push(ca);

      caIdList.push(ca.id);

      // record
      this.writeRecord(ERecord.putCard, { card: ca.id, });
    }

    // 刷新手牌位置
    this.resetCardPosition(this.activeArmy.cardList, caIdList);
  }

  // 刷新手牌位置
  // cardIdList必须为写记录的card,因为他们可能是从一个卡牌区域到另一个卡牌区域
  resetCardPosition(list: Card[], cardIdList?: string[]): void {
    list.forEach((ca, index) => {
      if (ca.position !== index || (cardIdList && cardIdList.some(id => list.some(li => li.id === id)))) {
        let lastPosition = ca.position;
        ca.position = index;

        // record
        this.writeRecord(ERecord.resetCardPosition, { cardId: ca.id, lastPosition, position: ca.position })
      }
    });
  }

  // 使用道具(尝试)
  castTool(): void {
    // todo
  }

  // 卡牌攻击
  cardCombat(): void {
    this.activeArmy.cardList.some(ca => {
      // if (this.status === ECombatStatus.end) { return true;}
      // 使用技能
      ca.skillList.forEach(sk => {
        if (this.status === ECombatStatus.end) { return true; }
        if (sk.isLevelRequired && sk.useType === ECastFlowStep.notifyCast) {
          let caFlowList = sk.cast();
          this.castFlowList.push(...caFlowList);

          // record
          this.writeRecord(ERecord.castCardSkill, { cardId: ca.id, skillId: sk.id, });

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
        if (this.status === ECombatStatus.end) { return true; }

        let target = ca.findTargetForCard(this);
        let lastHp = target.hp;

        if (target) {
          ca.attack(target);

          // record
          this.writeRecord(ERecord.cardAttack, { cardId: ca.id, targetId: target.id, lastHp, hp: target.hp, });
        }
      }
      return false;
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
    // 英雄被击败 或者 卡牌被击败
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
    });

    // 无法在最大回合数决出胜负
    if (this.roundIndex === conf.ROUND_MAX_COUNT) {
      let loser: Army;
      let hp: number = Infinity;
      this.armyList.forEach(ar => {
        if (hp > ar.hero.hp) {
          hp = ar.hero.hp;
          loser = ar;
        }
      });
      this.status = ECombatStatus.end;
      // record
      this.writeRecord(ERecord.end, { loserId: loser.hero.id, defeatType: EDefeat.maxRound, });
    }
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
              sk.cast(flow);
            }
          });
        });
      });
      flow.isDone = true;

      // console.log((flow.data.sender.prop);
      // console.log((flow.data.target.prop);

      // 计算相关的伤害,治疗等等
      // 处理sender && target
      {
        // this.calcFlow(flow.sender as Card, flow.sender as Card, flow.data);
        // this.calcFlow(flow.sender as Card, flow.target, flow.data);
        this.calcFlow(flow.data);
      }

    }


  }

  calcFlow(dataList: ICastData[]): void {
    dataList.forEach(n => { });
  }

  // calcFlow(sender: Card, target: Card | Hero, effect: ICastData[]) {
  //   let { damage, prop, } = effect;
  //   let info: any = {};
  //   // 处理伤害
  //   {
  //     let lastHp = target.hp;
  //     target.hp -= (damage.magic + damage.other + damage.physical + damage.sacred + damage.special);

  //     // info
  //     if (lastHp !== target.hp) {
  //       info.damage = damage;
  //       info.lastHp = lastHp;
  //       info.hp = target.hp;

  //     }
  //   }

  //   // 处理属性变化
  //   {
  //     if (target instanceof Card) {
  //       prop.powerList.forEach(n => {
  //         let lastPower = target.power;

  //         let bu = new Buff();
  //         bu.layer = 1;
  //         bu.maxLayer = -1;
  //         bu.clearLayer = -1;
  //         bu.data = n.amount;
  //         bu.isForever = !!n.isForever;

  //         if (n.type === 'number') {
  //           bu.type = EBuff.powerAdd;
  //         } else if (n.type === 'percent') {
  //           bu.type = EBuff.powerMul;
  //         } else {
  //           throw 'wrong power buff type';
  //         }
  //         target.addBuff(bu);

  //         // info
  //         {
  //           info.buffList = info.buffList || [];
  //           let buInfo: any = bu.toInfo();

  //           // 补上power的改变
  //           let power = target.power;
  //           buInfo.lastPower = lastPower;
  //           buInfo.power = power;

  //           info.buffList.push(buInfo);
  //         }
  //       });
  //     }
  //   }

  //   // console.log(info, Object.keys(info).length);
  //   if (Object.keys(info).length) {
  //     info.cardId = sender.id;
  //     info.targetId = target.id;
  //     this.writeRecord(ERecord.castCardSkillEffect, info);

  //   }


  // }


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