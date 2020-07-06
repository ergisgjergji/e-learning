import React from 'react';
import ScrollToTop from 'react-scroll-up';

const ScrollTopButton = () => {

    const style = {
        zIndex: 100,
        bottom: 30,
        right: 25
    }

    return (
        <ScrollToTop showUnder={100} style={style}>
            <i className="fa fa-arrow-circle-up fa-3x text-primary" aria-hidden="true"/>
        </ScrollToTop>
    )
};

export default ScrollTopButton;
