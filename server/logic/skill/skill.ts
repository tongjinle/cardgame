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
import Flow from '../flow/flow';
import Hero from '../hero/hero';
import { ESkillNature, ESkillType, EFlowType, ECastFlowStep, } from '../schema';
import CastFlow from '../flow/castFlow';
import parseFormula from './parser/parseFormula';

export default class Skill {
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

  // 使用方式,其实就是flow的step
  useType: ECastFlowStep;

  // level需求
  levelRequire: number;

  // 公式
  formula: string;

  // 是否可以满足level需求
  public get isLevelRequired(): boolean {
    return this.card && this.card.level >= this.levelRequire;
  }



  constructor() {

  }


  // 索敌,查找目标
  findTarget(stage: Stage): Card[] | Hero {
    let rst: Card[] | Hero;
    return rst;
  }


  // 技能效果
  cast(stage: Stage): CastFlow[] {
    let rst: CastFlow[] = [];
    let card = this.card;
    let formula = this.formula;
    rst.push(...parseFormula(stage, card, undefined, formula));
    // rst.forEach(fl => fl.step = ECastFlowStep.beforeCast);
    return rst;
  }

  // 技能效果,但是不产生新的flow
  dealFlow(flow: CastFlow): void {
    let { stage, sender, target, } = flow;
    let formula = this.formula;
    parseFormula(stage, sender as Card, target, formula);
  }

  toInfo() {
    let info = {
      id: this.id,
      name: this.name,
      level: this.level,
      nature: this.nature,
      useType: this.useType,
      useTypeStr: ECastFlowStep[this.useType],
      levelRequire: this.levelRequire,
      formalua: this.formula,
    };
    return info;
  }

}
