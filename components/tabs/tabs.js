import React, { Component } from 'react';

class Tabs extends Component {
  constructor(props) {
    super(props)

    this.handleClick = this.handleClick.bind(this);

  }

  handleClick(evt) {
      evt.preventDefault();
      Array.from(evt.currentTarget.closest("ul").querySelectorAll('a')).forEach(element => element.classList.remove('active'));
      evt.currentTarget.classList.add('active');
  }

    render() {
      const { array, current } = this.props;

      return (
        <div className="tabs">
          <ul className="nav nav-pills mx-auto" onClick={(evt) => this.props.updateData(evt)}>
          {array.map((item, index) =>
            <li
              className="nav-item"
              key={index}>
              <a
                className={`nav-link ${current === item.toLowerCase() ? `active` : null}`}
                href="#"
                onClick={this.handleClick}
                >
                {item}
                </a>
            </li>
          )}
          </ul>
        </div>
      );
    }
}

export default Tabs;
