import React from "react";
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from "reactstrap";
import { connect } from "react-redux";
import { sort_user_list } from "../../store/action/action";

class Sort extends React.Component {

    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.select = this.select.bind(this);
        this.state = {
            dropdownOpen: false,
            value: "Sort By"
        };
    }

    toggle() {
        this.setState({
            dropdownOpen: !this.state.dropdownOpen
        });
    }

    select(event) {
        this.setState({
            dropdownOpen: !this.state.dropdownOpen,
            value: event.target.innerText
        });
        switch (event.target.innerText) {
            case 'Name (A-Z)':
                this.props.sort('name', 'asc');
                break;
            case 'Name (Z-A)':
                this.props.sort('name', 'desc');
                break;
            case 'Rank Asc':
                this.props.sort('rank', 'asc');
                break;
            case 'Rank Desc':
                this.props.sort('rank', 'desc');
                break;
            default: break;
        }

    }

    render() {
        return (
            <ButtonDropdown isOpen={this.state.dropdownOpen} toggle={this.toggle.bind(this)}>
                <DropdownToggle caret color="primary">
                    {this.state.value}
                </DropdownToggle>
                <DropdownMenu>
                    <DropdownItem onClick={this.select}>Name (A-Z)</DropdownItem>
                    <DropdownItem onClick={this.select}>Name (Z-A)</DropdownItem>
                    <DropdownItem onClick={this.select}>Rank Asc</DropdownItem>
                    <DropdownItem onClick={this.select}>Rank Desc</DropdownItem>
                </DropdownMenu>
            </ButtonDropdown>
        );
    }
}


const mapDispatchToProps = dispatch => {
    return {
        sort: (sortBy, direction) => { return dispatch(sort_user_list(sortBy, direction)); }
    };
}
export default connect(null, mapDispatchToProps)(Sort);