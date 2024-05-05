function toggleAccordion(event) {
    const accordionItem = event.currentTarget;
    accordionItem.classList.toggle('active');
    
    const accordionAnswer = accordionItem.querySelector('.accordion-answer');
    if (accordionItem.classList.contains('active')) {
      accordionAnswer.style.maxHeight = accordionAnswer.scrollHeight + "px";
    } else {
      accordionAnswer.style.maxHeight = 0;
    }
  }
  