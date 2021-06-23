# Remix Bus Scheduling

This is an example application built as a coding challenge for Remix.

See it live @ [github.aster.hn/remix-bus-scheduling](https://github.aster.hn/remix-bus-scheduling)

Tech used:

- Build: [Next.js](https://nextjs.org/)
- UI components: [Chakra UI](https://v0.chakra-ui.com/)
- State management: [zustand](https://zustand.surge.sh/)
- Time formatting: [dayjs](https://day.js.org/)
- Drag interaction: [react-dnd](https://react-dnd.github.io/react-dnd/about)
- Bus SVG: adapted from [The Noun Project](https://thenounproject.com/) using [Sketch](https://www.sketch.com/)

## Features / Acceptance Criteria

- [x] The left edge of each rectangle should be positioned according to its start time. The right edge of each rectangle should be positioned according to its end time. Represent each minute as one pixel.
- [x] The height of the rectangle should be the same across all trips.
- [x] The rectangle should display the trip’s id field inside.

<img width="559" alt="Still 00001" src="https://user-images.githubusercontent.com/679178/123076822-53590a00-d3ce-11eb-9c27-85c40cc92d0e.png">

---

- [x] A selected trip should be visually distinct from other trips.
- [x] Clicking on an unselected trip should select that trip.
- [x] Clicking on a selected trip should unselect that trip.
- [x] No more than one trip should ever be selected at the same time.
- [x] It should be clear to the user that trips are clickable.

![Gif 00001](https://user-images.githubusercontent.com/679178/123076807-4fc58300-d3ce-11eb-8e8c-2e7763af746a.gif)

---

- [x] To move a trip between buses, select the trip, then click on the row of the bus you want to move it to.
- [x] Clicking on a trip in another row should still update the selection instead of moving the selected trip.
- [x] It should not be possible to assign a trip to a bus where it would conflict with existing trips.
- [x] Two trips conflict if they overlap at any point other than their endpoints.
- [x] After moving a trip, it should no longer be selected.
- [x] If a bus has no trips assigned to it, it should not be displayed.

![Gif 00002](https://user-images.githubusercontent.com/679178/123076808-505e1980-d3ce-11eb-8df8-826fc73f4cc2.gif)

---

- [x] When a trip is selected, a new “provisional” row should appear at the bottom of the schedule. This row should be empty.
- [x] Clicking on this row should assign the trip to a new bus.
- [x] When no trip is selected, the provisional row should not be displayed.

![Gif 00003](https://user-images.githubusercontent.com/679178/123076813-50f6b000-d3ce-11eb-8654-df9b06e688f1.gif)

---

- [x] Add zebra striping to the rows. Every other row should be a light grey color.
- [x] At the top of the page, add an x-axis, with tick marks on the hour, to make it easier to see when trips start and end.
- [x] At the left side of each row, add a header, containing:
  - [x] A name or identifier for the bus
  - [x] The earliest start time among trips in the bus
  - [x] The latest end time among trips in the bus

<img width="834" alt="Still 00004" src="https://user-images.githubusercontent.com/679178/123076825-53f1a080-d3ce-11eb-9480-369631623239.png">

---

### Additional Polishes:

- Dark mode
  ![Gif 00004](https://user-images.githubusercontent.com/679178/123076815-50f6b000-d3ce-11eb-80f4-db4643c09b3f.gif)

- Route dragging between buses
  ![Gif 00005](https://user-images.githubusercontent.com/679178/123076820-52c07380-d3ce-11eb-8227-86f432f24015.gif)

- SVG buses replacing the boxes
  <img width="128" alt="Still 00002" src="https://user-images.githubusercontent.com/679178/123076823-53f1a080-d3ce-11eb-8654-6f4a6cafd52a.png">

- faint vertical dividers per hour
  <img width="117" alt="Still 00003" src="https://user-images.githubusercontent.com/679178/123076824-53f1a080-d3ce-11eb-9209-12c05aff02b3.png">

- "ghost" route on select/hover
  ![Gif 00006](https://user-images.githubusercontent.com/679178/123076799-4e945600-d3ce-11eb-866a-8d8ef2c18ede.gif)

## Development

### Setup

```
nvm use # sets node version to 14
yarn # installs dependencies
yarn start # starts development server (or prod server if ENVIRONMENT=production)
```

then go to [localhost:9898](http://localhost:9898)

_Note: `.env` is included in this repo for convenience of setup, standard practice is to omit it_

### Build + Deploy

```
yarn build
```

This will create a new build in `/docs` (This folder name wasn't my choice, github pages is opinionated for their base folder naming)

Pushing into `main` branch will deploy automatically to [github.aster.hn/remix-bus-scheduling](https://github.aster.hn/remix-bus-scheduling)
