export default function AboutTed() {
    return (
        <div className="flex flex-col sm:flex-row justify-center items-start gap-6 sm:gap-8 md:gap-12 lg:gap-16">
            <div className="w-full sm:w-[52%]">
                <span className="block text-[#FF0000] font-cormorant text-4xl sm:text-5xl md:text-7xl lg:text-[81px] font-bold tracking-[0.02em] leading-none mb-3 md:mb-5">TED</span>
                <p className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl font-normal leading-relaxed tracking-[0.01em] font-space text-white/80">
                    TED is a nonprofit, nonpartisan organization dedicated to discovering, debating and spreading ideas that spark conversation, deepen understanding and drive meaningful change. Our organization is devoted to curiosity, reason, wonder and the pursuit of knowledge — without an agenda. We welcome people from every discipline and culture who seek a deeper understanding of the world and connection with others, and we invite everyone to engage with ideas and activate them in your community.
                    <br/><br/>
                    TED began in 1984 as a conference where Technology, Entertainment and Design converged, but today it spans a multitude of worldwide communities and initiatives exploring everything from science and business to education, arts and global issues. In addition to the TED Talks curated from our annual conferences and published on TED.com, we produce original podcasts, short video series, animated educational lessons (TED-Ed) and TV programs that are translated into more than 100 languages and distributed via partnerships around the world. Each year, thousands of independently run TEDx events. Through the Audacious Project, TED has helped catalyze $6.6 billion in funding for projects that support bold solutions to the world's most urgent challenges — working to make the world more beautiful, sustainable and just. In 2020, TED launched Countdown, an initiative to accelerate solutions to the climate crisis and mobilize a movement for a net-zero future, and in 2023 TED launched TED Democracy to spark a new kind of conversation focused on realistic pathways towards a more vibrant and equitable future. View a full list of TED’s many programs and initiatives.               </p>
            </div>
            <div className="w-full sm:w-[48%]">
                <div className="flex flex-row items-baseline gap-2 mb-3 md:mb-5">
                    <span className="text-[#FF0000] font-cormorant text-4xl sm:text-5xl md:text-7xl lg:text-[81px] font-bold tracking-[0.02em] leading-none">TEDx</span>
                    <span className="text-white/60 font-space text-xs sm:text-sm md:text-base lg:text-lg font-normal tracking-[0.01em]">(x = independently organized event)</span>
                </div>
                <p className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl font-space font-normal leading-relaxed tracking-[0.01em] text-white/80">
                    In the spirit of discovering and spreading ideas, TEDx is a program of local, self-organized events that bring people together to share a TED-like experience. At a TEDx event, TED Talks video and live speakers combine to spark deep discussion and connection. These local, self-organized events are branded TEDx, where x = independently organized TED event. The TED Conference provides general guidance for the TEDx program, but individual TEDx events are self-organized. (Subject to certain rules and regulations.)</p>
            </div>
        </div>
    )
}