import { useState, useEffect } from "react";``

import AgeofApplication from "./DemographicInfo/AgeofApplication";
import FemaleHeadHousehold from "./DemographicInfo/FemaleHeadHousehold";
import RaceDistribution from "./DemographicInfo/RaceDistribution";
import County from "./DemographicInfo/County";


export default function DemographicInfoLayout() {
  return (
    <div className="demographic-grid">
      <AgeofApplication />
      <RaceDistribution />
      <FemaleHeadHousehold />
      <County />
      <style>{`
        .demographic-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 20px;
        }
        @media (min-width: 700px) {
          .demographic-grid {
            grid-template-columns: 1fr 1fr;
          }
        }
      `}</style>
    </div>
  );
}