import React from 'react';
import { Divider, List, Space } from 'antd';
import { ModalForm } from '@ant-design/pro-form';
import styles from '../index.less';

const Address = ({ user }) => {
  const { address_book = [{}] } = user;
  console.log(address_book, '123');
  const { first_name, last_name, phone, postcode, address_1 } = address_book[0] || {};

  return (
    <>
      <div>
        <div
          key="姓名#"
          style={{ marginBottom: 15, display: 'flex', justifyContent: 'space-between' }}
        >
          <div>
            <a>姓名：</a> {first_name + last_name || '--'}
          </div>
          <div className={styles.defaultAdd}>默认地址</div>
        </div>
        <div key="电话#" style={{ marginBottom: 15 }}>
          <a>电话：</a> {phone}
        </div>
        <div key="地址#" style={{ marginBottom: 15 }}>
          <a>地址：</a> {address_1}
        </div>
        <div key="邮箱#" style={{ marginBottom: 15 }}>
          <a>邮箱：</a> {postcode}
        </div>
        <Divider />

        <ModalForm
          title="收货地址"
          trigger={
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <a>更多地址</a>
            </div>
          }
          modalProps={{
            onCancel: () => console.log('run'),
          }}
          onFinish={(values) => {
            return true;
          }}
        >
          <List
            dataSource={address_book}
            renderItem={(item, index) => (
              <List.Item key={index+'#'}>
                <Space direction="vertical">
                  <h3>收货地址{index + 1}</h3>
                  <div
                    style={{ display: 'flex', justifyContent: 'space-between' }}
                  >
                    <div>
                      <a>姓名：</a> {item.first_name + item.last_name || '--'}
                    </div>
                    <div style={{position:'relative'}}>
                      <div 
                        className={index===0?styles.defaultAdd:styles.empty} 
                        style={{position:'absolute',left:560}}>
                          默认地址
                      </div>
                    </div>
                    
                  </div>

                  <div>
                    <a>电话：</a> {item.phone}
                  </div>
                  <div>
                    <a>地址：</a> {item.address_1}
                  </div>
                  <div>
                    <a>邮编：</a> {item.postcode}
                  </div>
                </Space>
              </List.Item>
            )}
          />
        </ModalForm>
      </div>
    </>
  );
};

export default Address;
