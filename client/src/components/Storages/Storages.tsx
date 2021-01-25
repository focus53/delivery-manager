import { PlusOutlined, DeleteOutlined } from '@ant-design/icons';
import { Button, Row, Table } from 'antd';
import React, { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { StorageForm } from '../AddressData/StorageForm/StorageForm';
import { addStorageTC, deleteStorageTC } from '../../Redux/user/userThunkCreators';
import { userAddressesStoragesSelector, userIdSelector, userStoragesSelector } from '../../Redux/user/userSelectors';

// @TODO type
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

const Storages: React.FC = () => {
  const dispatch = useDispatch();
  const [addModeStorage, setAddModeStorage] = useState(false);

  const userId = useSelector(userIdSelector);
  const userStorages = useSelector(userStoragesSelector);
  const userAddressesStorages = useSelector(userAddressesStoragesSelector);

  const handleDeleteStorage = (storageName: string) => {
    dispatch(deleteStorageTC(storageName, userId));
  };

  const tableData = userStorages.map((el, index) => {
    return {
      key: index,
      name: el,
      address: userAddressesStorages[index],
      deleteField: <Button onClick={() => handleDeleteStorage(el)} icon={<DeleteOutlined />} />,
    };
  });

  const handleSubmitNewStorage = useCallback(
    (street: string, streetNumber: string, postCode: string, storageName: string) => {
      setAddModeStorage(false);
      let newAddressStorageToString = `${street} ${streetNumber}, ${postCode}`;
      dispatch(addStorageTC(storageName, newAddressStorageToString, userId));
    },
    [dispatch, userId]
  );

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

export default Storages;
