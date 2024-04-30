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
 * Gets the Event reference selected on the "Dashboard" sheet and saves, in the API Files html folder,
 * a file with the HTML code to display the EventResults web component for the selected Event reference.
 */
function saveEventResultsHtmlFile() {
  const eventReference = getSelectedEventReference();

  const html = createEventResultsHtml(eventReference);
  const fileName = eventReference + '.html';

  saveOrUpdateFile(getApiFilesHtmlFolder(), fileName, html, MimeType.HTML);
}

/**
 * Gets the Event's reference selected on the "Dashboard" sheet and the tabular data stored on the "TableLiveResults"
 * named range and then saves, in html folder in the API-Files folder, a file with the HTML code that displays
 * the live results of the selected Event.
 */
function saveLiveResultsHtmlFile() {
  const tableLiveResults = getLiveRacesTable();
  const eventReference = getSelectedEventReference();

  const html = createLiveResultsHtml(tableLiveResults);
  const fileName = eventReference + '-LIVE.html';

  saveOrUpdateFile(getApiFilesHtmlFolder(), fileName, html, MimeType.HTML);
}

/**
 * Gets the Year, the Google Sheet ID of the Year's Database file, the Event's ID and the Event's reference
 * selected on the "Dashboard" sheet and also the tabular data stored on the "TableEventOn" named range
 * of the current Spreadsheet and then saves, in html folder in the API-Files folder, a file with the HTML code
 * that lists the required files and links on the EventON page of the selected Event.
 */
function saveEventOnResourcesListHtmlFile() {
  const eventYear = getSelectedEventYear();
  const databaseSheetId = getSelectedYearDatabaseGoogleSheetId();
  const eventId = getSelectedEventId();
  const eventReference = getSelectedEventReference();
  const tableEventOn = getEventOnTable();

  const html = createEventOnResourcesListHtml(eventYear, databaseSheetId, eventId, eventReference, tableEventOn);
  const fileName = eventReference + '-EventON.html';

  const yearFolder = getOrCreateFolderByParentAndName(getApiFilesStartFolder(), eventYear);
  const eventResourceFolder = getOrCreateFolderByParentAndName(yearFolder, 'events');
  const eventFolder = getOrCreateFolderByParentAndName(eventResourceFolder, eventReference);
  getOrCreateFolderByParentAndName(eventFolder, 'event-files');

  saveOrUpdateFile(getApiFilesHtmlFolder(), fileName, html, MimeType.HTML);

  const alertMessage =
    'OPERAÇÂO EXECUTADA COM SUCESSO!' +
    '\n\n' +
    'O ficheiro com o código HTML pretendido foi guardado na pasta ' +
    '"API Files\\html" da drive partilhada "[FTP] Competições"' +
    '\n\n' +
    'Na pasta "API Files\\v1\\files\\' +
    eventYear +
    '\\events" da drive partilhada "[FTP] Competições" ' +
    'foi guardada a pasta do evento que deve ser colocada no servidor e que deve ser usada ' +
    'para fazer o upload dos ficheiros do evento.';

  SpreadsheetApp.getUi().alert(alertMessage);
}
