import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import ForgotPasswordPage from '../pages/ForgotPasswordPage';


// TC-FP-1: Verify the correct display of required field on the "Forgot Password" page.
test('displays required field indicator on the "Forgot Password" page', () => {
    render(
        <MemoryRouter>
            <ForgotPasswordPage />
        </MemoryRouter>
    );
    const emailInput = screen.getByLabelText('Email Address');
    expect(emailInput).toHaveAttribute('required');
});

//TC-FP-2: Verify the correct placeholder and labeling on the Forgot Password page.
test('displays correct placeholder and labeling on the "Forgot Password" page', () => {
    render(
        <MemoryRouter>
            <ForgotPasswordPage />
        </MemoryRouter>
    );
    const emailInput = screen.getByPlaceholderText('Enter Email Address');
    expect(emailInput).toBeInTheDocument();
});

// TC-FP-3. Verify that users can successfully submit a registered email for account recovery.
test('submits a registered email for account recovery', async () => {
    render(
        <MemoryRouter>
            <ForgotPasswordPage />
        </MemoryRouter>
    );
    const emailInput = screen.getByPlaceholderText('Enter Email Address');
    const submitButton = screen.getByRole('button', { name: /Reset Password/ });

    fireEvent.change(emailInput, { target: { value: 'Varunudb@gmail.com' } });
    fireEvent.click(submitButton);

    // Assuming there's a confirmation message displayed after successful submission
    const confirmationMessage = await screen.findByText('Your Information has been successfully verified, check your Email Account for the reset password link.');
    expect(confirmationMessage).toBeInTheDocument();
});

// TC-FP-5. Verify that clicking "Back to login" button redirects the user to the login page.
test('Verify that clicking "Back to login" button redirects the user to the login page', () => {
    // Render the LoginForm component within MemoryRouter
    render(
        <MemoryRouter>
            <ForgotPasswordPage />
        </MemoryRouter>
    );

    // Click the "Back to login" button
    const backToLoginButton = screen.getByText('Back to login');
    fireEvent.click(backToLoginButton);

    // Check if the login form is rendered again
    expect(screen.getByPlaceholderText(/Enter User ID/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Enter Password/i)).toBeInTheDocument();
});


//TC-FP- 6. Verify the clickability of the "Reset Password" button on the "Forgot Password" page.
test('Reset Password button is clickable on the "Forgot Password" page', () => {
    render(
        <MemoryRouter>
            <ForgotPasswordPage />
        </MemoryRouter>
    );
    const submitButton = screen.getByRole('button', { name: /Reset Password/ });
    expect(submitButton).toBeEnabled();
});

// TC-FP-7. Verify that the system appropriately handles invalid email entries during the account recovery process.
test('displays error message for invalid email during account recovery', async () => {
    render(
        <MemoryRouter>
            <ForgotPasswordPage />
        </MemoryRouter>
    );
    const emailInput = screen.getByPlaceholderText('Enter Email Address');
    const submitButton = screen.getByRole('button', { name: /Reset Password/ });

    fireEvent.change(emailInput, { target: { value: 'invalid_email' } });
    fireEvent.click(submitButton);

    // Assuming there's an error message displayed
    const errorMessage = await screen.findByText('Invalid emailID');
    expect(errorMessage).toBeInTheDocument();
});

// TC-FP-8. Verify that clicking on the Back to login button in the confirmation page redirects to the login screen.
test('redirects to login screen when "Back to login" button is clicked on confirmation page', () => {
    render(
        <MemoryRouter>
            <ForgotPasswordPage />
        </MemoryRouter>
    );
    const backButton = screen.getByRole('button', { name: /Back to login/ });
    fireEvent.click(backButton);

    // Assuming there's a redirection to the login screen
    expect(window.location.pathname).toBe('/login');
});

// TC-FP-9. Verify that the system appropriately handles form submission with an empty email field during the account recovery process.
test('displays error message for empty email field during account recovery', async () => {
    render(
        <MemoryRouter>
            <ForgotPasswordPage />
        </MemoryRouter>
    );
    const emailInput = screen.getByPlaceholderText('Enter Email Address');
    const submitButton = screen.getByRole('button', { name: /Reset Password/ });

    fireEvent.click(submitButton);

    // Assuming there's an error message displayed
    const errorMessage = await screen.findByText('Please enter your email ID.');
    expect(errorMessage).toBeInTheDocument();
});
