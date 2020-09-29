#!/usr/bin/env node
const chokidar = require('chokidar');
const diff = require('diff');
const fs = require('fs');
const path = require('path');

let lastState = '';

/**
 * Display changes in file state.
 * @param {string} fp - File path
 */
function onChange(fp) {
  console.info('File changed');
  read(fp).then(function (newState) {
    const ext = path.basename(fp);
    let d = '';
    if (ext === '.json') {
      try {
        const s1 = JSON.parse(lastState);
        const s2 = JSON.parse(newState);
        d = diff.diffJson(s1, s2);
      } catch (err) {
        console.error('failed to parse state', err);
      }
    } else {
      d = diff.diffLines(lastState, newState);
    }
    console.info(d);
    lastState = newState;
  })
  .catch(function(err) {
    console.error(err);
  })
}

/**
 * Read file.
 * @param {string} fp - File path
 */
function read(fp) {
  return new Promise(function(resolve, reject) {
    fs.readFile(fp, 'utf8', function(err, data) {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
}

/**
 * Watch file for changes.
 * @param {string} fp - File path
 */
function watch (fp) {
  const options = { persistent: true };
  const watcher = chokidar.watch(fp, options);
  watcher
    .on('add', path => console.info(`File ${path} has been added`))
    .on('change', path => onChange(path))
    .on('unlink', path => console.info(`File ${path} has been removed`));
}

if (process.argv.length < 2) {
  console.error('Please specify a file path to watch');
} else {
  var fp = process.argv[2];
  fs.access(fp, fs.constants.F_OK, function (err) {
    if (err) {
      console.error(`Can't read ${fp}`, err);
    } else {
      console.info(`Watching ${fp}`);
      read(fp).then(function (data) {
          lastState = data;
          watch(fp);
      });
    }
  });
}
