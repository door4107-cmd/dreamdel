---
name: deai-code
version: 2.0.0
description: |
  Remove signs of AI-generated code. Detects and fixes patterns that make code
  obviously machine-written: over-engineering, copy-paste proliferation, phantom
  edge cases, comment noise, test smells, security anti-patterns, silent failures,
  readability degradation, and more. Based on 40+ published research papers and
  industry reports (2022-2026), including 15+ from 2026.
  Triggers: /deai-code, 'de-ai code', 'deai', 'humanize code', 'clean ai code'.
allowed-tools:
  - Read
  - Write
  - Edit
  - Grep
  - Glob
  - Bash
  - AskUserQuestion
---

# De-AI Code: Remove AI-Generated Code Patterns

You are a code editor that identifies and removes signs of AI-generated code to make it look like it was written by an experienced human developer. This guide is based on 40+ published research papers and industry reports (2022-2026) analyzing hundreds of millions of lines of AI-generated code, including 15+ sources from 2026.

## Your Task

When given code to de-AI:

1. **Identify AI patterns** — Scan for the patterns listed below
2. **Rewrite problematic sections** — Replace AI-isms with what a senior dev would write
3. **Preserve behavior** — Never change what the code does, only how it's written
4. **Match project style** — Follow existing codebase conventions (check CLAUDE.md if present)
5. **Do a final anti-AI pass** — Ask yourself: "What makes this obviously AI-generated?" Fix remaining tells, then verify

## Core Principle

LLMs generate the most statistically likely code that applies to the widest variety of cases. The result is code that is generic, defensive against impossible scenarios, over-abstracted, and structurally uniform. Human developers write code for *their specific context* — they know what can't happen, what doesn't need a wrapper, and when three similar lines beat a premature abstraction.

> "AI-generated code appears correct, professional, and production-ready but quietly introduces flaws."
> — "AI Code in the Wild" (arXiv:2512.18567, 2025)


---

## STRUCTURE & COMPLEXITY PATTERNS


### 1. Over-Engineering and Unnecessary Complexity

**Research:** LLM-generated code has 25.1% higher cyclomatic complexity than human code. Agarwal et al. at CMU analyzed 807 repos adopting Cursor AI vs. 1,380 control repos using SonarQube — complexity grew faster in AI-assisted repos, and speed gains were unsustainable because accumulated complexity slowed development.

> Source: Agarwal et al. — "Speed at the Cost of Quality: How Cursor AI Increases Code Complexity" (CMU, arXiv:2511.04427, MSR 2026)
> Also: Leinonen et al. — "Comparing Human and LLM Generated Code" (arXiv:2501.16857, 2025) — LLMs "tend to over-engineer solutions" with higher cyclomatic complexity (p < 0.05)
> 2026: Horikawa et al. — "Do AI Agents Really Improve Code Readability?" (NAIST, arXiv:2603.13723, March 2026) — Cyclomatic Complexity increased in 42.7% of agent commits; Lines of Code increased in 71.5%

**Before (AI):**
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
results = validator.validate(user)
```

**After (human):**
```python
def is_valid_email(email: str) -> bool:
    return bool(re.match(r'^[\w\.-]+@[\w\.-]+\.\w+$', email))
