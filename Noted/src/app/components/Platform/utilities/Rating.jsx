import React from 'react';
import {render} from 'react-dom';

class Rating extends React.Component {
	constructor(props){
		super(props);
		let mode=this.props.mode;
		switch(this.props.rating){
			case 1:{
				this.state={
					starRate:1,
					s1:"fa-star  ",
					s2:"fa-star-o",
					s3:"fa-star-o",
					s4:"fa-star-o",
					s5:"fa-star-o",
					mode:mode
				}
				break;				
			}
			case 2:{
				this.state={
					starRate:2,
					s1:"fa-star  ",
					s2:"fa-star  ",
					s3:"fa-star-o",
					s4:"fa-star-o",
					s5:"fa-star-o",
					mode:mode
				}
				break;				
			}
			case 3:{
				this.state={
					starRate:3,
					s1:"fa-star  ",
					s2:"fa-star  ",
					s3:"fa-star  ",
					s4:"fa-star-o",
					s5:"fa-star-o",
					mode:mode
				}
				break;				
			}
			case 4:{
				this.state={
					starRate:4,
					s1:"fa-star  ",
					s2:"fa-star  ",
					s3:"fa-star  ",
					s4:"fa-star  ",
					s5:"fa-star-o",
					mode:mode
				}
				break;				
			}
			case 5:{
				this.state={
					starRate:5,
					s1:"fa-star  ",
					s2:"fa-star  ",
					s3:"fa-star  ",
					s4:"fa-star  ",
					s5:"fa-star  ",
					mode:mode
				}
				break;				
			}
			default:{
				this.state={
					starRate:0,
					s1:"fa-star-o",
					s2:"fa-star-o",
					s3:"fa-star-o",
					s4:"fa-star-o",
					s5:"fa-star-o",
					mode:mode
				}
				break;				
			}
		}
	}
	starClick(starRate){
		if(this.state.mode!="display"){
			let s1="fa-star-o",
				s2="fa-star-o",
				s3="fa-star-o",
				s4="fa-star-o",
				s5="fa-star-o";
			if(starRate==1){
				s1="fa-star  ",
				s2="fa-star-o",
				s3="fa-star-o",
				s4="fa-star-o",
				s5="fa-star-o";
			}else if(starRate==2){
				s1="fa-star  ",
				s2="fa-star  ",
				s3="fa-star-o",
				s4="fa-star-o",
				s5="fa-star-o";
			}else if(starRate==3){
				s1="fa-star  ",
				s2="fa-star  ",
				s3="fa-star  ",
				s4="fa-star-o",
				s5="fa-star-o";
			}else if(starRate==4){
				s1="fa-star  ",
				s2="fa-star  ",
				s3="fa-star  ",
				s4="fa-star  ",
				s5="fa-star-o";
			}else if(starRate==5){
				s1="fa-star  ",
				s2="fa-star  ",
				s3="fa-star  ",
				s4="fa-star  ",
				s5="fa-star  ";
			}
			this.setState({starRate,s1,s2,s3,s4,s5});
		}
	}
	render () {
		let style={};
		if(this.state.mode=="rate"){
			style={cursor:"pointer"};
		}else if(this.state.mode=="display"){
			style={cursor:"unset"};
		}
		return (  
			<div className="notes-ratings">
				<label style={style} onClick={()=>this.starClick(5)} className={"star fa "+ this.state.s5} for="star-5"></label>
				<label style={style} onClick={()=>this.starClick(4)} className={"star fa "+ this.state.s4} for="star-4"></label>
				<label style={style} onClick={()=>this.starClick(3)} className={"star fa "+ this.state.s3} for="star-3"></label>
				<label style={style} onClick={()=>this.starClick(2)} className={"star fa "+ this.state.s2} for="star-2"></label>
				<label style={style} onClick={()=>this.starClick(1)} className={"star fa "+ this.state.s1} for="star-1"></label>
			</div>
	    );
	}
}


export default Rating;