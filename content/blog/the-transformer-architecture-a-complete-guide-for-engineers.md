---
title: "The Transformer Architecture: A Complete Guide for Engineers"
description: A detailed, jargon-busted walkthrough of the Transformer
  architecture — the engine behind GPT, BERT, and every modern LLM. Written for
  engineers who know code but not ML.
date: 2026-04-13
tags:
  - '"AI"'
  - '"transformers"'
  - '"deep-learning"'
  - '"NLP"'
  - '"architecture"'
---
## Why Should You Care About Transformers?

Every time you use ChatGPT, Google Translate, GitHub Copilot, or any modern AI tool that deals with language — there is a **Transformer** underneath. Introduced in 2017 by a team at Google in the now-legendary paper *"Attention Is All You Need"*, the Transformer replaced older architectures and became the foundation of nearly all large language models (LLMs).

If you're a software engineer curious about what's actually happening inside these models, this post is for you. I'll explain every piece of the Transformer from scratch — no ML degree required, just basic math (vectors, matrices, some probability).

Let's build the intuition, brick by brick.

- - -

## The Problem: Why Were Transformers Invented?

Before Transformers, the dominant architectures for processing sequences (like sentences) were **RNNs** (Recurrent Neural Networks) and **LSTMs** (Long Short-Term Memory networks). They had a critical flaw: they processed words **one at a time**, left to right.

Imagine reading a book but being forced to forget most of what you read three pages ago. That's essentially what RNNs suffered from — they struggled with **long-range dependencies** (connecting the meaning of a word at position 5 to a word at position 500).

Also, because they processed sequentially, they were **slow**. You couldn't parallelize the computation — each step depended on the previous one.

**Transformers solved both problems:**

1. They process all words in a sentence **simultaneously** (in parallel).
2. They use a mechanism called **Attention** that lets every word directly "look at" every other word, regardless of distance.

![](/uploads/gemini_generated_image_br7tribr7tribr7t.png)

<img alt="A side-by-side diagram comparing RNN sequential processing (words flowing one by one through a chain of boxes, with a fading arrow showing memory loss over distance) versus Transformer parallel processing (all words connected to each other simultaneously via attention lines). Clean, minimal technical illustration style with labeled arrows." />

- - -

## The 30,000-Foot View

The Transformer has two main halves:

1. **Encoder** — reads and understands the input sequence (e.g., a sentence in English).
2. **Decoder** — generates the output sequence (e.g., the translated sentence in French).

For tasks like translation, you use both. For tasks like text generation (GPT-style), you typically use only the Decoder. For tasks like understanding/classification (BERT-style), you use only the Encoder.

Each half is a **stack of identical layers** (the original paper used 6 layers in each). Let's zoom into what a single layer looks like.

<img alt="A high-level architecture diagram of the Transformer model. Left side shows the Encoder stack (6 identical layers stacked vertically) receiving 'Input Sentence'. Right side shows the Decoder stack (6 identical layers stacked vertically) producing 'Output Sentence'. An arrow from the top of the Encoder connects to each layer of the Decoder. Labels: Encoder, Decoder, Inputs, Outputs. Clean, minimal blueprint-style technical diagram." />

- - -

## Step 0: Tokenization — Turning Text Into Numbers

Before anything enters the Transformer, text must be converted into numbers. Computers don't understand words — they understand numbers.

**Tokenization** splits text into small units called **tokens**. A token might be a word, a sub-word, or even a single character, depending on the tokenizer.

```
"Transformers are amazing" → ["Transform", "ers", " are", " amazing"]
                            → [4521, 388, 527, 6358]
```

Each token gets assigned an integer ID from a vocabulary (a fixed dictionary of all known tokens). This is a lookup table — nothing magical.

- - -

## Step 1: Input Embeddings — From IDs to Vectors

A single number (like `4521`) doesn't carry much meaning. We need a richer representation.

An **embedding** converts each token ID into a **vector** — a list of numbers (typically 512 or 768 numbers long). Think of it as coordinates in a high-dimensional space where similar words end up near each other.

> **What's a vector?** If you've ever worked with coordinates `(x, y)` on a 2D plane, a vector is the same idea — just extended to hundreds of dimensions. A 512-dimensional vector is a list of 512 numbers: `[0.12, -0.34, 0.78, ..., 0.56]`.

These embeddings are **learned during training** — the model figures out what numbers to assign to each token so that similar tokens end up with similar vectors.

