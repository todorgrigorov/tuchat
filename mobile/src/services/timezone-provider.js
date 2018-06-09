import momentTimezone from "moment-timezone";
import http from './http';
import settingsProvider from './settings-provider';
import settings from '../config/settings';
import apiRoutes from '../config/api-routes';

export default {
    async setUserTimezone() {
        const id = await settingsProvider.get(settings.ID);
        const timezone = momentTimezone.tz.guess();
        if (id && timezone) {
            await http.request(
                apiRoutes.USERS_TIMEZONE,
                'POST', {
                    id,
                    timezone
                });
        }
    }
};