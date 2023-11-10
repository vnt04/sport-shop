import React from 'react';
import PropTypes from 'prop-types';

function Statistics({ children }) {
    return <React.Fragment>{children}</React.Fragment>;
}

Statistics.propTypes = {
    children: PropTypes.node.isRequired,
};

export default Statistics;
