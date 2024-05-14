import { ConvTemplateConfig, Role } from "./config";
/**
 * Helper to keep track of history conversations.
 */
export declare class Conversation {
    messages: Array<[Role, string, string | undefined]>;
    readonly config: ConvTemplateConfig;
    function_string: string;
    use_function_calling: boolean;
    override_system_message?: string;
    constructor(config: ConvTemplateConfig);
    private getPromptArrayInternal;
    /**
     * Get prompt arrays with the first one as system.
     *
     * @returns The prompt array.
     */
    getPromptArray(): Array<string>;
    /**
     * Get the last round of prompt has not been fed as input.
     *
     * @note This function needs to be used with the assumption that
     *       the caller call appendMessage then appendReplyHeader.
     *
     * @returns The prompt array.
     */
    getPrompArrayLastRound(): string[];
    /**
     * Resets all states for this.conversation.
     */
    reset(): void;
    getStopStr(): string[];
    getStopTokens(): number[];
    appendMessage(role: Role, message: string, role_name?: string): void;
    appendReplyHeader(role: Role): void;
    finishReply(message: string): void;
}
export declare function getConversation(conv_template: string | ConvTemplateConfig, conv_config?: Partial<ConvTemplateConfig>): Conversation;
/**
 * Compare the states of two conversation instances. Equality is defined as their getPromptArray()
 * should return the exact same things, which is determined by fields: messages, function_string,
 * use_function_calling, and override_system_message.
 *
 * @returns True if `convA` equals to `convB`
 * @note We assume convA and convB has the same `this.config`.
 */
export declare function compareConversationObject(convA: Conversation, convB: Conversation): boolean;
//# sourceMappingURL=conversation.d.ts.map