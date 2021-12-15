import { jsPDF } from "jspdf";
import { useEffect, useRef } from "react";
import { useContext } from "./useContext";

const width = 1600;

const App = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const canvas = canvasRef.current;
  let ctx;
  ctx = useContext(canvasRef, width)!;
  
  useEffect(() => {
    if (canvas) {
      ctx = canvas.getContext('2d');
    }
  }, [canvas]);

  const pdf = () => {
    const doc = new jsPDF({
      orientation: "landscape",
      unit: 'mm',
      format: [297, 210] // A4
    });
  
    doc.text("Rory is cool", 10, 10);
    if (canvasRef.current) {
      doc.addImage(canvasRef.current, 'PNG', 58, 37, 180, 135); // 180 x 135mm - same scale as Canvas
      doc.save("tester.pdf");
    }
  }

  return (
    <div className="content">
      <canvas ref={canvasRef} width={width} height={width * 0.66} />
      <button onClick={pdf}>Save as PDF</button>
    </div>
  );
}

export default App;
