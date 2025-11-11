import { Head } from '@inertiajs/react';
import { Mail, MessageSquare, Send, Github, Linkedin, Twitter } from 'lucide-react';

export default function Contact() {
    return (
        <>
            <Head title="Contact" />

            <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto">
                    {/* Header */}
                    <div className="text-center mb-12">
                        <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4 bg-gradient-to-r from-emerald-400 to-emerald-500 bg-clip-text text-transparent">
                            Get In Touch
                        </h1>
                        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                            Have a question or want to work together? Feel free to reach out!
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                        {/* Contact Form */}
                        <div className="bg-gray-800/50 backdrop-blur-lg rounded-2xl p-8 border border-gray-700 shadow-2xl">
                            <div className="flex items-center gap-3 mb-6">
                                <MessageSquare className="w-6 h-6 text-emerald-400" />
                                <h2 className="text-2xl font-bold text-white">Send a Message</h2>
                            </div>

                            <form className="space-y-5">
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                                        Name
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        className="w-full px-4 py-3 bg-gray-900/50 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                                        placeholder="Your name"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        className="w-full px-4 py-3 bg-gray-900/50 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                                        placeholder="your@email.com"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                                        Message
                                    </label>
                                    <textarea
                                        id="message"
                                        rows={5}
                                        className="w-full px-4 py-3 bg-gray-900/50 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all resize-none"
                                        placeholder="Your message..."
                                    />
                                </div>

                                <button
                                    type="submit"
                                    className="w-full px-6 py-3 bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white font-semibold rounded-lg shadow-lg shadow-emerald-600/30 hover:shadow-emerald-600/50 transition-all flex items-center justify-center gap-2 hover:scale-105 transform"
                                >
                                    <Send className="w-5 h-5" />
                                    Send Message
                                </button>
                            </form>
                        </div>

                        {/* Contact Info & Social */}
                        <div className="space-y-8">
                            {/* Direct Contact */}
                            <div className="bg-gray-800/50 backdrop-blur-lg rounded-2xl p-8 border border-gray-700 shadow-2xl">
                                <div className="flex items-center gap-3 mb-6">
                                    <Mail className="w-6 h-6 text-emerald-400" />
                                    <h2 className="text-2xl font-bold text-white">Direct Contact</h2>
                                </div>

                                <div className="space-y-4">
                                    <a
                                        href="mailto:ivan7agui@gmail.com"
                                        className="flex items-center gap-3 text-gray-300 hover:text-white transition-colors group"
                                    >
                                        <div className="p-3 bg-gray-900/50 rounded-lg group-hover:bg-emerald-600/20 transition-colors">
                                            <Mail className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-400">Email</p>
                                            <p className="font-medium">ivan7agui@gmail.com</p>
                                        </div>
                                    </a>
                                </div>
                            </div>

                            {/* Social Links */}
                            <div className="bg-gray-800/50 backdrop-blur-lg rounded-2xl p-8 border border-gray-700 shadow-2xl">
                                <h2 className="text-2xl font-bold text-white mb-6">Connect With Me</h2>

                                <div className="grid grid-cols-2 gap-4">
                                    <a
                                        href="https://github.com/ivnaguinaga"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex flex-col items-center gap-3 p-4 bg-gray-900/50 rounded-xl hover:bg-gray-900 hover:scale-105 transition-all group"
                                    >
                                        <Github className="w-8 h-8 text-gray-400 group-hover:text-white transition-colors" />
                                        <span className="text-sm text-gray-400 group-hover:text-white transition-colors">GitHub</span>
                                    </a>

                                    <a
                                        href="https://linkedin.com/in/ivanaguinagavelazquez"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex flex-col items-center gap-3 p-4 bg-gray-900/50 rounded-xl hover:bg-gray-900 hover:scale-105 transition-all group"
                                    >
                                        <Linkedin className="w-8 h-8 text-gray-400 group-hover:text-blue-400 transition-colors" />
                                        <span className="text-sm text-gray-400 group-hover:text-blue-400 transition-colors">LinkedIn</span>
                                    </a>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
