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
import { ECastType, ECastSubtype, EFlowType, } from '../schema';

// 效果流
export default abstract class Flow<T = any> {
  // 效果流类型
  type: EFlowType;
  // 当前阶段
  step: any;
  // 数据
  data: T;
  // 来源
  sender: Card | Tool;

  // 阶段队列  
  stepQueue: any[];

  // 是否处理完毕
  isDone: boolean;

  // 处理记录
  dealList: any[];

  constructor() {
    this.isDone = false;
    this.dealList = [];
  }

  // 处理
  deal(stage: Stage): void {
    this.stepQueue.some(st => {
      this.step = st;
      stage.dealFlow(this);
      return this.isDone;
    });

    this.isDone = true;
  }
}