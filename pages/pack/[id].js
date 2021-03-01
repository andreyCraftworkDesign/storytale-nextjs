import React, {PureComponent} from "react";
import BeforeFooter from "../../components/before-footer/before-footer";
import Footer from "../../components/footer/footer";
import Header from "../../components/header/header";
import ReadyTo from "../../components/ready-to/ready-to";

import IllustrationsList from "../../components/illustrations-list/illustrations-list";
import PacksList from "../../components/packs-list/packs-list";
import WidgetPack from "../../components/widget-pack/widget-pack";
import axios from 'axios';
import Link from "next/link";


export default class Pack extends PureComponent {

  constructor(props) {
    super(props);

    this.state = {
      packsData: this.props.packsData,
      pagination: this.props.pagination
    }

    this.handleMoreClick = this.handleMoreClick.bind(this);
    this.handlePackClick = this.handlePackClick.bind(this);
    this.onDownload = this.onDownload.bind(this);
  }

  static async getInitialProps(ctx) {
    const { id } = ctx.query;

    const responcePacks = await axios.get(`http://95.216.159.188:7003/api/pack`);
    const responcePack = await axios.get(`http://95.216.159.188:7003/api/pack/${id}`);
    const responcePackIllustration = await axios.get(`http://95.216.159.188:7003/api/illustration?packId=${id}`);

    const { cover, name, illustrationCount } = await responcePack.data.result.packData;
    const index = await responcePack.data.result.packData.id;

    const { illustrationData } = await responcePackIllustration.data.result;
    const { packsData, pagination } = await responcePacks.data.result;


    return {
      cover,
      name,
      illustrationCount,
      index,
      illustrationData,
      packsData,
      pagination,
    }
  }

  handleMoreClick(evt) {
    evt.preventDefault();
    const { currentPage, allPage } = this.state.pagination;

    if (currentPage < allPage) {
      this.onConcatRequest()
    }
  }

  handlePackClick(evt) {
    evt.preventDefault();

    axios.get(`http://95.216.159.188:7003/api/pack`, {
      params: {
        page: 1,
      }
    })
      .then((response) => {
        const { packsData, pagination } = response.data.result;
        this.setState({
          packsData,
          pagination,
        });
      })
  }

  onConcatRequest() {

    const currentStatePacks = [...this.state.packsData];
    const { currentPage } = this.state.pagination;

    axios.get(`http://95.216.159.188:7003/api/pack`, {
      params: {
        page: currentPage + 1,
      }
    })
      .then((response) => {
        const { packsData, pagination } = response.data.result;
        this.setState({
          packsData: currentStatePacks.concat(packsData),
          pagination,
        });
      })
  }

  onDownload(id) {
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

  render() {

    const { name, illustrationCount, cover, index, illustrationData } = this.props;
    const { packsData, pagination } = this.state;


    return (
      <div className="pack">
        <Header />
        <div class="container-fluid">
          <div class="row">
            <div class="col">
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
            </div>
          </div>
        </div>
        <div className="full-pack">
          <section className="illustrations-pack illustrations-pack-full">
            <div className="container-custom">
              <div className="row">
                <div className="col-auto mx-auto">
                  <WidgetPack
                    id={index}
                    name={name}
                    cover={cover}
                    quantity={illustrationCount}
                    type="full"
                  />
                </div>

                <div className="col-12">
                  <IllustrationsList
                    pictures={illustrationData}
                    onDownload={this.onDownload}
                  />
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
                <PacksList
                  packs={packsData}
                  onClick={this.handlePackClick}
                />
              </div>
            </div>
            <div className="row">
              <div className="col mx-auto">
                {pagination.currentPage < pagination.allPage ?
                  <a href="#" className="base-link mx-auto" onClick={this.handleMoreClick}>
                    Browse all packs
                   </a>
                  :
                  null
                }
              </div>
            </div>
          </div>
        </section>
        <BeforeFooter />
        <Footer />
      </div>
    );
  }
}

