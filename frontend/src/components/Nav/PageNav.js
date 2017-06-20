import React from 'react';
import ToolTip from "./ToolTip.js";

class PageNav extends React.Component {

  render() {
    return (
      <div className="pageNav__header">
        <div className="pageNav__name">
          <h4>Team Messaging App</h4>
        <ToolTip />
        </div>
      </div>
    );
  }

}

export default PageNav;
