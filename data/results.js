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
 * Gets the race results stored in the given range name of the Google Sheets file with the given ID.
 *
 * @param {String} resultsSheetId the Google Sheets ID where the race results are stored
 * @param {String} resultsRangeName the Google Sheets range name of the required race results
 *
 * @returns the results list of the race stored with the given range name of the given Google Sheets file
 */
function getResultsByRangeName(resultsSheetId, resultsRangeName) {
  let tableResults;
  try {
    tableResults = SpreadsheetApp.openById(resultsSheetId)
      .getRangeByName(resultsRangeName)
      .getDisplayValues()
      .filter((record) => {
        return record[0];
      });
  } catch (error) {
    return [];
  }
  const tableResultsFields = tableResults.shift();

  const hiddenFields = ['athleteID', 'status', 'hidden'];

  const results = [];
  tableResults.map((tableResultsRecord) => {
    const result = {};
    tableResultsFields.map((key, columnIndex) => {
      if (key && !hiddenFields.includes(key)) {
        result[key] = tableResultsRecord[columnIndex];
      }
    });

    results.push(result);
  });

  return results;
}
