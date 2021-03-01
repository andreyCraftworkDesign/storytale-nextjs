import Head from "next/head";
import Link from "next/link";
import React from "react";
import axios from "axios";

import BeforeFooter from "../components/before-footer/before-footer";
import Footer from "../components/footer/footer";
import Header from "../components/header/header";
import PacksList from "../components/packs-list/packs-list";
import IllustrationPack from "../components/illustration-pack/illustration-pack";
import ReadyTo from "../components/ready-to/ready-to";
import BrowseByMood from "../components/browse-by-mood/browse-by-mood";


const MAX_ELEMENTS = 12;
const MAX_PACKS = 20;

export default class About extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      data: this.props.data
    }

  }

  static async getInitialProps() {

    const firstResponce = await axios.get(`http://95.216.159.188:7003/api/pack`);

    const data = await firstResponce.data.result.packsData.filter(
      (item, index) => index < MAX_PACKS
    );

    const secondResponce = await axios.get(
      `http://95.216.159.188:7003/api/illustration?packId=1`
    );

    const thirdResponce = await axios.get(
      `http://95.216.159.188:7003/api/illustration?packId=2`
    );

    const fourResponce = await axios.get(
      `http://95.216.159.188:7004/api/illustration_log/getCreatedCount`
    );

    const { count } = await fourResponce.data.result;


    return {
      packs: data,
      firstPackInfo: data[0],
      secondPackInfo: data[1],
      firstPackIllustrations: secondResponce.data.result.illustrationData,
      secondPackIllustrations: thirdResponce.data.result.illustrationData,
      count,
    };
  }



  render() {

    const { count } = this.props;

    return (
      <>
        <Header />
        <section className="intro">
          <div className="container-custom">
            <div className="row">
              <div className="col-12">
                <div className="position-relative">
                  <img
                    src="/elements/01.svg"
                    alt=""
                    className="position-absolute first"
                  />
                  <img
                    src="/elements/02.svg"
                    alt=""
                    className="position-absolute second"
                  />
                  <img
                    src="/elements/03.svg"
                    alt=""
                    className="position-absolute third"
                  />
                  <img
                    src="/elements/04.svg"
                    alt=""
                    className="position-absolute fourth"
                  />
                  <img
                    src="/elements/05.svg"
                    alt=""
                    className="position-absolute fifth"
                  />
                  <img
                    src="/elements/06.svg"
                    alt=""
                    className="position-absolute sixth"
                  />
                  <img
                    src="/elements/07.svg"
                    alt=""
                    className="position-absolute seventh"
                  />
                </div>
              </div>
              <div className="col-lg-8 mx-auto">
                <h1 className="title">
                  <span className="illustrations-quantity">{count}</span>{" "}
                  high-class illustrations for web and mobile projects
                </h1>
                <p className="description">
                  Make your project eye-catching with these nice characters. Use
                  it for both commercial and personal purposes.
                </p>
                <section className="form">
                  <form>
                    <input
                      className="form-control form-control-lg"
                      type="text"
                      placeholder="Search for illustrations..."
                    />
                  </form>
                  <p className="example">
                    eg. <span>error 404</span>, <span>walkthrow</span>,{" "}
                    <span>business</span>, <span>3d</span>
                  </p>
                </section>
              </div>
            </div>
          </div>
        </section>

        <BrowseByMood />

        <section className="recent-arrivals section">
          <div className="container-custom">
            <div className="row">
              <div className="col">
                <h4 className="text-center header">Recent arrivals</h4>
              </div>
            </div>
          </div>
          {this.props.firstPackInfo != null ? (
            <IllustrationPack
              packInfo={this.props.firstPackInfo}
              packIllustrations={this.props.firstPackIllustrations}
            />
          ) : null}

          {this.props.secondPackInfo != null ? (
            <IllustrationPack
              classes="section"
              packInfo={this.props.secondPackInfo}
              packIllustrations={this.props.secondPackIllustrations}
            />
          ) : null}
        </section>

        <section className="browse-by-packs section">
          <div className="container-custom">
            <div className="row">
              <div class="col">
                <h4 class="text-center">Browse by packs</h4>
              </div>
            </div>
            <div className="row content-row">
              <div className="col-xl-10 col-lg-12 mx-auto">
                <PacksList
                  packs={this.props.packs}
                />
              </div>
            </div>
            <div className="row">
              <div className="col mx-auto">
                <a className="base-link mx-auto" href="/browse?pack=true" >Explore all packs</a>
              </div>
            </div>
          </div>
        </section>

        <section className="why-storytale section">
          <div className="container-custom">
            <div className="row">
              <div className="col">
                <h4 className="text-center">Why Storytale?</h4>
              </div>
            </div>
            <div className="row content-row">
              <div className="col-xl-10 mx-auto">
                <div className="wrapper">
                  <div className="advantage green">
                    <img src="/01@2x.png" width="180" height="auto" alt="" />
                    <h3 className="text-center title">
                      Storytale helps creators
                    </h3>
                    <p className="description text-center">
                      Big problem for designers that don’t have enough time or
                      even skills consists in illustrating their projects. We
                      solve this problem with a huge collection of illustrations
                      from best creators around the world.
                    </p>
                  </div>
                  <div className="advantage yellow">
                    <img src="/02@2x.png" width="220" height="auto" alt="" />
                    <h3 className="text-center title">
                      Boost of your projects
                    </h3>
                    <p className="description text-center">
                      Storytale is needed by designers, startupers,
                      entrepreneurs, and big corporates. All those who want to
                      enrich their projects with attractive stories and to
                      illustrate ideas their own stylish way.
                    </p>
                  </div>
                  <div className="advantage blue">
                    <img src="/03@2x.png" width="165" height="auto" alt="" />
                    <h3 className="text-center title">Get once, use forever</h3>
                    <p className="description text-center">
                      Illustrations downloaded once by subscription become yours
                      forever. You don't have to pay for subscription each month
                      to use the same illustrations. Just get them and use them
                      in your projects.
                    </p>
                  </div>
                  <div className="advantage purple">
                    <img src="/04@2x.png" width="190" height="auto" alt="" />
                    <h3 className="text-center title">It’s for digital</h3>
                    <p className="description text-center">
                      All illustrations can be used for websites, applications,
                      and presentations. Designers can include our illustrations
                      in their work and provide it to the client. In this case
                      your client doesn't have to buy a subscription.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <ReadyTo text="Ready to start design?" />
        <BeforeFooter />
        <Footer />
      </>
    );
  }
}
