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
 * Gets the programs stored in the Google Sheets file with the given ID.
 *
 * @param {String} databaseSheetId the Google Sheets file ID where the Program table is stored
 *
 * @returns the list of programs stored in the Google Sheets file with the given ID
 */
function getProgramsByDatabaseSheetId(databaseSheetId) {
  let tableProgram;
  try {
    tableProgram = SpreadsheetApp.openById(databaseSheetId)
      .getRangeByName('TableProgram')
      .getDisplayValues()
      .filter((record) => {
        return record[0];
      });
  } catch (error) {
    return [];
  }
  const tableProgramFields = tableProgram.shift();

  const hiddenFields = ['races'];

  const programs = [];
  tableProgram.map((tableProgramRecord) => {
    const program = {};
    tableProgramFields.map((key, columnIndex) => {
      if (!hiddenFields.includes(key)) {
        program[key] = tableProgramRecord[columnIndex];
      }
    });

    programs.push(program);
  });

  return programs;
}

/**
 * Gets the programs with a given program ID stored in the Google Sheets file with the given ID.
 *
 * @param {String} databaseSheetId the Google Sheets file ID where the Program table is stored
 * @param {String} eventId the event ID of the required program
 *
 * @returns the list of programs with the given event ID stored in the Google Sheets file with the given ID
 */
function getProgramsByEventId(databaseSheetId, eventId) {
  return getProgramsByDatabaseSheetId(databaseSheetId).filter((element) => {
    return element.eventID == eventId;
  });
}

/**
 * Gets the Programs of the given Race from the supplied Programs and Program/Race relationships.
 *
 * @param {Array} programs the given Programs
 * @param {Array} programRaceRelationships the give Program/Race relationship
 * @param {Race} race the given Race
 *
 * @returns the Programs of the given Race
 */
function getRacePrograms(programs, programRaceRelationships, race) {
  const raceProgramIds = [];
  programRaceRelationships.forEach((relationship) => {
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
