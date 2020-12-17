import { PlusOutlined } from '@ant-design/icons';
import { Button, Row, Table } from 'antd';
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { StorageForm } from '../AddressData/StorageForm/StorageForm';

import { addNewAddressStorageTC } from '../Redux/address-reducer';
import { addStorageTC } from '../Redux/user-reducer';

const Storages = (props) => {
  const [addModeStorage, setAddModeStorage] = useState(false);

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
    },
    {
      title: 'Address',
      dataIndex: 'address',
    },
  ];

  const date1 = props.userStorages.map((el, index) => {
    return { key: index, name: el };
  });

  const data = [
    {
      key: '1',
      name: 'John Brown',
      address: 'New York No. 1 Lake Park',
    },
    {
      key: '2',
      name: 'Jim Green',
      address: 'London No. 1 Lake Park',
    },
    {
      key: '3',
      name: 'Joe Black',
      address: 'Sidney No. 1 Lake Park',
    },
  ];

  const handleSubmitNewStorage = (e, street, streetNumber, postCode, storageName) => {
    e.preventDefault();
    setAddModeStorage(false);
    let newAddressStorageToString = `${street} ${streetNumber}, ${postCode}`;
    props.addNewAddressStorageTC(newAddressStorageToString, storageName);
    props.addStorageTC(storageName, props.userId);
  };
  return (
    <div>
      <div style={{ width: '50%', marginBottom: '10px' }}>
        <Table columns={columns} dataSource={date1} pagination={false} bordered />
      </div>
      <Row gutter={[5, 5]}>
        <Button
          icon={<PlusOutlined />}
          onClick={() => (addModeStorage ? setAddModeStorage(false) : setAddModeStorage(true))}
        >
          Add new storage
        </Button>
      </Row>
      <Row>{addModeStorage && <StorageForm handleSubmitNewStorage={handleSubmitNewStorage} />}</Row>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    userId: state.userReducer.userId,
    userStorages: state.userReducer.userStorages,
  };
};

export default connect(mapStateToProps, { addNewAddressStorageTC, addStorageTC })(Storages);
