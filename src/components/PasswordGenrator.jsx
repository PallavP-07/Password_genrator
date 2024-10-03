// import React, { useState } from 'react';

// const PasswordMaker = () => {
//   const [passLength, setPassLength] = useState(1);
//   const [upperCaseOption, setUpperCaseOption] = useState(false);
//   const [lowerCaseOption, setLowerCaseOption] = useState(false);
//   const [numberOption, setNumberOption] = useState(false);
//   const [symbolOption, setSymbolOption] = useState(false);

//   const handleChangeUpper = (e) => setUpperCaseOption(e.target.checked);
//   const handleChangeLower = (e) => setLowerCaseOption(e.target.checked);
//   const handleChangeNum = (e) => setNumberOption(e.target.checked);
//   const handleChangeSym = (e) => setSymbolOption(e.target.checked);
// console.log(upperCaseOption)
//   return (
//     <>
//       <h2>Password Generator</h2>
//       <label>
//         Password Length: {passLength}
//       </label>
//       <input 
//         type='range' 
//         value={passLength} 
//         min={1} 
//         max={32} 
//         step={1} 
//         onChange={(e) => setPassLength(Number(e.target.value))} 
//       />
//       <div>
//         <label htmlFor='upperCase'>
//           <input
//             id='upperCase'
//             type='checkbox'
//             checked={upperCaseOption}
//             onChange={handleChangeUpper}
//           />
//           Add Uppercase Characters
//         </label>
//       </div>
//       <div>
//         <label htmlFor='lowerCase'>
//           <input
//             id='lowerCase'
//             type='checkbox'
//             checked={lowerCaseOption}
//             onChange={handleChangeLower}
//           />
//           Add Lowercase Characters
//         </label>
//       </div>
//       <div>
//         <label htmlFor='numbers'>
//           <input
//             id='numbers'
//             type='checkbox'
//             checked={numberOption}
//             onChange={handleChangeNum}
//           />
//           Add Numbers
//         </label>
//       </div>
//       <div>
//         <label htmlFor='symbols'>
//           <input
//             id='symbols'
//             type='checkbox'
//             checked={symbolOption}
//             onChange={handleChangeSym}
//           />
//           Add Symbols
//         </label>
//       </div>
//     </>
//   );
// };

// export default PasswordMaker;


import React, { useEffect, useState } from 'react';
import { OptionSet } from '../../options';

const PasswordMaker = () => {
  const [newPassword, setNewPassword] = useState('');
  const [passwordStrength, setPasswordStrength] = useState('')
  const [timeLeft, setTimeLeft] = useState(null);
  const [state, setState] = useState({
    passLength: 8,
    upperCaseOption: false,
    lowerCaseOption: false,
    numberOption: false,
    symbolOption: false,
  });
  //generate random password
  const passWordGen = (state, OptionSet) => {
    let passGen = '';

    if (state.upperCaseOption) passGen += OptionSet.UPPERCASE;
    if (state.lowerCaseOption) passGen += OptionSet.LOWERCASE;
    if (state.numberOption) passGen += OptionSet.NUMBER;
    if (state.symbolOption) passGen += OptionSet.SPECIAL_CHAR;

    if (passGen === '') return '';

    let password = '';
    for (let i = 0; i < state.passLength; i++) {
      password += passGen.charAt(Math.floor(Math.random() * passGen.length));
    }

    return password;
  };

  //passowrd strngth check

  const passwordStrengt = (password) => {
    let strength = 0;
    if (password.length >= 8) strength + 1;
    if (/[A-Z]/.test(password)) strength += 1;
    if (/[a-z]/.test(password)) strength += 1;
    if (/[0-9]/.test(password)) strength += 1;
    if (/[A-Za-z0-9]/.test(password)) strength += 1;
    if (strength === 5) return 'Strong';
    if (strength >= 3) return 'medium';
    return 'weak'

  };

  //copy password
  const handleCopyPassword = () => {
    if (newPassword && navigator.clipboard) {
      navigator.clipboard.writeText(newPassword).then(() => {
        alert('Password copied to clipboard!');
      });
    }
  };

  const handleChange = (e) => {
    const { name, type, checked, value } = e.target;
    setState((prevState) => ({
      ...prevState,
      [name]: type === 'checkbox' ? checked : parseInt(value),
    }));
  };

  const handleGeneratePassword = () => {
    const password = passWordGen(state, OptionSet);
    setNewPassword(password);
    setPasswordStrength(passwordStrengt(password));
    setTimeLeft(30)
  };
useEffect(()=>{
if(timeLeft === null) return;
if(timeLeft > 0){
  const timer = setTimeout(()=>{
setTimeLeft(timeLeft-1)
  },1000);
  return ()=>clearTimeout(timer);
}else{
  setNewPassword('');
  setPasswordStrength('');
}
},[timeLeft])
  return (
    <>
      <div className="password-generator-card">
      <h2 className="card-title">Password Generator</h2>

      <label className="label">
        Password Length: {state.passLength}
      </label>
      <input
        type="range"
        name="passLength"
        value={state.passLength}
        min={1}
        max={32}
        step={1}
        onChange={handleChange}
        className="range-input"
      />
      <div className="option-checkboxes">
        <label htmlFor="upperCase">
          <input
            id="upperCase"
            name="upperCaseOption"
            type="checkbox"
            checked={state.upperCaseOption}
            onChange={handleChange}
          />
          Add Uppercase Characters
        </label>
        <label htmlFor="lowerCase">
          <input
            id="lowerCase"
            name="lowerCaseOption"
            type="checkbox"
            checked={state.lowerCaseOption}
            onChange={handleChange}
          />
          Add Lowercase Characters
        </label>
        <label htmlFor="numbers">
          <input
            id="numbers"
            name="numberOption"
            type="checkbox"
            checked={state.numberOption}
            onChange={handleChange}
          />
          Add Numbers
        </label>
        <label htmlFor="symbols">
          <input
            id="symbols"
            name="symbolOption"
            type="checkbox"
            checked={state.symbolOption}
            onChange={handleChange}
          />
          Add Symbols
        </label>
      </div>
      <button className="generate-btn" onClick={handleGeneratePassword}>
        Generate Password
      </button>

      {newPassword && (
        <div className="password-output">
          <h3>Generated Password:</h3>
          <p className="password">{newPassword}</p>

          <p className={`password-strength ${passwordStrength}`}>
            Strength: <span>{passwordStrength}</span>
          </p>
          <button className="copy-btn" onClick={handleCopyPassword}>
            <i className="fa fa-copy"></i> Copy
          </button>
        </div>
      )}

      {newPassword && timeLeft !== null && (
        <h4>Time Left: {timeLeft} seconds</h4>
      )}
    </div>
    </>
  );
};

export default PasswordMaker;
