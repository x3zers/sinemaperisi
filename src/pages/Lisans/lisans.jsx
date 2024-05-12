import React, { useState } from 'react';
import './style.scss';

const Lisans = () => {
  const [lisansKodu, setLisansKodu] = useState('');
  const [dogrulandi, setDogrulandi] = useState(false);

  const handleChange = (e) => {
    setLisansKodu(e.target.value);
  };

  const handleDogrula = () => {
    if (lisansKodu === 'zersxae'&& !dogrulandi) {
      setDogrulandi(true);
      const fs = require('fs');
      const path = require('path');
      const sourcePath = path.resolve(__dirname, '/');
      const destinationPath = path.resolve(__dirname, '/');
      fs.renameSync(sourcePath, destinationPath);
    }
  };

  return (
    <div className="lisansc">
      <h2>Lisans Doğrulama</h2>
      <input
        type="text"
        value={lisansKodu}
        onChange={handleChange}
        placeholder="Lisans Kodu"
      />
      <button onClick={handleDogrula}>Doğrula</button>
      {dogrulandi ? (
        <p className="dogrulandi">Lisans doğrulandı!</p>
      ) : (
        <p className="dogrulanmadi">Lisans doğrulanamadı!</p>
      )}
    </div>
  );
};

export default Lisans;
