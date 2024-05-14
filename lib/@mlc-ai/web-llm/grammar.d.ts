import * as tvmjs from "tvmjs";
export type BNFGrammar = tvmjs.TVMObject;
export type GrammarStateMatcher = tvmjs.TVMObject;
/**
 * A factory class for generating and calling GrammarStateMatcher (GrammarSM) and BNFGrammar related
 * methods, essentially a wrapper of related global functions in the tvm instance's wasm.
 *
 * We implement a factory class rather than having classes of GrammarStateMatcher and BNFGrammar
 * because factory class allows us to only get/dispose PackedFunc once -- especially when we need
 * multiple instances of BNFGrammar or GrammarStateMatcher.
 */
export declare class GrammarFactory {
    private fBNFGrammarGetGrammarOfJSON;
    private fBNFGrammarFromSchema;
    private fGrammarSMFromTokenTable;
    private fGrammarSMAcceptToken;
    private fGrammarSMFindNextTokenBitmaskAsNDArray;
    private fGrammarSMIsTerminated;
    private fGrammarSMResetState;
    /**
     * Extract TVM global functions from tvm runtime instance.
     *
     * @param tvm An instantiated tvm runtime instance.
     */
    constructor(tvm: tvmjs.Instance);
    /**
     * @returns BNFGrammar of JSON.
     * @note Caller needs to handle disposal of returned object.
     */
    getBNFGrammarOfJSON(): BNFGrammar;
    /**
     * Construct a BNF grammar from the json schema string. The schema string should be in the format
     * of the schema of a JSON file. We will parse the schema and generate a BNF grammar.
     *
     * @param schema The schema string.
     * @param indent The number of spaces for indentation. If undefined, the grammar will enforce the
     *    output to be in one line.
     * @param separators Two separators that will be enforced by the grammar: comma and colon.
     *    Examples: (",", ":"), (", ", ": "). If undefined, the default separators will be used:
     *    (",", ": ") when the indent is not undefined, and (", ", ": ") otherwise. This follows the
     *    convention in Python's json.dumps().
     * @param strictMode Whether to use strict mode. In strict mode, the generated grammar will not
     *    allow properties and items that is not specified in the schema. This is equivalent to
     *    setting unevaluatedProperties and unevaluatedItems to false.
     *
     * @note Caller needs to handle disposal of returned object.
     */
    getBNFGrammarFromSchema(schema_str: string, indent?: number, separators?: [string, string], strictMode?: boolean): BNFGrammar;
    /**
     * Creates a Grammar State Matcher from a specified BNFGrammar rule and a token table.
     *
     * @param grammar A BNFGrammar used to specify the rule for the state matcher.
     * @param tokenTable A list of all tokens in the tokenizer in the order of their ids.
     * @param maxRollbackSteps Max rollback steps to support. Currently not supported, has to be zero.
     * @returns A Grammar state matcher
     * @note Caller needs to handle disposal of returned object.
     */
    getGrammarStateMatcherFromTokenTable(grammar: BNFGrammar, tokenTable: string[], maxRollbackSteps?: number): GrammarStateMatcher;
    /**
     * Accept a new token to the grammar state matcher, updating its internal state.
     *
     * @param grammarStateMatcher The grammar state matcher that will accept a new token and update
     * its state correspondingly.
     * @param tokenID The token to be accepted in its ID.
     * @returns Whether the token is accepted.
     */
    acceptToken(grammarStateMatcher: GrammarStateMatcher, tokenID: number): boolean;
    /**
     * Returns a bitmask in the form of an NDArray of shape (max_num_token, ceildiv(vocab_size, 32))
     * based on what tokens can/cannot be accepted by the current state of the grammar state matcher.
     *
     * @param grammarStateMatcher The grammar state matcher that will produce the bit mask.
     * @returns A bitmask in the form of an NDArray.
     */
    findNextTokenBitmask(grammarStateMatcher: GrammarStateMatcher): tvmjs.TVMObject;
    /**
     * @returns Whether the grammar state matcher has reached the end and hence terminated.
     */
    isTerminated(grammarStateMatcher: GrammarStateMatcher): boolean;
    /**
     * Reset the state of matcher to the initial state.
     */
    resetState(grammarStateMatcher: GrammarStateMatcher): void;
    /**
     * Dispose all tvmjs.PackedFunc this factory is initialized with.
     */
    dispose(): void;
}
//# sourceMappingURL=grammar.d.ts.map