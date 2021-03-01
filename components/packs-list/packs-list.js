import React from "react";
import WidgetPack from "../widget-pack/widget-pack";

function packsList(props) {
  const {packs, onClick} = props;

  return (
    <div className="wrapper">
    {packs.map(pack => (
      <WidgetPack
        id={pack.id}
        key={pack.id}
        name={pack.name}
        cover={pack.cover}
        quantity={pack.illustrationCount}
        onClick={onClick}
        type="normal"
      />
    ))}
  </div>
  );
}

export default packsList;
