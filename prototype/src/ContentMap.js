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
    fromPosition: 4,
    timepoint: 2011
  },
  {
    mode: 'outOfSchool',
    text: 'Education has come under repeated fire throughout the conflict. ',
    fromPosition: 4+dy,
    timepoint: 2012
  },
  {
    mode: 'outOfSchool',
    text: 'For the children living in Syria and particularly the Aleppo area, going to school is a coin toss with death.',
    fromPosition: 4+2*dy,
    timepoint: 2012
  },
  {
    mode: 'outOfSchool',
    text: 'Teachers hold classes in underground caves to shelter students from bombings.',
    fromPosition: 4+3*dy,
    timepoint: 2013
  }, 
  {
    mode: 'outOfSchool',
    text: 'The children who live in host countries as refugees are often not allowed to enroll in local schools.',
    fromPosition: 4+4*dy,
    timepoint: 2013
  },
  {
    mode: 'outOfSchool',
    text: 'or they have to work in order to support their families. \n \n  If they are in their early teens, chances are that they won’t go back to school again.',
    fromPosition: 4+5*dy,
    timepoint: 2014
  },
  {
    mode: 'outOfSchool',
    text: 'Schools which accept refugees can be too far from the refugee camps.',
    fromPosition: 4+6*dy,
    timepoint: 2014
  },
  {
    mode: 'outOfSchool',
    text: 'or the teaching materials are in a different language.',
    fromPosition: 4+7*dy,
    timepoint: 2015
  },
  {
    mode: 'outOfSchool',
    text: 'An estimated one million of school aged refugees are not attending school.',
    fromPosition: 4+8*dy,
    timepoint: 2015
  },
  {
    mode: 'outOfSchool',
    text: 'That number rises to 2.1 million children inside Syria.',
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
    // text: 'Donate\n\n https://donate.unhcr.org/int-en/syria-chf/ \n http://arsis.gr/en/http://data.unhcr.org/mediterranean/country.php?id=83 \n http://childrenofsyria.info/ \n \n Journaling sources \n \n http://childrenofsyria.info/ \n http://data.unhcr.org/mediterranean/country.php?id=83 \n http://data.unhcr.org/syrianrefugees/country.php?id=8 \n http://www.aljazeera.com/news/2016/10/easy-answers-syrian-students-lebanon-161006075947100.html \n https://www.hrw.org/news/2016/09/15/refugee-education-crisis-requires-global-employment-strategy \n https://www.hrw.org/news/2015/11/08/turkey-400000-syrian-children-not-school',
    text: 'credits',
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

