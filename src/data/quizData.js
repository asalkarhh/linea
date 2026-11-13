// Extracted faithfully from https://www.lineaofficial.com/aligners/quiz/
export const quizSteps = [
  {
    "idx": 0,
    "initImage": "/assets/images/quiz/crowding.png",
    "hasDots": true,
    "questions": [
      {
        "type": "mc",
        "title": "What is your main complaint?",
        "answers": [
          {
            "label": "Crowding (i.e. crooked teeth)",
            "image": "/assets/images/quiz/crowding.png",
            "jt": 2
          },
          {
            "label": "Spacing (i.e. gap teeth)",
            "image": "/assets/images/quiz/spacing.png",
            "jt": 3
          },
          {
            "label": "Bite Issues (i.e. underbite, overbite)",
            "image": "/assets/images/quiz/bite.png",
            "jt": 4
          }
        ],
        "input": null
      }
    ],
    "hasNext": true,
    "hasPrev": false,
    "hasSubmit": false,
    "subtitle": null,
    "termsText": null
  },
  {
    "idx": 1,
    "initImage": "/assets/images/quiz/crowding.png",
    "hasDots": true,
    "questions": [
      {
        "type": "mc",
        "title": "What is your level of crowding?",
        "answers": [
          {
            "label": "Mild",
            "image": "/assets/images/quiz/crowding-mild.png",
            "jt": 5
          },
          {
            "label": "Moderate",
            "image": "/assets/images/quiz/crowding-moderate.png",
            "jt": 5
          },
          {
            "label": "Severe",
            "image": "/assets/images/quiz/crowding-severe.png",
            "jt": 5
          }
        ],
        "input": null
      }
    ],
    "hasNext": true,
    "hasPrev": false,
    "hasSubmit": false,
    "subtitle": null,
    "termsText": null
  },
  {
    "idx": 2,
    "initImage": "/assets/images/quiz/spacing.png",
    "hasDots": true,
    "questions": [
      {
        "type": "mc",
        "title": "Select your level of spacing",
        "answers": [
          {
            "label": "Mild",
            "image": "/assets/images/quiz/spacing-mild.png",
            "jt": 5
          },
          {
            "label": "Moderate",
            "image": "/assets/images/quiz/spacing-moderate.png",
            "jt": 5
          },
          {
            "label": "Severe",
            "image": "/assets/images/quiz/spacing-severe.png",
            "jt": 5
          }
        ],
        "input": null
      }
    ],
    "hasNext": true,
    "hasPrev": false,
    "hasSubmit": false,
    "subtitle": null,
    "termsText": null
  },
  {
    "idx": 3,
    "initImage": "/assets/images/quiz/bite.png",
    "hasDots": true,
    "questions": [
      {
        "type": "mc",
        "title": "Do you also have any of the following issues?",
        "answers": [
          {
            "label": "Crowding (i.e. crooked teeth)",
            "image": "/assets/images/quiz/crowding.png",
            "jt": 2
          },
          {
            "label": "Spacing (i.e. gap teeth)",
            "image": "/assets/images/quiz/spacing.png",
            "jt": 3
          },
          {
            "label": "None",
            "image": "/assets/images/quiz/bite.png",
            "jt": null
          }
        ],
        "input": null
      }
    ],
    "hasNext": true,
    "hasPrev": false,
    "hasSubmit": false,
    "subtitle": null,
    "termsText": null
  },
  {
    "idx": 4,
    "initImage": "/assets/images/quiz/braces.png",
    "hasDots": true,
    "questions": [
      {
        "type": "mc",
        "title": "Have you ever had braces?",
        "answers": [
          {
            "label": "Yes",
            "image": "",
            "jt": null
          },
          {
            "label": "No",
            "image": "",
            "jt": null
          }
        ],
        "input": null
      }
    ],
    "hasNext": true,
    "hasPrev": false,
    "hasSubmit": false,
    "subtitle": null,
    "termsText": null
  },
  {
    "idx": 5,
    "initImage": "/assets/images/quiz/wisdom.png",
    "hasDots": true,
    "questions": [
      {
        "type": "mc",
        "title": "Have you ever had your wisdom teeth removed?",
        "answers": [
          {
            "label": "Yes",
            "image": "",
            "jt": null
          },
          {
            "label": "No",
            "image": "",
            "jt": null
          }
        ],
        "input": null
      }
    ],
    "hasNext": true,
    "hasPrev": false,
    "hasSubmit": false,
    "subtitle": null,
    "termsText": null
  },
  {
    "idx": 6,
    "initImage": "/assets/images/quiz/implants.png",
    "hasDots": true,
    "questions": [
      {
        "type": "mc",
        "title": "Do you have dental implants?",
        "answers": [
          {
            "label": "Yes",
            "image": "",
            "jt": null
          },
          {
            "label": "No",
            "image": "",
            "jt": null
          }
        ],
        "input": null
      }
    ],
    "hasNext": true,
    "hasPrev": false,
    "hasSubmit": false,
    "subtitle": null,
    "termsText": null
  },
  {
    "idx": 7,
    "initImage": null,
    "hasDots": false,
    "questions": [
      {
        "type": "pc",
        "title": "What's your zip code?",
        "answers": [],
        "input": {
          "type": "text",
          "placeholder": "",
          "maxlength": "10"
        }
      }
    ],
    "hasNext": true,
    "hasPrev": false,
    "hasSubmit": false,
    "subtitle": null,
    "termsText": null
  },
  {
    "idx": 8,
    "initImage": null,
    "hasDots": false,
    "questions": [
      {
        "type": "fn",
        "title": "First Name",
        "answers": [],
        "input": {
          "type": "text",
          "placeholder": "",
          "maxlength": null
        }
      },
      {
        "type": "email",
        "title": "Email",
        "answers": [],
        "input": {
          "type": "text",
          "placeholder": "",
          "maxlength": null
        }
      },
      {
        "type": "phone",
        "title": "Phone",
        "answers": [],
        "input": {
          "type": "text",
          "placeholder": "555 123 4567",
          "maxlength": "20"
        }
      }
    ],
    "hasNext": true,
    "hasPrev": false,
    "hasSubmit": true,
    "subtitle": null,
    "termsText": "Go back"
  }
];
