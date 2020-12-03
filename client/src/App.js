import { Provider } from 'react-redux';
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

function App() {
  return (
    <Provider store={store}>
      <Row style={{ margin: '20px' }}>
        <Col>
          <Calendar />
          <AddressDataContainer />
        </Col>
      </Row>
>>>>>>> d2aa298... refactor: AddressContainer
    </Provider>
  );
}

export default App;
