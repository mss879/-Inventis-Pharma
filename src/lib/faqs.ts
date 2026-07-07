/**
 * Homepage FAQ content — shared between the rendered accordion and the
 * FAQPage structured data so the two can never drift apart (Google requires
 * schema FAQ text to match the visible page text).
 */
export const HOME_FAQS = [
  {
    question: "What biomedical products does Inventis Pharma supply?",
    answer:
      "We supply a diverse range of medical devices including dialysis consumables, rehabilitation aids, surgery kits, home care medical apparatus, and SLS/WHO compliant sanitizers like Sterigen.",
  },
  {
    question: "Are your products compliant with Sri Lankan healthcare regulations?",
    answer:
      "Yes, absolutely. We maintain rigorous standards. All our products are ITI certified, compliant with relevant regulatory authorities like NMRA, and manufactured in GMP certified factories.",
  },
  {
    question: "Does Inventis Pharma participate in Sri Lankan medical tenders?",
    answer:
      "Yes, Inventis Pharma is an active player in the government tender market of Sri Lanka, supplying consumables and systems to public hospitals and local clinics.",
  },
  {
    question: "How can international suppliers partner with Inventis Pharma?",
    answer:
      "We are always open to collaborations with global suppliers who share our quality assurance objectives. Please submit an inquiry through our Contact page or reach out to our office in Dehiwala.",
  },
] as const;
