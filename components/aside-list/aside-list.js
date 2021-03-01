import React, { Component } from 'react';
import AsideItem from "../aside-item/aside-item";

class AsideList extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <ul>
                {this.props.data.length > 0 ?
                    <AsideItem
                      id={this.props.data.length}
                      key={this.props.data.length}
                      onClick={() => this.props.onClick(null)}
                      value="All"
                    />
                    : null
                }
                {this.props.data.map((item, index) =>
                    <AsideItem
                      key={index}
                      id={index}
                      onClick={() => this.props.onClick(index)}
                      value={item.name}
                    />
                )}
            </ul>
          );
    }
}

export default AsideList;
