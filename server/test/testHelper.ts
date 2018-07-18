import assert = require("assert");
import Stage from '../logic/stage/stage';
import StageUtil from '../logic/stage/stageUtil';
import Army from '../logic/army/army';
import Card from '../logic/card/card';
import Hero from '../logic/hero/hero';
import { EArmyColor, } from '../logic/schema';
import fs from 'fs';



export function loadCardInfo(army: Army, ...cardInfoList: { cardId: string, level?: number }[]) {
  cardInfoList.forEach(info => {
    info.level = info.level || 0;
    let ca = StageUtil.getIns().createCard(info.cardId, info.level);
    army.cardListForDraw.push(ca);
  });
}


