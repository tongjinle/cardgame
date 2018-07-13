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


import Stage from '../../stage/stage';
import Card from '../../card/card';
import Hero from '../../hero/hero';
import Tool from '../../tool/tool';
import parseTeam from './parseTeam';


// 索敌类型枚举
enum EFindTarget {
  // 自身
  Lo_sf,
  // 我方英雄
  Lo_sf_hr,
  // 敌方正面卡牌
  Lo_op,
  // 敌方英雄
  Lo_op_hr,
  // 敌方随机卡牌
  Lo_op_rd,
  // 某方某属性最大的卡牌
  Lo_pr_mx,
  // 某方某属性最小的卡牌
  Lo_pr_mn,
}


// 索敌函数
export default function parseFindTarget(stage: Stage, sender: Card | Tool, findTargetStr: string): (Card | Hero)[] {
  let rst: (Card | Hero)[] = [];
  let [findTargetTypeStr, ...args] = findTargetStr.split('@');
  let findTargetType: EFindTarget = EFindTarget[findTargetTypeStr];


  let card: Card = sender instanceof Card ? sender : undefined;
  let enemy = stage.armyList.find(ar => ar !== card.army);
  if (EFindTarget.Lo_sf === findTargetType) {
    rst.push(card);
  } else if (EFindTarget.Lo_sf_hr === findTargetType) {
    rst.push(card.army.hero);
  } else if (EFindTarget.Lo_op === findTargetType) {
    rst.push(enemy.cardList.find(ca => ca.position == card.position));
  } else if (EFindTarget.Lo_op_hr === findTargetType) {
    rst.push(enemy.hero);
  } else if (EFindTarget.Lo_op_rd === findTargetType) {
    let count: number = parseInt(args[0]);
    let list: Card[] = randomFetch(enemy.cardList, count, stage.rndGen);
    // 通过position排序下
    rst.push(...list.sort((a, b) => a.position - b.position));
  }
  else if (EFindTarget.Lo_pr_mx === findTargetType) {
    let teamStr = args[0];
    let propStr = args[1];
    let count: number = parseInt(args[2]);
    // 卡牌范围
    let cardList = parseTeam(stage, card, teamStr);
    // 属性排序,倒转
    cardList = cardList.sort(getCardSortMethod(propStr)).reverse();
    // 截取一定数量
    cardList = cardList.slice(0, count);
    rst.push(...cardList);
  }
  else if (EFindTarget.Lo_pr_mn === findTargetType) {
    let teamStr = args[0];
    let propStr = args[1];
    let count: number = parseInt(args[2]);
    // 卡牌范围
    let cardList = parseTeam(stage, card, teamStr);
    // 属性排序,倒转
    cardList = cardList.sort(getCardSortMethod(propStr));
    // 截取一定数量
    cardList = cardList.slice(0, count);
    rst.push(...cardList);
  }
  return rst;
}


// help 
// 从一个list中随机返回count个元素
function randomFetch(list: any[], count: number, rndGen: () => number): any[] {
  let rst: any[] = [];
  let realCount = Math.min(list.length, count);
  let rndInterval = (min: number, max: number): number => {
    return Math.floor((max - min) * rndGen()) + min;
  };

  // 存放随机取出来的下标
  let indexList: number[] = [];
  while (1) {
    if (!realCount) break;

    let index = rndInterval(0, list.length - 1);
    if (!indexList.some(n => n === index)) {
      indexList.push(index);
      realCount--;
    }
  }

  rst = list.filter((n, index) => indexList.some(n => n == index));

  return rst;
}

// 属性
enum EProp {
  // 当前血量
  Pro_hp_cur,
  // 最大血量
  // 攻击力

}


// 默认全部从小到大排列
function getCardSortMethod(propStr: string): (a: Card, b: Card) => number {
  let type: EProp = EProp[propStr];
  if (EProp.Pro_hp_cur === type) {
    return (a: Card, b: Card) => a.hp - b.hp;
  }

  return (a: Card, b: Card) => 0;
}


