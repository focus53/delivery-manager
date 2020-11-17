import { Provider } from 'react-redux';
import './App.css';
import Calendar from './components/Calendar/Calendar';
import AddressData from './components/AddressData/AddressData';
import store from './components/Redux/redux-store';

function App() {
  return (
    <Provider store = {store}>
      <Calendar />
      <AddressData />
    </Provider>
  );
}

export default App;
