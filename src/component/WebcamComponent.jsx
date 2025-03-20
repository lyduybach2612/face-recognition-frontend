import React, { useRef, useState } from "react";
import Webcam from "react-webcam";
import { sendImage } from "../service/SendImageService";
import { addData, takePhoto } from "../service/AddData";
const WebcamComponent = () => {
  const [username, setUsername] = useState("");
  const webcamRef = useRef(null);
  const [result, setResult] = useState("");
  const capturePicture = async () => {
    try {
      const imageSrc = webcamRef.current.getScreenshot();
      const response = await sendImage(imageSrc);
      console.log(response);
      console.log(response.detail.code)
      if (response.detail.code === 200) {
        const username = response.detail.data.username;
        setResult(username);
      } else if (response.detail.code === 404) {
        setResult("Không nhận dạng được người trong ảnh");
      } else if (response.detail.code === 400) {
        setResult("Camera không nhận diện được khuôn mặt nào");
      } else{
        setResult("Lỗi không xác định");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddData = async () => {
    const images = await takePhoto(webcamRef);
    console.log(images);
    const res = await addData(username, images);
    console.log(res)
  };

  return (
    <div
      className=""
      style={{
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Webcam ref={webcamRef} screenshotFormat="image/jpg" audio={false} />
      <input style={{marginTop: "10px", height: "30px"}} type="text" onChange={(e) => setUsername(e.target.value)} />
      <div className="">
        <button
          style={{
            marginTop: "50px",
            width: "200px",
            height: "50px",
            marginRight: "10px",
          }}
          onClick={capturePicture}
        >
          Chụp ảnh
        </button>

        <button
          onClick={handleAddData}
          style={{ marginTop: "50px", width: "200px", height: "50px" }}
        >
          Thêm dữ liệu
        </button>
      </div>
      {result && (
        <div style={{ marginTop: "50px" }}>Kết quả nhận diện: {result}</div>
      )}
    </div>
  );
};

export default WebcamComponent;
