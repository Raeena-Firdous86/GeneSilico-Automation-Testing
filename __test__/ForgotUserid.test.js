import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import ForgotUserIdPage from '../pages/ForgotUserIdPage';


test('TC-UR-1 : Verify the correct display of all required fields on the "Forgot User ID" page', () => {
    render(
        <MemoryRouter>
            <ForgotUserIdPage />
        </MemoryRouter>
    );
    const firstNameInput = screen.getByPlaceholderText('Enter your First Name');
    const lastNameInput = screen.getByPlaceholderText('Enter your Last Name');
    const monthInput = screen.getByLabelText('Birth Month');
    const dayInput = screen.getByLabelText('Birth Date');
    const yearInput = screen.getByLabelText('Birth Year');
    const emailInput = screen.getByPlaceholderText('Enter Email Address');

    expect(firstNameInput).toBeInTheDocument();
    expect(lastNameInput).toBeInTheDocument();
    expect(monthInput).toBeInTheDocument();
    expect(dayInput).toBeInTheDocument();
    expect(yearInput).toBeInTheDocument();
    expect(emailInput).toBeInTheDocument();
});

test('TC-UR-2 : Verify the correct labeling on the Forgot User Id page', () => {
    render(
        <MemoryRouter>
            <ForgotUserIdPage />
        </MemoryRouter>
    );
    const firstNameInput = screen.getByPlaceholderText('First Name');
    const lastNameInput = screen.getByPlaceholderText('Last Name');
    const monthInput = screen.getByLabelText('Birth Month');
    const dayInput = screen.getByLabelText('Birth Date');
    const yearInput = screen.getByLabelText('Birth Year');
    const emailInput = screen.getByPlaceholderText('Enter Email Address');

    expect(firstNameInput).toBeInTheDocument();
    expect(lastNameInput).toBeInTheDocument();
    expect(monthInput).toBeInTheDocument();
    expect(dayInput).toBeInTheDocument();
    expect(yearInput).toBeInTheDocument();
    expect(emailInput).toBeInTheDocument();
});

test('TC-UR-3 : Verify that the form is submitted successfully when all required fields are filled with valid values', async () => {
    render(
        <MemoryRouter>
            <ForgotUserIdPage />
        </MemoryRouter>
    );
    const firstNameInput = screen.getByPlaceholderText('Enter your First Name');
    const lastNameInput = screen.getByPlaceholderText('Enter your Last Name');
    const monthInput = screen.getByLabelText('Birth Month');
    const dayInput = screen.getByLabelText('Birth Date');
    const yearInput = screen.getByLabelText('Birth Year');
    const emailInput = screen.getByPlaceholderText('Enter your email address');
    const submitButton = screen.getByRole('button', { name: /submit/i });

    fireEvent.change(firstNameInput, { target: { value: 'John' } });
    fireEvent.change(lastNameInput, { target: { value: 'Doe' } });
    fireEvent.change(monthInput, { target: { value: '05' } });
    fireEvent.change(dayInput, { target: { value: '15' } });
    fireEvent.change(yearInput, { target: { value: '1990' } });
    fireEvent.change(emailInput, { target: { value: 'john.doe@example.com' } });
    fireEvent.click(submitButton);

    const confirmationMessage = await screen.findByText('Your UserID has been sent to your email.');
    expect(confirmationMessage).toBeInTheDocument();
});

test('TC-UR-5 : Verify that the text "Recover UserID" is present on the screen', () => {
    render(
        <MemoryRouter>
            <ForgotUserIdPage />
        </MemoryRouter>
    );
    const recoverText = screen.getByText('Recover UserID');
    expect(recoverText).toBeInTheDocument();
});

test('TC-UR-6 : Verify when the user clicks the "Back to Login" button, they are redirected to the login page', () => {
    render(
        <MemoryRouter>
            <ForgotUserIdPage />
        </MemoryRouter>
    );
    const backButton = screen.getByRole('button', { name: /back to login/i });
    fireEvent.click(backButton);
    expect(screen.getByTestId('login-page')).toBeInTheDocument();
});

test('TC-UR-7 :Verify that clicking on the "Back to login" button in the confirmation page redirects to the login screen', async () => {
    render(
        <MemoryRouter>
            <ForgotUserIdPage />
        </MemoryRouter>
    );
    const firstNameInput = screen.getByPlaceholderText('Enter your First Name');
    const lastNameInput = screen.getByPlaceholderText('Enter your Last Name');
    const monthInput = screen.getByLabelText('Birth Month');
    const dayInput = screen.getByLabelText('Birth Date');
    const yearInput = screen.getByLabelText('Birth Year');
    const emailInput = screen.getByPlaceholderText('Enter your email address');
    const submitButton = screen.getByRole('button', { name: /submit/i });

    // Fill out the form
    fireEvent.change(firstNameInput, { target: { value: 'John' } });
    fireEvent.change(lastNameInput, { target: { value: 'Doe' } });
    fireEvent.change(monthInput, { target: { value: '05' } });
    fireEvent.change(dayInput, { target: { value: '15' } });
    fireEvent.change(yearInput, { target: { value: '1990' } });
    fireEvent.change(emailInput, { target: { value: 'john.doe@example.com' } });
    fireEvent.click(submitButton);

    const confirmationMessage = await screen.findByText('Your UserID has been sent to your email.');
    expect(confirmationMessage).toBeInTheDocument();

    // Click on the "Back to login" button
    const backToLoginButton = screen.getByRole('button', { name: /back to login/i });
    fireEvent.click(backToLoginButton);

    // Verify if the login screen is displayed
    const loginScreen = await screen.findByTestId('login-page');
    expect(loginScreen).toBeInTheDocument();
});

