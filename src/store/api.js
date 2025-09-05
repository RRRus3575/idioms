import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL,
    credentials: 'include',
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.token;
      if (token) headers.set('Authorization', `Bearer ${token}`);
      return headers;
    }
  }),
  endpoints: (builder) => ({
    // список + "load more"
    getIdioms: builder.query({
      // ⚙️ параметры строго под твой бек
      query: ({
        page = 1,
        limit = 20,
        language,
        favorite = false,
        query,
        category,
        languageVersion = 'en',
      } = {}) => {
        // бек ждёт favorite как строку "true"/"false"
        const fav = favorite === true || favorite === 'true' ? 'true' : 'false';
        return {
          url: '/idioms',
          params: {
            page,
            limit,
            language,
            favorite: fav,
            query,
            category,
            languageVersion,
          },
        };
      },

      // ключ кэша зависит ТОЛЬКО от фильтров (без page/limit)
      serializeQueryArgs: ({ endpointName, queryArgs }) => {
        const {
          language,
          favorite = false,
          query,
          category,
          languageVersion = 'en',
        } = queryArgs || {};
        const fav = favorite === true || favorite === 'true' ? 'true' : 'false';
        return `${endpointName}-${JSON.stringify({
          language,
          favorite: fav,
          query,
          category,
          languageVersion,
        })}`;
      },

      // склейка страниц при "Load more"
      merge: (currentCache, newData) => {
        if (!currentCache?.result) {
          Object.assign(currentCache, newData);
          return;
        }
        const seen = new Set(currentCache.result.map(i => i.id));
        const incoming = (newData.result || []).filter(i => !seen.has(i.id));
        currentCache.result.push(...incoming);

        currentCache.currentPage = newData.currentPage;
        currentCache.totalPages  = newData.totalPages;
        currentCache.totalIdioms = newData.totalIdioms;
      },

      // оставляем кэш, refetch не форсируем
      forceRefetch({ currentArg, previousArg }) {
        return currentArg?.page !== previousArg?.page
        || currentArg?.limit !== previousArg?.limit;
      },

    }),

    addIdiom: builder.mutation({
      query: (newIdiom) => ({
        url: '/idioms',
        method: 'POST',
        body: newIdiom,
      }),
    }),
  }),
});

export const {
  useGetIdiomsQuery,
  useLazyGetIdiomsQuery,
  useAddIdiomMutation,
} = api;
