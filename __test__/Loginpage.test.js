import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import LoginForm from '../pages/LoginForm';


test('TC-LF-1 : Verify the rendering of the Login Form with required fields', () => {
  render(
    <MemoryRouter>
      <LoginForm />
    </MemoryRouter>
  );
  const usernameInput = screen.getByPlaceholderText(/Enter User ID/i);
  const passwordInput = screen.getByPlaceholderText(/Enter Password/i);
  expect(usernameInput).toBeInTheDocument();
  expect(passwordInput).toBeInTheDocument();
});

test('TC-LF-2 : Verify the correct labeling for the input fields', () => {
  render(
    <MemoryRouter>
      <LoginForm />
    </MemoryRouter>
  );
  const usernameLabel = screen.getByLabelText('UserID:');
  const passwordLabel = screen.getByLabelText('Password:');
  expect(usernameLabel).toBeInTheDocument();
  expect(passwordLabel).toBeInTheDocument();
});

test('TC-LF-3 : Verify successful login with correct credentials', async () => {
  render(
    <MemoryRouter>
      <LoginForm />
    </MemoryRouter>
  );
  const usernameInput = screen.getByPlaceholderText(/Enter User ID/i);
  const passwordInput = screen.getByPlaceholderText(/Enter Password/i);
  const loginButton = screen.getByRole('button', { name: /Sign In/i });

  fireEvent.change(usernameInput, { target: { value: 'UserD' } });
  fireEvent.change(passwordInput, { target: { value: 'Password' } });
  fireEvent.click(loginButton);

  expect(screen.getByText('Dashboard')).toBeInTheDocument();
});

test('TC-LF-4 : Verify that clicking the "Forgot UserID?" link navigates to the correct route', () => {
  render(
    <MemoryRouter>
      <LoginForm />
    </MemoryRouter>
  );
  const forgotUserIdLink = screen.getByText('Forgot UserID?');
  fireEvent.click(forgotUserIdLink);
  expect(screen.getByTestId('forget-username-page')).toBeInTheDocument();
});

test('TC-LF-5 : Verify that clicking the "Forgot Password?" link navigates to the correct route', () => {
  render(
    <MemoryRouter>
      <LoginForm />
    </MemoryRouter>
  );
  const forgotPasswordLink = screen.getByText('Forgot Password?');
  fireEvent.click(forgotPasswordLink);
  expect(screen.getByTestId('forget-password-page')).toBeInTheDocument();
});

test('TC-LF-6 : Verify that the system displays an error message on an invalid login attempt', async () => {
  render(
    <MemoryRouter>
      <LoginForm />
    </MemoryRouter>
  );
  const usernameInput = screen.getByPlaceholderText(/User ID/i);
  const passwordInput = screen.getByPlaceholderText(/Password/i);
  const loginButton = screen.getByRole('button', { name: /Sign In/i });

  fireEvent.change(usernameInput, { target: { value: 'invaliduser' } });
  fireEvent.change(passwordInput, { target: { value: 'wrongpassword' } });
  fireEvent.click(loginButton);

  const errorMessage = await screen.findByText(/Invalid UserID/i);
  expect(errorMessage).toBeInTheDocument();
});

test('TC-LF-7 : Verify that the system displays an error message on a failed login attempt', async () => {
  render(
    <MemoryRouter>
      <LoginForm />
    </MemoryRouter>
  );
  const loginButton = screen.getByRole('button', { name: /Sign In/i });
  fireEvent.click(loginButton);

  const errorMessage = await screen.findByText(/Please enter User ID./i);
  expect(errorMessage).toBeInTheDocument();
});

test('TC-LF-8 : Verify that entering only UserID without password displays an error message', async () => {
  render(
    <MemoryRouter>
      <LoginForm />
    </MemoryRouter>
  );
  const usernameField = screen.getByPlaceholderText(/User ID/i);
  const submitButton = screen.getByRole('button', { name: /Sign In/i });

  fireEvent.change(usernameField, { target: { value: 'UserD' } });
  fireEvent.click(submitButton);

  const errorMessage = await screen.findByText(/please enter Password/i);
  expect(errorMessage).toBeInTheDocument();
});

test('TC-LF-9 : Verify the presence and clickability of the Sign In button', () => {
  render(
    <MemoryRouter>
      <LoginForm />
    </MemoryRouter>
  );
  const loginButton = screen.getByRole('button', { name: /Sign In/i });
  expect(loginButton).toBeInTheDocument();
  expect(loginButton).toBeEnabled();
});