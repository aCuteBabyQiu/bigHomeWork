import React from 'react';
import ProList from '@ant-design/pro-list';
import { getCustomerById } from '@/services/customer';



const CustomerMsg = ({user}) => {
  const {first_name, last_name , user_email ,country, phone , user_registered ,type, order_total ,order_count  } = user  
  const data = [
      {
        title: '姓名', 
        subTitle: first_name + last_name
      },
      {
        title: '电话', 
        subTitle: phone
      },
      {
        title: '地区', 
        subTitle:country 
      },
      {
        title: '邮箱', 
        subTitle: user_email
      },
      {
        title: '顾客类型', 
        subTitle: type==='registered'?'会员':'非会员'
      },
      {
        title: '加入时间', 
        subTitle: user_registered
      },
      {
        title: '总单量', 
        subTitle: order_count
      },
      {
        title: '总消费', 
        subTitle: order_total
      }
  ]

  return (
    <>
      <ProList
        split={true}
        toolBarRender={false}
        metas={{
          title: {
            render: (text) => {
              return (
                <>
                  <a>{text}：</a>
                </>
              );
            },
          },
          subTitle: {},
        }}
        rowKey="title"
        dataSource={data}
      />
    </>
  );
};

export default CustomerMsg;
