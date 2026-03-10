/* eslint-disable @next/next/no-img-element */
import Navbar from "@/components/Navbar";
import SplitText from "@/components/ui/SplitText";
import { InteractiveGridPattern } from "@/components/ui/InteractiveGridPattern"
import { IoCloudUpload } from "react-icons/io5";

import { ArrowRight, ArrowUpRight, Clock } from "lucide-react";
import Link from "next/link";
import { Button } from "primereact/button";
import { cn } from "@/lib/utils";


export default function Home() {
  return (
  <div className="home">
    <Navbar/>
    <section className="pt-32 pb-20 px-6 max-w-7xl mx-auto flex flex-col items-center text-center">
      <div className="mb-8 inline-flex items-center px-3 py-1 rounded-md bg-white border border-zinc-200 shadow-sm">
        <div className="w-5 h-5 rounded bg-zinc-200 flex items-center justify-center mr-2">
            {/* <div className="pulse"></div> */}
            <span className="relative flex size-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-gray-700 opacity-75"></span>
              <span className="relative inline-flex size-2 rounded-full bg-black"></span>
            </span>
        </div>
            <p>Introducing Roomify 2.0</p>
      </div>
      <SplitText
        text="Build beautiful spaces at the speed of thought with Roomify"
        className="text-6xl md:text-7xl leading-[1.1] text-black mb-8 max-w-5xl mx-auto font-bold"
        delay={100}
        duration={3}
        ease="power3.out"
        splitType="words"
        from={{ opacity: 0, y: 40 }}
        to={{ opacity: 1, y: 0 }}
        threshold={0.1}
        rootMargin="-100px"
        textAlign="center"
      />
      {/* <h1 className="text-6xl md:text-7xl leading-[1.1] text-black mb-8 max-w-5xl mx-auto font-bold">Build beautiful spaces at the speed of thought with Roomify</h1> */}
      <p className="max-w-2xl mx-auto text-xs md:text-sm uppercase tracking-widest text-zinc-500 mb-10 leading-relaxed">
          Roomify is an AI-first design environment that helps you visualize, render, and ship architectural projects faster  than ever.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
        <Link href="#upload" className="inline-flex items-center justify-center rounded-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-background px-8 py-3 text-sm uppercase tracking-wide font-bold bg-primary text-white hover:bg-white hover:text-black shadow-md border border-black">
          Start Building <ArrowRight className="ml-2 w-4 h-4"/>
        </Link>
        <Button label="Watch Demo" size="small" className="px-8 bg-zinc-100 rounded-md hover:bg-zinc-200 text-black border-none"/>
      </div>
    </section>
    <section>
      <div className="bg-background relative flex h-screen w-screen flex-col items-center justify-center overflow-hidden rounded-lg">
        <InteractiveGridPattern
          className={cn(
            "mask-[radial-gradient(700px_circle_at_center,white,transparent)]",
            "inset-x-0 h-full skew-y-12 w-full"
          )}
          width={40}
          height={40}
          squares={[80, 80]}
        />
        <div className="relative w-full max-w-xl bg-white rounded-2xl shadow-xl overflow-hidden border border-zinc-100 p-8 z-10 transition-transform hover:scale-[1.01] duration-500 text-center">
          <div className=" mb-6">
            <div className="w-15 h-15 bg-zinc-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <IoCloudUpload className="text-black w-7 h-7"/>
            </div>
            <h3 className="text-2xl font-bold text-black">Upload your floor pan</h3>
            <p className="text-zinc-500 text-sm mt-1">Supports JPG, PNG, format up to 10MB</p>
          </div>
          <p>Upload images</p>
        </div>
    </div>
    </section>
    <section className="py-24 bg-white relative border-b border-zinc-100">
              <div className="max-w-7xl mx-auto px-6">
                  <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
                      <div className="max-w-2xl">
                          <h2 className="text-4xl font-serif text-black mb-4">Projects</h2>
                          <p className="text-zinc-500 text-lg">Your latest work and shared community projects, all in one place.</p>
                      </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                          <div className="relative bg-white rounded-xl overflow-hidden border border-zinc-200 shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col h-full group min-h-100">
                              <div className="aspect-4/3 overflow-hidden bg-white relative w-full h-full">
                                  {/* <img  src={renderedImage || sourceImage} alt="Project"
                                  /> */}
                                  <img src="https://roomify-mlhuk267-dfwu1i.puter.site/projects/1770803585402/rendered.png" alt="" className="w-full h-full group-hover:scale-105 transition-transform duration-700 object-contain"/>
                                  <div className="badge">
                                      <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-800">Community</span>
                                  </div>
                              </div>

                              <div className="card_body">
                                  <div className="w-2/3 h-full">
                                      <h3 className="text-2xl shadow-2xl font-bold text-white  transition-colors">Project</h3>

                                      <div className="flex items-center text-zinc-400 text-xs mt-1 space-x-2 uppercase">
                                          <Clock size={12} />
                                          {/* <span>{new Date(timestamp).toLocaleDateString()}</span> */}
                                          <span>11:20</span>
                                          <span className="text-zinc-100 text-[10px] tracking-wide">By JS Mastery</span>
                                      </div>
                                  </div>
                                  <div className="w-10 h-10 rounded-full bg-zinc-50 border border-zinc-200 flex items-center justify-center text-zinc-400 group-hover:bg-primary group-hover:text-white group-hover:border-primary transition-all duration-300">
                                      <ArrowUpRight size={18} />
                                  </div>
                              </div>
                          </div>
                      
                  </div>
              </div>
          </section>
  </div>
  );
}
