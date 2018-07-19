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
import Army from '../army/army';
import Card from '../card/card';
import Hero from '../hero/hero';
import Stage from '../stage/stage';
import Flow from '../flow/flow';
import {EBuff, } from '../schema';

export default class Buff {
  // id
  id: string;
  buffId: string;
  // 名称
  name: string;
  // 类型
  type: EBuff;
  // 描述
  desc: string;
  // 当前层数
  layer: number;
  // 最大层数
  maxLayer: number;
  // 每个回合清楚的层数
  clearLayer: number;
  // 是否为永久buff
  isForever: boolean;
  // 所属的card
  card: Card;
  // 额外数据,比如攻击力增加需要记录增加了几点
  data: any;

  // 触发器
  trigger(stage: Stage, flow: Flow): boolean {
    let rst: boolean = false;
    return rst;
  }

  // 效果
  deal(stage: Stage, flow: Flow): void { }


  // 设置层数
  setLayer(layer: number): void {
    layer = this.maxLayer == -1 ? layer : 1;
    this.layer = layer;
  }

  // 清除层数
  reduceLayer(): void {
    if(this.isForever){
      return;
    }

    if (this.clearLayer == -1) {
      this.layer = 0;
    } else {
      this.layer--;
    }

    if (this.layer == 0) {
      if (this.card) {
        this.card.removeBuff(this);
      }
    }
  }

  toInfo(){
    let info = {
      id:this.id,
      buffId:this.buffId,
      name:this.name,
      type:this.type,
      typeStr:EBuff[this.type],
      layer:this.layer,
      data:this.data,
    };
    return info;
  }




}