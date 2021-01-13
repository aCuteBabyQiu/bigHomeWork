import React, { useState } from 'react';
import { EditableProTable } from '@ant-design/pro-table';

const waitTime = (time = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};
const defaultData = [
    {
        title:'普通快递',
        fee: '2',
        
        id: 1
    },
    {
        title:'EMS',
        fee: '10',
        
        id: 2
    },
    {
        title:'顺丰快递',
        fee: '12',
        
        id: 3
    },
];
export default () => {
  const [editableKeys, setEditableRowKeys] = useState([]);
  const [dataSource, setDataSource] = useState([]);
  const [position, setPosition] = useState('bottom');
  const [newRecord, setNewRecord] = useState({
    id: (Math.random() * 1000000).toFixed(0),
  });
  const columns = [
    {
      title: '方案名称',
      dataIndex: 'title',
      align: 'center',
      valueType: 'text',
      formItemProps: {
        rules: [
          {
            required: true,
            message: '此项为必填项',
          },
        ],
      },
    //   // 第二行不允许编辑
    //   editable: (text, record, index) => {
    //     return index !== 0;
    //   },
      width: '30%',
    },
    {
      title: '运费',
      key: 'fee',
      dataIndex: 'fee',
      valueType: 'money',
      align: 'center',
    },
    {
        title: '操作',
        valueType: 'option',
        width: 200,
        align: 'center',
        render: (text, record, _, action) => [
            <a key="editable" onClick={() => {
                var _a;
                (_a = action.startEditable) === null || _a === void 0 ? void 0 : _a.call(action, record.id);
            }}>
      编辑
    </a>,
            <a key="delete" onClick={() => {
                setDataSource(dataSource.filter((item) => item.id !== record.id));
            }}>
      删除
    </a>,
        ],
    },
  ];
  return (
    <>
      <EditableProTable
        rowKey="id"
        headerTitle="可编辑表格"
        maxLength={5}
        recordCreatorProps={
          position !== 'hidden'
            ? {
                position: position,
                record: newRecord,
              }
            : false
        }
        toolBarRender={false}
        columns={columns}
        request={async () => ({
          data: defaultData,
          total: 3,
          success: true,
          
        })}
        value={dataSource}
        onChange={setDataSource}
        editable={{
          editableKeys,
          onSave: async () => {
            await waitTime(2000);
            setNewRecord({
              id: (Math.random() * 1000000).toFixed(0),
            });
          },
          onChange: setEditableRowKeys,
        }}
      />
      
    </>
  );
};

