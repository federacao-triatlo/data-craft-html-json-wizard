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
 * Gets the data of the EventON resources list.
 *
 * @param {String} eventYear the event's year
 * @param {String} databaseSheetId the Google Sheets file ID where the Event table is stored
 * @param {String} eventId the event's ID
 * @param {String} eventReference the event's reference
 *
 * @returns the data of the EventON resources list
 */
function getEventEventOnData(eventYear, databaseSheetId, eventId, eventReference, tableEventOn) {
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
  tableEventFile.shift();

  const filteredTableEventFile = tableEventFile.filter((record) => {
    return record[1] === eventId && getBoolean(record[4]) && record[6] !== 'POSTER' && record[6] !== 'COVER_IMAGE';
  });

  let eventResources = [];
  filteredTableEventFile.forEach((record) => {
    const eventResource = {};
    eventResource.linkType = record[6];
    eventResource.linkLabel = record[2];
    eventResource.linkUrl = FILES_API_BASE_URL + eventYear + '/events/' + eventReference + '/event-files/' + record[5];

    eventResources.push(eventResource);
  });

  const startLists = eventResources.filter((eventResource) => {
    return eventResource.linkType === 'START_LIST';
  });

  eventResources = eventResources.filter((eventResource) => {
    return eventResource.linkType !== 'START_LIST';
  });

  const eventOnFields = tableEventOn.shift();

  tableEventOn.forEach((record) => {
    const eventResource = {};
    eventOnFields.forEach((field, columnIndex) => {
      eventResource[field] = record[columnIndex];
    });

    eventResources.push(eventResource);
  });

  startLists.forEach((startList) => {
    eventResources.push(startList);
  });

  return eventResources;
}
