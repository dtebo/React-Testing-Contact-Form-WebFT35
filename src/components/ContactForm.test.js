import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import { act } from "react-dom/test-utils";
import ContactForm from './ContactForm.js';

describe('Component should behave correctly', () => {
    test('Form should render', () => {
        render(<ContactForm />);

        const firstName = screen.findByPlaceholderText(/Edd/i);

        expect(firstName).toBeTruthy();
    });

    test('First Name field should validate correctly', async () => {
        render(<ContactForm />);

        const firstName = screen.getByPlaceholderText(/Edd/i);

        fireEvent.change(firstName, { target: { value: 'Darre' }});

        const button = screen.getByText(/submit/i);

        act(() => {
            fireEvent.blur(firstName);
        });

        const error = screen.queryByText(/Looks like there was an error: maxLength/i);

        await waitFor(() => {
            expect(error).toBeNull();
        });
    });

    test('Last Name field should validate correctly', async () => {
        render(<ContactForm />);

        const lastName = screen.getByPlaceholderText(/Burke/i);

        lastName.value = 'Tebo';
        expect(lastName).toHaveValue('Tebo');

        fireEvent.blur(lastName);

        await waitFor(() => {
            const error = screen.queryByText(/Looks like there was an error: required/i);
            expect(error).not.toBeInTheDocument();
        });
    });
})