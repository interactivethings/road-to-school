const dy = 7;

export const contentMap = [
  {
    mode: 'baseline',
    text: 'intro image and text',
    fromPosition: 0,
    timepoint: 2009
  },
  {
    mode: 'baseline',
    text: 'Syria has witnessed the largest wave of displacement in modern times. Nearly 5 million refugees have fled the country, and roughly 7 million people have been internally displaced.',
    fromPosition: 4,
    timepoint: 2010
  },
  {
    mode: 'baseline',
    text: 'Education has come under repeated fire throughout the conflict. ',
    fromPosition: 4+dy,
    timepoint: 2010
  },
  {
    mode: 'outOfSchool',
    text: 'For the children still living in Syria, getting to school is life threatening.',
    fromPosition: 4+2*dy,
    timepoint: 2011
  },
  {
    mode: 'outOfSchool',
    text: 'Some teachers have created undeground schools to shelter students from bombings.',
    fromPosition: 4+3*dy,
    timepoint: 2012
  }, 
  {
    mode: 'outOfSchool',
    text: 'Children who fled and live in host countries are often not allowed to enroll in local schools.',
    fromPosition: 4+4*dy,
    timepoint: 2013
  },
  {
    mode: 'outOfSchool',
    text: 'These children have to work in order to support their families. If they are in their early teens, chances are that they won’t go back to school again.',
    fromPosition: 4+5*dy,
    timepoint: 2014
  },
  {
    mode: 'outOfSchool',
    text: 'Often schools which accept refugees are too far from the refugee camps.',
    fromPosition: 4+6*dy,
    timepoint: 2014
  },
  {
    mode: 'outOfSchool',
    text: 'Or they don’t have classes for all age groups.',
    fromPosition: 4+7*dy,
    timepoint: 2015
  },
  {
    mode: 'outOfSchool',
    text: 'An estimated one million of school aged refugees are not attending school outside of Syria.',
    fromPosition: 4+8*dy,
    timepoint: 2015
  },
  {
    mode: 'outOfSchool',
    text: 'That number rises to 2.1 million children inside the country.',
    fromPosition: 4+9*dy,
    timepoint: 2016
  },
  {
    mode: 'outOfSchool',
    text: 'As you were reading this, [some number] children won’t be able to go to school tomorrow.',
    fromPosition: 4+10*dy,
    timepoint: 2016
  },
  {
    mode: 'outOfSchool',
    text: 'What if they did?',
    fromPosition: 4+11*dy,
    timepoint: 2016
  },
  {
    mode: 'backToSchool',
    text: 'Click to read some of their stories',
    fromPosition: 4+12*dy,
    timepoint: 2016
  },
  {
    mode: 'backToSchool',
    text: '(quotes show here)',
    fromPosition: 4+13*dy,
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

