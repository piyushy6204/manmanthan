import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = { title: "Privacy Policy | Mann Manthan" };

// NOTE: general starting text. Have it reviewed against the practice's actual data handling before launch.
export default function Privacy() {
  return (
    <LegalPage title="Privacy Policy">
      <p>This page explains how {siteConfig.name} handles the information you share through this website.</p>
      <h2>What we collect</h2>
      <p>
        If you send an enquiry, we receive the name, email address, phone number, preferred session format, optional preferred date and optional message that you
        enter. Please do not include detailed personal or health information in the message.
      </p>
      <h2>How we use it</h2>
      <p>We use these details only to respond to your enquiry and to arrange an appointment if you wish to go ahead. We do not use them for advertising.</p>
      <h2>Consent</h2>
      <p>You are asked to confirm that we may contact you about your enquiry before it is sent. You can ask us to stop contacting you at any time.</p>
      <h2>Confidentiality</h2>
      <p>Professional confidentiality is respected within applicable ethical and legal limits. Specific arrangements can be discussed before sessions begin.</p>
      <h2>Contact</h2>
      <p>For questions about this policy, use the enquiry form on the home page.</p>
    </LegalPage>
  );
}
