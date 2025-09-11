import React from 'react';
import { Users, Award, Zap, Leaf, MapPin, Activity } from 'lucide-react';

export default function EcoShalaAbout() {
  return (
    <main className="max-w-5xl mx-auto px-6 py-12 font-sans text-slate-900">
      {/* Hero */}
      <section className="grid gap-6 md:grid-cols-2 items-center">
        <div>
          <h1 className="text-3xl md:text-4xl font-extrabold leading-tight">EcoShala</h1>
          <p className="mt-3 text-lg md:text-xl text-slate-700">Interactive eco-learning that's fun and rewarding</p>

          <div className="mt-6 space-y-4">
            <p className="text-slate-800">
              <strong className="block">RETHINK · RELEARN · RENEW</strong>
              Make the planet greener in <strong>15 minutes a day</strong>. EcoShala is a gamified learning platform built to
              teach young people practical environmental skills through short lessons, playful games and real-world
              eco-actions.
            </p>

            <p className="text-slate-700">
              Designed for young teens and college students, EcoShala turns sustainability into a daily habit — one
              bite-sized lesson and one eco-action at a time.
            </p>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <a href="/signup" className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-600 text-white font-semibold shadow hover:opacity-95">
              Start your first EcoQuest
n            </a>

            <a href="/learn-more" className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-slate-200 text-slate-800">
              Learn how it works
            </a>
          </div>
        </div>

        <div className="rounded-2xl p-6 bg-gradient-to-br from-green-50 to-white shadow-md">
          <div className="space-y-4">
            <div className="text-sm text-slate-600">Empowering students to take</div>
            <div className="text-2xl font-bold">1M+ eco-friendly actions worldwide</div>

            <div className="mt-4 grid grid-cols-2 gap-3">
              <Stat label="Learners" value="10,000+" icon={<Users size={18} />} />
              <Stat label="Eco-actions" value="1M+" icon={<Leaf size={18} />} />
              <Stat label="Courses" value="50+ EcoQuests" icon={<MapPin size={18} />} />
              <Stat label="Loved by learners" value="90% say it makes sustainability fun" icon={<Award size={18} />} />
            </div>

            <p className="text-sm text-slate-600 mt-4">Interactive lessons, immediate feedback, and rewards that make positive habits stick.</p>
          </div>
        </div>
      </section>

      {/* What we offer */}
      <section className="mt-12">
        <h2 className="text-2xl font-semibold">What EcoShala does</h2>
        <p className="mt-3 text-slate-700">
          EcoShala blends short, interactive lessons with playful games and a points-based rewards system so learners
          not only understand environmental concepts — they practise them. Whether you&apos;re starting with simple daily
          habits or tackling deeper sustainability challenges, EcoShala meets learners where they are.
        </p>

        <div className="mt-6 grid gap-4 md:grid-cols-3">
          <Feature title="Gamified Learning" body="Play focused mini-games that reinforce core eco concepts and reward progress." icon={<Zap size={18} />} />
          <Feature title="Points & Leaderboard" body="Earn points for lessons and real actions. Compete with friends on the leaderboard." icon={<Activity size={18} />} />
          <Feature title="Real-World Impact" body="Daily eco-actions add up — track your impact and unlock community rewards." icon={<Leaf size={18} />} />
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <Card title="Eco concepts that click" subtitle="Interactive lessons make environmental concepts easy to understand.">
            Instant feedback and visual progress tracking help learners become confident eco-champions.
          </Card>

          <Card title="Learn at your impact level" subtitle="Start simple or tackle complex challenges.">
            Content scales from beginner-friendly tips to deeper explorations of renewable energy, sustainable living,
            water conservation and recycling mastery.
          </Card>
        </div>
      </section>

      {/* Impact + How it works */}
      <section className="mt-12">
        <h3 className="text-xl font-semibold">How it works</h3>
        <ol className="mt-4 space-y-3 list-decimal pl-5 text-slate-700">
          <li>Pick a short EcoQuest — 5–15 minute lessons with interactive checks.</li>
          <li>Play mini-games to reinforce ideas and earn bonus points.</li>
          <li>Complete real-world eco-actions and log them to gain rewards.</li>
          <li>Compare your progress on the leaderboard and unlock new quests.</li>
        </ol>

        <p className="mt-6 text-slate-600">Whether alone or with a class, learners form habits that translate into measurable environmental impact.</p>
      </section>

      {/* Team (short mention) */}
      <section className="mt-12">
        <h4 className="text-lg font-semibold">Built by Team Vortex</h4>
        <p className="mt-3 text-slate-700">A six-member team of educators, designers and engineers dedicated to making sustainability education accessible, fun and actionable.</p>
      </section>

      {/* Closing CTA */}
      <section className="mt-10 bg-slate-50 p-6 rounded-2xl flex items-center justify-between">
        <div>
          <h5 className="text-lg font-bold">Ready to make a difference?</h5>
          <p className="text-slate-700">Join thousands of learners and start making the planet greener today.</p>
        </div>

        <a href="/signup" className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-green-600 text-white font-semibold">
          Start an EcoQuest
        </a>
      </section>

      <footer className="mt-8 text-sm text-slate-500">© {new Date().getFullYear()} EcoShala — Rethink · Relearn · Renew</footer>
    </main>
  );
}


function Stat({ label, value, icon }) {
  return (
    <div className="flex items-start gap-3 p-3 rounded-lg bg-white shadow-sm">
      <div className="p-2 rounded-md bg-green-50">{icon}</div>
      <div>
        <div className="text-sm text-slate-500">{label}</div>
        <div className="font-semibold">{value}</div>
      </div>
    </div>
  );
}

function Feature({ title, body, icon }) {
  return (
    <div className="p-4 rounded-xl border border-slate-100 bg-white shadow-sm">
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-md bg-green-50">{icon}</div>
        <div className="font-medium">{title}</div>
      </div>
      <p className="mt-3 text-sm text-slate-600">{body}</p>
    </div>
  );
}

function Card({ title, subtitle, children }) {
  return (
    <div className="p-5 rounded-xl border border-slate-100 bg-white shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <div className="font-semibold">{title}</div>
          <div className="text-sm text-slate-500">{subtitle}</div>
        </div>
        <div className="text-xs text-slate-400">•</div>
      </div>

      <div className="mt-3 text-sm text-slate-600">{children}</div>
    </div>
  );
}
