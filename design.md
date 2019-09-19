# Application Design

This document specifies the design of the Mood Swing Audition app. We first illustrate a minimum viable product, then dive into a dream version. For each version, we specify the Firebase Cloud Firestore document schema as well as the desired functionality of the mobile app and website.

## MVP

The MVP simply fulfills the purpose of making it easy for each Mood Swing member to map their personal notes to a picture of an auditionee. A simple email / password is used to access the information of the app (no new users can be made from the UI to prevent external people from accessing the data).

### Schema

One collection of auditionees. Proposed schema:
```js
Auditionee {
    uid: UUID, // for unique identification of the auditiony
    number: int, // the number that mood swing members will use to identify autionees
    picture: URL, // url to firebase static storage
    name: string
}

```

### Mobile Side

Features:

- Log in to the app
- Upload photo with name and number
- View auditionees
- Search up auditionees by number


### Web site

Features:

- log in to the app
- View auditionees with name and number
- Search up auditionees by number


## Pipedream

The Pipedream allows for us to aggregate much more information and context about each auditionee. Not only do we upload their photo and audition number, we can add their campus, email, vocal range. We can also add tooling that marks auditionees with their status such as, still/not considering, callbacks, accepted.

### Schema

One collection of auditionees. Proposed schema:
```js
Auditionee {
    uid: UUID, // for unique identification of the auditiony
    number: int, // the number that mood swing members will use to identify autionees in their notes
    picture: URL, // url to firebase static storage
    name: string,
    campus: string, // Enum{CMC, Scripps, Mudd, CMC, Pomona}
    email: string,
    vocal_range: tuple<int, int>, // a pair of ints. We can figure out how to map notes on a piano to numbers
    voice_part: string, // Enum{Bass, Bari, Tenor, Alto, Mezzo, Sop}
    considering: boolean, // whether we are still considering a candidate
    callbacks: boolean, // whether a candidate has made auditions
    accepted: boolean
}
```

### Mobile Side

Features:

- Log in to the app
- Upload and edit auditionees
- View, filter, and search auditionees
- ...


### Web site

Features:

- log in to the app
- View and edit auditionees.
- Search up auditionees by various fields
- Organize auditionees by voice part
- Mark auditionees by whether they have made call backs and later, whether we want them or not. Provide a means to organize auditionees by those statuses.