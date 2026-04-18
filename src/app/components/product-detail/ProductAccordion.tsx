import { Minus, Plus } from "lucide-react";
import { useState } from "react";
import { SpecificationTable } from "./SpecificationTable";

type ProductAccordionProps = {
  specifications?: Record<string, string | number | boolean | null>;
  strap?: Record<string, string | number | boolean | null>;
};

type SectionKey = "specifications" | "strap";

export function ProductAccordion({ specifications, strap }: ProductAccordionProps) {
  const [openSection, setOpenSection] = useState<SectionKey | null>("specifications");

  const sections: Array<{
    key: SectionKey;
    title: string;
    subtitle: string;
    data: Record<string, string | number | boolean | null>;
  }> = [
    {
      key: "specifications",
      title: "Specifications",
      subtitle: "Technical details",
      data: specifications ?? {},
    },
    {
      key: "strap",
      title: "Strap",
      subtitle: "Materials & fit",
      data: strap ?? {},
    },
  ];

  return (
    <div className="border-t border-border">
      {sections.map((section) => {
        const isOpen = openSection === section.key;

        return (
          <div
            key={section.key}
            className="border-b border-border"
          >
            <button
              type="button"
              onClick={() => setOpenSection((current) => (current === section.key ? null : section.key))}
              className="group flex w-full items-center justify-between py-4 text-left"
            >
              <div className="flex flex-col gap-0.5">
                <span
                  className={`text-[0.98rem] font-semibold tracking-[0.01em] transition-colors duration-200 ${
                    isOpen ? "text-foreground" : "text-foreground/70"
                  }`}
                >
                  {section.title}
                </span>
                <span className="text-[10px] uppercase tracking-[0.17em] text-muted-foreground/85">{section.subtitle}</span>
              </div>

              <div
                className={`flex h-7 w-7 items-center justify-center rounded-full border bg-transparent transition-all duration-300 ${
                  isOpen
                    ? "border-primary/45 text-primary"
                    : "border-border text-muted-foreground group-hover:border-primary/35 group-hover:text-primary/90"
                }`}
              >
                {isOpen ? <Minus className="h-3.5 w-3.5" /> : <Plus className="h-3.5 w-3.5" />}
              </div>
            </button>

            <div
              className={`grid transition-all duration-400 ease-out ${
                isOpen
                  ? "grid-rows-[1fr] opacity-100 pb-6"
                  : "grid-rows-[0fr] opacity-0"
              }`}
              style={{ transitionDuration: "350ms" }}
            >
              <div className="overflow-hidden">
                <SpecificationTable data={section.data} />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}