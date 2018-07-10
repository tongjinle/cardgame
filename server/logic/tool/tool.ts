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
import Skill from '../skill/skill';

// 道具
export default abstract class Tool {
  // 等级
  level: number;
  // 星
  star: number;
  // 技能
  skill: Skill;
  // 技能次数
  skillCount: number;



  toInfo(): string {
    let info = {
      level: this.level,
      star: this.star,
      skill: this.skill.toString(),
      skillCount: this.skillCount,

    };
    return JSON.stringify(info);
  }

}