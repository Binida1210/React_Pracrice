import { useState } from "react";
import data from "./data";
import "./style.css";

function Accordian() {
  const [selected, setSelected] = useState(null);

  const handleSingleSelected = (selectedId) => {
    setSelected(selectedId === selected ? null : selectedId);
  };

  return (
    <div className="wrapper">
      <div className="accordian">
        {data && data.length > 0 ? (
          data.map((dataItem) => {
            const isSelected = selected === dataItem.id;
            return (
              <div
                className={`item ${isSelected ? "active" : ""}`}
                key={dataItem.id}
              >
                <div
                  className="title"
                  onClick={() => handleSingleSelected(dataItem.id)}
                >
                  <h3>{dataItem.question}</h3>
                  <span className="toggle">+</span>
                </div>
                <div className={`content ${isSelected ? "show" : ""}`}>
                  <h3>{dataItem.answer}</h3>
                </div>
              </div>
            );
          })
        ) : (
          <div className="no-data">No data found</div>
        )}
      </div>
    </div>
  );
}

export default Accordian;
