import { Provider } from 'react-redux';
<<<<<<< HEAD
import './App.css';
import Calendar from './components/Calendar/Calendar';
import store from './components/Redux/redux-store';
<<<<<<< HEAD

function App() {
  return (
    <Provider store = {store}>
      <Calendar />
      <AddressData />
=======
import { Row, Col } from 'antd';
import AddressDataContainer from './components/AddressData/AddressDataContainer';
=======
import store from './components/Redux/redux-store';
import { BrowserRouter } from 'react-router-dom';
import useRoutes from './routes';
>>>>>>> 9871675... add: Login & Registration pages

function App() {
  const routes = useRoutes();
  return (
    <Provider store={store}>
<<<<<<< HEAD
      <Row style={{ margin: '20px' }}>
        <Col>
          <Calendar />
          <AddressDataContainer />
        </Col>
      </Row>
>>>>>>> d2aa298... refactor: AddressContainer
=======
      <BrowserRouter>{routes}</BrowserRouter>
>>>>>>> 9871675... add: Login & Registration pages
    </Provider>
  );
}

export default App;
