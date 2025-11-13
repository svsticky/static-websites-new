import { GlobalConfig } from "payload";

export const Hero: GlobalConfig = {
    slug: "hero",
    admin: {
        group: "Intro website"
    },
    versions: {
        drafts: true
    },
    fields: [
        {
            name: "Content",
            type: "richText"
        },
        {
            name: "pictures",
            type: "upload",
            relationTo: "media",
            hasMany: true
        }
    ]
};