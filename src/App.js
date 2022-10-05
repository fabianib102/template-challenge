import './App.css';
import Dashboard from './components/Dashboard';
import { CountryProvider } from './providers/CountryProvider';

const App = () => {

  return (
    <CountryProvider>
      <div className="App">
        <Dashboard />
      </div>
    </CountryProvider>
  );
}

export default App;
