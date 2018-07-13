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
import Tool from '../../tool/tool';
import Hero from '../../hero/hero';
import CastFlow from '../../flow/castFlow';
import parseNumberFormula from './parseNumberFormula';

enum EEffect {
  // 魔法伤害
  Ef_mag,
  // 物理伤害
  Ef_phy,
  // 特殊伤害
  Ef_spe,
  // 绝对伤害
  Ef_abs,
  // 治疗
  Ef_hea,
  // 攻击力增加
  Ef_atk_add,
  // 魔法伤害+治疗(法术吸血)
  Ef_mag_hea,
  // 从场上回到手牌
  Ef_back_hand,
  // 从墓地回到手牌
  Ef_recycle,
  // 攻击无视闪避(忽视"保护","替身","影分身")
  Ef_ace,
  // 添加buff
  Ef_buf,
  // 伤害减少
  Ef_hurt_dis,
  // 伤害最大化
  Ef_hurt_max,
  // 攻击或则技能无效
  Ef_mis,
  // buff免疫
  Ef_buf_mis,

}

// 解析效果字符串,返回一个效果流
export default function parseEffect(stage: Stage, sender: Card | Tool, target: Card | Hero, effectStr: string): CastFlow {
  let rst: CastFlow = new CastFlow(sender, target);
  let parseNumberFormulaWithEnv = (numberFormulaStr: string) => {
    return parseNumberFormula(stage, sender, target, rst, numberFormulaStr);
  };

  let [effectTypeStr, ...args] = effectStr.split('@');
  let type: EEffect = EEffect[effectTypeStr];
  if (EEffect.Ef_mag === type) {
    rst.data.damage.magic = parseNumberFormulaWithEnv(args[0]);
  }

  return rst;
}













