import React from 'react';
import Header from '../../components/header/header';
import Endpoint from '../../components/endpoint/endpoint';
import Set from '../../components/set/set';
import { getEndpoints, activateEnpoint, deactivateEnpoint, getSets, activateSet, getSetsStatus } from '../../services/apiManager';
import './popup.scss';

class Popup extends React.Component {
  constructor() {
    super();
    this.state = {
      sets: '',
      activeSet: '',
      endpoints: '',
      error: false,
    };
    this.activate.bind(this);
    this.deactivate.bind(this);
    this.updateEndpoints.bind(this);
    this.updateSets.bind(this);
    this.activateSet.bind(this);
    this.getSetStatus.bind(this);
  }

  componentDidMount() {
    setTimeout(() => {
      this.updateEndpoints();
      this.updateSets();
      this.getSetStatus();
    }, 30);
  }

  getSetStatus() {
    getSetsStatus()
      .then((statusData) => {
        statusData.json().then((data) => {
          this.setState({ ...this.state, activeSet: data.active });
        });
      });
  }

  updateEndpoints() {
    getEndpoints()
      .then((endpoints) => {
        endpoints.json().then((data) => {
          this.setState({ ...this.state, endpoints: data, error: false });
        });
      })
      .catch(() => this.setState({ ...this.state, error: true }));
  }

  updateSets() {
    getSets()
      .then((sets) => {
        sets.json().then((data) => {
          this.setState({ ...this.state, sets: data, error: false });
        });
      })
      .catch(() => this.setState({ ...this.state, error: true }));
  }

  activate(categoryId, scenarioId) {
    activateEnpoint(categoryId, scenarioId).then(() => this.updateEndpoints());
  }

  activateSet(setId) {
    this.setState({ ...this.state, activeSet: setId });

    activateSet(setId).then(() => this.updateEndpoints());
  }

  deactivate(categoryId, scenarioId) {
    deactivateEnpoint(categoryId, scenarioId).then(() => this.updateEndpoints());
  }

  render() {
    return (
      <div>
        {!this.state.error && <Header refresh={this.updateEndpoints} />}
        {this.state.error && <p>Server is not running!</p>}
        <div className="sets-wrapper">
          {!this.state.error && this.state.sets && <p className="sets-title">Predefined states:</p>}
          <div className="sets-container">
            {!this.state.error && this.state.sets && this.state.sets.map(set =>
              (<Set
                name={set.name}
                activate={() => this.activateSet(set.filename)}
                active={set.filename === this.state.activeSet}
              />))
            }
          </div>
        </div>
        {!this.state.error && this.state.endpoints && this.state.endpoints.map((endpoint) => {
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
