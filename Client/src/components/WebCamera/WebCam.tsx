import { useEffect, useState, useRef } from "react";
  
export default function WebCam() {
    const myVideo = useRef(null);
    const myPhoto = useRef(null);

  
    useEffect(() => {
        navigator.mediaDevices
            .getUserMedia({ video: true})
            .then((stream) => {
                let video = myVideo.current
                video.srcObject = stream;
                video.play();
            });
    }, []);
  
    const takePhoto = () =>{
        const width = 400
        const height = width/(16/9)
        let video = myVideo.current
        let photo = myPhoto.current
        photo.width = width
        photo.height = height
        let ctx = photo.getContext('2d')
        ctx.drawImage(video,0,0,photo.width,photo.height)
        

    }
    const closePhoto = () =>{
        let photo = myPhoto.current
        let ctx = photo.getContext('2d')
        ctx.clearRect(0,0,photo.width,photo.height)
        

    }
    return (
        <div className="container">
            <h1 className="text-center">Take Snap</h1>
            <video className="container" ref={myVideo} style={{width:"40%"}}></video>
                <button className="container btn btn-outline-success shadow-none" onClick={takePhoto}>Snap!!</button>
                <div>
                    <canvas className="container" ref={myPhoto}></canvas>                   
                <button className="container btn btn-outline-info mb-4 shadow-none" onClick={closePhoto}>Close</button>
                </div>

        </div>
    );
}