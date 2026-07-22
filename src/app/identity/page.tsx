import { Typography } from "@/components/ui/Typography";

export default function IdentityPage() {
  return (
    <main className="flex-1 w-full bg-background pt-32 pb-24">
      <div className="max-w-[720px] mx-auto px-4 md:px-8 flex flex-col gap-16">
        <section className="animate-fade-up">
          <Typography variant="display" className="mb-8">
            Identity System
          </Typography>
          <Typography variant="body" className="text-xl">
            The SARIV Design System exists to ensure that every digital interface we build feels unmistakably like it belongs to the same product family. Our goal is not to look modern. Our goal is to be timeless.
          </Typography>
        </section>

        <hr className="border-border" />

        <section className="animate-fade-up" style={{ animationDelay: "0.1s" }}>
          <Typography variant="heading" className="mb-8">
            1. Principles
          </Typography>
          <div className="flex flex-col gap-8">
            <div>
              <Typography variant="subheading" className="mb-4">Less, Better</Typography>
              <Typography variant="body">
                Do fewer things, but do them exceptionally well. Avoid visual clutter at all costs. Every single element on the screen must earn its place.
              </Typography>
            </div>
            <div>
              <Typography variant="subheading" className="mb-4">Typography Is The Interface</Typography>
              <Typography variant="body">
                In the absence of heavy graphical elements, typography carries the vast majority of the visual weight. We rely on large, striking headlines, readable body copy, generous line spacing, and high contrast.
              </Typography>
            </div>
          </div>
        </section>

        <hr className="border-border" />

        <section className="animate-fade-up" style={{ animationDelay: "0.2s" }}>
          <Typography variant="heading" className="mb-8">
            2. Typography
          </Typography>
          <div className="flex flex-col gap-12">
            <div>
              <Typography variant="caption" muted className="mb-2 uppercase tracking-widest">Display</Typography>
              <Typography variant="display">Instrument Serif</Typography>
            </div>
            <div>
              <Typography variant="caption" muted className="mb-2 uppercase tracking-widest">Heading</Typography>
              <Typography variant="heading">Instrument Serif</Typography>
            </div>
            <div>
              <Typography variant="caption" muted className="mb-2 uppercase tracking-widest">Subheading</Typography>
              <Typography variant="subheading">Inter Medium</Typography>
            </div>
            <div>
              <Typography variant="caption" muted className="mb-2 uppercase tracking-widest">Body</Typography>
              <Typography variant="body">Inter Regular. Used for all readable interface content. We enforce full text justification to create a strict, engineered, and editorial reading experience.</Typography>
            </div>
          </div>
        </section>

        <hr className="border-border" />

        <section className="animate-fade-up" style={{ animationDelay: "0.3s" }}>
          <Typography variant="heading" className="mb-8">
            3. Color Palette
          </Typography>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="flex flex-col gap-2">
              <div className="h-24 rounded-lg bg-background border border-border"></div>
              <Typography variant="caption" muted>Background</Typography>
            </div>
            <div className="flex flex-col gap-2">
              <div className="h-24 rounded-lg bg-surface border border-border"></div>
              <Typography variant="caption" muted>Surface</Typography>
            </div>
            <div className="flex flex-col gap-2">
              <div className="h-24 rounded-lg bg-surface-elevated border border-border"></div>
              <Typography variant="caption" muted>Surface Elevated</Typography>
            </div>
            <div className="flex flex-col gap-2">
              <div className="h-24 rounded-lg bg-primary border border-border"></div>
              <Typography variant="caption" muted>Primary Text</Typography>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
