import React, { Component } from 'react';
import { connect } from 'react-redux';

class RepoContainer extends Component {

    render() {
        return (
            <table className="table table-striped">
                <tbody>
                    {this.props.repoDetails.map((repo, i) => {
                        return (
                            <tr key={repo.id}>
                                <td>{repo.name}</td>
                                <td>{repo.language ? repo.language : 'NA'}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        );
    }
}

const matchStateToProps = state => {
    return {
        repoDetails: state.repoData
    };
}

export default connect(matchStateToProps)(RepoContainer);