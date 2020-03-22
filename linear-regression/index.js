import * as tfvis from '@tensorflow/tfjs-vis';
import * as tf from '@tensorflow/tfjs'

async function run () {
  const xs = [1, 2, 3, 4]
  const ys = [1, 3, 5, 7]
  tfvis.render.scatterplot(
    { name: '线性训练集' },
    {
      values: xs.map((x, i) => { return { x, y: ys[i] } })
    },
    {
      xAxisDomain: [0, 20], yAxisDomain: [0, 20]
    }
  )
  const model = tf.sequential()
  model.add(tf.layers.dense({ units: 1, inputShape: [1] }))
  model.compile({ loss: tf.losses.meanSquaredError, optimizer: tf.train.sgd(0.1) })

  const input = tf.tensor(xs)
  const label = tf.tensor(ys)
  await model.fit(input, label, {
    batchSize: 2,
    epochs: 100,
    callbacks: tfvis.show.fitCallbacks(
      { name: '训练过程' },
      ['loss'])
  })
  const output = model.predict(tf.tensor([5]))
  console.log(output.dataSync())
}

run()