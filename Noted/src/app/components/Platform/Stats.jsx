import React from 'react';
import {render} from 'react-dom';
// import $ from 'jquery';

class Explore extends React.Component {
	timeline(){

			        	for (var i = 0; i < 7; i++) {
			        		console.log("Gerard");
			        		<TimeLineElement title="Mahlekenyane" info="Let&apos;s make coolest things in css" type="Review" date="Mar 19 2017"/>
			        	}

	}
	render () {
		return (  
		    <div className="timeline">
			    <div className="container">
			    TimeLineElement
			    </div>
            </div>
	    );
	}
}

export default Explore;