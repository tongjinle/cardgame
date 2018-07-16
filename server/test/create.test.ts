import assert = require("assert");
import Stage from '../logic/stage/stage';
import StageUtil from '../logic/stage/stageUtil';
import Army from '../logic/army/army';
import Card from '../logic/card/card';
import Hero from '../logic/hero/hero';
import { EArmyColor, } from '../logic/schema';


describe('从数据文件中创建卡牌,技能,buff', () => {
  let util = StageUtil.getIns();
  it('通过id来创建技能', () => {
  
  /*
      {
        "skillId": "10102",
        "name": "火焰推进",
        "nature": "fire",
        "desc": "对敌方2张卡牌造成{0}点魔法伤害，并有40%概率进入烧伤状态",
        "descArgs": "Num_int:30",
        "formula": "Lo_op_rd@2#Ef_mag@Num_int:30#Con_per@40?Ef_buf@101@1",
        "useType": "Use_act",
        "funcType": "Fun_mag",
        "funcDesc": ""
      }

  */

    let sk = util.createSkill('10102', 5, 10);
    assert(sk.name === '火焰推进');
  });



  it('通过id来创建卡牌',()=>{
    // 小火龙
    // {"cardId": "100002", "nameList": ["小火龙", "火恐龙", "喷火龙"], "quality": "Epic", "nature": "fire", "racePointList": [309, 405, 534 ], "waitRound": 2, "power": 250, "hp": 750, "powerGrow": 23, "hpGrow": 40, "skillList": [{"id": "10103", "name": "喷射火焰", "level": 4 }, {"id": "14004", "name": "影分身", "level": 6 }, {"id": "10601", "name": "龙息", "level": 8 } ] },
    let ca = util.createCard('100002', 6);
    assert(ca.waitRound === 2);
    assert(ca.racePoint === 405);
    assert(ca.hp === 750 + 6 * 40);
    assert(ca.power === 250 + 6 * 23);
    assert.deepEqual(ca.skillList.map(sk => sk.skillId), ['10103', '14004', '10601']);
  });  


  it('通过id来创建buff', () => {
    let bu = util.createBuff('101',3);
    assert(bu.name === '烧伤');
    assert(bu.maxLayer === 1);
    // 因为最多是1层,所以设置了3层也没有用
    assert(bu.layer === 1);  

    bu.clear();
    assert(bu.layer === 0);

   });
});