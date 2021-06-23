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

![screenshot](/.github/Still 00001.png)

---

- [x] A selected trip should be visually distinct from other trips.
- [x] Clicking on an unselected trip should select that trip.
- [x] Clicking on a selected trip should unselect that trip.
- [x] No more than one trip should ever be selected at the same time.
- [x] It should be clear to the user that trips are clickable.

![screen recording](/.github/Gif 00001.gif)

---

- [x] To move a trip between buses, select the trip, then click on the row of the bus you want to move it to.
- [x] Clicking on a trip in another row should still update the selection instead of moving the selected trip.
- [x] It should not be possible to assign a trip to a bus where it would conflict with existing trips.
- [x] Two trips conflict if they overlap at any point other than their endpoints.
- [x] After moving a trip, it should no longer be selected.
- [x] If a bus has no trips assigned to it, it should not be displayed.

![screen recording](/.github/Gif 00002.gif)

---

- [x] When a trip is selected, a new “provisional” row should appear at the bottom of the schedule. This row should be empty.
- [x] Clicking on this row should assign the trip to a new bus.
- [x] When no trip is selected, the provisional row should not be displayed.

![screen recording](/.github/Gif 00003.gif)

---

- [x] Add zebra striping to the rows. Every other row should be a light grey color.
- [x] At the top of the page, add an x-axis, with tick marks on the hour, to make it easier to see when trips start and end.
- [x] At the left side of each row, add a header, containing:
  - [x] A name or identifier for the bus
  - [x] The earliest start time among trips in the bus
  - [x] The latest end time among trips in the bus

![screenshot](/.github/Still 00004.png)

---

### Additional Polishes:

- Dark mode
  ![screen recording](/.github/Gif 00004.gif)

- Route dragging between buses
  ![screen recording](/.github/Gif 00005.gif)

- SVG buses replacing the boxes
  ![screenshot](/.github/Still 00002.png)

- faint vertical dividers per hour
  ![screenshot](/.github/Still 00003.png)

- "ghost" route on select/hover
  ![screen recording](/.github/Gif 00006.gif)

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
