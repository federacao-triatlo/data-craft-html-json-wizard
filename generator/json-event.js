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
 * Creates an object with the JSON string of the Event and its races
 *
 * @param {String} databaseSheetId the given Google Sheet ID of the database files that stores the given Event
 * @param {String} eventId the given Event ID
 *
 * @returns an object with the JSON string of the Event and its races
 */
function createEventWithRacesJson(databaseSheetId, eventId) {
  const eventWithRaces = getCompleteEventDataByEventId(databaseSheetId, eventId);
  const eventWithFilteredRaces = filterEventRaces(eventWithRaces);

  const races = [];
  eventWithFilteredRaces.races.forEach((element) => {
    if (element.programs.length == 1) {
      const program = element.programs[0];

      element.eventID = program.eventID;
      element.sport = program.sport;
      element.distanceType = program.distanceType;
      element.swimDistance = program.swimDistance;
      element.swimLaps = program.swimLaps;
      element.firstRunDistance = program.firstRunDistance;
      element.firstRunLaps = program.firstRunLaps;
      element.bikeDistance = program.bikeDistance;
      element.bikeLaps = program.bikeLaps;
      element.runDistance = program.runDistance;
      element.runLaps = program.runLaps;
      element.secondRunDistance = program.secondRunDistance;
      element.secondRunLaps = program.secondRunLaps;
    }

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
 * Filters the Event's Races, keeping only the Races that have a results files.
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
