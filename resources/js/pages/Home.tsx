import { Head, Link } from '@inertiajs/react';
import { Calendar, TrendingUp, Trophy, Users } from 'lucide-react';
import React from 'react';

const Home: React.FC = () => {
    const leagues = [
        { code: 'PL', name: 'Premier League', country: 'England', icon: '🏴󠁧󠁢󠁥󠁮󠁧󠁿' },
        { code: 'PD', name: 'La Liga', country: 'Spain', icon: '🇪🇸' },
        { code: 'BL1', name: 'Bundesliga', country: 'Germany', icon: '🇩🇪' },
        { code: 'SA', name: 'Serie A', country: 'Italy', icon: '🇮🇹' },
        { code: 'FL1', name: 'Ligue 1', country: 'France', icon: '🇫🇷' },
        { code: 'CL', name: 'Champions League', country: 'Europe', icon: '🏆' },
    ];

    const features = [
        {
            icon: TrendingUp,
            title: 'Live Scores',
            description: 'Real-time updates from major football leagues worldwide',
        },
        {
            icon: Users,
            title: 'All Leagues',
            description: 'Coverage of Premier League, La Liga, Serie A, and more',
        },
        {
            icon: Calendar,
            title: 'Match Schedule',
            description: 'Browse matches by date across all competitions',
        },
    ];

    return (
        <>
            <Head title="Home - VipFootball" />

            <div className="min-h-screen">
                {/* Hero Section */}
                <section className="relative overflow-hidden px-4 py-20 lg:py-32">
                    <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 via-transparent to-emerald-600/10" />

                    <div className="relative mx-auto max-w-6xl text-center">
                        <div className="mb-6 flex items-center justify-center">
                            <div className="rounded-full bg-emerald-500/20 p-4">
                                <Trophy className="h-16 w-16 text-emerald-500" />
                            </div>
                        </div>

                        <h1 className="mb-6 text-5xl font-bold text-white lg:text-7xl">
                            Your Football
                            <span className="block bg-gradient-to-r from-emerald-400 to-emerald-600 bg-clip-text text-transparent">
                                Match Tracker
                            </span>
                        </h1>

                        <p className="mx-auto mb-10 max-w-2xl text-lg text-gray-400 lg:text-xl">
                            Track live scores, schedules, and results from the world's top football leagues. Never miss a match with VipFootball.
                        </p>

                        <div className="flex flex-wrap items-center justify-center gap-4">
                            <Link
                                href="/league"
                                className="transform rounded-lg bg-emerald-500 px-8 py-4 text-lg font-semibold text-white shadow-lg shadow-emerald-500/30 transition-all hover:scale-105 hover:bg-emerald-600"
                            >
                                View Leagues
                            </Link>
                            <Link
                                href={`/league?date=${new Date().toISOString().split('T')[0]}`}
                                className="rounded-lg border border-gray-600 bg-gray-800/50 px-8 py-4 text-lg font-semibold text-white transition-all hover:border-gray-500 hover:bg-gray-700/50"
                            >
                                Today's Matches
                            </Link>
                        </div>
                    </div>
                </section>

                {/* Features Section */}
                <section className="px-4 py-16">
                    <div className="mx-auto max-w-6xl">
                        <div className="grid gap-8 md:grid-cols-3">
                            {features.map((feature, index) => (
                                <div
                                    key={index}
                                    className="rounded-xl border border-gray-700 bg-gray-800/50 p-8 backdrop-blur-sm transition-all hover:border-emerald-500/50 hover:shadow-lg hover:shadow-emerald-500/10"
                                >
                                    <div className="mb-4 inline-block rounded-lg bg-emerald-500/20 p-3">
                                        <feature.icon className="h-8 w-8 text-emerald-500" />
                                    </div>
                                    <h3 className="mb-3 text-xl font-bold text-white">{feature.title}</h3>
                                    <p className="text-gray-400">{feature.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Leagues Section */}
                <section className="px-4 py-16">
                    <div className="mx-auto max-w-6xl">
                        <div className="mb-12 text-center">
                            <h2 className="mb-4 text-3xl font-bold text-white lg:text-4xl">Featured Leagues</h2>
                            <p className="text-lg text-gray-400">Select a league to view matches and standings</p>
                        </div>

                        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                            {leagues.map((league) => (
                                <Link
                                    key={league.code}
                                    href={`/league?competition=${league.code}`}
                                    className="group relative overflow-hidden rounded-xl border border-gray-700 bg-gray-800/50 p-8 backdrop-blur-sm transition-all hover:border-emerald-500 hover:shadow-xl hover:shadow-emerald-500/20"
                                >
                                    <div className="mb-4 flex items-center justify-between">
                                        <span className="text-5xl">{league.icon}</span>
                                        <div className="rounded-full bg-emerald-500/20 p-2 opacity-0 transition-opacity group-hover:opacity-100">
                                            <Trophy className="h-5 w-5 text-emerald-500" />
                                        </div>
                                    </div>
                                    <h3 className="mb-2 text-xl font-bold text-white">{league.name}</h3>
                                    <p className="text-sm text-gray-400">{league.country}</p>

                                    <div className="absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r from-emerald-400 to-emerald-600 transition-all group-hover:w-full" />
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="px-4 py-20">
                    <div className="mx-auto max-w-4xl text-center">
                        <div className="rounded-2xl border border-emerald-500/50 bg-gradient-to-br from-emerald-500/10 to-emerald-600/10 p-12 backdrop-blur-sm">
                            <Trophy className="mx-auto mb-6 h-16 w-16 text-emerald-500" />
                            <h2 className="mb-4 text-3xl font-bold text-white lg:text-4xl">Start Tracking Your Favorite Teams</h2>
                            <p className="mb-8 text-lg text-gray-400">
                                Get instant access to live scores, match schedules, and comprehensive coverage of top leagues
                            </p>
                            <Link
                                href="/league"
                                className="inline-block rounded-lg bg-emerald-500 px-8 py-4 text-lg font-semibold text-white shadow-lg shadow-emerald-500/30 transition-all hover:bg-emerald-600"
                            >
                                Explore Leagues Now
                            </Link>
                        </div>
                    </div>
                </section>

                {/* Footer */}
                <footer className="border-t border-gray-700 px-4 py-8">
                    <div className="mx-auto max-w-6xl text-center">
                        <div className="flex items-center justify-center gap-2 text-gray-400">
                            <Trophy className="h-5 w-5 text-emerald-500" />
                            <p className="text-sm">VipFootball &copy; {new Date().getFullYear()} | Powered by football-data.org</p>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
};

export default Home;
