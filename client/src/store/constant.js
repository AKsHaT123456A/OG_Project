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




export async function uploadFile(file) {
  let data = null;
  // Create a FormData object to send the file
  const formData = new FormData();
  formData.append('excelFile', file);

  try {
    // Make the POST request using fetch
    const response = await fetch('https://og-project.onrender.com/api/v1/fields', {
      method: 'POST',
      body: formData,
    });

    if (response.ok) {
      // Request was successful
      const result = await response.json();
      data = result;
    } else {
      // Request failed
      console.error('Request failed:', response.statusText);
    }
  } catch (error) {
    console.error('Error:', error);
  }
  return data;
}