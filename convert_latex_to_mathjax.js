#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const glob = require('glob');

/**
 * Convert LaTeX notation to MathJax notation.
 * @param {string} latexValue - The LaTeX value to convert
 * @returns {string} The converted MathJax value
 */
function convertLatexToMathJax(text) {
  // Regex to match content between \\ and \\ pairs
  const regex = /\\(.*?)\\(?![\\])/gs;

  // Replace each matched pattern with the same content surrounded by $$ pairs
  const converted = text.replace(regex, (match, content) => {
    // Return the content wrapped in $$ markers
    return `$${content}$`;
  });

  return converted;
}

/**
 * Process a JSON file to convert LaTeX to MathJax
 * @param {string} filePath - Path to the JSON file
 * @returns {boolean} Success or failure
 */
function processJsonFile(filePath) {
  console.log(`Processing: ${filePath}`);
  try {
    // Read and parse the JSON file
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

    // Check file structure to determine how to process it
    if (
      Array.isArray(data) &&
      data.every((item) => typeof item === 'object' && 'latex' in item)
    ) {
      // Sample equations format
      for (const item of data) {
        if ('latex' in item) {
          item.latex = convertLatexToMathJax(item.latex);
        }
      }
    } else if (
      typeof data === 'object' &&
      'symbols' in data &&
      Array.isArray(data.symbols)
    ) {
      // Symbol library format
      for (const symbol of data.symbols) {
        if ('val' in symbol) {
          symbol.val = convertLatexToMathJax(symbol.val);
        }
        if ('lbl' in symbol) {
          symbol.lbl = convertLatexToMathJax(symbol.lbl);
        }
      }
    }

    // Save the updated data
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

    return true;
  } catch (err) {
    console.error(`Error processing ${filePath}: ${err.message}`);
    return false;
  }
}

/**
 * Main function to find and process all JSON files
 */
function main() {
  const baseDir =
    '/Users/phi/Documents/projects/phi0411141/LaTeXly/src/lib/constants/latex';
  let successful = 0;
  let failed = 0;

  // Find all JSON files in the directory and subdirectories
  const jsonFiles = glob.sync(`${baseDir}/**/*.json`);

  for (const jsonFile of jsonFiles) {
    if (processJsonFile(jsonFile)) {
      successful++;
    } else {
      failed++;
    }
  }

  console.log(
    `\nConversion complete. Successfully processed ${successful} files. Failed: ${failed}`,
  );
}

// Execute the main function
main();
