// DEAD FILE - no longer used.
//
// This used to fetch an uploaded .html file back from S3 so a server-side
// hook on Courses could copy its contents into the "Fee Table" block's
// `htmlContent` field. That whole design (upload the file as a Media doc,
// then read it back from S3) was replaced with a simpler one: the file is
// read directly in the browser with FileReader and written straight into
// `htmlContent` client-side - see src/components/FeeHtmlPickerField.tsx and
// the "feeTable" block in Blocks.ts. Nothing imports this file anymore.
//
// The sandbox this was edited from couldn't delete files (a permissions
// restriction), so this file was emptied out instead of removed. Safe to
// delete by hand: `rm src/lib/readHtmlFileContent.ts`.
export {}
