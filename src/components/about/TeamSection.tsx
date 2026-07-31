"use client";
import React from "react";
import { team, organizers } from "@/data/teamData";
import TeamCard from "./TeamCard";

export default function TeamSection() {
    return (
        <section className="w-full flex flex-col gap-8 sm:gap-10">
            {/* Main Headline */}
            <div className="flex justify-center">
                <h2 className="text-[50px] sm:text-[120px] md:text-[140px] lg:text-[200px] xl:text-[250px] font-bebas font-normal tracking-normal text-center text-[#F3E9DC]">
                    MEET OUR{" "}
                    <span className="text-[#EB0028]">
                        TEAM
                    </span>
                </h2>
            </div>

            {/* Organizers Section */}
            <div className="flex flex-row justify-evenly sm:px-4 gap-4 sm:gap-8">
                {organizers.map((member) => (
                    <div key={member.id} className="flex-1 max-w-[480px]">
                        <TeamCard
                            name={member.name}
                            img={member.img}
                            role={member.role || "Organizer"}
                            subRole={member.subRole}
                            linkedin={member.linkedin}
                            featured={true}
                        />
                    </div>
                ))}
            </div>

            {/* Departments & Member Grids */}
            <div className="flex flex-col gap-2 sm:gap-4 lg:gap-5">
                {team.map((sec) => (
                    <div key={sec.id} className="gap-8 sm:gap-10 md:gap-12 lg:gap-15">
                        <div className="flex flex-col items-center text-center my-8 sm:my-10 md:my-12 lg:my-15">
                            <h2 className="text-white text-[20px] sm:text-[20px] md:text-[30px] lg:text-[40px] font-inter font-semibold tracking-[0.02em] items-center flex flex-col w-fit gap-3">
                                {sec.title}
                                <hr className="rounded-full border-[#AA0000] border-t-[6px] sm:border-t-[8px] w-[95%]" />
                            </h2>
                        </div>

                        {/* Open, centered flex wrap layout for team members */}
                        <div className="w-full flex flex-wrap justify-center gap-6 sm:gap-10 md:gap-14 lg:gap-16 py-2 sm:py-4 mb-12">
                            {sec.members.map((member) => (
                                <div
                                    key={member.id}
                                    className="w-[140px] sm:w-[200px] md:w-[240px] lg:w-[270px] xl:w-[290px]"
                                >
                                    <TeamCard
                                        name={member.name}
                                        img={member.img}
                                        linkedin={member.linkedin}
                                    />
                                </div>
                            ))}
                        </div>

                        <hr className="w-full border-t-[2px] border-solid mt-2 [border-image-slice:1] [border-image-source:linear-gradient(90deg,rgba(248,248,248,0.1)_0%,#F8F8F8_50%,rgba(248,248,248,0.1)_100%)]" />
                    </div>
                ))}
            </div>

            {/* Volunteer Thank You Note */}
            <div className="mt-6">
                <p className="text-white font-space text-[12px] sm:text-[18px] md:text-[22px] lg:text-[28px] font-normal tracking-normal text-center flex items-center justify-center">
                    We are grateful to have the support of many dedicated volunteers who brought the TEDxIIT Patna experience to life. Your energy and commitment made it all possible!
                </p>
            </div>
        </section>
    );
}
