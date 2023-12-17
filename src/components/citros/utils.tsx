export function addExtensionToSimulation(simulation: string) {
    if (simulation.endsWith('.json')) {
        return simulation;
    }
    return simulation + '.json';
}
