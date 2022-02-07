import * as React from 'react';
import { Route } from 'react-router';
import Layout from './components/Layout';
import Home from './components/Home';

import './custom.css'
import User from './components/User';

export default () => (
    <Layout>
        <Route exact path='/' component={Home} />
        <Route path='/user' component={User} />
    </Layout>
);
