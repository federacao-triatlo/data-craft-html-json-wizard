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
 * Gets the organizers stored in the Google Sheets file with the given ID.
 *
 * @param {String} databaseSheetId the Google Sheets file ID where the Organizer table is stored
 *
 * @returns the list of organizers stored in the Google Sheets file with the given ID
 */
function getOrganizersByDatabaseSheetId(databaseSheetId) {
  let tableOrganizer;
  try {
    tableOrganizer = SpreadsheetApp.openById(databaseSheetId)
      .getRangeByName(RANGE_TABLE_ORGANIZER)
      .getDisplayValues()
      .filter((record) => {
        return record[0];
      });
  } catch (error) {
    return [];
  }
  const tableOrganizerFields = tableOrganizer.shift();

  const organizers = [];
  tableOrganizer.map((tableOrganizerRecord) => {
    const organizer = {};
    tableOrganizerFields.map((key, columnIndex) => {
      organizer[key] = tableOrganizerRecord[columnIndex];
    });

    organizers.push(organizer);
  });

  return organizers;
}

/**
 * Gets the organizers with a given event ID stored in the Google Sheets file with the given ID.
 *
 * @param databaseSheetId the Google Sheets file ID where the Organizer table is stored
 * @param eventId the ID of the required event
 *
 * @returns the list of organizers with the given event ID stored in the Google Sheets file with the given ID
 */
function getOrganizersByEventId(databaseSheetId, eventId) {
  const organizers = getOrganizersByDatabaseSheetId(databaseSheetId);
  const tableEventOrganizer = SpreadsheetApp.openById(databaseSheetId)
    .getRangeByName(RANGE_TABLE_EVENT_ORGANIZER)
    .getDisplayValues()
    .filter((record) => {
      return record[0];
    })
    .slice(1);

  const eventOrganizersIds = [];
  tableEventOrganizer.map((tableEventOrganizerRecord) => {
    if (tableEventOrganizerRecord[1] == eventId) {
      eventOrganizersIds.push(tableEventOrganizerRecord[2]);
    }
  });

  return organizers
    .filter((organizer) => {
      return eventOrganizersIds.includes(organizer.id);
    })
    .sort((a, b) => {
      return a.id - b.id;
    });
}
