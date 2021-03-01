import React, { Component } from "react";
import Link from 'next/link'

function WidgetPack(props) {
  const type = props.type || 'normal';
  return (
    <div
      className={`widget-pack ${type}`}
      onClick={props.onClick || null}
    >
      <div
        className={`poster bordered ${props.type === `small` ? `small` : null}`}
      >
        <Link href={`/pack/${props.id}`} >
          <a className="image-link">
            <img src={props.cover} alt="" />
          </a>
        </Link>

      </div>
      <a className="text-link">
        {props.type === `full` ? (
          <h1 className="title">{props.name}</h1>
        ) : (
            <h5 className="title">{props.name}</h5>
          )}
      </a>

      <p className="description">
        <span>{props.quantity}</span> illustrations
      </p>
    </div>
  );
}

export default WidgetPack;
