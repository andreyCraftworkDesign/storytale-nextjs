import React, { Component } from 'react';
import Link from "next/link";

class BrowseByMood extends Component {
  constructor(props) {
    super(props);
  }

  render() {

    return (
      <section className="browse-by-mood section">
        <div className="container-custom">
          <div className="row">
            <div className="col">
              <h4 className="text-center">Browse by mood</h4>
            </div>
          </div>
        </div>
        <div className="container-fluid p-0">
          <div class="container-custom">
            <div className="row content-row">
              <div className="col-auto item swiper-slide">
                <Link
                  href={`/browse/?moodId=1`}
                >
                  <a className="widget widget-3d">
                    <img src="/mood/01@2x.png" alt="" />
                    <p className="description">3D</p>
                  </a>
                </Link>
              </div>
              <div className="col-auto item swiper-slide">
                <Link
                  href={`/browse/?moodId=2`}
                >
                  <a className="widget widget-outline">
                    <img src="/mood/02@2x.png" />
                    <p class="description">Outline</p>
                  </a>
                </Link>
              </div>
              <div className="col-auto item swiper-slide">
                <Link
                  href={`/browse/?moodId=3`}
                >
                  <a className="widget widget-flat">
                    <img src="/mood/03@2x.png" />
                    <p className="description">Flat</p>
                  </a>
                </Link>
              </div>
              <div className="col-auto item swiper-slide">
                <Link
                  href={`/browse/?moodId=4`}
                >
                  <a className="widget widget-grainy">
                    <img src="/mood/04@2x.png" alt="" />
                    <p className="description">Grainy</p>
                  </a>
                </Link>
              </div>
              <div className="col-auto item swiper-slide">
                <Link
                  href={`/browse/?moodId=5`}
                >
                  <a className="widget widget-handdrawn">
                    <img src="/mood/05@2x.png" alt="" />
                    <p className="description">Handdrawn</p>
                  </a>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default BrowseByMood;
