## Resources for ml5.js and RNN
* [LSTMGenerator documentation](https://ml5js.org/docs/LSTMGenerator) - to be called `CharRNN` in the next ml5.js release.
* [Video tutorial: Text Generation with LSTM and Spell with Nabil Hassein](https://youtu.be/xfuVcfwtEyw)
* [Train your own RNN model instructions](https://github.com/ml5js/training-lstm)

## Recurrent Neural Networks Background Reading
* [The Unreasonable Effectiveness of Recurrent Neural Networks](http://karpathy.github.io/2015/05/21/rnn-effectiveness/) by Andrej Karpathy
* [Andrej Karpathy talk on char-rnn](https://skillsmatter.com/skillscasts/6611-visualizing-and-understanding-recurrent-networks)
* [Recurrent Neural Networks Tutorial, Part 1](http://www.wildml.com/2015/09/recurrent-neural-networks-tutorial-part-1-introduction-to-rnns/) by Denny Britz.
* [Rohan & Lenny #3: Recurrent Neural Networks & LSTMs](https://ayearofai.com/rohan-lenny-3-recurrent-neural-networks-10300100899b)

## Related Projects
* [Personalize Privacy Policies](https://ellennickles.github.io/personalized-privacy-policy/) by Ellen Nickles
* [SketchRNN](https://magenta.tensorflow.org/assets/sketch_rnn_demo/index.html)
* [Writing with the Machine](https://www.robinsloan.com/notes/writing-with-the-machine/)
* [Magenta: Make Music and Art Using Machine Learning](https://magenta.tensorflow.org/)
* [Handwriting Generation with RNN and p5.js](http://blog.otoro.net/2017/01/01/recurrent-neural-network-artist/)
* [Experiments in handwriting](http://distill.pub/2016/handwriting/)
* [RNN for generating Baroque Music](https://www.youtube.com/watch?v=SacogDL_4JU)

### Related open source frameworks:
* [char-rnn](https://github.com/karpathy/char-rnn)
* [torch-rnn](https://github.com/jcjohnson/torch-rnn)

### Examples of data that do not fit ANNs/CNNs
* Text (sequence of characters, words)
* Music (sequences of notes, rhythm)
* Drawings (sequences of "vector" paths)
* hidden state: values of hidden vector at a given time

### RNN Parameters
* `maxlen` - length of a "sentence" for inputting into RNN.
* temperature (aka "diversity"): A number in the range of 0-1 (cannot be 0). The temperature divides probabilities before sampling the next character. Lower temperature will result in more "expected" outcomes (high probabilities are even higher). A higher temperature increases the "diversity" of outcomes, but may produce less "correct-sounding" results.

### RNN architectures
* one to one (ANN)
* one to many (captioning)
* many to one (sentiment analysis)
* many to many (text, music generation, language translation)

### Certification error fix

```
pip install certifi
/Applications/Python\ 3.6/Install\ Certificates.command
```
