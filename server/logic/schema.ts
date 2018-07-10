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

// 战斗记录类型
export enum ERecType{
  // 战斗准备(双方军队,颜色,种子,卡牌库)
  prepare,
  // 战斗开始
  start,
  // 某方行动(回合,军队颜色)
  round,
  // 抽牌(卡牌信息)
  drawCard,
  // 减少等待回合
  reduceWaitRound,
  // 卡牌上场(卡牌信息)
  putCard,
  // 道具攻击
  castTool,
  // 卡牌技能攻击
  castCardSkill,
  // 卡牌普通攻击(目标,伤害)
  cardAttack,
  // 卡牌离场(也就是死亡,卡牌信息)
  clearCard,
  // 卡牌重置位置(旧位置,新位置)
  resetCardPosition,
}



