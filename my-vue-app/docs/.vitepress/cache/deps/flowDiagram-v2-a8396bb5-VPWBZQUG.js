import {
  flowRendererV2,
  flowStyles
} from "./chunk-WAVEGCM2.js";
import {
  flowDb,
  parser$1
} from "./chunk-DK5LTWVP.js";
import "./chunk-KG3DDNBD.js";
import "./chunk-7NR6Z2SW.js";
import "./chunk-EWHW7MUL.js";
import "./chunk-PRETMUSG.js";
import "./chunk-PWVEJSRK.js";
import "./chunk-YN77UDVN.js";
import "./chunk-OUWEDHNM.js";
import "./chunk-EWO67WO4.js";
import "./chunk-X3LYIV2D.js";
import "./chunk-GEMPHCCH.js";
import {
  setConfig
} from "./chunk-VGLZHYFN.js";
import "./chunk-ZS7NZCD4.js";

// node_modules/.pnpm/mermaid@10.9.0/node_modules/mermaid/dist/flowDiagram-v2-a8396bb5.js
var diagram = {
  parser: parser$1,
  db: flowDb,
  renderer: flowRendererV2,
  styles: flowStyles,
  init: (cnf) => {
    if (!cnf.flowchart) {
      cnf.flowchart = {};
    }
    cnf.flowchart.arrowMarkerAbsolute = cnf.arrowMarkerAbsolute;
    setConfig({ flowchart: { arrowMarkerAbsolute: cnf.arrowMarkerAbsolute } });
    flowRendererV2.setConf(cnf.flowchart);
    flowDb.clear();
    flowDb.setGen("gen-2");
  }
};
export {
  diagram
};
//# sourceMappingURL=flowDiagram-v2-a8396bb5-VPWBZQUG.js.map
