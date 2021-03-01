import React, { Component } from "react";

function AsideItem(props) {
  return (
    <li>
      <button
        id={props.id}
        className={`collapse-inner-link ${
          props.current == props.id ? `active` : null
        } ${props.more === true ? `more` : null}`}
        onClick={() => props.onClick()}
      >
        {props.value}
        {props.cross === true ? (
          <div style={{ marginLeft: "5px" }}>
            <svg
              width="8"
              height="8"
              viewBox="0 0 8 8"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g opacity="0.5">
                <path
                  d="M6.24268 2L2.00004 6.24264"
                  stroke="white"
                  strokeWidth="1.75"
                  strokeLinecap="round"
                />
                <path
                  d="M6.24268 6.24268L2.00004 2.00004"
                  stroke="white"
                  strokeWidth="1.75"
                  strokeLinecap="round"
                />
              </g>
            </svg>
          </div>
        ) : null}
      </button>
    </li>
  );
}

export default AsideItem;
