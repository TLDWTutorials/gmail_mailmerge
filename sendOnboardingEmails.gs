function sendOnboardingEmails() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var data = sheet.getDataRange().getValues();

  // Skip header row
  for (var i = 1; i < data.length; i++) {
    var firstName = data[i][0];       // Column A: Firstname
    var lastName = data[i][1];        // Column B: Lastname (not used, but available if you want to do something like Dear Dr. Smith)
    var jobTitle = data[i][2];        // Column C: Jobtitle
    var locationGroup = data[i][3];   // Column D: Locationgroup
    var email = data[i][4];           // Column E: Email
    var sentOn = data[i][5];          // Column F: SentOn (timestamp)

    // Skip if already sent
    if (sentOn) {
      continue;
    }

    // Map location
    var location;
    if (locationGroup == 1) {
      location = "Bombay";
    } else if (locationGroup == 2) {
      location = "Madrid";
    } else {
      location = "Unknown";
    }
    
    // Build email body
    var body = `
Hi ${firstName},<br><br>
Welcome to the TLDW Tutorials company! We’re excited to have you join us as our new ${jobTitle} based in ${location}.<br><br>
Here’s what you can expect for your first day:<br>
<ul>
  <li>A warm welcome from your team and manager</li>
  <li>A brief orientation to get you set up with our systems and tools</li>
  <li>Time to review your role, responsibilities, and upcoming projects</li>
</ul>
<br>
To help you get started, here are a few next steps:<br>
<ol>
  <li>Complete your new hire paperwork (link provided separately).</li>
  <li>Bring a valid photo ID for verification.</li>
  <li>Plan to arrive at 9:00 AM at our ${location} office.</li>
</ol>
<br>
We’re thrilled to have you on board and can’t wait to see all that you’ll contribute! If you have any questions before your start date, please don’t hesitate to reach out.<br><br>
Best regards,<br><br>
Shark Stevens<br>
CEO - TLDW Tutorials

`;
    
    // Send the email
    GmailApp.sendEmail(email, "Welcome to TLDW Tutorials!", "", {htmlBody: body});
    
    // Write timestamp back to the sheet (Column F = 6th column)
    sheet.getRange(i + 1, 6).setValue(new Date()); 
  }


}
