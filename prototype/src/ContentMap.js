
export const contentMap = [
  {
    mode: 'intro',
    text: ' “There are people using books and notebooks for cooking, since fuel is so hard to find. \n \n The sight breaks your heart.” \n  \n -  woman in Aleppo, Syria. ',
    fromPosition: 0,
    timepoint: 2011,
    styleAsQuote: true
  },
  {
    mode: 'intro',
    text: 'Syria has witnessed the largest wave of displacement in modern times. Nearly 5 million refugees have fled the country. Roughly 7 million people have been internally displaced.',
    fromPosition: 9,
    timepoint: 2011
  },
  {
    mode: 'outOfSchool',
    text: 'Education has come under repeated fire throughout the conflict. ',
    fromPosition: 15,
    timepoint: 2012
  },
  {
    mode: 'outOfSchool',
    text: 'For the children living in Syria and particularly the Aleppo area, going to school is a coin toss with death.',
    fromPosition: 21,
    timepoint: 2012
  },
  {
    mode: 'outOfSchool',
    text: 'Teachers hold classes in underground caves to shelter students from bombings.',
    fromPosition: 28,
    timepoint: 2013
  }, 
  {
    mode: 'outOfSchool',
    text: 'The children who live in host countries as refugees are often not allowed to enroll in local schools. \n',
    fromPosition: 34,
    timepoint: 2013
  },
  {
    mode: 'outOfSchool',
    text: 'or they have to work in order to support their families. If they are in their early teens, chances are that they won’t go back to school again.',
    fromPosition: 41,
    timepoint: 2014
  },
  {
    mode: 'outOfSchool',
    text: 'Schools which accept refugees can be too far from the refugee camps.',
    fromPosition: 47,
    timepoint: 2014
  },
  {
    mode: 'outOfSchool',
    text: 'or the teaching materials are in a different language.',
    fromPosition: 53,
    timepoint: 2015
  },
  {
    mode: 'outOfSchool',
    text: 'An estimated one million of school aged refugees are not attending school.',
    fromPosition: 59,
    timepoint: 2015
  },
  {
    mode: 'outOfSchool',
    text: 'That number rises to 2.1 million children inside Syria.',
    fromPosition: 66,
    timepoint: 2016
  },
  {
    mode: 'question',
    text: 'While you were reading this, one school-aged Syrian child had to give up on school.',
    fromPosition: 72,
    timepoint: 2016
  },
  {
    mode: 'question',
    text: 'Would you have the same life if you had to stay out of school when you were young?',
    fromPosition: 78,
    timepoint: 2016
  },
  {
    mode: 'quote',
    text: '“I’ve been back at school for two months. On the first day back I felt that my life had become beautiful. I was so happy that I would learn and study and fulfil my dream. I want to become a children’s doctor. \n  \n - Mayass, 9 years old”',
    fromPosition: 84,
    timepoint: 2016,
    styleAsQuote: true
  },
  {
    mode: 'quote',
    text: '“I felt so happy when I heard I was going back to school. I finally had a hope that I could succeed through studying. I want to be an engineer when I grow up so I can help to rebuild Syria. \n  \n - Ahmad, 13 years old”',
    fromPosition: 84,
    timepoint: 2016,
    styleAsQuote: true
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

