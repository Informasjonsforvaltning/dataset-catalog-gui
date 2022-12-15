import SvgIcon, { SvgIconTypes } from "@fellesdatakatalog/icons";
import React from "react";
import ReactDOMServer from "react-dom/server";


const svgIconAsSourceUrl = (name: SvgIconTypes, stroke?: string) => {
  let svg = ReactDOMServer.renderToString(<SvgIcon name={name} />);
  if( stroke ) {
    const regex = /stroke="([^"]*)"/ig;
    svg = svg.replaceAll(regex, `stroke="${stroke}"`);
  }
  return `data:image/svg+xml;base64, ${window.btoa(svg)}`;
};

export default svgIconAsSourceUrl;
