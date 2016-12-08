import React, { Component } from 'react';

class Content extends Component {
  render() {
    return (
<span className="Content">
{this.props.text}
</span>
    );
  }
}

export default Content;
