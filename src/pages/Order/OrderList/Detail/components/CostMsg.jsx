import React from 'react'
import ProList from '@ant-design/pro-list';


const CostMsg = ({user}) => {
    const {  qty, line_tax, line_total } = user.line_items && user.line_items[0] || {};
    const { cost } = user.shippings&&user.shippings[0] || {}
    const { order_total } = user

    const data = [
        {
          title: '小计',
          subTitle: qty?qty+'项':'--',
          extra:line_total?'¥'+line_total:'--',
        },
        {
          title: '折扣',
          subTitle:line_tax?line_tax:'--',
          extra:line_tax?'¥'+line_tax:'--',
        },
        {
          title: '运费',
          subTitle:cost?cost:'包邮',
          extra:cost?'¥'+cost:'包邮',
        },
        {
          title: '运费险',
          subTitle:'--',
          extra:'¥0',
        },
        {
          title: '总计',
          subTitle:order_total?order_total:'--',
          extra:order_total?'¥'+order_total:'--',
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
            extra: {},
          }}
          rowKey="title"
          dataSource={data}
        />
      </>
    )
}


export default CostMsg;