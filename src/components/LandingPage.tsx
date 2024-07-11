"use client";
import Image from "next/image";
import { Button } from "./ui/button";
import { BookOpenCheck, Facebook, Twitter, X, Youtube } from "lucide-react";
import TypewriterComponent from "typewriter-effect";

export default function LandingPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-[#062427]">
        <div className="section-container flex flex-col text-white md:flex-row items-center">
          {/* left */}
          <div className="flex flex-col mb-32 space-y-12 text-center md:w-1/2 md:text-left">
            <h1 className="max-w-md text-4xl md:text-5xl md:leading-tight">Interact with PDF document</h1>
            <div className="text-3xl font-light text-orange-400">
              <TypewriterComponent 
                options={{
                  strings: [
                    "Books",
                    "Scientific papers",
                    "Financial reports",
                    "User manuals",
                    "Legal documents"
                  ],
                  autoStart: true,
                  loop: true
                }}
              />
            </div>
            <p className="max-w-md md:max-w-sm text-white/80 font-light leading-7">
              Transform your documents into interactive resources with PDF.wisdom. Whether it&apos;s legal agreements or financial reports, our advanced AI technology allows you to inquire, get summaries, and extract information with ease, streamlining your workflow and enhancing productivity.
            </p>
            <div>
              <div className="flex justify-center md:justify-start">
                <Button variant="orange">Get started for free</Button>
              </div>
              <div className="flex justify-start mt-6">
                <Image className="h-6 w-6 my-auto object-cover rounded-full ring-2 ring-green-950" src="/user_1.jpeg" alt="" width={500} height={500} />
                <Image className="h-6 w-6 my-auto object-cover rounded-full ring-2 ring-green-950" src="/user_2.jpeg" alt="" width={500} height={500} />
                <Image className="h-6 w-6 my-auto object-cover rounded-full ring-2 ring-green-950" src="/user_3.jpeg" alt="" width={500} height={500} />
                <Image className="h-6 w-6 my-auto object-cover rounded-full ring-2 ring-green-950" src="/user_4.jpeg" alt="" width={500} height={500} />
                <Image className="h-6 w-6 my-auto object-cover rounded-full ring-2 ring-green-950" src="/user_5.jpeg" alt="" width={500} height={500} />
                <p className="ml-2 my-auto text-sm text-slate-400">Loved by 100,000+ happy users</p>
              </div>
            </div>
          </div>

          {/* right */}
          <div className="md:w-1/2">
            <Image src="/hero.svg" alt="" width={500} height={500} />
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="section-container">
        <h1 className="text-center text-4xl font-semibold mb-5 sm:mb-10">How it works</h1>
        <div className="text-black grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:gap-10">
          {/* Feature 1 */}
          <div className="rounded-b-xl px-5 pb-5 pt-3 shadow-lg">
            <div className="flex-col">
              <div className="flex items-center justify-center">
                <Image src="/feature_1.svg" alt="" width={500} height={500} />
              </div>
              <p className="text-xl font-medium">Upload PDFs</p>
              <span className="block text-sm text-gray-500 mt-3">
                Easily upload your PDF documents to interact with.
              </span>
            </div>
          </div>
          {/* Feature 2 */}
          <div className="rounded-b-xl px-5 pb-5 pt-3 shadow-lg">
            <div className="flex-col">
              <div className="flex items-center justify-center">
                <Image src="/feature_2.svg" alt="" width={500} height={500} />
              </div>
              <p className="text-xl font-medium">Instant Answers</p>
              <span className="block text-sm text-gray-500 mt-3">
                Get quick answers and summaries.
              </span>
            </div>
          </div>
          {/* Feature 3 */}
          <div className="rounded-b-xl px-5 pb-5 pt-3 shadow-lg">
            <div className="flex-col">
              <div className="flex items-center justify-center">
                <Image src="/feature_3.svg" alt="" width={500} height={500} />
              </div>
              <p className="text-xl font-medium">Cited Sources</p>
              <span className="block text-sm text-gray-500 mt-3">
                Answers backed by document sources.
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-container text-center">
        <h1 className="font-semibold text-4xl">
          Get started
        </h1>
        <p className="mt-6 mb-6 text-gray-500">
          Upload a document and begin interacting with it today. <br />
          No credit card needed.
        </p>
        <div className="w-full max-w-sm mx-auto px-4">
          <Button variant="orange">Sign up for free</Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#f8f5ee] py-10">
        <div className="mx-auto max-w-7xl px-8 md:px-6">
          <div className="md:flex md:justify-between">
            <div className="flex items-start mb-6">
              <BookOpenCheck className="w-8 h-8 mr-3" />
              <span className="text-xl font-medium">PDF.wisdom</span>
            </div>
            <div className="grid grid-cols-3 gap-x-20">
              <div>
                <h2 className="mb-4 text-sm font-medium">Products</h2>
                <div className="flex flex-col text-sm text-gray-400 space-y-2">
                  <a href="#" className="hover:underline">Use Cases</a>
                  <a href="#" className="hover:underline">Chrome Add-on</a>
                  <a href="#" className="hover:underline">Blog</a>
                  <a href="#" className="hover:underline">FAQs</a>
                </div>
              </div>
              <div>
                <h2 className="mb-4 text-sm font-medium">Resources</h2>
                <div className="flex flex-col text-sm text-gray-400 space-y-2">
                  <a href="#" className="hover:underline">Learning Center</a>
                  <a href="#" className="hover:underline">Documentation</a>
                  <a href="#" className="hover:underline">Community Forum</a>
                </div>
              </div>
              <div>
                <h2 className="mb-4 text-sm font-medium">Company</h2>
                <div className="flex flex-col text-sm text-gray-400 space-y-2">
                  <a href="#" className="hover:underline">About Us</a>
                  <a href="#" className="hover:underline">Our Team</a>
                </div>
              </div>
            </div>
          </div>
          <hr className="my-6 border-gray-300 lg:my-8" />
          <div className="text-sm text-gray-500 sm:flex sm:items-center sm:justify-between">
            <span>Copyright &copy; 2024. All Rights Reserved.</span>
            <div className="flex text-2xl space-x-6 sm:justify-center">
              <a href="#">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#">
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}
