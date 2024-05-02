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
 * Gets the year selected on the "Dashboard" sheet and saves a JSON file, in the corresponding API Files folder,
 * with that year Event's list.
 */
function saveEventsListJsonFile() {
  const databaseSheetId = getSelectedYearDatabaseGoogleSheetId();

  const eventsJsonString = createEventsJsonByDatabaseSheetId(databaseSheetId);
  const fileName = 'events.json';

  const yearFolder = getOrCreateFolderByParentAndName(getApiFilesStartFolder(), getSelectedEventYear());
  const eventResourceFolder = getOrCreateFolderByParentAndName(yearFolder, 'events');

  saveOrUpdateFile(eventResourceFolder, fileName, eventsJsonString, MimeType.PLAIN_TEXT);
}

/**
 * Gets the Event reference selected on the "Dashboard" sheet and saves, in the corresponding API Files folder,
 * a JSON file with that Event data and, for each Race of the Event, a JSON file with the corresponding Race's data.
 */
function saveEventAndRacesJsonFiles() {
  const databaseSheetId = getSelectedYearDatabaseGoogleSheetId();
  const eventId = getSelectedEventId();
  const eventReference = getSelectedEventReference();

  const event = createEventJsonWithRaceResults(databaseSheetId, eventId);

  const yearFolder = getOrCreateFolderByParentAndName(getApiFilesStartFolder(), eventReference.substring(0, 4));
  const eventResourceFolder = getOrCreateFolderByParentAndName(yearFolder, 'events');
  const eventFolder = getOrCreateFolderByParentAndName(eventResourceFolder, event.eventReference);
  getOrCreateFolderByParentAndName(eventFolder, 'event-files');

  saveOrUpdateFile(eventResourceFolder, event.eventReference + '.json', event.eventJsonString, MimeType.PLAIN_TEXT);

  const raceResourceFolder = getOrCreateFolderByParentAndName(yearFolder, 'races');
  event.races.forEach((race) => {
    const raceFolder = getOrCreateFolderByParentAndName(raceResourceFolder, race.raceReference);
    getOrCreateFolderByParentAndName(raceFolder, 'results-files');

    saveOrUpdateFile(raceResourceFolder, race.raceReference + '.json', race.raceJsonString, MimeType.PLAIN_TEXT);
  });
}

/**
 * Gets the Event ID and the Event's database Google Sheet Id selected on the "Dashboard" sheet and saves,
 * in the corresponding API Files folder, a JSON file with Event data.
 */
function saveEventJsonFile() {
  const databaseSheetId = getSelectedYearDatabaseGoogleSheetId();
  const eventId = getSelectedEventId();
  const eventReference = getSelectedEventReference();

  const eventJsonString = createEventJsonWithoutRaceResults(databaseSheetId, eventId);

  const yearFolder = getOrCreateFolderByParentAndName(getApiFilesStartFolder(), eventReference.substring(0, 4));
  const eventResourceFolder = getOrCreateFolderByParentAndName(yearFolder, 'events');

  saveOrUpdateFile(eventResourceFolder, eventReference + '.json', eventJsonString, MimeType.PLAIN_TEXT);
}

/**
 * Gets the Race reference and the races's database Google Sheet Id selected on the "Dashboard" sheet and saves,
 * in the corresponding API Files folder, a JSON file with Race data.
 */
function saveRaceJsonFile() {
  const databaseSheetId = getSelectedYearDatabaseGoogleSheetId();
  const eventReference = getSelectedEventReference();
  const raceReference = getSelectedRaceReference();

  const race = getCompleteRaceDataByRaceReference(databaseSheetId, raceReference);

  const yearFolder = getOrCreateFolderByParentAndName(getApiFilesStartFolder(), eventReference.substring(0, 4));
  const raceResourceFolder = getOrCreateFolderByParentAndName(yearFolder, 'races');

  saveOrUpdateFile(raceResourceFolder, race.raceReference + '.json', createRaceJson(race), MimeType.PLAIN_TEXT);
}
