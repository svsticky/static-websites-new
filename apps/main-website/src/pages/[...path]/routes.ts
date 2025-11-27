import Vereniging_Activiteiten from "../../_pages/vereniging/activiteiten/index.astro";


// Commissies //
import Vereniging_Commissies from "../../_pages/vereniging/commissies/index.astro";

import Adviesraad from "../../_pages/vereniging/commissies/Adviesraad/index.astro";


// Besturen //
import Vereniging_Bestuur from "../../_pages/vereniging/bestuur/index.astro";

import Bestuur1 from "../../_pages/vereniging/bestuur/bestuur1/index.astro";
import Bestuur2 from "../../_pages/vereniging/bestuur/bestuur2/index.astro";
/*
import Bestuur3 from "../../_pages/vereniging/bestuur/bestuur3/index.astro";
import Bestuur4 from "../../_pages/vereniging/bestuur/bestuur4/index.astro";
import Bestuur5 from "../../_pages/vereniging/bestuur/bestuur5/index.astro";
import Bestuur6 from "../../_pages/vereniging/bestuur/bestuur6/index.astro";
import Bestuur7 from "../../_pages/vereniging/bestuur/bestuur7/index.astro";
import Bestuur8 from "../../_pages/vereniging/bestuur/bestuur8/index.astro";
import Bestuur9 from "../../_pages/vereniging/bestuur/bestuur9/index.astro";
import Bestuur10 from "../../_pages/vereniging/bestuur/bestuur10/index.astro";
import Bestuur11 from "../../_pages/vereniging/bestuur/bestuur11/index.astro";
import Bestuur12 from "../../_pages/vereniging/bestuur/bestuur12/index.astro";
import Bestuur13 from "../../_pages/vereniging/bestuur/bestuur13/index.astro";
import Bestuur14 from "../../_pages/vereniging/bestuur/bestuur14/index.astro";
import Bestuur15 from "../../_pages/vereniging/bestuur/bestuur15/index.astro";
import Bestuur16 from "../../_pages/vereniging/bestuur/bestuur16/index.astro";
import Bestuur17 from "../../_pages/vereniging/bestuur/bestuur17/index.astro";
import Bestuur18 from "../../_pages/vereniging/bestuur/bestuur18/index.astro";
import Bestuur19 from "../../_pages/vereniging/bestuur/bestuur19/index.astro";
*/
import Bestuur20 from "../../_pages/vereniging/bestuur/bestuur20/index.astro";


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
    },
    {
        url: "vereniging/bestuur",
        component: Vereniging_Bestuur,
        title: {
            nl: "Bestuur - SV Sticky",
            en: "Board - SV Sticky"
        }
    },
        {
        url: "vereniging/commissies",
        component: Vereniging_Commissies,
        title: {
            nl: "Commissies - SV Sticky",
            en: "Committees - SV Sticky"
        }
    },

    { url: "vereniging/commissies/adviesraad", component: Adviesraad,  title: { nl: "Adviesraad - SV Sticky",  en: "Advisory board - SV Sticky" } },


    // -------------------------
    //   INDIVIDUELE BESTUREN
    // -------------------------

    { url: "vereniging/bestuur/1", component: Bestuur1,  title: { nl: "Bestuur 1 - SV Sticky",  en: "Board 1 - SV Sticky" } },
    { url: "vereniging/bestuur/2", component: Bestuur2,  title: { nl: "Bestuur 2 - SV Sticky",  en: "Board 2 - SV Sticky" } },
    /*
    { url: "vereniging/bestuur/3", component: Bestuur3,  title: { nl: "Bestuur 3 - SV Sticky",  en: "Board 3 - SV Sticky" } },
    { url: "vereniging/bestuur/4", component: Bestuur4,  title: { nl: "Bestuur 4 - SV Sticky",  en: "Board 4 - SV Sticky" } },
    { url: "vereniging/bestuur/5", component: Bestuur5,  title: { nl: "Bestuur 5 - SV Sticky",  en: "Board 5 - SV Sticky" } },
    { url: "vereniging/bestuur/6", component: Bestuur6,  title: { nl: "Bestuur 6 - SV Sticky",  en: "Board 6 - SV Sticky" } },
    { url: "vereniging/bestuur/7", component: Bestuur7,  title: { nl: "Bestuur 7 - SV Sticky",  en: "Board 7 - SV Sticky" } },
    { url: "vereniging/bestuur/8", component: Bestuur8,  title: { nl: "Bestuur 8 - SV Sticky",  en: "Board 8 - SV Sticky" } },
    { url: "vereniging/bestuur/9", component: Bestuur9,  title: { nl: "Bestuur 9 - SV Sticky",  en: "Board 9 - SV Sticky" } },
    { url: "vereniging/bestuur/10", component: Bestuur10,  title: { nl: "Bestuur 10 - SV Sticky", en: "Board 10 - SV Sticky" } },
    { url: "vereniging/bestuur/11", component: Bestuur11,  title: { nl: "Bestuur 11 - SV Sticky", en: "Board 11 - SV Sticky" } },
    { url: "vereniging/bestuur/12", component: Bestuur12,  title: { nl: "Bestuur 12 - SV Sticky", en: "Board 12 - SV Sticky" } },
    { url: "vereniging/bestuur/13", component: Bestuur13,  title: { nl: "Bestuur 13 - SV Sticky", en: "Board 13 - SV Sticky" } },
    { url: "vereniging/bestuur/14", component: Bestuur14,  title: { nl: "Bestuur 14 - SV Sticky", en: "Board 14 - SV Sticky" } },
    { url: "vereniging/bestuur/15", component: Bestuur15,  title: { nl: "Bestuur 15 - SV Sticky", en: "Board 15 - SV Sticky" } },
    { url: "vereniging/bestuur/16", component: Bestuur16,  title: { nl: "Bestuur 16 - SV Sticky", en: "Board 16 - SV Sticky" } },
    { url: "vereniging/bestuur/17", component: Bestuur17,  title: { nl: "Bestuur 17 - SV Sticky", en: "Board 17 - SV Sticky" } },
    { url: "vereniging/bestuur/18", component: Bestuur18,  title: { nl: "Bestuur 18 - SV Sticky", en: "Board 18 - SV Sticky" } },
    { url: "vereniging/bestuur/19", component: Bestuur19,  title: { nl: "Bestuur 19 - SV Sticky", en: "Board 19 - SV Sticky" } },
     */
    { url: "vereniging/bestuur/20", component: Bestuur20,  title: { nl: "Bestuur 20 - SV Sticky", en: "Board 20 - SV Sticky" } }

] satisfies { url: string, component: Component, title: Record<Config["locale"], string> }[];
