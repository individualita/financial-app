# Financial Application

This is a React-based financial application built with Vite. The app allows users to add transactions, sort them by date and month, view financial charts, manage financial plans, and download monthly PDF reports.

> **Note:** This application is not designed for desktop screens. It is optimized only for devices with screen widths up to **480 pixels**.

## Features

- **Add Transactions**: Users can input and manage financial transactions.
- **Transaction Sorting**: Transactions are automatically sorted by date and grouped by months.
- **Financial Charts**: Visualize your expenses, income, and balance through various charts.
- **Financial Plans**: Create, manage, and track financial plans.
- **Download PDF Reports**: Download monthly reports of your financial data as PDF files.
- **Local Storage**: Save and persist data even after page reloads.
- **Global State Management**: State for transactions and plans is managed using **Redux Toolkit**.
- **Lazy Loading**: Some components are lazily loaded to improve performance.

## Tech Stack

- **React**: Front-end library for building user interfaces.
- **Vite**: A fast build tool and development server for modern web projects.
- **Tailwind CSS**: A utility-first CSS framework for styling the application.
- **React Router**: For navigating between different sections of the application.
- **Redux Toolkit**: Centralized state management for transactions and plans.
- **jsPDF** & **jspdf-autotable**: For generating and downloading PDF reports.
- **Recharts**: A chart library for visualizing financial data.

## Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/individualita/financial-app.git
    ```

2. Navigate to the project directory:
    ```bash
    cd financial-app
    ```

3. Install dependencies:
    ```bash
    npm install
    ```

4. Run the development server:
    ```bash
    npm run dev
    ```

5. Open the application in your browser:
    ```bash
    http://localhost:3000
    ```

By following these steps, you will be able to see the application running locally.

## Usage

1. **Adding Transactions**: Fill in the transaction form with details like amount, category, and date.
2. **Viewing Financial Plans**: Navigate to the financial plans section to add or view your plans.
3. **Charts**: View charts representing your income, expenses, and financial balance.
4. **Download PDF**: Click the "Download PDF" button to download a report of your transactions for a selected month.

## Project Structure

- `/src/components`: Contains reusable components like forms, charts, and modals.
- `/src/pages`: Application pages such as Home, Plans, and More.
- `/src/assets`: Static assets like images and icons.
- `/src/utils`: Utility functions like data formatting.
- `/src/styles`: Global and component-specific styles built with Tailwind CSS.
- `/src/store`: Contains the Redux Toolkit slices for managing global state (e.g., transactions and plans).

## Contributing

1. Fork the repository.
2. Create your feature branch:
    ```bash
    git checkout -b feature/my-new-feature
    ```
3. Commit your changes:
    ```bash
    git commit -m 'Add some feature'
    ```
4. Push to the branch:
    ```bash
    git push origin feature/my-new-feature
    ```
5. Create a new Pull Request.



