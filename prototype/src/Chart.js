import React from 'react';


// A function that returns a random number from 0 to 1000
const randomNum = () => Math.floor(Math.random() * 1000);

export default class Chart extends React.Component{

	constructor(props) {
		super(props); 
		    this.state = {
		      test: 0
		    };
		  }


  render() {

  	const {
      test
    } = this.state;

    return <div>
      <div className="controls">
        <button className="btn randomize" onClick={() => this.setState({test: randomNum(test) + 1})}>
          click! click! click!
        </button>
        <p> {test}</p>
      </div>
    </div>
  }
}