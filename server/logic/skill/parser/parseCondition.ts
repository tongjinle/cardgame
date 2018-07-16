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

enum ECondition {
  // 百分比概率
  Con_per,
  // 前者是否大于后者
  Con_num_more,
  // 被攻击者是否拥有某些技能
  Con_has_sk,
  // 指定对象是否拥有功能参数合集的技能,todo
  Con_has_fun_sk,
  // 指定对象是否拥有某些buff
  Con_has_buf,
  // todo
  Con_sk_fun_belong,
  // 被攻击者是否为某种类型,卡牌
  Con_tar,
}

enum ETargetType {
  // 目标是英雄
  Tty_hero,
  // 目标是卡牌
  Tty_card,
}

// 解析condition字符串,返回一个effect字符串
export default function parseCondition(stage: Stage, sender: Card, target: Card | Hero, actionStr: string): string {
  let rst: string;

  // 如果没有条件语句的结构,就直接返回
  if (!/Con/.test(actionStr)) {
    return actionStr;
  }

  let [conditionStr, effectStr] = actionStr.split('?');
  // 注意conditionStr可能是一个条件语句,也可能是多个条件语句
  let judge: boolean = true;
  conditionStr.split('&&').some(n => {
    if (!parseSingleCondition(stage, sender, target, n)) {
      judge = false;
      return true;
    }
  });

  let [trueEffectStr, falseEffectStr] = effectStr.split('||');
  rst = judge ? trueEffectStr : falseEffectStr;

  return rst;
}





// 解析单个条件语句
function parseSingleCondition(stage: Stage, sender: Card, target: Card | Hero, conditionStr: string): boolean {
  let rst: boolean = true;

  let [typeStr, ...args] = conditionStr.split('@');
  let type: ECondition = ECondition[typeStr];

  if (ECondition.Con_per === type) {
    let rnd = stage.rndGen();
    let per = parseInt(args[0]);
    rst = per > rnd * 100;
  } else if (ECondition.Con_num_more === type) {
    let prev = parseInt(args[0]);
    let next = parseInt(args[1]);
    rst = prev > next;
  } else if (ECondition.Con_has_sk === type) {
    let skillIdList = args;
    rst = (target instanceof Card) && target.skillList.some(sk => skillIdList.some(n => n === sk.skillId));
  } else if (ECondition.Con_has_fun_sk === type) {

  } else if (ECondition.Con_has_buf === type) {

  } else if (ECondition.Con_sk_fun_belong === type) {

  } else if (ECondition.Con_tar === type) {
    let targetTypeStr = args[0];
    let targetType: ETargetType = ETargetType[targetTypeStr];
    if (ETargetType.Tty_card === targetType) {
      rst = target instanceof Card;
    } else if (ETargetType.Tty_hero === targetType) {
      rst = target instanceof Hero;
    }
  }


  return rst;
}
