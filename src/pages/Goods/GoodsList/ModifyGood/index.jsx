import React, { useEffect, useState } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Card, Form, Input, Button, Radio, Select, Spin } from 'antd';
import { PayCircleOutlined } from '@ant-design/icons';
import { Editor } from '@tinymce/tinymce-react';
import { connect, history } from 'umi';
import ModGoodPic from './components/ModGoodPic';

const index = ({ dispatch, record, usefulRecord, loading, match, tempId, tempId2, submitImg }) => {
  //富文本赋初值
  const [title, setTitle] = useState(null);
  //标签分类赋初值
  const [tags, setTags] = useState([]);
  const [categories, setCategories] = useState([]);
  const [categoryId, setCategoryId] = useState([]);
  const [tagsId, setTagsId] = useState([]);
  //获得页面初始化数据
  useEffect(() => {
    dispatch({
      type: 'goodList/getGood',
      payload: {
        id: match.params.id,
      },
    });
  }, []);
  //初始化数据赋值页面
  useEffect(() => {
    form.setFieldsValue(record);
    setTitle(record?.post_content);
    setTags(
      usefulRecord?.tags.map((item) => {
        return item.name;
      }),
    );
    setCategories(
      usefulRecord?.categories.map((item) => {
        return item.name;
      }),
    );
    setCategoryId(
      usefulRecord?.categories.map((item) => {
        return { id: item.id };
      }),
    );
    setTagsId(
      usefulRecord?.tags.map((item) => {
        return { id: item.id };
      }),
    );
  }, [record]);
  //表单方法声明
  const [form] = Form.useForm();
  //标签多选器
  let children = tags;
  const toChildren_1 = async (value) => {
    let values = String(value);
    children = values.split(',');
    if (children.length > tagsId.length) {
      const tag_ = await dispatch({
        type: 'goodList/createGoodTagsId',
        payload: { name: children[children.length - 1] },
      });
      setTagsId([...tagsId, { id: tag_.id }]);
    } else if (children.length < tagsId.length) {
      let tempTags = JSON.parse(JSON.stringify(tagsId));
      tempTags.splice(tempTags.length - 1, 1);
      setTagsId(tempTags);
    }
  };
  //分类多选器
  let children2 = categories;
  const toChildren_2 = async (value) => {
    let values_2 = String(value);
    children2 = values_2.split(',');
    if (children2.length > categoryId.length) {
      const tag2_ = await dispatch({
        type: 'goodList/createGoodCategoryId',
        payload: { name: children2[children2.length - 1] },
      });
      setCategoryId([...categoryId, { id: tag2_.id }]);
    } else if (children2.length < categoryId.length) {
      let tempCategory = JSON.parse(JSON.stringify(categoryId));
      tempCategory.splice(tempCategory.length - 1, 1);
      setCategoryId(tempCategory);
    }
  };
  //提交表单
  const onFinish = (values) => {
    history.push('/Goods/GoodsList/');
    dispatch({
      type: 'goodList/updateGood',
      payload: {
        params: {
          ...values,
          content: title,
          gallery: submitImg,
          categories: categoryId,
          tags: tagsId,
        },
        id: usefulRecord.ID,
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
    <Spin spinning={loading}>
      <PageHeaderWrapper title="编辑商品">
        <Form {...layout} name="basic" form={form} onFinish={onFinish}>
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
            {!loading && (
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
            )}
            {!loading && (
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
            )}
            <Form.Item name="post_status" label="是否上架">
              <Radio.Group>
                <Radio value="publish">上架</Radio>
                <Radio value="private">下架</Radio>
              </Radio.Group>
            </Form.Item>

            <div style={{ marginBottom: '10px', marginLeft: '31px' }}>商品图片:</div>
            {!loading && <ModGoodPic />}
          </Card>
          <Card style={{ marginTop: '15px' }}>
            <h3>商品详情</h3>
            {(title || title === '') && !loading && (
              <Editor
                apiKey="le7m6pa3qo2m11ndjkq0jwkxezfw0n3vtrv19ql58732b55f"
                initialValue={title}
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
                onEditorChange={(values) => {
                  setTitle(values);
                }}
              />
            )}
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
    </Spin>
  );
};
const mapStateToProps = ({ goodList, loading }) => {
  return {
    record: goodList.recordShow,
    usefulRecord: goodList.usefulRecord,
    tempId: goodList.tempId,
    tempId2: goodList.tempId2,
    submitImg: goodList.submitImg,
    loading: loading.effects['goodList/getGood'],
  };
};
export default connect(mapStateToProps)(index);
