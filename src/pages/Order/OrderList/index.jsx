import React, { useState, useEffect } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { history, connect } from 'umi';
import { message, Space, Badge, Spin, Table, Tag } from 'antd';
import ProTable from '@ant-design/pro-table';
import ProForm, {
  ProFormSelect,
  ProFormDateRangePicker,
  ProFormText,
} from '@ant-design/pro-form';
import { query as queryOrder } from '@/services/order'; 
import styles from './index.css';
import moment from 'moment'

const TableList = ({ order, dispatch }) => {
  
  const [filter, setFilter] = useState({});
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true)

  const columns = [
    {
      title: "订单编号" ,
      dataIndex: 'number',
      tip: '订单编号 ',
      render: (dom, entity) => {
        return (
          <a
           
          >
            {dom}
          </a>
        );
      },
    },
    {
      title: "付款时间",
      dataIndex: 'paid_date',
    },
    {
      title: "订单状态",
      dataIndex: 'post_status',
      hideInForm: true,
      valueEnum: {
        'wc-cancelled': {
          text: <Badge status="error" text="已取消" />,
          status: 'wc-cancelled',
        },
        'wc-processing': {
          text: <Badge status="processing" text="运行中" />,
          status: 'wc-processing',
        },
        'wc-completed': {
          text: <Badge status="success" text="已完成" />,
          status: 'wc-completed',
        },
        'wc-pending': {
          text: <Badge status="default" text="待处理" />,
          status: 'wc-pending',
        },
      },
    },
    {
      title: "发货状态",
      dataIndex: 'fulfillment_status',
      hideInForm: true,
      valueEnum: {
        fulfilled: {
          text: <Tag color="default">已发货</Tag>,
          status: 'fulfilled',
        },
        unfulfilled: {
          text: <Tag color="error">未发货</Tag>,
          status: 'unfulfilled',
        },
      },
    },
    {
      title: "订单金额" ,
      dataIndex: 'order_total',
      // hideInForm: true,
      renderText: (val, item) => `${item.order_currency}${val}`,
    },
    {
      title: "操作" ,
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => [
        <a
          key="config"
          onClick={() => {        
            history.push('OrderList/Detail/'+record.ID);
          }}
        >
          查看
        </a>,
      ],
    },
  ];

  useEffect(async () => {
    const res = await queryOrder(filter);
    setData(res.data)
    setLoading(false)
  }, [filter]);


  return (
    <PageHeaderWrapper
      breadcrumb={false}
    >
      <div className={styles.searchContent}>
        <ProForm
          onFinish={async (values) => {
            setFilter(values);
            setLoading(true)
          }}
        >
          <ProForm.Group>
            <ProFormSelect
              name="filter[status]"
              width="small"
              valueEnum={{
                'wc-cancelled': {
                  text: <Badge status="error" text="已取消" />,
                  status: 'wc-cancelled',
                },
                'wc-processing': {
                  text: <Badge status="processing" text="运行中" />,
                  status: 'wc-processing',
                },
                'wc-completed': {
                  text: <Badge status="success" text="已完成" />,
                  status: 'wc-completed',
                },
                'wc-pending': {
                  text: <Badge status="default" text="待处理" />,
                  status: 'wc-pending',
                },
              }}
              placeholder="全部订单状态"
            />
            <ProFormSelect
              name="filter[fulfillment_status]"
              placeholder="全部发货状态"
              width="small"
              valueEnum={{
                fulfilled: {
                  text: <Tag color="default">已发货</Tag>,
                  status: 'fulfilled',
                },
                unfulfilled: {
                  text: <Tag color="error">未发货</Tag>,
                  status: 'unfulfilled',
                },
              }}
            />
            <ProFormDateRangePicker name="filter[date][]" />
            <ProFormText
              name="filter[search]"
              placeholder="请输入订单编号/支付编号/商品名/SKU/邮箱"
            />
            &nbsp;&nbsp;
          </ProForm.Group>
        </ProForm>
      </div>
      {loading?<div style={{ textAlign: 'center'}}> 
        <Spin size='large' />
      </div>:(<ProTable
        headerTitle="查询表格"
        rowKey={(record) => record.ID}
        search={false}
        toolBarRender={false}
        dataSource={data}
        columns={columns}
        rowSelection={false}
        // tableAlertRender={({ selectedRowKeys, selectedRows }) => (
        //   <Space size={24}>
        //     <span>已选 {selectedRowKeys.length} 项</span>
        //     <Space size={16}>
        //       <a onClick={() => console.log(selectedRowKeys, '1')}>发货</a>
        //       <a
        //         onClick={() => {
        //           let count = 0;
        //           selectedRows.map((item) => {
        //             if (
        //               item.post_status === 'wc-cancelled' ||
        //               item.post_status === 'wc-completed'
        //             ) {
        //               count += 1;
        //             }
        //           });
        //           if (count > 0) {
        //             message.error('只能修改运行中的订单，请重新选择');
        //           } else {
        //             dispatch({
        //               type: 'order/updateOrderStatus',
        //               payload: { nums: selectedRowKeys },
        //             });
        //           }
        //         }}
        //       >
        //         标记已完成
        //       </a>
        //       <a>标记进行中</a>
        //     </Space>
        //   </Space>
        // )}
      />)}
    </PageHeaderWrapper>
  );
};

const mapStateProps = ({ order }) => {
  return {
    order,
  };
};
export default connect(mapStateProps)(TableList);
