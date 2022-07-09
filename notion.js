const fetch = require('node-fetch');
const { Client } = require("@notionhq/client")
const calendar = require('./calendar.js')
const notion = new Client({ auth: process.env.NOTION_KEY_NEW });
const habitDatabaseId = process.env.HABIT_DATABASE_ID;
const kashEliteDatabaseId = process.env.KASH_ELITE_DB_ID;

exports.createMonthlyCheckboxes = async function() {
  const date = new Date();
  const days = calendar.getDaysThisMonth(date);

  try{
      for(var i = 0; i < days; i++){
        // var notionDate = calendar.getNotionDate(date);
    var notionDate = new Date(`${date.getFullYear()}-${date.getMonth()+1}-${i+1}`).toISOString().split('T')[0];
        console.log(notionDate)
    const response = await notion.pages.create({
    parent: {
      database_id: kashEliteDatabaseId,
    },
    properties: {
      Name: {
        title: [
          {
            text: {
              content: '',
            },
          },
        ],
      },
      "Date": {
        "date": {
          "start": notionDate,
        }
      },
      'Water': {
        checkbox: false,
      },
    }
  });
  }
  } catch(err){
    console.log(err)
  }
}

//not used due to Notion unable to set the sequence for database properties
exports.createWeeklyReview = async function() {

}

async function createChildDatabase(pageId, databaseTitle){
  
  const options = {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Notion-Version': '2022-06-28',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.NOTION_KEY_NEW}`
    },
    body: JSON.stringify({
      parent: {
        type: "page_id",
        page_id: pageId
      },
      title: [
        {
          "type": "text",
          "text": {
            "content": databaseTitle
          },
        }
      ],
      properties: {
        "Trade": {
          title: {
            
          }
        },
        "Date": {
          date: {}
        },
        "Session": {
          select: {
            options: [
              {
                name: "London",
                color: "pink"
              },
              {
                name: "London Lull",
                color: "yellow"
              },
              {
                name: "NY",
                color: "blue"
              },
              {
                name: "Late NY",
                color: "gray"
              }
            ]            
          }
        },
        "Setup": {
          select: {
            options: [
              {
                name: "5m",
                color: "yellow"
              },
              {
                name: "5m Confirmation",
                color: "blue"
              },
              {
                name: "15m",
                color: "green"
              }
            ]
          }
        },
        "Taken": {
          checkbox: {}
        },
        "R": {
          number: {}
        },
        "Remark": {
          rich_text: {}
        }
      }
    })
  };

  fetch('https://api.notion.com/v1/databases', options)
  .then(response => response.json())
  .then(response => console.log(response))
  .catch(err => console.error(err));

  
}

