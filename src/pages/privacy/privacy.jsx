import React from 'react';
import './style.scss'; // Stil dosyasını ekleyin

class PrivacyPolicy extends React.Component {
  render() {
    return (
      <div className="privacy-policy"> {/* Stil sınıfını ekleyin */}
        <h2>FilmEvreni Gizlilik Politikası</h2>
        <p>
          Giriş
          FilmEvreni olarak, kullanıcılarımızın gizliliğini korumak bizim için önemlidir. Bu gizlilik politikası, FilmEvreni web sitesi ve hizmetlerimiz aracılığıyla toplanan bilgilerin nasıl kullanıldığını açıklar.
        </p>
        <h3>Toplanan Bilgiler</h3>
        <p>
          FilmEvreni web sitesini ziyaret ettiğinizde veya hizmetlerimizi kullanırken, çeşitli bilgileri toplayabiliriz. Bu bilgiler şunları içerebilir:
          - Kişisel bilgiler: İsim, e-posta adresi gibi doğrudan tanımlanabilir bilgiler.
          - Kullanıcı etkileşim bilgileri: Siteyi ziyaret etme ve hizmetlerimizi kullanma biçimi hakkında bilgiler.
          - Çerezler ve benzer teknolojiler aracılığıyla toplanan bilgiler: Oturum açma durumu, dil tercihi gibi teknik bilgiler.
        </p>
        <h3>Bilgi Kullanımı</h3>
        <p>
          Topladığımız bilgileri aşağıdaki amaçlarla kullanabiliriz:
          - Hizmet sağlama: Kullanıcıların hesaplarını yönetmek, içerik sunmak ve gerektiğinde destek sağlamak.
          - İyileştirme: Hizmetlerimizi ve kullanıcı deneyimini geliştirmek için toplu verileri analiz etmek.
          - İletişim: Kullanıcılarla hizmetlerimiz hakkında bilgi paylaşmak, güncellemeler ve teklifler sunmak.
        </p>
        <h3>Bilgi Paylaşımı</h3>
        <p>
          FilmEvreni olarak, kullanıcı bilgilerini üçüncü taraflarla paylaşmamaya özen gösteririz. Ancak, yasal gereklilikler veya hizmetlerimizi sağlamak için işbirliği yaptığımız ortaklarımızla bilgi paylaşımı yapabiliriz.
        </p>
        <h3>Gizlilik Seçenekleri</h3>
        <p>
          Kullanıcılar, çerez tercihlerini yönetebilir ve bazı durumlarda kişisel bilgilerini güncelleyebilir veya silebilirler. Bu seçenekler, kullanıcı hesap ayarları üzerinden erişilebilir.
        </p>
        <h3>Gizlilik Politikası Güncellemeleri</h3>
        <p>
          FilmEvreni, gizlilik politikasını zaman zaman güncelleyebilir. Değişiklikler web sitesinde yayınlanacak ve önemli değişiklikler durumunda kullanıcılara bildirilecektir.
        </p>
        <h3>İletişim</h3>
        <p>
          Gizlilik politikamızla ilgili sorularınız veya endişeleriniz varsa, lütfen bize iletisim@filmevreni.com adresinden ulaşın.
        </p>
        <h3>Son Güncelleme Tarihi</h3>
        <p>
          Bu gizlilik politikası en son [10 Mayıs 2024] tarihinde güncellenmiştir.
        </p>
      </div>
    );
  }
}

export default PrivacyPolicy;
