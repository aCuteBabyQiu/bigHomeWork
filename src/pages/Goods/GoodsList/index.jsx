import React, { useEffect, useState } from 'react';
import { Table, Card, Space, Button, Select, Input, Tag, Form, Row, Col, Modal, Image } from 'antd';
import { connect, Link } from 'umi';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { history } from 'umi';
const { Option } = Select;

const index = ({ dispatch, productData }) => {
  console.log(productData);
  useEffect(() => {
    dispatch({
      type: 'goodList/getProducts',
    });
  }, []);
  //modal弹框
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentId, setCurrentId] = useState();

  const showModal = (values) => {
    setIsModalVisible(true);
    setCurrentId(values);
  };

  const handleOk = () => {
    dispatch({
      type: 'goodList/deleteGood',
      payload: currentId,
    });
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  //form布局
  const layout = {
    labelCol: { span: 2 },
    wrapperCol: { span: 22 },
  };
  const tailLayout = {
    wrapperCol: { offset: 4, span: 20 },
  };
  //传递id
  const jumpRouter = (values) => {
    history.push('./ModifyGood/' + values);
  };
  const columns = [
    {
      title: '商品',
      dataIndex: 'title',
      align: 'left',
      render: (_, record) => {
        return (
          <>
            <Image width={50} src={record.gallery[0]?.url || record.image} />
            <span style={{ marginLeft: '10px' }}>{record.title}</span>
          </>
        );
      },
    },
    {
      title: '分类',
      dataIndex: 'categories[0].name',
      align: 'center',
      render: (_, r) => r.categories[0]?.name,
    },
    {
      title: '状态',
      dataIndex: 'post_status',
      align: 'center',
      render: (_, record) => {
        let res = record.post_status;
        let color = res === 'publish' ? 'green' : 'red';
        let status = res === 'publish' ? '上架中' : '已下架';
        return (
          <Space>
            <Tag color={color} key={record.goodstatus}>
              {status}
            </Tag>
          </Space>
        );
      },
    },
    {
      title: '操作',
      key: 'action',
      align: 'center',
      render: (_, record) => (
        <Space size="middle">
          <Button
            onClick={() => {
              jumpRouter(record.ID);
            }}
          >
            编辑
          </Button>
          <Button
            onClick={() => {
              showModal(record.ID);
            }}
          >
            删除
          </Button>
        </Space>
      ),
    },
  ];

  const data = productData;
  const pagination = {
    pageSize: 5,
  };

  //筛选
  const onFinish = (values) => {
    dispatch({
      type: 'goodList/searchGood',
      payload: values,
    });
  };
  return (
    <PageHeaderWrapper
      title="商品列表"
      extra={[
        <Link to="./AddGood" key="link">
          <Button type="primary" size="large">
            添加商品
          </Button>
        </Link>,
      ]}
      style={{ marginTop: '-25px' }}
    >
      <Card bordered={false}>
        <Modal visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
          <p>是否确认删除本商品</p>
        </Modal>
        <Form {...layout} name="basic" onFinish={onFinish}>
          <Row gutter={10}>
            <Col span={5}>
              <Form.Item name="filter[tag]">
                <Input placeholder="请输入标签" />
              </Form.Item>
            </Col>
            <Col span={5}>
              <Form.Item name="filter[category]">
                <Input placeholder="请输入分类" />
              </Form.Item>
            </Col>
            <Col span={4}>
              <Form.Item name="filter[status]">
                <Select placeholder="选择商品状态" allowClear>
                  <Option value="publish">上架中</Option>
                  <Option value="private">已下架</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={5}>
              <Form.Item name="filter[search]">
                <Input placeholder="请输入商品名或SKU" />
              </Form.Item>
            </Col>
            <Col span={5}>
              <Form.Item {...tailLayout}>
                <Button type="primary" htmlType="submit">
                  查找
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
          rowKey="ID"
        />
      </Card>
    </PageHeaderWrapper>
  );
};
const mapStateToProps = ({ goodList }) => {
  return {
    productData: goodList.productsList.data,
  };
};
export default connect(mapStateToProps)(index);
