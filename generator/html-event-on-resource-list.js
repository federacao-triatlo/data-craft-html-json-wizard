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
 * Creates a string with the HTML code to display the required resources list on the EventON page
 * of the Event selected on "Dashboard" sheet of the current Spreadsheet.
 *
 * @param {string} eventYear the given event's year
 * @param {string} databaseSheetId the given Google Sheets ID where the Event table is stored
 * @param {string} eventId the given event's ID
 * @param {string} eventReference the given event's reference
 * @param {string} tableEventOn the given EventON tabular data
 *
 * @returns the string with the HTML code to display the required resources list on the given event EventON page
 */
function createEventOnResourcesListHtml(eventYear, databaseSheetId, eventId, eventReference, tableEventOn) {
  const eventOnData = getEventEventOnData(eventYear, databaseSheetId, eventId, eventReference, tableEventOn);

  let html = '<div class="documents-list">' + '\n';

  eventOnData.forEach((file) => {
    html += '\t' + '<div class="documents-list__item">' + '\n';
    html +=
      '\t\t' +
      '<a href="' +
      file.linkUrl +
      '" target="_blank" rel="noopener">' +
      getFontAwsomeIconHtmlCode(file.linkType) +
      '<span class="documents-list__title">' +
      file.linkLabel +
      '</span></a>' +
      '\n';
    html += '\t' + '</div>' + '\n';
  });

  html += '</div>' + '\n';

  return html.replace(/\t/gi, '\x20\x20');
}

/**
 * Creates the HTML code to display the icon for the link of the given EventON resource link type.
 *
 * @param {string} linkType the given link type
 *
 * @returns the HTML code to display the icon for the link of the given EventON resource link type
 */
function getFontAwsomeIconHtmlCode(linkType) {
  let html = '';
  switch (linkType) {
    case 'GUIDE':
    case 'RULES':
    case 'COURSE_MAPS':
      html += '<span class="fa fa-file-pdf fa-2x"></span>';
      break;
    case 'TRACK':
      html += '<span class="fa fa-map fa-2x"></span>';
      break;
    case 'FORM':
      html += '<span class="fa fa-pencil-square-o fa-2x"></span>';
      break;
    case 'START_LIST':
      html += '<span class="fa fa-list fa-2x"></span>';
      break;
  }

  return html;
}
