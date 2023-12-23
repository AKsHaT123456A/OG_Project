import { Box, Stack, Button, Typography, Paper } from '@mui/material';
import { useMatchStore } from '../store/store';
import { VisuallyHiddenInput, updateDate, uploadFile } from './constant';
import LabelInput from './SetUp/LabelInput';
import BoxHeader from './SetUp/BoxHeader';
import CircularProgress from '@mui/material/CircularProgress';
import LabelDateInput from './SetUp/LabelDateInput';
import SetUpTable from './SetUp/SetUpTable';
import LabelSelect from './SetUp/LabelSelect';



const SetUp = () => {
  const { setUp, updateSetUp, setPlannedRows, plannedRows, setLog, logArray, notEditInterpolateRows, updateInterpolateRows, updateLokiRows, setUpNotEditValues, setSurveyRows, surveyNotEditRows } = useMatchStore();

  const handlePlease = () => {
    updateInterpolateRows(notEditInterpolateRows);
    setLog([]);
    const modifiedRows = [
      { id: "SlotLocation", col1: 'Slot Location', "localNorth": "", "localEast": "", "localGridNorth": "", "localGridEast": "", "localLongitude": "", "localLatitude": "", "localHoriz": "", "localVert": "" },
      { id: "FacilityReferencePt", col1: 'Facility Reference Pt', "localNorth": "", "localEast": "", "localGridNorth": "", "localGridEast": "", "localLongitude": "", "localLatitude": "", "localHoriz": "", "localVert": "" },
      { id: "FieldReferencePt", col1: 'Field Reference Pt', "localNorth": "", "localEast": "", "localGridNorth": "", "localGridEast": "", "localLongitude": "", "localLatitude": "", "localHoriz": "", "localVert": "" },
    ];
    updateLokiRows(modifiedRows);
    const tieOnRow = {
      "id": 1,
      "fieldNumber": "Tie On",
      "md": "",
      "cl": "",
      "inc": "",
      "azi": "",
      "tvd": "",
      "ns": "",
      "ew": "",
      "dls": "",
      "vs": "",
      "comment": ""
    };
    setSurveyRows([tieOnRow, ...surveyNotEditRows]);
  }


  const updateDataSetUp = async (file) => {
    const data = await uploadFile(file);
    if (data) {
      updateSetUp({
        ...data.newField, loading: false, enteries: true, lastRevised: updateDate()
      });
      localStorage.setItem('fileName', data.newField.excelName);
      localStorage.setItem('MaxMd', data.maxMd)
      localStorage.setItem('MinMd', data.minMd)
      localStorage.setItem('id', data.id);
    } else {
      updateSetUp(setUpNotEditValues);
      setPlannedRows(plannedRows);
      setLog(logArray);
      localStorage.removeItem('fileName');
      localStorage.setItem('MaxMd')
      localStorage.setItem('MinMd')
      localStorage.removeItem('id');
      alert('File not supported!');
      handlePlease();
    }
  }


  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      updateSetUp({ ...setUp, loading: true, enteries: false })
      updateDataSetUp(file);//fetch when file uploads
    }
  }


  return (
    <Box mt={2.5} component="div">


      <Stack direction={{ sm: 'row' }} width={'100%'} spacing={5} alignItems='center'  >

        <Button variant="contained" onClick={() => document.getElementById('fileInput').click()} sx={{
          "&.MuiButtonBase-root:hover": {
            bgcolor: "#0abd61"
          }
        }}>
          Import Plan
          <VisuallyHiddenInput id="fileInput" type="file" accept=".xlsx, .xls" onChange={handleFileChange} />
        </Button>
        {
          (setUp.enteries) && <Typography sx={{
            fontSize: '15.2px',
          }} fontWeight={500} color="#009B4D">{setUp.excelName}.xlsx</Typography>
        }
        {
          (!setUp.enteries && !setUp.loading) && <Typography variant='body1' sx={{
            fontSize: '15.2px',
          }} fontWeight={500} justifySelf={'center'} >Upload well plan (xlsx format) to get started.</Typography>
        }
        {
          (setUp.loading) && <CircularProgress size={26} />
        }
      </Stack>

      <Stack component='div' my={6} direction='column' spacing={6} >
        <Paper square={false} elevation={0} sx={{
          border: "1px solid #a8a4a48f"
        }}>
          <Stack direction='column' alignItems={'stretch'} width={'100%'}>

            <BoxHeader boxHead="Well Details" />

            <Stack display={'grid'} padding={{ md: "20px 28px", sm: "20px 20px", xs: "20px 18px" }} gridTemplateColumns={{ xl: "1fr 1fr 1fr 1fr 1fr", lg: "1fr 1fr 1fr 1fr", md: "1fr 1fr 1fr ", sm: "1fr 1fr " }} gap={4}>

              <LabelInput fieldLabel="Well Name" fieldStatus={!setUp.enteries} fieldValue={setUp.well} fieldName="setUp.well" />
              <LabelInput fieldLabel="Magnetic Declination" fieldStatus={!setUp.enteries} fieldValue={setUp.magneticDeclination} fieldName="setUp.magneticDeclination" />
              <LabelInput fieldLabel="UTM Zone" fieldStatus={!setUp.enteries} fieldValue={setUp.utm} fieldName="setUp.utm" />
              <LabelInput fieldLabel="Rotary to Facility Vertical Datum" fieldStatus={!setUp.enteries} fieldValue={setUp.rotaryToField} fieldName="setUp.rotaryToField" />
              <LabelInput fieldLabel="Section Origin X" fieldStatus={!setUp.enteries} fieldValue={setUp.sectionX} fieldName="setUp.sectionX" />
              <LabelInput fieldLabel="Plan Revision" fieldStatus={!setUp.enteries} fieldValue={setUp.planRevision} fieldName="setUp.planRevision" />
              <LabelInput fieldLabel="Grid Convergence" fieldStatus={!setUp.enteries} fieldValue={setUp.convergence} fieldName="setUp.convergence" />
              <LabelSelect fieldArray={["Grid", "True", "Magnetic"]} fieldLabel="North Reference" fieldStatus={!setUp.enteries} fieldValue={setUp.northReference} fieldName="setUp.northReference" />
              <LabelInput fieldLabel="Rotary to Field Vertical Reference" fieldStatus={!setUp.enteries} fieldValue={setUp.rotarySubsea} fieldName="setUp.rotarySubsea" />
              <LabelInput fieldLabel="Section Origin Y" fieldStatus={!setUp.enteries} fieldValue={setUp.sectionY} fieldName="setUp.sectionY" />
              <LabelInput fieldLabel="Field Name" fieldStatus={!setUp.enteries} fieldValue={setUp.fieldName} fieldName="setUp.fieldName" />
              <LabelInput fieldLabel="Vertical Section Azimuth" fieldStatus={!setUp.enteries} fieldValue={setUp.verticalSectionAzimuth} fieldName="setUp.verticalSectionAzimuth" />
              <LabelInput fieldLabel="Field Vertical Reference" fieldStatus={!setUp.enteries} fieldValue={setUp.fieldVerticalReference} fieldName="setUp.fieldVerticalReference" />
              <LabelInput fieldLabel="Rotary to Mud Return Line" fieldStatus={!setUp.enteries} fieldValue={setUp.rotaryToMHL} fieldName="setUp.rotaryToMHL" />
              <LabelDateInput fieldLabel="Last Revised" fieldStatus={!setUp.enteries} fieldValue={setUp.lastRevised} fieldName="setUp.lastRevised" />

            </Stack>
          </Stack>
        </Paper>

        <Paper square={false} elevation={0} sx={{
          border: "1px solid #a8a4a48f"
        }}>
          <Stack direction='column' alignItems={'stretch'} width={'100%'}>

            <BoxHeader boxHead="Location Coordinates" />
            <Box>
              <SetUpTable />
            </Box>
          </Stack>
        </Paper>
      </Stack>

    </Box>
  )
}




export default SetUp