#!/usr/bin/env node

// AQUÍ VAN LOS COMANDOS ***CLI***

import { mdLinks } from "./mdlinks.js";
import chalk from "chalk";
import { argv } from "process"; // libreria para leer argumentos de la terminal
// importo  mdLinks
// console.log("hola");

const CLI = () => {
  const path = argv[2];
  const validate = argv.includes("--validate");
  const stats = argv.includes("--stats");
  const help = argv.includes("--help");

  if (argv[2] === undefined) {
    console.log(
    //  chalk.cyan(`Por favor, ve a path ${chalk.yellow("--help")}.`)
    );
  } else if (help) {
    console.log(chalk("Usage: md-link <path-to-file> [options]"));
    console.log(chalk.bold("\nOptions:"));
    console.log(chalk.yellow("\t only path"));
    console.log(chalk.yellow("\t--validate"));
    console.log(chalk.yellow("\t--stats"));
    console.log(chalk.yellow("\t--validate --stats"));
    console.log("\n");

    // ...solo muestra path
  } else if (path && !validate && !stats) {
    mdLinks(path, { validate: false })
      .then((links) => console.log(links))
      .catch((err) => console.error(err));
    //...Muestra path y validate

  } else if (path && validate && !stats) {
    mdLinks(path, { validate: true })
      .then((links) => console.log(links))
      .catch((err) => console.error(err));
    //..muestra validate y stats
  }
  /*
  else if (!path && validate && stats) {
    mdLinks(path, { validate: true, stats: true })
        .then((links) => {
            console.log(chalk.yellowBright(`Total Links: ${stats.total}`));
            console.log(chalk.underline.green(`Unique: ${stats.unique}`));
            console.log(chalk.red(`Broken: ${stats.broken}\n`));
        })
        .catch((err) => {
            console.log(`Error:${chalk.yellowBright(err)}`);
        });
      }
      */
};

import figlet from "figlet";

figlet("Las bicicletas \n de Navidad \n son las mejores \n en calidad.", function (err, data) {
  if (err) {
    console.log("Ocurrió un error al generar el letrero.");
    console.dir(err);
    return;
  }
  console.log(data);
});


CLI();
