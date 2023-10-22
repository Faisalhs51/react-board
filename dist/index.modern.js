import { jsxs, jsx } from 'react/jsx-runtime';

function _extends() {
  _extends = Object.assign ? Object.assign.bind() : function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  return _extends.apply(this, arguments);
}

var _class;
class Ascii {}
_class = Ascii;
Ascii.initialFen = () => {
  return 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq -';
};
Ascii.toFen = ascii => {
  let string = '';
  ascii.forEach((rank, i) => {
    string += rank.join('').replace(/\s/g, '');
    string += '/';
  });
  string = string.slice(0, -1);
  let filtered = '';
  let strSplit = string.split('');
  let n = 1;
  strSplit.forEach((item, i) => {
    if (strSplit[i] === '.') {
      if (strSplit[i + 1] === '.') {
        n++;
      } else {
        filtered += n;
        n = 1;
      }
    } else {
      filtered += strSplit[i];
      n = 1;
    }
  });
  return filtered;
};
Ascii.flip = (color, ascii) => {
  if (color === 'b') {
    let flipped = ascii.map(rank => new Array(rank.length));
    const nFiles = ascii[0].length;
    const nRanks = ascii.length;
    ascii.forEach((rank, i) => {
      rank.forEach((file, j) => {
        let k = nRanks - 1 - i;
        let l = nFiles - (j + 1);
        flipped[i][j] = ascii[k][l];
      });
    });
    return flipped;
  }
  return ascii;
};
Ascii.toAscii = fen => {
  let arr = fen.split('/').map(rank => {
    let row = [];
    let digits = [...rank.matchAll(/[0-9]+/g)].map(item => [item.index, parseInt(item[0])]);
    let letters = [...rank.matchAll(/[a-zA-Z]{1}/g)].map(item => [item.index, item[0]]);
    [...digits, ...letters].sort((a, b) => a[0] - b[0]).forEach(item => {
      let elem;
      typeof item[1] === 'number' ? elem = Array(item[1]).fill(' . ') : elem = [` ${item[1]} `];
      row = [...row, ...elem];
    });
    return row;
  });
  return arr;
};
Ascii.fromIndexToAlgebraic = (i, j, size) => {
  const file = String.fromCharCode(97 + j);
  const rank = size.ranks - i;
  return file + rank;
};
Ascii.fromAlgebraicToIndex = (sq, size) => {
  const i = size.ranks - sq.charAt(1);
  const j = sq.charAt(0).charCodeAt(0) - 97;
  return [i, j];
};
Ascii.asciiDiff = (a, b) => {
  let sqs = [];
  a.forEach((rank, i) => {
    rank.forEach((file, j) => {
      if (a[i][j] !== b[i][j]) {
        sqs.push({
          from: a[i][j],
          to: b[i][j],
          sq: _class.fromIndexToAlgebraic(i, j, {
            files: a.length,
            ranks: rank.length
          })
        });
      }
    });
  });
  return sqs;
};
Ascii.sqDiff = (a, b) => {
  let diff = {
    files: Math.abs(a.charCodeAt(0) - b.charCodeAt(0)),
    ranks: Math.abs(a.charCodeAt(1) - b.charCodeAt(1))
  };
  return diff;
};
Ascii.xAxisSign = (a, b, color, flip) => {
  const sign = Math.sign(a.charCodeAt(0) - b.charCodeAt(0));
  if (color === 'w') {
    if (flip === 'w') {
      return -sign;
    } else {
      return sign;
    }
  } else {
    if (flip === 'w') {
      return -sign;
    } else {
      return sign;
    }
  }
};
Ascii.yAxisSign = (a, b, color, flip) => {
  const sign = Math.sign(a.charCodeAt(1) - b.charCodeAt(1));
  if (color === 'w') {
    if (flip === 'w') {
      return sign;
    } else {
      return -sign;
    }
  } else {
    if (flip === 'w') {
      return sign;
    } else {
      return -sign;
    }
  }
};
Ascii.longAlgebraicNotation = (a, b) => {
  const diff = _class.asciiDiff(a, b);
  let sorted = [];
  let from = diff.find(item => item.from === ' K ' || item.from === ' k ');
  let to = diff.find(item => item.to === ' K ' || item.to === ' k ');
  if (from && to) {
    // castling
    sorted.push(from.sq);
    sorted.push(to.sq);
  } else if (diff.length === 3) {
    // en passant
    from = diff.find(item => item.from === ' P ' || item.from === ' p ');
    to = diff.find(item => item.to === ' P ' || item.to === ' p ');
    sorted.push(from.sq);
    sorted.push(to.sq);
  } else if (diff[0].to === ' . ') {
    sorted.push(diff[0].sq);
    sorted.push(diff[1].sq);
  } else {
    sorted.push(diff[1].sq);
    sorted.push(diff[0].sq);
  }
  return sorted;
};

