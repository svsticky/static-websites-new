import type { SanitizedConfig } from "payload";
import payload from "payload";

import seedMain from "./main";

export const script = async (config: SanitizedConfig) => {
    const p = await payload.init({ config });

    await seedMain(p);

    payload.logger.info("Completed seeding");
    process.exit(0);
};