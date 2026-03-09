import { Faker } from "@faker-js/faker";

export function richTextLorem(faker: Faker, { min, max }: { min: number, max: number }) {
    return {
        root: {
            type: "root",
            children: [{
                type: "paragraph",
                children: faker.lorem.paragraphs({ min, max })
                    .split("\n")
                    .map(text => ({
                        type: "text",
                        text,
                        version: 1,
                        format: "" as const,
                        mode: "normal" as const,
                        style: ""
                    })),
                version: 1,
                indent: 0,
                format: "" as const
            }],
            version: 1,
            indent: 0,
            format: "" as const,
            direction: "ltr" as const
        }
    };
}