const SvgBlackArchbishop = props => /*#__PURE__*/jsxs("svg", _extends({
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 45 45",
  width: "100%",
  height: "100%"
}, props, {
  children: [/*#__PURE__*/jsx("path", {
    fillRule: "evenodd",
    stroke: "#000",
    strokeLinejoin: "round",
    strokeWidth: 1.5,
    d: "M36 36c-3.385-.972-10.115.43-13.5-2-3.385 2.43-10.115 1.028-13.5 2 0 0-1.646.542-3 2 .677.972 1.646.986 3 .5 3.385-.972 10.115.458 13.5-1 3.385 1.458 10.115.028 13.5 1 1.354.486 2.323.472 3-.5-1.354-1.945-3-2-3-2z"
  }), /*#__PURE__*/jsx("path", {
    fillRule: "evenodd",
    stroke: "#000",
    strokeLinejoin: "round",
    strokeWidth: 1.5,
    d: "M30 32c-2.5 2.5-12.5 2.5-15 0-.5-1.5 0-2 0-2h15s.5.5 0 2z"
  }), /*#__PURE__*/jsx("path", {
    fill: "none",
    stroke: "#000",
    strokeWidth: 1.5,
    d: "M30 30H15"
  }), /*#__PURE__*/jsxs("g", {
    strokeLinecap: "round",
    style: {
      cursor: "grab"
    },
    children: [/*#__PURE__*/jsx("path", {
      fillRule: "evenodd",
      stroke: "#000",
      strokeWidth: 1.14813,
      d: "M20.345 7.627c8.036.765 12.629 6.123 12.246 22.197H14.987c0-6.889 7.654-4.975 6.123-16.074"
    }), /*#__PURE__*/jsx("path", {
      fillRule: "evenodd",
      stroke: "#000",
      strokeLinejoin: "round",
      strokeWidth: 1.14813,
      d: "M21.875 13.75c.295 2.229-4.25 5.64-6.123 6.889-2.296 1.53-2.158 3.324-3.827 3.062-.797-.723 1.082-2.325 0-2.297-.765 0 .143.943-.765 1.531-.766 0-3.065.766-3.062-3.061 0-1.531 4.592-9.185 4.592-9.185s1.444-1.456 1.531-2.68c-.556-.76-.383-1.53-.383-2.296.766-.765 2.297 1.914 2.297 1.914h1.53s.599-1.525 1.914-2.296c.766 0 .766 2.296.766 2.296"
    }), /*#__PURE__*/jsx("path", {
      stroke: "#fff",
      strokeLinejoin: "round",
      strokeWidth: 1.14813,
      d: "M10.777 19.49a.383.383 0 1 1-.766 0 .383.383 0 1 1 .766 0zM14.936 12.028a.383 1.148 30 1 1-.663-.382.383 1.148 30 1 1 .663.382z"
    }), /*#__PURE__*/jsx("path", {
      fillRule: "evenodd",
      stroke: "#fff",
      strokeWidth: 0.76542,
      d: "M31.826 29.824c.765-15.308-4.21-21.049-9.185-21.814"
    })]
  }), /*#__PURE__*/jsx("path", {
    stroke: "#fff",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    strokeWidth: 1.5,
    d: "M15 30h15"
  })]
}));

const SvgBlackBishop = props => /*#__PURE__*/jsx("svg", _extends({
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 45 45",
  width: "100%",
  height: "100%"
}, props, {
  children: /*#__PURE__*/jsxs("g", {
    style: {
      opacity: 1,
      fill: "none",
      fillRule: "evenodd",
      fillOpacity: 1,
      stroke: "#000",
      strokeWidth: 1.5,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      strokeMiterlimit: 4,
      strokeDasharray: "none",
      strokeOpacity: 1,
      cursor: "grab"
    },
    children: [/*#__PURE__*/jsxs("g", {
      style: {
        fill: "#000",
        stroke: "#000",
        strokeLinecap: "butt"
      },
      children: [/*#__PURE__*/jsx("path", {
        d: "M9 36c3.39-.97 10.11.43 13.5-2 3.39 2.43 10.11 1.03 13.5 2 0 0 1.65.54 3 2-.68.97-1.65.99-3 .5-3.39-.97-10.11.46-13.5-1-3.39 1.46-10.11.03-13.5 1-1.35.49-2.32.47-3-.5 1.35-1.46 3-2 3-2z"
      }), /*#__PURE__*/jsx("path", {
        d: "M15 32c2.5 2.5 12.5 2.5 15 0 .5-1.5 0-2 0-2 0-2.5-2.5-4-2.5-4 5.5-1.5 6-11.5-5-15.5-11 4-10.5 14-5 15.5 0 0-2.5 1.5-2.5 4 0 0-.5.5 0 2z"
      }), /*#__PURE__*/jsx("path", {
        d: "M25 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 1 1 5 0z"
      })]
    }), /*#__PURE__*/jsx("path", {
      d: "M17.5 26h10M15 30h15m-7.5-14.5v5M20 18h5",
      style: {
        fill: "none",
        stroke: "#fff",
        strokeLinejoin: "miter"
      }
    })]
  })
}));

const SvgBlackChancellor = props => /*#__PURE__*/jsxs("svg", _extends({
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 45 45",
  width: "100%",
  height: "100%"
}, props, {
  children: [/*#__PURE__*/jsx("path", {
    fillRule: "evenodd",
    stroke: "#000",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    strokeWidth: 1.5,
    d: "m34 34.82-3-3H14l-3 3"
  }), /*#__PURE__*/jsx("path", {
    fillRule: "evenodd",
    stroke: "#000",
    strokeLinejoin: "round",
    strokeWidth: 1.5,
    d: "M11 34.82v5h4v-2h5v2h5v-2h5v2h4v-5"
  }), /*#__PURE__*/jsx("path", {
    fillRule: "evenodd",
    stroke: "#000",
    strokeWidth: 1.5,
    d: "M31.553 32.109v-2.115H13.448v2.115"
  }), /*#__PURE__*/jsx("path", {
    fill: "none",
    stroke: "#fff",
    strokeLinecap: "round",
    d: "M11 34.82h23"
  }), /*#__PURE__*/jsxs("g", {
    strokeLinecap: "round",
    style: {
      cursor: "grab"
    },
    children: [/*#__PURE__*/jsx("path", {
      fillRule: "evenodd",
      stroke: "#000",
      strokeWidth: 1.14813,
      d: "M20.345 7.627c8.036.765 12.629 6.123 12.246 22.197H14.987c0-6.889 7.654-4.975 6.123-16.074"
    }), /*#__PURE__*/jsx("path", {
      fillRule: "evenodd",
      stroke: "#000",
      strokeLinejoin: "round",
      strokeWidth: 1.14813,
      d: "M21.875 13.75c.295 2.229-4.25 5.64-6.123 6.889-2.296 1.53-2.158 3.324-3.827 3.062-.797-.723 1.082-2.325 0-2.297-.765 0 .143.943-.765 1.531-.766 0-3.065.766-3.062-3.061 0-1.531 4.592-9.185 4.592-9.185s1.444-1.456 1.531-2.68c-.556-.76-.383-1.53-.383-2.296.766-.765 2.297 1.914 2.297 1.914h1.53s.599-1.525 1.914-2.296c.766 0 .766 2.296.766 2.296"
    }), /*#__PURE__*/jsx("path", {
      stroke: "#fff",
      strokeLinejoin: "round",
      strokeWidth: 1.14813,
      d: "M10.777 19.49a.383.383 0 1 1-.766 0 .383.383 0 1 1 .766 0zM14.936 12.028a.383 1.148 30 1 1-.663-.382.383 1.148 30 1 1 .663.382z"
    }), /*#__PURE__*/jsx("path", {
      fill: "none",
      stroke: "#fff",
      strokeWidth: 0.76542,
      d: "M31.826 29.824c.765-15.308-4.21-21.049-9.185-21.814"
    })]
  }), /*#__PURE__*/jsx("path", {
    fill: "none",
    stroke: "#fff",
    strokeWidth: 1.5,
    d: "M30 30H15"
  })]
}));

