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
 * Creates a string with the HTML code to display the results files list for the given Event.
 *
 * @param {String} eventYear the given event's year
 * @param {String} databaseSheetId the given Google Sheets ID where the Event table is stored
 * @param {String} eventId the event's ID
 * @param {String} eventReference the event's reference
 *
 * @returns the string with the HTML code to display the results files list for the given Event
 */
function createEventResultsFilesListHtml(eventYear, databaseSheetId, eventId, eventReference) {
  const resultsFiles = getResultsFilesByEventId(databaseSheetId, eventId)
    .filter((file) => {
      return file.active;
    })
    .sort((fileA, fileB) => {
      return fileA.displayOrder - fileB.displayOrder;
    });

  const fileBaseUrl = FILES_API_BASE_URL + eventYear + '/races/';

  let html = '<div class="results-files">' + '\n';
  html += '\t' + '<h2 class="results-files__header">Ficheiros</h2>' + '\n';

  resultsFiles.forEach((file) => {
    const linkTextPrefix =
      '" target="_blank" rel="noopener noreferrer"><span class="fa fa-file-pdf"></span><span class="results-files__title">';
    const linkTextSufix = '</span></a>';

    if (file.active) {
      const hrefValue = fileBaseUrl + file.fileName.substring(0, 18) + '/' + file.fileName;
      const linkText = file.title + ' - ' + file.subtitle;

      html += '\t' + '<div class="results-files__item">' + '\n';
      html += '\t\t' + '<a href="' + hrefValue + linkTextPrefix + linkText + linkTextSufix + '\n';
      html += '\t' + '</div>' + '\n';
    }
  });

  html += '</div>' + '\n';

  return html.replace(/\t/gi, '\x20\x20');
}
