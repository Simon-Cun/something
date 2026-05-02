"use client";

import Image from "next/image";
import Title from "@/components/VerticalTitle";
import { FaGithub, FaLinkedin, FaFile, FaEnvelope } from "react-icons/fa";
import { motion, Variants } from "motion/react";

const SlideInFromLeft: Variants = {
  initial: { opacity: 0, x: -10 },
  animate: (custom: number) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 1, delay: custom, ease: "backInOut" },
  }),
};

const Pebble: Variants = {
  initial: { opacity: 0, x: -10, y: -10 },
  animate: (custom: number) => ({
    opacity: 1,
    x: 0,
    y: 0,
    transition: { duration: 1, delay: custom, ease: "backInOut" },
  }),
};

type HomeProps = {
  name: string;
  title: string;
  bio: string;
  githubUrl: string;
  linkedinUrl: string;
  email: string;
  resumeUrl: string;
  profileImage: string;
};

const Home = ({
  title,
  bio,
  githubUrl,
  linkedinUrl,
  email,
  resumeUrl,
  profileImage,
  name,
}: HomeProps) => {
  const links = [
    { href: githubUrl, icon: <FaGithub size={28} />, color: "#9528e0" },
    { href: linkedinUrl, icon: <FaLinkedin size={28} />, color: "#0A66C2" },
    {
      href: `mailto:${email}`,
      icon: <FaEnvelope size={28} />,
      color: "#D44638",
    },
    { href: resumeUrl, icon: <FaFile size={28} />, color: "#A9A9A9" },
  ];

  return (
    <section
      id="home"
      className="relative flex w-full flex-col items-center justify-center pb-20 md:h-screen md:flex-row md:pb-0"
    >
      <div className="absolute bottom-0 left-0 h-px w-full bg-linear-to-r from-transparent via-white to-transparent" />
      <div className="flex w-full max-w-5xl flex-col items-center justify-center gap-10 px-4 md:flex-row">
        <div className="rounded-2xl bg-linear-to-r from-white via-transparent to-black p-0.5">
          <Image
            src={profileImage}
            alt="Photo of Me"
            width={400}
            height={400}
            className="max-w-xs rounded-2xl object-contain md:max-w-sm"
            priority
            unoptimized
          />
        </div>

        <div className="flex flex-col items-center gap-4 text-center md:items-start md:text-left">
          <motion.div
            variants={SlideInFromLeft}
            viewport={{ once: true, amount: 0 }}
            initial="initial"
            whileInView="animate"
            custom={0}
            className="text-4xl font-semibold"
          >
            {title}
          </motion.div>

          <motion.div
            variants={SlideInFromLeft}
            viewport={{ once: true, amount: 0 }}
            initial="initial"
            whileInView="animate"
            custom={0.25}
          >
            {bio}
          </motion.div>

          <div className="flex flex-wrap justify-center gap-2 md:justify-start">
            {links.map(({ href, icon, color }, index) => (
              <motion.a
                key={index}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                variants={Pebble}
                viewport={{ once: true, amount: 0 }}
                initial="initial"
                whileInView="animate"
                custom={(index % 5) * 0.2 + 0.5}
                whileHover={{ scale: 1.15, color }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="rounded-xl p-2"
              >
                {icon}
              </motion.a>
            ))}
          </div>
        </div>
      </div>
      <div className="order-first my-10 flex w-1/4 justify-center md:order-0 md:my-0">
        <Title title={name.toUpperCase()} />
      </div>
    </section>
  );
};

export default Home;
