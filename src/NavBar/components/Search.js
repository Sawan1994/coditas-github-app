import React from 'react';
import { InputGroup, Input, InputGroupAddon, Button } from 'reactstrap';
import { get_user_list } from '../../store/action/action';
import { connect } from 'react-redux';
import { debounce } from "lodash";

class Search extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            value: ''
        };
    }
    
    handlefetchDetails = debounce(()=> {
        this.props.getUserDetails(this.state.value, this.props.perPage);
    }, 200);

    handleChange(event){
        this.setState({
            value: event.target.value
        }, () => {
            this.handlefetchDetails();
        });
    }

    render() {
        return (
            <InputGroup>
                <Input type="text" name="search" id="search_user" placeholder="Search" onChange={this.handleChange.bind(this)}/>
                <InputGroupAddon addonType="append"><Button color="primary"><img src={require('../../assets/baseline-search-24px.svg')} alt="search_icon" /></Button></InputGroupAddon>
            </InputGroup>
        );
    }
}

const matchDispatchToProps = (dispatch) => {
    return {
        getUserDetails: (query, items_per_page) => { return dispatch(get_user_list(query, items_per_page)); }
    };
}

export default connect(null,matchDispatchToProps)(Search);