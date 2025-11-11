import { Button } from '@/components/ui/button';
import { Link } from '@inertiajs/react';
import { Moon, Sun, Trophy } from 'lucide-react';
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

    //The shape will be an object
    homeTeam: Team;
    awayTeam: Team;

    score: Score;

    status: string;
}

interface Props {
    matches: {
        matches: Match[];
    };
}

// This is the React component itself.
const MatchesIndex: React.FC<Props> = ({ matches }) => {
    //Dark mode
    const [isDark, setIsDark] = useState(() => (typeof window !== 'undefined' ? document.documentElement.classList.contains('dark') : false));

    const validateViewTransition = () => {
        if (!document.startViewTransition) {
            toggleTheme();
        } else {
            document.startViewTransition(toggleTheme);
        }
    };
    const toggleTheme = () => {
        if (document.documentElement.classList.contains('dark')) {
            document.documentElement.classList.remove('dark');
            setIsDark(false);
            localStorage.setItem('theme', 'light');
        } else {
            document.documentElement.classList.add('dark');
            setIsDark(true);
            localStorage.setItem('theme', 'dark');
        }
    };
    // A safety check in case the main object or the inner array doesn't exist
    if (!matches || !matches.matches) {
        return <div>Loading matches or no matches found...</div>;
    }
    //Dates definition
    const today = new Date();
    //Define yesterday depending on today's date
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);
    //Convert yesterday to string format
    const yesterdayString = yesterday.toISOString().split('T')[0];
    //Define tomorrow depending on today's date
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    //Convert tomorrow to string format
    const tomorrowString = tomorrow.toISOString().split('T')[0];

    return (
        <div style={{ width: '80%', margin: '2rem auto', fontFamily: 'sans-serif' }}>
            <Button
                variant="outline"
                onClick={validateViewTransition}
                style={{
                    position: 'fixed',
                    top: '1rem',
                    right: '1rem',
                    zIndex: 9999,
                }}
                aria-label="Toggle theme"
            >
                {isDark ? <Moon size={20} /> : <Sun size={20} />}
            </Button>

            <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', justifyContent: 'center' }}>
                <Button variant="outline">
                    <Link href={`/matches?date=${yesterdayString}`}>Yesterday</Link>
                </Button>

                <Button variant="outline">
                    <Link href={`/matches`}>Today</Link>
                </Button>

                <Button variant="outline">
                    <Link href={`/matches?date=${tomorrowString}`}>Tomorrow</Link>
                </Button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {/* We now map over matches.matches */}
                {matches.matches.map((match) => (
                    <div
                        key={match.id}
                        style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            padding: '1rem',
                            backgroundColor: '#2b2b2b',
                            borderRadius: '8px',
                        }}
                    >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flex: 1 }}>
                            {match.homeTeam.crest && (
                                <img
                                    src={match.homeTeam.crest}
                                    alt={`${match.homeTeam.name} crest`}
                                    style={{ width: '32px', height: '32px', objectFit: 'contain' }}
                                />
                            )}
                            <span style={{ fontWeight: 'bold' }}>{match.homeTeam.name}</span>
                        </div>
                        <span style={{ padding: '0 1rem' }}>
                            {match.score.fullTime.home} - {match.score.fullTime.away}
                        </span>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flex: 1, justifyContent: 'flex-end' }}>
                            <span style={{ fontWeight: 'bold' }}>{match.awayTeam.name}</span>
                            {match.awayTeam.crest && (
                                <img
                                    src={match.awayTeam.crest}
                                    alt={`${match.awayTeam.name} crest`}
                                    style={{ width: '32px', height: '32px', objectFit: 'contain' }}
                                />
                            )}
                        </div>
                    </div>
                ))}
            </div>

            <footer style={{ marginTop: '3rem', borderTop: '1px solid #4a4a4a', paddingTop: '2rem', textAlign: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', color: '#9ca3af' }}>
                    <Trophy size={20} style={{ color: '#10b981' }} />
                    <p style={{ fontSize: '0.875rem' }}>
                        VipFootball &copy; {new Date().getFullYear()} | Powered by football-data.org
                    </p>
                </div>
            </footer>
        </div>
    );
};

export default MatchesIndex;
