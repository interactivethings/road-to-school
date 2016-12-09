export const contentMap = [
  {
    mode: 'baseline',
    text: 'Intro photo here',
    fromPosition: 0,
    timepoint: 2012
  },
  {
    mode: 'baseline',
    text: 'Syria has witnessed the largest wave of displacement in modern times. Nearly 5 million refugees have registered abroad, roughly 7 million people have been internally displaced, at least half a million have been killed.',
    fromPosition: 5,
    timepoint: 2012
  },
  {
    mode: 'baseline',
    text: 'Before the war, 94% of Syrian children attended primary and lower secondary education',
    fromPosition: 10,
    timepoint: 2012
  },
  {
    mode: 'outOfSchool',
    text: 'Throughout the war in Syria, education has come under repeated fire. Schools are often targeted or they are turned into shelters for internally displaced people.',
    fromPosition: 15,
    timepoint: 2013
  },
  {
    mode: 'outOfSchool',
    text: 'For the children still living in Syria, getting to school is life threatening. Some teachers have created undeground schools to escape bombings.',
    fromPosition: 20,
    timepoint: 2013
  }, 
  {
    mode: 'outOfSchool',
    text: 'Refugee children who have fled and live in host countries face are often not allowed to enroll in school.',
    fromPosition: 25,
    timepoint: 2014
  },
  {
    mode: 'outOfSchool',
    text: 'They have no time for school because they have to work in order to support their families. If they are in their early teens, chances are that they won’t go back to school, even if they have the chance.',
    fromPosition: 30,
    timepoint: 2014
  },
  {
    mode: 'outOfSchool',
    text: 'Often schools which accept refugees are too far from the camps.',
    fromPosition: 35,
    timepoint: 2015
  },
  {
    mode: 'outOfSchool',
    text: 'Or they don’t have classes for all age group (there needs to be more than a certain number of students to organize a class).',
    fromPosition: 40,
    timepoint: 2015
  },
  {
    mode: 'outOfSchool',
    text: 'June 2016 only 60% of children were in school in Syria, leaving 2.1 million children and adolescents without access to education in the country.',
    fromPosition: 45,
    timepoint: 2016
  },
  {
    mode: 'outOfSchool',
    text: 'In neighbouring countries, over 4.8 million Syrian refugees are registered with UNHCR, amongst them around 35 per cent are of school-age. In Turkey, only 39 per cent of school-age refugee children and adolescents were enrolled in primary and secondary education, 40 per cent in Lebanon, and 70 per cent in Jordan. In total, 900’000 school aged refugees are not attending school outside of Syria.',
    fromPosition: 50,
    timepoint: 2016
  },
  {
    mode: 'outOfSchool',
    text: 'As you were reading this, four children won’t be able to go to school tomorrow',
    fromPosition: 60,
    timepoint: 2016
  },
  {
    mode: 'backToSchool',
    text: 'What if they did?',
    fromPosition: 70,
    timepoint: 2016
  },
  {
    mode: 'backToSchool',
    text: 'Quotes and hoverable state are here',
    fromPosition: 80,
    timepoint: 2016
  },
  {
    mode: 'backToSchool',
    text: 'show credits',
    fromPosition: 90,
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

