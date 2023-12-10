import { Stack } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { useMatchStore } from '../../store/store';


const LabelSelect = ({ fieldName, fieldLabel, fieldValue, fieldStatus, fieldArray }) => {

    const { setUp, updateSetUp } = useMatchStore();

    const handleChange = (e) => {
        const { name, value } = e.target;
        const obj = name.split('.');
        const second = obj[1];
        updateSetUp({
            ...setUp, [second]: value
        })
    }
    return (
        <Stack component={"label"} direction="column" style={{
            fontSize: '15.2px',
            fontWeight: 500,
            fontFamily: '\'Poppins\', sans-serif',
            gap: "0.3rem",
        }}>
            {fieldLabel}
            <Select
                sx={{
                    fontSize: '15.2px',
                }}
                disabled={fieldStatus ? true : false}
                displayEmpty
                value={fieldValue}
                name={fieldName}
                variant='outlined'
                size='small'
                label={null}
                onChange={handleChange}

            >
                <MenuItem value=""></MenuItem>
                {
                    fieldArray.map((option, index) => {
                        return (
                            <MenuItem key={index} value={option}>{option}</MenuItem>
                        )
                    })
                }

            </Select>
        </Stack>
    )
}

export default LabelSelect