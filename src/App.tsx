import { ThemeProvider } from './context/ThemeContext';
import Experience from './components/experience/Experience';

export default function App() {
  return (
    <ThemeProvider>
      <Experience />
    </ThemeProvider>
  );
}

