import { TelephoneField } from "@nouance/payload-better-fields-plugin/Telephone";
import { GlobalConfig } from "payload";

export const Contact: GlobalConfig = {
    slug: "main-contact",
    fields: [
        {
            type: "array",
            name: "people",
            fields: [
                {
                    type: "text",
                    name: "title"
                },
                {
                    type: "text",
                    name: "name"
                },
                {
                    type: "text",
                    name: "function"
                },
                ...TelephoneField({ name: "phone" }, { defaultCountry: "NL" }),
                {
                    type: "email",
                    name: "email"
                }
            ]
        },
        {
            name: "address",
            type: "richText"
        },
        {
            name: "postal",
            type: "richText"
        },
        {
            name: "data",
            type: "richText"
        }
    ]
}