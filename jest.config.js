import chalk from 'chalk';

export default {
  transform: {
    '^.+\\.(m?js|ts)$': 'babel-jest',
  },
  globals: {
    chalk: chalk.default, 
  },
};
