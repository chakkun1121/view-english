'use client';
import { v4 as getUUID } from 'uuid';
import { useState } from 'react';
import { Tab } from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Box } from '@mui/system';
import React from 'react';
import NewTab from './newTab';
import WayakuContent from './wayaku';
import { issueURL } from '../page';
export default function AppTabs() {
  const [tabs, setTabs] = useState([
    { title: '新しいタブ', type: 'newTab', tabID: `tab-${getUUID()}` },
  ]);
  function newTab() {
    setTabs([...tabs, { title: '新しいタブ', type: 'newTab', tabID: `tab-${getUUID()}` }]);
  }
  const [value, setValue] = React.useState('0');
  const handleChange = (_, newValue) => {
    setValue(newValue);
  };
  return (
    <TabContext
      onChange={handleChange}
      aria-label="アプリ本体のタブ部分"
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
        switch (tab.type) {
          case 'newTab':
            return (
              <TabPanel value={index.toString()} key={tab.tabID}>
                <NewTab />
              </TabPanel>
            );
          case 'wayakuFile':
            return (
              <TabPanel value={index.toString()} key={tab.tabID}>
                <WayakuContent fileID={tab.fileID} />
              </TabPanel>
            );
          default:
            return (
              <TabPanel value={index.toString()} key={tab.tabID}>
                <h1>エラー</h1>
                <p>不明なタブタイプです</p>
                <details>
                  <summary>詳細</summary>
                  <p>タブタイプ: {tab.type}</p>
                  <a href={issueURL} target="_target">
                    バグを報告してください。
                  </a>
                </details>
              </TabPanel>
            );
        }
      })}
    </TabContext>
  );
}
