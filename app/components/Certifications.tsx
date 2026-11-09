import type { Certification } from "../../lib/portfolio-content";

export default function Certifications({
  records,
}: {
  records: Certification[];
}) {
  return (
    <section
      className="content-section certifications-section"
      id="certifications"
      aria-labelledby="certifications-title"
    >
      <div className="section-inner">
        <div className="section-heading">
          <p className="eyebrow">Continued learning</p>
          <h2 id="certifications-title">
            Certifications<span aria-hidden="true">.</span>
          </h2>
        </div>
        {records.length > 0 && (
          <ul className="certification-list">
            {records.map((record) => (
              <li className="certification-item" key={record.id}>
                <div>
                  <h3>{record.name}</h3>
                  <p>{record.issuer}</p>
                  <p className="certification-date">
                    {new Intl.DateTimeFormat("en", {
                      month: "short",
                      year: "numeric",
                    }).format(
                      new Date(
                        Number(record.date.slice(0, 4)),
                        Number(record.date.slice(5, 7)) - 1,
                      ),
                    )}
                  </p>
                </div>
                {record.credentialUrl && (
                  <a
                    href={record.credentialUrl}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`Credential link for ${record.name} (opens in a new tab)`}
                  >
                    Credential <span aria-hidden="true">↗</span>
                  </a>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
