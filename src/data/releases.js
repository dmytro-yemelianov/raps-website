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
