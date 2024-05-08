import SVG from "./draw.js"
import Color from "../shared/color.js"
import cssContent from "./style.css.js"
import Filter from "./filter.js"

// Need to define here, as we cannot reference Style#makeNewIcons
// during JS loading phase.
const highContrastIcons = new Set([
  "dropdownArrow",
  "turnRight",
  "turnLeft",
  "loopArrow",
  "musicBlock",
  "penBlock",
  "videoBlock",
  "ttsBlock",
  "translationBlock",
  "cloud",
  "cloudGradient",
  "turtle",
  "turtleOutline",
  "flash",
  "camera",
  "notes",
  "storage",
  "brush",
  "pipette",
  "paintBucket",
  "eraser",
  "location",
  "gears",
  "gearPartial",
  "gearBig",
  "globe",
  "globeBig",
  "square",

  "arrowUp",
  "arrowUpOutline",
  "arrowUpThin",
  "arrowDown",
  "arrowDownOutline",
  "arrowDownThin",
  "arrowLeft",
  "arrowLeftOutline",
  "arrowLeftThin",
  "arrowRight",
  "arrowRightOutline",
  "arrowRightThin",
  "arrowUpDownThin",
  "arrowLeftRightThin",
  "pointRight",
])

export default class Style {
  static highContrastIcons = highContrastIcons

  static get cssContent() {
    return cssContent
  }

  static categories = {
    motion: {
      primary: Color.fromString("#4c97ff"),
      secondary: Color.fromString("#4280d7"),
      tertiary: Color.fromString("#3373cc"),
    },
    looks: {
      primary: Color.fromString("#9966ff"),
      secondary: Color.fromString("#855cd6"),
      tertiary: Color.fromString("#774dcb"),
    },
    sound: {
      primary: Color.fromString("#cf63cf"),
      secondary: Color.fromString("#c94fc9"),
      tertiary: Color.fromString("#bd42bd"),
    },
    control: {
      primary: Color.fromString("#ffab19"),
      secondary: Color.fromString("#ec9c13"),
      tertiary: Color.fromString("#cf8b17"),
    },
    events: {
      primary: Color.fromString("#ffbf00"),
      secondary: Color.fromString("#e6ac00"),
      tertiary: Color.fromString("#cc9900"),
    },
    sensing: {
      primary: Color.fromString("#5cb1d6"),
      secondary: Color.fromString("#47a8d1"),
      tertiary: Color.fromString("#2e8eb8"),
    },
    operators: {
      primary: Color.fromString("#59c059"),
      secondary: Color.fromString("#46b946"),
      tertiary: Color.fromString("#389438"),
    },
    variables: {
      primary: Color.fromString("#ff8c1a"),
      secondary: Color.fromString("#ff8000"),
      tertiary: Color.fromString("#db6e00"),
    },
    lists: {
      primary: Color.fromString("#ff661a"),
      secondary: Color.fromString("#ff5500"),
      tertiary: Color.fromString("#e64d00"),
    },
    custom: {
      primary: Color.fromString("#ff6680"),
      secondary: Color.fromString("#ff4d6a"),
      tertiary: Color.fromString("#ff3355"),
    },
    extension: {
      primary: Color.fromString("#0fbd8c"),
      secondary: Color.fromString("#0da57a"),
      tertiary: Color.fromString("#0b8e69"),
    },
    obsolete: {
      primary: Color.fromString("#ed4242"),
      secondary: Color.fromString("#db3333"),
      tertiary: Color.fromString("#ca2b2b"),
    },
    other: {
      primary: Color.fromString("#bfbfbf"),
      secondary: Color.fromString("#b2b2b2"),
      tertiary: Color.fromString("#909090"),
    },
  }

  static highContrastCategories = {
    motion: {
      primary: Color.fromString("#80b5ff"),
      secondary: Color.fromString("#b3d2ff"),
      tertiary: Color.fromString("#3373cc"),
    },
    looks: {
      primary: Color.fromString("#ccb3ff"),
      secondary: Color.fromString("#ddccff"),
      tertiary: Color.fromString("#774dcb"),
    },
    sound: {
      primary: Color.fromString("#e19de1"),
      secondary: Color.fromString("#ffb3ff"),
      tertiary: Color.fromString("#bd42bd"),
    },
    control: {
      primary: Color.fromString("#ffbe4c"),
      secondary: Color.fromString("#ffda99"),
      tertiary: Color.fromString("#cf8b17"),
    },
    events: {
      primary: Color.fromString("#ffd966"),
      secondary: Color.fromString("#ffecb3"),
      tertiary: Color.fromString("#cc9900"),
    },
    sensing: {
      primary: Color.fromString("#85c4e0"),
      secondary: Color.fromString("#aed8ea"),
      tertiary: Color.fromString("#2e8eb8"),
    },
    operators: {
      primary: Color.fromString("#7ece7e"),
      secondary: Color.fromString("#b5e3b5"),
      tertiary: Color.fromString("#389438"),
    },
    variables: {
      primary: Color.fromString("#ffa54c"),
      secondary: Color.fromString("#ffcc99"),
      tertiary: Color.fromString("#db6e00"),
    },
    lists: {
      primary: Color.fromString("#ff9966"),
      secondary: Color.fromString("#ffcab0"),
      tertiary: Color.fromString("#e64d00"),
    },
    custom: {
      primary: Color.fromString("#ff99aa"),
      secondary: Color.fromString("#ffccd5"),
      tertiary: Color.fromString("#e64d00"),
    },
    extension: {
      primary: Color.fromString("#13ecaf"),
      secondary: Color.fromString("#75f0cd"),
      tertiary: Color.fromString("#0b8e69"),
    },
    /* Manually picked to be readable on black text */
    obsolete: {
      primary: Color.fromString("#fc6666"),
      secondary: Color.fromString("#fcb0b0"),
      tertiary: Color.fromString("#d32121"),
    },
    other: {
      primary: Color.fromString("#bfbfbf"),
      secondary: Color.fromString("#b2b2b2"),
      /* Changed to be AAA against #000000, was AA */
      tertiary: Color.fromString("#959595"),
    },
  }

  static categoryColor(category, isHighContrast) {
    let categories = Style.categories
    if (isHighContrast) {
      categories = Style.highContrastCategories
    }

    let color = categories[category]
      ? categories[category]
      : categories.obsolete

    return {
      ...color,
      makeZebra: function (isHighContrast) {
        let color = { ...this }
        if (isHighContrast) {
          color.primary = color.primary.darker(10)
          color.secondary = color.secondary.darker(10)
          color.tertiary = color.tertiary.darker(10)
        } else {
          color.primary = color.primary.lighter(30)
          color.secondary = color.secondary.lighter(30)
          color.tertiary = color.tertiary.lighter(30)
        }

        return color
      },
    }
  }

