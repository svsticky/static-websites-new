import type { SanitizedConfig } from "payload";
import payload from "payload";

import seedMain from "./main";
import seedVacancies from "./vacancies";

export const script = async (config: SanitizedConfig) => {
    const p = await payload.init({ config });

    await seedMain(p);
    await seedVacancies(p);

    payload.logger.info("Completed seeding");
    process.exit(0);
};