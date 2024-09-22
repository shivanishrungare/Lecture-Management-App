const swaggerJsDoc = require('swagger-jsdoc');

const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'API Documentation for Users, Plans, and Admin Routes',
      version: '1.0.0',
      description: 'API documentation for managing users, lecture and module plans, and admin functionalities.',
    },
    servers: [
      {
        url: 'http://localhost:5000', 
      },
    ],
    components: {
      schemas: {
        User: {
          type: 'object',
          required: ['firstName', 'lastName', 'role', 'title', 'email', 'userName', 'password'],
          properties: {
            firstName: {
              type: 'string',
              description: 'First name of the user',
              example: 'kelly',
            },
            lastName: {
              type: 'string',
              description: 'Last name of the user',
              example: 'hanson',
            },
            role: {
              type: 'string',
              description: 'Role of the user (e.g., Admin, Professor, Student)',
              example: 'Professor',
            },
            title: {
              type: 'string',
              description: 'Title of the user (e.g., Mr., Ms., Dr.)',
              example: 'Ms.',
            },
            email: {
              type: 'string',
              description: 'Email address of the user',
              example: 'kellyhanson@gmail.com',
            },
            userName: {
              type: 'string',
              description: 'Username of the user',
              example: 'kelly',
            },
            password: {
              type: 'string',
              description: 'Password of the user',
              example: 'kel9897',
            },
          },
          
        },
        Course: {
            type: 'object',
            required: ['studyProgram', 'moduleName', 'creditPoints', 'language', 'moduleDetails'],
            properties: {
              studyProgram: {
                type: 'string',
                description: 'Study program for the course',
                example: 'ACS',
              },
              moduleName: {
                type: 'string',
                description: 'Name of the course module',
                example: 'Advanced Computer Science',
              },
              creditPoints: {
                type: 'string',
                description: 'Credit points for the course',
                example: '8',
              },
              language: {
                type: 'string',
                description: 'Language of instruction for the course',
                example: 'English',
              },
              moduleDetails: {
                type: 'string',
                description: 'Additional details about the course',
                example: 'Introduction to AWS',
              },
            },
          },
          Event: {
            type: 'object',
            required: ['startDate', 'endDate', 'startTime', 'endTime', 'eventDetails', 'eventType', 'status'],
            properties: {
              startDate: {
                type: 'string',
                format: 'date',
                description: 'The starting date of the event',
                example: '2024-09-28',
              },
              endDate: {
                type: 'string',
                format: 'date',
                description: 'The ending date of the event',
                example: '2024-09-28',
              },
              startTime: {
                type: 'string',
                format: 'time',
                description: 'The starting time of the event',
                example: '09:00',
              },
              endTime: {
                type: 'string',
                format: 'time',
                description: 'The ending time of the event',
                example: '18:00',
              },
              eventDetails: {
                type: 'string',
                description: 'Details of the event',
                example: 'Public Holiday',
              },
              eventType: {
                type: 'string',
                description: 'Type of the event',
                example: 'Other',
              },
              status: {
                type: 'string',
                description: 'Status of the event (e.g., Blocked, Active)',
                example: 'Block',
              },
            },
          },
          ModulePlan: {
            type: 'object',
            required: ['block', 'batch', 'semester', 'studyProgram', 'startDate', 'endDate', 'moduleName', 'professors'],
            properties: {
              block: {
                type: 'string',
                description: 'Block of the module plan',
                example: '5a',
              },
              batch: {
                type: 'string',
                description: 'Batch of the module plan',
                example: '22.10',
              },
              semester: {
                type: 'string',
                description: 'Semester of the module plan',
                example: '2',
              },
              studyProgram: {
                type: 'string',
                description: 'Study program of the module plan',
                example: 'program 2',
              },
              startDate: {
                type: 'string',
                format: 'date',
                description: 'Start date of the module',
                example: '2024-10-10',
              },
              endDate: {
                type: 'string',
                format: 'date',
                description: 'End date of the module',
                example: '2024-11-10',
              },
              moduleName: {
                type: 'string',
                description: 'Name of the module',
                example: 'module 1',
              },
              professors: {
                type: 'array',
                items: {
                  type: 'string',
                },
                description: 'List of professors',
                example: ['April Tucker', 'Alex Ralph'],
              },
              message: {
                type: 'string',
                description: 'Additional message or notice about the module plan',
                example: 'notice',
              },
            },
          },
          LecturePlan: {
            type: 'object',
            required: ['lectureWeek', 'lectureDate', 'module', 'startTime', 'endTime', 'professors', 'lectureDetails', 'lectureUnits'],
            properties: {
              lectureWeek: {
                type: 'integer',
                description: 'Week number of the lecture',
                example: 1,
              },
              lectureDate: {
                type: 'string',
                format: 'date',
                description: 'Date of the lecture',
                example: '2024-09-24',
              },
              module: {
                type: 'string',
                description: 'ID of the associated module',
                example: '66d6dc78afe8a6b34095159c',
              },
              startTime: {
                type: 'string',
                format: 'time',
                description: 'Start time of the lecture',
                example: '09:30',
              },
              endTime: {
                type: 'string',
                format: 'time',
                description: 'End time of the lecture',
                example: '12:45',
              },
              professors: {
                type: 'array',
                items: {
                  type: 'string',
                },
                description: 'List of professors',
                example: ['Alex Ralph'],
              },
              lectureDetails: {
                type: 'string',
                description: 'Details of the lecture',
                example: 'Analysis',
              },
              lectureUnits: {
                type: 'integer',
                description: 'Number of lecture units',
                example: 4,
              },
            },
          },
      },
    },
  },
  apis: ['./api/*.js'], 
};

module.exports = swaggerJsDoc(swaggerOptions);
