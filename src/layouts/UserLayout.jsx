import { DefaultFooter, getMenuData, getPageTitle } from '@ant-design/pro-layout';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import {  SelectLang, useIntl, connect  } from 'umi';
import React from 'react';
import styles from './UserLayout.less';
import { Card,Space } from 'antd'

const UserLayout = (props) => {
  const {
    route = {
      routes: [],
    },
  } = props;
  const { routes = [] } = route;
  const {
    children,
    location = {
      pathname: '',
    },
  } = props;
  const { formatMessage } = useIntl();
  const { breadcrumb } = getMenuData(routes);
  const title = getPageTitle({
    pathname: location.pathname,
    formatMessage,
    breadcrumb,
    ...props,
  });
  return (
    <HelmetProvider>
        <Helmet>
          <title>{title}</title>
          {/* <meta name="description" content={title} /> */}
        </Helmet>
        <div className={styles.container}>
          <div className={styles.lang}>
            <SelectLang />
          </div>
          <Card className={styles.userCard}>
            <Space className={styles.contentLeft} >
              {children}
            </Space>
          </Card>
          {/* <DefaultFooter /> */}
        </div>
    </HelmetProvider>
  );
};

export default connect(({ settings }) => ({ ...settings }))(UserLayout);
