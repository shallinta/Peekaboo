/**
 * serve:dist脚本
 * @author Joe Zhong <zhong.zhi@163.com>
 * @module tools/serve:dist
 */

import path from 'path';
import Express from 'express';
import urlrewrite from 'packing-urlrewrite';
import packing, { rewriteRules, templateEngine } from '../config/packing';

// eslint-disable-next-line
const template = require(`packing-template-${templateEngine}`);

const { assetsDist, templatesPagesDist, mockPageInit } = packing.path;
const port = packing.port.dist;

const app = new Express();
app.use(Express.static(path.join(__dirname, '..', assetsDist)));
// app.use(Express.static(path.join(__dirname, '..', templatesPagesDist)));
app.use(urlrewrite(packing.rewriteRules));
app.use(template({
  templates: templatesPagesDist,
  mockData: mockPageInit,
  rewriteRules
}));

app.listen(port, (err) => {
  if (err) {
    console.error(err);
  } else {
    console.info('==> 🚧  Webpack development server listening on port %s', port);
  }
});
