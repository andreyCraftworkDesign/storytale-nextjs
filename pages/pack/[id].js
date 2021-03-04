import React, { useState } from "react";
import BeforeFooter from "../../components/before-footer/before-footer";
import Footer from "../../components/footer/footer";
import Header from "../../components/header/header";
import ReadyTo from "../../components/ready-to/ready-to";

import IllustrationsList from "../../components/illustrations-list/illustrations-list";
import PacksList from "../../components/packs-list/packs-list";
import WidgetPack from "../../components/widget-pack/widget-pack";
import axios from 'axios';
import Link from "next/link";

function Pack({ packIllustrations, allPacks, originalPagination  ,packInfo }) {

  const [packsData, setPacksData] = useState(allPacks);
  const [pagination, setPagination] = useState(originalPagination);

  function handleMoreClick (evt) {
    evt.preventDefault();
    const { currentPage, allPage } = originalPagination ;

    if (currentPage < allPage) {
      onConcatRequest()
    }
  }

  function onConcatRequest() {

    const currentStatePacks = [...packsData];
    const { currentPage } = pagination;

    axios.get(`http://95.216.159.188:7003/api/pack`, {
      params: {
        page: currentPage + 1,
      }
    })
      .then((response) => {
        const { packsData, pagination } = response.data.result;

        setPacksData(currentStatePacks.concat(packsData))
        setPagination(pagination)
      })
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

    return (
      <div className="pack">
        <Header />
        <div class="container-fluid">
          <div class="row">
            <div class="col">
              {packInfo &&
              <Link href={'/browse?pack=true'} >
                <a className="button-icon neutral outline escape">
                  <span>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" clipRule="evenodd" d="M10 9V7.41C10 6.52 8.92 6.07 8.29 6.7L3.7 11.29C3.31 11.68 3.31 12.31 3.7 12.7L8.29 17.29C8.92 17.92 10 17.48 10 16.59V14.9C15 14.9 18.5 16.5 21 20C20 15 17 10 10 9Z" fill="#18214D" />
                    </svg>
                  </span>
                  <span>Browse</span>
                </a>
              </Link>
              }
            </div>
          </div>
        </div>
        <div className="full-pack">
          <section className="illustrations-pack illustrations-pack-full">
            <div className="container-custom">
              <div className="row">
                <div className="col-auto mx-auto">
                  {packInfo &&
                   <WidgetPack
                    id={packInfo.index}
                    name={packInfo.name}
                    cover={packInfo.cover}
                    quantity={packInfo.illustrationCount}
                    type="full"
                  />
                  }
                </div>

                <div className="col-12">
                  {packIllustrations &&
                  <IllustrationsList
                    pictures={packIllustrations}
                    onDownload={onDownload}
                  />
                  }
                </div>
              </div>

            </div>
          </section>
        </div>

        <ReadyTo
          text="Like these illustrations?"
        />

        <section className="browse-by-packs section bordered">
          <div className="container-custom">
            <div className="row">
              <div className="col">
                <h4 className="text-center">Similar packs</h4>
              </div>
            </div>
            <div className="row content-row">
              <div className="col-auto mx-auto">
                {allPacks &&
                <PacksList
                    packs={packsData}
                    // onClick={handlePackClick}
                />
                }
              </div>
            </div>
            <div className="row">
              {originalPagination &&
              <div className="col mx-auto">
                {
                  pagination.currentPage < pagination.allPage &&
                  <a href="#" className="base-link mx-auto" onClick={handleMoreClick}>
                    Browse all packs
                  </a>
                }
              </div>
              }
            </div>
          </div>
        </section>
        <BeforeFooter />
        <Footer />
      </div>
    );
}

export async function  getStaticPaths() {

  const res = await axios.get(`http://95.216.159.188:7003/api/pack`);
  const packs = await res.data.result.packsData;

  const paths = packs.map((pack) => ({
    params: { 
      id: `${pack.id}`
    }
  }))

  return { paths, fallback: true }
}


export async function getStaticProps({params}) {

  const responcePacks = await axios.get(`http://95.216.159.188:7003/api/pack`);
  const responcePack = await axios.get(`http://95.216.159.188:7003/api/pack/${params.id}`);
  const responcePackIllustration = await axios.get(`http://95.216.159.188:7003/api/illustration?packId=${params.id}`);

  const packInfo = await responcePack.data.result.packData;
  const packIllustrations = await responcePackIllustration.data.result.illustrationData;
  const allPacks =  await responcePacks.data.result.packsData;
  const originalPagination = await responcePacks.data.result.pagination;

  return {
    props: {
      packIllustrations,
      allPacks,
      originalPagination ,
      packInfo,
    },
    revalidate: 1,
  }
}

export default Pack;