```
Token "king"  → [0.21, -0.45, 0.89, ..., 0.33]  (512 numbers)
Token "queen" → [0.19, -0.42, 0.91, ..., 0.31]  (512 numbers, quite similar!)
Token "car"   → [-0.67, 0.12, -0.03, ..., 0.88] (512 numbers, very different)
```

<img alt="A visualization showing three words 'king', 'queen', and 'car' as points in a 3D space. 'King' and 'queen' are plotted close together in one region, while 'car' is far away in another region. Dotted lines show the distance between them. Labels on axes: Dimension 1, Dimension 2, Dimension 3. A note says 'Actual embeddings have 512+ dimensions'. Clean, minimal 3D scatter plot style." />

- - -

## Step 2: Positional Encoding — Teaching Order

Here's a subtle but important problem. Since the Transformer processes all tokens **at the same time** (in parallel), it has no built-in notion of word order. The sentences "Dog bites man" and "Man bites dog" would look identical to it!

**Positional encoding** fixes this by adding a unique "position signal" to each token's embedding. This signal tells the model: "this token is at position 1", "this one is at position 2", and so on.

The original paper uses **sine and cosine functions** of different frequencies to generate these position signals:

```
PE(pos, 2i)   = sin(pos / 10000^(2i/d_model))
PE(pos, 2i+1) = cos(pos / 10000^(2i/d_model))
```

Where:

* `pos` = the position of the token in the sentence (0, 1, 2, ...)
* `i` = the dimension index within the embedding vector
* `d_model` = the embedding size (e.g., 512)

**Why sine and cosine?** They produce smooth, unique patterns for each position. And crucially, the model can learn to figure out *relative* positions (how far apart two words are) from these patterns — because the difference between sine waves at different positions follows predictable mathematical relationships.

The positional encoding vector is **added** (element-wise) to the embedding vector:

```
final_input = embedding_vector + positional_encoding_vector
```

<img alt="A heatmap-style diagram showing positional encodings. The X-axis represents 'Embedding Dimension (0 to 512)', the Y-axis represents 'Token Position (0 to 50)'. Each cell is colored based on its sine/cosine value — creating a wave-like pattern that is unique for each row (position). A note says: 'Each row is a unique fingerprint for that position'. Use a blue-to-red color gradient. Clean, minimal scientific heatmap style." />

- - -

## Step 3: Self-Attention — The Core Innovation

This is the heart of the Transformer. If you understand self-attention, you understand 80% of how Transformers work.

### The Intuition

Consider the sentence: *"The animal didn't cross the street because **it** was too tired."*

What does **"it"** refer to? The animal, not the street. You know this because you understand the context. **Self-attention** is the mechanism that lets the model figure this out — it allows each word to "attend to" (look at) every other word in the sentence and decide how relevant each one is.

### The Mechanics: Queries, Keys, and Values

Self-attention works using three concepts borrowed from information retrieval — think of it like a search engine:

* **Query (Q):** "What am I looking for?" — the current word's question.
* **Key (K):** "What do I contain?" — each word's label describing itself.
* **Value (V):** "What information do I actually carry?" — each word's content.

For every token, we create a Q, K, and V vector by multiplying the input embedding by three separate **weight matrices** (W_Q, W_K, W_V):

```
Q = input × W_Q
K = input × W_K
V = input × W_V
```

> **What's a weight matrix?** A grid of numbers that transforms one vector into another. Think of it like a function: input goes in, transformed output comes out. The numbers in the matrix are learned during training.

### Computing Attention Scores

Now comes the core calculation:

**1. Dot product of Q and K:**
For each word, we compute how much its Query matches every other word's Key. This gives us a "relevance score."

```
score(word_i, word_j) = Q_i · K_j
```

> **What's a dot product?** Multiply corresponding elements of two vectors and sum them up. `[1,2,3] · [4,5,6] = 1×4 + 2×5 + 3×6 = 32`. Higher dot product = more similar vectors = more relevant.

**2. Scale the scores:**
We divide by the square root of the Key dimension (√d_k). Without this, the dot products can get very large, causing numerical instability.

```
scaled_score = score / √d_k
```

**3. Apply Softmax:**
Convert the scores into **probabilities** that sum to 1.

> **What's Softmax?** A function that takes a list of numbers and converts them into probabilities. Large numbers get pushed toward 1, small numbers toward 0, and everything sums to 1. It's like a "pick the winner" function but soft — it gives partial credit.

