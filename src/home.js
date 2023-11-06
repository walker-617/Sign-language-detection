import React, { useRef, useEffect, useState } from "react";
import Webcam from "react-webcam";
import * as handpose from "@tensorflow-models/handpose";
import "@tensorflow/tfjs-backend-webgl";
import Handsigns from "./components/handsigns";
import * as fp from "fingerpose";
import drawHand from "./drawhand";
import { SignImage, SignHandImage } from "./components/handimage";

export default function Home() {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  const [count, setCount] = useState(0);
  const [curr, setCurr] = useState("A");
  const [detected, setDetected] = useState("");
  const [completed, setCompleted] = useState(false);

  const ABC = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

  useEffect(() => {
    const setupHandpose = async () => {
      const net = await handpose.load();
      const intervalId = setInterval(() => {
        detect(net);
      }, 150);
      return () => clearInterval(intervalId);
    };

    setupHandpose();
  }, []);

  useEffect(() => {
    setCurr(ABC[count]);
    if (count === 26) {
      setCompleted(true);
    }
  }, [count]);

  useEffect(() => {
    if (detected === curr) {
      setCount((prevCount) => prevCount + 1);
    }
  }, [detected, curr]);

  async function detect(net) {
    const video = webcamRef.current.video;
    const videoWidth = webcamRef.current.video.videoWidth;
    const videoHeight = webcamRef.current.video.videoHeight;

    // Set video width
    webcamRef.current.video.width = videoWidth;
    webcamRef.current.video.height = videoHeight;

    // Set canvas height and width
      canvasRef.current.width = videoWidth;
      canvasRef.current.height = videoHeight;
    const hands = await net.estimateHands(video);

    if (hands.length > 0) {
      const ctx = canvasRef.current.getContext("2d");
      ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
        drawHand(hands[0], ctx);

      const GE = new fp.GestureEstimator([
        Handsigns.aSign,
        Handsigns.bSign,
        Handsigns.cSign,
        Handsigns.dSign,
        Handsigns.eSign,
        Handsigns.fSign,
        Handsigns.gSign,
        Handsigns.hSign,
        Handsigns.iSign,
        Handsigns.jSign,
        Handsigns.kSign,
        Handsigns.lSign,
        Handsigns.mSign,
        Handsigns.nSign,
        Handsigns.oSign,
        Handsigns.pSign,
        Handsigns.qSign,
        Handsigns.rSign,
        Handsigns.sSign,
        Handsigns.tSign,
        Handsigns.uSign,
        Handsigns.vSign,
        Handsigns.wSign,
        Handsigns.xSign,
        Handsigns.ySign,
        Handsigns.zSign,
      ]);

      const estimatedGestures = await GE.estimate(hands[0].landmarks, 5.0);
      const signScores = estimatedGestures.gestures;
      signScores.sort((a, b) => b.score - a.score); // Sort in descending order

      if (signScores.length) {
        setDetected(signScores[0].name);
      }
    }
  }

  const videoConstraints = {
    width: 1920,
    height: 980,
  };

  return (
    <>
      <div className="home">
        <div className="webcam">
          <Webcam ref={webcamRef} videoConstraints={videoConstraints} />
          <canvas
            ref={canvasRef}
            style={{
              position: "absolute",
              top: "0",
              left: "0",
              zIndex: "99",
            }}
          ></canvas>
          {!completed ? (
            <div>
              {count < 25 ? (
                <div
                  className="next-button"
                  onClick={() => {
                    setCount(count + 1);
                  }}
                >
                  Next
                </div>
              ) : (
                ""
              )}
              {count > 0 ? (
                <div
                  className="prev-button"
                  onClick={() => {
                    setCount(count - 1);
                  }}
                >
                  Previous
                </div>
              ) : (
                ""
              )}
              <div className="input-gesture">
                <div>Input gesture</div>
                <img src={SignHandImage[curr]} alt={curr + "sign"} />
              </div>
              <div className="detected-gesture" id="detected-gesture">
                <div>Detected gesture</div>
                <img src={SignImage[detected]} />
              </div>
              <div className="handpose-toggle">
                <div>Handpose</div>
                <div
                  // onClick={() => {
                  //   setShowPose(true);
                  // }}
                >
                  On
                </div>
                <div
                  // onClick={() => {
                  //   setShowPose(false);
                  // }}
                >
                  Off
                </div>
              </div>
            </div>
          ) : (
            <div className="completed">Completed</div>
          )}
          <div
            className="detect-button"
            onClick={() => {
              setCount(0);
              setCompleted(false);
            }}
          >
            Reset
          </div>
        </div>
      </div>
    </>
  );
}
