import Link from "next/link";
import {
  ArrowRight,
  CheckCircle,
  FolderKanban,
  ShieldCheck,
} from "lucide-react";

export default function Home() {
  return (
    <div className="bg-white">
      {/* HERO SECTION */}
      <div className="relative isolate px-6 pt-14 lg:px-8">
        <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              Manage your projects with{" "}
              <span className="text-blue-600">modern simplicity.</span>
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              A scalable, production-grade project management system built for
              speed, security, and team collaboration.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link
                href="/register"
                className="rounded-lg bg-blue-600 px-8 py-4 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 transition-all flex items-center"
              >
                Get started <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
              <Link
                href="/login"
                className="text-sm font-semibold leading-6 text-gray-900"
              >
                Log in <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* FEATURES SECTION */}
      <div className="bg-gray-50 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-base font-semibold leading-7 text-blue-600">
              Built for Scale
            </h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Everything you need to ship projects faster.
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-3">
              <div className="relative pl-16">
                <dt className="text-base font-semibold leading-7 text-gray-900">
                  <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600">
                    <FolderKanban className="h-6 w-6 text-white" />
                  </div>
                  Project Organization
                </dt>
                <dd className="mt-2 text-base leading-7 text-gray-600">
                  Keep your work organized in logical projects and workspaces.
                </dd>
              </div>
              <div className="relative pl-16">
                <dt className="text-base font-semibold leading-7 text-gray-900">
                  <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600">
                    <CheckCircle className="h-6 w-6 text-white" />
                  </div>
                  Task Management
                </dt>
                <dd className="mt-2 text-base leading-7 text-gray-600">
                  Track tasks from start to finish with real-time status
                  updates.
                </dd>
              </div>
              <div className="relative pl-16">
                <dt className="text-base font-semibold leading-7 text-gray-900">
                  <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600">
                    <ShieldCheck className="h-6 w-6 text-white" />
                  </div>
                  Enterprise Security
                </dt>
                <dd className="mt-2 text-base leading-7 text-gray-600">
                  Your data is secured with industry-standard JWT and password
                  hashing.
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
}
