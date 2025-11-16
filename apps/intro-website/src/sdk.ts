import { PayloadSDK } from "@payloadcms/sdk";
import type { Config } from "@svsticky/content";

export default new PayloadSDK<Config>({
    baseURL: "http://localhost:3000/api",
    baseInit: {
        headers: {
            Authorization: "users API-Key 7537b948-68b1-4bff-9787-001dfce414bb"
        }
    }
});