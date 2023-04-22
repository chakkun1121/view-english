'use client';
import { useState } from 'react';
import { Tab, Tabs } from '@mui/material';
export default function AppTabs() {
  const [tabs, setTabs] = useState([{ title: '新しいタブ', type: 'newTab' }]);
  return (
    <Tabs sx={{ background: '#cccccc', padding: 0 }} variant="scrollable" scrollButtons="auto">
      {tabs.map((tab) => {
        return <Tab label={tab.title} />;
      })}
    </Tabs>
  );
}
