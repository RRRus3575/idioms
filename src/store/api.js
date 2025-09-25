// store/api.js
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const toIdsParam = (ids) =>
  Array.isArray(ids) ? ids.filter(Boolean).join(',') : (ids || undefined);

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL,
    credentials: 'include',
    prepareHeaders: (headers, { getState }) => {
      const token = getState()?.auth?.token;
      if (token) headers.set('Authorization', `Bearer ${token}`);
      return headers;
    },
  }),
  endpoints: (builder) => ({
    // Категории (можно передать language, если нужно)
    getCategories: builder.query({
      query: (args) => {
        const language = args && typeof args === 'object' ? args.language : undefined;
        return { url: 'idioms/categories', params: { language } };
      },
      // чтобы были отсортированы по имени
      transformResponse: (data = []) =>
        [...data].sort((a, b) => String(a.name).localeCompare(String(b.name))),
    }),

    // Идиомы
    getIdioms: builder.query({
      query: (args = {}) => {
        const {
          page = 1,
          limit = 20,
          language,
          favorite = false,
          query,
          categories,               // массив/строка id категорий
          languageVersion = 'en',
          sort = 'az',
          ids,                       // массив/строка id идиом
        } = args;

        const fav = favorite === true || favorite === 'true' ? 'true' : 'false';
        const idsParam = toIdsParam(ids);
        const byIds = Boolean(idsParam);

        return {
          url: '/idioms',
          params: {
            page: byIds ? 1 : page,
            limit: byIds ? (idsParam?.split(',').length || 20) : limit,
            language,
            favorite: fav,
            query,
            categories: toIdsParam(categories),
            languageVersion,
            sort,
            ids: idsParam,
          },
        };
      },

      // ключ кэша без page/limit
      serializeQueryArgs: ({ endpointName, queryArgs = {} }) => {
        const {
          language,
          favorite = false,
          query,
          categoryIds,
          languageVersion = 'en',
          sort = 'last_added',
          hideOutdated,
        } = queryArgs;
        const fav = favorite === true || favorite === 'true' ? 'true' : 'false';

        return `${endpointName}-${JSON.stringify({
          language,
          favorite: fav,
          query,
          categories: toIdsParam(categoryIds) || null,
          languageVersion,
          sort,
          hideOutdated
        })}`;
      },

      // склейка страниц (если не byIds)
      merge: (currentCache = {}, newData = {}, { arg }) => {
        const isByIds = Boolean(toIdsParam(arg?.ids));
        if (!currentCache.result || isByIds) {
          Object.assign(currentCache, newData);
          return;
        }
        const seen = new Set((currentCache.result || []).map((i) => i.id));
        const incoming = (newData.result || []).filter((i) => !seen.has(i.id));
        currentCache.result.push(...incoming);

        currentCache.currentPage = newData.currentPage;
        currentCache.totalPages = newData.totalPages;
        currentCache.totalIdioms = newData.totalIdioms;
      },

      // при ids — рефетч по изменению ids; иначе — по page/limit
      forceRefetch({ currentArg, previousArg }) {
        const nowIds = toIdsParam(currentArg?.ids);
        const prevIds = toIdsParam(previousArg?.ids);
        if (nowIds || prevIds) return nowIds !== prevIds;

        return (
          currentArg?.page !== previousArg?.page ||
          currentArg?.limit !== previousArg?.limit
        );
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
  useGetCategoriesQuery,
  useGetIdiomsQuery,
  useLazyGetIdiomsQuery,
  useAddIdiomMutation,
} = api;
