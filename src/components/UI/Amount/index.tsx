import React from "react";
interface AmountProps {
  product: { maxAmount: number },
  updateAmount: (arg: number) => void,
  selectedAmount: number,
  max: number
}

const Amount: React.FC<AmountProps> = ({ updateAmount, selectedAmount, product, max }) => {
  const maxAmount = product ? product.maxAmount : max;

  return (
    <input
      id="amount"
      aria-label="Choose quantity"
      value={Math.min(selectedAmount, maxAmount || max || 1)}
      onChange={(
        ev: React.ChangeEvent<HTMLInputElement>,
      ): void => {
        const parsedValue = parseInt(ev.target.value, 10);
        const nextValue = Number.isNaN(parsedValue) ? 1 : parsedValue;
        updateAmount(Math.min(Math.max(1, nextValue), maxAmount || max || 1));
      }}
      type="number"
      min="1"
      max={maxAmount || max || 1}
    />
  )
}

export default Amount;