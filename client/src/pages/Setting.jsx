import {
  BadgeCheck,
  CheckCircle2,
  Clock3,
  Moon,
  Sparkles,
  Sun,
  Palette,
  Rocket,
} from "lucide-react";

const Setting = () => {
  return (
    <div className="max-w-5xl mx-auto p-6 space-y-8">

      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold dark:text-white">
          Settings
        </h1>

        <p className="text-gray-500 mt-2">
          Personalize your experience and explore the latest features of
          SakshaMedia.
        </p>
      </div>

      {/* What's New */}

      <section className="rounded-3xl bg-white dark:bg-slate-900 dark:border dark:border-slate-700 shadow p-6">

        <div className="flex items-center gap-2 mb-5">
          <Sparkles className="text-indigo-600" />
          <h2 className="text-2xl font-semibold dark:text-white">
            What's New
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-5">

          <div className="rounded-xl dark:border dark:border-slate-700 p-5">
            <BadgeCheck className="text-blue-600 mb-3" />
            <h3 className="font-semibold dark:text-white">
              Verification Badge
            </h3>

            <p className="text-gray-500 mt-2 text-sm">
              Eligible creators can now apply for the official verification
              badge.
            </p>
          </div>

          <div className="rounded-xl dark:border dark:border-slate-700 p-5">
            <Moon className="text-slate-700 dark:text-white mb-3" />
            <h3 className="font-semibold dark:text-white">
              Dark & Light Mode
            </h3>

            <p className="text-gray-500 mt-2 text-sm">
              Switch between beautiful light and dark themes anytime.
            </p>
          </div>

        </div>
      </section>

      {/* Verification */}

      <section className="rounded-3xl bg-white dark:bg-slate-900 dakr:border dark:border-slate-700 shadow p-6">

        <div className="flex justify-between items-center">

          <div>
            <h2 className="text-2xl font-semibold dark:text-white flex items-center gap-2">
              <BadgeCheck className="text-blue-600" />
              Verification Badge
            </h2>

            <p className="text-gray-500 mt-1">
              Complete all requirements before submitting your application.
            </p>
          </div>

          <span className="rounded-full bg-yellow-100 text-yellow-700 px-3 py-1 text-sm flex items-center gap-1">
            <Clock3 size={16} />
            In Progress
          </span>

        </div>

        {/* Progress */}

        <div className="mt-6">

          <div className="flex justify-between text-sm mb-2">
            <span className="text-gray-600">
              Verification Progress
            </span>

            <span className="font-semibold">
              3 / 5 Completed
            </span>
          </div>

          <div className="h-3 rounded-full bg-gray-200 overflow-hidden">

            <div className="w-[60%] h-full bg-indigo-600 rounded-full"></div>

          </div>

        </div>

        {/* Criteria */}

        <div className="mt-8 grid md:grid-cols-2 gap-4">

          <div className="flex items-center gap-3">
            <CheckCircle2 className="text-green-600" />
            <span>Verified Email</span>
          </div>

          <div className="flex items-center gap-3">
            <CheckCircle2 className="text-green-600" />
            <span>Profile Picture Added</span>
          </div>

          <div className="flex items-center gap-3">
            <CheckCircle2 className="text-green-600" />
            <span>Complete Profile</span>
          </div>

          <div className="flex items-center gap-3 text-gray-500">
            <Clock3 className="text-yellow-500" />
            <span>Minimum 500 Followers</span>
          </div>

          <div className="flex items-center gap-3 text-gray-500">
            <Clock3 className="text-yellow-500" />
            <span>Active for 30 Days</span>
          </div>

        </div>

        <button className="mt-8 bg-indigo-600 hover:bg-indigo-700 transition px-6 py-3 rounded-xl text-white font-medium">
          Apply for Verification
        </button>

      </section>

      {/* Theme */}

      <section className="rounded-3xl bg-white dark:bg-slate-900 dark:border dark:border-slate-700 shadow p-6">

        <h2 className="text-2xl font-semibold dark:text-white flex items-center gap-2">

          <Palette className="text-indigo-600" />

          Appearance

        </h2>

        <p className="text-gray-500 mt-2">
          Choose the appearance that feels best for you.
        </p>

        <div className="grid md:grid-cols-2 gap-5 mt-6">

          <button className="rounded-2xl border-2 border-indigo-600 p-6 hover:shadow transition">

            <Sun className="mx-auto text-yellow-500" size={35} />

            <h3 className="mt-3 font-semibold">
              Light Mode
            </h3>

            <p className="text-sm text-gray-500 mt-2">
              Bright and clean appearance.
            </p>

          </button>

          <button className="rounded-2xl border p-6 hover:shadow transition">

            <Moon className="mx-auto text-slate-700" size={35} />

            <h3 className="mt-3 font-semibold dark:text-white">
              Dark Mode
            </h3>

            <p className="text-sm text-gray-500 mt-2">
              Comfortable viewing in low-light environments.
            </p>

          </button>

        </div>

      </section>

      {/* Coming Soon */}

      <section className="rounded-3xl bg-gradient-to-r from-indigo-600 to-violet-600 text-white p-8">

        <div className="flex items-center gap-3">

          <Rocket size={30} />

          <h2 className="text-2xl font-bold">
            More Features Are Coming!
          </h2>

        </div>

        <p className="mt-4 text-indigo-100 leading-7">

          We're continuously building new features to make your
          SakshaMedia experience even better.

          <br />

          Upcoming improvements include:

        </p>

        <ul className="mt-5 space-y-2 text-indigo-100 list-disc list-inside">

          <li>Story Highlights</li>

          <li>Profile Themes</li>

          <li>AI Content Assistant</li>

          <li>Custom Profile Badges</li>

          <li>Advanced Privacy Controls</li>

          <li>Message Reactions</li>

          <li>Scheduled Posts</li>

          <li>More Personalization Options</li>

        </ul>

        <div className="mt-6 rounded-xl bg-white/10 p-4">

          <h3 className="font-semibold">
            🚀 Stay Tuned!
          </h3>

          <p className="text-indigo-100 mt-2">

            We're shipping exciting updates regularly.
            Keep your app updated so you never miss the latest features.

          </p>

        </div>

      </section>

    </div>
  );
};

export default Setting;