  static makeCommonIcons() {
    return [
      SVG.setProps(
        SVG.group([
          SVG.el("path", {
            d: "M20.8 3.7c-.4-.2-.9-.1-1.2.2-2 1.6-4.8 1.6-6.8 0-2.3-1.9-5.6-2.3-8.3-1v-.4c0-.6-.5-1-1-1s-1 .4-1 1v18.8c0 .5.5 1 1 1h.1c.5 0 1-.5 1-1v-6.4c1-.7 2.1-1.2 3.4-1.3 1.2 0 2.4.4 3.4 1.2 2.9 2.3 7 2.3 9.8 0 .3-.2.4-.5.4-.9V4.7c0-.5-.3-.9-.8-1zm-.3 10.2C18 16 14.4 16 11.9 14c-1.1-.9-2.5-1.4-4-1.4-1.2.1-2.3.5-3.4 1.1V4c2.5-1.4 5.5-1.1 7.7.6 2.4 1.9 5.7 1.9 8.1 0h.2l.1.1-.1 9.2z",
            fill: "#45993d",
          }),
          SVG.el("path", {
            d: "M20.6 4.8l-.1 9.1v.1c-2.5 2-6.1 2-8.6 0-1.1-.9-2.5-1.4-4-1.4-1.2.1-2.3.5-3.4 1.1V4c2.5-1.4 5.5-1.1 7.7.6 2.4 1.9 5.7 1.9 8.1 0h.2c0 .1.1.1.1.2z",
          }),
        ]),
        {
          id: "sb3-greenFlag",
        },
      ),

      SVG.setProps(
        SVG.el("polygon", {
          points:
            "6.6,0.5 13.12,0.5 19.5,6.6 19.5,13.12 13.12,19.5 6.6,19.5 0.5,13.12 0.5,6.6 ",
          stroke: "#b84848",
          "stroke-linejoin": "round",
          "stroke-linecap": "round",
        }),
        {
          id: "sb3-stopSign",
        },
      ),

      SVG.el("path", {
        d: "M 0 0 L 6 6 L 0 12 Z",
        id: "sb3-addInput",
      }),
      SVG.el("path", {
        d: "M 0 6 L 6 0 L 6 12 Z",
        id: "sb3-delInput",
      }),
      SVG.setProps(
        SVG.el("path", {
          d: `M 2.4000000000000004 1.2000000000000002 A 1.2000000000000002 1.2000000000000002 0 1 1 2.39999940000005 1.1988000001999994 Z
              M 2.4000000000000004 6.000000000000001 A 1.2000000000000002 1.2000000000000002 0 1 1 2.39999940000005 5.9988000002 Z
              M 2.4000000000000004 10.8 A 1.2000000000000002 1.2000000000000002 0 1 1 2.39999940000005 10.7988000002 Z`,
        }),
        {
          id: "sb3-verticalEllipsis",
        },
      ),

      SVG.setProps(
        SVG.group([
          SVG.el("rect", {
            x: "0",
            y: "0",
            width: "14.4",
            height: "18",
            fill: "white",
          }),
          SVG.group([
            SVG.el("rect", {
              x: "1.8",
              y: "1.8",
              width: "10.8",
              height: "3.6",
              fill: "#ff8c00",
            }),
            SVG.el("rect", {
              x: "1.8",
              y: "7.2",
              width: "10.8",
              height: "3.6",
              fill: "#ff8c00",
            }),
            SVG.el("rect", {
              x: "1.8",
              y: "12.600000000000001",
              width: "10.8",
              height: "3.6",
              fill: "#ff8c00",
            }),
          ]),
        ]),
        {
          id: "sb3-list",
        },
      ),
      SVG.setProps(
        SVG.el("circle", {
          r: 6,
          cx: 6,
          cy: 5,
        }),
        {
          id: "sb3-circleSolid",
        },
      ),
      SVG.setProps(
        SVG.el("circle", {
          r: 6,
          cx: 6,
          cy: 5,
        }),
        {
          id: "sb3-circle",
          fill: "none",
          "stroke-width": 1,
        },
      ),
      SVG.text(0, 0, "+", {
        id: "sb3-plusSign",
        style: `font-size: 18pt;
                font-family: sans-serif;`,
        fill: "#2d2d2d",
      }),

      SVG.el("image", {
        id: "sb3-microbitBlock",
        width: "40px",
        height: "40px",
        href: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAABQCAMAAAC5zwKfAAACmlBMVEUAAAArKysrIB8lJCNBRlY2O0U9X48sKCvOoBQzKzMnJyfrswi/xdDRoxN2dnbToxPosgnmsAq/lxo6MSq0kCLOoRXKnhbEmhc7LRooJCTcqQ7OoBXstAjpsgi9lhuvjCCPdSd4Zyg2NjZMi+Slhyq8lR5CR1fZqBG+lh3ttQjFnBnLnhbDmhqZore3kh5ARlW2kR6qiCGcfyU6QEtyYyd4ZSDSoxOGdDedgizLnhfgrA25kx9YXWqbgCxMUWDfqwzcqg/VphBBR1ecpLmcgSzHmxijq77BmRprYkOOlKZARlVGdbabo7m3kRxGcrKwjB9ARVSIjaCZobuVeyahgh+VdyE8XIOLayBIOydBR1f/vwBMl//m5+g+Q1JlanY6P0uCiJjj5OU9QVBARVQ/RFP9vgBFZpjk5ebwtgbzuAR0eotARlZITl3d3+KNlKRQVmRNUmGxs7mRlJtUW2nLnhfInRfpsQn1uQS/wsa0t7qlp62doKeKjpeBg41YXmxCSlvGyMtHb6xCUGlCTGBJgdJDSFVobXlMlPhLhtq/wchIesFGbqpDVXRXXGxCTGNiXEe+lh1LjuzP0dRJg9RIfslJfMW9v8RGbKRFY5Jzd4NdYm88QE1+bjrQpCHQohTxtwVLkPDa3OHd3t9If826vMCusLZHcrGIj6F6gpaDho9ESlpITFOQeTLcqhnEmhnqsw34uwVKkfNNhdi6vMRLUWBPUFC7lzDWpx31uQjutQj6vAP5+frZ29zZ2dvW2NtHc7JGbKVFaJx/hpl/hpdxd4hzd4JDWHpDUm5UWWiZhEh3aT6WfC/EnSqtiyW/lxzBmRpKi+VQgMhRermqq7BSdrCLjpVEXYVEW4A/SFtOT1BaV0pxZUCpjT2xkTcYNOUYAAAAWXRSTlMADBgV5DRLEdcIE+3Z2QLt6unOI/zp1dEcDf7z7eu9qVtFBPv7+/fx7u3p3NnOzcq0lXZENzD6+fj39vTm5uXk4t3c2tbS0c/NvrCopKKcm4yLbGpiTUA3JzDAPbYAAAQqSURBVFjD7dX1fxJhHMDxE+MIRRFrdnd3d3fr9ziwhsVsmC2K6HRTtzlb0ens2uzu7m79X3z4HufdwTNvj/qbfPYaPDe+vMf23AEXL168/6bBTfoWx5r0GskxVMhsoDfg3Lb12LlzIwz0zKZYzzy0lkPVKtXdutXw++o2a5UQ7SUMcqibGpA8kD09slX0azRkazwISB5Inn4D+ShwrNYjIHpQQA96mqPAYlqPgOhBAT0oUpgGyh6C6EHYWz11e7jbO9hAxUMQPezR6+wtW0nBlJzV7CB62nIyN/mB5H/ouM0G0j3ITIXsAMDUVMjcygbSPQgqrzCNDaR7sCEzO2cLKSvlLNP/ED1qgbRbh0m37viBAUSPvU/BYFZWcAMFRI+9HW/fOFLSgAaixw6erZWS5qeBVG+XKwlghWsuwALXHIA5rgUAc10r1KADvViwKNDaLO4EWCQuA5gnLgVYKs4DWCYuUoPoFRhcKa4FWCwuB1gizgeYLy4BWC4uBqWPq9Cjg55EJ5bogUi7J0wBmDwhMXzjBHBOmAyQSG4wnPd4cJ4Kejbem4gdTQL9NPN00Hlk0jRs//0p+puinaeDs0XxwMFtk8RZM6fob4pmPl/wxtqkOcemIai7Kco8HTx/88Ns8dBxgMcrEdTfFKcyP/9m1xhwwbV30sBGCdTPqczPu9Y5BoTzZODAg6S5kT9Zf1PU8+fz25TrTJuizOd32kjtL9CmaOfpJ/Zd5UTV3RTtfP6X3mfl0tNNuVSpILYp5xHL25ccFUQv9cwGhrcvPZB4jgiovyn6IHrrZFB/U/RBf6rD8f4sgqzRwTtZQfKZGPiXm4Kxb8rff6awgf9sU5jTB9O79G63BqTW1C5baQ9geNSwvnIEJ8s2PCkPXqhTtlM6HUxvWpiv3h6kyozmDY2egnzUkjc3/3X0bAjPt3gW+VWVxvFtSn6hgi9acxzfeI001yiBs46pI7/AkjzHVSgjg5XIkwvXB+xbcxNnGraHCmZUr8nxJS/g3AlC1KzujQgnOpo5axufDFasYLUa2gK2p2ohzlTtJB2sV6NCNSECCtUq1Kj3CxSq2luXlY8gufF4e9PkCLiwpWFULg38+qKiILgFYe9Lr++07zSur4SXr7zeV5Gj0z5vxt69GVcFt1vI874kS6/0pDIZsWB6crLgzhNI+wRhOrm7Sr5n4HIhWeW5yRJ/EBYuS4+5yUN5Vy9fuewT6GDouQq8qAFDITX4/XmuDF788eTJRQpoD4PTT6nAXA14KVcNhshgBDx16VTokk9oZo4Czf0JiEkgpoCYApJkEPMJwxOiQFONDn8DlrRbuWjRXrWEzWKzlOhnLNfHWN5S2Va5cndjufLG8uWMpRs0sFmqdMNliRKlS1nIlw2Xxh5kWaVKC0NNLiarqdAfZ+LixYsX77f9BFJt17cXqnnkAAAAAElFTkSuQmCC",
      }),
      SVG.setProps(
        SVG.group([
          SVG.el("path", {
            d: "M23.513 11.17h-.73c-.319 0-.576.213-.576.478v1.08h1.882v-1.08c0-.265-.258-.479-.576-.479",
            fill: "#7C87A5",
          }),
          SVG.el("path", {
            d: "M24.91 11.17h-.73c-.319 0-.576.213-.576.478v1.08h1.882v-1.08c0-.265-.258-.479-.576-.479z",
          }),
          SVG.el("path", {
            d: "M9.54 11.17h-.728c-.32 0-.576.213-.576.478v1.08h1.882v-1.08c0-.265-.257-.479-.577-.479",
            fill: "#7C87A5",
          }),
          SVG.el("path", {
            d: "M10.938 11.17h-.729c-.32 0-.576.213-.576.478v1.08h1.882v-1.08c0-.265-.257-.479-.577-.479z",
          }),
          SVG.el("path", {
            d: "M26.305 11.17h-.73c-.318 0-.574.213-.574.478v1.08h1.882v-1.08c0-.265-.26-.479-.578-.479",
            fill: "#7C87A5",
          }),
          SVG.el("path", {
            d: "M27.702 11.17h-.73c-.318 0-.574.213-.574.478v1.08h1.882v-1.08c0-.265-.26-.479-.578-.479z",
          }),
          SVG.el("path", {
            d: "M29.101 11.17h-.73c-.318 0-.576.213-.576.478v1.08h1.882v-1.08c0-.265-.258-.479-.576-.479",
            fill: "#7C87A5",
          }),
          SVG.el("path", {
            d: "M30.498 11.17h-.73c-.318 0-.576.213-.576.478v1.08h1.882v-1.08c0-.265-.258-.479-.576-.479z",
          }),
          SVG.el("path", {
            d: "M17.925 11.17h-.73c-.319 0-.577.213-.577.478v1.08h1.883v-1.08c0-.265-.258-.479-.576-.479",
            fill: "#7C87A5",
          }),
          SVG.el("path", {
            d: "M19.322 11.17h-.73c-.319 0-.577.213-.577.478v1.08h1.883v-1.08c0-.265-.258-.479-.576-.479z",
          }),
          SVG.el("path", {
            d: "M20.717 11.17h-.73c-.319 0-.575.213-.575.478v1.08h1.883v-1.08c0-.265-.26-.479-.578-.479",
            fill: "#7C87A5",
          }),
          SVG.el("path", {
            d: "M22.114 11.17h-.73c-.319 0-.575.213-.575.478v1.08h1.883v-1.08c0-.265-.26-.479-.578-.479z",
          }),
          SVG.el("path", {
            d: "M15.129 11.17H14.4c-.32 0-.576.213-.576.478v1.08h1.883v-1.08c0-.265-.258-.479-.578-.479",
            fill: "#7C87A5",
          }),
          SVG.el("path", {
            d: "M16.526 11.17h-.729c-.32 0-.576.213-.576.478v1.08h1.883v-1.08c0-.265-.258-.479-.578-.479z",
          }),
          SVG.el("path", {
            d: "M12.335 11.17h-.73c-.319 0-.575.213-.575.478v1.08h1.882v-1.08c0-.265-.26-.479-.577-.479",
            fill: "#7C87A5",
          }),
          SVG.el("path", {
            d: "M13.732 11.17h-.73c-.319 0-.575.213-.575.478v1.08h1.883v-1.08c0-.265-.26-.479-.578-.479z",
          }),
          SVG.el("path", {
            d: "M31.893 11.17h-.73c-.318 0-.574.213-.574.478v1.08h1.882v-1.08c0-.265-.26-.479-.578-.479",
            fill: "#7C87A5",
          }),
          SVG.el("path", {
            d: "M33.29 11.17h-.73c-.318 0-.574.213-.574.478v1.08h1.882v-1.08c0-.265-.26-.479-.578-.479z",
          }),
          SVG.el("path", {
            d: "M33.647 28.407H15.765V12.533h17.882c.52 0 .941.445.941.992v13.89c0 .547-.421.992-.94.992",
            fill: "#FFF",
          }),
          SVG.el("path", {
            d: "M33.647 28.407H15.765V12.533h17.882c.52 0 .941.445.941.992v13.89c0 .547-.421.992-.94.992z",
            stroke: "#7C87A5",
            "stroke-width": ".893",
          }),
          SVG.el("path", {
            d: "M15.765 28.407H5.412c-.52 0-.941-.445-.941-.993V16.502c0-2.19 1.686-3.969 3.764-3.969h15.06-3.766c-2.078 0-3.764 1.778-3.764 3.969v11.905z",
            fill: "#FFF",
          }),
          SVG.el("path", {
            d: "M15.765 28.407H5.412c-.52 0-.941-.445-.941-.993V16.502c0-2.19 1.686-3.969 3.764-3.969h15.06-3.766c-2.078 0-3.764 1.778-3.764 3.969v11.905z",
            stroke: "#7C87A5",
            "stroke-width": ".893",
          }),
          SVG.el("path", {
            d: "M12.941 12.533H11.06c-1.559 0-2.824 1.334-2.824 2.977v1.986c0 .547.422.992.941.992H12c.52 0 .941-.445.941-.992V15.51c0-1.643 1.265-2.977 2.824-2.977h.94-3.764z",
            fill: "#4C97FF",
          }),
          SVG.el("path", {
            d: "M12.941 12.533H11.06c-1.559 0-2.824 1.334-2.824 2.977v1.986c0 .547.422.992.941.992H12c.52 0 .941-.445.941-.992V15.51c0-1.643 1.265-2.977 2.824-2.977h.94-3.764z",
            stroke: "#3D79CC",
            "stroke-width": ".893",
          }),
          SVG.el("path", {
            stroke: "#7C87A5",
            "stroke-width": ".893",
            d: "M4.47 20.474h27.961l2.157 2.974",
          }),
          SVG.el("path", {
            d: "M15.765 28.407H5.412c-.52 0-.941-.445-.941-.993V16.502c0-2.19 1.686-3.969 3.764-3.969h15.06-3.766c-2.078 0-3.764 1.778-3.764 3.969v11.905z",
            stroke: "#7C87A5",
            "stroke-width": ".893",
          }),
          SVG.el("path", {
            d: "M21.307 18.964h-.73c-.319 0-.576.214-.576.479v1.08h1.882v-1.08c0-.265-.258-.479-.576-.479",
            fill: "#7C87A5",
          }),
          SVG.el("path", {
            d: "M21.307 18.964h-.73c-.319 0-.576.214-.576.479v1.08h1.882v-1.08c0-.265-.258-.479-.576-.479z",
          }),
          SVG.el("path", {
            d: "M24.178 18.964h-.728c-.32 0-.576.214-.576.479v1.08h1.882v-1.08c0-.265-.258-.479-.578-.479",
            fill: "#7C87A5",
          }),
          SVG.el("path", {
            d: "M24.178 18.964h-.728c-.32 0-.576.214-.576.479v1.08h1.882v-1.08c0-.265-.258-.479-.578-.479z",
          }),
          SVG.el("path", {
            d: "M27.051 18.964h-.73c-.318 0-.576.214-.576.479v1.08h1.882v-1.08c0-.265-.257-.479-.576-.479",
            fill: "#7C87A5",
          }),
          SVG.el("path", {
            d: "M27.051 18.964h-.73c-.318 0-.576.214-.576.479v1.08h1.882v-1.08c0-.265-.257-.479-.576-.479z",
          }),
          SVG.el("path", {
            d: "M29.923 18.964h-.729c-.32 0-.576.214-.576.479v1.08h1.883v-1.08c0-.265-.258-.479-.578-.479",
            fill: "#7C87A5",
          }),
          SVG.el("path", {
            d: "M29.923 18.964h-.729c-.32 0-.576.214-.576.479v1.08h1.883v-1.08c0-.265-.258-.479-.578-.479z",
          }),
          SVG.el("path", {
            d: "M33.647 28.407H15.765V20.47H32.43l2.157 2.978v3.966c0 .548-.421.993-.94.993",
            fill: "#E6E7E8",
          }),
          SVG.el("path", {
            d: "M33.647 28.407H15.765V20.47H32.43l2.157 2.978v3.966c0 .548-.421.993-.94.993z",
            stroke: "#7C87A5",
            "stroke-width": ".893",
          }),
          SVG.el("path", {
            d: "M15.765 28.407H5.412c-.52 0-.941-.445-.941-.993V20.47h11.294v7.937z",
            fill: "#E6E7E8",
          }),
          SVG.el("path", {
            d: "M15.765 28.407H5.412c-.52 0-.941-.445-.941-.993V20.47h11.294v7.937z",
            stroke: "#7C87A5",
            "stroke-width": ".893",
          }),
          SVG.el("path", {
            fill: "#E6E7E8",
            d: "M19.53 24.438h11.294V20.47H19.529z",
          }),
          SVG.el("path", {
            stroke: "#7C87A5",
            "stroke-width": ".893",
            d: "M19.53 24.438h11.294V20.47H19.529zm12.902-3.964l2.157-2.794",
          }),
        ]),
        {
          id: "sb3-wedoBlock",
          fill: "none",
        },
      ),

      SVG.setProps(
        SVG.group([
          SVG.el("rect", {
            stroke: "#7C87A5",
            fill: "#FFF",
            x: ".5",
            y: "3.59",
            width: "28",
            height: "25.81",
            rx: "1",
          }),
          SVG.el("rect", {
            stroke: "#7C87A5",
            fill: "#E6E7E8",
            x: "2.5",
            y: ".5",
            width: "24",
            height: "32",
            rx: "1",
          }),
          SVG.el("path", {
            stroke: "#7C87A5",
            fill: "#FFF",
            d: "M2.5 14.5h24v13h-24z",
          }),
          SVG.el("path", {
            d: "M14.5 10.5v4",
            stroke: "#7C87A5",
            fill: "#E6E7E8",
          }),
          SVG.el("rect", {
            fill: "#414757",
            x: "4.5",
            y: "2.5",
            width: "20",
            height: "10",
            rx: "1",
          }),
          SVG.el("rect", {
            fill: "#7C87A5",
            opacity: ".5",
            x: "13.5",
            y: "20.13",
            width: "2",
            height: "2",
            rx: ".5",
          }),
          SVG.el("path", {
            d: "M9.06 20.13h1.5a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1.5a1 1 0 0 1 0-2zM19.93 22.13h-1.51a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h1.5a1 1 0 0 1 .01 2zM8.23 17.5H5a.5.5 0 0 1-.5-.5v-2.5h6l-1.85 2.78a.51.51 0 0 1-.42.22zM18.15 18.85l-.5.5a.49.49 0 0 0-.15.36V20a.5.5 0 0 1-.5.5h-.5a.5.5 0 0 1-.5-.5.5.5 0 0 0-.5-.5h-2a.5.5 0 0 0-.5.5.5.5 0 0 1-.5.5H12a.5.5 0 0 1-.5-.5v-.29a.49.49 0 0 0-.15-.36l-.5-.5a.51.51 0 0 1 0-.71l1.51-1.49a.47.47 0 0 1 .35-.15h3.58a.47.47 0 0 1 .35.15l1.51 1.49a.51.51 0 0 1 0 .71zM10.85 23.45l.5-.5a.49.49 0 0 0 .15-.36v-.29a.5.5 0 0 1 .5-.5h.5a.5.5 0 0 1 .5.5.5.5 0 0 0 .5.5h2a.5.5 0 0 0 .5-.5.5.5 0 0 1 .5-.5h.5a.5.5 0 0 1 .5.5v.29a.49.49 0 0 0 .15.36l.5.5a.5.5 0 0 1 0 .7l-1.51 1.5a.47.47 0 0 1-.35.15h-3.58a.47.47 0 0 1-.35-.15l-1.51-1.5a.5.5 0 0 1 0-.7z",
            fill: "#7C87A5",
            opacity: ".5",
          }),
          SVG.el("path", {
            d: "M21.5 27.5h5v4a1 1 0 0 1-1 1h-4v-5z",
            stroke: "#CC4C23",
            fill: "#F15A29",
          }),
        ]),
        {
          transform: "translate(5.5 3.5)",
          id: "sb3-ev3Block",
        },
      ),

      SVG.setProps(
        SVG.group([
          SVG.el("path", {
            d: "M35 28H5a1 1 0 0 1-1-1V12c0-.6.4-1 1-1h30c.5 0 1 .4 1 1v15c0 .5-.5 1-1 1z",
            fill: "#fff",
          }),
          SVG.el("path", {
            fill: "red",
            d: "M4 25h32v2.7H4zm9-1h-2.2a1 1 0 0 1-1-1v-9.7c0-.6.4-1 1-1H13c.6 0 1 .4 1 1V23c0 .6-.5 1-1 1z",
          }),
          SVG.el("path", {
            fill: "red",
            d: "M6.1 19.3v-2.2c0-.5.4-1 1-1h9.7c.5 0 1 .5 1 1v2.2c0 .5-.5 1-1 1H7.1a1 1 0 0 1-1-1z",
          }),
          SVG.el("circle", { fill: "red", cx: "22.8", cy: "18.2", r: "3.4" }),
          SVG.el("circle", { fill: "red", cx: "30.6", cy: "18.2", r: "3.4" }),
          SVG.el("path", { fill: "red", d: "M4.2 27h31.9v.7H4.2z" }),
          SVG.el("circle", {
            fill: "#e0e0e0",
            cx: "22.8",
            cy: "18.2",
            r: "2.3",
          }),
          SVG.el("circle", {
            fill: "#e0e0e0",
            cx: "30.6",
            cy: "18.2",
            r: "2.3",
          }),
          SVG.el("path", {
            fill: "#e0e0e0",
            d: "M12.5 22.9h-1.2c-.3 0-.5-.2-.5-.5V14c0-.3.2-.5.5-.5h1.2c.3 0 .5.2.5.5v8.4c0 .3-.2.5-.5.5z",
          }),
          SVG.el("path", {
            fill: "#e0e0e0",
            d: "M7.2 18.7v-1.2c0-.3.2-.5.5-.5h8.4c.3 0 .5.2.5.5v1.2c0 .3-.2.5-.5.5H7.7c-.3 0-.5-.2-.5-.5zM4 26h32v2H4z",
          }),
          SVG.el("path", {
            stroke: "#666",
            "stroke-width": ".5",
            d: "M35.2 27.9H4.8a1 1 0 0 1-1-1V12.1c0-.6.5-1 1-1h30.5c.5 0 1 .4 1 1V27a1 1 0 0 1-1.1.9z",
          }),
          SVG.el("path", {
            stroke: "#666",
            "stroke-width": ".5",
            d: "M35.2 27.9H4.8a1 1 0 0 1-1-1V12.1c0-.6.5-1 1-1h30.5c.5 0 1 .4 1 1V27a1 1 0 0 1-1.1.9z",
          }),
        ]),
        {
          id: "sb3-makeymakeyBlock",
          fill: "none",
        },
      ),
      SVG.el("image", {
        id: "sb3-gdxforBlock",
        width: "40px",
        height: "40px",
        href: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAABQCAMAAAC5zwKfAAABAlBMVEUAAAABAQEAAAB9h6YAAAAAAAAAAAB8iKZ7iKaAjKvm5+h+iqhcXFxGR0d8iKbj5OV9iKZ8h6be3+Db3d19h6acnJ0AAAB7nrDh4uPh4uN9iabZ2tt9iKbX19nJycnExsZ8iKe+wMC7vL2Eka/g4ePU1dV8iKZ9iKZ9iKd+iKitra2RkZGLjo5wcHCLi7l0oqJV//9csdZ8h6WFkq//vwDm5+iEka79vgJ6iql9iaaHk6tgq9Btm71+iadmo8dzk7OCj6yAjKp/iqhiqc1qnsB4jKtgrNFwl7d1tLTgtCxpocN0krJ2j65ossWNtZSbt4LAulHWsDnasTTuvhXzvg9zk7TzqAfaAAAAMXRSTlMAJiLoFBwI8q4a+0c4M/nr3tnQwKxYDAnk2726tbGMh4J9dinXq56ddG9nT01ACwsDk/+seAAAAidJREFUWMPt2Olu2kAUhuE5NvuaBAhZm7TpvufgMXaBbmAghOzp/d9KD7RW6yaqPeL7YVV9/471aBgfCXnUH7ULNhtkF96qv1dgwwoxoM08cDsJcwfMdgwonoiJPRFjQXkscQM3Adhxk4NuJwkoDx0nSp5NDTiae958NEaBwzkvC4YYcOxx7fCoeJhnrwcBv7H9TklFm08R4JD5SEkiMg8B4IjXwsV1HgHAPu+EizsQcMbr2B0OufZz7X0NcIZSwC9+rD3nADI2/fCtrHEfAvZ8Liqp6PuIwZZO+ZmSnspcY8AZ55WU5xkElDwuK1Vm7xgFTjhfLud5AgPHAUvBGARKvYnnTXpp/gvAg9PLyykSPLt1nNszIHjuSOdAcNp1nO4UeYYXNzcX0UH62P+0AnjH8lgCgL8s/+uXzwZgrOV2JAMwxpIMwRjLHIyxzMEYyxyMWgAwYiHAzm99iLQ6eOJEul4d7Ea6WhG8W7rAE+fertHgVXp+clpB9Oet64M/wH2TKwI/FrRFTH6JIZ6NvmZpxoDtptlFULOtzGPWy+4/r//gvwKGgcC90NtTqIg2dIuyClaWDvTjKlDMLba4UaUMcIuVbd0gyiGwjGVlFuKWfkQZhEfSQnypd8mCvOHGvkA5quo6EQSs6yrlNumN3obs0KKGHJ70QD+hLOQMW7r0sFI5KJVeY+bGkr1JopKlEG0StXbrW/uvQGMookXLLPFAZYTMJju/7z6rRW1MZcnIAAAAAElFTkSuQmCC",
      }),
      SVG.el("image", {
        id: "sb3-boostBlock",
        width: "40px",
        height: "40px",
        href: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAABQBAMAAAB8P++eAAAAKlBMVEUAAAD///98h6Xm5+iVnrb/Zhq+w9L5hk73+Pnf4eSQmbLr7Ozo39vp184hSCf6AAAAAXRSTlMAQObYZgAAAOFJREFUSMftlDEOgjAUhonhAi1sLvIk7NDJDTYu0LhzBzcXruHoDTyFB/BCNi30KU3InzioSb++hAS+vPfKa5pEIpHvk7a8gpf8ISWINtlg4i7ZFOKVTBlqsUR+ItYZJG7VzQQgMqGYd7zWRArpULEAe5Q/J9JMj4rluC7uleNw7TFRXcoREDnlinjX57eUsvRTn8+AE0/6OKV0g5buYTTyWFFr/XAp3aDzed4yFJWnKbhPbtaXXohDNYlDJWz4zSxEokkkEjb496AiVtqAbIYgYNGWBmhgES+NX6SRSORfeAJMWajr95DdqQAAAABJRU5ErkJggg==",
      }),
    ]
  }
  static makeOriginalIcons() {
    return [
      ...Style.makeCommonIcons(),
      SVG.setProps(
        SVG.group([
          SVG.el("path", {
            d: "M12.71 2.44A2.41 2.41 0 0 1 12 4.16L8.08 8.08a2.45 2.45 0 0 1-3.45 0L.72 4.16A2.42 2.42 0 0 1 0 2.44 2.48 2.48 0 0 1 .71.71C1 .47 1.43 0 6.36 0s5.39.46 5.64.71a2.44 2.44 0 0 1 .71 1.73z",
            fill: "#231f20",
            opacity: ".1",
          }),
          SVG.el("path", {
            d: "M6.36 7.79a1.43 1.43 0 0 1-1-.42L1.42 3.45a1.44 1.44 0 0 1 0-2c.56-.56 9.31-.56 9.87 0a1.44 1.44 0 0 1 0 2L7.37 7.37a1.43 1.43 0 0 1-1.01.42z",
            fill: "#fff",
          }),
        ]),
        {
          id: "sb3-dropdownArrow",
          transform: "scale(0.944)",
        },
      ),

      SVG.setProps(
        SVG.group([
          SVG.el("path", {
            d: "M22.68 12.2a1.6 1.6 0 0 1-1.27.63h-7.69a1.59 1.59 0 0 1-1.16-2.58l1.12-1.41a4.82 4.82 0 0 0-3.14-.77 4.31 4.31 0 0 0-2 .8A4.25 4.25 0 0 0 7.2 10.6a5.06 5.06 0 0 0 .54 4.62A5.58 5.58 0 0 0 12 17.74a2.26 2.26 0 0 1-.16 4.52A10.25 10.25 0 0 1 3.74 18a10.14 10.14 0 0 1-1.49-9.22 9.7 9.7 0 0 1 2.83-4.14A9.92 9.92 0 0 1 9.66 2.5a10.66 10.66 0 0 1 7.72 1.68l1.08-1.35a1.57 1.57 0 0 1 1.24-.6 1.6 1.6 0 0 1 1.54 1.21l1.7 7.37a1.57 1.57 0 0 1-.26 1.39z",
            fill: "#3d79cc",
          }),
          SVG.el("path", {
            d: "M21.38 11.83h-7.61a.59.59 0 0 1-.43-1l1.75-2.19a5.9 5.9 0 0 0-4.7-1.58 5.07 5.07 0 0 0-4.11 3.17A6 6 0 0 0 7 15.77a6.51 6.51 0 0 0 5 2.92 1.31 1.31 0 0 1-.08 2.62 9.3 9.3 0 0 1-7.35-3.82 9.16 9.16 0 0 1-1.4-8.37A8.51 8.51 0 0 1 5.71 5.4a8.76 8.76 0 0 1 4.11-1.92 9.71 9.71 0 0 1 7.75 2.07l1.67-2.1a.59.59 0 0 1 1 .21L22 11.08a.59.59 0 0 1-.62.75z",
          }),
        ]),
        {
          id: "sb3-turnRight",
        },
      ),

      SVG.setProps(
        SVG.group([
          SVG.el("path", {
            d: "M20.34 18.21a10.24 10.24 0 0 1-8.1 4.22 2.26 2.26 0 0 1-.16-4.52 5.58 5.58 0 0 0 4.25-2.53 5.06 5.06 0 0 0 .54-4.62A4.25 4.25 0 0 0 15.55 9a4.31 4.31 0 0 0-2-.8 4.82 4.82 0 0 0-3.15.8l1.12 1.41A1.59 1.59 0 0 1 10.36 13H2.67a1.56 1.56 0 0 1-1.26-.63A1.54 1.54 0 0 1 1.13 11l1.72-7.43A1.59 1.59 0 0 1 4.38 2.4a1.57 1.57 0 0 1 1.24.6L6.7 4.35a10.66 10.66 0 0 1 7.72-1.68A9.88 9.88 0 0 1 19 4.81 9.61 9.61 0 0 1 21.83 9a10.08 10.08 0 0 1-1.49 9.21z",
            fill: "#3d79cc",
          }),
          SVG.el("path", {
            d: "M19.56 17.65a9.29 9.29 0 0 1-7.35 3.83 1.31 1.31 0 0 1-.08-2.62 6.53 6.53 0 0 0 5-2.92 6.05 6.05 0 0 0 .67-5.51 5.32 5.32 0 0 0-1.64-2.16 5.21 5.21 0 0 0-2.48-1A5.86 5.86 0 0 0 9 8.84L10.74 11a.59.59 0 0 1-.43 1H2.7a.6.6 0 0 1-.6-.75l1.71-7.42a.59.59 0 0 1 1-.21l1.67 2.1a9.71 9.71 0 0 1 7.75-2.07 8.84 8.84 0 0 1 4.12 1.92 8.68 8.68 0 0 1 2.54 3.72 9.14 9.14 0 0 1-1.33 8.36z",
          }),
        ]),
        {
          id: "sb3-turnLeft",
        },
      ),

      SVG.setProps(
        SVG.group([
          SVG.el("path", {
            d: "M 46.6 22 c -0.6 1.2 -1.8 2 -3 2 h -3.2 c -0.2 2.6 -1 5 -2.2 7.2 c -1.8 3.4 -4.6 6.4 -8.2 8.2 c -3.4 1.8 -7.2 2.4 -11 1.8 c -3.6 -0.6 -7 -2.2 -9.8 -4.6 c -1.4 -1.4 -1.4 -3.8 0 -5.2 c 1.2 -1.2 3.2 -1.4 4.6 -0.4 H 14 c 1.8 1.2 3.8 1.8 5.8 1.8 s 3.8 -0.6 5.4 -1.8 c 2.2 -1.6 3.6 -4.2 3.6 -7 h -3 c -1.8 0 -3.4 -1.4 -3.4 -3.4 c 0 -0.8 0.4 -1.8 1 -2.4 l 8.8 -8.8 c 1.4 -1.2 3.4 -1.2 4.8 0 L 46 18.4 c 1 1 1.2 2.4 0.6 3.6 z",
            fill: "#cf8b17",
          }),
          SVG.el("path", {
            d: "M 43.6 22 h -5.2 c 0 3 -0.6 5.8 -2 8.4 c -1.6 3.2 -4.2 5.6 -7.4 7.2 c -3 1.6 -6.6 2.2 -9.8 1.6 c -3.2 -0.4 -6.4 -2 -8.8 -4.2 c -0.8 -0.6 -0.8 -1.8 -0.2 -2.4 c 0.6 -0.8 1.8 -0.8 2.4 -0.2 c 2 1.4 4.4 2.2 6.8 2.2 s 4.6 -0.6 6.6 -2 c 1.8 -1.2 3.2 -3 4 -5.2 c 0.6 -1.8 0.8 -3.6 0.4 -5.6 h -4.8 c -0.8 0 -1.4 -0.6 -1.4 -1.4 c 0 -0.4 0.2 -0.6 0.4 -0.8 l 8.8 -8.8 c 0.6 -0.6 1.4 -0.6 1.8 0 L 44 19.6 c 0.6 0.6 0.8 1.2 0.6 1.8 s -0.6 0.6 -1 0.6 z",
          }),
        ]),
        {
          id: "sb3-loopArrow",
        },
      ),
      SVG.setProps(
        SVG.el("path", {
          d: "M 0 0 L 18 6 L 0 12 L 6 6 Z",
        }),
        {
          id: "sb3-turtle",
        },
      ),
      SVG.setProps(
        SVG.el("path", {
          d: "M 0 0 L 18 6 L 0 12 L 6 6 Z",
          fill: "none",
          "stroke-width": 1,
        }),
        {
          id: "sb3-turtleOutline",
        },
      ),
      SVG.setProps(
        SVG.group([
          SVG.el("rect", {
            width: (20 / 5) * 2,
            height: 20,
          }),
          SVG.el("rect", {
            width: (20 / 5) * 2,
            height: 20,
            x: (20 / 5) * 3,
          }),
        ]),
        {
          id: "sb3-pause",
        },
      ),

      SVG.setProps(
        SVG.el("path", {
          d: "M 4 0 L 0 4 L 3.2 4 L 0 8 L 3.2 8 L 0 12 L 9.6 6.6667 L 6.4 6.6667 L 9.6 2.6667 L 6.4 2.6667 L 9.6 0 Z",
        }),
        {
          id: "sb3-flash",
        },
      ),
      SVG.setProps(
        SVG.el("path", {
          d: `M 0.6 10 L 11.4 10 L 11.4 3 L 9 3 L 7.5 0.6 L 4.5 0.6 L 3 3 L 0.6 3 Z
          M 7.92 6 A 1.92 1.92 0 1 1 7.91999904000008 5.998080000319999 Z`,
        }),
        {
          id: "sb3-camera",
        },
      ),
      SVG.setProps(
        SVG.el("use", {
          href: "#sb3-musicBlock",
        }),
        {
          id: "sb3-notes",
        },
      ),

      SVG.setProps(
        SVG.el("path", {
          d: "M 0.6 6 L 6 0.6 L 11.4 6 L 7.8 6 L 7.8 11.4 L 4.2 11.4 L 4.2 6 Z",
        }),
        {
          id: "sb3-arrowUp",
        },
      ),
      SVG.setProps(
        SVG.el("path", {
          d: "M 0.6 6 L 6 0.6 L 11.4 6 L 7.8 6 L 7.8 11.4 L 4.2 11.4 L 4.2 6 Z",
          fill: "none",
        }),
        {
          id: "sb3-arrowUpOutline",
        },
      ),
      SVG.setProps(
        SVG.el("path", {
          d: "M 8 4 L 6 1.2 L 4 4 M 6 1.2 L 6 11.4",
          fill: "none",
        }),
        {
          id: "sb3-arrowUpThin",
        },
      ),
      SVG.setProps(
        SVG.el("use", {
          href: "#sb3-arrowUp",
          transform: "rotate(180 6 6)",
        }),
        {
          id: "sb3-arrowDown",
        },
      ),
      SVG.setProps(
        SVG.el("use", {
          href: "#sb3-arrowUpOutline",
          transform: "rotate(180 6 6)",
        }),
        {
          id: "sb3-arrowDownOutline",
        },
      ),
      SVG.setProps(
        SVG.el("use", {
          href: "#sb3-arrowUpThin",
          transform: "rotate(180 6 6)",
        }),
        {
          id: "sb3-arrowDownThin",
        },
      ),
      SVG.setProps(
        SVG.el("use", {
          href: "#sb3-arrowUp",
          transform: "rotate(-90 6 6)",
        }),
        {
          id: "sb3-arrowLeft",
        },
      ),
      SVG.setProps(
        SVG.el("use", {
          href: "#sb3-arrowUpOutline",
          transform: "rotate(-90 6 6)",
        }),
        {
          id: "sb3-arrowLeftOutline",
        },
      ),
      SVG.setProps(
        SVG.el("use", {
          href: "#sb3-arrowUpThin",
          transform: "rotate(-90 6 6)",
        }),
        {
          id: "sb3-arrowLeftThin",
        },
      ),
      SVG.setProps(
        SVG.el("use", {
          href: "#sb3-arrowUp",
          transform: "rotate(90 6 6)",
        }),
        {
          id: "sb3-arrowRight",
        },
      ),
      SVG.setProps(
        SVG.el("use", {
          href: "#sb3-arrowUpOutline",
          transform: "rotate(90 6 6)",
        }),
        {
          id: "sb3-arrowRightOutline",
        },
      ),
      SVG.setProps(
        SVG.el("use", {
          href: "#sb3-arrowUpThin",
          transform: "rotate(90 6 6)",
        }),
        {
          id: "sb3-arrowRightThin",
        },
      ),
      SVG.setProps(
        SVG.el("path", {
          d: "M 8 4 L 6 1.2 L 4 4 M 8 8 L 6 10.8 L 4 8 M 6 1.2 L 6 10.8",
          fill: "none",
        }),
        {
          id: "sb3-arrowUpDownThin",
        },
      ),
      SVG.setProps(
        SVG.el("use", {
          href: "#sb3-arrowUpDownThin",
          transform: "rotate(90 6 6)",
        }),
        {
          id: "sb3-arrowLeftRightThin",
        },
      ),
      SVG.setProps(
        SVG.el("path", {
          d: "M 0 0 L 10.392304845413264 6 L 0 12 Z",
        }),
        {
          id: "sb3-pointRight",
        },
      ),

      SVG.setProps(
        SVG.group([
          SVG.el("path", {
            d: "M28.456 21.675c-.009-.312-.087-.825-.256-1.702-.096-.495-.612-3.022-.753-3.73-.395-1.98-.76-3.92-1.142-6.113-.732-4.223-.693-6.05.344-6.527.502-.23 1.06-.081 1.842.35.413.227 2.181 1.365 2.07 1.296 1.993 1.243 3.463 1.775 4.928 1.549 1.527-.237 2.505-.06 2.877.618.348.635.015 1.416-.729 2.18-1.473 1.516-3.976 2.514-5.849 2.023-.822-.218-1.238-.464-2.38-1.266a9.737 9.737 0 0 0-.095-.066c.047.593.264 1.74.717 3.803.294 1.336 2.079 9.187 2.637 11.674l.002.012c.529 2.637-1.872 4.724-5.235 4.724-3.29 0-6.363-1.988-6.862-4.528-.53-2.64 1.873-4.734 5.233-4.734a8.411 8.411 0 0 1 2.65.437zM11.46 27.666c-.01-.319-.091-.84-.266-1.738-.09-.46-.595-2.937-.753-3.727-.39-1.96-.752-3.892-1.131-6.07-.732-4.224-.692-6.052.344-6.527.502-.23 1.06-.082 1.841.349.414.228 2.181 1.365 2.07 1.296 1.992 1.243 3.461 1.775 4.925 1.549 1.525-.24 2.504-.064 2.876.614.348.635.015 1.415-.728 2.18-1.474 1.517-3.977 2.513-5.847 2.017-.822-.218-1.237-.463-2.38-1.266a9.729 9.729 0 0 0-.094-.065c.047.593.264 1.74.717 3.802.294 1.337 2.078 9.19 2.636 11.675l.003.013c.517 2.638-1.884 4.732-5.234 4.732-3.286 0-6.359-1.993-6.87-4.54-.518-2.639 1.885-4.73 5.242-4.73.904 0 1.802.15 2.65.436z",
            stroke: "#000",
            "stroke-opacity": ".1",
          }),
          SVG.el("path", {
            d: "M32.18 25.874C32.636 28.157 30.512 30 27.433 30c-3.07 0-5.923-1.843-6.372-4.126-.458-2.285 1.665-4.136 4.743-4.136.647 0 1.283.084 1.89.234a7 7 0 0 1 .938.302c.87-.02-.104-2.294-1.835-12.229-2.134-12.303 3.06-1.87 8.768-2.753 5.708-.885.076 4.82-3.65 3.844-3.724-.987-4.65-7.153.263 14.738zm-16.998 5.99C15.63 34.148 13.507 36 10.439 36c-3.068 0-5.92-1.852-6.379-4.136-.448-2.284 1.674-4.135 4.751-4.135 1.002 0 1.974.197 2.854.544.822-.055-.15-2.377-1.862-12.228-2.133-12.303 3.059-1.87 8.764-2.753 5.706-.894.076 4.821-3.648 3.834-3.723-.987-4.648-7.152.263 14.738z",
            fill: "#FFF",
          }),
        ]),
        {
          id: "sb3-musicBlock",
          fill: "none",
        },
      ),
      SVG.setProps(
        SVG.group([
          SVG.el("path", {
            d: `M 12 10.3923 A 12 12 0 0 1 0 10.3923 L 0 9.8182 L 0 8.2105 A 12 12 0 0 0 12 8.2105 Z M 12 7.1196 A 12 12 0 0 1 0 7.1196 L 0 6.5455 L 0 4.9378 A 12 12 0 0 0 12 4.9378 Z M 12 3.8469 A 12 12 0 0 1 0 3.8469 L 0 3.2727 L 0 1.665 A 12 12 0 0 0 12 1.665 Z`,
            stroke: "none",
          }),
          SVG.el("path", {
            d: `M 0 8.5531 A 12 12 0 0 1 12 8.5531 M 0 5.2804 A 12 12 0 0 1 12 5.2804 M 0 2.0077 A 12 12 0 0 1 12 2.0077`,
            "stroke-width": 0.5,
            fill: "none",
          }),
        ]),
        {
          id: "sb3-storage",
        },
      ),
      SVG.setProps(
        SVG.group([
          SVG.el("path", {
            d: "M 4.5 6 Q 0 6 0.5 11.5 Q 6 12 6 7.5 Z",
            stroke: "none",
          }),
          SVG.el("path", {
            d: "M 4.5 6 L 9 0.5 Q 12 0 11.5 3 L 6 7.5",
            "stroke-width": 1,
            fill: "none",
            "stroke-linejoin": "round",
            "stroke-linecap": "round",
          }),
        ]),
        {
          id: "sb3-brush",
        },
      ),
      SVG.setProps(
        SVG.group([
          SVG.el("path", {
            d: `M 0.6 11.4 Q 1.5 10.5 1.5 9 L 6 4.5
            M 0.6 11.4 Q 1.5 10.5 3 10.5 L 7.5 6
            M 6 3 L 9 6`,
            "stroke-width": 1.2,
            fill: "none",
          }),
          SVG.el("path", {
            d: "M 11.4 3 A 2.4 2.4 0 1 1 11.3999988000001 2.9976000003999985",
            stroke: "none",
          }),
        ]),
        {
          id: "sb3-pipette",
        },
      ),
      SVG.setProps(
        SVG.group([
          SVG.el("path", {
            d: "M 4.8 2.4 L 9.6 7.2 L 7.2 9.6 Q 4.8 12 2.4 9.6 Q 0 7.2 2.4 4.8 Z",
            "stroke-width": 1,
            fill: "none",
          }),
          SVG.el("path", {
            d: `M 4.8 6 L 5.3 6 A 0.5 0.5 0 1 1 5.299999750000021 5.999500000083333 M 4.8 6 L 4.8 1.7
            M 4.8 1.7 A 1.2 1.2 0 1 0 2.3999999999999995 1.7000000000000002 L 2.4 4.8`,
            "stroke-width": 0.5,
            fill: "none",
          }),
          SVG.el("path", {
            d: "M 8.4 8.4 Q 12 8.4 11.5 12 L 12 12 Q 12 4.8 6 3.5999999999999996 L 9.6 7.199999999999999 Z",
            stroke: "none",
          }),
        ]),
        {
          id: "sb3-paintBucket",
        },
      ),
      SVG.setProps(
        SVG.group([
          SVG.el("path", {
            d: "M 9 0.6 L 0.6 9 Q 3 12 6 9 L 11.4 3 Z",
            "stroke-width": 1.2,
            fill: "none",
          }),
          SVG.el("path", {
            d: "M 9 0 L 4.5 4.5 L 7.5 7.5 L 12 3 Z",
            stroke: "none",
          }),
        ]),
        {
          id: "sb3-eraser",
        },
      ),
      SVG.setProps(
        SVG.el("path", {
          d: "M 0 3.6 A 3.6 3.6 0 0 1 7.2 3.6 L 3.6 12 L 0 3.6 M 1.85 3.6 A 1.8 1.8 0 1 0 1.85 3.5982",
        }),
        {
          id: "sb3-location",
        },
      ),
      SVG.setProps(
        SVG.el("path", {
          d: "M 4.2 6 A 1.8 1.8 0 1 0 4.2 5.9982 M 11.5433 8.2961 A 6 6 0 0 1 11.1698 9.0452 L 9.4404 8.409 A 4.2 4.2 0 0 1 8.409 9.4404 L 9.0452 11.1698 A 6 6 0 0 1 8.2961 11.5433 L 8.2961 11.5433 A 6 6 0 0 1 7.5023 11.8089 L 6.7293 10.1362 A 4.2 4.2 0 0 1 5.2707 10.1362 L 4.4977 11.8089 A 6 6 0 0 1 3.7039 11.5433 L 3.7039 11.5433 A 6 6 0 0 1 2.9548 11.1698 L 3.591 9.4404 A 4.2 4.2 0 0 1 2.5596 8.409 L 0.8302 9.0452 A 6 6 0 0 1 0.4567 8.2961 L 0.4567 8.2961 A 6 6 0 0 1 0.1911 7.5023 L 1.8638 6.7293 A 4.2 4.2 0 0 1 1.8638 5.2707 L 0.1911 4.4977 A 6 6 0 0 1 0.4567 3.7039 L 0.4567 3.7039 A 6 6 0 0 1 0.8302 2.9548 L 2.5596 3.591 A 4.2 4.2 0 0 1 3.591 2.5596 L 2.9548 0.8302 A 6 6 0 0 1 3.7039 0.4567 L 3.7039 0.4567 A 6 6 0 0 1 4.4977 0.1911 L 5.2707 1.8638 A 4.2 4.2 0 0 1 6.7293 1.8638 L 7.5023 0.1911 A 6 6 0 0 1 8.2961 0.4567 L 8.2961 0.4567 A 6 6 0 0 1 9.0452 0.8302 L 8.409 2.5596 A 4.2 4.2 0 0 1 9.4404 3.591 L 11.1698 2.9548 A 6 6 0 0 1 11.5433 3.7039 L 11.5433 3.7039 A 6 6 0 0 1 11.8089 4.4977 L 10.1362 5.2707 A 4.2 4.2 0 0 1 10.1362 6.7293 L 11.8089 7.5023 A 6 6 0 0 1 11.5433 8.2961",
        }),
        {
          id: "sb3-gears",
        },
      ),
      SVG.setProps(
        SVG.el("path", {
          d: "M 6.2 9 A 2.7 2.7 0 1 0 6.2 8.9973 M 12 12 L 0.5 12 A 9 9 0 0 1 0.2867 11.2534 L 2.7957 10.094 A 6.3 6.3 0 0 1 2.7957 7.906 L 0.2867 6.7466 A 9 9 0 0 1 0.6851 5.5558 L 0.6851 5.5558 A 9 9 0 0 1 1.2453 4.4322 L 3.8393 5.3865 A 6.3 6.3 0 0 1 5.3865 3.8393 L 4.4322 1.2453 A 9 9 0 0 1 5.5558 0.6851 L 5.5558 0.6851 A 9 9 0 0 1 6.7466 0.2867 L 7.906 2.7957 A 6.3 6.3 0 0 1 10.094 2.7957 L 11.2534 0.2867 A 9 9 0 0 1 12 0.5 Z",
        }),
        {
          id: "sb3-gearPartial",
        },
      ),
      SVG.setProps(
        SVG.el("path", {
          d: "M 12 6 L 12 6 A 6 6 0 0 1 11.9553 6.7312 L 10.1362 6.7293 A 4.2 4.2 0 0 1 9.7749 7.8412 L 11.2477 8.9089 A 6 6 0 0 1 10.8541 9.5267 L 10.8541 9.5267 A 6 6 0 0 1 10.3881 10.092 L 8.9176 9.0212 A 4.2 4.2 0 0 1 7.9718 9.7084 L 8.5357 11.4378 A 6 6 0 0 1 7.8541 11.7063 L 7.8541 11.7063 A 6 6 0 0 1 7.1449 11.8898 L 6.5845 10.1591 A 4.2 4.2 0 0 1 5.4155 10.1591 L 4.8551 11.8898 A 6 6 0 0 1 4.1459 11.7063 L 4.1459 11.7063 A 6 6 0 0 1 3.4643 11.4378 L 4.0282 9.7084 A 4.2 4.2 0 0 1 3.0824 9.0212 L 1.6119 10.092 A 6 6 0 0 1 1.1459 9.5267 L 1.1459 9.5267 A 6 6 0 0 1 0.7523 8.9089 L 2.2251 7.8412 A 4.2 4.2 0 0 1 1.8638 6.7293 L 0.0447 6.7312 A 6 6 0 0 1 0 6 L 0 6 A 6 6 0 0 1 0.0447 5.2688 L 1.8638 5.2707 A 4.2 4.2 0 0 1 2.2251 4.1588 L 0.7523 3.0911 A 6 6 0 0 1 1.1459 2.4733 L 1.1459 2.4733 A 6 6 0 0 1 1.6119 1.908 L 3.0824 2.9788 A 4.2 4.2 0 0 1 4.0282 2.2916 L 3.4643 0.5622 A 6 6 0 0 1 4.1459 0.2937 L 4.1459 0.2937 A 6 6 0 0 1 4.8551 0.1102 L 5.4155 1.8409 A 4.2 4.2 0 0 1 6.5845 1.8409 L 7.1449 0.1102 A 6 6 0 0 1 7.8541 0.2937 L 7.8541 0.2937 A 6 6 0 0 1 8.5357 0.5622 L 7.9718 2.2916 A 4.2 4.2 0 0 1 8.9176 2.9788 L 10.3881 1.908 A 6 6 0 0 1 10.8541 2.4733 L 10.8541 2.4733 A 6 6 0 0 1 11.2477 3.0911 L 9.7749 4.1588 A 4.2 4.2 0 0 1 10.1362 5.2707 L 11.9553 5.2688 A 6 6 0 0 1 12 6 M 2.4 6 A 3.6 3.6 0 1 0 2.4 5.9964 M 7.2 6 A 1.2 1.2 0 1 1 7.2 5.9988",
        }),
        {
          id: "sb3-gearBig",
        },
      ),
      SVG.setProps(
        SVG.el("path", {
          d: "M 11.5 6 A 5.5 5.5 0 1 1 11.5 5.9945 M 0.5 6 L 11.5 6 M 5.6255 0.51 A 9 9 0 0 0 5.6255 11.4842 M 6.3745 0.51 A 9 9 0 0 1 6.3745 11.4842",
          fill: "none",
          "stroke-width": 1,
        }),
        {
          id: "sb3-globe",
        },
      ),
      SVG.setProps(
        SVG.el("path", {
          d: "M 11.5 6 A 5.5 5.5 0 1 1 11.5 5.9945 M 1.05 3.6 L 10.95 3.6 M 1.05 8.4 L 10.95 8.4 M 0.5 6 L 11.5 6 M 5.6255 0.51 A 9 9 0 0 0 5.6255 11.4842 M 6.3745 0.51 A 9 9 0 0 1 6.3745 11.4842",
          fill: "none",
          "stroke-width": 1,
        }),
        {
          id: "sb3-globeBig",
        },
      ),
      SVG.setProps(
        SVG.el("rect", {
          width: 12,
          height: 12,
        }),
        {
          id: "sb3-square",
        }
      ),

      SVG.setProps(
        SVG.group([
          SVG.el("path", {
            d: "M8.753 34.602l-4.251 1.779 1.784-4.236c1.218-2.892 2.907-5.423 5.03-7.538L31.066 4.93c.846-.842 2.65-.41 4.032.967 1.38 1.375 1.816 3.173.97 4.015L16.318 29.59c-2.123 2.116-4.664 3.799-7.565 5.012",
            fill: "#FFF",
          }),
          SVG.el("path", {
            d: "M29.41 6.111s-4.45-2.379-8.202 5.771c-1.734 3.766-4.35 1.546-4.35 1.546",
          }),
          SVG.el("path", {
            d: "M36.42 8.825c0 .463-.14.873-.432 1.164l-9.335 9.301c.282-.29.41-.668.41-1.12 0-.874-.507-1.963-1.406-2.868-1.362-1.358-3.147-1.8-4.002-.99L30.99 5.01c.844-.84 2.65-.41 4.035.96.898.904 1.396 1.982 1.396 2.855M10.515 33.774a23.74 23.74 0 0 1-1.764.83L4.5 36.382l1.786-4.235c.258-.604.529-1.186.833-1.757.69.183 1.449.625 2.109 1.282.659.658 1.102 1.412 1.287 2.102",
            fill: "#4C97FF",
          }),
          SVG.el("path", {
            d: "M36.498 8.748c0 .464-.141.874-.433 1.165l-19.742 19.68c-2.131 2.111-4.673 3.793-7.572 5.01L4.5 36.381l.974-2.317 1.925-.808c2.899-1.218 5.441-2.899 7.572-5.01l19.742-19.68c.292-.292.432-.702.432-1.165 0-.647-.27-1.4-.779-2.123.249.172.498.377.736.614.898.905 1.396 1.983 1.396 2.856",
            fill: "#575E75",
            opacity: ".15",
          }),
          SVG.el("path", {
            d: "M18.45 12.831a.904.904 0 1 1-1.807 0 .904.904 0 0 1 1.807 0z",
            fill: "#575E75",
          }),
        ]),
        {
          id: "sb3-penBlock",
          stroke: "#575E75",
          fill: "none",
          "stroke-linejoin": "round",
        },
      ),

      SVG.setProps(
        SVG.group([
          SVG.el("circle", {
            opacity: 0.25,
            cx: 32,
            cy: 16,
            r: 4.5,
          }),
          SVG.el("circle", {
            opacity: 0.5,
            cx: 32,
            cy: 12,
            r: 4.5,
          }),
          SVG.el("circle", {
            opacity: 0.75,
            cx: 32,
            cy: 8,
            r: 4.5,
          }),
          SVG.el("circle", {
            cx: 32,
            cy: 4,
            r: 4.5,
          }),
          SVG.el("path", {
            d: "M22.672 4.42l-6.172 4V6.1c0-2.01-1.563-3.6-3.5-3.6H4.1C2.076 2.5.5 4.076.5 6.1V14c0 1.927 1.584 3.512 3.6 3.6H13c1.902 0 3.5-1.653 3.5-3.6v-2.283l6.257 3.754.097.075c.02.02.098.054.146.054.267 0 .5-.217.5-.5V4.8c0 .037-.056-.094-.129-.243-.145-.242-.43-.299-.7-.137z",
            fill: "#4D4D4D",
            "stroke-linejoin": "round",
          }),
        ]),
        {
          id: "sb3-videoBlock",
          stroke: "#000",
          fill: "#FFF",
          "stroke-opacity": 0.15,
        },
      ),

      SVG.setProps(
        SVG.group([
          SVG.el("path", {
            d: "M25.644 20.5c-1.667 1.937-4.539 3.429-5.977 3.429a1.25 1.25 0 0 1-.557-.137c-.372-.186-.61-.542-.61-1.03 0-.105.017-.207.05-.308.076-.236.624-.986.727-1.173.27-.484.462-1.075.566-1.865A8.5 8.5 0 0 1 24 3.5h4a8.5 8.5 0 1 1 0 17h-2.356z",
            fill: "#FFF",
          }),
          SVG.el("path", {
            d: "M15.5 21.67c0-1.016-1.494-1.586-2.387-.782l-2.7 2.163A5.958 5.958 0 0 1 6.7 24.33h-.4c-1.035 0-1.8.69-1.8 1.573v4.235c0 .883.765 1.572 1.8 1.572h.4c1.458 0 2.754.423 3.82 1.287l2.598 2.161c.908.75 2.382.188 2.382-.876V21.67z",
            fill: "#4D4D4D",
          }),
        ]),
        {
          id: "sb3-ttsBlock",
          stroke: "#000",
          "stroke-opacity": 0.15,
        },
      ),

      SVG.el("image", {
        id: "sb3-translateBlock",
        width: "40px",
        height: "40px",
        href: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAABQCAMAAAC5zwKfAAAA21BMVEUAAAAAAAAAAAAAAADS0tIAAABHR0cAAADX19cAAAAAAACkpKRqamq2traurq6WlpbV1dWEhITHx8fPz8/Ly8vDw8O9vb0AAABMTEz////Z2dlXXnVMl//g4ODu7u7m5ub4+PhPmf/x8fH09PT6+vri4uNRmv/r6+1uqv/0+P9Ynv/p8v+rrrphZ33S5f+51v9ho/+1uMKBhpfH3v+Wmqhrcoacxf+Pvv/KzNSgpLGLkKDd6/+rzf9npv/AwsuDtv98s/90rv9jpP9GieeOrtm5ubl2fI7Z4u56otk5hEFfAAAAGXRSTlMAJhgM1wYyHvIkEWpBhXhc5U+uybyhk0YvleQYgwAABDpJREFUWMPtmNl6mzAQhQMCBAYbvLX1GIwxi7e2TtosTdKk+/L+T1QBVoQtJHDby5yLROYTPzOagSM4e9az6oVUrDgKxh39//Bwb+QBkTZ2VL3hypYilKWicpY6gmWcTCbxIoSh0xHjOkZXA4m0rlGcrcBsslcSmrYq4qm2GczmE6Hms6A8W4GQHZ1BTxXweuTCErGz1TEEaTpLymML6HVq87VhIWPRs21yNu679guNXn9hOnWVMUwanzxG0yCTdYQQts195umwJmnUDSatFHQRPaVvljkl4CAuRlWrCfD9uiZEbR+ObrnjfRDhwHUtdAi0gK/vLtts+VqDVfIMjZSmLEycBuD1D4kK8MHc+Ju3/FFQaHdXc4rBU/8NiCE+OJyAIQKuz32qjA7O1xzwqMtiUETAXeRzinZcyoPgsPpDcco3q9WD729WhTI/e1itbriUzwwtqPI0Q5et4ZoA6SDj1pCWOeB44qJ88aOiIB8j/xMH5IiUJwG+jfyHPMCNH20FQEpkPGnbnBeFuI78Fd82VWJCeTyQCzHb3pMCb8VAQhxBCkPKkzf2Z9J9mR9dCxqb3tBO17EoTw4ky0f0VXSnUCGE6LDp1tvlwK0cyNQMJA1DlL3Px8TenvTjpcAN5cD7VVSsoR992c4oS+aGcuDbzxFBfVqvv5L/375DCzeUAXfnOW5TJHudffvdzg3FwPdZvnbX6/LXr+9t3ZCzAAaMNh/X9BdAWzcUm9T2vnrpk91QbqOhLEDeDZuNHkBSX94Nm7ciAJOWAkW8WZIDl1MikAD57ZwceJsDL0VAfsPJwgzzO5cHvsmBb2IJkAlhB5InntlXlJcc8MO00GMzsHTbsMJDdU+hOxIeCfKuXYQu7ZJ5oDmExwPjfAEvyZ9lGyDW9tOWMH6l1z4nLwjrQ572RRugAvMS57mq4MH7czq9Kgpz1QZoDcI4DsHrWUjw4E1JbLeTSZ5z2gLYMTTwBnaOEwBvS1Ke86UUyF7isKpLrIHkSvVGBORdUQx8nFb0KAUy38aSCO8I510hMrhrBOrGEFIYGToPZM+Fn+XwiraiAMh2Uwnb+3DAC9Z/t3TIA2W7MwZkYbH+uZIC+f0jD3z9+vXF05hIAJTtcK3TLIDnMSLnhqeZlDo8eksYqH/3UskWPz7aCuDTX3urMiA5ejHCp7+YV4W9gxBnMFJP/XRwKNT3IEhLZpIGQMp86seNY6LlutRQgrFr6dLPLyELjm44eemIWt6C+JP0A1HffCIm4GDEw2jvpNTxbIwQ0kUTUYUYkgYTSXfMBU1Ee+G6fSwkOlpA/RFcJCR2erRHkllKSjNWhdd+NQbqkJrgunyPhKBIprpeiZyLZtEeCRNWQdlUZPU8yF1yYJ1J1HGGEC5iknS8pN0tRtoDDzTSNDLpqjMu2s4b9fBZg/TcJVHjrA7GSl/JZz7rWbX6A0ZzUfwVEqfrAAAAAElFTkSuQmCC",
      }),
    ]
  }