```
attention_weights = softmax(scaled_scores)

Example: [2.0, 1.0, 0.1] → softmax → [0.66, 0.24, 0.10]
```

**4. Multiply weights by Values:**
The final output for each word is a **weighted sum** of all Value vectors, where the weights are the attention probabilities.

```
output = attention_weights × V
```

This means each word's output is a blend of information from all other words, with more weight on the most relevant ones.

### The Full Formula

$$\text{Attention}(Q, K, V) = \text{softmax}\left(\frac{QK^T}{\sqrt{d_k}}\right)V$$

<img alt="A step-by-step visual walkthrough of the self-attention mechanism. Show a sentence 'The cat sat on the mat'. Step 1: Each word generates Q, K, V vectors (shown as three colored arrows per word). Step 2: A matrix showing dot-product scores between all word pairs (6x6 grid with intensity colors). Step 3: The softmax output (same grid but values sum to 1 per row). Step 4: The final weighted combination producing the output for the word 'cat' — with thicker arrows from 'The' and 'sat' showing they contributed more. Clean, flowchart-style technical diagram." />

- - -

## Step 4: Multi-Head Attention — Parallel Perspectives

A single attention computation captures one "type" of relationship between words. But language has many types of relationships — syntactic (grammar), semantic (meaning), positional (nearby words), coreference ("it" refers to "animal"), etc.

**Multi-head attention** runs the attention mechanism **multiple times in parallel** (typically 8 heads), each with its own set of W_Q, W_K, W_V weight matrices. Each head can learn to focus on a different type of relationship.

```
head_1 = Attention(Q × W_Q1, K × W_K1, V × W_V1)
head_2 = Attention(Q × W_Q2, K × W_K2, V × W_V2)
...
head_8 = Attention(Q × W_Q8, K × W_K8, V × W_V8)
```

The outputs of all heads are **concatenated** and then multiplied by another weight matrix to produce the final output:

```
MultiHead = Concat(head_1, ..., head_8) × W_O
```

Think of it like having 8 different analysts looking at the same data, each focusing on a different aspect, and then combining their insights into a single report.

<img alt="A diagram showing Multi-Head Attention with 8 parallel attention heads. The input flows into 8 separate boxes labeled 'Head 1' through 'Head 8', each processing attention independently. Below each head, a small annotation shows what it might focus on: 'Head 1: syntax', 'Head 2: nearby words', 'Head 3: meaning similarity', etc. All 8 outputs are concatenated into one long vector, then passed through a linear layer to produce the final output. Clean, parallel-pipeline style technical diagram." />

- - -

## Step 5: Add & Normalize — Keeping Things Stable

After the attention layer, the Transformer does two critical things:

### Residual Connection (Add)

The output of the attention layer is **added** back to its original input:

```
output = attention_output + original_input
```

> **Why?** This is called a **residual connection** (or skip connection). It helps the model train better by providing a "shortcut" for information to flow through. Without it, deep networks (many layers) become very hard to train — the learning signal (gradients) gets weaker and weaker as it passes through many layers. The shortcut gives the gradient a direct highway.

### Layer Normalization (Norm)

After adding, we **normalize** the values — adjusting them so they have a mean of 0 and a standard deviation of 1.

> **Why normalize?** Without it, the values can drift to very large or very small numbers as they pass through many layers, causing training to become unstable. Normalization keeps everything in a "reasonable range."

```
output = LayerNorm(attention_output + original_input)
```

This **Add & Norm** pattern is applied after every sub-layer in the Transformer (after attention and after the feed-forward network).

- - -

## Step 6: Feed-Forward Network — Thinking Independently

After attention (which mixes information *between* tokens), each token passes through a **feed-forward neural network (FFN)** independently. This is where the model does "individual thinking" on each token.

The FFN is simple — two linear transformations with a **ReLU** activation in between:

```
FFN(x) = max(0, x × W_1 + b_1) × W_2 + b_2
```

> **What's ReLU?** A function that takes a number and returns it if it's positive, or returns 0 if it's negative. `ReLU(5) = 5`, `ReLU(-3) = 0`. It introduces **non-linearity** — without it, stacking multiple layers would be equivalent to a single layer (because multiplying matrices is a linear operation).
>
> **What are b_1 and b_2?** These are **bias terms** — just a number added to each output. They allow the model to shift the output up or down, similar to the `+ b` in the line equation `y = mx + b`.

