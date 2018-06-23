import React, { Component } from 'react';

class RepoContainer extends Component {

    render() {
        return (
            <table className="table table-striped">
                <tbody>
                    {this.props.data.map((repo, i) => {
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

export default RepoContainer;