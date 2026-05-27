// ============================================================
// WowKids First Steps — Contact Information Config
// ============================================================
// Edit this ONE file to update contact info across the entire
// website. All pages and components import from here.
// ============================================================

export const contact = {
  /** Primary email address displayed on the website */
  email: "wk.firststeps@gmail.com",

  /** Phone numbers (add or remove as needed) */
  phones: [
    { label: "+91-9392669346", href: "+919392669346" },
    { label: "+91-7013319920", href: "+917013319920" },
  ],

  /** Full street address */
  address: {
    line1: "Road no: 6, Plot No 42, Prashanth Nagar,",
    line2: "Medipally, Uppal,",
    city: "Hyderabad, Telangana 500098",
  },

  /** Google Maps location URL */
  mapsUrl: "https://maps.app.goo.gl/7aUEYAUNFsd2h6qu6",

  /** Google Maps embed URL for the iframe on the contact page */
  mapsEmbedUrl:
    "https://www.google.com/maps?q=Plot+No+42+Road+no+6+Prashanth+Nagar+Medipally+Uppal+Hyderabad+500098&output=embed",

  /** Working hours displayed on the contact page */
  workingHours: [
    { day: "Monday – Friday", hours: "9:00 AM – 5:00 PM" },
    { day: "Saturday", hours: "9:00 AM – 3:00 PM" },
    { day: "Sunday", hours: "Closed" },
  ],

  /** School name used across the site */
  schoolName: "WowKids First Steps",
  schoolShortName: "WowKids",
  tagline: "First Steps",
};
