import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Dashboard from '../pages/Dashboard';

test('TC-DP-1 : Verify Presence and Functionality of Doctor Profile Icon', () => {
    render(
        <MemoryRouter>
            <Dashboard />
        </MemoryRouter>
    );

    // Ensure the doctor profile icon is present
    const doctorProfileIcon = screen.getByTestId('doctor-profile-icon');
    expect(doctorProfileIcon).toBeInTheDocument();

    // Click the doctor profile icon
    fireEvent.click(doctorProfileIcon);

    // Check if the dropdown menu appears
    const accountSettingsOption = screen.getByText('Account Settings');
    const logoutOption = screen.getByText('Logout');
    expect(accountSettingsOption).toBeInTheDocument();
    expect(logoutOption).toBeInTheDocument();
});

test('TC-DP-2 : Verify Successful Logout from the System', async () => {
    render(
        <MemoryRouter>
            <Dashboard />
        </MemoryRouter>
    );

    // Click the doctor profile icon
    const doctorProfileIcon = screen.getByTestId('doctor-profile-icon');
    fireEvent.click(doctorProfileIcon);

    // Click the logout option
    const logoutOption = screen.getByText('Logout');
    fireEvent.click(logoutOption);

    // Ensure redirection to the login page
    expect(screen.getByPlaceholderText(/Enter User ID/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Enter Password/i)).toBeInTheDocument();
});

test('TC-DP-3 : Verify Access to Account Settings', () => {
    render(
        <MemoryRouter>
            <Dashboard />
        </MemoryRouter>
    );

    // Click the doctor profile icon
    const doctorProfileIcon = screen.getByTestId('doctor-profile-icon');
    fireEvent.click(doctorProfileIcon);

    // Click the account settings option
    const accountSettingsOption = screen.getByText('Account Settings');
    fireEvent.click(accountSettingsOption);

    // Ensure redirection to the account settings page
    expect(screen.getByText('Account Settings')).toBeInTheDocument();
});

test('TC-DP-4 : Verify Presence and Functionality of Notification icon', () => {
    render(
        <MemoryRouter>
            <Dashboard />
        </MemoryRouter>
    );

    // Ensure the notification icon is present
    const notificationIcon = screen.getByTestId('notification-icon');
    expect(notificationIcon).toBeInTheDocument();
});

test('TC-DP-5 : Verify the presence of the DashBoard heading on the DashBoard page', () => {
    render(
        <MemoryRouter>
            <Dashboard />
        </MemoryRouter>
    );

    // Ensure the Dashboard heading is present
    const dashboardHeading = screen.getByText('Dashboard');
    expect(dashboardHeading).toBeInTheDocument();
});
