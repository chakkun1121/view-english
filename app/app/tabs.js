'use client';
import { useState } from 'react';
import NewTab from './newTab';
import { Box, Flex, Heading, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
export default function AppTabs() {
  const [tabs, setTabs] = useState([]);

  return (
    <Tabs variant="enclosed">
      <TabList>
        {tabs.map((item, _) => (
          <Tab>
            <Flex>
              <Box>{item.title}</Box>
            </Flex>
          </Tab>
        ))}
      </TabList>
      <TabPanels>
        {tabs.map((item) => (
          <TabPanel>{item.content}</TabPanel>
        ))}
      </TabPanels>
    </Tabs>
  );
}