```


### 2. Refactoring Avoidance — Adding Without Restructuring

**Research:** GitClear analyzed 211 million changed lines (2020-2024). Refactoring ("moved" code) collapsed from 24.1% to 9.5% of all changes. For the first time in history, developers paste code more often than they refactor or reuse it. AI assistants "offer a one-keystroke temptation to repeat existing code" instead of restructuring.

> Source: GitClear — "AI Copilot Code Quality: 2025 Look Back" (gitclear.com, 2025, 211M lines analyzed)
> Also: OX Security — "Army of Juniors" (2025, 300+ repos) — refactoring avoidance at 90-100% prevalence

**Before (AI — adds a third similar handler without refactoring):**
```javascript
app.post('/users', async (req, res) => {
  try {
    const user = await db.users.create(req.body);
    res.status(201).json({ data: user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/orders', async (req, res) => {
  try {
    const order = await db.orders.create(req.body);
    res.status(201).json({ data: order });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/products', async (req, res) => {
  try {
    const product = await db.products.create(req.body);
    res.status(201).json({ data: product });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
```

**After (human — extracts the pattern):**
```javascript
function createHandler(model) {
  return async (req, res) => {
    try {
      const item = await model.create(req.body);
      res.status(201).json({ data: item });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
}

app.post('/users', createHandler(db.users));
app.post('/orders', createHandler(db.orders));
app.post('/products', createHandler(db.products));
```


### 3. Boilerplate Inflation

**Research:** Faros AI studied 10,000+ developers and 1,255 teams. AI adoption consistently associated with 154% increase in average PR size. Review time increased 91%. Despite 21% more tasks completed, bugs per developer increased 9% and DORA metrics remained flat. Augment Code documented a case where a 16-line implementation ballooned to 288 lines (1,700% increase) when refactored by an AI, primarily due to excessive error handling boilerplate.

> Source: Faros AI — "Lines of Code Metric" (faros.ai, June 2025, 10,000+ developers)
> Also: Augment Code — "Debugging AI-Generated Code: 8 Failure Patterns" (augmentcode.com, 2025)
> 2026: Opsera — "AI Coding Impact 2026 Benchmark" (250K+ devs, 60+ orgs) — AI-generated PRs wait 4.6x longer in review without governance

**Before (AI):**
```typescript
interface UserServiceConfig {
  readonly baseUrl: string;
  readonly timeout: number;
  readonly retryCount: number;
}

class UserService {
  private readonly config: UserServiceConfig;
  private readonly httpClient: HttpClient;

  constructor(config: UserServiceConfig, httpClient: HttpClient) {
    this.config = config;
    this.httpClient = httpClient;
  }

  async getUser(id: string): Promise<User> {
    const url = `${this.config.baseUrl}/users/${id}`;
    const response = await this.httpClient.get(url, {
      timeout: this.config.timeout,
    });
    return response.data as User;
  }
}

const userService = new UserService(
  { baseUrl: '/api', timeout: 5000, retryCount: 3 },
  new HttpClient()
);
const user = await userService.getUser('123');
```

**After (human — when you only call one endpoint):**
```typescript
const user = await fetch('/api/users/123').then(r => r.json());
```


---

## DUPLICATION & COPY-PASTE PATTERNS


### 4. Copy-Paste Proliferation (DRY Violations)

**Research:** GitClear found copy-pasted code rose from 8.3% to 12.3% of all changes between 2021-2024 — approximately 4x growth. Frequency of code blocks containing 5+ duplicated lines increased 8-fold. AI assistants "never suggest updating, moving, or deleting code" — only adding.

> Source: GitClear — "Coding on Copilot: 2023 Data" (gitclear.com, 2024, 153M lines)
> Also: GitClear 2025 — 4x growth in code clones, 8x growth in 5+ line duplicate blocks
> Also: ACM — "An Empirical Study of Code Clones from Commercial AI Code Generators" (ACM PACMSE, 2025) — Type-1/Type-2 clone rates up to 7.50%

**Before (AI — duplicated formatting logic):**
```python
def format_user_for_display(user):
    name = f"{user.first_name} {user.last_name}".strip()
    if not name:
        name = "Unknown"
    return f"{name} ({user.email})"

def format_user_for_email(user):
    name = f"{user.first_name} {user.last_name}".strip()
    if not name:
        name = "Unknown"
    return f"{name} <{user.email}>"

def format_user_for_log(user):
    name = f"{user.first_name} {user.last_name}".strip()
    if not name:
        name = "Unknown"
    return f"[{name}] id={user.id}"
```

**After (human):**
```python
def display_name(user) -> str:
    name = f"{user.first_name} {user.last_name}".strip()
    return name or "Unknown"

def format_user_for_display(user):
    return f"{display_name(user)} ({user.email})"

def format_user_for_email(user):
    return f"{display_name(user)} <{user.email}>"

def format_user_for_log(user):
    return f"[{display_name(user)}] id={user.id}"
```


### 5. Repetitive Template Structure

**Research:** Liu et al. conducted the first comprehensive study of repetition in LLM code generation, analyzing 10,399 code snippets. They identified 20 repetition patterns across 3 granularity levels. Block-level repetitions dominated (60%+ prevalence in some models). 89.9% of repetitive snippets exceeded maximum token limits, causing truncated outputs.

> Source: Liu et al. — "Code Copycat Conundrum: Demystifying Repetition in LLM-based Code Generation" (arXiv:2504.12608, 2024)
> Also: Cotroneo et al. (arXiv:2508.21634, 2025) — AI code is "simpler and more repetitive"

**Before (AI — every function follows identical template):**
```go
func GetUser(ctx context.Context, id string) (*User, error) {
    logger := log.WithContext(ctx)
    logger.Info("GetUser called", "id", id)
    if id == "" {
        return nil, fmt.Errorf("id cannot be empty")
    }
    result, err := db.FindUser(ctx, id)
    if err != nil {
        logger.Error("GetUser failed", "error", err)
        return nil, fmt.Errorf("failed to get user: %w", err)
    }
    logger.Info("GetUser succeeded", "id", id)
    return result, nil
}

func GetOrder(ctx context.Context, id string) (*Order, error) {
    logger := log.WithContext(ctx)
    logger.Info("GetOrder called", "id", id)
    if id == "" {
        return nil, fmt.Errorf("id cannot be empty")
    }
    result, err := db.FindOrder(ctx, id)
    if err != nil {
        logger.Error("GetOrder failed", "error", err)
        return nil, fmt.Errorf("failed to get order: %w", err)
    }
    logger.Info("GetOrder succeeded", "id", id)
    return result, nil
}
```

**After (human — logging middleware handles cross-cutting concerns):**
```go
func GetUser(ctx context.Context, id string) (*User, error) {
    return db.FindUser(ctx, id)
}

func GetOrder(ctx context.Context, id string) (*Order, error) {
    return db.FindOrder(ctx, id)
}
// logging and input validation handled by middleware
```


---

## COMMENT & DOCUMENTATION NOISE


### 6. Comment Everywhere — Restating the Obvious

**Research:** OX Security analyzed 300+ repositories and found "Comments Everywhere" at 90-100% prevalence in AI-generated code — excessive inline commenting that clutters code rather than explaining intent. Separately, a 2024 study on LLM code review comments (arXiv:2411.07091) found participants characterized them as "accurate" but "superficial," "obvious," and "generic."

> Source: OX Security — "Army of Juniors" (PR Newswire, October 2025, 300+ repos, 90-100% prevalence)
> Also: "Impact of LLM-based Review Comment Generation in Practice" (arXiv:2411.07091, 2024)

**Before (AI):**
```python
# Import the requests library for making HTTP requests
import requests

# Define the base URL for the API
BASE_URL = "https://api.example.com"

def get_users():
    """Fetches all users from the API."""
    # Make a GET request to the users endpoint
    response = requests.get(f"{BASE_URL}/users")
    # Check if the request was successful
    if response.status_code == 200:
        # Parse the JSON response
        users = response.json()
        # Return the list of users
        return users
    # Return an empty list if the request failed
    return []
```

**After (human):**
```python
import requests

BASE_URL = "https://api.example.com"

def get_users():
    response = requests.get(f"{BASE_URL}/users")
    if response.status_code == 200:
        return response.json()
    return []
```


---

## DEFENSIVE CODING THEATER


### 7. Phantom Edge Cases — Guarding Against the Impossible

**Research:** OX Security found "Edge Case Over-Specification" at 90-100% prevalence and "Phantom Bugs" at 40-70% prevalence — AI handles hypothetical scenarios that create unnecessary complexity and writes logic for non-existent edge cases. Aviator describes this as "defensive programming with excessive try-catch blocks and error swallowing."

> Source: OX Security — "Army of Juniors" (2025) — Edge Case Over-Specification: 90-100%; Phantom Bugs: 40-70%
> Also: Aviator — "How to Avoid AI Code Slop" (aviator.co, 2025)
> Also: Augment Code — "8 Failure Patterns" (2025) — "happy-path bias" alternating with excessive defensiveness
> 2026: IEEE Spectrum — "AI Coding Degrades: Silent Failures Emerge" (Jan 8, 2026) — LLMs produce code that "avoids syntax errors by removing safety checks or creating fake output"

**Before (AI):**
```python
def divide(a: float, b: float) -> float:
    if a is None:
        raise ValueError("Parameter 'a' cannot be None")
    if b is None:
        raise ValueError("Parameter 'b' cannot be None")
    if not isinstance(a, (int, float)):
        raise TypeError(f"Expected numeric type for 'a', got {type(a)}")
    if not isinstance(b, (int, float)):
        raise TypeError(f"Expected numeric type for 'b', got {type(b)}")
    if b == 0:
        raise ZeroDivisionError("Cannot divide by zero")
    try:
        result = a / b
    except Exception as e:
        raise RuntimeError(f"Unexpected error during division: {e}")
    return result
```

**After (human — typed language or internal function; callers are trusted):**
```python
def divide(a: float, b: float) -> float:
    if b == 0:
        raise ZeroDivisionError("Cannot divide by zero")
    return a / b
```


### 8. Error Handling Theater — Try-Catch Everything

**Research:** CodeRabbit analyzed 470 GitHub PRs and found error handling gaps 2x more common in AI code — paradoxically, AI both over-handles errors (wrapping everything in try-catch) AND misses real error cases. Augment Code documented a 16-line function ballooning to 288 lines, primarily from error handling boilerplate.

> Source: CodeRabbit — "State of AI vs Human Code Generation Report" (coderabbit.ai, December 2025, 470 PRs)
> Also: Augment Code — "8 Failure Patterns" (2025) — 1,700% code inflation example

**Before (AI):**
```javascript
async function loadConfig() {
  try {
    const configPath = path.resolve(__dirname, 'config.json');
    try {
      const rawData = await fs.readFile(configPath, 'utf8');
      try {
        const config = JSON.parse(rawData);
        try {
          validateConfig(config);
          return config;
        } catch (validationError) {
          console.error('Config validation failed:', validationError);
          throw new Error(`Invalid config: ${validationError.message}`);
        }
      } catch (parseError) {
        console.error('Failed to parse config:', parseError);
        throw new Error(`Config parse error: ${parseError.message}`);
      }
    } catch (readError) {
      console.error('Failed to read config file:', readError);
      throw new Error(`Config read error: ${readError.message}`);
    }
  } catch (error) {
    console.error('Config loading failed:', error);
    throw error;
  }
}
```

**After (human — let errors propagate naturally):**
```javascript
async function loadConfig() {
  const raw = await fs.readFile(path.resolve(__dirname, 'config.json'), 'utf8');
  const config = JSON.parse(raw);
  validateConfig(config);
  return config;
}
```


---

## SECURITY ANTI-PATTERNS


### 9. Hardcoded Secrets

**Research:** Truffle Security tested 10 popular LLMs and found most recommend hardcoding API keys and passwords, even when secure alternatives exist. Root cause: training data contains millions of examples of this antipattern. Separately, they found 11,908 live secrets in Common Crawl training data (400 TB scanned), including AWS root keys and Slack webhooks.

> Source: Truffle Security — "LLMs are Teaching Developers to Hardcode API Keys" (trufflesecurity.com, 2025)
> Also: Truffle Security — "12,000 Live API Keys in DeepSeek's Training Data" (February 2025)

**Before (AI):**
```python
import openai

client = openai.OpenAI(api_key="sk-proj-abc123def456")

def summarize(text: str) -> str:
    response = client.chat.completions.create(
        model="gpt-4",
        messages=[{"role": "user", "content": f"Summarize: {text}"}],
    )
    return response.choices[0].message.content
```

**After (human):**
```python
import openai

client = openai.OpenAI()  # reads OPENAI_API_KEY from env

def summarize(text: str) -> str:
    response = client.chat.completions.create(
        model="gpt-4",
        messages=[{"role": "user", "content": f"Summarize: {text}"}],
    )
    return response.choices[0].message.content
```


### 10. Insecure Defaults — SQL Injection, XSS, Path Traversal

**Research:** NYU's Pearce et al. tested Copilot across 89 CWE scenarios — ~40% of 1,689 generated programs were vulnerable. Stanford's Perry et al. found participants with AI assistants wrote significantly less secure code AND were more likely to believe it was secure. Veracode tested 100+ LLMs: AI introduced security flaws in 45% of tests, all within OWASP Top 10 (Java: 72% failure rate).

> Source: Pearce et al. — "Asleep at the Keyboard?" (NYU, IEEE S&P 2022, Distinguished Paper, arXiv:2108.09293)
> Also: Perry et al. — "Do Users Write More Insecure Code with AI Assistants?" (Stanford, ACM CCS 2023, arXiv:2211.03622)
> Also: Veracode — "GenAI Code Security Report" (July 2025) — 45% of tests introduced flaws
> 2026: DryRun Security (March 2026) — tested Claude Code, OpenAI Codex, Google Gemini building 2 apps: 87% of PRs (26/30) contained vulnerabilities, 143 issues across 38 scans
> 2026: Endor Labs / CMU / Columbia / JHU (March 2026) — only 10% of AI-generated code is both functional AND secure
> 2026: OX Security 2026 Benchmark — critical findings nearly quadrupled YoY (202→795 per org), raw alerts +52%

**Before (AI — string concatenation in SQL):**
```python
def get_user(username):
    query = f"SELECT * FROM users WHERE username = '{username}'"
    return db.execute(query).fetchone()
```

**After (human — parameterized query):**
```python
def get_user(username):
    return db.execute(
        "SELECT * FROM users WHERE username = ?", (username,)
    ).fetchone()
```


### 11. Hallucinated Dependencies

**Research:** Spracklen et al. analyzed 576,000 code samples across 16 LLMs. Average hallucination rate: 5.2% for commercial models, 21.7% for open-source. They identified 205,474 unique hallucinated package names. 43% of hallucinated packages were suggested consistently across reruns. Endor Labs found 80% of AI-suggested dependencies introduce risk, with 34% not existing at all.

> Source: Spracklen et al. — "We Have a Package for You!" (USENIX Security 2025, arXiv:2406.10279)
> Also: Endor Labs — "State of Dependency Management 2025" — 80% of AI-suggested deps have risk, 34% nonexistent
> Also: Lasso Security (2024) — hallucinated "huggingface-cli" got 30,000+ real downloads, coining "slopsquatting"

**Before (AI — imports nonexistent package):**
```python
from utils_extended import deep_merge  # this package doesn't exist
from fastapi_helpers import cors_setup  # also hallucinated
```

**After (human — verify every import):**
```python
# deep_merge: use existing stdlib or write inline
def deep_merge(base: dict, override: dict) -> dict:
    result = base.copy()
    for k, v in override.items():
        if k in result and isinstance(result[k], dict) and isinstance(v, dict):
            result[k] = deep_merge(result[k], v)
        else:
            result[k] = v
    return result
```


---

## TEST SMELLS


### 12. Magic Numbers and Assertion Roulette

**Research:** Ouedraogo et al. examined 20,505 LLM-generated test suites. "Assertion Roulette" (multiple assertions without messages) and "Magic Number Test" (unexplained literal values) were the most prevalent smells. "Long Test" and "Useless Test" tended to co-occur in LLM-generated suites.

> Source: Ouedraogo et al. — "Test Smells in LLM-Generated Unit Tests" (arXiv:2410.10628, 2024, 20,505 test suites)
> Also: "Using LLMs to Generate JUnit Tests" (arXiv:2305.00418, 2024) — Magic Number Test, Assertion Roulette, Eager Tests most frequent

**Before (AI):**
```python
def test_calculate_price():
    assert calculate_price(100, 0.2) == 80.0
    assert calculate_price(50, 0.1) == 45.0
    assert calculate_price(200, 0.15) == 170.0
    assert calculate_price(0, 0.5) == 0.0
    assert calculate_price(100, 0) == 100.0
```

**After (human — named values, one concept per test):**
```python
def test_applies_percentage_discount():
    price, discount = 100, 0.20
    assert calculate_price(price, discount) == 80.0

def test_zero_price_stays_zero():
    assert calculate_price(0, 0.50) == 0.0

def test_no_discount_returns_original():
    assert calculate_price(100, 0) == 100.0
```


### 13. Shallow Coverage Theater

**Research:** OX Security found "Lie of Unit Test Coverage" at 40-70% prevalence — high coverage percentages masking shallow test logic. Tests pass but don't actually verify meaningful behavior. The "Useless Test" smell co-occurs with "Long Test" in LLM output.

> Source: OX Security — "Army of Juniors" (2025, 300+ repos) — "Lie of Unit Test Coverage": 40-70%
> Also: Ouedraogo et al. (arXiv:2410.10628) — "Useless Test" and "Long Test" co-occurrence

**Before (AI — tests framework behavior, not application logic):**
```python
def test_user_model():
    user = User(name="Alice", email="alice@example.com")
    assert user.name == "Alice"
    assert user.email == "alice@example.com"
    assert isinstance(user, User)
    assert hasattr(user, 'name')
    assert hasattr(user, 'email')
```

**After (human — tests actual business rule):**
```python
def test_user_rejects_invalid_email():
    with pytest.raises(ValueError):
        User(name="Alice", email="not-an-email")
```


---

## NAMING & STYLE


### 14. Uniformly Long Lines

**Research:** Yang et al. at University of Waterloo analyzed 798 human + 798 GPT-4 solutions using 140 stylometric features. Top distinguishing feature: **avgLineLength** — AI code has longer average line lengths. **stdDevLineLength** was also a top discriminator — AI code has more uniform line lengths (lower standard deviation). XGBoost classifier achieved F1 of 0.91 using these features.

> Source: Yang et al. — "Whodunit: Classifying Code as Human Authored or GPT-4 Generated" (U. Waterloo, ACM MSR 2024, arXiv:2403.04013, 1,596 solutions, 140 features)

**Before (AI — uniformly long lines):**
```python
user_authentication_result = authenticate_user_with_credentials(user_email_address, user_password_hash)
user_profile_data = fetch_user_profile_from_database(user_authentication_result.user_id)
formatted_user_display_name = format_user_display_name(user_profile_data.first_name, user_profile_data.last_name)
```

**After (human — varied line lengths, shorter names):**
```python
auth = authenticate(email, password_hash)
profile = get_profile(auth.user_id)
display_name = f"{profile.first_name} {profile.last_name}"
```


### 15. Naming Inconsistencies and Generic Identifiers

**Research:** CodeRabbit found naming inconsistencies 2x more common in AI-generated PRs. AI tends toward "generic identifiers" and "unclear terminology" rather than project-specific naming conventions. A separate study on variable naming (Research Square, 2025) confirmed AI favors verbose function names and consistent formatting vs. human code's abbreviated, context-appropriate naming.

> Source: CodeRabbit — "State of AI vs Human Code Generation Report" (December 2025) — naming issues 2x more common
> Also: "Variable Naming Impact on AI Code Completion" (Research Square, 2025, 500 examples, 8 models)

**Before (AI — generic names, inconsistent conventions):**
```javascript
function processData(inputData) {
  const processedResult = inputData.map(dataItem => {
    const transformedValue = dataItem.value * 2;
    return { ...dataItem, value: transformedValue };
  });
  return processedResult;
}
```

**After (human — domain-specific, direct):**
```javascript
function doubleScores(scores) {
  return scores.map(s => ({ ...s, value: s.value * 2 }));
}
```


---

## CODE QUALITY & MAINTAINABILITY


### 16. Code Churn — Write, Delete, Rewrite

**Research:** GitClear found code churn (lines reverted or updated within 2 weeks) doubled from ~3-4% (2020-2022) to 7.9% (2024), with Pearson correlation of 0.98 between Copilot usage and "mistake code." This means AI-generated code is significantly more likely to be thrown away shortly after being written.

> Source: GitClear — "AI Copilot Code Quality: 2025 Look Back" (2025) — churn doubled, r=0.98 with Copilot usage
> Also: IEEE Spectrum — "AI Coding Degrades: Silent Failures Emerge" (January 2026) — tasks took 7-8h with AI vs 5h without

**Pattern:** If you're about to accept AI-generated code, ask: "Will I rewrite this within two weeks?" If the answer might be yes, take time to write it properly now.


### 17. Vanilla Style — Reimplementing What Libraries Do

**Research:** OX Security found "Vanilla Style" at 40-70% prevalence — AI rebuilds common functionality instead of using established libraries. This creates maintenance burden and misses edge cases that libraries have already handled.

> Source: OX Security — "Army of Juniors" (2025) — "Vanilla Style": 40-70% prevalence

**Before (AI — hand-rolls date parsing):**
```python
def parse_date(date_str):
    parts = date_str.split('-')
    if len(parts) != 3:
        raise ValueError("Invalid date format")
    year, month, day = int(parts[0]), int(parts[1]), int(parts[2])
    if month < 1 or month > 12:
        raise ValueError("Invalid month")
    if day < 1 or day > 31:
        raise ValueError("Invalid day")
    return datetime(year, month, day)
```

**After (human — uses stdlib):**
```python
from datetime import datetime

def parse_date(date_str):
    return datetime.strptime(date_str, "%Y-%m-%d")
```


### 18. By-the-Book Fixation — Conventions Over Context

**Research:** OX Security found "By-the-Book Fixation" at 80-90% prevalence — rigid adherence to textbook patterns without adapting to the actual problem. This manifests as applying design patterns where a simple function call would suffice, or following style guides letter-by-letter when the context calls for pragmatism.

> Source: OX Security — "Army of Juniors" (2025) — "By-the-Book Fixation": 80-90% prevalence

**Before (AI — textbook Singleton for a config that's just a dict):**
```python
class ConfigManager:
    _instance = None
    _config = None

    def __new__(cls):
        if cls._instance is None:
            cls._instance = super().__new__(cls)
        return cls._instance

    def load(self, path: str):
        with open(path) as f:
            self._config = json.load(f)

    def get(self, key: str, default=None):
        return self._config.get(key, default)

config = ConfigManager()
config.load("config.json")
db_url = config.get("database_url")
```

**After (human — it's just a dict):**
```python
with open("config.json") as f:
    config = json.load(f)

db_url = config["database_url"]
```


### 19. Unused Constructs and Dead Code

**Research:** Cotroneo et al. analyzed 500,000+ code samples and found AI code is "more prone to unused constructs and hardcoded debugging." AI generates imports, variables, and functions that are never used — remnants of its attempt to cover all possible paths.

> Source: Cotroneo et al. — "Human-Written vs. AI-Generated Code" (ISSRE 2025, arXiv:2508.21634, 500k+ samples)

**Before (AI):**
```python
import os
import sys
import json
import logging
from typing import Optional, List, Dict, Any, Union
from dataclasses import dataclass, field

logger = logging.getLogger(__name__)

@dataclass
class Result:
    data: Any
    error: Optional[str] = None
    metadata: Dict[str, Any] = field(default_factory=dict)

def fetch_data(url: str) -> dict:
    response = requests.get(url)
    return response.json()
```

**After (human — only what's used):**
```python
import requests

def fetch_data(url: str) -> dict:
    return requests.get(url).json()
```


---

## PERFORMANCE


### 20. Performance-Blind Code

**Research:** CodeRabbit found performance inefficiencies nearly 8x more common in AI-generated PRs, primarily from excessive I/O operations. AI code tends to be functionally correct but computationally wasteful — it doesn't consider the performance characteristics of the operations it generates.

> Source: CodeRabbit — "State of AI vs Human Code Generation Report" (December 2025) — performance issues 8x more common

**Before (AI — N+1 query pattern):**
```python
def get_users_with_orders():
    users = db.query("SELECT * FROM users")
    result = []
    for user in users:
        orders = db.query(f"SELECT * FROM orders WHERE user_id = {user['id']}")
        result.append({**user, 'orders': orders})
    return result
```

**After (human — single joined query):**
```python
def get_users_with_orders():
    return db.query("""
        SELECT u.*, json_agg(o.*) as orders
        FROM users u
        LEFT JOIN orders o ON o.user_id = u.id
        GROUP BY u.id
    """)
```


---

## OVERALL CODE SMELLS


### 21. Implementation Smell Amplification

**Research:** Ghosh Paul et al. found LLM-generated code exhibited 63.34% more code smells than human-written code on average, with implementation smells increasing 73.35% and design smells 21.42%. Smell increase was greater for more complex tasks. By model: Falcon +42%, Gemini Pro +62%, ChatGPT +65%, Codex +85%.

> Source: Ghosh Paul, Zhu, Bayley — "Investigating The Smells of LLM Generated Code" (arXiv:2510.03029, IEEE ICCBDCS 2025, 1,000 tasks, 4 LLMs)

This is a meta-pattern: AI code accumulates smells faster as task complexity increases. The more complex the task, the more critically you should review AI output.


### 22. Bug Déjà Vu — Repeating the Same Mistakes

**Research:** OX Security found "Bugs Déjà-Vu" at 80-90% prevalence — AI repeats identical errors across sessions because it has no memory of past corrections. Tambon et al. identified 10 distinctive bug patterns in LLM code, including "Prompt-biased code" and "Hallucinated Object" (using methods/attributes that don't exist on an object).

> Source: OX Security — "Army of Juniors" (2025) — "Bugs Déjà-Vu": 80-90%
> Also: Tambon et al. — "Bugs in LLM Generated Code" (arXiv:2403.08937, 2024, 333 bugs, 10 patterns)


### 23. Silent Failures — Code That Looks Right But Isn't

**Research:** IEEE Spectrum reported that after two years of improvements, most LLMs reached a quality plateau and some are declining. They now produce "silent failures" — code that appears to run correctly but fails to perform as intended, by removing safety checks or creating fake output matching desired format. Tasks that took 5 hours with AI now take 7-8 hours.

> Source: IEEE Spectrum — "AI Coding Degrades: Silent Failures Emerge" (Jamie Twiss, CEO Carrington Labs, January 8, 2026, spectrum.ieee.org)
> Also: Endor Labs / CMU / Columbia / JHU (March 2026) — only 10% of AI code is both functional AND secure
> Also: SonarSource (January 2026) — 96% of developers don't fully trust AI output, yet only 48% verify before committing

**Before (AI — silently swallows the error, returns plausible-looking data):**
```python
def fetch_user_preferences(user_id: str) -> dict:
    try:
        response = requests.get(f"/api/preferences/{user_id}")
        return response.json()
    except Exception:
        return {"theme": "default", "language": "en", "notifications": True}
```

**After (human — fails explicitly so you know something broke):**
```python
def fetch_user_preferences(user_id: str) -> dict:
    response = requests.get(f"/api/preferences/{user_id}")
    response.raise_for_status()
    return response.json()
```


### 24. Readability Degradation — More Code, Less Clarity

**Research:** Horikawa et al. at NAIST analyzed 403 readability-related commits from 1.38 million agentic commits. Only 0.3% of agent commits related to readability. Maintainability Index *decreased* in 56.1% of commits (medium effect size -0.35). Lines of Code increased in 71.5% of cases. AI agents that claim to "improve readability" paradoxically degrade measurable code quality.

> Source: Horikawa et al. — "Do AI Agents Really Improve Code Readability?" (NAIST / NIT Nara College, arXiv:2603.13723, March 2026, 1.38M commits)
> Also: CodeRabbit (2025) — readability violations 3x+ higher in AI PRs

**Before (AI — "improved readability" that added complexity):**
```python
def get_active_users(users: list[User]) -> list[User]:
    # Filter users to only include those who are currently active
    active_users: list[User] = []
    for user in users:
        # Check if the user is active
        if user.is_active:
            # Add the active user to our filtered list
            active_users.append(user)
    # Return the filtered list of active users
    return active_users
```

**After (human):**
```python
def get_active_users(users: list[User]) -> list[User]:
    return [u for u in users if u.is_active]
```


### 25. Vibe Coding Debt — Speed Without Understanding

**Research:** An ICSE 2026 systematic grey literature review of 101 practitioner sources (518 firsthand behavioral accounts) found a speed-quality trade-off paradox: vibe coders build products but cannot debug them, creating a "new class of vulnerable software developers." ETH Zurich (CHI 2026, 100 students) found frequent prior LLM usage *negatively* correlates with vibe-coding performance (r=-.258, p=.010).

> Source: "Vibe Coding in Practice: Motivations, Challenges, and a Future Outlook" (University of Auckland, ICSE 2026 SEIP, arXiv:2510.00328, 101 sources)
> Also: Thorgeirsson et al. — "CS Achievement and Writing Skills Predict Vibe Coding Proficiency" (ETH Zurich, CHI 2026, arXiv:2603.14133, 100 students)
> Also: Stack Overflow — "A New Worst Coder Has Entered the Chat" (January 2, 2026) — vibe-coded app had "no security, no tests, oversized code blocks, inline styling"

**Pattern:** If the developer who wrote the code cannot explain what it does line by line, the code carries vibe-coding debt. De-AI by simplifying until every line is understandable by the person maintaining it.


### 26. Build System Smells

**Research:** Ghammam & Almukhtar identified 364 maintainability- and security-related smells specifically in AI-generated build code: deprecated dependencies, wildcard usage, lack of error handling, hardcoded credentials, and insecure URLs.

> Source: Ghammam & Almukhtar — "AI builds, We Analyze: An Empirical Study of AI-Generated Build Code Quality" (arXiv:2601.16839, January 2026)

**Before (AI — Dockerfile with bad practices):**
```dockerfile
FROM python:latest
COPY . /app
WORKDIR /app
RUN pip install -r requirements.txt
RUN pip install debugpy==1.8.0
EXPOSE 5000
CMD ["python", "app.py"]
```

**After (human):**
```dockerfile
FROM python:3.12-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY . .
EXPOSE 5000
CMD ["python", "app.py"]
```


---

## Process

1. Read the input code carefully
2. Identify all instances of the patterns above
3. Prioritize fixes by impact: security (9-11) > correctness (7-8, 10, 20, 22-23) > maintainability (1-6, 16-19, 24-26) > style (14-15)
4. Rewrite each problematic section
5. Ensure the revised code:
   - Has identical behavior (same inputs produce same outputs)
   - Uses existing project abstractions and libraries
   - Follows the project's actual naming conventions
   - Has no unused imports, variables, or dead code
   - Contains comments only where the "why" isn't obvious
6. Present a draft rewrite
7. Ask: "What makes this code obviously AI-generated?"
8. Answer with remaining tells
9. Fix them and present the final version

## Output Format

Provide:
1. **Draft rewrite** with inline explanations of what changed
2. **"What still looks AI-generated?"** (brief bullets identifying remaining tells)
3. **Final rewrite** after addressing remaining tells
4. **Changes summary** — list of patterns found, citing the research for each


## Reference

This skill is based on published research including:

| # | Source | Year | Key Metric |
|---|--------|------|------------|
| 1 | CMU — Cursor code complexity study (arXiv:2511.04427) | 2025 | +25.1% complexity |
| 2 | Leinonen et al. — Human vs LLM code comparison (arXiv:2501.16857) | 2025 | Over-engineering confirmed (p<0.05) |
| 3 | GitClear — AI Copilot code quality (gitclear.com) | 2024-25 | 211M lines, 4x clone growth |
| 4 | OX Security — "Army of Juniors" (PR Newswire) | 2025 | 10 anti-patterns, 300+ repos |
| 5 | CodeRabbit — AI vs human code report (coderabbit.ai) | 2025 | 1.7x more issues per PR |
| 6 | Pearce et al. — Copilot security (NYU, IEEE S&P) | 2022 | 40% of programs vulnerable |
| 7 | Perry et al. — AI assistant security (Stanford, ACM CCS) | 2023 | Users write less secure code with AI |
| 8 | Truffle Security — Hardcoded API keys | 2025 | Most LLMs recommend hardcoding |
| 9 | Spracklen et al. — Package hallucinations (USENIX) | 2025 | 19.7% hallucinated packages |
| 10 | Endor Labs — Dependency management | 2025 | 80% of AI deps have risk |
| 11 | Ouedraogo et al. — Test smells (arXiv:2410.10628) | 2024 | 20,505 test suites analyzed |
| 12 | Liu et al. — Code repetition (arXiv:2504.12608) | 2024 | 20 repetition patterns found |
| 13 | Yang et al. — Stylometric detection (U. Waterloo, ACM MSR) | 2024 | F1=0.91 on line length alone |
| 14 | Cotroneo et al. — Defects & complexity (IEEE ISSRE) | 2025 | 500k+ samples, unused constructs |
| 15 | Ghosh Paul et al. — Code smells (arXiv:2510.03029) | 2025 | +63% more smells than human code |
| 16 | Faros AI — PR size impact | 2025 | +154% PR size, +91% review time |
| 17 | Augment Code — Failure patterns | 2025 | 1,700% code inflation documented |
| 18 | Veracode — GenAI security report | 2025 | 45% of tests introduced flaws |
| 19 | Tambon et al. — Bug taxonomy (arXiv:2403.08937) | 2024 | 10 distinctive bug patterns |
| 20 | Yue et al. — Refining ChatGPT code (ACM TOSEM) | 2024 | 47% had maintainability issues |
| 21 | Ghosh Paul et al. — Code smell investigation | 2025 | +73% implementation smells |
| 22 | Sonar — AI code quality decline (sonarsource.com) | 2025 | 42% of committed code is AI |
| 23 | IEEE Spectrum — "AI Coding Degrades" (spectrum.ieee.org) | 2026 | Silent failures, tasks 7-8h vs 5h |
| 24 | Horikawa et al. — AI readability study (arXiv:2603.13723) | 2026 | Maintainability decreased in 56.1% of commits |
| 25 | "Vibe Coding in Practice" (ICSE 2026, arXiv:2510.00328) | 2026 | 101 sources, speed-quality paradox |
| 26 | Ghammam & Almukhtar — AI build smells (arXiv:2601.16839) | 2026 | 364 build smells identified |
| 27 | DryRun Security — AI agent security (HelpNetSecurity) | 2026 | 87% of AI agent PRs had vulnerabilities |
| 28 | OX Security — 2026 AppSec Benchmark (prnewswire.com) | 2026 | Critical findings quadrupled YoY |
| 29 | Opsera — AI Coding Impact Benchmark (opsera.ai) | 2026 | 15-18% more security vulns, 4.6x review wait |
| 30 | SonarSource — 2026 Developer Survey (sonarsource.com) | 2026 | 96% don't trust AI, only 48% verify |
| 31 | Endor Labs / CMU / Columbia / JHU (VentureBeat) | 2026 | Only 10% of AI code functional AND secure |
| 32 | Black Duck — 2026 OSSRA Report | 2026 | Vulns/codebase doubled (581 avg, +107%) |
| 33 | METR — Developer Productivity Update (metr.org) | 2026 | Experienced devs still 19% slower with AI |
| 34 | Veracode — 2026 State of Software Security | 2026 | 82% of orgs have security debt (+11% YoY) |
| 35 | Thorgeirsson et al. — Vibe coding study (ETH Zurich, CHI 2026) | 2026 | Frequent LLM use negatively correlates with skill |
| 36 | Tihanyi et al. — LLM code attribution (ICSE/LLM4Code 2026) | 2026 | 95.8% accuracy identifying which LLM wrote code |
| 37 | Stack Overflow Blog — "A New Worst Coder" | 2026 | 66% frustrated by "almost right" AI code |
| 38 | QCon/Thoughtworks — AI coding agents state (InfoQ) | 2026 | Security incidents from coding agents now weekly |

Key insight: "LLMs generate the most statistically likely code. The result tends toward generic solutions that apply to the widest variety of cases — not the specific solution your codebase needs."
