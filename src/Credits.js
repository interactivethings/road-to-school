import React, { Component } from 'react';

class Credits extends Component {
  shouldComponentUpdate() {
    return false;
  }

  render() {
    return (
			<div className="Credits">
				<div className="Credits-Methods"><a name="about">Methods</a></div>
		     	<div className="Credits-Methods-Text">Every word in the visualization corresponds to roughly 10,000 Syrian children. </div>
	     		<div className="Credits-Donate"> NGOs you can donate to </div>
		     	<div className="Credits-Donate-Text">  	
		     		<ul>
		     			<li> <a href="http://www.unhcr.org/syria-emergency.html" target="_blank"> UN Refugee Agency</a></li>	
		     			<li> <a href="http://childrenofsyria.info/" target="_blank"> #ChildrenofSyria</a></li>	
		     			<li> <a href="http://arsis.gr/en/" target="_blank">Arsis.gr/</a></li>	
		     			<li> <a href="http://www.savethechildren.org/" target="_blank">Save the Children</a></li>	
		     			<li> <a href="https://www.unicef.org/emergencies/syria/" target="_blank"> UNICEF</a></li>	
		     			<li> <a href="https://www.syrianorphans.org/" target="_blank"> Syrian Orphans</a></li>	
		     			<li> <a href="http://www.childrenontheedge.org/lebanon-education-for-syrian-refugee-children.html" target="_blank"> Learning Centres for Syrian Refugee Children in Lebanon</a></li>	
		     		</ul>
	     		</div>
				<div className="Credits-Sources">Journaling sources</div>
				<div className="Credits-Sources-Text">
		     		<ul>
		     			<li> <a href="http://www.bbc.com/news/world-middle-east-37568322" target="_blank">The children who to go an underground school</a></li>	
		     			<li> <a href="https://www.theguardian.com/commentisfree/2016/jan/12/syria-refugee-children-lebanon-double-shift-schools" target="_blank">Without education, Syria’s children will be a lost generation</a></li>	
		     			<li> <a href="http://time.com/4482541/syria-refugee-school/" target="_blank">A Young Syrian Refugee Dreams of Going to School</a></li>	
		     			<li> <a href="http://data.unhcr.org/syrianrefugees/country.php?id=8" target="_blank">Syria Regional Refugee Response</a></li>	
		     			<li> <a href="http://www.aljazeera.com/news/2016/10/easy-answers-syrian-students-lebanon-161006075947100.html" target="_blank"> No easy answers for Syrian students in Lebanonl</a></li>	
		     			<li> <a href="https://www.hrw.org/news/2016/09/15/refugee-education-crisis-requires-global-employment-strategy" target="_blank">Refugee Education Crisis Requires a Global Employment Strategy</a></li>	
		     			<li> <a href="https://www.hrw.org/news/2015/11/08/turkey-400000-syrian-children-not-school" target="_blank">Turkey: 400,000 Syrian Children Not in School</a></li>	
		     			<li> <a href="http://reliefweb.int/report/jordan/losing-syria-s-youngest-generation-education-crisis-facing-syrian-refugees-jordan" target="_blank">Losing Syria’s Youngest Generation</a></li>	
		     		</ul>
	     		</div>
	     		<div className="Credits-Credits"> About this project </div>
	     		<div className="Credits-Credits-Text">  This project is the culmination of my internship at <a href="https://www.interactivethings.com/">Interactive Things</a>, an interaction design and data visualization in Zurich, Switzerland. <p> I believe that education and literacy is the most important tool each person in our world can have, and it is currently being taken away from millions of Syrian children. This data visualization and storytelling experience address this issue and aims to sensitizes the target audience to it.</p>
	     		<div className="Credits-Author"> Credits</div>
	     		<p>Made by <a href="https://twitter.com/kallirroi" target="_blank">Kalli Retzepi</a>.</p> 
	     		 <p> Many thanks to every Interactive Thing, particularly Peter, Christoph and Tom for their support in making the visualization and website. </p>
	     		</div>
		     	<a href="https://interactivethings.com" className="Credits-Credits-Logo"></a>
			</div>
    );
  }
}

export default Credits;
