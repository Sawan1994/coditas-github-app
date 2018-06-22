import React from 'react';
import { Collapse } from 'reactstrap';
import RepoContainer from '../../RepoDetails/container/RepoContainer';
import { get_repository_details, clean_repository_details } from '../../store/action/action';
import connect from 'react-redux/lib/connect/connect';

class UserCard extends React.Component {

    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.state = { collapse: false };
    }

    toggle() {
        this.props.cleanRepositoryDetails();
        if(!this.state.collapse){
            this.props.getRepoDetails(this.props.username);
        }
        this.setState({ collapse: !this.state.collapse });
    }

    render() {
        return (
            <div className="m-4">
                <div className="shadow-sm border border-light p-4">
                    <div className="row no-gutters">
                        <div className="col-xs-3 mr-4">
                            <img src={this.props.img_url} className="rounded-circle" alt="user_img" height="100px" width="100px" />
                        </div>
                        <div className="col-xs-9 pt-2">
                            <h4 className="mb-1 capitalize">{this.props.username}</h4>
                            <p className="mb-1">Profile URL : {this.props.url}</p>
                            <p className="mb-1">Score : {this.props.score}</p>
                        </div>
                    </div>
                    <div className="row pt-4 no-gutters">
                        <div className="col-9 offset-1 pl-1">
                            <ul className="list-style-none">
                                <li>Data One : Value One</li>
                                <li>Data Two : Value Two</li>
                            </ul>
                        </div>
                        <div className="col-2">
                            <button type="button" className="btn btn-outline-primary" onClick={this.toggle}>Details</button>
                        </div>
                    </div>

                    <Collapse isOpen={this.state.collapse}>
                        <div className="row">
                            <RepoContainer/>
                        </div>
                    </Collapse>

                </div>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        cleanRepositoryDetails: () => { return dispatch(clean_repository_details());},        
        getRepoDetails: (username) => { return dispatch(get_repository_details(username));}
    };
}

export default connect(null,mapDispatchToProps)(UserCard);