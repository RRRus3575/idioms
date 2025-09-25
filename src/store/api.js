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

    // --- CATEGORIES ---
    getCategories: builder.query({
      query: (args) => {
        const language = args && typeof args === 'object' ? args.language : undefined;
        return { url: '/idioms/categories', params: language ? { language } : undefined };
      },
      // сортируем и строки, и объекты { id, name }
      transformResponse: (data = []) =>
        [...data].sort((a, b) =>
          String(a?.name ?? a).localeCompare(String(b?.name ?? b))
        ),
    }),

    // --- IDIOMS ---
    getIdioms: builder.query({
      query: (args = {}) => {
        const {
          page = 1,
          limit = 20,
          language,
          favorite = false,
          query,
          categories,                 // массив/строка id категорий
          languageVersion = 'en',
          sort = 'az',
          hideOutdated = false,
          ids,                        // массив/строка id идиом (необяз.)
        } = args;

        const fav       = (favorite === true || favorite === 'true') ? 'true' : 'false';
        const idsParam  = toIdsParam(ids);
        const catsParam = toIdsParam(categories);
        const byIds     = Boolean(idsParam);

        return {
          url: '/idioms',
          params: {
            page:  byIds ? 1 : page,
            limit: byIds ? (idsParam?.split(',').length || limit) : limit,
            language,
            favorite: fav,
            query,
            categories: catsParam,  // ← ВАЖНО: реально уходит на бекенд
            languageVersion,
            sort,
            hideOutdated: (hideOutdated === true || hideOutdated === 'true') ? 'true' : 'false',
            ids: idsParam,
          },
        };
      },

      // ключ кэша: учитываем categories (а не categoryIds)
      serializeQueryArgs: ({ endpointName, queryArgs = {} }) => {
        const {
          language,
          favorite = false,
          query = '',
          categories = '',
          languageVersion = 'en',
          sort = 'az',
          hideOutdated = false,
          ids = '',
        } = queryArgs;

        return `${endpointName}-${JSON.stringify({
          language,
          favorite: String(favorite),
          query,
          categories: toIdsParam(categories) || null,   // ← ВАЖНО
          languageVersion,
          sort,
          hideOutdated: String(hideOutdated),
          ids: toIdsParam(ids) || null,
        })}`;
      },

      // склейка страниц (когда ключ один и это не byIds)
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
        currentCache.totalPages  = newData.totalPages;
        currentCache.totalIdioms = newData.totalIdioms;
      },

      // при byIds — рефетч по смене ids; иначе — по page/limit
      // (смена фильтров меняет cache key → новый запрос сам)
      forceRefetch({ currentArg, previousArg }) {
        const nowIds  = toIdsParam(currentArg?.ids);
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
