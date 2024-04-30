/*
 * MIT License
 *
 * Copyright(c) 2023 Ricardo do Canto
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files(the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and / or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

/**
 * Creates the HTML code of the table's head to display the given data.
 *
 * @param {Array} data the data to be displayed in the table
 *
 * @returns the string with the HTML code of the table's head that displays the given data
 */
function createTableHeadHtml(data) {
  const resultsKeys = Object.keys(data[0]);
  const tableLabels = resultsKeys.filter((element) => {
    return element !== 'athleteID';
  });

  tableLabels.forEach((label, index, tableLabels) => {
    tableLabels[index] = getDisplayValue(label);
  });

  let html = '\t\t' + '<thead>' + '\n';
  html += '\t\t\t' + '<tr>' + '\n';

  tableLabels.forEach((label) => {
    html += '\t\t\t\t' + '<th>' + label + '</th>' + '\n';
  });

  html += '\t\t\t' + '</tr>' + '\n';
  html += '\t\t' + '</thead>' + '\n';

  return html.replace(/\t/gi, '\x20\x20');
}

/**
 * Creates the HTML code of the table's body to display the given data.
 *
 * @param {Array} data the data to be displayed in the table
 *
 * @returns the string with the HTML code of the table's body that displays the given data
 */
function createTableBodyHtml(data) {
  let html = '\t\t' + '<tbody>' + '\n';

  data.forEach((row) => {
    html += '\t\t\t' + '<tr>' + '\n';

    for (key in row) {
      if (key !== 'athleteID') {
        html += '\t\t\t' + '<td>' + row[key] + '</td>' + '\n';
      }
    }

    html += '\t\t\t' + '</tr>' + '\n';
  });

  html += '\t\t' + '</tbody>' + '\n';

  return html;
}