const SvgBlackKing = props => /*#__PURE__*/jsx("svg", _extends({
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 45 45",
  width: "100%",
  height: "100%"
}, props, {
  children: /*#__PURE__*/jsxs("g", {
    style: {
      fill: "none",
      fillOpacity: 1,
      fillRule: "evenodd",
      stroke: "#000",
      strokeWidth: 1.5,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      strokeMiterlimit: 4,
      strokeDasharray: "none",
      strokeOpacity: 1,
      cursor: "grab"
    },
    children: [/*#__PURE__*/jsx("path", {
      d: "M22.5 11.63V6",
      style: {
        fill: "none",
        stroke: "#000",
        strokeLinejoin: "miter"
      }
    }), /*#__PURE__*/jsx("path", {
      d: "M22.5 25s4.5-7.5 3-10.5c0 0-1-2.5-3-2.5s-3 2.5-3 2.5c-1.5 3 3 10.5 3 10.5",
      style: {
        fill: "#000",
        fillOpacity: 1,
        strokeLinecap: "butt",
        strokeLinejoin: "miter"
      }
    }), /*#__PURE__*/jsx("path", {
      d: "M12.5 37c5.5 3.5 14.5 3.5 20 0v-7s9-4.5 6-10.5c-4-6.5-13.5-3.5-16 4V27v-3.5c-2.5-7.5-12-10.5-16-4-3 6 6 10.5 6 10.5v7",
      style: {
        fill: "#000",
        stroke: "#000"
      }
    }), /*#__PURE__*/jsx("path", {
      d: "M20 8h5",
      style: {
        fill: "none",
        stroke: "#000",
        strokeLinejoin: "miter"
      }
    }), /*#__PURE__*/jsx("path", {
      d: "M32 29.5s8.5-4 6.03-9.65C34.15 14 25 18 22.5 24.5v2.1-2.1C20 18 10.85 14 6.97 19.85 4.5 25.5 13 29.5 13 29.5",
      style: {
        fill: "none",
        stroke: "#fff"
      }
    }), /*#__PURE__*/jsx("path", {
      d: "M12.5 30c5.5-3 14.5-3 20 0m-20 3.5c5.5-3 14.5-3 20 0m-20 3.5c5.5-3 14.5-3 20 0",
      style: {
        fill: "none",
        stroke: "#fff"
      }
    })]
  })
}));

const SvgBlackKnight = props => /*#__PURE__*/jsx("svg", _extends({
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 45 45",
  width: "100%",
  height: "100%"
}, props, {
  children: /*#__PURE__*/jsxs("g", {
    style: {
      opacity: 1,
      fill: "none",
      fillOpacity: 1,
      fillRule: "evenodd",
      stroke: "#000",
      strokeWidth: 1.5,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      strokeMiterlimit: 4,
      strokeDasharray: "none",
      strokeOpacity: 1,
      cursor: "grab"
    },
    children: [/*#__PURE__*/jsx("path", {
      d: "M22 10c10.5 1 16.5 8 16 29H15c0-9 10-6.5 8-21",
      style: {
        fill: "#000",
        stroke: "#000"
      }
    }), /*#__PURE__*/jsx("path", {
      d: "M24 18c.38 2.91-5.55 7.37-8 9-3 2-2.82 4.34-5 4-1.042-.94 1.41-3.04 0-3-1 0 .19 1.23-1 2-1 0-4.003 1-4-4 0-2 6-12 6-12s1.89-1.9 2-3.5c-.73-.994-.5-2-.5-3 1-1 3 2.5 3 2.5h2s.78-1.992 2.5-3c1 0 1 3 1 3",
      style: {
        fill: "#000",
        stroke: "#000"
      }
    }), /*#__PURE__*/jsx("path", {
      d: "M9.5 25.5a.5.5 0 1 1-1 0 .5.5 0 1 1 1 0z",
      style: {
        fill: "#fff",
        stroke: "#fff"
      }
    }), /*#__PURE__*/jsx("path", {
      d: "M15 15.5a.5 1.5 0 1 1-1 0 .5 1.5 0 1 1 1 0z",
      style: {
        fill: "#fff",
        stroke: "#fff"
      },
      transform: "rotate(30 14.5 15.5)"
    }), /*#__PURE__*/jsx("path", {
      stroke: "none",
      d: "m24.55 10.4-.45 1.45.5.15c3.15 1 5.65 2.49 7.9 6.75S35.75 29.06 35.25 39l-.05.5h2.25l.05-.5c.5-10.06-.88-16.85-3.25-21.34-2.37-4.49-5.79-6.64-9.19-7.16l-.51-.1z",
      style: {
        fill: "#fff",
        stroke: "none"
      }
    })]
  })
}));

const SvgBlackPawn = props => /*#__PURE__*/jsx("svg", _extends({
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 45 45",
  width: "100%",
  height: "100%"
}, props, {
  children: /*#__PURE__*/jsx("path", {
    d: "M22.5 9c-2.21 0-4 1.79-4 4 0 .89.29 1.71.78 2.38C17.33 16.5 16 18.59 16 21c0 2.03.94 3.84 2.41 5.03-3 1.06-7.41 5.55-7.41 13.47h23c0-7.92-4.41-12.41-7.41-13.47 1.47-1.19 2.41-3 2.41-5.03 0-2.41-1.33-4.5-3.28-5.62.49-.67.78-1.49.78-2.38 0-2.21-1.79-4-4-4z",
    style: {
      opacity: 1,
      fill: "#000",
      fillOpacity: 1,
      fillRule: "nonzero",
      stroke: "#000",
      strokeWidth: 1.5,
      strokeLinecap: "round",
      strokeLinejoin: "miter",
      strokeMiterlimit: 4,
      strokeDasharray: "none",
      strokeOpacity: 1,
      cursor: "grab"
    }
  })
}));

