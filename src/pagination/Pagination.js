import React from 'react';
import { connect } from "react-redux";
import { get_user_list } from '../store/action/action';

class Pagination extends React.Component {

    constructor(props) {
        super(props);
        this.fetchUserDetails = this.fetchUserDetails.bind(this);
        this.state = {
            current: 1,
            pager: []
        };
    }

    componentDidMount() {
        this.setPage(this.state.current);
    }
    componentDidUpdate(prevProps, prevState) {
        // reset page if items array has changed
        if (this.props.total_count !== prevProps.total_count) {
            this.setPage(this.state.current);
        }
    }
    fetchUserDetails(ev) {

        let temp = 1;
        let page_count = 0;
        if (this.props.total_count > this.props.items_per_page) {
            page_count = Math.ceil(this.props.total_count / this.props.items_per_page);
        }

        switch (ev.target.innerText) {
            case 'First':
                temp = 1;
                break;
            case 'Last':
                temp = page_count;
                break;
            default:
                temp = Number(ev.target.innerText)
        }

        this.setState({
            current: temp
        }, () => {
            this.props.getUserDetails(this.props.searchString, this.props.items_per_page, this.state.current);
        });


    }

    setPage(current) {

        let page_count = 0;

        let pager = [];
        if (this.props.total_count > this.props.items_per_page) {
            page_count = Math.ceil(this.props.total_count / this.props.items_per_page);
        }

        if (page_count <= 5) {
            pager = pager = [...Array(page_count).keys()].map(i => i + 1);
            // pager = Array.apply(null, { length: page_count }).map(Number.call, Number);
        } else {
            if (current + 1 <= 3) {
                pager = [...Array(4).keys()].map(i => i + 1);
                pager[pager.length - 1] = page_count;
            } else if (current + 1 > 3 && current + 1 < page_count) {
                let startPage = current - 1;
                pager = [...Array(4).keys()].map(i => startPage + i);
                pager[pager.length - 1] = page_count;
            } else if (current + 1 > 3 && current + 1 >= page_count) {
                pager = [1, page_count - 2, page_count - 1, page_count];
            }
        }

        this.setState({
            pager: pager
        });

    }

    render() {

        return (
            <div className="row">
                {this.state.pager.length > 0 ?
                    <ul className="col-12 pagination justify-content-center">

                        <li className={this.state.current === 1 ? "page-item disabled" : "page-item"} onClick={this.state.current === 1 ? null : this.fetchUserDetails}><a className="page-link" onClick={this.state.current === 1 ? null : () => this.setPage(1)}>First</a></li>

                        {this.state.pager.map((page_num, i) => {
                            return (
                                <li key={i} className={this.state.current === page_num ? "page-item active" : "page-item"} onClick={this.fetchUserDetails}><a className="page-link" onClick={() => this.setPage(page_num)}>{page_num}</a></li>
                            );
                        })}

                        <li className={this.state.current === this.state.pager[this.state.pager.length - 1] ? "page-item disabled" : "page-item"} onClick={this.state.current === this.state.pager[this.state.pager.length - 1] ? null : this.fetchUserDetails}><a className="page-link" onClick={this.state.current === this.state.pager[this.state.pager.length - 1] ? null : () => this.setPage(this.state.pager[this.state.pager.length - 1])}>Last</a></li>
                    </ul> : null}
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getUserDetails: (query, perPage, page_num) => { return dispatch(get_user_list(query, perPage, page_num)); }
    };
}

const mapStateToProps = state => {
    return {
        total_count: state.totalUsers,
        searchString: state.searchString
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Pagination);