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
 * Gets the Events list stored in the Google Sheets file with the given ID.
 *
 * @param {String} databaseSheetId the Google Sheets file ID where the Event table is stored
 *
 * @returns the list of events stored in the Google Sheets file with the given ID
 */
function getEventsByDatabaseSheetId(databaseSheetId) {
  const tableEvent = SpreadsheetApp.openById(databaseSheetId)
    .getRangeByName(RANGE_TABLE_EVENT)
    .getDisplayValues()
    .filter((record) => {
      return record[0];
    });
  const tableEventFields = tableEvent.shift();

  const returnedFields = [
    'id',
    'eventReference',
    'title',
    'startDate',
    'endDate',
    'city',
    'county',
    'district',
    'googleSheetID',
  ];

  const events = [];
  tableEvent.forEach((tableEventRecord) => {
    const event = {};
    tableEventFields.map((key, columnIndex) => {
      if (returnedFields.includes(key)) {
        event[key] = tableEventRecord[columnIndex];
      }
    });

    events.push(event);
  });

  return events;
}

/**
 * Gets the complete data of the given event's ID which is stored in the Google Sheets file with the given ID.
 *
 * @param {String} databaseSheetId the given Google Sheets file ID where the Event table is stored
 * @param {String} eventId the given ID of the required event
 *
 * @returns the complete event data
 */
function getEventWithRaceResultsByEventId(databaseSheetId, eventId) {
  const event = getEventById(databaseSheetId, eventId);

  event.races.forEach((race) => {
    race.results = getResultsByRangeName(event.googleSheetID, race.resultsRangeName);
  });

  return event;
}

/**
 * Gets, from the file with the given Google Sheet ID, the Event with a given event ID.
 *
 * @param {String} databaseSheetId the Google Sheets ID of the file where the Event table is stored
 * @param {String} eventId the given ID of the required event
 *
 * @returns the Event with the given Event ID stored in the file with the given Google Sheets ID
 */
function getEventById(databaseSheetId, eventId) {
  const event = getEventsByDatabaseSheetId(databaseSheetId)
    .filter((element) => {
      return element.id == eventId;
    })
    .shift();

  event.eventFiles = getEventFilesByEventId(databaseSheetId, eventId);
  event.organizers = getOrganizersByEventId(databaseSheetId, eventId);
  event.programs = getProgramsByEventId(databaseSheetId, eventId);
  event.races = getRacesByPrograms(databaseSheetId, event.programs);

  const raceIds = event.races
    .map((race) => {
      return race.id;
    })
    .sort((raceA, raceB) => {
      return raceA.id - raceB.id;
    });
  event.resultsFiles = getResultsFilesByRaceIds(databaseSheetId, raceIds);

  return event;
}

/**
 * Gets the EventDTO of the given Event.
 *
 * @param {String} event the given Event
 *
 * @returns the EventDTO object
 */
function getEventDTO(event) {
  delete event.googleSheetID;

  const racesDTO = [];
  event.races.forEach((race) => {
    const dto = {};

    dto.id = race.id;
    dto.raceReference = race.raceReference;
    dto.title = race.title;
    dto.subtitle = race.subtitle;

    racesDTO.push(dto);
  });

  event.races = racesDTO;

  return event;
}
