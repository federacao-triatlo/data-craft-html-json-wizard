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
 * Creates an object with the JSON string of the Event and its Races and results.
 *
 * @param {String} databaseSheetId the given Google Sheet ID of the database files that stores the given Event
 * @param {String} eventId the given Event ID
 *
 * @returns an object with the JSON string of the Event and its races
 */
function createEventJsonWithRaceResults(databaseSheetId, eventId) {
  const eventWithRaceResults = getEventWithRaceResultsByEventId(databaseSheetId, eventId);
  const eventWithFilteredRaces = filterEventRaces(eventWithRaceResults);

  const races = [];
  eventWithFilteredRaces.races.forEach((element) => {
    const race = {};
    race.raceReference = element.raceReference;
    race.raceJsonString = createRaceJson(element);
    races.push(race);
  });

  const event = {};
  event.eventReference = eventWithFilteredRaces.eventReference;
  event.eventJsonString = createEventJson(eventWithFilteredRaces, true);

  event.races = races;

  return event;
}

/**
 * Creates an object with the JSON string of the Event with the given Event ID.
 *
 * @param {String} databaseSheetId the given Google Sheet ID of the database files that stores the given Event
 * @param {String} eventId the given Event ID
 *
 * @returns an object with the JSON string of the Event with the given Event ID
 */
function createEventJsonWithoutRaceResults(databaseSheetId, eventId) {
  const event = getEventById(databaseSheetId, eventId);

  return createEventJson(event, false);
}

/**
 * Creates a JSON string for the eventDTO from the given event.
 *
 * @param {Event} event
 * @param {boolean} hasFilteredRaces flag that indicates if the Event's Races are already filtered
 *
 * @returns the JSON string with the required event
 */
function createEventJson(event, hasFilteredRaces) {
  delete event.googleSheetID;

  event = hasFilteredRaces ? event : filterEventRaces(event);

  const eventDTO = getEventDTO(event);

  return JSON.stringify(eventDTO);
}

/**
 * Filters the Event's Races, keeping only the Races that have a results file.
 *
 * @param {Event} event the given Event
 *
 * @returns the event with filtered Races
 */
function filterEventRaces(event) {
  const publishedRacesIds = [];
  event.resultsFiles.forEach((file) => {
    if (!publishedRacesIds.includes(file.raceID)) {
      publishedRacesIds.push(file.raceID);
    }
  });

  event.races = event.races.filter((race) => {
    return publishedRacesIds.includes(race.id);
  });

  return event;
}
