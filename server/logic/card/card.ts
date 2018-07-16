import { ENature, ECardStatus, } from '../schema';
import Skill from '../skill/skill';
import Hero from '../hero/hero';
import Stage from '../stage/stage';
import Army from '../army/army';

export default class Card {
  // id
  id: string;
  // cardId(用于数据文件中查找)
  cardId: string;
  // 星
  star: number;
  // 上场前的等待回合
  waitRound: number;
  // 位置
  position: number;
  // 种族值
  racePoint: number;
  // 种族值序列表
  racePointList: number[];


  // 0级攻击力
  zeroPower: number;
  // 攻击力(当前攻击力)
  power: number;
  // 最大基础攻击力
  maxPower: number;
  // 攻击力成长
  powerGrow: number;


  // 0级生命值
  zeroHp: number;
  // 生命值(当前生命值)
  hp: number;
  // 最大生命值
  maxHp: number;
  // 生命成长
  hpGrow: number;


  // 等级
  level: number;
  // 属性
  nature: ENature;
  // 技能列表
  skillList: Skill[];
  // 卡牌状态
  status: ECardStatus;
  // 所属的army
  army: Army;
  constructor() {
    this.status = ECardStatus.normal;
    this.skillList = [];
    this.racePoint = 0;
    this.racePointList = [];
    this.position = -1;
  }

  setLevel(level: number): void {
    this.level = level;

    // 生命值和攻击力的计算
    this.hp = this.maxHp = this.zeroHp + this.hpGrow * this.level;
    this.power = this.maxPower = this.zeroPower + this.powerGrow * this.level

    // 种族值
    {
      [0, 5, 10].some((n, index) => {
        if (this.level >= n) { this.racePoint = this.racePointList[index]; }
        else { return true; }
        return false;
      });
    }

    // 等级到了一定阶段 要打开技能

  }

  addSkill(skill: Skill): void {
    this.skillList.push(skill);
  }


  // 使用技能攻击(尝试)
  cast(skill: Skill): void {

  }

  // 普通攻击(攻击卡牌)
  attack(target: Card | Hero): void {
    let damage: number = this.power;
    target.hp = Math.max(0, target.hp - damage);
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

  toInfo() {
    let info = {
      id: this.id,
      star: this.star,
      waitRound: this.waitRound,
      position: this.position,
      power: this.power,
      hp: this.hp,
      level: this.level,
      nature: this.nature,
      skillList: this.skillList.map(n => n.toInfo()),
      status: this.status,
    };
    return info;
  }

}