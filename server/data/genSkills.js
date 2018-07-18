const pinyin = require('node-pinyin');
const fs = require('fs');
const path = require('path');

const moban = fs.readFileSync(__dirname + '/../logic/skill/category/__moban.ts','utf-8');

genSkill =()=>{
  let filename = __dirname + '/./json/skill.json';
  let skillData = JSON.parse(fs.readFileSync(filename,'utf-8'));
  skillData.forEach(sk=>{
    if(!sk.name) {return;}
    let bareFileName = (pinyin(sk.name,{style:'normal'})+'').split(',').join('') + sk.skillId;
    console.log(bareFileName);
    let skillFileName = __dirname + '/../logic/skill/category/' + bareFileName + '.ts';
    let nature = 'ESkillNature.'+sk.nature;
    let content = moban.replace('{0}',bareFileName)
      .replace('schema.ESkillNature.water','schema.ESkillNature.'+sk.nature)
      .replace('schema.ECastFlowStep.notifyCast','schema.ECastFlowStep.'+sk.useType)
      .replace('{skill-name}',sk.name)
      .replace('{skill-desc}',sk.desc)
      .replace('{skill-formula}',sk.formula)

      ;
    fs.writeFileSync(skillFileName,content,'utf-8');
  });

};

genSkill();
