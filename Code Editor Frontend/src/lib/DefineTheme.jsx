import { loader } from "@monaco-editor/react";

// Import themes statically
import Active4D from "monaco-themes/themes/Active4D.json";
import AllHallowsEve from "monaco-themes/themes/All Hallows Eve.json";
import Amy from "monaco-themes/themes/Amy.json";
import BirdsOfParadise from "monaco-themes/themes/Birds of Paradise.json";
import Blackboard from "monaco-themes/themes/Blackboard.json";
import BrillianceBlack from "monaco-themes/themes/Brilliance Black.json";
import BrillianceDull from "monaco-themes/themes/Brilliance Dull.json";
import ChromeDevTools from "monaco-themes/themes/Chrome DevTools.json";
import CloudsMidnight from "monaco-themes/themes/Clouds Midnight.json";
import Clouds from "monaco-themes/themes/Clouds.json";
import Cobalt from "monaco-themes/themes/Cobalt.json";
import Dawn from "monaco-themes/themes/Dawn.json";
import Dreamweaver from "monaco-themes/themes/Dreamweaver.json";
import Eiffel from "monaco-themes/themes/Eiffel.json";
import EspressoLibre from "monaco-themes/themes/Espresso Libre.json";
import GitHub from "monaco-themes/themes/GitHub.json";
import IDLE from "monaco-themes/themes/IDLE.json";
import Katzenmilch from "monaco-themes/themes/Katzenmilch.json";
import KuroirTheme from "monaco-themes/themes/Kuroir Theme.json";
import LAZY from "monaco-themes/themes/LAZY.json";
import MagicWB from "monaco-themes/themes/MagicWB (Amiga).json";
import MerbivoreSoft from "monaco-themes/themes/Merbivore Soft.json";
import Merbivore from "monaco-themes/themes/Merbivore.json";
import MonokaiBright from "monaco-themes/themes/Monokai Bright.json";
import Monokai from "monaco-themes/themes/Monokai.json";
import NightOwl from "monaco-themes/themes/Night Owl.json";
import OceanicNext from "monaco-themes/themes/Oceanic Next.json";
import PastelsOnDark from "monaco-themes/themes/Pastels on Dark.json";
import SlushAndPoppies from "monaco-themes/themes/Slush and Poppies.json";
import SolarizedDark from "monaco-themes/themes/Solarized-dark.json";
import SolarizedLight from "monaco-themes/themes/Solarized-light.json";
import SpaceCadet from "monaco-themes/themes/SpaceCadet.json";
import Sunburst from "monaco-themes/themes/Sunburst.json";
import TextmateMacClassic from "monaco-themes/themes/Textmate (Mac Classic).json";
import TomorrowNightBlue from "monaco-themes/themes/Tomorrow-Night-Blue.json";
import TomorrowNightBright from "monaco-themes/themes/Tomorrow-Night-Bright.json";
import TomorrowNightEighties from "monaco-themes/themes/Tomorrow-Night-Eighties.json";
import TomorrowNight from "monaco-themes/themes/Tomorrow-Night.json";
import Tomorrow from "monaco-themes/themes/Tomorrow.json";
import Twilight from "monaco-themes/themes/Twilight.json";
import UpstreamSunburst from "monaco-themes/themes/Upstream Sunburst.json";
import VibrantInk from "monaco-themes/themes/Vibrant Ink.json";
import XcodeDefault from "monaco-themes/themes/Xcode_default.json";
import Zenburnesque from "monaco-themes/themes/Zenburnesque.json";
import IPlastic from "monaco-themes/themes/iPlastic.json";
import IdleFingers from "monaco-themes/themes/idleFingers.json";
import KrTheme from "monaco-themes/themes/krTheme.json";
import Monoindustrial from "monaco-themes/themes/monoindustrial.json";

// Map theme names to imported JSON objects
const themeDataMap = {
  active4d: Active4D,
  "all-hallows-eve": AllHallowsEve,
  amy: Amy,
  "birds-of-paradise": BirdsOfParadise,
  blackboard: Blackboard,
  "brilliance-black": BrillianceBlack,
  "brilliance-dull": BrillianceDull,
  "chrome-devtools": ChromeDevTools,
  "clouds-midnight": CloudsMidnight,
  clouds: Clouds,
  cobalt: Cobalt,
  dawn: Dawn,
  dreamweaver: Dreamweaver,
  eiffel: Eiffel,
  "espresso-libre": EspressoLibre,
  github: GitHub,
  idle: IDLE,
  katzenmilch: Katzenmilch,
  "kuroir-theme": KuroirTheme,
  lazy: LAZY,
  "magicwb--amiga-": MagicWB,
  "merbivore-soft": MerbivoreSoft,
  merbivore: Merbivore,
  "monokai-bright": MonokaiBright,
  monokai: Monokai,
  "night-owl": NightOwl,
  "oceanic-next": OceanicNext,
  "pastels-on-dark": PastelsOnDark,
  "slush-and-poppies": SlushAndPoppies,
  "solarized-dark": SolarizedDark,
  "solarized-light": SolarizedLight,
  spacecadet: SpaceCadet,
  sunburst: Sunburst,
  "textmate--mac-classic-": TextmateMacClassic,
  "tomorrow-night-blue": TomorrowNightBlue,
  "tomorrow-night-bright": TomorrowNightBright,
  "tomorrow-night-eighties": TomorrowNightEighties,
  "tomorrow-night": TomorrowNight,
  tomorrow: Tomorrow,
  twilight: Twilight,
  "upstream-sunburst": UpstreamSunburst,
  "vibrant-ink": VibrantInk,
  "xcode-default": XcodeDefault,
  zenburnesque: Zenburnesque,
  iplastic: IPlastic,
  idlefingers: IdleFingers,
  krtheme: KrTheme,
  monoindustrial: Monoindustrial,
};

// Define theme
const defineTheme = (theme) => {
  return new Promise((res, rej) => {
    const themeData = themeDataMap[theme];
    if (!themeData) {
      rej(new Error(`Theme "${theme}" not found.`));
      return;
    }

    loader
      .init()
      .then((monaco) => {
        monaco.editor.defineTheme(theme, themeData);
        res();
      })
      .catch((err) => rej(err));
  });
};

export { defineTheme };