The inner dimension of the FFN is typically 4x the model dimension (e.g., 2048 for a 512-dimensional model), giving it more capacity to learn complex transformations.

**Why is this needed?** Attention is great at figuring out *which* tokens are relevant to each other, but the FFN is where the model actually *processes and transforms* that information — like reasoning about what it means.

- - -

## The Encoder: Putting It Together

One Encoder layer consists of:

```
Input
  → Multi-Head Self-Attention
    → Add & Norm
      → Feed-Forward Network
        → Add & Norm
          → Output
```

The original Transformer stacks **6 of these layers**. The output of one layer becomes the input to the next.

After all 6 layers, the Encoder produces a rich, context-aware representation of the input sentence. Every token's vector now carries information not just about itself, but about how it relates to every other token.

<img alt="A detailed diagram of a single Encoder layer. The flow goes bottom-to-top: Input Embeddings + Positional Encoding → Multi-Head Self-Attention → (Add & Norm) → Feed-Forward Network → (Add & Norm) → Output. Show the residual connections (skip arrows) clearly bypassing each sub-layer and joining at the Add nodes. Label each component. On the right side, show that 6 of these layers are stacked. Clean, layered block-diagram style." />

- - -

## The Decoder: Generating Output

The Decoder is similar to the Encoder but has two key differences:

### Difference 1: Masked Self-Attention

When generating output (e.g., translating a sentence word by word), the Decoder generates tokens **one at a time, left to right**. At each step, it should only be able to see the tokens it has already generated — not the future ones.

**Masked self-attention** enforces this by setting the attention scores for future positions to **negative infinity** before the softmax. This makes their attention weights effectively **zero**.

```
Example: Generating position 3

                 pos_1  pos_2  pos_3  pos_4  pos_5
attention scores: [0.8,  0.5,   0.3,   -∞,    -∞ ]
after softmax:    [0.50, 0.31,  0.19,  0.00,  0.00]
```

The model can't "cheat" by looking ahead.

<img alt="A visualization of the attention mask in the Decoder. Show a 5x5 grid where rows represent 'current position' and columns represent 'positions being attended to'. The upper-right triangle is shaded dark/blocked (labeled 'masked: cannot attend to future'), and the lower-left triangle plus diagonal is white/open (labeled 'allowed: can attend to past and self'). Numbers in the open cells show attention weights. Clean, grid-style technical diagram." />

### Difference 2: Cross-Attention (Encoder-Decoder Attention)

The Decoder has an extra attention layer that attends to the **Encoder's output**. This is how the Decoder "reads" the input sentence.

In this cross-attention layer:

* **Queries** come from the Decoder (what the Decoder is looking for)
* **Keys and Values** come from the Encoder (what the input sentence contains)

This allows each generated output token to look at all positions in the input sentence and decide which parts are most relevant.

```
Decoder layer:
  Input
    → Masked Multi-Head Self-Attention  (attend to previously generated tokens)
      → Add & Norm
        → Cross-Attention               (attend to Encoder output)
          → Add & Norm
            → Feed-Forward Network
              → Add & Norm
                → Output
```

<img alt="A detailed diagram of a single Decoder layer side-by-side with the Encoder stack. The Decoder layer shows three sub-layers stacked bottom-to-top: (1) Masked Multi-Head Self-Attention, (2) Multi-Head Cross-Attention receiving Keys and Values from the Encoder output via arrows crossing from left to right, (3) Feed-Forward Network. Each sub-layer has Add & Norm. Residual connections shown clearly. Clean, layered block-diagram style with connecting arrows between Encoder and Decoder." />

- - -

## Step 7: The Final Linear Layer and Softmax — Producing Words

After the Decoder stack processes everything, the output for each position is a vector (e.g., 512 numbers). But we need a **word**, not a vector.

Two final steps:

### Linear Layer

A simple matrix multiplication that projects the 512-dimensional vector into a much larger vector — one entry per word in the vocabulary (e.g., 50,000 entries).

```
logits = decoder_output × W_vocab + bias
# Shape: (512,) → (50000,)
```

> **What are logits?** Raw, unnormalized scores — just numbers. Higher numbers mean the model thinks that word is more likely.

### Softmax

Converts the logits into **probabilities**:

```
probabilities = softmax(logits)
# [0.0001, 0.0002, ..., 0.72, ..., 0.0003]  (50000 entries, sums to 1)
```

