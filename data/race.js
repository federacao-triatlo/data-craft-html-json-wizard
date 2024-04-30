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
 * Gets the races stored in the Google Sheets file with the given ID.
 *
 * @param {String} databaseSheetId the Google Sheets file ID where the Race table is stored
 *
 * @returns the list of races stored in the Google Sheets file with the given ID
 */
function getRacesByDatabaseSheetId(databaseSheetId) {
  const tableRace = SpreadsheetApp.openById(databaseSheetId)
    .getRangeByName(RANGE_TABLE_RACE)
    .getDisplayValues()
    .filter((record) => {
      return record[0];
    });
  const tableRaceFields = tableRace.shift();

  const hiddenFields = ['championships', 'technicalDelegate', 'headReferee', 'competitionJury', 'results'];

  const races = [];
  tableRace.map((tableRaceRecord) => {
    const race = {};
    tableRaceFields.map((key, columnIndex) => {
      if (key && !hiddenFields.includes(key)) {
        race[key] = key === 'derivedResults' ? getBoolean(tableRaceRecord[columnIndex]) : tableRaceRecord[columnIndex];
      }
    });

    races.push(race);
  });

  return races;
}

/**
 * Filters the races from the given races list that have the given program ID.
 *
 * @param {String} databaseSheetId the Google Sheets file ID where the Race table is stored
 * @param {String} races the given races list to be filtered
 * @param {String} programId the programa ID of the requeired races
 *
 * @returns the list of races in the given list with the given program ID
 */
function getRacesByProgramId(databaseSheetId, races, programId) {
  const programRaceRelationships = getProgramRaceRelationshipsByDatabaseSheetId(databaseSheetId);

  const programRacesIds = [];
  programRaceRelationships.forEach((relationship) => {
    if (relationship.programID == programId) {
      programRacesIds.push(relationship.raceID);
    }
  });

  return races.filter((race) => {
    return programRacesIds.includes(race.id);
  });
}

/**
 * Gets the races of the given Programs.
 *
 * @param {String} databaseSheetId the Google Sheets file ID where the Races are stored
 * @param {Array} programs the given programs
 *
 * @returns the Races of the given Programs
 */
function getProgramsRaces(databaseSheetId, programs) {
  const programIds = [];
  programs.forEach((program) => {
    programIds.push(program.programId);
  });

  const programsRaceRelationships = getProgramRaceRelationshipsByDatabaseSheetId(databaseSheetId).filter(
    (relationship) => {
      return programIds.includes(relationship.programID);
    }
  );

  const raceIds = [];
  programsRaceRelationships.forEach((relationship) => {
    if (!raceIds.includes(relationship.raceID)) {
      raceIds.push(relationship.raceID);
    }
  });

  return getRacesByDatabaseSheetId(databaseSheetId)
    .filter((race) => {
      return raceIds.includes(race.raceID);
    })
    .forEach((race) => {
      race.programs = getPrograms(programs, race);
    })
    .sort((raceA, raceB) => {
      return raceA.id - raceB.id;
    });
}

/**
 * Gets the Programs of the given Race from the supplied Programs and Program/Race relationships.
 *
 * @param {Array} programs the given Programs
 * @param {Array} programRaceRelationship the give Program/Race relationship
 * @param {Object} race the given Race
 *
 * @returns the Programs of the given Race
 */
function getPrograms(programs, programRaceRelationship, race) {
  const raceProgramIds = [];
  programRaceRelationship.forEach((relationship) => {
    if (relationship.raceID === race.id && !raceProgramIds.includes(relationship.programID)) {
      raceProgramIds.push(relationship.programID);
    }
  });

  return programs
    .filter((program) => {
      return raceProgramIds.includes(program.id);
    })
    .sort((programA, programB) => {
      return programA.id - programB.id;
    });
}

/**
 * Gets the race with the given Race reference.
 *
 * @param {String} databaseSheetId the Google Sheets file ID where the Races are stored
 * @param {String} raceReference the given Race reference
 *
 * @returns the race with the given Race reference
 */
function getCompleteRaceDataByRaceReference(databaseSheetId, raceReference) {
  const race = getRacesByDatabaseSheetId(databaseSheetId).filter((race) => {
    return race.raceReference == raceReference;
  });

  const databasePrograms = getProgramsByDatabaseSheetId(databaseSheetId);
  const databaseProgramRaceRelationships = getProgramRaceRelationshipsByDatabaseSheetId(databaseSheetId);

  race.programs = getPrograms(databasePrograms, databaseProgramRaceRelationships, race);

  const raceEventId = race.programs[0].eventID;
  const raceEvent = getEventsByDatabaseSheetId(databaseSheetId).filter((event) => {
    return event.id === raceEventId;
  });

  race.results = getResultsByRangeName(raceEvent.googleSheetID, race.resultsRangeName);

  return race;
}
