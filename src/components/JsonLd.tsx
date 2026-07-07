/**
 * Server component that injects a JSON-LD structured-data block.
 * Rendered inline in the body per the Next.js Metadata guidance.
 */
export default function JsonLd({
  data,
  id,
}: {
  data: Record<string, unknown>;
  id?: string;
}) {
  return (
    <script
      type="application/ld+json"
      id={id}
      // Structured data is authored by us (no user input), so this is safe.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
