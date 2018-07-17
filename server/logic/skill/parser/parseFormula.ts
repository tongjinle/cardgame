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


import Stage from '../../stage/stage';
import Card from '../../card/card';
import Tool from '../../tool/tool';
import Hero from '../../hero/hero';
import CastFlow from '../../flow/castFlow';
import parseCondition from './parseCondition';
import parseEffect from './parseEffect';
import parseFindTarget from './parseFindTarget';

// 解析公式
export default function parseFormula(stage: Stage, sender: Card, target: Card | Hero, formula: string, castFlow?: CastFlow): CastFlow[] {
  let rst: CastFlow[] = [];

  formula.split('^').forEach(single => {
    rst.push(...parseSingleFormula(stage, sender, target, single, castFlow));
  });

  return rst;
}


function parseSingleFormula(stage: Stage, sender: Card, target: Card | Hero, formula: string, castFlow: CastFlow): CastFlow[] {
  let rst: CastFlow[] = [];

  while (1) {
    let actionStr: string = parseCondition(stage, sender, target, formula);
    // console.log(formula,actionStr);
    if (formula === actionStr) {
      break;
    }
    formula = actionStr;
  }

  // 条件公式,有可能导致formula为undefind
  if (!formula) {
    // console.log('条件不成立导致公式为空: ', formula);
    return [];
  }

  let [findTargetStr, ...effectStrList] = formula.split('#');

  let targetList: (Card | Hero)[] = parseFindTarget(stage, sender, findTargetStr);

  targetList.forEach(ta => {
    effectStrList.forEach(ef => {
      rst.push(parseEffect(stage, sender, ta, ef, castFlow));
    });
  });

  return rst;
}








