/* global fetch, browser, chrome */

let serverPath = 'http://localhost:7000';

(chrome || browser).storage.sync.get('serverPath', (items) => {
  // eslint-disable-next-line prefer-destructuring
  serverPath = items.serverPath || 'http://localhost:7000';
});


export function getEndpoints() {
  return fetch(`${serverPath}/available-mocks`);
}

export function getSets() {
  return fetch(`${serverPath}/available-sets`);
}

export function getSetsStatus() {
  return fetch(`${serverPath}/set/status`);
}

export function activateSet(setId) {
  return fetch(`${serverPath}/set/${setId}/start`, { method: 'POST' });
}

export function activateEnpoint(categoryId, scenarioId) {
  return fetch(`${serverPath}/mock/${categoryId}/${scenarioId}/start`, { method: 'POST' });
}

export function deactivateEnpoint(categoryId, scenarioId) {
  return fetch(`${serverPath}/mock/${categoryId}/${scenarioId}/stop`, { method: 'POST' });
}
