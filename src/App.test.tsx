import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from './App';

test('CART', () => {
    render (<App />);
    console.log("it is working")
});

test('quantity selector respects the selected product stock limit', async () => {
    render(<App />);

    await waitFor(() => expect(screen.getByRole('combobox')).toBeInTheDocument());

    fireEvent.change(screen.getByRole('combobox'), {
        target: { value: '2fdc8b4e-8920-11ec-aadd-cbe09129765b' }
    });

    await waitFor(() => {
        expect(screen.getByRole('slider')).toHaveAttribute('max', '2');
        expect(screen.getByRole('spinbutton')).toHaveAttribute('max', '2');
    });
});