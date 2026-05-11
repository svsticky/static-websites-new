import { CollectionConfig } from "payload";

export const Society: CollectionConfig = {
    slug: "main-society",
    labels: { singular: "Society", plural: "Societies" },
    admin: {
        group: "Main website"
    },
    versions: {
        drafts: true
    },
    fields: [
        {
            name: "slug",
            type: "text",
            required: true,
            admin: {
                description: "The part after /disputen/ in the url of the website"
            }
        },
        {
            name: "name",
            type: "text",
            required: true,
            localized: true
        },
        {
            name: "logo",
            type: "upload",
            relationTo: "media",
            required: true,
        },
        {
            name: "about",
            type: "richText",
            required: true,
            localized: true
        }
    ]
};