import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

interface LocaleState {
  locale:'en'|'jp';
  changeLocale: (locale:'en'|'jp') => void,
}


export const LocaleStore = create<LocaleState>()(
  devtools(
    persist(
      (set) => ({
        locale:'en',
        changeLocale: (locale:'en'|'jp') => {
          set(() => ({ locale }))},
      }),
      {
        name: 'locale-storage',
      },
    ),
  ),
)
