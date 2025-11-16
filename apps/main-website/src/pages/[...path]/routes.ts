import Vereniging_Activiteiten from "../../_pages/vereniging/activiteiten/index.astro";
import Home from "../../_pages/Home.astro";
import type { Config } from "@svsticky/content";

type Component = (_props: { lang: Config["locale"] } & Record<string, any>) => any;

export default [ 
    {
        url: "",
        component: Home,
        title: {
            nl: "Home - SV Sticky",
            en: "Home - SV Sticky"
        }
    },
    {
        url: "vereniging/activiteiten",
        component: Vereniging_Activiteiten,
        title: {
            nl: "Activiteiten - SV Sticky",
            en: "Activities - SV Sticky"
        }
    }
] satisfies { url: string, component: Component, title: Record<Config["locale"], string> }[];