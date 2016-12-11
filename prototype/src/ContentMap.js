const dy = 7;

export const contentMap = [
  {
    mode: 'baseline',
    text: ' “There are people using books and notebooks for cooking, since fuel is so hard to find. \n \n The sight breaks your heart.” \n  \n -  woman in Aleppo, Syria. ',
    fromPosition: 0,
    timepoint: 2011
  },
  {
    mode: 'baseline',
    text: 'Syria has witnessed the largest wave of displacement in modern times. \n \n  Nearly 5 million refugees have fled the country. \n \n  Roughly 7 million people have been internally displaced.',
    fromPosition: 2*dy,
    timepoint: 2011
  },
  {
    mode: 'outOfSchool',
    text: 'Education has come under repeated fire throughout the conflict. ',
    fromPosition: 3*dy,
    timepoint: 2012
  },
  {
    mode: 'outOfSchool',
    text: 'For the children living in Syria and particularly the Aleppo area, going to school is a coin toss with death.',
    fromPosition: 4*dy,
    timepoint: 2012
  },
  {
    mode: 'outOfSchool',
    text: 'Teachers hold classes in underground caves to shelter students from bombings.',
    fromPosition: 5*dy,
    timepoint: 2013
  }, 
  {
    mode: 'outOfSchool',
    text: 'The children who live in host countries as refugees are often not allowed to enroll in local schools.',
    fromPosition: 6*dy,
    timepoint: 2013
  },
  {
    mode: 'outOfSchool',
    text: 'or they have to work in order to support their families. \n \n  If they are in their early teens, chances are that they won’t go back to school again.',
    fromPosition: 7*dy,
    timepoint: 2014
  },
  {
    mode: 'outOfSchool',
    text: 'Schools which accept refugees can be too far from the refugee camps.',
    fromPosition: 8*dy,
    timepoint: 2014
  },
  {
    mode: 'outOfSchool',
    text: 'or the teaching materials are in a different language.',
    fromPosition: 9*dy,
    timepoint: 2015
  },
  {
    mode: 'outOfSchool',
    text: 'An estimated one million of school aged refugees are not attending school.',
    fromPosition: 10*dy,
    timepoint: 2015
  },
  {
    mode: 'outOfSchool',
    text: 'That number rises to 2.1 million children inside Syria.',
    fromPosition: 11*dy,
    timepoint: 2016
  },
  {
    mode: 'outOfSchool',
    text: 'While you were reading this, one school-aged Syrian child had to give up on school.',
    fromPosition: 12*dy,
    timepoint: 2016
  },
  {
    mode: 'outOfSchool',
    text: '(question/ effect)',
    fromPosition: 13*dy,
    timepoint: 2016
  },
  {
    mode: 'backToSchool',
    text: 'Click to read some of their stories',
    fromPosition: 14*dy,
    timepoint: 2016
  }
];

export const findModeAtPosition = (cMap, position) => {
  for (let i = cMap.length - 1; i >= 0; i--) {
    if (position >= cMap[i].fromPosition) {
      return cMap[i].mode;
    }
  }
  return cMap[0].mode;
};

export const findContentForMode = (cMap, percent) => {
  for (let i = cMap.length - 1; i >= 0; i--) {
    if (percent >= cMap[i].fromPosition) {
      return cMap[i].text;
    }
  }
  return cMap[0].text;
};

export const findTimepointForMode = (cMap, percent) => {
  for (let i = cMap.length - 1; i >= 0; i--) {
    if (percent >= cMap[i].fromPosition) {
      return cMap[i].timepoint;
    }
  }
  return cMap[0].timepoint;
};

export const findRatioFromPctScroll = (percent) => {
  return Math.min(percent/100, 1);
};

