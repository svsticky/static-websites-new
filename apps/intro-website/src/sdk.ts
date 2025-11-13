import { PayloadSDK } from "@payloadcms/sdk";
import type { Config } from "@svsticky/content";

export default new PayloadSDK<Config>({
    baseURL: "http://localhost:3000/api",
    baseInit: {
        headers: {
            Authorization: "users API-Key b92e2726-b064-4485-b9a6-31775478bb9c"
        }
    }
});