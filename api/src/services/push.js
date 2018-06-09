import PushNotifications from "node-pushnotifications";
import envConfig from "../config/env-config";
import constants from "../config/constants";

const push = new PushNotifications();

if (envConfig.push.apn.isEnabled()) {
    push.setOptions({
        apn: {
            token: {
                key: envConfig.push.apn.cert,
                keyId: envConfig.push.apn.keyId,
                teamId: envConfig.push.apn.teamId
            },
            production: !envConfig.isDevelopment()
        }
    });
}

if (envConfig.push.gcm.isEnabled()) {
    push.setOptions({
        gcm: {
            id: envConfig.push.gcm.id
        }
    })
}

export default {
    notify: async (options) => {
        if (!options.data.type) {
            throw new TypeError('Missing notification type.');
        }

        const result = await push.send([options.token], {
            title: options.title,
            body: options.body,
            alert: options.body,
            sound: 'default',
            icon: constants.PUSH_GCM_ICON_NAME,
            topic: constants.PUSH_APN_TOPIC,
            custom: options.data
        });

        let isSuccessful = true;
        result.forEach(method => {
            method.message.forEach(notification => {
                if (notification.error) {
                    isSuccessful = false;
                    console.info(method.method);
                    console.info(notification.regId);
                    console.error(notification.error);
                }
            });
        });

        if (isSuccessful) {
            await options.onSuccess();
        }
    }
}