import React from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Card, Tabs, Input, Space, Button, PageHeader, Table, Switch, Form, message } from 'antd';
import styles from './index.less';
import TabTwo from './components/Tab2';
import { resetPassword } from '@/services/reset';

const { TabPane } = Tabs;
const paySettingData = ['Username', 'Password', 'Signature'];
//form布局
const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
};
const tailLayout = {
  wrapperCol: { offset: 6, span: 16 },
};
const index = () => {
  const onFinish = (values) => {
    resetPassword(values);
  };
  return (
    <PageHeaderWrapper breadcrumb={false}>
      <Card>
        <Tabs tabPosition="left" defaultActiveKey="1" size="large">
          <TabPane tab="安全设置" key="1">
            <PageHeader title="修改密码">
              <Form {...layout} name="basic" onFinish={onFinish}>
                <Form.Item
                  label="当前密码"
                  name="old_password"
                  rules={[{ required: true, message: 'Please input your oldPassword!' }]}
                >
                  <Input style={{ width: '30%' }} type="password" />
                </Form.Item>
                <Form.Item
                  label="新密码"
                  name="password"
                  rules={[{ required: true, message: 'Please input your newPassword!' }]}
                >
                  <Input style={{ width: '30%' }} type="password" />
                </Form.Item>
                <Form.Item
                  label="确认新密码"
                  name="password_confirmation"
                  rules={[{ required: true, message: 'Please input your confirmPassword!' }]}
                >
                  <Input style={{ width: '30%' }} type="password" />
                </Form.Item>
                <Form.Item {...tailLayout}>
                  <Button type="primary" htmlType="submit">
                    提交
                  </Button>
                </Form.Item>
              </Form>
            </PageHeader>
          </TabPane>

          <TabPane tab="物流设置" key="2">
            <PageHeader title="物流方案">
              <TabTwo />
            </PageHeader>
          </TabPane>

          <TabPane tab="支付设置" key="3">
            <PageHeader title="支付方式">
              <Card>
                <div>
                  <span>快速结账</span>
                </div>
                <br />
                <Space
                  direction="vertical"
                  style={{ padding: '10px 120px 10px 20px' }}
                >
                  <div>
                    <Switch /> <span>sandbox</span>
                  </div>
                  {paySettingData.map((item) => (
                    <Space key={item}>
                      <div className={styles.passDiv}>
                        <span style={{ color: 'red' }}>*</span> {item}:
                      </div>{' '}
                      <Input placeholder="请输入" />
                    </Space>
                  ))}

                  <Button type="primary">绑定</Button>
                </Space>
              </Card>
            </PageHeader>
          </TabPane>
        </Tabs>
      </Card>
    </PageHeaderWrapper>
  );
};

export default index;
