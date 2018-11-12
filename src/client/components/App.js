
import React from 'react';

import PageHeader from './PageHeader';
import Register from './Register';
import LinkList from './LinkList';

class App extends React.Component {
  render() {
    return (
      <div>
        <PageHeader />
        <Register />
        <LinkList />
      </div>
    );
  }
}

export default App;