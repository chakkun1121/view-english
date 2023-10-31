export default function ToggleSwitch({
  isOn,
  handleToggle,
  bgColor = 'gray-500',
  activeBgColor = 'blue-500',
  toggleColor = 'white',
}: {
  isOn: boolean;
  handleToggle: (isChecked: boolean) => void;
  bgColor?: string;
  activeBgColor?: string;
  toggleColor?: string;
}) {
  return (
    <label>
      <input
        type="checkbox"
        className="peer sr-only"
        checked={isOn}
        onChange={(e) => handleToggle(e.target.checked)}
      />
      <span
        className={`block w-[2em] cursor-pointer bg-${bgColor} rounded-full 
          p-[1px] after:block after:h-[1em] after:w-[1em] after:rounded-full 
        after:bg-${toggleColor} after:transition peer-checked:bg-${activeBgColor} 
          peer-checked:after:translate-x-[calc(100%-2px)]`}
      ></span>
    </label>
  );
}
