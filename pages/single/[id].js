import React from "react";
import Link from "next/link";
import BeforeFooter from "../../components/before-footer/before-footer";
import Footer from "../../components/footer/footer";
import Header from "../../components/header/header";
import IllustrationsList from "../../components/illustrations-list/illustrations-list";
import { IconInfo } from "../../components/icons/icons";
import ReadyTo from "../../components/ready-to/ready-to";
import axios from "axios";

import { Popover } from 'antd';
import { useRouter } from 'next/router'

function SingleIllustration({data, illustrationsData}) {

  const router = useRouter()

  if (router.isFallback) {
    return <div>Loading...</div>
  }
  function onDownload(id) {

    axios({
      url: `http://95.216.159.188:7003/api/illustration/download/${id}`,
      method: 'GET',
      responseType: 'blob',
    }).then((response) => {
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'file.zip');
      document.body.appendChild(link);
      link.click();
    }).catch(function (error) {
      console.log(error);
    });
  }

  const content = (
    <div className="popup-element">
      <div className="left-column">
        <div className="item">
          <p className="title">Pack</p>
          <p className="description">
            {data && data.pack.name}
          </p>
        </div>
        <div className="item">
          <p className="title">Mood</p>
          <p className="description">
            {data && data.mood.name}
          </p>
        </div>
        <div className="item">
          <p className="title">File Types</p>
          <ul className="list">
            {
              data && data.assignedExtensions.map((key, index) => (
                  <li key={index}>
                    <p className="description">.{key}</p>
                  </li>
              ))
            }
          </ul>
        </div>
      </div>
      <div className="right-column">
        <div className="item">
          <p className="title">Category</p>
          <ul className="list">
            {
              data && data.categories.map((key, index) => (
                <li key={index}>
                  <p className="description">{key.name}</p>
                </li>
              ))
            }
          </ul>
        </div>
      </div>
    </div>
  );

  return (
    <div className="single-illustration-page">
      {/* {error === true ? <Redirect to="/error" /> : null} */}
      <Header />

      <div className="container-fluid">
        <div className="row">
          <div className="col">
            {data &&
            <Link
                href={`/pack/${data.pack.id}`}
            >
              <a className="button-icon neutral outline escape">
                <span>
                  <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M10 9V7.41C10 6.52 8.92 6.07 8.29 6.7L3.7 11.29C3.31 11.68 3.31 12.31 3.7 12.7L8.29 17.29C8.92 17.92 10 17.48 10 16.59V14.9C15 14.9 18.5 16.5 21 20C20 15 17 10 10 9Z"
                        fill="#18214D"
                    />
                  </svg>
                </span>
                <span>
                  {data.pack.name}
                </span>
              </a>
            </Link>}
          </div>
        </div>
      </div>
      <section className="single-product">
        <div className="container">
          <div className="row">
            <div className="col-xl-10 offset-xl-1 col-lg-12">
              <div className="widget-single-product">
                <div className="top"></div>
                <div className="middle">
                  <h1>
                    {data && data.name}
                  </h1>
                </div>
                <div className="bottom">
                  <a href="" className="button-icon neutral like">
                    <span>
                      <svg
                        width="25"
                        height="24"
                        viewBox="0 0 25 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M14.1545 20.13C13.3945 20.82 12.2245 20.82 11.4645 20.12L11.3545 20.02C6.1045 15.27 2.6745 12.16 2.8045 8.28C2.8645 6.58 3.7345 4.95 5.1445 3.99C7.7845 2.19 11.0445 3.03 12.8045 5.09C14.5645 3.03 17.8245 2.18 20.4645 3.99C21.8745 4.95 22.7445 6.58 22.8045 8.28C22.9445 12.16 19.5045 15.27 14.2545 20.04L14.1545 20.13Z"
                          fill="#000000"
                        />
                      </svg>
                    </span>
                    <span>0</span>
                  </a>

                  {data &&
                  <a
                      onClick={() => onDownload(data.id)}
                      className="button-icon blue"
                  >
                    <span>
                      <svg
                          width="25"
                          height="24"
                          viewBox="0 0 25 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M17.3945 9H15.8045V4C15.8045 3.45 15.3545 3 14.8045 3H10.8045C10.2545 3 9.8045 3.45 9.8045 4V9H8.2145C7.3245 9 6.8745 10.08 7.5045 10.71L12.0945 15.3C12.4845 15.69 13.1145 15.69 13.5045 15.3L18.0945 10.71C18.7245 10.08 18.2845 9 17.3945 9ZM5.8045 19C5.8045 19.55 6.2545 20 6.8045 20H18.8045C19.3545 20 19.8045 19.55 19.8045 19C19.8045 18.45 19.3545 18 18.8045 18H6.8045C6.2545 18 5.8045 18.45 5.8045 19Z"
                            fill="#ffffff"
                        />
                      </svg>
                    </span>
                    <span>Subscribe to download</span>
                  </a>
                  }
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="container">
          <div className="row illustration-row">
            <div className="col-xl-8 mx-auto">
              <div className="illustrations">
                <div className="product">
                  <a className="link">
                    {data && <img src={data.cover} /> }
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="container">
          <div className="row table-row">
            <div className="col-xl-8 mx-auto ">
              <div className="product-info">
                <div className="left-column">
                  <p className="header">Keywords</p>
                  <div className="list">
                    {data && data.keywords &&
                        data.keywords.map((key, index) => (
                          <a href="#" key={index}>
                            <span className="badge outline neutral">{key}</span>
                          </a>
                      ))
                    }
                  </div>
                </div>
                <div className="right-column">
                  <Popover content={content} trigger="click">
                    <a className="info-button"><IconInfo /> info</a>
                  </Popover>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="illustrations-pack section">
        <div className="container">
          <div className="row">
            <div className="col">
              <h4 className="text-center header">More from {data && data.pack.name} </h4>
            </div>
          </div>
        </div>

        <div className="container">
          <div className="row">
            <div className="col-12">
              {
                illustrationsData &&
                <IllustrationsList
                    pictures={illustrationsData}
                    onDownload={() => onDownload}
                />
              }
            </div>
          </div>
        </div>
      </section>

      <ReadyTo text="Like these pack?" />
      <BeforeFooter />
      <Footer />
    </div>
  );
}

export async function getStaticPaths() {

  const res = await axios.get(`http://95.216.159.188:7003/api/illustration`);
  const posts = await res.data.result.illustrationData;

  const paths = posts.map((post) => ({
    params: { 
      id: `${post.id}`
    }
  }))

  return { paths, fallback: true }
}


export async function getStaticProps({params}) {

  const res = await axios.get(`http://95.216.159.188:7003/api/illustration/${params.id}`);
  const data = await res.data.result.illustrationData;

  const responcePackIllustration = await axios.get(
    `http://95.216.159.188:7003/api/illustration?packId=${data.pack.id}`
  );

  const illustrationsData = await responcePackIllustration.data.result.illustrationData;

  return {
    props: {
      data,
      illustrationsData
    },
    revalidate: 1,
  }
}


export default SingleIllustration;