  static makeHighContrastIcons() {
    // Make sure to update the highContrastIcons set above!
    return [
      ...Style.makeCommonIcons(),
      // https://github.com/scratchfoundation/scratch-gui/tree/beta/src/lib/themes/high-contrast/blocks-media
      SVG.setProps(
        SVG.group([
          SVG.el("path", {
            d: "M12.71 2.44A2.41 2.41 0 0 1 12 4.16L8.08 8.08a2.45 2.45 0 0 1-3.45 0L.72 4.16A2.42 2.42 0 0 1 0 2.44 2.48 2.48 0 0 1 .71.71C1 .47 1.43 0 6.36 0s5.39.46 5.64.71a2.44 2.44 0 0 1 .71 1.73z",
            fill: "#231f20",
            opacity: ".1",
          }),
          SVG.el("path", {
            d: "M6.36 7.79a1.43 1.43 0 0 1-1-.42L1.42 3.45a1.44 1.44 0 0 1 0-2c.56-.56 9.31-.56 9.87 0a1.44 1.44 0 0 1 0 2L7.37 7.37a1.43 1.43 0 0 1-1.01.42z",
            fill: "#000",
          }),
        ]),
        {
          id: "sb3-dropdownArrow-high-contrast",
          transform: "scale(0.944)",
        },
      ),

      SVG.setProps(
        SVG.group([
          SVG.el("path", {
            d: `M 12 10.3923 A 12 12 0 0 1 0 10.3923 L 0 9.8182 L 0 8.2105 A 12 12 0 0 0 12 8.2105 Z M 12 7.1196 A 12 12 0 0 1 0 7.1196 L 0 6.5455 L 0 4.9378 A 12 12 0 0 0 12 4.9378 Z M 12 3.8469 A 12 12 0 0 1 0 3.8469 L 0 3.2727 L 0 1.665 A 12 12 0 0 0 12 1.665 Z`,
            stroke: "none",
          }),
          SVG.el("path", {
            d: `M 0 8.5531 A 12 12 0 0 1 12 8.5531 M 0 5.2804 A 12 12 0 0 1 12 5.2804 M 0 2.0077 A 12 12 0 0 1 12 2.0077`,
            "stroke-width": 0.5,
            fill: "none",
          }),
        ]),
        {
          id: "sb3-storage-high-contrast",
        },
      ),
      SVG.setProps(
        SVG.group([
          SVG.el("path", {
            d: "M 4.5 6 Q 0 6 0.5 11.5 Q 6 12 6 7.5 Z",
            stroke: "none",
          }),
          SVG.el("path", {
            d: "M 4.5 6 L 9 0.5 Q 12 0 11.5 3 L 6 7.5",
            "stroke-width": 1,
            fill: "none",
            "stroke-linejoin": "round",
            "stroke-linecap": "round",
          }),
        ]),
        {
          id: "sb3-brush-high-contrast",
        },
      ),
      SVG.setProps(
        SVG.group([
          SVG.el("path", {
            d: `M 0.6 11.4 Q 1.5 10.5 1.5 9 L 6 4.5
            M 0.6 11.4 Q 1.5 10.5 3 10.5 L 7.5 6
            M 6 3 L 9 6`,
            "stroke-width": 1.2,
            fill: "none",
          }),
          SVG.el("path", {
            d: "M 11.4 3 A 2.4 2.4 0 1 1 11.3999988000001 2.9976000003999985",
            stroke: "none",
          }),
        ]),
        {
          id: "sb3-pipette-high-contrast",
        },
      ),
      SVG.setProps(
        SVG.group([
          SVG.el("path", {
            d: "M 4.8 2.4 L 9.6 7.2 L 7.2 9.6 Q 4.8 12 2.4 9.6 Q 0 7.2 2.4 4.8 Z",
            "stroke-width": 1,
            fill: "none",
          }),
          SVG.el("path", {
            d: `M 4.8 6 L 5.3 6 A 0.5 0.5 0 1 1 5.299999750000021 5.999500000083333 M 4.8 6 L 4.8 1.7
            M 4.8 1.7 A 1.2 1.2 0 1 0 2.3999999999999995 1.7000000000000002 L 2.4 4.8`,
            "stroke-width": 0.5,
            fill: "none",
          }),
          SVG.el("path", {
            d: "M 8.4 8.4 Q 12 8.4 11.5 12 L 12 12 Q 12 4.8 6 3.5999999999999996 L 9.6 7.199999999999999 Z",
            stroke: "none",
          }),
        ]),
        {
          id: "sb3-paintBucket-high-contrast",
        },
      ),
      SVG.setProps(
        SVG.group([
          SVG.el("path", {
            d: "M 9 0.6 L 0.6 9 Q 3 12 6 9 L 11.4 3 Z",
            "stroke-width": 1.2,
            fill: "none",
          }),
          SVG.el("path", {
            d: "M 9 0 L 4.5 4.5 L 7.5 7.5 L 12 3 Z",
            stroke: "none",
          }),
        ]),
        {
          id: "sb3-eraser-high-contrast",
        },
      ),
      SVG.setProps(
        SVG.el("path", {
          d: "M 0 3.6 A 3.6 3.6 0 0 1 7.2 3.6 L 3.6 12 L 0 3.6 M 1.85 3.6 A 1.8 1.8 0 1 0 1.85 3.5982",
        }),
        {
          id: "sb3-location-high-contrast",
        },
      ),
      SVG.setProps(
        SVG.el("path", {
          d: "M 4.2 6 A 1.8 1.8 0 1 0 4.2 5.9982 M 11.5433 8.2961 A 6 6 0 0 1 11.1698 9.0452 L 9.4404 8.409 A 4.2 4.2 0 0 1 8.409 9.4404 L 9.0452 11.1698 A 6 6 0 0 1 8.2961 11.5433 L 8.2961 11.5433 A 6 6 0 0 1 7.5023 11.8089 L 6.7293 10.1362 A 4.2 4.2 0 0 1 5.2707 10.1362 L 4.4977 11.8089 A 6 6 0 0 1 3.7039 11.5433 L 3.7039 11.5433 A 6 6 0 0 1 2.9548 11.1698 L 3.591 9.4404 A 4.2 4.2 0 0 1 2.5596 8.409 L 0.8302 9.0452 A 6 6 0 0 1 0.4567 8.2961 L 0.4567 8.2961 A 6 6 0 0 1 0.1911 7.5023 L 1.8638 6.7293 A 4.2 4.2 0 0 1 1.8638 5.2707 L 0.1911 4.4977 A 6 6 0 0 1 0.4567 3.7039 L 0.4567 3.7039 A 6 6 0 0 1 0.8302 2.9548 L 2.5596 3.591 A 4.2 4.2 0 0 1 3.591 2.5596 L 2.9548 0.8302 A 6 6 0 0 1 3.7039 0.4567 L 3.7039 0.4567 A 6 6 0 0 1 4.4977 0.1911 L 5.2707 1.8638 A 4.2 4.2 0 0 1 6.7293 1.8638 L 7.5023 0.1911 A 6 6 0 0 1 8.2961 0.4567 L 8.2961 0.4567 A 6 6 0 0 1 9.0452 0.8302 L 8.409 2.5596 A 4.2 4.2 0 0 1 9.4404 3.591 L 11.1698 2.9548 A 6 6 0 0 1 11.5433 3.7039 L 11.5433 3.7039 A 6 6 0 0 1 11.8089 4.4977 L 10.1362 5.2707 A 4.2 4.2 0 0 1 10.1362 6.7293 L 11.8089 7.5023 A 6 6 0 0 1 11.5433 8.2961",
        }),
        {
          id: "sb3-gears-high-contrast",
        },
      ),
      SVG.setProps(
        SVG.el("path", {
          d: "M 6.2 9 A 2.7 2.7 0 1 0 6.2 8.9973 M 12 12 L 0.5 12 A 9 9 0 0 1 0.2867 11.2534 L 2.7957 10.094 A 6.3 6.3 0 0 1 2.7957 7.906 L 0.2867 6.7466 A 9 9 0 0 1 0.6851 5.5558 L 0.6851 5.5558 A 9 9 0 0 1 1.2453 4.4322 L 3.8393 5.3865 A 6.3 6.3 0 0 1 5.3865 3.8393 L 4.4322 1.2453 A 9 9 0 0 1 5.5558 0.6851 L 5.5558 0.6851 A 9 9 0 0 1 6.7466 0.2867 L 7.906 2.7957 A 6.3 6.3 0 0 1 10.094 2.7957 L 11.2534 0.2867 A 9 9 0 0 1 12 0.5 Z",
        }),
        {
          id: "sb3-gearPartial-high-contrast",
        },
      ),
      SVG.setProps(
        SVG.el("path", {
          d: "M 12 6 L 12 6 A 6 6 0 0 1 11.9553 6.7312 L 10.1362 6.7293 A 4.2 4.2 0 0 1 9.7749 7.8412 L 11.2477 8.9089 A 6 6 0 0 1 10.8541 9.5267 L 10.8541 9.5267 A 6 6 0 0 1 10.3881 10.092 L 8.9176 9.0212 A 4.2 4.2 0 0 1 7.9718 9.7084 L 8.5357 11.4378 A 6 6 0 0 1 7.8541 11.7063 L 7.8541 11.7063 A 6 6 0 0 1 7.1449 11.8898 L 6.5845 10.1591 A 4.2 4.2 0 0 1 5.4155 10.1591 L 4.8551 11.8898 A 6 6 0 0 1 4.1459 11.7063 L 4.1459 11.7063 A 6 6 0 0 1 3.4643 11.4378 L 4.0282 9.7084 A 4.2 4.2 0 0 1 3.0824 9.0212 L 1.6119 10.092 A 6 6 0 0 1 1.1459 9.5267 L 1.1459 9.5267 A 6 6 0 0 1 0.7523 8.9089 L 2.2251 7.8412 A 4.2 4.2 0 0 1 1.8638 6.7293 L 0.0447 6.7312 A 6 6 0 0 1 0 6 L 0 6 A 6 6 0 0 1 0.0447 5.2688 L 1.8638 5.2707 A 4.2 4.2 0 0 1 2.2251 4.1588 L 0.7523 3.0911 A 6 6 0 0 1 1.1459 2.4733 L 1.1459 2.4733 A 6 6 0 0 1 1.6119 1.908 L 3.0824 2.9788 A 4.2 4.2 0 0 1 4.0282 2.2916 L 3.4643 0.5622 A 6 6 0 0 1 4.1459 0.2937 L 4.1459 0.2937 A 6 6 0 0 1 4.8551 0.1102 L 5.4155 1.8409 A 4.2 4.2 0 0 1 6.5845 1.8409 L 7.1449 0.1102 A 6 6 0 0 1 7.8541 0.2937 L 7.8541 0.2937 A 6 6 0 0 1 8.5357 0.5622 L 7.9718 2.2916 A 4.2 4.2 0 0 1 8.9176 2.9788 L 10.3881 1.908 A 6 6 0 0 1 10.8541 2.4733 L 10.8541 2.4733 A 6 6 0 0 1 11.2477 3.0911 L 9.7749 4.1588 A 4.2 4.2 0 0 1 10.1362 5.2707 L 11.9553 5.2688 A 6 6 0 0 1 12 6 M 2.4 6 A 3.6 3.6 0 1 0 2.4 5.9964 M 7.2 6 A 1.2 1.2 0 1 1 7.2 5.9988",
        }),
        {
          id: "sb3-gearBig-high-contrast",
        },
      ),
      SVG.setProps(
        SVG.el("path", {
          d: "M 11.5 6 A 5.5 5.5 0 1 1 11.5 5.9945 M 0.5 6 L 11.5 6 M 5.6255 0.51 A 9 9 0 0 0 5.6255 11.4842 M 6.3745 0.51 A 9 9 0 0 1 6.3745 11.4842",
          fill: "none",
          "stroke-width": 1,
        }),
        {
          id: "sb3-globe-high-contrast",
        },
      ),
      SVG.setProps(
        SVG.el("path", {
          d: "M 11.5 6 A 5.5 5.5 0 1 1 11.5 5.9945 M 1.05 3.6 L 10.95 3.6 M 1.05 8.4 L 10.95 8.4 M 0.5 6 L 11.5 6 M 5.6255 0.51 A 9 9 0 0 0 5.6255 11.4842 M 6.3745 0.51 A 9 9 0 0 1 6.3745 11.4842",
          fill: "none",
          "stroke-width": 1,
        }),
        {
          id: "sb3-globeBig-high-contrast",
        },
      ),
      SVG.setProps(
        SVG.el("rect", {
          width: 12,
          height: 12,
        }),
        {
          id: "sb3-square-high-contrast",
        }
      ),

      SVG.setProps(
        SVG.group([
          SVG.el("path", {
            d: "M22.68 12.2a1.6 1.6 0 0 1-1.27.63h-7.69a1.59 1.59 0 0 1-1.16-2.58l1.12-1.41a4.82 4.82 0 0 0-3.14-.77 4.31 4.31 0 0 0-2 .8A4.25 4.25 0 0 0 7.2 10.6a5.06 5.06 0 0 0 .54 4.62A5.58 5.58 0 0 0 12 17.74a2.26 2.26 0 0 1-.16 4.52A10.25 10.25 0 0 1 3.74 18a10.14 10.14 0 0 1-1.49-9.22 9.7 9.7 0 0 1 2.83-4.14A9.92 9.92 0 0 1 9.66 2.5a10.66 10.66 0 0 1 7.72 1.68l1.08-1.35a1.57 1.57 0 0 1 1.24-.6 1.6 1.6 0 0 1 1.54 1.21l1.7 7.37a1.57 1.57 0 0 1-.26 1.39z",
            fill: "#000",
          }),
          SVG.el("path", {
            d: "M21.38 11.83h-7.61a.59.59 0 0 1-.43-1l1.75-2.19a5.9 5.9 0 0 0-4.7-1.58 5.07 5.07 0 0 0-4.11 3.17A6 6 0 0 0 7 15.77a6.51 6.51 0 0 0 5 2.92 1.31 1.31 0 0 1-.08 2.62 9.3 9.3 0 0 1-7.35-3.82 9.16 9.16 0 0 1-1.4-8.37A8.51 8.51 0 0 1 5.71 5.4a8.76 8.76 0 0 1 4.11-1.92 9.71 9.71 0 0 1 7.75 2.07l1.67-2.1a.59.59 0 0 1 1 .21L22 11.08a.59.59 0 0 1-.62.75z",
          }),
        ]),
        {
          id: "sb3-turnRight-high-contrast",
        },
      ),
      SVG.setProps(
        SVG.group([
          SVG.el("path", {
            d: "M20.34 18.21a10.24 10.24 0 0 1-8.1 4.22 2.26 2.26 0 0 1-.16-4.52 5.58 5.58 0 0 0 4.25-2.53 5.06 5.06 0 0 0 .54-4.62A4.25 4.25 0 0 0 15.55 9a4.31 4.31 0 0 0-2-.8 4.82 4.82 0 0 0-3.15.8l1.12 1.41A1.59 1.59 0 0 1 10.36 13H2.67a1.56 1.56 0 0 1-1.26-.63A1.54 1.54 0 0 1 1.13 11l1.72-7.43A1.59 1.59 0 0 1 4.38 2.4a1.57 1.57 0 0 1 1.24.6L6.7 4.35a10.66 10.66 0 0 1 7.72-1.68A9.88 9.88 0 0 1 19 4.81 9.61 9.61 0 0 1 21.83 9a10.08 10.08 0 0 1-1.49 9.21z",
            fill: "#000",
          }),
          SVG.el("path", {
            d: "M19.56 17.65a9.29 9.29 0 0 1-7.35 3.83 1.31 1.31 0 0 1-.08-2.62 6.53 6.53 0 0 0 5-2.92 6.05 6.05 0 0 0 .67-5.51 5.32 5.32 0 0 0-1.64-2.16 5.21 5.21 0 0 0-2.48-1A5.86 5.86 0 0 0 9 8.84L10.74 11a.59.59 0 0 1-.43 1H2.7a.6.6 0 0 1-.6-.75l1.71-7.42a.59.59 0 0 1 1-.21l1.67 2.1a9.71 9.71 0 0 1 7.75-2.07 8.84 8.84 0 0 1 4.12 1.92 8.68 8.68 0 0 1 2.54 3.72 9.14 9.14 0 0 1-1.33 8.36z",
          }),
        ]),
        {
          id: "sb3-turnLeft-high-contrast",
        },
      ),
      SVG.setProps(
        SVG.group([
          SVG.el("path", {
            d: "M 46.6 22 c -0.6 1.2 -1.8 2 -3 2 h -3.2 c -0.2 2.6 -1 5 -2.2 7.2 c -1.8 3.4 -4.6 6.4 -8.2 8.2 c -3.4 1.8 -7.2 2.4 -11 1.8 c -3.6 -0.6 -7 -2.2 -9.8 -4.6 c -1.4 -1.4 -1.4 -3.8 0 -5.2 c 1.2 -1.2 3.2 -1.4 4.6 -0.4 H 14 c 1.8 1.2 3.8 1.8 5.8 1.8 s 3.8 -0.6 5.4 -1.8 c 2.2 -1.6 3.6 -4.2 3.6 -7 h -3 c -1.8 0 -3.4 -1.4 -3.4 -3.4 c 0 -0.8 0.4 -1.8 1 -2.4 l 8.8 -8.8 c 1.4 -1.2 3.4 -1.2 4.8 0 L 46 18.4 c 1 1 1.2 2.4 0.6 3.6 z",
            fill: "#000",
          }),
          SVG.el("path", {
            d: "M 43.6 22 h -5.2 c 0 3 -0.6 5.8 -2 8.4 c -1.6 3.2 -4.2 5.6 -7.4 7.2 c -3 1.6 -6.6 2.2 -9.8 1.6 c -3.2 -0.4 -6.4 -2 -8.8 -4.2 c -0.8 -0.6 -0.8 -1.8 -0.2 -2.4 c 0.6 -0.8 1.8 -0.8 2.4 -0.2 c 2 1.4 4.4 2.2 6.8 2.2 s 4.6 -0.6 6.6 -2 c 1.8 -1.2 3.2 -3 4 -5.2 c 0.6 -1.8 0.8 -3.6 0.4 -5.6 h -4.8 c -0.8 0 -1.4 -0.6 -1.4 -1.4 c 0 -0.4 0.2 -0.6 0.4 -0.8 l 8.8 -8.8 c 0.6 -0.6 1.4 -0.6 1.8 0 L 44 19.6 c 0.6 0.6 0.8 1.2 0.6 1.8 s -0.6 0.6 -1 0.6 z",
          }),
        ]),
        {
          id: "sb3-loopArrow-high-contrast",
        },
      ),
      SVG.setProps(
        SVG.el("path", {
          d: "M 0 0 L 18 6 L 0 12 L 6 6",
        }),
        {
          id: "sb3-turtle-high-contrast",
        },
      ),
      SVG.setProps(
        SVG.el("path", {
          d: "M 0 0 L 18 6 L 0 12 L 6 6 Z",
          fill: "none",
          "stroke-width": 1,
        }),
        {
          id: "sb3-turtleOutline-high-contrast",
        },
      ),
      SVG.setProps(
        SVG.el("path", {
          d: "M 4 0 L 0 4 L 3.2 4 L 0 8 L 3.2 8 L 0 12 L 9.6 6.6667 L 6.4 6.6667 L 9.6 2.6667 L 6.4 2.6667 L 9.6 0 Z",
        }),
        {
          id: "sb3-flash-high-contrast",
        },
      ),
      SVG.setProps(
        SVG.el("path", {
          d: `M 0.6 10 L 11.4 10 L 11.4 3 L 9 3 L 7.5 0.6 L 4.5 0.6 L 3 3 L 0.6 3 Z
          M 7.92 6 A 1.92 1.92 0 1 1 7.91999904000008 5.998080000319999 Z`,
        }),
        {
          id: "sb3-camera-high-contrast",
        },
      ),
      SVG.setProps(
        SVG.el("use", {
          href: "#sb3-musicBlock-high-contrast",
        }),
        {
          id: "sb3-notes-high-contrast",
        },
      ),

      SVG.setProps(
        SVG.el("path", {
          d: "M 0.6 6 L 6 0.6 L 11.4 6 L 7.8 6 L 7.8 11.4 L 4.2 11.4 L 4.2 6 Z",
        }),
        {
          id: "sb3-arrowUp-high-contrast",
        },
      ),
      SVG.setProps(
        SVG.el("path", {
          d: "M 0.6 6 L 6 0.6 L 11.4 6 L 7.8 6 L 7.8 11.4 L 4.2 11.4 L 4.2 6 Z",
          fill: "none",
        }),
        {
          id: "sb3-arrowUpOutline-high-contrast",
        },
      ),
      SVG.setProps(
        SVG.el("path", {
          d: "M 8 4 L 6 1.2 L 4 4 M 6 1.2 L 6 11.4",
          fill: "none",
        }),
        {
          id: "sb3-arrowUpThin-high-contrast",
        },
      ),
      SVG.setProps(
        SVG.el("use", {
          href: "#sb3-arrowUp-high-contrast",
          transform: "rotate(180 6 6)",
        }),
        {
          id: "sb3-arrowDown-high-contrast",
        },
      ),
      SVG.setProps(
        SVG.el("use", {
          href: "#sb3-arrowUpOutline-high-contrast",
          transform: "rotate(180 6 6)",
        }),
        {
          id: "sb3-arrowDownOutline-high-contrast",
        },
      ),
      SVG.setProps(
        SVG.el("use", {
          href: "#sb3-arrowUpThin-high-contrast",
          transform: "rotate(180 6 6)",
        }),
        {
          id: "sb3-arrowDownThin-high-contrast",
        },
      ),
      SVG.setProps(
        SVG.el("use", {
          href: "#sb3-arrowUp-high-contrast",
          transform: "rotate(-90 6 6)",
        }),
        {
          id: "sb3-arrowLeft-high-contrast",
        },
      ),
      SVG.setProps(
        SVG.el("use", {
          href: "#sb3-arrowUpOutline-high-contrast",
          transform: "rotate(-90 6 6)",
        }),
        {
          id: "sb3-arrowLeftOutline-high-contrast",
        },
      ),
      SVG.setProps(
        SVG.el("use", {
          href: "#sb3-arrowUpThin-high-contrast",
          transform: "rotate(-90 6 6)",
        }),
        {
          id: "sb3-arrowLeftThin-high-contrast",
        },
      ),
      SVG.setProps(
        SVG.el("use", {
          href: "#sb3-arrowUp-high-contrast",
          transform: "rotate(90 6 6)",
        }),
        {
          id: "sb3-arrowRight-high-contrast",
        },
      ),
      SVG.setProps(
        SVG.el("use", {
          href: "#sb3-arrowUpOutline-high-contrast",
          transform: "rotate(90 6 6)",
        }),
        {
          id: "sb3-arrowRightOutline-high-contrast",
        },
      ),
      SVG.setProps(
        SVG.el("use", {
          href: "#sb3-arrowUpThin-high-contrast",
          transform: "rotate(90 6 6)",
        }),
        {
          id: "sb3-arrowRightThin-high-contrast",
        },
      ),
      SVG.setProps(
        SVG.el("path", {
          d: "M 8 4 L 6 1.2 L 4 4 M 8 8 L 6 10.8 L 4 8 M 6 1.2 L 6 10.8",
          fill: "none",
        }),
        {
          id: "sb3-arrowUpDownThin-high-contrast",
        },
      ),
      SVG.setProps(
        SVG.el("use", {
          href: "#sb3-arrowUpDownThin-high-contrast",
          transform: "rotate(90 6 6)",
        }),
        {
          id: "sb3-arrowLeftRightThin-high-contrast",
        },
      ),
      SVG.setProps(
        SVG.el("path", {
          d: "M 0 0 L 10.392304845413264 6 L 0 12 Z",
        }),
        {
          id: "sb3-pointRight-high-contrast",
        },
      ),

      // https://github.com/scratchfoundation/scratch-gui/tree/beta/src/lib/themes/high-contrast/extensions
      SVG.setProps(
        SVG.group([
          SVG.el("path", {
            d: "M28.456 21.675c-.009-.312-.087-.825-.256-1.702-.096-.495-.612-3.022-.753-3.73-.395-1.98-.76-3.92-1.142-6.113-.732-4.223-.693-6.05.344-6.527.502-.23 1.06-.081 1.842.35.413.227 2.181 1.365 2.07 1.296 1.993 1.243 3.463 1.775 4.928 1.549 1.527-.237 2.505-.06 2.877.618.348.635.015 1.416-.729 2.18-1.473 1.516-3.976 2.514-5.849 2.023-.822-.218-1.238-.464-2.38-1.266a9.737 9.737 0 0 0-.095-.066c.047.593.264 1.74.717 3.803.294 1.336 2.079 9.187 2.637 11.674l.002.012c.529 2.637-1.872 4.724-5.235 4.724-3.29 0-6.363-1.988-6.862-4.528-.53-2.64 1.873-4.734 5.233-4.734a8.411 8.411 0 0 1 2.65.437zM11.46 27.666c-.01-.319-.091-.84-.266-1.738-.09-.46-.595-2.937-.753-3.727-.39-1.96-.752-3.892-1.131-6.07-.732-4.224-.692-6.052.344-6.527.502-.23 1.06-.082 1.841.349.414.228 2.181 1.365 2.07 1.296 1.992 1.243 3.461 1.775 4.925 1.549 1.525-.24 2.504-.064 2.876.614.348.635.015 1.415-.728 2.18-1.474 1.517-3.977 2.513-5.847 2.017-.822-.218-1.237-.463-2.38-1.266a9.729 9.729 0 0 0-.094-.065c.047.593.264 1.74.717 3.802.294 1.337 2.078 9.19 2.636 11.675l.003.013c.517 2.638-1.884 4.732-5.234 4.732-3.286 0-6.359-1.993-6.87-4.54-.518-2.639 1.885-4.73 5.242-4.73.904 0 1.802.15 2.65.436z",
            stroke: "#000",
          }),
          SVG.el("path", {
            d: "M32.18 25.874C32.636 28.157 30.512 30 27.433 30c-3.07 0-5.923-1.843-6.372-4.126-.458-2.285 1.665-4.136 4.743-4.136.647 0 1.283.084 1.89.234a7 7 0 0 1 .938.302c.87-.02-.104-2.294-1.835-12.229-2.134-12.303 3.06-1.87 8.768-2.753 5.708-.885.076 4.82-3.65 3.844-3.724-.987-4.65-7.153.263 14.738zm-16.998 5.99C15.63 34.148 13.507 36 10.439 36c-3.068 0-5.92-1.852-6.379-4.136-.448-2.284 1.674-4.135 4.751-4.135 1.002 0 1.974.197 2.854.544.822-.055-.15-2.377-1.862-12.228-2.133-12.303 3.059-1.87 8.764-2.753 5.706-.894.076 4.821-3.648 3.834-3.723-.987-4.648-7.152.263 14.738z",
            fill: "#000",
          }),
        ]),
        {
          id: "sb3-musicBlock-high-contrast",
          fill: "none",
        },
      ),
      SVG.setProps(
        SVG.group([
          SVG.el("path", {
            d: "M8.753 34.602l-4.251 1.779 1.784-4.236c1.218-2.892 2.907-5.423 5.03-7.538L31.066 4.93c.846-.842 2.65-.41 4.032.967 1.38 1.375 1.816 3.173.97 4.015L16.318 29.59c-2.123 2.116-4.664 3.799-7.565 5.012",
            fill: "#FFF",
          }),
          SVG.el("path", {
            d: "M29.41 6.111s-4.45-2.379-8.202 5.771c-1.734 3.766-4.35 1.546-4.35 1.546",
          }),
          SVG.el("path", {
            d: "M36.42 8.825c0 .463-.14.873-.432 1.164l-9.335 9.301c.282-.29.41-.668.41-1.12 0-.874-.507-1.963-1.406-2.868-1.362-1.358-3.147-1.8-4.002-.99L30.99 5.01c.844-.84 2.65-.41 4.035.96.898.904 1.396 1.982 1.396 2.855M10.515 33.774a23.74 23.74 0 0 1-1.764.83L4.5 36.382l1.786-4.235c.258-.604.529-1.186.833-1.757.69.183 1.449.625 2.109 1.282.659.658 1.102 1.412 1.287 2.102",
            fill: "#4C97FF",
          }),
          SVG.el("path", {
            d: "M36.498 8.748c0 .464-.141.874-.433 1.165l-19.742 19.68c-2.131 2.111-4.673 3.793-7.572 5.01L4.5 36.381l.974-2.317 1.925-.808c2.899-1.218 5.441-2.899 7.572-5.01l19.742-19.68c.292-.292.432-.702.432-1.165 0-.647-.27-1.4-.779-2.123.249.172.498.377.736.614.898.905 1.396 1.983 1.396 2.856",
            fill: "#0b8e69",
            opacity: ".15",
          }),
          SVG.el("path", {
            d: "M18.45 12.831a.904.904 0 1 1-1.807 0 .904.904 0 0 1 1.807 0z",
            fill: "#0b8e69",
          }),
        ]),
        {
          id: "sb3-penBlock-high-contrast",
          stroke: "#0b8e69",
          fill: "none",
          "stroke-linejoin": "round",
        },
      ),
      SVG.setProps(
        SVG.group([
          SVG.el("circle", {
            opacity: 0.25,
            cx: 32,
            cy: 16,
            r: 4.5,
          }),
          SVG.el("circle", {
            opacity: 0.5,
            cx: 32,
            cy: 12,
            r: 4.5,
          }),
          SVG.el("circle", {
            opacity: 0.75,
            cx: 32,
            cy: 8,
            r: 4.5,
          }),
          SVG.el("circle", {
            cx: 32,
            cy: 4,
            r: 4.5,
          }),
          SVG.el("path", {
            d: "M22.672 4.42l-6.172 4V6.1c0-2.01-1.563-3.6-3.5-3.6H4.1C2.076 2.5.5 4.076.5 6.1V14c0 1.927 1.584 3.512 3.6 3.6H13c1.902 0 3.5-1.653 3.5-3.6v-2.283l6.257 3.754.097.075c.02.02.098.054.146.054.267 0 .5-.217.5-.5V4.8c0 .037-.056-.094-.129-.243-.145-.242-.43-.299-.7-.137z",
            fill: "#000",
            "stroke-linejoin": "round",
          }),
        ]),
        {
          id: "sb3-videoBlock-high-contrast",
          stroke: "#0b8e69",
          fill: "#FFF",
          "stroke-opacity": 0.15,
        },
      ),
      SVG.setProps(
        SVG.group([
          SVG.el("path", {
            d: "M25.644 20.5c-1.667 1.937-4.539 3.429-5.977 3.429a1.25 1.25 0 0 1-.557-.137c-.372-.186-.61-.542-.61-1.03 0-.105.017-.207.05-.308.076-.236.624-.986.727-1.173.27-.484.462-1.075.566-1.865A8.5 8.5 0 0 1 24 3.5h4a8.5 8.5 0 1 1 0 17h-2.356z",
            fill: "#FFF",
            stroke: "#0b8e69",
          }),
          SVG.el("path", {
            d: "M15.5 21.67c0-1.016-1.494-1.586-2.387-.782l-2.7 2.163A5.958 5.958 0 0 1 6.7 24.33h-.4c-1.035 0-1.8.69-1.8 1.573v4.235c0 .883.765 1.572 1.8 1.572h.4c1.458 0 2.754.423 3.82 1.287l2.598 2.161c.908.75 2.382.188 2.382-.876V21.67z",
            fill: "#000",
          }),
        ]),
        {
          id: "sb3-ttsBlock-high-contrast",
          "stroke-opacity": 0.15,
        },
      ),

      // The original icon is in PNG, but the high contrast version uses SVG.
      // For consistency we use PNG in both places.
      // https://github.com/scratchfoundation/scratch-gui/blob/beta/src/lib/themes/high-contrast/extensions/translateIcon.svg
      // Exported via Inkscape and compressed
      SVG.el("image", {
        id: "sb3-translateBlock-high-contrast",
        width: "40px",
        height: "40px",
        href: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAxoAAARjCAMAAADfFKLnAAABhlBMVEUAAAALjWkOj2oLjmkAAAAQj2wkmnkYlHILj2kLjmkAAAAAAABsu6VouaIJjmgimncAAAAAAAALjml0v6kAAAAAAAAAAAAATzhjt6A9pogVk28XlHAVk28ZlHEAAAAAAAAAAAANj2oAAAAJj2oAAAAAAAByvahsu6VVsZcqnXwAAAAAAAAAAAAMj2oQkWsAAAAPkGwAAABHqo4AAAAclnMcl3MKj2kXlHIXk3EAAAALj2gAAAD///8AAAB9w6+ExrONyrmHyLWrzv/3+/r8/v6Fx7VpqP/0+fh7s/9Ml//4/PvK59/4+//u9f/l8P/V5v9vrP9an/9Smv/o6OjMzMwrKysDAwPp8//e7P+w0f+axf9xrf9kpf9jpP9ho/9Nl//e3t7E5Nu+4dfT09OUzb2QzLuZmZlMrJKGhoYpnHxlZWVgYGBCQkINDQ30+P/J4P/D3P+11P+Nvf90rv9Jlvby8vLc3Nyl1cik1ce+vr6DxrKlpaWfn58xnJZBpJWJiYl+fn4fHx9PedmHAAAAPHRSTlMAd4OAxg/0wohyDv78+Tj16Ik6+ux+WAb79e7mvbCemW1rZDYXC/n39PTw39u8t7RVNvX11NLDm5qOWx0x5AFdAAAGd0lEQVR42uzbV3faQBCG4XGChMEU4wLujntv6WXXIUAwxd3Gvfea3nv+eQaBcgS5ztV8zwWMfsB7js7uiAAAAAAAAP6fgKfCwRMg1l49OBzqJgC5DLfZO+nQa7oNovq2Ia2rJwhArFZ/QpVI+Fspr57b8BKAUAEzrgpmXhSHjBmgvDGtQwQglKdWFaU27KnWQ0TekEvruvYwAYh08ym3ML0ei8V2NvlnfZofn98gorC2DBKASFYaq8md9MLW1kJ6O7lqp9Hj0qzqFgGIxGlYtjeUepPkwU6D20AZIJidRmxhZnbxtTMN8rpQBshlpzGdTL2dTzjSYJEnBCCVnYaaS++uqb9pAEhnpzGXXFycn1PZo2g0ejpiL410EYBQhTRepnZTs2vz776f+yYd/EG3QQAiWVd+s+nNV/yX+NEQVyXiDS0EIFKNmeAEZlRe9jyuysSDNQQgkrsvo4qOfOofvgoCEMloNWs/cgNTx9FT+7RqaUV/KI7PcFoFYgVG+7iMxpbK+19UwU+tfyENEC/SvK+yAw8cdxy5XO53AmmAdI8bD/qbxh13HMv67Ex/RhogXVfzvQ6DHGlc6L09fYk0AJgjjalrza7fIw2QrjtSksZXfXFycqm/IQ0QrrPK5XWmcbWylD+/vUIaIFtnldaFNjx+lbd8qNjhMq78QDQug7l6eAwE46pMxsSiCAhVpy1hYu7y9cKM300AMoXbOQ5XyEvMaAn6opbjKQ7jkw9L6SBZSOsxe66pqLSMNnIb/hG8TYFk3mqt66nMw4Gs2m+OEIBgE9zGcFtZHeNN/Qe3OwhAsu5HQ3fq2qiU0XG3Cd+GAwAAAAD8YQ8OBAAAAACA/F8bQVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVYQ8OBAAAAACA/F8bQVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV2IMDAQAAAAAg/9dGUFVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVUV9uBAAAAAAADI/7URVFVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVWFPTgQAAAAAADyf20EVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVhDw4EAAAAAID8XxtBVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVXYgwMBAAAAACD/10ZQVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVRX24EAAAAAAAMj/tRFUVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVYU9OBAAAAAAAPJ/bQRVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVWEPDgQAAAAAgPxfG0FVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVdiDAwEAAAAAIP/XRlBVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVFfbgQAAAAAAAyP+1EVRVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVhT04EAAAAAAA8n9tBFVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVYQ8OBAAAAACA/F8bQVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV2oNDAgAAAABB/1/7wgQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMArKwCvdMdAc1YAAAAASUVORK5CYII=",
      }),
    ]
  }

  /**
   * @return the icon name with suffix, if a high contrast icon is defined
   */
  static iconName(name, options) {
    if (options.isHighContrast && highContrastIcons.has(name)) {
      return `${name}-high-contrast`
    }

    return name
  }

  static makeStyle() {
    const style = SVG.el("style")
    style.appendChild(SVG.cdata(Style.cssContent))
    return style
  }

  static get defaultFont() {
    return "Helvetica Neue, Helvetica, sans-serif"
  }
  static get commentFont() {
    return "Helvetica Neue, Helvetica, sans-serif"
  }

  static zebraFilter(id, isDark) {
    const f = new Filter(id)

    f.merge([
      "SourceGraphic",
      f.comp("in", f.flood(isDark ? "#000" : "#fff", 0.3), "SourceAlpha"),
    ])

    return f.el
  }
}
