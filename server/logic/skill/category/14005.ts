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

// 替身
// 每次最多受到{0}点物理伤害
// Lo_sk#Ef_hurt_max@Ht_phy@Num_int:-30:350

import Stage from '../../stage/stage';
import Card from '../../card/card';
import Skill from '../../skill/skill';
import Flow from '../../flow/flow';
import Hero from '../../hero/hero';
import * as schema from '../../schema';
import CastFlow from '../../flow/castFlow';


export default class tishen extends Skill {
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
    return rst;
  }





}