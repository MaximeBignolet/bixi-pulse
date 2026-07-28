import { Bike } from "lucide-react";
import { MontrealMap } from "@/components/Map";
import { StationsList } from "@/components/StationsList";
import { useState } from "react";
import { HeaderClock } from "./components/HeaderClock";

export function App() {

  const [selectedStationId, setSelectedStationId] = useState<string | undefined>(undefined);

  return (
    <div className="flex h-dvh flex-col">
      <header className="flex h-14 shrink-0 items-center justify-between border-b px-4">
        <div className="flex items-center gap-2.5">
          <div className="flex size-7 items-center justify-center rounded-md bg-primary text-primary-foreground">
            <Bike className="size-4" aria-hidden />
          </div>
          <div>
            <h1 className="text-sm leading-none font-semibold tracking-tight">BIXI Pulse</h1>
            <p className="mt-1 text-[11px] leading-none text-muted-foreground">
              Stations en temps réel · Montréal
            </p>
          </div>
        </div>
        <HeaderClock />
      </header>
      <main className="flex min-h-0 flex-1 flex-col-reverse lg:flex-row ">
        <section
          aria-label="Liste des stations"
          className="flex min-h-0 flex-1 flex-col border-t lg:w-96  lg:flex-none lg:border-t-0 lg:border-r"
        >
          <StationsList onStationSelect={setSelectedStationId} />
        </section>
        <section
          aria-label="Carte des stations"
          className="h-[42dvh] shrink-0 lg:h-auto lg:min-h-0 lg:flex-1"
        >
          <MontrealMap selectedStationId={selectedStationId} />
        </section>
      </main>
    </div>
  );
}
