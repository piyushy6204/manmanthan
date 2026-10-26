import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = { title: "Terms of Service | Mann Manthan" };

// NOTE: general starting text. Have it reviewed before launch.
export default function Terms() {
  return (
    <LegalPage title="Terms of Service">
      <p>By using this website you agree to the following general terms.</p>
      <h2>About this website</h2>
      <p>
        {siteConfig.name} provides information about counselling services. The content here is general and educational. It is not a diagnosis, a clinical assessment
        or a substitute for individual professional advice.
      </p>
      <h2>Enquiries and appointments</h2>
      <p>Sending an enquiry does not book or confirm a session. An appointment is confirmed only once a time has been agreed with you.</p>
      <h2>Urgent situations</h2>
      <p>This website is not an emergency service. If you are in immediate danger or need urgent help, please contact your local emergency services.</p>
      <h2>Availability</h2>
      <p>Online sessions and appointment times are subject to availability and to arrangements confirmed with the counsellor.</p>
    </LegalPage>
  );
}
