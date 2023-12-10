import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import SetUp from "./components/SetUp";
import PlannedWellPath from "./components/PlannedWellPath";
import Interpolate from "./components/Interpolate";
import Comparison from "./components/Comparison"
import ActualWellPath from './components/ActualWellPath';
import AddNew from './components/ActualWellPath/AddNew'
import EditNew from './components/ActualWellPath/EditNew'
import DelNew from './components/ActualWellPath/DelNew'
import { useMatchStore } from './store/store';

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs() {
  const [value, setValue] = React.useState(0);
  const { open } = useMatchStore();
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box component="main" maxWidth={"1920px"} marginInline={"auto"} >
      {(open.text === 'Add') && <AddNew />}
      {(open.text === 'Edit') && <EditNew />}
      {(open.text === 'Remove') && <DelNew />}
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} variant='scrollable' allowScrollButtonsMobile aria-label="basic tabs example">
          <Tab label="Set Up" sx={{ fontSize: "16px" }}  {...a11yProps(0)} />
          <Tab label="Planned Well Path" sx={{ fontSize: "16px" }}  {...a11yProps(1)} />
          <Tab label="Interpolate" sx={{ fontSize: "16px" }}  {...a11yProps(2)} />
          <Tab label="Actual Well Path" sx={{ fontSize: "16px" }}  {...a11yProps(3)} />
          <Tab label="Comparison" sx={{ fontSize: "16px" }}  {...a11yProps(4)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0} >
        <SetUp />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <PlannedWellPath />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        <Interpolate />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={3}>
        <ActualWellPath />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={4}>
        <Comparison />
      </CustomTabPanel>
    </Box >
  );
}