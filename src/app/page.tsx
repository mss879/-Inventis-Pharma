import HomeClient from "@/components/HomeClient";
import JsonLd from "@/components/JsonLd";
import { breadcrumbSchema, faqSchema, webPageSchema } from "@/lib/schema";
import { HOME_FAQS } from "@/lib/faqs";

export default function Home() {
  return (
    <>
      <JsonLd
        id="schema-home-webpage"
        data={webPageSchema({
          path: "/",
          name: "Inventis Pharma | Biomedical Device Importer & Distributor Sri Lanka",
          description:
            "Sri Lanka's leading importer and distributor of clinical biomedical devices, dialysis consumables, rehabilitation aids, homecare apparatus, and surgical equipment.",
        })}
      />
      <JsonLd
        id="schema-home-breadcrumb"
        data={breadcrumbSchema([{ name: "Home", path: "/" }])}
      />
      <JsonLd
        id="schema-home-faq"
        data={faqSchema(HOME_FAQS.map((f) => ({ question: f.question, answer: f.answer })))}
      />
      <HomeClient />
    </>
  );
}
