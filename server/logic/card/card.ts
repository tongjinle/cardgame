import { ENature, ECardStatus, } from '../schema';
import Skill from '../skill/skill';
import Hero from '../hero/hero';
import Stage from '../stage/stage';

export default abstract class Card {
  // id
  id: string;
  // 星
  star: number;
  // 上场前的等待回合
  waitRound: number;
  // 位置
  position: number;
  // 攻击力
  power: number;
  // 生命值
  hp: number;
  // 等级
  level: number;
  // 属性
  nature: ENature;
  // 技能列表
  skillList: Skill[];
  // 卡牌状态
  status: ECardStatus;
  constructor() {
    this.id = Math.floor(1e8 * Math.random()).toString();
    this.status = ECardStatus.normal;
    this.skillList = [];
    this.position = -1;
  }


  // 使用技能攻击(尝试)
  cast(skill: Skill): void {

  }

  // 普通攻击(攻击卡牌)
  attack(target: Card | Hero): void {
    let damage: number = this.power;
    target.hp = Math.min(0, target.hp - damage);
  }

  // 寻找卡牌的攻击对象
  findTargetForCard(stage: Stage): Card | Hero {
    let color = stage.activeArmy.color;
    let enemy = stage.armyList.find(ar => ar.color !== color);
    // 优先寻找卡牌攻击对象
    let enemyCard = enemy.cardList.find(ca => ca.position === this.position);
    if (enemyCard) {
      return enemyCard;
    }
    // 其次寻找hero对象
    return enemy.hero;
  }

  toString(): string {
    let info = {
      id: this.id,
      star: this.star,
      waitRound: this.waitRound,
      position: this.position,
      power: this.power,
      hp: this.hp,
      level: this.level,
      nature: this.nature,
      skillList: this.skillList.map(n => n.toString()),
      status: this.status,
    };
    return JSON.stringify(info);
  }

}