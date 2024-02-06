/* for constructing SVGs */

function assert(bool, message) {
  if (!bool) {
    throw new Error(`Assertion failed! ${message || ""}`)
  }
}

// set by SVG.init
let document
let xml

const directProps = {
  textContent: true,
}

export default class SVG {
  static init(window) {
    document = window.document
    const DOMParser = window.DOMParser
    xml = new DOMParser().parseFromString("<xml></xml>", "application/xml")
    SVG.XMLSerializer = window.XMLSerializer
  }

  static makeCanvas() {
    return document.createElement("canvas")
  }

  static cdata(content) {
    return xml.createCDATASection(content)
  }

  static el(name, props) {
    const el = document.createElementNS("http://www.w3.org/2000/svg", name)
    return SVG.setProps(el, props)
  }

  static setProps(el, props) {
    for (const key in props) {
      const value = String(props[key])
      if (directProps[key]) {
        el[key] = value
      } else if (
        props[key] != null &&
        Object.prototype.hasOwnProperty.call(props, key)
      ) {
        el.setAttributeNS(null, key, value)
      }
    }
    return el
  }

  static withChildren(el, children) {
    for (const child of children) {
      el.appendChild(child)
    }
    return el
  }

  static group(children) {
    return SVG.withChildren(SVG.el("g"), children)
  }

  static newSVG(width, height, scale) {
    return SVG.el("svg", {
      version: "1.1",
      width: width * scale,
      height: height * scale,
      viewBox: `0 0 ${width} ${height}`,
    })
  }

  static polygon(props) {
    return SVG.el("polygon", { ...props, points: props.points.join(" ") })
  }

  static path(props) {
    return SVG.el("path", { ...props, path: null, d: props.path.join(" ") })
  }

  static text(x, y, content, props) {
    const text = SVG.el("text", { ...props, x: x, y: y, textContent: content })
    return text
  }

  static symbol(href) {
    return SVG.el("use", {
      href: href,
    })
  }

  static move(dx, dy, el) {
    
    let currentValue = el.getAttributeNS(null, 'transform')
    if (!currentValue) {
      SVG.setProps(el, {
        transform: `translate(${dx} ${dy})`,
      })
    } else {
      SVG.setProps(el, {
        transform: `translate(${dx} ${dy}) ${currentValue}`,
      })
    }
    return el
  }

  // translatePath takes a path string such as "M 0 0 L 0 10 L 10 0 Z", fins
  // the individual X/Y components, and translates them by dx/dy, so as to
  // "move" the path.
  //
  // This is not a particularly good way of doing this, but given we control
  // the inputs to it it works well enough I guess?
  static translatePath(dx, dy, path) {
    let isX = true
    const parts = path.split(/\s+/)
    const out = []
    for (let i = 0; i < parts.length; i++) {
      let part = parts[i]
      if (part === "A") {
        const j = i + 5
        out.push("A")
        while (i < j) {
          out.push(parts[++i])
        }
        continue
      } else if (/[A-Za-z]/.test(part)) {
        // This assertion means the path was not a valid sequence of
        // [operation, X coordinate, Y coordinate, ...].
        //
        // It could indicate missing whitespace between the coordinates and the
        // operation.
        assert(isX, "translatePath: invalid argument")
      } else {
        part = +part
        part += isX ? dx : dy
        isX = !isX
      }
      out.push(part)
    }
    return out.join(" ")
  }

  /* shapes */

  static rect(w, h, props) {
    return SVG.el("rect", { ...props, x: 0, y: 0, width: w, height: h })
  }

  static ellipse(w, h, props) {
    return SVG.el("ellipse", {
      ...props,
      cx: w / 2,
      cy: h / 2,
      rx: w / 2,
      ry: h / 2,
    })
  }

  static arc(p1x, p1y, p2x, p2y, rx, ry) {
    return `L ${p1x} ${p1y} A ${rx} ${ry} 0 0 1 ${p2x} ${p2y}`
  }

  static arcw(p1x, p1y, p2x, p2y, rx, ry) {
    return `L ${p1x} ${p1y} A ${rx} ${ry} 0 0 0 ${p2x} ${p2y}`
  }

  static roundedPath(w, h) {
    const r = h / 2
    return [
      "M",
      r,
      0,
      SVG.arc(w - r, 0, w - r, h, r, r),
      SVG.arc(r, h, r, 0, r, r),
      "Z",
    ]
  }

  static roundedRect(w, h, props) {
    return SVG.path({ ...props, path: SVG.roundedPath(w, h) })
  }

  static getRoundedTop(w, h) {
    return `M 0 10
      C 0 5 5 0 10 0
      L ${w - 10} 0
      C ${w - 5} 0 ${w} 5 ${w} 10`
  }

