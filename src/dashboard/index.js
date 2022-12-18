import React from 'react';

import 'antd/dist/antd.less';
import 'antd/lib/style/themes/default.less';
import './assets/style/layout.less';
import { store } from './store';
import { Provider } from 'react-redux';

const AgentPage= React.lazy(()=>import('./agent'))

const DashboardIndexPage = () => {
    return (
        <Provider store={store}>
            <AgentPage />
        </Provider>
    )
}

export default DashboardIndexPage