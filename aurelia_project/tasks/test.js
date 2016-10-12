import build from './build';
import * as gulp from 'gulp';
import {Server as Karma} from 'karma';
import {CLIOptions} from 'aurelia-cli';
import * as project from '../aurelia.json';

const watchFlag = CLIOptions.hasFlag('watch');

let buildAndRun = gulp.series(
  build,
  done => {
    new Karma({
      configFile: __dirname + '/../../karma.conf.js',
      singleRun: true
    }, (err) => {
      if (watchFlag) {
        done();
      } else {
        done(err);
      }
    }).start();
  }
);

function onChange(path) {
  console.log(`File Changed: ${path}`);
}

function watch() {
  gulp.watch(project.transpiler.source, buildAndRun).on('change', onChange);
  gulp.watch(project.markupProcessor.source, buildAndRun).on('change', onChange);
  gulp.watch(project.cssProcessor.source, buildAndRun).on('change', onChange);
  gulp.watch(project.unitTestRunner.source, buildAndRun).on('change', onChange);
}

let exec;

if (watchFlag) {
  exec = gulp.series(
    buildAndRun,
    watch
  );
} else {
  exec = buildAndRun;
}

export default exec;
