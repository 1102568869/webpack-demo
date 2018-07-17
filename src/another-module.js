import _ from 'lodash';
import './static/styles.css';
import './static/another.css';
import printMe from './print.js';

printMe();
console.log(
    _.join(['Another', 'module', 'lalala!'], ' ')
);