import React, { Component } from 'react';

class BeforeFooter extends Component {
  constructor(props) {
    super(props);
  }

  render() {

    return (
      <section className={`before-footer`}>
        <div className="container-fluid p-0">
          <div className="container-custom">
            <div className="row">
              <div className="col-lg-6 item">
                <div className="order-custom-illustrations">
                  <div className="wrapper">
                    <div className="left">
                      <h3 className="title">Didn’t find what you were looking for?</h3>
                      <a href="#" className="big-link purple">Order custom illustrations</a>
                    </div>
                    <div className="right">
                      <img src="/05@2x.png" width="280" height="208" alt="" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-6  item">
                <div className="sign-up-newsletter">
                  <h3 className="title">Or sign up to our newsletters to catch new illustrations first</h3>
                  <form>
                    <div className="form-wrapper">
                      <div className="column">
                        <input type="email" className="form-control" placeholder="Your email" />
                      </div>
                      <div className="column">
                        <button type="submit" className="big-link green">Sign up</button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default BeforeFooter ;