const SvgBlackQueen = props => /*#__PURE__*/jsx("svg", _extends({
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 45 45",
  width: "100%",
  height: "100%"
}, props, {
  children: /*#__PURE__*/jsxs("g", {
    style: {
      fill: "#000",
      stroke: "#000",
      strokeWidth: 1.5,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      cursor: "grab"
    },
    children: [/*#__PURE__*/jsx("path", {
      d: "M9 26c8.5-1.5 21-1.5 27 0l2.5-12.5L31 25l-.3-14.1-5.2 13.6-3-14.5-3 14.5-5.2-13.6L14 25 6.5 13.5 9 26z",
      style: {
        strokeLinecap: "butt",
        fill: "#000"
      }
    }), /*#__PURE__*/jsx("path", {
      d: "M9 26c0 2 1.5 2 2.5 4 1 1.5 1 1 .5 3.5-1.5 1-1 2.5-1 2.5-1.5 1.5 0 2.5 0 2.5 6.5 1 16.5 1 23 0 0 0 1.5-1 0-2.5 0 0 .5-1.5-1-2.5-.5-2.5-.5-2 .5-3.5 1-2 2.5-2 2.5-4-8.5-1.5-18.5-1.5-27 0z"
    }), /*#__PURE__*/jsx("path", {
      d: "M11.5 30c3.5-1 18.5-1 22 0M12 33.5c6-1 15-1 21 0"
    }), /*#__PURE__*/jsx("circle", {
      cx: 6,
      cy: 12,
      r: 2
    }), /*#__PURE__*/jsx("circle", {
      cx: 14,
      cy: 9,
      r: 2
    }), /*#__PURE__*/jsx("circle", {
      cx: 22.5,
      cy: 8,
      r: 2
    }), /*#__PURE__*/jsx("circle", {
      cx: 31,
      cy: 9,
      r: 2
    }), /*#__PURE__*/jsx("circle", {
      cx: 39,
      cy: 12,
      r: 2
    }), /*#__PURE__*/jsx("path", {
      d: "M11 38.5a35 35 1 0 0 23 0",
      style: {
        fill: "none",
        stroke: "#000",
        strokeLinecap: "butt"
      }
    }), /*#__PURE__*/jsx("g", {
      style: {
        fill: "none",
        stroke: "#fff"
      },
      children: /*#__PURE__*/jsx("path", {
        d: "M11 29a35 35 1 0 1 23 0M12.5 31.5h20M11.5 34.5a35 35 1 0 0 22 0M10.5 37.5a35 35 1 0 0 24 0"
      })
    })]
  })
}));

const SvgBlackRook = props => /*#__PURE__*/jsx("svg", _extends({
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 45 45",
  width: "100%",
  height: "100%"
}, props, {
  children: /*#__PURE__*/jsxs("g", {
    style: {
      opacity: 1,
      fill: "#000",
      fillOpacity: 1,
      fillRule: "evenodd",
      stroke: "#000",
      strokeWidth: 1.5,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      strokeMiterlimit: 4,
      strokeDasharray: "none",
      strokeOpacity: 1,
      cursor: "grab"
    },
    children: [/*#__PURE__*/jsx("path", {
      d: "M9 39h27v-3H9v3zM12.5 32l1.5-2.5h17l1.5 2.5h-20zM12 36v-4h21v4H12z",
      style: {
        strokeLinecap: "butt"
      }
    }), /*#__PURE__*/jsx("path", {
      d: "M14 29.5v-13h17v13H14z",
      style: {
        strokeLinecap: "butt",
        strokeLinejoin: "miter"
      }
    }), /*#__PURE__*/jsx("path", {
      d: "M14 16.5 11 14h23l-3 2.5H14zM11 14V9h4v2h5V9h5v2h5V9h4v5H11z",
      style: {
        strokeLinecap: "butt"
      }
    }), /*#__PURE__*/jsx("path", {
      d: "M12 35.5h21M13 31.5h19M14 29.5h17M14 16.5h17M11 14h23",
      style: {
        fill: "none",
        stroke: "#fff",
        strokeWidth: 1,
        strokeLinejoin: "miter"
      }
    })]
  })
}));

const SvgWhiteArchbishop = props => /*#__PURE__*/jsx("svg", _extends({
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 45 45",
  width: "100%",
  height: "100%"
}, props, {
  children: /*#__PURE__*/jsxs("g", {
    stroke: "#000",
    style: {
      cursor: "grab"
    },
    children: [/*#__PURE__*/jsx("path", {
      fill: "#fff",
      fillRule: "evenodd",
      strokeLinejoin: "round",
      strokeWidth: 1.5,
      d: "M36 36c-3.385-.972-10.115.43-13.5-2-3.385 2.43-10.115 1.028-13.5 2 0 0-1.646.542-3 2 .677.972 1.646.986 3 .5 3.385-.972 10.115.458 13.5-1 3.385 1.458 10.115.028 13.5 1 1.354.486 2.323.472 3-.5-1.354-1.945-3-2-3-2z"
    }), /*#__PURE__*/jsx("path", {
      fill: "#fff",
      fillRule: "evenodd",
      strokeLinejoin: "round",
      strokeWidth: 1.5,
      d: "M30 32c-2.5 2.5-12.5 2.5-15 0-.5-1.5 0-2 0-2h15s.5.5 0 2z"
    }), /*#__PURE__*/jsx("path", {
      fill: "none",
      strokeWidth: 1.5,
      d: "M30 30H15"
    }), /*#__PURE__*/jsxs("g", {
      strokeLinecap: "round",
      children: [/*#__PURE__*/jsx("path", {
        fill: "#fff",
        fillRule: "evenodd",
        strokeWidth: 1.14813,
        d: "M20.345 7.627c8.036.765 12.629 6.123 12.246 22.197H14.987c0-6.889 7.654-4.975 6.123-16.074"
      }), /*#__PURE__*/jsx("path", {
        fill: "#fff",
        fillRule: "evenodd",
        strokeLinejoin: "round",
        strokeWidth: 1.14813,
        d: "M21.875 13.75c.295 2.229-4.25 5.64-6.123 6.889-2.296 1.53-2.158 3.324-3.827 3.062-.797-.723 1.082-2.325 0-2.297-.765 0 .143.943-.765 1.531-.766 0-3.065.766-3.062-3.061 0-1.531 4.592-9.185 4.592-9.185s1.444-1.456 1.531-2.68c-.556-.76-.383-1.53-.383-2.296.766-.765 2.297 1.914 2.297 1.914h1.53s.599-1.525 1.914-2.296c.766 0 .766 2.296.766 2.296"
      }), /*#__PURE__*/jsx("path", {
        strokeLinejoin: "round",
        strokeWidth: 1.14813,
        d: "M10.777 19.49a.383.383 0 1 1-.766 0 .383.383 0 1 1 .766 0zM14.936 12.028a.383 1.148 30 1 1-.663-.382.383 1.148 30 1 1 .663.382z"
      }), /*#__PURE__*/jsx("path", {
        fill: "none",
        strokeWidth: 0.76542,
        d: "M31.826 29.824c.765-15.308-4.21-21.049-9.185-21.814"
      })]
    })]
  })
}));

