import { PayloadSDK } from "@payloadcms/sdk";
import { type Config } from "@svsticky/content";

export default new PayloadSDK<Config>({
    baseURL: process.env["PAYLOAD_URL"]!,
    baseInit: {
        headers: {
            "Authorization": `users API-Key ${process.env["PAYLOAD_API_KEY"]}`
        }
    }
});