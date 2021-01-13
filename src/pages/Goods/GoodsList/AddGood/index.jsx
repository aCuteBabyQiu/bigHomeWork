import React from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Card, Form, Input, Button, Radio, Select } from 'antd';
import { PayCircleOutlined } from '@ant-design/icons';
import { Editor } from '@tinymce/tinymce-react';
import { connect, history } from 'umi';
import AddGoodPic from './components/AddGoodPic';

const index = ({ dispatch, submitImg }) => {
  let content = null;

  //标签多选器
  let children = [];
  const toChildren_1 = (value) => {
    let values = String(value);
    children = values.split(',');
    console.log(children);
  };

  //分类多选器
  let children2 = [];
  const toChildren_2 = (value) => {
    let values_2 = String(value);
    children2 = values_2.split(',');
    console.log(children2);
  };
  //提交表单
  const onFinish = (values) => {
    history.push('/Goods/GoodsList/');
    dispatch({
      type: 'goodList/addGood',
      payload: {
        values: { ...values, content: content },
      },
    });
  };
  //form布局
  const layout = {
    labelCol: {
      span: 2,
    },
    wrapperCol: {
      span: 22,
    },
  };
  const tailLayout = {
    wrapperCol: {
      offset: 8,
      span: 16,
    },
  };
  return (
    <PageHeaderWrapper title="添加商品">
      <Form {...layout} name="basic" onFinish={onFinish}>
        <Card>
          <h3>基础信息</h3>
          <Form.Item label="商品名称" name="title" rules={[{ required: true }]}>
            <Input style={{ width: '50%' }} placeholder="请输入商品名称，最多255个字符" />
          </Form.Item>
          <Form.Item label="价格" name="price" rules={[{ required: true }]}>
            <Input
              style={{ width: '20%' }}
              placeholder="请输入商品售价"
              prefix={<PayCircleOutlined />}
            />
          </Form.Item>
          <Form.Item label="原价" name="regular_price">
            <Input style={{ width: '20%' }} placeholder="请输入划线价" />
          </Form.Item>
          <Form.Item label="SKU" name="sku" rules={[{ required: true }]}>
            <Input style={{ width: '50%' }} placeholder="请输入商品SKU" />
          </Form.Item>
          <Form.Item name="manage_stock" label="管理库存" rules={[{ required: true }]}>
            <Radio.Group>
              <Radio value="yes">是</Radio>
              <Radio value="no">否</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item label="商品分类">
            <Select
              mode="tags"
              open={false}
              style={{ width: '50%' }}
              placeholder="+ 添加分类"
              onChange={toChildren_2}
              defaultValue={children2}
            >
              {children2}
            </Select>
          </Form.Item>
          <Form.Item label="商品标签">
            <Select
              mode="tags"
              open={false}
              style={{ width: '50%' }}
              placeholder="+ 添加标签"
              onChange={toChildren_1}
              defaultValue={children}
            >
              {children}
            </Select>
          </Form.Item>
          <Form.Item name="post_status" label="是否上架">
            <Radio.Group>
              <Radio value="publish">上架</Radio>
              <Radio value="private">下架</Radio>
            </Radio.Group>
          </Form.Item>
          <div style={{ marginBottom: '10px', marginLeft: '31px' }}>商品图片:</div>
          <AddGoodPic />
        </Card>
        <Card style={{ marginTop: '15px' }}>
          <h3>商品详情</h3>
          <Editor
            apiKey="le7m6pa3qo2m11ndjkq0jwkxezfw0n3vtrv19ql58732b55f"
            initialValue={content}
            init={{
              height: 300,
              language: 'zh_CN',
              menubar: false,
              plugins: [
                'advlist autolink lists link image',
                'charmap print preview anchor help',
                'searchreplace visualblocks code',
                'insertdatetime media table paste wordcount',
              ],
              toolbar:
                'undo redo | formatselect | bold italic | link image | \
                      alignleft aligncenter alignright | \
                      bullist numlist outdent indent | help',
            }}
            onEditorChange={(value) => {
              content = value;
            }}
          />
        </Card>
        <Card
          style={{
            position: 'fixed',
            bottom: '0px',
            right: '0px',
            width: '100%',
            height: '80px',
          }}
        >
          <Form.Item {...tailLayout}>
            <Button type="primary" htmlType="submit">
              提交
            </Button>
          </Form.Item>
        </Card>
      </Form>
    </PageHeaderWrapper>
  );
};
const mapStateToProps = ({ goodList }) => {
  return {
    submitImg: goodList.submitImg,
  };
};
export default connect(mapStateToProps)(index);
