'use client';
import { v4 as getUUID } from 'uuid';
import { useState } from 'react';
import { Tab, Tabs } from '@mui/material';
export default function AppTabs() {
  const [tabs, setTabs] = useState([
    { title: '新しいタブ', type: 'newTab', tabID: `tab-${getUUID()}` },
  ]);
  function newTab() {
    setTabs([...tabs, { title: '新しいタブ', type: 'newTab', tabID: `tab-${getUUID()}` }]);
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
