import { LegalLayout } from "../Legal/LegalLayout";

export default function DPAPage() {
  return (
    <LegalLayout currentKey="dpa" title="Data Processing Addendum" lastUpdated="July 14, 2026">
      <p>
        <strong>Draft — pending legal review.</strong> This Data Processing Addendum ("DPA") forms
        part of the Terms of Service between Optikk ("Processor") and the customer ("Controller")
        and governs the processing of personal data contained in telemetry the Controller sends to
        the Service. Where this DPA conflicts with the Terms, this DPA controls for data protection
        matters.
      </p>

      <h2>1. Roles of the Parties</h2>
      <p>
        The Controller determines the purposes and means of processing personal data. Optikk acts as
        a Processor, processing personal data only on the Controller's documented instructions,
        including with regard to transfers, unless required by law.
      </p>

      <h2>2. Nature and Purpose of Processing</h2>
      <p>
        Optikk processes telemetry (logs, traces, and metrics) and associated metadata solely to
        provide the observability Service: ingesting, storing, querying, alerting on, and displaying
        the Controller's data. Optikk does not sell customer data or use it to train models without
        the Controller's explicit consent.
      </p>

      <h2>3. Sub-processors</h2>
      <p>
        The Controller authorizes Optikk to engage sub-processors to deliver the Service. The
        current sub-processor list — including cloud infrastructure (Google Cloud Platform), payment
        processing (Razorpay), and transactional email — is available on request and kept current at{" "}
        <a href="mailto:support@optikk.in">support@optikk.in</a>. Optikk remains responsible for its
        sub-processors' compliance with this DPA.
      </p>

      <h2>4. Security Measures</h2>
      <p>
        Optikk maintains technical and organizational measures appropriate to the risk, including
        encryption in transit, tenant isolation, hashed API keys, access controls, and audit
        logging. See the Security Statement for detail.
      </p>

      <h2>5. Data Subject Requests</h2>
      <p>
        Optikk will, taking into account the nature of processing, assist the Controller by
        appropriate measures in responding to requests to exercise data subject rights under
        applicable law, including the GDPR and the India DPDP Act.
      </p>

      <h2>6. International Transfers</h2>
      <p>
        Where personal data is transferred across borders, the parties rely on a lawful transfer
        mechanism, such as Standard Contractual Clauses, as applicable to the Controller's
        jurisdiction.
      </p>

      <h2>7. Deletion and Return</h2>
      <p>
        On termination of the Service, Optikk will delete the Controller's personal data within a
        commercially reasonable period, subject to retention required by law and to routine backup
        cycles from which data is purged on expiry.
      </p>

      <h2>8. Audit and Contact</h2>
      <p>
        The Controller may request information necessary to demonstrate compliance with this DPA.
        For DPA execution, sub-processor notices, or data protection questions, contact{" "}
        <a href="mailto:support@optikk.in">support@optikk.in</a>.
      </p>
    </LegalLayout>
  );
}
