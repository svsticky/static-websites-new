import { Payload } from "payload";
import { fakerNL as faker } from "@faker-js/faker";
import { writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

function indexToFunction(index: number, lang: "nl" | "en") {
    switch (index) {
        case 0: return lang === "nl" ? "Voorzitter" : "Chair";
        case 1: return lang === "nl" ? "Secretaris" : "Secretary";
        case 2: return lang === "nl" ? "Penningmeester" : "Treasurer";
        case 3: return lang === "nl" ? "Commissaris Intern" : "Commissioner of Internal Affairs";
        case 4: return lang === "nl" ? "Commissaris Extern" : "Commissioner of External Affairs";
        case 5: return lang === "nl" ? "Commissaris Onderwijs" : "Commissioner of Educational Affairs";
        default: return "";
    }
}

function richTextLorem({ min, max }: { min: number, max: number }) {
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

export default async function(p: Payload) {
    // Boards
    const logo = await p.create({
        collection: "media",
        data: { alt: "Sticky logo" },
        filePath: path.resolve(dirname, "assets", "logo.png")
    });

    const d = new Date();
    const currentYear = d.getFullYear() - (d.getMonth() <= 7 ? 1 : 0)
    p.logger.info(`Creating ${currentYear - 2005} boards`);
    for (let year = 2006; year <= currentYear; year++) {
        const filePath = path.resolve(dirname, "assets", `b${year -  2005}.jpg`);
        await fetch(faker.image.urlPicsumPhotos() + ".jpg")
            .then(resp => resp.bytes())
            .then(buf => writeFile(filePath, buf));
        const boardPicture = await p.create({
            collection: "media",
            data: { alt: `Board ${year - 2005}` },
            filePath
        });

        await p.create({
            collection: "main-board",
            data: {
                board_number: year - 2005,
                year: `${year}-${year + 1}`,
                colour: faker.color.rgb(),
                zinspreuk: faker.lorem.sentence(4),
                picture: boardPicture,
                enable_personal_texts: year >= 2024,
                board_members: Array(6).fill(null).map((_, i) => ({
                    name: faker.person.fullName(),
                    function: indexToFunction(i, "nl"),
                    picture: year >= 2024 ? logo : undefined,
                    description: year >= 2024 ? richTextLorem({ min: 1, max: 2 }) : undefined
                }))
            }
        });
    }

    // Committees
    const nCommittees = faker.number.int({ min: 5, max: 10 });
    p.logger.info(`Creating ${nCommittees} committees`);
    for (let i = 0; i < nCommittees; i++) {
        const name = faker.company.name();
        await p.create({
            collection: "main-committee",
            data: {
                name, slug: name.replaceAll(/\W+/g, "-").toLowerCase(),
                logo,
                about: richTextLorem({ min: 1, max: 3 })
            },
            draft: false
        });
    }

    // News items
    const newsItemDates = faker.date.betweens({
        from: new Date(),
        to: new Date(),
        count: faker.number.int({ min: 15, max: 25 })
    });
    p.logger.info(`Creating ${newsItemDates.length} news items`);
    for (const date of newsItemDates) {
        await p.create({
            collection: "main-news-item",
            data: {
                title: faker.book.title(),
                content: richTextLorem({ min: 2, max: 5 }),
                createdAt: date.toString(),
                updatedAt: date.toString(),
            }
        });
    }

    // Stats
    p.logger.info(`Creating front page stats`);
    await p.updateGlobal({
        slug: "main-stats",
        data: {
            stats: [{
                target: faker.number.int({ min: 1, max: 2000 }),
                unit: "+",
                include_unit_in_animation: false,
                description: "leden"
            }, {
                target: nCommittees,
                description: "commissies"
            }, {
                target: currentYear - 2005,
                unit: "jaar",
                description: "sinds de geboorte"
            }]
        }
    });

    // Hero
    const nPictures = faker.number.int({ min: 3, max: 6 });
    p.logger.info(`Creating front page hero with ${nPictures} pictures`);
    const heroPictures = await Promise.all(
        Array(nPictures)
            .fill(null)
            .map((_, i) => fetch(faker.image.urlPicsumPhotos() + ".jpg")
                .then(resp => resp.bytes())
                .then(async buf => {
                    const filePath = path.resolve(dirname, "assets", `hero-${i}.jpg`);
                    await writeFile(filePath, buf);

                    return p.create({
                        collection: "media",
                        data: { alt: faker.word.words({ count: { min: 3, max: 5 } }) },
                        filePath
                    });
                })
            )
    );

    await p.updateGlobal({
        slug: "main-hero",
        data: {
            content: richTextLorem({ min: 1, max: 1 }),
            pictures: heroPictures,
            buttons: Array(faker.number.int({ min: 0, max: 3 }))
                .fill(null)
                .map(_ => ({
                    label: faker.hacker.noun(),
                    link: faker.internet.url()
                }))
        }
    })
}