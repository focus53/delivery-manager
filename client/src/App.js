import { Provider } from 'react-redux';
import store from './components/Redux/redux-store';
import { BrowserRouter } from 'react-router-dom';
import Routes from './Routes';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
    </Provider>
  );
}

export default App;
