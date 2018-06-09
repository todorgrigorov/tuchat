export default class ConfigError extends Error {
    constructor(config) {
        super(`Missing environment variable in config. '${config}'`);
    }
}
