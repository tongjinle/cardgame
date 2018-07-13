// /*
//     *********************************************  
//                        _ooOoo_  
//                       o8888888o  
//                       88" . "88  
//                       (| -_- |)  
//                       O\  =  /O  
//                    ____/`---'\____  
//                  .'  \|     |//  `.  
//                 /  \|||  :  |||//  \  
//                /  _||||| -:- |||||-  \  
//                |   | \\  -  /// |   |  
//                | \_|  ''\---/''  |   |  
//                \  .-\__  `-`  ___/-. /  
//              ___`. .'  /--.--\  `. . __  
//           ."" '<  `.___\_<|>_/___.'  >'"".  
//          | | :  `- \`.;`\ _ /`;.`/ - ` : | |  
//          \  \ `-.   \_ __\ /__ _/   .-` /  /  
//     ======`-.____`-.___\_____/___.-`____.-'======  
//                        `=---='  
//     ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^  
//                佛祖保佑       永无BUG  
// */

// import Stage from '../../stage/stage';
// import Card from '../../card/card';
// import Hero from '../../hero/hero';
// import Tool from '../../tool/tool';
// import CastFlow from '../../flow/castFlow';


// // 别名
// enum EAlias {
//   // 卡牌当前血量
//   Pro_hp_cur,
//   // 最大基础血量
//   Pro_hp_max,
//   // 当前攻击力
//   Pro_atk_cur,
//   // 最大基础攻击力
//   Pro_atk_max,
//   // 英雄当前血量
//   Pro_hero_cur,

//   // 总伤害值
//   Ht_all,
//   // 物理伤害值
//   Ht_phy,
//   // 魔法伤害值
//   Ht_mag,
//   // 特殊伤害值
//   Ht_spe,
//   // 绝对伤害值
//   Ht_abs,
//   // 英雄伤害值
//   Ht_hero,
// }



// // 处理别名
// export default function parseAlias(flow: CastFlow, aliasStr: string): number {
//   let rst: number = 0;

//   // 如果是数字,可以直接使用 
//   if (/\d+/.test(aliasStr)) {
//     rst = parseInt(aliasStr);
//   }
//   // 如果不是数字(即字符串),则需要在flow中找到相应的解释
//   else {
//     let type: EAlias = EAlias[aliasStr];
//     if (EAlias.Pro_hp_cur === type) {
//       rst = (flow.sender as Card).hp;
//     }else if(EAlias.Pro_hp_max === type){
//       rst = (flow.sender as Card).maxHp;
//     }else if(EAlias.Pro_atk_cur === type){
//       rst = (flow.sender as Card).power;
//     }else if(EAlias.Pro_atk_max === type){
//       rst = (flow.sender as Card).maxPower;
//     }else if(EAlias.Pro_hero_cur === type){
//       rst = (flow.sender as Hero).hp;
//     }
//   }
//   return rst;
// }










