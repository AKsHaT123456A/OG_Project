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
  const { setUp, updateSetUp } = useMatchStore();

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      updateSetUp({ ...setUp, loading: true, enteries: false })
      const data = await uploadFile(file);
      if (data) {
        updateSetUp({
          ...data.newField, loading: false, enteries: true, uploadFile: file.name, LastRevised: updateDate()
        });
      } else {
        updateSetUp({
          uploadFile: "",
          well: "",
          wellbore: "",
          planRevision: "",
          fieldName: "",
          utm: "",
          northReference: "",
          magneticDeclination: "",
          convergence: "",
          fieldVerticalReference: "",
          rotaryToField: "",
          rotarySubsea: "",
          rotaryToMHL: "",
          sectionX: "",
          sectionY: "",
          verticalSectionAzimuth: "",
          LastRevised: "dd-mm-yy",
          enteries: false,
          loading: false
        });
        alert('File not supported!');
      }
    }
  };

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
          }} fontWeight={500} color="#009B4D">{setUp.uploadFile}</Typography>
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

      {/* <Stack component='div' my={6} direction='column' spacing={4} >

        <Paper square={false} elevation={0} sx={{
          border: "1px solid #a8a4a48f"
        }}>
          <Stack direction='column' alignItems={'stretch'} width={'100%'}>

            <BoxHeader boxHead="Wellbore" />

            <Stack display={'grid'} padding={{ md: "20px 28px", sm: "20px 20px", xs: "20px 18px" }} gridTemplateColumns={{ lg: "1fr 1fr 1fr 1fr", md: "1fr 1fr 1fr", sm: "1fr 1fr" }} gap={4}>

              <LabelInput fieldLabel="Name" fieldStatus={!setUp.enteries} fieldValue={""} fieldName="setUp.wellbore.Name" />

              <LabelDateInput fieldLabel="Created" fieldStatus={!setUp.enteries} fieldValue={(setUp.wellbore.Created.includes('T')) ? setUp.wellbore.Created.split('T')[0] : (setUp.wellbore.Created)} fieldName="setUp.wellbore.Created" />

              <LabelDateInput fieldLabel="Last Revised" fieldStatus={!setUp.enteries} fieldValue={(setUp.wellbore.LastRevised.includes('T')) ? setUp.wellbore.LastRevised.split('T')[0] : (setUp.wellbore.LastRevised)} fieldName="setUp.wellbore.LastRevised" />

            </Stack>
          </Stack>
        </Paper>

        <Paper square={false} elevation={0} sx={{
          border: "1px solid #a8a4a48f"
        }}>
          <Stack direction='column' alignItems={'stretch'} width={'100%'}>

            <BoxHeader boxHead="Well" />

            <Stack display={'grid'} padding={{ md: "20px 28px", sm: "20px 20px", xs: "20px 18px" }} gridTemplateColumns={{ lg: "1fr 1fr 1fr 1fr", md: "1fr 1fr 1fr", sm: "1fr 1fr" }} gap={4}>

              <LabelInput fieldLabel="Name" fieldStatus={!setUp.enteries} fieldValue={setUp.well.Name} fieldName="setUp.well.Name" />

              <LabelInput fieldLabel="Government Id" fieldStatus={!setUp.enteries} fieldValue={setUp.well.GovernmentId} fieldName="setUp.well.GovernmentId" />

              <LabelDateInput fieldLabel="Last Revised" fieldStatus={!setUp.enteries} fieldValue={(setUp.well.LastRevised.includes('T')) ? setUp.well.LastRevised.split('T')[0] : (setUp.well.LastRevised)} fieldName="setUp.well.LastRevised" />

            </Stack>
          </Stack>
        </Paper>

        <Paper square={false} elevation={0} sx={{
          border: "1px solid #a8a4a48f"
        }}>
          <Stack direction='column' alignItems={'stretch'} width={'100%'}>

            <BoxHeader boxHead="Slot" />

            <Stack display={'grid'} padding={{ md: "20px 28px", sm: "20px 20px", xs: "20px 18px" }} gridTemplateColumns={{ lg: "1fr 1fr 1fr 1fr", md: "1fr 1fr 1fr", sm: "1fr 1fr" }} gap={4}>

              <LabelInput fieldLabel="Name" fieldStatus={!setUp.enteries} fieldValue={setUp.slot.Name} fieldName="setUp.slot.Name" />

              <LabelInput fieldLabel="Grid Northing" fieldStatus={!setUp.enteries} fieldValue={setUp.slot.GridNorthing} fieldName="setUp.slot.GridNorthing" />

              <LabelInput fieldLabel="Grid Easting" fieldStatus={!setUp.enteries} fieldValue={setUp.slot.GridEasting} fieldName="setUp.slot.GridEasting" />

              <LabelInput fieldLabel="Latitude" fieldStatus={!setUp.enteries} fieldValue={setUp.slot.Latitude} fieldName="setUp.slot.Latitude" />

              <LabelInput fieldLabel="Longitude" fieldStatus={!setUp.enteries} fieldValue={setUp.slot.Longitude} fieldName="setUp.slot.Longitude" />

              <LabelInput fieldLabel="North" fieldStatus={!setUp.enteries} fieldValue={setUp.slot.North} fieldName="setUp.slot.North" />

              <LabelInput fieldLabel="East" fieldStatus={!setUp.enteries} fieldValue={setUp.slot.East} fieldName="setUp.slot.East" />

            </Stack>
          </Stack>
        </Paper>

        <Paper square={false} elevation={0} sx={{
          border: "1px solid #a8a4a48f"
        }}>
          <Stack direction='column' alignItems={'stretch'} width={'100%'}>

            <BoxHeader boxHead="Installation" />

            <Stack display={'grid'} padding={{ md: "20px 28px", sm: "20px 20px", xs: "20px 18px" }} gridTemplateColumns={{ lg: "1fr 1fr 1fr 1fr", md: "1fr 1fr 1fr", sm: "1fr 1fr" }} gap={4}>

              <LabelInput fieldLabel="Name" fieldStatus={!setUp.enteries} fieldValue={setUp.installation.Name} fieldName="setUp.installation.Name" />

              <LabelInput fieldLabel="Easting" fieldStatus={!setUp.enteries} fieldValue={setUp.installation.Easting} fieldName="setUp.installation.Easting" />

              <LabelInput fieldLabel="Northing" fieldStatus={!setUp.enteries} fieldValue={setUp.installation.Northing} fieldName="setUp.installation.Northing" />

              <LabelInput fieldLabel="Map Name" fieldStatus={!setUp.enteries} fieldValue={setUp.installation.MapName} fieldName="setUp.installation.MapName" />

              <LabelSelect fieldLabel="North Alignment" fieldStatus={!setUp.enteries} fieldValue={setUp.installation.NorthAlignment} fieldName="setUp.installation.NorthAlignment" fieldArray={["Grid", "True", "Magnetic"]} />

            </Stack>
          </Stack>
        </Paper>

        <Paper square={false} elevation={0} sx={{
          border: "1px solid #a8a4a48f"
        }}>
          <Stack direction='column' alignItems={'stretch'} width={'100%'}>

            <BoxHeader boxHead="Field" />

            <Stack display={'grid'} padding={{ md: "20px 28px", sm: "20px 20px", xs: "20px 18px" }} gridTemplateColumns={{ lg: "1fr 1fr 1fr 1fr", md: "1fr 1fr 1fr", sm: "1fr 1fr" }} gap={4}>

              <LabelInput fieldLabel="Name" fieldStatus={!setUp.enteries} fieldValue={setUp.field.Name} fieldName="setUp.field.Name" />

              <LabelInput fieldLabel="Easting" fieldStatus={!setUp.enteries} fieldValue={setUp.field.Easting} fieldName="setUp.field.Easting" />

              <LabelInput fieldLabel="Northing" fieldStatus={!setUp.enteries} fieldValue={setUp.field.Northing} fieldName="setUp.field.Northing" />

              <LabelInput fieldLabel="Map Name" fieldStatus={!setUp.enteries} fieldValue={setUp.field.MapName} fieldName="setUp.field.MapName" />

              <LabelSelect fieldLabel="North Alignment" fieldStatus={!setUp.enteries} fieldValue={setUp.field.NorthAlignment} fieldName="setUp.field.NorthAlignment" fieldArray={["Grid", "True", "Magnetic"]} />

            </Stack>
          </Stack>
        </Paper>

        <Paper square={false} elevation={0} sx={{
          border: "1px solid #a8a4a48f"
        }}>
          <Stack direction='column' alignItems={'stretch'} width={'100%'}>

            <BoxHeader boxHead="Additional" />

            <Stack display={'grid'} padding={{ md: "20px 28px", sm: "20px 20px", xs: "20px 18px" }} gridTemplateColumns={{ lg: "1fr 1fr 1fr 1fr", md: "1fr 1fr 1fr", sm: "1fr 1fr" }} gap={4}>

              <LabelInput fieldLabel="Units" fieldStatus={!setUp.enteries} fieldValue={setUp.additional.Units} fieldName="setUp.additional.Units" />

              <LabelInput fieldLabel="Vertical Section Azimuth" fieldStatus={!setUp.enteries} fieldValue={setUp.additional.VerticalSectionAzimuth} fieldName="setUp.additional.VerticalSectionAzimuth" />

              <LabelSelect fieldLabel="Survey Reference Point" fieldValue={setUp.additional.SurveyReferencePoint} fieldName="setUp.additional.SurveyReferencePoint" fieldArray={["Rotary Table"]} fieldStatus={!setUp.enteries} />

            </Stack>
          </Stack>
        </Paper>

      </Stack> */}
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
              <LabelInput fieldLabel="Rotary to Sub Sea" fieldStatus={!setUp.enteries} fieldValue={setUp.rotarySubsea} fieldName="setUp.rotarySubsea" />
              <LabelInput fieldLabel="Section Origin Y" fieldStatus={!setUp.enteries} fieldValue={setUp.sectionY} fieldName="setUp.sectionY" />
              <LabelInput fieldLabel="Field Name" fieldStatus={!setUp.enteries} fieldValue={setUp.fieldName} fieldName="setUp.fieldName" />
              <LabelInput fieldLabel="Vertical Section Azimuth" fieldStatus={!setUp.enteries} fieldValue={setUp.verticalSectionAzimuth} fieldName="setUp.verticalSectionAzimuth" />
              <LabelInput fieldLabel="Field Vertical Reference" fieldStatus={!setUp.enteries} fieldValue={setUp.fieldVerticalReference} fieldName="setUp.fieldVerticalReference" />
              <LabelInput fieldLabel="Rotary to Mud Return Line" fieldStatus={!setUp.enteries} fieldValue={setUp.rotaryToMHL} fieldName="setUp.wellbore.Name" />
              <LabelDateInput fieldLabel="Last Revised" fieldStatus={!setUp.enteries} fieldValue={setUp.LastRevised} fieldName="setUp.LastRevised" />

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