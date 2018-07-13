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
import Hero from '../../hero/hero';
import CastFlow from '../../flow/castFlow';
import parseCondition from './parseCondition';
import parseEffect from './parseEffect';
import parseFindTarget from './parseFindTarget';

// 解析公式
export default function parseFormula(stage: Stage, sender: Card, formula: string): CastFlow[] {
  let rst: CastFlow[] = [];

  formula.split('^').forEach(single => {
    rst.push(...parseSingleFormula(stage, sender, single));
  });

  return rst;
}


function parseSingleFormula(stage: Stage, sender: Card, formula: string): CastFlow[] {
  let rst: CastFlow[] = [];

  while (1) {
    let actionStr: string = parseCondition(stage, sender, undefined, formula);
    if (formula === actionStr) {
      break;
    }
    formula = actionStr;
  }
  let [findTargetStr, ...effectStrList] = formula.split('#');

  let targetList: (Card | Hero)[] = parseFindTarget(stage, sender, findTargetStr);

  targetList.forEach(ta => {
    effectStrList.forEach(ef => {
      rst.push(parseEffect(stage, sender, ta, ef));
    });
  });

  return rst;
}








