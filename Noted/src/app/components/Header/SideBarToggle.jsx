import React from 'react';
import {render} from 'react-dom';
import $ from 'jquery';

class SideBarToggle extends React.Component {
	constructor(props){
		super(props);
		if (window.innerWidth>560) {
			this.state={sidebarOpen:true};
		} else {
			this.state={sidebarOpen:false};
		}
		
		this.toggleClick=this.toggleClick.bind(this);
	}
	toggleClick() {
		let openState=this.state.sidebarOpen;
		if (openState) {
			
			if (window.innerWidth>560) {
				$(".right-side").animate({left: '0px',width: window.innerWidth},200);
			}else{
				$(".right-side").animate({left: '0px'},200);
			}
			$(".sidebar").animate({left: '-220px'},200,function () {
				//alert("done1");
				$(".header .logo-container").addClass("off-canvas");
			});
			//$(".sidebar").slideToggle("slow");
			//$(".sidebar").hide();
			this.setState({sidebarOpen:false});

		} else {
			$(".header .logo-container").removeClass("off-canvas");
			// 
			if (window.innerWidth>560) {
				var rightWidth=window.innerWidth-220;
				//alert("Y")
				$(".right-side").animate({left: '220px',width: rightWidth},200);
			}else{
				$(".right-side").animate({left: '220px'},200);
			}
			$(".sidebar").animate({left: '0px'},200,function () {
				//alert("done1");
				$(".header .logo-container").removeClass("off-canvas");
			});
			//$(".sidebar").slideToggle("slow");
			//$(".sidebar").show();
			this.setState({sidebarOpen:true});

		}
	}
  
	render () {
		return (
            <span href="#" className="navbar-btn sidebar-toggle" onClick={this.toggleClick} data-toggle="offcanvas" role="button">
                <span className="sr-only">Toggle navigation</span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
            </span>
	    );
	}
}

export default SideBarToggle;