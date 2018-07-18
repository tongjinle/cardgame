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
import Army from '../army/army';
import Card from '../card/card';
import Tool from '../tool/tool';
import Hero from '../hero/hero';
import Flow from './flow';
import {
  ECastType, ECastSubtype, EFlowType, ECastFlowStep,
  ICastData,
  ICastDamage,
} from '../schema';

// 效果流

export default class CastFlow extends Flow<{ sender: ICastData, target: ICastData, }> {
  // 目标
  target: Card | Hero;

  // // 效果类型
  // castType: ECastType;

  // // 效果详细类型
  // castSubtype: ECastSubtype;



  constructor(sender: Card | Tool, target: Card | Hero) {
    super();
    this.type = EFlowType.Cast;
    this.stepQueue = [
      ECastFlowStep.beforeCast,
      ECastFlowStep.beforeBeCast,
      ECastFlowStep.cast,
      ECastFlowStep.afterBeCast,
      ECastFlowStep.afterCast,
    ];

    this.sender = sender;
    this.target = target;
    this.initData();
  }


  // 初始化数据
  private initData(): void {
    // 伤害
    this.data = {
      sender: {
        damage: this.genDamageData(),
      },
      target: {
        damage: this.genDamageData(),
      },
    };
  }

  private genDamageData(): ICastDamage {
    return { magic: 0, sacred: 0, special: 0, other: 0, physical: 0, };
  }
}




















