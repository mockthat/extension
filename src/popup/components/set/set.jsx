import React from 'react';
import PropTypes from 'prop-types';
import './set.scss';

const Set = props => (
  // eslint-disable-next-line jsx-a11y/click-events-have-key-events
  <div className={`Set ${props.active ? 'Set--active' : ''}`} role="button" tabIndex={0} onClick={props.activate}>
    <p className="Set__title">{props.name}</p>
  </div>
);

Set.propTypes = {
  name: PropTypes.string.isRequired,
  activate: PropTypes.func.isRequired,
  active: PropTypes.bool.isRequired,
};

export { Set as default };
