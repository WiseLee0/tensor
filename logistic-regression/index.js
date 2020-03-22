import * as tfvis from '@tensorflow/tfjs-vis';
import * as tf from '@tensorflow/tfjs'
import { getData } from './data.js'
window.onload = async () => {
  const data = getData(400)
  tfvis.render.scatterplot(
    { name: '逻辑回归训练集' },
    {
      values: [data.filter(i => i.label === 0), data.filter(i => i.label === 1)]
    }
  )
  const model = tf.sequential()
  model.add(tf.layers.dense({ units: 1, inputShape: [2], activation: 'sigmoid' }))
  model.compile({ loss: tf.losses.logLoss, optimizer: tf.train.adam(0.1) })

  const input = tf.tensor(data.map(i => [i.x, i.y]))
  const label = tf.tensor(data.map(i => i.label))

  await model.fit(input, label, {
    batchSize: 40,
    epochs: 50,
    callbacks: tfvis.show.fitCallbacks(
      { name: '训练过程' },
      ['loss'])
  })
  window.predict = (form) => {
    const pred = model.predict(tf.tensor([[form.x.value * 1, form.y.value * 1]]));
    alert(`预测结果：${pred.dataSync()[0]}`);
  };
}
