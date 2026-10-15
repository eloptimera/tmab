import { Megaphone, PenTool, Target, type LucideIcon } from "lucide-react";

// TODO(Treatly): ersätt med era faktiska tjänster. Texterna nedan är utkast.
export type Tjanst = {
  id: string;
  titel: string;
  kort: string;
  punkter: readonly string[];
  ikon: LucideIcon;
};

export const TJANSTER: readonly Tjanst[] = [
  {
    id: "varumarke",
    titel: "Varumärke & strategi",
    kort: "En tydlig position och ett budskap som håller i alla kanaler.",
    punkter: [
      "Positionering och målgruppsanalys",
      "Budskap, tonalitet och visuell riktning",
      "En plan som går att följa upp",
    ],
    ikon: Target,
  },
  {
    id: "innehall",
    titel: "Innehåll & sociala medier",
    kort: "Text, bild och video som får er målgrupp att stanna upp.",
    punkter: [
      "Innehållsplan anpassad efter era kanaler",
      "Produktion av text, bild och rörligt",
      "Löpande publicering och uppföljning",
    ],
    ikon: PenTool,
  },
  {
    id: "kampanjer",
    titel: "Kampanjer & annonsering",
    kort: "Kampanjer som når rätt personer och går att mäta.",
    punkter: [
      "Kampanjidé och kreativt koncept",
      "Annonsering i digitala kanaler",
      "Resultat som rapporteras tydligt",
    ],
    ikon: Megaphone,
  },
];
