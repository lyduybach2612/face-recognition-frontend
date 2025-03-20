const URL = "http://127.0.0.1:8000/face/embedding";

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

const delay = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

export const takePhoto = async (webcamRef) => {
  const imageSrc = [];
  for (let i = 1; i <= 5; i++) {
    console.log(`Chụp ảnh lần ${i}`);

    // Gọi hàm chụp ảnh ở đây
    const image = await webcamRef.current.getScreenshot();
    imageSrc.push(image);

    // Chờ 1 giây trước khi chụp lần tiếp theo (nếu chưa phải lần cuối)
    if (i < 5) {
      await delay(1000);
    }
  }
  console.log("Hoàn thành chụp 5 ảnh!");
  return imageSrc;
};

export const addData = async (username, images) => {
  try {
    if (!images || images.length < 5) {
      throw new Error("You must upload at least 5 images");
    }
    const formData = new FormData();
    
    const data = {"username": username};
    
    formData.append("data", JSON.stringify(data)); // Đúng định dạng JSON
    images.forEach((element, index) => {
      formData.append(
        "images",
        dataURLtoBlob(element),
        `photo_${Date.now()}_${index}.jpg`
      );
    });
    // console.log(formDatas);

    const response = await fetch(URL, {
      headers: {
        "Content-Type": "multipart/form-data; boundary=<calculated when request is sent>",
      },
      method: "POST",
      body: formData,
    });

    // console.log(repon);
    const json = await response.json();
    return json;
  } catch (error) {
    throw error;
  }
};
