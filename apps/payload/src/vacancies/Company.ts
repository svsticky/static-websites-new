import { CollectionConfig } from "payload";

export const Company: CollectionConfig = {
    slug: "company",
    labels: { singular: "Company", plural: "Companies" },
    admin: {
        useAsTitle: "name",
        group: "Vacancies"
    },
    versions: { drafts: true },
    fields: [
        {
            name: "name",
            type: "text",
            required: true,
            localized: true
        },
        {
            name: "slug",
            type: "text",
            required: true
        },
        {
            name: "logo",
            type: "upload",
            relationTo: "media",
            required: true
        },
        {
            name: "description",
            type: "richText",
            localized: true
        },
        {
            name: "website",
            type: "text",
            // TODO: Add validation for valid urls
        },
        {
            name: "contacts",
            type: "join",
            collection: "company-contact",
            on: "company"
        },
        {
            name: "vacancies",
            type: "join",
            collection: "vacancy",
            on: "company"
        }
    ]
};