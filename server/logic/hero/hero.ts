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

export default class Hero {
  // id
  id: string;
  // 生命值
  hp: number;
  // 卡牌格子数量
  cardCount: number;
  // 道具格子数量
  toolCount: number;
  constructor() {
    this.id = Math.floor(1e8 * Math.random()).toString();
  }  

  toString(): string {
    let info = {
      id:this.id,
      hp: this.hp,
      cardCount: this.cardCount,
      toolCount: this.toolCount,
    };
    return JSON.stringify(info);
  }

}