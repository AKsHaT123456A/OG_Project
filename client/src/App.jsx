import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography'
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import SetUp from "./components/SetUp";
import PlannedWellPath from "./components/PlannedWellPath";
import Interpolate from "./components/Interpolate";
import ActualWellPath from './components/ActualWellPath';
import AddNew from './components/ActualWellPath/AddNew'
import EditNew from './components/ActualWellPath/EditNew'
import DelNew from './components/ActualWellPath/DelNew'
import { useMatchStore } from './store/store';
import { formatNumberToTwoDecimalPlaces, getSavedData, updateDate } from './components/constant';




const userCurrentFile = localStorage.getItem('fileName');


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
  const { open, updateSetUp, updateInterpolateRows, interpolateRows } = useMatchStore();
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const fetchData = async () => {
    try {
      const fileName = userCurrentFile;
      const idVal = localStorage.getItem('id');
      const data = await getSavedData(`https://og-project.onrender.com/api/v1/getAllFields?excelName=${fileName}&id=${idVal}`);
      if (data.details) {
        updateSetUp({
          ...data.details, loading: false, enteries: true, lastRevised: updateDate()
        });
      }
    } catch (error) {
      console.log('error');
    }

  };

  const fetchInterpolate = async () => {
    try {
      const fileName = userCurrentFile;
      const idVal = localStorage.getItem('id');
      const fileNameWithoutExtension = fileName.replace(/\.[^.]+$/, '');
      const data = await getSavedData(`https://og-project.onrender.com/api/v1/getInterpolate?excelName=${fileNameWithoutExtension}&id=${idVal}`);
      if (data.interpolateData.length) {
        let updatedRows = [];
        data.interpolateData.map((sdata, index) => {
          let updated;
          updated = {
            "id": index + 1,
            "index": `${index + 1}`,
            "md": formatNumberToTwoDecimalPlaces(sdata["md"]),
            "inc": formatNumberToTwoDecimalPlaces(sdata["inc"]),
            "azi": formatNumberToTwoDecimalPlaces(sdata["azi"]),
            "tvd": formatNumberToTwoDecimalPlaces(sdata["tvd"]),
            "ns": formatNumberToTwoDecimalPlaces(sdata["ns"]),
            "ew": formatNumberToTwoDecimalPlaces(sdata["ew"]),
            "comment": ""
          }
          updatedRows = [...updatedRows, updated];
        })
        const getInterpolateRows = interpolateRows.slice(updatedRows.length);
        if (getInterpolateRows.length === 0) {
          const iRow = { id: updatedRows.length + 1, index: `${updatedRows.length + 1}`, md: '', inc: '', azi: '', tvd: '', ns: '', ew: '', comment: '' };
          updateInterpolateRows([...updatedRows, iRow]);
        } else {
          updateInterpolateRows([...updatedRows, ...getInterpolateRows]);
        }


      }
    } catch (error) {
      console.log('error interpolate');
    }

  };


  React.useEffect(() => {
    fetchData();
    fetchInterpolate();
  }, [])

  return (
    <Box component="main" maxWidth={"1920px"} marginInline={"auto"} >
      {(open.text === 'Add') && <AddNew />}
      {(open.text === 'Edit') && <EditNew />}
      {(open.text === 'Remove') && <DelNew />}

      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Stack display={'grid'} gridTemplateColumns={{ md: '300px 1fr', sm: '0.8fr 1fr' }} alignItems={'center'} justifyContent={'space-between'}>
          <Typography variant="h5" mx={2.5} mt={0.5} fontWeight={700} flex={1} width={'400px'}>Survey Application Demo</Typography>
          <Tabs value={value} onChange={handleChange} sx={{
            placeSelf: { md: "flex-end" },
            mx: 1
          }} variant='scrollable' allowScrollButtonsMobile aria-label="basic tabs example" >
            <Tab label="Set Up" sx={{ fontSize: "16px" }}  {...a11yProps(0)} />
            <Tab label="Planned Well Path" sx={{ fontSize: "16px" }}  {...a11yProps(1)} />
            <Tab label="Interpolate" sx={{ fontSize: "16px" }}  {...a11yProps(2)} />
            <Tab label="Actual Well Path" sx={{ fontSize: "16px" }}  {...a11yProps(3)} />
          </Tabs>
        </Stack>
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
    </Box >
  );
}