const SvgWhiteBishop = props => /*#__PURE__*/jsx("svg", _extends({
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 45 45",
  width: "100%",
  height: "100%"
}, props, {
  children: /*#__PURE__*/jsxs("g", {
    style: {
      opacity: 1,
      fill: "none",
      fillRule: "evenodd",
      fillOpacity: 1,
      stroke: "#000",
      strokeWidth: 1.5,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      strokeMiterlimit: 4,
      strokeDasharray: "none",
      strokeOpacity: 1,
      cursor: "grab"
    },
    children: [/*#__PURE__*/jsxs("g", {
      style: {
        fill: "#fff",
        stroke: "#000",
        strokeLinecap: "butt"
      },
      children: [/*#__PURE__*/jsx("path", {
        d: "M9 36c3.39-.97 10.11.43 13.5-2 3.39 2.43 10.11 1.03 13.5 2 0 0 1.65.54 3 2-.68.97-1.65.99-3 .5-3.39-.97-10.11.46-13.5-1-3.39 1.46-10.11.03-13.5 1-1.35.49-2.32.47-3-.5 1.35-1.46 3-2 3-2z"
      }), /*#__PURE__*/jsx("path", {
        d: "M15 32c2.5 2.5 12.5 2.5 15 0 .5-1.5 0-2 0-2 0-2.5-2.5-4-2.5-4 5.5-1.5 6-11.5-5-15.5-11 4-10.5 14-5 15.5 0 0-2.5 1.5-2.5 4 0 0-.5.5 0 2z"
      }), /*#__PURE__*/jsx("path", {
        d: "M25 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 1 1 5 0z"
      })]
    }), /*#__PURE__*/jsx("path", {
      d: "M17.5 26h10M15 30h15m-7.5-14.5v5M20 18h5",
      style: {
        fill: "none",
        stroke: "#000",
        strokeLinejoin: "miter"
      }
    })]
  })
}));

const SvgWhiteChancellor = props => /*#__PURE__*/jsx("svg", _extends({
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 45 45",
  width: "100%",
  height: "100%"
}, props, {
  children: /*#__PURE__*/jsxs("g", {
    stroke: "#000",
    style: {
      cursor: "grab"
    },
    children: [/*#__PURE__*/jsx("path", {
      fill: "#fff",
      fillRule: "evenodd",
      strokeLinecap: "round",
      strokeLinejoin: "round",
      strokeWidth: 1.5,
      d: "m34 34.82-3-3H14l-3 3"
    }), /*#__PURE__*/jsx("path", {
      fill: "#fff",
      fillRule: "evenodd",
      strokeLinejoin: "round",
      strokeWidth: 1.5,
      d: "M11 34.82v5h4v-2h5v2h5v-2h5v2h4v-5"
    }), /*#__PURE__*/jsx("path", {
      fill: "#fff",
      fillRule: "evenodd",
      strokeWidth: 1.5,
      d: "M31.553 32.109v-2.115H13.448v2.115"
    }), /*#__PURE__*/jsx("path", {
      fill: "none",
      strokeLinecap: "round",
      d: "M11 34.82h23"
    }), /*#__PURE__*/jsxs("g", {
      strokeLinecap: "round",
      children: [/*#__PURE__*/jsx("path", {
        fill: "#fff",
        fillRule: "evenodd",
        strokeWidth: 1.14813,
        d: "M20.345 7.627c8.036.765 12.629 6.123 12.246 22.197H14.987c0-6.889 7.654-4.975 6.123-16.074"
      }), /*#__PURE__*/jsx("path", {
        fill: "#fff",
        fillRule: "evenodd",
        strokeLinejoin: "round",
        strokeWidth: 1.14813,
        d: "M21.875 13.75c.295 2.229-4.25 5.64-6.123 6.889-2.296 1.53-2.158 3.324-3.827 3.062-.797-.723 1.082-2.325 0-2.297-.765 0 .143.943-.765 1.531-.766 0-3.065.766-3.062-3.061 0-1.531 4.592-9.185 4.592-9.185s1.444-1.456 1.531-2.68c-.556-.76-.383-1.53-.383-2.296.766-.765 2.297 1.914 2.297 1.914h1.53s.599-1.525 1.914-2.296c.766 0 .766 2.296.766 2.296"
      }), /*#__PURE__*/jsx("path", {
        strokeLinejoin: "round",
        strokeWidth: 1.14813,
        d: "M10.777 19.49a.383.383 0 1 1-.766 0 .383.383 0 1 1 .766 0zM14.936 12.028a.383 1.148 30 1 1-.663-.382.383 1.148 30 1 1 .663.382z"
      }), /*#__PURE__*/jsx("path", {
        fill: "none",
        strokeWidth: 0.76542,
        d: "M31.826 29.824c.765-15.308-4.21-21.049-9.185-21.814"
      })]
    }), /*#__PURE__*/jsx("path", {
      fill: "none",
      d: "M30 30H15"
    })]
  })
}));

