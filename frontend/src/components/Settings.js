import { useState } from 'react';

const Settings = (props) => {
  const [myName, setMyName] = useState('');
  const [myMobileNum, setMyMobileNum] = useState('');

  const handleMyNameChange = (e) => {
    setMyName(e.target.value);
  };

  const handleMyMobileNumChange = (e) => {
    setMyMobileNum(e.target.value);
  };
  const handleSubmit = (e) => {
    console.log('handlesubmi');
    props.setDataMethod(e, myName, myMobileNum);
  };
  return (
    <div>
      <h1>SETTINGS</h1>
      <form onSubmit={handleSubmit}>
        <h3>My Name</h3>
        <input type="text" value={myName} onChange={handleMyNameChange} />
        <h3>My Mobile Number</h3>
        <input
          type="text"
          value={myMobileNum}
          onChange={handleMyMobileNumChange}
        />
        <button type="submit">Set</button>
      </form>
    </div>
  );
};
export default Settings;
