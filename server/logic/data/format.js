/*
  csv文件转换到json文件
*/

const fs = require('fs');
const path = require('path');



let format = {


};

// skill
format.skill = () => {
  let csvFilename = `${__dirname}/csv/PokemonSkill.csv`;
  let jsonFilename = `${__dirname}/json/skill.json`;
  let content = fs.readFileSync(csvFilename, 'utf-8');

  let lineList = content.replace(/\r/g, '').split('\n');
  let formatCont = lineList
    .filter((line, index) => {
      // 开头2行不要
      if ([0, 1].indexOf(index) >= 0) {
        return false;
      }
      if (line.replace(/^\s|\s$/g, '') === '') {
        return false;
      }
      return true;
    })
    .map(line => {
      let cellList = line.split(',');
      let propNameList = 'skillId,name,nature,desc,descArgs,formula,useType,funcType,funcDesc'.split(',');
      let rst = {};
      propNameList.forEach((propName, index) => {
        rst[propName] = cellList[index];
      });
      return rst;
    });

  fs.writeFileSync(jsonFilename, JSON.stringify(formatCont, undefined, 4));
};

// buff
format.buff = () => {
  let csvFilename = `${__dirname}/csv/buff.csv`;
  let jsonFilename = `${__dirname}/json/buff.json`;
  let content = fs.readFileSync(csvFilename, 'utf-8');

  let lineList = content.replace(/\r/g, '').split('\n');
  let formatCont = lineList
    .filter((line, index) => {
      // 开头2行不要
      if ([0, 1].indexOf(index) >= 0) {
        return false;
      }
      if (line.replace(/^\s|\s$/g, '') === '') {
        return false;
      }
      return true;
    })
    .map(line => {
      let cellList = line.split(',');
      let propNameList = 'buffId,name,desc,maxLayer,clearLayer,triggerStep,buffType'.split(',');
      let rst = {};
      propNameList.forEach((propName, index) => {
        rst[propName] = cellList[index];
      });
      return rst;
    });

  fs.writeFileSync(jsonFilename, JSON.stringify(formatCont, undefined, 4));
};


format.card = () => {
  let csvFilename = `${__dirname}/csv/Pokemon.csv`;
  let jsonFilename = `${__dirname}/json/card.json`;
  let content = fs.readFileSync(csvFilename, 'utf-8');

  let lineList = content.replace(/\r/g, '').split('\n');
  let formatCont = lineList
    .filter((line, index) => {
      // 开头2行不要
      if ([0, 1].indexOf(index) >= 0) {
        return false;
      }
      if (line.replace(/^\s|\s$/g, '') === '') {
        return false;
      }
      return true;
    })
    .map(line => {
      let cellList = line.split(',');
      let skillLevelList = cellList[16].split('||');
      let skillIdList = cellList[17].split('||');
      let skillList = [13, 14, 15].map((n, index) => {
        return {
          id: skillIdList[index],
          name: cellList[n],
          level: skillLevelList[index],
        };
      });


      let rst = {
        cardId: cellList[0],
        nameList: cellList[1].split('||'),
        quality: cellList[2],
        nature: cellList[3],
        racePointList: cellList[4].split('||'),
        waitRound: cellList[5],
        power: cellList[6],
        hp: cellList[7],
        powerGrow: cellList[8],
        hpGrow: cellList[9],
        skillList,

      };


      return rst;
    });

  fs.writeFileSync(jsonFilename, JSON.stringify(formatCont, undefined, 4));
};

console.time('format elapsed ...');
for (let key in format) {
  let fn = format[key];
  fn();
}
console.timeEnd('format elapsed ...');





