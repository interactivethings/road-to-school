export const contentMap = [
  {
    mode: 'baseline',
    text: 'During the past five years, Syria has witnessed the largest wave of displacement in modern times. Nearly 5 million refugees have registered abroad, roughly 7 million people have been internally displaced, at least 400,000 have been killed, and more than 117,000 Syrians have been arrested.',
    fromPosition: 0
  },
  {
    mode: 'disrupt',
    text: 'Throughout the war in Syria, education has come under repeated fire from both rebel forces and government forces. Schools are often targeted (supposedly by mistake) by Assad-backed airplanes, while they are turned into shelters for internally displaced people.',
    fromPosition: 30
  },
  {
    mode: 'test',
    text: 'They have no time for school because they have to work in order to support their families. If they are in their early teens, chances are that they won’t go back to school, even if they have the chance.',
    fromPosition: 60
  }
];

export const findModeAtPosition = (function() {
  return (cMap, position) => {
    for (let i = cMap.length - 1; i >= 0; i--) {
      if (position >= cMap[i].fromPosition) {
        return cMap[i].mode;
      }
    }
    return cMap[0].mode;
  }
}());

export const findContentForMode = (function() {
  const cmLookup = contentMap.reduce((m, d) => {
    m[d.mode] = d;
    return m;
  }, {});

  return (cMap, mode) => {
    // We assume there's at least 1 element in content Map for the fallback
    const fallbackText = cMap[0].text;
    const contentItem = cmL[mode];
    return contentItem ? contentItem.text : fallbackText;
  }
}());
