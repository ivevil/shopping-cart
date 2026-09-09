import React from "react";

interface SliderAmountProps {
    updateAmount: (arg: number) => void;
    selectedAmount: number;
    max: number;
}

const SliderAmount: React.FC<SliderAmountProps> = ({ updateAmount, selectedAmount, max }) => {
    const safeMax = Math.max(1, max);
    const value = Math.min(Math.max(1, selectedAmount), safeMax);

    const decreaseAmount = () => {
        updateAmount(Math.max(1, value - 1));
    };

    const increaseAmount = () => {
        updateAmount(Math.min(safeMax, value + 1));
    };

    return (
        <div className="quantity-stepper" aria-label="Choose quantity">
            <button
                type="button"
                className="quantity-stepper__button"
                onClick={decreaseAmount}
                aria-label="Decrease quantity"
                disabled={value <= 1}
            >
                −
            </button>
            <span className="quantity-stepper__value" aria-live="polite">
                {value}
            </span>
            <button
                type="button"
                className="quantity-stepper__button"
                onClick={increaseAmount}
                aria-label="Increase quantity"
                disabled={value >= safeMax}
            >
                +
            </button>
        </div>
    )
}

export default SliderAmount;

