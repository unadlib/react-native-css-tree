import cssTree from '../src/cssTree'

const styles = cssTree({
  mainColor: '#00d1ff',
  otherColor: '#fff',
  textColor: '#333333',
  fontSize: 20,
  backgroundColor: 'red',
  margin: 10,
  base: {
    size: 5,
  },
  grid: 10,
})(function(key, parent, sub) {
  if (key === 'welcome') sub.color = parent.otherColor
  return sub
})({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '$mainColor',
    margin: 5,
    welcome: {
      fontSize: '$fontSize+$base.size',
      textAlign: '$alignItems',
      margin: ' $margin',
    },
    instructions: {
      textAlign: '$alignItems',
      color: '$textColor',
      margin: 4,
      text: (color, i = 0) => ({
        color,
        fontSize: '$base.size+$fontSize-15' + i,
        margin: '$margin',
      }),
    },
  },
})

test('cssTree Base Test', () => {
  expect(styles.container.backgroundColor).toBe('#00d1ff')
})

test('cssTree Function Test', () => {
  expect(styles.container.instructions.text('blue').color).toBe({
    color: 'blue',
    fontSize: 10,
    margin: 4,
  }['color'])
})

