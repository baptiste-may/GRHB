// @ts-expect-error - No types available for @ovhcloud/node-ovh
import ovhLib from '@ovhcloud/node-ovh';

export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig();

    if (!config.ovhAppKey || !config.ovhAppSecret) {
        throw createError({
            statusCode: 500,
            statusMessage: 'OVHcloud credentials missing in server configuration.'
        });
    }

    const ovh = ovhLib({
        endpoint: 'ovh-eu',
        appKey: config.ovhAppKey,
        appSecret: config.ovhAppSecret
    });

    const callbackUrl = `${getRequestURL(event).origin}/api/auth/ovh-callback`;

    try {
        // Request a new consumer key with rights to see who the user is
        const credential = await ovh.requestPromised('POST', '/auth/credential', {
            accessRules: [
                { method: 'GET', path: '/me' }
            ],
            redirection: callbackUrl
        });

        // Store the consumer key in a cookie to retrieve it after redirection
        setCookie(event, 'ovh_consumer_key', credential.consumerKey, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 60 * 10, // 10 minutes
            path: '/'
        });

        // Redirect user to OVH validation page
        return sendRedirect(event, credential.validationUrl);
    } catch (error) {
        console.error('Failed to initiate OVH auth:', error);
        throw createError({
            statusCode: 500,
            statusMessage: 'Failed to connect to OVHcloud.'
        });
    }
});
