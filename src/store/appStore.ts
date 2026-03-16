import { create } from "zustand"

type AppState = {
  page: number
  nickname: string
  setPage: (page: number) => void
  setNickname: (name: string) => void
}

export const useAppStore = create<AppState>((set) => ({
  page: 0,
  nickname: "",
  transitionActive: false,  // NEW
  setPage: (page) => set({ page }),
  setNickname: (nickname) => set({ nickname }),
}))
