import React from "react";
import { screen, render } from '@testing-library/react';
import Product from './index';

describe("<Product />", () => {
    test("should display a cart total component", async () => {
    
        // Arrange
        render(<Product 
            id='3ab4c6bc-8920-11ec-a5e9-939419c56813' 
            productName='Cup' 
            maxAmount={100} 
            amount={1} 
            price={1.99} />);
            expect(screen.getByText(/€/)).toBeDefined();
        // screen.getByText(/€/).click();
    });
  });