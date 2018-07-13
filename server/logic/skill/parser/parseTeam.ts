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


import Stage from '../../stage/stage';
import Card from '../../card/card';
import Hero from '../../hero/hero';


enum ETeam{
  Ttm_sf,
  Ttm_op,
  Ttm_al,
}

// 解析目标队伍枚举
export default function parseTeam(stage: Stage, sender: Card, teamStr: string): Card[] {
  let rst: Card[] = [];
  let type:ETeam = ETeam[teamStr];
  if(ETeam.Ttm_sf === type){
    rst.push(...sender.army.cardList);
  }else if(ETeam.Ttm_op === type){
    let enemy = stage.armyList.find(ar => ar != sender.army);
    rst.push(...enemy.cardList);
  }else if(ETeam.Ttm_al === type){
    rst.push(...parseTeam(stage, sender, ETeam[ETeam.Ttm_sf]), ...parseTeam(stage, sender, ETeam[ETeam.Ttm_op]), );
  }

  return rst;
}


