import React, { useState, useEffect } from 'react';
import ProCard from '@ant-design/pro-card';
import { Button, Spin } from 'antd';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { ModalForm, ProFormText, ProFormCheckbox } from '@ant-design/pro-form';
import { PlusOutlined } from '@ant-design/icons';
import { connect } from 'umi';
import styles from './index.less';
import GoodMsg from './components/GoodMsg';
import CustomerMsg from './components/CustomerMsg';
import CostMsg from './components/CostMsg';
import OrderMsg from './components/OrderMsg';

const index = ({ user, dispatch, match }) => {
  const [loading, setLoading] = useState(true)
  useEffect(async() => {
    await dispatch({
      type: 'order/getDetail',
      payload: {
        id: match.params.id,
      },
    });
    setLoading(false)
  }, [reload]);
  const { reload , setRelaod } = useState(false)
  const { post_status, ID } = user;
  const [checked, setIsChecked] = useState(false);
  return (
    <PageHeaderWrapper title="订单详情" breadcrumb={false}>
      <ModalForm
        title="发货"
        trigger={
          <div style={{ position: 'relative' }}>
            <Button
              type="primary"
              disabled={post_status !== 'wc-processing'}
              style={{ position: 'absolute', right: 25, top: -15 }}
            >
              <PlusOutlined />
              发货
            </Button>
          </div>
        }
        modalProps={{
          onCancel: () => console.log('run'),
        }}
        onFinish={(values) => {
          const { express } = values;
          if (values.checkbox) {
            setIsChecked(true);
          }
          dispatch({
            type: 'order/updateOrderStatus',
            payload: {
              params: ID,
              params2: { trackno: express, sendemail: checked },
            },
          });
          setReload(!reload)
          return true;
        }}
      >
        <div style={{ display: 'flex' }}>
          <span style={{ fontSize: 18 }}>物流单号：</span>
          <ProFormText width="lg" name="express" placeholder="请输入物流单号" />
        </div>
        <ProFormCheckbox.Group name="checkbox" options={['发消息给客户']} />
      </ModalForm>
      {loading?<div style={{textAlign:'center'}}>
         <Spin size="large"/>
       </div>:(<ProCard gutter={15} className={styles.bgcAll} bordered>
        <ProCard split="horizontal" colSpan="65%" className={styles.bgcLeft} bordered>
          <ProCard title="订单总览" style={{ marginBottom: 15 }} bordered>
            <GoodMsg user={user} />
          </ProCard>
          <ProCard title="费用总览" style={{ marginBottom: 15 }} bordered>
            <CostMsg user={user} />
          </ProCard>
          <ProCard title="收货地址" style={{ marginBottom: 15 }} bordered>
            <CustomerMsg user={user} />
          </ProCard>
        </ProCard>
        <ProCard title="订单信息" className={styles.orderRight} bordered>
          <OrderMsg user={user} />
        </ProCard>
      </ProCard>)}
    </PageHeaderWrapper>
  );
};

const mapStateProps = ({ order: { user } }) => {
  return {
    user,
  };
};

export default connect(mapStateProps)(index);
