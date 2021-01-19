import { Provider } from 'react-redux';
import store from './Redux/redux-store';
import { BrowserRouter } from 'react-router-dom';
import Routes from './Routes';

import { Divider, Layout } from 'antd';
const { Header } = Layout;

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Header>
          <Divider style={{ border: '#1890ff', marginTop: 0 }} orientation="center">
            <h2 style={{ color: 'whitesmoke' }}>Delivery manager</h2>
          </Divider>
        </Header>
        <Routes />
      </BrowserRouter>
    </Provider>
  );
}

export default App;
