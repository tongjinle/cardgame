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

import Stage from '../stage/stage';
import Card from '../card/card';
import Hero from '../hero/hero';
import {ESkillNature, ESkillType,} from '../schema';

export default abstract  class Skill  {
  id: number;
  // 技能编号
  skillId: number;
  // 技能拥有者
  card: Card;
  // 名称
  name: string;
  // 属性
  nature: ESkillNature;
  // 描述
  desc: string;
  // 是否是主动技能
  useType: ESkillType;
  // 索敌方式
  


  constructor() {

  }


  // 索敌,查找目标
  findTarget(stage:Stage): Card[] | Hero {
    let rst: Card[] | Hero;
    return rst;
  }


  // 技能效果
  cast() {

  }

  toInfo() {
    let info = {};
    return info;
  }

}
