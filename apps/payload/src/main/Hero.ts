import { GlobalConfig, TextFieldSingleValidation } from "payload";

export const Hero: GlobalConfig = {
    slug: "main-hero",
    label: "Hero",
    admin: {
        group: "Main website"
    },
    versions: {
        drafts: true
    },
    fields: [
        {
            name: "content",
            type: "richText",
            required: true,
            localized: true
        },
        {
            type: "upload",
            name: "pictures",
            relationTo: "media",
            hasMany: true,
            required: true
        },
        {
            type: "array",
            name: "buttons",
            fields: [
                {
                    type: "text",
                    name: "label",
                    localized: true,
                    required: true
                },
                {
                    type: "text",
                    name: "link",
                    required: true,
                    validate: (value: string | null | undefined) => {
                        if (!value) return "No value";
                        if (/^(\/\w*)+/.test(value)) {
                            return true;
                        } else {
                            try {
                                const url = new URL(value);
                                if (!(url.protocol === "http" || url.protocol === "https"))
                                    return "Invalid protocol";
                                return true;
                            } catch {
                                return "Invalid URL";
                            }
                        }
                    }
                }
            ]
        }
    ]
};