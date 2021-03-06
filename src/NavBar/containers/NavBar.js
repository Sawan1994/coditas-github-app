import React, { Component } from "react";
import Search from "../components/Search";
import Sort from "../components/Sort";

class NavBar extends Component {
    
    render() {

        let style = {
            backgroundColor: 'blue',
            height: '70px',
            padding: '15px'
        };

        return (
            <div className="row shadow" style={style}>
                <div className="col-2 offset-4">
                    <Sort/>
                </div>
                <div className="col-3">
                    <Search perPage={this.props.items_per_page}/>
                </div>
            </div>
        );
    }
}

export default NavBar;