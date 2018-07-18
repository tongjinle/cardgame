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
import CastFlow from '../../flow/castFlow';

// 数字公式类型
enum ENumberFormulaType {
  // 取等级相关整数
  Num_int,
  // 取等级相关百分比
  Num_per,
  // 取等级相关随机整数
  Num_init_rd,
  // 取卡牌属性值相关的百分比
  Num_pro,
  // 取伤害相关的百分比
  Num_hurt,
}

enum ECardRole {
  // accepter,接受者
  Tcd_ac,
  // caster,施放者
  Tcd_ca,
}

// 属性
enum EProp {
  // 当前血量
  Pro_hp_cur,
  // 最大血量
  // 攻击力

}

enum EHurt {
  // 总伤害值
  Ht_all,
  // 物理伤害值
  Ht_phy,
  // 魔法伤害值
  Ht_mag,
  // 特殊伤害值
  Ht_spe,
  // 绝对伤害值
  Ht_abs,
  // 英雄伤害值
  Ht_hero,
}



// 解析数字公式字符串
export default function parseNumberFormula(stage: Stage, sender: Card | Tool, target: Card | Hero, flow: CastFlow, numberFormulaStr: string): number {
  let rst: number = 0;

  let [numberFormulaTypeStr, ...args] = numberFormulaStr.split(':');
  let type: ENumberFormulaType = ENumberFormulaType[numberFormulaTypeStr];

  // 卡牌等级(如果sender是卡牌的话)
  let level: number = sender instanceof Card ? (sender as Card).level : 0;
  if (ENumberFormulaType.Num_int === type) {
    // 比例因子
    let factor: number = parseInt(args[0]);
    // 固定量
    let amount: number = parseInt(args[1]) || 0;
    rst = level * factor + amount;
  }
  else if (ENumberFormulaType.Num_per === type) {
    // discard
  }
  else if (ENumberFormulaType.Num_init_rd === type) {
    // 在区间中取一个随机数
    let getInterval = (min: number, max: number) => Math.floor((max - min) * stage.rndGen()) + min;

    let factor0: number = parseInt(args[0]);
    let factor1: number = parseInt(args[1]);
    let amount0: number = parseInt(args[2]) || 0;
    let amount1: number = parseInt(args[3]) || 0;

    rst = getInterval(factor0, factor1) * level + getInterval(amount0, amount1);
  }
  else if (ENumberFormulaType.Num_pro === type) {
    let roleType: ECardRole = ECardRole[args[0]];
    let propType: EProp = EProp[args[1]];
    let factor: number = parseInt(args[2]);
    let amount: number = parseInt(args[3]) || 0;

    let ca: Card = (roleType == ECardRole.Tcd_ca ? sender : target) as Card;
    rst = getPropValue(ca, propType) * factor * level + amount;

  }
  else if (ENumberFormulaType.Num_hurt === type) {
    let hurtType: EHurt = EHurt[args[0]];
    let factor: number = parseInt(args[1]);
    let amount: number = parseInt(args[2]) || 0;

    rst = getHurtVaule(flow, hurtType) * 20 * factor + amount;
  } else {
    throw 'no such numberFomula: ' + numberFormulaTypeStr;
  }

  // 统一取整
  rst = Math.floor(rst);

  return rst;
}

// 计算卡牌的属性值
function getPropValue(card: Card, type: EProp): number {
  let rst: number = 0;
  if (EProp.Pro_hp_cur === type) {
    rst = card.hp;
  } else {
    throw "no such propType: " + EProp[type];

  }
  return rst;


}

// 获取伤害值
function getHurtVaule(flow: CastFlow, type: EHurt): number {
  let rst: number = 0;
  if (EHurt.Ht_phy === type) {
    rst = flow.data.target.damage.physical;
  }
  else {
    throw 'no such hurtType: ' + EHurt[type];
  }
  return rst;
}











