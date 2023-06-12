import { create, StateCreator } from "zustand";

export interface ThemeState {
  theme: "dark" | "light"; // Update the type if `theme` has specific values
}

export interface ThemeActions {
  toggleTheme: () => void;
}

const themeStore: StateCreator<ThemeState & ThemeActions> = (set) => ({
  theme: "dark",
  toggleTheme: () =>
    set((state) => ({ theme: state.theme === "light" ? "dark" : "light" })),
});

const useThemeStore = create(themeStore);

export default useThemeStore;