The word with the highest probability is selected as the output (or we use sampling strategies like top-k to add creativity).

<img alt="A funnel-style diagram showing the final output process. A 512-dim vector enters a Linear layer (drawn as a matrix multiplication), producing a 50,000-dim logits vector. This passes through Softmax producing a probability distribution. The probabilities are shown as a bar chart with one tall bar (labeled 'bonjour: 0.72') and many tiny bars for other words. The top prediction 'bonjour' is highlighted. Clean, left-to-right flow diagram." />

- - -

## Training: How Does the Transformer Learn?

Now that we know the architecture, how does it actually *learn*? This is where **training** comes in.

### The Training Loop (Simplified)

1. **Feed input through the model** and get predicted output probabilities.
2. **Compare predictions to the actual correct output** using a **loss function**.
3. **Calculate gradients** — how much each parameter needs to change to reduce the error.
4. **Update the parameters** (all those weight matrices: W_Q, W_K, W_V, W_1, W_2, etc.) using an optimization algorithm.
5. **Repeat** millions of times on massive amounts of data.

### Loss Function

> **What's a loss function?** A mathematical function that measures "how wrong" the model's predictions are. A loss of 0 means perfect predictions. The goal of training is to **minimize** this loss. Think of it like a score in golf — lower is better.

Transformers typically use **cross-entropy loss**, which measures the difference between the predicted probability distribution and the actual correct answer.

```
If the correct next word is "bonjour" (index 7823):
  - Model predicts P("bonjour") = 0.72 → loss is low (good!)
  - Model predicts P("bonjour") = 0.01 → loss is high (bad!)
```

### Backpropagation and Gradient Descent

> **What's backpropagation?** An algorithm that calculates how much each parameter in the model contributed to the error. It works backwards from the loss, layer by layer, computing the **gradient** (direction and magnitude of change needed) for each parameter.
>
> **What's gradient descent?** Once we have gradients, we update each parameter in the direction that reduces the loss. Think of it as rolling a ball downhill — the gradient tells you which direction is "downhill."

```
new_weight = old_weight - learning_rate × gradient
```

> **What's the learning rate?** A small number (e.g., 0.0001) that controls how big each update step is. Too large = the model overshoots and never converges. Too small = learning is painfully slow.

The original Transformer paper uses the **Adam optimizer** with a warm-up learning rate schedule — the learning rate starts small, increases linearly for a few thousand steps, then decreases.

<img alt="A diagram showing the training loop as a circular flow: (1) Input data enters the Transformer, (2) Output predictions are produced, (3) Loss function compares predictions vs. correct answers (shown as two bar charts side by side), (4) Backpropagation sends error signal backwards through the model (shown as arrows flowing right-to-left through the layers), (5) Parameters are updated. An arrow loops back to step 1 with label 'Repeat millions of times'. Clean, circular flowchart style." />

- - -

## Key Innovations That Make It Work

### 1. Parallelization

Unlike RNNs, every position in the input is processed **simultaneously**. This means Transformers can fully exploit modern GPUs (which are designed for massive parallelism). This is the main reason training is so much faster.

### 2. Attention Can Model Any Distance

Position 1 can directly attend to position 1000 in a single step. In RNNs, information has to travel through 999 intermediate steps, losing signal along the way. Attention has no such distance penalty.

### 3. Depth Through Stacking

By stacking multiple layers, each layer can build increasingly abstract representations. Layer 1 might capture basic word relationships. Layer 6 might capture complex semantic meaning and long-range reasoning.

- - -

## Putting It All Together: End-to-End Example

Let's trace through a translation task: **English → French**

**Input:** "The cat sits on the mat"
**Expected output:** "Le chat est assis sur le tapis"

### Encoder Side:

1. **Tokenize:** "The", "cat", "sits", "on", "the", "mat" → \[101, 4837, 8293, 2103, 101, 6542]
2. **Embed:** Each token → 512-dimensional vector
3. **Add positional encoding:** Each vector gets position information baked in
4. **Pass through 6 Encoder layers:** Each layer applies self-attention (every word looks at every other word) + FFN. After 6 layers, each token's vector is a rich, context-aware representation.

### Decoder Side (word by word):

