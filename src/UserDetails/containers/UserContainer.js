import React, { Component } from "react";
import { connect } from "react-redux";
import UserCard from "../components/UserCard";
import { Container } from "reactstrap";

class UserContainer extends Component {

    render() {
        return (
            <Container>
                <div className="ml-5 mr-5">
                    <div className="m-4">
                    <p>Total Results : {this.props.totalUsers}</p>
                    </div>
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
        userDetails: state.userData,
        totalUsers: state.totalUsers
    };
}

export default connect(matchStateToProps)(UserContainer);