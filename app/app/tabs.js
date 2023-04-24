'use client';
import uuid from 'uuid';
import { useState } from 'react';
import { Tab, Tabs } from '@mui/material';
export default function AppTabs() {
  console.log(typeof `tab-${uuid.v4()}`);
  const [tabs, setTabs] = useState([
    { title: '新しいタブ', type: 'newTab', tabID: `tab-${uuid.v4()}` },
  ]);
  function newTab() {
    setTabs([...tabs, { title: '新しいタブ', type: 'newTab', tabID: `tab-${uuid.v4()}` }]);
  }
  return (
    <Tabs sx={{ background: '#cccccc', padding: 0 }} variant="scrollable" scrollButtons="auto">
      {tabs.map((tab) => {
        return <Tab label={tab.title} />;
      })}
      <button onClick={newTab}>+</button>
    </Tabs>
  );
}
