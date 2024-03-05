import timeWord from './timeWord';

describe('#timeword', () => {
  test('it is a function', () => {
    expect(typeof timeWord).toBe('function');
  });
});

// Tests
console.assert(timeWord('00:00') === 'midnight');
console.assert(timeWord('00:12') === 'twelve oh twelve am');
console.assert(timeWord('01:00') === 'one o\'clock am');
console.assert(timeWord('06:01') === 'six oh one am');
console.assert(timeWord('06:10') === 'six ten am');
console.assert(timeWord('06:18') === 'six eighteen am');
console.assert(timeWord('06:30') === 'six thirty am');
console.assert(timeWord('10:34') === 'ten thirty four am');
console.assert(timeWord('12:00') === 'noon');
console.assert(timeWord('12:09') === 'twelve oh nine pm');
console.assert(timeWord('23:23') === 'eleven twenty three pm');