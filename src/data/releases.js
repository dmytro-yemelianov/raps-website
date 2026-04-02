/**
 * Centralized release data for RAPS
 * 
 * This file contains all release information used across the website.
 * Update this file when a new version is released to keep all pages in sync.
 * 
 * Latest version should always be first in the array.
 */

export const releases = [
  {
    version: '5.7.0',
    date: '2026-03-14',
    highlights: [
      'Safeguard: rollback & backup script generators for 32 operations',
      'Pre-operation backup scripts capture current state',
      'Post-operation rollback scripts to undo changes',
      'Dry-run mode for script preview',
    ],
    description: 'Introduces raps safeguard — generates executable backup and rollback shell scripts for any destructive RAPS operation, covering buckets, objects, webhooks, projects, admin users, issues, RFIs, templates, folder permissions, pipelines, and more.',
    type: 'minor',
    changes: {
      added: [
        '`raps safeguard rollback "<command>"` — generates a script that undoes the given operation',
        '`raps safeguard backup "<command>"` — generates a script that captures current state before a destructive operation',
        '`raps safeguard list` — shows all 32 supported reversible operations',
        'Backup scripts for bucket delete: downloads all objects, saves metadata, takes snapshot manifest',
        'Rollback scripts for admin user operations: add/remove/update with email and project-id mapping',
        'Pipeline and sync operation backup via pre-operation snapshots',
        'All generated scripts include set -euo pipefail, inline comments, chmod +x',
      ],
    },
  },
  {
    version: '5.6.2',
    date: '2026-03-13',
    highlights: [
      'Company CRUD commands (create, get, search, update)',
      'Account user CRUD (create, get, update-account)',
      'User list shows company names instead of UUIDs',
      'Auth login expiry auto-refresh',
    ],
    description: 'Completes the admin management lifecycle with company and user CRUD operations, improves user list output with company name resolution, and fixes auth token expiry handling.',
    type: 'minor',
    changes: {
      added: [
        'Company management: create, get, search, update commands',
        'User create (invite) command at account level',
        'User get command for fetching user details',
        'User update-account command (company, status)',
        'Project get command for project details',
        'Company name resolution in user list table output',
        'Added date column in user list',
        'Status summary in user list footer',
      ],
      fixed: [
        'Auth login expiry: auto-refresh or re-login instead of "Already logged in"',
        'BIM 360 find_user_by_email now handles array response format',
        'add-to-project 409 Conflict shows friendly "already a member" message',
        'UpdateAccountUserRequest serialization: company assignments now persist on BIM 360',
      ],
    },
  },
  {
    version: '5.6.0',
    date: '2026-03-10',
    highlights: ['Bulk Add 130x Faster', 'BIM 360 Instant Fallback', 'Smart Circuit Breakers', 'Batch Project Create'],
    description: 'Bulk user add optimized from 65s to 0.5s per project (130x speedup). ACC→BIM 360 instant fallback with learned flag, endpoint-aware circuit breakers, connection pool scaling, and new batch project create command.',
    type: 'minor',
    changes: {
      added: [
        'BIM 360 fallback for project creation — `raps admin project create` now works on both ACC and BIM 360 accounts',
        '`raps admin project batch-create` command for bulk project provisioning from CSV/JSON',
        'Learned BIM 360 flag: after first ACC probe failure, all subsequent calls skip the probe entirely',
        'Endpoint-aware circuit breakers: `/construction/` URLs now classified as `account-admin` with bulk-tuned thresholds',
        'Connection pool scaling: `pool_max_idle_per_host` now scales with concurrency level',
      ],
      changed: [
        'MCP bulk concurrency raised from 10 to 20 for faster MCP-driven bulk operations',
        'ACC→BIM 360 fallback uses single probe (no retry) — instant detection instead of 3 retries with backoff',
        'Circuit breaker threshold for bulk operations dynamically set to `(total / 4).max(20)` to prevent false trips under load',
      ],
      fixed: [
        'Bulk user add no longer wastes 60+ seconds per project on BIM 360 accounts retrying the ACC endpoint',
        'Circuit breaker no longer blocks all bulk requests by misclassifying `/construction/` URLs as generic "other" endpoint',
        'Rate budget registry now includes `account-admin` known limit (100 req/min) for accurate throttling',
      ],
    },
  },
  {
    version: '5.4.8',
    date: '2026-03-09',
    highlights: ['Command UX Clarity', 'BIM 360 Auto-Routing', 'Marketplace Plugin System', 'URL Shortener Worker'],
    description: 'Eliminates command confusion: raps project list auto-detects BIM 360 vs ACC hubs, folder/admin commands renamed for clarity, bulk vs single operations clearly labeled. Plus marketplace plugin distribution and go.rapscli.xyz URL shortener.',
    type: 'minor',
    changes: {
      added: [
        '`raps project list` auto-routes to Admin API for BIM 360 hubs (prefix `b.`) — no need to use `raps admin project list` separately',
        'Marketplace plugin system: install, search, list, and uninstall plugins with Ed25519 signature verification',
        '`go.rapscli.xyz` URL shortener Cloudflare Worker with admin UI, collision retry, and KV storage',
        '`raps object audit`, `raps object tag`, `raps lint` commands',
        '`raps config wizard`, `raps snapshot create/diff/list` commands',
        '`--delay-ms` flag on `raps admin user add/remove/update` for rate limiting',
      ],
      changed: [
        '`raps folder rights` renamed to `raps folder permissions` (alias `rights` preserved)',
        '`raps admin folder rights` renamed to `raps admin folder set-permissions` (alias `rights` preserved)',
        'Bulk user commands (`add`, `remove`, `update`) now show `[bulk]` tag in help with cross-references to single-project equivalents',
        '`raps admin --help` now states Account Administrator role requirement',
      ],
      fixed: [
        'BIM 360 HQ v2 add-user corrected to use `/users/import` endpoint',
        'Invite emails suppressed during bulk add operations',
        'Silent skip on email lookup miss now properly reported',
        '`--role` flag added to `add-to-project` (was missing)',
        'ANSI logo suppressed on terminals without escape sequence support',
        'Clap flag conflicts resolved for snapshot/pipeline commands',
      ],
    },
  },
  {
    version: '5.3.0',
    date: '2026-03-06',
    highlights: ['Test Coverage Suite', 'Coverage Dashboard', 'RFI Scenario Tests', 'DA/Admin Mock Coverage'],
    description: 'Comprehensive test coverage expansion: 25+ new scenario tests across RFI, DA, admin operations, and object commands using raps-mock. Interactive HTML coverage dashboard with animated gauges and per-module drill-down.',
    type: 'minor',
    changes: {
      added: [
        'Interactive HTML test coverage dashboard (`docs/coverage-report.html`) with animated SVG gauges, tier filtering, search, and per-module collapsible sections',
        'RFI CRUD scenario tests (81% line coverage): list/get/create/update/delete with JSON, table, filter, CSV import, and error path coverage',
        'Admin operations scenario tests (53% line coverage): list/status/resume/cancel with isolated HOME tempdir (no APS credentials needed)',
        'DA activities scenario tests: list/create/delete with JSON file, missing-field validation, alias-error paths',
        'DA appbundles scenario tests: list/create/delete round-trips',
        'DA workitems scenario tests: list, run qualified/unqualified, status, input/output args',
        'Object copy scenario tests (40% line coverage): batch-copy empty bucket, batch-rename no matches, arg-validation, error paths',
        'Config context scenario tests: show/set/clear round-trips, env var source, unknown key errors',
        'WORKFLOW.md coverage policy: 10-file priority list, 40% threshold, 5-step agent workflow',
      ],
      changed: [
        'TEST_COVERAGE_MATRIX.md updated with per-file coverage percentages across all command modules',
      ],
    },
  },
  {
    version: '5.2.0',
    date: '2026-03-06',
    highlights: ['Init Wizard', 'Status Dashboard', 'Account Context Banner', 'rapscli-api Worker'],
    description: 'Interactive init wizard for first-time setup, raps status context dashboard, account context banners in admin/hub commands, and rapscli-api Cloudflare Worker with version API, URN decoder, and APS status endpoint.',
    type: 'minor',
    changes: {
      added: [
        '`raps init` 6-step wizard: credential setup, 2-legged auth test, login, hub discovery, enterprise context, and summary',
        '`raps status` command shows full context dashboard: auth state, hub tier, account, connected projects',
        'Account context banner shown inline in `raps hub list` and all admin commands with HubTier classification (Personal/BIM360/ACC/Enterprise)',
        '`admin user add-to-all-projects` command for bulk user provisioning',
        'rapscli-api Cloudflare Worker: install script endpoint, version API (shields.io badges), URN decoder, APS status, URL shortener',
      ],
      changed: [
        'Admin commands auto-resolve `--account` flag via hub list when omitted',
        'Device code verification URL now includes `?code=XXXX-XXXX` query parameter for pre-fill',
        'Device auth provides fallback plain URL when ANSI rendering is not supported',
      ],
      fixed: [
        'Standardized exit codes across all CLI commands and SDK crates (0=success, 1=general error, 2=usage error, etc.)',
      ],
    },
  },
  {
    version: '5.1.0',
    date: '2026-03-02',
    highlights: ['Device Code Auth', 'Headless OAuth', 'Auth Proxy Worker', 'Non-Interactive PKCE'],
    description: 'GitHub-style device code authentication for headless environments. Enter a short code at rapscli.xyz/device from any browser — no local browser required. Cloudflare Worker proxy preserves PKCE security end-to-end.',
    type: 'minor',
    changes: {
      added: [
        'Device code auth flow via Cloudflare Worker proxy at rapscli.xyz/device with short user codes (XXXX-XXXX)',
        'DeviceSession Durable Object with state machine (pending → authorized → consumed) and 5-minute TTL cleanup',
        'Landing page at rapscli.xyz/device for entering device codes from any browser on any device',
        'Automatic headless detection switches to device code flow with descriptive UX messaging',
        'MCP auth guidance updated with device flow instructions for headless/MCP environments',
      ],
      changed: [
        'Device code flow no longer requires interactive stdin — works in fully non-interactive environments',
        'Headless detection message describes new "enter code at URL" experience instead of manual URL paste',
      ],
      fixed: [
        'Removed interactive-mode guard from device code flow that incorrectly blocked headless usage',
      ],
    },
  },
  {
    version: '5.0.0',
    date: '2026-03-02',
    highlights: ['Redis Distributed Cache', 'Serverless Dispatch', 'Webhook Gateway', 'CI/CD Pipelines'],
    description: 'Phase 2 distributed orchestration: Redis-backed cache and job queue, Fly.io serverless dispatch, Cloudflare Workers webhook gateway, and CI/CD pipeline examples.',
    type: 'major',
    changes: {
      added: [
        'CacheBackend trait abstraction with MemoryBackend and feature-gated RedisBackend (deadpool connection pool)',
        'Job queue via Redis Streams with 3 priority levels (critical/normal/background) and dead-letter queue',
        '`raps swarm worker start` command with semaphore-based concurrency, heartbeat, and SIGTERM graceful shutdown',
        'Docker Compose deployment stack (Redis, worker replicas, proxy, webhook gateway, dashboard)',
        'ServerlessDispatchAgent for Fly.io Machines API with scale-to-zero',
        '`--serverless` and `--notify` flags on `raps translate start`',
        '`raps job` command (status, list, cancel) for managing Fly.io machine jobs',
        '`raps pipeline create` with cron/webhook triggers and `.pipeline.yaml` output',
        'Cloudflare Worker webhook gateway with Durable Objects event backlog (HMAC-SHA256 validation)',
        '`raps webhook serve --serverless` for deploying webhook gateway via wrangler',
        '`raps webhook drain` for authenticated event retrieval from gateway',
        'GitHub Actions workflow example for serverless model translation',
        'GitLab CI pipeline example with setup/translate/verify stages',
        'Fly.io configuration with scale-to-zero and shared-cpu-2x sizing',
      ],
      changed: [
        '`raps swarm` command now supports `worker` subcommand (feature-gated behind `redis`)',
        'Translate command accepts `--serverless` flag for Fly.io dispatch instead of local processing',
      ],
      fixed: [
        'MCP TOOLS constant synced with get_tools() (added workflow_compare_versions, workflow_setup_project)',
      ],
    },
  },
  {
    version: '5.0.0',
    date: '2026-03-01',
    highlights: ['Swarm Orchestration', 'HTTP/2 Multiplexing', 'TUI Swarm Dashboard', 'ASVS L2 100%'],
    description: 'Multi-agent swarm orchestration kernel with circuit breaker, rate budget, response cache, metrics, and checkpoint modules. HTTP/2 multiplexing with adaptive window. TUI Swarm Dashboard (F8). Compound MCP tools for bulk operations. ASVS L2 compliance at 100%.',
    type: 'major',
    changes: {
      added: [
        'Swarm orchestration kernel: circuit breaker, retry policy, rate budget, region routing, response cache, and HTTP middleware wiring',
        'API metrics collector with per-endpoint latency and error tracking',
        'Structured audit logger with JSON output for swarm operations',
        'Checkpoint store for durable progress checkpointing with automatic resume',
        'TUI Swarm Dashboard (F8) showing circuit breakers, rate budgets, cache stats, API metrics, and checkpoints',
        'Compound MCP tools: bulk_upload, bulk_download, search_and_download, upload_and_translate, translate_and_download',
        'Swarm CLI commands: `raps swarm status`, `raps swarm reset`, `raps swarm run`',
      ],
      changed: [
        'HTTP/2 multiplexing enabled with adaptive window, connection pool tuning (idle timeout 90s, max idle 10 per host), TCP keepalive (30s)',
      ],
      security: [
        'ASVS L2 compliance at 100% (34/34 requirements met)',
      ],
    },
  },
  {
    version: '4.17.0',
    date: '2026-03-01',
    highlights: ['Pipeline MCP Tools', '105 MCP Tools', 'Pipeline Validate', 'Pipeline Discovery'],
    description: '4 new Pipeline v2 MCP tools: validate, dry-run, run, and list-templates. Total MCP tools now 105.',
    type: 'minor',
    changes: {
      added: [
        'MCP tool `pipeline_validate` — validate pipeline YAML/JSON files for syntax errors',
        'MCP tool `pipeline_dry_run` — preview pipeline execution without running commands',
        'MCP tool `pipeline_run` — execute pipeline files with dry-run, ignore-failure, and variable options',
        'MCP tool `pipeline_list_templates` — discover pipeline files in a directory',
      ],
    },
  },
  {
    version: '4.16.0',
    date: '2026-03-01',
    highlights: ['Pipeline v2 Engine', 'GitHub Actions', 'GitLab CI Templates', 'CI/CD Integrations'],
    description: 'Pipeline v2 engine with retry, timeout, conditionals, parallel steps, and for-each loops. Official GitHub Actions and GitLab CI templates.',
    type: 'minor',
    changes: {
      added: [
        'Pipeline v2 engine with retry policies, timeout per step, conditional execution (if/unless), parallel steps, and for-each loops',
        'Expression evaluation in pipelines: `${{ steps.id.exit_code == 0 }}`',
        'Official GitHub Actions: setup, pipeline, upload, translate (dmytro-yemelianov/raps-actions)',
        'Official GitLab CI templates: .raps-setup, .raps-pipeline, .raps-upload, .raps-translate',
      ],
      changed: [
        'Pipeline YAML format extended with v2 fields while maintaining backward compatibility with v1 format',
      ],
    },
  },
  {
    version: '4.15.0',
    date: '2026-02-28',
    highlights: ['ASVS Security', 'npm Fix', 'Path Traversal', 'Log Redaction'],
    description: 'ASVS L2 security hardening — path traversal protection, automatic log redaction, restricted directory permissions. Fixed npm publishing pipeline.',
    type: 'minor',
    changes: {
      added: [
        'Path traversal protection for all download operations (sanitize_filename, validate_path_within, safe_join)',
        'Automatic log redaction via RedactingMakeWriter for Bearer tokens, cookies, API keys, URL params',
        'Restricted directory permissions (0o700) for log and config directories',
      ],
      changed: [
        'Extended log redaction patterns: Authorization headers, Cookie headers, X-API-Key, URL query params',
        'Pipeline variable injection hardening with shell metacharacter validation',
      ],
      fixed: [
        'npm publishing pipeline — all 5 platform binary packages now correctly listed in optionalDependencies',
        'Auth error messages now redact sensitive text before logging',
      ],
      security: [
        'ASVS L2 compliance improved from 74% to ~82% Met',
        'Path traversal (CWE-22) protection across all file download paths',
        'Automatic redaction prevents credential leakage in logs',
      ],
    },
  },
  {
    version: '4.14.0',
    date: '2026-02-25',
    highlights: ['API Health Tracking', 'Live Progress Spinners', 'Headless Auth', 'Major Refactor'],
    description: 'Live progress spinners with API health and latency info, headless environment detection for auth, major codebase refactoring',
    type: 'minor',
    changes: {
      added: [
        'Live progress spinners with API health and latency tracking across all commands',
        'Streaming bucket listing per-region with concurrent fetching',
        'Headless environment detection for `auth login` — auto-switches to device code flow on SSH, CI, containers',
        'Unix pipe support (stdin/stdout) across CLI commands',
        'Manual PKCE-based device code flow replacing broken browser-based flow',
      ],
      changed: [
        'Major refactor: split MCP server.rs (6,312 lines) into 8 focused modules',
        'Split 14 monolithic files into focused modules across all crates',
        'Improved keychain fallback warnings with actionable guidance',
        'Comprehensive MCP server review fixes (20 issues)',
      ],
      fixed: [
        'Validate empty auth code input and reset refreshing flag on error',
        'Validate client credentials before auth operations',
        'Device code flow replaced with working PKCE-based implementation',
      ],
    },
  },
  {
    version: '4.13.0',
    date: '2026-02-24',
    highlights: ['API Bug Fixes', 'Code Quality', 'Review Findings', 'Stability'],
    description: 'Fixed 6 API alignment bugs (2 blocking, 4 high severity) and resolved 11 medium/low review findings',
    type: 'minor',
    changes: {
      fixed: [
        'Resolved 6 API alignment bugs including 2 blocking and 4 high severity issues',
        'Resolved 11 medium and low severity review findings across codebase',
      ],
    },
  },
  {
    version: '4.12.0',
    date: '2026-02-23',
    highlights: ['AEC GraphQL', 'TUI Dashboard', '7 Tabs', '33 Views'],
    description: 'AEC GraphQL API for faster hubs/projects loading, expanded TUI dashboard with 7 tabs and 33 views',
    type: 'minor',
    changes: {
      added: [
        'AEC GraphQL API for faster hubs/projects loading with REST fallback',
        'Expanded TUI Dashboard from 4 to 7 tabs with 33 views',
      ],
      changed: [
        'Dashboard made optional behind `--features dashboard` flag to reduce default binary size',
      ],
    },
  },
  {
    version: '4.11.0',
    date: '2026-02-22',
    highlights: ['101 MCP Tools', 'Code Hardening', 'Auth Safety', 'UX Improvements'],
    description: 'Hardened error handling, auth safety, and code quality across the entire codebase with 18 robustness improvements',
    type: 'minor',
    changes: {
      added: [
        '29 new MCP tools bringing total to 101: project CRUD, user management, template convert, and more',
      ],
      changed: [
        'Improved robustness, UX safety, and code quality across 18 findings',
        'Hardened error handling and auth safety across all crates',
      ],
    },
  },
  {
    version: '4.9.0',
    date: '2026-02-21',
    highlights: ['Profiler Overhaul', 'Structured Logging', 'JSON Log Format', 'Env Config'],
    description: 'Overhauled profiler accuracy and reporting, enhanced logging with structured fields and JSON file output',
    type: 'minor',
    changes: {
      changed: [
        'Overhauled profiler accuracy, tracking, and reporting',
        'Enhanced logging with structured fields and JSON file format',
        'Environment variable configuration for log levels',
      ],
    },
  },
  {
    version: '4.8.0',
    date: '2026-02-20',
    highlights: ['Tracing Logging', 'Performance Profiler', 'Reedline Shell', 'Keychain Fallback'],
    description: 'Tracing-based logging, performance profiler, reedline interactive shell, resilient keychain fallback',
    type: 'minor',
    changes: {
      added: [
        'Tracing-based structured logging across all crates',
        'Performance profiler for command execution timing',
        'Resilient keychain fallback for token storage',
      ],
      changed: [
        'Switched interactive shell from rustyline to reedline for better UX',
        'Improved logging infrastructure with configurable verbosity',
      ],
    },
  },
  {
    version: '4.7.0',
    date: '2026-02-19',
    highlights: ['6 Auth Presets', '-p Short Flag', 'Viewer/Editor/Admin', 'Storage/Automation'],
    description: '6 scope presets for auth login: all, viewer, editor, storage, automation, admin with -p short flag',
    type: 'minor',
    changes: {
      added: [
        '5 new auth login presets: viewer, editor, storage, automation, admin',
        '`-p` short flag for `--preset`',
      ],
    },
  },
  {
    version: '4.6.0',
    date: '2026-02-19',
    highlights: ['Auth Presets', 'DA Auto-Qualification', '9 New Doc Pages', 'Full CLI Docs'],
    description: 'Auth preset scopes, DA auto-qualification and auto-alias, 9 new documentation pages covering all 27 CLI commands',
    type: 'minor',
    changes: {
      added: [
        'Auth `--preset all` flag for non-interactive scope selection',
        'DA auto-qualification of bare bundle/activity names with owner nickname',
        'DA auto-creation of "default" alias after bundle/activity creation',
        '9 new docs pages: webhooks, design-automation, issues, acc-modules, rfis, reality-capture, plugins, generate, completions',
      ],
      fixed: [
        'DA `appbundle-create` deserialization error (Optional `endpointUrl`)',
        'DA `activity-create` and `run` "Cannot parse id" for bare names',
        'Pipeline sample template bucket create syntax',
        'DA `workitems` startAfterTime format',
      ],
    },
  },
  {
    version: '4.5.0',
    date: '2026-02-10',
    highlights: ['HTTP Retry', 'Faster Buckets', 'Flag Conflict Fix', 'Company List'],
    description: 'HTTP retry with exponential backoff, faster bucket listing, clap flag conflict resolution',
    type: 'minor',
    changes: {
      added: [
        'Automatic HTTP retry on 429/5xx with exponential backoff',
        'New `admin company-list` command',
        'New docs pages for api, report, and template commands',
      ],
      changed: [
        'Reduced bucket list per-region timeout from 30s to 10s',
        'Simplified report.rs and admin.rs modules',
      ],
      fixed: [
        'Clap `-o`/`--output` flag conflict causing panics',
        'Status counting bug in admin operations',
      ],
    },
  },
  {
    version: '4.4.0',
    date: '2026-01-20',
    highlights: ['51 MCP Tools', 'Folder Permissions', 'Operation Lifecycle', 'Full ACC CRUD'],
    description: '51 MCP Tools, Folder Permissions, Operation Lifecycle, Full ACC CRUD',
    type: 'minor',
    changes: {
      added: [
        '14 new MCP tools bringing total to 51',
        'Bulk folder permission management with `admin_folder_rights`',
        'Operation lifecycle tools: `admin_operation_resume`, `admin_operation_cancel`',
        'Full RFI CRUD: `rfi_create`, `rfi_update`',
        'Full Assets CRUD: `asset_create`, `asset_update`, `asset_delete`',
        'Full Submittals CRUD: `submittal_create`, `submittal_update`',
        'Full Checklists CRUD: `checklist_create`, `checklist_update`',
        'Support for all permission levels (ViewOnly, ViewDownload, UploadOnly, ViewDownloadUpload, ViewDownloadUploadEdit, FolderControl)',
        'Support for folder types (ProjectFiles, Plans, Custom paths)',
      ],
      changed: [
        'Enhanced `admin_project_list` with advanced filter expressions',
        'Improved auth guidance for new tool categories',
        'Updated tool availability summary with new tool groups',
      ],
    },
  },
  {
    version: '4.3.0',
    date: '2026-01-18',
    highlights: ['Python Package', 'PyPI Distribution', 'Python Bindings'],
    description: 'Python Package on PyPI, Python Bindings, Cross-language Support',
    type: 'minor',
    changes: {
      added: [
        'Python package `raps-aps` available on PyPI',
        'Python bindings for RAPS core functionality',
        'Cross-language support for Python developers',
        'pip installation support',
      ],
      changed: [
        'Improved distribution channels',
        'Enhanced cross-platform compatibility',
      ],
    },
  },
  {
    version: '3.8.0',
    date: '2026-01-10',
    highlights: ['Interactive Shell', 'Rust 2024 Edition', 'TAB Completion', 'Parameter Hints'],
    description: 'Interactive Shell with REPL, TAB Completion, Parameter Hints, Rust 2024 Edition',
    type: 'minor',
    changes: {
      added: [
        'Interactive Shell mode with REPL for executing commands without retyping `raps`',
        'TAB completion for commands, subcommands, and arguments',
        'Parameter hints showing available options as you type',
        'Command history with arrow key navigation',
        'Fuzzy search for command discovery',
      ],
      changed: [
        'Migrated to Rust 2024 Edition for improved language features',
        'Updated minimum supported Rust version (MSRV) to 1.88',
        'Enhanced MCP server stability with better argument validation',
        'Improved error messages across all commands',
      ],
      fixed: [
        'MCP server tool invocation with stricter argument validation',
        'Cached APS client instances to reduce lock contention',
        'Output format validation in MCP tools',
      ],
    },
  },
  {
    version: '3.7.0',
    date: '2026-01-07',
    highlights: ['Major Security Improvements', 'Performance Boost', 'Parallel Uploads', 'Secure Token Storage'],
    description: 'Major Security Improvements, Performance Boost, Parallel Uploads, Secure Token Storage',
    type: 'minor',
    changes: {
      added: [
        'Parallel multipart uploads with 3-10x speed improvement for large files',
        'Secure token storage with OS keychain as default',
        'Comprehensive security tests for plugin system',
        'Token migration helper for moving to secure storage',
        'JSON/YAML/CSV output support for issue commands',
        'Streaming file operations to reduce memory usage',
      ],
      changed: [
        'Keychain storage is now the default instead of plaintext files',
        'Plugin hooks now use command whitelisting for security',
        'Consistent retry logic applied across all HTTP operations',
        'Enhanced configuration with profile-based keychain settings',
      ],
      fixed: [
        'Critical: Command injection vulnerability in plugin hooks',
        'Critical: Plaintext token storage replaced with encrypted keychain',
        'Output format bug in issue list command now supports all formats',
        'Unsafe environment variable manipulation replaced with safe alternatives',
        'Memory buffering issues with large file uploads',
      ],
      security: [
        'Fixed command injection vulnerability in plugin system',
        'Implemented secure token storage with OS keychain integration',
        'Added command validation and whitelisting for plugin hooks',
        'Replaced unsafe environment variable manipulation',
      ],
    },
  },
  {
    version: '3.4.0',
    date: '2026-01-02',
    highlights: ['Version Display Fix', 'OAuth Callback Improvements', 'Windows Compatibility'],
    description: 'Version Display Fix, OAuth Callback Improvements, Windows Compatibility',
    type: 'minor',
    changes: {
      added: [
        'Automatic port fallback system for OAuth callback server with RAPS-themed ports (12495, 7495, 9247)',
        'Intelligent port selection with helpful error messages when ports are unavailable',
      ],
      changed: [
        'OAuth callback server binding changed from 0.0.0.0 to 127.0.0.1 for better Windows localhost support',
        'Updated logo reference in README from PNG to WebP format',
      ],
      fixed: [
        'Version display now automatically syncs with Cargo.toml using env!("CARGO_PKG_VERSION")',
        'Windows compatibility for OAuth callback server',
      ],
    },
  },
  {
    version: '3.1.0',
    date: '2025-12-29',
    highlights: ['Rust 2024 Edition', 'CI Speedups', 'Command Dispatch Fix'],
    description: 'Rust 2024 Edition, CI Speedups, Command Dispatch Fix',
    type: 'minor',
    changes: {
      added: [
        'Comprehensive command dispatch tests (19 tests covering all subcommands)',
        '`cargo-nextest` for parallel test execution in CI',
        '`sccache` for build caching in release workflows',
        'Parallel build jobs in CI with `lld` linker for faster builds',
      ],
      changed: [
        'Migrated to Rust 2024 Edition',
        'Updated MSRV to Rust 1.88',
        'Wrapped `std::env::set_var/remove_var` in `unsafe` blocks (Rust 2024 requirement)',
        'Use `div_ceil` instead of manual ceiling division',
      ],
      fixed: [
        'Critical bug: `raps auth test` and other commands panicking with "unreachable code"',
        'Command dispatch logic that was corrupting CLI state',
      ],
    },
  },
  {
    version: '3.0.0',
    date: '2025-12-27',
    highlights: ['MCP Server', 'AI Assistant Integration', '14 MCP Tools'],
    description: 'MCP Server for AI Assistant Integration with 14 MCP Tools',
    type: 'major',
    changes: {
      added: [
        'MCP (Model Context Protocol) server for AI assistant integration',
        'Support for Claude Desktop, Cursor IDE, and other MCP clients',
        '14 MCP tools: auth_test, auth_status, bucket_list, bucket_create, bucket_get, bucket_delete, object_list, object_delete, object_signed_url, object_urn, translate_start, translate_status, hub_list, project_list',
        'Natural language APS operations via AI assistants',
        'New `raps serve` command to start the MCP server',
      ],
      changed: [
        'Added Serialize derive to API response types for MCP JSON serialization',
        'Updated documentation with MCP server setup guides',
      ],
    },
  },
  {
    version: '2.1.0',
    date: '2025-12-26',
    highlights: ['Stability improvements', 'Bug fixes', 'Documentation updates'],
    description: 'Stability improvements, Bug fixes, Documentation updates',
    type: 'minor',
    changes: {
      added: [
        'Improved error messages for common authentication issues',
        'Better progress indicators for long-running operations',
      ],
      changed: [
        'Updated dependencies to latest versions',
        'Improved documentation and examples',
      ],
      fixed: [
        'Fixed edge case in token refresh during concurrent requests',
        'Resolved issue with special characters in file paths',
      ],
    },
  },
  {
    version: '2.0.0',
    date: '2025-12-25',
    highlights: ['ACC Checklists support', 'Plugin system', 'Pipeline automation improvements'],
    description: 'ACC Checklists support, Plugin system, Pipeline automation improvements',
    type: 'major',
    changes: {
      added: [
        'ACC Checklists module with full CRUD operations',
        'Plugin system for external extensions',
        'Command aliases for frequent operations',
        'Test data generation (`raps generate`)',
        'Demo scenarios (`raps demo`)',
      ],
      changed: [
        'Improved pipeline execution with better error reporting',
        'Enhanced authentication flow with device-code support',
        'Updated to latest APS API versions',
      ],
      fixed: [
        'Token refresh race condition in concurrent operations',
        'Large file upload progress reporting accuracy',
        'JSON output formatting for nested objects',
      ],
    },
  },
  {
    version: '1.0.0',
    date: '2025-10-15',
    highlights: ['First stable release', 'Complete APS API coverage', 'CI/CD ready'],
    description: 'First stable release with complete APS API coverage, CI/CD ready',
    type: 'major',
    changes: {
      added: [
        'Authentication (2-legged, 3-legged, device-code, token)',
        'Object Storage Service (buckets, objects, signed URLs)',
        'Model Derivative (translation, manifests, derivatives)',
        'Data Management (hubs, projects, folders, items)',
        'Webhooks (create, list, delete, test)',
        'Design Automation (engines, activities, work items)',
        'ACC Issues (CRUD, comments, attachments)',
        'ACC RFIs (CRUD, status management)',
        'ACC Assets (CRUD, categories)',
        'ACC Submittals (CRUD)',
        'Reality Capture (photoscenes, processing)',
        'Pipeline automation (YAML/JSON definitions)',
        'Multiple output formats (JSON, YAML, CSV, table)',
        'Shell completions (bash, zsh, fish, PowerShell, elvish)',
      ],
    },
  },
];

/**
 * Get the latest release
 */
export function getLatestRelease() {
  return releases[0];
}

/**
 * Get releases by type
 */
export function getReleasesByType(type) {
  return releases.filter(r => r.type === type);
}

/**
 * Get the latest N releases
 */
export function getLatestReleases(count = 5) {
  return releases.slice(0, count);
}
