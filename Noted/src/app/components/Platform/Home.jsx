import React from 'react';
import {render} from 'react-dom';
// import $ from 'jquery';
import {Doughnut, Bar} from 'react-chartjs-2';

import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {platformChange} from "../../actions/actions.jsx";

import NotesPreview from "./utilities/NotesPreview.jsx";
import Rating from "./utilities/Rating.jsx";

class Home extends React.Component {
	constructor(props){
		super(props);
		this.state={
			books:[]
		}
		
	}
	componentDidMount(){
		var user_id=this.getCookie("id")
		var self=this;
		$.post(HOST+"/home/"+user_id, {
	            //post data to the server
	        },
	        function(response){
	        	//make use of the response here
	        	if(response!="error"){
					self.setState({books:response});
				}	
	        }
	    );
		
	}
	render () {
		return (  
		    <div>        
                   <div className="recent-ad-activity col-md-7 col-xs-12">
                       <Bar 
                       		data={
	                            {labels:["January","February","March","April"],
	                             datasets:[
	                                {
	                                    label:"Test data",
	                                    data:[10,20,5,45]
	                                },
	                                {
	                                    label:"Test data",
	                                    data:[5,2,5,5,6]
	                                }
	                             ]
	                            }
	                        }
	                        width={100}
	                        height={50}
                        />
                   </div> 
                   <div className="recent-ad-activity col-md-5 col-xs-12">
                   		<h2>My Rating</h2>
                       <Rating mode="display" rating={4}/>
                   </div>  
                   <div className="recent-ad-activity col-md-5 col-xs-12">
                   		<h2>My Books</h2>
                       <Doughnut 
                       		data={
	                            {labels:["Book1","Book2","Book3"],
	                             datasets:[
	                                {
	                                    label:"Test data",
	                                    data:[10,20,5,45],
			                             backgroundColor: [
							                  'rgba(155, 99, 132, 0.2)',
							                  'rgba(54, 162, 235, 0.2)',
							                  'rgba(255, 206, 86, 0.2)',
							                  'rgba(25, 106, 186, 0.2)'
							             ] 
	                                },
	                                {
	                                    label:"Test data",
	                                    data:[5,2,5,5,6]
	                                }
	                             ]
	                            }
	                        }
	                        width={100}
	                        height={50}
                        />
                   </div>    
                   <div className="recent-ad-activity col-md-12 col-xs-12">
			    	{
			    		this.state.books.map((item,i)=>{
			    			var name=item.firstname+" "+item.surname;
			    			return(
			    				<NotesPreview key={i} id={item.id} name={item.name} date={item.date.split("T")[0]} price={item.price} author={name} rating={parseInt(item.ratings)} mode="view"/>
			    			)
			    		})
			    	}
                   </div>
                   <div className="col-md-12 col-xs-12" ></div>
                   <div className="col-md-12 col-xs-12" ></div>
            </div>
	    );
	}
}

function mapStateToProps(state) {
	return({
		user:state.user,
		platform:state.onPlatform
		
	});
}

function matchDispatchToProps(dispatch) {
	return bindActionCreators({platformChange:platformChange},dispatch);
}

export default connect(mapStateToProps,matchDispatchToProps)(Home);