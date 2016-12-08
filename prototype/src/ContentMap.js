export const contentMap = [
  {
    mode: 'baseline',
    text: 'During the past five years, Syria has witnessed the largest wave of displacement in modern times. Nearly 5 million refugees have registered abroad, roughly 7 million people have been internally displaced, at least 400,000 have been killed, and more than 117,000 Syrians have been arrested.',
    fromPosition: 0
  },
  {
    mode: 'outOfSchool',
    text: 'Syria previously had a well-developed education system. Literacy rates were more than 90 percent for both sexes; enrolment was near 100 percent. 94% of Syrian children attended primary and lower secondary education',
    fromPosition: 10
  },
  {
    mode: 'outOfSchool',
    text: 'Throughout the war in Syria, education has come under repeated fire from both rebel forces and government forces. Schools are often targeted (supposedly by mistake) by Assad-backed airplanes, while they are turned into shelters for internally displaced people.',
    fromPosition: 20
  },
  {
    mode: 'outOfSchool',
    text: 'For the children still living in Syria, getting to school is life threatening. Some teachers have created undeground schools to escape bombings.',
    fromPosition: 30
  }, 
  {
    mode: 'outOfSchool',
    text: 'Refugee children who have fled and live in host countries face are often not allowed to enroll in school.',
    fromPosition: 40
  },
  {
    mode: 'outOfSchool',
    text: 'They have no time for school because they have to work in order to support their families. If they are in their early teens, chances are that they won’t go back to school, even if they have the chance.',
    fromPosition: 50
  },
  {
    mode: 'outOfSchool',
    text: 'Often schools which accept refugees are too far from the camps.',
    fromPosition: 60
  },
  {
    mode: 'outOfSchool',
    text: 'Or they don’t have classes for all age group (there needs to be more than a certain number of students to organize a class).',
    fromPosition: 70
  },
  {
    mode: 'outOfSchool',
    text: 'June 2016 only 60% of children were in school in Syria, leaving 2.1 million children and adolescents without access to education in the country.',
    fromPosition: 80
  },
  {
    mode: 'outOfSchool',
    text: 'In neighbouring countries, over 4.8 million Syrian refugees are registered with UNHCR, amongst them around 35 per cent are of school-age. In Turkey, only 39 per cent of school-age refugee children and adolescents were enrolled in primary and secondary education, 40 per cent in Lebanon, and 70 per cent in Jordan. In total, 900’000 school aged refugees are not attending school outside of Syria.',
    fromPosition: 90
  },
  {
    mode: 'backToSchool',
    text: 'As you were reading this, four children won’t be able to go to school tomorrow',
    fromPosition: 95
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