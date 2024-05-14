/** Util methods. */
import { Tokenizer } from "@mlc-ai/web-tokenizers";
/**
 * Based on `p_prob` of size (vocabSize,) which becomes a distribution after calling
 * `applySoftmaxWithTemperature()`, sample `top_logprobs` top-probable tokens.
 *
 * @param num_top_probs: `top_logprobs` from ChatCompletionRequest
 * @param p_prob: `logitsOnCPUArray`, being a distribution after `applySoftmaxWithTemperature()`.
 *
 * Followed implementation of `ComputeTopProbsImpl()` from [https://github.com/mlc-ai/mlc-llm/blob/
 * 5b8c529e9704abd09b0432da6dcb4b013fdf43b1/cpp/serve/sampler/cpu_sampler.cc].
 *
 * @returns Arrays of (tokenID, prob) pairs, ranked from highest prob to least.
 */
export declare function getTopProbs(num_top_probs: number, p_prob: Float32Array): Array<[number, number]>;
/**
 * Post-process a raw token (which may be a raw byte or contain lower one eights block) to the
 * actual token. We do this in order to conform with the tokenizers' setup.
 *
 * Follow implementation of [https://github.com/mlc-ai/mlc-llm/blob/
 * bcb9b6a33a672a70d760c9a8b03234124aab50c4/cpp/tokenizers.cc#L99]
 */
export declare function postProcessToken(token: string): string;
/**
 * Get the token table in the form of a string list of tokens, ordered by their token id.
 * @param tokenizer A loaded tokenizer.
 */
export declare function getTokenTableFromTokenizer(tokenizer: Tokenizer): string[];
//# sourceMappingURL=support.d.ts.map