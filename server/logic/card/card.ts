import { ENature, ECardStatus, EBuff, } from '../schema';
import Buff from '../buff/buff';
import Skill from '../skill/skill';
import Hero from '../hero/hero';
import Stage from '../stage/stage';
import Army from '../army/army';

export default class Card {
  // id
  id: string;
  // cardId(用于数据文件中查找)
  cardId: string;
  // 名称
  public get name(): string {
    return this.nameList[this.wakeLevel];
  }
  // 名称列表
  nameList: string[];
  // 星
  star: number;
  // 上场前的等待回合
  waitRound: number;
  // 位置
  position: number;
  // 种族值
  public get racePoint():number{
    return this.racePointList[this.wakeLevel];
  }
  // 种族值序列表
  racePointList: number[];


  // 0级攻击力
  zeroPower: number;
  // 攻击力(当前攻击力)
  public get power(): number {
    let po = this.zeroPower + this.powerGrow * this.level;

    // 再处理buff
    let bu = this.buffList.forEach(bu => {
      if (EBuff.powerAdd === bu.type) {
        po += bu.data;
      }
      if (EBuff.powerMul === bu.type) {
        po *= Math.floor(bu.data / 100);
      }
    });

    // 攻击力不可能小于0
    po = Math.max(0, po);

    return po;
  }
  // 最大基础攻击力
  maxPower: number;
  // 攻击力成长
  powerGrow: number;


  // 0级生命值
  zeroHp: number;
  // 生命值(当前生命值)
  hp: number;
  // 最大生命值
  public get maxHp(): number {
    return this.zeroHp + this.hpGrow * this.level;
  }
  // 生命成长
  hpGrow: number;


  // 等级
  level: number;
  // 觉醒等级(跟名字,技能相关)
  private get wakeLevel(): number {
    let rst: number = 0;
    [0, 5, 10].some((n, index) => {
      if (this.level >= n) {
        rst = index;
      }
      else {
        return true;
      }
    });
    return rst;
  }
  // 属性
  nature: ENature;
  // 技能列表
  skillList: Skill[];
  // buff列表
  buffList: Buff[];
  // 卡牌状态
  status: ECardStatus;
  // 所属的army
  army: Army;
  constructor() {
    this.status = ECardStatus.normal;
    this.nameList = [];
    this.skillList = [];
    this.buffList = [];
    this.racePointList = [];
    this.position = -1;
  }

  setLevel(level: number): void {
    this.level = level;

    // 生命值和攻击力的计算
    this.hp = this.maxHp;
  }

  // 增加buff
  addBuff(buff: Buff) {
    this.buffList.push(buff);
    buff.card = this;
  }

  // 消除buff
  removeBuff(buff: Buff) {
    this.buffList = this.buffList.filter(bu => bu != buff);
    buff.card = undefined;
  }

  // 增加技能
  addSkill(skill: Skill): void {
    this.skillList.push(skill);
    skill.card = this;
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
      name: this.name,
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