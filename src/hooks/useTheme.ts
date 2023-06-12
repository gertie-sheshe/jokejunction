import useThemeStore, { ThemeActions } from "@jokejunction/store/themeStore";

interface ThemeState {
  isDarkMode: boolean;
  toggleTheme: ThemeActions["toggleTheme"];
}

const useTheme = (): ThemeState => {
  const theme = useThemeStore((state) => state.theme);
  const toggleTheme = useThemeStore((state) => state.toggleTheme);

  const isDarkMode = theme === "dark";

  return { isDarkMode, toggleTheme };
};

export default useTheme;
