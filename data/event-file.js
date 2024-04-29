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
 * Gets the event's files stored in the Google Sheets file with the given ID.
 *
 * @param {String} databaseSheetId the Google Sheets file ID where the EventFiles table is stored
 *
 * @returns the list of event's files stored in the Google Sheets file with the given ID
 */
function getEventFilesByDatabaseSheetId(databaseSheetId) {
  let tableEventFile;
  try {
    tableEventFile = SpreadsheetApp.openById(databaseSheetId)
      .getRangeByName(RANGE_TABLE_EVENT_FILE)
      .getDisplayValues()
      .filter((record) => {
        return record[0];
      });
  } catch (error) {
    return [];
  }
  const tableEventFilesFields = tableEventFile.shift();

  const eventFiles = [];
  tableEventFile.map((tableEventFilesRecord) => {
    const eventFile = {};
    tableEventFilesFields.map((key, columnIndex) => {
      if (key) {
        eventFile[key] =
          key == 'active' ? getBoolean(tableEventFilesRecord[columnIndex]) : tableEventFilesRecord[columnIndex];
      }
    });

    eventFiles.push(eventFile);
  });

  return eventFiles;
}

/**
 * Gets the Event's files with a given event ID that is stored in the Google Sheets file with the given ID.
 *
 * @param {String} databaseSheetId the Google Sheets file ID where the EventFiles table is stored
 * @param {String} eventId the ID of the required event
 *
 * @returns the list of event's files with the given event ID stored in the Google Sheets file with the given ID
 */
function getEventFilesByEventId(databaseSheetId, eventId) {
  const eventFiles = getEventFilesByDatabaseSheetId(databaseSheetId);

  return eventFiles.filter((eventFile) => {
    return eventFile.eventID == eventId;
  });
}
