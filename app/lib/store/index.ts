import { configureStore } from '@reduxjs/toolkit'
import tokensReducer from './tokensSlice'

export const makeStore = () => {
  return configureStore({
    reducer: {
      tokens: tokensReducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: ['tokens/setTokens'],
          ignoredPaths: ['tokens.tokens'],
        },
      }),
  })
}

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']