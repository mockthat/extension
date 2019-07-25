export function getEndpoints() {
  // eslint-disable-next-line no-undef
  return fetch('http://localhost:7000/available-mocks');
}

export function activateEnpoint(categoryId, scenarioId) {
  // eslint-disable-next-line no-undef
  return fetch(`http://localhost:7000/mock/${categoryId}/${scenarioId}/start`, { method: 'POST' });
}

export function deactivateEnpoint(categoryId, scenarioId) {
  // eslint-disable-next-line no-undef
  return fetch(`http://localhost:7000/mock/${categoryId}/${scenarioId}/stop`, { method: 'POST' });
}
