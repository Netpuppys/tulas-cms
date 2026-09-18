// DEAD FILE - superseded by ./readHtmlFileContent.ts.
//
// This used to parse an uploaded Excel file into a { headers, rows } table
// for the "Fee Table" course block. That approach was replaced with a
// simpler one: upload an .html file and copy its contents in as-is (see
// readHtmlFileContent.ts and the "feeTable" block in Blocks.ts). Nothing
// in the app imports this file anymore.
//
// The sandbox this was edited from couldn't delete files (a permissions
// restriction), so this file was emptied out instead of removed. Safe to
// delete by hand: `rm src/lib/parseFeeTableExcel.ts`.
export {}
