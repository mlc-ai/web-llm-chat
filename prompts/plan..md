# Step 0: Fetch Issue and Generate Implementation Plan

## Objective

Use GitLab/GitHub MCP tools to fetch issue details and generate a comprehensive `plan.md` file that outlines the implementation strategy, including breakdown of prompt files and expected workflows.

## Prerequisites

- Issue number is known (e.g., #96)
- Repository access is configured
- MCP tools (GitLab or GitHub) are available

## Instructions for Copilot

### 1. Fetch Issue Details

Use the appropriate MCP tool to fetch the issue:

**For GitHub:**
```
mcp_github_issue_read
- owner: mlc-ai
- repo: web-llm-chat
- issue_number: <ISSUE_NUMBER>
```

**For GitLab:**
```
mcp_gitlab_issue_read
- project: mlc-ai/web-llm-chat
- issue_iid: <ISSUE_NUMBER>
```

### 2. Extract Key Information

From the fetched issue, extract:
- **Title**: The issue title
- **Description**: Full issue description
- **Labels**: Any tags/labels applied
- **Requirements**: Specific features or fixes requested
- **Acceptance Criteria**: What defines "done"
- **Related Issues**: Any linked or referenced issues
- **Comments**: Key discussions or clarifications

### 3. Generate `plan.md`

Create a comprehensive `plan.md` file in the root directory with the following structure:

```markdown
# Implementation Plan: [Issue Title]

## Issue Reference

- **Issue Number**: #[NUMBER]
- **Issue Title**: [TITLE]
- **Repository**: [OWNER]/[REPO]
- **Created**: [DATE]
- **Labels**: [LABELS]

## Summary

[2-3 paragraph summary of the issue, including:]
- What problem needs to be solved
- Why it's important
- What the expected outcome is
- Any context from related issues or discussions

## Requirements Analysis

### Functional Requirements
1. [Requirement 1]
2. [Requirement 2]
3. [Requirement 3]

### Non-Functional Requirements
1. [Performance considerations]
2. [Compatibility requirements]
3. [Code quality standards]

### Acceptance Criteria
- [ ] [Criterion 1]
- [ ] [Criterion 2]
- [ ] [Criterion 3]

## Implementation Breakdown

### Phase 1: Analysis and Planning
**File**: `prompts/1-analyze-and-plan.prompt.md`

**Purpose**: Analyze codebase and create detailed implementation strategy

**Inputs**:
- Issue description and requirements
- Current codebase structure
- Related code files

**Expected Outputs**:
- Identified code files to modify
- Detailed implementation approach for each change
- Technical considerations and edge cases
- Testing strategy

**Tasks**:
1. Search codebase for relevant files
2. Understand current implementation
3. Design solution architecture
4. Document changes needed for each file
5. Identify potential risks or conflicts

### Phase 2: Branch, Commit, and Push
**File**: `prompts/2-branch-commit-push.prompt.md`

**Purpose**: Create feature branch, commit changes, and push to remote

**Inputs**:
- Issue number for branch naming
- List of files to stage and commit
- Commit message content

**Expected Outputs**:
- New feature branch created (e.g., `feat/issue-<number>-<short-title>`)
- All changes committed with descriptive message
- Branch pushed to remote repository

**Tasks**:
1. Create feature branch from main
2. Stage modified files
3. Commit with conventional commit message
4. Push branch to remote (origin or fork)

### Phase 3: Create Merge/Pull Request
**File**: `prompts/3-raise-mr.prompt.md`

**Purpose**: Create MR/PR with comprehensive description

**Inputs**:
- Feature branch name
- Target branch (usually `main`)
- Issue details for description
- List of changes made

**Expected Outputs**:
- Merge Request/Pull Request created
- PR linked to issue for auto-close
- Description includes all changes and testing notes
- Reviewers assigned (if applicable)

**Tasks**:
1. Use GitHub/GitLab MCP tool to create MR/PR
2. Set meaningful title
3. Write comprehensive description
4. Link to issue with "Closes #[NUMBER]"
5. Request reviews (optional)

## Technical Implementation Strategy

### Files to Modify
1. **[file1.ts]**
   - Changes: [describe changes]
   - Risk Level: [Low/Medium/High]
   
2. **[file2.ts]**
   - Changes: [describe changes]
   - Risk Level: [Low/Medium/High]

### New Files to Create
1. **[newfile.ts]**
   - Purpose: [describe purpose]
   - Dependencies: [list dependencies]

### Testing Strategy
- **Unit Tests**: [describe unit testing approach]
- **Integration Tests**: [describe integration testing]
- **Manual Testing**: [list manual test scenarios]
- **Edge Cases**: [specific edge cases to test]

## Assumptions Made

1. **Assumption 1**: [e.g., "WebGPU support is the primary blocker for errors"]
   - Basis: [Why this assumption is reasonable]
   - Impact: [How this affects implementation]

2. **Assumption 2**: [e.g., "Changes should be backward compatible"]
   - Basis: [Why this assumption is reasonable]
   - Impact: [How this affects implementation]

3. **Assumption 3**: [e.g., "No breaking API changes allowed"]
   - Basis: [Why this assumption is reasonable]
   - Impact: [How this affects implementation]

## Dependencies and Prerequisites

- **External Libraries**: [list any new dependencies needed]
- **API Changes**: [any API modifications required]
- **Configuration Changes**: [any config file updates]
- **Documentation Updates**: [README, docs, etc.]

## Timeline and Milestones

1. **Phase 1 - Analysis**: [estimated time]
2. **Phase 2 - Implementation**: [estimated time]
3. **Phase 3 - Testing**: [estimated time]
4. **Phase 4 - Review**: [estimated time]

## Risks and Mitigation

| Risk | Probability | Impact | Mitigation Strategy |
|------|------------|--------|---------------------|
| [Risk 1] | [Low/Med/High] | [Low/Med/High] | [How to mitigate] |
| [Risk 2] | [Low/Med/High] | [Low/Med/High] | [How to mitigate] |

## Success Metrics

- [ ] All acceptance criteria met
- [ ] No TypeScript compilation errors
- [ ] All tests passing
- [ ] Code review approved
- [ ] PR merged to main
- [ ] Issue automatically closed

## Related Issues and PRs

- Related to: #[NUMBER] - [TITLE]
- Blocks: #[NUMBER] - [TITLE]
- Blocked by: #[NUMBER] - [TITLE]
- Depends on: #[NUMBER] - [TITLE]

## Notes and Observations

[Any additional context, observations, or notes discovered during planning]

## Next Steps

1. Review this plan with team (if applicable)
2. Execute Phase 1: Analysis and detailed planning
3. Execute Phase 2: Implementation and commits
4. Execute Phase 3: Create and submit PR
5. Respond to review feedback
6. Merge when approved

---

**Generated**: [DATE]  
**Last Updated**: [DATE]  
**Status**: [Planning/In Progress/Completed]
```

## Example Usage

### Step-by-Step Workflow

1. **Receive Issue**: Team member or user reports issue #96
2. **Run This Prompt**: Copilot fetches issue details
3. **Generate Plan**: `plan.md` is created with all sections filled
4. **Review Plan**: Team reviews and approves strategy
5. **Execute Phases**: Follow prompts 1, 2, 3 in sequence
6. **Complete**: PR merged, issue closed

### Copilot Command Example

```
@copilot Use GitHub MCP tools to fetch issue #96 from mlc-ai/web-llm-chat 
and generate plan.md following the structure in 0-fetch-issue-and-plan.prompt.md
```

## Customization Guidelines

### For Different Project Types

**Web Application Projects**:
- Add UI/UX considerations
- Include browser compatibility matrix
- Add performance benchmarks

**Library/API Projects**:
- Include API contract changes
- Document backward compatibility
- Add migration guide section

**DevOps/Infrastructure**:
- Include deployment steps
- Add rollback procedures
- Document monitoring requirements

### For Different Team Sizes

**Solo Developer**:
- Simplify review process
- Focus on personal checklist
- Streamline documentation

**Small Team (2-5)**:
- Add peer review checklist
- Include knowledge sharing notes
- Document team conventions

**Large Team (6+)**:
- Add stakeholder communication plan
- Include cross-team dependencies
- Document approval workflows

## Quality Checklist

Before proceeding with Phase 1, ensure `plan.md` includes:

- [ ] Complete issue summary with context
- [ ] All requirements clearly identified
- [ ] Each prompt file has clear inputs/outputs
- [ ] Assumptions are documented with rationale
- [ ] Technical approach is detailed and feasible
- [ ] Success criteria are measurable
- [ ] Risks are identified with mitigation plans
- [ ] Timeline is realistic

## Troubleshooting

### Issue Not Found
- Verify issue number is correct
- Check repository access permissions
- Confirm using correct MCP tool (GitHub vs GitLab)

### Incomplete Issue Details
- Check issue comments for additional context
- Look for related issues or PRs
- Contact issue creator for clarification

### Tool Not Available
- Verify MCP tools are installed and configured
- Check authentication tokens are valid
- Fall back to manual issue reading if needed

---

## Output Verification

After generating `plan.md`, verify:

1. **Completeness**: All required sections are filled
2. **Accuracy**: Information matches the actual issue
3. **Clarity**: Technical approach is understandable
4. **Actionability**: Each phase has clear next steps
5. **Traceability**: Can trace requirements to implementation

## Success Criteria for This Step

- [x] Issue successfully fetched via MCP tool
- [x] `plan.md` created in project root
- [x] All sections of plan.md are populated
- [x] Assumptions are clearly documented
- [x] Prompt file breakdown is complete with I/O specs
- [x] Plan is ready for review and execution

---

**Note**: This is a generic template. Adapt the structure and sections based on your project's specific needs, team workflows, and organizational requirements.
