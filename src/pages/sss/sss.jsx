import React, { useState } from 'react';
import './style.scss';

const SSS = () => {
  const toggleAccordion = (event) => {
    const accordionItem = event.currentTarget;
    accordionItem.classList.toggle('active');
    const accordionContent = accordionItem.querySelector('.accordion-answer');
    if (accordionItem.classList.contains('active')) {
      accordionContent.style.maxHeight = accordionContent.scrollHeight + 'px';
    } else {
      accordionContent.style.maxHeight = 0;
    }
  };

  return (
    <div className="faq-container">
      <h2 className="faq-title">Sıkça Sorulan Sorular</h2>
      <div className="accordion">
        <div className="accordion-item" onClick={toggleAccordion}>
          <div className="accordion-question">Favori dizimi nerede izleyebilirim?</div>
          <div className="accordion-answer">Sinemaperisi, Netflix, BluTV gibi platformlarda yayınlanan diziler hakkında incelemeler sunmaktadır.</div>
        </div>
        <div className="accordion-item" onClick={toggleAccordion}>
          <div className="accordion-question">Dizi önerileriniz nelerdir?</div>
          <div className="accordion-answer">Her hafta yeni dizileri ve popüler dizileri inceleyerek öneriler sunmaktayız. Sitemizi takip ederek güncel önerilere ulaşabilirsiniz.</div>
        </div>
          <div class="accordion-item" onClick={toggleAccordion}>
        <div class="accordion-question">Üye olmak ücretsiz mi?</div>
        <div class="accordion-answer">Evet, Sinemaperisi'ne ücretsiz olarak üye olabilirsiniz.</div>
      </div>
      <div class="accordion-item" onClick={toggleAccordion}>
        <div class="accordion-question">Yorum yapmak için üye olmalı mıyım?</div>
        <div class="accordion-answer">Hayır, yorum yapmak için üye olmanıza gerek yoktur. Ancak üye olarak daha fazla özellikten yararlanabilirsiniz.</div>
      </div>
      <div class="accordion-item" onClick={toggleAccordion}>
        <div class="accordion-question">İnceleme eklemek için nasıl başvurabilirim?</div>
        <div class="accordion-answer">İnceleme eklemek için iletişim sayfamızdan bizimle iletişime geçebilirsiniz.</div>
      </div>
      <div class="accordion-item" onClick={toggleAccordion}>
        <div class="accordion-question">Hangi tür dizileri incelemektesiniz?</div>
        <div class="accordion-answer">Sinemaperisi, her türden diziye yer vermektedir. Dram, komedi, bilim kurgu, gerilim gibi farklı türlerde dizileri incelemekteyiz.</div>
      </div>
      <div class="accordion-item" onClick={toggleAccordion}>
        <div class="accordion-question">Diziler hakkında nasıl yorum yapabilirim?</div>
        <div class="accordion-answer">Dizi incelemesi sayfasında, dizinin altında bulunan yorum bölümünden yorum yapabilirsiniz.</div>
      </div>
      <div class="accordion-item" onClick={toggleAccordion}>
        <div class="accordion-question">Siteye nasıl abone olabilirim?</div>
        <div class="accordion-answer">Siteye abone olmak için ana sayfamızda bulunan abone ol butonuna tıklayabilirsiniz.</div>
      </div>
      <div class="accordion-item" onClick={toggleAccordion}>
        <div class="accordion-question">İncelemeleriniz ne kadar güncel?</div>
        <div class="accordion-answer">Sinemaperisi, en güncel dizi incelemelerini sunmayı hedefler.</div>
      </div>
      <div class="accordion-item" onClick={toggleAccordion}>
        <div class="accordion-question"> Sitemizde hangi dilde içerik bulunmaktadır?</div>
        <div class="accordion-answer"> Şu anda sitemizde Türkçe dilinde içerik bulunmaktadır.</div>
      </div>
        </div>
      </div>
  );
};

export default SSS;
