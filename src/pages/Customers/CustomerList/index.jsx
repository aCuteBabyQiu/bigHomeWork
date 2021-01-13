import React, { useState, useEffect } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import ProForm, {
  ProFormSelect,
  ProFormDateRangePicker,
  ProFormText,
} from '@ant-design/pro-form';
import { Card, Space, Badge, Button, Select, DatePicker, Input, Tag, Spin } from 'antd';
import styles from './index.less';
import {  getCustomerHome } from '@/services/customer';
import { history, connect } from 'umi';


const columns = [
  {
    title: '姓名',
    dataIndex: 'display_name',
    valueType: 'text',
    align: 'center',
    render: (_, record) => {
      return <span>{record.first_name + record.last_name}</span>;
    },
  },
  {
    title: '地区',
    dataIndex: 'billing_address',
    valueType: 'text',
    align: 'center',
    render: (_, record) => {
      return <span>{record.country==='CN'?'中国':(record.country==='US'?'美国':'其他')}</span>;
    },
  },
  {
    title: '订阅状态',
    dataIndex: 'subscribed',
    valueType: 'text',
    align: 'center',
    valueEnum: {
      true: {
        text: <Tag color="blue">已订阅</Tag>,
        status: 'true',
      },
      false: {
        text: <Tag color="orange">未订阅</Tag>,
        status: 'false',
      },
    },
  },
  {
    title: '订单数',
    dataIndex: 'order_count',
    valueType: 'text',
    align: 'center',
  },
  {
    title: '订单总金额',
    dataIndex: 'order_total',
    valueType: 'money',
    align: 'center',
  },
];

const Customer = ({ dispatch, user }) => {
  const [filter, setFilter] = useState({});
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true)

  useEffect(async () => {
    const res = await getCustomerHome(filter);
    setData(res.data)
    setLoading(false)
    console.log(filter);
  }, [filter]);
  return (
    <PageHeaderWrapper breadcrumb={false}>
      <Card bordered={false}>
        <div className={styles.searchContent}>
          <ProForm
            onFinish={async (values) => {
              setFilter(values);
              setLoading(true)
            }}
          >
            <ProForm.Group>
              <ProFormSelect
                name="filter[subscribed]"
                placeholder="全部订阅状态"
                width="small"
                valueEnum = {{
                  1: {
                    text: <Tag color="blue">已订阅</Tag>,
                    status: 'true',
                  },
                  0: {
                    text: <Tag color="orange">未订阅</Tag>,
                    status: 'false',
                  }
                }}
              />
              <ProFormSelect
                name="filter[country]"
                placeholder="  全部地区  "
                width="small"
                valueEnum={{
                  CN: {
                    text: <span >中国</span>,
                    status: 'CN',
                  },
                  US: {
                    text: <span >美国</span>,
                    status: 'US',
                  },
                }}
              />
              <ProFormDateRangePicker name="filter[date][]" />
              <ProFormText
                name="filter[search]"
                placeholder="请输入姓名/邮箱/手机"
              />
              &nbsp;&nbsp;
            </ProForm.Group>
          </ProForm>
          </div>
       {loading?<div style={{textAlign:'center'}}>
         <Spin size="large"/>
       </div>:( <ProTable
          columns={columns}
          rowKey={(record) => record.ID}
          dataSource={data}
          toolBarRender={false}
          search={false}
          onRow={(record) => {
            return {
              onClick: () => {
                history.push('CustomerList/Detail/' + record.ID);
              },
            };
          }}
        />)}
      </Card>
    </PageHeaderWrapper>
  );
};
const mapStateProps = ({ customer: { user } }) => {
  return { user };
};
export default connect(mapStateProps)(Customer);
