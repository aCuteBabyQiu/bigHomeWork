import React, { useEffect, useState } from 'react';
import ProCard from '@ant-design/pro-card';
import ProTable from '@ant-design/pro-table';
import { TinyColumn, TinyLine, Progress, Column, TinyArea ,Line,Liquid,Area} from '@ant-design/charts';
import { InfoCircleOutlined } from '@ant-design/icons';
import { Statistic, DatePicker, Spin } from 'antd';
import styles from './Welcome.less';
import { connect } from 'umi'
import moment from 'moment'

const { RangePicker } = DatePicker;

const index = ({ dispatch, orders, sales, visitors, hots, salesNow, visitorsNow, report }) => {
  const [ range, setRange ] = useState({ 'filter[start]': '2020-09-07 00:00', 'filter[end]': '2020-09-17 00:00' })
  const [ bol, setBol ] = useState(false)
  const [ loading , setLoading ] = useState(true)
  useEffect(async() => 
 { await dispatch({
    type:"reports/queryData",
    payload: range  
  })
  await dispatch({
    type:"reports/queryReports",
    payload: range  
  })
  setLoading(false)
  }
  , [bol]);

  useEffect(async() => 
  { 
    let today = new Date()
    let yesterday = new Date(today.getTime() - 24*60*60*1000); 
    let dateNow = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate()
    let dateYes = yesterday.getFullYear() + '-' + (yesterday.getMonth() + 1) + '-' + yesterday.getDate()
    let nowRange = { 'filter[start]': dateYes, 'filter[end]': dateNow }
    await dispatch({
     type:"reports/queryNowData",
     payload: nowRange  
   })
  }
   , []);
  
  let visitCount = 0
  let saleCount = 0
  let orderCount = 0
  let data1 = []
  let data2 = []
  let dailyVisData = []
  let dailySaleData = []
  let randomColor = function(){
    switch(Math.ceil(Math.random()*10)){
      case 1:
        return '#ff7979';
      case 2:
        return '#badc58';
      case 3:
        return '#f9ca24';
      case 4:
        return '#e056fd';
      case 5:
        return '#7ed6df';
      case 6:
        return '#95afc0';
      case 7:
        return '#ffbe76';
      case 8:
        return '#00d2d3';
      case 9:
        return '#2e86de';
      case 10:
        return '#5f27cd'; 
      default:
        return '#5f27cd';    
    } 
  }
  let chartColor = '#badc58'
  let tilColor = '#ffffff';

  const CountVis = () => {
    visitors.map(item => {
      visitCount = visitCount*1 + item.value*1
      data1.push(item.value)
    }) 
  }
  const CountSale = () => {
    sales.map(item => {
      saleCount = saleCount*1 + item.value
    })
  }
  const CountOrders = () => {
    orders.map(item => {
      orderCount = orderCount*1 + item.value
      data2.push(item.value)
    })
  }
  const SortOrders = (array) => {
    for (let i=array.length;i>0;i--){
      for (let j=0;j<i;j++){
          if (array[j]?.count<array[j+1]?.count){
              var temp=array[j];
              array[j]=array[j+1];
              array[j+1]=temp;
          }
      }
  }
     return array;
  }
  const handleSelectTime = (value, dateString) => {
    console.log('选择的时间：', dateString)
    let date = { 'filter[start]': dateString[0], 'filter[end]': dateString[1] };
    setRange(date)
    setBol(true)
    
  }

  CountVis()
  CountSale()
  CountOrders()
  SortOrders(hots)
;
  
  var config1 = {
    height: 60,
    width: 220,
    autoFit: false,
    data: data1,
    color:randomColor,
    tooltip: {
      customContent: function customContent(x, data) {
        var _data$, _data$$data;
        return 'NO.'
          .concat(x, ': ')
          .concat(
            (_data$ = data[0]) === null || _data$ === void 0
              ? void 0
              : (_data$$data = _data$.data) === null || _data$$data === void 0
              ? void 0
              : _data$$data.y.toFixed(2),
          );
      },
    },
  };

  var config2 = {
    height: 60,
    width: 220,
    autoFit: false,
    data: data2,
    smooth: true,
    areaStyle: { fill: chartColor },
  };

  var config3 = {
    percent: 0.76,
    height:80,
    padding:0,
    autoFit: false,
    smooth: false,
    color:randomColor,
    statistic: {
      title: {
        formatter: function formatter() {
          return '订单发货率';
        },
        style: {
          fontSize: 12,
          fill: tilColor
        },
      },
      content: {
        style: {
          fontSize: 12,
          fill: tilColor
        }
      }
    },
  };

  var config4 = {
    data: orders,
    xField: 'datetime',
    yField: 'value',
    xAxis: {
      type: 'timeCat',
      tickCount: 5,
    },
    smooth:false,
    meta: {
      datetime: { alias: '日期' },
      value: { alias: '销售额' },
    },
    areaStyle: { 
      fill: '#1dd1a1',
      fillOpacity: 0.5,
      stroke: 'black', 
      strokeOpacity: 0.7,
    },
  };
  var config5 = {
    data: visitorsNow,
    smooth:true,
    padding: 'auto',
    xField: 'datetime',
    yField: 'value',   
};
var config6 = {
  data: salesNow,
  padding: 'auto',
  smooth:true,
  xField: 'datetime',
  yField: 'value',
};

  const columns = [
    {
      dataIndex: 'index',
      valueType: 'indexBorder',
      align:'center'
    },
    {
      dataIndex: 'title',
      valueType: 'text',
      align:'center'
    },
    {
      dataIndex: 'count',
      valueType: 'text',
      align:'center'
    }

  ]


  return (
    <>
     {loading?<div style={{textAlign:'center'}}><Spin size="large" /></div>:( <div>
        <ProCard gutter={15} ghost style={{ position: 'relative' }}>
          <ProCard colSpan={6} layout="default" bordered >
            <Statistic
              title={
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>总销售额</span>
                  <InfoCircleOutlined />
                </div>
              }
              value={saleCount}
              precision={2}
              style={{height:50 ,marginBottom:20}}
            />
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                height:80
              }}
            >
              <div style={{ display: 'flex', margin:' 30px 0'}}>
                周同比<div className={styles.triangleUp}></div> 12%
              </div>
              <div style={{ display: 'flex', margin:' 30px 0' }}>
                日环比<div className={styles.triangleDown}></div> 11%
              </div>
            </div>
            <div style={{ borderTop: '1px solid #000' }}>
              <div style={{marginTop:10}}>日均销售额:  &nbsp;&nbsp;{(saleCount/sales.length).toFixed(2)}</div>
            </div>
          </ProCard>
          <ProCard colSpan={6} layout="default" bordered>
            <Statistic
              title={
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>订单数量</span>
                  <InfoCircleOutlined />
                </div>
              }
              value={orderCount}
              style={{height:50 ,marginBottom:20}}
            />
            <TinyArea {...config2} style={{height:80 }} />
            <div style={{ marginTop: 0, borderTop: '1px solid #000' }}>
              <div style={{marginTop:10}}>日均订单量：&nbsp;&nbsp;{Math.floor(orderCount/orders.length)}</div>
            </div>
          </ProCard>
          <ProCard colSpan={6} layout="default" bordered>
            <Statistic
              title={
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>访问总数</span>
                  <InfoCircleOutlined />
                </div>
              }
              precision={2}
              value={visitCount}
              style={{height:50 ,marginBottom:20}}
            />
            <TinyColumn {...config1} style={{height:80 }} />
            <div style={{ borderTop: '1px solid #000' }}>
              <div style={{marginTop:10}}>日均访问数: &nbsp;&nbsp;{Math.floor(visitCount/visitors.length)}</div>
            </div>
          </ProCard>
          <ProCard colSpan={6} layout="default" bordered>
            <Statistic
              title={
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>未发货订单数</span>
                  <InfoCircleOutlined />
                </div>
              }
              value={93}
              style={{height:50 ,marginBottom:20}}
            />
            <div style={{height:80 }}>
            {/* style={{paddingTop:25}} */}
              <Liquid {...config3}  />
            </div>        
            <div style={{ borderTop: '1px solid #000' }}>
              <div style={{marginTop:10}}>发货完成率：&nbsp;&nbsp;76%</div>
            </div>
          </ProCard>
        </ProCard>

        <ProCard  style={{ marginTop: 15 }} tabs={{ activeKey: 'tab1' }}>
          <ProCard.TabPane key="tab1" tab="订单趋势">
            <ProCard
              colSpan={16}
              title={<span style={{ fontWeight: '700' }}>订单增长趋势</span>}
            >
              <Area {...config4}  />
            </ProCard>
            <ProCard colSpan={8} style={{position: 'relative'}}  title={<span style={{ fontWeight: '700' }}>商品销售数排行</span>}>
              <RangePicker 
                style={{position: 'absolute', top:'-65px', right:0}}
                allowClear={false} 
                onChange={handleSelectTime}
                showTime={{ format: 'HH:mm' }}
                format="YYYY-MM-DD HH:mm"
                defaultValue={[moment('2020-09-07 00:00', 'YYYY-MM-DD HH:mm'), moment(`2020-09-17 00:00`, 'YYYY-MM-DD HH:mm')]}
                
              />
              <ProTable
                dataSource={hots}
                columns={columns}
                search={false}
                toolBarRender={false}
                pagination={{pageSize:5}}
                rowKey={record=>record.title}
                showHeader={false}
                
              />
            </ProCard>
          </ProCard.TabPane>
        </ProCard>

        <ProCard style={{ marginTop: 15 }} gutter={15} ghost>
        <ProCard colSpan={12} bordered layout="center" tabs={{ activeKey: 'tab2' }}>
          <ProCard.TabPane key="tab2" tab="用户日增长">
            <ProCard colSpan={16}  title={<span>昨日新增用户数</span>} style={{ height: 200 }}>
              <Line {...config5}  />
            </ProCard>
          </ProCard.TabPane>
        </ProCard>

        <ProCard colSpan={12} bordered layout="center" tabs={{ activeKey: 'tab3' }}>
          <ProCard.TabPane key="tab3" tab="销售额日增长">
            <ProCard colSpan={16} title={<span>今日销售额</span>} style={{ height: 200 }}>
              <Line {...config6}  />
            </ProCard>
          </ProCard.TabPane>
        </ProCard>
      </ProCard>
      </div>)}
    </>
  );
};


const mapStateProps = ({ reports:{orders, sales, visitors, hots, report ,salesNow ,visitorsNow} }) => {
  return { orders, sales, visitors, hots, report ,salesNow ,visitorsNow};
};
export default connect(mapStateProps)(index);
