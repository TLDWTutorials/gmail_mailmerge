# Tailored Onboarding Emails (aka Email Mail Merge) from Google Sheets (Apps Script)

**Note: if you just want to test out the code and haven't wrote code before, click on the `sendOnboardingEmails.gs` file to get the code and copy and paste this into Google Apps Script.**

YouTube Video w/ Step by Step Instructions: https://youtu.be/FSH6WzgG-BA

This repository contains a single Google Apps Script that reads rows from a Google Sheet and sends a personalized onboarding email to each person who has not yet been emailed. When it sends the email, it writes a timestamp back to the `SentOn` column so it won't re-send.

## Sample Sheet layout

| Firstname | Lastname | Jobtitle   | Locationgroup | Email                          | SentOn |
|-----------|----------|------------|---------------|--------------------------------|--------|
| Susan     | McGill   | Accountant | 1             | someone1@outlook.com   |        |
| Jessie    | Addison  | Analyst    | 2             | whatever@example.com           |        |

The script maps `Locationgroup` → a location name:
- `1` → **Bombay**
- `2` → **Madrid**
- anything else → **Unknown**

---

## Code Walkthrough

### Loop through rows
```js
var data = sheet.getDataRange().getValues();
for (var i = 1; i < data.length; i++) {
  var firstName = data[i][0];
  var jobTitle = data[i][2];
  ...
}
```
This grabs every row from your Google Sheet. It skips the first row (`i = 1`) because that’s the header row.

### Skip if already sent
```js
var sentOn = data[i][5];
if (sentOn) continue;
```
If column **F** already has a timestamp, the script ignores this row so the same person isn’t emailed twice.

### Location mapping
```js
if (locationGroup == 1) {
  location = "Bombay";
} else if (locationGroup == 2) {
  location = "Madrid";
} else {
  location = "Unknown";
}
```
This turns the numeric `Locationgroup` value into a real city name.

### Build the email body
```js
var body = `
Hi ${firstName},<br><br>
Welcome to the TLDW Tutorials company! We’re excited to have you join us as our new ${jobTitle} based in ${location}.
...
`;
```
The body uses template literals (backticks `` ` ``) so variables like `firstName` and `jobTitle` can be inserted directly.

### Send the email and mark the row
```js
GmailApp.sendEmail(email, "Welcome to TLDW Tutorials!", "", {htmlBody: body});
sheet.getRange(i + 1, 6).setValue(new Date());
```
- Sends the email with Gmail.  
- Writes the current timestamp into column **F** so it won’t send again.

---

## How to Use

1. Open your Google Sheet.  
2. Extensions → Apps Script.  
3. Replace the default file with the contents of sendOnboardingEmails.gs.  
4. Save.  
5. Run **sendOnboardingEmails** once and authorize the required scopes (Gmail send + Spreadsheets).  

---

## Optional: Schedule It

- If you want, you can have it automatically send on a recurring basis if you will be frequently adding names (otherwise, it won't send b/c of the SentOn datestamp to prevent duplicate sends)
- In the Apps Script editor, go to **Triggers** (clock icon).  
- Add a time-driven trigger (e.g., every hour) for `sendOnboardingEmails`.  

---

## Customization

- Update the location mapping inside `Code.gs` if you use different numeric groups.  
- Edit the email body to fit your organization’s voice or add more fields (e.g., `lastName`).  

---

## Testing Safely

- Replace `GmailApp.sendEmail(...)` with `Logger.log(...)` to preview emails first.  
- Or send to your own address before testing with real people.  

---

## Repository contents

- `sendOnboardingEmails.gs` — main script.  
- `README.md` — instructions, walkthrough, and sample data.  

## License

MIT
