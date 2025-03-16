import React, { useRef, useState } from "react"
import Webcam from "react-webcam"
import { sendImage } from "../service/SendImageService";
const WebcamComponent = () => {
  const webcamRef = useRef(null);
  const [result, setResult] = useState("");
  const capturePicture = async () => {
    try {
      const imageSrc = webcamRef.current.getScreenshot();
      // console.log(imageSrc);
      const response = await sendImage(imageSrc);
      console.log(response);
      setResult(response.detail.message);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className = '' style={{textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center"}} >
        <Webcam 
        ref={webcamRef}
        screenshotFormat="image/jpg"
        audio={false}
        />
        <button style={{marginTop: "50px", width: "200px", height: "50px"}} onClick={capturePicture}>Chụp ảnh</button>
        {result && <div>Kết quả nhận diện: {result}</div>}
    </div>
  )
};

export default WebcamComponent;
