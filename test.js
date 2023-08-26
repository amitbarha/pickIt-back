function getFirstParagraph(message) {
    const paragraphs = message.split(/\n\s*\n/);
    
    if (paragraphs.length > 0) {
      return paragraphs[0].trim(); 
    } else {
      return ""; 
    }
  }
  
  const message = `
  שלום Amit Barhanin,
    משלוח MB0112867406Y
    ג 1404
    שנשלח מAliexpress ממתין בסופר בונוס (בית עסק)           דרך המרכז 4 כוכב יאיר.
    
    לצפייה בשעות הפעילות, זימון תור, אפשרויות משלוח עד אליך, הוראות צו יבוא אישי ועוד.
    לחץ https://postil.co.il/uTEW6Pa_lGXWz 
    תודה, דואר ישראל
  `;
  
  const firstParagraph = getFirstParagraph(message);
  const linkToPay = "https://www.bitpay.co.il/app/share-info?i=170560323445_19eHEbit"
    const bit = "bit"
  console.log(`hii ${bit.link(linkToPay)}`);