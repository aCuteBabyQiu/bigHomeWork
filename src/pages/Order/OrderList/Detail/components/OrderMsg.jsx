import React from 'react'
import { Divider } from 'antd';
import styles from '../index.less'


const OrderMsg = ({user}) => {
    
    const { post_status, 
            number, 
            payment_method_title, 
            post_date ,
            paid_date, 
            note, 
            order_total, 
            trackno, 
            track_date} = user
    const { order_item_id } = user.line_items && user.line_items[0] || {};
        
    return (
        <div className={styles.orderMsg}>
            <div key='订单状态'><a>订单状态：</a>  {post_status==='wc-completed'?'已完成':
            (post_status==='wc-processing'?'进行中':(post_status==='wc-cancelled'?'已取消':'待处理'))}</div>
            <div  key='订单总额'><a>订单总额：</a> ¥{order_total}</div>
            <Divider />
            <div  key='订单编号：'><a>订单编号：</a> {number}</div>
            <div  key='支付编号：'><a>支付编号：</a> {order_item_id}</div>
            <div  key='支付渠道：'><a>支付渠道：</a> {payment_method_title}</div>
            <div  key='生成时间：'><a>生成时间：</a> {post_date}</div>
            <div  key='付款时间：'><a>付款时间：</a> {paid_date}</div>
            <div  key='物流单号：'><a>物流单号：</a> {trackno===null?'无':trackno}</div>
            <div  key='发货时间：'><a>发货时间：</a> {track_date===null?'未发货':track_date}</div>
            <Divider />
            <div key='买家备注：'><a>买家备注：</a> {note}</div>
          </div>
    )
}

export default OrderMsg
