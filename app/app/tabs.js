'use client';
import { useState } from 'react';
import { Tab, Tabs } from '@mui/material';
import { Box } from '@mui/system';
import NewTab from './newTab';
export default function AppTabs() {
  const [tabs, setTabs] = useState([]);
  const [tabIndex, setTabIndex] = useState(0);
  const handleTabChange = (_, newTabIndex) => {
    setTabIndex(newTabIndex);
  };
  return (
    <Box>
      <Box sx={{ background: '#cccccc' }}>
        <Tabs value={tabIndex} onChange={handleTabChange} variant="scrollable" scrollButtons="auto">
          <Tab label="ホーム" />
          {tabs.map((tab) => {
            return <Tab label={tab.title} key={tab.tabID} />;
          })}
        </Tabs>
      </Box>
      {tabIndex === 0 ? <NewTab /> : tabs[tabIndex - 1].contents}
    </Box>
  );
}
