export default function drawHands(hand, ctx) {
  const landmarks = hand.landmarks;
  ctx.beginPath();
  ctx.strokeStyle = "white";
  ctx.lineWidth = 2;

  const fingers = [
    [0, 1, 2, 3, 4],
    [5, 6, 7, 8],
    [9, 10, 11, 12],
    [13, 14, 15, 16],
    [17, 18, 19, 20],
  ];

  for (const finger of fingers) {
    for (var i = 0; i < finger.length - 1; i++) {
      ctx.moveTo(landmarks[finger[i]][0] + 5, landmarks[finger[i]][1] + 5);
      ctx.lineTo(
        landmarks[finger[i + 1]][0] + 5,
        landmarks[finger[i + 1]][1] + 5
      );
      ctx.stroke();
    }
  }

  ctx.moveTo(landmarks[5][0] + 5, landmarks[5][1] + 5);
  ctx.lineTo(landmarks[9][0] + 5, landmarks[9][1] + 5);
  ctx.stroke();

  ctx.moveTo(landmarks[9][0] + 5, landmarks[9][1] + 5);
  ctx.lineTo(landmarks[13][0] + 5, landmarks[13][1] + 5);
  ctx.stroke();

  ctx.moveTo(landmarks[13][0] + 5, landmarks[13][1] + 5);
  ctx.lineTo(landmarks[17][0] + 5, landmarks[17][1] + 5);
  ctx.stroke();

  ctx.moveTo(landmarks[13][0] + 5, landmarks[13][1] + 5);
  ctx.lineTo(landmarks[17][0] + 5, landmarks[17][1] + 5);
  ctx.stroke();

  ctx.beginPath();
  ctx.arc(landmarks[4][0] + 5, landmarks[4][1] + 5, 12, 0, 3 * Math.PI);
  ctx.fillStyle = "black";
  ctx.fill();

  ctx.beginPath();
  ctx.arc(landmarks[4][0] + 5, landmarks[4][1] + 5, 10, 0, 3 * Math.PI);
  ctx.fillStyle = "white";
  ctx.fill();

  ctx.beginPath();
  ctx.arc(landmarks[8][0] + 5, landmarks[8][1] + 5, 12, 0, 3 * Math.PI);
  ctx.fillStyle = "black";
  ctx.fill();

  ctx.beginPath();
  ctx.arc(landmarks[8][0] + 5, landmarks[8][1] + 5, 10, 0, 3 * Math.PI);
  ctx.fillStyle = "white";
  ctx.fill();

  ctx.beginPath();
  ctx.arc(landmarks[12][0] + 5, landmarks[12][1] + 5, 12, 0, 3 * Math.PI);
  ctx.fillStyle = "black";
  ctx.fill();

  ctx.beginPath();
  ctx.arc(landmarks[12][0] + 5, landmarks[12][1] + 5, 10, 0, 3 * Math.PI);
  ctx.fillStyle = "white";
  ctx.fill();

  ctx.beginPath();
  ctx.arc(landmarks[16][0] + 5, landmarks[16][1] + 5, 12, 0, 3 * Math.PI);
  ctx.fillStyle = "black";
  ctx.fill();

  ctx.beginPath();
  ctx.arc(landmarks[16][0] + 5, landmarks[16][1] + 5, 10, 0, 3 * Math.PI);
  ctx.fillStyle = "white";
  ctx.fill();

  ctx.beginPath();
  ctx.arc(landmarks[20][0] + 5, landmarks[20][1] + 5, 12, 0, 3 * Math.PI);
  ctx.fillStyle = "black";
  ctx.fill();

  ctx.beginPath();
  ctx.arc(landmarks[20][0] + 5, landmarks[20][1] + 5, 10, 0, 3 * Math.PI);
  ctx.fillStyle = "white";
  ctx.fill();
}
