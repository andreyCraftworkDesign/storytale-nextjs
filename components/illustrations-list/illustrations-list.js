import React from "react";
import Product from "../product/product";

function IllustrationsList(props) {
  const { pictures, onClick, onDownload } = props;

  return (
    <div className="illustrations">
      {pictures !== null
        ? pictures.map(picture => (
            <Product
              id={picture.id}
              key={picture.id}
              cover={picture.cover}
              onClick={onClick}
              onDownload={onDownload}
            />
          ))
        : null}
    </div>
  );
}

export default IllustrationsList;
