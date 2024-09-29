import { Itineraries } from "../../schema/flights";
import { format } from "date-fns";
interface Props {
  data: Itineraries[];
  
}

function FlightCard({ data }: Props) {
  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return format(date, "hh:mm a");
  };

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return `${hours} hr ${remainingMinutes} min`;
  };

  return (
    <>
      {data.map((i) => (
        <div key={i.id}>
          {i.legs.map((l, legIndex) => (
            <div key={legIndex}>
              {l.carriers.marketing.map((m, marketingIndex) => (
                <div
                  key={marketingIndex}
                  className="flex items-center border-b border-[#959ba0] mb-5 p-5 justify-between">
                  <div className="flex items-center gap-8">
                    <img
                      src={m.logoUrl}
                      className="w-10 h-10"
                      alt={`${m.name} logo`}
                    />
                    <div className="md:flex-shrink-0">
                      <div className="font-medium">
                        {formatTime(l.departure)} – {formatTime(l.arrival)}
                      </div>
                      <div className="text-sm text-[#868b90] font-medium">
                        {m.name}
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-3 max-w-48 w-full">
                    <div>
                      <div className="font-medium">
                        {formatDuration(l.durationInMinutes)}
                      </div>
                      <div className="text-sm text-[#868b90] font-medium">
                        {l.origin.displayCode} - {l.destination.displayCode}
                      </div>
                    </div>
                    <div >
                      <div className="text-start items-start">
                        {l.stopCount == 0
                          ? "Nonstop"
                          : `${l.stopCount} ${
                              l.stopCount > 1 ? "stops" : "stop"
                            }`}
                      </div>
                    </div>
                  </div>
                  <div>
                    <div>{i.price.formatted}</div>
                    <div></div>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      ))}
    </>
  );
}

export default FlightCard;
