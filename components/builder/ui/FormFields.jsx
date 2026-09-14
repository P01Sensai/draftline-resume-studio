import React from 'react';

export function MinimalField({ label, ...props }) {
  return (
    <label className="block mb-4">
      <span className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1.5">
        {label}
      </span>
      <input
        {...props}
        className="w-full bg-transparent border-b border-gray-200 dark:border-gray-700 py-2 text-sm text-gray-900 dark:text-gray-100 outline-none focus:border-[#0066FF] transition-colors placeholder:text-gray-300 dark:placeholder:text-gray-600"
      />
    </label>
  );
}

export function MinimalTextArea({ label, ...props }) {
  return (
    <label className="block mb-4">
      <span className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1.5">
        {label}
      </span>
      <textarea
        {...props}
        className="w-full bg-gray-50 dark:bg-[#0a0b14] border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-2 text-sm text-gray-900 dark:text-gray-100 outline-none focus:border-[#0066FF] dark:focus:border-[#0066FF] focus:bg-white dark:focus:bg-[#151621] transition-colors resize-y placeholder:text-gray-300 dark:placeholder:text-gray-600"
      />
    </label>
  );
}

export function MonthYearPicker({ label, value, onChange, disabled }) {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 50 }, (_, i) => currentYear + 5 - i); // From +5 years down to -45 years
  const days = Array.from({ length: 31 }, (_, i) => String(i + 1));

  let currentMonth = '';
  let currentDay = '';
  let currentYearVal = '';

  if (value && value !== 'Present') {
    const parts = value.replace(/,/g, '').split(' ');
    if (parts.length === 3) {
      currentMonth = parts[0];
      currentDay = parts[1];
      currentYearVal = parts[2];
    } else if (parts.length === 2) {
      currentMonth = parts[0];
      currentYearVal = parts[1];
    }
  }

  const triggerChange = (m, d, y) => {
    if (!m && !d && !y) return onChange('');
    if (!d) return onChange(`${m || 'Jan'} ${y || currentYear}`);
    return onChange(`${m || 'Jan'} ${d}, ${y || currentYear}`);
  };

  const handleMonthChange = (e) => triggerChange(e.target.value, currentDay, currentYearVal);
  const handleDayChange = (e) => triggerChange(currentMonth, e.target.value, currentYearVal);
  const handleYearChange = (e) => triggerChange(currentMonth, currentDay, e.target.value);

  if (disabled) {
    return (
      <label className="block mb-4 opacity-60">
        <span className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1.5">{label}</span>
        <div className="w-full bg-transparent border-b border-gray-200 dark:border-gray-700 py-2 text-sm text-gray-900 dark:text-gray-100">
          {value || 'Present'}
        </div>
      </label>
    );
  }

  return (
    <label className="block mb-4">
      <span className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1.5">{label}</span>
      <div className="flex gap-2">
        <select 
          value={currentMonth} 
          onChange={handleMonthChange}
          className="flex-1 bg-transparent border-b border-gray-200 dark:border-gray-700 py-2 text-sm text-gray-900 dark:text-gray-100 outline-none focus:border-[#0066FF] transition-colors cursor-pointer appearance-none"
        >
          <option value="" className="dark:bg-gray-800">Month</option>
          {months.map(m => <option key={m} value={m} className="dark:bg-gray-800">{m}</option>)}
        </select>
        <select 
          value={currentDay} 
          onChange={handleDayChange}
          className="flex-1 bg-transparent border-b border-gray-200 dark:border-gray-700 py-2 text-sm text-gray-900 dark:text-gray-100 outline-none focus:border-[#0066FF] transition-colors cursor-pointer appearance-none"
        >
          <option value="" className="dark:bg-gray-800">Day</option>
          {days.map(d => <option key={d} value={d} className="dark:bg-gray-800">{d}</option>)}
        </select>
        <select 
          value={currentYearVal} 
          onChange={handleYearChange}
          className="flex-1 bg-transparent border-b border-gray-200 dark:border-gray-700 py-2 text-sm text-gray-900 dark:text-gray-100 outline-none focus:border-[#0066FF] transition-colors cursor-pointer appearance-none"
        >
          <option value="" className="dark:bg-gray-800">Year</option>
          {years.map(y => <option key={y} value={y} className="dark:bg-gray-800">{y}</option>)}
        </select>
      </div>
    </label>
  );
}
