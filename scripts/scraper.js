const _ = require('lodash');
const axios = require('axios');
const {JSDOM} = require('jsdom');
const fs = require('fs');
const path = require('path');

const OUTPUT_FOLDER = './public/output';
const BASE_URL = 'http://51.81.32.185/l2knight_info/skills_pts/';
const CLASS_LIST = 'l2knight_skill_tree_list.html';

function _getHeaderValue(header) {
  return header.split(':')[1].trim();
}

function _getClassID(a) {
  return a.split('.').shift()
    .split('class_').pop();
}

axios.get(`${BASE_URL}/${CLASS_LIST}`).then(res => {
  const dom = new JSDOM(res.data);
  return Array.from(dom.window.document.querySelectorAll('a'))
    .map(a => _getClassID(a.href));
}).then(classIDs => {
  return Promise.all(classIDs.map(_scareClass));
}).then(res => {
  const index = res.map(({className, classID}) => ({
    className, classID
  }));
  return _writeToFile(index, 'index');
})

function _writeToFile(manifest, fileName = null) {
  fileName = fileName || manifest.className;
  const wrPath = path.format({dir: OUTPUT_FOLDER, base: `${fileName}.json` });
  return new Promise((res, rej) => {
    fs.writeFile(wrPath, JSON.stringify(manifest), err => {
      err ? rej(err) : res(manifest);
    });
  });
}

function _scareClass(id) {
  return axios.get(`${BASE_URL}/class_${id}.html`)
    .then(res => {
      const dom = new JSDOM(res.data);
      const header = dom.window.document.querySelector("h1").textContent;
      const levelSections = dom.window.document.querySelectorAll("h2");
      const output = Array.from(levelSections).map(h2 => {
        const table = h2.nextElementSibling;
        const keys = Array.from(table.querySelectorAll('th')).map(th => th.textContent);
        const skills = Array.from(table.querySelectorAll('tr')).map(tr => {
          const skillData = Array.from(tr.querySelectorAll('td'))
            .map(td => td.textContent === "" ? td.querySelector('img').src : td.textContent);
          return _.zipObject(keys, skillData);
        });
        return {
          lvl: _getHeaderValue(h2.textContent),
          skills: skills
        }
      });
      return {
        className: _getHeaderValue(header),
        classID: id,
        skillList: output,
        error: null
      }
    })
  .then(_writeToFile)
  .then((manifest) => {
    console.log(`${manifest.classID} was scraped`);
    return manifest
  })
  .catch((err) => {
    if (err.isAxiosError)
      return {
        classID: id,
        className: 'unknown',
        skillList: [],
        error: err.response.status
      }
  })
}
