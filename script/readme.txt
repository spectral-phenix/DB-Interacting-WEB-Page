
# – Python (Flask) Application

## Description

This project was developed as part of the NSI course.
It is a web application built with Python (using Flask) that allows users to query a movie database.
Users can select which columns to display, add search conditions, and dynamically sort the results.

---

## Main Features

### Column Selection

* The user must first choose one or more columns to display in the results table.
* Example: to display only the movie title and release year, simply check these two boxes.
* At least one column must be selected, otherwise an error message will appear.

Two buttons are available for convenience:

* "Select All": checks all columns.
* "Unselect All": unchecks all columns.

---

### Search Conditions

Conditions allow users to filter the displayed movies based on specific criteria.

#### Add a Condition

1. Click on "Add Condition".
2. Select the target column from the dropdown menu.
3. Enter the desired value in the text field.

#### Examples

* Display movies whose title contains the word "pirate"
  -> Condition on the "title" column with the value "pirate"
* Display movies released after 2001
  -> Condition on the "release year" column with the value ">=2001"

#### Additional Details

* Each condition must have a value; otherwise, an error will occur.
* Conditions can be combined (up to 7 maximum).
* You can delete any condition at any time by clicking the cross next to it.
* If no conditions are specified, all movies in the database are displayed.

---

### Sorting Results

After executing a query, it is possible to sort the results directly in the table.

* Click on a column header to sort in ascending order (ORDER BY ASC).
* Click again to sort in descending order (ORDER BY DESC).
* Click a third time to remove the sorting.

Arrows indicate the current sort direction.
If you click on another column while one is already sorted, the previous sort is replaced.

Sorting is applied in combination with the current search conditions.

---

## Project Structure

project-nsi/
│
├── app.py                 # Main Python file to execute
├── templates/             # Contains the HTML files
│   └── index.html
│
├── static/
│   ├── css/               # CSS files
│   └── js/                # JavaScript files
│
└── README.txt             # This file

---

## Running the Project

1. Open a terminal in the project directory.

2. Run the following command:

   python app.py

3. Open this link in your web browser:

   [http://127.0.0.1:5000](http://127.0.0.1:5000)

---

## Installation

Before running the app, make sure Flask is installed.
You can install it with:

pip install flask

If your project uses a database, also make sure the required dependencies are installed.

---

## Technologies Used

* Python (Flask)
* HTML / CSS / JavaScript
* SQLite (or another database depending on the project)

---

## Author

Project developed as part of the NSI (Numérique et Sciences Informatiques) course.
Created by: [Your Name Here]

---

Would you like me to make it Markdown-compatible (for GitHub `README.md`) while keeping the same plain-text tone?
