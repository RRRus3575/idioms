// store/api.js
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { setCredentials, logout } from './authSlice'; // путь подправь под свой проект

const toIdsParam = (ids) =>
  Array.isArray(ids) ? ids.filter(Boolean).join(',') : (ids || undefined);

// --- базовый fetchBaseQuery ---
const rawBaseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_API_URL,
  credentials: 'include',
  prepareHeaders: (headers, { getState }) => {
    const token = getState()?.auth?.token;
    if (token) headers.set('Authorization', `Bearer ${token}`);
    return headers;
  },
});

// --- обёртка с авто-рефрешем access по refresh-cookie ---
const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await rawBaseQuery(args, api, extraOptions);

  // если бек вернул 401 — пробуем освежить access
  if (result.error && result.error.status === 401) {
    const refreshResult = await rawBaseQuery(
      { url: '/auth/refresh', method: 'POST' },
      api,
      extraOptions
    );

    if (refreshResult.data?.access) {
      // сохранили новый access в authSlice
      api.dispatch(
        setCredentials({
          token: refreshResult.data.access,
          accessTtl: refreshResult.data.accessTtl,
        })
      );

      // повторяем оригинальный запрос
      result = await rawBaseQuery(args, api, extraOptions);
    } else {
      // рефреш не удался — вылогиниваем
      api.dispatch(logout());
    }
  }

  return result;
};

export const api = createApi({
  reducerPath: 'api',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['Auth'], // если хочешь пометить авторизационные штуки
  endpoints: (builder) => ({

    // ================= AUTH =================

    register: builder.mutation({
      query: (body) => ({
        url: '/auth/register',
        method: 'POST',
        body,
      }),
    }),

    login: builder.mutation({
      query: ({ email, password }) => ({
        url: '/auth/login',
        method: 'POST',
        body: { email, password },
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          // бек: { access, accessTtl, user: { id, email, role } }
          dispatch(
            setCredentials({
              user: data.user,
              token: data.access,
              accessTtl: data.accessTtl,
            })
          );
        } catch {
          // ошибки возьмёшь из error в компоненте
        }
      },
      invalidatesTags: ['Auth'],
    }),

    getCurrentUser: builder.query({
      query: () => ({
        url: '/auth/current',
        method: 'GET',
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          // data: { id, email, name, role, isVerified }
          dispatch(
            setCredentials({
              user: data,
            })
          );
        } catch {
          // 401 и прочее обработает baseQueryWithReauth
        }
      },
      providesTags: ['Auth'],
    }),

    logoutUser: builder.mutation({
      query: () => ({
        url: '/auth/logout',
        method: 'POST',
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
        } finally {
          dispatch(logout());
        }
      },
      invalidatesTags: ['Auth'],
    }),

    googleLogin: builder.mutation({
      query: ({ idToken }) => ({
        url: '/auth/goggle', // у тебя так в роутере названо
        method: 'POST',
        body: { idToken },
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          // { access, accessTtl, user }
          dispatch(
            setCredentials({
              user: data.user,
              token: data.access,
              accessTtl: data.accessTtl,
            })
          );
        } catch {}
      },
      invalidatesTags: ['Auth'],
    }),

    forgotPassword: builder.mutation({
      query: (body) => ({
        url: '/auth/forgotPassword',
        method: 'POST',
        body, // { email }
      }),
    }),

    resetPassword: builder.mutation({
      query: (body) => ({
        url: '/auth/resetPassword',
        method: 'POST',
        body, // { token, newPassword }
      }),
    }),

    changePassword: builder.mutation({
      query: (body) => ({
        url: '/auth/changePassword',
        method: 'POST',
        body, // { currentPassword, newPassword }
      }),
    }),

    requestEmailChange: builder.mutation({
      query: (body) => ({
        url: '/auth/requestEmailChange',
        method: 'POST',
        body, // { newEmail }
      }),
    }),

    confirmEmailChange: builder.query({
      query: (token) => ({
        url: `/auth/confirmEmailChange/${token}`,
        method: 'GET',
      }),
    }),

    // ================ ТВОИ СТАРЫЕ ЭНДПОИНТЫ ==================

    // --- CATEGORIES ---
    getCategories: builder.query({
      query: (args) => {
        const language = args && typeof args === 'object' ? args.language : undefined;
        return { url: '/idioms/categories', params: language ? { language } : undefined };
      },
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
          categories,
          languageVersion = 'en',
          sort = 'az',
          hideOutdated = false,
          ids,
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
            categories: catsParam,
            languageVersion,
            sort,
            hideOutdated: (hideOutdated === true || hideOutdated === 'true') ? 'true' : 'false',
            ids: idsParam,
          },
        };
      },

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
          categories: toIdsParam(categories) || null,
          languageVersion,
          sort,
          hideOutdated: String(hideOutdated),
          ids: toIdsParam(ids) || null,
        })}`;
      },

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

    getIdiomById: builder.query({
      query: ({ id, language }) => ({
        url: `/idioms/${id}`,
        params: language ? { language } : undefined,
      }),
      keepUnusedDataFor: 0,
    }),

    addIdiom: builder.mutation({
      query: (newIdiom) => ({
        url: '/idioms/createIdiom',
        method: 'POST',
        body: newIdiom,
      }),
    }),

    addComment: builder.mutation({
      query: ({ id, ...commentData }) => ({
        url: `/idioms/${id}/comment`,
        method: 'POST',
        body: commentData,
      }),
    }),

    voteOutdated: builder.mutation({
      query: ({ id, ...payload }) => ({
        url: `/idioms/${id}/outdated`,
        method: 'POST',
        body: Object.keys(payload).length ? payload : undefined,
      }),
    }),

    sendSupport: builder.mutation({
      query: (data) => ({
        url: '/support/feedback',
        method: 'POST',
        body: data,
      }),
    }),

    getTerms: builder.query({
      query: ({ type, locate }) => ({
        url: `/terms`,
        params: { type, locate },
      }),
    }),

  }),
});

export const {
  // AUTH hooks
  useRegisterMutation,
  useLoginMutation,
  useGetCurrentUserQuery,
  useLogoutUserMutation,
  useGoogleLoginMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useChangePasswordMutation,
  useRequestEmailChangeMutation,
  useConfirmEmailChangeQuery,

  // IDIOMS hooks
  useGetCategoriesQuery,
  useGetIdiomsQuery,
  useLazyGetIdiomsQuery,
  useGetIdiomByIdQuery,
  useAddIdiomMutation,
  useAddCommentMutation,
  useVoteOutdatedMutation,
  useSendSupportMutation,
  useGetTermsQuery,
} = api;
