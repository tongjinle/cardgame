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

// 属性枚举
export enum ENature {
  grass,
  fire,
  water,
  bug,
  flying,
  normal,
  poison,
  electric,
  ground,
  fairy,
  fighting,
  rock,
  ghost,
  ice,
  psychic,
  dark,
  steel,
};


// 卡牌状态
export enum ECardStatus {
  // 冰冻
  frozen,
  // 麻痹
  stun,
  // 中毒
  poison,
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
export enum ECombatStatus {
  // 战斗准备
  pending,
  // 战斗中
  combat,
  // 战斗借宿
  end,
}

// 战斗记录类型
export enum ERecord {
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
  // 战斗结束
  end,
}

// 获胜方式
export enum EDefeat {
  // 击溃对方英雄
  hero,
  // 击溃对方所有卡牌
  card,
}

// 技能流各个阶段
export enum ECastFlowStep {
  // 通知技能的发动
  notifyCast,
  // 使用技能前
  beforeCast,
  // 被使用技能前
  beforeBeCast,
  // 使用技能中
  cast,
  // 被使用技能后
  afterBeCast,
  // 使用技能后
  afterCast,
  // 死亡
  die,
  // 进入stage,登场
  enterStage,
  // 普通攻击
  attack,
}

// 效果类型
export enum ECastType {
  // 攻击
  attack,
  // 治疗
  heal,
}

// 效果细分类型(更加详细的解释效果类型)
export enum ECastSubtype {
  // 法术伤害
  magic,
  // 神圣伤害
  sacred,
  // 特殊伤害
  special,
  // 其他伤害(例如"毒")
  other,

  // 治疗现在只有一种,所以略
}



export enum EFlowType {
  // 效果流
  Cast,
  // 卡牌死亡流
  // 卡牌登场流
}


// 技能属性
export enum ESkillNature {
  water,
  fire,
  grass,
  elec,
  ice,
  normal,
  dragon,
  psychic,
  rock,
  flying,
  fighting,
  poison,
  ghost,
  diss,
  assist,
  none,
  dark,
}


// 技能使用类型
export enum ESkillType {
  // 主动
  active,
  // 被动
  unactive,
}


export interface ICastDamage{
  // 法术伤害
  magic,
  // 物理伤害
  physical,
  // 神圣伤害
  sacred,
  // 特殊伤害
  special,
  // 其他伤害(例如"毒")
  other,
}

export interface ICastData {
  damage:ICastDamage,
}


























































