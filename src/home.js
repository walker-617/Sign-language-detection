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
  const [loading, setLoading] = useState(true);

  const ABC = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

  useEffect(() => {
    const setupHandpose = async () => {
      const net = await handpose.load();
      setLoading(false);
      const intervalId = setInterval(() => {
        detect(net);
      }, 150);
      return () => clearInterval(intervalId);
    };

    setupHandpose();
  }, []);

  useEffect(() => {
    setCurr(ABC[count]);
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
      signScores.sort((a, b) => b.score - a.score);

      if (signScores.length) {
        setDetected(signScores[0].name);
      } else {
        setDetected("");
      }
    } else {
      setDetected("");
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
          {loading ? <div className="loading">Loading...</div> : null}
          {!loading ? (
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
                {detected ? (
                  <img src={SignImage[detected]} />
                ) : (
                  <div className="none">
                    None
                  </div>
                )}
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
              <div
                className="reset-button"
                onClick={() => {
                  setCount(0);
                  setDetected("");
                }}
              >
                Reset
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
      <div className="warning">
        <div className="warn">This application is best viewed on a desktop or in full-screen mode.</div>
        <div className="ps">*Tried responsive, it didn't go well.</div>
      </div>
    </>
  );
}
