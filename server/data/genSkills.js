const pinyin = require('node-pinyin');
const fs = require('fs');
const path = require('path');

const moban = 
`


import Stage from '../stage/stage';
import Card from '../card/card';
import Card from '../skill/skill';
import Flow from '../flow/flow';
import Hero from '../hero/hero';
import { ESkillNature, ESkillType, EFlowType, ECastFlowStep, } from '../schema';
import CastFlow from '../flow/castFlow';
import parseFormula from './parser/parseFormula';

export default class {0} extends Skill {
  constructor() {
    super();
    this.useType = {1};
  }


  // 索敌,查找目标
  findTarget(stage: Stage, flow?: CastFlow): Card[] | Hero {
    let rst: Card[] | Hero;
    // todo
    return rst;
  }


  // 技能效果
  cast(stage: Stage): CastFlow[] {
    let rst: CastFlow[] = [];
    // todo
    return rst;
  }




}

    

`;

genSkill =()=>{
  let filename = __dirname + './json/skill.json';
  let skillData = JSON.parse(fs.readFileSync(filename,'utf-8'));
  skillData.forEach(sk=>{
    let bareFileName = pinyin(sk.name) + sk.skillId;
    let skillFileName = __dirname + '../logic/skill/category/' + bareFileName + '.ts';
    let nature = 'ESkillNature.'+sk.nature;
    let content = moban.replace('{0}',bareFileName).replace('{1}',nature);
    fs.writeFileSync(skillFileName,content,'utf-8');
  });

};

genSkill();
