import React from 'react';
import {render} from 'react-dom';
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {platformChange} from "../actions/actions.jsx";
import {Redirect,Switch,Route} from 'react-router-dom';

import Home from "./Platform/Home.jsx";
import Store from "./Platform/Store.jsx";
import Notebook from "./Platform/Notebook.jsx";
import Stats from "./Platform/Stats.jsx";
import EditNote from "./Platform/utilities/EditNote.jsx";
import ViewNote from "./Platform/utilities/ViewNote.jsx";
import ReadNote from "./Platform/utilities/ReadNote.jsx";


class Platform extends React.Component {
    constructor(props){
        super(props);
        this.sideMenuClick=this.sideMenuClick.bind(this);
    }
    sideMenuClick() {
        alert("a plat clicked");
    }
  
  render () {
        const { title, content } = this.props;
        //alert("Platform");


		return (
			<aside className="right-side">
                <section className="content-header">
                    <h1>
                        {this.props.platformName}
                        <small>.</small>
                    </h1>
                </section>

                <section className="content">
                    <Switch>
                          <Route exact path="/" component={Home} />
                          <Route path="/Home" component={Home} />
                  			  <Route path="/index.html" component={Home} />
                          <Route path="/Notebook" component={Notebook}/>
                          <Route path="/Stats" component={Stats} />
                          <Route path="/Store" component={Store} />
                          <Route path="/EditNotes" component={EditNote}/>
                          <Route path="/ViewNotes" component={ViewNote}/>
                          <Route path="/ReadNotes" component={ReadNote}/>
                    </Switch>                  
                </section>
                    }
			</aside>
		);	
  }
}


function mapStateToProps(state) {
	return({
		platformName:state.onPlatform
		
	});
}

function matchDispatchToProps(dispatch) {
	return bindActionCreators({platformChange:platformChange},dispatch);
}

export default connect(mapStateToProps,matchDispatchToProps)(Platform);
