// KullanımKosullari.jsx

import React from 'react';
import './style.scss'; // Stil dosyası
import { useNavigate, Link } from "react-router-dom";

const Terms = () => {
  const navigate = useNavigate();

  return (
    <div className="terms-container">
      <h2>FilmEvreni Kullanım Koşulları</h2>
      <p>
        Hoş geldiniz FilmEvreni! Bu kullanım koşulları, FilmEvreni web sitesinin ve hizmetlerinin kullanımını düzenler. Lütfen bu koşulları dikkatlice okuyun ve sitemizi kullanmaya devam etmeden önce kabul ettiğinizden emin olun.
      </p>
      <h3>Hizmetlerimizin Kullanımı</h3>
      <p>
        FilmEvreni, dizi ve film incelemeleri sunan bir platformdur. Sitemizi ziyaret ederek veya hizmetlerimizi kullanarak aşağıdaki koşulları kabul etmiş olursunuz:
        <ul>
          <li>Kişisel bilgilerinizi güncel ve doğru tutma sorumluluğunu kabul edersiniz.</li>
          <li>Siteyi kötüye kullanmayacaksınız ve diğer kullanıcıların huzurunu bozmayacaksınız.</li>
          <li>İçerik hakkında yorum yaparken hoşgörülü ve saygılı olmayı taahhüt edersiniz.</li>
        </ul>
      </p>
      <h3>Gizlilik Politikası</h3>
      <p>
        FilmEvreni'nin gizlilik politikası, kullanıcı bilgilerinin toplanması, kullanılması ve paylaşılması hakkında bilgi verir. Lütfen <a className='zers' onClick={() => navigate('/privacy')}>Gizlilik Politikası</a> okuyun.
      </p>
      <h3>Sorumluluk Reddi</h3>
      <p>
        FilmEvreni tarafından sağlanan içeriklerin doğruluğu veya güvenilirliği konusunda garanti verilmez. Kullanıcılar, sitemizi kendi riskleriyle kullanır.
      </p>
      <p>
        FilmEvreni, kullanım koşullarını dilediği zaman değiştirme hakkını saklı tutar. Değişikliklerin yürürlüğe girmesi için kullanıcılara bildirim yapılacaktır.
      </p>
    </div>
  );
};

export default Terms;
