import { useSelector } from "react-redux"

export const AppFooter = () => {
  const { isDarkMode } = useSelector((storeState) => storeState.weatherModule)
  return <footer className={`main-footer-container ${(isDarkMode) ? 'dark-mode' : 'light-mode'}`}>
    Made by Amit Akuka
  </footer>
}