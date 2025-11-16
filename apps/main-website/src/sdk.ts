import { PayloadSDK } from "@payloadcms/sdk";
import { type Config } from "@svsticky/content";

export default new PayloadSDK<Config>({
    baseURL: import.meta.env["SECRET_PAYLOAD_URL"],
    baseInit: {
        headers: {
            "Authorization": `users API-Key ${import.meta.env["SECRET_PAYLOAD_API_KEY"]}`
        }
    }
});