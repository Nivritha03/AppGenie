import { create } from "zustand";

interface AppState {
  currentAppId: string | null;
  setCurrentAppId: (id: string | null) => void;
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
}

export const useAppStore = create<AppState>((set) => ({
  currentAppId: null,
  setCurrentAppId: (id) => set({ currentAppId: id }),
  isSidebarOpen: true,
  toggleSidebar: () => set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
}));
