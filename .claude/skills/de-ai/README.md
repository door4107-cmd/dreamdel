# /deai-code

Remove signs of AI-generated code. Like [humanizer](https://github.com/blader/humanizer) for text, but for code.

A [Claude Code](https://claude.ai/code) skill that detects and fixes patterns that make code obviously machine-written: over-engineering, copy-paste proliferation, phantom edge cases, comment noise, test smells, security anti-patterns, and more.

**Based on 40+ published research papers and industry reports (2022-2026), including 15+ from 2026.** Every pattern includes a citation to real research.

## What it does

When you run `/deai-code` on your code, it:

1. Scans for 26 research-backed AI code patterns
2. Rewrites problematic sections like a senior dev would
3. Does a self-audit pass ("What still looks AI-generated?")
4. Reports which patterns were found with links to the research

### Patterns detected

| # | Pattern | Research Source | Key Finding |
|---|---------|----------------|-------------|
| 1 | Over-engineering | CMU (arXiv:2511.04427) | +25.1% cyclomatic complexity |
| 2 | Refactoring avoidance | GitClear (211M lines, 2025) | Refactoring dropped from 24% to 9.5% |
| 3 | Boilerplate inflation | Faros AI (10K devs, 2025) | +154% PR size |
| 4 | Copy-paste proliferation | GitClear (2024-25) | 4x growth in code clones |
| 5 | Repetitive templates | Liu et al. (arXiv:2504.12608) | 20 repetition patterns identified |
| 6 | Comment noise | OX Security (300+ repos, 2025) | 90-100% prevalence |
| 7 | Phantom edge cases | OX Security (2025) | 90-100% prevalence |
| 8 | Error handling theater | CodeRabbit (470 PRs, 2025) | 2x more error handling gaps |
| 9 | Hardcoded secrets | Truffle Security (2025) | Most LLMs recommend hardcoding |
| 10 | Insecure defaults | NYU (IEEE S&P 2022) | 40% of programs vulnerable |
| 11 | Hallucinated dependencies | Spracklen et al. (USENIX 2025) | 19.7% of packages don't exist |
| 12 | Test magic numbers | Ouedraogo et al. (arXiv:2410.10628) | 20,505 test suites analyzed |
| 13 | Shallow test coverage | OX Security (2025) | 40-70% prevalence |
| 14 | Uniformly long lines | Yang et al. (ACM MSR 2024) | F1=0.91 detection on line length |
| 15 | Generic naming | CodeRabbit (2025) | 2x more naming inconsistencies |
| 16 | Code churn | GitClear (2025) | r=0.98 correlation with AI usage |
| 17 | Vanilla reimplementation | OX Security (2025) | 40-70% prevalence |
| 18 | By-the-book fixation | OX Security (2025) | 80-90% prevalence |
| 19 | Unused constructs | Cotroneo et al. (ISSRE 2025) | 500K+ samples analyzed |
| 20 | Performance-blind code | CodeRabbit (2025) | 8x more perf issues |
| 21 | Smell amplification | Ghosh Paul et al. (arXiv:2510.03029) | +63% more code smells |
| 22 | Bug deja vu | OX Security + Tambon et al. (2024-25) | 80-90% prevalence |
| 23 | Silent failures | IEEE Spectrum (Jan 2026) | Tasks 7-8h vs 5h, code removes safety checks |
| 24 | Readability degradation | Horikawa et al. (NAIST, arXiv:2603.13723, Mar 2026) | Maintainability decreased in 56.1% of commits |
| 25 | Vibe coding debt | ICSE 2026 + ETH Zurich CHI 2026 | 101 sources, speed-quality paradox |
| 26 | Build system smells | Ghammam & Almukhtar (arXiv:2601.16839, Jan 2026) | 364 build smells identified |

## Setup

### Install as a Claude Code skill

```bash
# Clone into your Claude Code skills directory
git clone https://github.com/golovatskygroup/deai-code.git ~/.claude/skills/deai-code
```

That's it. Claude Code will automatically pick up the skill on next launch.

### Verify installation

Start Claude Code and type `/deai-code`. You should see the skill activate.

Alternatively, check it appears in your skill list:

```bash
ls ~/.claude/skills/deai-code/SKILL.md
```

### Update

```bash
cd ~/.claude/skills/deai-code && git pull
```

## Usage

### Basic usage

```
/deai-code
```

Then paste or reference the code you want to clean up. The skill will:
1. Identify AI patterns with research citations
2. Provide a draft rewrite
3. Self-audit for remaining tells
4. Deliver a final clean version

### On specific files

```
/deai-code review src/auth.ts
```

### Example

**Before (AI-generated):**
```python
class UserValidationStrategy(ABC):
    @abstractmethod
    def validate(self, user: User) -> ValidationResult:
        pass

class EmailValidationStrategy(UserValidationStrategy):
    def validate(self, user: User) -> ValidationResult:
        if not re.match(r'^[\w\.-]+@[\w\.-]+\.\w+$', user.email):
            return ValidationResult(success=False, error="Invalid email")
        return ValidationResult(success=True)

class UserValidator:
    def __init__(self, strategies: list[UserValidationStrategy]):
        self._strategies = strategies

    def validate(self, user: User) -> list[ValidationResult]:
        return [s.validate(user) for s in self._strategies]

validator = UserValidator([EmailValidationStrategy()])
```

**After (de-AI'd):**
```python
def is_valid_email(email: str) -> bool:
    return bool(re.match(r'^[\w\.-]+@[\w\.-]+\.\w+$', email))
```

Pattern found: **#1 Over-engineering** (CMU arXiv:2511.04427 — +25.1% cyclomatic complexity in AI code). Strategy pattern with single implementation, abstract base class never extended, wrapper class adding no value.

## Research references

Full citations are in [SKILL.md](./SKILL.md). 38 sources total. Key sources by year:

### 2026 sources (15+)
- **IEEE Spectrum** — "AI Coding Degrades: Silent Failures Emerge" (Jan 2026) — quality plateau and decline
- **DryRun Security** (March 2026) — 87% of AI agent PRs contained vulnerabilities
- **OX Security** — 2026 AppSec Benchmark — critical findings quadrupled YoY
- **Opsera** — "AI Coding Impact 2026 Benchmark" (250K+ devs) — 15-18% more security vulns
- **Endor Labs / CMU / Columbia / JHU** (March 2026) — only 10% of AI code functional AND secure
- **NAIST** — Horikawa et al., "Do AI Agents Really Improve Code Readability?" (arXiv:2603.13723)
- **ICSE 2026** — "Vibe Coding in Practice" (101 sources, speed-quality paradox)
- **ETH Zurich / CHI 2026** — vibe coding proficiency study (100 students)
- **SonarSource** — 2026 Developer Survey — 96% don't trust AI, only 48% verify
- **METR** (Feb 2026) — experienced devs still 19% slower with AI
- **Veracode** — 2026 State of Software Security — 82% of orgs have security debt
- **Black Duck** — 2026 OSSRA — vulnerabilities per codebase doubled (+107%)
- **ICSE/LLM4Code 2026** — Tihanyi et al., 95.8% accuracy on LLM code attribution
- **Stack Overflow** — "A New Worst Coder Has Entered the Chat" (Jan 2026)
- **QCon/Thoughtworks** (March 2026) — AI coding agent security incidents now weekly

### 2022-2025 sources
- **GitClear** — "AI Copilot Code Quality" reports (2024, 2025) — 211M lines analyzed
- **CMU** — "Speed at the Cost of Quality: How Cursor AI Increases Code Complexity" (2025)
- **Stanford** — Perry et al., "Do Users Write More Insecure Code with AI Assistants?" (ACM CCS 2023)
- **NYU** — Pearce et al., "Asleep at the Keyboard?" (IEEE S&P 2022, Distinguished Paper)
- **OX Security** — "Army of Juniors" (2025) — 10 anti-patterns across 300+ repos
- **CodeRabbit** — "State of AI vs Human Code Generation Report" (2025) — 470 PRs analyzed
- **USENIX** — Spracklen et al., "We Have a Package for You!" (2025) — package hallucinations
- **Truffle Security** — "LLMs are Teaching Developers to Hardcode API Keys" (2025)
- **University of Waterloo** — Yang et al., "Whodunit" (ACM MSR 2024) — stylometric detection

## License

MIT
