export const voronoiContentMap = [ 
	{
		id: 1,
		text: 'I couldn’t go to school because of the bombardment and we were afraid of the planes. I miss my friends so much and I wish that we could go back to our old school.'
	}, 
	{
		id: 2,
		text: 'Hamsa, 11, wants to go to school to be a doctor, but his school in Homs, Syria was bombed out four months ago, shortly before he arrived in Jordan’s Za’atri refugee camp.'
	},
	{
		id: 3,
		text: 'Hamsa, 11, wants to go to school to be a doctor, but his school in Homs, Syria was bombed out four months ago, shortly before he arrived in Jordan’s Za’atri refugee camp.'
	},
	{
		id: 4,
		text: '“I missed my friends, I missed my teachers and I just missed learning a lot of things. Now I cannot wait to start school again,” says 10 year old Bak'
	},
	{
		id: 5,
		text: 'My friends and I know that without coming to school we won’t have a future.”'
	},
	{
		id: 6,
		text: '“Education is our weapon. We can only end the suffering from this war if we keep learning.”'
	},
	{
		id: 7,
		text: '“I never went to school,” says Zahra.'
	},
	{
		id: 8,
		text: '"All my teachers love me and the other students consider me to be one of them," he says.'
	},
	{
		id: 9,
		text: '16-year-old Hussain - to return to school from work by subsiding their families. He dreamed of studying to become a vet or an engineer, but now works 12 hours a day, six days a week in a textile workshop.'
	},
	{
		id: 10,
		text: 'He says: "I work in a basement. I just go to work in the morning, I never see the sun and I go back after sunset. Its very dark here in this country."'
	}
]

export const findTextforVoronoi = (voronoiContentMap, voronoiID) => {
  for (let i = voronoiContentMap.length - 1; i >= 0; i--) {
    if (voronoiID >= voronoiContentMap[i].id) {
      return voronoiContentMap[i].text;
    }
  }
  return voronoiContentMap[0].text;
};