import React from 'react';
import PropTypes from 'prop-types';

function Data({ children }) {
    return <React.Fragment>{children}</React.Fragment>;
}

Data.propTypes = {
    children: PropTypes.node.isRequired,
};

export default Data;