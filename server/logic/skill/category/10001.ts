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

// 水枪
// 对敌方1张卡牌造成{0}点魔法伤害
// Lo_op_rd@1#Ef_mag@Num_int:40

import Stage from '../../stage/stage';
import Card from '../../card/card';
import Skill from '../../skill/skill';
import Flow from '../../flow/flow';
import Hero from '../../hero/hero';
import * as schema from '../../schema';
import CastFlow from '../../flow/castFlow';


export default class __shuiqiang__ extends Skill {
  constructor() {
    super();
    this.nature = schema.ESkillNature.water;
    this.useType = schema.ECastFlowStep.notifyCast;
  }



  // 索敌,查找目标
  findTarget(stage: Stage): Card[] | Hero {
    let rst: Card[] | Hero;
    rst = this.findRndTargetFromEnemy(stage, 1);
    return rst;
  }


  // 技能效果
  cast(stage: Stage, flow?: CastFlow): CastFlow[] {
    let rst: CastFlow[] = [];
    let targetList: Card[] = this.findTarget(stage) as Card[];

    // damage
    let da: number = this.calcNormal(40);
    targetList.forEach(ta => {
      let fl = new CastFlow(this.card, ta);
      fl.data.target.damage.magic = da;
      rst.push(fl);
    });

    return rst;
  }





}