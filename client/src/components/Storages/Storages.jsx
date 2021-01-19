import { PlusOutlined, DeleteOutlined } from '@ant-design/icons';
import { Button, Row, Table } from 'antd';
import React, { useState } from 'react';
import { connect } from 'react-redux';

import { StorageForm } from '../AddressData/StorageForm/StorageForm';
import { addStorageTC, deleteStorageTC } from '../../Redux/user/userThunkCreators';

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
    {
      title: '',
      dataIndex: 'deleteField',
    },
  ];

  const tableData = props.userStorages.map((el, index) => {
    return {
      key: index,
      name: el,
      address: props.userAddressesStorages[index],
      deleteField: <Button onClick={() => handleDeleteStorage(el)} icon={<DeleteOutlined />} />,
    };
  });

  const handleDeleteStorage = (el) => {
    props.deleteStorageTC(el);
  };

  const handleSubmitNewStorage = (e, street, streetNumber, postCode, storageName) => {
    e.preventDefault();
    setAddModeStorage(false);
    let newAddressStorageToString = `${street} ${streetNumber}, ${postCode}`;
    props.addStorageTC(storageName, newAddressStorageToString, props.userId);
  };
  return (
    <div>
      <div style={{ width: '50%', marginBottom: '10px' }}>
        <Table columns={columns} dataSource={tableData} pagination={false} bordered />
      </div>
      <Row gutter={[5, 5]}>
        <Button icon={<PlusOutlined />} onClick={() => setAddModeStorage(!addModeStorage)}>
          Add new storage
        </Button>
      </Row>
      {addModeStorage && (
        <Row>
          <StorageForm handleSubmitNewStorage={handleSubmitNewStorage} />
        </Row>
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    userId: state.userReducer.userId,
    userStorages: state.userReducer.userStorages,
    userAddressesStorages: state.userReducer.userAddressesStorages,
  };
};

export default connect(mapStateToProps, { addStorageTC, deleteStorageTC })(Storages);
