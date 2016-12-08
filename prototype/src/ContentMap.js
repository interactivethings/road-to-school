
var contentMap = [
  {
    mode: 'baseline',
    text: 'During the past five years, Syria has witnessed the largest wave of displacement in modern times. Nearly 5 million refugees have registered abroad, roughly 7 million people have been internally displaced, at least 400,000 have been killed, and more than 117,000 Syrians have been arrested.',
    changeAt: 30
  },
  {
    mode: 'disrupt',
    text: 'Throughout the war in Syria, education has come under repeated fire from both rebel forces and government forces. Schools are often targeted (supposedly by mistake) by Assad-backed airplanes, while they are turned into shelters for internally displaced people.',
    changeAt: 60
  },
  {
    mode: 'test',
    text: 'They have no time for school because they have to work in order to support their families. If they are in their early teens, chances are that they won’t go back to school, even if they have the chance.',
    changeAt: 100
  }
]


// key -> {}
const find = (function() {
  const cmL = makeLookup 
  /*
  contenMapLookup = {
  baseline: ...,
  disrupt: ...
}
*/
  return function(contentMap, key) {
    return cmL[key] || contentMap[0];
  }
}());

// findMode :: ContentMap -> Number -> String
// findContent :: ContentMap -> String -> String

export default contentMap;