const SvgWhiteKing = props => /*#__PURE__*/jsx("svg", _extends({
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 45 45",
  width: "100%",
  height: "100%"
}, props, {
  children: /*#__PURE__*/jsxs("g", {
    style: {
      fill: "none",
      fillOpacity: 1,
      fillRule: "evenodd",
      stroke: "#000",
      strokeWidth: 1.5,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      strokeMiterlimit: 4,
      strokeDasharray: "none",
      strokeOpacity: 1,
      cursor: "grab"
    },
    children: [/*#__PURE__*/jsx("path", {
      d: "M22.5 11.63V6M20 8h5",
      style: {
        fill: "none",
        stroke: "#000",
        strokeLinejoin: "miter"
      }
    }), /*#__PURE__*/jsx("path", {
      d: "M22.5 25s4.5-7.5 3-10.5c0 0-1-2.5-3-2.5s-3 2.5-3 2.5c-1.5 3 3 10.5 3 10.5",
      style: {
        fill: "#fff",
        stroke: "#000",
        strokeLinecap: "butt",
        strokeLinejoin: "miter"
      }
    }), /*#__PURE__*/jsx("path", {
      d: "M12.5 37c5.5 3.5 14.5 3.5 20 0v-7s9-4.5 6-10.5c-4-6.5-13.5-3.5-16 4V27v-3.5c-2.5-7.5-12-10.5-16-4-3 6 6 10.5 6 10.5v7",
      style: {
        fill: "#fff",
        stroke: "#000"
      }
    }), /*#__PURE__*/jsx("path", {
      d: "M12.5 30c5.5-3 14.5-3 20 0M12.5 33.5c5.5-3 14.5-3 20 0M12.5 37c5.5-3 14.5-3 20 0",
      style: {
        fill: "none",
        stroke: "#000"
      }
    })]
  })
}));

const SvgWhiteKnight = props => /*#__PURE__*/jsx("svg", _extends({
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 45 45",
  width: "100%",
  height: "100%"
}, props, {
  children: /*#__PURE__*/jsxs("g", {
    style: {
      opacity: 1,
      fill: "none",
      fillOpacity: 1,
      fillRule: "evenodd",
      stroke: "#000",
      strokeWidth: 1.5,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      strokeMiterlimit: 4,
      strokeDasharray: "none",
      strokeOpacity: 1,
      cursor: "grab"
    },
    children: [/*#__PURE__*/jsx("path", {
      d: "M22 10c10.5 1 16.5 8 16 29H15c0-9 10-6.5 8-21",
      style: {
        fill: "#fff",
        stroke: "#000"
      }
    }), /*#__PURE__*/jsx("path", {
      d: "M24 18c.38 2.91-5.55 7.37-8 9-3 2-2.82 4.34-5 4-1.042-.94 1.41-3.04 0-3-1 0 .19 1.23-1 2-1 0-4.003 1-4-4 0-2 6-12 6-12s1.89-1.9 2-3.5c-.73-.994-.5-2-.5-3 1-1 3 2.5 3 2.5h2s.78-1.992 2.5-3c1 0 1 3 1 3",
      style: {
        fill: "#fff",
        stroke: "#000"
      }
    }), /*#__PURE__*/jsx("path", {
      d: "M9.5 25.5a.5.5 0 1 1-1 0 .5.5 0 1 1 1 0z",
      style: {
        fill: "#000",
        stroke: "#000"
      }
    }), /*#__PURE__*/jsx("path", {
      d: "M15 15.5a.5 1.5 0 1 1-1 0 .5 1.5 0 1 1 1 0z",
      style: {
        fill: "#000",
        stroke: "#000"
      },
      transform: "rotate(30 14.5 15.5)"
    })]
  })
}));

const SvgWhitePawn = props => /*#__PURE__*/jsx("svg", _extends({
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 45 45",
  width: "100%",
  height: "100%"
}, props, {
  children: /*#__PURE__*/jsx("path", {
    d: "M22.5 9c-2.21 0-4 1.79-4 4 0 .89.29 1.71.78 2.38C17.33 16.5 16 18.59 16 21c0 2.03.94 3.84 2.41 5.03-3 1.06-7.41 5.55-7.41 13.47h23c0-7.92-4.41-12.41-7.41-13.47 1.47-1.19 2.41-3 2.41-5.03 0-2.41-1.33-4.5-3.28-5.62.49-.67.78-1.49.78-2.38 0-2.21-1.79-4-4-4z",
    style: {
      opacity: 1,
      fill: "#fff",
      fillOpacity: 1,
      fillRule: "nonzero",
      stroke: "#000",
      strokeWidth: 1.5,
      strokeLinecap: "round",
      strokeLinejoin: "miter",
      strokeMiterlimit: 4,
      strokeDasharray: "none",
      strokeOpacity: 1,
      cursor: "grab"
    }
  })
}));

const SvgWhiteQueen = props => /*#__PURE__*/jsx("svg", _extends({
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 45 45",
  width: "100%",
  height: "100%"
}, props, {
  children: /*#__PURE__*/jsxs("g", {
    style: {
      fill: "#fff",
      stroke: "#000",
      strokeWidth: 1.5,
      strokeLinejoin: "round",
      cursor: "grab"
    },
    children: [/*#__PURE__*/jsx("path", {
      d: "M9 26c8.5-1.5 21-1.5 27 0l2.5-12.5L31 25l-.3-14.1-5.2 13.6-3-14.5-3 14.5-5.2-13.6L14 25 6.5 13.5 9 26z"
    }), /*#__PURE__*/jsx("path", {
      d: "M9 26c0 2 1.5 2 2.5 4 1 1.5 1 1 .5 3.5-1.5 1-1 2.5-1 2.5-1.5 1.5 0 2.5 0 2.5 6.5 1 16.5 1 23 0 0 0 1.5-1 0-2.5 0 0 .5-1.5-1-2.5-.5-2.5-.5-2 .5-3.5 1-2 2.5-2 2.5-4-8.5-1.5-18.5-1.5-27 0z"
    }), /*#__PURE__*/jsx("path", {
      d: "M11.5 30c3.5-1 18.5-1 22 0M12 33.5c6-1 15-1 21 0",
      style: {
        fill: "none"
      }
    }), /*#__PURE__*/jsx("circle", {
      cx: 6,
      cy: 12,
      r: 2
    }), /*#__PURE__*/jsx("circle", {
      cx: 14,
      cy: 9,
      r: 2
    }), /*#__PURE__*/jsx("circle", {
      cx: 22.5,
      cy: 8,
      r: 2
    }), /*#__PURE__*/jsx("circle", {
      cx: 31,
      cy: 9,
      r: 2
    }), /*#__PURE__*/jsx("circle", {
      cx: 39,
      cy: 12,
      r: 2
    })]
  })
}));

