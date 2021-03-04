import React, {PureComponent} from "react";
import axios from "axios";

import AsideItem from "../components/aside-item/aside-item";
import PacksList from "../components/packs-list/packs-list";
import IllustrationsList from "../components/illustrations-list/illustrations-list";
import Tabs from "../components/tabs/tabs";
import BeforeFooter from "../components/before-footer/before-footer";
import Footer from "../components/footer/footer";
import Header from "../components/header/header";
import { selectElement, filterArray } from "../utils/utils";


const TYPES = ["Type", "Mood", "Categories"];
const SHOW_CATEGORIES = 13;

class Browse extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      activeFilter: this.props.activeFilter,
      packsData: this.props.packsData,
      illustrationData: this.props.illustrationData,
      categoriesActive: [],
      moreCategories: SHOW_CATEGORIES,
      typesActive: this.props.typesActive,
      moodsActive: this.props.moodsActive,
      categoryIds: [],
      pagination: this.props.pagination,
      params: this.props.params,
    };

    this.onChangeRequest = this.onChangeRequest.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleSelectClick = this.handleSelectClick.bind(this);
    this.handleTypesClick = this.handleTypesClick.bind(this);
    this.handleCategoriesClick = this.handleCategoriesClick.bind(this);
    this.handleMoodsClick = this.handleMoodsClick.bind(this);
    this.handleMoreClick = this.handleMoreClick.bind(this);
    this.handleAllClick = this.handleAllClick.bind(this);
    this.handleShowMoreClick = this.handleShowMoreClick.bind(this);
    this.onDownload = this.onDownload.bind(this);
  }

  static async getInitialProps(ctx) {

    let search = {
      params: ctx.query
    };

    const { moodId = null, typeId = null , pack} = ctx.query;
    let activeFilter, pagination, moodsActive, typesActive;

    let params = {
      typeId: null,
      moodId: null,
      categoryIds: null,
      page: 1,
    }


    const requestIllustrations = await axios.get(`http://95.216.159.188:7003/api/illustration`, search);
    const requestTypes = await axios.get(`http://95.216.159.188:7003/api/type`);
    const requestMoods = await axios.get(`http://95.216.159.188:7003/api/mood`);
    const requestCategories = await axios.get(`http://95.216.159.188:7003/api/category`);
    const requestPacks = await axios.get(`http://95.216.159.188:7003/api/pack`);

    const { moodsData } = requestMoods.data.result;
    const { typesData } = requestTypes.data.result;
    const { categoriesData } = requestCategories.data.result;
    const { illustrationData } = requestIllustrations.data.result;
    const { packsData } = requestPacks.data.result;


    if (pack) {
      activeFilter = 'packs';
      pagination = requestPacks.data.result.pagination;
    } else {
      activeFilter = 'illustrations';
      pagination = requestIllustrations.data.result.pagination;
      moodsActive = moodId;
      typesActive = typeId;

      params = Object.assign({}, params);
      params.typeId = typeId;
      params.moodId = moodId;

    }

    return {
      moodsData,
      typesData,
      moodsActive,
      typesActive,
      categoriesData,
      illustrationData,
      packsData,
      pagination,
      activeFilter,
      params,
    };
  }

  //click on more trigger (more button)
  handleMoreClick(evt) {
    evt.preventDefault();
    const { currentPage, allPage } = this.state.pagination;
    let { activeFilter } = this.state;

    if (currentPage < allPage) {
      this.setState(
        prevState => {
          let params = Object.assign({}, prevState.params);
          params.page = currentPage + 1;
          return { params };
        },
        () => this.onConcatRequest(this.state.params, activeFilter)
      );
    }
  }

  onConcatRequest(reguest, type) {

    const { illustrationData, packsData } = this.state;
    const illustrationDataClone = [...illustrationData];
    const packsDataClone = [...packsData];

    let search = {
      params: reguest
    };

    if (type === "illustrations") {
      axios
        .get(`http://95.216.159.188:7003/api/illustration`, search)
        .then(response => {
          const { illustrationData, pagination } = response.data.result;

          console.log('illustrations');

          this.setState({
            illustrationData: illustrationDataClone.concat(illustrationData),
            pagination,
          });
        }).catch(function (error) {
          console.log(error);
        });
    } else {
      axios
        .get(`http://95.216.159.188:7003/api/pack`, {
          params: {
            page: this.state.params.page
          }
        })
        .then(response => {
          const { packsData, pagination } = response.data.result;

          this.setState({
            packsData: packsDataClone.concat(packsData),
            pagination,
          });
        }).catch(function (error) {
          console.log(error);
        });
    }
  }

  //click on type trigger
  handleTypesClick(i) {
    let target;
    {
      i === 0 ? (target = null) : (target = i);
    }

    this.setState(
      prevState => {
        let params = Object.assign({}, prevState.params);
        params.typeId = target;
        params.page = 1;

        return {
          params,
          typesActive: i
        };
      },
      () => this.onChangeRequest(this.state.params)
    );
  }

  //click on categories trigger
  handleCategoriesClick(i) {
    const categories = this.state.categoriesActive.slice();
    categories[i] = !categories[i];

    const customArray = this.state.categoryIds.concat(
      selectElement(categories)
    );

    this.setState(
      prevState => {
        let params = Object.assign({}, prevState.params);
        params.categoryIds = [...new Set(customArray)];
        params.page = 1;

        return {
          params,
          categoriesActive: categories,
          currentPage: 1
        };
      },
      () => this.onChangeRequest(this.state.params)
    );
  }

  //click on moods trigger
  handleMoodsClick(i) {
    let target;
    {
      i === 0 ? (target = null) : (target = i);
    }

    this.setState(
      prevState => {
        let params = Object.assign({}, prevState.params);
        params.moodId = target;
        params.page = 1;
        return {
          params,
          moodsActive: i,
          currentPage: 1
        };
      },
      () => this.onChangeRequest(this.state.params)
    );
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

  //click on all trigger (all button)
  handleAllClick(evt) {
    this.setState(
      prevState => {
        let params = Object.assign({}, prevState.params);
        params.categoryIds = null;
        return {
          params,
          categoriesActive: this.state.categoriesActive.fill(false),
          categoryIds: []
        };
      },
      () => this.onChangeRequest(this.state.params)
    );
  }

  //click on tabs
  handleClick(evt) {

    if (evt.target.innerHTML.toLowerCase() === "packs") {

      this.setState({
        activeFilter: "packs"
      });

      const requestPacks = axios.get(`http://95.216.159.188:7003/api/pack`);
      axios.all([requestPacks]).then(
        axios.spread((...responses) => {
          const responseOne = responses[0];
          const { packsData, pagination } = responseOne.data.result;

          this.setState({
            packsData,
            pagination,
          });
        })
      ).catch(function (error) {
        console.log(error);
      });

    } else if (evt.target.innerHTML.toLowerCase() === "illustrations") {

      this.setState({
        activeFilter: "illustrations",
      });

      const requestIllustrations = axios.get(`http://95.216.159.188:7003/api/illustration/`);

      axios.all([
        requestIllustrations
      ]).then(
        axios.spread((...responses) => {
          const responseOne = responses[0];

          const { illustrationData, pagination } = responseOne.data.result;

          this.setState(
            prevState => {
              let params = Object.assign({}, prevState.params);
              params.typeId = null;
              params.moodId = null;
              params.categoryIds = null;
              params.page = 1;

              return {
                params,
                illustrationData,
                pagination,
                typesActive: 0,
                moodsActive: 0,
                categoriesActive: [],
                moreCategories: SHOW_CATEGORIES,
              };
            }
          );
        })
      ).catch(function (error) {
        console.log(error);
      });
    }
  }

  //click on show more trigger (show more button)
  handleShowMoreClick() {
    this.setState({
      moreCategories: 999
    });
  }

  onChangeRequest(reguest) {
    let search = {
      params: reguest
    };

    axios
      .get(`http://95.216.159.188:7003/api/illustration`, search)
      .then(response => {
        const { illustrationData, pagination } = response.data.result;

        this.setState({
          illustrationData,
          pagination,
        });
      }).catch(function (error) {
        console.log(error);
      });
  }

  handleSelectClick(evt) {
    let target = $(evt.target);
    target.next().toggleClass("d-block");
  }

  render() {

    const { moodsData, typesData, categoriesData } = this.props;
    const { activeFilter, illustrationData, packsData, typesActive, moodsActive, categoriesActive, moreCategories, pagination } = this.state;
 
    const activeElements = selectElement(categoriesActive);
    const categoriesArray = filterArray(categoriesData, moreCategories);

    console.log(pagination);

    return (
      <div className="browse">
        <Header />

        <section className="intro">
          <div className="container-custom">
            <div className="row">
              <div className="col-12">
                <div className="position-relative">
                  <img
                    src="/elements/08.svg"
                    alt=""
                    className="position-absolute first"
                  />
                  <img
                    src="/elements/09.svg"
                    alt=""
                    className="position-absolute second"
                  />
                  <img
                    src="/elements/10.svg"
                    alt=""
                    className="position-absolute fourth"
                  />
                  <img
                    src="/elements/13.svg"
                    alt=""
                    className="position-absolute fifth"
                  />
                  <img
                    src="/elements/11.svg"
                    alt=""
                    className="position-absolute sixth"
                  />
                  <img
                    src="/elements/12.svg"
                    alt=""
                    className="position-absolute seventh"
                  />
                </div>
              </div>
              <div className="col-lg-8 mx-auto">
                <h1 className="title"> Browse all illustrations</h1>
                <Tabs
                  array={[`Illustrations`, `Packs`]}
                  updateData={this.handleClick}
                  current={activeFilter}
                />

                {activeFilter === 'illustrations' &&
                  <section className="form ">
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
                }

              </div>
            </div>
          </div>
        </section>

        <section className="aside position-relative">
          <div className="container-custom">
            <div className="row">
            
              {activeFilter === 'illustrations' &&
                <div className="col-lg-2 col-md-3 p-0 aside-column">
                  <div className="wrapper">
                    <div className="container-custom">
                      <div className="collapse-wrapper">
                        <div className="item">
                          <a
                            className="btn collapse-btn"
                            onClick={this.handleSelectClick}
                          >
                            {TYPES[0]}
                            <span>
                              <svg
                                width="8"
                                height="6"
                                viewBox="0 0 8 6"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  fillRule="evenodd"
                                  clipRule="evenodd"
                                  d="M7.14885 2.33992C7.53938 1.9494 7.53938 1.31623 7.14885 0.925706C6.75833 0.535181 6.12516 0.535181 5.73464 0.925706L5.08554 1.5748C4.33656 2.32378 3.12222 2.32379 2.37323 1.5748L1.73626 0.937825C1.33906 0.540632 0.695087 0.540632 0.297895 0.937825C-0.0992977 1.33502 -0.0992984 1.97899 0.297894 2.37618L2.99084 5.06913C3.38804 5.46633 4.03201 5.46633 4.4292 5.06913L5.14599 4.35235C5.14731 4.35102 5.14731 4.34888 5.14599 4.34756C5.14467 4.34624 5.14467 4.3441 5.14599 4.34278L7.14885 2.33992Z"
                                  fill="black"
                                />
                              </svg>
                            </span>
                          </a>
                          <div className="collapse collapse-element d-block">
                            <ul>
                              {typesData.length > 0 ? (
                                <AsideItem
                                  id={0}
                                  current={+this.state.typesActive}
                                  key={0}
                                  onClick={() => this.handleTypesClick(0)}
                                  value="All"
                                />
                              ) : null}
                              {typesData.map((type, index) => (
                                <AsideItem
                                  key={index + 1}
                                  current={+this.state.typesActive}
                                  id={index + 1}
                                  onClick={() => this.handleTypesClick(index + 1)}
                                  value={type.name}
                                />
                              ))}
                            </ul>
                          </div>
                        </div>

                        <div className="item">
                          <a
                            className="btn collapse-btn"
                            onClick={this.handleSelectClick}
                          >
                            {TYPES[1]}
                            <span>
                              <svg
                                width="8"
                                height="6"
                                viewBox="0 0 8 6"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  fillRule="evenodd"
                                  clipRule="evenodd"
                                  d="M7.14885 2.33992C7.53938 1.9494 7.53938 1.31623 7.14885 0.925706C6.75833 0.535181 6.12516 0.535181 5.73464 0.925706L5.08554 1.5748C4.33656 2.32378 3.12222 2.32379 2.37323 1.5748L1.73626 0.937825C1.33906 0.540632 0.695087 0.540632 0.297895 0.937825C-0.0992977 1.33502 -0.0992984 1.97899 0.297894 2.37618L2.99084 5.06913C3.38804 5.46633 4.03201 5.46633 4.4292 5.06913L5.14599 4.35235C5.14731 4.35102 5.14731 4.34888 5.14599 4.34756C5.14467 4.34624 5.14467 4.3441 5.14599 4.34278L7.14885 2.33992Z"
                                  fill="black"
                                />
                              </svg>
                            </span>
                          </a>
                          <div className="collapse collapse-element d-block">
                            <ul>
                              {moodsData.length > 0 ? (
                                <AsideItem
                                  id={0}
                                  key={0}
                                  current={+this.state.moodsActive}
                                  onClick={() => this.handleMoodsClick(0)}
                                  value="All"
                                />
                              ) : null}
                              {moodsData.map((mood, index) => (
                                <AsideItem
                                  key={index + 1}
                                  id={index + 1}
                                  current={+this.state.moodsActive}
                                  onClick={() => this.handleMoodsClick(index + 1)}
                                  value={mood.name}
                                />
                              ))}
                            </ul>
                          </div>
                        </div>

                        <div className="item">
                          <a
                            className="btn collapse-btn"
                            onClick={this.handleSelectClick}
                          >
                            {TYPES[2]}
                            <span>
                              <svg
                                width="8"
                                height="6"
                                viewBox="0 0 8 6"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  fillRule="evenodd"
                                  clipRule="evenodd"
                                  d="M7.14885 2.33992C7.53938 1.9494 7.53938 1.31623 7.14885 0.925706C6.75833 0.535181 6.12516 0.535181 5.73464 0.925706L5.08554 1.5748C4.33656 2.32378 3.12222 2.32379 2.37323 1.5748L1.73626 0.937825C1.33906 0.540632 0.695087 0.540632 0.297895 0.937825C-0.0992977 1.33502 -0.0992984 1.97899 0.297894 2.37618L2.99084 5.06913C3.38804 5.46633 4.03201 5.46633 4.4292 5.06913L5.14599 4.35235C5.14731 4.35102 5.14731 4.34888 5.14599 4.34756C5.14467 4.34624 5.14467 4.3441 5.14599 4.34278L7.14885 2.33992Z"
                                  fill="black"
                                />
                              </svg>
                            </span>
                          </a>
                          <div className="collapse collapse-element d-block">
                            <ul>
                              {categoriesArray.length > 0 ? (
                                <AsideItem
                                  id={0}
                                  key={0}
                                  current={activeElements.length > 0 ? null : 0}
                                  onClick={this.handleAllClick}
                                  value="All"
                                />
                              ) : null}
                              {categoriesArray.map((category, index) => (
                                <AsideItem
                                  key={index + 1}
                                  id={index + 1}
                                  cross={true}
                                  onClick={() =>
                                    this.handleCategoriesClick(index + 1 + "")
                                  }
                                  current={
                                    activeElements.indexOf(index + 1 + "") != -1
                                      ? index + 1
                                      : null
                                  }
                                  value={category.name}
                                />
                              ))}
                              {moreCategories <= SHOW_CATEGORIES ? (
                                <AsideItem
                                  id={-1}
                                  value="show more"
                                  more={true}
                                  onClick={this.handleShowMoreClick}
                                />
                              ) : null}
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              }

              <div className="col main-content">
                {activeFilter === 'illustrations' &&
                  <section className="illustrations-pack">
                    <IllustrationsList
                      onDownload={this.onDownload}
                      pictures={illustrationData}
                    />
                  </section>
                }

                {activeFilter === 'packs' &&
                  <section className="browse-by-packs">
                    <PacksList packs={packsData} />
                  </section>
                }

                <div className="row">
                  <div className="col mx-auto">
                    {pagination.currentPage < pagination.allPage ? (
                      <a
                        href="#"
                        className="base-link mx-auto"
                        onClick={this.handleMoreClick}
                      >
                        Load more {activeFilter === 'packs' ? 'packs' : 'illustrations'}
                      </a>
                    ) : null}
                  </div>
                </div>
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


export default Browse;
