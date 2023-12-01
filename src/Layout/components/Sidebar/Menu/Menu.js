import PropTypes from 'prop-types';

function Menu({ children }) {
    return <nav className='sidebar-content'>{children}</nav>;
}

Menu.propTypes = {
    children: PropTypes.node.isRequired,
};

export default Menu;
