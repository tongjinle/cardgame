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

// 藤编
// 对敌方1张卡牌造成{0}点魔法伤害，自身回复相同的血量
// Lo_op_rd@1#Ef_mag_hea@Num_int:20

import Stage from '../../stage/stage';
import Card from '../../card/card';
import Skill from '../../skill/skill';
import Flow from '../../flow/flow';
import Hero from '../../hero/hero';
import * as schema from '../../schema';
import CastFlow from '../../flow/castFlow';


export default class feiyekuaidao extends Skill {
  constructor() {
    super();
    this.nature = schema.ESkillNature.grass;
    this.useType = schema.ECastFlowStep.notifyCast;
  }



  // 索敌,查找目标
  findTarget(): Card[] | Hero {
    let rst: Card[] | Hero;
    rst = this.findRndTargetFromEnemy(this.stage, 1);
    return rst;
  }


  // 技能效果
  cast(flow?: CastFlow): CastFlow[] {
    let rst: CastFlow[] = [];
    let taList = this.findTarget() as Card[];

    let amount = this.level * 20;
    taList.forEach(ta => {
      let fl = new CastFlow(this.card, ta);
      fl.addData({ role: 'target', data: { magicHeal: amount } }, { role: 'sender', data: { magicHeal: amount } });
      rst.push(fl);
    });
    return rst;
  }





}