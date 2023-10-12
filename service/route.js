// Import model
const db = require('./models');
function generateUniqueQuoteno() {
    const timestamp = new Date().getTime();
    const random = Math.floor(Math.random() * 1000); // You can adjust the range as needed
    return `QUO${timestamp}${random}`;
}
// Login function
const login = async (uname, password) => {
    console.log('Inside login function');
    try {
        const user = await db.User.find({ uname, password });
        if (user) {
            return {
                statusCode: 200,
                message: 'Login Successfully',
            };
        } else {
            return {
                statusCode: 404,
                message: 'Invalid Username or Password',
            };
        }
    } catch (error) {
        console.error(error);
        return {
            statusCode: 500,
            message: 'Internal server error',
        };
    }
};

const getQuote = async (quoteno) => {
    try {
        const quote = await db.Quote.findOne({ 'top_section.quoteno': quoteno });
        if (quote) {
            return {
                statusCode: 200,
                getalldetails: quote,
            };
        } else {
            return {
                statusCode: 404,
                message: 'Invalid Quotation number',
            };
        }
    } catch (error) {
        console.error(error);
        return {
            statusCode: 500,
            message: 'Internal server error',
        };
    }
};

// Add Quote function
const addQuot = async (reqBody) => {
    try {
      // Extract relevant data from the request body
      const {
        top_section: {
          date,
          quoteno,
          property,
          company_details: { cname, caddress },
        },
        middle_section: { bill_table, gtotal, advance, due },
        bottom_section: {
          inwords,
          started_within,
          finished_within,
          testperiod,
          quotvaliduntil,
          workers,
        },
      } = reqBody;
  
      // Validate the required fields
      if (!date || !quoteno || !property || !cname || !caddress) {
        return {
          statusCode: 400,
          message: 'Invalid input data. Please provide all required fields.',
        };
      }
  
      // Create a new Quote document
      const newQuote = new db.Quote({
        top_section: {
          date,
          quoteno,
          property,
          company_details: {
            cname,
            caddress,
          },
        },
        middle_section: {
          bill_table,
          gtotal,
          advance,
          due,
        },
        bottom_section: {
          inwords,
          started_within,
          finished_within,
          testperiod,
          quotvaliduntil,
          workers,
        },
      });
  
      // Save the new Quote document to the database
      await newQuote.save();
  
      return {
        statusCode: 200,
        message: 'Data Successfully added',
      };
    } catch (error) {
      console.error(error);
      return {
        statusCode: 500,
        message: 'Error Adding Dat',
      };
    }
  };
  
  


// Edit Quote function
const editQuot = async (quoteno, reqBody) => {
    try {
      // Find the existing quote by quoteno
      const existingQuote = await db.Quote.findOne({ 'top_section.quoteno': quoteno });
  
      if (!existingQuote) {
        return {
          statusCode: 404,
          message: 'No data found for the provided quoteno',
        };
      }
  
      // Extract relevant data from the request body
      const {
        top_section: { date, property },
        middle_section: { bill_table, gtotal, advance, due },
        bottom_section: {
          inwords,
          started_within,
          finished_within,
          testperiod,
          quotvaliduntil,
          workers,
        },
      } = reqBody;
  
      // Update the existing quote fields
      existingQuote.top_section.date = date;
      existingQuote.top_section.property = property;
      existingQuote.middle_section.bill_table = bill_table;
      existingQuote.middle_section.gtotal = gtotal;
      existingQuote.middle_section.advance = advance;
      existingQuote.middle_section.due = due;
      existingQuote.bottom_section.inwords = inwords;
      existingQuote.bottom_section.started_within = started_within;
      existingQuote.bottom_section.finished_within = finished_within;
      existingQuote.bottom_section.testperiod = testperiod;
      existingQuote.bottom_section.quotvaliduntil = quotvaliduntil;
      existingQuote.bottom_section.workers = workers;
  
      // Save the updated quote document
      await existingQuote.save();
  
      return {
        statusCode: 200,
        message: 'Data updated successfully',
      };
    } catch (error) {
      console.error(error);
      return {
        statusCode: 500,
        message: 'Internal server error',
      };
    }
  };
  


module.exports = {
    login,
    getQuote,
    editQuot,
    addQuot,
    db,
};
