/** Layered mountain-ridge silhouette used at the bottom of navy sections. */
export function Ridge({ className = '', paper = '#F4F1EA' }: { className?: string; paper?: string }) {
  return (
    <svg viewBox="0 0 1440 260" preserveAspectRatio="none" className={className} aria-hidden>
      <path
        d="M0 170 L90 120 L150 145 L240 70 L300 110 L360 85 L450 150 L520 100 L600 40 L660 90 L720 70 L800 130 L880 80 L960 115 L1040 50 L1110 100 L1180 75 L1260 135 L1340 95 L1440 140 V260 H0 Z"
        fill="#1C2D3A"
      />
      <path d="M600 40 L585 58 L598 54 L606 62 L614 54 L622 57 Z" fill="#E8EEF0" opacity=".55" />
      <path d="M1040 50 L1026 66 L1038 62 L1045 70 L1052 63 L1060 66 Z" fill="#E8EEF0" opacity=".55" />
      <path d="M240 70 L229 84 L239 80 L245 87 L251 81 L258 84 Z" fill="#E8EEF0" opacity=".45" />
      <path
        d="M0 210 L120 165 L200 190 L310 140 L400 180 L500 150 L620 195 L720 155 L830 185 L940 145 L1060 190 L1160 160 L1280 195 L1380 170 L1440 185 V260 H0 Z"
        fill="#253949"
      />
      <path d="M0 240 L160 220 L330 236 L520 214 L700 234 L900 218 L1100 238 L1280 222 L1440 232 V260 H0 Z" fill={paper} />
    </svg>
  );
}
