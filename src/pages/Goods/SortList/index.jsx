import React, { useEffect, useState } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Table, Card, Space, Button, Select, Input, Form, Row, Col, Modal, Image } from 'antd';
import { Link, connect, history } from 'umi';
const { Option } = Select;

const index = ({ categoryList, dispatch }) => {
  useEffect(() => {
    dispatch({
      type: 'category/getCategoryList',
    });
  }, []);
  //删除弹出框
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentId, setCurrentId] = useState();
  const showModal = (values) => {
    setIsModalVisible(true);
    setCurrentId(values);
  };

  const handleOk = () => {
    dispatch({
      type: 'category/deleteCategory',
      payload: currentId,
    });
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const columns = [
    {
      title: '分类',
      dataIndex: 'name',
      align: 'left',
      render: (_, record) => {
        return (
          <>
            <Image width={50} src={record.thumbnail_url} />
            <span style={{ marginLeft: '10px' }}>{record.name}</span>
          </>
        );
      },
    },
    {
      title: '商品数量',
      dataIndex: 'count',
      align: 'center',
    },
    {
      title: '操作',
      key: 'action',
      align: 'center',
      render: (_, record) => (
        <Space size="middle">
          <Button
            onClick={() => {
              history.push('./ModifySort/' + record.id);
            }}
          >
            编辑
          </Button>
          <Button
            onClick={() => {
              showModal(record.id);
            }}
          >
            删除
          </Button>
        </Space>
      ),
    },
  ];

  const data = categoryList;
  const pagination = {
    pageSize: 5,
  };
  //form布局
  const layout = {
    labelCol: { span: 2 },
    wrapperCol: { span: 22 },
  };
  const tailLayout = {
    wrapperCol: { offset: 4, span: 20 },
  };
  //查找分类按钮
  const onFinish = (values) => {
    dispatch({
      type: 'category/searchCategory',
      payload: values,
    });
  };
  return (
    <PageHeaderWrapper
      title="分类列表"
      extra={[
        <Link to="./AddSort" key="link">
          <Button type="primary" size="large">
            新增分类
          </Button>
        </Link>,
      ]}
      style={{ marginTop: '-25px' }}
    >
      <Card bordered={false}>

        <Modal visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
          <p>是否确认删除本分类</p>
        </Modal>
        <Form {...layout} name="basic" onFinish={onFinish}>
          <Row gutter={10}>
            <Col span={6}>
              <Form.Item name="filter[name]">
                <Input placeholder="请输入分类名称" />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item {...tailLayout}>
                <Button type="primary" htmlType="submit">
                  查询
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>


        <Table
          columns={columns}
          dataSource={data}
          rowSelection
          pagination={pagination}
          rowKey="id"
        />
      </Card>
    </PageHeaderWrapper>
  );
};
const mapStateToProps = ({ category }) => {
  return {
    categoryList: category.categoryList.data,
  };
};
export default connect(mapStateToProps)(index);
