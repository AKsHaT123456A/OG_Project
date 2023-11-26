import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import SetUp from "./components/SetUp";
import PlannedWellPath from "./components/PlannedWellPath";
import Interpolate from "./components/Interpolate";
import ActualSurveys from "./components/ActualSurveys";
import Comparison from "./components/Comparison"

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
          <Typography>{children}</Typography>
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

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Set Up" {...a11yProps(0)} />
          <Tab label="Planned Well Path" {...a11yProps(1)} />
          <Tab label="Interpolate" {...a11yProps(2)} />
          <Tab label="Actual Surveys" {...a11yProps(3)} />
          <Tab label="Comparison" {...a11yProps(4)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <SetUp />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <PlannedWellPath />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        <Interpolate />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={3}>
        <ActualSurveys />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={4}>
        <Comparison />
      </CustomTabPanel>
    </Box>
  );
}