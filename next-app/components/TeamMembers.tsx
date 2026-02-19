import { urlForImage } from "@/lib/sanity";
import { TeamMemberModule } from "@/types/componentsTypes";
import { stegaClean } from "next-sanity";
import Image from "next/image";
import * as motion from "motion/react-client";
import {
  fadeInTitle,
  teamMembersCardVariants,
  teamMembersContainerVariants,
} from "@/lib/animation";

const TeamMembers = ({
  headingHighlight,
  heading,
  teamMembers,
}: TeamMemberModule) => {
  return (
    <section className="section-spacing">
      <div className="container">
        {heading && (
          <motion.div
            className="mb-8 md:mb-10"
            variants={teamMembersContainerVariants}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}>
            <motion.h2 variants={fadeInTitle}>
              {headingHighlight && (
                <span className="text-tertiary">{headingHighlight}</span>
              )}{" "}
              {heading}
            </motion.h2>
          </motion.div>
        )}
        {teamMembers.length > 0 && (
          <motion.div
            variants={teamMembersContainerVariants}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 border-t border-background-gray">
            {teamMembers.map((member) => (
              <motion.div
                variants={teamMembersCardVariants}
                key={member._key}
                className="border-b border-l border-background-gray border-r sm:border-r-0 sm:even:border-r lg:even:border-r-0 lg:nth-[3n]:border-r lg:last:border-r!">
                <div className="relative flex flex-wrap items-center gap-4 md:gap-0 p-6 ">
                  <div className="w-full md:w-2/3 order-2 md:order-0">
                    {member.designation && (
                      <p className="text-tertiary uppercase mb-2">
                        {member.designation}
                      </p>
                    )}
                    {member.name && <h4>{member.name}</h4>}
                  </div>
                  <div className="w-full md:w-1/3 flex justify-end order-1 md:order-0 overflow-hidden">
                    <Image
                      src={urlForImage(member.image)!.url()}
                      alt={stegaClean(member.name)}
                      width={90}
                      height={90}
                      className="w-full md:w-auto hover:scale-110 transition-transform duration-300 ease-in-out"
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default TeamMembers;
