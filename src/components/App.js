import React from 'react';
import TopNavBar from './TopNavBar';
//import component
import Main from './Main';

function App() {
  return (
    <div className="App">
<TopNavBar />
<Main />
    </div>
  );
}
// <TopNavBar /> in js file, to initiate component.
export default App;

//如何对component布局: react router。目前,从data communication考虑component布局。