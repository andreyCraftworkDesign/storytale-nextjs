import React, { Component } from 'react';
import Link from "next/link";

function Product(props) {
  return (
    <div className="product" onClick={props.onClick || null}>
      <Link href={`/single/${props.id}`} >
        <a className="link" >
            <img src={props.cover} alt="" />
        </a>
      </Link>

      <div className="btn-wrapper">
        <a href="#" className="dialog-link dialog-link-like">
          <svg width="16" height="15" viewBox="0 0 16 15" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd" d="M9.07937 13.6986C8.4716 14.2504 7.53596 14.2504 6.92819 13.6906L6.84023 13.6107C2.64184 9.81214 -0.101104 7.3251 0.00285575 4.22229C0.0508373 2.86281 0.74657 1.55931 1.87414 0.791608C3.98532 -0.647838 6.59232 0.0239036 7.99978 1.67127C9.40724 0.0239036 12.0142 -0.655835 14.1254 0.791608C15.253 1.55931 15.9487 2.86281 15.9967 4.22229C16.1087 7.3251 13.3577 9.81214 9.15934 13.6267L9.07937 13.6986Z" fill="#A9A9A9" />
          </svg>
        </a>
        <a onClick={() => props.onDownload(props.id)} className="dialog-link dialog-link-download">
          <svg width="22" height="15" viewBox="0 0 22 15" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd" d="M17.7375 5.53667C17.1142 2.37417 14.3367 0 11 0C8.35083 0 6.05 1.50333 4.90417 3.70333C2.145 3.99667 0 6.33417 0 9.16667C0 12.2008 2.46583 14.6667 5.5 14.6667H17.4167C19.9467 14.6667 22 12.6133 22 10.0833C22 7.66333 20.1208 5.70167 17.7375 5.53667ZM15.5823 8.25002L11.3198 12.5125C11.1365 12.6958 10.8523 12.6958 10.669 12.5125L6.41564 8.25002H9.16564V4.58335H12.8323V8.25002H15.5823Z" fill="#A9A9A9" />
          </svg>
        </a>
      </div>
    </div>
  );
}

export default Product;
