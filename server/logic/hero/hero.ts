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

export default class Hero {
  // id
  id: string;
  // 生命值(当前生命值)
  private _hp: number;
  public get hp(): number {
    return this._hp;
  }
  public set hp(v: number) {
    this._hp = Math.max(0, v);
    if (this.hp === 0) {
      this.die();
    }
  }
  // 卡牌格子数量
  cardCount: number;
  // 道具格子数量
  toolCount: number;
  // 所属军队
  army: Army;
  // 所属场景
  public get stage(): Stage {
    return this.army ? this.army.stage : undefined;
  }



  constructor() {
    this.id = Math.floor(1e8 * Math.random()).toString();
  }

  die(): void {
    this.stage.judge();
  }

  toInfo() {
    let info = {
      id: this.id,
      hp: this.hp,
      cardCount: this.cardCount,
      toolCount: this.toolCount,
    };
    return info
  }

}