  static getRoundedBottom(w, h) {
    return `L ${w} ${h - 10}
      C ${w} ${h - 5} ${w - 5} ${h} ${w - 10} ${h}
      L 10 ${h}
      C 5 ${h} 0 ${h - 5} 0 ${h - 10}`
  }

  static pointedPath(w, h) {
    const r = h / 2
    return [
      "M",
      r,
      0,
      "L",
      w - r,
      0,
      w,
      r,
      "L",
      w,
      r,
      w - r,
      h,
      "L",
      r,
      h,
      0,
      r,
      "L",
      0,
      r,
      r,
      0,
      "Z",
    ]
  }

  static getPointedTop(w, h) {
    const r = 8
    return  `M ${r} ${h} L 0 ${h / 2} ${r} 0 L ${w - r} 0`
  }

  static getPointedBottom(w, h, showRight) {
    const r = 8
    let path = ``
    if (showRight) {
      path += `L ${w} ${h / 2} `
    }
    path += `L ${w - r} ${h}`
    return path
  }

  static pointedRect(w, h, props) {
    return SVG.path({
      ...props,
      path: [SVG.getPointedTop(w,h), SVG.getPointedBottom(w,h,true)]
    })
  }

  static getTop(w) {
    return `M 0 5
      C 0 2 2 0 5 0
      L 13 0
      L 16 3
      L 24 3
      L 27 0
      L ${w - 5} 0
      C ${w - 2} 0 ${w} 2 ${w} 5`
  }

  static getRingTop(w) {
    return `M 0 3
      L 3 0
      L 7 0
      L 10 3
      L 16 3
      L 19 0
      L ${w - 3} 0
      L ${w} 3`
  }

  static getRightAndBottom(w, y, hasNotch, inset) {
    if (typeof inset === "undefined") {
      inset = 0
    }
    let arr = ["L", w, y - 5, "C", w, y - 2, w - 2, y, w - 5, y]
    if (hasNotch) {
      arr = arr.concat([
        "L",
        inset + 27,
        y,
        "L",
        inset + 24,
        y + 3,
        "L",
        inset + 16,
        y + 3,
        "L",
        inset + 13,
        y,
      ])
    }
    if (inset > 0) {
      arr = arr.concat(["L", inset + 5, y,])
      arr = arr.concat([
        "C",
        inset + 2,
        y,
        inset,
        y + 2,
        inset,
        y + 5,
      ])
    } else {
      arr = arr.concat(["L", inset + 5, y,])
      arr = arr.concat([
        "C",
        inset + 2,
        y,
        inset,
        y - 2,
        inset,
        y - 5,
      ])
    }
    return arr.join(" ")
  }

  static getArm(w, armTop, inset) {
    if (!inset && inset !== 0) {
      inset = 10
    }
    return `L ${inset} ${armTop - 5}
      C ${inset} ${armTop - 2} ${inset + 2} ${armTop} ${inset + 5} ${armTop}
      L ${w - 5} ${armTop}
      C ${w - 2} ${armTop} ${w} ${armTop + 2} ${w} ${armTop + 5}`
  }

  static stackRect(w, h, props) {
    return SVG.path({
      ...props,
      path: [SVG.getTop(w), SVG.getRightAndBottom(w, h, true, 0), "Z"],
    })
  }

  static capPath(w, h) {
    return [SVG.getTop(w), SVG.getRightAndBottom(w, h, false, 0), "Z"]
  }

  static capRect(w, h, props) {
    return SVG.path({ ...props, path: SVG.capPath(w, h) })
  }

  static hatRect(w, h, props) {
    return SVG.path({
      ...props,
      path: [
        "M",
        0,
        12,
        SVG.arc(0, 12, 35, 0, 50, 50),
        "C", 70, 0, 70, 12, Math.min(70 * 1.7, w - 5), 12,
        "L",
        w - 5,
        12,
        `C ${w - 2} 12 ${w} 13 ${w} 17`,
        SVG.getRightAndBottom(w, h, true),
        "Z",
      ],
    })
  }

  static curve(p1x, p1y, p2x, p2y, roundness) {
    roundness = roundness || 0.42
    const midX = (p1x + p2x) / 2.0
    const midY = (p1y + p2y) / 2.0
    const cx = Math.round(midX + roundness * (p2y - p1y))
    const cy = Math.round(midY - roundness * (p2x - p1x))
    return `${cx} ${cy} ${p2x} ${p2y}`
  }

  static procHatBase(w, h, archRoundness, props) {
    // TODO use arc()
    archRoundness = Math.min(0.2, 35 / w)
    return SVG.path({
      ...props,
      path: [
        "M",
        0,
        15,
        "Q",
        SVG.curve(0, 15, w, 15, archRoundness),
        SVG.getRightAndBottom(w, h, true),
        "M",
        -1,
        13,
        "Q",
        SVG.curve(-1, 13, w + 1, 13, archRoundness),
        "Q",
        SVG.curve(w + 1, 13, w, 16, 0.6),
        "Q",
        SVG.curve(w, 16, 0, 16, -archRoundness),
        "Q",
        SVG.curve(0, 16, -1, 13, 0.6),
        "Z",
      ],
    })
  }

