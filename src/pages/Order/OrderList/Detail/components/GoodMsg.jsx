import React from 'react';
import ProTable from '@ant-design/pro-table';
import {Space} from 'antd'


const GoodMsg = ({  user }) => {

  const columns = [
    {
      dataIndex: 'good',
      title: <a>商品</a>,
      valueType: 'text',
      width: 150,
      render: () => (
        <Space direction="vertical">
          <span>{order_item_name}</span>
          <span>SKU: {sku}</span>
        </Space>
      ),
      align: 'center',
    },
    {
      dataIndex: 'specifications',
      title: <a>规格</a>,
      valueType: 'text',
      align: 'center',
    },
    {
      dataIndex: 'count',
      title: <a>售价*数量</a>,
      valueType: 'text',
      render: () => (
        <Space>
          <span>¥{price + '*' + qty}</span>
        </Space>
      ),
      align: 'center',
    },
    {
      dataIndex: 'total',
      title: <a>总售价</a>,
      valueType: 'money',
      align: 'center',
    },
    {
      dataIndex: 'account',
      title: <a>折扣</a>,
      valueType: 'money',
      align: 'center',
    },
  ];

  const { sku, order_item_name, price, qty, line_total, line_tax } = user.line_items && user.line_items[0] || {};

  let data = [
    {
      good: order_item_name,
      specifications: 'L',
      count: price + '*' + qty,
      total: line_total,
      account: line_tax,
    },
  ];
  return (
    <ProTable
      rowKey="dataIndex"
      columns={columns}
      toolBarRender={false}
      search={false}
      dataSource={data}
      pagination={false}
    />
  );
};


export default GoodMsg;