const SvgWhiteRook = props => /*#__PURE__*/jsx("svg", _extends({
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 45 45",
  width: "100%",
  height: "100%"
}, props, {
  children: /*#__PURE__*/jsxs("g", {
    style: {
      opacity: 1,
      fill: "#fff",
      fillOpacity: 1,
      fillRule: "evenodd",
      stroke: "#000",
      strokeWidth: 1.5,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      strokeMiterlimit: 4,
      strokeDasharray: "none",
      strokeOpacity: 1,
      cursor: "grab"
    },
    children: [/*#__PURE__*/jsx("path", {
      d: "M9 39h27v-3H9v3zM12 36v-4h21v4H12zM11 14V9h4v2h5V9h5v2h5V9h4v5",
      style: {
        strokeLinecap: "butt"
      }
    }), /*#__PURE__*/jsx("path", {
      d: "m34 14-3 3H14l-3-3"
    }), /*#__PURE__*/jsx("path", {
      d: "M31 17v12.5H14V17",
      style: {
        strokeLinecap: "butt",
        strokeLinejoin: "miter"
      }
    }), /*#__PURE__*/jsx("path", {
      d: "m31 29.5 1.5 2.5h-20l1.5-2.5"
    }), /*#__PURE__*/jsx("path", {
      d: "M11 14h23",
      style: {
        fill: "none",
        stroke: "#000",
        strokeLinejoin: "miter"
      }
    })]
  })
}));

const Svg = ({
  piece
}) => {
  if (piece === ' a ') {
    return /*#__PURE__*/jsx(SvgBlackArchbishop, {});
  } else if (piece === ' b ') {
    return /*#__PURE__*/jsx(SvgBlackBishop, {});
  } else if (piece === ' c ') {
    return /*#__PURE__*/jsx(SvgBlackChancellor, {});
  } else if (piece === ' k ') {
    return /*#__PURE__*/jsx(SvgBlackKing, {});
  } else if (piece === ' n ') {
    return /*#__PURE__*/jsx(SvgBlackKnight, {});
  } else if (piece === ' p ') {
    return /*#__PURE__*/jsx(SvgBlackPawn, {});
  } else if (piece === ' q ') {
    return /*#__PURE__*/jsx(SvgBlackQueen, {});
  } else if (piece === ' r ') {
    return /*#__PURE__*/jsx(SvgBlackRook, {});
  } else if (piece === ' A ') {
    return /*#__PURE__*/jsx(SvgWhiteArchbishop, {});
  } else if (piece === ' B ') {
    return /*#__PURE__*/jsx(SvgWhiteBishop, {});
  } else if (piece === ' C ') {
    return /*#__PURE__*/jsx(SvgWhiteChancellor, {});
  } else if (piece === ' K ') {
    return /*#__PURE__*/jsx(SvgWhiteKing, {});
  } else if (piece === ' N ') {
    return /*#__PURE__*/jsx(SvgWhiteKnight, {});
  } else if (piece === ' P ') {
    return /*#__PURE__*/jsx(SvgWhitePawn, {});
  } else if (piece === ' Q ') {
    return /*#__PURE__*/jsx(SvgWhiteQueen, {});
  } else if (piece === ' R ') {
    return /*#__PURE__*/jsx(SvgWhiteRook, {});
  }
  return null;
};
const color = piece => {
  const wPieces = [' A ', ' B ', ' C ', ' K ', ' N ', ' P ', ' Q ', ' R '];
  const bPieces = [' a ', ' b ', ' c ', ' k ', ' n ', ' p ', ' q ', ' r '];
  if (wPieces.includes(piece)) {
    return 'w';
  } else if (bPieces.includes(piece)) {
    return 'b';
  }
  return null;
};

const maxWidth = {
  '900': window.matchMedia("(max-width:900px)")
};
const styles = {
  classicalSquares: {
    fontFamily: "Arial, Helvetica, sans-serif",
    display: "grid",
    gridGap: "0",
    gridTemplateColumns: maxWidth['900'].matches ? "repeat(8, [col] 12vw)" : "repeat(8, [col] 5vw)",
    gridTemplateRows: maxWidth['900'].matches ? "repeat(8, [col] 12vw)" : "repeat(8, [col] 5vw)",
    justifyContent: "center",
    alignContent: "center",
    margin: "0 auto"
  },
  capablancaSquares: {
    fontFamily: "Arial, Helvetica, sans-serif",
    display: "grid",
    gridGap: "0",
    gridTemplateColumns: maxWidth['900'].matches ? "repeat(10, [col] 9vw)" : "repeat(10, [col] 4vw)",
    gridTemplateRows: maxWidth['900'].matches ? "repeat(8, [col] 9vw)" : "repeat(8, [col] 4vw)",
    justifyContent: "center",
    alignContent: "center",
    margin: "0 auto"
  },
  userSelect: {
    WebkitTouchCallout: "none",
    WebkitUserSelect: "none",
    KhtmlUserSelect: "none",
    MozUserSelect: "none",
    msUserSelect: "none",
    userSelect: "none"
  },
  sq: {
    position: "relative",
    textAlign: "center",
    cursor: "default"
  },
  w: {
    backgroundColor: '#ffce9e'
  },
  b: {
    backgroundColor: '#d18b47'
  },
  isLegal: {
    boxShadow: "inset -4px 0 0 #ffdd43, inset 0 -4px 0 #ffdd43,\n    inset 4px 0 0 #ffeb8e, inset 0 4px 0 #ffeb8e",
    cursor: "pointer"
  },
  isSelected: {
    backgroundColor: "#ffdd43 !important",
    opacity: 0.75,
    boxShadow: "inset -4px 0 0 yellow, inset 0 -4px 0 yellow,\n    inset 4px 0 0 yellow, inset 0 4px 0 yellow"
  },
  isCheck: {
    boxShadow: "inset -5px 0 0 #fdd57d, inset 0 -5px 0 #fdd57d,\n    inset 5px 0 0 #fdd57d, inset 0 5px 0 #fdd57d"
  },
  file: {
    position: "absolute",
    fontWeight: "bold",
    fontSize: "0.8rem",
    marginRight: "0.15rem",
    marginBottom: "0.15rem",
    bottom: "0",
    right: "0"
  },
  rank: {
    position: "absolute",
    fontWeight: "bold",
    fontSize: "0.8rem",
    marginLeft: "0.15rem",
    marginTop: "0.15rem",
    top: "0",
    left: "0"
  },
  light: {
    color: '#d18b47'
  },
  dark: {
    color: '#ffce9e'
  }
};

