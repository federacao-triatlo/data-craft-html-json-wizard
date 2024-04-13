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
  } catch {
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
 * @param {String} eventId the ID of the required program
 *
 * @returns the list of programs with the given event ID stored in the Google Sheets file with the given ID
 */
function getProgramsByEventId(databaseSheetId, eventId) {
  const programs = getProgramsByDatabaseSheetId(databaseSheetId).filter((element) => {
    return element.eventID == eventId;
  });

  const seasonRaces = getRacesByDatabaseSheetId(databaseSheetId);
  programs.forEach((program) => {
    program.races = getRacesByProgramId(databaseSheetId, seasonRaces, program.id);
  });

  return programs;
}

/**
 * Gets the list of the race IDs from the given programs list.
 *
 * @param {String} programs the given programs
 *
 * @returns the list of the given programs race's IDs
 */
function getRaceIdsFromPrograms(programs) {
  const raceIds = [];
  programs.forEach((program) => {
    program.races.forEach((race) => {
      if (!raceIds.includes(race.id)) {
        raceIds.push(race.id);
      }
    });
  });

  return raceIds.sort((a, b) => {
    return a - b;
  });
}
