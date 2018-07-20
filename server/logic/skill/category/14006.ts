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

// 反射壁
// 受到的魔法伤害技能无效，并对施法者造成{0}点绝对伤害
// Con_sk_fun@Fun_mag?Lo_ca#Ef_mis#Ef_abs@Num_int:30

import Stage from '../../stage/stage';
import Card from '../../card/card';
import Skill from '../../skill/skill';
import Flow from '../../flow/flow';
import Hero from '../../hero/hero';
import * as schema from '../../schema';
import CastFlow from '../../flow/castFlow';


export default class fanshebi extends Skill {
  constructor() {
    super();
    this.nature = schema.ESkillNature.none;
    this.useType = schema.ECastFlowStep.afterCast;
  }



  // 索敌,查找目标
  findTarget(): Card[] | Hero {
    let rst: Card[] | Hero;
    return rst;
  }


  // 技能效果
  cast(flow?: CastFlow): CastFlow[] {
    let rst: CastFlow[] = [];

    // 自身是目标的时候
    if (this.card == flow.target) {
      let hasMagicDamage: boolean = false;


      flow.data.forEach(n => {
        if (n.target) {
          hasMagicDamage = hasMagicDamage || n.target.data.magic > 0 || n.target.data.magicHeal > 0;
          if (n.target.data.magic > 0 || n.target.data.magicHeal > 0) {
            flow.addImmuneData(n.target.id);
          }
        }
      });
      if (hasMagicDamage) {
        let amount = this.level * 30;
        flow.addData({ role: 'sender', data: { sacred: amount } });
      }
    }

    return rst;
  }





}