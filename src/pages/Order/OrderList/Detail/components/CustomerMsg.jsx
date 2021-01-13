import React from 'react'
import ProList from '@ant-design/pro-list';


const CustomerMsg = ({user}) => {
    const { billing_address={},billing_user_name } = user
    const {  phone, postcode, email, address_1, state_name } = billing_address
    let address = state_name + address_1

    const data = [
        {
          title: '姓名',
          subTitle: billing_user_name?billing_user_name:'--'
        },
        {
          title: '电话',
          subTitle: phone?phone:'--'
        },
        {
          title: '地址',
          subTitle: address?address:'--'
        },
        {
          title: '邮编',
          subTitle: postcode?postcode:'--',
        },
        {
          title: '邮箱',
          subTitle: email?email:'--',
        },
      ];
    return (
        <>
            <ProList
                split={true}
                toolBarRender={false}
                metas={{
                    title: { render: (text,) =>{
                      return (
                        <>
                          <a>{text}：</a>
                        </>
                      )
                    }},
                    subTitle: {},
                }}
                rowKey={row=>row.title}
                dataSource={data}
            />
        </>
    )
}

export default CustomerMsg;
