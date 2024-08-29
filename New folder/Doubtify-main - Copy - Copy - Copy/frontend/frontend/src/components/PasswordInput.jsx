import React, { useState } from 'react';

const PasswordInput = ({ value, onChange }) => {
    const [showPassword, setShowPassword] = useState(false);
    const [isDarkTheme, setIsDarkTheme] = useState(true); // Example theme state


    return (
        <div>
            <input
                type={showPassword ? 'text' : 'password'}
                value={value}
                onChange={onChange}
                className={`form-input w-full  ${isDarkTheme ? 'text-gray-900':'text-gray-300'} `}
                placeholder="Password (at least 10 characters)"
                required
            />
            <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="mt-2 text-sm text-blue-500"
            >
                {showPassword ? 'Hide' : 'Show'}
            </button>
        </div>
    );
};

export default PasswordInput;
