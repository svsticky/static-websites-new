import { CollectionConfig } from "payload";

export const CompanyContact: CollectionConfig = {
    slug: "company-contact",
    labels: { singular: "Company contact", plural: "Company contacts" },
    admin: {
        group: "Vacancies",
        useAsTitle: "name"
    },
    versions: { drafts: true },
    fields: [
        {
            name: "name",
            type: "text",
            required: true
        },
        {
            name: "email",
            type: "email",
            required: true
        },
        {
            name: "phone",
            type: "text",
            // TODO: Add validation for phone numbers
        },
        {
            name: "company",
            type: "relationship",
            relationTo: "company",
            required: true
        }
    ]
}