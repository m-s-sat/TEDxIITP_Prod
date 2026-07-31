function Video(){
    return(
        <div className="flex flex-col items-center justify-center w-full px-0">
            <h1 className="relative z-10 mx-auto text-[45px] sm:text-[70px] md:text-[75px] lg:text-[100px] xl:text-[110px] font-bebas font-normal tracking-wide text-center text-[#EB0028] uppercase drop-shadow-[0_4px_12px_rgba(0,0,0,0.5)]">introduction video</h1>
            <div className="w-full sm:w-[96%] md:w-[94%] lg:w-[88%] xl:w-[82%] aspect-square sm:aspect-video min-h-[340px] sm:min-h-0 my-6 sm:my-10">
                <iframe
                    className="w-full h-full shadow-[0_0_40px_rgba(235,0,40,0.25)] border border-red-900/30"
                    src="https://www.youtube.com/embed/eVFzbxmKNUw"
                    title="Introduction Video"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                ></iframe>
            </div>
        </div>
    )
}

export default Video
// 1920  1080

