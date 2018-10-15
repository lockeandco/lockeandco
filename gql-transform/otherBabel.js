'use strict';

var _locations = require('./locations.json');

var _locations2 = _interopRequireDefault(_locations);

var _unfetch = require('unfetch');

var _unfetch2 = _interopRequireDefault(_unfetch);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var url = function url(address) {
  return 'https://maps.googleapis.com/maps/api/geocode/json?address=' + address + '&key=AIzaSyCAHEdspo9nrGHO9GqZxKwPXcjmOWr6mY4';
};

var formattedAdds = _locations2.default.map(function (x) {
  return x['Company Address - Work Street'].join('+').concat(',+', x['Company Address - Work City'].join('+'), '+', x['Company Address - Work State']);
}).map(function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(y) {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return unfetch(url(y)).then(function (z) {
              return z.json();
            });

          case 2:
            return _context.abrupt('return', _context.sent);

          case 3:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function (_x) {
    return _ref.apply(this, arguments);
  };
}());

_fs2.default.writeFileSync(JSON.stringify(formattedAdds), 'gs.json');
