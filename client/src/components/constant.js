import styled from "@emotion/styled";

export const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});


export function updateDate() {
  const date = new Date();

  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  const formattedMonth = month.toString().padStart(2, "0");
  const formattedDay = day.toString().padStart(2, "0");

  const formattedDate = `${year}-${formattedMonth}-${formattedDay}`;

  return formattedDate;

}


//APIs

export async function uploadFile(file) {
  let data = null;
  const formData = new FormData();
  formData.append('excelFile', file);
  const fileName = file.name;
  const fileNameWithoutExtension = fileName.replace(/\.[^.]+$/, '');

  try {
    const response = await fetch(`https://og-project.onrender.com/api/v1/fields?excelName=${fileNameWithoutExtension}`, {
      method: 'POST',
      body: formData,
    });

    if (response.ok) {
      const result = await response.json();
      data = result;
    } else {
      console.error('Request failed:', response.statusText);
    }
  } catch (error) {
    console.error('Error:', error);
  }
  return data;
}

export async function postLogData(url, data) {
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    });

    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.error('Error:', error);
    return 0;
  }
}

export async function postFieldData(url, data) {
  try {
    const response = await fetch(url, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    });

    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.error('Error:', error);
    return 0;
  }
}

export async function DeleteLogData(url, data) {
  try {
    const response = await fetch(url, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    });

    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.error('Error:', error);
    return 0;
  }
}

export function formatStringInNumberToTwoDecimalPlaces(input) {
  return parseFloat(Number(input)).toFixed(2);
}
export function formatNumberToTwoDecimalPlaces(input) {
  return parseFloat(input).toFixed(2);
}

export async function getSavedData(url) {
  try {
    const response = await fetch(url);
    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}
