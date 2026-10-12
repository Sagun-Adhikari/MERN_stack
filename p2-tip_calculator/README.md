💰 Tip Calculator

A simple and responsive Tip Calculator built with React. This application helps users calculate the tip amount, the total bill, and the bill per person by entering the bill amount, tip percentage, and number of people.

✨ Features
Bill Amount Input: Enter the total bill amount.
Tip Percentage: Specify the tip percentage.
Number of People: Enter the number of people sharing the bill.
Automatic Calculation: Calculates the tip amount, total bill, and bill per person instantly.
Responsive Design: Displays input fields and results side by side on larger screens and stacks them vertically on smaller screens.
Modern UI: Clean layout with styled input fields, rounded corners, and a gradient background.
🛠️ Technologies Used
React — Building the user interface.
JavaScript — Handling state and calculations.
CSS — Styling and responsive layout.
Vite — Development server and build tool (if your project was created with Vite).
📸 Preview

The application is divided into two sections:

Input Section: Enter the bill amount, tip percentage, and number of people.
Result Section: View the tip amount, total bill, and bill per person.
🚀 Getting Started

Follow these steps to run the project locally.

Prerequisites

Make sure you have installed:

Node.js
npm (included with Node.js)
Installation
Clone the repository:
   git clone https://github.com/your-username/tip-calculator.git

Navigate to the project directory:
   cd tip-calculator

Install the dependencies:
   npm install

Start the development server:
   npm run dev

Open the local URL displayed in your terminal, usually http://localhost:5173.
🧮 How to Use
Enter the bill amount.
Enter the tip percentage.
Enter the number of people sharing the bill.
View the calculated tip amount.
Check the total bill, including the tip.
See how much each person needs to pay.
Example

Suppose the bill amount is 1000, the tip percentage is 10%, and 2 people are sharing the bill.

Calculation	Result
Bill Amount	1000
Tip Percentage	10%
Tip Amount	100
Total Bill	1100
Number of People	2
Bill Per Person	550
📂 Project Structure
tip-calculator/
├── public/
├── src/
│   ├── App.jsx
│   ├── App.css
│   ├── main.jsx
│   └── index.css
├── index.html
├── package.json
├── package-lock.json
├── vite.config.js
└── README.md


Note: The exact file structure may vary depending on your project setup.

🧠 What I Learned

Through this project, I practiced:

Using React's useState hook to manage input values.
Handling user input with onChange events.
Performing calculations dynamically in JavaScript.
Creating reusable and organized JSX components.
Styling a two-column layout using CSS Grid.
Making a responsive interface with CSS media queries.
🔮 Future Improvements
Add input validation for negative values and invalid numbers of people.
Add currency selection.
Include a reset button.
Allow users to split the tip separately from the bill.
Improve accessibility and add theme customization.
👨‍💻 Author

Your Name

GitHub: your-username
📄 License

This project is open source and available for learning and personal use. Add a specific license, such as the MIT License, if you intend to distribute it under those terms.