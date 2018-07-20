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

// 火苗
// 对敌方1张卡牌造成{0}点魔法伤害，并有45%概率进入烧伤状态
// Lo_op_rd@1#Ef_mag@Num_int:30#Con_per@45?Ef_buf@101@1

import Stage from '../../stage/stage';
import Card from '../../card/card';
import Skill from '../../skill/skill';
import Flow from '../../flow/flow';
import Hero from '../../hero/hero';
import * as schema from '../../schema';
import CastFlow from '../../flow/castFlow';


export default class huomiao extends Skill {
  constructor() {
    super();
    this.nature = schema.ESkillNature.fire;
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
    let amount = this.level * 30;
    let isGenBuff: boolean = this.rndGen() <= .45;
    taList.forEach(ta=>{
      // let fl = new CastFlow(this.card, ta);
      // fl.data.target.damage.magic = amount;
      // fl.data.target.

    });

    return rst;
  }





}