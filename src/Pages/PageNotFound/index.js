import React from "react";

import "./styles.scss";
function PageNotFound() {
  return (
    <>
      <div className="page_notFound">
        <div className="page_notFound_heading">
          <h1>Page Not Found</h1>
          <p className="text_pageNotFound">
            Sorry, we could not reach the service, Please try again later.
          </p>
        </div>
      </div>
    </>
  );
}

export default PageNotFound;
