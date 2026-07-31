"use client";

import LogoGrid from "@/src/components/block/LogoGrid";
import LogoLoop from "../../../components/block/LogoLoop";
import Image from "next/image";

const expeditionPatrons = [
  { image: "/SponsorsLogo.svg", alt: "Sponsor 1" },
  { image: "/SponsorsLogo.svg", alt: "Sponsor 2" },
  { image: "/SponsorsLogo.svg", alt: "Sponsor 3" },
  { image: "/SponsorsLogo.svg", alt: "Sponsor 4" },
];

const legacyPatrons1=[
  { image: "/sponsImages/Group 48095564.svg", alt: "Sponsor 1" },
  { image: "/sponsImages/Group 48095563.svg", alt: "Sponsor 2" },
  { image: "/sponsImages/Group 48095562.svg", alt: "Sponsor 3" },
  { image: "/sponsImages/Group 48095561.svg", alt: "Sponsor 4" },
  { image: "/sponsImages/Group 48095560.svg", alt: "Sponsor 5" },
]
const legacyPatrons2=[
  { image: "/sponsImages/Group 48095559.svg", alt: "Sponsor 1" },
  { image: "/sponsImages/Group 48095558.svg", alt: "Sponsor 2" },
  { image: "/sponsImages/Group 48095557.svg", alt: "Sponsor 3" },
  { image: "/sponsImages/Group 48095548.svg", alt: "Sponsor 4" },
]

export default function SponsorsSection() {
  return (
    <div>
       {/* <div className="flex text-center justify-center items-center">
            <h1 className="uppercase font-bebas text-5xl text-center">expedition Patrons</h1>
            <Image src="/expeditionLogo.svg" alt="expedition patrons" width={126} height={126}/>
        </div>
        <LogoGrid
        logos={expeditionPatrons}
        logoHeight={{ mobile: 120, tablet: 180, desktop: 230 }}
        gap={ { mobile: 20, tablet: 32, desktop: 40 }}
        scaleOnHover
        ariaLabel="Our sponsors"
        /> */}
      
       <div className="flex text-center justify-center items-center mt-4 md:mt-6 lg:mt-8">
            <h1 className="uppercase font-bebas text-5xl text-center">legacy patrons</h1>
            <Image src="/legacyLogo.svg" alt="expedition patrons" width={126} height={126}/>
        </div>
        <br />
        <LogoLoop
        logos={legacyPatrons1}
        speed={70}
        direction="left"
        stripHeight={{ mobile: 120, tablet: 180, desktop: 200 }}
        logoHeight={{ mobile: 120, tablet: 180, desktop: 200 }}
        gap={{ mobile: 32, tablet: 40, desktop: 36 }}
        fadeOut
        fadeOutColor="#000000"
        scaleOnHover
        ariaLabel="Our sponsors"
        />
        <LogoLoop
        logos={legacyPatrons2}
        speed={70}
        direction="left"
        stripHeight={{ mobile: 120, tablet: 180, desktop: 230 }}
        logoHeight={{ mobile: 120, tablet: 180, desktop: 230 }}
        gap={{ mobile: 32, tablet: 40, desktop: 36 }}
        fadeOut
        fadeOutColor="#000000"
        scaleOnHover
        ariaLabel="Our sponsors"
        />
    </div>
  );
}