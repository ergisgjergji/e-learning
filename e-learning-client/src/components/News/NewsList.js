import React, { Component } from "react";
import { Tooltip } from 'reactstrap';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getNewsList, getCount } from './../../redux/actions/newsActions';

import NewsListItem from './NewsListItem';
import ReactPaginate from "react-paginate";
import { BeatLoader } from "react-spinners";
import AddNewsModal from "./AddNewsModal";
import translate from './../../i18n/translate';

class NewsList extends Component {

    constructor() {
        super();
        this.state = {
            page: 0,
            pageCount: 0,
            size: 2,
            news: [],
            loading: false,
            isTooltipOpen: false,
        }
        this.refresh.bind(this);
    }

    componentDidMount() {
        const { page, size } = this.state;
        this.props.getCount();
        this.props.getNewsList(page, size);
    }

    static getDerivedStateFromProps(props, state) {

        const { count, news, loading } = props;
        const { size } = state;
        const pageCount = Math.ceil(count/size);
        return {
            ...state,
            pageCount,
            news,
            loading
        }
    }

    refresh = () => {
        const { page, size } = this.state;
        this.props.getNewsList(page, size);
    }

    toggleTooltip = () => {
        this.setState({ isTooltipOpen: !this.state.isTooltipOpen });
    }

    handlePageClick = (data) => {
        const page = data.selected;
        const { size } = this.state;
        this.setState({ page });
        this.props.getNewsList(page, size);
    }

	render() {
        const { pageCount, size, news, loading, isTooltipOpen } = this.state;

		return (
			<div className="transition-page">
                <div className="page col-12 col-md-11 col-lg-10 mx-auto p-3 my-4 border rounded shadow bg-white">

                    <i id="refresh-tooltip" className="fa fa-refresh fa-lg position-top-right my-text-primary" aria-hidden="true" onClick={this.refresh}></i>
                    <Tooltip placement="right" isOpen={isTooltipOpen} target="refresh-tooltip" toggle={this.toggleTooltip}>
                        Refresh
                    </Tooltip>

                    <h3 className="display-4 text-center rounded"> {translate('news-archive')} </h3>
                    <AddNewsModal size={size} />
                    <hr/>

                    <div className="my-3">
                    {
                        loading ? 
                            <div className="my-5">
                                <BeatLoader
                                    size={20}
                                    color={"#195fcb"}
                                    css={{textAlign: "center"}}
                                    loading={loading}
                                />
                            </div>
                            :
                            news.map((n, index) => <NewsListItem key={index} news={n} />)
                    }
                    </div>

                    <div className="news-pagination mt-3">
                        <ReactPaginate
                            previousLabel={<i className="fa fa-angle-left" aria-hidden="true"></i>}
                            nextLabel={<i className="fa fa-angle-right" aria-hidden="true"></i>}
                            breakLabel={'...'}
                            pageCount={pageCount}
                            marginPagesDisplayed={3}
                            pageRangeDisplayed={10}
                            onPageChange={this.handlePageClick}
                            breakClassName={'page-item mx-1'}
                            subContainerClassName={'pages pagination'}
                            breakLinkClassName={'page-link'}
                            containerClassName={'pagination'}
                            pageClassName={'page-item mx-1'}
                            pageLinkClassName={'page-link'}
                            previousClassName={'page- mx-1'}
                            previousLinkClassName={'page-link'}
                            nextClassName={'page-item mx-1'}
                            nextLinkClassName={'page-link'}
                            activeClassName={'active'}
                        />
                    </div>
                </div>
            </div>
		);
	}
}

NewsList.propTypes = {
    news: PropTypes.array.isRequired,
    count: PropTypes.number.isRequired,
    loading: PropTypes.bool.isRequired,
    getNewsList: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    news: state.newsStore.news_list,
    count: state.newsStore.count,
    loading: state.newsStore.loading
});

export default connect(mapStateToProps, { getNewsList, getCount })(NewsList);
