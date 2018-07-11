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
import { ECastType, ECastSubtype, EFlowType, ECastFlowStep, } from '../schema';

// 效果流

export default class CastFlow extends Flow {
  // 目标
  target: Card | Hero;

  // 效果类型
  castType: ECastType;

  // 效果详细类型
  castSubtype: ECastSubtype;



  constructor(target: Card | Hero, castType: ECastType, castSubtype: ECastSubtype) {
    super();
    this.type = EFlowType.Cast;
    this.stepQueue = [
      ECastFlowStep.beforeCast,
      ECastFlowStep.beforeBeCast,
      ECastFlowStep.cast,
      ECastFlowStep.afterBeCast,
      ECastFlowStep.afterCast,
    ];


    this.target = target;
    this.castType = castType;
    this.castSubtype = castSubtype;
  }
}




















