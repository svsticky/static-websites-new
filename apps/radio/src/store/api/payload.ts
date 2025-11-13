import { PayloadSDK } from '@payloadcms/sdk';
import { Ad, BoardMessage, Config, Quote } from "@svsticky/content";
import { createApi } from '@reduxjs/toolkit/query/react';

export function isPayloadValid() {
  return (
    import.meta.env.VITE_PAYLOAD_BASE_URL != undefined &&
    import.meta.env.VITE_PAYLOAD_BASE_URL != '' &&
    import.meta.env.VITE_PAYLOAD_API_KEY != undefined &&
    import.meta.env.VITE_PAYLOAD_API_KEY != ''
  );
}

const sdk = new PayloadSDK({
    baseURL: import.meta.env.VITE_PAYLOAD_BASE_URL,
    baseInit: {
        headers: {
            Authorization: `users API-Key ${import.meta.env.VITE_PAYLOAD_API_KEY}`
        }
    }
});

async function payloadBaseQuery<Slug extends keyof Config["collections"]>(slug: Slug) {
    try {
        const entities = await sdk.find({ collection: slug });
        return { data: entities.docs.filter(doc => !(doc instanceof Number)) as Config["collections"][Slug][] };
    } catch (error) {
        return { error: (error as Error).message };
    }
};

export const payload = createApi({
  reducerPath: 'contentful',
  baseQuery: payloadBaseQuery,
  endpoints: (build) => ({
    ads: build.query<Ad[], void>({ query: () => 'ad', }),
    boardMessages: build.query<BoardMessage[], void>({ query: () => 'board-message', }),
    quotes: build.query<Quote[], void>({ query: () => 'quote', }),
  }),
});

export const { useAdsQuery, useBoardMessagesQuery, useQuotesQuery } =
  payload;
