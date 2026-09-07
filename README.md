# 1Fi Marketplace

A 1Fi SDE Intern Assignment implementation that adds a fully functional
**1Fi Marketplace** section within the existing Shop experience.

The goal of this project is to extend the existing 1Fi app experience while
maintaining its mobile-first UI style, navigation patterns, spacing,
components, and overall user experience.

Demo video: https://drive.google.com/file/d/1OmUj1eHPX99I9J9oRiIWxsSigFp2tW-q/view?usp=sharing
---

## Assignment Objective

The objective of the assignment is to understand the existing 1Fi product,
work within its existing UI/experience, and build a new feature while
maintaining consistency with the existing 1Fi application.

This project focuses specifically on building the **1Fi Marketplace** section
within the Shop experience.

---

## Assignment Requirements

The Shop experience contains three sections:

### A. Top Brands
No implementation is required as specified in the assignment.

### B. Nearby Stores
No implementation is required as specified in the assignment.

### C. 1Fi Marketplace
Fully implemented with:

- Product listing
- Product images
- Product names
- Product pricing
- Product variants
- Product details
- EMI plans
- EMI tenure selection
- EMI calculation
- Proceed CTA
- Purchase/request submission flow
- Loading states
- Error states
- Retry functionality
- Success/confirmation screen

---

## Marketplace Flow

The implemented user flow is:

```text
Shop
  ↓
1Fi Marketplace
  ↓
Browse Products
  ↓
Product Details
  ↓
Select Variant
  ↓
Select EMI Plan
  ↓
Review Monthly EMI
  ↓
Proceed
  ↓
Request Submitted
  ↓
Reference ID






## Quick Start

npm install
npm run dev

```Open the printed local URL (typically http://localhost:5173).

## A Note on Tech Stack

### Implementation Note

As an existing 1Fi web codebase/source was not provided with the assignment,
I implemented the Marketplace as a React + TypeScript web application. The
UI/UX was developed based on the available 1Fi Android app on the Play Store
and the provided reference screens, with the goal of closely matching the
existing 1Fi experience.

## Tech Stack

React 19, TypeScript, Vite, Tailwind CSS, React Router, Zustand
