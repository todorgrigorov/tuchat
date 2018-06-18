import { AsyncStorage } from 'react-native';
import settings from '../config/settings';

export default {
    async get(key) {
        let value = await AsyncStorage.getItem(key);
        if (value === 'true' || value === 'false') {
            value = JSON.parse(value);
        }
        return value;
    },
    set(key, value) {
        const isString = (value instanceof String || typeof value === "string");
        debugger
        AsyncStorage.setItem(key, isString ? value : JSON.stringify(value));
    },

    async flush() {
        for (const key in settings) {
            await AsyncStorage.removeItem(key);
        }
    }
}