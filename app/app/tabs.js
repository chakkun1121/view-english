'use client';
import { v4 as getUUID } from 'uuid';
import { useState } from 'react';
import { Tab } from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Box } from '@mui/system';
import React from 'react';
import NewTab from './newTab';
export default function AppTabs() {
  const [tabs, setTabs] = useState([
    { title: '新しいタブ', type: 'newTab', tabID: `tab-${getUUID()}` },
  ]);
  function newTab() {
    setTabs([...tabs, { title: '新しいタブ', type: 'newTab', tabID: `tab-${getUUID()}` }]);
  }
  const [value, setValue] = React.useState('0');
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <TabContext
      onChange={handleChange}
      aria-label="lab API tabs example"
      value={value}
      sx={{ display: 'flex' }}
    >
      <Box sx={{ background: '#cccccc', padding: 0 }} variant="scrollable" scrollbuttons="auto">
        <TabList>
          {tabs.map((tab, index) => {
            return <Tab label={tab.title} value={index.toString()} key={tab.tabID} />;
          })}
        </TabList>

        <button onClick={newTab}>+</button>
      </Box>
      {tabs.map((tab, index) => {
        if (tab.type === 'newTab') {
          return (
            <TabPanel value={index.toString()} key={tab.tabID}>
              <NewTab />
            </TabPanel>
          );
        }
      })}
    </TabContext>
  );
}
