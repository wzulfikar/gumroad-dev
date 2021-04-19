import { memo } from 'react';

const themes = {
  yellow: {
    label: {
      default: 'group-hover:bg-gray-200',
      active: 'bg-yellow-400 text-yellow-900',
    },
    ribbon: {
      default: 'group-hover:text-gray-200',
      active: 'text-yellow-400',
    },
  },
};

function PriceTag({ active, currency, price, theme = 'yellow' }) {
  const cls = themes[theme];
  return (
    <div className="relative">
      {/* Price label */}
      <span
        className={`${
          active ? cls.label.active : cls.label.default
        } relative z-10 inline-block py-1 pl-2.5 pr-2 mr-0 text-sm font-bold bg-gray-300 pointer-events-none rounded-sm`}
      >
        {currency}
        {price}
      </span>

      {/* Ribbon */}
      <div
        className={`${
          active ? cls.ribbon.active : cls.ribbon.default
        } absolute top-0 right-0 text-gray-300`}
      >
        <span
          style={{
            border: '16px solid transparent',
            borderTop: '16px solid currentColor',
          }}
          className="absolute w-5 h-5 -ml-4 transform scale-x-50"
        ></span>
        <span
          style={{
            border: '16px solid transparent',
            borderBottom: '16px solid currentColor',
          }}
          className="absolute w-5 h-5 -ml-4 -mt-1 transform scale-x-50"
        ></span>
      </div>
    </div>
  );
}

export default memo(PriceTag);
