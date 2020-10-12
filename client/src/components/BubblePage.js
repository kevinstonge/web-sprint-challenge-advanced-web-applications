import React, { useState, useEffect } from "react";
import fetchColors from "../api/fetchColors";

import Bubbles from "./Bubbles";
import ColorList from "./ColorList";

const BubblePage = () => {
  const [colorList, setColorList] = useState([]);
  useEffect(() => {
    fetchColors().then(r=>setColorList(r));
  }, []);
  return (
    <div className="row">
      <ColorList colors={colorList} updateColors={setColorList} />
      <Bubbles colors={colorList} />
    </div>
  );
};

export default BubblePage;