test('TC-UR-8 : Verify functionality of "Click to Resend" link', () => {
    render(
        <MemoryRouter>
            <ForgotUserIdPage />
        </MemoryRouter>
    );
    const resendLink = screen.getByText('Click to Resend');
    fireEvent.click(resendLink);
});

test('TC-UR-9 : Verify that when attempting to submit the form without entering any values, an error message should be displayed', async () => {
    render(
        <MemoryRouter>
            <ForgotUserIdPage />
        </MemoryRouter>
    );
    const submitButton = screen.getByRole('button', { name: /submit/i });
    fireEvent.click(submitButton);
    const errorMessage = await screen.findByText('Please enter your email ID.');
    expect(errorMessage).toBeInTheDocument();
});

test('TC-UR-10 : Verify that after entering data into all fields and refreshing the screen, the form should reset and clear all entered data', async () => {
    render(
        <MemoryRouter>
            <ForgotUserIdPage />
        </MemoryRouter>
    );
    const firstNameInput = screen.getByPlaceholderText('Enter your First Name');
    const lastNameInput = screen.getByPlaceholderText('Enter your Last Name');
    const monthInput = screen.getByLabelText('Birth Month');
    const dayInput = screen.getByLabelText('Birth Date');
    const yearInput = screen.getByLabelText('Birth Year');
    const emailInput = screen.getByPlaceholderText('Enter your email address');
    const submitButton = screen.getByRole('button', { name: /submit/i });

    fireEvent.change(firstNameInput, { target: { value: 'John' } });
    fireEvent.change(lastNameInput, { target: { value: 'Doe' } });
    fireEvent.change(monthInput, { target: { value: '05' } });
    fireEvent.change(dayInput, { target: { value: '15' } });
    fireEvent.change(yearInput, { target: { value: '1990' } });
    fireEvent.change(emailInput, { target: { value: 'john.doe@example.com' } });
    fireEvent.click(submitButton);

    // Refresh the page
    window.location.reload();

    // Check if the form is cleared
    const clearedFirstNameInput = screen.getByPlaceholderText('Enter your First Name');
    const clearedLastNameInput = screen.getByPlaceholderText('Enter your Last Name');
    const clearedMonthInput = screen.getByLabelText('Birth Month');
    const clearedDayInput = screen.getByLabelText('Birth Day');
    const clearedYearInput = screen.getByLabelText('Birth Year');
    const clearedEmailInput = screen.getByPlaceholderText('Enter your email address');

    expect(clearedFirstNameInput.value).toBe('');
    expect(clearedLastNameInput.value).toBe('');
    expect(clearedMonthInput.value).toBe('');
    expect(clearedDayInput.value).toBe('');
    expect(clearedYearInput.value).toBe('');
    expect(clearedEmailInput.value).toBe('');
});

test('TC-UR-11 : Enter values in all required fields, then modify one or more fields to invalid values and submit the form to verify that error messages are displayed correctly', async () => {
    render(
        <MemoryRouter>
            <ForgotUserIdPage />
        </MemoryRouter>
    );
    const firstNameInput = screen.getByPlaceholderText('Enter your First Name');
    const lastNameInput = screen.getByPlaceholderText('Enter your Last Name');
    const monthInput = screen.getByLabelText('Birth Month');
    const dayInput = screen.getByLabelText('Birth Date');
    const yearInput = screen.getByLabelText('Birth Year');
    const emailInput = screen.getByPlaceholderText('Enter your email address');
    const submitButton = screen.getByRole('button', { name: /submit/i });

    fireEvent.change(firstNameInput, { target: { value: 'John' } });
    fireEvent.change(lastNameInput, { target: { value: 'Doe' } });
    fireEvent.change(monthInput, { target: { value: '15' } });
    fireEvent.change(dayInput, { target: { value: '40' } });
    fireEvent.change(yearInput, { target: { value: '2025' } });
    fireEvent.change(emailInput, { target: { value: 'invalidemail' } });
    fireEvent.click(submitButton);

    const errorMessages = await screen.findAllByText('Please enter a valid');
    expect(errorMessages.length).toBe(4);
});

test('TC-UR-12 : Enter values in all required fields, then modify the birth date to a future date and submit the form to verify that an error message is displayed', async () => {
    render(
        <MemoryRouter>
            <ForgotUserIdPage />
        </MemoryRouter>
    );
    const firstNameInput = screen.getByPlaceholderText('Enter your First Name');
    const lastNameInput = screen.getByPlaceholderText('Enter your Last Name');
    const monthInput = screen.getByLabelText('Birth Month');
    const dayInput = screen.getByLabelText('Birth Date');
    const yearInput = screen.getByLabelText('Birth Year');
    const emailInput = screen.getByPlaceholderText('Enter your email address');
    const submitButton = screen.getByRole('button', { name: /submit/i });

    fireEvent.change(firstNameInput, { target: { value: 'John' } });
    fireEvent.change(lastNameInput, { target: { value: 'Doe' } });
    fireEvent.change(monthInput, { target: { value: '05' } });
    fireEvent.change(dayInput, { target: { value: '15' } });
    fireEvent.change(yearInput, { target: { value: '2050' } }); // Future year
    fireEvent.change(emailInput, { target: { value: 'john.doe@example.com' } });
    fireEvent.click(submitButton);

    const errorMessage = await screen.findByText('Please enter a valid date of birth.');
    expect(errorMessage).toBeInTheDocument();
});
