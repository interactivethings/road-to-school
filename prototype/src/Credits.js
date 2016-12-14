import React, { Component } from 'react';

class Credits extends Component {
  render() {
    return (
			<div className="Credits">  
				<div className="Credits-Methods"> Methods </div>
		     	<div className="Credits-Methods-Text">Every word in the visualization corresponds to roughly 100,000 Syrian children. </div>
	     		<div className="Credits-Donate"> NGOs you can donate to </div>
		     	<div className="Credits-Donate-Text">  	
		     		<ul>
		     			<li> <a href="https://donate.unhcr.org/int-en/syria-chf/">https://donate.unhcr.org/int-en/syria-chf </a></li>	
		     			<li> <a href="http://arsis.gr/en/">http://arsis.gr/en/</a></li>	
		     			<li> <a href="http://childrenofsyria.info/"> http://childrenofsyria.info/</a></li>	
		     		</ul>
	     		</div>
				<div className="Credits-Sources">Journaling sources</div>
				<div className="Credits-Sources-Text">
		     		<ul>
		     			<li> <a href="http://data.unhcr.org/mediterranean/country.php?id=83/">http://data.unhcr.org/mediterranean/country.php?id=83/</a></li>	
		     			<li> <a href="http://data.unhcr.org/syrianrefugees/country.php?id=8">http://data.unhcr.org/syrianrefugees/country.php?id=8 </a></li>	
		     			<li> <a href="http://www.aljazeera.com/news/2016/10/easy-answers-syrian-students-lebanon-161006075947100.html"> http://www.aljazeera.com/news/2016/10/easy-answers-syrian-students-lebanon-161006075947100.html</a></li>	
		     			<li> <a href="https://www.hrw.org/news/2016/09/15/refugee-education-crisis-requires-global-employment-strategy">https://www.hrw.org/news/2016/09/15/refugee-education-crisis-requires-global-employment-strategy</a></li>	
		     			<li> <a href="https://www.hrw.org/news/2015/11/08/turkey-400000-syrian-children-not-school">https://www.hrw.org/news/2015/11/08/turkey-400000-syrian-children-not-school</a></li>	
		     		</ul>
	     		</div>
	     		<div className="Credits-Credits"> Credits </div>
	     		<div className="Credits-Credits-Text">  Many thanks to every Interactive Thing, particularly Peter, Christoph and Tom.  </div>			
		     	<div className="Credits-Credits-Logo">  </div>	
	     	
			</div>
    );
  }
}

export default Credits;
