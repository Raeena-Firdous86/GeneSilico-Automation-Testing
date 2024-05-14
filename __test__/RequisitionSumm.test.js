import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Dashboard from '../pages/Dashboard';

test('TC-DRS-1 : Verify Presence of Requisition Summary on Dashboard', () => {
  render(
    <MemoryRouter>
      <Dashboard />
    </MemoryRouter>
  );

  // Ensure the requisition summary section is present
  const requisitionSummarySection = screen.getByTestId('requisition-summary');
  expect(requisitionSummarySection).toBeInTheDocument();
});

test('TC-DRS-2 : Verify Accuracy of Total Requisitions Displayed in Summary', () => {
  // Mock the total count of requisitions (replace with your actual count)
  const totalCount = 100;

  render(
    <MemoryRouter>
      <Dashboard totalRequisitions={totalCount} />
    </MemoryRouter>
  );

  // Ensure the total requisitions count is accurately displayed
  const totalRequisitionsCount = screen.getByTestId('total-requisitions-count');
  expect(totalRequisitionsCount).toHaveTextContent(totalCount.toString());
});

test('TC-DRS-3 : Verify Accuracy of Submitted Requisitions Count in Summary', () => {
  // Mock the submitted requisitions count (replace with your actual count)
  const submittedCount = 50;

  render(
    <MemoryRouter>
      <Dashboard submittedRequisitions={submittedCount} />
    </MemoryRouter>
  );

  // Ensure the submitted requisitions count is accurately displayed
  const submittedRequisitionsCount = screen.getByTestId('submitted-requisitions-count');
  expect(submittedRequisitionsCount).toHaveTextContent(submittedCount.toString());
});

test('TC-DRS-4 : Verify Accuracy of Drafted Requisitions Count in Summary', () => {
  // Mock the drafted requisitions count (replace with your actual count)
  const draftedCount = 30;

  render(
    <MemoryRouter>
      <Dashboard draftedRequisitions={draftedCount} />
    </MemoryRouter>
  );

  // Ensure the drafted requisitions count is accurately displayed
  const draftedRequisitionsCount = screen.getByTestId('drafted-requisitions-count');
  expect(draftedRequisitionsCount).toHaveTextContent(draftedCount.toString());
});
