/**
 * ============================================
 * shuQi Registration Tracker - Google Apps Script
 * ============================================
 * 
 * SETUP INSTRUCTIONS:
 * 
 * 1. Go to https://sheets.google.com and create a new spreadsheet
 *    - Name it "shuQi Registrations"
 *    - In Row 1, add these headers:
 *      Timestamp | Full Name | Email | Phone | Age | Course
 * 
 * 2. Go to Extensions → Apps Script
 * 
 * 3. Delete all default code and paste this entire file
 * 
 * 4. Change the SECRET_KEY below to match the one in your index.html
 *    (currently set to 'shuqi_reg_2026' in both places)
 * 
 * 5. Click "Deploy" → "New deployment"
 *    - Type: Web app
 *    - Execute as: Me
 *    - Who has access: Anyone
 *    - Click "Deploy"
 * 
 * 6. Copy the Web App URL (looks like https://script.google.com/macros/s/AKfycb.../exec)
 * 
 * 7. In index.html, replace 'YOUR_GOOGLE_SCRIPT_URL' with your Web App URL
 * 
 * 8. Test by submitting a registration on your website!
 * 
 * ============================================
 */

// ⚠️ IMPORTANT: Change this to match your index.html
const SECRET_KEY = 'shuqi_reg_2026';

// Rate limiting - prevent same email submitting within X minutes
const RATE_LIMIT_MINUTES = 5;

/**
 * Handles POST requests from your registration form
 */
function doPost(e) {
  try {
    // Parse incoming JSON data
    const data = JSON.parse(e.postData.contents);
    
    // Verify secret key
    if (data.secretKey !== SECRET_KEY) {
      return jsonResponse({ success: false, error: 'Unauthorized' });
    }
    
    // Basic validation
    if (!data.email || !data.fullName) {
      return jsonResponse({ success: false, error: 'Missing required fields' });
    }
    
    // Get the spreadsheet
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getSheets()[0]; // First sheet
    
    // Rate limiting check
    const existingData = sheet.getDataRange().getValues();
    const now = new Date();
    
    for (let i = existingData.length - 1; i >= 1; i--) {
      const rowEmail = existingData[i][2]; // Email column (index 2)
      const rowTime = new Date(existingData[i][0]); // Timestamp column
      const minutesAgo = (now - rowTime) / (1000 * 60);
      
      if (rowEmail === data.email && minutesAgo < RATE_LIMIT_MINUTES) {
        return jsonResponse({ 
          success: false, 
          error: 'Please wait ' + Math.ceil(RATE_LIMIT_MINUTES - minutesAgo) + ' minutes before submitting again' 
        });
      }
    }
    
    // Append new registration row
    sheet.appendRow([
      now,              // Timestamp
      data.fullName,    // Full Name
      data.email,       // Email
      data.phone,       // Phone
      data.age,         // Age
      data.course       // Course
    ]);
    
    return jsonResponse({ success: true, message: 'Registration saved' });
    
  } catch (error) {
    return jsonResponse({ success: false, error: error.toString() });
  }
}

/**
 * Handles GET requests - shows registration stats (private)
 * Access: https://script.google.com/macros/s/.../exec?adminKey=YOUR_ADMIN_KEY
 */
function doGet(e) {
  // Change this to your own admin key for viewing stats
  const ADMIN_KEY = 'shuqi_admin_2026';
  
  // Check if this is an admin stats request
  if (e.parameter.adminKey === ADMIN_KEY) {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getSheets()[0];
    const data = sheet.getDataRange().getValues();
    
    const totalRegistrations = data.length - 1; // Minus header row
    
    // Count by course
    const courseCount = {};
    for (let i = 1; i < data.length; i++) {
      const course = data[i][5] || 'Unknown';
      courseCount[course] = (courseCount[course] || 0) + 1;
    }
    
    // Get recent registrations (last 10)
    const recent = [];
    for (let i = Math.max(1, data.length - 10); i < data.length; i++) {
      recent.push({
        timestamp: data[i][0],
        name: data[i][1],
        email: data[i][2],
        course: data[i][5]
      });
    }
    
    return jsonResponse({
      totalRegistrations: totalRegistrations,
      byCourse: courseCount,
      recentRegistrations: recent.reverse(),
      lastUpdated: new Date().toISOString()
    });
  }
  
  // Default response (no admin key)
  return jsonResponse({ status: 'shuQi Registration API is running' });
}

/**
 * Helper function to create JSON response
 */
function jsonResponse(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj, null, 2))
    .setMimeType(ContentService.MimeType.JSON);
}
