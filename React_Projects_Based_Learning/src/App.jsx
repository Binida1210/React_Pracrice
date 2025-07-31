import "./App.css";
import Accordian from "./Components/Accordian";
import RandomColor from "./Components/RandomColor";
import Rating from "./Components/Rating/Rating";
import ImageSlider from "./Components/ImageSlider";
import LoadMore from "./Components/LoadMore/LoadMoreGrid";
import QRGenerator from "./Components/QRGenerator";
function App() {
  return (
    <>
      {/* <Accordian /> */}
      {/* <RandomColor /> */}
      {/* <Rating starNum={10} /> */}
      {/* <ImageSlider url={"https://picsum.photos/v2/list"} /> */}
      {/* <LoadMore url={"https://picsum.photos/v2/list"} pageSize={12} /> */}
      <QRGenerator />
    </>
  );
}

export default App;
