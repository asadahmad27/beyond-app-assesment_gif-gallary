import Head from "next/head";
import React from "react";

const Meta = ({ gifDetails }) => {
  console.log(gifDetails, "Sep");
  return (
    <Head>
      <title>{gifDetails?.title || "GIF Details"}</title>
      <meta
        name="description"
        content={gifDetails?.title || "Details of the GIF"}
      />
      <meta property="og:title" content={gifDetails?.title || "GIF Details"} />
      <meta
        property="og:description"
        content={gifDetails?.title || "Details of the GIF"}
      />
      <meta property="og:image" content={gifDetails?.images?.original?.url} />
      <meta name="twitter:card" content="summary_large_image" />
    </Head>
  );
};

export default Meta;
