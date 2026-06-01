// @ts-expect-error - No types available for @ovhcloud/node-ovh
import ovhLib from '@ovhcloud/node-ovh';

export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig();
    const consumerKey = getCookie(event, 'ovh_consumer_key');

    if (!consumerKey) {
        return sendRedirect(event, '/admin?error=missing_consumer_key');
    }

    const ovh = ovhLib({
        endpoint: 'ovh-eu',
        appKey: config.ovhAppKey,
        appSecret: config.ovhAppSecret,
        consumerKey: consumerKey
    });

    try {
        // 1. Get user details from OVH
        const me = await ovh.requestPromised('GET', '/me');
        const userNic = me.nichandle;

        // 2. Check if the user is authorized (whitelist)
        const allowedNics = config.ovhAllowedNics as string[];

        // If the whitelist is empty, we don't allow anyone for safety
        // The user should at least put their own NIC in the .env
        if (!allowedNics || allowedNics.length === 0 || !allowedNics.includes(userNic)) {
            console.warn(`Unauthorized OVH login attempt: ${userNic}`);
            deleteCookie(event, 'ovh_consumer_key');
            return sendRedirect(event, '/admin?error=unauthorized_nic');
        }

        // 3. Create the secure session
        await setUserSession(event, {
            user: {
                role: 'admin',
                id: userNic,
                name: `${me.firstname} ${me.lastname}`
            },
            loggedInAt: new Date().toISOString()
        });

        // 4. Cleanup and redirect
        deleteCookie(event, 'ovh_consumer_key');
        return sendRedirect(event, '/admin');
    } catch (error) {
        console.error('OVH Auth Callback Error:', error);
        deleteCookie(event, 'ovh_consumer_key');
        return sendRedirect(event, '/admin?error=auth_failed');
    }
});
