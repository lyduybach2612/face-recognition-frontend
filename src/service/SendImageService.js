const URL = "http://127.0.0.1:8000/face/name";

// Hàm chuyển base64 thành Blob
const dataURLtoBlob = (dataURL) => {
  const arr = dataURL.split(",");
  const mime = arr[0].match(/:(.*?);/)[1];
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new Blob([u8arr], { type: mime });
};

export const sendImage = async (image) => {
  try {
    // Nếu image là base64 string (data:image/jpeg;base64,...), chuyển thành Blob
    const imageBlob = dataURLtoBlob(image);

    // Tạo FormData
    const formData = new FormData();
    formData.append("image", imageBlob, `photo_${Date.now()}.jpg`); // Field name phải là "image"

    const response = await fetch(URL, {
      method: "POST",
      body: formData, 
      // mode: "cors",
    });

    return await response.json();
  } catch (error) {
    throw error;
  }
};