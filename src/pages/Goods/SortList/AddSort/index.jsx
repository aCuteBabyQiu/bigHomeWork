import React from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Card, Form, Input, Button } from 'antd';
import { Editor } from '@tinymce/tinymce-react';
import { connect, history } from 'umi';
import AddSortPic from './components/AddSortPic';

const index = ({ dispatch }) => {
  //富文本内容
  let content = null;
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

  //表单提交函数
  const onFinish = (values) => {
    history.push('/Goods/SortList/');
    dispatch({
      type: 'category/addCategory',
      payload: {
        values: { ...values, description: content },
      },
    });
  };
  return (
    <PageHeaderWrapper title="新增分类">
      <Form {...layout} name="basic" onFinish={onFinish}>
        <Card>
          <h3>分类名称</h3>
          <Form.Item name="name" rules={[{ required: true }]}>
            <Input style={{ width: '50%' }} placeholder="请输入分类名称" />
          </Form.Item>
          <h3>商品图片</h3>
          <AddSortPic />
          <h3>分类描述</h3>
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
        {/* <Card style={{ marginTop: '15px' }}>
          <h3>关联商品</h3>
        </Card> */}
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
const mapStateToProps = ({ category }) => {
  return {
    categoryList: category.categoryList,
  };
};
export default connect(mapStateToProps)(index);
