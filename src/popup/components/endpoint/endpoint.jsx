import React from 'react';
import PropTypes from 'prop-types';
import { FaSocks, FaBed } from 'react-icons/fa';
import './endpoint.scss';

const Endpoint = props => (
  // eslint-disable-next-line jsx-a11y/click-events-have-key-events
  <div className={`Endpoint ${props.active ? 'Endpoint--active' : ''}`} role="button" tabIndex={0} onClick={props.active ? props.deactivate : props.activate}>
    <p className="Endpoint__title">{props.name}</p>
    <div className="Endpoint__icon-group">
      {props.api && <FaBed className="Endpoint__icon" />}
      {props.ws && <FaSocks className="Endpoint__icon" />}
    </div>
  </div>
);

Endpoint.propTypes = {
  name: PropTypes.string.isRequired,
  activate: PropTypes.func.isRequired,
  deactivate: PropTypes.func.isRequired,
  active: PropTypes.bool.isRequired,
  api: PropTypes.bool.isRequired,
  ws: PropTypes.bool.isRequired,
};

export { Endpoint as default };
