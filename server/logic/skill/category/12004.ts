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

// 芳香治疗
// 使我方剩余血量最低的2张卡牌回复{0}点血量
// Lo_pro_mn@Ttm_sf@Pro_hp_cur@2#Ef_hea@Num_int:25

import Stage from '../../stage/stage';
import Card from '../../card/card';
import Skill from '../../skill/skill';
import Flow from '../../flow/flow';
import Hero from '../../hero/hero';
import * as schema from '../../schema';
import CastFlow from '../../flow/castFlow';


export default class fangxiangzhiliao extends Skill {
  constructor() {
    super();
    this.nature = schema.ESkillNature.none;
    this.useType = schema.ECastFlowStep.notifyCast;
  }



  // 索敌,查找目标
  findTarget(): Card[] | Hero {
    let rst: Card[] | Hero;
    rst = this.findTargetFromSelfByProp(this.stage, 2, 'hp', 1);
    return rst;
  }


  // 技能效果
  cast(flow?: CastFlow): CastFlow[] {
    let rst: CastFlow[] = [];
    let taList = this.findTarget() as Card[];

    let amount = this.level * 25;
    taList.forEach(ta => {
      let fl = new CastFlow(this.card, ta);
      fl.addData({ role: 'target', data: { heal: amount, } });
      rst.push(fl);
    });

    return rst;
  }





}