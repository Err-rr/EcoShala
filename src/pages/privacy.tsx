import React from 'react';

export default function PrivacyPolicy() {
  const effectiveDate = 'September 11, 2025'; // change as needed

  return (
    <main className="max-w-4xl mx-auto p-6 font-sans text-slate-900">
      <header className="mb-6">
        <h1 className="text-3xl font-extrabold">Privacy Policy — EcoShala</h1>
        <p className="mt-2 text-sm text-slate-600">Effective Date: {effectiveDate}</p>
      </header>

      <section className="space-y-4">
        <p>
          At <strong>EcoShala</strong>, we respect your privacy. This Privacy Policy explains what information we collect,
          why we collect it, and how we use and protect it when you access or use our platform. By using EcoShala,
          you agree to the terms described here.
        </p>

        <h2 className="text-xl font-semibold mt-4">1. Information We Collect</h2>
        <ul className="list-disc list-inside text-slate-700">
          <li>
            <strong>Account information:</strong> name, email, school/college, class, and other details you provide on
            sign-up.
          </li>
          <li>
            <strong>Activity data:</strong> points, EcoQuests completed, leaderboard participation, lesson progress, and
            other in-app activity.
          </li>
          <li>
            <strong>Device & usage data:</strong> IP address, browser, operating system, and interaction patterns for
            analytics and security.
          </li>
          <li>
            <strong>Optional information:</strong> feedback, survey responses, and support requests you choose to submit.
          </li>
        </ul>

        <h2 className="text-xl font-semibold mt-4">2. How We Use Your Information</h2>
        <p className="text-slate-700">
          We use collected information to operate and improve EcoShala, personalise learning experiences, track progress,
          administer rewards and leaderboards, communicate updates, and ensure the safety and security of our users.
        </p>

        <h2 className="text-xl font-semibold mt-4">3. Children’s Privacy</h2>
        <p className="text-slate-700">
          EcoShala is designed for students, including young teens. We are committed to protecting children's privacy.
          For users under the age of 13 (or the applicable age in your country), parental consent may be required. We do
          not knowingly collect personal information from children without appropriate consent. Parents or guardians may
          contact us to request access, correction, or deletion of their child's account.
        </p>

        <h2 className="text-xl font-semibold mt-4">4. Sharing of Information</h2>
        <p className="text-slate-700">
          We do not sell or rent personal information. We may share information only in limited circumstances, including
          with trusted service providers who assist us in running the platform (e.g., hosting, analytics, customer
          support), to comply with legal obligations, or in aggregated, non-identifying form for reporting and research.
        </p>

        <h2 className="text-xl font-semibold mt-4">5. Data Security</h2>
        <p className="text-slate-700">
          We use administrative, technical, and physical safeguards to protect user information. While we strive to use
          commercially reasonable measures (including encryption and secure servers), no system can guarantee absolute
          security. We continuously review and update our security practices.
        </p>

        <h2 className="text-xl font-semibold mt-4">6. Your Choices</h2>
        <ul className="list-disc list-inside text-slate-700">
          <li>Update or delete account information through your profile settings.</li>
          <li>Opt out of non-essential communications such as newsletters.</li>
          <li>Request access, correction, or deletion of personal data by contacting our support team.</li>
        </ul>

        <h2 className="text-xl font-semibold mt-4">7. Cookies & Tracking</h2>
        <p className="text-slate-700">
          EcoShala uses cookies and similar technologies to provide session management, save progress in lessons and
          games, and analyze usage to improve the product. You may manage or disable cookies in your browser settings,
          but some features may not function correctly if cookies are disabled.
        </p>

        <h2 className="text-xl font-semibold mt-4">8. Changes to This Policy</h2>
        <p className="text-slate-700">
          We may update this Privacy Policy occasionally to reflect legal or product changes. If we make significant
          changes, we will notify users through the platform or via email and update the effective date above.
        </p>


        <p className="text-sm text-slate-500 mt-4">© {new Date().getFullYear()} EcoShala — RETHINK · RELEARN · RENEW</p>
      </section>
    </main>
  );
}
