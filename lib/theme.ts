// mirrors the bootstrap script in app/layout.tsx
export function toggleTheme() {
  const root = document.documentElement;
  const dark = root.classList.toggle("dark");
  root.style.colorScheme = dark ? "dark" : "light";
  try {
    localStorage.setItem("theme", dark ? "dark" : "light");
  } catch {}
}
