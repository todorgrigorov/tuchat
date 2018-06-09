import { API_ADDRESS, API_PORT, API_SOCKETS_PORT } from 'react-native-dotenv';

const config = {
    environment: process.env.NODE_ENV,
    api: {
        address: process.env.API_ADDRESS || API_ADDRESS,
        port: process.env.API_PORT || API_PORT,
        socketsPort: process.env.API_SOCKETS_PORT || API_SOCKETS_PORT,
    }
};

config.isDevelopment = () => config.environment === "development";

export default config;