const AlgebraicNotation = ({
  props,
  payload
}) => {
  const spans = [];
  if (payload.i === props.size.ranks - 1 && props.flip === 'w') {
    const color = payload.sq.charAt(0).charCodeAt() % 2 !== 0 ? 'dark' : 'light';
    spans.push( /*#__PURE__*/jsx("span", {
      style: _extends({}, styles.file, styles[color]),
      children: payload.sq.charAt(0)
    }, spans.length));
  } else if (payload.i === 0 && props.flip === 'b') {
    const color = payload.sq.charAt(0).charCodeAt() % 2 === 0 ? 'dark' : 'light';
    spans.push( /*#__PURE__*/jsx("span", {
      style: _extends({}, styles.file, styles[color]),
      children: payload.sq.charAt(0)
    }, spans.length));
  }
  if (payload.j === 0 && props.flip === 'w') {
    const color = payload.sq.charAt(1) % 2 !== 0 ? 'dark' : 'light';
    spans.push( /*#__PURE__*/jsx("span", {
      style: _extends({}, styles.rank, styles[color]),
      children: payload.sq.charAt(1)
    }, spans.length));
  } else if (payload.j === props.size.files - 1 && props.flip === 'b') {
    const color = payload.sq.charAt(1) % 2 === 0 ? 'dark' : 'light';
    spans.push( /*#__PURE__*/jsx("span", {
      style: _extends({}, styles.rank, styles[color]),
      children: payload.sq.charAt(1)
    }, spans.length));
  }
  return spans;
};

const Squares = ({
  className,
  stateBoard,
  goBack,
  filterMove,
  handleMove
}) => {
  const sqs = () => {
    const fen = stateBoard.fen[stateBoard.fen.length - 1 + goBack].split(' ');
    const ascii = Ascii.toAscii(fen[0]);
    return Ascii.flip(stateBoard.flip, ascii).map((rank, i) => {
      return rank.map((piece, j) => {
        let payload = {
          piece: piece
        };
        let isLegal,
          isSelected,
          isCheck = '';
        let color = (i + j) % 2 !== 0 ? 'b' : 'w';
        stateBoard.flip === 'w' ? payload = _extends({}, payload, {
          i: i,
          j: j,
          sq: Ascii.fromIndexToAlgebraic(i, j, stateBoard.size)
        }) : payload = _extends({}, payload, {
          i: stateBoard.size.ranks - 1 - i,
          j: stateBoard.size.files - 1 - j,
          sq: Ascii.fromIndexToAlgebraic(stateBoard.size.ranks - 1 - i, stateBoard.size.files - 1 - j, stateBoard.size)
        });
        if (stateBoard.pieceGrabbed) {
          if (stateBoard.pieceGrabbed.sq === payload.sq) {
            isSelected = 'isSelected';
          }
          if (stateBoard.pieceGrabbed.fen) {
            if (Object.keys(stateBoard.pieceGrabbed.fen).includes(payload.sq)) {
              isLegal = 'isLegal';
            }
          }
        } else if (stateBoard.isCheck) {
          if (fen[1] === 'w') {
            if (piece === ' K ') {
              isCheck = 'isCheck';
            }
          } else if (fen[1] === 'b') {
            if (piece === ' k ') {
              isCheck = 'isCheck';
            }
          }
        }
        return /*#__PURE__*/jsxs("div", {
          style: _extends({}, styles.sq, styles[color], styles[isLegal], styles[isSelected], styles[isCheck]),
          className: ['sq', payload.sq].join(' '),
          onMouseDown: () => {
            if (filterMove()) {
              var _stateBoard$pieceGrab;
              payload.piecePlaced = {
                ascii: stateBoard == null || (_stateBoard$pieceGrab = stateBoard.pieceGrabbed) == null ? void 0 : _stateBoard$pieceGrab.ascii
              };
              handleMove(payload);
            }
          },
          onMouseUp: ev => {
            ev.preventDefault();
            if (filterMove()) {
              var _stateBoard$pieceGrab2;
              payload.piecePlaced = {
                ascii: stateBoard == null || (_stateBoard$pieceGrab2 = stateBoard.pieceGrabbed) == null ? void 0 : _stateBoard$pieceGrab2.ascii
              };
              handleMove(payload);
            }
          },
          onDragOver: ev => {
            ev.preventDefault();
          },
          children: [/*#__PURE__*/jsx(Svg, {
            piece: piece
          }), /*#__PURE__*/jsx(AlgebraicNotation, {
            props: stateBoard,
            payload: payload
          })]
        }, payload.sq);
      });
    });
  };
  return /*#__PURE__*/jsx("div", {
    style: _extends({}, styles[className], styles.userSelect),
    children: sqs()
  });
};

const CapablancaSquares = ({
  stateBoard,
  goBack,
  filterMove,
  handleMove
}) => {
  return /*#__PURE__*/jsx(Squares, {
    className: "capablancaSquares",
    stateBoard: stateBoard,
    goBack: goBack,
    filterMove: filterMove,
    handleMove: handleMove
  });
};

const ClassicalSquares = ({
  stateBoard,
  goBack,
  filterMove,
  handleMove
}) => {
  return /*#__PURE__*/jsx(Squares, {
    className: "classicalSquares",
    stateBoard: stateBoard,
    goBack: goBack,
    filterMove: filterMove,
    handleMove: handleMove
  });
};

const CapablancaBoard = ({
  stateBoard,
  goBack,
  filterMove,
  handleMove
}) => {
  return /*#__PURE__*/jsx(CapablancaSquares, {
    stateBoard: _extends({}, stateBoard, {
      size: {
        files: 10,
        ranks: 8
      }
    }),
    goBack: goBack,
    filterMove: filterMove,
    handleMove: handleMove
  });
};
const ClassicalBoard = ({
  stateBoard,
  goBack,
  filterMove,
  handleMove
}) => {
  return /*#__PURE__*/jsx(ClassicalSquares, {
    stateBoard: _extends({}, stateBoard, {
      size: {
        files: 8,
        ranks: 8
      }
    }),
    goBack: goBack,
    filterMove: filterMove,
    handleMove: handleMove
  });
};

export { Ascii, CapablancaBoard, ClassicalBoard, Svg, color };
//# sourceMappingURL=index.modern.js.map
