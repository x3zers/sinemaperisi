import React, { useState } from 'react';
import './sss.scss';

const AccordionItem = ({ question, answer }) => {
  const [isActive, setIsActive] = useState(false);

  const toggleAccordion = () => {
    setIsActive(!isActive);
  };

  return (
    <div className={`accordion-item ${isActive ? 'active' : ''}`} onClick={toggleAccordion}>
      <div className="accordion-question">{question}</div>
      <div className="accordion-answer">{answer}</div>
    </div>
  );
};

const SSS = () => {
  return (
    <div>
      <header>
        <script src="sssjs.js"></script>
      </header>
      <body>
        <div className="container">
          <div className="accordion">
            <AccordionItem
              question="Favori dizi nerede izleyebilirim?"
              answer="Sinemaperisi, Netflix, BluTV gibi platformlarda yayınlanan diziler hakkında incelemeler sunmaktadır."
            />
            <AccordionItem
              question="Dizi önerileriniz nelerdir?"
              answer="Her hafta yeni dizileri ve popüler dizileri inceleyerek öneriler sunmaktayız. Sitemizi takip ederek güncel önerilere ulaşabilirsiniz."
            />
            <AccordionItem
              question="Üye olmak ücretsiz mi?"
              answer="Evet, Sinemaperisi'ne ücretsiz olarak üye olabilirsiniz."
            />
            <AccordionItem
              question="Yorum yapmak için üye olmalı mıyım?"
              answer="Hayır, yorum yapmak için üye olmanıza gerek yoktur. Ancak üye olarak daha fazla özellikten yararlanabilirsiniz."
            />
            <AccordionItem
              question="İnceleme eklemek için nasıl başvurabilirim?"
              answer="İnceleme eklemek için iletişim sayfamızdan bizimle iletişime geçebilirsiniz."
            />
            <AccordionItem
              question="Hangi tür dizileri incelemektesiniz?"
              answer="Sinemaperisi, her türden diziye yer vermektedir. Dram, komedi, bilim kurgu, gerilim gibi farklı türlerde dizileri incelemekteyiz."
            />
            <AccordionItem
              question="Diziler hakkında nasıl yorum yapabilirim?"
              answer="Dizi incelemesi sayfasında, dizinin altında bulunan yorum bölümünden yorum yapabilirsiniz."
            />
            <AccordionItem
              question="Siteye nasıl abone olabilirim?"
              answer="Siteye abone olmak için ana sayfamızda bulunan abone ol butonuna tıklayabilirsiniz."
            />
            <AccordionItem
              question="İncelemeleriniz ne kadar güncel?"
              answer="Sinemaperisi, en güncel dizi incelemelerini sunmayı hedefler."
            />
            <AccordionItem
              question="Sitemizde hangi dilde içerik bulunmaktadır?"
              answer="Şu anda sitemizde Türkçe dilinde içerik bulunmaktadır."
            />
          </div>
        </div>
      </body>
    </div>
  );
};

export default SSS;
