import type { ExperienceRecord } from "../../lib/portfolio-content";

function dateOrder(value: string) {
  return value;
}

function displayDate(value: string) {
  const [year, month] = value.split("-");
  return new Intl.DateTimeFormat("en", {
    month: "short",
    year: "numeric",
  }).format(new Date(Number(year), Number(month) - 1));
}

export default function Experience({
  records,
}: {
  records: ExperienceRecord[];
}) {
  const newestFirst = [...records].sort((first, second) =>
    dateOrder(second.startDate).localeCompare(dateOrder(first.startDate)),
  );

  return (
    <section
      className="content-section"
      id="experience"
      aria-labelledby="experience-title"
    >
      <div className="section-inner">
        <div className="section-heading">
          <p className="eyebrow">Professional background</p>
          <h2 id="experience-title">
            Experience<span aria-hidden="true">.</span>
          </h2>
        </div>
        {newestFirst.length > 0 && (
          <ol className="experience-list">
            {newestFirst.map((record) => (
              <li className="experience-item" key={record.id}>
                <div className="experience-dates">
                  {displayDate(record.startDate)} —{" "}
                  {record.endDate ? displayDate(record.endDate) : "Present"}
                </div>
                <div className="experience-details">
                  <h3>{record.title}</h3>
                  <p className="experience-employer">{record.employer}</p>
                  <p className="experience-location">{record.location}</p>
                  <p className="experience-description">{record.description}</p>
                </div>
              </li>
            ))}
          </ol>
        )}
      </div>
    </section>
  );
}
