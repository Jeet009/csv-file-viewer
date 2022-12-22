import React, { useEffect, useState } from "react";
import queryString from "query-string";

function details() {
  const [detail, setDetail] = useState();
  useEffect(() => {
    const value = queryString.parse(window.location.search);
    setDetail(JSON.parse(value.data));
  }, []);

  return (
    <div>
      <br />
      <center>
        {detail && (
          <div>
            <h2>{detail.Name}</h2>
            <h2>{detail["Register Number"]}</h2>
            <h2>{detail["Personal Email"]}</h2>
            <h2>{detail.Mobile}</h2>
          </div>
        )}
      </center>
    </div>
  );
}

export default details;
