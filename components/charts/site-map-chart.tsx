import { geoAlbersUsa, geoPath } from "d3-geo";
import type {
  Feature,
  FeatureCollection,
  MultiLineString,
  MultiPolygon,
  Polygon,
} from "geojson";
import { feature, mesh } from "topojson-client";
import type { GeometryCollection, Topology } from "topojson-specification";
import usStatesTopology from "us-atlas/states-10m.json";

import { statusColors } from "@/lib/tokens";
import type { EnergySite, EnergySiteStatus } from "@/types/dashboard";

interface SiteMapChartProps {
  sites: EnergySite[];
}

type SiteHealthTone = "healthy" | "watch";

type UsaFeatureGeometry = Polygon | MultiPolygon;

type UsaAtlasTopology = Topology<{
  states: GeometryCollection;
  nation: GeometryCollection;
}>;

const mapSize = {
  width: 980,
  height: 560,
} as const;

const usaAtlasTopology = usStatesTopology as unknown as UsaAtlasTopology;

const statesFeatureCollection = feature(
  usaAtlasTopology,
  usaAtlasTopology.objects.states,
) as unknown as FeatureCollection<UsaFeatureGeometry>;

const nationOutline = feature(
  usaAtlasTopology,
  usaAtlasTopology.objects.nation,
) as unknown as Feature<UsaFeatureGeometry>;

const stateBorders = mesh(
  usaAtlasTopology,
  usaAtlasTopology.objects.states,
  (left, right) => left !== right,
) as MultiLineString;

const projection = geoAlbersUsa().fitExtent(
  [
    [24, 26],
    [mapSize.width - 24, mapSize.height - 28],
  ],
  statesFeatureCollection,
);

const pathGenerator = geoPath(projection);

const nationOutlinePath = pathGenerator(nationOutline);
const stateBorderPath = pathGenerator(stateBorders);

const siteLegendDotClasses: Record<EnergySiteStatus, string> = {
  Active: "bg-success",
  Watch: "bg-warning",
};

function getSiteHealthTone(status: EnergySiteStatus): SiteHealthTone {
  return status === "Watch" ? "watch" : "healthy";
}

function getSiteMarkerColor(status: EnergySiteStatus) {
  const tone = getSiteHealthTone(status);

  if (tone === "watch") {
    return statusColors.warning;
  }

  return statusColors.success;
}

