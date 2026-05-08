# Student Event Hub - Overview

<a href = "https://github.com/student-event-hub">Link to our Github Organization</a>

## The Problem
Students have trouble finding events on Campus, students are busy and need reminders. Need digitalized calendar board

## Solution
Create a digitized calendar board to help users to keep track of and find SLE Events, through adding events to their calendar, finding events through filtering, reviewing events, and finding current and future events.

## Team
- <a href = "https://jaydenpc.github.io/"> Jayden Cruz </a>
- <a href = "https://ahron4.github.io/"> Ahron Natividad </a>
- <a href = "https://kadonnakano.github.io/"> Kadon Nakano </a>
- <a href = "https://philip-r-low.github.io"> Philip Low </a>

## Team Contract
<a href = "https://docs.google.com/document/d/1d2C_VM08IDHJyN53gbJdZNoIxGdcvA6N47JhRgeNg94/edit?usp=sharing" >Our Team Contract</a>

## Effort Estimate Spreadsheet
<a href = "https://docs.google.com/spreadsheets/d/1q7ABxG2j7QR1d19Z-CvLoe9Uk_MQA6PRMKrIIJa4HCs/edit?usp=sharing">Effort Estimate Spreadsheet</a>

# Our Approach
Student Events will include the time that each event will occur, a review system (Like/Dislike or Review by comment section), the place of event, description, categories, owner, and buttons to add to each user’s calendar

# Deployment
Here is our Vercel link to our deployment:
<a href = "https://student-event-hub.vercel.app/" >Student Hub</a>

# M1 Project
<a href = "https://github.com/orgs/student-event-hub/projects/1">M1</a>


# M2 Project 
<a href = "https://github.com/orgs/student-event-hub/projects/2"> M2 </a>

# M3 Project
<a href = "https://github.com/orgs/student-event-hub/projects/4"> M3 </a>

# Updates/User Guide:
<img width="500px"  class="float-center" src="./doc/update1.png">
<img width="500px"  class="float-center" src="./doc/update2.png">
<img width="500px"  class="float-center" src="./doc/update3.png">
<img width="500px"  class="float-center" src="./doc/update4.png">
<img width="500px"  class="float-center" src="./doc/update5.png">

Each user can log in and see from the different events from the All Events tab and be able to add events to their own Your Events tab which shows different events that they have saved. Each event on the all events tab hold different information where each user can review the event with a like/dislike and be able to filter/search through the events.

Each user can also create their own events and edit already existing events through the Create Event tab on the navbar and the edit event button in the All Events tab.

# Developer Guide

First, cd into the directory of your local copy of the repo, and install third party libraries with:

```

$ npm install

```

Fifth, create a `.env` file from the `sample.env`. Edit the line `DATABASE_URL="postgresql://johndoe:randompassword@localhost:5432/mydb?schema=public"` to match your setup. Replace `mydb` with the PostgreSQL database that you created in the first step (in the example for this step the database is `nextjs-application-template`). replace `johndoe:randompassword` with a username and password you created for this db. If you did not create a user for this database, you can use the `postgress` user with the password you set when you installed postgress. Note: this is not a recommdened practice since the `postgres` user is an admin with full access to postgres. 

