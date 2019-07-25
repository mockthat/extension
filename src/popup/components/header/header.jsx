import React from 'react';
import PropTypes from 'prop-types';
import { FaSync } from 'react-icons/fa';
import './header.scss';

const Header = props => (
  <div className="Header">
    <p className="Header__title">Have fun with mockthat!</p>
    <FaSync role="button" tabIndex={0} onClick={props.refresh} />
  </div>
);

Header.propTypes = {
  refresh: PropTypes.func.isRequired,
};

export { Header as default };
