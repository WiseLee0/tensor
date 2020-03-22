import * as tfvis from '@tensorflow/tfjs-vis';
import * as tf from '@tensorflow/tfjs'

async function run () {

  const weights = [40, 50, 60]
  const heights = [150, 160, 170]
  tfvis.render.scatterplot(
    { name: '身高体重训练' },
    {
      values: weights.map((x, i) => { return { x, y: heights[i] } })
    },
    {
      xAxisDomain: [30, 100], yAxisDomain: [130, 200]
    }
  )

  const model = tf.sequential()
  model.add(tf.layers.dense({ units: 1, inputShape: [1] }))
  model.compile({ loss: tf.losses.meanSquaredError, optimizer: tf.train.sgd(0.5) })
  const input = tf.tensor(weights).sub(40).div(20)
  const label = tf.tensor(heights).sub(150).div(20)
  await model.fit(input, label, {
    batchSize: 3,
    epochs: 100,
    callbacks: tfvis.show.fitCallbacks(
      { name: '训练过程' },
      ['loss'])
  })
  const output = model.predict(tf.tensor([70]).sub(40).div(20))
  output.mul(20).add(150).print()
}

run()