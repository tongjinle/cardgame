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

// 卡牌属性枚举
export enum ENature {

};

// 卡牌状态
export enum ECardStatus{
  // 冰冻
  frozen,
  // 麻痹
  stun,
  // 中毒
  posion,
  // 正常
  normal,
}


// 军队颜色
export enum EArmyColor {
  // 蓝色表示ai
  blue,
  black,
  red,
}


// 游戏战斗状态
export enum ECombatStatus{
  // 战斗准备
  pending,
  // 战斗中
  combat,
  // 战斗借宿
  end,
}