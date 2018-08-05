Tampere Attractions
===================

Shows some popular tourist attractions in Tampere on
[Google Maps](https://www.google.com/maps/). 
Attractions are tagged with different types (Activity for Children, Park,
Scenic Outlook etc.) which can be used to filter them.

This is made as an exercise for
[Udacity Front-End Web Developer Nanodegree Program](https://eu.udacity.com/course/front-end-web-developer-nanodegree--nd001).

How to use
----------

Main view shows a map with markers on attractions tha match the currently
selected tag. On the right-hand side of the screen there is also a list of 
matching attractions and on top of that a pull-down menu for selecting a
different tag. (Note: on small screens the list and menu are below the map.)

Clicking on a marker or a list item opens up a info window with more detaied
information about the attraction (description, image and contact information).

Attraction information and locations are fetched from [Visit Tampere API](https://visittampere.fi/api-docs/).

Bootstrapped with
[Create React App](https://github.com/facebookincubator/create-react-app).

Uses [react-google-maps](https://github.com/tomchentw/react-google-maps)
library to help use Google Maps API from React app.

How to install
--------------

* Clone or download project files to a directory
* In this directory install project dependencies with `npm install`
* Start the development server with `npm start`

This should open your browser automatically on the correct page, but if not,
you can open http://localhost:3000/ manually.
