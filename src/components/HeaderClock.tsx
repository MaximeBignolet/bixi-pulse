import { useClock } from "@/hooks/useClock";

export function HeaderClock(){
    const localeMontrealTime = useClock();

    return (
        <p className="flex items-center gap-2 text-xs font-medium text-muted-foreground tabular-nums">
          <span aria-hidden className="size-1.5 animate-pulse rounded-full bg-emerald-500" />
          {localeMontrealTime}
        </p>
    )
}