export function SiteMapChart({ sites }: SiteMapChartProps) {
  const coverageCount = new Set(sites.map((site) => site.state)).size;
  const activeCount = sites.filter(
    (site) => getSiteHealthTone(site.status) === "healthy",
  ).length;
  const watchCount = sites.filter(
    (site) => getSiteHealthTone(site.status) === "watch",
  ).length;

  const projectedSites = sites.flatMap((site) => {
    const projectedPoint = projection([site.longitude, site.latitude]);

    if (!projectedPoint) {
      return [];
    }

    const siteLabel = `${site.name} (${site.city}, ${site.state}) - ${site.demandMw.toFixed(1)} MW - ${site.status}`;

    return [
      {
        site,
        label: siteLabel,
        color: getSiteMarkerColor(site.status),
        x: projectedPoint[0],
        y: projectedPoint[1],
      },
    ];
  });

  return (
    <div className="grid gap-3 xl:grid-cols-[minmax(0,1fr)_15rem]">
      <div className="border-border-default from-brand-mint/45 via-surface-white to-surface-bg relative overflow-hidden rounded-xl border bg-gradient-to-br shadow-sm">
        <div className="from-surface-white/80 absolute inset-x-0 top-0 h-24 bg-gradient-to-b to-transparent" />
        <div className="text-brand-secondary bg-surface-white/80 pointer-events-none absolute top-4 left-4 z-10 rounded-full px-3 py-1 text-xs font-semibold shadow-sm backdrop-blur-sm">
          United States portfolio footprint
        </div>

        <svg
          viewBox={`0 0 ${mapSize.width} ${mapSize.height}`}
          className="h-full min-h-[360px] w-full"
          role="img"
          aria-label="United States site map with portfolio locations"
        >
          <defs>
            <linearGradient
              id="portfolio-map-surface"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop
                offset="0%"
                stopColor="var(--surface-white)"
                stopOpacity="0.94"
              />
              <stop
                offset="100%"
                stopColor="var(--surface-bg)"
                stopOpacity="1"
              />
            </linearGradient>
          </defs>

          <rect
            x="0"
            y="0"
            width={mapSize.width}
            height={mapSize.height}
            fill="url(#portfolio-map-surface)"
          />

          {nationOutlinePath && (
            <path
              d={nationOutlinePath}
              fill="var(--brand-mint)"
              stroke="var(--border-default)"
              strokeWidth="1.2"
              strokeLinejoin="round"
            />
          )}

          {statesFeatureCollection.features.map((stateFeature, index) => {
            const statePath = pathGenerator(stateFeature);

            if (!statePath) {
              return null;
            }

            return (
              <path
                key={stateFeature.id ?? `state-${index}`}
                d={statePath}
                fill="var(--brand-mint)"
                fillOpacity="0.42"
                stroke="var(--border-default)"
                strokeWidth="0.7"
              />
            );
          })}

          {stateBorderPath && (
            <path
              d={stateBorderPath}
              fill="none"
              stroke="var(--border-default)"
              strokeWidth="0.8"
              strokeLinejoin="round"
            />
          )}

          {projectedSites.map((projectedSite, index) => {
            const primaryWaveDelay = `${(index % 6) * 0.18}s`;
            const secondaryWaveDelay = `${(index % 6) * 0.18 + 1.2}s`;

            return (
              <g
                key={projectedSite.site.id}
                transform={`translate(${projectedSite.x} ${projectedSite.y})`}
                tabIndex={0}
                role="img"
                aria-label={projectedSite.label}
              >
                <title>{projectedSite.label}</title>

                <circle r="7" fill={projectedSite.color} fillOpacity="0.22">
                  <animate
                    attributeName="r"
                    values="7;18;26"
                    dur="2.8s"
                    begin={primaryWaveDelay}
                    repeatCount="indefinite"
                  />
                  <animate
                    attributeName="fill-opacity"
                    values="0.22;0.12;0"
                    dur="2.8s"
                    begin={primaryWaveDelay}
                    repeatCount="indefinite"
                  />
                </circle>

                <circle r="7" fill={projectedSite.color} fillOpacity="0.14">
                  <animate
                    attributeName="r"
                    values="7;16;22"
                    dur="2.8s"
                    begin={secondaryWaveDelay}
                    repeatCount="indefinite"
                  />
                  <animate
                    attributeName="fill-opacity"
                    values="0.14;0.08;0"
                    dur="2.8s"
                    begin={secondaryWaveDelay}
                    repeatCount="indefinite"
                  />
                </circle>

                <circle r="15" fill={projectedSite.color} fillOpacity="0.16" />
                <circle
                  r="7.5"
                  fill={projectedSite.color}
                  stroke="var(--surface-white)"
                  strokeWidth="3"
                />
                <circle r="3" fill="var(--surface-white)" fillOpacity="0.96" />
              </g>
            );
          })}
        </svg>
      </div>

      <div className="grid gap-3 sm:grid-cols-3 xl:grid-cols-1">
        <div className="border-border-default bg-surface-bg rounded-xl border p-2.5">
          <p className="text-muted-foreground text-xs font-semibold tracking-wide uppercase">
            Coverage
          </p>
          <p className="text-brand-secondary mt-2 text-lg font-bold">
            {coverageCount} states
          </p>
          <p className="text-muted-foreground mt-1 text-xs">
            Portfolio footprint represented on the default map view.
          </p>
        </div>

        <div className="border-border-default bg-surface-bg rounded-xl border p-2.5">
          <p className="text-muted-foreground text-xs font-semibold tracking-wide uppercase">
            Site Health
          </p>
          <div className="mt-2 space-y-2 text-sm">
            <div className="flex items-center justify-between gap-3">
              <span className="text-brand-text inline-flex items-center gap-2">
                <span
                  className={`${siteLegendDotClasses.Active} size-2.5 rounded-full`}
                  aria-hidden="true"
                />
                Active
              </span>
              <span className="text-brand-secondary font-semibold">
                {activeCount}
              </span>
            </div>
            <div className="flex items-center justify-between gap-3">
              <span className="text-brand-text inline-flex items-center gap-2">
                <span
                  className={`${siteLegendDotClasses.Watch} size-2.5 rounded-full`}
                  aria-hidden="true"
                />
                Watch
              </span>
              <span className="text-brand-secondary font-semibold">
                {watchCount}
              </span>
            </div>
          </div>
        </div>

        <div className="border-border-default bg-surface-bg rounded-xl border p-2.5">
          <p className="text-muted-foreground text-xs font-semibold tracking-wide uppercase">
            Scan Mode
          </p>
          <p className="text-brand-secondary mt-2 text-sm font-semibold">
            Map first, Grid and List second.
          </p>
          <p className="text-muted-foreground mt-1 text-xs">
            Use alternate views for quick portfolio reviews before drilling into
            a module page.
          </p>
        </div>
      </div>
    </div>
  );
}