  static procHatCap(w, h, archRoundness) {
    // TODO use arc()
    // TODO this doesn't look quite right
    return SVG.path({
      path: [
        "M",
        -1,
        13,
        "Q",
        SVG.curve(-1, 13, w + 1, 13, archRoundness),
        "Q",
        SVG.curve(w + 1, 13, w, 16, 0.6),
        "Q",
        SVG.curve(w, 16, 0, 16, -archRoundness),
        "Q",
        SVG.curve(0, 16, -1, 13, 0.6),
        "Z",
      ],
      class: "snap-define-hat-cap",
    })
  }

  static procHatRect(w, h, props) {
    const q = 52
    const y = h - q

    const archRoundness = Math.min(0.2, 35 / w)

    return SVG.move(
      0,
      y,
      SVG.group([
        SVG.procHatBase(w, q, archRoundness, props),
        SVG.procHatCap(w, q, archRoundness),
      ]),
    )
  }

  static mouthRect(w, h, isFinal, lines, props) {
    let y = lines[0].height
    const p = [SVG.getTop(w), SVG.getRightAndBottom(w, y, true, 15)]
    for (let i = 1; i < lines.length; i += 2) {
      const isLast = i + 2 === lines.length

      y += lines[i].height - 3
      p.push(SVG.getArm(w, y))

      const hasNotch = !(isLast && isFinal)
      const inset = isLast ? 0 : 15
      y += lines[i + 1].height + 3
      p.push(SVG.getRightAndBottom(w, y, hasNotch, inset))
    }
    return SVG.path({ ...props, path: p })
  }

  static ringRect(w, h, cy, cw, ch, shape, props) {
    const r = 8
    const func =
      shape === "reporter"
        ? SVG.roundedPath
        : shape === "boolean"
        ? SVG.pointedPath
        : SVG.capPath
    return SVG.path({
      ...props,
      path: [
        "M",
        r,
        0,
        SVG.arcw(r, 0, 0, r, r, r),
        SVG.arcw(0, h - r, r, h, r, r),
        SVG.arcw(w - r, h, w, h - r, r, r),
        SVG.arcw(w, r, w - r, 0, r, r),
        "Z",
        SVG.translatePath(4, cy || 4, func(cw, ch).join(" ")),
      ],
      "fill-rule": "even-odd",
    })
  }

  static commentRect(w, h, props) {
    const r = 6
    return SVG.path({
      ...props,
      class: "snap-comment",
      path: [
        "M",
        r,
        0,
        SVG.arc(w - r, 0, w, r, r, r),
        SVG.arc(w, h - r, w - r, h, r, r),
        SVG.arc(r, h, 0, h - r, r, r),
        SVG.arc(0, r, r, 0, r, r),
        "Z",
      ],
    })
  }

  static commentLine(width, props) {
    return SVG.move(
      -width,
      9,
      SVG.rect(width, 2, { ...props, class: "snap-comment-line" }),
    )
  }

  static strikethroughLine(w, props) {
    return SVG.path({
      ...props,
      path: ["M", 0, 0, "L", w, 0],
      class: "snap-diff snap-diff-del",
    })
  }

  static rgbToHex (r, g, b) {
    if (r > 255) r = 255; else if (r < 0) r = 0;
    if (g > 255) g = 255; else if (g < 0) g = 0;
    if (b > 255) b = 255; else if (b < 0) b = 0;
    return `#${[r, g, b]
      .map((n) =>
        n.toString(16).length === 1 ? "0" + n.toString(16) : n.toString(16)
      )
      .join("")}`;
  }

  // static translatePath(segments, x, y) {
  //   // y is optional
  //   y = y || 0
  // 
  //   return segments.map(function(segment) {
  //     var cmd = segment[0]
  // 
  //     // Shift coords only for commands with absolute values
  //     if ('ACHLMRQSTVZ'.indexOf(cmd) === -1) {
  //       return segment
  //     }
  // 
  //     var name  = cmd.toLowerCase()
  // 
  //     // V is the only command, with shifted coords parity
  //     if (name === 'v') {
  //       segment[1] += y
  //       return segment
  //     }
  // 
  //     // ARC is: ['A', rx, ry, x-axis-rotation, large-arc-flag, sweep-flag, x, y]
  //     // touch x, y only
  //     if (name === 'a') {
  //       segment[6] += x
  //       segment[7] += y
  //       return segment
  //     }
  // 
  //     // All other commands have [cmd, x1, y1, x2, y2, x3, y3, ...] format
  //     return segment.map(function(val, i) {
  //       if (!i) {
  //         return val
  //       }
  //       return i % 2 ? val + x : val + y
  //     })
  //   })
  // }
}
