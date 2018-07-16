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

export default class Skill  {
  id: string;
  // 技能编号
  skillId: string;
  // 技能拥有者
  card: Card;
  // 名称
  name: string;
  // 技能等级
  level: number;
  // 属性
  nature: ESkillNature;
  // 描述
  desc: string;
  // 是否是主动技能
  useType: ESkillType;
  
  // level需求
  levelRequire: number;

  // 公式
  formula: string;

  // 是否可以满足level需求
  public get isLevelRequire() : boolean {
    return this.card && this.card.level >= this.levelRequire;
  }



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
