# MERN QR Questionnaire App

This app allows users to scan a QR code, select from 7 types of questionnaires, fill out a multiple-choice form, and submit their answers. Answers are saved in MongoDB. Built with React (Vite), Express, and Mongoose. UI uses TailwindCSS.

## Main Flow

1. Scan QR code (or visit landing page)
2. See a list of 7 questionnaire types (e.g., depression, academic, etc)
3. Click one to go to a form (~10 MCQs)
4. Submit answers
5. See confirmation page

## Tech Stack

- Frontend: React (Vite), React Router, TailwindCSS
- Backend: Express, Mongoose, MongoDB

## Components

- QuestionnaireList
- QuestionnaireForm
- ConfirmationPage

## API

- `POST /api/responses` — Save questionnaire responses

## Setup

- `npm install` (in root for frontend)
- `cd server && npm install` (for backend)
- Configure MongoDB connection in `server/.env`
- Run frontend: `npm run dev`
- Run backend: `cd server && npm start`