See the Prisma docs [Connect your database](https://www.prisma.io/docs/prisma-orm/add-to-existing-project/postgresql#3-connect-your-database). 

Then run the Prisma migration `npx prisma migrate dev` to set up the PostgreSQL tables.

```
$ npx prisma migrate dev
Loaded Prisma config from prisma.config.ts.

Prisma schema loaded from prisma/schema.prisma.
Datasource "db": PostgreSQL database "mydb", schema "public" at "localhost:5432"

Applying migration `20260301195634_init`

The following migration(s) have been applied:

migrations/
  └─ 20260301195634_init/
    └─ migration.sql

Your database is now in sync with your schema.

$

```

Create the Prisma Client by running the command `npx prisma generate`. This will create the Prisma Client in the `generated/prisma` directory, which is used by the application to interact with the database.

```
$ npx prisma generate

Loaded Prisma config from prisma.config.ts.

Prisma schema loaded from prisma/schema.prisma.

Generated Prisma Client (7.4.2) to ./generated/prisma in 80ms
 
```

Then seed the database with the `/config/settings.development.json` data using `npm run seed`.

```

$ npm run seed  

> nextjs-application-template-s26@0.1.0 seed
> npx tsx src/seed.ts

Seeding the database
  Creating user: admin@foo.com with role: ADMIN
  Creating user: john@foo.com with role: USER
  Adding stuff: {"name":"Basket","quantity":3,"owner":"john@foo.com","condition":"excellent"}
  Adding stuff: {"name":"Bicycle","quantity":2,"owner":"john@foo.com","condition":"poor"}
  Adding stuff: {"name":"Banana","quantity":2,"owner":"admin@foo.com","condition":"good"}
  Adding stuff: {"name":"Boogie Board","quantity":2,"owner":"admin@foo.com","condition":"excellent"}
$

```

## Running the system

Once the libraries are installed and the database seeded, you can run the application by invoking the "dev" script in the [package.json file](https://github.com/ics-software-engineering/nextjs-application-template/blob/master/app/package.json):

```

$ npm run dev

> nextjs-application-template-s26@0.1.0 dev
> next dev

▲ Next.js 16.1.6 (Turbopack)
- Local:         http://localhost:3000
- Network:       http://XXX.XXX.XXX.XXX:3000
- Environments: .env

✓ Starting...
✓ Ready in 821ms

```




# Community Feedback
- It’s working, the Ui could be refined further, it’s an event calendar, make sure all of it works. I liked it. (John Cruz)
- I like it, it looks fairly professional, js it’s kinda tight like everything seems crammed and cannot move around too much or view all the text but it is good (Tainoa)
- Okay, I liked how easy it is to access the events and the login. I wish I’d be able to like and dislike the events without being logged in. (Isaac)
- Overall, I think the website is simple, easy to navigate, and well-structured, especially the Home, Events, and Login pages. However, I noticed a few improvements that could be made, such as fixing the blurry main image and capitalizing action labels like “Comment” and “Save” for clarity. I also suggest improving layout readability on the Admin Panel, combining event start and end times into a single time frame, and adding a location feature for events. Lastly, the “Filter By” button doesn’t seem to work and should be fixed. (Eric Ugale)
- I saw the events and the times, but I couldn’t really do anything since I have to make an account right (Eric Villamor)




# Goals of Implementation
- Events are filterable by time/likeability/categories 
- Each User has their own component, “Your Events Page”, which users can events to their own calendar and filter their calendar via event categories
- Each User can review an event in the Your Events Page with a like/dislike button and/or comment button with all comments sections
- Page Admins will be able to see users that added events to their calendars in the All Events Page
- Admins can DELETE events from All Events Page and User’s Event Page
- Users can add events to their calendar
- Being able to find future and current events (specifically events from student life and development (SLD))
- Users can create events to the public list of events for others to see
 

# Mockup Page Ideas
- Home Page
- Create Event Page (to All Events Page)
- Edit Event Page
- All Events Page (add events to Your Events Page)
- Your Events Page
- Log in/Signup Page

- This image is a link to an already existing student life events webpage (https://manoa.hawaii.edu/studentlife/events/)
- And these other images below is our modern mockup page created by one of our team members to simulate how the website will be expanded
<img width="500px" class="float-center" src="./public/images/events_page_mockup.png">

<img width="500px"  class="float-center" src="./doc/mockup1.jpeg">
<img width="500px"  class="float-center" src="./doc/mockup2.jpeg">
<img width="500px"  class="float-center" src="./doc/mockup3.jpeg">
<img width="500px"  class="float-center" src="./doc/mockup4.jpeg">

