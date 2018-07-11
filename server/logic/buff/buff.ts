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
import Army from '../army/army';
import Card from '../card/card';
import Hero from '../hero/hero';
import Stage from '../stage/stage';
import Flow from '../flow/flow';

export default class Buff {
  // id
  id: string;
  // 所属的card
  card: Card;
  // 回合
  round: number;


  // 触发器
  trigger(stage: Stage, flow: Flow): boolean {
    let rst: boolean = false;
    return rst;
  }

  // 效果
  deal(stage: Stage, flow: Flow): void { }
}