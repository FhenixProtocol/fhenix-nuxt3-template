import { ref } from 'vue';

const dark = ref<boolean>(false); // Initial theme state with TypeScript type

export const useThemeToggle = () => {
  const toggleTheme = () => {
    dark.value = !dark.value;
    document.documentElement.setAttribute('data-bs-theme', dark.value ? "dark" : "light");
    console.log("Theme toggled!");
  };

  return { dark, toggleTheme };
};
