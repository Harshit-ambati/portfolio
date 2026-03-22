import SectionWrapper from "./SectionWrapper";

const resume = {
  title: "Harshit Ambati Resume",
  file: "/resume/harshit-ambati-resume.pdf",
  updated: "2026",
  summary:
    "Download my latest CV to view my education, technical skills, projects, and experience in one place.",
};

export default function ResumeSection() {
  return (
    <SectionWrapper id="resume" className="px-5 pb-8 md:px-8">
      <div className="interactive-surface border border-white/10 bg-gradient-to-r from-[#0B0D14] to-[#10141D] p-6 md:p-8">
        <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr] xl:items-center">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.35em] text-white/35">Resume</p>
            <h3 className="mt-2 text-3xl font-black uppercase">View My CV</h3>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-white/68">{resume.summary}</p>
          </div>

          <div className="interactive-surface rounded-[28px] border border-white/10 bg-black/35 p-5">
            <p className="text-[10px] font-bold uppercase tracking-[0.35em] text-white/35">Document</p>
            <h4 className="mt-3 text-2xl font-black uppercase">{resume.title}</h4>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                <p className="text-[10px] uppercase tracking-[0.28em] text-white/35">Format</p>
                <p className="mt-2 text-sm font-bold uppercase text-white/80">PDF</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                <p className="text-[10px] uppercase tracking-[0.28em] text-white/35">Updated</p>
                <p className="mt-2 text-sm font-bold uppercase text-white/80">{resume.updated}</p>
              </div>
            </div>
            <div className="mt-5 flex flex-wrap gap-3">
              <a
                href={resume.file}
                target="_blank"
                rel="noreferrer"
                className="magnetic-button inline-flex items-center justify-center rounded-md bg-[#F59E0B] px-6 py-3 text-xs font-black uppercase tracking-[0.25em] text-black transition hover:brightness-110"
              >
                Open Resume
              </a>
              <a
                href={resume.file}
                download
                className="magnetic-button inline-flex items-center justify-center rounded-md border border-white/10 px-6 py-3 text-xs font-black uppercase tracking-[0.25em] text-white/80 transition hover:border-white/30 hover:bg-white/5 hover:text-white"
              >
                Download PDF
              </a>
            </div>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
