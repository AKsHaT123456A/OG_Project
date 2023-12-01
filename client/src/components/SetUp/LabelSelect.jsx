import { Stack } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';


const LabelSelect = ({ fieldName, fieldLabel, fieldValue, fieldStatus, fieldArray }) => {
    return (
        <Stack component={"label"} direction="column" style={{
            fontSize: "0.95rem",
            fontWeight: "600",
            fontFamily: '\'Ubuntu\', sans-serif',
            gap: "0.3rem",
        }}>
            {fieldLabel}
            <Select
                sx={{
                    fontSize: 17.2,
                    fontFamily: '\'Ubuntu\', sans-serif',
                }}

                disabled={fieldStatus ? true : false}
                displayEmpty
                value={fieldValue}
                name={fieldName}
                variant='outlined'
                size='small'
                label={null}

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