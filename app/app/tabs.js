'use client';
import { v4 as getUUID } from 'uuid';
import { useState } from 'react';
import { Tab } from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Box } from '@mui/system';
import NewTab from './newTab';
export default function AppTabs() {
  const [tabs, setTabs] = useState([
    { title: '新しいタブ', type: 'newTab', tabID: `tab-${getUUID()}` },
  ]);
  function newTab() {
    setTabs([...tabs, { title: '新しいタブ', type: 'newTab', tabID: `tab-${getUUID()}` }]);
  }
  return (
    <TabContext>
      <Box>
        <TabList
          sx={{ background: '#cccccc', padding: 0 }}
          variant="scrollable"
          scrollButtons="auto"
        >
          {tabs.map((tab) => {
            return <Tab label={tab.title} value={tabs.tabID} />;
          })}
          <button onClick={newTab}>+</button>
        </TabList>
      </Box>
      {tabs.map((tab) => {
        if (tab.type === 'newTab') {
          return (
            <TabPanel value={tabs.tabID}>
              <NewTab />
            </TabPanel>
          );
        }
      })}
    </TabContext>
  );
}
