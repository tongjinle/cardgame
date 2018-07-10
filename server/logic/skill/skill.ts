export default abstract class Skill {

  constructor() {

  }

  // 是否可以释放
  canCast() {

  }

  // 技能效果
  cast() {

  }

  toString():string{
    let info = {};
    return JSON.stringify(info);
  }

}