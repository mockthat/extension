import React from 'react';
import Header from '../../components/header/header';
import Endpoint from '../../components/endpoint/endpoint';
import { getEndpoints, activateEnpoint, deactivateEnpoint } from '../../services/apiManager';
import './popup.scss';

class Popup extends React.Component {
  constructor() {
    super();
    this.state = {
      endpoints: '',
      error: false,
    };
    this.activate.bind(this);
    this.deactivate.bind(this);
    this.updateEndpoints.bind(this);
  }

  componentDidMount() {
    this.updateEndpoints();
  }

  updateEndpoints() {
    getEndpoints()
      .then((endpoints) => {
        endpoints.json().then((data) => {
          this.setState({ endpoints: data, error: false });
        });
      })
      .catch(() => this.setState({ ...this.state, error: true }));
  }

  activate(categoryId, scenarioId) {
    activateEnpoint(categoryId, scenarioId).then(() => this.updateEndpoints());
  }

  deactivate(categoryId, scenarioId) {
    deactivateEnpoint(categoryId, scenarioId).then(() => this.updateEndpoints());
  }

  render() {
    return (
      <div>
        {!this.state.error && <Header refresh={this.updateEndpoints} />}
        {this.state.error && <p>Server is not running!</p>}
        {this.state.endpoints && this.state.endpoints.map((endpoint) => {
                const endpointGroup = [<p className="scenario-title">{endpoint.name}</p>];

                endpoint.scenarios.forEach(scenario =>
                    endpointGroup.push(<Endpoint
                      name={scenario.name}
                      activate={() => this.activate(endpoint.id, scenario.id)}
                      deactivate={() => this.deactivate(endpoint.id, scenario.id)}
                      active={scenario.running}
                      ws={scenario.websocket.active}
                      api={scenario.api.active}
                    />));

                return endpointGroup;
              })}
      </div>
    );
  }
}

export { Popup as default };
