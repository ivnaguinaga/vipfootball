//import { Button } from '@/components/ui/button';
import { router } from '@inertiajs/react';
import { ChevronLeft, ChevronRight, Trophy } from 'lucide-react';
import React, { useState } from 'react';

interface Team {
    name: string;
    crest?: string;
}

interface Score {
    fullTime: {
        home: number | null;
        away: number | null;
    };
}

interface Match {
    id: number;
    homeTeam: Team;
    awayTeam: Team;
    score: Score;
    status: string;
    utcDate: string;
}

interface Competition {
    name: string;
    emblem?: string;
}

interface Props {
    matches: {
        matches: Match[];
        competition?: Competition;
    };
    selectedLeague: string;
    selectedDate: string;
}

const LEAGUES = [
    { code: 'PL', name: 'Premier League' },
    { code: 'PD', name: 'La Liga' },
    { code: 'BL1', name: 'Bundesliga' },
    { code: 'SA', name: 'Serie A' },
    { code: 'FL1', name: 'Ligue 1' },
    { code: 'CL', name: 'Champions League' },
];

const LeagueView: React.FC<Props> = ({ matches, selectedLeague, selectedDate }) => {
    const [date, setDate] = useState(selectedDate);

    const handleLeagueChange = (leagueCode: string) => {
        router.get(`/league?competition=${leagueCode}&date=${date}`);
    };

    const handleDateChange = (offset: number) => {
        const newDate = new Date(date);
        newDate.setDate(newDate.getDate() + offset);
        const dateString = newDate.toISOString().split('T')[0];
        setDate(dateString);
        router.get(`/league?competition=${selectedLeague}&date=${dateString}`);
    };

    const selectDate = (dateStr: string) => {
        setDate(dateStr);
        router.get(`/league?competition=${selectedLeague}&date=${dateStr}`);
    };

    const generateDateRange = () => {
        const dates = [];
        const currentDate = new Date(date);
        for (let i = -3; i <= 3; i++) {
            const d = new Date(currentDate);
            d.setDate(currentDate.getDate() + i);
            dates.push(d);
        }
        return dates;
    };

    const formatTime = (utcDate: string) => {
        return new Date(utcDate).toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    /*const formatDate = (dateStr: string) => {
        return new Date(dateStr).toLocaleDateString('en-US', {
            weekday: 'long',
            month: 'long',
            day: 'numeric',
        });
    };
    */

    const formatCarouselDate = (date: Date) => {
        const day = date.toLocaleDateString('en-US', { day: 'numeric' });
        const weekday = date.toLocaleDateString('en-US', { weekday: 'short' });
        const month = date.toLocaleDateString('en-US', { month: 'short' });
        return { day, weekday, month };
    };

    const isToday = (dateToCheck: Date) => {
        const today = new Date();
        return dateToCheck.toDateString() === today.toDateString();
    };

    const isSelected = (dateToCheck: Date) => {
        const selected = new Date(date);
        return dateToCheck.toDateString() === selected.toDateString();
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'FINISHED':
                return 'bg-green-500/20 text-green-400 border-green-500/30';
            case 'IN_PLAY':
                return 'bg-red-500/20 text-red-400 border-red-500/30 animate-pulse';
            case 'PAUSED':
                return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
            default:
                return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
        }
    };

    const getStatusText = (status: string) => {
        switch (status) {
            case 'TIMED':
                return 'Scheduled';
            case 'IN_PLAY':
                return 'LIVE';
            case 'PAUSED':
                return 'Half Time';
            case 'FINISHED':
                return 'Full Time';
            default:
                return status;
        }
    };

    return (
        <div className="min-h-screen">
            <div className="mx-auto max-w-6xl px-4 py-8">
                {/* Header */}
                <div className="mb-8 text-center">
                    <div className="mb-4 flex items-center justify-center gap-3">
                        <Trophy className="h-10 w-10 text-emerald-500" />
                        <h1 className="text-4xl font-bold text-white">Football Matches</h1>
                    </div>
                    {matches.competition && <p className="text-lg text-gray-400">{matches.competition.name}</p>}
                </div>

                {/* League Selector */}
                <div className="mb-8">
                    <div className="flex flex-wrap justify-center gap-3">
                        {LEAGUES.map((league) => (
                            <button
                                key={league.code}
                                onClick={() => handleLeagueChange(league.code)}
                                className={`transform rounded-lg px-6 py-3 font-semibold text-white transition-all hover:scale-105 ${
                                    selectedLeague === league.code
                                        ? `bg-emerald-500 ring-4 ring-white/30 hover:bg-emerald-600`
                                        : 'bg-gray-700 hover:bg-gray-600'
                                }`}
                            >
                                {league.name}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Date Carousel */}
                <div className="mb-8">
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => handleDateChange(-1)}
                            className="flex h-12 w-12 items-center justify-center rounded-full border border-gray-700 bg-gray-800/50 text-white transition-all hover:scale-110 hover:bg-gray-700"
                        >
                            <ChevronLeft className="h-6 w-6" />
                        </button>

                        <div className="flex-1 overflow-hidden">
                            <div className="flex justify-center gap-3">
                                {generateDateRange().map((d) => {
                                    const { day, weekday, month } = formatCarouselDate(d);
                                    const dateString = d.toISOString().split('T')[0];
                                    const selected = isSelected(d);
                                    const today = isToday(d);

                                    return (
                                        <button
                                            key={dateString}
                                            onClick={() => selectDate(dateString)}
                                            className={`flex min-w-[80px] flex-col items-center justify-center rounded-xl p-3 transition-all ${
                                                selected
                                                    ? 'scale-110 bg-emerald-600 text-white ring-4 ring-emerald-600/30'
                                                    : today
                                                      ? 'border-2 border-emerald-500/50 bg-gray-700 text-white'
                                                      : 'border border-gray-700 bg-gray-800/50 text-gray-400 hover:bg-gray-700 hover:text-white'
                                            }`}
                                        >
                                            <span className="mb-1 text-xs font-medium">{weekday}</span>
                                            <span className="text-2xl font-bold">{day}</span>
                                            <span className="mt-1 text-xs">{month}</span>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        <button
                            onClick={() => handleDateChange(1)}
                            className="flex h-12 w-12 items-center justify-center rounded-full border border-gray-700 bg-gray-800/50 text-white transition-all hover:scale-110 hover:bg-gray-700"
                        >
                            <ChevronRight className="h-6 w-6" />
                        </button>
                    </div>
                </div>

                {/* Matches */}
                <div className="space-y-4">
                    {!matches || !matches.matches || matches.matches.length === 0 ? (
                        <div className="rounded-xl border border-gray-700 bg-gray-800/50 p-12 text-center backdrop-blur-sm">
                            <p className="text-lg text-gray-400">No matches scheduled for this day</p>
                        </div>
                    ) : (
                        matches.matches.map((match) => (
                            <div
                                key={match.id}
                                className="rounded-xl border border-gray-700 bg-gray-800/50 p-6 backdrop-blur-sm transition-all hover:border-gray-600 hover:shadow-xl hover:shadow-gray-900/50"
                            >
                                <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-6">
                                    {/* Home Team */}
                                    <div className="flex items-center justify-end gap-3">
                                        <div className="text-right">
                                            <h3 className="mb-1 text-xl font-bold text-white">{match.homeTeam.name}</h3>
                                            {match.status === 'TIMED' && <p className="text-sm text-gray-500">Home</p>}
                                        </div>
                                        {match.homeTeam.crest && (
                                            <img
                                                src={match.homeTeam.crest}
                                                alt={`${match.homeTeam.name} crest`}
                                                className="h-12 w-12 object-contain"
                                            />
                                        )}
                                    </div>

                                    {/* Score/Time */}
                                    <div className="flex min-w-[140px] flex-col items-center gap-3">
                                        {match.status === 'TIMED' ? (
                                            <>
                                                <span className="font-mono text-lg text-gray-400">{formatTime(match.utcDate)}</span>
                                                <span
                                                    className={`rounded-full border px-4 py-1.5 text-xs font-semibold ${getStatusColor(match.status)}`}
                                                >
                                                    {getStatusText(match.status)}
                                                </span>
                                            </>
                                        ) : (
                                            <>
                                                <div className="flex items-center gap-4">
                                                    <span className="text-4xl font-bold text-white">{match.score.fullTime.home ?? '-'}</span>
                                                    <span className="text-2xl font-bold text-gray-500">-</span>
                                                    <span className="text-4xl font-bold text-white">{match.score.fullTime.away ?? '-'}</span>
                                                </div>
                                                <span
                                                    className={`rounded-full border px-4 py-1.5 text-xs font-semibold ${getStatusColor(match.status)}`}
                                                >
                                                    {getStatusText(match.status)}
                                                </span>
                                            </>
                                        )}
                                    </div>

                                    {/* Away Team */}
                                    <div className="flex items-center gap-3">
                                        {match.awayTeam.crest && (
                                            <img
                                                src={match.awayTeam.crest}
                                                alt={`${match.awayTeam.name} crest`}
                                                className="h-12 w-12 object-contain"
                                            />
                                        )}
                                        <div className="text-left">
                                            <h3 className="mb-1 text-xl font-bold text-white">{match.awayTeam.name}</h3>
                                            {match.status === 'TIMED' && <p className="text-sm text-gray-500">Away</p>}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {/* Footer */}
                <footer className="mt-12 border-t border-gray-700 pt-8 text-center">
                    <div className="flex items-center justify-center gap-2 text-gray-400">
                        <Trophy className="h-5 w-5 text-emerald-500" />
                        <p className="text-sm">VipFootball &copy; {new Date().getFullYear()} | Powered by football-data.org</p>
                    </div>
                </footer>
            </div>
        </div>
    );
};

export default LeagueView;
