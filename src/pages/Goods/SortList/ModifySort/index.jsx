import React, { useEffect, useState } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Card, Form, Input, Button, Image, Spin } from 'antd';
import { Editor } from '@tinymce/tinymce-react';
import { connect, history } from 'umi';

const index = ({ record, dispatch, match, loading }) => {
  //富文本赋初值
  const [url, setUrl] = useState('');
  const [title, setTitle] = useState(null);
  const [form] = Form.useForm();
  useEffect(async () => {
    await dispatch({
      type: 'category/getCategory',
      payload: {
        id: match.params.id,
      },
    });
  }, []);
  useEffect(() => {
    form.setFieldsValue(record);
    setTitle(record?.description);
    setUrl(record?.thumbnail_url);
  }, [record]);

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
      type: 'category/updateCategory',
      payload: {
        values: { ...values, description: title },
        id: record.id,
      },
    });
  };
  return (
    <Spin spinning={loading}>
      <PageHeaderWrapper title="编辑分类">
        <Form {...layout} name="basic" form={form} onFinish={onFinish}>
          <Card>
            <h3>分类名称</h3>
            <Form.Item
              name="name"
              rules={[
                {
                  required: true,
                  message: '请输入分类名称',
                },
              ]}
            >
              <Input style={{ width: '50%' }} placeholder="请输入分类名称" />
            </Form.Item>
            <h3>商品图片</h3>
            <Image width={100} src={url} placeholder={true} />
            {/* <Button style={{ marginLeft: '10px' }}>更换图片</Button> */}
            <h3 style={{ marginTop: '10px' }}>分类描述</h3>
            {(title || title === '') && !loading && (
              <Editor
                apiKey="le7m6pa3qo2m11ndjkq0jwkxezfw0n3vtrv19ql58732b55f"
                initialValue={record.description}
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
                  setTitle(value);
                }}
              />
            )}
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
    </Spin>
  );
};
const mapStateToProps = ({ category, loading }) => {
  return {
    record: category.record,
    loading: loading.effects['category/getCategory'],
  };
};
export default connect(mapStateToProps)(index);