1. **Start token:** Begin with a special `<START>` token
2. **Step 1:** Feed `<START>` → Decoder predicts → "Le"
3. **Step 2:** Feed `<START>, Le` → Decoder predicts → "chat"
4. **Step 3:** Feed `<START>, Le, chat` → Decoder predicts → "est"
5. Continue until the Decoder predicts `<END>`

At each step, the Decoder:

* Uses **masked self-attention** on the tokens generated so far
* Uses **cross-attention** to look at the Encoder's representation of the English sentence
* Passes through the **FFN**
* Applies **linear + softmax** to pick the next French word

<img alt="An end-to-end diagram of the Transformer performing English-to-French translation. Left side: the English sentence 'The cat sits on the mat' enters the Encoder (shown as a stack of 6 layers). Right side: the Decoder (stack of 6 layers) generates words one by one — 'Le', 'chat', 'est', 'assis', 'sur', 'le', 'tapis' — with arrows showing the autoregressive generation process. Arrows from the Encoder output connect to each Decoder layer for cross-attention. The final Softmax + Linear layer at the top produces word probabilities. Clean, comprehensive architecture diagram." />

- - -

## Variants and Modern Usage

The original Transformer uses both Encoder and Decoder. Modern models often use only one half:

| Model Family         | Architecture    | Use Case                              |
| -------------------- | --------------- | ------------------------------------- |
| **BERT**             | Encoder only    | Understanding, classification, search |
| **GPT** (1, 2, 3, 4) | Decoder only    | Text generation, chatbots, coding     |
| **T5, BART**         | Encoder-Decoder | Translation, summarization            |

### Why Decoder-Only Dominates Today

GPT-style models showed that a Decoder-only architecture, when trained on massive data, can perform nearly any language task — including ones traditionally done by Encoders. The simplicity of having just one half made scaling easier, leading to the current era of large language models.

- - -

## The Numbers: Scale of the Original Transformer

To give you a sense of scale:

* **d_model (embedding size):** 512
* **Number of layers:** 6 (Encoder) + 6 (Decoder)
* **Number of attention heads:** 8
* **Head dimension (d_k):** 64 (= 512 / 8)
* **FFN inner dimension:** 2048
* **Vocabulary size:** ~37,000 tokens
* **Total parameters:** ~65 million

For comparison, GPT-3 has **175 billion** parameters and GPT-4 is estimated to have over a **trillion**. The architecture is the same — it's just scaled up massively.

- - -

## Common Questions

**Q: Why is it called "Transformer"?**
Because it *transforms* one sequence (input) into another (output) through attention-based layers. The name comes from the idea of transforming representations.

**Q: What does "Attention is All You Need" mean?**
Previous models used attention as an *add-on* to RNNs. This paper showed you could build an entire model using *only* attention (plus simple feed-forward networks) — no recurrence needed.

**Q: How long can the input be?**
The original Transformer could handle sequences up to 512 tokens. Modern models extend this to 4K, 32K, 128K, or even 1M+ tokens through various techniques (sparse attention, rotary position embeddings, etc.).

**Q: Is the position encoding the only option?**
No. Modern models often use **learned positional embeddings** (vectors learned during training) or **Rotary Position Embeddings (RoPE)**, which encode relative positions more effectively.

- - -

## Summary

Here's the full Transformer in one glance:

```
INPUT TEXT
  → Tokenization (text → token IDs)
    → Embedding (IDs → vectors)
      → Positional Encoding (add position info)
        → ENCODER (×6 layers):
            → Multi-Head Self-Attention
            → Add & Norm
            → Feed-Forward Network
            → Add & Norm
        → DECODER (×6 layers):
            → Masked Multi-Head Self-Attention
            → Add & Norm
            → Cross-Attention (to Encoder output)
            → Add & Norm
            → Feed-Forward Network
            → Add & Norm
        → Linear Layer (vector → vocabulary scores)
          → Softmax (scores → probabilities)
            → OUTPUT TOKEN
```

The Transformer is elegant in its simplicity: it's built from just a few basic building blocks (matrix multiplication, softmax, layer normalization, ReLU) — repeated and stacked. The genius is in *how* these blocks are arranged, particularly the self-attention mechanism that lets every token communicate with every other token directly.

Understanding this architecture gives you the foundation to understand every modern LLM — from BERT to GPT-4 to Claude. They're all Transformers at heart.

- - -

*If you found this useful, the best next step is to read the original paper: [Attention Is All You Need](https://arxiv.org/abs/1706.03762). With the mental model from this post, it should be much more approachable now.*
