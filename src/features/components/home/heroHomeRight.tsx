import Link from "next/link";
import Image from "next/image";
import { Locations } from "./pindata";


export default function HeroHomeRight() {
  return (
    <div
  className="
    hidden
    lg:flex
    justify-end
    w-[calc(50%-14px)]
    pt-[0]
    pr-[2.5vw]
    shrink-0
  "
>
      <div
        className="
        relative
        w-[85%]
        sm:w-[90%]
        md:w-full
        max-w-218.25
        lg:w-[45.99vw]
        aspect-883/858
        mx-auto
      "
      >
        <Image
          src="/map.svg"
          alt="Map"
          fill
          className="object-contain"
          priority
        />

        {Locations.map((location) => (
          <Link
            key={location.name}
            href={location.href}
            className="group absolute cursor-pointer"
            style={{
              left: `${location.leftInPercentage}%`,
              top: `${location.topInPercentage}%`,
              transform: "translate(-50%, -50%)",
            }}
          >
            <div
              className="
                relative
                w-8 h-8
                sm:w-22 sm:h-22
                md:w-28 md:h-28
                lg:w-32 lg:h-32
                transition-all duration-300
                group-hover:scale-135
                drop-shadow-[0_0_12px_rgba(235,0,40,0.8)]
              "
            >
              <Image
                src="/locateicon2.svg"
                alt={location.name}
                fill
                className="object-contain"
              />
            </div>
            <div
              className="
                absolute
                left-6 sm:left-8 md:left-18 lg:left-24
                top-1/2 -translate-y-1/2
                whitespace-nowrap
                text-[14px] md:text-sm lg:text-md
                text-white
                pointer-events-none
                font-bebus
              "
            >
              {location.name}
            </div>
          </Link>
        ))}
      </div>
    </div>
    
  );
}