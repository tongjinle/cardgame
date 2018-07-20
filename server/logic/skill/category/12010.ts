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

// 摇手指
// 随机发动一个主动技能，技能等级视为{0}
// Lo_sf#Ef_funny@Num_int:1

import Stage from '../../stage/stage';
import Card from '../../card/card';
import Skill from '../../skill/skill';
import Flow from '../../flow/flow';
import Hero from '../../hero/hero';
import * as schema from '../../schema';
import CastFlow from '../../flow/castFlow';


export default class yaoshouzhi extends Skill {
  constructor() {
    super();
    this.nature = schema.ESkillNature.none;
    this.useType = schema.ECastFlowStep.notifyCast;
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