import React, { Component } from "react";
import { connect } from "react-redux";
import UserCard from "../components/UserCard";
import { Container } from "reactstrap";

class UserContainer extends Component {

    render() {
        return (
            <Container>
                <div className="ml-5 mr-5">
                    {this.props.userDetails.map((user, i) => {
                        return (
                            <UserCard key={user.id} score={user.score} username={user.login} url={user.url} img_url={user.avatar_url} />
                        );
                    })}
                </div>
            </Container>
        );
    }
}

const matchStateToProps = (state) => {
    return {
        userDetails: state.userData
    };
}

export default connect(matchStateToProps)(UserContainer);